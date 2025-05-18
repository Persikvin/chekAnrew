document.addEventListener('DOMContentLoaded', function() {
    const terminalOutput = document.getElementById('terminalOutput');
    
    // Функция для добавления текста с автоскроллом
    function addLine(text) {
        const line = document.createElement('div');
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Системные сообщения
    const systemMessages = [
        "SYSTEM: Обнаружен майнер! PID: " + Math.floor(Math.random()*9000+1000),
        "SYSTEM: Статус донатов: " + (Math.random() > 0.5 ? "TRUE" : "FALSE"),
        "MEMORY: " + Math.floor(Math.random()*3000+1000) + "MB/" + Math.floor(Math.random()*8000+4000) + "MB",
        "CPU: " + Math.floor(Math.random()*100) + "% load",
        "NETWORK: Пинг " + Math.floor(Math.random()*50+10) + "мс"
    ];

    // Запускаем системные сообщения
    const systemInterval = setInterval(() => {
        addLine(systemMessages[Math.floor(Math.random()*systemMessages.length)]);
    }, 8000);

    // Twitch Chat
    try {
        const client = new tmi.Client({
            channels: ['andrusha_wav'],
            connection: {
                reconnect: true,
                secure: true
            },
            options: {
                debug: true // Включите для отладки
            }
        });

        client.connect().catch(err => {
            addLine('[TWITCH] Ошибка подключения: ' + err);
        });

        client.on('message', (channel, tags, message) => {
            addLine(`[CHAT] ${tags['display-name']}: ${message}`);
        });

        client.on('connected', (addr, port) => {
            addLine(`[TWITCH] Подключено к ${addr}:${port}`);
        });

        client.on('disconnected', (reason) => {
            addLine('[TWITCH] Отключено: ' + reason);
        });

    } catch (e) {
        addLine('[SYSTEM] Ошибка: ' + e.message);
        addLine('[SYSTEM] Используется оффлайн-режим');
        
        // Фейковые сообщения чата, если Twitch недоступен
        const fakeChatInterval = setInterval(() => {
            const fakeUsers = ['Persikvin', 'br3vil', 'Oriy McAron', 'DasNuk'];
            const fakeMessages = [
                'Опять игнорит((((',
                'КАЗУАЛ',
                'СРОЧНИК',
                'Когда новый видос???',
                'Крутой стрим!'
            ];
            const user = fakeUsers[Math.floor(Math.random()*fakeUsers.length)];
            const msg = fakeMessages[Math.floor(Math.random()*fakeMessages.length)];
            addLine(`[CHAT] ${user}: ${msg}`);
        }, 3000);
    }

    // Первое системное сообщение после загрузки
    setTimeout(() => {
        addLine(systemMessages[0]);
    }, 1000);
});