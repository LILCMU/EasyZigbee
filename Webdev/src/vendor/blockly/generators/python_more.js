var variable_msg_mqtt
var text_server_name
var check_mqtt_server
var text_mqttuser
var text_mqttpassword
var statements_onmessage_mqtt

Blockly.Blocks['controls_main'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/home-button.png", 30, 30, "*"))
            .appendField("Main");
        this.appendStatementInput("a")
            .setCheck(null);
        this.setColour('#607D8B');
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
        this.setDeletable(true);
    }
};
Blockly.Python['controls_main'] = function (block) {
    var statements_a = Blockly.Python.statementToCode(block, 'a');

    if (Blockly.Python.STATEMENT_PREFIX) {
        statements_a = Blockly.Python.prefixLines(Blockly.Python.STATEMENT_PREFIX.replace(/%1/g,
            '\'' + block.id + '\''), Blockly.Python.INDENT) + statements_a;
    }
    if (Blockly.Python.INFINITE_LOOP_TRAP) {
        statements_a = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,
            '"' + block.id + '"') + statements_a;
    }
    var returnValue = Blockly.Python.valueToCode(block, 'RETURN',
        Blockly.Python.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = '  return ' + returnValue + '\n';
    } else if (!statements_a) {
        statements_a = Blockly.Python.PASS;
    }
    if (statements_a.includes('publish')) {
        check_mqtt_server = 'publish'
    } else if (statements_a.includes('subscribe')) {
        check_mqtt_server = 'subscribe'
    }
    var code = '$\ndef main():\n' + statements_a + '\$\n';

    return code;
};

Blockly.Blocks['initmqtt_setting'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/mqtt.png", 30, 30, "*"))
            .appendField("MQTT Setting");
        this.appendDummyInput()
            .appendField("Connect to")
            .appendField(new Blockly.FieldTextInput("broker.mqttdashboard.com"), "server_name")
            // .appendField("Topic :")
            // .appendField(new Blockly.FieldTextInput("WhiteArrow"), "topic");
        this.appendDummyInput()
            .appendField("User :")
            .appendField(new Blockly.FieldTextInput("None"), "user")
            .appendField("Password")
            .appendField(new Blockly.FieldTextInput("None"), "password");
        this.appendDummyInput()
            .appendField("leave 'None' for default setting");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#d35400');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['initmqtt_setting'] = function (block) {
    text_server_name = block.getFieldValue('server_name');
    // var text_topic = block.getFieldValue('topic');
    text_mqttuser = block.getFieldValue('user');
    text_mqttpassword = block.getFieldValue('password');
    // TODO: Assemble Python into code variable.
    var code = '';
    return code;
};

Blockly.Blocks['uniqueid_time_publish'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/mqtt.png", 30, 30, "*"))
            .appendField("Publish");
        this.appendValueInput("message")
            .setCheck(null);
        this.appendDummyInput()
            // .appendField("to")
            // .appendField(new Blockly.FieldTextInput("broker.mqttdashboard.com"), "server_name")
            .appendField("to Topic :")
            .appendField(new Blockly.FieldTextInput("WhiteArrow"), "topic")
            .appendField("Retain :")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "retain");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#d35400");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['uniqueid_time_publish'] = function (block) {
    var value_message = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_ATOMIC);
    // text_server_publish = block.getFieldValue('server_name');
    var text_topic = block.getFieldValue('topic');
    var checkbox_retain = block.getFieldValue('retain') == 'TRUE';
    // TODO: Assemble Python into code variable.
    if (checkbox_retain) {
        checkbox_retain = "True"
    } else {
        checkbox_retain = "False"
    }
    var code = 'mqtt.connect()\nmqtt.publish(\'' + text_topic + "\',str(" + value_message + "),retain=" + checkbox_retain + ')\ntime.sleep_ms(100)\nmqtt.disconnect()\n';
    return code;
};

