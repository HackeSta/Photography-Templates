/*
	Visualize by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

var main = function() {
	console.log('main');
	// Vars.
		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper');

	// Breakpoints.
		skel.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Disable animations/transitions until everything's loaded.
		//$body.addClass('is-loading');

		// $window.on('load', function() {
		// 	$body.removeClass('is-loading');
		// });

	// Poptrox.

				console.log('onwindowload');
			$('.thumbnails').poptrox({
				onPopupClose: function() { $body.removeClass('is-covered'); },
				onPopupOpen: function() { $body.addClass('is-covered'); },
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: true,
				overlayColor: '#000000',
				overlayOpacity: 0.75,
				popupLoaderText: '',
				fadeSpeed: 500,
				usePopupDefaultStyling: false,
				windowMargin: (skel.breakpoint('small').active ? 5 : 50)
			});


};
var loadData = function(){
	$.ajax({
		url: '/data/fpx_user.json',
		type: 'GET',
		crossDomain: true,
		dataType: 'json',
		success: function(json) {
				$user = json.user;
				$("#fullname").append($user);
				//$("#affection").append($user.affection);
				//$("#picture_count").append($user.photos_count);
				loadPhotos();
			}
	});
};
var loadPhotos = function(){
	$.ajax({
		url: '/data/fpx_photographs.json',
		type: 'GET',
		crossDomain: true,
		dataType: 'json',
		success: function(json) {
			$(json).each(function(index) {
				$div = $("#content1");
				if(index % 3 === 1) $div = $("#content2");
				if(index % 3 === 2) $div = $("#content3");
				$div.append('<a href="'+this.url+'"><img src="'+this.thumbnail+'" alt="" title="'+this.titlt+'" /><h3>'+this.title+'</h3></a>');
			});
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



loadData();
