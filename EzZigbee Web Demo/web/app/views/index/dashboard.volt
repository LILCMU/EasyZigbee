<!DOCTYPE html>
{{ assets.outputCss() }} {{ assets.outputJs() }}
<html>

<head>
  <meta charset="UTF-8">
  <title>One Page Navigation CSS Menu</title>
  <meta name="designer" content="Alberto Hartzet">
  <meta name="programer" content="Alberto Hartzet">
  <meta name="author" content="Alberto Hartzet">
  <meta name="description" content="One page navigation with pure CSS">
  <meta property="og:url" content="https://codepen.io/hrtzt/details/NPZKRN">
  <meta property="og:image" content="https://pbs.twimg.com/media/CCNJN_XUMAAJSzU.jpg:large">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
  <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css'>
  <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
  <style>
    /* NOTE: The styles were added inline because Prefixfree needs access to your styles and they must be inlined if they are on local disk! */

    html,
    body,
    .page {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      transition: all .6s cubic-bezier(.5, .2, .2, 1.1);
      -webkit-transition: all .6s cubic-bezier(.5, .2, .2, 1.1);
      -moz-transition: all .6s cubic-bezier(.5, .2, .2, 1.1);
      -o-transition: all .6s cubic-bezier(.5, .2, .2, 1.1);
      color: #fff;
      overflow: hidden;
    }

    * {
      font-family: 'open sans', 'lato', 'helvetica', sans-serif;
    }

    .page {
      position: absolute;
    }

    #p1 {
      left: 0;
    }

    #p2,
    #p3,
    #p4,
    #p5 {
      left: 200%;
    }

    #p1 {
      background: darkslateblue;
    }

    #p2 {
      background: tomato;
    }

    #p3 {
      background: gold;
    }

    #p4 {
      background: deeppink;
    }

    #p5 {
      background: rebeccapurple;
    }

    #t2:target #p2,
    #t3:target #p3,
    #t4:target #p4,
    #t5:target #p5 {
      transform: translateX(-190%);
      -webkit-transform: translateX(-190%);
      -moz-transform: translateX(-190%);
      -o-transform: translateX(-190%);
      transition-delay: .4s !important;
    }

    #t2:target #p1,
    #t3:target #p1,
    #t4:target #p1,
    #t5:target #p1 {
      background: black;
    }

    #t2:target #p1 .icon,
    #t3:target #p1 .icon,
    #t4:target #p1 .icon,
    #t5:target #p1 .icon {
      -webkit-filter: blur(3px);
    }

    .icon {
      color: #fff;
      font-size: 32px;
      display: block;
    }

    ul .icon:hover {
      opacity: 0.5;
    }

    .page .icon .title {
      line-height: 2;
    }

    #t2:target ul .icon,
    #t3:target ul .icon,
    #t4:target ul .icon,
    #t5:target ul .icon {
      transform: scale(.6);
      -webkit-transform: scale(.6);
      -moz-transform: scale(.6);
      -o-transform: scale(.6);
      transition-delay: .25s;
    }

    #t2:target #dos,
    #t3:target #tres,
    #t4:target #cuatro,
    #t4:target #cinco {
      transform: scale(1.2) !important;
      -webkit-transform: scale(1.2) !important;
      -moz-transform: scale(1.2) !important;
      -o-transform: scale(1.2) !important;
    }

    ul {
      position: fixed;
      z-index: 1;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      height: 280px;
      width: 10%;
      padding: 0;
      text-align: center;
    }

    #menu .icon {
      margin: 30px 0;
      transition: all .5s ease-out !important;
      -webkit-transition: all .5s ease-out;
      -moz-transition: all .5s ease-out;
      -o-transition: all .5s ease-out;
    }

    a {
      text-decoration: none;
    }

    .title,
    .hint {
      display: block;
    }

    .title {
      font-size: 38px;
    }

    .hint {
      font-size: 13px;
    }

    #p4 .hint {
      display: inherit !important;
    }

    .hint a {
      color: yellow;
      transition: all 250ms ease-out;
      -webkit-transition: all 250ms ease-out;
      -moz-transition: all 250ms ease-out;
      -o-transition: all 250ms ease-out;
    }

    .hint a:hover {
      color: #FFF;
    }

    .line-trough {
      text-decoration: line-through;
    }

    .page .icon {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10%;
      left: 0;
      width: 270px;
      height: 170px;
      margin: auto;
      text-align: center;
      font-size: 80px;
      line-height: 1.3;
      transform: translateX(360%);
      -webkit-transform: translateX(360%);
      -moz-transform: translateX(360%);
      -o-transform: translateX(360%);
      transition: all .5s cubic-bezier(.25, 1, .5, 1.25);
      -webkit-transition: all .5s cubic-bezier(.25, 1, .5, 1.25);
      -moz-transition: all .5s cubic-bezier(.25, 1, .5, 1.25);
      -o-transition: all .5s cubic-bezier(.25, 1, .5, 1.25);
    }

    .page#p1 .icon {
      height: 220px;
    }

    .page#p1 .icon {
      transform: translateX(10%) !important;
    }

    #t2:target .page#p2 .icon,
    #t3:target .page#p3 .icon,
    #t4:target .page#p4 .icon,
    #t5:target .page#p5 .icon {
      transform: translateX(0) !important;
      -webkit-transform: translateX(0) !important;
      -moz-transform: translateX(0) !important;
      -o-transform: translateX(0) !important;
      transition-delay: 1s;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    .switch input {
      display: none;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }

    input:checked+.slider {
      background-color: #2196F3;
    }

    input:focus+.slider {
      box-shadow: 0 0 1px #2196F3;
    }

    input:checked+.slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
    /* Rounded sliders */

    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }

    h4 {
      text-align: center;
    }
  </style>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>

