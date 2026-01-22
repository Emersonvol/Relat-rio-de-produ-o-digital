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
app.get("/dados",async(req,res)=>{
  
  try{
    const client = await clientPromise;
    const db = client.db("apontamentosDiarios")
    
    const resusltados = await db.collection("apontamentos").find().toArray()

    const agrupado = {}
    resusltados.forEach(item =>{
      const ordem = item.Ordem || "SEM_ORDEM";

      if(!agrupado[ordem]) agrupado[ordem] = []
      agrupado[ordem].push(item)


    })

    
    res.status(200).json(resusltados);
    
  }catch(error){
    console.log(error)
    res.status(500).json({error:"Erro ao buscar dados"});
  }
  
  
})



app.post("/observacoes", async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("observacoesDiarios"); 
    const dados = req.body;

    await db.collection("observacoes").insertOne(dados);

    res.status(200).json({ message: "Salvo com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao salvar" });
  }
});

app.get("/dadosObservacao",async(req,res)=>{
    try{
    const client = await clientPromise;
    const db = client.db("observacoesDiarios")
    
    const resusltados = await db.collection("observacoes").find().toArray()

    const agrupado = {}
    resusltados.forEach(item =>{
      const ordem = item.Ordem || "SEM_ORDEM";

      if(!agrupado[ordem]) agrupado[ordem] = []
      agrupado[ordem].push(item)


    })

    
    res.status(200).json(resusltados);
    
  }catch(error){
    console.log(error)
    res.status(500).json({error:"Erro ao buscar dados"});
  }
  



})






app.listen(3001, () => console.log("API rodando na porta 3001"));
