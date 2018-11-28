$(document).ready(function(){
	var slideImages = [ {src: '../jRCarousel/images/01.jpg'},
	              		{src: '../jRCarousel/images/02.jpg'},
	              		{src: '../jRCarousel/images/03.jpg'},
	              		{src: '../jRCarousel/images/04.jpg'},
	              		{src: '../jRCarousel/images/05.jpg'} ]


	var carouselCustomeTemplateProps =  {
	 		  width: 1100, 				/* largest allowed width */
			  height: 300, 				/* largest allowed height */
			  slideLayout : 'cover',     /* "contain" (fit according to aspect ratio), "fill" (stretches object to fill) and "cover" (overflows box but maintains ratio) */
			  animation: 'scroll', 	/* slide | scroll | fade | zoomInSlide | zoomInScroll */
			  animationCurve: 'ease',
			  animationDuration: 1900,
			  animationInterval: 2000,
			  slideClass: 'jR3DCarouselCustomSlide',
			  autoplay: true,
			  controls: true,			/* control buttons */
			  navigation: 'squares'			/* circles | squares | '' */,
			  perspective: 2200,
			  rotationDirection: 'ltr',
			  onSlideShow: slideShownCallback

		}
	function slideShownCallback($slide){
		console.log("Slide shown: ", $slide.find('img').attr('src'))
	}

	jR3DCarouselCustomeTemplate = $('.jR3DCarouselGalleryCustomeTemplate').jR3DCarousel(carouselCustomeTemplateProps);

  });
