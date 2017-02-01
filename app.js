/**
 * 
 */

$(document).ready(function() { // called after DOM is done being built
		
	$("#submitButton").click(function() {
		
		var input = $("#userInput").val();
		
		$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + input + "/",
			success: function(data) {
				
				$("#pokeName").html(data.name);
			}
		});
		
	});
	
	
});
