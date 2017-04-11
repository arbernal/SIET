$(document).ready(function() {
	$(window).resize(function() {
		 var size = $('#navSiet').width();
		 if( parseInt(size) < 766){
			 $( "div.demo-container" ).html();
			 $("#remplace").html("Nuevo contenido de la capa");
		 }
		 else{
	
		 }
	});
});

