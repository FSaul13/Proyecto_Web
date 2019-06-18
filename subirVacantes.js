vm.subirVacante = function ()
    {
        console.log("registrando...");
		$http({
			url: "subirVacante.php",
			method: "POST",
			data: {descripcion: vm.descripcion, lugar: vm.lugar, categoria: vm.cat, area : vm.area, tiempo: vm.tiempo, salario: vm.salario}
		}).then(function (response){
			if (response.data){
                alert("Si se pudo!");
            }
            else{
                alert("Nel prro");
            }
		});
		console.log("ya...");
	};