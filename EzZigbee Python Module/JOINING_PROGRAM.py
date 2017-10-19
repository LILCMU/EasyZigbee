###
import os
Pid = os.getpid()
import sys
import tkMessageBox
sys.path.append("./Moudule")
from Zigbee import CoEzZigbee
from EzZigbee import EzZigbee
import time
Zigbee = CoEzZigbee()
ezzig = EzZigbee()
StatusNode = ezzig.GetStatusNodes()
config = {}
###########
from Tkinter import *
import csv
#Create Root
root = Tk()
root.resizable(width=False, height=False)
root.geometry('{}x{}'.format(500, 600))
##
def Join():
    Status['text'] = "Status : Joining....Push Button On Zigbee!!"
    Joinbtn['state'] = DISABLED
    Closebtn['state'] = DISABLED
    icon['image'] = photo2
    root.update()
    Zigbee.PermitJoin()
    infonode = Zigbee.GetInfo()
    Status['text'] = "Status : Found node !!! IEEE_ADDR = "+str(infonode['IEEE'])+" and SHORT_ADDR =>"+str(infonode['ADDR'])+"\nEnter Node Name"
    EnterName['state'] = "normal"
    NameText['state'] = "normal"
    icon['image'] = photo3
def Close():
    root.destroy()
def GetName():
    Zigbee.SetNodeName(NameText.get())
    StatusNode[NameText.get()]="Online"
    Joinbtn['state'] = "normal"
    Closebtn['state'] = "normal"
    EnterName['state'] = DISABLED
    NameText.delete(0,END)
    NameText.insert(0,"")
    NameText['state'] = DISABLED
    LoadTable()
    icon['image'] = photo4
    root.update()
    time.sleep(2)
    icon['image'] = photo1
def LoadTable():
    Table1.delete(0, END)
    Table2.delete(0, END)
    Table3.delete(0, END)
    Table1.insert(0, "NAME")
    Table2.insert(0, "ADDR")
    Table3.insert(0, "STATUS")
    Table1.itemconfig(0, bg='black',fg='white')
    Table2.itemconfig(0, bg='black',fg='white')
    Table3.itemconfig(0, bg='black',fg='white')
    count = 1
    for key,value in Zigbee.GetTable().iteritems():
        Table1.insert(count, str(key))
        Table2.insert(count,str(value))
        Table3.insert(count,str(StatusNode[str(key)]))
        if(str(StatusNode[str(key)])=="Online"):
            Table1.itemconfig(count, bg='black',fg='green')
            Table2.itemconfig(count, bg='black',fg='green')
            Table3.itemconfig(count, bg='black',fg='green')
        else:
            Table1.itemconfig(count, bg='black',fg='red')
            Table2.itemconfig(count, bg='black',fg='red')
            Table3.itemconfig(count, bg='black',fg='red')
        count = count+1
    Status['text'] = "Status : Ready To Joining Device"
    root.update()
def SaveConfig():
    GetConfig()
    with open('CONFIG_GATEWAY.csv', 'wb') as csv_file:
        writer = csv.writer(csv_file)
        for key, value in config.items():
           writer.writerow([key, value])
    Status['text'] = "Status : Saved Config"
    root.update()
def GetConfig():
    config['SERIAL_PORT_NUMBER'] = SerialText.get()
    config['MQTT'] = MQTTText.get()
    config['MQTT_SERVER'] = ServerText.get()
    config['MQTT_PORT'] = PortText.get()
    config['MQTT_USERNAME'] = UsernameText.get()
    config['MQTT_PASSWORD'] = PasswordText.get()
    config['MQTT_TOPPIC'] = ToppicText.get()
def LoadConfig():
    reader = csv.reader(open("CONFIG_GATEWAY.csv", "r"))
    for rows in reader:
        config[rows[0]] = rows[1]
    print(config)
    SerialText.insert(0,config['SERIAL_PORT_NUMBER'])
    MQTTText.insert(0,config['MQTT'])
    ServerText.insert(0,config['MQTT_SERVER'])
    PortText.insert(0,config['MQTT_PORT'])
    UsernameText.insert(0,config['MQTT_USERNAME'])
    PasswordText.insert(0,config['MQTT_PASSWORD'])
    ToppicText.insert(0,config['MQTT_TOPPIC'])
