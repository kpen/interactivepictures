var cnvH = 100; //calculated hight of the base_picture (natural size 800x600)
var cnvW = 100; //calculated width of the base_picture 
var cnvX = 0; // x-distance from screen_left_up_corner to left_up_corner_of_the_base_picture
var cnvY = 0;
var kpF = 1;
var dr;
var kadrs = [];
var currentkadr = 0;

var draw;
var polyline;
var wT, hT, wTH, hTH;
var ESX, ESY, kf;
var Lkf=1;

function k(z){
	return Math.round(kfP*z);
}
function xf(z){
	return cnvX+Math.round(kfP*z);
}
function yf(z){
	return cnvY+Math.round(kfP*z);
}
//----------------------------------------------------------------
kadrs.push(JSON.parse(
	'{"name":"kadr1","W":777, "H":828, \
	"divs":[ \
	{"entr":["imgs/ris202.png",0,0,777,828,1,"a","b","c","d"]}, \
	{"entr":["imgs/glas1.png",320,205,180,70,1,"e","f","g","h"]}, \
	{"entr":["imgs/monik2.png",45,350,180,180,1,"nk(kadr2)","i","j","nk(kadr2)"]},\
	{"entr":["imgs/list1.png",500,500,190,90,1,"l","m","n","o"]},\
	{"entr":["imgs/blun1.png",500,5,320,300,1,"p","r","s","t"]}\
]}'));

kadrs.push(JSON.parse(
	'{"name":"kadr2","W":777, "H":828, \
"divs":[ \
	{"entr":["imgs/ris202.png",0,0,777,828,1,"","","",""]}, \
	{"entr":["imgs/glas1.png",320,205,180,70,1,"","","",""]}, \
	{"entr":["imgs/face101.png",45,350,180,180,1,"nk(kadr1)","","","nk(kadr1)"]},\
	{"entr":["imgs/list1.png",500,500,190,90,1,"","","",""]},\
	{"entr":["imgs/blun1.png",500,5,320,300,1,"","","",""]}\
]}'));

//var oBJ2 = JSON.parse(kadr2);

///////////////////////////////////////////////////////////////////

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//////////////>>-Document_ready ///////////////////////////////////////

$( document ).ready(function() {

// touchEvents(); // touchevent.js
 
    window.onresize = function() {
      $(document.body).width(window.innerWidth).height(window.innerHeight);
    }
 //-------------------------------------------------------------------
    $(function() {
      window.onresize();


    });
//>>-calc_size ------------------------------------------------------------------	


	wT = $( document ).width();	
	hT = $( document ).height();
	
	wTH=Math.round((wT/100)*99);
	hTH=Math.round((hT/100)*99);

	$('#drawing').css({width:wTH,height:hTH});

dr = new draggit('drawing');
  
setKadr("kadr1");

}) ;//document-ready
/*<-*/
function setKadr(kname){
  //lets find our kadr in kadrs[]array
  var obJ;
  var i=0;
  for (; i < kadrs.length; i++){
   	if (kadrs[i].name === kname){
     	obJ = kadrs[i]; 
      currentkadr = i;
      break;
   	}
  }  
  
  if (i == kadrs.length){ obJ = kadrs[currentkadr];}
  
    var W800 = obJ.W; //since ideal canvas_picture would be 800x600
	var H600 = obJ.H;

if (wTH/hTH < W800/H600) {
    cnvW = wTH;
    cnvH = Math.round(cnvW*H600/W800); 
    cnvY = (hTH-cnvH)/2;  
}else{
    cnvH = hTH;
    cnvW = Math.round(cnvH*W800/H600);
    cnvX = (wTH-cnvW)/2;
}

 kfP = cnvW/W800;  
  
  dr.dwsc = 0;
  for (var i =0; i < obJ.divs.length; i++) {
    var t23 = obJ.divs[i].entr;
    
  	dr.addDiv(t23[0], t23[1],t23[2], t23[3],t23[4], t23[5], t23[6],t23[7],t23[8],t23[9]);
  }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function funHub(name){  
  		var arr23 = name.split(/\)/);
 			var arr24 = arr23[0].split(/\(/);
				if (arr24[0] === 'nk'){setKadr(arr24[1]);} 
          		//if (arr24[0] === 'b'){funcB(arr24[1]);} //funcB@index.html
         		//if (arr24[0] === 'c'){funcC(arr24[1]);} //funcC@index.html
 		        //if (arr24[0] === 'd'){funcD(arr24[1]);} //funcD@index.html
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 