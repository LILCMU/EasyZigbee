###
import sys
sys.path.append("./Moudule")
from Zigbee import CoEzZigbee
from EzZigbee import EzZigbee
Zigbee = CoEzZigbee()
ezzig = EzZigbee()
StatusNode = ezzig.GetStatusNodes()
###
from Tkinter import *
#Create Root
root = Tk()
root.resizable(width=False, height=False)
root.geometry('{}x{}'.format(500, 450))
##
def Join():
    Status['text'] = "Status : Joing....Push Button On Zigbee!!"
    Joinbtn['state'] = DISABLED
    Closebtn['state'] = DISABLED
    root.update()
    Zigbee.PermitJoin()
    Status['text'] = "Status : Enter Node Name...."
    EnterName['state'] = "normal"
    NameText['state'] = "normal"
def Close():
    root.destroy()
    exit()
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
def LoadTable():
    Table1['text'] = 'NAME\n'
    Table2['text'] = 'ADDR\n'
    Table3['text'] = 'STATUS\n'
    for key,value in Zigbee.GetTable().iteritems():
        Table1['text'] = Table1['text']+str(key)+"\n"
        Table2['text'] = Table2['text']+str(value)+"\n"
        Table3['text'] = Table3['text']+str(StatusNode[str(key)])+"\n"
    Status['text'] = "Status : Ready To Joing Device"
    root.update()
#Create Frame
frame2 = Frame(root)
frame3 = Frame(root)
frame4 = Frame(root)
frame4.pack(side=BOTTOM)
frame2.pack(side=BOTTOM)
frame3.pack(side=BOTTOM)
#Create Btn
Joinbtn = Button(frame2,text="JOIN",command=Join,fg="blue")
Closebtn = Button(frame2,text="CLOSE",command=Close,fg="red")
EnterName = Button(frame3,text="Enter",command=GetName,fg="blue")
Status = Label(root,text="Status : Ready To Joing Device",fg="green",bg="black",bd=1,relief=SUNKEN,anchor=W)
Status.pack(side=BOTTOM,fill=X)
EnterName.pack(side=RIGHT)
Joinbtn.pack(side=LEFT,fill=X)
Closebtn.pack(side=RIGHT,fill=X)
#Create Entry
NameText = Entry(frame3)
NameText.pack(fill=X,side=LEFT)
#Create Table
Table1 = Label(frame4,text="NAME",bg="black",fg="green")
Table2 = Label(frame4,text="ADDR",bg="black",fg="green")
Table3 = Label(frame4,text="STATUS",bg="black",fg="white")
Table1.pack(fill=X,side=LEFT)
Table3.pack(fill=X,side=RIGHT)
Table2.pack(fill=X,side=RIGHT)
#Create Img
photo = PhotoImage(file="./Moudule/icon.gif")
icon = Label(root,image=photo)
icon.pack()
#changAppname
root.title( "EzZigbee" )
#Setup
EnterName['state'] = DISABLED
NameText['state'] = DISABLED
LoadTable()
root.mainloop()
exit()