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
let mineralai = [
  { id: 1, title: "Kalkakmenis", description: "Svarbus akmuo statybose." },
  { id: 2, title: "Klinčių karjeras", description: "Istorinis karjeras." },
];
app.get("/mineralai", (req, res) => {
  res.json(mineralai);
});

// 5. POST route – kai norime siųsti duomenis į serverį
app.post("/mineralai", (req, res) => {
  const { title, description } = req.body;
  const id = mineralai.length ? mineralai[mineralai.length - 1].id + 1 : 1;
  const naujas = { id, title, description };
  mineralai.push(naujas);
  res.json(naujas);
});

app.put("/mineralai/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const mineralas = mineralai.find((m) => m.id === parseInt(id));
  if (!mineralas) return res.status(404).json({ error: "Nerastas" });
  mineralas.title = title ?? mineralas.title;
  mineralas.description = description ?? mineralas.description;
  res.json(mineralas);
});

app.delete("/mineralai/:id", (req, res) => {
  const { id } = req.params;
  mineralai = mineralai.filter((m) => m.id !== parseInt(id));
  res.json({ message: "Ištrinta" });
});

// 6. Paleidžiame serverį
app.listen(PORT, () => {
  console.log(`Serveris veikia http://localhost:${PORT}`);
});
