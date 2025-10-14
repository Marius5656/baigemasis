// 1. Įtraukiame express
const cors = require("cors");
const express = require("express");
const app = express(); // Sukuriame express aplikaciją

// 2. Nustatome portą
const PORT = 4000;

// 3. Middleware, kad galėtume gauti duomenis iš POST (JSON formatu)
app.use(express.json());
app.use(cors());

// 4. GET route – kai norime gauti duomenis,turetu grazinti
// toki objiekta ko tikisi frotnendas
app.get("/", (req, res) => {
  res.send("Sveiki atvykę į mano Express serverį!");
});

// 5. POST route – kai norime siųsti duomenis į serverį
app.post("/duomenys", (req, res) => {
  const gautiDuomenys = req.body; // duomenys, atėję su užklausa
  console.log("Gavome:", gautiDuomenys);

  res.send("Duomenys sėkmingai gauti");
});

const ratings = {};

app.get("/api/ratings", (req, res) => {
  res.json(ratings);
});

app.post("/api/ratings", (req, res) => {
  const { itemId, value } = req.body;
  if (!itemId || !["like", "dislike"].includes(value)) {
    return res.status(400).json({ error: "Neteisinga uzklausos forma" });
  }
  if (!ratings[itemId]) {
    ratings[itemId] = { like: 0, dislike: 0 };
  }

  ratings[itemId][value] += 1;
  console.log(`✅ ${itemId} gavo ${value}!`);
  res.json({ itemId, counts: ratings[itemId] });
});
// 6. Paleidžiame serverį
app.listen(PORT, () => {
  console.log(`Serveris veikia http://localhost:${PORT}`);
});
