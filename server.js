/**
 * This is the server-side code for the Simple WebSocket Chat application.
 * It sets up an Express server and a Socket.IO server, and listens for
 * connections from clients. When a client connects, it logs the connection
 * and emits a 'Welcome' event to the client with some sample data.
 *
 * It also listens for the 'thankYou' event from the client and logs the data
 * received. It listens for the 'message' event from the client and logs the
 * data received. It broadcasts the message to all other clients using the
 * 'message' event.
 */

// Set up Express JS
// import express for use
const express = require('express')

// create an instance of express
const app = express()

const port = process.env.PORT

// set express to serve the public folder
app.use(express.static('public'))
// Server on port 3000
const expressServer = app.listen(port)

// Set up Socket.IO
const socketIO = require('socket.io')
// create an instance of Socket
const io = socketIO(expressServer, {

})

io.on('connect', socket => {
    // Log the connection when a client connects
    console.log(`Connection is live on id number ${socket.id}`)
    // Emit the 'Welcome' event with some sample data to the client
    socket.emit('Welcome', "Welcome to the chat!")

    // Listen for the 'message' event from the client and log the data
    // Broadcast the message to all other clients using the 'message' event
    socket.on('message', data => {
        console.log(data)
        io.emit('message', data)
    })
})
