<?php

class IndexController extends ControllerBase
{
    public function initialize()
    {
    }

    public function indexAction()
    {
        $this->view->disable();
        $this->response->redirect('index/login');
    }
    public function loginAction()
    {
        $this->assets->addCss('/public/css/login.css');
        $this->assets->addJs('https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js');
        $this->assets->addJs('https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js');

     // check conditions
     $namecondition = "[^!#$%&'()*+,-./:;<=>?@/]{1,}" ;
     $telcondition= "[0-9]{10,10}" ;
     $this->view->setVar("namecondition",$namecondition);


     $login = $this->request->getpost('submit');
     $rememberme =  $this->cookies->get("user");
     $checkbox = $this->request->getpost('checkbox') ;

    //  $username = $this->request->getpost('username');
     if($login){
        //  var_dump($username) ; exit();
        if (  $checkbox == 'check') 
        {
         $cookie_name = "user";
         $cookie_value =$this->request->getpost('username');
         $this->cookies->set($cookie_name,$cookie_value);
        }
     if ($checkbox == '') 
        {
            // var_dump($checkbox) ; exit();
            $cookie_name = "user";
            $cookie_value ="";
            $this->cookies->set($cookie_name,$cookie_value);
        }
        // remember
        
        $this->response->redirect('index/dashboard');
     }
     $this->view->setVar("rememberme",$rememberme);
    }

   
    public function dashboardAction()
    {
        $this->assets->addCss('/public/css/dashboard.css');
        $this->assets->addJs('/public/js/dashboard.js');
        $url = "http://ezzigbeeapi.herokuapp.com/Dashboard";
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER,
        array(
            'content-type: application/json'
        ));
      $dataalldevice = curl_exec($curl);
      $result = json_decode($dataalldevice);
	 
      $this->session->set("alldevice",$dataalldevice);
    //   var_dump($result); exit();

        $request =$this->request;
        if ($request->isPost()==true) {
             if ($request->isAjax() == true) {
                $code = $_POST['codedata'];
                $this->sendmqtt($code);
            }
        }
        
    }
    public function getapiAction(){
        $this->view->disable();
        $url = "http://ezzigbeeapi.herokuapp.com/Dashboard";
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER,
        array(
            'content-type: application/json'
        ));
        $dataalldevice = curl_exec($curl);
        // $result = json_encode($dataalldevice);
        echo($dataalldevice) ;
    }
    public function sendmqttonAction(){
        $port = $_GET["port"] ;
        $name = $_GET["name"] ;
       

        require('phpMQTT.php');
        $name = explode("_",$name) ;
        $message = "Zigbee.Nodes['".$name[0]."'].On(".$port.")";
        $mqtt = new Bluerhinos\phpMQTT('broker.mqtt-cpe.ml', '1883', 'PHP');
        if ($mqtt->connect(true, NULL, '', '')) {
            $mqtt->publish('EzZigBee/Demo/LoadCode', $message, 0);
            echo "Published message: " . $message;
            $mqtt->close();
        }else{
            echo "Fail or time out<br />";
        }

    }
    public function sendmqttbeepAction(){
    
        $name = $_GET["name"] ;
        require('phpMQTT.php');
        $name = explode("_",$name) ;
        $message = "Zigbee.Nodes['".$name[0]."'].Beep()";
        $mqtt = new Bluerhinos\phpMQTT('broker.mqtt-cpe.ml', '1883', 'PHP');
        if ($mqtt->connect(true, NULL, '', '')) {
            $mqtt->publish('EzZigBee/Demo/LoadCode', $message, 0);
            echo "Published message: " . $message;
            $mqtt->close();
        }else{
            echo "Fail or time out<br />";
        }

    }
    public function sendmqttoffAction(){
        $port = $_GET["port"] ;
        $name = $_GET["name"] ;
       

        require('phpMQTT.php');
        $name = explode("_",$name) ;
        $message = "Zigbee.Nodes['".$name[0]."'].Off(".$port.")";
        $mqtt = new Bluerhinos\phpMQTT('broker.mqtt-cpe.ml', '1883', 'PHP');
        if ($mqtt->connect(true, NULL, '', '')) {
            $mqtt->publish('EzZigBee/Demo/LoadCode', $message, 0);
            echo "Published message: " . $message;
            $mqtt->close();
        }else{
            echo "Fail or time out<br />";
        }

    }
    public function sendmqtt($code){
        
        require('phpMQTT.php');
        $message = $code;
        $mqtt = new Bluerhinos\phpMQTT('broker.mqtt-cpe.ml', '1883', 'PHP');
        if ($mqtt->connect(true, NULL, '', '')) {
            $mqtt->publish('EzZigBee/Demo/LoadCode', $message, 0);
            echo "Published message: " . $message;
            $mqtt->close();
        }else{
            echo "Fail or time out<br />";
        }

    }

    public function stopAction(){
        $this->view->disable();
        $url = "http://ezzigbeeapi.herokuapp.com/Stop";
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER,
        array(
            'content-type: application/json'
        ));
        $dataalldevice = curl_exec($curl);
        // $result = json_encode($dataalldevice);
        
    }
    public function chartAction()
    {
        
    }

    
}

