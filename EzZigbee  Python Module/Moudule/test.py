from CoreSystem.byteCodeZigBee import ByteCodeZigBee
import logging
ByteCodeInterpreter = ByteCodeZigBee(loggingLevel=logging.DEBUG)
strhex = "|54|FE|0|9|26|70|60|8|FC|1|20|B|0|0|0|0|0|0|0|0|0|0|0|0|0|0|3|FF|4|F|1|A|3|3|3|8F|3|8F|0|65|0|0|1E"
strhex = strhex.split('|')
del strhex[0]
for i in range(len(strhex)):
    strhex[i] = "0x"+strhex[i]
    strhex[i] = chr(int(strhex[i], 0))
print(strhex)
ByteCodeInterpreter.interpretByteCodeToPacket(strhex)
