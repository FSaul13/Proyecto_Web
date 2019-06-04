angular
.module('apiApp',[])
.controller('apiAppCtrl',['$http',controladorPrincipal]);

function controladorPrincipal($http){
	//alert("Aqui");
	var vm=this;

	//constructor(private http: HttpClient) { }

	vm.buscaEnRegion = function(){
		$http.get('/').then(function(respuesta){
			console.log('res:',respuesta.data.rows);
			vm.paises = respuesta.data.rows;
		});
	}
	vm.rescata
	function(){
		$http.get('/ads').then(function(respuesta){
			console.log('res:',respuesta.data.rows);
			vm.paises = respuesta.data.rows;
		});
}
