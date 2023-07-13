import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"
import { db } from "../databaseConfig.js"

export const signUp = async (req, res) =>{
    const {name, email, password} = req.body
    try{
        const hash = bcrypt.hashSync(password, 10)
        const user = {name, email, password: hash}
        const checkDB = await db.collection('users').findOne({email})
        if(checkDB) return res.sendStatus(409)
        
        await db.collection('users').insertOne(user)
        res.sendStatus(201)
    } catch{
        res.sendStatus(400)
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await db.collection('users').findOne({email})
        if(!bcrypt.compareSync(password, user.password)) return res.sendStatus(401)
        const userID = user._id; 
        user.userID = userID
        user.token = uuid()
        delete user._id
        delete user.password
        const anotherSession = await db.collection('sessions').findOne({userID})
        if (anotherSession){
        await db.collection('sessions').deleteMany({userID})
        }
        await db.collection('sessions').insertOne(user)
        console.log(user)
        
        res.status(201).send(user.token)

    } catch{
        res.sendStatus(400)
    }
}