var slideIndex = 0;
var cant = 6;
var show = 6;


//***********//
document.getElementById("juegos_1").slideIndex = 0;
document.getElementById("juegos_2").slideIndex = 0;
document.getElementById("juegos_3").slideIndex = 0;
document.getElementById("juegos_4").slideIndex = 0;
document.getElementById("juegos_5").slideIndex = 0;
document.getElementById("juegos_6").slideIndex = 0;
document.getElementById("juegos_7").slideIndex = 0;

document.getElementById("prev1").addEventListener("click", function() {
    plusSlides(-cant, "1");
});

document.getElementById("next1").addEventListener("click", function() {
    plusSlides(cant, "1");
});

document.getElementById("prev2").addEventListener("click", function() {
    plusSlides(-cant, "2");
});

document.getElementById("next2").addEventListener("click", function() {
    plusSlides(cant, "2");
});

document.getElementById("prev3").addEventListener("click", function() {
    plusSlides(-cant, "3");
});

document.getElementById("next3").addEventListener("click", function() {
    plusSlides(cant, "3");
});
document.getElementById("prev4").addEventListener("click", function() {
    plusSlides(-cant, "4");
});

document.getElementById("next4").addEventListener("click", function() {
    plusSlides(cant, "4");
});
 
document.getElementById("prev5").addEventListener("click", function() {
    plusSlides(-cant, "5");
});

document.getElementById("next5").addEventListener("click", function() {
    plusSlides(cant, "5");
});
  
document.getElementById("prev6").addEventListener("click", function() {
    plusSlides(-cant, "6");
});

document.getElementById("next6").addEventListener("click", function() {
    plusSlides(cant, "6");
});

document.getElementById("prev7").addEventListener("click", function() {
    plusSlides(-cant, "7");
});

document.getElementById("next7").addEventListener("click", function() {
    plusSlides(cant, "7");
});
    
plusSlides(0,"1");
plusSlides(0,"2");
plusSlides(0,"3");
plusSlides(0,"4");
plusSlides(0,"5");
plusSlides(0,"6");
plusSlides(0,"7"); 
//***********/ 

  function actualizarPosicion(name) {
	var recuadros = document.getElementsByName("pos_"+name);;
	for (i = 0; i < recuadros.length; i++) {
		recuadros[i].classList.remove("pos_on");
       }
	recuadros[Math.trunc(slideIndex / show)].classList.add("pos_on");
 }


 
function showSlides(name) {

       var i;
	   var aux;
       var slides = document.getElementsByName(name);
	   actualizarPosicion(name);
		   
       for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
       }
	  
     aux = slideIndex;
	   
	  for (i = 0; i < show; i++){
		slides[aux].style.display = "block";
		aux++;
       }
}




function plusSlides(valor,name){
	 let slides = document.getElementsByName(name);
	 
	 slideIndex =  document.getElementById("juegos_"+name).slideIndex; // obtengo la pos del slider
	 slideIndex = slideIndex+valor;
    console.log( "sume"+slideIndex);	

	 if(slideIndex >= (slides.length-show)) 
		{slideIndex = slides.length-show}
	 if(slideIndex < 0 ) 
	 	{slideIndex = 0}
	   
	   document.getElementById("juegos_"+name).slideIndex = slideIndex; // guardo la pos del slider
	console.log( "arracno en "+slideIndex+" --"+document.getElementById("juegos_"+name).slideIndex);	
	 showSlides(name);
	
}

