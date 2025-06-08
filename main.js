import { Server } from './fetch.js';
const server = new Server()
const login = document.querySelector('#help')
const ws = new WebSocket(`wss://beep-me-api.onrender.com/ws/chat/chat_1_2/?token=${localStorage.getItem('access_token')}`)
const input = document.querySelector("#help")  
const send = document.querySelector(".send")
const inbox = document.querySelector("ul")
ws.onopen = () => {
	send.disabled = false
}

send.addEventListener("click", () => {
	const data = input.value
	if (data === '') {
		return
	}
	ws.send(JSON.stringify({ "message": data }))
	input.value = ''
})

ws.onmessage = (event) => {
	const data = JSON.parse(event.data)
	const list = document.createElement("li")
	list.textContent = data.message
	inbox.appendChild(list)
}

ws.onerror = () => { inbox.textContent = 'error' }
ws.onclose = () => {
	inbox.textContent = 'connection closed'
}
//home()
login.addEventListener('click', () => {server.login('juwon33','', "framework")})
