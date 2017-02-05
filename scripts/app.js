/**
 * 
 */

$(document).ready(function() { // called after DOM is done being built
	
	var p1 = 0, p2 = 0;
	var name1 = "", name2 = "";	
	var moves1 = 0, moves2 = 0, timeout = 0; 
	var chance1 = 0, chance2 = 0;
	var trocket = false, flag1 = false;
		
	$("#submitButton1").click(function() {
		
		p1 = $("#input1").val();
		
		// GET NAME
		$.ajax({
			method: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + p1 + "/",
			success: function(data) {				
				name1 = data.name;
				console.log(name1);
				//$("#poke1").html(name1);				
				
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
				console.log(name2)
				//$("#poke2").html(name2);
			}
		});	
		
    }); // end button2 click
		
    $("#prepbattleButton").click(function() {
    	
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
    	
    	console.log("name1: "+name1 + " name2: "+ name2);
    	
    	if (name1 === "meowth" || name2 === "meowth" || p1 === "meowth" || p1 === 52 || p2 === "meowth" || p2 === 52) {
    		
    		trocket = true;
    		
    		teamRocket();
    	}
		
    }); // end prepbattleButton click
    
    function teamRocket() {
    	
    	var img = new Image();
		var div = document.getElementById('jessie');
		
		img.onload = function() {
			  div.appendChild(img);
			};
		
		img.src = 'model/jessie.png';
		
		var img2 = new Image();
		var div2 = document.getElementById('james');
		
		img2.onload = function() {
			  div2.appendChild(img2);
			};
		
		img2.src = 'model/james.png';
    	
    }
    
    $("#battleButton").click(function() {     	
    	
    	if(name1 === "meowth") {
    		
    		flag1 = true;
    	}    		
    	
    	if (trocket === true) {
    		
    		if (flag1 === true) {
    			
    			$("#moveTR").html("Oh no! Team Rocket steals " + name2 + " and flees..");
    			
    			var gotta = document.getElementById("theme");
    			gotta.pause();
    			
    			var denounce = document.getElementById("rocketMotto");
    			denounce.play();
    			
    		} else {
    			
    			$("#moveTR").html("Oh no! Team Rocket steals " + name1 + " and flees..");
    			
    			var gotta = document.getElementById("theme");
    			gotta.pause();
    			
    			var denounce = document.getElementById("rocketMotto");
    			denounce.play();
    		}    		
    		   		
    	} else {
    		
    		battle();
    	}    	
    	
     }); // end battleButton click
    
    function battle() {
    	
    	moves1 = setInterval(function(){ 
    		printAttackOne()
    		}, 4000);
    	   	
    	timeout = setTimeout(attackTwoTimeout, 2000);
    	
    }
		
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
    	
    	if(trocket === true) {
    		
    		rocketVictory();
    		
    	} else {
    		
    		getStats();
    	}   	  	
    	
    	
    }); //end stopButton click
    
    function getStats() {
    	
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
  
    		}
    		
    	}); 
    
    } // end getStats
    
    
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
    	
    } // end calculateVictor
    
    function rocketVictory() {
    
    	if (flag1 === true) {
    		
    		$("#pokeWinner").html("Player 2, you lost your pokemon to Team Rocket!");
    	
    	} else {
    		
    		$("#pokeWinner").html("Player 1, you lost your pokemon to Team Rocket!");
    	}
    
    	
    }
	
}); // end ready function
