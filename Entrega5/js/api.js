let cb = new Codebird;
  cb.setConsumerKey("tZNi5uRQIYCrDQSjrHooOWUgz", "usD00OEvDHjKCrJnnAMR42F1ZbHULvmiFPXTexurNECKqHV2p4");

let params = {
    // q: document.getElementById("pedido").value,
    q: "juegos arcade",
    lang : "es"
  };

function formatDate(date){
    return date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
}

document.getElementById("comentarios-tab").addEventListener("click", function(event) {
   event.preventDefault();
   cb.__call("search_tweets", params, function(reply) {
     document.getElementById("comentarios").innerHTML = leer_comentarios(reply);
     console.log(reply.statuses);
   });
});


function  leer_comentarios(reply){
	let texto = "";
	let max = 10;
	let pos = 0

	while ((pos <= reply.statuses.length) && (pos < max)){

		texto = texto + '<div class=" row api_marco "> ';
		texto = texto + '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 api_imagen"> ';
		texto = texto +  "<img class='imgTweet' src="+ reply.statuses[pos].user.profile_image_url +" alt='' height=80 width=70>" ;
		texto	 = texto + '</div> ';
		texto = texto + '<div class=" col-lg-11 col-md-11 col-sm-11 col-xs-11 api_comentario"> ';
			texto = texto + " <a id= 'linkTwitter' href='https://twitter.com/"+ reply.statuses[pos].user.screen_name + " 'target='_blank'>"+ reply.statuses[pos].user.name +"</a> ";
			texto = texto + '<p class="texto">';
			texto = texto + reply.statuses[pos].text;
			texto = texto + '</p> ';
			texto = texto + ' <p class="texto" >';
				texto = texto + formatDate(new Date(reply.statuses[pos].created_at));
			texto = texto + '</p> ';
		texto	 = texto + '</div> ';


		texto = texto + '</div> ';

		pos++;
	}

	return texto;
}
