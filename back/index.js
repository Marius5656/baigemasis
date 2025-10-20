// 1. Įtraukiame express
const cors = require("cors");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express(); // Sukuriame express aplikaciją
// 2. Nustatome portą
const PORT = 4000;

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 3. Middleware, kad galėtume gauti duomenis iš POST (JSON formatu)
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(uploadDir));

// multer konfigūracija
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 4. GET route – kai norime gauti duomenis,turetu grazinti
// toki objiekta ko tikisi frotnendas
let mineralai = [
  { id: 1, title: "Kalkakmenis", description: "Svarbus akmuo statybose." },
  { id: 2, title: "Klinčių karjeras", description: "Istorinis karjeras." },
];
app.get("/mineralai", (req, res) => res.json(mineralai));

// 5. POST route – kai norime siųsti duomenis į serverį
// POST su paveikslėliu
app.post("/mineralai", upload.single("image"), (req, res) => {
  const { title, description } = req.body;
  if (!title || !description)
    return res.status(400).json({ error: "Title and description required" });

  const id = mineralai.length ? mineralai[mineralai.length - 1].id + 1 : 1;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const naujas = { id, title, description, image };
  mineralai.push(naujas);
  res.json(naujas);
});

// DELETE
app.delete("/mineralai/:id", (req, res) => {
  const { id } = req.params;
  mineralai = mineralai.filter((m) => m.id !== parseInt(id));
  res.json({ message: "Ištrinta" });
});

// PUT
app.put("/mineralai/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const mineralas = mineralai.find((m) => m.id === parseInt(id));
  if (!mineralas) return res.status(404).json({ error: "Nerastas" });
  mineralas.title = title ?? mineralas.title;
  mineralas.description = description ?? mineralas.description;
  res.json(mineralas);
});

// Start
app.listen(PORT, () => console.log(`Serveris veikia http://localhost:${PORT}`));
// gal cia