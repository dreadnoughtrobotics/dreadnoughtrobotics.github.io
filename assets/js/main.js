!(function ($) {
	("use strict");

	// Smooth scroll for the navigation menu and links with .scrollto classes
	$(document).on(
		"click",
		".nav-menu a, .mobile-nav a, .scrollto",
		function (e) {
			if (
				location.pathname.replace(/^\//, "") ==
					this.pathname.replace(/^\//, "") &&
				location.hostname == this.hostname
			) {
				e.preventDefault();
				var target = $(this.hash);
				if (target.length) {
					var scrollto = target.offset().top + 2;

					if ($("#header").length) {
						scrollto -= $("#header").outerHeight();
					}

					if ($(this).attr("href") == "#header") {
						scrollto = 0;
					}

					$("html, body").animate(
						{
							scrollTop: scrollto,
						},
						1500,
						"easeInOutExpo"
					);

					if ($(this).parents(".nav-menu, .mobile-nav").length) {
						$(".nav-menu .active, .mobile-nav .active").removeClass("active");
						$(this).closest("li").addClass("active");
					}

					if ($("body").hasClass("mobile-nav-active")) {
						$("body").removeClass("mobile-nav-active");
						$(".mobile-nav-toggle i").toggleClass(
							"icofont-navigation-menu icofont-close"
						);
						$(".mobile-nav-overly").fadeOut();
					}
					return false;
				}
			}
		}
	);

	// Mobile Navigation
	if ($(".nav-menu").length) {
		var $mobile_nav = $(".nav-menu").clone().prop({
			class: "mobile-nav d-lg-none",
		});
		$("body").append($mobile_nav);
		$(".mobile-nav .nav-logo").remove();
		$("body").prepend(
			'<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
		);
		$("body").append('<div class="mobile-nav-overly"></div>');

		$(document).on("click", ".mobile-nav-toggle", function (e) {
			$("body").toggleClass("mobile-nav-active");
			$(".mobile-nav-toggle i").toggleClass(
				"icofont-navigation-menu icofont-close"
			);
			$(".mobile-nav-overly").toggle();
		});

		$(document).on("click", ".mobile-nav .drop-down > a", function (e) {
			e.preventDefault();
			$(this).next().slideToggle(300);
			$(this).parent().toggleClass("active");
		});

		$(document).click(function (e) {
			var container = $(".mobile-nav, .mobile-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($("body").hasClass("mobile-nav-active")) {
					$("body").removeClass("mobile-nav-active");
					$(".mobile-nav-toggle i").toggleClass(
						"icofont-navigation-menu icofont-close"
					);
					$(".mobile-nav-overly").fadeOut();
				}
			}
		});
	} else if ($(".mobile-nav, .mobile-nav-toggle").length) {
		$(".mobile-nav, .mobile-nav-toggle").hide();
	}

	// Navigation active state on scroll
	var nav_sections = $("section");
	var main_nav = $(".nav-menu, #mobile-nav");

	$(window).on("scroll", function () {
		var cur_pos = $(this).scrollTop() + 110;

		nav_sections.each(function () {
			var top = $(this).offset().top,
				bottom = top + $(this).outerHeight();

			if (cur_pos >= top && cur_pos <= bottom) {
				if (cur_pos <= bottom) {
					main_nav.find("li").removeClass("active");
				}
				main_nav
					.find('a[href="#' + $(this).attr("id") + '"]')
					.parent("li")
					.addClass("active");
			}
		});
	});

	// Stick the header at top on scroll
	$("#header").sticky({
		topSpacing: 0,
		zIndex: "50",
	});

	// Back to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$(".back-to-top").fadeIn("slow");
		} else {
			$(".back-to-top").fadeOut("slow");
		}
	});

	$(".back-to-top").click(function () {
		$("html, body").animate(
			{
				scrollTop: 0,
			},
			1500,
			"easeInOutExpo"
		);
		return false;
	});

	// Darkmode toggle
	var toggleBtn = `<div id="darkmodeToggle">
		<input type="checkbox" class="darkmodeCheck" id="darkmodeT"/>
		<label class="darkLabel" for="darkmodeT">
			<i class="darkOpt OptLight">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="16" width="16" fill="#f5b942">
  <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
</svg>
			</i>
			<i class="darkOpt OptDark">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="16" width="16" fill="#28a7ad">
  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
</svg>
			</i>
			<div class="ball"></div>
		</label>
	</div>`;

	$("#header").append(toggleBtn);

	if ($(".nav-menu").length) {
		var setRight =
			parseInt($(".mobile-nav-toggle").width()) +
			parseInt($(".mobile-nav-toggle").css("right")) +
			20;
		$("#darkmodeToggle").css("right", setRight);
	}

	function updateDarkModePref() {
		$.getScript("./assets/vendor/darkreader/darkreader.js", function () {
			DarkReader.setFetchMethod(window.fetch);
			$(".darkmodeCheck").change(function () {
				if ($(this).is(":checked")) {
					DarkReader.enable(
						{
							brightness: 100,
							contrast: 90,
							sepia: 10,
						},
						{
							css: `.darkLabel {
									  background-color: #fff;
									}

									.darkLabel .ball {
									  background-color: #000;
									}`,
						}
					);
					Cookies.set("darkmode", "true");
				} else {
					DarkReader.disable();
					Cookies.set("darkmode", "false");
				}
			});
		});
	}

	function loadDarkModePref() {
		$.getScript("./assets/vendor/darkreader/darkreader.js", function () {
			DarkReader.setFetchMethod(window.fetch);
			$.getScript("./assets/vendor/jsCookie/dist/js.cookie.js", function () {
				if (Cookies.get("darkmode") === "true") {
					DarkReader.enable(
						{
							brightness: 100,
							contrast: 90,
							sepia: 10,
						},
						{
							css: `.darkLabel {
									  background-color: #000;
									}

									.darkLabel .ball {
									  background-color: #fff;
									}`,
						}
					);
					$(".darkmodeCheck").prop("checked", true);
				} else {
					DarkReader.disable();
					$(".darkmodeCheck").prop("checked", false);
				}
			});
		});
	}

	$(window).on("load", loadDarkModePref);
	updateDarkModePref();

	// Porfolio isotope and filter
	$(window).on("load", function () {
		var portfolioIsotope = $(".portfolio-container").isotope({
			itemSelector: ".portfolio-item",
			layoutMode: "fitRows",
		});

		$("#portfolio-flters li").on("click", function () {
			$("#portfolio-flters li").removeClass("filter-active");
			$(this).addClass("filter-active");

			portfolioIsotope.isotope({
				filter: $(this).data("filter"),
			});
		});

		// Initiate venobox (lightbox feature used in portofilo)
		$(document).ready(function () {
			$(".venobox").venobox();
		});
	});

	// Testimonials carousel (uses the Owl Carousel library)
	$(".testimonials-carousel").owlCarousel({
		autoplay: true,
		dots: true,
		loop: true,
		items: 1,
	});

	// Portfolio details carousel
	$(".portfolio-details-carousel").owlCarousel({
		autoplay: true,
		dots: true,
		loop: true,
		items: 1,
	});

	// Initi AOS
	AOS.init({
		duration: 600,
	});

	//extra
	// Porfolio isotope and filter
	$(window).on("load", function () {
		var galleryIsotope = $(".gallery-container").isotope({
			itemSelector: ".gallery-item",
		});

		$("#gallery-flters li").on("click", function () {
			$("#gallery-flters li").removeClass("filter-active");
			$(this).addClass("filter-active");

			galleryIsotope.isotope({
				filter: $(this).data("filter"),
			});
		});

		// Initiate venobox lightbox
		$(document).ready(function () {
			$(".venobox").venobox({
				share: false,
			});
		});
	});
})(jQuery);

//Javascript for Chart

var options = {
	series: [21, 6, 16, 13],
	chart: {
		width: 380,
		type: "donut",
	},
	plotOptions: {
		pie: {
			donut: {
				labels: {
					show: true,
					total: {
						showAlways: true,
						show: true,
						fontSize: "26px",
						fontWeight: 600,
					},
					value: {
						fontSize: "22px",
					},
				},
			},
		},
	},
	dataLabels: {
		enabled: false,
	},
	responsive: [
		{
			breakpoint: 450,
			options: {
				chart: {
					width: 300,
				},
				legend: {
					show: false,
				},
			},
		},
	],
	colors: ["#f82249", "#222222", "#0e1b4d", "#768390"],
	labels: [
		"Electrical and Electronics",
		"Management",
		"Programming and Analysis",
		"Chassis and Design",
	],
	legend: {
		show: false,
	},
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
