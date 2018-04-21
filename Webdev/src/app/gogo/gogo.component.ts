import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Http, Response } from '@angular/http';
import { Paho } from 'ng2-mqtt/mqttws31';
import { HttpHeaders } from '@angular/common/http';
import { delay } from 'q';


@Component({
    selector: 'gogo-cmp',
    moduleId: module.id,
    templateUrl: 'gogo.component.html',
    host: { 'window:beforeunload': 'doSomething' }
})

export class GogoComponent {


    public status: any = false;
    public b: any = false;
    public query: any = null;
    public respone = {};
    public table: any = null;
    public clientid: any = null;
    public allcoid: any = null;
    public coid: any = null;
    public temp = 0 ;
    public boardstatus = "WebSocket Not Connected" ;
    client;
    modalRef: BsModalRef;
    imageURL: string;
    email: string;
    name: string;
    token: string;



    constructor(private modalService: BsModalService, private _http: Http) {
        // this.clientid = Math.floor((Math.random() * 1000000000) + 1);
        // console.log(this.clientid);
        this.client = new Paho.MQTT.Client('broker.mqttdashboard.com', 8000, 'clientId-9dPGUIVl3O');

        this.onMessage();
        this.onConnectionLost();
        this.client.connect({ onSuccess: this.onConnected.bind(this) });
        var ws;
        var port = "";
        var received_obj;
        var portobj;
        var reconnect;
        var wsreset;
        var connectstatus = 1;
        var _self = this;

        if ("WebSocket" in window) {
            wsreset = new WebSocket("ws://localhost:8989/ws");
            wsreset.onopen = function () {
              wsreset.send("restart");
            }
            setTimeout(function () {
      
              ws = new WebSocket("ws://localhost:8989/ws");
             
      
              ws.onopen = function () {
                
                ConnectCOM();
      
              };
      
              ws.onmessage = function (evt) {
                var packethex;
                var sensors;
      
                try {
                  received_obj = JSON.parse(evt.data);
                  packethex = parseHexString(received_obj.D);
      
                  _self.processSerial(packethex);
                 // console.log("1");
                  if (_self.passdata() == 1) {
                      console.log("disconnect");
                     _self.settempzero();
                      Disconnect();
                   
                  }
                  else if (_self.passdata() == 2) {
                    console.log("join");
                    _self.settempzero();
                    SendSe("54fe05000601ff06");
              
                }
                
                }
                catch (err) {
                  portobj = received_obj;
      
                  if (evt.data.search("writerBuffered just got closed") != -1) {
                    reconnect = setInterval(function () { Reconnect() }, 2000);
                    connectstatus = 0;
                  //  _self.Disconnectboard();
                    console.log("error1");
                  }
                  // console.log('"Name": "'+port+'"');
                  if (evt.data.search('"Name": "' + port + '"') != -1) {
                    clearInterval(reconnect);
                    
                    if (connectstatus == 0) {
                        console.log("error2");
                        _self.setboardstatuszero();
                         if (_self.passdata() == 3) {
                            _self.settempzero();
                           
                            ws.send("open " + port + " 115200 timed");
                      
                        }
                     // 
                      connectstatus = 1;
                     
                    }
      
                  }
                  
                }
              };
      
              ws.onclose = function () {
                
              };
      
              window.onbeforeunload = function (event) {
                ws.send("restart");
                //socket.close();
              };
            }, 2000);
          }
          function GetPort() {
            ws.send("list");
          }
          function SendSe(data) {

            //var str = document.getElementById("str").value;
            console.log("send " + port + " " + data)
            //console.log("send COM3 54fe010300")
            ws.send("send " + port + " " + data);
      
          }

          function Disconnect() {
            ws.send("close " + port);
          }
          function Restart() {
            ws.send("restart");
          }
          function parseHexString(str) {
            var result = [];
            while (str.length >= 2) {
              result.push(parseInt(str.substring(0, 2), 16));
              str = str.substring(2, str.length);
            }
      
            return result;
          }
          function ConnectCOM() {
            ws.send("list");
            setTimeout(function () {
      
              console.log(portobj.SerialPorts);
              for (var i in portobj.SerialPorts) {
                // console.log(portobj.SerialPorts[i].SerialNumber);
               // if (portobj.SerialPorts[i].SerialNumber == "USB\\VID_10C4\u0026PID_EA60\\0001") {
                if (portobj.SerialPorts[i].SerialNumber == "EB840DB") {
                  //USB\VID_10C4&PID_EA60\0001
                  port = portobj.SerialPorts[i].Name;

                  ws.send("open " + portobj.SerialPorts[i].Name + " 115200 timed");
                 
      
                }
                else {
      
                  this.status = 1;
                }
                
              }
        
            }, 2000);
          }
      
          function Reconnect() {
            //console.log("reconnect");
            ws.send("list");
          }

    }

    private apiUrl = 'http://api4ezzigbee.herokuapp.com';
    data: any = null;

    ngOnInit() {
        this.getcoid();
        this.gettable();
     
    }

