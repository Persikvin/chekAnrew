document.addEventListener('DOMContentLoaded', function() {
    const terminalOutput = document.getElementById('terminalOutput');
    
    function addLine(text) {
        const line = document.createElement('div');
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Проверка загрузки tmi.js
    if (typeof tmi === 'undefined') {
        addLine('[SYSTEM] Ошибка: Библиотека чата не загружена');
        startFakeChat();
        return;
    }

    // Функция для фейкового чата
    function startFakeChat() {
        const fakeUsers = ['Viewer_1', 'Fan_123', 'Anonymous'];
        const fakeMessages = [
            'Привет! Как дела?',
            'Крутой стрим!',
            'LUL'
        ];
        
        // Системные сообщения
        const systemMessages = [
            "SYSTEM: Донаты: " + (Math.random() > 0.5 ? "TRUE" : "FALSE"),
            "SYSTEM: CPU: " + Math.floor(Math.random() * 100) + "%"
        ];
        
        // Запускаем интервалы
        setInterval(() => {
            const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
            const msg = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
            addLine(`[CHAT] ${user}: ${msg}`);
        }, 3000);

        setInterval(() => {
            addLine(systemMessages[Math.floor(Math.random() * systemMessages.length)]);
        }, 8000);
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

        client.connect().catch(err => {
            addLine('[TWITCH] Ошибка подключения: ' + err.message);
            startFakeChat();
        });

        client.on('message', (channel, tags, message) => {
            addLine(`[CHAT] ${tags['display-name']}: ${message}`);
        });

    } catch (e) {
        addLine('[SYSTEM] Ошибка инициализации чата: ' + e.message);
        startFakeChat();
    }
});