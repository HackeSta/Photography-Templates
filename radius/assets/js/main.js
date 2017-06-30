/*
	Radius by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

var main = function() {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$footer = $('#footer');

		// Disable animations/transitions until the page has loaded.

			

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Header.
			$header.each( function() {

				var t 		= jQuery(this),
					button 	= t.find('.button');

				button.click(function(e) {

					t.toggleClass('hide');

					if ( t.hasClass('preview') ) {
						return true;
					} else {
						e.preventDefault();
					}

				});

			});

		// Footer.
			$footer.each( function() {

				var t 		= jQuery(this),
					inner 	= t.find('.inner'),
					button 	= t.find('.info');

				button.click(function(e) {
					t.toggleClass('show');
					e.preventDefault();
				});

			});

	});

};
var loadData = function(query){

	$.ajax({
		url: 'http://hackesta.pythonanywhere.com/photographs/user?format=json&' + query,
		type: 'GET',
		crossDomain: true,
		dataType: 'json',
		success: function(json) {
				$user = json.user;
				$("#fullname").append($user.fullname);
				$("#userphoto").attr('src', $user.userpic_url);
				//$("#affection").append($user.affection);
				//$("#picture_count").append($user.photos_count);
				loadPhotos(query);
			}
	});
};
var loadPhotos = function(query){
	$.ajax({
		url: 'http://hackesta.pythonanywhere.com/photographs/?format=json&' + query,
		type: 'GET',
		crossDomain: true,
		dataType: 'json',
		success: function(json) {
			$(json.photos).each(function(index) {
				console.log(this);
				$div = $(".columns");
				$div.append('<div class="image fit"><a href="https://500px.com'+this.url+'"><img src="'+this.images[1].url+'" alt="" /></a></div>');
					
			});
			// $("body").removeClass('loading');
			main();

		}
	});
};
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$userid = '8734325';
$query = 'user_id=' + $userid;
if(typeof(getUrlParameter('userid')) !== 'undefined' && getUrlParameter('userid').length !== 0) {
	$userid = getUrlParameter('userid');
	$query = 'user_id=' + $userid;
	
}
else if(typeof(getUrlParameter('username')) !== 'undefined' && getUrlParameter('username').length !== 0) {
	$username = getUrlParameter('username');
	$query = 'username=' + $username;
}
jQuery(document).ready(function($) {
	//$("body").addClass('loading');
});

loadData($query);
