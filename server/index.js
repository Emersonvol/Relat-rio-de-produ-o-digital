import express from "express";
import cors from "cors";
import clientPromise from "./lib/mongodb.js";

const app = express();

app.use(cors());
app.use(express.json());


app.post("/salvar", async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("apontamentosDiarios"); 
    const dados = req.body;

    await db.collection("apontamentos").insertOne(dados);

    res.status(200).json({ message: "Salvo com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao salvar" });
  }
});

app.listen(3001, () => console.log("API rodando na porta 3001"));

