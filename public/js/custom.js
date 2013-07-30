/* -------------------- Main Navigation --------------------- */

var menu = $('#second-menu');
var menuHeight = menu.height();

$(window).scroll(function(){
	
	var viewportHeight = $(window).height();
	
    var marginTop = $(this).scrollTop();

	if (marginTop >= (viewportHeight - menuHeight)) {
				
		var newHeight = (marginTop - viewportHeight) * -1;	
		
		menu.css('height',newHeight);
		
	} else {
		
		menu.css('height',menuHeight);
		
	}
	
	$('section').each(function(){
		
		var current = $(this);
		var position = current.position().top - $(window).scrollTop();
		
		if (position <= 0) {
			
			var ID = '#' + $(this).attr('id');
			
			$('.scroll').each(function(){
				
				if ($(this).attr('href') == ID) {

					$(this).parent().addClass('active');

				} else {
					$(this).parent().removeClass('active');

				}
				
			});
		
		} else {
			
			//do nothing
		
		}
		
	});
	
	$('body').find('section').each(function(){
		
		var ID = $(this).attr('id');
		var IDPosition = $(this).offset().top;
		
		if ( marginTop > IDPosition) {
			
			$('a').each(function(){
				
				var link = $(this).attr("href");
				
				if ( link == ID) {
					
					alert('aaaa');
					
				}
				
			});
			
		}
		
	});
	
});

/* -------------------- Retina Displays Support --------------------- */
function isRetina() {
	var query = '(-webkit-min-device-pixel-ratio: 1.5),\
				(min--moz-device-pixel-ratio: 1.5),\
				(-o-min-device-pixel-ratio: 3/2),\
				(min-device-pixel-ratio: 1.5),\
				(min-resolution: 144dpi),\
				(min-resolution: 1.5dppx)';

	if (window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(query).matches)) {
		return true;
	}

	return false;
}

// Check if High Res image exist
function checkIndex(file){
		
      $.ajax({
          url: file,
          type:'HEAD',
          async: false,
          error: function(){
                return false;		
          },
          success: function(){
                return true;
          }
      });
}

// Replace images with @2x
jQuery(document).ready(function($) {
	if (window.isRetina()) {
		var images = document.getElementsByClassName('img-retina');
		for (var i = 0, j = images.length; i < j; i++) {
			var image = images[i],
				src = image.src,
				width = image.width,
				height = image.height,
				lastSlash = src.lastIndexOf('/'),
				path = src.substring(0, lastSlash),
				file = src.substring(lastSlash + 1),
				retinaSrc = 'img/@2x/' + file;
				
				$.ajax({
			          url: retinaSrc,
			          type:'HEAD',
			          async: false,
			          error: function(){
			                //no retina images
			          },
			          success: function(){
			                image.src = retinaSrc;
							image.width = width;
							image.height = height;
			          }
			      });
				
		}
	}
});

