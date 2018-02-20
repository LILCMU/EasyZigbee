import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map'
import { Http,Response  } from '@angular/http';
import {Paho} from 'ng2-mqtt/mqttws31';
declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    client;
    ngOnInit(){ 
    }
   
    private apiUrl = 'http://ezzigbeeapi.herokuapp.com/Stop';
  
    data: any = null;
    constructor(private _http: Http) {
      this.client = new Paho.MQTT.Client('broker.mqttdashboard.com', 8000, 'clientId-9dPGUIVl3O');
      
          this.onMessage();
          this.onConnectionLost();
          this.client.connect({onSuccess: this.onConnected.bind(this)});
          
          //this.getMyBlog();
      }
     getMyBlog() {
        return this._http.get(this.apiUrl)
                    .map((res: Response) => res)
                        .subscribe(data => {
                             this.data = data;
                            console.log(this.data);
                     });
                   
        }

  onConnected() {
    console.log("Connected");
    this.client.subscribe("EzZigBee/Demo/LoadCode");
    //this.sendMessage('Web connected to mqtt ');
  }

  sendMessage(message: string) {
    let packet = new Paho.MQTT.Message(message);
    packet.destinationName = "EzZigBee/Demo/LoadCode";
    this.client.send(packet);
  }

  onMessage() {
    this.client.onMessageArrived = (message: Paho.MQTT.Message) => {
      console.log('Message arrived : ' + message.payloadString);
    };
  }

  onConnectionLost() {
    this.client.onConnectionLost = (responseObject: Object) => {
      console.log('Connection lost : ' + JSON.stringify(responseObject));
    };
  }
  getcode(code: string) {
    //console.log(code);
    let packet = new Paho.MQTT.Message(code.toString());
    packet.destinationName = "EzZigBee/Demo/LoadCode";
    this.client.send(packet);
  }
  // stop(stop: string) {
  //   console.log(stop);
    
  // }
  
    private _client: Paho.MQTT.Client; 
}
