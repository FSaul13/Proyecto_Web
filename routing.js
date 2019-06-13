var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
	// configure the routes
	$routeProvider
	.when('/', {
	// route for the home page
	templateUrl: 'inicio.html',
	controller: 'InicioCtrl'
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
	templateUrl: 'job-search.html',
	controller: 'vacantesController'
	})
	.when('/register', {
		// route for the home page
		templateUrl: 'register.html',
		controller: 'RegisterCtrl'	
	})
	.when('/login', {
		// route for the home page
		templateUrl: 'login.html',
		controller: 'LoginCtrl'	
	})
	.when('/usermenu', {
		// route for the home page
		templateUrl: 'usermenu.html',
		controller: 'UsermenuCtrl'	
	})
	.otherwise({
	// when all else fails
	templateUrl: 'index.html',
	controller: 'notFoundController'
	});
});

app.run(run);
run.$inject = ['$rootScope', '$location'];
function run($rootScope, $location) {

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
		console.log("ruta: " + $location.path());
		var restrictedPage = $.inArray($location.path(), ['/login', '/register']) !== -1; //Si se encuentra en esa página
		console.log(restrictedPage);
		var loggedIn = sessionStorage.getItem("usuario") !== null;
		console.log("log: " + loggedIn);
        if (restrictedPage && loggedIn) {
        	$location.path('/');
        }
    });
}

app.controller('NavCtrl', NavCtrl)
function NavCtrl()
{
	console.log("Siempre en nav");
	var vm = this;
	vm.usuario = sessionStorage.getItem("usuario");
	if (vm.usuario != null)
	{
		vm.noLogin = false;
	} else{
		vm.noLogin = true;
	}
}

app.controller('RegisterCtrl', RegisterCtrl)
RegisterCtrl.$inject = ['$http', '$location'];
function RegisterCtrl($http, $location)
{
    console.log("en register");
	var vm = this;

    vm.reg = function ()
    {
        console.log("registrando...");
		vm.dataLoading = true;

		$http({
			url: "apiRegister.php",
			method: "POST",
			data: {firstname: vm.firstName, lastname: vm.lastName, user: vm.username, password : vm.password, email: vm.email, prof: vm.profesion}
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
		console.log("ya...");
	};
	
	vm.enviarEmail = function()
	{
		alert("Enviando correo..." + vm.email);
		$http({
			url: 'http://localhost:3010/send', 
			method: "GET",
			params: {email: vm.email, user: vm.username, firstname: vm.firstName, lastname: vm.lastName}
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
	};

}

app.controller('LoginCtrl', LoginCtrl)
LoginCtrl.$inject = ['$location', '$http','$cookies'];
function LoginCtrl($location, $http, $cookies)
{
    console.log("en login");
    var vm = this;
	vm.login = function login()
    {
		vm.dataLoading = true;
		console.log("Hola");
		$http({
			url: "apiLogin.php",
			method: "POST",
			data: {user: vm.username, password: vm.password}
		}).then(function (response){
			switch(response.data.msg){
				case 'IC':
					console.log("ICI: Inicio correcto de Sesion");
					vm.setValues(response.data.user, response.data.id, 1);
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
}

app.controller('UsermenuCtrl', UsermenuCtrl)
UsermenuCtrl.$inject = ['$location'];
function UsermenuCtrl($location)
{
	vm = this;
	vm.tipo = (sessionStorage.getItem("type") == 1) ? 'Aspirante' : 'Empresa';
	vm.logOut = function logOut(){
		sessionStorage.clear();
		//$cookies.remove('globals');
	};
}

app.controller('InicioCtrl', function ($scope) {
});

app.controller('aboutController', function ($scope) 
{

});

app.controller('contactController', function ($scope) 
{
});

app.controller('job-categoryController', function ($scope) {

});

app.controller('contact-usController', function ($scope) {

});

app.controller('vacantesController', function ($scope) {

});

app.controller('notFoundController', function ($scope) {
	$scope.message = 'There seems to be a problem finding the page you wanted';
	//$scope.attemptedPath = $location.path();
});