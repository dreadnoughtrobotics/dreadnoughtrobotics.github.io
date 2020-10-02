$(document).ready( function(){
	$("li.nav-item a").click(function(e){
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      			e.preventDefault();
      			var target = $(this.hash);
      			if (target.length) {

        			var scrollto = target.offset().top + 2;

        			if ($('#header').length) {
          			scrollto -= $('#header').outerHeight()

        			}

        			if ($(this).attr("href") == '#header') {
          				scrollto = 0;
        			}
				console.log(scrollto);

        			$('html, body').animate({
          				scrollTop: scrollto
        			}, 1500, 'easeInOutExpo');
      			}
		}
	});
});
