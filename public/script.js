/**
 * This script handles the interaction between the client and server via
 * WebSocket using Socket.IO.
 *
 * It initializes a connection to the server at 'http://localhost:3000'
 * and listens for the 'message' event. When this event is emitted by the
 * server, it updates the DOM with the message received.
 *
 * It also listens for the 'submit' event on the form element and prevents
 * the default form submission behavior. It retrieves the username and
 * message from the form inputs, creates a data object with these values,
 * and emits the 'message' event to the server with the data object as
 * payload.
 */

// Initialize a Socket.IO connection to the server
const socket = io('http://localhost:3000')

// Handle form submission
document.querySelector('form').addEventListener('submit', e => {
    // Prevent the form from submitting
    e.preventDefault()

    // Get the username and message from the form inputs
    const username = socket.id
    const message = document.querySelector('#newMessage').value
    const nameDiv = document.querySelector('#username')
    nameDiv.innerHTML = `<h4>${username}<h4>`
    // Create a data object with the username and message
    const data = { username, message }

    // Log the message being sent to the server
    console.log(`Sending message: ${data.username}: ${data.message}`)

    // Emit the 'message' event to the server with the data object as payload
    socket.emit('message', data)
})

// Handle the 'message' event from the server
socket.on('message', data => {
    // Get the messages div element
    const messagesDiv = document.getElementById('allPosts')

    // Create a new paragraph element with the message
    const p = document.createElement('p')
    p.innerHTML = `${data.username}: ${data.message}`

    // Append the new paragraph element to the messages div
    messagesDiv.appendChild(p)
})
