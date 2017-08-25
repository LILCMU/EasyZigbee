#include <SoftwareSerial.h>
SoftwareSerial mySerial(13, 15);
byte respone[20];
void setup(){ 
Serial.begin(9600);
mySerial.begin(115200);
}
void loop() {
String command = "";
while(Serial.available()) {
  command = Serial.readStringUntil('\n');   
}
if(command != ""){
  command = command + "\n";
  char ccmd[command.length()+1] ;
  command.toCharArray(ccmd, command.length()+1);
  mySerial.write(ccmd);
  Serial.print(ccmd);
}

int x = 0;
int index = 0;
while(mySerial.available()) {
//Serial.print("|");
//Serial.print(mySerial.read(),HEX);
respone[index] = mySerial.read();
index++;
x=1;
}
if(x!=0){
 CheckHeader();
}
delay(50);
}
void CheckHeader(){
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
//ดำขาวแดงส้ม // ข้างล่างเหลือง

