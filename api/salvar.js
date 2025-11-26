import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const client = await new MongoClient(process.env.MONGODB_URI).connect();
    const db = client.db("apontamentosDiarios");

    await db.collection("apontamentos").insertOne(req.body);

    return res.status(200).json({ ok: true, message: "Salvo com sucesso!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}
