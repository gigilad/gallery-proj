'use strict'
var projectsNames = ['minesweeper', 'in-picture', 'touch-nums', 'guess-me', 'ball-board']

var gProj

function createProjects(){
     gProj =[]
   gProj.push((createProj('minesweeper', 'lets be careful')));
   gProj.push((createProj('in-Picture', 'how good is your vision?')));
   gProj.push((createProj('touch-Nums', 'you gotta touch them fast!')));
   gProj.push((createProj('ball-Board', 'lets play the game')));
   gProj.push((createProj('guess-me', 'i hope you have good guesses')));

return gProj
}


function createProj(name,title){
    return {
        id:name,
        name,
        title,
        desc:makeLorem(25),
        url: `projs/${name}`,
    }
}

function getProjs(){
    return gProj
}
function getProjById(projectId){
    var project = gProj.find(function(project){
        return project.id === projectId

    })
     return project
}


















function makeLorem(size = 100) {
    var words = ['game', 'project', 'time', 'was', 'hard', 'enjoyed', 'to', 'a dead channel', '.', 'coded', 'computer', 'more or less', '.', 'I', 'had', 'the story', 'time', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}
