


function Enemigo(n,x,y,an,al,v) {
	this.velocidad = v;
	this.top = x;
	this.left = y;
	this.ancho = an;
	this.alto = al;
	this.esCirculo = false;
	this.activo = false;
	this.name = n;
	
	var bloque = document.getElementById(n);
		bloque.style.top=y+"px";
		bloque.style.left=x+"px";
};

Enemigo.prototype.setXY = function (x,y) {
	this.top = x;
	this.left = y;
	
	var bloque = document.getElementById(this.name);
		bloque.style.top=y+"px";
		bloque.style.left=x+"px";
}

Enemigo.prototype.reset = function (fondo) {
	this.setXY(fondo["left"]+(Math.floor((Math.random() * 1100) + 1)),fondo["top"])
	this.velocidad = Math.floor((Math.random() * 5) + 1);
}


Enemigo.prototype.mover_caer = function () {

		 var bloque=document.getElementById(this.name);
 
		 var x=(document.defaultView && document.defaultView.getComputedStyle) ?
				document.defaultView.getComputedStyle(bloque,'').getPropertyValue("top") :
				bloque.currentStyle ? bloque.currentStyle.top : "";
 
 
		 var y=(document.defaultView && document.defaultView.getComputedStyle) ?
				document.defaultView.getComputedStyle(bloque,'').getPropertyValue("left") :
				bloque.currentStyle ? bloque.currentStyle.left : "";
 
		x= parseInt(x);
		y= parseInt(y);
			x +=this.velocidad;
		if((y+this.ancho)>fondo["right"])
			y = fondo["top"]+(this.ancho-1);
			
			
			
		if((x+this.alto)>fondo["down"])
			this.reset(fondo);
		
		else{

	bloque.style.top = x+"px";
	bloque.style.left= y+"px";
 
 
 
 	this.top = x;
	this.left = y;
		}
	}


Enemigo.prototype.choco = function (p) {
	var bloque=document.getElementById("player");
 
		 var x=(document.defaultView && document.defaultView.getComputedStyle) ?
				document.defaultView.getComputedStyle(bloque,'').getPropertyValue("top") :
				bloque.currentStyle ? bloque.currentStyle.top : "";
 
 
		 var y=(document.defaultView && document.defaultView.getComputedStyle) ?
				document.defaultView.getComputedStyle(bloque,'').getPropertyValue("left") :
				bloque.currentStyle ? bloque.currentStyle.left : "";
 
		x= parseInt(x);
		y= parseInt(y);

	if ((((this.left+this.ancho) >= p.getY()) && (this.left < (p.getY()+p.getAncho())))&&
		(((this.top+this.alto) >= p.getX()) && (this.top < (p.getX()+p.getAlto()))))
		{

			return true;
		}
			
		else
			
			return false;
 
}


