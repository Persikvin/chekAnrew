const consoleEl = document.getElementById('console');

const fakeHardware = [
  "GPU: RTX " + (Math.random() > 0.5 ? "4090" : "3050 Ti"),
  "CPU: AMD Ryzen " + (Math.floor(Math.random() * 10) + 3) + " 5600X",
  "RAM: " + (8 + Math.floor(Math.random() * 24)) + "GB DDR4",
  "VRAM: " + (2 + Math.floor(Math.random() * 10)) + "GB",
  "Монитор: Dendy TV 640x480",
];

const viruses = [
  "Поиск вирусов...",
  "Вирусов найдено: " + Math.floor(Math.random() * 5),
  "Вирусов удалено: " + Math.floor(Math.random() * 5),
  "Состояние системы: " + (Math.random() > 0.5 ? "Удовлетворительное" : "Критическое"),
];

const donations = [
  "Проверка донатов...",
  "Последний донат: " + (Math.random() > 0.5 ? "500₽ от user1337" : "50₽ от kek_lol"),
  "Баланс счёта: " + (Math.floor(Math.random() * 9000) + 100) + "₽"
];

function generateSystemLine() {
  const sections = [fakeHardware, viruses, donations];
  let allLines = sections.flat();
  return allLines[Math.floor(Math.random() * allLines.length)];
}

function renderLine(line) {
  consoleEl.innerHTML += `\n> ${line}`;
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

setInterval(() => {
  renderLine(generateSystemLine());
}, 2000);
