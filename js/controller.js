$(document).ready(function() {
	getSearch();
});

function getSearch() {
	
	var results;
	var theQuery = "stevereynolds";

	$.post("getSearch.php", {query: theQuery},  function(xml){
	
		$('entry',xml).each(function(i){

			var title = $(this).find("title").text();
			results = title + "<BR>";

		});

		$("#container").html(results);
	
	});

}
