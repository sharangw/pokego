/**
 * 
 */

$(document).ready(function() { // called after DOM is done being built
	
	var name1 = "", name2 = "";
	var exp1 = 0, exp2 = 0;
	var p1 = 0, p2 = 0;
		
	$("#submitButton1").click(function() {
		
		p1 = $("#input1").val();
		
		$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + p1 + "/",
			success: function(data) {				
				name1 = data.name;
				$("#poke1").html(name1);
			}
		});	
		
		$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + p1 + "/",
			success: function(data) {
				
				var abilArray = data.abilities;
				var ab1 = [];
		    	var j = 0;
				
				for (var i=0; i < abilArray.length; i++) {
					ab1[j] = abilArray[i].ability.name;
					var eachrow = "<tr>"
		                 + "<td>" + i + "</td>"
		                 + "<td>" + ab1[j] + "</td>"
		                 + "</tr>";
					$('#tbody1').append(eachrow);
					j++;
				}
			}
		});
		
	}); // end button1 click
	
    $("#submitButton2").click(function() {
		
		p2 = $("#input2").val();		
		
		$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + p2 + "/",
			success: function(data) {	
				name2 = data.name;
				$("#poke2").html(name2);
			}
		});	
		
		$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + p2 + "/",
			success: function(data) {
				
				var abilArray = data.abilities;
				var ab2 = [];
		    	var j = 0;
				
				for (var i=0; i < abilArray.length; i++) {
					ab2[j] = abilArray[i].ability.name;
					var eachrow = "<tr>"
		                 + "<td>" + i + "</td>"
		                 + "<td>" + ab2[j] + "</td>"
		                 + "</tr>";
					$('#tbody2').append(eachrow);
					j++;
				}
			}
		});
		
    }); // end button2 click
    
    $("#abilButton1").click(function() {     	
    	
    	var ab1 = "";
    	var randomAb1 = $("#randomAb1").val();
    	
    	$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + p1 + "/",
			success: function(data) {				
				ab1 = data.abilities[randomAb1].ability.name;
				$("#poke11").html(name1);
				$("#ab1").html(ab1);
			}
		});    	
    	
    }); // end abilButton1 
    
    $("#abilButton2").click(function() {   	
    	
    	var ab2 = "";
    	var randomAb2 = $("#randomAb2").val();
    	
    	$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + p2 + "/",
			success: function(data) {				
				ab2 = data.abilities[randomAb2].ability.name;
				$("#poke22").html(name2);
				$("#ab2").html(ab2);
			}
		});
    	
    	
     }); // end abilButton1
		
    $("#battleButton").click(function() {
    	var moves1 =[];
    	var moves2 =[];
    	
    	$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + p1 + "/",
			success: function(data) {				
				m1 = data.moves;	
				
				var myMoves = [];
				var j = 0;
				for (var i=0; i<4; i++) {
					myMoves[j] = m1[i].move.name;
					j++;
				}					
				$("#m0").html(myMoves[0]);
				$("#m1").html(myMoves[1]);
				$("#m2").html(myMoves[2]);
				$("#m3").html(myMoves[3]);
			}
			
		});
    	
    	$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + p2 + "/",
			success: function(data) {				
				m2 = data.moves;	
				
				var myMoves = [];
				var j = 0;
				for (var i=0; i<4; i++) {
					myMoves[j] = m2[i].move.name;
					j++;
				}					
				$("#m4").html(myMoves[0]);
				$("#m5").html(myMoves[1]);
				$("#m6").html(myMoves[2]);
				$("#m7").html(myMoves[3]);
			}
			
		});
    	
    	$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + p1 + "/",
			success: function(data) {				
				var id1 = data.id;
				
				var img = new Image();
				var div = document.getElementById('poke1pic');
				
				img.onload = function() {
					  div.appendChild(img);
					};
				
				img.src = 'model/'+id1+'.png';	
			}
		});
    	
    	$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + p2 + "/",
			success: function(data) {				
				var id2 = data.id;
				
				var img = new Image();
				var div = document.getElementById('poke2pic');
				
				img.onload = function() {
					  div.appendChild(img);
					};
				
				img.src = 'model/'+id2+'.png';	
			}
		});
    	    
    	    				
		if(exp1 > exp2) {
			
			$("#pokeWinner").html(name1);
			
		} else {
		
			$("#pokeWinner").html(name2);
		}
		
    }); // end battleButton click
		
	
}); // end ready function
