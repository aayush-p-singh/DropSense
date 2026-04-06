let usageData = [90, 100, 110];

function addUsage() {
    let newUsage = Math.floor(Math.random() * 100) + 80;
    usageData.push(newUsage);

    document.getElementById("usage").innerText = newUsage;

    checkLeakage();
}

function checkLeakage() {
    let avg = usageData.slice(0, -1).reduce((a, b) => a + b) / (usageData.length - 1);
    let current = usageData[usageData.length - 1];

    if (current > avg * 1.5) {
        document.getElementById("alert").innerText = "⚠️ Leakage detected!";
    } else {
        document.getElementById("alert").innerText = "✅ Usage normal";
    }
}