// $("#leftside-navigation .sub-menu > a").click(function(e) {
//     $("#leftside-navigation ul ul").slideUp(), $(this).next().is(":visible") || $(this).next().slideDown(),
//     e.stopPropagation()
//   })
 
  function alldevice(){
    
    var hr= new XMLHttpRequest();
    hr.open("GET","getapi",true);
    hr.onreadystatechange=function(){
        if(hr.readyState===4 && hr.status===200){
            var data =JSON.parse(hr.response);
            
            var result =document.getElementById("result");
            result.innerHTML="";
            var i ;
            for( i = 0; i < data.Nodes.length; i++){
                result.innerHTML+=   
                 "<tr>"

                    +" <div class='col-lg-3' style= 'background-color:black; margin: 10px 10px; border-radius: 8px;padding : 5px 0px 5px;' >"
                    +" <h4 style='padding: 0px 10px 0px 10px;'>Node : "+data.Nodes[i].Name+"<button style= 'color:white ; background-color:#E6A01F;float:right;  '  type='button' id='"+data.Nodes[i].Name+"_port1' onclick='Beep(this.id);'>BEEP</button></h4>"
                    +" <div class='col-lg-6'>"
                    +"<span> Sensor 1 :<p id='"+data.Nodes[i].Name+"_sensor1'> "+data.Nodes[i].Sensor1+"</p></span>"
                    +"</div>"
                    +"<div class='col-lg-6'>"
                    +"<span> Sensor 2 :<p id='"+data.Nodes[i].Name+"_sensor2'> "+data.Nodes[i].Sensor2+"</p></span>"
                    +"</div>"
                    +"<div class='col-lg-12'></div>"
                    +"<div class='col-lg-6'>"
                    +"<h4 style='background-color:#D82989; border-radius: 8px; padding: 2px;'> Output 1 </h4>"
                    +"<label class='switch' style='margin:0px 30px;'>"
                    +"<input type='checkbox' id='"+data.Nodes[i].Name+"_port1' onclick='if(this.checked){on1(this.id);}else{off1(this.id);}'>"
                    +"<span class='slider round'></span>"
                    +"</label>"
                    +"</div>"
                    +"<div class='col-lg-6'>"
                    +"<h4 style='background-color:#D82989;border-radius: 8px; padding: 2px;'> Output 2 </h4>"
                    +"<label class='switch' style='margin:0px 30px;'>"
                    +"<input type='checkbox'id='"+data.Nodes[i].Name+"_port2' onclick='if(this.checked){on2(this.id);}else{off2(this.id);}'>"
                    +"<span class='slider round'></span>"
                    +"</label>"
                    +"</div>"
                    +"</div>"
                    +"</tr>";
                 
                  
                 
            }
        }
    }
    hr.send(null);
    document.getElementById("result").innerHTML="Wait.......";
}
    function updatedata(){
    setInterval(function update(){
        var hra= new XMLHttpRequest();
        hra.open("GET","getapi",true);
        hra.onreadystatechange=function(){
            if(hra.readyState===4 && hra.status===200){
                var dataa =JSON.parse(hra.response);
                var j ;
                for( j = 0; j < dataa.Nodes.length; j++){
                    //alert(dataa.Nodes[j].Sensor1.toString());
                    document.getElementById(dataa.Nodes[j].Name+"_sensor1").innerHTML = dataa.Nodes[j].Sensor1.toString();
                    document.getElementById(dataa.Nodes[j].Name+"_sensor2").innerHTML = dataa.Nodes[j].Sensor2.toString();
                }
            }
        }
        hra.send(null);
    },3000);
}
function Beep(Name){
    
        
        var hr= new XMLHttpRequest();
        hr.open("GET","sendmqttbeep?name="+Name,true);
        hr.send();
}
     
function on1(Name){
    
        
        var hr= new XMLHttpRequest();
        hr.open("GET","sendmqtton?port=1&name="+Name,true);
        hr.send();
}

function off1(Name){
    var hr= new XMLHttpRequest();
    hr.open("GET","sendmqttoff?port=1&name="+Name,true);
    hr.send();
}
function on2(Name){
    
    var hr= new XMLHttpRequest();
    hr.open("GET","sendmqtton?port=2&name="+Name,true);
    hr.send();
}

function off2(Name){
    var hr= new XMLHttpRequest();
    hr.open("GET","sendmqttoff?port=2&name="+Name,true);
    hr.send();
}
function stop(){
    var hr= new XMLHttpRequest();
    hr.open("GET","stop",true);
    hr.send();
}

