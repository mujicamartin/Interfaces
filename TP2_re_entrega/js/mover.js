var ancho = 7;
var alto = 6;
var radio = 25;
var sep = 10;
var fondo = cargarImagen("img\\fondo.png");
var fficha1 = cargarImagen("img\\fondo_1.png");
var fficha2 = cargarImagen("img\\fondo_2.png");
var player1 = cargarImagen("img\\player1.png");
var player2 = cargarImagen("img\\player2.png");
var player1p = cargarImagen("img\\pierde1.png");
var player2p = cargarImagen("img\\pierde2.png");
var brillo1 = cargarImagen("img\\brillo1.png");
var brillo2 = cargarImagen("img\\brillo2.png");
var ganador1 = cargarImagen("img\\ganador1.png");
var ganador2 = cargarImagen("img\\ganador2.png");
var ftablero = cargarImagen("img\\tablero.png");
var ficha_activa = null;
var ganador = false;
var px = (245 - document.getElementById("canvas").getBoundingClientRect().left);
var py = (132 - document.getElementById("canvas").getBoundingClientRect().top);
var t;
var j1;
var j2;

document.getElementById("canvas").addEventListener("mousedown", function (e) {
	if (t.turno() == 1) {

		ficha_activa = j1.fichaPresionada(e.clientX, e.clientY);
	} else {

		ficha_activa = j2.fichaPresionada(e.clientX, e.clientY);
	}

	screen();
});

document.getElementById("canvas").addEventListener("mouseout", function () {
	ficha_presionada = false;
});

document.getElementById("canvas").addEventListener("mouseup", function () {
	
	if ((ganador == false)){
		if (ficha_activa != null) {
			var aux = t.enZona(ficha_activa);
			if ((aux != -1)&& (t.fichas[aux] == null)) {
				var posicion = t.addFichaX(aux, ficha_activa);

				ganador = t.hayGanador(posicion);

				if (ganador == false) {
					if(j1.tieneFichas()|| j2.tieneFichas()){
						ficha_activa = null;
						t.rotar();
					} else {
						
						if (t.turno() == 1) {
							ficha_activa = j1.devolver();
						} else {
							ficha_activa = j2.devolver();
						}
						screen();
						alert("Empate!!! ");
						iniciar();
					}
				} else {
					screen();
					//alert("Gano Jugador " + ficha_activa.getJ()+"ganador  "+ganador+"...."+t.g);
					//iniciar();
					ficha_activa = null;
				}
			} else {
				if (t.turno() == 1) {
					ficha_activa = j1.devolver();
				} else {
					ficha_activa = j2.devolver();
				}


			}
			screen();
		}
		screen();
	}else{
		ganador = false;
		iniciar();
	}


});

document.getElementById("canvas").addEventListener("mousemove", function (e) {
	if (ficha_activa != null) {
		var x = (e.clientX - document.getElementById("canvas").getBoundingClientRect().left);
		var y = (e.clientY - document.getElementById("canvas").getBoundingClientRect().top);
		ficha_activa.setXY(x, y);
		screen();
	}
});


function pressFicha(mouseX, mouseY, ficha) {
	var xmouse = (mouseX - document.getElementById("canvas").getBoundingClientRect().left - ficha.getX());
	var ymouse = (mouseY - document.getElementById("canvas").getBoundingClientRect().top - ficha.getY());
	var radio2 = (ficha.getRadio() * ficha.getRadio());
	if ((Math.pow(xmouse, 2)) + (Math.pow(ymouse, 2)) <= radio2) {
		return true;
	} else {
		return false;
	}
};


function cargarImagen(url) {
	var imagen = new Image();
	imagen.src = url;
	imagen.onload = function () {
		screen();
	};
	return imagen;
};


