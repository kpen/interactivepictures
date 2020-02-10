/*
requires jquery...
just do in index.html
<script src="js/draggit180219.js"></script>
and write ... somewhere:  var dr = new draggit;
	
*/

function square(s,x1,y1,wi,he){ /*->square_object*/
	this.f_up = "";
	this.f_dw = "";
	this.f_ri = "";
	this.f_le = "";
  
    this.touched = -1; 
this.InX = 0; // for inertia movement
this.InY = 0;

this.waX = x1;
this.waY = y1;

  this.Bx=this.cX=x1; /*->initiate_x_y_w_h*/
  this.By=this.cY=y1; 
  this.nX=x1;
  this.nY=y1;
  this.wi=wi; this.he=he; 
  this.pressed=0;
  this.Mx=0; this.My=0;
  this.dx=0;
  this.dy=0;
  this.visible = false;//don't know yet what for
  this.active = true; /*<-*/

  this.div = document.createElement('div');/*->create_th_div_on_th_screen*/
  this.div.className = 'dragbox';
  this.div.id = 'diff'+s.dwsc;
  this.id = "#"+this.div.id;
  var t23 = '#'+Math.floor(Math.random()*16777215).toString(16);

  s.host_div.appendChild(this.div); //s.host_div = document.body OR div 
  $(this.id).css({'background-color':t23});
   $(this.id).css({left:this.cX,top:this.cY});
   $(this.id).css({width:this.wi,height:this.he});

//>>-fetInertia - - - - - - - - - - - - - - - - - - - - - - - - - - - 

this.fetInertia = function(){
  if(this.touched >=0){//if the user drags this_object
                        //lets collect inertia
        this.InX = ((this.nX - this.cX)+this.InX)/2;
        this.InY = ((this.nY - this.cY)+this.InY)/2;
  }
    else {

        if ((Math.abs(this.InX) > 0.7) || (Math.abs(this.InY) > 0.7)){
            this.Bx=this.nX = this.nX+this.InX;
            this.By=this.nY = this.nY+this.InY;

            if (this.Bx > wTH) { 
                console.log("RIGHT= "+this.f_ri); 
              	funHub(this.f_ri);
                this.setBasePos(1 - this.wi,this.By);
               	this.InX = 0;this.InY = 0;
           }
        else if ((this.Bx + this.wi) < 0){ 
            console.log("LEFT");
                funHub(this.f_le);
            this.setBasePos(wTH-1,this.By);
            this.InX = 0;this.InY = 0;
        }
        else if (this.By > hTH){ 
            console.log("DOWN"); 
                 funHub(this.f_dw);
            this.setBasePos(this.Bx,1-this.he);
            this.InX = 0;this.InY = 0;
        }
        else if ((this.By + this.he) < 0){ 
            console.log("UP"); 
            funHub(this.f_up);
            this.setBasePos(this.Bx,hTH-1);
            this.InX = 0;this.InY = 0;
        }
        }//if InX InY > 1
        else {
                
            if ((this.Bx != this.waX)||(this.By != this.waY) ){
                        this.setBasePos((this.Bx + this.waX)/2,(this.By+this.waY)/2);
console.log("SLOW");    
                }          
        }
    }
}

//>>-setFunctions- - - - - - - - - - - - - - - - - - - - - - - - - - 

  this.setWantedPos = function(x,y){
	this.waX =x;
	this.waY = y;
	this.setBasePos(x,y);
	}

  this.setPict = function(Picture){
     if (typeof Picture != 'undefined' && Picture){
      $(this.id).css({'background-color': 'transparent'})
      $(this.id).css({'background-image': 'url('+pAth+Picture+')'})
    }
    else{
      $(this.id).css({'background-color': 'transparent'})
      $(this.id).css({'background-image': 'none'})
    }
  }
  this.setSize = function(wi,he){
    $(this.id).css({width:wi,height:he}); 
    this.wi=wi; this.he=he;   
  }
  this.setBasePos = function(x23,y23){
    $(this.id).css({left:x23,top:y23});
    this.Bx=this.cX=this.nX=x23; 
    this.By=this.cY=this.nY=y23;
  }
  this.setCurrentPos= function(x23,y23){
    $(this.id).css({left:x23,top:y23});
    this.cX=this.nX=x23; 
    this.cY=this.nY=y23;
  }
  this.setOff = function(){
    this.active = false;
    $(this.id).hide();
  }
  this.setOn = function(){
    this.active = true;
    $(this.id).show();
  }
//>>-B_down - - - - - - - - - - - - - - - - - - -   
  this.draG=false;
  this.B_down = function(x,y){;}
  this.B_up = function(x,y){;}
  this.B_move = function(x,y){;}
  this.G_down = function (x,y) {
    if ((x > this.Bx) && (x < this.Bx+this.wi) &&
	(y > this.By) && (y < this.By+this.he) ){
            $('#indic').css({'background-color':'#090909'});
	    this.Mx=x;
	    this.My=y;
	    this.draG=true;
	    this.A_down(x,y);
	    this.B_down(x,y);
	    return false;
	}
	  else {return true;}

}
  this.G_move = function (x,y) {
	  if (this.draG){
		this.A_move(x,y);
		this.B_move(x,y);
		}
	  }
  this.G_up = function (x,y) {
	  if (this.draG){
          $('#indic').css({'background-color':'#FFFFF6'});
	  this.draG=false;
	  this.A_up(x,y);
	  this.B_up(x,y);
	  }
	}
  this.A_down = function(x,y){
	this.Bx=this.cX;
	this.By=this.cY;
	this.Mx=x;
	this.My=y;

   }
//  -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
  this.A_move = function(x,y){
	this.dx = x-this.Mx;
	this.dy = y-this.My;
    this.nX = this.Bx+x-this.Mx;
    this.nY = this.By+y-this.My;

//console.log("nX="+this.nX +"   cX="+this.cX);
  }
//  -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
 this.A_up = function(x,y){
    //this.Bx = this.cX = this.Bx+this.dx;
    //this.By = this.cY = this.By+this.dy;
    this.setBasePos(this.nX,this.nY);
    this.dx=0;
    this.dy=0; 
   console.log(this.nX+" # "+this.nY);
 }

}/*<-*/

