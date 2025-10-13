// 1. Įtraukiame express
const cors = require("cors");
const express = require("express");
const app = express(); // Sukuriame express aplikaciją

// 2. Nustatome portą
const PORT = 4000;

// 3. Middleware, kad galėtume gauti duomenis iš POST (JSON formatu)
app.use(express.json());
app.use(cors());

// 4. GET route – kai norime gauti duomenis
app.get("/", (req, res) => {
  res.send("Sveiki atvykę į mano Express serverį!");
});

// 5. POST route – kai norime siųsti duomenis į serverį
app.post("/duomenys", (req, res) => {
  const gautiDuomenys = req.body; // duomenys, atėję su užklausa
  console.log("Gavome:", gautiDuomenys);

  res.send("Duomenys sėkmingai gauti");
});

// 6. Paleidžiame serverį
app.listen(PORT, () => {
  console.log(`Serveris veikia http://localhost:${PORT}`);
});
