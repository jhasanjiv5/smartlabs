// MIT License
// https://github.com/gonzalocasas/arduino-uno-dragino-lorawan/blob/master/LICENSE
// Based on examples from https://github.com/matthijskooijman/arduino-lmic
// Copyright (c) 2015 Thomas Telkamp and Matthijs Kooijman

// Adaptions: Andreas Spiess

// Adaptions: Sanjiv Jha

#include <lmic.h>
#include <hal/hal.h>
//#include <credentials.h>
#include "MQ135.h"
#define ArrayLenth  40
#define samplingInterval 20
#define Offset -1.41 // reset the offset for getting 7.00 PH before taking the actual measures
#define SensorPin A3
#define printInterval 800
MQ135 gasSensor = MQ135(0);
int pHArray[ArrayLenth];   //Store the average value of the sensor feedback
int pHArrayIndex = 0;
#define RZERO 76.36
  float CO;
  float CO2;
  float turbidity;
  float ph;
#ifdef CREDENTIALS
static const u1_t NWKSKEY[16] = NWKSKEY1;
static const u1_t APPSKEY[16] = APPSKEY1;
static const u4_t DEVADDR = DEVADDR1;
#else
static const u1_t NWKSKEY[16] = { 0xD8, 0x0A, 0x27, 0xB2, 0xC2, 0x66, 0x72, 0x36, 0x42, 0x66, 0x04, 0xAD, 0x2B, 0xF6, 0x7C, 0xC2 };
static const u1_t APPSKEY[16] = { 0xAC, 0x9B, 0xBB, 0x8E, 0x04, 0xE0, 0xF0, 0xDF, 0x8E, 0x61, 0xDC, 0xAD, 0xE7, 0xF5, 0x63, 0xF0 };
static const u4_t DEVADDR = 0x260113D0;
#endif

// These callbacks are only used in over-the-air activation, so they are
// left empty here (we cannot leave them out completely unless
// DISABLE_JOIN is set in config.h, otherwise the linker will complain).
void os_getArtEui (u1_t* buf) { }
void os_getDevEui (u1_t* buf) { }
void os_getDevKey (u1_t* buf) { }

static osjob_t sendjob;

// Schedule TX every this many seconds (might become longer due to duty
// cycle limitations).
const unsigned TX_INTERVAL = 20;

// Pin mapping Dragino Shield
const lmic_pinmap lmic_pins = {
    .nss = 10,
    .rxtx = LMIC_UNUSED_PIN,
    .rst = 9,
    .dio = {2, 6, 7},
};
void onEvent (ev_t ev) {
    if (ev == EV_TXCOMPLETE) {
        Serial.println(F("EV_TXCOMPLETE (includes waiting for RX windows)"));
        // Schedule next transmission
        os_setTimedCallback(&sendjob, os_getTime()+sec2osticks(TX_INTERVAL), do_send);
    }
}
  

void do_send(osjob_t* j){
    // Payload to send (uplink)
    int16_t COval = (int16_t)CO;
 int16_t CO2val = (int16_t)CO2;
 int16_t turbidityval = (int16_t)turbidity;
  int16_t PHval = (int16_t)ph;
 //shift bits and store the value in bytes
  byte data[9];
  data[0] = CO2val>>8;
  data[1] = CO2val & 0xFF;
  data[2] = COval>>8;
  data[3] = COval & 0xFF;
  data[4] = turbidityval>>8;
  data[5] = turbidityval & 0xFF;
  data[6] = PHval>>8;
  data[7] = PHval & 0xFF;
   
    // Check if there is not a current TX/RX job running
    if (LMIC.opmode & OP_TXRXPEND) {
        Serial.println(F("OP_TXRXPEND, not sending"));
    } else {
        // Prepare upstream data transmission at the next possible time.
        LMIC_setTxData2(1, data, sizeof(data)-1, 0);
        Serial.println(F("Sending uplink packet..."));
    }
    // Next TX is scheduled after TX_COMPLETE event.
}

void setup() {
    Serial.begin(115200);
    Serial.println(F("Starting..."));

    // LMIC init
    os_init();

    // Reset the MAC state. Session and pending data transfers will be discarded.
    LMIC_reset();

    // Set static session parameters.
    LMIC_setSession (0x1, DEVADDR, NWKSKEY, APPSKEY);

    // Disable link check validation
    LMIC_setLinkCheckMode(0);

    // TTN uses SF9 for its RX2 window.
    LMIC.dn2Dr = DR_SF9;

    // Set data rate and transmit power for uplink (note: txpow seems to be ignored by the library)
    LMIC_setDrTxpow(DR_SF12,14);

    // Start job
    do_send(&sendjob);
}

void loop() {
  

  delay(printInterval);
  float rzero = gasSensor.getRZero();
  
  int CO2ppm = gasSensor.getPPM();
  CO2=CO2ppm*(1023/5.0)-RZERO;
  //CO2 = gasSensor.getPPM();
  //val=analogRead(0);//Read Gas value from analog 0

  CO = analogRead(1)/10;


  int turbiditysensorvalue = analogRead(2);
  turbidity = turbiditysensorvalue * (5.0 / 1024.0);


  static unsigned long samplingTime = millis();
  static unsigned long printTime = millis();
  static float pHValue, voltage;
  if (millis() - samplingTime > samplingInterval)
  {
    pHArray[pHArrayIndex++] = analogRead(SensorPin);
    if (pHArrayIndex == ArrayLenth)pHArrayIndex = 0;
    voltage = avergearray(pHArray, ArrayLenth) * 5.0 / 1024;
    pHValue = 3.5 * voltage + Offset;
    samplingTime = millis();
    ph=pHValue;
  }
  if (millis() - printTime > printInterval)  //Every 800 milliseconds, print a numerical, convert the state of the LED indicator
  {

    Serial.println(CO2);
    //Print the analog value to serial port
    Serial.println(CO);

    Serial.println(turbidity);
    Serial.println(pHValue);


    printTime = millis();
    os_runloop_once();
}
}
//PH sketch from DFrobot https://www.dfrobot.com/wiki/index.php/PH_meter(SKU:_SEN0161)
double avergearray(int* arr, int number) {
  int i;
  int max, min;
  double avg;
  long amount = 0;
  if (number <= 0) {
    Serial.println("Error number for the array to avraging!/n");
    return 0;
  }
  if (number < 5) { //less than 5, calculated directly statistics
    for (i = 0; i < number; i++) {
      amount += arr[i];
    }
    avg = amount / number;
    return avg;
  } else {
    if (arr[0] < arr[1]) {
      min = arr[0]; max = arr[1];
    }
    else {
      min = arr[1]; max = arr[0];
    }
    for (i = 2; i < number; i++) {
      if (arr[i] < min) {
        amount += min;      //arr<min
        min = arr[i];
      } else {
        if (arr[i] > max) {
          amount += max;  //arr>max
          max = arr[i];
        } else {
          amount += arr[i]; //min<=arr<=max
        }
      }//if
    }//for
    avg = (double)amount / (number - 2);
  }//if
  return avg;
} 