function screen() {
	var ctx = document.getElementById("canvas").getContext("2d");
	ctx.drawImage(fondo, 0, 0);
	
	
	if (t.g == 0){
		
		if (t.turno() == 1){
			ctx.drawImage(brillo1, -90, 15);
		}else{
			ctx.drawImage(brillo2, 710, 15);
		}
		ctx.drawImage(player1, 30, 100);
		ctx.drawImage(player2, 850, 80);
	}else {
		if (t.g == 2){
			ctx.drawImage(ganador2, 210, 0);
			ctx.drawImage(player1p, 30, 100);
		}
		if (t.g == 1){
			ctx.drawImage(ganador1, 210, 0);
			ctx.drawImage(player2p, 850, 80);
		}
	}
	//ctx.drawImage(ganador2, 210, 0);
	//ctx.drawImage(player1, 30, 100);
	//ctx.drawImage(player2, 850, 80);
	
	t.dibujar();
		ctx.drawImage(ftablero, 0, 0);
	j1.dibujarFichas();
	j2.dibujarFichas();
	if (ficha_activa != null)
		ficha_activa.dibujar();
//	ctx.drawImage(ftablero, 0, 0);

};

function Tablero() {
	this.separacion = sep;
	this.posX = px;
	this.posY = py;
	this.t = 1;
	this.g = 0;
	this.fichas = new Array;
	for (var y = 0; y < alto; y++) {
		for (var x = 0; x < ancho; x++) {
			this.fichas[(y * ancho) + x] = null;
		};
	};

};

Tablero.prototype.dibujar = function () {
	for (var y = 0; y < alto; y++) {
		for (var x = 0; x < ancho; x++) {
			if (this.fichas[(y * ancho) + x] != null)
				this.fichas[(y * ancho) + x].dibujar();
		};
	};

};

Tablero.prototype.rotar = function () {
	if (this.t == 1)
		this.t = 0;
	else
		this.t = 1;
};

Tablero.prototype.turno = function () {
	return this.t;
};

Tablero.prototype.hayGanador = function (pos) {
	ganador = false;
	//console.log("pruevo vertical");
	if (t.ganadorVer(pos) == true) {
		t.g= this.fichas[pos].getJ();
		return true;
	}
	//console.log("pruevo horizontal");
	if (t.ganadorHor(pos) == true) {
		t.g= this.fichas[pos].getJ();
		return true;
	}
//	console.log("pruevo diagonal 1");
	if (t.ganadordiagonal1(pos) == true) {
		t.g= this.fichas[pos].getJ();
		return true;
	}
//	console.log("pruevo diagonal 2");
	if (t.ganadordiagonal2(pos) == true) {
		t.g= this.fichas[pos].getJ();
		return true;
	}

	return ganador;
};

Tablero.prototype.ganadordiagonal2 = function (pos) {
	var contador = 0;

	var jAct = this.fichas[pos].getJ();
	var posy = Math.trunc(pos / ancho);
	var posx = (pos - (posy * ancho));
	while ((posx >= 0) && (posy < alto) && (contador < 4)) {
		if (this.fichas[(posy * ancho) + posx] != null) {
			if (this.fichas[(posy * ancho) + posx].getJ() == jAct) {
				contador = contador + 1;
			}
			posx = posx - 1;
			posy = posy + 1;
		} else {
			posx = -1;
		}

	}
	posy = Math.trunc(pos / ancho);
	posx = (pos - (posy * ancho)) + 1;
	posy = posy - 1;
	while ((posx < ancho) && (posy >= 0) && (contador < 4)) {
		if (this.fichas[(posy * ancho) + posx] != null) {
			if (this.fichas[(posy * ancho) + posx].getJ() == jAct) {
				contador = contador + 1;
			}
			posx = posx + 1;
			posy = posy - 1;
		} else {
			posx = ancho + 1;
		}
	}
	if (contador > 3) {
		return true;
	} else {
		return false;
	}

};


