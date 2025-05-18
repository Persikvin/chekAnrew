// Подключение к Twitch IRC через WebSocket (без OAuth)
document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.innerHTML = '<div class="chat-message">Подключение к IRC Twitch...</div>';

    // WebSocket подключение к Twitch IRC (анонимно)
    const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

    socket.onopen = () => {
        // Анонимное подключение (без логина)
        socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
        socket.send('NICK justinfan12345'); // Анонимный ник (фиксированный)
        socket.send('JOIN #andrusha_wav'); // Подключаемся к чату стримера
        addChatMessage('Система', 'Подключено к IRC Twitch', true);
    };

    socket.onmessage = (event) => {
        const message = event.data.trim();

        // Игнорируем PING-запросы (отвечаем PONG)
        if (message.startsWith('PING')) {
            socket.send('PONG :tmi.twitch.tv');
            return;
        }

        // Парсим сообщения из чата (формат: `user!user@user.tmi.twitch.tv PRIVMSG #channel :text`)
        if (message.includes('PRIVMSG')) {
            const parts = message.split(' ');
            const user = parts[0].split('!')[0].slice(1); // Извлекаем имя пользователя
            const text = message.split(':').slice(2).join(':').trim(); // Извлекаем текст сообщения
            addChatMessage(user, text);
        }
    };

    socket.onerror = (error) => {
        addChatMessage('Система', `Ошибка: ${error.message || 'Неизвестная ошибка'}`, true);
    };

    socket.onclose = () => {
        addChatMessage('Система', 'Отключено от IRC', true);
    };

    function addChatMessage(user, message, isSystem = false) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        
        if (isSystem) {
            messageElement.innerHTML = `<span style="color: #0f0">${user}: ${message}</span>`;
        } else {
            messageElement.innerHTML = `<span style="color: #ff0">${user}:</span> ${message}`;
        }
        
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});