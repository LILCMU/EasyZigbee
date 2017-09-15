########HEADER#########
import sys
sys.path.append("./Moudule")
from EzZigbee import EzZigbee
Zigbee = EzZigbee()
#######################
import time
print("Turn ON Light1")
Zigbee.Nodes['light1'].On()
print("Turn ON Light2")
Zigbee.Nodes['light2'].On()
print("Sleep 2 Sec")
time.sleep(2)
print("Turn Off Light1")
Zigbee.Nodes['light1'].Off()
print("Turn Off Light2")
Zigbee.Nodes['light2'].Off()
time.sleep(1)
