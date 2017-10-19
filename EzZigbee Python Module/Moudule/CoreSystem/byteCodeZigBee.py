# Copyright (c) 2015 Supakorn Yukonthong

import logging
#import json
import struct

class ByteCodeZigBee:
    def __init__(self,loggingLevel=None):
        self.ByteCodeZigBee_logging = logging
        self.ByteCodeZigBee_logging.basicConfig(level=loggingLevel)
        #self.ByteCodeZigBee_logging.debug("DEBUG MODE ON")

    def interpretByteCodeToPacket(self,bc):
        #self.ByteCodeZigBee_logging.debug("Input Byte code : " + str(bc))
        packet_temp = {}
        if ord(bc[0]) == 0x54 and ord(bc[1]) == 0xfe:
            cmd = bytearray([ 0, 0, ord( bc[2] ), ord( bc[3] ) ] )
            cmd_pack = struct.unpack('>I', cmd)[0]
            # device annouc
            # Byte Size for each
            # 0x54 0xfe [CMD:2] [byte count:1] [IEEE:8] [SRT:2] [CAP:1]
            if cmd_pack == 1:
                IEEE_ADDR = ''
                for i in range(5,13):
                    IEEE_ADDR += '%02X' % (ord(bc[i]))

                SRT_ADDR = bytearray([ 0, 0, ord( bc[13] ), ord( bc[14] ) ] )
                CAP = bytearray([ 0, 0, 0, ord( bc[15] ) ] )
                packet_temp['CMD'] = 1
                packet_temp['IEEE_ADDR'] = IEEE_ADDR
                packet_temp['SHORT_ADDR'] = struct.unpack('>I', SRT_ADDR)[0]
                packet_temp['CAP'] = struct.unpack('>I', CAP)[0]
            elif cmd_pack == 2:
                packet_temp['CMD'] = 2
                packet_temp['SRC_ADDR'] = struct.unpack('>I', bytearray([ 0, 0, ord( bc[5] ), ord( bc[6] ) ] ) )[0]
                packet_temp['EP'] = ord( bc[7] )
                packet_temp['CLUSTER_ID'] = struct.unpack('>I', bytearray([ 0, 0, ord( bc[8] ), ord( bc[9] ) ] ) )[0]
                packet_temp['ATTR_ID'] = struct.unpack('>I', bytearray([0, 0, ord(bc[10]), ord(bc[11])]) )[0]
                packet_temp['DATA_TYPE'] = ord(bc[12])
                #check Data type
                if packet_temp['DATA_TYPE'] == 0x10:
                    #ZCL_DATATYPE_BOOLEAN
                    packet_temp['DATA'] = ord(bc[13])

                else:
                    packet_temp['DATA_LENGTH'] = struct.unpack('>I', bytearray([0, 0, ord(bc[13]), ord(bc[14])]))[0]
                    # uint8
                    if packet_temp['DATA_TYPE'] == 0x20:
                        packet_temp['DATA'] = ord(bc[15])
                    # 32-bit BitMap
                    elif packet_temp['DATA_TYPE'] == 0x1b:
                        packet_temp['DATA'] = bin(struct.unpack('>I', bytearray([ord(bc[15]), ord(bc[16]) , ord(bc[17]), ord(bc[18])]))[0])
                        #print str(ord(bc[15]))
                        #print str(ord(bc[16]))
                        #print str(ord(bc[17]))
                        #print str(ord(bc[18]))
                    # Signed 16-bit integer
                    elif packet_temp['DATA_TYPE'] == 0x29:
                        packet_temp['DATA'] = struct.unpack('<h', bytearray([ord(bc[15]), ord(bc[16])]))[0]
                    # Unsigned 16-bit integer
                    elif packet_temp['DATA_TYPE'] == 0x21:
                        packet_temp['DATA'] = struct.unpack('<H', bytearray([ord(bc[15]), ord(bc[16])]))[0]
                    # 8-bit enumeration
                    elif packet_temp['DATA_TYPE'] == 0x30:
                        packet_temp['DATA'] = ord(bc[15])
                    # character String,first byte is size of string
                    elif packet_temp['DATA_TYPE'] == 0x42:
                        packet_temp['DATA'] = ''
                        for i in range(0,packet_temp['DATA_LENGTH']-1):
                            packet_temp['DATA'] +=  bc[16+i]
                    self.ByteCodeZigBee_logging.debug("NO DATA MATCHING")
            elif cmd_pack == 3:
                packet_temp['CMD'] = 3
                packet_temp['SRC_ADDR'] = struct.unpack('>I', bytearray([0, 0, ord(bc[5]), ord(bc[6])]))[0]
                packet_temp['TIMEOUT'] = struct.unpack('>I', bytearray([0, 0, ord(bc[7]), ord(bc[8])]))[0]
            elif cmd_pack == 4:
                CacheDeviceAmount = ( ord(bc[4]) - 4 ) / 2
                packet_temp['CMD'] = 4
                packet_temp['CacheDeviceInPacket'] = CacheDeviceAmount
                packet_temp['StartIndex'] = struct.unpack('>I', bytearray([0, 0, ord(bc[7]), ord(bc[8])]))[0]
                packet_temp['CacheDeviceAmount'] = struct.unpack('>I', bytearray([0, 0, ord(bc[5]), ord(bc[6])]))[0]
                CacheDeviceTbList = []
                for i in range(0,packet_temp['CacheDeviceInPacket']):
                    CacheDeviceTbList.append(struct.unpack('>I', bytearray([0, 0, ord(bc[9+(i*2)]), ord(bc[10+(i*2)])]))[0])
                packet_temp['CacheDeviceTable'] = CacheDeviceTbList
            elif cmd_pack == 5:
                packet_temp['CMD'] = 5
                packet_temp['STATUS'] = ord(bc[5])
            elif cmd_pack == 6:
                packet_temp['CMD'] = 6
                ActiveEPCount = ord(bc[7])
                ActiveEPList = []
                for i in range(0,ActiveEPCount):
                    ActiveEPList.append(ord(bc[8+i]))
                packet_temp['ACTIVEEPLIST'] = ActiveEPList
                packet_temp['ACTIVEEPLISTCOUNT'] = ActiveEPCount
                packet_temp['SRC_ADDR'] = struct.unpack('>I', bytearray([0, 0, ord(bc[5]), ord(bc[6])]))[0]
            elif cmd_pack == 7:
                packet_temp['CMD'] = 7
                packet_temp['SRC_ADDR'] = struct.unpack('>I', bytearray([0, 0, ord(bc[5]), ord(bc[6])]))[0]
                packet_temp['EP'] = ord(bc[7])
                packet_temp['APPLICATION_PROFILE_ID'] = struct.unpack('>I', bytearray([0, 0, ord(bc[8]), ord(bc[9])]))[0]
                packet_temp['APPLICATION_DEVICE_ID'] = struct.unpack('>I', bytearray([0, 0, ord(bc[10]), ord(bc[11])]))[0]
                packet_temp['APPLICATION_DEVICE_VERSION'] = ord(bc[12])
                packet_temp['RESERVED'] = ord(bc[13])

                packet_temp['APPLICATION_NUM_IN_CLUSTERS'] = ord(bc[14])
                APPLICATION_IN_CLUSTERS_LIST = []
                APPLICATION_OUT_CLUSTERS_LIST = []
                index_count = 15
                for i in range(0,packet_temp['APPLICATION_NUM_IN_CLUSTERS']):
                    APPLICATION_IN_CLUSTERS_LIST.append( struct.unpack('>I', bytearray([0, 0, ord(bc[15+(i*2)]), ord(bc[16+(i*2)])]))[0] )
                    index_count = index_count + 2
                packet_temp['APPLICATION_IN_CLUSTERS'] = APPLICATION_IN_CLUSTERS_LIST


                packet_temp['APPLICATION_NUM_OUT_CLUSTERS'] = ord(bc[index_count])
                index_count = index_count + 1
                for i in range(0, packet_temp['APPLICATION_NUM_OUT_CLUSTERS']):
                    APPLICATION_OUT_CLUSTERS_LIST.append( struct.unpack('>I', bytearray([0, 0, ord(bc[index_count + (i * 2)]), ord(bc[index_count+ 1 + (i * 2)])]))[0])
                packet_temp['APPLICATION_OUT_CLUSTERS'] = APPLICATION_OUT_CLUSTERS_LIST
            elif cmd_pack == 8:
                packet_temp['CMD'] = 8
                packet_temp['STATUS'] = ord(bc[5])
            elif cmd_pack == 9:
                packet_temp['CMD'] = 9
                packet_temp['SRC_ADDR'] = struct.unpack('>I', bytearray([0, 0, ord(bc[5]), ord(bc[6])]))[0]
                # packet_temp['EP'] = ord(bc[7])
                packet_temp['CLUSTER_ID'] = struct.unpack('>I', bytearray([0, 0, ord(bc[8]), ord(bc[9])]))[0]
                # check cluster id (64513 is customize cluster for GEKKO)
                if packet_temp['CLUSTER_ID'] == 64513:

                    packet_temp['REGISTER_COUNT'] = ord(bc[10])
                    packet_temp['REGISTERS'] = []
                    for i in range(0, packet_temp['REGISTER_COUNT']):
                        packet_temp['REGISTERS'].append(ord(bc[11 + i]))
                    packet_temp['LOGO_PACKET_TYPE'] = ord(bc[11])
                    # robotic
                    packet_temp['SENSOR1'] =  \
                    struct.unpack('>I', bytearray([0, 0, ord(bc[12]), ord(bc[13])]))[0]
                    packet_temp['SENSOR2'] = \
                    struct.unpack('>I', bytearray([0, 0, ord(bc[14]), ord(bc[15])]))[0]
            elif cmd_pack == 10:
                packet_temp['CMD'] = 10
                packet_temp['SRC_ADDR'] = struct.unpack('>I', bytearray([0, 0, ord(bc[13]), ord(bc[14])]))[0]
                IEEE_ADDR = ''
                for i in range(5, 13):
                    IEEE_ADDR += '%02X' % (ord(bc[i]))
                packet_temp['IEEE_ADDR'] = IEEE_ADDR
            elif cmd_pack == 11:
                packet_temp['CMD'] = 11
                packet_temp['SRC_ADDR'] = struct.unpack('>I', bytearray([0, 0, ord(bc[13]), ord(bc[14])]))[0]
                IEEE_ADDR = ''
                for i in range(5, 13):
                    IEEE_ADDR += '%02X' % (ord(bc[i]))
                packet_temp['IEEE_ADDR'] = IEEE_ADDR



        else:
            self.ByteCodeZigBee_logging.debug("BAD HEADER")
        #self.ByteCodeZigBee_logging.debug("Packet : " + str(packet_temp))
        return packet_temp

if __name__ == "__main__":
    #print "Testing In Class : " + __file__
    test = ByteCodeZigBee(loggingLevel=logging.DEBUG)
    aa = [chr(0x54),chr(0xfe)     ,chr(0),chr(1)   ,chr(11)    ,chr(0x0),chr(0x12),chr(0x4b),chr(0x0),chr(0x7),chr(0x1a),chr(0x6e),chr(0x8b), chr(0x35),chr(0xf6) ,chr(0x8e)]
    test.interpretByteCodeToPacket(aa)
