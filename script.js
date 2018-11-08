function nameEntered() {
  var name = document.getElementById("name_textfield").value;
  console.log(name);
  if (name !== "") {
    console.log("true");
    localStorage.name = name;
    document.getElementById("feedback_text").classList.remove("alert-danger");
    document.getElementById("feedback_text").classList.add("alert-success");
    document.getElementById("feedback").style.display = "block";
    document.getElementById("feedback_text").innerHTML =
      "Name Successfully saved!";
    setUpGame(name)
  } else {
    console.log("false");
    document.getElementById("feedback_text").classList.add("alert-danger");
    document.getElementById("feedback_text").classList.remove("alert-success");
    document.getElementById("feedback").style.display = "block";
    document.getElementById("feedback_text").innerHTML =
      "You must enter a name to proceed!";
  }
}

function isFirstSession() {
  if (localStorage.name == null) {
    document.getElementById("enter_name").style.display = "block";

    //document.getElementById("logout_button").style.display = "none";
  } else {
    document.getElementById("enter_name").style.display = "none";
    //document.getElementById("logout_button").style.display = "block";
    setUpGame(localStorage.name)
  }
  document.getElementById("totalgamesplayed").innerHTML = Number(localStorage.getItem(
    "playerWins")) + Number(localStorage.getItem("playerLosses")) + Number(
    localStorage.getItem("playerTies"));
  document.getElementById("playerwinsdiv").innerHTML = Number(localStorage.getItem(
    "playerWins"));
  document.getElementById("winlossratio").innerHTML = Number(localStorage.getItem(
    "playerWins")) + "-" + Number(localStorage.getItem(
    "playerLosses"));
  document.getElementById("playermoves").innerHTML = "Rock: " + Number(
    localStorage.getItem("playerRock")) + ", Paper: " + Number(localStorage.getItem(
    "playerPaper")) + ", Scissors: " + Number(localStorage.getItem(
    "playerScissors"));

  document.getElementById("compmoves").innerHTML = "Rock: " + Number(
    localStorage.getItem("compRock")) + ", Paper: " + Number(localStorage.getItem(
    "compPaper")) + ", Scissors: " + Number(localStorage.getItem(
    "compScissors"));
}

function setUpGame(name) {
  var text = "Welcome, " + name;
  //document.getElementById("logout_button").style.display = "block";
  document.getElementById("welcome_text").innerHTML = text;
  document.getElementById("enter_name").style.display = "none";
  document.getElementById("stats").style.display = "block";
  document.getElementById("throw_choice").style.display = "block";
}

function logout() {
  localStorage.clear();
  window.location.reload(false);
}



//1 == Rock
//2 == paper
//3== Scisssors

function playGameComp() {
  var playerimgs = ["rock.jpg", "paper.png", "scissors.png"];
  var compimgs = ["rock.jpg", "paper.jpg", "scissors.jpg"];
  var select = document.getElementById("throw_choice_select");
  var playermove = select.options[select.selectedIndex].value;

  if (playermove != "null") {
    //SHOW GAME RESULTS DIVS

    document.getElementById("feedback").style.display = "none"
      //COMPUTER MOVES
    var compmoveint = getRndInteger(1, 3);
    var compmove = compmoveint.toString();
    document.getElementById("player_move_text").innerHTML = getMoveString(
      playermove);
    document.getElementById("comp_move_text").innerHTML = getMoveString(
      compmove);

    document.getElementById("comp_img").src = "images/comp/" + compimgs[
      compmoveint - 1];

    document.getElementById("player_img").src = "images/player/" + playerimgs[
      playermove - 1];

    var results = determineWinner(playermove, compmove);

    document.getElementById("throw_choice").style.display = "none";
    if (results[0] == 'comp') {
      document.getElementById("playercardhead").innerHTML = "Loser!";
      document.getElementById("compcardhead").innerHTML = "Winner!";
      document.getElementById("resultsumtitle").innerHTML = "You Lost!";
      document.getElementById("resultexplanation").innerHTML = results[1];
      document.getElementById("resultsummarycard").className =
        "card text-white bg-danger mb-3";
    } else if (results[0] == 'player') {
      document.getElementById("playercardhead").innerHTML = "Winner!";
      document.getElementById("compcardhead").innerHTML = "Loser!";
      document.getElementById("resultsumtitle").innerHTML = "You Won!";
      document.getElementById("resultexplanation").innerHTML = results[1];
      document.getElementById("resultsummarycard").className =
        "card text-white bg-success mb-3";
    } else {
      document.getElementById("playercardhead").innerHTML = "Tie!";
      document.getElementById("compcardhead").innerHTML = "Tie!";
      document.getElementById("resultsumtitle").innerHTML = "It was a tie!";
      document.getElementById("resultexplanation").innerHTML = results[1];
      document.getElementById("resultsummarycard").className =
        "card text-white bg-warning mb-3";
    }
    select.selectedIndex = 0;
    document.getElementById("game_results").style
      .display = "block";

    document.getElementById("totalgamesplayed").innerHTML = Number(localStorage
        .getItem(
          "playerWins")) + Number(localStorage.getItem("playerLosses")) +
      Number(
        localStorage.getItem("playerTies"));
    document.getElementById("playerwinsdiv").innerHTML = Number(localStorage.getItem(
      "playerWins"));
    document.getElementById("winlossratio").innerHTML = Number(localStorage.getItem(
      "playerWins")) + "-" + Number(localStorage.getItem(
      "playerLosses"));
    document.getElementById("playermoves").innerHTML = "Rock: " + Number(
      localStorage.getItem("playerRock")) + ", Paper: " + Number(localStorage
      .getItem(
        "playerPaper")) + ", Scissors: " + Number(localStorage.getItem(
      "playerScissors"));

    document.getElementById("compmoves").innerHTML = "Rock: " + Number(
      localStorage.getItem("compRock")) + ", Paper: " + Number(localStorage.getItem(
      "compPaper")) + ", Scissors: " + Number(localStorage.getItem(
      "compScissors"));

  } else {
    document.getElementById("game_results").style.display = "none";
    document.getElementById("feedback").style.display = "block";
    document.getElementById("feedback_text").innerHTML =
      "You must select a move in order to play";
  }


}


