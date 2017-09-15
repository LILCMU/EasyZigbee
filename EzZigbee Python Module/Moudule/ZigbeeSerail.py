# Copyright (c) 2015 Supakorn Yukonthong

import serial
import threading
import json
import time
import paho.mqtt.client as mqtt
import logging
import struct
import sys
import time
from Tkinter import *

from simpleDemoConfig import simpleDemoConfig
from CoreSystem.byteCodeZigBee import ByteCodeZigBee

GatewayConfig_temp = simpleDemoConfig.GatewayConfig('CONFIG_GATEWAY.csv')
GatewayConfig_temp.loadConfig()

MQTTclient = mqtt.Client()
RP = {}
Respone = {}
NodeAddr = {}
def is_hex(s):
    hex_digits = set(string.hexdigits)
    return s[0:2] == "0x" and all(c in hex_digits for c in s[2:])


def initSerial():
    sp = serial.Serial()
    sp.port = GatewayConfig_temp.ZIGBEE_RS232_NAME
    sp.baudrate = 115200
    sp.parity = serial.PARITY_NONE
    sp.bytesize = serial.EIGHTBITS
    sp.stopbits = serial.STOPBITS_ONE
    sp.timeout = None
    sp.xonxoff = False
    sp.rtscts = False
    sp.dsrdtr = False
    sp.open()
    return sp

sp = initSerial()
#print sp

ser = sp

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    # client.subscribe("/ZigBeeAtmel/toMQTT")
    client.subscribe(GatewayConfig_temp.CORE_CMD_FROM_MQTT_TO_GATEWAY)
    # client.subscribe(self.pathMqtt)

def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.payload))
    if msg.payload == "ON":
        cmd = "ONOFF 255 0 "+ str(int("35846",10)) +" 1"
        writeCommandToSerial(ser, cmd)
        #mock up response
        MQTTclient.publish(GatewayConfig_temp.CORE_RESPONSE_FROM_GATEWAY_TO_MQTT, 'ON', 0, True)
    elif msg.payload == "OFF":
        cmd = "ONOFF 255 0 "+ str(int("35846",10)) +" 0"
        writeCommandToSerial(ser, cmd)
        #mock up response
        MQTTclient.publish(GatewayConfig_temp.CORE_RESPONSE_FROM_GATEWAY_TO_MQTT, 'OFF', 0, True)



def startMQTTserver():
    MQTTclient.on_connect = on_connect
    MQTTclient.on_message = on_message
    MQTTclient.connect(GatewayConfig_temp.MQTT_SERVER_IP, GatewayConfig_temp.MQTT_SERVER_PORT, GatewayConfig_temp.MQTT_SERVER_KEEPALIVE)
    MQTTclient.loop_start()

# use quene list to get data from serial and add to quene list
# the function that have duty to use data to process should get from quene
# To prevent threading process data at the same time you should lock a quene

cmd_Map_Table = [{"CMD":chr(1),"ByteCount":11,"Detail":"DeviceAnnc"}]
ByteCodeInterpreter = ByteCodeZigBee(loggingLevel=logging.DEBUG)
def readInputSerial(ser):
    _temp = []
    counterPayloadByte = 0
    valueBefore = ''
    #_cmdList use to contain complete packet
    _cmdList = []
    while True:
        ##print valueBefore
        if counterPayloadByte > 0:
            ##print "In read payload :" + str(counterPayloadByte)
            value = ser.read(1)
            _temp.append(value)
            counterPayloadByte = counterPayloadByte - 1
            if counterPayloadByte <= 0:
                _cmdList.append(_temp)
                _temp = []
                #reset header
                value = ''
                valueBefore = ''
        elif valueBefore == chr(0x54) and counterPayloadByte <= 0:
            value = ser.read(1)
            if value == chr(0xfe):
                #print "Found Header"
                _cmdByte1 = ser.read(1)
                _cmdByte2 = ser.read(1)
                _counterPayloadByte = ser.read(1)

                ##print str(ord(_counterPayloadByte))

                _temp.append(chr(0x54))
                _temp.append(chr(0xfe))
                _temp.append(_cmdByte1)
                _temp.append(_cmdByte2)
                _temp.append(_counterPayloadByte)

                counterPayloadByte = ord(_counterPayloadByte)
            else:
                valueBefore = value
        else:
            ##print "Header not found"
            ##print ser.inWaiting()
            value = ser.read(1)
            valueBefore = value


        for i in _cmdList:
            '''
            try:
                i = json.loads(i)
            except ValueError as e:
                #print i
            if type(i) is dict:
                if i.has_key('GG'):
            '''
            ##print i
            RP = ByteCodeInterpreter.interpretByteCodeToPacket(i)
            #print(RP)
            if(RP['CMD']==1):
                Name = "NewEzZigbeeNode"
                NodeAddr[str(Name)] = RP['SHORT_ADDR']
                writerespone("2")
            if(RP['CMD']==8):
                Respone['STATUS'] = RP['STATUS']
                writerespone(str(RP['STATUS']))
        _cmdList = []
def writerespone(text):
    text_file = open("./Moudule/Respone.txt", "w")
    text_file.write(text)
    text_file.close()
def resetall():
    text_file = open("./Moudule/Respone.txt", "w")
    text_file.write("")
    text_file.close()
def writeCommandToSerial(ser, cmd):
    cmd = cmd + "\n"
    cmd = cmd.encode('ascii')
    #print "Write to Serial : " + cmd
    ser.write(cmd)
    time.sleep(0.01)

t1 = threading.Thread(target=readInputSerial, args=(sp,))
t1.start()
class Zigbee:
    def __init__(self,Command):
        self.Command = str(Command)
    def Doit(self):
        resetall()
        writeCommandToSerial(sp, self.Command)
        time.sleep(0.5)
    def GetTable(self):
        return NodeAddr
    def GetResp(self):
        return (open("./Moudule/Respone.txt", "r").read())
#if __name__ == '__main__':

    #sp = initSerial()
    ##print sp


    

    #startMQTTserver()


    #while True:
        #n = raw_input("Type Command : ")
        #writeCommandToSerial(sp, n)

    '''
    i = 0
    onoff = 0
    list_temp = [23027,31815,33867,29502,28108,2878,26370,12709,33867,44720,41618]
    list_status = [0,0,0,0,0,0,0,0,0,0,0]
    while True:
        #n = raw_input("Type Command : ")
        #print "Round : " + str(i)
        i = i+1
        for i in range(0,len(list_temp)):
            if list_status[i] == 1:
                list_status[i] = 0
            else:
                list_status[i] = 1
            n = "ONOFF 8 0 "+ str(list_temp[i]) +" "+str(list_status[i])
            writeCommandToSerial(sp, n)
            time.sleep(0.2)
    '''

    """
    #print "hello"
    #print json.dumps(['foo',{'key':'test'}])
    strTest = json.loads('["foo",{"key":"test"}]')
    #print strTest[0]
    """
