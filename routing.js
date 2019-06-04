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
.otherwise({
// when all else fails
templateUrl: 'pages/routeNotFound.html',
controller: 'notFoundController'
});
});


var vector = [{name:"Home",cont: -2},{name:"About",cont:0},{name:"Contact",cont:0}];

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

app.controller('vacantesController', function ($scope) {

});

app.controller('notFoundController', function ($scope) {

$scope.message = 'There seems to be a problem finding the page you wanted';
//$scope.attemptedPath = $location.path();

});