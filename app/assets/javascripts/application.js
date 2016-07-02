// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$('document').ready( function () {
		
	$(function(){
	      $(".player").YTPlayer().YTPApplyFilters({
			  blur: 0,
		  });
	});
	
	$('#signin-errors').hide();
	
    $('#sign_up').on('hidden.bs.modal', function () {
    	$('#signin-errors').hide().html('');
		$('.nav-tabs a:first').tab('show');
	});
	
	$('#signin-form').submit(function (e) {
		var url = 'users/sign_in';
		var data = $(this).serializeArray();
		e.preventDefault();
		$.ajax({
			type: 'POST',
		    url: url,
		    data: data,
		    dataType: 'json',
		    beforeSend: function() {
				$('this').find('.form-error').remove()
			},
		    success: function(user) {
				location.reload();
			},
		    error: function(xhr) {
				$('#signin-errors').html($.parseJSON(xhr.responseText).error).show();
			}	
	});
	});
	
	$('#signup-form').submit(function (e) {
		var url = 'users';
		var data = $(this).serializeArray();
		e.preventDefault();
		$.ajax({
			type: 'POST',
		    url: url,
		    data: data,
		    dataType: 'json',
		    beforeSend: function() {
				$('this').find('.form-error').remove()
			},
		    success: function(user) {
				location.reload();
			},
		    error: function(xhr) {
				var res = $.parseJSON(xhr.responseText);
				console.log(res);
				if(res.hasOwnProperty('errors')) {
					$('#signin-errors').html('');
					$.each(res.errors, function(index, data) {
						var line;
						var errors = $('#signin-errors').html();
						if(!errors.trim()) {
							line = index + ' ' + data;
						} else {
							line = '<br />' + index + ' ' + data;
						}
						$('#signin-errors').html($('#signin-errors').html() + line )
					});
					console.log('Has Errors');
				} else if (res.hasOwnProperty('error')) {
					$('#signin-errors').html(res.error);
				}
				$('#signin-errors').show()
			}	
	});
	});


});
  
