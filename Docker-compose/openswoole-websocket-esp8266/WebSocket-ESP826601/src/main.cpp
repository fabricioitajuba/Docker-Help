/*
 * WebSocket-ESP826601
 *
 *  Created on: 24.05.2015
 *
 */

 #define DEBUG_ON

 #include <Arduino.h>
 
 #include <ESP8266WiFi.h>
 #include <ESP8266WiFiMulti.h>
 #include <WebSocketsClient.h>
 #include <Hash.h>
 #include <ArduinoJson.h>

 const char* ssid1 = "ssid1";
 const char* password1 = "pass1";
 
 const char* ssid2 = "ssid2";
 const char* password2 = "pass2";
 
 ESP8266WiFiMulti WiFiMulti;
 WebSocketsClient webSocket;
 
 void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
 
   switch(type){
   
     case WStype_DISCONNECTED:
 #ifdef DEBUG_ON
       Serial.printf("[WSc] Disconnected!\n");
 #endif      
       break;
     
     case WStype_CONNECTED:{
 #ifdef DEBUG_ON
       Serial.printf("[WSc] Connected to url: %s\n", payload);
 #endif
       // send message to server when Connected
       webSocket.sendTXT("Connected");
     }
       break;
     
     case WStype_TEXT:
 #ifdef DEBUG_ON   
       Serial.printf("[WSc] get text: %s\n", payload);
 #endif
       // send message to server
       // webSocket.sendTXT("message here");
       break;
     
     case WStype_BIN:
 #ifdef  DEBUG_ON   
       Serial.printf("[WSc] get binary length: %u\n", length);
 #endif      
       hexdump(payload, length);
       // send data to server
       // webSocket.sendBIN(payload, length);
       break;
     
     case WStype_PING:
 #ifdef DEBUG_ON    
       // pong will be send automatically
       Serial.printf("[WSc] get ping\n");
 #endif      
       break;
 
     case WStype_PONG:
 #ifdef DEBUG_ON    
       // answer to a ping we send
       Serial.printf("[WSc] get pong\n");
 #endif      
       break;
     }
 }
 
 void setup(){
 
 #ifdef DEBUG_ON  
   Serial.begin(115200);
 
   Serial.setDebugOutput(true);
 
   Serial.println();
   Serial.println();
   Serial.println();
 
   for(uint8_t t = 4; t > 0; t--){
     Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
     Serial.flush();
     delay(1000);
   }
 #endif
 
   WiFiMulti.addAP(ssid1, password1);
   WiFiMulti.addAP(ssid2, password2);
 
 #ifdef DEBUG_ON
   Serial.println("Connecting ...");
 #endif  
 
   while(WiFiMulti.run() != WL_CONNECTED) {
     delay(100);
 #ifdef DEBUG_ON    
     Serial.print('.');
 #endif    
   }
 
   // server address, port and URL
   webSocket.begin("192.168.0.110", 9502, "/");
 
   // event handler
   webSocket.onEvent(webSocketEvent);
   webSocket.setReconnectInterval(5000);
   webSocket.enableHeartbeat(15000, 3000, 2);
 
 }
 
 unsigned long messageTimestamp = 0;
 bool status = true;
 char data[100];
 JsonDocument doc;

void loop(){
 
  webSocket.loop();
 
  uint64_t now = millis();
 
  if(now - messageTimestamp > 2000){
     
    messageTimestamp = now;
 
    if(status == true){      
      doc["Led_Status"] = "off";
      serializeJson(doc, data);
      webSocket.sendTXT(data);
      status = false; 
    }
    else{
      doc["Led_Status"] = "on";
      serializeJson(doc, data);
      webSocket.sendTXT(data);   
      status = true;
    }
  }
}
 