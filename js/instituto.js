function Alumno(){
	this.nombre = "";
	this.apellido = "";
	this.edad = 0;
	this.email = "";
	this.foto = "";
}
var alumnos = [];
$(document).ready(function(){
	$("#consulta").click(function(){
		var tablaExiste= $('#tabla').is(':visible');
		if (!tablaExiste) {
			$.ajax({
				url:"http://www.scaggiano.com.uy/json.js", 
				success:function(data){
					alumnos = JSON.parse(data);
					$("#tabla").css("display", "table");
					for (var i = 0; i<alumnos.length; i++){
						var name = alumnos[i].nombre;
						var surname = alumnos[i].apellido;
						var mail = alumnos[i].email;
						var age = alumnos[i].edad;
						var pic = alumnos[i].foto;
						$("#cuerpo").append("<tr><td>" + name + "</td><td>" + surname + "</td><td>" + mail + "</td><td>" + age + "</td><td>" + "<img width = 50px src= " + pic + " > "+ "</td></tr>");
					}
					$("#success").show();
				},
				error: function(){
					$("#danger").show();
	    		},
				datatype:"jsonp"
 			});
		}
 	});
	$(".nav li").on("click", function(){
		$(".nav").find(".activa").removeClass("activa");
		$(this).addClass("activa");
	});
	$(".form-group input").keyup(function(){
		if(validarFormulario()){
			$("#agregar").removeClass("disabled");
		}
	});
	function validarFormulario(){
        var a=$("#nombre").val();
        var b=$("#apellido").val();
        var c=$("#edad").val();
        var d=$("#email").val();
        var noHayCampoVacio= !(a==null || a=="" || b==null || b=="" || c==null || c=="" || d==null || d=="");
        if (!noHayCampoVacio){
            $("#agregar").addClass("disabled");
        }
        return noHayCampoVacio;
    }
	$("#agregar").click(function(){
		if (!$("#agregar").hasClass("disabled")){
			$('.modal').modal('hide');
			var nom = $("#nombre").val();
			var apell = $("#apellido").val();
			var mail = $("#email").val();
			var age = $("#edad").val();
			var pic = $("#foto").val();
			var alumno1 = new Alumno();
			alumno1.nombre = nom;
			alumno1.apellido = apell;
			alumno1.email = mail;
			alumno1.edad = age;
			alumno1.foto = pic;
			alumnos.push(alumno1);
			$("#cuerpo").append("<tr><td>" + nom + "</td><td>" + apell + "</td><td>" + mail + "</td><td>" + age + "</td><td>" + "<img width = 50px src= " + pic + " > "+ "</td></tr>");
		}
	});
});



 