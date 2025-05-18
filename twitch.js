document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.innerHTML = '<div class="chat-message">Подключение к Twitch IRC...</div>';

    const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

    socket.onopen = () => {
        socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
        socket.send('NICK justinfan12345'); // Анонимный ник
        socket.send('JOIN #andrusha_wav');   // Чат стримера
        addSystemMessage('Система', 'Подключено к Twitch IRC');
    };

    socket.onmessage = (event) => {
        const rawMessage = event.data.trim();

        // Отвечаем на PING, чтобы соединение не разрывалось
        if (rawMessage.startsWith('PING')) {
            socket.send('PONG :tmi.twitch.tv');
            return;
        }

        // Парсим сообщение с тегами (если есть @metadata)
        if (rawMessage.includes('PRIVMSG')) {
            try {
                const parsed = parseTwitchMessage(rawMessage);
                if (parsed.username && parsed.message) {
                    addChatMessage(parsed.username, parsed.message, parsed.color);
                }
            } catch (e) {
                console.error("Ошибка парсинга:", e);
            }
        }
    };

    socket.onerror = (error) => {
        addSystemMessage('Ошибка', error.message || 'Неизвестная ошибка');
    };

    // Функция для парсинга сырого IRC-сообщения
    function parseTwitchMessage(rawMsg) {
        const metaPart = rawMsg.split('PRIVMSG')[0].trim();
        const messagePart = rawMsg.split('PRIVMSG')[1].split(':').slice(1).join(':').trim();

        // Извлекаем display-name из тегов
        const tagsPart = metaPart.split(';').find(tag => tag.startsWith('display-name='));
        const username = tagsPart ? tagsPart.split('=')[1] : metaPart.split('!')[0].slice(1);

        // Извлекаем цвет (если есть)
        const colorTag = metaPart.split(';').find(tag => tag.startsWith('color='));
        const color = colorTag ? colorTag.split('=')[1] : '#FFFFFF';

        return { username, message: messagePart, color };
    }

    // Добавление сообщения в чат
    function addChatMessage(username, message, color = '#FFFFFF') {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `
            <span style="color: ${color}">${username}:</span> ${message}
        `;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Системные сообщения (зелёные)
    function addSystemMessage(sender, text) {
        addChatMessage(sender, text, '#00FF00');
    }
});