/* -------------------- SuperSlides --------------------- */
$(document).ready(function($) {

	$(document).on('init.slides', '#slides', function() {
	    $('#slides').superslides('next')
	});

	$('#slides').superslides({
		play: 5000,
	    slide_easing: 'easeInOutCubic',
	    slide_speed: 800,
	    pagination: true,
	    hashchange: false,
	    scrollable: true
	});
	
	$(".slides-container").swipe( {
        allowPageScroll:"vertical",
        swipe:function(event, direction, distance, duration, fingerCount) {
          //$(this).text("You swiped " + direction );  

			if (direction == 'left') {

				$('.next').trigger('click');

			} else if (direction == 'right'){

				$('.prev').trigger('click');

			} else {

				//do nothing

			}

        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0,
		
	});

});

/* -------------------- Fixed Menu --------------------- */
$(window).scroll(function($){
	fixedMenu();			
});

function fixedMenu() {
	
	var fromTop = $(window).scrollTop();
	var browserHeight = $(window).height();
	var bodyHeight = $('body').height();
	var fromBottom = bodyHeight - ($('footer').height() + $('#copyright').height());
	
	
	if (fromTop > 80 && fromTop + browserHeight < fromBottom) {
		
		$('#fixed-menu').css('bottom','0px');
		
	} else {
		
		$('#fixed-menu').css('bottom','-40px');
		
	} 
	
}

/* -------------------- Contact Form Background Map --------------------- */
jQuery(document).ready(function($) {
	
	if($('#map').html()) {
		
		var target = $('#map').html();

		$('#map').gMap({
			controls: {
				panControl: false,
				zoomControl: false,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				overviewMapControl: false
			},
			maptype: 'ROADMAP',
			scrollwheel: false,
			zoom: 13,
			markers: [
				{
					address: target, // Your Adress Here
					html: '',
					popup: false,
				}

			],

		});
	}

});

/* -------------------- Placeholder for IE --------------------- */
jQuery(document).ready(function($) {

	// Invoke the plugin
    $('input, textarea').placeholder();
    // That’s it, really.
    // Now display a message if the browser supports placeholder natively
    var html;
    
});

/* ------------------ Scroll To Section ------------------- */
jQuery(document).ready(function($){

	$('.scroll-nav > li > a').click(function(){
		
		var target = $(this).attr('href');
		
		if($(this).hasClass('back-to-top')) {
			
			//back to top if using scroll menu
			$('html, body').animate({scrollTop:0}, 300); 
			return false;
			
		} else if ($(this).hasClass('scroll')) {
			
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 300);
			return false;
			
		} else {
			
			//do nothing
			
		}
							
	});
	
});
	
/* ------------------ Back To Top ------------------- */
jQuery(document).ready(function($){

	jQuery('.back-to-top').click(function(){
		jQuery('html, body').animate({scrollTop:0}, 300); 
		return false; 
	});

});	

/* ----------------- Contact Form ------------------- */		
jQuery(document).ready(function($){
		
	var animateSpeed=100;
	var emailReg = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;

	// Validating

	function validateName(name) {
	
		if (name.val().length < 2) {name.addClass('validation-error',animateSpeed); return false;}
		else {name.removeClass('validation-error',animateSpeed); return true;}
	
	}

	function validateEmail(email,regex) {
				
		if (!regex.test(email.val())) {email.addClass('validation-error',animateSpeed); return false;}
		else {email.removeClass('validation-error',animateSpeed); return true;}
	
	}

	function validateMessage(message) {
		
		if (message.val()=='') {message.addClass('validation-error',animateSpeed); return false;}
		else {message.removeClass('validation-error',animateSpeed); return true;}
	
	}

	$('input[name=name]').blur(function(){validateName($(this));});
	$('input[name=email]').blur(function(){validateEmail($(this),emailReg); });
	$('textarea[name=message]').blur(function(){validateMessage($(this)); });

});

jQuery(document).ready(function($){

	$('.send').click(function(){

		$.post("contactForm.php", { 

			new_message: 1,
			name: $('input[name=name]').val(),
			message_email: $('input[name=email]').val(),
			www: $('input[name=www]').val(),
			message: $('textarea[name=message]').val()

		}, function(data) {

			if(data==1) {

				alert('Message was sent');

			} else {

				alert('Ooops something goes wrong, try one more time!');

			}

		});
		
		return false;

	});

});


/* -------------------- Width Functions --------------------- */
jQuery(document).ready(function($){
	
	widthFunctions();

});

$(window).bind("resize", widthFunctions);

function widthFunctions(e) {
	
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    
	if (winWidth < 980 && winWidth > 767) {
		
		if($(".contact-info").hasClass("span8 offset2")) {
			
			$(".contact-info").removeClass("span8 offset2");
			$(".contact-info").addClass("span10 offset1");

		}
						
	} else {
		
		if($(".contact-info").hasClass("span10 offset1")) {
			
			$(".contact-info").removeClass("span10 offset1");
			$(".contact-info").addClass("span8 offset2");

		}
			
	}
	
}