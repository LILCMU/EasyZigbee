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
    public status: any = false;
    public b: any = false;
    public next:any=false;
    public precreate:any= true ;
    public query: any = null;
    public respone = {};
    public username = "admin";
    public CreateStatus  : any = null;
    public table: any = null;
    public clientid: any = null;
    public allcoid: any = null;
    public coid: any = null;
    
    public coidname: any = null;
    imageURL: string;
    email: string;
    name: string;
    token: string;
    CoordinaterID: string;


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
        this.getcoid();
        this.gettable();
    }

    onConnected() {
        this.coid = localStorage.getItem('coid');
        console.log("Connected");
        this.client.subscribe("/"+this.coid+"/CMDRES");
        console.log("/"+this.coid+"/CMDRES");
        // this.sendMessage('Web connected to mqtt ');
    }

    sendMessage(message: string) {
        this.coid = localStorage.getItem('coid');
        let packet = new Paho.MQTT.Message(message);
        packet.destinationName = "/"+this.coid+"/LOADCMD";
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
                if(res.status =="1"){ 
                      
                    this.modalRef.hide()
   
                }
                
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
                if(res.status =="1"){ 
                      
                    this.modalRef.hide()
                    this.gettable();
   
                }
                ;
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
        let packet = new Paho.MQTT.Message("PERMITJOIN 255");
        packet.destinationName = "/"+this.coid+"/LOADCMD";
        this.client.send(packet);
    }

    openModal2(template2: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template2);
    }
    openModal3(template3: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template3);
    }
    //co delete
    openModal4(template4: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template4);
    }
    //alert 
    openModal5(template5: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template5);
    }
    

    getcoid() {
        this.email = localStorage.getItem('email');
     //  console.log(this.apiUrl+"/GetCoid?email="+this.email);
        return this._http.get(this.apiUrl+"/GetCoid?email="+this.email)
            .map((res: Response) => res.json())

            .subscribe(allcoid => {
                this.allcoid = allcoid.network ;
               // this.coidname =  allcoid.network[0];
               // localStorage.setItem('coid', this.coidname.coid);
               //console.log("logJa");
                //console.log(this.coidname.coid);

            });
    }
    refresh(selectcoid:string){
        //console.log(selectcoid) ;
        this.coid = selectcoid.split(" ");
        //console.log(this.coid[2]) ;
        localStorage.setItem('coid', this.coid[2]);
        //localStorage.setItem('coidname', this.coid[0]);
        this.gettable();
      


    }

    gettable() {
        this.coid = localStorage.getItem('coid');
       // console.log(this.coid);
        this.email = localStorage.getItem('email');
       //console.log(this.apiUrl+"/GetTable?email="+this.email+"&coid="+this.coid);
        return this._http.get(this.apiUrl+"/GetTable?email="+this.email+"&coid="+this.coid)
            .map((res: Response) => res.json())

            .subscribe(table => {
                this.table = table.table
                 
              //  console.log(this.table);
            });
    }
    identify() {
        this.coid = localStorage.getItem('coid');
        // console.log(this.coid);
        //console.log("IDENTIFY 255 0 "+this.respone['SHORT_ADDR']+" 10");
        let packet = new Paho.MQTT.Message("IDENTIFY 255 0 " + this.respone['SHORT_ADDR'] + " 1");
        packet.destinationName = "/"+this.coid+"/LOADCMD";
        this.client.send(packet);
       
    }
    identifyd(addr: string) {
        //    console.log(addr);
        //    console.log();
       // console.log(this.coid);
        this.coid = localStorage.getItem('coid');
        let packet = new Paho.MQTT.Message("IDENTIFY 255 0 " + addr + " 1");
        packet.destinationName = "/"+this.coid+"/LOADCMD";
        this.client.send(packet);
        this.gettable();
       
    }
    delete(ieee: string) {

        this.query = "/DelNode?ieeeaddr=" + ieee;

        //console.log(this.apiUrl+this.query);
        return this._http.get(this.apiUrl + this.query)
            .map((res: Response) => res.json())
            .subscribe(res => {
                if(res.status =="1"){ 
                      
                    this.modalRef.hide()
                    this.gettable();
                }
                

            });

    }
    DeleteNetwork() {
        this.coid = localStorage.getItem('coid');
        this.email = localStorage.getItem('email');
        this.query = "/DelCoid?email=" + this.email+"&coid="+this.coid;

        //console.log(this.apiUrl+this.query);
        return this._http.get(this.apiUrl + this.query)
            .map((res: Response) => res.json())
            .subscribe(res => {
                if(res.status =="1"){ 
                      
                    this.modalRef.hide()
                    this.getcoid() ;
                }
                
            });

    }
 
    CreateNetwork(CoordinaterName:string){
        this.CoordinaterID = localStorage.getItem('CoordinaterID');
        this.email = localStorage.getItem('email');
        // console.log(this.CoordinaterID);
        // console.log(CoordinaterName);
        
       
       
        this.query = "/AddCoid?email="+this.email+"&coid="+this.CoordinaterID+"&name="+CoordinaterName;

        console.log(this.apiUrl+this.query);
        return this._http.get(this.apiUrl + this.query)
            .map((res: Response) => res.json())
            .subscribe(res => {
               //delay(1000);
                    console.log(res.status);
                    if(res.status =="1"){ 
                      
                        this.getcoid() ;
                        
                       this.CreateStatus ="Create Success !!"
                       delay(3000);
                       window.location.reload();
                    }
                    else{  this.CreateStatus ="Create fail !!, Please try again.";}
            });
     }
     Next(CoordinaterID:string){
        localStorage.setItem('CoordinaterID', CoordinaterID);
        //console.log(CoordinaterID);
         this.next = "true" ;
         this.precreate =false;
      
     }
    
}







