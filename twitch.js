document.addEventListener('DOMContentLoaded', function() {
    const terminalOutput = document.getElementById('terminalOutput');
    
    function addLine(text) {
        const line = document.createElement('div');
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Проверяем загрузилась ли библиотека
    if (typeof tmi === 'undefined') {
        addLine('[SYSTEM] Ошибка: Библиотека чата не загружена');
        addLine('[SYSTEM] Включен оффлайн-режим');
        startFakeChat();
        return;
    }

    // Реальный чат Twitch
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

    // Фейковый чат для оффлайн-режима
    function startFakeChat() {
        const fakeUsers = ['Viewer_1', 'Fan_123', 'Anonymous', 'Subscriber'];
        const fakeMessages = [
            'Привет! Как дела?',
            'Крутой стрим!',
            'LUL',
            'Когда новая музыка?',
            'Покажи гитару'
        ];
        
        setInterval(() => {
            const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
            const msg = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
            addLine(`[CHAT] ${user}: ${msg}`);
        }, 3000);

        // Системные сообщения
        const systemMessages = [
            "SYSTEM: Статус донатов: " + (Math.random() > 0.5 ? "TRUE" : "FALSE"),
            "SYSTEM: CPU: " + Math.floor(Math.random() * 100) + "%",
            "SYSTEM: Обнаружен майнер (PID: " + Math.floor(Math.random() * 9000 + 1000) + ")"
        ];
        
        setInterval(() => {
            addLine(systemMessages[Math.floor(Math.random() * systemMessages.length)]);
        }, 8000);
    }
});