var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = createQuest('Male?');
    gQuestsTree.yes = createQuest('Gandhi');
    gQuestsTree.no = createQuest('Rita');
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // : update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // : Create and Connect the 2 Quests to the quetsions tree
    var newQuest = createQuest(newQuestTxt)
    newQuest.yes =createQuest(newGuessTxt)
    gPrevQuest[lastRes].no = newQuest;
    gCurrQuest = gQuestsTree
    saveToStorage('questTree', gQuestsTree)

    onRestartGame()
}

function getCurrQuest(){
    return gCurrQuest
}