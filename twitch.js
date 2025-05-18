// Подключение к Twitch чату с использованием tmi.js

function connectToTwitchChat() {
    try {
        const client = new tmi.Client({
            options: { debug: false },
            connection: {
                reconnect: true,
                secure: true
            },
            channels: ['andrusha_wav']
        });

        client.connect().catch(error => {
            console.error('Connection error:', error);
            addChatMessage('System', 'Ошибка подключения к чату: ' + error.message);
        });

        client.on('message', (channel, tags, message, self) => {
            // Игнорируем собственные сообщения и сообщения без имени пользователя
            if (self || !tags['display-name']) return;
            
            // Добавляем сообщение в чат
            addChatMessage(tags['display-name'], message);
        });

        client.on('connected', (address, port) => {
            console.log(`Connected to ${address}:${port}`);
            addChatMessage('System', 'Чат Twitch подключен. Ожидание сообщений...');
        });

        client.on('disconnected', (reason) => {
            console.log(`Disconnected: ${reason}`);
            addChatMessage('System', `Отключено от чата: ${reason}`);
        });

    } catch (error) {
        console.error('Error connecting to Twitch chat:', error);
        addChatMessage('System', 'Ошибка подключения к Twitch чату: ' + error.message);
    }
}