Tablero.prototype.ganadordiagonal1 = function (pos) {
	var contador = 0;
	var jAct = this.fichas[pos].getJ();
	var posy = Math.trunc(pos / ancho);

	var posx = (pos - (posy * ancho));
	while ((posx >= 0) && (posy >= 0) && (contador < 4)) {
		if (this.fichas[(posy * ancho) + posx] != null) {
			if (this.fichas[(posy * ancho) + posx].getJ() == jAct) {
				contador = contador + 1;
			}
			posx = posx - 1;
			posy = posy - 1;
		} else {
			posx = -1;
		}
	}

	posy = Math.trunc(pos / ancho);
	posx = (pos - (posy * ancho)) + 1;
	posy = posy + 1;
	while ((posx < ancho) && (posy < alto) && (contador < 4)) {
		if (this.fichas[(posy * ancho) + posx] != null) {
			if (this.fichas[(posy * ancho) + posx].getJ() == jAct) {
				contador = contador + 1;
			}
			posx = posx + 1;
			posy = posy + 1;
		} else {
			posx = ancho + 1;
		}
	}
	if (contador > 3) {
		return true;
	} else {
		return false;
	}

};

Tablero.prototype.ganadorHor = function (pos) {
	var contador = 0;
	var jAct = this.fichas[pos].getJ();
	var posy = Math.trunc(pos / ancho);
	var posx = (pos - (posy * ancho));
	while ((posx >= 0) && (contador < 4) && (this.fichas[(posy * ancho) + posx] != null) &&
	(this.fichas[(posy * ancho) + posx].getJ() == jAct)) {
		if (this.fichas[(posy * ancho) + posx] != null) {
			if (this.fichas[(posy * ancho) + posx].getJ() == jAct) {
				contador = contador + 1;
			}
			posx = posx - 1;
		} else {
			posx = -1;
		}

	}
	posx = (pos - (posy * ancho)) + 1;
	while ((posx < ancho) && (contador < 4)&& (this.fichas[(posy * ancho) + posx] != null)&&
	(this.fichas[(posy * ancho) + posx].getJ() == jAct)) {
		if (this.fichas[(posy * ancho) + posx] != null) {
			if (this.fichas[(posy * ancho) + posx].getJ() == jAct) {
				contador = contador + 1;
			}
			posx = posx + 1;
		} else {
			posx = ancho + 1;
		}
	}
	if (contador > 3) {
		return true;
	} else {
		return false;
	}

};

Tablero.prototype.ganadorVer = function (pos) {
	var contador = 0;
	var jAct = this.fichas[pos].getJ();
	var y = pos
	while (y < (alto * ancho) && (contador < 4)) {
		if (this.fichas[y].getJ() == jAct) {
			contador = contador + 1;
		} else {
			return false;
		}
		y = y + ancho;
	};
	if (contador > 3) {
		return true;
	} else {
		return false;
	}
};


Tablero.prototype.enZona = function (f) {
	var a1 = (this.posX + document.getElementById("canvas").getBoundingClientRect().left);
	var a2 = (a1 + ((ancho) * 2 * (radio + sep)));
	var b1 = (document.getElementById("canvas").getBoundingClientRect().top);
	var b2 = (this.posY + document.getElementById("canvas").getBoundingClientRect().top + (radio + sep));
	var x = f.getX();
	var y = f.getY();
	if ((y > b1) && (y < b2) && (x > a1) && (x < a2)) {

		return Math.trunc((x - a1) / (2 * (radio + sep)));

	} else
		return -1;
};


Tablero.prototype.addFichaXY = function (x, y, f) {
	var a = (this.posX + document.getElementById("canvas").getBoundingClientRect().left);
	var b = (this.posY + document.getElementById("canvas").getBoundingClientRect().top);
	var nx = a + (x * 2 * (radio + sep)) + (radio + sep);
	var ny = b + (y * 2 * (radio + sep)) + (radio + sep);
	f.setXY(nx, ny);
	this.fichas[(y * ancho) + x] = f;
};

Tablero.prototype.addFichaX = function (x, f) {
	var respuesta = -1;
	var r = radio;
	var s = sep;
	var y = alto - 1;
	while (y >= 0) {
		if (this.fichas[(y * ancho) + x] == null) {
			this.addFichaXY(x, y, f);
			respuesta = ((y * ancho) + x);
			y = -1;
		};
		y--;
	};
	return respuesta;
};

