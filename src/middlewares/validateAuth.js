import { db } from "../database.js"
export async function validateAuth (req, res, next){
    const {token} = req.headers
    if (!token) return res.sendStatus(401)
    try{
        const loggedUser = await db.collection('sessions').findOne({token})
        if(!loggedUser) return res.sendStatus(422)
        next()
    } catch(err){
        res.send(err.message).status(404)
    }

}