function Nave ()  {
  this.nombreDiv = null;
  this.div = null;
  this.style = null;
  this.teclas = null;
};

function Nave (nombre)  {
  this.div = null;
  this.style = null;
  this.nombreDiv = nombre;
  this.teclas = {"up":false,"down":false,"left":false,"right":false};
}

Nave.prototype.detectarTeclaOn = function(event) {
	  if(event.keyCode == 37) { // left
		this.teclas["left"] = true;
	}
	  else if(event.keyCode == 39) { // right
		this.teclas["right"] = true;
	}
    else if(event.keyCode == 40) { // down
		this.teclas["down"] = true;
	}
	    else if(event.keyCode == 38) { // up
		this.teclas["up"] = true;
	}
  return this.teclas;
}

Nave.prototype.detectarTeclaOff = function(event) {
	  if(event.keyCode == 37) { // left
		this.teclas["left"] = false;
	}
	  else if(event.keyCode == 39) { // right
		this.teclas["right"] = false;
	}
    else if(event.keyCode == 40) { // down
		this.teclas["down"] = false;
	}
	    else if(event.keyCode == 38) { // up
		this.teclas["up"] = false;
	}
}

Nave.prototype.mover = function (event) {
  let nuevaPosX = 0;
  let nuevaPosY = 0;
    if(this.teclas["left"]) { // left
        nuevaPosX = this.posX() - 3;
        document.getElementById(this.nombreDiv).style.left = nuevaPosX+"px";
        // document.getElementById(this.nombreDiv).style.animation = "izquierda ease-out 0.2s none";
        if (nuevaPosX < 0) {
           nuevaPosX = 0;
           document.getElementById(this.nombreDiv).style.left = nuevaPosX+"px";
        }
    }
    else if (this.teclas["right"]) { // right
      nuevaPosX = this.posX() + 3;
      document.getElementById(this.nombreDiv).style.left= nuevaPosX+"px";
      // document.getElementById(this.nombreDiv).style.animation = "derecha ease-out 0.2s none";
      if (nuevaPosX > 480) {
         nuevaPosX = 480;
         document.getElementById(this.nombreDiv).style.left = nuevaPosX+"px";
      }
    }
    else if (this.teclas["down"]) { // down
      nuevaPosY = this.posY() + 3;
      document.getElementById(this.nombreDiv).style.top= nuevaPosY+"px";
      if (nuevaPosY > 310) {
         nuevaPosY = 310;
         document.getElementById(this.nombreDiv).style.top = nuevaPosY+"px";
      }
    }
    else if (this.teclas["up"]) { // up
      nuevaPosY = this.posY() - 3;
      document.getElementById(this.nombreDiv).style.top= nuevaPosY+"px";
      if (nuevaPosY < 0) {
         nuevaPosY = 0;
         document.getElementById(this.nombreDiv).style.top = nuevaPosY+"px";
      }
    }
  }

Nave.prototype.posY = function () {
  div = document.getElementById(this.nombreDiv);
  style = getComputedStyle(div);
      return parseInt(style.getPropertyValue("top"));
}

Nave.prototype.posX = function () {
  div = document.getElementById(this.nombreDiv);
  style = getComputedStyle(div);
      return parseInt(style.getPropertyValue("left"));
}

Nave.prototype.alto = function () {
  div = document.getElementById(this.nombreDiv);
  style = getComputedStyle(div);
      return parseInt(style.getPropertyValue("height"));
}

Nave.prototype.ancho = function () {
  div = document.getElementById(this.nombreDiv);
  style = getComputedStyle(div);
      return parseInt(style.getPropertyValue("width"));
}

Nave.prototype.colisiona = function (enemigo) {
  let colision = false;
  let inicioEnemigoHoriz = enemigo.posX() + 10;
  let finEnemigoHoriz = enemigo.posX() + enemigo.ancho() - 10;
  let inicioNaveHoriz = this.posX() + 10;
  let finNaveHoriz = this.posX() + this.ancho() - 10;

  let inicioEnemigoVert = enemigo.posY() + 10;
  let finEnemigoVert = enemigo.posY() + enemigo.alto() - 10;
  let inicioNaveVert = this.posY() + 10;
  let finNaveVert = this.posY() + this.alto() - 10;

  // colision horizontal
  if ( ( inicioEnemigoHoriz > inicioNaveHoriz &&  finNaveHoriz > inicioEnemigoHoriz )
              || ( finEnemigoHoriz > inicioNaveHoriz &&  finNaveHoriz > finEnemigoHoriz ) ) {
      //colision vertical
      if ( ( inicioEnemigoVert >  inicioNaveVert &&  finNaveVert > inicioEnemigoVert )
              || ( finEnemigoVert > inicioNaveVert && finNaveVert > finEnemigoVert)  ){
                colision = true;
      }
  }
    return colision;
}

Nave.prototype.chocada = function () {
    document.getElementById(this.nombreDiv).style.width = "128px";
    document.getElementById(this.nombreDiv).style.height = "128px";
    document.getElementById(this.nombreDiv).style.background = 'url("img/explota2.png")';
    document.getElementById(this.nombreDiv).style.animation = 'explocion 2s steps(16)';
  }
