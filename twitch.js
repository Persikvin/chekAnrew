document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.innerHTML = '<div class="chat-message">Подключение к Twitch IRC...</div>';

    const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

    socket.onopen = () => {
        socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
        socket.send('NICK justinfan12345'); // Анонимный ник
        socket.send('JOIN #andrusha_wav');   // Чат стримера
        addSystemMessage('[SYSTEM]', 'Подключено к Twitch IRC');
    };

    socket.onmessage = (event) => {
        const rawMessage = event.data.trim();

        // Отвечаем на PING
        if (rawMessage.startsWith('PING')) {
            socket.send('PONG :tmi.twitch.tv');
            return;
        }

        // Парсим сообщение
        if (rawMessage.includes('PRIVMSG')) {
            try {
                const username = extractUsername(rawMessage);
                const message = extractMessage(rawMessage);
                
                if (username && message) {
                    addChatMessage(username, message);
                }
            } catch (e) {
                console.error("Ошибка парсинга:", e);
            }
        }
    };

    socket.onerror = (error) => {
        addSystemMessage('[ERROR]', error.message || 'Неизвестная ошибка');
    };

    // Извлекаем никнейм из сообщения
    function extractUsername(rawMsg) {
        // Пытаемся получить display-name из тегов
        const tagsPart = rawMsg.split(';').find(tag => tag.startsWith('display-name='));
        if (tagsPart) {
            return tagsPart.split('=')[1];
        }
        
        // Если тегов нет, пробуем парсить старым способом
        return rawMsg.split('!')[0].slice(1);
    }

    // Извлекаем текст сообщения
    function extractMessage(rawMsg) {
        return rawMsg.split(':').slice(2).join(':').trim();
    }

    // Добавление сообщения в чат
    function addChatMessage(username, message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.textContent = `[CHAT] ${username}: ${message}`;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Системные сообщения
    function addSystemMessage(prefix, text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message system';
        messageElement.textContent = `${prefix} ${text}`;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});