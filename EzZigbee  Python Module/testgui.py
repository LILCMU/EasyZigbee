from Tkinter import *
root = Tk()
a = "boat"
def printname(event):
    a = "asdsadas"
    print("asdksadlas")
topFrame = Frame(root)
topFrame.pack()
bottomFrame = Frame(root)
bottomFrame.pack(side=BOTTOM)
label = Label(topFrame,text="sadad")
JoinBtn = Button(bottomFrame,text=a,fg="blue")
CloseBtn = Button(bottomFrame,text="CLOSE",fg="red")

JoinBtn.pack(side=LEFT)
CloseBtn.pack(side=RIGHT)
JoinBtn.bind("<Button-1>",printname)
root.mainloop()


