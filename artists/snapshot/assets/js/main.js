/*
	Snapshot by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/
var main = function() {
	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	var init = function() {
		$("a").each(function(index){
			if($(this).attr('href') === 'gallery.html'){
				if(typeof(getUrlParameter('userid')) !== 'undefined' && getUrlParameter('userid').length !== 0) {
					$userid = getUrlParameter('userid');
					$(this).attr('href', $(this).attr('href') + '?userid=' + $userid);
	
				}	
			}
		});
		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			// $body.addClass('is-loading');
			// 
			// $window.on('load', function() {
			// 	
			// 	window.setTimeout(function() {
			// 		$body.removeClass('is-loading');
			// 	}, 100);
			// });

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly').scrolly();

		// Gallery.
			$('.gallery').each(function() {

				var	$gallery = $(this),
					$content = $gallery.find('.content');

				// Poptrox.
					$content.poptrox({
						usePopupCaption: true
					});

				// Tabs.
					$gallery.each( function() {

						var $this = $(this),
							$tabs = $this.find('.tabs a'),
							$media = $this.find('.media');

						$tabs.on('click', function(e) {

							var $this = $(this),
								tag = $this.data('tag');

							// Prevent default.
							 	e.preventDefault();

							// Remove active class from all tabs.
								$tabs.removeClass('active');

							// Reapply active class to current tab.
								$this.addClass('active');

							// Hide media that do not have the same class as the clicked tab.
								$media
									.fadeOut('fast')
									.each(function() {

										var $this = $(this);

										if ($this.hasClass(tag))
											$this
												.fadeOut('fast')
												.delay(200)
												.queue(function(next) {
													$this.fadeIn();
													next();
												});

									});

						});

					});


			});

	};
		init();
}; 
var loadData = function(userid, offset){
	$.ajax({
		url: 'http://hackesta.pythonanywhere.com/deviantart/user/?format=json&user_id=' + userid,
		type: 'GET',
		crossDomain: true,
		dataType: 'json',
		success: function(json) {
			if(!$gallery)
			{
				$("#userphoto").attr('src', json.profile_pic);
			}
			$("#fullname").append(json.real_name);
			loadPictures(userid, offset);
		}
	});
};
var loadPictures = function(userid,offset){
	$.ajax({
		url: 'http://hackesta.pythonanywhere.com/deviantart/deviations/?format=json&user_id=' + userid + '&offset=' + offset,
		type: 'GET',
		crossDomain: true,
		dataType: 'json',
		success: function(json) {
			$count = 8;
			if($gallery){
				$count = json.deviations.length;
			}
			for (var i = 0; i < $count;) {
				$this = json.deviations[i];
				$(".content").append('<div class="media"><a href="'+$this.image_url+'"><img src="'+$this.thumb_url+'" alt="" title="'+$this.title+'" /></a></div>');				
				i=i+1;
   }
				
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


var getPageName = function getPageName() {
    var index = window.location.href.lastIndexOf("/") + 1,
        filenameWithExtension = window.location.href.substr(index),
        filename = filenameWithExtension.split(".")[0];  

    return filename;                                     
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
$gallery = getPageName() === 'gallery';

loadData($userid, $offset);
