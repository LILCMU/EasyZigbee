#Create Co-Node
import logging

logging.getLogger("urllib3").setLevel(logging.WARNING)
import sys
sys.path.append("./Moudule")
from EzZigbee import EzZigbee
Zigbee = EzZigbee()
import paho.mqtt.client as mqtt
import time
import datetime
########################################
import requests
import json
########################################
print("Web demo service start !!")
client = mqtt.Client("EzZigBeeService")
broker_address="broker.mqtt-cpe.ml"
client.connect(broker_address,1883)
runtime = time.time()
def onStop():
    global runtime
    if(time.time()-runtime >= 2):
        runtime = time.time()
        response = requests.get("https://ezzigbeeapi.herokuapp.com/CheckStop")
        print(response.text)
        if(response.text=='1'):
            return False
        else:
            return True
    else:
        return True
def on_message(client, userdata, message):
    Code = str(message.payload.decode("utf-8"))
    print("------Received Code------\n " +str(message.payload.decode("utf-8")))
    try:
        if('while True:' in Code):
            Code = Code.split('while True:')
            NewCode = Code[0]
            for line in range(1,len(Code)):
                NewCode = NewCode+"while(onStop()):"+ Code[line]
            print("--------GENNEW CODE-----------")
            print(NewCode)
            print("-------RUNNUNG------------")
            exec(NewCode)
        else:
            print("-------RUNNUNG------------")
            exec(Code)
        print("-------STOP RUNNING----------")
        response = requests.get("https://ezzigbeeapi.herokuapp.com/Stoped")
        client.publish("EzZigBee/Demo/LoadCode/Status","1")
    except:
        print("ERROR")
        client.publish("EzZigBee/Demo/LoadCode/Status","0")
client.on_message=on_message 
client.loop_start()
client.subscribe("EzZigBee/Demo/LoadCode")
var = time.time()
while(True):
    if(time.time() - var  >= 7):
        var = time.time()
        NodesName = Zigbee.GetNodesName()
        Dashboard = {}
        Dashboards = []
        for i in NodesName:
            Info = {}
            Info['Name'] = str(i)
            Info['SHR'] = str(NodesName[i])
            Info['Sensor1'] = str(Zigbee.Nodes[i].Read('SENSOR1'))
            Info['Sensor2'] = str(Zigbee.Nodes[i].Read('SENSOR2'))
            Dashboards.append(Info)
        Dashboard['Nodes'] = Dashboards
        payload = json.dumps(Dashboard)
        response = requests.post("https://ezzigbeeapi.herokuapp.com/NodeName", data=payload)
        #print(response.text) #TEXT/HTML
        #print(response.status_code, response.reason) #HTTP

