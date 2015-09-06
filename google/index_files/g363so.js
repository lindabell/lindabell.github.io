function rwurl(myform,canshu)
{
//	alert(myform.no.value);
	var url = canshu + document.getElementById('txtno').value + ".html";
//	alert(url)
//	var url = canshu+urlencode(myform.no.value)+".html";
	if(myform.no.value!="")
	{
		window.location.href=url;
	}else{
//		window.location.href=canshu+myform.no.value+".html";
	}
}
 
function submitForm() 
{ 
 
	if(window.event.keyCode == 13) 
	{ 
		openurl();
	} 
}
function openurl()
{   
	window.location.href=canshu+document.getElementById('txtno').value+".html";
}
 
function writepage()
{
	var temptxt = "";
	var linkurl;
	
	temptxt = temptxt + "<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" id=\"nav\">";
	temptxt = temptxt + "  <tr valign=\"top\">";
	
	if((p-1)<=1)
		linkurl = pageurl + ".html";
	else
		linkurl = pageurl+"_p"+(p-1)+".html";
		
	temptxt = temptxt + "<td align=\"left\" class=\"b\"><a href=\""+linkurl+"\"><span class=\"csb\" style=\"background-position:0 0;float:right;width:53px\"></span><span style=\"display:block;margin-right:35px;clear:right\">上一页</span></a></td>";
	
	for(var i = p_start; i <= p_end; i++) 
	{
		if(i==p)
		{
			temptxt = temptxt + "<td><span class=\"csb\" style=\"background-position:-53px 0;width:20px\"></span><b>"+i+"</b></td>";	
		}
		else
		{
			if (i==1)
			{
				linkurl = pageurl + ".html";
			}
			else
			{
				linkurl = pageurl+"_p"+i+".html";
			}
			temptxt = temptxt + "<td><a class=\"fl\" href=\""+linkurl+"\"><span class=\"csb\" style=\"background-position:-74px 0;width:20px\"></span>"+i+"</a></td>";
		}
		
		
	}
	
	if ((p+1) >p_end)
	{
		linkurl = pageurl+"_p"+p_end+".html";
	}
	else
	{
		linkurl = pageurl+"_p"+(p+1)+".html";
	}
	
	temptxt = temptxt + "<td class=\"b\" style=\"text-align:left\"><a href=\""+linkurl+"\" style=\"text-align:left\"><span class=\"csb\" style=\"background-position:-96px 0;width:71px\"></span><span style=\"display:block;margin-left:53px\">下一页</span></a></td>";
	temptxt = temptxt + "  </tr>";
	temptxt = temptxt + "</table>";
	
	document.write(temptxt);
}

