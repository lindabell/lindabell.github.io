function show_skin() {
	var l = $("#logo-poll").html();
	if (!l) {
		$.post('/get_skin/',
				{},
				function(ret){
				$("#logo-poll").html(ret);
				},
				'html')}
	else {
		$("#app-skin-panel").removeClass('hide');
	}
}
var gd="http://www.gfsoso.com/";
is_mobile_device=/mobile/.test(navigator.userAgent.toLowerCase())?1:0;
var Gf={};
Gf.getBrowserName=function(){var a="Browser",b=navigator.userAgent.toLowerCase();
if(/ipad/.test(b)){a="iPad"}else{if(/android/.test(b)){a="Android"}else{if(/xbox/.test(b)){a="xBox"}else{if(/midori/.test(b)){a="Midori"}else{if(/opr/.test(b)){a="Opera Next"}else{if(/maxthon/.test(b)){a="Maxthon"}else{if(/chrome/.test(b)){a="Chrome"}else{if(/fennec/.test(b)){a="Fennec"}else{if(/seamonkey/.test(b)){a="SeaMonkey"}else{if(/iceape/.test(b)){a="Iceape"}else{if(/epiphany/.test(b)){a="Epiphany"}else{if(/palemoon/.test(b)){a="PaleMoon"}else{if(/firefox/.test(b)){a="Firefox"}else{if(/uzbl/.test(b)){a="Uzbl"}else{if(/msie 6/.test(b)){a="IE6"}else{if(/msie 10.*win64/.test(b)&&window.innerWidth==screen.width&&window.innerHeight==screen.height){a="IEMetro"}else{if(/msie [78910]/.test(b)){a="IE"}else{if(/trident\/[6789]/.test(b)){a="IE"}else{if(/opera/.test(b)){a="Opera"}else{if(/iphone/.test(b)){a="iPhone"}else{if(/arora/.test(b)){a="Arora"}else{if(/safari/.test(b)){a="Safari"}}}}}}}}}}}}}}}}}}}}}}return a};

function nui(){
	var w = window;
	var a=navigator.userAgent.toLowerCase();
	var ir=/chrome(?!frame)/.test(navigator.userAgent.toLowerCase())?true:false;
	var provider = "http://"+w.location.host;
	if(w.external&&"IsSearchProviderInstalled" in w.external){
		if(w.external.IsSearchProviderInstalled(provider)==2){
			$("#setse-btn").tooltip('hide');
			$("#setse-btn").ipopover({'content':'谷粉搜搜已经是你的默认搜索引擎啦~~','placement':'bottom','trigger':'focus'}); 
			return false;
		}
		else if(w.external.IsSearchProviderInstalled(provider)==1){
			var browserName=Gf.getBrowserName();
			if(browserName==='Chrome') {
				top.location.replace("http://www.gfsoso.org/674/");
			}
			return false;
		}

	}
	var provider = "http://"+w.location.host+"/opensearch.xml"
		if(w.external&&"AddSearchProvider" in w.external){
			w.external.AddSearchProvider(provider);
			var browserName=Gf.getBrowserName();
			if(browserName==='Chrome') {
				top.location.replace("http://www.gfsoso.org/645/");
			}
			if(!ir){setTimeout("top.location.replace(gd)",10)}
		} 
		else {
			$("#setse-btn").tooltip('hide');
			$("#setse-btn").ipopover({'content':'抱歉，该浏览器暂时不支持~~','placement':'bottom','trigger':'focus'}); 
			return false;
		}
}

function hui(obj){
	var c=Gf.getBrowserName();
	if(c==='Chrome'||c.match(/^Firefox|PaleMoon$/)||c==="Opera Next"||c==="Safari") {
		$("#sethome-btn").tooltip('hide');
	} else {
		return SetHome(obj,'http://www.gfsoso.com/');
	}

}

function fui(obj){
	var c=Gf.getBrowserName();
	if(c==='Chrome'||c.match(/^Firefox|PaleMoon$/)||c==="Opera Next"||c==="Safari") {
		$("#fav-btn").tooltip('hide');
	} else {
		return AddFavorite('谷粉搜搜','http://www.gfsoso.com/')
	}
}


