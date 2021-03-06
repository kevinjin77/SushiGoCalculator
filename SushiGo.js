var index = 1;
var numPlayers = 0;
do{
  numPlayers = prompt("Welcome to the Sushi Go Score Calculator! Please enter the number of players (2-5): ");
  if (numPlayers == null){
    break;
  } else if (numPlayers == 2) {
    alert("Each player should be dealt 10 cards.");
  } else if (numPlayers == 3) {
    alert("Each player should be dealt 9 cards.");
  } else if (numPlayers == 4) {
    alert("Each player should be dealt 8 cards.");
  } else if (numPlayers == 5) {
    alert("Each player should be dealt 7 cards.");
  } else {
    alert("Invalid Input!");
  }
} while (numPlayers < 2 || numPlayers > 5); 

function insertRow(){
  var table=document.getElementById("myTable");
  var row=table.insertRow(table.rows.length);
  var cell1=row.insertCell(0);
  var t1=document.createElement("input");
  t1.id = "numDumplings"+index;
  t1.style = "text-align: center; width: 100px"
  cell1.appendChild(t1);
  var cell2=row.insertCell(1);
  var t2=document.createElement("input");
  t2.id = "numTempura"+index;
  t2.style = "text-align: center; width: 100px"
  cell2.appendChild(t2);
  var cell3=row.insertCell(2);
  var t3=document.createElement("input");
  t3.id = "numSashimi"+index;
  t3.style = "text-align: center; width: 100px"
  cell3.appendChild(t3);
  var cell4=row.insertCell(3);
  var t4=document.createElement("input");
  t4.id = "numEgg"+index;
  t4.style = "text-align: center; width: 100px"
  cell4.appendChild(t4);
  var cell5=row.insertCell(4);
  var t5=document.createElement("input");
  t5.id = "numEggWasabi"+index;
  t5.style = "text-align: center; width: 30px"
  cell5.appendChild(t5);
  var cell6=row.insertCell(5);
  var t6=document.createElement("input");
  t6.id = "numSalmon"+index;
  t6.style = "text-align: center; width: 100px"
  cell6.appendChild(t6);
  var cell7=row.insertCell(6);
  var t7=document.createElement("input");
  t7.id = "numSalmonWasabi"+index;
  t7.style = "text-align: center; width: 30px"
  cell7.appendChild(t7);
  var cell8=row.insertCell(7);
  var t8=document.createElement("input");
  t8.id = "numSquid"+index;
  t8.style = "text-align: center; width: 100px"
  cell8.appendChild(t8);
  var cell9=row.insertCell(8);
  var t9=document.createElement("input");
  t9.id = "numSquidWasabi"+index;
  t9.style = "text-align: center; width: 30px"
  cell9.appendChild(t9);
  var cell10=row.insertCell(9);
  var t10=document.createElement("input");
  t10.id = "numMaki"+index;
  t10.style = "text-align: center; width: 100px"
  cell10.appendChild(t10);
  index++;
}
while (index < numPlayers) {
  insertRow();
}


var playerArray = [];


function Player(name, dumplings, tempura, sashimi, egg, salmon, squid, 
  eggWasabi, salmonWasabi, squidWasabi, maki) {
  this.name = name;
  this.dumplings = dumplings;
  this.tempura = tempura;
  this.sashimi = sashimi;
  this.egg = egg;    
  this.salmon = salmon;
  this.squid = squid;
  this.eggWasabi = eggWasabi;
  this.salmonWasabi = salmonWasabi;
  this.squidWasabi = squidWasabi;
  this.maki = maki;
  this.score = calcScore;
}

function numEqual (a, target) {
  var counter = 0;
  for (i = 0; i < a.length; i++) {
    if (a[i] == target) {
      counter++;
    }
  }
  return counter;
}

function calcScore () {
  var score = 0;

  var makiArray = [];
  for (i = 0; i < numPlayers; i++) {
    makiArray[i] = document.getElementById('numMaki'+i).value;
  }
  makiArray.sort();
  makiArray.reverse();
  var first = makiArray[0];
  var second;
  for (i = 1; i < makiArray.length; i++) {
    if (makiArray[i] != first) {
      second = makiArray[i];
    }
  }
  for (i = 0; i < numPlayers; i++){
    if (this.maki == first) {
      score += 6 / (numEqual(makiArray, first));
    } else if (this.maki == second && (numEqual(makiArray, first)) == 1) {
      score += 3 / (numEqual(makiArray, second));
    }
  }

  if (this.dumplings == 0) {
    score += 0;
  } else if (this.dumplings == 1) {
    score += 1;
  } else if (this.dumplings == 2) {
    score += 3;
  } else if (this.dumplings == 3) {
    score += 6;
  } else if (this.dumplings == 4) {
    score += 10;
  } else{
    score += 15;
  }

  score += Math.floor(this.tempura / 2) * 5;
  score += Math.floor(this.sashimi / 3) * 10;
  score += this.eggWasabi * 3 + (this.egg - this.eggWasabi);     
  score += this.salmonWasabi * 6 + (this.salmon - this.salmonWasabi) * 2;
  score += this.squidWasabi * 9 + (this.squid - this.squidWasabi) * 3;
  return score;
}

function readTable(){
  document.getElementById('myTable').style.display='none';
  document.getElementById('submit').style.display='none';
  for (i = 0; i < numPlayers; i++){
    playerArray[i] = new Player("test", 
      document.getElementById('numDumplings'+i).value, 
      document.getElementById('numTempura'+i).value,
      document.getElementById('numSashimi'+i).value, 
      document.getElementById('numEgg'+i).value, 
      document.getElementById('numSalmon'+i).value,
      document.getElementById('numSquid'+i).value,  
      document.getElementById('numEggWasabi'+i).value, 
      document.getElementById('numSalmonWasabi'+i).value, 
      document.getElementById('numSquidWasabi'+i).value,  
      document.getElementById('numMaki'+i).value);
  }

  var scoreArray = [] 
  for (i = 0; i < numPlayers; i++){
    scoreArray[i] = playerArray[i].score();
  }
  var max = Math.max.apply(Math, scoreArray);
  var winner;
  for (i = 0; i < numPlayers; i++){
    if (playerArray[i].score() == max) {
      winner = i + 1;
    }
  }

  var winnerMsg = document.getElementById('winner');
  if (numEqual(scoreArray, max) == 1) {
    winnerMsg.innerHTML = "And the winner of this round is ... Player " + winner + "!!! Refresh the page to play again.";
  }
  else {
    winnerMsg.innerHTML = "And we have a " + numEqual(scoreArray, max) + "-way tie! Refresh the page to play again."
  }
  var scoreMsg = document.getElementById('scores');
  var i = 0;
  do {
    scoreMsg.innerHTML += "Player " + (i + 1) + ": " + playerArray[i].score() + "<br/>";
    i++;
  } while (i < numPlayers);
}
