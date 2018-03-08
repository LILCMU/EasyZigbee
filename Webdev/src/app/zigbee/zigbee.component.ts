import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Http, Response } from '@angular/http';
import { Paho } from 'ng2-mqtt/mqttws31';
import { HttpHeaders } from '@angular/common/http';
import { delay } from 'q';

@Component({
    selector: 'zigbee-cmp',
    moduleId: module.id,
    templateUrl: 'zigbee.component.html'
})

export class ZigbeeComponent {
    
    client;
    modalRef: BsModalRef;
    public status :any = false;
    public b: any = false;
    public query: any = null;
    public respone = {};
    public username ="admin" ;
    public coid ="EZ001" ;
    public table: any = null; 
    public clientid: any = null; 
    constructor(private modalService: BsModalService, private _http: Http) {
        // this.clientid = Math.floor((Math.random() * 1000000000) + 1);
        // console.log(this.clientid);
        this.client = new Paho.MQTT.Client('broker.mqttdashboard.com', 8000, 'clientId-9dPGUIVl3O');

        this.onMessage();
        this.onConnectionLost();
        this.client.connect({ onSuccess: this.onConnected.bind(this) });

    }

    private apiUrl = 'http://api4ezzigbee.herokuapp.com';
    data: any = null;

    ngOnInit() {
        
        this.gettable();
        

    }

    onConnected() {
        console.log("Connected");
        this.client.subscribe("/EZ001/CMDRES");
        // this.sendMessage('Web connected to mqtt ');
    }

    sendMessage(message: string) {
        let packet = new Paho.MQTT.Message(message);
        packet.destinationName = "/EZ001/LOADCMD";
        this.client.send(packet);
    }

    onMessage() {
        this.client.onMessageArrived = (message: Paho.MQTT.Message) => {
           // console.log('Message arrived : ' + message.payloadString);

            var hex = message.payloadString.match(/.{1,2}/g);
        if(hex[2]=="00" && hex[3]=="01"){

        this.respone['CMD'] = "1";
            var IEEE_ADDR = '';
            for(var i=5; i<13 ;i++){
                IEEE_ADDR = IEEE_ADDR.concat(hex[i]);
            }
            this.respone['IEEE_ADDR'] = IEEE_ADDR;
            this.respone['SHORT_ADDR'] = parseInt(hex[13].concat(hex[14]),16);
            this.respone['CAP'] = parseInt(hex[15],16);
            //console.log(this.respone);
            this.status = "true" ;
            this.b = "true";
            
           
            //console.log(this.status);
            //console.log(this.b);
        }
        
      
        };
    }

sendname(devicename: string){
    //console.log("asdsad");
    this.query ="/AddNode?username="+this.username+"&name="+devicename+"&ieeeaddr="+this.respone['IEEE_ADDR'];
    this.query = this.query+"&shortaddr="+this.respone['SHORT_ADDR']+"&coid="+this.coid;
    return this._http.get(this.apiUrl+this.query)
    .map((res: Response) => res.json())
    .subscribe(res => {  
       // console.log(res);
      // delay(500);
      // this.gettable();
    });
 
   
    }
    editname(devicename: string,ieee:string,addr :string){
       
        this.query ="/AddNode?username="+this.username+"&name="+devicename+"&ieeeaddr="+ieee;
        this.query = this.query+"&shortaddr="+addr+"&coid="+this.coid;
      //  console.log(this.apiUrl+this.query);
        return this._http.get(this.apiUrl+this.query)
        .map((res: Response) => res.json())
        .subscribe(res => {  
           // console.log(res);
          // delay(500);
          // this.gettable();
        });

    }
     
    onConnectionLost() {
        this.client.onConnectionLost = (responseObject: Object) => {
            console.log('Connection lost : ' + JSON.stringify(responseObject));
        };
    }
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
        let packet = new Paho.MQTT.Message("PERMITJOIN 255");
        packet.destinationName = "/EZ001/LOADCMD";
        this.client.send(packet);
    }

    openModal2(template2: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template2);
    }
    openModal3(template3: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template3);
    }

 

    gettable() {
        var Username = localStorage.getItem('Username');
        return this._http.get(this.apiUrl+"/Table?username="+Username)
          .map((res: Response) => res.json())
    
          .subscribe(table => {
            this.table = table.table
          //  console.log(this.table);
          });
      }
    identify() {
        //console.log(code);
        //console.log("IDENTIFY 255 0 "+this.respone['SHORT_ADDR']+" 10");
        let packet = new Paho.MQTT.Message("IDENTIFY 255 0 "+this.respone['SHORT_ADDR']+" 1");
        packet.destinationName = "/EZ001/LOADCMD";
        this.client.send(packet);
    }
    identifyd(addr :string) {
    //    console.log(addr);
    //    console.log();
        let packet = new Paho.MQTT.Message("IDENTIFY 255 0 "+addr+" 1");
        packet.destinationName = "/EZ001/LOADCMD";
        this.client.send(packet);
    }
delete(ieee :string) {
     
    this.query ="/AddNode?ieeeaddr="+ieee;
   
    //console.log(this.apiUrl+this.query);
    return this._http.get(this.apiUrl+this.query)
    .map((res: Response) => res.json())
    .subscribe(res => {  
 
    });

    }
}







