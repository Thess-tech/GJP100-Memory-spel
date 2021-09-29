const Memory_Cards = document.querySelectorAll(".card"); //en selector som hämtar in alla klasser .card från html dokumentet. = Memory_Cards. 

var turnCard = false; //variabel för att se om kort har klickats på eller inte i nedanstående if satser.
var card1, card2; // första och andra klickade kort. Används i matchningen av kort. 
var youWin = 0; //en variabel som används för att få fram konfettibild. 
var timer; // en variabel som används i timer-funktionen. 
var timeLeft = 50;//värdet i timern som visas i html dokumentet. Här tilldelas det värdet som timern ska räkna ned ifrån. 
var clickSound = document.getElementById("cardsound"); //hämtar in ljud
var bellSound1 = document.getElementById("bellSound"); //hämtar ljud
var youLoose = document.getElementById("ulost"); //--"--
var winning = document.getElementById("winningSound");//--"--

  function turnAround() 
   {
     clickSound.play();
      this.classList.add("turn"); // this lyssnar på classen .card som hämtas in från variabeln Memory_Cards. classList adderar en class (turn) som skrivs in i css koden på klassen .card. Detta gör att vändunktionen på classen .card kan stylas i css med en 3D-funktion som gör det möjligt för kortet att vända på sig. 
      if (!turnCard) // Kör if satsen om turnCard inte är falsk, det beror på om en spelare har klickat på ett kort eller inte. 
                     // Den här koden körs om inget kort är klickat på. 
        {    
          turnCard = true; //Ändrar turncard till true och nästa gång en spelar klickar så körs else blocket.
          card1 = this; // sätter card1 till this som i den är kontexten nu är .card.turn
        } 

      else
       {    
            turnCard = false; // Ändrar turnCard till falsk igen så det blir möjligt att vända kort nummer två,
                              // för att se om dessa sedan matchr i nedanstående if sats.

            card2 = this; // sätter card2 till this som i den är kontexten nu är .card.turn

            // I kommande if sats kollar vi om korten matchar med hjälp av data attributet i html.
            // Tilldelar alla kort olika data attributer för att kunna matcha, se index.html.
            if (card1.dataset.namematch === card2.dataset.namematch)
            { 
                //hämtar in html skriptet med hjälp av dataset. Jag har döpt min data till namematch i html skriptet            
                card1.removeEventListener("click", turnAround); //tar bort eventlistener click och återstället kortet så att kortet inte går att klicka igen.
                card2.removeEventListener("click", turnAround); //tar bort eventlistener click och återstället kortet aå att kortet inte går att klicka igen.
                
                setTimeout(() => {bellSound1.play();}, 600);//ett pling ljud hörs om korten matchar. En tidsfördröjning på ljudet 600msek. 

                youWin = youWin + 1;

                if (youWin == 8){

                  setTimeout(function(){

                    var popup = document.getElementById("POP"); //ariabel popup som tilldelas id.t POP. 
                    popup.classList.toggle("show"); //popup (POP i html) tilldelas en class show när youWin är likamed 8. Alltså att alla kort matchat. 
                    clearInterval(timer);//stoppar timern.
                    document.getElementById('Start').removeAttribute("onclick");//gör så att GO knappen inte går att trycka på igen om spelaren har vunnit.
                    winning.play();
                  },500);  //Timer som gör att den dröver en halv sekund innan konfetting dyker upp. 

                }        
            } 
            else
            {
             // Om korten inte matchar när data attributen kollas så vänder vi tillbaka korten med hjälp av remove,
             // som tar bort transformationen som finns i classen turn.
            setTimeout(() => {
                card1.classList.remove("turn"); //tar bort turn-klassen från klassen .card
                card2.classList.remove("turn"); //tar bort turn-klassen från klassen .card
            }, 700);

            }
        }
    }

  (function mixCards() {
      Memory_Cards.forEach(card => {
          var randomPosistion = Math.floor(Math.random() * 17); //math.floor tilldelar varje kort ett nummer eller varje div som håller i bilderna. Dessa nummer(divar) blandas med Math.random. 17 eftersom det räknas från 0 och jag har 16 kort. 

          card.style.order = randomPosistion; //tilldelar varje div variabeln randomPosition som utför funktionen som beskrivs ovan. 
      });
  })(); //omsluter funktionen och gör den till en IIFE Immediatley Invoked Function Expression. Denna gör att funktionen anropas direkt när sidan laddas.  

  function playAgain() {
    location.reload();  //laddar om sidan om man klickar på knappen som anropar funktionen playAgain
  }
  
  let timeStart = false; // ----- en variabel som kan sättas till return i ifsatsen för att förhindra att knappen GO kan klickas på igen. //ej lyckats få in den ännu. 

  function updateTimer() { //funktionen som räknar ned. Den här går att få igång igen om man klickar på Go knappen igen, vilket är önskvärt at få bort. Kanske om det läggs in den variabel satt till false och satt till true?

      timeLeft = timeLeft - 1;
      if(timeLeft >= 0) 
      {
        document.getElementById("timer").innerHTML = timeLeft; //hämtar in id.t timer i html dokumentet och tilldelas timeLeft.  
      }
      else
      {
        var popup = document.getElementById("popup"); //om timeLeft är 0 så kommer denna popup fram vilket är en bild som ligger i en gömd bild i html. 
        popup.classList.toggle("showgameover");//då tilldelas classen "showgameover" vilket togglar/ändrar bilder till visible så att den syns. 
        clearInterval(timer); //stoppar if satsen, detta gör att bilden blir fast och koden stannar här och bilden stannar på visible (se class "showgameover" i CSS). 
        setTimeout(() => {youLoose.play();}, 100);//ljudet gameover
        }
      }
  
  function start_timer()
  {
    timer = setInterval(updateTimer, 1000); //en intervall sin triggas genom att klicka på GO knappen som har funktionen start_timer och kallar på funktionen updateTimer.  
    updateTimer(); //updateTimer är funktionen som räknar ned (se ovanstående funktion).
  }

  Memory_Cards.forEach(MemoryCard => MemoryCard.addEventListener("click", turnAround)); // Tilldelar alla kort en EventListener så oavsett vilket kort som klickas på  så anropas funktionen turnAround(), om korten har matchat tas EventListener bort ifrån de korten som förklarats ovan.