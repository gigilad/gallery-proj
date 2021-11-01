"use strict";
var gCurrFont = "impact";
var gFilter = "All";
const elCanvas = document.querySelector(".meme-canvas");
const gctx = elCanvas.getContext("2d");
const elGallery = document.querySelector(".gallery-container");
const elEditor = document.querySelector(".meme-container");
const gElCanvas = document.querySelector(".meme-canvas");

function init() {
  // moveTo('gallery')
  renderKeyWords();
  renderGallery();
}

function renderGallery() {
  var imgs = getImgs();
  var strHtml = imgs
    .map((img) => {
      return `<img class="img-item" onclick="onChooseImg(${img.id})" src="${img.url}" />`;
    })
    .join("");
  document.querySelector(".img-container").innerHTML = strHtml;

}

function renderKeyWords() {
  countKeyWords();
  var keyWords = getKeyWords();
  var strHtml = Object.keys(keyWords).map((word) => {
    return `<option value="${word}"></option>`;
  });
  document.querySelector("#search-word").innerHTML = strHtml;

  var strHtmls = Object.keys(keyWords).map((word) => {
    return `<li onclick="filterImgsBy(this)" style="font-size: ${10+(gKeyWords[word]*2)}px; color: white;">${word} </li>`
  })
  document.querySelector('.meme-Keywords-container').innerHTML =strHtmls.join('')
  
}

function onChooseImg(imgIdx) {
  resetLines()
  elEditor.classList.remove("hide");
  elGallery.classList.add("hide");
  setMemeId(imgIdx);
  renderCanvas();
}
function renderCanvas() {
 
  const img = new Image();
  img.src = getImgSrc();

  img.onload = () => {
    gctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
    gMeme.lines.forEach(function (line) {
      gctx.font = `${line.size}px ${gCurrFont}`;
      gctx.lineWidth = 3;
      gctx.strokeStyle = "black";
      // // stroke color
      gctx.fillStyle = `${line.color}`;
      gctx.strokeText(`${line.txt}`, line.pos.x, line.pos.y);
      gctx.fillText(`${line.txt}`, line.pos.x, line.pos.y);
    });

    var pos = gMeme.lines[gMeme.selectedLineIdx].pos;
    gctx.beginPath();
    gctx.lineWidth = 1;
    gctx.rect(20, pos.y -30 , 270, 50);
    gctx.strokeStyle = "lightgrey";
    gctx.stroke();
  };
}
function onSetFont(currFont) {
  gCurrFont = currFont;
  renderCanvas();
}

function moveTo(event, page) {
  event.preventDefault();
  document.body.classList.toggle("menu-open");
  const elGallery = document.querySelector(".gallery-container");
  const elEditor = document.querySelector(".meme-container");
  if (page === "gallery") {
    if (elGallery.classList.contains("hide")) {
      elGallery.classList.remove("hide");
      elEditor.classList.add("hide");
    }
  }
  if (page === "generator") {
    if (elEditor.classList.contains("hide")) {
      elEditor.classList.remove("hide");
      elGallery.classList.add("hide");
    }
  }
}

function onSetText(value) {
  const text = value;
  gMeme.lines[gMeme.selectedLineIdx].txt = text;
  renderCanvas();
}

function onChangeFontSize(diff) {
  gMeme.lines[gMeme.selectedLineIdx].size += diff;
  renderCanvas();
}

function onChangeTextPos() {
  var elInput = document.querySelector(".text-input");
  var meme = getMeme()
  meme.selectedLineIdx++;
  if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
  elInput.value =meme.lines[meme.selectedLineIdx].txt;
  renderCanvas();
}

function clearText() {
  var elInput = document.querySelector('.text-input')
  elInput.value = ""
  deleteLine();
  renderCanvas();
}

function filterImgBy() {
  var searchInput = document.querySelector('.search-word').value
  gFilter = searchInput
  if(!searchInput) gFilter = 'All'
  renderGallery()

}

function moveText(position) {
  var currLine = gMeme.lines[gMeme.selectedLineIdx];
  var { align, pos } = currLine;
  switch (position) {
    case "right":
      align = "right";
      pos.x = "200";
      renderCanvas();
      break;
    case "left":
      align = "left";
      pos.x = "25";
      renderCanvas();
      break;
    case "center":
      align = "center";
      pos.x = "115";
      renderCanvas();
      break;
  }
}

function onAddLine() {
  var elInput = document.querySelector(".text-input");
  elInput.value = "";
  addLine();
  renderCanvas();
}

function onDownloadCanvas(el) {
  const imgContent = gElCanvas.toDataURL("image/jpeg");
  el.href = imgContent;
}
function toggleMenu() {
  document.body.classList.toggle("menu-open");
}

function perventDefulat(ev){
  ev.preventDefault()
}
function onFillText(color){
  setLineColor(color)
  renderCanvas()
}
function filterImgsBy(keyWord){
  gFilter = keyWord.innerText
  
 renderGallery()
}