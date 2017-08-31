using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Zigbee_termial_NodeMCU
{
    public partial class Form1 : Form
    {
        byte b;
        public Form1()
        {
            InitializeComponent();
            serialPort1 = new SerialPort("COM21", 115200, Parity.None, 8, StopBits.One);
        }


        private void button1_Click(object sender, EventArgs e)
        {
            b = Convert.ToByte(0x05);
            serialPort1.Write(new byte[] { b }, 0, 1);
        }
    }
}
