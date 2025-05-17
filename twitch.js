// Подключение к Twitch чату через tmi.js
const client = new tmi.Client({
  channels: ['andrusha_wav']
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  if (self) return;
  const name = tags['display-name'] || tags['username'];
  renderLine(`[чат] ${name}: ${message}`);
});
