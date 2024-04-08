const prisma = require('../lib/prisma')
const express = require('express')
const {z} = require('zod')

const router = express.Router()

// Rota para postar denúcias
router.post('/', async (req,res) =>{
    const deniciasSchema = z.object({
        title: z.string(),
        latitude: z.string(),
        longitude: z.string(),
        description: z.string()
    })

    try{
    const {title,latitude,longitude,description} = deniciasSchema.parse(req.body)

    const denucia = await prisma.denucia.create({
        data:{
            title,
            latitude,
            longitude,
            description
        }
    })

    res.status(201)
    }catch (error){
        res.status(400).json({error: 'Dados inválidos no corpo da solicitação'})
    }

})

module.exports = router