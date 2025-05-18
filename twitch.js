document.addEventListener('DOMContentLoaded', function() {
    const terminalOutput = document.getElementById('terminalOutput');
    
    // Функция добавления сообщения
    function addLine(text) {
        const line = document.createElement('div');
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Фейковый чат (на случай ошибок)
    function startFakeChat() {
        const fakeUsers = ['Viewer_1', 'Fan_007', 'Anonymous'];
        const fakeMessages = [
            'Привет стример!',
            'Как дела?',
            'LUL',
            'Крутой стрим!'
        ];
        const systemMessages = [
            "SYSTEM: Донаты: " + (Math.random() > 0.5 ? "TRUE" : "FALSE"),
            "SYSTEM: CPU: " + Math.floor(Math.random() * 100) + "%",
            "SYSTEM: Обнаружен майнер (PID: " + Math.floor(Math.random() * 9000 + 1000) + ")"
        ];

        // Интервал для фейковых сообщений
        setInterval(function() {
            const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
            const msg = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
            addLine(`[CHAT] ${user}: ${msg}`);
        }, 3000);

        // Интервал для системных сообщений
        setInterval(function() {
            addLine(systemMessages[Math.floor(Math.random() * systemMessages.length)]);
        }, 8000);
    }

    // Проверка загрузки tmi.js
    if (typeof tmi === 'undefined') {
        addLine('[SYSTEM] Ошибка: tmi.js не загружен');
        startFakeChat();
        return;
    }

    // Подключение к реальному чату
    try {
        const client = new tmi.Client({
            channels: ['andrusha_wav'],
            connection: {
                reconnect: true,
                secure: true
            }
        });

        client.connect().catch(function(err) {
            addLine('[TWITCH] Ошибка подключения: ' + err.message);
            startFakeChat();
        });

        client.on('message', function(channel, tags, message) {
            addLine(`[CHAT] ${tags['display-name']}: ${message}`);
        });

        client.on('connected', function() {
            addLine('[TWITCH] Чат подключен');
        });

    } catch (e) {
        addLine('[SYSTEM] Ошибка: ' + e.message);
        startFakeChat();
    }
});