let development = {
	intent: {
		url: "ws://localhost:3003"
	}
}

let production = {
	intent: {
		url: "wss://scalereach.team:5732"
	}
}

export default process.env.NODE_ENV === "production" ? production : development