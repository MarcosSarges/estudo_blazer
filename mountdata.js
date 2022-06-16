import fs from "fs";
import teste2 from "./teste2.json";

import unionBy from "lodash/unionBy.js";

const novo = teste2
  .filter((el) => el.crash_point !== null)
  .map((el, i) => parseFloat(el.crash_point));

// .filter((el) => el !== null);
// const points = unionBy(novo, "id");
// console.log(novo);
const pointsValue = new Array(9).fill([]);

novo.forEach((el) => {
  if (el >= 0 && el < 2) pointsValue[0].push(el);
  if (el >= 2 && el < 3) pointsValue[1].push(el);
  if (el >= 3 && el < 4) pointsValue[2].push(el);
  if (el >= 4 && el < 5) pointsValue[3].push(el);
  if (el >= 5 && el < 6) pointsValue[4].push(el);
  if (el >= 6 && el < 7) pointsValue[5].push(el);
  if (el >= 7 && el < 8) pointsValue[6].push(el);
  if (el >= 8 && el < 9) pointsValue[7].push(el);
  if (el >= 9) pointsValue[8].push(el);
});

console.log({
  value1: pointsValue[0].length,
  value2: pointsValue[1].length,
  value3: pointsValue[2].length,
  value4: pointsValue[3].length,
  value5: pointsValue[4].length,
  value6: pointsValue[5].length,
  value7: pointsValue[6].length,
  value8: pointsValue[7].length,
  value9: pointsValue[8].length,
});

// fs.writeFile("novo.json", JSON.stringify(unionBy(novo, "id")), (err) => {
//   console.log(err);
// });
