async function home() {
	const data = await fetch('https://beep-me-api.onrender.com/api/auth/login/', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			//"Authorization": `Bearer ${localStorage.getItem("access_token")}`
		},
		body: JSON.stringify({
			email: 'juwonchina@gmail.com',
			password: "application"
			
		})
	})
	const json = await data.json()
	console.log(json)
	localStorage.setItem("access_token", json.access)
	localStorage.setItem("refresh_token", json.refresh)
	
}
const login = document.querySelector('.login')
const ws = new WebSocket(`wss://beep-me-api.onrender.com/ws/chat/testing/?token=${localStorage.getItem('access_token')}`)
const input = document.querySelector("#help")
const send = document.querySelector(".send")
const inbox = document.querySelector("ul")
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

login.addEventListener('click', home)
