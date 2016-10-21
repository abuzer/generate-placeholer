$(document).ready(function() {
	"use strict";
	/* --------------------------------------
			HOME SLIDER
	-------------------------------------- */
	$(".th-homeslider").owlCarousel({
		navigation : false,
		slideSpeed : 300,
		pagination : true,
		paginationSpeed : 400,
		singleItem:true
	});
	/* --------------------------------------
			TESTIMONIALS SLIDER
	-------------------------------------- */
	$("#th-testimonialsslider").owlCarousel({
		//autoPlay: 3000,
		items : 3,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [991,2],
		pagination : false,
		navigation : true,
		navigationText:["<span><i class='flaticon-arrows-2'></i></span>",
						"<span><i class='flaticon-arrows-1'></i></span>"],
	});
	/* -------------------------------------
			ACCORDION
	-------------------------------------- */
	$(function() {
		$('.th-panelcontent').hide();
		$('#th-accordion h4:first').addClass('active').next().slideDown('slow');
		$('#th-accordion h4').click(function() {
			if($(this).next().is(':hidden')) {
				$('#th-accordion h4').removeClass('active').next().slideUp('slow');
				$(this).toggleClass('active').next().slideDown('slow');
			}
		});
	});
	/* --------------------------------------
			BLOG SLIDER
	-------------------------------------- */
	$("#th-latestnewsslider").owlCarousel({
		navigation : true,
		slideSpeed : 300,
		pagination : false,
		paginationSpeed : 400,
		singleItem:true,
		navigationText:["<span><i class='flaticon-arrows-2'></i><em>prev article</em></span>",
						"<span><em>next article</em><i class='flaticon-arrows-1'></i></span>"],
	});
	/* --------------------------------------
			TEAM SLIDER
	-------------------------------------- */
	$("#th-teammembersslider").owlCarousel({
		//autoPlay: 3000,
		items : 4,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,3],
		pagination : false,
		navigation : true,
		navigationText:["<span><i class='flaticon-arrows-2'></i></span>",
						"<span><i class='flaticon-arrows-1'></i></span>"],
	});
	/* --------------------------------------
			PRICE RANGE SLIDER
	-------------------------------------- */
	$( function() {
		$( "#th-sliderrange" ).slider({
			range: true,
			min: 0,
			max: 500,
			values: [ 75, 300 ],
			slide: function( event, ui ) {
				$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			}
		});
		$( "#amount" ).val( "$" + $( "#th-sliderrange" ).slider( "values", 0 ) + " - $" + $( "#th-sliderrange" ).slider( "values", 1 ) );
	});
	/* --------------------------------------
			PRODUCT QUANTITY
	-------------------------------------- */
	$(".plus").click(function(){
		$(".qty").text(parseInt(($(".qty").text())) + 1);
	});
	$(".minus").click(function(){
		$(".qty").text(Math.max(0, parseInt(($(".qty").text())) - 1));
	});
	/* --------------------------------------
			RELATED PRODUCTS SLIDER
	-------------------------------------- */
	$("#th-relatedproductslider").owlCarousel({
		autoPlay: 3000,
		items : 3,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [991,1],
		itemsTablet : [768,2],
		itemsMobile : [479,1],
		pagination : false,
		navigation : true,
		navigationText:["<span><i class='flaticon-arrows-2'></i></span>",
						"<span><i class='flaticon-arrows-1'></i></span>"],
	});
	/* --------------------------------------
			GALLERY SLIDER
	-------------------------------------- */
	$("#th-galleryslider").owlCarousel({
		navigation : true,
		slideSpeed : 300,
		pagination : false,
		paginationSpeed : 400,
		singleItem:true,
		navigationText:["<span><i class='flaticon-arrows-2'></i></span>",
						"<span><i class='flaticon-arrows-1'></i></span>"],
	});
	/* --------------------------------------
			TESTIMONIALS SLIDER TWO
	-------------------------------------- */
	$("#th-testimonialsslidertwo").owlCarousel({
		navigation : true,
		slideSpeed : 300,
		pagination : false,
		paginationSpeed : 400,
		singleItem:true,
		navigationText:["<span><i class='flaticon-arrows-2'></i></span>",
						"<span><i class='flaticon-arrows-1'></i></span>"],
	});
	/* --------------------------------------
			SERVICES SMOOTH SCROLL
	-------------------------------------- */
	$(document).on('click', '.th-widgetservices ul li a[href^="#"]', function(e) {
		var id = $(this).attr('href');
		// target element
		var $id = $(id);
		if ($id.length === 0) {
			return;
		}
		e.preventDefault();
		var pos = $(id).offset().top;
		$('body, html').animate({scrollTop: pos});
	});
	/* --------------------------------------
			BRANDS SLIDER
	-------------------------------------- */
	$("#th-makesmodelsslider").owlCarousel({
		autoPlay: 3000,
		items : 4,
		itemsDesktop : [1199,4],
		itemsDesktopSmall : [979,3],
		pagination : true,
		/*navigation : true,
		navigationText:["<span><i class='flaticon-arrows-2'></i></span>",
						"<span><i class='flaticon-arrows-1'></i></span>"],*/
	});
	/* -------------------------------------
			ACCORDION
	-------------------------------------- */
	$(function() {
		$('.thg-panelcontent').hide();
		$('#th-themeaccordion h4:first').addClass('active').next().slideDown('slow');
		$('#th-themeaccordion h4').click(function() {
			if($(this).next().is(':hidden')) {
				$('#th-themeaccordion h4').removeClass('active').next().slideUp('slow');
				$(this).toggleClass('active').next().slideDown('slow');
			}
		});
	});
	/* -------------------------------------
			TOGGLES
	-------------------------------------- */
	function toggles(){
		var acc = document.getElementsByClassName("th-togglehead");
		var i;
		for (i = 0; i < acc.length; i++) {
			acc[i].onclick = function(){
				this.classList.toggle("active");
				this.nextElementSibling.classList.toggle("show");
			};
		}
	}
	toggles();
	/* -------------------------------------
			MEGA MENU
	-------------------------------------- */
	jQuery(function () {
		function hoverIn() {
			var a = jQuery(this);
			var nav = a.closest('.th-navigation');
			var mega = a.find('.mega-menu');
			var offset = rightSide(nav) - leftSide(a);
			mega.width(Math.min(rightSide(nav), columns(mega)*292));
			mega.css('left', Math.min(0, offset - mega.width()));
		}
		function hoverOut() {}
		function columns(mega) {
			var columns = 0;
			mega.children('.mega-menu-row').each(function () {
				columns = Math.max(columns, jQuery(this).children('.mega-menu-col').length);
			});
			return columns;
		}
		function leftSide(elem) {
			return elem.offset().left;
		}
		function rightSide(elem) {
			return elem.offset().left + elem.width();
		}
		jQuery('.th-nav .menu-item-has-mega-menu').hover(hoverIn, hoverOut);
	});
	/* -------------------------------------
			Google Map
	-------------------------------------- */
	$("#th-locationmap").gmap3({
		marker: {
			address: "123 Eccles Old Road, Salford Road, East London, Uk, M6 7AF",
			options: {
				title: "4 Wheel Auto Parts",
				icon: "images/locationicon.png",
			}
		},
		map: {
			options: {
				zoom: 16,
				scrollwheel: false,
				disableDoubleClickZoom: true,
			}
		}
	});
	/* -------------------------------------
			CALENDAR
	-------------------------------------- */
	$('#th-calendar').fullCalendar({
		dayClick: function() {
			alert('a day has been clicked!');
		}
	});

	function collapseMenu(){
		$('.th-navigation ul li.th-hasddropdown').prepend('<span class="th-dropdowarrow"><i class="fa fa-angle-down"></i></span>');
		$('.th-navigation ul li.th-hasddropdown span').on('click', function() {
			$(this).next().next().slideToggle(300);
		});
	}
	collapseMenu();
});
/*$(window).load(function(){
	$('#th-modalappointment').modal('show');
});*/