Tablero.prototype.dibujarArea = function () {
	var r = radio;
	var s = this.separacion;
	var a1 = (this.posX + document.getElementById("canvas").getBoundingClientRect().left);
	var a2 = (a1 + ((ancho) * 2 * (radio + sep)));
	var b1 = 0;
	var b2 = (this.posY + document.getElementById("canvas").getBoundingClientRect().top);
	var ctx = document.getElementById("canvas").getContext("2d");
	ctx.strokeStyle = "#FF0000";
	for (var x = 0; x < ancho; x++) {
		ctx.strokeRect(((a1) + (x * 2 * (r + s))), (b1), (2 * (r + s)), (b2 - b1));
	}
	ctx.strokeStyle = "#000000";
	ctx.strokeRect(a1, b2, (ancho * (2 * (r + s))), (alto * (2 * (r + s))));
	ctx.strokeRect(a1, b2, (ancho * (2 * (r + s))), (alto * (2 * (r + s))));
};


function Ficha(n, j, x, y, r, l, c, lc) {
	this.n = "F" + n;
	this.j = j;
	this.x = x;
	this.y = y;
	this.r = r;
	if (this.j == 1) {
		this.c = "#e31e30";
	} else {
		this.c = "#6ee249";
	}
	this.l = l;
	this.lc = lc;

};

Ficha.prototype.getRadio = function () {
	return this.r;
};
Ficha.prototype.getX = function () {
	return this.x;
};
Ficha.prototype.getY = function () {
	return this.y;
};
Ficha.prototype.getJ = function () {
	return this.j;
};
Ficha.prototype.setXY = function (x, y) {
	this.x = x;
	this.y = y;
};


Ficha.prototype.dibujar = function () {
	var ctx = document.getElementById("canvas").getContext("2d");
	ctx.fillStyle = this.c;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
	ctx.fill();
	ctx.closePath();
	if (this.j == 1){
		ctx.drawImage(fficha1, this.x-23, this.y-25);
	}else{
		ctx.drawImage(fficha2, this.x-23, this.y-25);
	}
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
	ctx.lineWidth = this.l;
	ctx.lineCap = 'round';
	ctx.stokeStyle = this.lc;
	ctx.stroke();
	ctx.closePath();
};


function Jugador(n, x, y, c) {
	this.n = n;
	this.c = c;
	this.x = x;
	this.y = y;
	this.fichas = new Array;
	for (var aux = 0; aux < this.c; aux++) {
		this.fichas[aux] = new Ficha(aux, this.n, this.x, this.y + (aux * 10), radio, 1, "#000000", "#FF00FF");
	};

};


Jugador.prototype.fichaPresionada = function (x_mouse, y_mouse) {

	for (var x = 0; x < this.c; x++) {
		if (pressFicha(x_mouse, y_mouse, this.fichas[x]) == true) {
			return this.sacar(x);
		};
	};
	return null;

};


Jugador.prototype.devolver = function () {
	for (var aux = this.c; aux >= 0; aux--) {
		this.fichas[aux + 1] = this.fichas[aux];
	}
	this.c++,
		this.fichas[0] = ficha_activa;
	ficha_activa = null;
	screen();

};


Jugador.prototype.sacar = function (p) {

	var aux = this.fichas[p];
	for (var x = p; x < (this.c - 1); x++) {
		this.fichas[x] = this.fichas[x + 1];
	}
	this.fichas[this.c - 1] = null;
	this.c--;
	return aux;
};

Jugador.prototype.dibujarFichas = function () {
	for (var x = this.c - 1; x >= 0; x--) {
		this.fichas[x].dibujar();
	};
};

Jugador.prototype.tieneFichas = function () {
	//console.log("cant fichas"+this.fichas.length+" "+this.c);
	if(this.c>0)
		return true;
	return false;
}

function iniciar() {
	t = new Tablero();
	j1 = new Jugador(1, 100, 300, ((ancho * alto) / 2));
	j2 = new Jugador(2, 900, 300, ((ancho * alto) / 2));
//	j1 = new Jugador(1, 100, 300, 4);
//	j2 = new Jugador(2, 900, 300, 4);
	screen();


};

iniciar();