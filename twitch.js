const terminalOutput = document.getElementById('terminalOutput');

// Системные сообщения
const systemMessages = [
    "SYSTEM: Обнаружен майнер! PID: " + Math.floor(Math.random()*9000+1000),
    "SYSTEM: Статус донатов: " + (Math.random() > 0.5 ? "TRUE" : "FALSE"),
    "MEMORY: " + Math.floor(Math.random()*3000+1000) + "MB/" + Math.floor(Math.random()*8000+4000) + "MB",
    "CPU: " + Math.floor(Math.random()*100) + "% load"
];

function addLine(text) {
    const line = document.createElement('div');
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Twitch Chat
try {
    const client = new tmi.Client({
        channels: ['andrusha_wav'],
        connection: {
            reconnect: true,
            secure: true
        },
        options: {
            debug: false
        }
    });

    client.connect().then(() => {
        addLine('[TWITCH] Подключение успешно');
    }).catch(err => {
        addLine('[TWITCH] Ошибка подключения: ' + err.message);
    });

    client.on('message', (channel, tags, message) => {
        addLine(`[CHAT] ${tags['display-name']}: ${message}`);
    });

    client.on('connected', () => {
        addLine('[TWITCH] Соединение установлено');
    });

    // Системные сообщения
    setInterval(() => {
        addLine(systemMessages[Math.floor(Math.random()*systemMessages.length)]);
    }, 8000);

} catch (e) {
    addLine('[SYSTEM] Критическая ошибка: ' + e.message);
}