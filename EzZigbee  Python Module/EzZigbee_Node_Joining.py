import sys
sys.path.append("./Moudule")
from Zigbee import CoEzZigbee
Zigbee = CoEzZigbee()
State = '1'
while(State!='2'):
    if(State=='1'):
        print("Start Joining")
        print("Push the button on Zigbee node !!")
        for key, value in Zigbee.PermitJoin().iteritems():
            print("Node : "+key+" Joined in network, Shot Addr : "+str(value))
        Zigbee.DenialJoin()
    State = raw_input("Enter [ 1 : Continue Join , 2 : Stop Join ] : ")      
