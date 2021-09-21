
$(document).ready(function(){
$(window).on('scroll',function () {
    var top=$(window).scrollTop()/2;
 
  $('.timeline-icon').css({'transform':'translate(-50%,-50%) rotate('+top+'deg)'});
})
})