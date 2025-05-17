const terminalOutput = document.getElementById('terminalOutput');
const beepSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...');

function typeText(text, speed = 20, callback = null) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            terminalOutput.innerHTML += text.charAt(i);
            i++;
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            
            if (Math.random() < 0.1) {
                beepSound.currentTime = 0;
                beepSound.play().catch(e => console.log("Audio error:", e));
            }
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
}

function addLine(text, speed = 20, callback = null) {
    terminalOutput.innerHTML += '<br>';
    typeText(text, speed, callback);
}

// Имитация загрузки системы
setTimeout(() => {
    typeText('Initializing BIOS... OK', 50, () => {
        setTimeout(() => {
            addLine('Checking RAM... 4096MB OK', 30, () => {
                setTimeout(() => {
                    addLine('Detecting CPU... Intel Core i7-13700K @ 5.4GHz', 30, () => {
                        setTimeout(() => {
                            addLine('ANDRUSHA_SYSTEM v1.3.7 READY', 30);
                        }, 1000);
                    });
                }, 800);
            });
        }, 400);
    });
}, 200);