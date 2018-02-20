import { Component, OnInit, TemplateRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Paho } from 'ng2-mqtt/mqttws31';
import { ChartsModule } from 'ng2-charts';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'user-cmp',
  moduleId: module.id,
  templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
  client;
  modalRef: BsModalRef;
  ngOnInit() {

  }

  private apiUrl = 'https://ezzigbeeapi.herokuapp.com/Dashboard';
  data: any = null;
  sensor: any = null;
  constructor(private _http: Http, private modalService: BsModalService) {

    //this.client = new Paho.MQTT.Client('mqtt.org', 8081, 'clientId-9dPGUIVl3O');
    
   // this.client = new Paho.MQTT.Client('broker.demo.learninginventions.org', 9001, 'clientId-9dPGUIVl3O');
    this.client = new Paho.MQTT.Client('broker.mqttdashboard.com', 8000, 'clientId-9dPGUIVl3O');
    this.onMessage();
    this.onConnectionLost();
    this.client.connect({  onSuccess: this.onConnected.bind(this) });
    this.getMyBlog();

   setInterval(() => { this.getsensor(); }, 10 );
  // this.getsensor();
  
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  private getMyBlog() {
    return this._http.get(this.apiUrl)
      .map((res: Response) => res.json())

      .subscribe(data => {
        this.data = data.Nodes;
        console.log(this.data);
      });
  }
  private getsensor() {
    return this._http.get(this.apiUrl)
      .map((res: Response) => res.json())
      .subscribe(sensor => {
        this.sensor = sensor.Nodes;
        //console.log(this.sensor);
      });
  }
  

  // switch test output
  check1(e) {
    //console.log(e)
    //console.log(e.target.checked)
    console.log(e.target.value)
    if (e.target.checked == true) {
      let packet = new Paho.MQTT.Message("Zigbee.Nodes['" + e.target.value + "'].On(3)");
      packet.destinationName = "EzZigBee/Demo/LoadCode";
      this.client.send(packet);
    }
    else {
      let packet = new Paho.MQTT.Message("Zigbee.Nodes['" + e.target.value + "'].Off(3)");
      packet.destinationName = "EzZigBee/Demo/LoadCode";
      this.client.send(packet);
    }
  }
  // check2(e) {
  //   console.log(e)
  //   console.log(e.target.checked)
  //   console.log(e.target.value)
  //   if (e.target.checked == true) {
  //     let packet = new Paho.MQTT.Message("Zigbee.Nodes['" + e.target.value + "'].On(2)");
  //     packet.destinationName = "EzZigBee/Demo/LoadCode";
  //     this.client.send(packet);
  //   }
  //   else {
  //     let packet = new Paho.MQTT.Message("Zigbee.Nodes['" + e.target.value + "'].Off(2)");
  //     packet.destinationName = "EzZigBee/Demo/LoadCode";
  //     this.client.send(packet);
  //   }
  // }

  onConnected() {
    console.log("Connected");
    this.client.subscribe("EzZigBee/Demo/LoadCode");
   // this.sendMessage('Web connected to mqtt ');
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
  beep(name: string) {
    console.log(name.toString());
    //console.log("Zigbee.Nodes['"+name+"'].Beep()");
    let packet = new Paho.MQTT.Message("Zigbee.Nodes['" + name + "'].Beep()");
    packet.destinationName = "EzZigBee/Demo/LoadCode";
    this.client.send(packet);
  }
  private _client: Paho.MQTT.Client;

//  chart
public barChartOptions:any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels:string[] = ['Sensor 1', 'Sensor 2'];
public barChartType:string = 'bar';
public barChartLegend:boolean = true;

public barChartData:any[] = [
  {data: [50], label: 'Sensor 1'},
  {data: [28], label: 'Sensor 2'}
];

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}


}

