#Create Co-Node
import sys
sys.path.append("./Moudule")
from EzZigbee import EzZigbee
Zigbee = EzZigbee()
import paho.mqtt.client as mqtt #import the client1
import time
############
def on_message(client, userdata, message):
    text = str(message.payload.decode("utf-8"))
    print("message received " ,str(message.payload.decode("utf-8")))
    print("message topic=",message.topic)
    print("message qos=",message.qos)
    print("message retain flag=",message.retain)
    if(message.topic == "house/light1"):
        if(text == "ON"):
            Zigbee.Nodes['light1'].On()
        elif(text == "OFF"):
            Zigbee.Nodes['light1'].Off()
    if(message.topic == "house/light2"):
        if(text == "ON"):
            Zigbee.Nodes['light2'].On()
        elif(text == "OFF"):
            Zigbee.Nodes['light2'].Off()
########################################
broker_address="broker.mqttdashboard.com"
client = mqtt.Client("User") #create new instance
client.on_message=on_message #attach function to callback
client.connect(broker_address) #connect to broker
client.loop_start() #start the loop
client.subscribe("house/light1")
client.subscribe("house/light2")
while(True):
    temp = 1
