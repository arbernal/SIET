var app = angular.module('app', [ 'ngRoute', 'ui.bootstrap' ]);
app.config(function($routeProvider) {
	
	$routeProvider.when('/inicio', {
		templateUrl : '/index',
		controller : 'inicioController'
	}).when('/modulo_estiba', {
		templateUrl : '/estiba',
		controller : 'estibaController'
	}).when('/modulo_patio', {
		templateUrl : '/patio',
		controller : 'patioController'
	}).when('/modulo_inspeccion', {
		templateUrl : '/inspeccion',
		controller : 'inspeccionController'
	}).when('/modulo_taller', {
		templateUrl : '/taller',
		controller : 'tallerController'
	}).when('/modulo_plataforma', {
		templateUrl : '/plataforma',
		controller : 'plataformaController'
	}).when('/modulo_pozo', {
		templateUrl : '/pozo',
		controller : 'pozoController'
	})
	.otherwise({
		redirectTo : '/index'
	});
});

app.controller('inicioController', function($scope) {
	$scope.message = 'Hola, Mundo!';
});
