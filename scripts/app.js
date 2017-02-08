$(document).ready(function() { // called after DOM is done being built
	
	var p1 = 0, p2 = 0;
	var name1 = "", name2 = "";	
	var moves1 = 0, moves2 = 0, timeout = 0; 
	var chance1 = 0, chance2 = 0;
	var trocket = false;
		
	$("#submitButton1").click(function() {
		
		p1 = $("#input1").val();
		
		// GET NAME
		$.ajax({
			method: "GET",
			url: "http://pokeapi.co/api/v2/pokemon/" + p1 + "/",
			success: function(data) {				
				name1 = data.name;
				console.log(name1);
				//$("#poke1").html(name1);					
			},
			error: function() {
				$("#error").html("That is not a pokemon! Please choose again");
			}
		});	
		
	}); // end button1 click
	
    $("#submitButton2").click(function() {
		
		p2 = $("#input2").val();		
		
		// GET NAME
		$.ajax({
			method: "GET",
			url: "http://pokeapi.co/api/v2/pokemon/" + p2 + "/",
			success: function(data) {	
				name2 = data.name;
				console.log(name2)
				//$("#poke2").html(name2);
			},
			error: function() {
				$("#error").html("That is not a pokemon! Please choose again");
			}
		});	
		
    }); // end button2 click
		
    $("#prepbattleButton").click(function() {
    	
    	var n = randomNumberTo100();
    	console.log(n);
    	
    	// GET IMAGE
    	$.ajax({
			method: "GET",
			url: "http://pokeapi.co/api/v2/pokemon/" + p1 + "/",
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
			url: "http://pokeapi.co/api/v2/pokemon/" + p2 + "/",
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
    	
    	if (n % 5 === 0) {
    		
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
		
		var img3 = new Image();
		var div3 = document.getElementById('meowth');
	 	
		img3.onload = function() {
			  div3.appendChild(img3);
			};
		
		img3.src = 'model/52.png';
    	
    }
    
    $("#battleButton").click(function() {     	  		
    	
    	if (trocket === true) {
    			
    		$("#moveTR").html("Oh no! Team Rocket steals " + name1 + " and " + name2 + " and flees..");
			
			var gotta = document.getElementById("theme");
			gotta.pause();
			
			var denounce = document.getElementById("rocketMotto");
			denounce.play();
    		   		
    	} else {
    		
    		battle();
    	}    	
    	
     }); // end battleButton click
    
    function battle() {
    	
    	moves1 = setInterval(function(){ 
    		printAttackOne()
    		}, 3000);
    	   	
    	timeout = setTimeout(attackTwoTimeout, 2000);
    	
    }
		
    function randomNumberTo5() {
    	
    	var randNum = Math.floor(Math.random() * 5);
		return randNum;
    }
    
    function randomNumberTo10() {
    	
    	var randNum = Math.floor(Math.random() * 10);
		return randNum;
    }
    
    function randomNumberTo100() {
    	
    	var randNum = Math.floor(Math.random() * 100);
		return randNum;
    }

    function printAttackOne() {
    	
    	 var ten = randomNumberTo10(); 
    	 var five = randomNumberTo5(); 
    	 var move1 = "";
     	
     	// GET MOVE
     	$.ajax({
 			method: "GET",
 			url: "http://pokeapi.co/api/v2/pokemon/" + p1 + "/",
 			success: function(data) {				
 				
 				var m1 = data.moves; 				
 				var movename1 = m1[ten].move.name;
 				
 				var mstat1 = data.stats[five].base_stat;
 				console.log(mstat1);
 				
 				var points1 = mstat1;
 				chance1 += points1;
 				
 				move1 = name1 + " uses " + movename1 + " move:" + " +" + points1 + " points.";
 				
 				$("#move1").html(move1);
 			}
 			
 		});   
     	
    } // end printAttackOne
    
    function attackTwoTimeout() {
    	
    	moves2 = setInterval(function(){ 
    		printAttackTwo()
		}, 3000);
    }
    
    function printAttackTwo() {
    	
   	 var ten = randomNumberTo10();    
   	 var five = randomNumberTo5();
   	 var move2 = "";
    	
    	// GET MOVE
    	$.ajax({
			method: "GET",
			url: "http://pokeapi.co/api/v2/pokemon/" + p2 + "/",
			success: function(data) {				
				
				var m2 = data.moves; 				
				var movename2 = m2[ten].move.name;
				
				var mstat2 = data.stats[five].base_stat;
				console.log(mstat2);
				
				var points2 = mstat2;
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
    		
    		getExp();
    	}   	  	
    	
    	
    }); //end stopButton click
    
    function getExp() {
    	
    	var exp1 = 0, exp2 = 0;	
    	
    	$.ajax({
    		method: "GET",
    		url: "http://pokeapi.co/api/v2/pokemon/" + p1 + "/",
    		success: function(data) {
    			
    			exp1 = data.base_experience;
    			
    		}
    		
    	});
    	
    	$.ajax({
    		method: "GET",
    		url: "http://pokeapi.co/api/v2/pokemon/" + p2 + "/",
    		success: function(data) {
    			
    			exp2 = data.base_experience;			
    			
    			calculateVictor(exp1, exp2, chance1, chance2);
    			
    		}
    		
    	}); 
    
    } // end getStats
    
    function calculateVictor(expA, expB, chanceA, chanceB) {
    	
    	var Capname1 = capFirstLetter(name1);
    	var Capname2 = capFirstLetter(name2);
    	
    	var totalPoints1 = 0, totalPoints2 = 0;    
    	
    	var random1 = randomNumberTo10();  
    	console.log(random1);
    	
    	var random2 = randomNumberTo10();   
    	console.log(random2);
    	
    	totalPoints1 = (7*expA) + (random1*chanceA);   	
    	totalPoints2 = (7*expB) + (random2*chanceB);    	
    	
    	if(totalPoints1 > totalPoints2) {
			
			$("#pokeWinner").html(Capname1+ ": [" + totalPoints1 + " points] is the winner!");
			$("#pokeLoser").html(Capname2+ ": [" + totalPoints2 + " points]");
			
		} else if (totalPoints1 < totalPoints2) {
		
			$("#pokeWinner").html(Capname2+ ": [" + totalPoints2 + " points] is the winner!");
			$("#pokeLoser").html(Capname1+ ": [" + totalPoints1 + " points]");
		
		} else {
			
			$("#pokeWinner").html("It was a tie!");
			$("#pokeLoser").html("[ "+totalPoints1 + " points]");
		}
    	
    } // end calculateVictor
    
    function rocketVictory() {
   
    	$("#pokeWinner").html("Both trainers: you lost your pokemons to Team Rocket!"); 	
    }
    
    function capFirstLetter(name) {
    	
    	var Capname =  name.charAt(0).toUpperCase() + name.slice(1);
    	return Capname;
    }
    
    $("#refreshButton").click( function() {
    	
    	location.reload();
    	
    }); // end refreshButton
    
	
}); // end ready function
