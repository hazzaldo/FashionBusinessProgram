	var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
	var winScr;
	var winScr2;
	var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

	$(window).scroll(function(){
		winScr = $(window).scrollTop();
		parallaxFunction();
		parallaxAll();
		scrollBars();
	});

	$(document).ready(function(){
		winScr = $(window).scrollTop();
		//winScr2 = $(window).scrollTop()-$(".parallax-all").offset().top;
		parallaxFunction();

		$('.parallax-all').each(function(){
			$(this).find(".parallax-title").css({"margin-top":-$(this).find(".parallax-title").height()/2, "margin-left":-$(this).find(".parallax-title").width()/2})
		});
		$('.parallax-response').each(function(){
			$(this).find(".parallax-title").css({"margin-top":-$(this).find(".parallax-title").height()/2, "margin-left":-$(this).find(".parallax-title").width()/2})
		});
		parallaxAll();
		scrollMenu();

		$("#cssmenu").menumaker({
	   		format: "multitoggle"
		});
	});

	$(window).load(function(){
		winScr = $(window).scrollTop();
		//winScr2 = $(window).scrollTop()-$(".parallax-all").offset().top;
		parallaxFunction();
		centeredTitles();
		loadBars();

		//Menu vertical align
		//$('#cssmenu > ul').css("margin-top", ($('#cssmenu > .logo').height() / 2)-14);
	});

	$(window).on('resize orientationchange', function(){
		winScr = $(window).scrollTop();
		//winScr2 = $(window).scrollTop()-$(".parallax-all").offset().top;
		parallaxFunction();
		parallaxAll();
		resizeFix();
	});



/******************************************************************************************************/
/* ------------------------------------ SCROLL-TO FUNCTIONS ----------------------------------------- */
/******************************************************************************************************/
	$("a.scroll-to").on("click",function(e){
		e.preventDefault();
		var time = $("body").outerHeight()/2;
		TweenLite.to(window, 1.25, {scrollTo:{y: 0, x:0}, ease:Quint.easeInOut});
	});

	$("a.scroll-to1").on("click",function(e){
		e.preventDefault();
		var footOff = $("#features").offset().top;
		var time = $("body").outerHeight()/2;
		var menuH = $("header").height();
		TweenLite.to(window, 1.25, {scrollTo:{y: footOff-menuH, x:0}, ease:Quint.easeInOut});
	});


/******************************************************************************************************/
/* -------------------------------------- PARALLAX FUNCTION ----------------------------------------- */
/******************************************************************************************************/
	function parallaxFunction(){
		var h = $(window).height();
		//if(winScr < $("#home").outerHeight()){
			$(".parallax-bg").css({top : (winScr/0.9)+0});
			$(".parallax-overlay").css({top : (h/2.5)+(winScr/2.5)});
			$(".parallax-bg-overlay").css({top: -(h/4.5)+(winScr/1.2)});
			$(".homeoverlay").css({top : (h/2)-50});
		//}				
	};

/******************************************************************************************************/
/* -------------------------------------- PARALLAX FUNCTION ----------------------------------------- */
/******************************************************************************************************/
	function parallaxAll(){
		$('.parallax-all').each(function(){
		var h = $(window).height();
		var topOff = $(this).offset().top;
		//if(winScr < $("#home").outerHeight()){
			if($(this).isOnScreen(0.01,0.01))
			{
				winScr2 = $(window).scrollTop()-$(this).offset().top;
				$(this).find(".par1").css({top : (winScr2/1)+0});
				$(this).find(".par2").css({top : 0+(winScr2/2.5)});
				$(this).find(".par3").css({top: 0+(winScr2/1.2)});
				$(this).find(".homeoverlay1").css({top : (h/2)-50});
			}
		});
		$('.parallax-response').each(function(){
			if($(this).isOnScreen(0.01,0.01))
			{
				winScr2 = $(window).scrollTop()-$(this).offset().top;
				$(this).find(".parallax-bg1").css({top : (winScr2/1)+0});
			}
		});
		//}				
	};

