// Define all functions in the global scope first
function addChatMessage(username, message) {
    const chatContainer = document.getElementById('chat-messages');
    if (chatContainer) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `<span class="chat-username">${username}:</span> ${message}`;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

function connectToTwitchChat() {
    const channel = 'andrusha_wav';
    const nick = 'justinfan' + Math.floor(Math.random() * 10000);
    const ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

    // Event handlers as separate named functions
    function handleOpen() {
        addChatMessage('System', 'Подключаемся к Twitch IRC...');
        ws.send(`NICK ${nick}`);
        ws.send(`JOIN #${channel}`);
    }

    function handleMessage(event) {
        const message = event.data.trim();
        
        if (message.startsWith('PING')) {
            ws.send('PONG :tmi.twitch.tv');
            return;
        }
        
        const chatMsg = message.match(/^:([^!]+)!.*PRIVMSG #\w+ :(.+)$/);
        if (chatMsg) {
            addChatMessage(chatMsg[1], chatMsg[2]);
        }
        
        if (message.includes('Login authentication failed')) {
            addChatMessage('System', 'Ошибка: Анонимное подключение ограничено');
        }
    }

    function handleError(error) {
        addChatMessage('System', `Ошибка соединения: ${error.message}`);
    }

    function handleClose() {
        addChatMessage('System', 'Соединение с чатом закрыто');
    }

    // Assign event handlers
    ws.onopen = handleOpen;
    ws.onmessage = handleMessage;
    ws.onerror = handleError;
    ws.onclose = handleClose;
}

// Rest of your code...
function updateSystemStats() {
    // ... (existing implementation)
}

function init() {
    setInterval(updateSystemStats, 1000);
    updateSystemStats();
    connectToTwitchChat();
}

window.onload = init;