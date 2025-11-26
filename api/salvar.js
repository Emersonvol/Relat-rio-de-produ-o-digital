import clientPromise from "../../server/lib/mongodb.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("apontamentosDiarios");

    const dados = req.body;

    await db.collection("apontamentos").insertOne(dados);

    res.status(200).json({ message: "Salvo com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao salvar" });
  }
}