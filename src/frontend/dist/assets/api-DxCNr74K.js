import { a as CarType } from "./gameStore-sCxKMV8R.js";
async function apiSubmitRaceResult(result) {
  console.log("[API] submitRaceResult", result);
}
async function apiGetLeaderboard() {
  return [
    {
      rank: 1n,
      playerName: "SPEEDY_ACE",
      score: 98450n,
      carType: CarType.LIGHTNING
    },
    {
      rank: 2n,
      playerName: "NEON_DRIFT",
      score: 87200n,
      carType: CarType.HYPER
    },
    { rank: 3n, playerName: "TURBO_X", score: 75600n, carType: CarType.RACE },
    { rank: 4n, playerName: "BLAZE_99", score: 63100n, carType: CarType.JET },
    {
      rank: 5n,
      playerName: "STREET_KID",
      score: 51800n,
      carType: CarType.STREET
    }
  ];
}
async function apiGetTotalPlayers() {
  return 1284n;
}
async function apiGetTotalRaces() {
  return 9823n;
}
export {
  apiSubmitRaceResult as a,
  apiGetLeaderboard as b,
  apiGetTotalPlayers as c,
  apiGetTotalRaces as d
};
