function Enemigo ()  {
  this.nombreDiv = null;
  this.div = null;
  this.style = null;
  // this.posX = 0;
  this.intervalo = 0;   //milisegundos del SetInterval
  this.limitePosY = 0;   //hasta cuanto puede caer
};

function Enemigo (nombre, intervalo, limitePosY)  {
    this.nombreDiv = nombre;
  this.div = document.getElementById(this.nombreDiv);
  this.style = getComputedStyle(this.div);
  // this.posX = this.style.getPropertyValue("top");
  this.intervalo = intervalo;   //milisegundos del SetInterval
  this.limitePosY = limitePosY;   //hasta cuanto puede caer
}

Enemigo.prototype.caer = function () {
  let nuevaPos = this.posY() + 2;
  document.getElementById(this.nombreDiv).style.top = nuevaPos+"px";
     if (nuevaPos > this.limitePosY) {
      nuevaPos = -40;
      document.getElementById(this.nombreDiv).style.top = nuevaPos+"px";
    }
}

Enemigo.prototype.posY = function () {
  div = document.getElementById(this.nombreDiv);
  style = getComputedStyle(div);
      return parseInt(style.getPropertyValue("top"));
}

Enemigo.prototype.posX = function () {
  div = document.getElementById(this.nombreDiv);
  style = getComputedStyle(div);
      return parseInt(style.getPropertyValue("left"));
}

Enemigo.prototype.alto = function () {
  div = document.getElementById(this.nombreDiv);
  style = getComputedStyle(div);
      return parseInt(style.getPropertyValue("height"));
}

Enemigo.prototype.ancho = function () {
  div = document.getElementById(this.nombreDiv);
  style = getComputedStyle(div);
      return parseInt(style.getPropertyValue("width"));
}

Enemigo.prototype.resetear = function () {
    document.getElementById(this.nombreDiv).style.top = this.posX;
}
