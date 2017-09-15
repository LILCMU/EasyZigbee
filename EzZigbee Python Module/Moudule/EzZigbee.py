from Zigbee import CoEzZigbee,NodeEzZigbee
import time
Z = CoEzZigbee()
class EzZigbee:
    def __init__(self):
        self.Nodes = {}
        self.StatusNodes = {}
        for name in Z.GetTable():
            self.Nodes[str(name)] = NodeEzZigbee(str(name))
            if(self.Nodes[str(name)].StatusNode == 1):
                self.StatusNodes[str(name)] = "Online"
            else:
                self.StatusNodes[str(name)] = "Offline"
    def GetNodesName(self):
        return Z.GetNodeName()
    def GetStatusNodes(self):
        return self.StatusNodes
        
