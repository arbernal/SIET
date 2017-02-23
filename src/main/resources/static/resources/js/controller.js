app.controller('pozoController', function($scope, $http) {
	$scope.currentPage = 1;
	$scope.itemsPerPage = 5;
	
	$scope.findAll = function(){
		$http.get('/service/pozo/search/findByActive').success(function(data) {
			$scope.data = data._embedded.pozo;
			$scope.totalItems = $scope.data.length;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}
	
	$scope.getPlataformas = function() {
		$http.get('/service/plataforma/search/findByActive')
		.success(function(data) {
			$scope.plataforma = data._embedded.plataforma;	
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}
	
	$scope.getEdPlataforma = function() {
		$http.get($scope.currentRow._links.plataforma.href)
		.success(function(data) {	
			$scope.itemPlataformas = data;
		}).error(function(data) { 
			console.log('Error: ' + data);
		});
	}
		
	
	$scope.getCurrentRow = function(current) {
		$scope.currentRow = current;
	}
	
	$scope.cancel= function() {
		$scope.saveModel = null;
	}
	
	$scope.save = function() {
		var descPozo =  $('input:text[name=descPozo_new]').val();
		var plataforma =  $('select[name=plataforma_new]').val();
		var estaPozo = true;
		var pozo = { descPozo, plataforma, estaPozo };
		$http({
		    url: '/service/pozo',
		    method: "post",
		    headers: {
		        "Content-Type": "application/hal+json"
		    },
		    data: pozo
		}).success(function(data) {
			$scope.findAll();
			$scope.saveModel = null;
			$('#formSave').trigger('reset');
			$('#saveModal').modal('hide');
		}).error(function(data) {
			console.log('Error:' + data);
		});	
	}
	
	
	$scope.update = function() {
		var descPozo =  $('input:text[name=descPozo_edit]').val();
		var plataforma =  $('select[name=plataforma_edit]').val();
		var estaPozo= true;
		var pozo = { descPozo, plataforma, estaPozo};
		$http({
		    url: $scope.currentRow._links.pozo.href,
		    method: "put",
		    headers: {
		        "Content-Type": "application/hal+json"
		    },
		    data: pozo
		}).success(function(data) {
			$scope.findAll();
			$('#editModal').modal('hide');
		}).error(function(data) {
			console.log('Error:' + data);
		});
		
	}; 
	
	$scope.deleted = function() {
		if($scope.currentRow.estaPozo){
			var plataforma;
			$http.get($scope.currentRow._links.plataforma.href)
			.success(function(data) {
				plataforma = data._links.plataforma.href;
			}).error(function(data) {
				console.log('Error: ' + data);
			});
			var descPozo = $scope.currentRow.descPozo;
			var estaPozo = false;
			var pozo = { descPozo, plataforma, estaPozo };
			$http({
			    url: $scope.currentRow._links.pozo.href,
			    method: "put",
			    headers: {
			        "Content-Type": "application/hal+json"
			    },
			    data: pozo
			}).success(function(data) {
				$scope.findAll();
				$('#deleteModal').modal('hide');
			}).error(function(data) {
				console.log('Error:' + data);
			});	
		}
		else
			$('#deleteModal').modal('hide');
	};

});

app.controller('plataformaController', function($scope, $http) {
	$scope.currentPage = 1;
	$scope.itemsPerPage = 5;

	$scope.findAll = function(){
		$http.get('/service/plataforma').success(function(data) {
			$scope.data = data._embedded.plataforma;
			$scope.totalItems = $scope.data.length;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}
	
	$scope.getCurrentRow = function(current) {
		$scope.currentRow = current;
	}

	$scope.update = function() {
		var codePlat =  $('input:text[name=codePlat_edit]').val();
		var descPlat =  $('input:text[name=descPlat_edit]').val();
		var estaPlat =  true;
		var plataforma = { codePlat, descPlat, estaPlat };
		$http({
		    url: $scope.currentRow._links.plataforma.href,
		    method: "put",
		    headers: {
		        "Content-Type": "application/hal+json"
		    },
		    data: plataforma
		}).success(function(data) {
			$scope.findAll();
			$('#editModal').modal('hide');
		}).error(function(data) {
			console.log('Error:' + data);
		});
		
	}
	
	$scope.save = function() {
		var codePlat =  $('input:text[name=codePlat_new]').val();
		var descPlat =  $('input:text[name=descPlat_new]').val();
		var estaPlat = true;
		var plataforma = { codePlat, descPlat , estaPlat };
		$http({
		    url: '/service/plataforma',
		    method: "post",
		    headers: {
		        "Content-Type": "application/hal+json"
		    },
		    data: plataforma
		}).success(function(data) {
			$scope.findAll();
			$('#formSave').trigger('reset');
			$('#saveModal').modal('hide');
		}).error(function(data) {
			console.log('Error:' + data);
		});	
	}
	
	$scope.deleted = function() {
		var codePlat =  $scope.currentRow.codePlat;
		var descPlat =  $scope.currentRow.descPlat;
		var estaPlat = false;
		var plataforma = { codePlat, descPlat , estaPlat };
		$http({
		    url: $scope.currentRow._links.plataforma.href,
		    method: "put",
		    headers: {
		        "Content-Type": "application/hal+json"
		    },
		    data: plataforma
		}).success(function(data) {
			$scope.findAll();
			$('#deleteModal').modal('hide');
		}).error(function(data) {
			console.log('Error:' + data);
		});
		
	};
	
	
});

app.controller('tallerController', function($scope, $http) {
	$scope.currentPage = 1;
	$scope.itemsPerPage = 5;
	
	$scope.findAll = function(){
		$http.get('/service/taller/search/findByActive').success(function(data) {
			$scope.data = data._embedded.taller;
			$scope.totalItems = $scope.data.length;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}
	
	$scope.getPatios = function() {
		$http.get('/service/patio/search/findByActive')
		.success(function(data) {
			$scope.patios = data._embedded.patio;	
		}).error(function(data) {
			console.log('Error: ' + data);
		});
		
	}
	
	$scope.getEdPatio = function() {
		$http.get($scope.currentRow._links.patio.href)
		.success(function(data) {	
			$scope.itemPatio = data;
		}).error(function(data) { 
			console.log('Error: ' + data);
		});
	}
		
	
	$scope.getCurrentRow = function(current) {
		$scope.currentRow = current;
	}
	
	$scope.cancel= function() {
		$scope.saveModel = null;
	}
	
	$scope.save = function() {
		var descTall =  $('input:text[name=descTall_new]').val();
		var patio =  $('select[name=patio_new]').val();
		var estaTall = true;
		var taller = { descTall, patio , estaTall };
		$http({
		    url: '/service/taller',
		    method: "post",
		    headers: {
		        "Content-Type": "application/hal+json"
		    },
		    data: taller
		}).success(function(data) {
			$scope.findAll();
			$scope.saveModel = null;
			$('#formSave').trigger('reset');
			$('#saveModal').modal('hide');
		}).error(function(data) {
			console.log('Error:' + data);
		});	
	}
	
	
	$scope.update = function() {
		var descTall =  $('input:text[name=descTall_edit]').val();
		var patio =  $('select[name=patio_edit]').val();
		var estaTall= true;
		var taller = { descTall, patio, estaTall };
		$http({
		    url: $scope.currentRow._links.taller.href,
		    method: "put",
		    headers: {
		        "Content-Type": "application/hal+json"
		    },
		    data: taller
		}).success(function(data) {
			$scope.findAll();
			$('#editModal').modal('hide');
		}).error(function(data) {
			console.log('Error:' + data);
		});
		
	}; 
	
	$scope.deleted = function() {
		if($scope.currentRow.estaTall){
			var patio;
			$http.get($scope.currentRow._links.patio.href)
			.success(function(data) {
				patio = data._links.patio.href;
			}).error(function(data) {
				console.log('Error: ' + data);
			});
			var descTall = $scope.currentRow.descTall;
			var estaTall = false;
			var taller = { descTall, patio, estaTall };
			$http({
			    url: $scope.currentRow._links.taller.href,
			    method: "put",
			    headers: {
			        "Content-Type": "application/hal+json"
			    },
			    data: taller
			}).success(function(data) {
				$scope.findAll();
				$('#deleteModal').modal('hide');
			}).error(function(data) {
				console.log('Error:' + data);
			});	
		}
		else
			$('#deleteModal').modal('hide');
	};

});



app.controller('inspeccionController', function($scope, $http) {
	$scope.currentPage = 1;
	$scope.itemsPerPage = 5;
	
	$scope.findAll = function(){
		$http.get('/service/unidadinspeccion/search/findByActive').success(function(data) {
			$scope.data = data._embedded.unidadinspeccion;
			$scope.totalItems = $scope.data.length;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}
	
	$scope.getPatios = function() {
		$http.get('/service/patio/search/findByActive')
		.success(function(data) {
			$scope.patios = data._embedded.patio;	
		}).error(function(data) {
			console.log('Error: ' + data);
		});
		
	}
	
	$scope.getEdPatio = function() {
		$http.get($scope.currentRow._links.patio.href)
		.success(function(data) {	
			$scope.itemPatio = data;
		}).error(function(data) { 
			console.log('Error: ' + data);
		});
	}
		
	
	$scope.getCurrentRow = function(current) {
		$scope.currentRow = current;
	}
	
	$scope.cancel= function() {
		$scope.saveModel = null;
	}
	
	$scope.save = function() {
		var descInsp =  $('input:text[name=descInsp_new]').val();
		var patio =  $('select[name=patio_new]').val();
		var estaInsp = true;
		var unidadInspeccion = { descInsp, patio , estaInsp };
		$http({
		    url: '/service/unidadinspeccion',
		    method: "post",
		    headers: {
		        "Content-Type": "application/hal+json"
		    },
		    data: unidadInspeccion
		}).success(function(data) {
			$scope.findAll();
			$scope.saveModel = null;
			$('#formSave').trigger('reset');
			$('#saveModal').modal('hide');
		}).error(function(data) {
			console.log('Error:' + data);
		});	
	}
	
	
	$scope.update = function() {
		var descInsp =  $('input:text[name=descInsp_edit]').val();
		var patio =  $('select[name=patio_edit]').val();
		var estaInsp = $('select[name=estaInsp_edit]').val();
		var unidadInspeccion = { descInsp, patio, estaInsp };
		$http({
		    url: $scope.currentRow._links.unidadInspeccion.href,
		    method: "put",
		    headers: {
		        "Content-Type": "application/hal+json"
		    },
		    data: unidadInspeccion
		}).success(function(data) {
			$scope.findAll();
			$('#editModal').modal('hide');
		}).error(function(data) {
			console.log('Error:' + data);
		});
		
	}; 
	
	$scope.deleted = function() {
		if($scope.currentRow.estaInsp){
			var patio;
			$http.get($scope.currentRow._links.patio.href)
			.success(function(data) {
				patio = data._links.patio.href;
			}).error(function(data) {
				console.log('Error: ' + data);
			});
			var descInsp = $scope.currentRow.descInsp;
			var estaInsp = false;
			var unidadInspeccion = { descInsp, patio, estaInsp };
			$http({
			    url: $scope.currentRow._links.unidadInspeccion.href,
			    method: "put",
			    headers: {
			        "Content-Type": "application/hal+json"
			    },
			    data: unidadInspeccion
			}).success(function(data) {
				$scope.findAll();
				$('#deleteModal').modal('hide');
			}).error(function(data) {
				console.log('Error:' + data);
			});	
		}
		else
			$('#deleteModal').modal('hide');
	};

});




app.directive('patio', function($http) {
	return {
		restrict: 'A',
		template: ' {{ mipatio }} ',
		link: function(scope,elem,attrs) {
			$http.get(attrs.patio).success(function(data) {
				scope.mipatio =data.descPati;
			}).error(function(data) {
				console.log('Error: ' + data);
			});
		 }
	};
});

app.directive('plataforma', function($http) {
	return {
		restrict: 'A',
		template: ' {{ miplataforma }} ',
		link: function(scope,elem,attrs) {
			$http.get(attrs.plataforma).success(function(data) {
				scope.miplataforma =data.descPlat;
			}).error(function(data) {
				console.log('Error: ' + data);
			});
		 }
	};
});


app.controller('estibaController', function($scope, $http) {
	$scope.currentPage = 1;
	$scope.itemsPerPage = 5;
	
	$scope.findAll = function(){
		$http.get('/service/estiba/search/findByActive').success(function(data) {
			$scope.data = data._embedded.estiba;
			$scope.totalItems = $scope.data.length;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}
	
	$scope.getPatios = function() {
		$http.get('/service/patio/search/findByActive')
		.success(function(data) {
			$scope.patios = data._embedded.patio;	
		}).error(function(data) {
			console.log('Error: ' + data);
		});
		
	}
	
	$scope.getEdPatio = function() {
		$http.get($scope.currentRow._links.patio.href)
		.success(function(data) {	
			$scope.itemPatio = data;
		}).error(function(data) { 
			console.log('Error: ' + data);
		});
	}
		
	
	$scope.getCurrentRow = function(current) {
		$scope.currentRow = current;
	}
	
	$scope.cancel= function() {
		$scope.saveModel = null;
	}
	
	$scope.save = function() {
		var descEsti =  $('input:text[name=descEsti_new]').val();
		var patio =  $('select[name=patio_new]').val();
		var estaEsti = true;
		var estiba = { descEsti, patio , estaEsti };
		$http({
		    url: '/service/estiba',
		    method: "post",
		    headers: {
		        "Content-Type": "application/hal+json"
		    },
		    data: estiba
		}).success(function(data) {
			$scope.findAll();
			$('#formSave').trigger('reset');
			$('#saveModal').modal('hide');
			$scope.saveModel = null;
		}).error(function(data) {
			console.log('Error:' + data);
		});	
	}
	
	
	$scope.update = function() {
		var patio;
		$http.get($scope.currentRow._links.patio.href)
		.success(function(data) {
			patio = data._links.patio.href;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
		var descEsti =  $('input:text[name=descEsti_edit]').val();
		var estaEsti = true;
		var estiba = { descEsti, patio, estaEsti };
		$http({
		    url: $scope.currentRow._links.estiba.href,
		    method: "put",
		    headers: {
		        "Content-Type": "application/hal+json"
		    },
		    data: estiba
		}).success(function(data) {
			$scope.findAll();
			$('#editModal').modal('hide');
		}).error(function(data) {
			console.log('Error:' + data);
		});
		
	}; 
	
	$scope.deleted = function() {
		if($scope.currentRow.estaEsti){
			var patio;
			$http.get($scope.currentRow._links.patio.href)
			.success(function(data) {
				patio = data._links.patio.href;
			}).error(function(data) {
				console.log('Error: ' + data);
			});
			var descEsti = $scope.currentRow.descEsti;
			var estaEsti = false;
			var estiba = { descEsti, patio, estaEsti };
			$http({
			    url: $scope.currentRow._links.estiba.href,
			    method: "put",
			    headers: {
			        "Content-Type": "application/hal+json"
			    },
			    data: estiba
			}).success(function(data) {
				$scope.findAll();
				$('#deleteModal').modal('hide');
			}).error(function(data) {
				console.log('Error:' + data);
			});	
		}
		else
			$('#deleteModal').modal('hide');
	};
	
	
	

});

app.controller('patioController', function($scope, $http,  $modal) {
	$scope.currentPage = 1;
	$scope.itemsPerPage = 5;

	$scope.findAll = function(){
		$http.get('/service/patio/search/findByActive').success(function(data) {
			$scope.data = data._embedded.patio;
			$scope.totalItems = $scope.data.length;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}
	

	$scope.save = function() {
		$scope.patio = {};
		var modalInstance = $modal.open({
             template: document.getElementById("saveModal").childNodes[1].innerHTML,
             backdrop: 'static', keyboard  : false, size:'sm',
             controller: function($scope, $http, $modalInstance){
            	 $scope.add = function(){
            		 $scope.patio.estaPati = 1;
            		 $modalInstance.close($scope.patio);
            	 }
            	 
            	 $scope.cancel = function() {
            		 $modalInstance.dismiss('cancel');
            	 };
             }
		});
			
		modalInstance.result.then(function (value) {
			$http({ 
				url: '/service/patio',
			    method: "post", data: value,
			    headers: {
			        "Content-Type": "application/hal+json"
			    }
			}).success(function(data) {
				$scope.findAll();
			}).error(function(data) {
				console.log('Error:' + data);
			});
	    }); 
	};
	
	$scope.update = function(row) {
		var modalInstance = $modal.open({
             template: document.getElementById("editModal").childNodes[1].innerHTML,
             backdrop: 'static', keyboard  : false , size:'sm',
             controller: function($scope, $http, $modalInstance){
            	 $scope.current = Object.assign({}, row);
            	 
            	 $scope.edit = function(){
            		 $modalInstance.close($scope.current);
            	 }
            	 
            	 $scope.cancel = function() {
            		 $modalInstance.dismiss('cancel');
            	 };
             }
		});
			
		modalInstance.result.then(function (value) {
			$scope.item = { codePati: value.codePati, 
							descPati: value.descPati, estaPati: 1 };
			$http({ 
				url: value._links.patio.href,
			    method: "put", data: $scope.item,
			    headers: {
			        "Content-Type": "application/hal+json"
			    }
			}).success(function(data) {
				$scope.findAll();
			}).error(function(data) {
				console.log('Error:' + data);
			});
			
	    }); 
	};
	
	$scope.deleted = function(row) {
		var modalInstance = $modal.open({
             template: document.getElementById("deleteModal").childNodes[1].innerHTML,
             backdrop: 'static', keyboard  : false, size:'sm',
             controller: function($scope, $http, $modalInstance){
            	 
            	 $scope.remove = function(){
            		 $modalInstance.close(row);
            	 }
            	 
            	 $scope.cancel = function() {
            		 $modalInstance.dismiss('cancel');
            	 };
             }
		});
			
		modalInstance.result.then(function (value) {
			$scope.item = { codePati: value.codePati, 
							descPati: value.descPati, estaPati: 0 };
			$http({ 
				url: value._links.patio.href,
			    method: "put", data: $scope.item,
			    headers: {
			        "Content-Type": "application/hal+json"
			    }
			}).success(function(data) {
				$scope.findAll();
			}).error(function(data) {
				console.log('Error:' + data);
			}); 
			
	    }); 
	};
	
});


