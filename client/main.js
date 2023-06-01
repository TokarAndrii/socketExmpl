import { io } from "socket.io-client"

const form = document.getElementById("chat-form")
const messageInput = document.getElementById("message-input")
const messagesContainer = document.getElementById("messages-container")
const joinRoomBtn = document.getElementById("join-room-btn")
const joinRoomInput = document.getElementById("join-room-input")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const message = messageInput.value
  const room = joinRoomInput.value
  console.log("room", room)

  if (message) {
    displayMessage(message)
    socket.emit("send-message", message, room)
    messageInput.value = ""
    joinRoomInput.value = ""
  }
})

function displayMessage(message) {
  messagesContainer.innerHTML += `<div>${message}<br><div>`
}

joinRoomBtn.addEventListener("click", () => {
  const room = joinRoomInput.value
  console.log("room", room)
  socket.emit("join-room", room, displayMessage)
  joinRoomInput.value = ""
})

const socket = io("http://localhost:3000")

socket.on("connect", () => {
  //console.log(`you connected with id ${socket.id}`)
  displayMessage(`you connected with id ${socket.id}`)
})

socket.on("receive-message", (message) => {
  console.log("receive-message", message)
  displayMessage(message)
})

// socket.emit("custom-event", { message: "custom-event" })
