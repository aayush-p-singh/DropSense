let usageData = JSON.parse(localStorage.getItem("waterData")) || [90, 100, 110];
let chart;
let DAILY_LIMIT = 150;

window.onload = function () {
    let ctx = document.getElementById("myChart").getContext("2d");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: usageData.map((_, i) => i + 1),
            datasets: [{
                label: "Water Usage",
                data: usageData,
                borderColor: "#38bdf8",
                backgroundColor: "rgba(56,189,248,0.2)",
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: { color: "white" }
                }
            },
            scales: {
                x: { ticks: { color: "white" } },
                y: { ticks: { color: "white" } }
            }
        }
    });

    updateUI();
};

/* 🔥 Simulated Data */
function addUsage() {
    let newUsage;

    if (Math.random() > 0.7) {
        newUsage = 200; // spike
    } else {
        newUsage = Math.floor(Math.random() * 40) + 80;
    }

    addData(newUsage);
}

/* ✍️ Manual Input */
function addManual() {
    let input = document.getElementById("manualInput").value;

    if (input === "" || input <= 0) return;

    addData(Number(input));
    document.getElementById("manualInput").value = "";
}

/* 📊 Add Data + Save */
function addData(value) {
    usageData.push(value);

    localStorage.setItem("waterData", JSON.stringify(usageData));

    animateValue("usage", value);

    updateChart();
    updateUI();
}

/* 📈 Update Chart */
function updateChart() {
    chart.data.labels = usageData.map((_, i) => i + 1);
    chart.data.datasets[0].data = usageData;
    chart.update();
}

/* 🧠 Smart Detection */
function updateUI() {
    if (usageData.length < 2) return;

    let avg = getAverage(usageData);
    let stdDev = getStdDev(usageData);
    let current = usageData[usageData.length - 1];

    animateValue("average", Math.round(avg));

    let alertBox = document.getElementById("alert");

    if (current > avg + 2 * stdDev) {
        alertBox.innerText = "Leakage Detected 🚨";
        alertBox.className = "leak";
        showToast("🚨 Leakage Detected!");
    } 
    else if (current > DAILY_LIMIT) {
        alertBox.innerText = "Limit Exceeded ⚠️";
        alertBox.className = "leak";
        showToast("⚠️ Daily Limit Exceeded!");
    } 
    else {
        alertBox.innerText = "Normal ✅";
        alertBox.className = "normal";
    }
}

/* 📊 Helpers */
function getAverage(data) {
    return data.reduce((a, b) => a + b) / data.length;
}

function getStdDev(data) {
    let avg = getAverage(data);
    let variance = data.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / data.length;
    return Math.sqrt(variance);
}

/* 🔢 Animated Numbers */
function animateValue(id, end) {
    let element = document.getElementById(id);
    let start = Number(element.innerText) || 0;
    let duration = 500;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let value = Math.floor(start + (end - start) * (progress / duration));
        element.innerText = value;

        if (progress < duration) {
            requestAnimationFrame(step);
        } else {
            element.innerText = end;
        }
    }

    requestAnimationFrame(step);
}

/* 🚨 Toast Notification */
function showToast(message) {
    let toast = document.createElement("div");
    toast.innerText = message;
    toast.className = "toast";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