    passdata = function ( ) {
        if(this.temp == 1){
            //console.log("temp1");
            return this.temp ;
        }
        if(this.temp == 2){
           // console.log("PERMITJOIN");
            return this.temp;
        }
       
       
    }
    settempzero(){
        this.temp = 0 ;
    }
    setboardstatuszero(){
        console.log("setboardstatuszero");
        this.boardstatus = "WebSocket Not Connected" ;
    }
    clickConnected(){
        window.location.reload();
    }
     clickDisconnect(){
         console.log("clickdisconnect");
         this.temp = 1 ;
        
     }  
     clickjoin(){
        console.log("clickjoin");
        this.temp = 2 ;
    }  
    processSerial = function (data) {
      
        if (data[0] == 84) {
  
          this.boardstatus = "WebSocket Connected";
    
          if (data[1] == 254) {
            if (data[2] == (data.length - 3)) {
              if (data[3] == 0) {
                data = data.splice(3, data.length - 3);
                 console.log((data[17] << 8)+data[18]);
    
              // this.processSensors(data);
                //console.log(this.status);
    
              }
            }
          }
        }
    
        
      }

    onConnected() {
        this.coid = localStorage.getItem('coid');
        console.log("Connected");
        this.client.subscribe("/" + this.coid + "/CMDRES");
        console.log("/" + this.coid + "/CMDRES");
        // this.sendMessage('Web connected to mqtt ');
    }

    sendMessage(message: string) {
        this.coid = localStorage.getItem('coid');
        let packet = new Paho.MQTT.Message(message);
        packet.destinationName = "/" + this.coid + "/LOADCMD";
        this.client.send(packet);
    }

    onMessage() {
        this.client.onMessageArrived = (message: Paho.MQTT.Message) => {
            // console.log('Message arrived : ' + message.payloadString);

            var hex = message.payloadString.match(/.{1,2}/g);
            if (hex[2] == "00" && hex[3] == "01") {

                this.respone['CMD'] = "1";
                var IEEE_ADDR = '';
                for (var i = 5; i < 13; i++) {
                    IEEE_ADDR = IEEE_ADDR.concat(hex[i]);
                }
                this.respone['IEEE_ADDR'] = IEEE_ADDR;
                this.respone['SHORT_ADDR'] = parseInt(hex[13].concat(hex[14]), 16);
                this.respone['CAP'] = parseInt(hex[15], 16);
                //console.log(this.respone);
                this.status = "true";
                this.b = "true";


                //console.log(this.status);
                //console.log(this.b);
            }


        };
    }

    sendname(devicename: string) {
        this.coid = localStorage.getItem('coid');
        this.email = localStorage.getItem('email');
        //console.log("asdsad");
        this.query = "/AddNode?email=" + this.email + "&name=" + devicename + "&ieeeaddr=" + this.respone['IEEE_ADDR'];
        this.query = this.query + "&shortaddr=" + this.respone['SHORT_ADDR'] + "&coid=" + this.coid;
        return this._http.get(this.apiUrl + this.query)
            .map((res: Response) => res.json())
            .subscribe(res => {
                // console.log(res);
                // delay(500);
                // this.gettable();
            });
    }
    editname(devicename: string, ieee: string, addr: string) {
        this.email = localStorage.getItem('email');
        this.coid = localStorage.getItem('coid');
        this.query = "/AddNode?email=" + this.email + "&name=" + devicename + "&ieeeaddr=" + ieee;
        this.query = this.query + "&shortaddr=" + addr + "&coid=" + this.coid;
        //  console.log(this.apiUrl+this.query);
        return this._http.get(this.apiUrl + this.query)
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
        this.coid = localStorage.getItem('coid');
        this.modalRef = this.modalService.show(template);
        // let packet = new Paho.MQTT.Message("PERMITJOIN 255");
        // packet.destinationName = "/" + this.coid + "/LOADCMD";
        // this.client.send(packet);
        this.clickjoin();
    }

    openModal2(template2: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template2);
    }
    openModal3(template3: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template3);
    }

    getcoid() {
        this.email = localStorage.getItem('email');
        //  console.log(this.apiUrl+"/GetCoid?email="+this.email);
        return this._http.get(this.apiUrl + "/GetCoid?email=" + this.email)
            .map((res: Response) => res.json())

            .subscribe(allcoid => {
                this.allcoid = allcoid.coid;
                console.log(this.allcoid);
            });
    }
    refresh(selectcoid: string) {
        localStorage.setItem('coid', selectcoid);
        this.gettable();
        console.log(selectcoid);


    }

    gettable() {
        this.coid = localStorage.getItem('coid');
        console.log(this.coid);
        this.email = localStorage.getItem('email');
        //console.log(this.apiUrl+"/GetTable?email="+this.email+"&coid="+this.coid);
        return this._http.get(this.apiUrl + "/GetTable?email=" + this.email + "&coid=" + this.coid)
            .map((res: Response) => res.json())

            .subscribe(table => {
                this.table = table.table

                console.log(this.table);
            });
    }
    identify() {
        this.coid = localStorage.getItem('coid');
        //console.log(code);
        //console.log("IDENTIFY 255 0 "+this.respone['SHORT_ADDR']+" 10");
        let packet = new Paho.MQTT.Message("IDENTIFY 255 0 " + this.respone['SHORT_ADDR'] + " 1");
        packet.destinationName = "/" + this.coid + "/LOADCMD";
        this.client.send(packet);
    }
    identifyd(addr: string) {
        //    console.log(addr);
        //    console.log();
        this.coid = localStorage.getItem('coid');
        let packet = new Paho.MQTT.Message("IDENTIFY 255 0 " + addr + " 1");
        packet.destinationName = "/" + this.coid + "/LOADCMD";
        this.client.send(packet);
    }
    delete(ieee: string) {

        this.query = "/DelNode?ieeeaddr=" + ieee;

        //console.log(this.apiUrl+this.query);
        return this._http.get(this.apiUrl + this.query)
            .map((res: Response) => res.json())
            .subscribe(res => {

            });

    }

}







