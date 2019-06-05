var app = angular.module('app', ['ngRoute']);
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


var vector = [{name:"Home",cont: -2},{name:"About",cont:0},{name:"Contact",cont:0}];
/*
app.factory('AutService', AutService);
AutService.$inject = ['$cookies', '$rootScope', '$timeout', 'UserService']; //Permite usar funciones de estos objetos
function AutService($cookies, $rootScope, $timeout, UserService) 
{
    var service = {};
    service.Login = Login; //Como un prototipo de una función
    return service;

        //Checa si existe el usuario y si la contraseña es correcta
    function Login(username, password, cb) 
    {
        $timeout(function(){
            var response;
            UserService.GetByName(username)
                .then(function(user){
                    if(user !== null && user.password === password){
                        response = {success: true, message: "Buen inicio de sesion"};
                    } else{
                        response = {success: false, message: 'Usuario o contraseña incorrect@'};
                    }
                    cb(response);
                });
        }, 1000);
    }

    
}*/

app.controller('RegisterCtrl', RegisterCtrl)
RegisterCtrl.$inject = ['$http', '$location'];
function RegisterCtrl($http, $location)
{
    console.log("en register");
	var vm = this;
    vm.reg = function reg()
    {
        console.log("registrando...");
		vm.dataLoading = true;

		$http({
			url: "apiRegister.php",
			method: "POST",
			data: {firstname: vm.firstName, lastname: vm.lastName, user: vm.username, password : vm.password}
		}).then(function (response){
			console.log(response.data);
			//sessionStorage.setItem("usuario", vm.username);
			console.log("Ya puedes iniciar sesion");
			$location.path('/login');
        });         
        console.log("terminado...");   
    };
}
app.controller('LoginCtrl', LoginCtrl)
LoginCtrl.$inject = ['$location', '$http'];
function LoginCtrl($location, $http)
{
    console.log("en login");
    var vm = this;
	vm.login = login;
	vm.setValues = setValues;
        
    function login()
    {
		vm.dataLoading = true;
		
		$http({
			url: "apiLogin.php",
			method: "POST",
			data: {user: vm.username, password: vm.password}
		})then(function (reponse){
			if(response == true){
                vm.setValues(vm.username, vm.password);
                console.log("iniciado");
                $location.path('/inicio');
            } else{
				alert("Usuario no existente, por favor registrese prro");
                vm.dataLoading = false;
                $location.path('/register');
            }
		});
	};
		
	function setValues(username, pass){
		sessionStorage.setItem("usuario", vm.username);
		sessionStorage.setItem("password", vm.password);
		
		var cookie = new Date();
		cookie.setDate(cookie.getDate() + 7 );
		$cookies.putObject('globals', $rootScope.globals, {expires: cookie});
	}
	
	function logOut(){
		$cookies.remove('globals');
	}
}

app.controller('homeController', function ($scope) {

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

app.controller('loginController', function ($scope) {

});

app.controller('notFoundController', function ($scope) {
	$scope.message = 'There seems to be a problem finding the page you wanted';
	//$scope.attemptedPath = $location.path();
});