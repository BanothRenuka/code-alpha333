#include <DHT.h>

// DHT sensor settings
#define DHTPIN 2        // Data pin connected to Arduino
#define DHTTYPE DHT11   // DHT11 sensor type

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);   // Start serial communication
  dht.begin();          // Initialize DHT sensor
}

void loop() {
  float temperature = dht.readTemperature(); // Read temperature
  float humidity = dht.readHumidity();       // Read humidity

  // Check if readings failed
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Sensor Error");
    delay(2000);
    return;
  }

  // Send data in JSON format (for backend)
  Serial.print("{\"temperature\":");
  Serial.print(temperature);
  Serial.print(",\"humidity\":");
  Serial.print(humidity);
  Serial.println("}");

  delay(3000); // Wait 3 seconds
}
