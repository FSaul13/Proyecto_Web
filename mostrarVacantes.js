angular
.module('apiPHP')
.controller('apiPHPCtrl',['$http',controladorPrincipal]);



function controladorPrincipal($http,$scope){
/*
	var vm=this;
	vm.buscaVacante = function(){

        
        alert("Aqui llegue");

        alert(vm.cat);

        $http({
                
            method: 'GET',
            url: 'get.php',
            params:{categoria: vm.cat}
            
        }).then(function (response) {
            
            //alert("Simon");
            vm.vacantes = response.data;
            
        }, function (response) {
            alert("Nel");
            // on error
            console.log(response.data,response.status);
            
        });
    }
//Subir Vacantes a la base de datos
    vm.subirVacante = function ()
    {
        
        alert("Si entre a la funcion subir vacante");
		$http({
			url: "subirVacantes.php",
			method: "POST",
            data: {descripcion: vm.descripcion, lugar: vm.lugar, categoria: vm.cat, puesto : vm.puesto,
                 tiempo: vm.tiempo, salario: vm.salario, entrevista: vm.entrevista}
		}).then(function (response){
			if (response.data){
                //alert("Si se pudo!");
                alert(response.data);
               // $window.location.href = '/index.html';
               iniciar();
            }
            else{
                alert("Nel prro");
            }
            //alert(response.data);
    });    
  }
*/

  function iniciar()
{
    soltar=document.getElementById('cajasoltar');
    soltar.addEventListener('dragenter', function(e){ e.preventDefault(); }, false);
    soltar.addEventListener('dragover', function(e){ e.preventDefault(); }, false);
    soltar.addEventListener('drop', soltado, false);
}
function soltado(e)
{
    alert("Entre aqui");
    e.preventDefault();
    var archivos=e.dataTransfer.files;
    var lista='';
    for(var f=0;f<archivos.length;f++){
        lista+='Archivo: '+archivos[f].name+' '+archivos[f].size+'<br>';
    }
    soltar.innerHTML = lista;
    
    var formData = new FormData(), xhr = new XMLHttpRequest(), x;   
    for (x = 0; x < archivos.length; x = x + 1){
            formData.append('file[]', archivos[x]);
    }

    xhr.onload = function(){
    	var data = this.responseText;
    	console.log(data);
    	document.getElementById('info').innerHTML = data;
    }

    alert("Entre aqui al final");

    xhr.open('post','obtener.php');
    xhr.send(formData);
}
  
   /*Subiendo archivos*/
    
}
