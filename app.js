let gameseq = [];
let userseq = [];
let btns = ["yellow","red","blue","green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if (!started){
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    btn.classList.add("shadow");
    setTimeout(function(){
        btn.classList.remove("shadow");
    }, 240);
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function gameflash(btn){
    btn.classList.add("shadow");
    setTimeout(function(){
        btn.classList.remove("shadow");
    }, 240);
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randombtn = document.querySelector(`.${randomColor}`);
    gameseq.push(randomColor);
    btnFlash(randombtn);
}

function checkAns(idx){
    if (userseq[idx] === gameseq[idx]){
        if (userseq.length === gameseq.length){
            setTimeout(levelUp, 1000);
        }   
    } else {
        h2.innerHTML = `Game Over! Your Score Was <b><u>${ level }</u></b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnpress(){
    let btn = this;
    gameflash(btn);
    userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click", btnpress);
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
