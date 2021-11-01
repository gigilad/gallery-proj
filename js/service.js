"use strict";

var gImg = [
  { id: 1, url: "./img/1.jpg", keywords: ["angry", "crazy", "funny"] },
  { id: 2, url: "./img/2.jpg", keywords: ["cute"] },
  { id: 3, url: "./img/3.jpg", keywords: ["cute"] },
  { id: 4, url: "./img/4.jpg", keywords: ["cute"] },
  { id: 5, url: "./img/5.jpg", keywords: ["crazy", "cute"] },
  { id: 6, url: "./img/6.jpg", keywords: ["funny"] },
  { id: 7, url: "./img/7.jpg", keywords: ["funny", "crazy", "cute"] },
  { id: 8, url: "./img/8.jpg", keywords: ["cute", "happy"] },
  { id: 9, url: "./img/9.jpg", keywords: ["funny"] },
  { id: 10, url: "./img/10.jpg", keywords: ["happy"] },
  { id: 11, url: "./img/11.jpg", keywords: ["funny", "crazy"] },
  { id: 12, url: "./img/12.jpg", keywords: ["funny", "crazy"] },
  { id: 13, url: "./img/13.jpg", keywords: ["funny", "crazy"] },
  { id: 14, url: "./img/14.jpg", keywords: ["funny", "crazy"] },
  { id: 15, url: "./img/15.jpg", keywords: ["funny", "crazy"] },
  { id: 16, url: "./img/16.jpg", keywords: ["funny", "crazy"] },
  { id: 17, url: "./img/17.jpg", keywords: ["funny", "crazy"] },
  { id: 18, url: "./img/18.jpg", keywords: ["funny", "crazy"] },
];

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "",
      size: 24,
      align: "center",
      color: "white",
      pos: {
        x: 115,
        y: 40,
      },
    },
    {
      txt: "",
      size: 24,
      align: "center",
      color: "white",
      pos: {
        x: 115,
        y: 250,
      },
    },
  ],
};

var gKeyWords = {
  // angry: 0,
  cute: 0,
  // dog: 0,
  // crazy: 0,
  funny: 0,
  happy: 0,
};

function addLine() {
  var linesCount = getLinesCount();
  if (linesCount === 3) return;
  gMeme.lines.push({
    txt: "",
    size: 24,
    align: "center",
    color: "blue",
    pos: {
      x: 115,
      y: 115,
    },
  });
  gMeme.selectedLineIdx = 2;
}
function getImgs() {
  if (gFilter === "All") return gImg;
  else {
    return gImg.filter(function (img) {
      return img.keywords.includes(gFilter);
    });
    
  }
}
function setMemeId(id) {
  gMeme.selectedImgId = id;
}

function countKeyWords() {
  gImg.forEach((img) => {
    img.keywords.forEach((word) => {
      if (!gKeyWords[word]) {
        gKeyWords[word] = 1;
        return;
      }
      gKeyWords[word]++;
    });
  });
}
function getKeyWords() {
  return gKeyWords;
}
function getImgSrc() {
  var index = getImgById();
  return gImg[index].url;
}

function getImgById() {
  return gImg.findIndex((img) => gMeme.selectedImgId === img.id);
}
function getLinesCount() {
  return gMeme.lines.length;
}
function deleteLine() {
  if (gMeme.selectedLineIdx === 2) {
    gMeme.lines.pop();
    gMeme.selectedLineIdx = 0;
  } else gMeme.lines[gMeme.selectedLineIdx].txt = "";
}

function resetLines(){
  var elInput = document.querySelector(".text-input");
  var elColor = document.querySelector(".btn-color");
  elInput.value =""
  elColor.value = '#00000'

  gMeme.lines.map((line) => {
    line.txt =""
    line.color= 'white'
  })
}
function getMeme(){
  return gMeme
}
function setLineColor(color){
  gMeme.lines[gMeme.selectedLineIdx].color=color
}