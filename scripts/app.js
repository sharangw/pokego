/**
 * 
 */

$(document).ready(function() { // called after DOM is done being built
	
	var p1 = 0, p2 = 0;
	var name1 = "", name2 = "";	
	var moves1 = 0, moves2 = 0, timeout = 0; 
	var chance1 = 0, chance2 = 0;
		
	$("#submitButton1").click(function() {
		
		p1 = $("#input1").val();
		
		// GET NAME
		$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + p1 + "/",
			success: function(data) {				
				name1 = data.name;
				//$("#poke1").html(name1);
			}
		});	
		
		// GET ABILITIES
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
		
		// GET NAME
		$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + p2 + "/",
			success: function(data) {	
				name2 = data.name;
				//$("#poke2").html(name2);
			}
		});	
		
		// GET ABILITIES
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
    	
    	// GET CHOSEN ABILITY
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
    	
    	// GET CHOSEN ABILITY
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
		
    $("#prepbattleButton").click(function() {
    	var moves1 =[];
    	var moves2 =[];
    	
    	// GET MOVES
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
    	
    	// GET MOVES
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
    	
    	// GET IMAGE
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
    	
    	// GET IMAGE
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
		
    }); // end prepbattleButton click
    
    $("#battleButton").click(function() {  
    	
    	moves1 = setInterval(function(){ 
    		printAttackOne()
    		}, 4000);
    	   	
    	timeout = setTimeout(attackTwoTimeout, 2000);
    	
     }); // end battleButton click
		
    function randomNumberTo10() {
    	
    	var randNum = Math.floor(Math.random() * 10);
		return randNum;
    }
    
    function printAttackOne() {
    	
    	 var t = randomNumberTo10();    
    	 var move1 = "";
     	
     	// GET MOVE
     	$.ajax({
 			method: "GET",
 			url: "https://pokeapi.co/api/v2/pokemon/" + p1 + "/",
 			success: function(data) {				
 				
 				var m1 = data.moves; 				
 				var movename1 = m1[t].move.name;
 				
 				var points1 = 15*t;
 				chance1 += points1;
 				
 				move1 = name1 + " uses " + movename1 + " move:" + " +" + points1 + " points.";
 				
 				$("#move1").html(move1);
 			}
 			
 		});   
     	
    } // end printAttackOne
    
    function attackTwoTimeout() {
    	
    	moves2 = setInterval(function(){ 
    		printAttackTwo()
		}, 4000);
    }
    
    function printAttackTwo() {
    	
   	 var t = randomNumberTo10();    
   	 var move2 = "";
    	
    	// GET MOVE
    	$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + p2 + "/",
			success: function(data) {				
				
				var m2 = data.moves; 				
				var movename2 = m2[t].move.name;
				
				var points2 = 15*t;
				chance2 += points2;
				
				move2 = name2 + " uses " + movename2 + " move" + " +" + points2 + " points.";
				
				$("#move2").html(move2);
			}
			
		});
    	
    } // end printAttackTwo
    
    $("#stopButton").click(function() {
    	
    	clearInterval(moves1);
    	
    	clearInterval(moves2);
    	
    	clearTimeout(timeout);
    	
    	var exp1 = 0, exp2 = 0, stat1 = 0, stat2 = 0;	    	
    	
    	$.ajax({
    		method: "GET",
    		url: "https://pokeapi.co/api/v2/pokemon/" + p1 + "/",
    		success: function(data) {
    			
    			exp1 = data.base_experience;
    			
    			for (i=0; i <= 5; i++) {
    				stat1 += data.stats[i].base_stat;
    				
    			}    			
    		}
    		
    	});
    	
    	$.ajax({
    		method: "GET",
    		url: "https://pokeapi.co/api/v2/pokemon/" + p2 + "/",
    		success: function(data) {
    			
    			exp2 = data.base_experience;
    			
    			for (i=0; i <= 5; i++) {
    				stat2 += data.stats[i].base_stat;
    			}    			
    			
    			calculateVictor(exp1, exp2, stat1, stat2, chance1, chance2);
    			
    			/*console.log(stat1);
    			console.log(stat2);
    			console.log(chance1);
    			console.log(chance2);*/
    		}
    		
    	});   	
    	
    	
    }); //end stopButton click
    
    
    function calculateVictor(expA, expB, statA, statB, chanceA, chanceB) {
    	
    	var totalPoints1 = 0, totalPoints2 = 0;    
    	
    	var anotherRandom1 = randomNumberTo10();    	
    	var anotherRandom2 = randomNumberTo10();    
    	
    	totalPoints1 = (6*expA) + (4*statA) + (anotherRandom1*chanceA);   	
    	totalPoints2 = (6*expB) + (4*statB) + (anotherRandom2*chanceB);    	
    	
    	if(totalPoints1 > totalPoints2) {
			
			$("#pokeWinner").html(name1+ ": [" + totalPoints1 + " points] is the winner!");
			$("#pokeLoser").html(name2+ ": [" + totalPoints2 + " points]");
			
		} else if (totalPoints1 < totalPoints2) {
		
			$("#pokeWinner").html(name2+ ": [" + totalPoints2 + " points] is the winner!");
			$("#pokeLoser").html(name1+ ": [" + totalPoints1 + " points]");
		
		} else {
			
			$("#pokeWinner").html("It was a tie!");
			$("#pokeLoser").html("[ "+totalPoints1 + " points]");
		}
    	
    }
	
}); // end ready function