//>>-Draggit -------------------------------------------------
function draggit(div23){/*->draggit_object*/
 div23 = document.getElementById(div23); //where to put our new divs
 this.host_div = document.body; //may be just in the document
 if (div23!=null){this.host_div = div23;}
 this.mousePath = -1; //did user moved the mouse between btnDOWN and btnUP
 this.tOuched = -1; //the number of the 'selected' square in M[]array 
 this.M = []; //the array of our squares (objects for touching)
 this.dwsc = 0; //the counter for the array M
 this.b4x=0;
 this.b4y=0;
 this.dMx = 0;
 this.dMy = 0;
 var s = this;
///*->StyleCSS_for_squares*/
var stylle = document.createElement('style');
stylle.type = "text/css";
stylle.innerHTML = ".dragbox { \
	position: absolute; \
	background-repeat: no-repeat; \
	background-color: #FF5522; \
	background-size:100% 100%; }";
document.getElementsByTagName('head')[0].appendChild(stylle);
  
for (var i =0 ; i < 10; i++)
{
  s.M[s.dwsc] = new square(this, 0, 0,0,0);
  s.dwsc++; 
}
  s.dwsc = 0;
//>>-addDiv - - - - - - - - - - - - - - - - - - - - - - - 
this.addDiv = function(piCture,x,y,w,h,depend,fup,fdown,fleft,fright){
	s.M[s.dwsc].setPict(piCture);
	s.M[s.dwsc].setWantedPos(xf(x),yf(y));
	s.M[s.dwsc].setSize(k(w),k(h));
	s.M[s.dwsc].active = depend;
	s.M[s.dwsc].f_up = fup;
	s.M[s.dwsc].f_dw = fdown;
	s.M[s.dwsc].f_ri = fright;
  console.log("F_RIGHT="+s.M[s.dwsc].f_ri);
	s.M[s.dwsc].f_le = fleft;
  	s.dwsc++;
}

this.touchAndTimeEvents = function(){ /*->touchEvents_*/
NeedMove();
//>>-TouchMoveUp - - - - - - - - - - - - - -  - - - - - - - - - - -
    document.body.addEventListener('touchmove', function(event) {
		G_move(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
        event.preventDefault();
    }, {passive: false});
//-------------------------------------------------------------------
	document.body.addEventListener('touchstart', function(event) {
		G_Down(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
		event.preventDefault();
  }, {passive: false});
 //-------------------------------------------------------------------
 	 document.body.addEventListener('touchend', function(event) {
		G_up(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
        event.preventDefault();
    }, {passive: false});
 //-------------------------------------------------------------------
 	 document.body.addEventListener('mousedown', function(event) {
		G_Down(event.pageX,event.pageY);
        event.preventDefault();
    }, true);
 //-------------------------------------------------------------------
	 document.body.addEventListener('mouseup', function(event) {
		 G_up(event.pageX,event.pageY);
        event.preventDefault();
    }, true);
 //-------------------------------------------------------------------
	document.body.addEventListener('mousemove', function(event) {
		G_move(event.pageX,event.pageY);
		event.preventDefault();
    }, true);
 //-------------------------------------------------------------------

function G_Down(x,y){
  s.mousePath = 0;
  s.b4x = x; 
  s.b4y = y;
 // for (var i=0; i<s.dwsc; i++){
  for (var i=s.dwsc-1; i >= 0; i--){
     if (s.M[i].active){
       if(!s.M[i].G_down(x,y)){ //only the "touched" square returns 'false'
          //console.log("G_Down..i="+i);
		  s.tOuched = i;
            s.M[i].touched = 1;
          break;
       }
     }
   }
}
 //-------------------------------------------------------------------
function G_move(x,y){
   if(s.mousePath >= 0){s.mousePath++;}
   s.dMx = x-s.b4x; 
   s.dMy = y-s.b4y;
   if (s.tOuched >=0){
	   s.M[s.tOuched].G_move(x,y);
   }
}
 //-------------------------------------------------------------------
function G_up(x,y){
   s.mousePath = (-1)*s.mousePath;
   if (s.tOuched >=0){
	   s.M[s.tOuched].G_up(x,y);
	   s.M[s.tOuched].touched = -1;
	   s.tOuched = -1;
   }
}

function NeedMove(){
  for (var i=0; i<s.dwsc; i++){
    if (s.M[i].active){
    s.M[i].fetInertia();
      var ob = s.M[i];
      if ((ob.nX!=ob.cX) || (ob.nY!=ob.cY)) {
         ob.setCurrentPos(ob.nX,ob.nY);
         //console.log("i="+i);
	}
    }
  }
setTimeout(NeedMove,50);
}

 //-----------------------------------------------------
 }/*<-*/

//------------------------------------------------------
/*<-*/
this.touchAndTimeEvents();

}//function_draggit()
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
