let usageData = [90, 100, 110];

let chart;

window.onload = function () {
    let ctx = document.getElementById("myChart").getContext("2d");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: usageData.map((_, i) => i + 1),
            datasets: [{
                label: "Water Usage",
                data: usageData,
                borderColor: "#0077b6",
                backgroundColor: "rgba(0,119,182,0.2)",
                tension: 0.4,
                fill: true
            }]
        }
    });

    checkLeakage();
};

function addUsage() {
    let newUsage;

    // 30% chance of leakage spike
    if (Math.random() > 0.7) {
        newUsage = 200;
    } else {
        newUsage = Math.floor(Math.random() * 40) + 80;
    }

    usageData.push(newUsage);

    document.getElementById("usage").innerText = newUsage;

    updateChart();
    checkLeakage();
}

function updateChart() {
    chart.data.labels = usageData.map((_, i) => i + 1);
    chart.data.datasets[0].data = usageData;
    chart.update();
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
