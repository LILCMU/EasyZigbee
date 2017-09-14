from Zigbee import CoEzZigbee,NodeEzZigbee
import time
Z = CoEzZigbee()
class EzZigbee:
    def __init__(self):
        self.Nodes = {}
        for name in Z.GetTable():
            self.Nodes[str(name)] = NodeEzZigbee(str(name))
    def GetNodesName(self):
        return Z.GetNodeName()
        
