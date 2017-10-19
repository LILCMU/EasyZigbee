<script src="https://unpkg.com/vue@2.4.2/dist/vue.js"></script>

<div id="app">
<input type="text" v-on:input="changeTitle">
<h1 v-once>
<?= $title ?>
</h1>
<p>
<?= $msg ?>
</p>
<p>
<?= $htmlLink ?>
</p>
<a v-bind:href="link">jsfiddle</a>
</div>

<script>
    new Vue({
	el: '#app',
  data: {
  	title: 'Hello my first Vue.js',
    msg: 'For the first time',
    link: 'https://jsfiddle.net',
    htmlLink: '<a herf="http://www.google.co.th">Google</a>'
  },
  methods:{
  	sayMyName: function(){
    	return 'Moo Lansky is Cool!!!!';
    },
    changeTitle: function(event){
    	this.title = event.target.value;
    }
   
  }
});
</script>