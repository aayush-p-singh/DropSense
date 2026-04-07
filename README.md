# DropSense

DropSense is a modern web-based dashboard for monitoring water usage and detecting potential leaks. It displays real-time usage readings, historical trends, and provides AI-powered advisory along with community engagement features. Built with a beautiful, responsive UI and local data persistence.

## Features

- **Real-time Monitoring**: Shows current water usage in liters with live updates
- **Historical Trends**: Interactive chart displaying usage over time using Chart.js
- **Leak Detection**: Automatically detects potential leaks using statistical analysis
- **Daily Limit**: Visual progress bar and alerts when usage exceeds 150 liters
- **Usage Prediction**: AI-powered prediction system with beautiful modal display
- **Manual Input**: Allows manual entry of usage readings
- **Data Persistence**: Stores usage data locally using browser localStorage
- **AI Advisory**: Provides conservation tips and usage analysis with simulated AI responses
- **Community Reports**: Share water conservation tips and issues with persistent storage
- **Responsive Design**: Modern, animated UI with smooth transitions and visual feedback

## What it does

- **Prediction Tab**: Displays current and average water usage, predicts next usage trends in a modal popup
- **Simulates Usage**: Generates new readings with random values or manual input
- **Detects Leaks**: Flags abnormal consumption patterns above 1.5x average usage
- **Visual Analytics**: Interactive chart showing usage trends over time
- **Status Alerts**: Real-time indicators for normal usage, detected leaks, or exceeded limits
- **AI Advisory**: Provides personalized water conservation recommendations
- **Community Engagement**: Submit and view water conservation tips from your community with persistent storage
- **Data Persistence**: All usage data and community reports persist across browser sessions

## Files

- `index.html` — Main dashboard with prediction, advisory, and community sections
- `style.css` — Modern styling with animations, gradients, and responsive layout
- `script.js` — Core logic including usage tracking, predictions, leak detection, and data persistence

## Dependencies

- [Chart.js](https://www.chartjs.org/) — For rendering usage trend charts (loaded via CDN)

No backend or additional npm packages required!

## How to run

1. Open `index.html` in a modern web browser.
2. Click the **➕ Simulate Usage** button to generate a new random water usage reading.
3. Alternatively, enter a value in the input field and click **Add Manual** to add a specific reading.
4. Watch the dashboard update with the new values, status, and chart.
5. Data is automatically saved and will persist between browser sessions.

## Leakage Detection Algorithm

- **Normal**: Current usage ≤ 1.5 × average usage
- **Leakage Detected 🚨**: Current usage > 1.5 × average usage
- **Limit Exceeded**: Current reading > 150 liters

This statistical approach helps identify anomalies in water consumption patterns.

## Notes

- All data is stored locally in browser localStorage — no server required
- Perfect for home use or small-scale water monitoring
- Community reports help users share water conservation strategies
- Usage data and community reports persist until localStorage is manually cleared
- The daily limit (150L) and other thresholds can be adjusted in `script.js`

## Future Enhancements

- Real IoT sensor integration for actual water meter data
- User authentication and multi-user support
- Cloud storage and historical data analysis
- Mobile app companion
- Email/SMS alerts for leak detection
- Water usage statistics and reports
- Real AI API integration (currently using simulated responses)
- Export data to CSV/PDF
