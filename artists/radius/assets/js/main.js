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
var loadData = function(userid, offset){
	$.ajax({
		url: 'https://hackesta.pythonanywhere.com/deviantart/user/?format=json&user_id=' + userid,
		type: 'GET',
		crossDomain: true,
		dataType: 'json',
		success: function(json) {
			$("#fullname").append(json.real_name);
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
				$div = $(".columns");
				$div.append('<div class="image fit"><img class="preview-image" src="'+this.image_url+'" alt="" /></div>');
	
			});
			if(json.has_more === true){
				// $loadmore = $("#loadmore");
				// $loadmore.attr('href', '?userid='+ userid+'&offset=' + json.next_offset)
				// $loadmore.css('display', 'block');
			}
			var previewer = new Previewer();
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
loadData($userid, $offset);
