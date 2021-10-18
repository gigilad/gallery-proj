'use strict'
var gNums =shuffle(createNums(25))
var length = Math.sqrt(gNums.length)
var gnum =1;


renderNums()
function renderNums(nums) {
    var strHtml= '';
    for (var i = 0; i < length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < length; j++) {
            var number =gNums.pop()
           strHtml+= `<td onclick="cellClicked(${number},this)">${number}</td>`            
        }
        strHtml += '<tr>'
    }
    
var elBoard = document.querySelector('.board')
elBoard.innerHTML = strHtml
}

function cellClicked(clickedNum, elCell) {
    starttimer()
if (clickedNum === gnum) {
    gnum++
    elCell.style.backgroundColor = 'yellow'
    
}

}
function starttimer() {
    var timer = document.getElementById('stopwatch');
}





function shuffle(nums) {
    var randIdx, keep, i
    for (i = nums.length - 1; i > 0; i--) {
      randIdx = getRandomInt(0, nums.length - 1)
      keep = nums[i]
      nums[i] = nums[randIdx]
      nums[randIdx] = keep
    }
    return nums
  }
  function getRandomInt(min, max) {
    // done
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
  }
  function createNums(nums) {
      var numbers =[]
      for (var i = 1; i <= nums; i++) {
          numbers.push(i)
          
      }
      return numbers
  }