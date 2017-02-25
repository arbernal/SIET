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

app.controller('plataformaController', function($scope, $http, $modal) {
	$scope.currentPage = 1;
	$scope.itemsPerPage = 5;

	$scope.findAll = function(){
		$http.get('/service/plataforma/search/findByActive').success(function(data) {
			$scope.data = data._embedded.plataforma;
			$scope.totalItems = $scope.data.length;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}
	
	$scope.save = function() {
		$scope.plata = {};
		var modalInstance = $modal.open({
             template: document.getElementById("saveModal").childNodes[1].innerHTML,
             backdrop: 'static', keyboard  : false, size:'sm',
             controller: function($scope, $http, $modalInstance){
            	 $scope.add = function(){
            		 $scope.plata.estaPlat = 1;
            		 $modalInstance.close($scope.plata);
            	 }
            	 
            	 $scope.cancel = function() {
            		 $modalInstance.dismiss('cancel');
            	 };
             }
		});
			
		modalInstance.result.then(function (value) {
			$http({ 
				url: '/service/plataforma',
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
			$scope.item = { codePlat: value.codePlat, 
							descPlat: value.descPlat, estaPlat: 1 };
		   $http({ 
				url: value._links.plataforma.href,
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
			$scope.item = { codePlat: value.codePlat, 
					descPlat: value.descPlat, estaPlat: 0 };
			$http({ 
				url: value._links.plataforma.href,
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

app.controller('tallerController', function($scope, $http, $modal) {
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
	
	$scope.save = function() {
		$scope.taller = {};
		var modalInstance = $modal.open({
             template: document.getElementById("saveModal").childNodes[1].innerHTML,
             backdrop: 'static', keyboard: false, size:'sm',
             controller: function($scope, $http, $modalInstance){
            	 
            	 $scope.add = function(){
            		 $scope.taller.estaTall = 1;
            		 $scope.taller.patio = $scope.taller.patio._links.patio.href;
            		 $modalInstance.close($scope.taller);
            	 };
            	 
            	 $scope.getPatios = function() {
            		$http.get('/service/patio/search/findByActive')
            		.success(function(data) {
            			$scope.patios = data._embedded.patio;
            		}).error(function(data) {
            				console.log('Error: ' + data);
            		});	
            	 };
            	 
            	 $scope.cancel = function() {
            		 $modalInstance.dismiss('cancel');
            	 };
             }
		});
			
		modalInstance.result.then(function (value) {		
			$http({ 
				url: '/service/taller',
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
            	 
            	 $scope.getPatio = function() {
            		 $http.get($scope.current._links.patio.href)
            			.success(function(data) {	
            				$scope.current.patio = data;
            		 }).error(function(data) { 
            				console.log('Error: ' + data);
            		 });
            	 }
            	 
            	 $scope.cancel = function() {
            		 $modalInstance.dismiss('cancel');
            	 };
             }
	 });
			
	 modalInstance.result.then(function (value) {
			$scope.item = { descTall: value.descTall, patio:value.patio._links.patio.href ,estaTall: 1 };
			$http({ 
				url: value._links.taller.href,
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
	            		$http.get(row._links.patio.href)
	         			.success(function(data) {	
		         			row.patio = data._links.patio.href;
		         			$modalInstance.close(row);
		         		 }).error(function(data) { 
		         				console.log('Error: ' + data);
		         		 });
	            	 }
	            	 
	            	 $scope.cancel = function() {
	            		 $modalInstance.dismiss('cancel');
	            	 };
	             }
			});
				
			modalInstance.result.then(function (value) {
				$scope.item = { descTall: value.descTall, patio:value.patio ,estaTall: 0 };
				$http({ 
					url: value._links.taller.href,
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



app.controller('inspeccionController', function($scope, $http, $modal) {
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
	
	$scope.save = function() {
		$scope.inspec = {};
		var modalInstance = $modal.open({
             template: document.getElementById("saveModal").childNodes[1].innerHTML,
             backdrop: 'static', keyboard: false, size:'sm',
             controller: function($scope, $http, $modalInstance){
            	 
            	 $scope.add = function(){
            		 $scope.inspec.estaInsp = 1;
        	       	 $scope.inspec.patio = $scope.inspec.patio._links.patio.href;
        	       	 $modalInstance.close($scope.inspec);
        	     };
               	 
        	     $scope.getPatios = function() {
        	    	 $http.get('/service/patio/search/findByActive')
        	       	 .success(function(data) {
        	       		 $scope.patios = data._embedded.patio;
        	       	 }).error(function(data) {
        	       				console.log('Error: ' + data);
        	       	 });	
        	     };
               	 
        	     $scope.cancel = function() {
        	    	 $modalInstance.dismiss('cancel');
        	     };    	 
             }
		});
			
		modalInstance.result.then(function (value) {		
			$http({ 
				url: '/service/unidadinspeccion',
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
            	 
            	 $scope.getPatio = function() {
            		 $http.get($scope.current._links.patio.href)
            			.success(function(data) {	
            				$scope.current.patio = data;
            		 }).error(function(data) { 
            				console.log('Error: ' + data);
            		 });
            		 console.log($scope.current);
            	 }
            	 
            	 $scope.cancel = function() {
            		 $modalInstance.dismiss('cancel');
            	 };
             }
	 });
			
	 modalInstance.result.then(function (value) {
			$scope.item = { descInsp: value.descInsp, patio:value.patio._links.patio.href ,estaInsp: 1 };
			$http({ 
				url: value._links.unidadInspeccion.href,
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
	            		$http.get(row._links.patio.href)
	         			.success(function(data) {	
		         			row.patio = data._links.patio.href;
		         			$modalInstance.close(row);
		         		 }).error(function(data) { 
		         				console.log('Error: ' + data);
		         		 });
	            	 }
	            	 
	            	 $scope.cancel = function() {
	            		 $modalInstance.dismiss('cancel');
	            	 };
	             }
			});
				
			modalInstance.result.then(function (value) {
				$scope.item = { descInsp: value.descInsp, patio:value.patio ,estaInsp: 0 };
				$http({ 
					url: value._links.unidadInspeccion.href,
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


app.controller('estibaController', function($scope, $http, $modal) {
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
	
	$scope.save = function() {
		$scope.estiba = {};
		var modalInstance = $modal.open({
             template: document.getElementById("saveModal").childNodes[1].innerHTML,
             backdrop: 'static', keyboard: false, size:'sm',
             controller: function($scope, $http, $modalInstance){
            	 
            	 $scope.add = function(){
            		 $scope.estiba.estaEsti = 1;
            		 $scope.estiba.patio = $scope.estiba.patio._links.patio.href;
            		 $modalInstance.close($scope.estiba);
            	 };
            	 
            	 $scope.getPatios = function() {
            		$http.get('/service/patio/search/findByActive')
            		.success(function(data) {
            			$scope.patios = data._embedded.patio;
            		}).error(function(data) {
            				console.log('Error: ' + data);
            		});	
            	 };
            	 
            	 $scope.cancel = function() {
            		 $modalInstance.dismiss('cancel');
            	 };
             }
		});
			
		modalInstance.result.then(function (value) {		
			$http({ 
				url: '/service/estiba',
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
            	 
            	 $scope.getPatio = function() {
            		 $http.get($scope.current._links.patio.href)
            			.success(function(data) {	
            				$scope.current.patio = data;
            		 }).error(function(data) { 
            				console.log('Error: ' + data);
            		 });
            		 console.log($scope.current);
            	 }
            	 
            	 $scope.cancel = function() {
            		 $modalInstance.dismiss('cancel');
            	 };
             }
	 });
			
	 modalInstance.result.then(function (value) {
			$scope.item = { descEsti: value.descEsti, patio:value.patio._links.patio.href ,estaEsti: 1 };
			$http({ 
				url: value._links.estiba.href,
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
            		$http.get(row._links.patio.href)
         			.success(function(data) {	
	         			row.patio = data._links.patio.href;
	         			$modalInstance.close(row);
	         		 }).error(function(data) { 
	         				console.log('Error: ' + data);
	         		 });
            	 }
            	 
            	 $scope.cancel = function() {
            		 $modalInstance.dismiss('cancel');
            	 };
             }
		});
			
		modalInstance.result.then(function (value) {
			$scope.item = { descEsti: value.descEsti, patio:value.patio,estaEsti: 0 };
			$http({ 
				url: value._links.estiba.href,
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


