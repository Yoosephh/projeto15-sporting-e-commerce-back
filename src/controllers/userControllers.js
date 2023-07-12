import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"
import { db } from "../database.js"

export const signUp = async (req, res) =>{
    const {name, email, password} = req.body
    const user = {name, email, password}
    try{
        const hash = bcrypt.hashSync(password, 10)
        await db.collection('users').insertOne(user)
        res.sendStatus(200)
    } catch{
        res.sendStatus(400)
    }
}