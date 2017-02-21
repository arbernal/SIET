	$(".exit").click(function() {
		// $('#saveModal').modal('toggle');
		$('#saveModal').modal('hide');
		$('#editModal').modal('hide');
		$('#formSave').trigger('reset');
		$('#formEdit').trigger('reset');
	});
	