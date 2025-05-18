// Фейковые системные статусы (оставляем без изменений)
function updateSystemStats() {
    // ... (прежний код)
}

// Подключение к IRC WebSocket Twitch
function connectToTwitchChat() {
    const channel = 'andrusha_wav';
    const nick = 'justinfan' + Math.floor(Math.random() * 10000);
    
    const ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
    
    ws.onopen = () => {
        addChatMessage('System', 'Подключаемся к Twitch IRC...');
        ws.send(`NICK ${nick}`);
        ws.send(`JOIN #${channel}`);
    };
    
    ws.onmessage = (event) => {
        const message = event.data.trim();
        
        // Ping-Pong для поддержания соединения
        if (message.startsWith('PING')) {
            ws.send('PONG :tmi.twitch.tv');
            return;
        }
        
        // Парсинг сообщений чата
        const chatMsg = message.match(/^:([^!]+)!.*PRIVMSG #\w+ :(.+)$/);
        if (chatMsg) {
            const username = chatMsg[1];
            const text = chatMsg[2];
            addChatMessage(username, text);
        }
        
        // Системные сообщения
        if (message.includes('Login authentication failed')) {
            addChatMessage('System', 'Ошибка: Анонимное подключение ограничено');
        }
    };
    
    ws.onerror = (error) => {
        addChatMessage('System', `Ошибка соединения: ${error.message}`);
    };
    
    ws.onclose = () => {
        addChatMessage('System', 'Соединение с чатом закрыто');
    };
}

// Инициализация
function init() {
    setInterval(updateSystemStats, 1000);
    updateSystemStats();
    connectToTwitchChat();
}

window.onload = init;