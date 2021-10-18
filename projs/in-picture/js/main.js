'use strict'

var gCurrQuestIdx = 0;

var gQuests = [
    {id:1, opts:['porsche', 'lamborgini'], correctOptIdx: 0},
    {id:2, opts:['ronaldo', 'messi'], correctOptIdx:1},
    {id:3, opts:['Air jorden', 'Airforce'], correctOptIdx:0}
]


function checkAnswer(idx) {
    if (idx === gQuests[gCurrQuestIdx].correctOptIdx){
        gCurrQuestIdx++
        if (gCurrQuestIdx < gQuests.length) {
            renderButtons()
            renderImg()
        }
        else victoryAlert()

    }

}

 function victoryAlert(){
     var elBrd =  document.querySelector('.board')
     elBrd.style.display = 'none'
     showVictoriusMSG()

 }


renderButtons()
function renderButtons() {
    var strHtml =''
    var currOpts = gQuests [gCurrQuestIdx].opts
    for (var i = 0; i < 2; i++) {
        var curropt = currOpts[i];
        strHtml += `<button class ="opt-btn" onclick="checkAnswer(${i})"> ${curropt} </button>`
    }
    var elBtn = document.querySelector('.options')
    elBtn.innerHTML =strHtml;
    
}
renderImg()
function renderImg() {
    var strHtml = `<img src="images/${gCurrQuestIdx}.jpg">`;
    var elImg = document.querySelector('.imgs')
    elImg.innerHTML =strHtml;
}