Blockly.Blocks['uniqueid_time_onmsg_subscribe'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/mqtt.png", 30, 30, "*"))
            .appendField("Subscribe !!(Already loop in block)");
        // this.appendDummyInput()
        //     .appendField("Connect to")
        //     .appendField(new Blockly.FieldTextInput("broker.mqttdashboard.com"), "server_name");
        this.appendDummyInput()
            .appendField("Topic :")
            .appendField(new Blockly.FieldTextInput("WhiteArrow/#"), "topic");
        this.appendDummyInput()
            .appendField("Assign MQTT message to")
            .appendField(new Blockly.FieldVariable("message"), "msg");
        this.appendStatementInput("Onmessage")
            .setCheck(null)
            .appendField("do");
        this.appendValueInput("time")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("each loop wait for");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldDropdown([
                ["second(s)", "second"],
                ["millisecond(s)", "milli"],
                ["microsecond(s)", "micro"]
            ]), "suffix_second");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#d35400');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['uniqueid_time_onmsg_subscribe'] = function (block) {
    // text_server_subscribe = block.getFieldValue('server_name');
    var text_topic = block.getFieldValue('topic');
    var waittime = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
    var suffix_time = block.getFieldValue('suffix_second');
    statements_onmessage_mqtt = Blockly.Python.statementToCode(block, 'Onmessage');
    variable_msg_mqtt = Blockly.Python.variableDB_.getName(block.getFieldValue('msg'), Blockly.Variables.NAME_TYPE);
    if (suffix_time == 'second') {
        suffix_time = ''
    } else if (suffix_time == 'milli') {
        suffix_time = '_ms'
    } else if (suffix_time == 'micro') {
        suffix_time = '_us'
    }

    // TODO: Assemble Python into code variable.
    // console.log('statement', statements_onmessage_mqtt);
    var code = 'mqtt.set_callback(onmessage)\nmqtt.connect()\nmqtt.subscribe(b\'' + text_topic + '\')\n' + 'while True:\n' + Blockly.Python.INDENT + 'if True:\n' + Blockly.Python.INDENT + Blockly.Python.INDENT + 'mqtt.wait_msg()\n' + Blockly.Python.INDENT + 'else:\n' + Blockly.Python.INDENT + Blockly.Python.INDENT + 'mqtt.check_msg()\n' + Blockly.Python.INDENT + Blockly.Python.INDENT + 'time.sleep(1)\n' + Blockly.Python.INDENT + 'time.sleep' + suffix_time + '(' + waittime + ')\n';
    return code;
};

