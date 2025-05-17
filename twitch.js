const terminalOutput = document.getElementById('terminalOutput');

const systemMessages = [
    "SYSTEM: Найден майнер! Процесс убит (PID: " + Math.floor(Math.random()*9000+1000) + ")",
    "SYSTEM: Статус донатов: " + (Math.random() > 0.5 ? "TRUE" : "FALSE"),
    "MEMORY: Allocation: " + Math.floor(Math.random()*3000+1000) + "MB/" + Math.floor(Math.random()*8000+4000) + "MB",
    "CPU: Load: " + Math.floor(Math.random()*100) + "%",
    "NETWORK: Packet loss: " + Math.floor(Math.random()*5) + "%",
    "SYSTEM: Integrity check... " + (Math.random() > 0.3 ? "PASSED" : "FAILED")
];

function addLine(text) {
    const line = document.createElement('div');
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Twitch чат
const client = new tmi.Client({
    channels: ['andrusha_wav'],
    connection: {
        reconnect: true,
        secure: true
    }
});

client.connect().catch(err => {
    addLine('[TWITCH] Connection error: ' + err);
});

client.on('connected', () => {
    addLine('[TWITCH] Connected to chat');
});

client.on('message', (channel, tags, message) => {
    addLine(`[CHAT] ${tags['display-name']}: ${message}`);
});

// Системные сообщения
setInterval(() => {
    addLine(systemMessages[Math.floor(Math.random()*systemMessages.length)]);
}, 10000);