function playGameOnline(playermove, compmove) {
  console.log(playermove);
  console.log(compmove);
  if (playermove != "null" && compmove != "null") {
    //SHOW GAME RESULTS DIVS
    document.getElementById("game_results").style.display = "block";
    document.getElementById("throw_choice").style.display = "none";
    document.getElementById("waiting_for_opp_card").style.display = "none";


    var results = determineWinner(playermove, compmove);

    if (results[0] == 'comp') {
      document.getElementById("playercardhead").innerHTML = "Loser!";
      document.getElementById("oppcardhead").innerHTML = "Winner!";
      document.getElementById("resultsumtitle").innerHTML = "You Lost!";
      document.getElementById("resultexplanation").innerHTML = results[1];
      document.getElementById("resultsummarycard").className =
        "card text-white bg-danger mb-3";
    } else if (results[0] == 'player') {
      document.getElementById("playercardhead").innerHTML = "Winner!";
      document.getElementById("oppcardhead").innerHTML = "Loser!";
      document.getElementById("resultsumtitle").innerHTML = "You Won!";
      document.getElementById("resultexplanation").innerHTML = results[1];
      document.getElementById("resultsummarycard").className =
        "card text-white bg-success mb-3";
    } else {
      document.getElementById("playercardhead").innerHTML = "Tie!";
      document.getElementById("oppcardhead").innerHTML = "Tie!";
      document.getElementById("resultsumtitle").innerHTML = "It was a tie!";
      document.getElementById("resultexplanation").innerHTML = results[1];
      document.getElementById("resultsummarycard").className =
        "card text-white bg-warning mb-3";
    }
  } else {
    document.getElementById("game_results").style.display = "none";
    document.getElementById("feedback").classList.remove("alert-success");
    document.getElementById("feedback").classList.add("alert-danger");
    document.getElementById("feedback").style.display = "block";
    document.getElementById("feedback_text").innerHTML =
      "You must select a move in order to play";
  }


}


//1 == Rock
//2 == paper
//3== Scisssors

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function determineWinner(player, comp) {
  if (player == comp) {
    if (player == '1') {
      addOneToLocal("playerRock");
      addOneToLocal("compRock");
    } else if (player == '2') {
      addOneToLocal("playerPaper");
      addOneToLocal("compPaper");
    } else if (player == '3') {
      addOneToLocal("playerScissors");
      addOneToLocal("compScissors");
    }
    addOneToLocal("playerTies");
    return ["tie", "You both played " + getMoveString(player) +
      ". It is a tie!"
    ]
  } else {
    if (player == "1") {
      if (comp == "2") {
        //Player == Rock
        addOneToLocal("playerRock");
        //Comp == Paper
        addOneToLocal("compPaper");
        //Comp wins
        addOneToLocal("playerLosses");
        return ["comp", "Paper covers Rock"]
      } else if (comp == "3") {
        //Player == Rock
        addOneToLocal("playerRock");
        //Comp == Scissors
        addOneToLocal("compScissors");
        //Player wins
        addOneToLocal("playerWins");
        return ["player", "Rock smashes Scissors"]
      }
    } else if (player == "2") {
      if (comp == "1") {
        //Player == Paper
        addOneToLocal("playerPaper");
        //Comp == Rock
        addOneToLocal("compRock");
        //Player wins
        addOneToLocal("playerWins");
        return ["player", "Paper covers Rock"]
      } else if (comp == "3") {
        //Player == Paper
        addOneToLocal("playerPaper");
        //Comp == Scissors
        addOneToLocal("compScissors");
        //Comp wins
        addOneToLocal("playerLosses");
        return ["comp", "Scissors cut through Paper"]
      }
    } else if (player == "3") {
      if (comp == "1") {
        //Player == Scissors
        addOneToLocal("playerScissors");
        //Comp == Rock
        addOneToLocal("compRock");
        //Comp wins
        addOneToLocal("playerLosses");
        return ["comp", "Rock smashes Scissors"]
      } else if (comp == "2") {
        //Player == Scissors
        addOneToLocal("playerScissors");
        //Comp == Paper
        addOneToLocal("compPaper");
        //Player wins
        addOneToLocal("playerWins");
        return ["player", "Scissors cut through Paper"]
      }
    }
  }
}

function getMoveString(move) {
  switch (move) {
    case "1":
      return "Rock";
      break;
    case "2":
      return "Paper";
      break;
    case "3":
      return "Scissors";
      break;
  }
}

function playAgainClicked() {
  document.getElementById("game_results").style.display = "none";
  document.getElementById("enter_name").style.display = "none";
  document.getElementById("throw_choice").style.display = "block";



}

function addOneToLocal(storageItem) {
  if (localStorage.getItem(storageItem) == null) {
    localStorage.setItem(storageItem, "1");
  } else {
    localStorage.setItem(storageItem, Number(localStorage.getItem(storageItem)) +
      1);
  }
}
