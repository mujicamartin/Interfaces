
////------------- Jugador

function Jugador(x,y,v) {

	this.top = x;
	this.left = y;
	this.ancho = 35;
	this.alto = 35;
	this.esCirculo = false;
	this.velocidad = v;
	this.name = "player";
	
	
	var bloque=document.getElementById(this.name);
		bloque.style.top=x+"px";
		bloque.style.left=y+"px";
};

Jugador.prototype.getX = function () {
return this.top;
}

Jugador.prototype.getY = function () {
return this.left;
}

Jugador.prototype.getAncho = function () {
return this.ancho;
}

Jugador.prototype.getAlto = function () {
return this.alto;
}

Jugador.prototype.mover = function (fondo) {
	
		 var bloque=document.getElementById(this.name);
 
		 var x=(document.defaultView && document.defaultView.getComputedStyle) ?
				document.defaultView.getComputedStyle(bloque,'').getPropertyValue("top") :
				bloque.currentStyle ? bloque.currentStyle.top : "";
 
 
		 var y=(document.defaultView && document.defaultView.getComputedStyle) ?
				document.defaultView.getComputedStyle(bloque,'').getPropertyValue("left") :
				bloque.currentStyle ? bloque.currentStyle.left : "";
 
		x= parseInt(x);
		y= parseInt(y);

		
		if(teclas["s"])
			x +=this.velocidad;
		if(teclas["w"])
			x -=this.velocidad;
		if(teclas["d"])
			y +=this.velocidad;	
		if(teclas["a"])
			y -=this.velocidad;
		

		if((x-10)<fondo["top"])
			x = fondo["top"]+10;
		if((x+50)>fondo["down"])
			x = fondo["down"]-50;
		if((y-5)<fondo["left"])
			y = fondo["left"]+5;
		if((y+50)>fondo["right"])
			y = fondo["right"]-50;
	
		
	this.top = x;
	this.left = y;
	
		
	bloque.style.top = x+"px";
	bloque.style.left= y+"px";

};



Jugador.prototype.explotar = function () {
	
		var bloque=document.getElementById(this.name);
		bloque.classList.add("player_explota");
		this.velocidad = 0;
}


Jugador.prototype.revivir = function (fondo) {
	
	var bloque=document.getElementById(this.name);
	bloque.classList.remove("player_explota");
		this.setXY((fondo["top"]+400),(fondo["left"]+550));
		bloque.style.top=this.top+"px";
		bloque.style.left=this.left+"px";
		this.velocidad = 5;
}

Jugador.prototype.setXY = function (x,y) {
	this.top = x;
	this.left = y;
	console.log("asda"+this.left);
	var bloque = document.getElementById(this.name);
		bloque.style.top=y+"px";
		bloque.style.left=x+"px";
}

