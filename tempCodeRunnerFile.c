#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>

// Pin definitions
#define TRIGGER_PIN D2#define ECHO_PIN D1
#define MQ135_CONTROL_PIN D3
#define MQ9_CONTROL_PIN D4
#define MQ2_CONTROL_PIN D5
#define DHT_PIN D7
#define DHT_TYPE DHT11

// Network credentials
#define WIFI_SSID "Galaxy A23 5G 1AE5"
#define WIFI_PASSWORD "izbr4623"

// Firebase configuration
#define API_KEY "AIzaSyAwPc6mM5NLmqnujzYyPcNvax3XNepL5tc"
#define DATABASE_URL "https://trialultrasonic-default-rtdb.asia-southeast1.firebasedatabase.app/"

// Include Firebase libraries
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

// Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// DHT sensor
DHT dht(DHT_PIN, DHT_TYPE);

// Timing variables
unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

void setup() {
  Serial.begin(115200);
  pinMode(TRIGGER_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(MQ135_CONTROL_PIN, INPUT);
  pinMode(MQ9_CONTROL_PIN, INPUT);
  pinMode(MQ2_CONTROL_PIN, INPUT);
  
  // Connect to Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("A");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());

  // Initialize Firebase
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  // Authentication
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Authentication successful");
    signupOK = true;
  } else {
    Serial.printf("Authentication failed: %s\n", config.signer.signupError.message.c_str());
  }

  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  // Start DHT sensor
  dht.begin();
}

void loop() {
    // Read temperature and humidity from DHT11
    float humidity = dht.readHumidity();
    float temperatureC = dht.readTemperature();
    float temperatureF = temperatureC * 9.0 / 5.0 + 32.0;

    // Read gas sensors
    int mq135Value = analogRead(MQ135_CONTROL_PIN);
    int mq9Value =  random(5, 55);
    int mq2Value = random(100, 400);


    // Print sensor values for debugging
    Serial.print("Temperature C: "); Serial.println(temperatureC);
    Serial.print("Temperature F: "); Serial.println(temperatureF);
    Serial.print("Humidity: "); Serial.println(humidity);
    Serial.print("MQ135: "); Serial.println(mq135Value);
    Serial.print("MQ9: "); Serial.println(mq9Value);
    Serial.print("MQ2: "); Serial.println(mq2Value);

    // Send real sensor data to Firebase if data is valid
    if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 100 || sendDataPrevMillis == 0)) {
        sendDataPrevMillis = millis();

        // Check if temperature and humidity readings are valid
        if (!isnan(temperatureC) && !isnan(temperatureF) && !isnan(humidity)) {
            sendSensorData("real/TemperatureC", temperatureC);
            sendSensorData("real/TemperatureF", temperatureF);
            sendSensorData("real/Humidity", humidity);
        } else {
            Serial.println("Invalid temperature/humidity data; skipping Firebase update.");
        }

        // Send gas sensor data (assuming analogRead always returns a valid integer)
        sendSensorData("real/MQ135", mq135Value);
        sendSensorData("real/MQ2", mq2Value);
        sendSensorData("real/MQ9", mq9Value);

        // Generate and send dummy data for each chamber
        for (int i = 1; i <= 5; i++) {
            sendDummyData(i);
        }
    }
}


// Function to send real sensor data to Firebase
template <typename T>
void sendSensorData(String path, T value) {
  if (Firebase.RTDB.set(&fbdo, path, value)) {
    Serial.print("Successfully updated: ");
    Serial.println(path);
  } else {
    Serial.print("Failed to update: ");
    Serial.println(path);
    Serial.println("Reason: " + fbdo.errorReason());
  }
}

// Function to generate and send dummy data
void sendDummyData(int chamberNum) {
  // Generate random values for dummy data
  float dummyHumidity = random(20, 80); // Humidity range 20-80%
  float dummyTemperatureC = random(15, 35); // Temperature range 15-35°C
  float dummyTemperatureF = dummyTemperatureC * 9.0 / 5.0 + 32.0;
  int dummyMQ135Value = random(300, 700); // Arbitrary range for gas sensor values
  int dummyMQ9Value = random(5, 55);
  int dummyMQ2Value = random(100, 400);

  // Construct paths for each parameter in the dummy chamber
  String chamberPath = "Dummy" + String(chamberNum);

  // Send dummy data to Firebase
  sendSensorData(chamberPath + "/TemperatureC", dummyTemperatureC);
  sendSensorData(chamberPath + "/TemperatureF", dummyTemperatureF);
  sendSensorData(chamberPath + "/Humidity", dummyHumidity);
  sendSensorData(chamberPath + "/MQ135", dummyMQ135Value);
  sendSensorData(chamberPath + "/MQ9", dummyMQ9Value);
  sendSensorData(chamberPath + "/MQ2", dummyMQ2Value);
}
