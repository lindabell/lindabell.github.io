document.write ("<DIV id=img1 style='Z-INDEX: 100; LEFT: 2px; WIDTH: 252px; POSITION: absolute; TOP: 43px; HEIGHT: 172px; ") 
document.write (" visibility: visible;'> ") 
document.write (" <a href='http://s.jb51.net' target='_blank'> ") 
document.write (" <img src='/blog/images/FreeWifi/buy.png'style=border:none;/> ") 
document.write (" </a></DIV> ") 
var xPos = 300; 
var yPos = 200; 
var step = 1; 
var delay = 8; 
var height = 0; 
var Hoffset = 0; 
var Woffset = 0; 
var yon = 0; 
var xon = 0; 
var pause = true; 
var interval; 
img1.style.top = yPos; 
function changePos() 
{ 
width = document.documentElement.clientWidth; 
height = document.documentElement.clientHeight; 
Hoffset = img1.offsetHeight; 
Woffset = img1.offsetWidth; 
img1.style.left = xPos + document.documentElement.scrollLeft; 
img1.style.top = yPos + document.documentElement.scrollTop; 
if (yon) 
{yPos = yPos + step;} 
else 
{yPos = yPos - step;} 
if (yPos < 0) 
{yon = 1;yPos = 0;} 
if (yPos >= (height - Hoffset)) 
{yon = 0;yPos = (height - Hoffset);} 
if (xon) 
{xPos = xPos + step;} 
else 
{xPos = xPos - step;} 
if (xPos < 0) 
{xon = 1;xPos = 0;} 
if (xPos >= (width - Woffset)) 
{xon = 0;xPos = (width - Woffset); } 
} 
function start() 
{ 
img1.visibility = "visible"; 
interval = setInterval('changePos()', delay); 
} 
function pause_resume() 
{ 
if(pause) 
{ 
clearInterval(interval); 
pause = false;} 
else 
{ 
interval = setInterval('changePos()',delay); 
pause = true; 
} 
} 
start(); 
