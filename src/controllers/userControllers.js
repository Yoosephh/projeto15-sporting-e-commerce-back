import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../databaseConfig.js";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hash = bcrypt.hashSync(password, 10);
    const user = { name, email, password: hash, selectedProducts: [] };
    const checkDB = await db.collection("users").findOne({ email });
    if (checkDB) return res.sendStatus(409);

    await db.collection("users").insertOne(user);
    res.sendStatus(201);
  } catch {
    res.sendStatus(400);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.collection("users").findOne({ email });
    if (!bcrypt.compareSync(password, user.password))
      return res.sendStatus(401);
    const userID = user._id;
    user.userID = userID;
    user.token = uuid();
    delete user._id;
    delete user.password;
    const anotherSession = await db.collection("sessions").findOne({ userID });
    if (anotherSession) {
      await db.collection("sessions").deleteMany({ userID });
    }
    await db.collection("sessions").insertOne(user);
    console.log(user);

    res.status(201).send(user.token);
  } catch {
    res.sendStatus(400);
  }
};

export const myCart = async (req, res) => {
    const {token} = req.headers

    try{
        const {userID} = await db.collection('sessions').findOne({token})
        const {selectedProducts} = await db.collection('users').findOne({_id: userID})
        res.status(200).send(selectedProducts)
    } catch{
        res.sendStatus(400)
    }
}

export const userInfo = async (req, res) =>{
    const {token} = req.headers

    try{
        const {userID} = await db.collection('sessions').findOne({token})
        if(!userID) return res.sendStatus(425)
        const {name, email, selectedProducts} = await db.collection('users').findOne({_id: userID}) //ver quantidade de objetos iguais depois

        res.status(200).send({name, email, selectedProducts})
    } catch{
        res.sendStatus(400)
    }
}

export const newSelectedProducts = async (req, res) => {
    const {name, description, price, image} = req.body
    const {token} = req.headers
    const newProduct = {name, description, price, image}

    try{
        const {userID} = await db.collection('sessions').findOne({token})
        const {selectedProducts} = await db.collection('users').findOne({_id: userID})
        selectedProducts.push(newProduct)
        await db.collection('users').updateOne({_id: userID}, {$set:{selectedProducts}})
        console.log(await db.collection('users').findOne({_id: userID}))
        res.sendStatus(200)
    }catch{
        res.sendStatus(400)
    }
}