/******************************************************************************************************/
/* --------------------------------------- CSS MENU STYLE ------------------------------------------- */
/******************************************************************************************************/
	(function($) {
		$.fn.menumaker = function(options) {  
	 		var cssmenu = $(this), settings = $.extend({
	   			format: "dropdown",
	   			sticky: false
	 		}, options);
		 	return this.each(function() {
		   		$(this).find(".btn-menu").on('click', function(){
		     		$(this).toggleClass('menu-opened');
		     		var mainmenu = $(this).next('ul');
		     		if (mainmenu.hasClass('open')) { 
		       			mainmenu.slideToggle().removeClass('open');
		     		}
		     		else {
		       			mainmenu.slideToggle().addClass('open');
		       			if (settings.format === "dropdown") {
		         			mainmenu.find('ul').show();
		       			}
		     		}
		   		});
				cssmenu.find('li ul').parent().addClass('has-sub');
				multiTg = function() {
		     		cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
		     		cssmenu.find('.has-sub').on('click', function() {
		       			$(this).find('.submenu-button').toggleClass('submenu-opened');
		       			if ($(this).find('.submenu-button').siblings('ul').hasClass('open')) {
		          			$(this).find('.submenu-button').siblings('ul').removeClass('open').slideToggle();
		       			}
		       			else {
		          			$(this).find('.submenu-button').siblings('ul').addClass('open').slideToggle();
		       			}
		     		});
		   		};

		   		if (settings.format === 'multitoggle') multiTg();
		   		else cssmenu.addClass('dropdown');
		   		if (settings.sticky === true) cssmenu.css('position', 'fixed');

				resizeFix = function() {
		  			var mediasize = 991;
		     		if ($( window ).width() > mediasize) {
		       			cssmenu.find('ul').show();
		     		}
		     		if ($(window).width() <= mediasize) {
		       			cssmenu.find('ul').hide().removeClass('open');
		     		}
		   		};

		   		resizeFix();
		 	});
		};
	})(jQuery);

/******************************************************************************************************/
/* ----------------------------------- SCROLL MENU NAVIGATION --------------------------------------- */
/******************************************************************************************************/
	function scrollMenu() {
		setTimeout(function() {
			if (location.hash) {
				window.scrollTo(0, 0);
				var menuH = $("header").height();
				if(menuH == 137) {
					menuH = 76;
				}				
				console.log(menuH);
				var offset = $(location.hash).offset().top-menuH+1;
				var top = $(document).scrollTop();
				var offseted = Math.abs(top-offset)/100;
				var speed = ((1/offseted*100)*(1.25*offseted))/100;
				TweenLite.to(window, speed, {scrollTo:{y: offset, x:0}, ease:Quint.easeInOut});
			}
		}, 1);

		$(document).on('click', '#cssmenu ul li>a[href*=#]:not([href=#])', function() {
				var target = $(this).attr('href');
				var current = $(target);
				var menuH = $("header").height();
				//console.log(menuH);
				if(menuH == 137) {
					menuH = 210;
				}
				console.log(menuH);
				var offset = ( target == '#content' || target == '#' ? 0 : current.offset().top - menuH + 1);
				var top = $(document).scrollTop();

				var offseted = Math.abs(top-offset)/100;
				var speed = ((1/offseted*100)*(1.25*offseted))/100;

				TweenLite.to(window, speed, {scrollTo:{y: offset, x:0}, ease:Quint.easeInOut});
				return false;
		});
	};


/*********************************************************************************************************/
/* --------------------------------- CUSTOM FADE BOOTSTRAP TABS ---------------------------------------- */
/*********************************************************************************************************/	
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  e.target// activated tab
  e.relatedTarget // previous tab
  $(".tab-content > .tab-pane").removeClass("myFade");
  $(".tab-content>.active").addClass("myFade");
})

$('a[data-toggle="tab"]').on('hidden.bs.tab', function (e) {
  e.target// activated tab
  e.relatedTarget // previous tab
  $(".tab-content").removeClass("myFade");
})

/*********************************************************************************************************/
/* -------------------------------- SCROLL FOR TEAM MEMBER ADDING -------------------------------------- */
/*********************************************************************************************************/	

$('.hex-plus').on('click', function(e){
    e.preventDefault();
    var hexJump = $('#contact1').offset().top;
    TweenLite.to(window, 1.25, {scrollTo:{y: hexJump, x:0}, ease:Quint.easeInOut});
});


/*********************************************************************************************************/
/* -------------------------------------- MENU FIX FOR IE6-11 ------------------------------------------ */
/*********************************************************************************************************/
if(checkIE())
{
if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

var time = 360;
var distance = 220;

function wheel(event) {
    if (event.wheelDelta) delta = event.wheelDelta / 120;
    else if (event.detail) delta = -event.detail / 3;

    handle();
    if (event.preventDefault) event.preventDefault();
    event.returnValue = false;
}

function handle() {
    $('html, body').stop().animate({
        scrollTop: $(window).scrollTop() - (distance * delta)
    }, time);
}
$(document).keydown(function (e) {
    switch (e.which) {
        //up
        case 38:
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $(window).scrollTop() - distance
            }, time);
            break;

            //down
        case 40:
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $(window).scrollTop() + distance
            }, time);
            break;
    }
});
}