#Create Frame
frame2 = Frame(root)
frame3 = Frame(root)
frame4 = Frame(root)
frame5 = Frame(root)
frame6 = Frame(root)
frame7 = Frame(root)
frame8 = Frame(root)
frame9 = Frame(root)
frame10 = Frame(root)
frame10.pack(side=BOTTOM)
frame9.pack(side=BOTTOM)
frame8.pack(side=BOTTOM)
frame7.pack(side=BOTTOM)
frame6.pack(side=BOTTOM)
frame5.pack(side=BOTTOM)
frame4.pack(side=BOTTOM)
frame2.pack(side=BOTTOM)
frame3.pack(side=BOTTOM)
#Create Btn
Joinbtn = Button(frame2,text="   JOIN   ",command=Join,fg="blue")
Closebtn = Button(frame2,text="   CANCLE   ",command=Close,fg="red")
EnterName = Button(frame3,text="Enter",command=GetName,fg="blue")
Status = Label(root,text="Status : Ready To Joining Device",fg="green",bg="black",bd=1,relief=SUNKEN,anchor=W)
Status.pack(side=BOTTOM,fill=X)
EnterName.pack(side=RIGHT)
Joinbtn.pack(side=LEFT,fill=X)
Closebtn.pack(side=RIGHT,fill=X)
#Create Entry
NameText = Entry(frame3)
NameText.pack(fill=X,side=LEFT)
#Create Table
Table1 = Listbox(frame4)
Table2 = Listbox(frame4)
Table3 = Listbox(frame4)
Table1.pack(fill=X,side=LEFT)
Table3.pack(fill=X,side=RIGHT)
Table2.pack(fill=X,side=RIGHT)
#Frame5
ConfigLabel = Label(frame5,text="Zigbee GateWay Config",bg="black",fg="green")
ConfigLabel.pack(side=BOTTOM,fill=X)
#Frame6
SerialLabel = Label(frame6,text="Serial Port Number : ")
SerialLabel.pack(side=LEFT)
SerialText = Entry(frame6)
SerialText.pack(side=LEFT)
MQTTText = Entry(frame6)
MQTTText.pack(side=RIGHT)
MQTTTLabel = Label(frame6,text="MQTT(ON/OFF) : ")
MQTTTLabel.pack(side=RIGHT)
#Frame7
ServerLabel = Label(frame7,text="MQTT Server : ")
ServerLabel.pack(side=LEFT)
ServerText = Entry(frame7)
ServerText.pack(side=LEFT)
PortText = Entry(frame7)
PortText.pack(side=RIGHT)
PortLabel = Label(frame7,text="MQTT Port : ")
PortLabel.pack(side=RIGHT)
#Frame8
UsernameLabel = Label(frame8,text="MQTT Username : ")
UsernameLabel.pack(side=LEFT)
UsernameText = Entry(frame8)
UsernameText.pack(side=LEFT)
PasswordText = Entry(frame8)
PasswordText.pack(side=RIGHT)
PasswordLabel = Label(frame8,text="MQTT Password : ")
PasswordLabel.pack(side=RIGHT)
#Frame9
ToppicLabel = Label(frame9,text="MQTT Toppic : ")
ToppicLabel.pack(side=LEFT)
ToppicText = Entry(frame9)
ToppicText.pack(side=LEFT)
#Frame10
Savebtn = Button(frame10,text="SAVE CONFIG [./CONFIG_GATEWAY.CSV]",command=SaveConfig,fg="blue")
Savebtn.pack()
#Create Img
photo1 = PhotoImage(file="./Moudule/icon.gif")
photo2 = PhotoImage(file="./Moudule/icon1.gif")
photo3 = PhotoImage(file="./Moudule/icon2.gif")
photo4 = PhotoImage(file="./Moudule/icon3.gif")
icon = Label(root,image=photo1)
icon.pack()
#Listbox
#changAppname
root.title( "EzZigbee" )
#Setup
EnterName['state'] = DISABLED
NameText['state'] = DISABLED
LoadTable()
LoadConfig()
def on_closing():
    if tkMessageBox.askokcancel("Quit", "Do you want to quit?"):
        root.destroy()
root.protocol("WM_DELETE_WINDOW", on_closing)
root.mainloop()
os.system("taskkill /PID "+str(Pid)+" /f")
