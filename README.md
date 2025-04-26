🚨 Industrial Gas Monitoring System Using IoT
📋 Project Overview
This project focuses on real-time gas and environmental monitoring in industrial areas using IoT technologies. It uses gas sensors (MQ135, MQ2, MQ9) along with humidity and temperature sensors connected to an ESP8266 NodeMCU. The data is transmitted wirelessly to Firebase Realtime Database and visualized on a web dashboard. Alerts are generated if gas concentrations or temperatures exceed defined safety thresholds.

🛠️ Tools and Technologies Used
Hardware:

ESP8266 NodeMCU

MQ135 Gas Sensor (Air Quality)

MQ2 Gas Sensor (Smoke, Methane, LPG)

MQ9 Gas Sensor (Carbon Monoxide, Methane, LPG)

DHT11/DHT22 (Temperature and Humidity Sensor)

Software:

Arduino IDE (Microcontroller programming)

Firebase Realtime Database (Cloud database)

HTML, CSS, JavaScript (Web dashboard)

Firebase Web SDK (Front-end connection)

🔗 System Architecture
Sensors detect gas concentration, humidity, and temperature.

ESP8266 collects sensor data and uploads it to Firebase over WiFi.

A website fetches the real-time data from Firebase.

Thresholds are set for each sensor; crossing the limit triggers visual alerts.


⚙️ Methodology
Sensor Node Setup: MQ sensors and DHT sensor connected to ESP8266.

Firmware Development: Programmed using Arduino IDE to collect and send data.

Cloud Storage: ESP8266 sends real-time readings to Firebase.

Dashboard Development: Front-end website displays live sensor data with filtering and alert options.

Alert Mechanism: Automatic warnings pop-up if thresholds are exceeded.

📊 Results
Real-time environmental and gas monitoring achieved.

Alerts triggered successfully when unsafe gas levels detected.

Reliable data synchronization between ESP8266, Firebase, and website.

🚀 How to Set Up
Set up Firebase project and get database URL and API keys.

Flash ESP8266 with Arduino sketch (using your WiFi and Firebase credentials).

Host the web dashboard (locally or online).

Monitor real-time sensor values on the dashboard.

🛡️ Safety Note
This project is designed for educational and preliminary industrial monitoring purposes. For critical applications, certified industrial-grade sensors and controllers are recommended.

