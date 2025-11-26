import clientPromise from "../lib/mongodb.js";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("apontamentosDiarios");

    await db.collection("apontamentos").insertOne(req.body);

    res.status(200).json({ message: "Salvo com sucesso!" });
  } catch (err) {
    console.error("ERRO API:", err);
    res.status(500).json({ error: "Erro ao salvar" });
  }
}
