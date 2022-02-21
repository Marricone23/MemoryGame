const cards = document.querySelectorAll(".game-card"),
      card = document.querySelector(".game-card"),
      counter = document.querySelector(".counter-matches"),
      totalCounts = document.querySelector(".counter");
      
      
      let rotatedCard = false;
      let cardBlocked = false;
      let firstCard, secondCard;
      let cardsWon = 0;
      let clicks = 0;

function rotate(e){

  if(cardBlocked)return;
  const target = e.target.parentElement;
  target.classList.add("rotate");  

  if(target === firstCard) return;

  console.log(target.dataset.card);
 
  if(!rotatedCard){
    rotatedCard = true;
    firstCard = target;
  }else{
  rotatedCard = false;
  secondCard = target;
  compareCards();
  }
}

cards.forEach(elem => elem.addEventListener('click',rotate));


function compareCards(){
  if(firstCard.dataset.card === secondCard.dataset.card){
    console.log("flip");
    stopCards();
  //  cardsWon += 1; 
   // counter.innerHTML = cardsWon;
   cardsWon = ++counter.innerText; 
  // localStorage.cardsWon ++;   //setItem("cardsWon",ctnw);
   localStorage.setItem("cardsWon",cardsWon);
    //localStorage.cardsWon ++;   //setItem("cardsWon",ctnw);
   // localStorage.setItem("cardsWon",ctnw);   
    setTimeout(checkWon,500); 
  }else{
    disrotateCard();
    console.log("unflip");
    //clicks +=1;
   // totalCounts.innerHTML = clicks;
   //localStorage.clicks = 0;
    //totalCounts.innerText = localStorage.clicks;
   let ctn = ++totalCounts.innerText; 
   localStorage.setItem("clicks",ctn);
    //localStorage.clicks ++;
   
   // console.log(localStorage.stringify(clicks));
  }

}

function stopCards(){
  firstCard.removeEventListener('click', rotate);
  secondCard.removeEventListener('click', rotate);
}

function disrotateCard(){
  cardBlocked = true;
  setTimeout(() => {
    firstCard.classList.remove('rotate');
    secondCard.classList.remove('rotate');
    cardReset();   
 }, 1000);
}

function cardReset(){
  rotatedCard = cardBlocked = false;
  firstCard = secondCard = null;
}

function mixCards(){
  cards.forEach((card) => {
   let randomCard = Math.floor(Math.random() * cards.length);
   card.style.order = randomCard;
  });
}

mixCards();

let play = document.querySelector(".play");

function checkWon() { 
  if (cardsWon === cards.length / 2) {
  alert("You won"); 
  alert('Matches:' + localStorage.getItem('cardsWon'));
  alert('Total moves:' + localStorage.getItem('clicks'));
  setTimeout(()=> play.style.display = "flex" ,500); 
  }
  }

  checkWon();

  // The replay function
  let newGame = document.querySelector(".newGame");

  newGame.addEventListener("click", replay);
  
  function replay() { 
  mixCards();   
  cardsWon = 0;
  clicks = 0; 
  counter.innerHTML = 0; 
  totalCounts.innerHTML = 0; 
  play.style.display = "none"; 
  cards.forEach(elem => elem.classList.remove('rotate'));
  game();
  }



function game(){
  stopCards();
  disrotateCard();
  mixCards();
  checkWon();
  cards.forEach(elem => elem.addEventListener('click',rotate));
}



















/*
function calc(){
 let totalCounts = document.querySelector(".counter");
  let num = 0; 
  cards.forEach(card =>{card.addEventListener("click",(e)=>{
  
    totalCounts.innerHTML = num++;  
    console.log("count");
    
  });
 
});  
    
}

calc();*/

