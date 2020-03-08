var default_content="";
var globalUsuarios=[];
$(document).ready(function(){
	$("#modificar").css("display", "none");
	checkURL();
	$('ul li a').click(function (e){

			checkURL(this.hash);

	});



	//filling in the default content
	default_content = $('#pageContent').html();
	

	
	setInterval("checkURL()",250);
	
	
	$('#guardar').on('click', function(e) {
        e.preventDefault();
		var jsonData=$('#formGeneral').serializeArray()
		.reduce(function(a, z) { a[z.name] = z.value; return a; }, {});
		$("#nombre").val("");
		$("#apellido").val("");
		$("#direccion").val("");
		globalUsuarios.push(jsonData)
		renderizar(globalUsuarios)
	}); 
	

	$('#modificar').on('click', function(e) {
		modificar();
	}); 

	function modificar(){
		var id=$("#idUsuario").val();
		globalUsuarios[id].nombre = $("#nombre").val();
		globalUsuarios[id].apellido = $("#apellido").val();
		globalUsuarios[id].direccion = $("#direccion").val();
		renderizar(globalUsuarios)
		}

});

var lasturl="";

function checkURL(hash)
{

	if(!hash) hash=window.location.hash;
	
	if(hash != lasturl)
	{
		lasturl=hash;
		
		// FIX - if we've used the history buttons to return to the homepage,
		// fill the pageContent with the default_content
		
		if(hash=="")
		$('#pageContent').html(default_content);
		
		else
		loadPage(hash);
	}
}


function loadPage(url)
{
	url=url.replace('#page','');
	
	$('#loading').css('visibility','visible');
	
	$.ajax({
		type: "POST",
		url: "load_page.php",
		data: 'page='+url,
		dataType: "html",
		success: function(msg){
			
			if(parseInt(msg)!=0)
			{
				$('#pageContent').html(msg);
				$('#loading').css('visibility','hidden');
			}
		}
		
	});

}


	
function renderizar(globalUsuarios){


	html="";
	//console.log(jsonData)
	html+="<table class='table'>"
	html+="<thead>"
	html+="<tr>"
	html+="<th scope='col'>nombre</th>"
	html+="<th scope='col'>apellido</th>"
	html+="<th scope='col'>direccion</th>"
	html+="<th scope='col' colspan='2'>opciones</th>"
	html+="</thead>"
	html+="<tbody>"

	
	for(var i=0;i<globalUsuarios.length;i++){
		html+="<tr><td>"
		html+=globalUsuarios[i].nombre
		html+="</td>"
		
		html+="<td>"
		html+=globalUsuarios[i].apellido
		html+="</td>"

		html+="<td>"
		html+=globalUsuarios[i].direccion
		html+="</td>"


		html+="<td>"
		html+='<button type="button" class="btn btn-primary" id="ver"'
		html+=' onclick="ver('
		html+=i+')">Ver</button>'
		html+="</td>"
		html+="<td>"
		html+='<button type="button" class="btn btn-primary" id="eliminar"'
		html+=' onclick="eliminar('
		html+=i+')">Eliminar</button>'
		html+="</td>"

		html+="</tr>"
		//$("#tablaListado").html(html)
	}
	//console.log(html)
	html+="</tbody>"
	html+="</table>"
	$("#tablaListado").html(html)


	
}

function ver(i){
	$("#guardar").css("display", "none");
	$("#modificar").css("display", "");
	$("#nombre").val(globalUsuarios[i].nombre);
	$("#apellido").val(globalUsuarios[i].apellido);
	$("#direccion").val(globalUsuarios[i].direccion);
	$("#idUsuario").val(i);
}

function eliminar(i){
	 globalUsuarios.splice(i,1)
	renderizar(globalUsuarios)
}
