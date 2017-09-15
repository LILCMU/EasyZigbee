from ZigbeeSerail import Zigbee 
import time
NodeAddr = {}
NodeName = {}
MQTT_STATUS = False
try:
    NodeAddrString = open('AddrTable.dat', 'r').read()
except:
    open('AddrTable.dat', 'w+')
    NodeAddrString = open('AddrTable.dat', 'r').read()
NodeAddrString = NodeAddrString.split('|')
for Node in NodeAddrString :
    if(Node!=""):
        NodeAddr[Node.split(';')[0]] = Node.split(';')[1]
        #NodeName[Node.split(';')[0]] = Node.split(';')[2]
import csv
MQTT = {}
with open('CONFIG_GATEWAY.csv', mode='r') as infile:
    reader = csv.reader(infile)
    MQTT = dict((rows[0],rows[1]) for rows in reader)
if(MQTT['MQTT'].upper() == 'ON'):
    MQTT_STATUS = True
    import paho.mqtt.client as mqtt #import the client1
    ############
    def on_message(client, userdata, message):
        print("message received " ,str(message.payload.decode("utf-8")))
        print("message topic=",message.topic)
        print("message qos=",message.qos)
        print("message retain flag=",message.retain)
    ########################################
    broker_address=MQTT['MQTT_SERVER']
    broker_port=MQTT['MQTT_PORT']
    print("Start MQTT => "+broker_address+":"+broker_port+" TOPPIC : "+MQTT['MQTT_TOPPIC'])
    client = mqtt.Client("EzZigbee") 
    client.on_message=on_message
    client.connect(broker_address,broker_port)
    client.loop_start()
def SendMQTT(path,messg):
    if(MQTT_STATUS):
        client.publish(MQTT['MQTT_TOPPIC']+"/"+path,messg)
def writetempaddr(text):
    text_file = open("./Moudule/Addrtemp.txt", "w")
    text_file.write(text)
    text_file.close()
def readtempaddr():
    return (open("./Moudule/Addrtemp.txt", "r").read())
class NodeEzZigbee:
    def __init__(self,IEEEAddr):
        self.IEEEAddr = IEEEAddr
        self.StatusNode = 0
        try:
            print("Creating...Node : "+str(IEEEAddr))
            z = Zigbee("IDENTIFY 255 0 "+str(NodeAddr[self.IEEEAddr])+" 1")
            z.Doit()
            count = 0
            while(z.GetResp() != "1" and count < 5 ):
                time.sleep(1)
                count = count+1
            if(z.GetResp() != "" and z.GetResp()=="1"):
                print("Node : "+str(IEEEAddr)+" have been created !")
                self.StatusNode = 1
            else:
                print("Short addr is changed or Node is Offline , Plase Join again")
                self.StatusNode = 0
        except:
            print("Don't have this IEEEAddr in Network , Plase Join again!")
            self.StatusNode = 0
    def On(self):
        SendMQTT(self.IEEEAddr,"ON")
        try:
            z = Zigbee("ONOFF 255 0 "+str(NodeAddr[self.IEEEAddr])+" 1").Doit()
        except:
            print("Don't have this IEEEAddr in Network")
    def Off(self):
        SendMQTT(self.IEEEAddr,"OFF")
        try:
            z = Zigbee("ONOFF 255 0 "+str(NodeAddr[self.IEEEAddr])+" 0").Doit()
        except:
            print("Don't have this IEEEAddr in Network")
    def Beep(self):
        SendMQTT(self.IEEEAddr,"BEEP")
        try:
            z = Zigbee("IDENTIFY 255 0 "+str(NodeAddr[self.IEEEAddr])+" 1").Doit()
        except:
            print("Don't have this IEEEAddr in Network")
class CoEzZigbee:
    def __init__(self):
        self.tempJOIN = {}
        #print("Create Zigbee(Co)")
    def PermitJoin(self):
        z = Zigbee("PERMITJOIN 255")
        z.Doit()
        while((readtempaddr()==str(z.GetTable()) or z.GetTable() == {}) and z.GetResp()!="2" ):
            time.sleep(1)
    def SetNodeName(self,name):
        z = Zigbee("PERMITJOIN 255")
        writetempaddr(str(z.GetTable()))
        for key, value in z.GetTable().iteritems():
            NodeAddr[key] = value
        temp = NodeAddr['NewEzZigbeeNode']
        del NodeAddr['NewEzZigbeeNode']
        NodeAddr[str(name)] = temp
        text_file = open("AddrTable.dat", "w")
        for key, value in NodeAddr.iteritems():
            text_file.write(str(key)+";"+str(value)+"|")
        text_file.close()
        SendMQTT("JOIN",str(NodeAddr))
        return NodeAddr
    def GetTable(self):
        return NodeAddr
    def GetNodeName(self):
        return NodeName
    def DenialJoin(self):
        z = Zigbee("PERMITJOIN 0").Doit()
