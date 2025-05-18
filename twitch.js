const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

socket.onopen = () => {
  socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
  socket.send('PASS justinfan12345'); // Анонимный пароль
  socket.send('NICK justinfan12345'); // Анонимный ник
  socket.send('JOIN #andrusha_wav');  // Подключаемся к каналу
  addLine('[SYSTEM] Подключение к чату...');
};

socket.onmessage = (event) => {
  if (event.data.includes('PRIVMSG')) {
    const parts = event.data.split(';');
    const user = parts.find(p => p.startsWith('display-name='))?.split('=')[1] || 'Аноним';
    const message = event.data.split('PRIVMSG #andrusha_wav :')[1];
    addLine(`[CHAT] ${user}: ${message}`);
  }
  // Ответ на PING (обязательно)
  if (event.data.startsWith('PING')) {
    socket.send('PONG :tmi.twitch.tv');
  }
};

socket.onerror = (error) => {
  addLine('[SYSTEM] Ошибка соединения: ' + error.message);
};