function writeleft()
{
	var temptxt = "";
	
	var linkurl = ""
	linkurl = purl + q + "_" + lr + "_" + qdr + "_" + sbd + "_" + li + ".html"

	temptxt = temptxt + "<div class=\"col-sm-3 col-md-1 sidebar\" style=\"padding-top:80px\">";
	temptxt = temptxt + "<ul class=\"nav nav-sidebar\">";
	if (lr == "all")
	{
		linkurl = purl + q + "_" + "all" + "_" + qdr + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li class=\"active\"><a style=\"font-size:12px;color:#dd4b39\"  href=\""+linkurl+"\">不限语言</a></li>";
	}
	else
	{
		linkurl = purl + q + "_" + "all" + "_" + qdr + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li><a style=\"font-size:12px;color:#000\"  href=\""+linkurl+"\">不限语言</a></li>";
	}
	
	if (lr == "acn")
	{
		linkurl = purl + q + "_" + "acn" + "_" + qdr + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li ><a style=\"font-size:12px;color:#dd4b39\"  href=\""+linkurl+"\">所有中文网页</a></li>";
	}
	else
	{
		linkurl = purl + q + "_" + "acn" + "_" + qdr + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li><a style=\"font-size:12px;color:#000\"  href=\""+linkurl+"\">所有中文网页</a></li>";
	}
	
	if (lr == "cn")
	{
		linkurl = purl + q + "_" + "cn" + "_" + qdr + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li ><a style=\"font-size:12px;color:#dd4b39\"  href=\""+linkurl+"\">简体中文网页</a></li>";
	}
	else
	{
		linkurl = purl + q + "_" + "cn" + "_" + qdr + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li><a style=\"font-size:12px;color:#000\"  href=\""+linkurl+"\">简体中文网页</a></li>";
	}
	temptxt = temptxt + "</ul>";
	temptxt = temptxt + "<ul class=\"nav nav-sidebar\">";
	
	if (qdr == "all")
	{
		linkurl = purl + q + "_" + lr + "_" + "all" + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li class=\"active\"><a style=\"font-size:12px;color:#dd4b39\"  href=\""+linkurl+"\">时间不限</a></li>";
	}
	else
	{
		linkurl = purl + q + "_" + lr + "_" + "all" + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li><a style=\"font-size:12px;color:#000\"  href=\""+linkurl+"\">时间不限</a></li>";
	}
	
	if (qdr == "h")
	{
		linkurl = purl + q + "_" + lr + "_" + "h" + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li class=\"active\"><a style=\"font-size:12px;color:#dd4b39\"  href=\""+linkurl+"\">过去 1 小时内</a></li>";
	}
	else
	{
		linkurl = purl + q + "_" + lr + "_" + "h" + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li><a style=\"font-size:12px;color:#000\"  href=\""+linkurl+"\">过去 1 小时内</a></li>";
	}
	
	if (qdr == "d")
	{
		linkurl = purl + q + "_" + lr + "_" + "d" + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li class=\"active\"><a style=\"font-size:12px;color:#dd4b39\"  href=\""+linkurl+"\">过去 24 小时内</a></li>";
	}
	else
	{
		linkurl = purl + q + "_" + lr + "_" + "d" + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li><a style=\"font-size:12px;color:#000\"  href=\""+linkurl+"\">过去 24 小时内</a></li>";
	}
	
	if (qdr == "w")
	{
		linkurl = purl + q + "_" + lr + "_" + "w" + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li class=\"active\"><a style=\"font-size:12px;color:#dd4b39\"  href=\""+linkurl+"\">过去 1 周内</a></li>";
	}
	else
	{
		linkurl = purl + q + "_" + lr + "_" + "w" + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li><a style=\"font-size:12px;color:#000\"  href=\""+linkurl+"\">过去 1 周内</a></li>";
	}
	
	if (qdr == "m")
	{
		linkurl = purl + q + "_" + lr + "_" + "m" + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li class=\"active\"><a style=\"font-size:12px;color:#dd4b39\"  href=\""+linkurl+"\">过去 1 个月内</a></li>";
	}
	else
	{
		linkurl = purl + q + "_" + lr + "_" + "m" + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li><a style=\"font-size:12px;color:#000\"  href=\""+linkurl+"\">过去 1 个月内</a></li>";
	}
	if (qdr == "y")
	{
		linkurl = purl + q + "_" + lr + "_" + "y" + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li class=\"active\"><a style=\"font-size:12px;color:#dd4b39\"  href=\""+linkurl+"\">过去 1 年内</a></li>";
	}
	else
	{
		linkurl = purl + q + "_" + lr + "_" + "y" + "_" + sbd + "_" + li + ".html"
		temptxt = temptxt + "<li><a style=\"font-size:12px;color:#000\"  href=\""+linkurl+"\">过去 1 年内</a></li>";
	}

	temptxt = temptxt + "</ul>";
	temptxt = temptxt + "<ul class=\"nav nav-sidebar\">";
	
	if (li == 0)
	{
		linkurl = purl + q + "_" + lr + "_" + qdr + "_" + sbd + "_" + "0" + ".html"
		temptxt = temptxt + "<li class=\"active\"><a style=\"font-size:12px;color:#dd4b39\"  href=\""+linkurl+"\">所有结果</a></li>";
	}
	else
	{
		linkurl = purl + q + "_" + lr + "_" + qdr + "_" + sbd + "_" + "0" + ".html"
		temptxt = temptxt + "<li><a style=\"font-size:12px;color:#000\"  href=\""+linkurl+"\">所有结果</a></li>";
	}
	
	if (li == 1)
	{
		linkurl = purl + q + "_" + lr + "_" + qdr + "_" + sbd + "_" + "1" + ".html"
		temptxt = temptxt + "<li class=\"active\"><a style=\"font-size:12px;color:#dd4b39\"  href=\""+linkurl+"\">精确匹配</a></li>";
	}
	else
	{
		linkurl = purl + q + "_" + lr + "_" + qdr + "_" + sbd + "_" + "1" + ".html"
		temptxt = temptxt + "<li><a style=\"font-size:12px;color:#000\"  href=\""+linkurl+"\">精确匹配</a></li>";
	}
	
	temptxt = temptxt + "<li><a style=\"font-size:12px;color:#000\" href=\"\/s\/"+q+".html\">重置搜索</a></li>";
	

	temptxt = temptxt + "</ul>";
	temptxt = temptxt + "</div> ";
//	alert(temptxt);

	document.write(temptxt);
}
 