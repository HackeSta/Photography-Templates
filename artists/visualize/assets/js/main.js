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

var loadData = function(userid, offset){
	$.ajax({
		url: 'https://hackesta.pythonanywhere.com/deviantart/user/?format=json&user_id=' + userid,
		type: 'GET',
		crossDomain: true,
		dataType: 'json',
		success: function(json) {
			$("#fullname").append(json.real_name);
			$("#userphoto").attr('src', json.profile_pic);
			loadPictures(userid, offset);
		}
	});
};
var loadPictures = function(userid,offset){
	$.ajax({
		url: 'https://hackesta.pythonanywhere.com/deviantart/deviations/?format=json&user_id=' + userid + '&offset=' + offset,
		type: 'GET',
		crossDomain: true,
		dataType: 'json',
		success: function(json) {
			$(json.deviations).each(function(index) {
				$div = $("#content1");
				if(index % 3 === 1) $div = $("#content2");
				if(index % 3 === 2) $div = $("#content3"); 
				$div.append('<a href="'+this.image_url+'"><img src="'+this.thumb_url+'" alt="" title="'+this.title+'" /><h3>'+this.title+'</h3></a>');
				
			});
			if(json.has_more === true){
				// $loadmore = $("#loadmore");
				// $loadmore.attr('href', '?userid='+ userid+'&offset=' + json.next_offset)
				// $loadmore.css('display', 'block');
			}
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

$userid = 'sumaidsingh';
$offset = '0';
if(typeof(getUrlParameter('userid')) !== 'undefined' && getUrlParameter('userid').length !== 0) {
	$userid = getUrlParameter('userid');
}
if(typeof(getUrlParameter('offset')) !== 'undefined' && getUrlParameter('offset').length !== 0) {
	$offset = getUrlParameter('offset');
}
jQuery(document).ready(function($) {
	$("body").addClass('loading');
});

loadData($userid, $offset);
