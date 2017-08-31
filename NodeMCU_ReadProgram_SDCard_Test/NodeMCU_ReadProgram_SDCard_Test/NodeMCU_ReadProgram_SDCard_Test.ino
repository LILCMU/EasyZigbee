#include <SoftwareSerial.h>
SoftwareSerial mySerial(13, 15);
String command;
int Data[1] = {0};
void setup() {
  // put your setup code here, to run once:
  command = "|1;0;500;18101|2;0;500;45852|"; // SD card
  Serial.begin(9600);
  mySerial.begin(115200);
}
void loop() {
  Serial.println("Start");
  int NextCommand = 0;
  int IndexCommand = 0;
  int CommandSet[4] = {0,0,0,0};
  bool getcommand = false;
  while(!getcommand){
    while(Serial.available()) {
      Data[0] = Serial.readStringUntil('\n').toInt();  // รับมาจาก Node
      getcommand = true; 
      Serial.println(Data[0]);
    }
    int x = 0;
    int index = 0;
    byte respone[20];
    while(mySerial.available()) {
      respone[index] = mySerial.read();
      index++;
      x=1;
    }
    if(x!=0){
      CheckHeader(respone);
    }
  }
  for(int i = 0;i<command.length();i++){
    Serial.println(command[i]);
    switch(command[i]){
      case '|':
        NextCommand = 1;
        if(IndexCommand==3){
          IndexCommand = 0;
          Work(CommandSet);
          for(int j=0;j<4;j++){
            CommandSet[j] = 0;
          } 
        }
        break;
      case ';':
        IndexCommand+=1;
        break;
      default :
        NextCommand = 0;
        CommandSet[IndexCommand] = (CommandSet[IndexCommand]*10)+(command[i]-'0') ;
        break;
    }
  }
  delay(500);
}
void Work(int CommandSet[]){
  Serial.print("Command : ");
  for(int i = 0;i<4;i++){
    Serial.print(CommandSet[i]);
  }
  Serial.println("");
  switch(CommandSet[0]){
    case 1:
      if(Data[CommandSet[1]]>CommandSet[2]){
        SendCommand("ONOFF 255 0 "+String(CommandSet[3])+" 1");
      }
      else{
        SendCommand("ONOFF 255 0 "+String(CommandSet[3])+" 0");
      }
      break;
    case 2:
      if(Data[CommandSet[1]]<CommandSet[2]){
        SendCommand("ONOFF 255 0 "+String(CommandSet[3])+" 1");
      }
      else{
        SendCommand("ONOFF 255 0 "+String(CommandSet[3])+" 0");
      }
    default:
      Serial.println("Unknow Command!!");
      break;
  }
}
void SendCommand(String CommandLine){
  CommandLine = CommandLine + "\n";
  char ccmd[CommandLine.length()+1] ;
  CommandLine.toCharArray(ccmd, CommandLine.length()+1);
  mySerial.write(ccmd);
  Serial.print(ccmd);
}
void CheckHeader(byte respone[20]){
  if(respone[0] == B01010100)
  {
    Serial.println("GOOD HEARDER");
    if(respone[3] == B00001000)
    {
       int Status = respone[5];
       Serial.println("CMD : 8 | STATUS : "+String(Status));
    }
    else if(respone[3] == B00000001)
    {
       int A = respone[13];
       int B = respone[14];
       int SHADDR = (A*16*16)+B;
       Serial.println("CMD : 1 | SHORT_ADDR : "+String(SHADDR));
    }
  }
  else
  {
    Serial.println("BAD HEARDER");
  }
}

