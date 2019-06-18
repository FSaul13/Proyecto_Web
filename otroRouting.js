var app = angular.module('apiPHP', ['ngRoute']);
app.config(function ($routeProvider) {
// configure the routes
$routeProvider
.when('/', {
// route for the home page
templateUrl: 'inicio.html',
controller: 'homeController'
})
.when('/about', {
// route for the about page
templateUrl: 'about.html',
controller: 'aboutController'
})
.when('/contact', {
// route for the contact page
templateUrl: 'pages/contact.html',
controller: 'contactController'
})
.when('/job-category', {
// route for the home page
templateUrl: 'job-category.html',
controller: 'job-categoryController'
})
.when('/contact-us', {
// route for the home page
templateUrl: 'contact-us.html',
controller: 'contact-usController'
})
.when('/vacantes', {
// route for the home page
templateUrl: 'vacantes.html',
controller: 'apiPHPCtrl2'
})
.when('/login',{
    //Log In
    templateUrl:'login.html',
    controller: 'LoginCtrl'
})
.when('/subirVacante', {
	// route for the home page
	templateUrl: 'subirVacantes.html',
	controller: 'apiPHPCtrl'
})
.when('/register', {
    // route for the home page
    templateUrl: 'register.html',
    controller: 'RegisterCtrl'
})
.otherwise({
// when all else fails
templateUrl: 'pages/routeNotFound.html',
controller: 'notFoundController'
});
});

function controladorPrincipal($http,$scope){

	
	
}

app.controller('homeController', function ($scope) {
	//Sin contenido
});
app.controller('aboutController', function ($scope) {

$scope.message = 'Find out more about me.';
$scope.muestra = ++vector[1].cont;
//$scope.muestra = vector;
//$scope.muestra[1].cont++;
});
app.controller('contactController', function ($scope) {

$scope.message = 'Contact us!';
//$scope.muestra = vector;
$scope.muestra = ++vector[2].cont;
//$scope.muestra[2].cont++;
});
app.controller('job-categoryController', function ($scope) {

});
app.controller('contact-usController', function ($scope) {

});

app.controller('apiPHPCtrl2', function ($http) {//Buscar Vacante
	var vm=this;
	vm.buscaVacante = function(){

        
        alert("Aqui llegue");

        alert(vm.cat);

        $http({
                
            method: 'GET',
            url: 'get.php',
            params:{categoria: vm.cat}
            
        }).then(function (response) {
            
            alert("Simon");
            vm.vacantes = response.data;
            
        }, function (response) {
            alert("Nel");
            // on error
            console.log(response.data,response.status);
            
        });
    }
    
    /*Aplicar Para un Trabajo*/
  vm.aplicarSolicitud= function(id_oferta){//es cuendo se aprieta el boton de la pagina mostrar info
    if (sessionStorage.getItem("usuario") && sessionStorage.getItem("password")){//verifica si esta en sesion
        alert("Incribirse");
        alert(id_oferta);//verifica que haya llegado el id de la oferta que se envio de parametro
        var usuario =(sessionStorage.getItem("id"));
        alert(usuario);
        $http({
          
            method: 'POST',
            url: 'pedirtrabajo.php',//manda a llamar a esa pagina que hara modificar la bse de datos colocando el id de la oferta, el id del solicitante y colocando en uno el boleano que quiere solicitar a espera de respuesta de empresa
            data:{oferta:id_oferta,usuario:usuario}//se envian los datos
            
        }).then(function (response) {
            
            console.log(response.data);
            // on success
           alert("Felicidades");
           
            
        }, function (response) {
            alert("Nel");
           
            // on error
           
            
        });


    }
    else{
        alert("inicia sesion");//en caso que no esten las variables de sesion
    }

   
}

});

app.controller('apiPHPCtrl', function ($http) {//Subir Vacante
	alert("LLEGUE");
	var vm=this;
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
            }
            else{
                alert("Nel prro");
            }
            //alert(response.data);
    });    
  }

  

	//alert("Si entre");
});

