import { db } from "../databaseConfig.js";

export const addProducts = async (req, res) => {
  const { name, description, price, image } = req.body;
  try {
    
    await db.collection("products").insertOne({ name, description, price, image });
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};

export const getProducts = async (req, res) => {
  const products = await db.collection("products").find().toArray();
  res.send(products);
};
export async function filterProducts (req,res) {
  const {type} = req.params
  let productsFiltered;
  try{
    if(type === "brinquedos"){
      productsFiltered = await db.collection("products").find({type:"brinquedos"}).toArray()
    } else if (type === "roupas"){
      productsFiltered = await db.collection("products").find({type:"roupas"}).toArray()
    } else if (type === "calcados") {
      productsFiltered = await db.collection("products").find({type:"calcados"}).toArray()
    } else if(type === "acessorios"){
      productsFiltered = await db.collection("products").find({type:"acessorios"}).toArray()
    } else {
      return res.status(404).send("Categoria indisponível!")
    }
    res.send(productsFiltered)
  } catch(err) {
    console.log(err)
  }
}
