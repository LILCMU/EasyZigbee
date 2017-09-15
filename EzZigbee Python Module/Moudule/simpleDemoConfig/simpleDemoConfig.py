import csv
import os
import sys

class GatewayConfig:

    def __init__(self,filename):
        self.dirCurrent = os.path.dirname(sys.argv[0])
        self.CONFIG_FILE_CSV = os.path.join(self.dirCurrent,filename)
        #print self.dirCurrent
        #print self.CONFIG_FILE_CSV
        #self.CONFIG_FILE_CSV = filename
        self.MQTT_SERVER_IP = ""
        self.MQTT_SERVER_PORT = 1883
        self.MQTT_SERVER_PORT_WEBSOCKET = 9001
        self.MQTT_SERVER_CLIENT_ID = ''
        self.MQTT_SERVER_CLEAN_SESSION = True
        self.MQTT_SERVER_QOS = 0
        self.MQTT_SERVER_KEEPALIVE = 60
        self.MQTT_SERVER_ACL_CONFIG = ''
        self.MQTT_SERVER_ACL_USERNAME = ''
        self.MQTT_SERVER_ACL_PASSWORD = ''
        self.MQTT_SERVER_CERTIFICATE_CONFIG = ''
        self.MQTT_SERVER_CERTIFICATE_PATH = ''

        self.MQTT_PROJECT_ID = ''
        self.CORE_CONFIG_SYSTEM_MQTT_TO_GATEWAY = self.MQTT_PROJECT_ID + 'SETTING'
        self.CORE_CONFIG_TOPICMATCHING_MQTT_TO_GATEWAY = self.MQTT_PROJECT_ID + 'TOPICMATCHING'
        self.CORE_SERIAL_REPORT_GATEWAY_TO_MQTT = self.MQTT_PROJECT_ID + 'SERIAL/REPORT'

        #self.CORE_CMD_FROM_MQTT_TO_GATEWAY = 'WRAT/simpleDemo1/floor1/room001/power/CMD'
        #self.CORE_RESPONSE_FROM_GATEWAY_TO_MQTT = 'WRAT/simpleDemo1/floor1/room001/power/RESPONSE'
        #self.CORE_ANNOU_TABLE_FROM_MQTT_TO_GATEWAY = 'WRAT/simpleDemo1/ANNOU_TABLE'

        self.ZIGBEE_RS232_NAME = ''

        self.COMMAMD_TOPIC_LIST = []
        self.ROUTINE_TOPIC_LIST = []
        self.COMMAND_AND_RESPONSE_TOPIC_LIST = []
        self.EVENT_REPORT_TOPIC_LIST = []

    def loadConfig(self):
        with open(self.CONFIG_FILE_CSV,'rb') as csvfile:
            spamreader = csv.reader(csvfile)
            for row in spamreader:
                if row[0] == 'SERIAL_PORT_NUMBER':
                    self.ZIGBEE_RS232_NAME = row[1]
                    #print "Port : "+self.ZIGBEE_RS232_NAME
                elif row[0] == 'MQTT_SERVER_IP':
                    self.MQTT_SERVER_IP = row[1]
                    #print "MQTT_SERVER_IP : "+self.MQTT_SERVER_IP
                elif row[0] == 'MQTT_SERVER_PORT':
                    self.MQTT_SERVER_PORT = int(row[1])
                    #print "MQTT_SERVER_PORT : "+str(self.MQTT_SERVER_PORT)
                elif row[0] == 'MQTT_PROJECT_ID':
                    self.MQTT_PROJECT_ID = row[1]
                    self.CORE_CONFIG_SYSTEM_MQTT_TO_GATEWAY = self.MQTT_PROJECT_ID + 'SETTING'
                    self.CORE_CONFIG_TOPICMATCHING_MQTT_TO_GATEWAY = self.MQTT_PROJECT_ID + 'TOPICMATCHING'
                    self.CORE_SERIAL_REPORT_GATEWAY_TO_MQTT = self.MQTT_PROJECT_ID + 'SERIAL/REPORT'
                    #print "MQTT_PROJECT_ID : " + self.MQTT_PROJECT_ID
                elif row[0] == 'MQTT_SERVER_ACL_CONFIG':
                    self.MQTT_SERVER_ACL_CONFIG = row[1]
                    #print "MQTT_SERVER_ACL_CONFIG : " + self.MQTT_SERVER_ACL_CONFIG
                elif row[0] == 'MQTT_SERVER_ACL_USERNAME':
                    self.MQTT_SERVER_ACL_USERNAME = row[1]
                    #print "MQTT_SERVER_ACL_USERNAME : " + self.MQTT_SERVER_ACL_USERNAME
                elif row[0] == 'MQTT_SERVER_ACL_PASSWORD':
                    self.MQTT_SERVER_ACL_PASSWORD = row[1]
                    #print "MQTT_SERVER_ACL_PASSWORD : " + self.MQTT_SERVER_ACL_PASSWORD
                elif row[0] == 'MQTT_SERVER_CERTIFICATE_CONFIG':
                    self.MQTT_SERVER_CERTIFICATE_CONFIG = row[1]
                    #print "MQTT_SERVER_CERTIFICATE_CONFIG : " + self.MQTT_SERVER_CERTIFICATE_CONFIG
                elif row[0] == 'MQTT_SERVER_CERTIFICATE_PATH':
                    self.MQTT_SERVER_CERTIFICATE_PATH = row[1]
                    self.MQTT_SERVER_CERTIFICATE_PATH = os.path.join(self.dirCurrent, self.MQTT_SERVER_CERTIFICATE_PATH)
                    #print "MQTT_SERVER_CERTIFICATE_PATH : " + self.MQTT_SERVER_CERTIFICATE_PATH

                elif row[0] == 'MQTT_SERVER_CLIENT_ID':
                    self.MQTT_SERVER_CLIENT_ID = row[1]
                    #print "MQTT_SERVER_CLIENT_ID : " + self.MQTT_SERVER_CLIENT_ID
                elif row[0] == 'MQTT_SERVER_CLEAN_SESSION':
                    if row[1] == 'False':
                        value_temp = False
                    else:
                        value_temp = True
                    self.MQTT_SERVER_CLEAN_SESSION = value_temp
                    #print "MQTT_SERVER_CLEAN_SESSION : " + str(self.MQTT_SERVER_CLEAN_SESSION)
                elif row[0] == 'MQTT_SERVER_QOS':
                    self.MQTT_SERVER_QOS = int(row[1])
                    #print "MQTT_SERVER_QOS : " + str(self.MQTT_SERVER_QOS)
