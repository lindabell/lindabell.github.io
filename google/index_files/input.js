$(function() {
	$("#su").click(function() {
		var kw = $("#kw").val();
		kw = kw.replace(/[ ]/g, "");
		if (kw === '') return false;
	});
	$("#kw").focus(function() {
		$(".s_ipt_wr").css("borderColor", "#2d78f4");
	});
	$("#kw").blur(function() {
		$(".s_ipt_wr").css("borderColor", "#b8b8b8");
	});

	$("#kw").focus();
	var params = {
		"XOffset": 0,
		"YOffset": 0,
		"fontColor": "#000",
		"fontColorHI": "#000",
		"fontSize": "medium",
		"fontFamily": "Arial",
		"borderColor": "#ccc",
		"bgcolorHI": "#ebebeb",
		"sugSubmit": true
	};
	BaiduSuggestion.bind("kw", params);
});
