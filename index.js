import puppeteer from "puppeteer";
// import puppeteerProxy from "puppeteer-page-proxy";

import fs from "fs";
import { exit } from "process";
const maxTime = 60 * 60;

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://blaze.com/pt/games/crash");

    const f12 = await page.target().createCDPSession();
    await f12.send("Network.enable");
    await f12.send("Page.enable");

    const rounds = [];

    const handleWebSocketFrameReceived = async (params) => {
      const splitIndex = String(params.response.payloadData).indexOf("[");
      if (splitIndex > 0) {
        const body = String(params.response.payloadData).slice(splitIndex);
        const [_, parsed] = await JSON.parse(body);
        if (parsed?.id === "crash.tick") {
          try {
            if (parsed?.payload?.bets) delete parsed.payload.bets;

            const index = rounds.length - 1 < 0 ? 0 : rounds.length - 1;

            if (rounds?.[index]?.[0]?.payload?.id === parsed.payload.id) {
              rounds[index].push(parsed);
            } else {
              rounds.push([parsed]);
            }
          } catch (error) {
            console.log("teste", error);
          }
        }
      }
    };

    f12.on("Network.webSocketFrameReceived", handleWebSocketFrameReceived);
    let time = 0;
    const interval = setInterval(() => {
      console.clear();
      console.log(time++);
      if (time === maxTime) clearInterval(interval);
    }, 999);

    setTimeout(async () => {
      f12.off("Network.webSocketFrameReceived");

      fs.writeFile("teste2.json", JSON.stringify(rounds), (err) => {
        if (err) throw err;
        console.log("File is created successfully.");
      });

      await browser.close();
      exit(0);
    }, 1000 * maxTime);
  } catch (error) {
    console.log(error);
  }
})();
