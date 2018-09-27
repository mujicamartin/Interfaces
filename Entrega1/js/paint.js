var brillo_activo = false;
var contraste_activo = false;
var bkp_img;
var canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');


//var imagen_1 = new Image();
//imagen_1.src = "img\\imagen1.jpg";
//imagen_1.onload = function() {
//   dibujarImagen(this);
//};

function cargarFondo(url) {
    console.log(url);
    var imagen = new Image();
    imagen.src = url;
    imagen.onload = function() {
        dibujarImagen(this);
    };
};


function dibujarImagen(image) {

    if (image.width > canvas.width) {
        image.width = canvas.width;
    };
    if (image.height > canvas.height) {
        image.height = canvas.height;
    };
    ctx.drawImage(image, 0, 0, image.width, image.height);
}

////////// botones FONDOS

document.getElementById("cargarImagen1").addEventListener("click", function() {
    cargarFondo(document.getElementById("cargarImagen1").name);
});
document.getElementById("cargarImagen2").addEventListener("click", function() {
    cargarFondo(document.getElementById("cargarImagen2").name);
});
document.getElementById("cargarImagen3").addEventListener("click", function() {
    cargarFondo(document.getElementById("cargarImagen3").name);
});



////--------------------------------
//----------------------------------


var imagen = document.getElementById('subir').addEventListener('change', cargarImagen, false);

function cargarImagen(e) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var imagen1 = new Image();
        imagen1.onload = function() {
            dibujarImagen(this);
        }
        imagen1.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

document.getElementById("descargar").addEventListener("click", function() {
    var link = window.document.createElement('a'),
        url = canvas.toDataURL(),
        filename = 'imagen.jpg';
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
});

////------------------

//// FILTROS

function binario() {
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < imgData.data.length; i += 4) {
        if (((imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3) < 128) {
            imgData.data[i] = 0;
            imgData.data[i + 1] = 0;
            imgData.data[i + 2] = 0;
        } else {
            imgData.data[i] = 255;
            imgData.data[i + 1] = 255;
            imgData.data[i + 2] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0)
}

function invertir() {
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255 - imgData.data[i];
        imgData.data[i + 1] = 255 - imgData.data[i + 1];
        imgData.data[i + 2] = 255 - imgData.data[i + 2];
    }
    ctx.putImageData(imgData, 0, 0)
}

function escalaGrises() {
    var gris;
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < imgData.data.length; i += 4) {
        gris = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;
        imgData.data[i] = gris;
        imgData.data[i + 1] = gris;
        imgData.data[i + 2] = gris;
    }
    ctx.putImageData(imgData, 0, 0)
}

function sepia() {
    var r, g, b;
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < imgData.data.length; i += 4) {
        r = imgData.data[i];
        g = imgData.data[i + 1];
        b = imgData.data[i + 2];
        imgData.data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
        imgData.data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
        imgData.data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);

    }
    ctx.putImageData(imgData, 0, 0)
}


function brillo() {
    var valor = parseInt(document.getElementById("brillo").value);
    ctx.putImageData(bkp_img, 0, 0);
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = (imgData.data[i] + valor);
        imgData.data[i + 1] = (imgData.data[i + 1] + valor);
        imgData.data[i + 2] = (imgData.data[i + 2] + valor);
    }
    ctx.putImageData(imgData, 0, 0);
};

function contraste() {
    var valor = parseInt(document.getElementById("contraste").value);
    var factor = (259 * (valor + 255)) / (255 * (259 - valor));
    ctx.putImageData(bkp_img, 0, 0);
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = factor * (imgData.data[i] - 128) + 128;
        imgData.data[i + 1] = factor * (imgData.data[i + 1] - 128) + 128;
        imgData.data[i + 2] = factor * (imgData.data[i + 2] - 128) + 128;
    }
    ctx.putImageData(imgData, 0, 0);
};


function convolucion(imgData, matriz) {
    var lados = Math.round(Math.sqrt(matriz.length));
    var mitad = Math.floor(lados / 2);
    var imgCalculo = imgData.data;
    var red, green, blue, indeximgData;
    for (var y = 0; y < imgData.height; y++) {
        for (var x = 0; x < imgData.width; x++) {
            indeximgData = (y * imgData.width + x) * 4;
            var red = 0;
            var green = 0;
            var blue = 0;
            if (x != 0 || y != 0 || x != imgData.width || y != imgData.height) {
                for (var i = 0; i < lados; i++) {
                    for (var j = 0; j < lados; j++) {
                        var ancho = y + i - mitad;
                        var alto = x + j - mitad;
                        var indexAnalizado = (ancho * imgData.width + alto) * 4;
                        red += imgCalculo[indexAnalizado] * matriz[i * lados + j];
                        green += imgCalculo[indexAnalizado + 1] * matriz[i * lados + j];
                        blue += imgCalculo[indexAnalizado + 2] * matriz[i * lados + j];
                    }
                }
            }
            imgData.data[indeximgData] = red;
            imgData.data[indeximgData + 1] = green;
            imgData.data[indeximgData + 2] = blue;
        }
    }
};
// Repujado
//-2, -1, 0,
//-1,  1, 1,
// 0,  1, 2

//0,  1, 0,
// 1, -4, 1,
//0,  1, 0



function blur() {
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    convolucion(imgData, [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9]);
    ctx.putImageData(imgData, 0, 0);
};

function sharpen() {
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    convolucion(imgData, [0, -1, 0, -1, 2, -1, 0, -1, 0]);
    ctx.putImageData(imgData, 0, 0);
};


////////// botones filtros

document.getElementById("brillo").addEventListener("mousedown", function() {
    brillo_activo = true;
    bkp_img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    brillo();
});

