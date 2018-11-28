var slideIndex = 0;
var cant = 6;
var show = 6;


//***********//
document.getElementById("juegos_1").slideIndex = 0;

document.getElementById("prev1").addEventListener("click", function() {
    plusSlides(-cant, "1");
});

document.getElementById("next1").addEventListener("click", function() {
    plusSlides(cant, "1");
});


 
  
plusSlides(0,"1");

 
//***********// 

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

