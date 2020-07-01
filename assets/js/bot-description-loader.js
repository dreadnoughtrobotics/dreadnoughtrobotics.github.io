// dynamic creation of bot page
$(document).ready(function(){
	var url = new URL(document.URL);
	var num = url.searchParams.get('bot_id');
	$("#image-place").html("<img src='assets/img/projects/"+num+".jpg' alt='project "+num+"' class='img-fluid'>");
	$("#bot-description").load("assets/descriptions/"+num+".html",function(){
	});
});