document.getElementById("brillo").addEventListener("mousemove", function() {
    if (brillo_activo) {
        brillo();
    }
});

document.getElementById("brillo").addEventListener("mouseup", function() {
    brillo_activo = false;
    brillo();
    document.getElementById("brillo").value = "0";

});



//------- fin brillo

////////// botones contraste

document.getElementById("contraste").addEventListener("mousedown", function() {
    brillo_activo = true;
    bkp_img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    contraste();
});

document.getElementById("contraste").addEventListener("mousemove", function() {
    if (brillo_activo) {
        contraste();
    }
});

document.getElementById("contraste").addEventListener("mouseup", function() {
    brillo_activo = false;
    contraste();
});

//------- fin contraste


document.getElementById("binario").addEventListener("click", function() {
    binario();
});

document.getElementById("invertir").addEventListener("click", function() {
    invertir();
});
document.getElementById("escalaGrises").addEventListener("click", function() {
    escalaGrises();
});
document.getElementById("sepia").addEventListener("click", function() {
    sepia();
});

document.getElementById("blur").addEventListener("click", function() {
    blur();
});

document.getElementById("sharpen").addEventListener("click", function() {
    sharpen();
});


//---------------------
//dibujo
//----------------

var lapiz_activo = false;
var lastX, lastY, x, y, c, l;




document.getElementById("canvas").addEventListener("mousedown", function(e) {
    lapiz_activo = true;
    lastX = e.clientX - document.getElementById("canvas").getBoundingClientRect().left - 1;
    lastY = e.clientY - document.getElementById("canvas").getBoundingClientRect().top;
    x = e.clientX - document.getElementById("canvas").getBoundingClientRect().left;
    y = e.clientY - document.getElementById("canvas").getBoundingClientRect().top;
    if (document.getElementById('gl').value == "l") {
        c = document.getElementById('color').value;
        l = document.getElementById('linea').value;
    } else {
        c = document.getElementById('cgoma').value;
        l = document.getElementById('goma').value;
    }
    dibujar(x, y, c, l);
});

document.getElementById("canvas").addEventListener("mousemove", function(e) {

    if (lapiz_activo) {
        x = e.clientX - document.getElementById("canvas").getBoundingClientRect().left;
        y = e.clientY - document.getElementById("canvas").getBoundingClientRect().top;

        if (document.getElementById('gl').value == "l") {
            c = document.getElementById('color').value;
            l = document.getElementById('linea').value;
        } else {
            c = document.getElementById('cgoma').value;
            l = document.getElementById('goma').value;
        }

        dibujar(x, y, c, l);
    };
});

document.getElementById("canvas").addEventListener("mouseup", function(e) {
    lapiz_activo = false;
});

document.addEventListener("mouseup", function(e) {
    lapiz_activo = false;
    lastX = -1;
    lastY = -1;
});

document.getElementById("canvas").addEventListener("mouseout", function(e) {
    lastX = -1;
    lastY = -1;
});


///// ----- cambio de goma/ lapiz ---- y colores
document.getElementById("goma").addEventListener("mousedown", function() {
    document.getElementById('gl').value = "g";
});
document.getElementById("cgoma").addEventListener("mousedown", function() {
    document.getElementById('gl').value = "g";
});

document.getElementById("linea").addEventListener("mousedown", function() {
    document.getElementById('gl').value = "l";
});
document.getElementById("color").addEventListener("mousedown", function() {
    document.getElementById('gl').value = "l";
});
///// colores goma

document.getElementById("cg1").addEventListener("mousedown", function() {
    document.getElementById('cgoma').value = document.getElementById("cg1").name;
    document.getElementById('gl').value = "g";
});
document.getElementById("cg2").addEventListener("mousedown", function() {
    document.getElementById('cgoma').value = document.getElementById("cg2").name;
    document.getElementById('gl').value = "g";
});
document.getElementById("cg3").addEventListener("mousedown", function() {
    document.getElementById('cgoma').value = document.getElementById("cg3").name;
    document.getElementById('gl').value = "g";
});
document.getElementById("cg4").addEventListener("mousedown", function() {
    document.getElementById('cgoma').value = document.getElementById("cg4").name;
    document.getElementById('gl').value = "g";
});
document.getElementById("cg5").addEventListener("mousedown", function() {
    document.getElementById('cgoma').value = document.getElementById("cg5").name;
    document.getElementById('gl').value = "g";
});
document.getElementById("cg6").addEventListener("mousedown", function() {
    document.getElementById('cgoma').value = document.getElementById("cg6").name;
    document.getElementById('gl').value = "g";
});

///// colores lapiz

document.getElementById("cl1").addEventListener("mousedown", function() {
    document.getElementById('color').value = document.getElementById("cl1").name;
    document.getElementById('gl').value = "l";
});
document.getElementById("cl2").addEventListener("mousedown", function() {
    document.getElementById('color').value = document.getElementById("cl2").name;
    document.getElementById('gl').value = "l";
});
document.getElementById("cl3").addEventListener("mousedown", function() {
    document.getElementById('color').value = document.getElementById("cl3").name;
    document.getElementById('gl').value = "l";
});
document.getElementById("cl4").addEventListener("mousedown", function() {
    document.getElementById('color').value = document.getElementById("cl4").name;
    document.getElementById('gl').value = "l";
});
document.getElementById("cl5").addEventListener("mousedown", function() {
    document.getElementById('color').value = document.getElementById("cl5").name;
    document.getElementById('gl').value = "l";
});
document.getElementById("cl6").addEventListener("mousedown", function() {
    document.getElementById('color').value = document.getElementById("cl6").name;
    document.getElementById('gl').value = "l";
});


function dibujar(x, y, color, linea) {
    if (lastX > 0) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = linea;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}