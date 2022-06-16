import fs from "fs";
import teste2 from "./teste2";
import { MongoClient } from "mongodb";
import { exit } from "process";

async function getDB() {
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);

  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db("blazerBot");
  const collection = db.collection("rounds");

  return collection;
}

getDB()
  .then(async (doc) => {
    const ticks = [];

    teste2.forEach((rounds, index) => {
      ticks.push({
        id: teste2[index][0].payload.id,
        rounds: rounds.map((round) => ({
          status: round.payload.status,
          updated_at: round.payload.updated_at,
          crash_point: round.payload.crash_point,
        })),
      });
    });
    await doc.insertMany(ticks);
    // fs.rm("teste2", (err) => {
    //   if (err) throw err;
    //   console.log("FOI");
    //   exit(0);
    // });
  })
  .catch((err) => {
    console.log(err);
  });