</head>

<body>
  <div class="ct" id="t1">
    <div class="ct" id="t2">
      <div class="ct" id="t3">
        <div class="ct" id="t4">
          <div class="ct" id="t5">
            <ul id="menu">
              <!-- <a href="#t1"><li class="icon fa fa-bar-chart" id="uno"></li></a> -->
              <a href="#t2">
                <li class="icon fa fa fa-hdd-o" id="dos"></li>
              </a>
              <a href="#t3"><li class="icon fa fa-puzzle-piece" id="tres"></li></a>
            <!-- <a href="#t4"><li class="icon fa fa-cogs" id="cuatro"></li></a>
            <a href="#t5"><li class="icon fa fa-plus-circle" id="cinco"></li></a> -->
            </ul>
            <div class="page" id="p1">
              <section class="icon fa fa-bar-chart"><span class="title">Dashboard</span></section>

            </div>
            <div class="page" id="p2">
              <section class="icon fa fa fa-hdd-o"><span class="title">Devices</span></section>
              <div class="row" style="margin: 20px 0px ;">
                <div class="col-lg-12" style="margin: 0px 65px ;">
                    <div id="result"></div>
                    
                  <!-- <div class="col-lg-3" style="background-color:black; margin: 10px 10px; border-radius: 8px;padding : 5px 0px 5px;">
                        <h4>Node : test</h4>
                    <div class="col-lg-6">
                      <span> Sensor 1 : 1234 </span>
                    </div>
                    <div class="col-lg-6">
                      <span> Sensor 2 : 1234 </span>
                    </div>
                    <div class="col-lg-12"></div>
                    <div class="col-lg-6">
                      <h4 style="background-color:#D82989; border-radius: 8px; padding: 2px;"> Output 1 </h4>
                      <label class="switch" style="margin:0px 30px;">
                          <input type="checkbox" checked>
                          <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="col-lg-6">
                      <h4 style="background-color:#D82989;border-radius: 8px; padding: 2px;"> Output 2 </h4>
                      <label class="switch" style="margin:0px 30px;">
                            <input type="checkbox" checked>
                            <span class="slider round"></span>
                          </label>
                    </div>
                  </div> -->
                  

                  
                </div>
              </div>
            </div>
            <div class="page" id="p3">
              <form action="" method="post" >
              <section class="icon fa fa-puzzle-piece" style="margin:230px 850px; "><span class="title">Control</span></section>
              <textarea   type="text"  placeholder="Enter your code here" style="color:black; margin: 25px 20px; padding:10px 10px; border-radius: 8px;" rows="35" cols="100" id="codedata" ></textarea>
              <button style="color:white ; background-color:#0EB92A "  type="button" id="submitcode" value="submitcode" ><i class="fa fa-download" aria-hidden="true"></i> &nbsp; DOWNLOAD</button>
              <button style="color:white ; background-color:#E6A01F "  type="button" onclick="stop();">   STOP</button>
             
              </form>
              <script>
               alldevice();
               updatedata();
              $('#submitcode').click(function() {
               console.log($('#codedata').val());
                $.ajax({
                    url: 'dashboard',
                    type: 'POST',
                    data: {
                        codedata : $('#codedata').val()
                    },
                    success: function(msg) {
                      console.log('success');
                    }        
                    ,
                    error: function(msg) {
                      console.log('error');
                    }                      
                });
            });
            


$("textarea").keydown(function(e) {
    if(e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var $this = $(this);
        var value = $this.val();

        // set textarea value to: text before caret + tab + text after caret
        $this.val(value.substring(0, start)
                    + "\t"
                    + value.substring(end));

        // put caret at right position again (add one for the tab)
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        e.preventDefault();
    }
});
            </script>
            </div>
            <div class="page" id="p4">
              <section class="icon fa fa-cogs">
                <span class="title">Setting</span>
              </section>
            </div>
            <div class="page" id="p5">
              <section class="icon fa fa-plus-circle">
                <span class="title">Support</span>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



</body>

</html>