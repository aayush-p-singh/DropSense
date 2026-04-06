# DropSense

DropSense is a simple web-based dashboard for monitoring water usage and detecting potential leaks. It displays real-time usage readings, historical trends, and alerts for abnormal consumption patterns.

## Features

- **Real-time Monitoring**: Shows current water usage in liters
- **Historical Trends**: Interactive chart displaying usage over time using Chart.js
- **Leak Detection**: Automatically detects potential leaks using statistical analysis (standard deviation)
- **Daily Limit**: Alerts when usage exceeds the daily limit of 150 liters
- **Manual Input**: Allows manual entry of usage readings
- **Data Persistence**: Stores usage data locally using browser localStorage
- **Responsive Design**: Clean, modern UI with animated updates and notifications

## What it does

- Displays current and average water usage
- Simulates new usage readings with random values or manual input
- Detects potential leakage when current usage spikes significantly above the recent average
- Shows a visual chart of usage trends
- Provides status alerts for normal usage, detected leaks, or exceeded limits
- Persists data across browser sessions

## Files

- `index.html` — Main dashboard page with HTML structure
- `style.css` — Visual styling and responsive layout
- `script.js` — Usage simulation, leakage detection logic, and chart management

## Dependencies

- [Chart.js](https://www.chartjs.org/) — For rendering the usage trend chart (loaded via CDN)

## How to run

1. Open `index.html` in a modern web browser.
2. Click the **➕ Simulate Usage** button to generate a new random water usage reading.
3. Alternatively, enter a value in the input field and click **Add Manual** to add a specific reading.
4. Watch the dashboard update with the new values, status, and chart.
5. Data is automatically saved and will persist between browser sessions.

## Leakage Detection Algorithm

- Calculates the average and standard deviation of all usage readings
- Flags as "Leakage Detected" if current reading > average + 2 × standard deviation
- Flags as "Limit Exceeded" if current reading > 150 liters
- Otherwise shows "Normal" status

## Notes

- Usage data is stored locally in the browser's localStorage
- Leakage detection uses statistical methods for anomaly detection
- The daily limit is set to 150 liters but can be adjusted in the code
- This project serves as a proof of concept and can be extended with:
  - Real sensor integration (IoT devices)
  - Historical data analysis
  - User authentication and multi-user support
  - Cloud data storage and synchronization
  - Mobile app companion
