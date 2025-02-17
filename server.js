
import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()
const database = new DatabasePostgres
    

//Request Body - FAZ UMA REQUISIÇÃO DE PARAMETROS NO CORPO - onde envia os dados do formulario por exemplo. 
//POST ***************************************************
server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body
    
    await database.create({
        title,
        description,
        duration,
    })

    console.log(database.list())

    return reply.status(201).send()
})


server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search)

    return videos
})



//PUT ***************************************************
server.put('/videos/:id', async (request, reply) => {
    const videoID = request.params.id
    const { title, description, duration } = request.body
   
   
   await    database.update(videoID, {
            title,
            description,
            duration,
    })
    return reply.status(204).send()
    return videos
})


server.delete('/videos/:id', async (request, reply) => {
    const videoID = request.params.id
       
    await database.delete(videoID)

    return reply.status(204).send()
    
})


server.listen({
    port: process.env.PORT ?? 3000
})


//conectar ao github 1:14