Blockly.Blocks['Pin_I2C_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/link-button.png", 30, 30, "*"))
            .appendField("Read I2C from ")
            .appendField(new Blockly.FieldTextInput("address 0x00"), "i2c_addr");
        this.setOutput(true, null);
        this.setColour('#27ae60');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['Pin_I2C_read'] = function (block) {
    var ext_i2c_addr = block.getFieldValue('i2c_addr');
    var code = 'I2C(scl=Pin(13), sda=Pin(5)).readfrom(' + ext_i2c_addr + ', 4)';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['Pin_I2C_write'] = {
    init: function () {
        this.appendValueInput("i2c")
            .appendField(new Blockly.FieldImage("assets/img/block/link-button.png", 30, 30, "*"))
            .setCheck(["Number", "String", "Array"])
            .appendField("Write I2C");
        this.appendDummyInput()
            .appendField("to")
            .appendField(new Blockly.FieldTextInput("address 0x00"), "i2c_addr");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#27ae60');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['Pin_I2C_write'] = function (block) {
    var value_i2c = Blockly.Python.valueToCode(block, 'i2c', Blockly.Python.ORDER_ATOMIC);
    var text_i2c_addr = block.getFieldValue('i2c_addr');
    // TODO: Assemble Python into code variable.
    var code = 'i2c = I2C(scl=Pin(13), sda=Pin(5))\ni2c.writeto(' + text_i2c_addr + ', ' + value_i2c + ')\n';
    return code;
};

Blockly.Blocks['Pin_I2C_scan'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/link-button.png", 30, 30, "*"))
            .appendField("Scan I2C Device(s)");
        this.setOutput(true, null);
        this.setColour('#27ae60');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['Pin_I2C_scan'] = function (block) {
    // TODO: Assemble Python into code variable.
    var code = 'I2C(scl=Pin(13), sda=Pin(5)).scan()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['WLAN_setting'] = {
    init: function () {
        this.appendStatementInput("Wifi_Mode")
            .appendField(new Blockly.FieldImage("assets/img/block/wifi-signal-waves.png", 30, 30, "*"))
            .setCheck(null)
            .appendField("Set WiFi Mode")
            .appendField(new Blockly.FieldDropdown([
                ["Access Point", "AP_IF"],
                ["Station (Other WiFi)", "STA_IF"]
            ]), "Mode")
            .appendField("Active")
            .appendField(new Blockly.FieldDropdown([
                ["Enable", "True"],
                ["Disable", "False"]
            ]), "State");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#31ddbc');
        this.setTooltip('');
    }
};
Blockly.Python['WLAN_setting'] = function (block) {
    var dropdown_mode = block.getFieldValue('Mode');
    var dropdown_state = block.getFieldValue('State');
    var statements_wifi = Blockly.Python.statementToCode(block, 'Wifi_Mode', true);
    statements_wifi = statements_wifi.replace(/\s/g, '');
    statements_wifi = statements_wifi.replace(/\$n/g, '\n');
    // var value_wifi_mode = Blockly.Python.valueToCode(block, 'Wifi Mode', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'wlan = network.WLAN(network.' + dropdown_mode + ')\n' + 'wlan.active(' + dropdown_state + ')' + statements_wifi + '\n';
    return code;
};

Blockly.Blocks['WLAN_connectwifi'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/wifi-signal-waves.png", 30, 30, "*"))
            .appendField("Connect to ")
            .appendField(new Blockly.FieldTextInput("Wifi Name"), "ssid")
            .appendField(" Password")
            .appendField(new Blockly.FieldTextInput("Password"), "pw");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        // this.setOutput(true,null)
        this.setColour('#31ddbc');
        this.setTooltip('');
    }
};
Blockly.Python['WLAN_connectwifi'] = function (block) {
    var text_ssid = block.getFieldValue('ssid');
    var text_pw = block.getFieldValue('pw');
    // TODO: Assemble Python into code variable.
    var code = '$nwlan.connect(' + text_ssid + ', ' + text_pw + ')';
    return code;
};

Blockly.Blocks['WLAN_checknetwork'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/wifi-signal-waves.png", 30, 30, "*"))
            .appendField("Check Network Status")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#31ddbc');
        this.setTooltip('');
    }
};
Blockly.Python['WLAN_checknetwork'] = function (block) {
    var code = '$nwlan.ifconfig()';
    return code;
};

var pin_motor = 1;

Blockly.Blocks['Pin_motor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/swap-horizontal-orientation-arrows.png", 30, 30, "*"))
            .appendField("Talk to")
            .appendField(new Blockly.FieldDropdown([
                ["MotorA", "1"],
                ["MotorB", "2"],
                ["MotorA & MotorB", "3"]
            ]), "pin");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#4FC3F7');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['Pin_motor'] = function (block) {
    var dropdown_pin = block.getFieldValue('pin');
    pin_motor = dropdown_pin;
    return '';
};

Blockly.Blocks['Pin_motor_turn'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/swap-horizontal-orientation-arrows.png", 30, 30, "*"))
            .appendField("Turn motor")
            .appendField(new Blockly.FieldDropdown([
                ["Clockwise", "right"],
                ["Counter-Clockwise", "left"]
            ]), "turn");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#4FC3F7');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
var motor_direction = 'right';
Blockly.Python['Pin_motor_turn'] = function (block) {
    var dropdown_turn = block.getFieldValue('turn');
    // TODO: Assemble Python into code variable.
    motor_direction = dropdown_turn;
    // console.log(motor_direction);

    return '';
};

Blockly.Blocks['Pin_motor_onoff'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/swap-horizontal-orientation-arrows.png", 30, 30, "*"))
            .appendField("Turn motor")
            .appendField(new Blockly.FieldDropdown([
                ["On", "on"],
                ["Off", "off"]
            ]), "on_off");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#4FC3F7');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['Pin_motor_onoff'] = function (block) {
    var dropdown_on_off = block.getFieldValue('on_off');
    // TODO: Assemble Python into code variable.
    // console.log(motor_direction);
    if (dropdown_on_off == 'on') {

        if (motor_direction == 'left') {
            if (pin_motor == '1') {
                var code = 'pin1(1)\npin2(0)\n'
            } else if (pin_motor == '2') {
                var code = 'pin3(1)\npin4(0)\n'
            } else {
                var code = 'pin1(1)\npin2(0)\npin3(1)\npin4(0)\n'
            }
        } else {
            if (pin_motor == '1') {
                var code = 'pin1(0)\npin2(1)\n'
            } else if (pin_motor == '2') {
                var code = 'pin3(0)\npin4(1)\n'
            } else {
                var code = 'pin1(0)\npin2(1)\npin3(0)\npin4(1)\n'
            }
        }
    } else {
        if (pin_motor == '1') {
            var code = 'pin1(0)\npin2(0)\n'
        } else if (pin_motor == '2') {
            var code = 'pin3(0)\npin4(0)\n'
        } else {
            var code = 'pin1(0)\npin2(0)\npin3(0)\npin4(0)\n'
        }
    }
    // console.log(code);
    return code;
};

var pin_servo = 0;
Blockly.Blocks['Pin_PWM_output'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/swap-horizontal-orientation-arrows.png", 30, 30, "*"))
            .appendField("Talk to")
            .appendField(new Blockly.FieldDropdown([
                ["Servo1", "1"],
                ["Servo2", "2"]
            ]), "pin_pwm");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#1abc9c');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['Pin_PWM_output'] = function (block) {
    var dropdown_pin = block.getFieldValue('pin_pwm');
    pin_servo = dropdown_pin;
    if (pin_servo == '1') {
        var code = 'servo1 = PWM(Pin(4), freq=50, duty=77)\n';
    } else {
        var code = 'servo2 = PWM(Pin(14), freq=50, duty=77)\n';
    }
    sensor_servo = 77;
    return code;
};

var sensor_servo = 77;
Blockly.Blocks['Pin_PWM_servo_heading'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/swap-horizontal-orientation-arrows.png", 30, 30, "*"))
            .appendField("Set servo heading")
            .appendField(new Blockly.FieldNumber(0, 30, 122), "sensor_value");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#1abc9c');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['Pin_PWM_servo_heading'] = function (block) {
    var number_sensor_value = block.getFieldValue('sensor_value');
    sensor_servo = number_sensor_value;
    if (pin_servo == '1') {
        var code = 'servo1.duty(' + sensor_servo + ')\n';
    } else {
        var code = 'servo2.duty(' + sensor_servo + ')\n';
    }
    return code;
};

Blockly.Blocks['Pin_PWM_servo_left'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/swap-horizontal-orientation-arrows.png", 30, 30, "*"))
            .appendField("Servo left turn")
            .appendField(new Blockly.FieldNumber(0, 0, 92), "sensor_value_l");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#1abc9c');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['Pin_PWM_servo_left'] = function (block) {
    var number_sensor_value = parseInt(block.getFieldValue('sensor_value_l'));
    //   console.log(number_sensor_value);
    sensor_servo += number_sensor_value;
    if (sensor_servo > 122)
        sensor_servo = 122;
    if (pin_servo == '1') {
        var code = 'servo1.duty(' + sensor_servo + ')\n';
    } else {
        var code = 'servo2.duty(' + sensor_servo + ')\n';
    }
    return code;
};

Blockly.Blocks['Pin_PWM_servo_right'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/swap-horizontal-orientation-arrows.png", 30, 30, "*"))
            .appendField("Servo right turn")
            .appendField(new Blockly.FieldNumber(0, 0, 92), "sensor_value_r");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#1abc9c');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['Pin_PWM_servo_right'] = function (block) {
    var number_sensor_value_r = parseInt(block.getFieldValue('sensor_value_r'));
    sensor_servo -= number_sensor_value_r;
    if (sensor_servo < 30)
        sensor_servo = 30;
    if (pin_servo == '1') {
        var code = 'servo1.duty(' + sensor_servo + ')\n';
    } else {
        var code = 'servo2.duty(' + sensor_servo + ')\n';
    }
    return code;
};

Blockly.Blocks['Pin_PWM_servo_stop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/swap-horizontal-orientation-arrows.png", 30, 30, "*"))
            .appendField("Turn off servo")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#1abc9c');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['Pin_PWM_servo_stop'] = function (block) {
    if (pin_servo == '1') {
        var code = 'servo1.deinit()\n';
    } else {
        var code = 'servo2.deinit()\n';
    }
    return code;
};

Blockly.Blocks['ADC_input'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/swap-horizontal-orientation-arrows.png", 30, 30, "*"))
            .appendField("Analog sensor")
        this.setOutput(true, null);
        this.setColour('#4FC3F7');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['ADC_input'] = function (block) {
    // TODO: Assemble Python into code variable.
    var code = 'ADC(0).read()';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['time_delay'] = {
    init: function () {
        this.appendValueInput("in_value")
            .appendField(new Blockly.FieldImage("assets/img/block/set-timer-button.png", 30, 30, "*"))
            .setCheck("Number")
            .appendField("Wait");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["second(s)", "second"],
                ["millisecond(s)", "milli"],
                ["microsecond(s)", "micro"]
            ]), "prefix_second");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#b7d82c');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['time_delay'] = function (block) {
    var value_in_value = Blockly.Python.valueToCode(block, 'in_value', Blockly.Python.ORDER_ATOMIC);
    var dropdown_prefix_second = block.getFieldValue('prefix_second');
    // TODO: Assemble Python into code variable.
    if (dropdown_prefix_second == 'second') {
        var code = 'time.sleep(' + value_in_value + ')\n'
    } else if (dropdown_prefix_second == 'milli') {
        var code = 'time.sleep_ms(' + value_in_value + ')\n'
    } else if (dropdown_prefix_second == 'micro') {
        var code = 'time.sleep_us(' + value_in_value + ')\n'
    }
    return code;
};

var text_ifttt_key = ''
// var text_ifttt_event = ''
Blockly.Blocks['httplib_IFTTT_start'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/ifttt.png", 30, 30, "*"))
            .appendField("Set webhook key :")
            .appendField(new Blockly.FieldTextInput("Key"), "key");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#455a64');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['httplib_IFTTT_start'] = function (block) {
    text_ifttt_key = block.getFieldValue('key');
    
    //   key = text_key;
    //   event = text_event;
    // TODO: Assemble Python into code variable.
    var code = '';
    return code;
};

Blockly.Blocks['httplib_IFTTT_sent'] = {
    init: function () {
        this.appendValueInput("ifttt_value")
            .appendField(new Blockly.FieldImage("assets/img/block/ifttt.png", 30, 30, "*"))
            .setCheck(null)
            .appendField("Send event :")
            .appendField(new Blockly.FieldTextInput("event name"), "event")
            .appendField("with value")
            .appendField(new Blockly.FieldDropdown([
                ["1", "1"],
                ["2", "2"],
                ["3", "3"]
            ]), "value_id")
            .appendField(":");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#455a64');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['httplib_IFTTT_sent'] = function (block) {
    var dropdown_value_id = block.getFieldValue('value_id');
    var value_ifttt = Blockly.Python.valueToCode(block, 'ifttt_value', Blockly.Python.ORDER_ATOMIC);
    var text_ifttt_event = block.getFieldValue('event');
    // TODO: Assemble Python into code variable.
    var code = 'httplib.post(\'http://maker.ifttt.com/trigger/' + text_ifttt_event + '/with/key/' + text_ifttt_key + '\', json = {\'value'+ dropdown_value_id +'\':str(' + value_ifttt + ')})\n';
    return code;
};

Blockly.Blocks['httplib_netpie_start'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/netpie.png", 30, 30, "*"))
            .appendField("Start")
            .appendField(new Blockly.FieldTextInput("Application"), "app")
            .appendField(", ")
            .appendField(new Blockly.FieldTextInput("Application Key"), "app_key")
            .appendField(", ")
            .appendField(new Blockly.FieldTextInput("Rest API auth"), "rest_auth");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#7f8c8d');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
var url = "";
Blockly.Python['httplib_netpie_start'] = function (block) {
    var text_app = block.getFieldValue('app');
    var text_app_key = block.getFieldValue('app_key');
    var text_rest_auth = block.getFieldValue('rest_auth');

    // TODO: Assemble Python into code variable.
    var code = '';
    url = '\'https://api.netpie.io/topic/' + text_app + '/' + text_app_key + '?retain&auth=' + text_rest_auth + '\'';
    return code;
};

Blockly.Blocks['httplib_Netpie_put'] = {
    init: function () {
        this.appendValueInput("data_put")
            .appendField(new Blockly.FieldImage("assets/img/block/netpie.png", 30, 30, "*"))
            .setCheck(null)
            .appendField("Send data")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#7f8c8d');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['httplib_Netpie_put'] = function (block) {
    var value_data_put = Blockly.Python.valueToCode(block, 'data_put', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = 'httplib.put(' + url + ',data=str(' + value_data_put + '))\n';
    return code;
};

Blockly.Blocks['httplib_json_Netpie_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/netpie.png", 30, 30, "*"))
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Recieve data")
        this.setOutput(true, null);
        this.setColour('#7f8c8d');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['httplib_json_Netpie_get'] = function (block) {
    // TODO: Assemble Python into code variable.
    var code = 'json.loads(httplib.get(' + url + ').text)[0][\'payload\']';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};

var key_datalog = "";
Blockly.Blocks['httplib_datalog_write_key'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/datalog.png", 30, 30, "*"))
            .appendField("Connect to Channel ")
            .appendField(new Blockly.FieldTextInput("Write Key"), "key");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#795548');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['httplib_datalog_write_key'] = function (block) {
    var text_key = block.getFieldValue('key');
    // TODO: Assemble Python into code variable.
    key_datalog = text_key;
    var code = '';
    return code;
};

Blockly.Blocks['httplib_datalog_write'] = {
    init: function () {
        this.appendValueInput("logging_write")
            .appendField(new Blockly.FieldImage("assets/img/block/datalog.png", 30, 30, "*"))
            .appendField("Record")
            .setCheck(null)
        this.appendDummyInput()
            .appendField("to")
            .appendField(new Blockly.FieldDropdown([
                ["Field 1", "1"],
                ["Field 2", "2"],
                ["Field 3", "3"],
                ["Field 4", "4"],
                ["Field 5", "5"],
                ["Field 6", "6"],
                ["Field 7", "7"],
                ["Field 8", "8"]
            ]), "field_id");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#795548');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['httplib_datalog_write'] = function (block) {
    var dropdown_field_id = block.getFieldValue('field_id');
    var value_logging_write = Blockly.Python.valueToCode(block, 'logging_write', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = 'httplib.post(\'https://data.learninginventions.org/update?key=' + key_datalog + '&field' + dropdown_field_id + '=\'+str(' + value_logging_write + '))\n';
    return code;
};

Blockly.Blocks['oled_clear'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/screen-with-rounded-corners.png", 32, 32, "*"))
            .appendField("Clear Display");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#3498db');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['oled_clear'] = function (block) {
    // TODO: Assemble Python into code variable.
    var code = 'oled.clear()\n';
    return code;
};

Blockly.Blocks['oled_text'] = {
    init: function () {
        this.appendValueInput("text")
            .appendField(new Blockly.FieldImage("assets/img/block/screen-with-rounded-corners.png", 30, 30, "*"))
            .setCheck(["Number", "String", "Boolean"])
            .appendField("Show Text");
        this.appendDummyInput()
            .appendField("in Line")
            .appendField(new Blockly.FieldDropdown([
                ["1", "0"],
                ["2", "1"],
                ["3", "2"],
                ["4", "3"],
                ["5", "4"],
                ["6", "5"],
                ["7", "6"],
                ["8", "7"]
            ]), "line_num");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#3498db');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['oled_text'] = function (block) {
    var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
    var dropdown_line_num = block.getFieldValue('line_num');
    // TODO: Assemble Python into code variable.
    var code = 'oled.text(str(' + value_text + '),0,' + dropdown_line_num * 8 + ')\n';
    return code;
};

Blockly.Blocks['Pin_PWM_beeper_time_beep_wait'] = {
    init: function () {
        this.appendValueInput("time")
            .appendField(new Blockly.FieldImage("assets/img/block/volume-up-indicator.png", 30, 30, "*"))
            .setCheck("Number")
            .appendField("beep for");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["second(s)", "second"],
                ["millisecond(s)", "milli"],
                ["microsecond(s)", "micro"]
            ]), "suffix_second");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#f6cb1f');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['Pin_PWM_beeper_time_beep_wait'] = function (block) {
    var waittime = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
    var suffix_time = block.getFieldValue('suffix_second');
    // TODO: Assemble Python into code variable.
    if (suffix_time == 'second') {
        var code = 'beep.duty(512)\n' + 'time.sleep(' + waittime + ')\nbeep.duty(0)\n'
    } else if (suffix_time == 'milli') {
        var code = 'beep.duty(512)\n' + 'time.sleep_ms(' + waittime + ')\nbeep.duty(0)\n'
    } else if (suffix_time == 'micro') {
        var code = 'beep.duty(512)\n' + 'time.sleep_us(' + waittime + ')\nbeep.duty(0)\n'
    }
    return code;
};

Blockly.Blocks['Pin_PWM_beeper_time_beep'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/img/block/volume-up-indicator.png", 30, 30, "*"))
            .appendField("beep");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#f6cb1f');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['Pin_PWM_beeper_time_beep'] = function (block) {
    // TODO: Assemble Python into code variable.
    var code = 'beep.duty(512)\ntime.sleep_ms(100)\nbeep.duty(0)\n';
    return code;
};

Blockly.Blocks['Pin_PWM_beeper_freq'] = {
    init: function () {
        this.appendValueInput("freq")
            .appendField(new Blockly.FieldImage("assets/img/block/volume-up-indicator.png", 30, 30, "*"))
            .setCheck("Number")
            .appendField("set beep frequency");
        this.appendDummyInput()
            .appendField("( 0 - 1024 )");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#f6cb1f');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['Pin_PWM_beeper_freq'] = function (block) {
    var freq_value = Blockly.Python.valueToCode(block, 'freq', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = 'beep.freq(' + freq_value + ')\n';
    return code;
};

Blockly.Blocks['text_binary'] = {
    init: function () {
        this.appendValueInput("text")
            .setCheck(null)
            .appendField("Binary Text");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour("#ad50d4");
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['text_binary'] = function (block) {
    var value_name = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = "b" + String(value_name);
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['ujson_json'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("JSON Key :")
            .appendField(new Blockly.FieldTextInput("key"), "key1")
            .appendField("  value :");
        this.appendDummyInput();
        this.appendValueInput("NAME2")
            .setCheck(null)
            .appendField("Key :")
            .appendField(new Blockly.FieldTextInput("key"), "key2")
            .appendField("  value :");
        this.setOutput(true, null);
        this.setColour('#ad50d4');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['ujson_json'] = function (block) {
    var text_key1 = block.getFieldValue('key1');
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    var text_key2 = block.getFieldValue('key2');
    var value_name2 = Blockly.Python.valueToCode(block, 'NAME2', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = "{'" + text_key1 + "': " + value_name + ", '" + text_key2 + "': " + value_name2 + "}";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['controls_forever'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("forever");
        this.appendStatementInput("NAME")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setColour("#ee1b05");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['controls_forever'] = function (block) {
    var statements_name = Blockly.Python.statementToCode(block, 'NAME');
    var code = 'while True:\n' + statements_name;
    return code;
};

Blockly.Blocks['controls_time_forever_wait'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("forever");
        this.appendStatementInput("statement")
            .setCheck(null)
            .appendField("do");
        this.appendValueInput("time")
            .setCheck("Number")
            .appendField("each loop wait for");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["second(s)", "second"],
                ["millisecond(s)", "milli"],
                ["microsecond(s)", "micro"]
            ]), "suffix_second");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ee1b05');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['controls_time_forever_wait'] = function (block) {
    var statements_name = Blockly.Python.statementToCode(block, 'statement');
    var waittime = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
    var suffix_time = block.getFieldValue('suffix_second');
    // TODO: Assemble Python into code variable.
    if (suffix_time == 'second') {
        var code = 'while True:\n' + statements_name + Blockly.Python.INDENT + 'time.sleep(' + waittime + ')\n'
    } else if (suffix_time == 'milli') {
        var code = 'while True:\n' + statements_name + Blockly.Python.INDENT + 'time.sleep_ms(' + waittime + ')\n'
    } else if (suffix_time == 'micro') {
        var code = 'while True:\n' + statements_name + Blockly.Python.INDENT + 'time.sleep_us(' + waittime + ')\n'
    }
    return code;
};

Blockly.Blocks.math.HUE = '#e91e63';
Blockly.Blocks['math_between'] = {
    init: function () {
        this.appendValueInput("input")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("is in between")
            .appendField(new Blockly.FieldNumber(0), "NUM1")
            .appendField(",")
            .appendField(new Blockly.FieldNumber(100), "NUM2");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(Blockly.Blocks.math.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['math_between'] = function (block) {
    var value_input = Blockly.Python.valueToCode(block, 'input', Blockly.Python.ORDER_ATOMIC);
    var number_num1 = block.getFieldValue('NUM1');
    var number_num2 = block.getFieldValue('NUM2');
    var code = value_input + ' >= ' + number_num1 + ' and ' + value_input + ' <= ' + number_num2;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['logic_ifstate'] = {
    init: function () {
        this.appendValueInput("condition")
            .setCheck(null)
            .appendField("if state change");
        this.appendStatementInput("statement")
            .setCheck(null)
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#ff5252');
        this.setTooltip("");
        this.setHelpUrl("");
    }
}
Blockly.Python['logic_ifstate'] = function (block) {
    var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
    var statements_if_true = Blockly.Python.statementToCode(block, 'statement');
    // TODO: Assemble Python into code variable.
    var code = 'if state_has_changed("' + value_condition + '", '+ value_condition +'):\n' + statements_if_true + '\n';
    return code;
};

this.variable_msg_mqtt = variable_msg_mqtt;
this.text_server_name = text_server_name;
this.check_mqtt_server = check_mqtt_server;
this.text_mqttuser = text_mqttuser;
this.text_mqttpassword = text_mqttpassword;
this.statements_onmessage_mqtt = statements_onmessage_mqtt;