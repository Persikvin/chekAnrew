const terminalOutput = document.getElementById('terminalOutput');

function typeText(text, speed = 20, callback = null) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            terminalOutput.innerHTML += text.charAt(i);
            i++;
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
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
                            addLine('ANDREW_SYSTEM v1.3.7 READY', 30);
                        }, 1000);
                    });
                }, 800);
            });
        }, 400);
    });
}, 200);