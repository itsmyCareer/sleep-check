#include <DS1302.h> //Real Time Clock Header

#include <ESP8266HTTPClient.h>

#include <ESP8266WiFi.h>


#ifndef STASSID
#define STASSID "wifi1"
#define STAPSK  "00000000"
#endif

#define MEASURE_SEC 10
#define SERVER_IP "13.209.70.41:5000"
#define USE_SERIAL Serial

const char* ssid = "wifi1";
const char* password = "00000000";
WiFiClient client;


const int RST   = 13;   // RESET(RST)핀 (Chip Enable) 7
const int DATA   = 12;   // DATA핀 (I/O) 6
const int CLOCK = 14;   // Clock 핀 (Serial Clock) 5

int soundSensor = A0;
int vib = 4;      // Digital 2 == GPIO 4
int kg = 5;       // Digital 1 == GPIO 5

int threshold = 100;
int count = 0;
int vib_count = 1;
int sound_count = 1;

DS1302 rtc(RST, DATA, CLOCK);

void SERVER(void)
{

  count++;
  Serial.println("WHEHE");
  Serial.println(count);
  if (count > MEASURE_SEC - 1)
  {
    Time t = rtc.time();
    char buf[50];
    char sendMessage[256];
    snprintf(buf, sizeof(buf), "%04d%02d%02d%02d%02d%02d", t.yr, t.mon, t.date, t.hr, t.min, t.sec);
    Serial.println(buf);
    count = 0;
    Serial.println("DDDDDDDDDDDDDD");
    Serial.println(vib_count);
    Serial.println(sound_count);
    snprintf(sendMessage, sizeof(sendMessage), "{\"data\":[{\"sound\": %d, \"vibration\": %d.0, \"record_time\": \"%s\"}]}", sound_count, vib_count, buf);
    //Send Data

    if ((WiFi.status() == WL_CONNECTED)) {

      WiFiClient client;
      HTTPClient http;

      USE_SERIAL.print("[HTTP] begin...\n");
      // configure traged server and url
      http.begin(client, "http://" SERVER_IP "/data"); //HTTP
      http.addHeader("Content-Type", "application/json");

      USE_SERIAL.print("[HTTP] POST...\n");
      // start connection and send HTTP header and body
      int httpCode = http.POST(sendMessage);

      // httpCode will be negative on error
      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        USE_SERIAL.printf("[HTTP] POST... code: %d\n", httpCode);

        // file found at server
        if (httpCode == HTTP_CODE_OK) {
          const String& payload = http.getString();
          USE_SERIAL.println("received payload:\n<<");
          USE_SERIAL.println(payload);
          USE_SERIAL.println(">>");
        }
      } else {
        USE_SERIAL.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }

      http.end();
    }
    vib_count = 1;
    sound_count = 1;
  }
}


void setup() {
  USE_SERIAL.begin(115200);
  delay(10);
  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();
  Serial.println("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  USE_SERIAL.println(WiFi.localIP());

  pinMode(soundSensor, INPUT);
  pinMode(vib, INPUT);
  pinMode(kg, INPUT_PULLUP);

}

void loop() {
  vib_count = 1;
  sound_count = 1;
  count = 0;
  while (digitalRead(kg) == LOW)
  {


    long measurement = TP_init();
    delay(50);
    if (measurement > 20)
      vib_count++;
    Serial.println(analogRead(A0));
    if (analogRead(A0) < threshold)
    {
      sound_count++;
      Serial.println("CNT");
    }

    delay(50);
    SERVER();
  }
}

long TP_init() {
  delay(10);
  long measurement = pulseIn (vib, HIGH);
  return measurement;
}
