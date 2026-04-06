# DropSense

DropSense is a simple web-based dashboard for monitoring water usage and detecting potential leaks. It displays the latest usage reading and compares it against previous values to determine whether the current usage is unusually high.

## What it does

- Shows the latest water usage in liters
- Simulates new usage readings with a button click
- Detects potential leakage when current usage spikes significantly above the recent average
- Displays a friendly alert if usage is normal or if a leak may be present

## Files

- `index.html` — main dashboard page
- `style.css` — visual styling and layout
- `script.js` — usage simulation and leakage detection logic

## How to run

1. Open `index.html` in a web browser.
2. Click the **Add New Usage** button to simulate a new water usage reading.
3. Watch the dashboard update the current value and display a normal/alert status.

## Notes

- Usage data is currently simulated using random values.
- Leakage detection is based on whether the newest reading exceeds 150% of the average of previous readings.
- This project is a lightweight proof of concept and can be extended with real sensor input, historical charts, and persistent data storage.
