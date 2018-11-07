
var fondo = new Array;
fondo["top"] = 0;
fondo["left"] = 0;
fondo["down"] = 0;
fondo["right"] = 0;

var c_arriba = 87;
var c_abajo = 83;
var c_derecha = 68;
var c_izquierda = 65;

var teclas = new Array;
teclas["w"] = false;
teclas["s"] = false;
teclas["a"] = false;
teclas["d"] = false;

var puntos = 0;
var hi_puntos =0;
var play= false;

//-------------

posicion();


var j = new Jugador(fondo["top"]+400,fondo["left"]+550,4);
var enemigos = new Array;
enemigos[0] = new Enemigo("enemigo1",150,150,45,45,2);
enemigos[1] = new Enemigo("enemigo2",400,350,32,35,0);
enemigos[2] = new Enemigo("enemigo3",200,300,13,13,2);
enemigos[3] = new Enemigo("enemigo4",300,300,18,18,1);
enemigos[4] = new Enemigo("enemigo5",400,300,23,23,2);
enemigos[5] = new Enemigo("enemigo6",500,300,25,25,1);
enemigos[6] = new Enemigo("enemigo7",600,300,32,32,2);
enemigos[7] = new Enemigo("enemigo8",700,300,38,38,1);
enemigos[8] = new Enemigo("enemigo9",800,300,41,41,2);
enemigos[9] = new Enemigo("enemigo10",900,300,48,48,1);
enemigos[10] = new Enemigo("enemigo11",800,300,41,41,2);
enemigos[11] = new Enemigo("enemigo12",900,300,48,48,1);
enemigos[12] = new Enemigo("enemigo13",800,300,41,41,2);
enemigos[13] = new Enemigo("enemigo14",900,300,48,48,1);
enemigos[14] = new Enemigo("enemigo15",800,300,41,41,2);
enemigos[15] = new Enemigo("enemigo16",900,300,48,48,1);
enemigos[16] = new Enemigo("enemigo17",800,300,41,41,2);
enemigos[17] = new Enemigo("enemigo18",900,300,48,48,1);



var timer = setInterval(function(){ tiempo(); }, 20);


function tiempo (){
	var i;
	var bloque=document.getElementById("inicio");
	j.mover(fondo);
	actualizar_puntos();

	for (i = 0; i < enemigos.length; i++) { 
		enemigos[i].mover_caer(fondo);
	}

	for (i = 0; i < enemigos.length; i++) { 
		if (enemigos[i].choco(j)==true){
			j.explotar();	
			bloque.style.display = "block";
			play= false;
		}
	}

}


      document.onclick = function() {iniciar()};


   document.onkeydown  = function() {presiono(event)};
   document.onkeyup = function() {solto(event)};

function re_iniciar(fondo) { 

	var bloque=document.getElementById("inicio");
		bloque.style.display = "none";

 	for (i = 0; i < enemigos.length; i++) { 
		enemigos[i].reset(fondo);
	}  
		j.revivir(fondo);
		play= true;
		puntos=0;
		console.log('aca'+ puntos)
}
   

function iniciar() { 
if (play == false){
	play= true;
	var bloque=document.getElementById("inicio");
		bloque.classList.remove("inicio");
		bloque.classList.add("gameover");
		bloque.style.display = "none";
	
 	for (i = 0; i < enemigos.length; i++) { 
	
		enemigos[i].reset(fondo);
		
	}  
	j.revivir(fondo);
	play= true;
		puntos=0;
		console.log('aca'+ puntos)
}
   
   function Fondo() {
	this.velocidad = 1;
	this.name = "fondo";
   }
};

   
function controles(event) {
	var key = event.keyCode;
	if (key == c_arriba)
		document.getElementById("arriba").className = "control on"
	if (key == c_abajo)
		document.getElementById("abajo").className = "control on"
	if (key == c_derecha)
		document.getElementById("derecha").className = "control on"
	if (key == c_izquierda)
		document.getElementById("izquiera").className = "control on"

}

function presiono(event) {

	var key = event.keyCode;
	if (key == c_arriba){
		teclas["w"] = true;
	}
	if (key == c_abajo){
		teclas["s"] = true;			
	}
	if (key == c_derecha){
		teclas["d"] = true;			
	}
	if (key == c_izquierda){
		teclas["a"] = true;			
	}

}

function solto(event) {

	var key = event.keyCode;
  	
	if (key == c_arriba){
				teclas["w"] = false;
	}
	if (key == c_abajo){
				teclas["s"] = false;
	}
	if (key == c_derecha){
				teclas["d"] = false;
	}
	if (key == c_izquierda){
		teclas["a"] = false;
	}
}

function posicion(){
 
		 var bloque=document.getElementById("fondo");
 
		 var x=(document.defaultView && document.defaultView.getComputedStyle) ?
				document.defaultView.getComputedStyle(bloque,'').getPropertyValue("top") :
				bloque.currentStyle ? bloque.currentStyle.top : "";
  
		 var y=(document.defaultView && document.defaultView.getComputedStyle) ?
				document.defaultView.getComputedStyle(bloque,'').getPropertyValue("left") :
				bloque.currentStyle ? bloque.currentStyle.left : "";
 
		x= parseInt(x);
		y= parseInt(y);

	fondo["top"]= x;
	fondo["left"] = y;
	fondo["down"] = x+500;
	fondo["right"] = y+1100;	
	
	}	


///-------------- Para debug
function pos(o){

  var rect = document.getElementById(o).getBoundingClientRect();
	x = rect.left;
	y = rect.top;
	w = rect.width;
	h = rect.height;
	console.log(o+" : Left: " + x + ", Top: " + y + ", Width: " + w + ", Height: " + h);
}



function actualizar_puntos(){
	
	
	var bloque=document.getElementById("tanteador");
 	if (play == true){
		puntos++;
	}

	if (puntos > hi_puntos)
		hi_puntos = puntos;
	bloque.innerHTML='Maximo Puntaje '+ parseInt(hi_puntos/20)+'&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp '+
'&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp &nbsp '+
'&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp &nbsp '+
'&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp &nbsp '+
	'Puntos '
	+parseInt(puntos/20)+' &nbsp &nbsp &nbsp ';

}