app.controller('LoginCtrl', function ($scope,$http) {//LOGIN
    //Probando lo del LogIn
        console.log("en login");
        var vm = this;
        
        vm.tipo = 1;
    
        vm.login = function login()
        {
            vm.dataLoading = true;
            console.log("Hola");
            $http({
                url: "apiLogin.php",
                method: "POST",
                data: {tipo: vm.tipo, user: vm.username, password: vm.password}
            }).then(function (response){
                switch(response.data.msg){
                    case 'IC':
                        console.log("ICI: Inicio correcto de Sesion");
                        vm.setValues(response.data.user, response.data.id, vm.tipo);
                        alert("Sesion iniciada :D");
                        window.location.reload();
                        break;
                    case 'NE':
                        console.log("NE: Usuario no existe en la BD");
                        alert("Registrese por favor, su usuario no existe");
                        $location.path('/register');
                        break;
                    case 'CIN':
                        console.log("CIN: Contraseña incorrecta, intente de nuevo");
                        alert("Contraseña incorrecta, intente de nuevo");
                        window.location.reload();
                        break;
                    case 'NV':
                        console.log("NV: No verificado");
                        alert("Aun no ha verificado su correo");
                        window.location.reload();
                        break;
                }
            });
            vm.dataLoading = false;
        };
            
        vm.setValues = function setValues(user, id, type){
            sessionStorage.setItem("usuario", user);
            sessionStorage.setItem("id", id);
            sessionStorage.setItem("type", type)
            //*ar cookie = new Date();
            //cookie.setDate(cookie.getDate() + 7 );
            //$cookies.putObject('globals',{user: vm.username , password : vm.password}, {expires: cookie});
        };
    //Sin contenido
    alert("Entre a LogIn");
});

app.controller('RegisterCtrl', function ($http,$location) {//Registrar
    console.log("en register");
	var vm = this;

	vm.tipo = 1;

    vm.reg = function ()
    {
        console.log("registrando...");
		vm.dataLoading = true;
		if(vm.tipo == 1)
		{
			$http({
				url: "apiRegister.php",
				method: "POST",
				data: {tipo: vm.tipo, firstname: vm.firstName, lastname: vm.lastName, user: vm.username, password: vm.password, email: vm.email, prof: vm.profesion, tel: vm.tel, edad: vm.edad}
			}).then(function (response){
				if (response.data){
					console.log(response.data + "MO");
					//sessionStorage.setItem("usuario", vm.username);
					alert("Checa tu correo para verificarlo: " + response.data);
					console.log("terminado...");   
					vm.enviarEmail();
					$location.path('/login');
				} else if (response.data == false){
					alert("Ya existe el usuario " + response.data);
					window.location.reload();
				} else{
					console.log("No se pudo: " + response.data);
				}
			});
		} else{
			$http({
				url: "apiRegister.php",
				method: "POST",
				data: {tipo: vm.tipo, nom: vm.nom, rfc: vm.rfc, email: vm.emailI, tel: vm.telE, giro: vm.giro, user: vm.usernameE, password: vm.passwordE}
			}).then(function (response){ //Checar si se puede usar una función de angular en vez de todo el desmadre :v 
				if (response.data){
					console.log(response.data + "MO");
					//sessionStorage.setItem("usuario", vm.username);
					alert("Checa tu correo para verificarlo: " + response.data);
					console.log("terminado...");   
					vm.enviarEmail();
					$location.path('/login');
				} else if (response.data == false){
					alert("Ya existe el usuario " + response.data);
					window.location.reload();
				} else{
					console.log("No se pudo: " + response.data);
				}
			});
		}
		console.log("ya...");
	};
	
	vm.enviarEmail = function()
	{
		if(vm.tipo == 1)
		{
			alert("Enviando correo..." + vm.email);
		
			$http({
				url: 'http://localhost:3010/send', 
				method: "GET",
				params: {tipo: vm.tipo, email: vm.email, user: vm.username}
			}).then(function(response){
				if (response.data != null)
				{
					alert("Enviado: " + response.data);
				}
				else
				{
					alert(response.data + " " + response.status);
				}
			});
		}else{
			alert("Enviando correo..." + vm.emailI);
		
			$http({
				url: 'http://localhost:3010/send', 
				method: "GET",
				params: {tipo: vm.tipo, email: vm.emailI, user: vm.usernameE}
			}).then(function(response){
				if (response.data != null)
				{
					alert("Enviado: " + response.data);
				}
				else
				{
					alert(response.data + " " + response.status);
				}
			});
		}
	};
    //Sin contenido
    alert("Entre a Register");
});

app.controller('notFoundController', function ($scope) {

$scope.message = 'There seems to be a problem finding the page you wanted';
//$scope.attemptedPath = $location.path();

});