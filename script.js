// ===== SHARED DATA =====
let readings = JSON.parse(localStorage.getItem("waterData")) || [90,100,110];
let reports = JSON.parse(localStorage.getItem("communityReports")) || [];
let chart;
let DAILY_LIMIT = 150;

// ===== TAB SWITCH =====
function showTab(id, btn){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));

  document.getElementById(id).classList.add('active');
  btn.classList.add('active');

  if(id==="advisory") refreshAdvisory();
}

// ===== CHART INIT =====
window.onload = () => {
  const ctx = document.getElementById("myChart");

  chart = new Chart(ctx,{
    type:"line",
    data:{
      labels: readings.map((_,i)=>i+1),
      datasets:[{
        label:"Usage",
        data:readings,
        borderColor:"#38bdf8"
      }]
    }
  });

  updateUI();
  displayReports();
};

// ===== DATA FUNCTIONS =====
function addUsage(){
  let val = Math.random()>0.7 ? 200 : Math.floor(Math.random()*40)+80;
  addData(val);
}

function addManual(){
  let val = document.getElementById("manualInput").value;
  if(!val) return;

  addData(Number(val));
}

function addData(val){
  readings.push(val);
  localStorage.setItem("waterData",JSON.stringify(readings));

  document.getElementById("usage").innerText = val;

  updateChart();
  updateUI();
  refreshAdvisory();
}

function updateChart(){
  chart.data.labels = readings.map((_,i)=>i+1);
  chart.data.datasets[0].data = readings;
  chart.update();
}

// ===== UI =====
function updateUI(){
  let avg = readings.reduce((a,b)=>a+b)/readings.length;
  let current = readings[readings.length-1];

  document.getElementById("average").innerText = Math.round(avg);

  let alert = document.getElementById("alert");

  if(current > avg*1.5){
    alert.innerText="Leakage 🚨";
    alert.className = "leak";
  }else{
    alert.innerText="Normal ✅";
    alert.className = "normal";
  }

  let percent = Math.min((current/DAILY_LIMIT)*100,100);
  document.getElementById("progress").style.width = percent+"%";
}

// ===== PREDICTION =====
function predictNext(){
  let avg = readings.reduce((a,b)=>a+b)/readings.length;
  let last = readings[readings.length-1];
  let prediction = Math.round((avg+last)/2);
  showPredictionModal(prediction);
}

function showPredictionModal(value){
  document.getElementById("prediction-value").innerText = value;
  document.getElementById("prediction-modal").classList.add("show");
}

function closePredictionModal(){
  document.getElementById("prediction-modal").classList.remove("show");
}

// ===== ADVISORY =====
function refreshAdvisory(){
  let avg = readings.reduce((a,b)=>a+b)/readings.length;

  document.getElementById("adv-summary").innerText =
    "Average: "+Math.round(avg)+"L";

  document.getElementById("adv-score").innerText =
    avg < 120 ? "Good 👍" : "Reduce usage ⚠️";
}

// ===== DISPLAY REPORTS =====
function displayReports(){
  let feed = document.getElementById("c-feed");
  feed.innerHTML = reports.map(r => `<b>${r.name}</b> (${r.area})<br>${r.desc}<hr>`).join('');
}

// ===== CHAT =====
async function sendChat(){
  let inp = document.getElementById("chat-input");
  let msg = inp.value.trim();
  if(!msg) return;

  let box = document.getElementById("chat-msgs");

  box.innerHTML += "<div><strong>You:</strong> "+msg+"</div>";
  inp.value = "";

  box.innerHTML += "<div><em>AI: Thinking...</em></div>";

  // NOTE: API key has been removed for security reasons.
  // In production, this should be handled server-side or use environment variables.
  // For demo purposes, we'll simulate a response.
  setTimeout(() => {
    let responses = [
      "Great question! To save water, try fixing leaky faucets and taking shorter showers.",
      "Remember to turn off the tap while brushing your teeth. It can save up to 8 liters per minute!",
      "Water conservation is key. Consider installing low-flow fixtures in your home.",
      "Check for leaks regularly. A dripping faucet can waste 20 liters per day.",
      "Use a bucket to collect water while showering to water plants later."
    ];
    let reply = responses[Math.floor(Math.random() * responses.length)];
    box.innerHTML = box.innerHTML.replace("<div><em>AI: Thinking...</em></div>", "<div><strong>AI:</strong> "+reply+"</div>");
    box.scrollTop = box.scrollHeight;
  }, 1000);

  /*
  // Original API call (commented out for security)
  try{
    const res = await fetch("https://api.x.ai/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY_HERE" // Replace with secure key
      },
      body: JSON.stringify({
        model: "grok-4.20-reasoning",
        messages: [
          {
            role: "system",
            content: "You are a water conservation assistant for India. Give short, practical advice."
          },
          {
            role: "user",
            content: msg
          }
        ]
      })
    });

    const data = await res.json();
    console.log(data);

    let reply =
  data?.choices?.[0]?.message?.content ||
  data?.choices?.[0]?.text ||
  "No response";

    box.innerHTML += "<div>AI: "+reply+"</div>";

  } catch(e){
    box.innerHTML += "<div>AI: Error connecting to Grok</div>";
  }
  */

  box.scrollTop = box.scrollHeight;
}

// ===== COMMUNITY =====
function submitReport(){
  let name = document.getElementById("r-name").value;
  let area = document.getElementById("r-area").value;
  let desc = document.getElementById("r-desc").value;

  if(!name||!area||!desc) return alert("Fill all");

  let report = {name, area, desc};
  reports.unshift(report); // Add to beginning
  localStorage.setItem("communityReports", JSON.stringify(reports));

  displayReports();

  // Clear inputs
  document.getElementById("r-name").value = "";
  document.getElementById("r-area").value = "";
  document.getElementById("r-desc").value = "";
}

fetch("https://opensheet.vercel.app/1pc-cOkvMEf3VBZ0LFtf4Mkel1vR5qXbPsxytVX5Ja_I/Sheet1")
  .then(res => res.json())
  .then(data => {
    let latest = data[data.length - 1];
    document.getElementById("flowValue").innerText = latest.Flow;
  });
