import fs from "fs";
import teste2 from "./teste2.json";

const novo = teste2.map((el, i) => ({
  index: i,
  id: el.payload.id,
  updated_at: el.payload.updated_at,
  status: el.payload.status,
  crash_point: el.payload.crash_point,
  total_eur_bet: el.payload.total_eur_bet,
  total_bets_placed: el.payload.total_bets_placed,
  total_eur_won: el.payload.total_eur_won,
}));

fs.writeFile("novo.json", JSON.stringify(novo));
