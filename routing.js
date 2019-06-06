var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
	// configure the routes
	$routeProvider
	.when('/', {
	// route for the home page
	templateUrl: 'inicio.html',
	controller: 'inicioController'
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


var vector = [{name:"Home",cont: -2},{name:"About",cont:0},{name:"Contact",cont:0}];

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
			data: {firstname: vm.firstName, lastname: vm.lastName, user: vm.username, password : vm.password}
		}).then(function (response){
			if (response.data){
				console.log(response.data + "MO");
				//sessionStorage.setItem("usuario", vm.username);
				console.log("Ya puedes iniciar sesion");
				$location.path('/login');
			} else{
				console.log("No se pudo " + response.data);
			}
			
        });         
		console.log("terminado...");   
		vm.enviarEmail("correodeprueba@caca.com");
	};
	
	vm.enviarEmail = function(correo)
	{
		alert("Enviando correo..." + correo);
		$http({
			url: 'http://localhost:3010/send', 
			method: "GET",
			params: {email: correo}
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
			if(response.data.msg == "IC"){
				//console.log("DATA: " + response.data.msg + " " + response.data.password);
                vm.setValues(vm.username, vm.password);
                alert("Sesion iniciada :D");
                $location.path('/');
            } else{
				//console.log("DATA: " + response + " " + response.data);
				if(response.data.msg == "NE")
				{
					alert(response.data.msg + " - Usuario no existente, por favor registrese");
                	$location.path('/register');
				}else{
					alert(response.data.msg + " - Contraseña incorrecta");
                	window.location.reload();
				}
				
            }
		});
		vm.dataLoading = false;
	};
		
	vm.setValues = function setValues(){
		sessionStorage.setItem("usuario", vm.username);
		sessionStorage.setItem("password", vm.password);
		
		//*ar cookie = new Date();
		//cookie.setDate(cookie.getDate() + 7 );
		//$cookies.putObject('globals',{user: vm.username , password : vm.password}, {expires: cookie});
	};
	
	vm.logOut = function logOut(){
		sessionStorage.clear();
		//$cookies.remove('globals');
	};
}

app.controller('inicioController', function ($scope) {

});

app.controller('aboutController', function ($scope) 
{
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

app.controller('vacantesController', function ($scope) {

});

app.controller('notFoundController', function ($scope) {
	$scope.message = 'There seems to be a problem finding the page you wanted';
	//$scope.attemptedPath = $location.path();
});