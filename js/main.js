console.log('Starting up');



function inIt(){
    createProjects()
    renderProtfolio()
}

function renderProtfolio(){
    var projects = getProjs()
    var strHtmls = projects.map(function(proj){
        return `<div class="col-md-4 col-sm-6 portfolio-item">
         <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1" onclick="onGetId('${proj.id}')" >
         <div class="portfolio-hover">
          <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
         </div>
          </div>
          <img class="img-fluid" src="img/portfolio/04-thumbnail.jpg" >
          </a>
          <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">Gaming</p>
          </div>
         </div>`
    })

    $('.row-protfolio').html(strHtmls)

}



function onGetId(projectId){
    var project =getProjById(projectId)
    renderModal(project)
}


function renderModal(project){

    $('.modal-body h2').html(project.name)
    $('.item-intro').html(project.title)
    $('.describe-proj').html(project.desc)
    $('.modal-body img').attr("src",`img/portfolio/${project.name}.jpg`)
    $('.modal-body a').attr('href', `${project.url}`)

    
   
}

function onContact() {
   var email = $('.email').val()
   var subject = $('.subject').val()
   var message = $('.message').val()
   window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${message}`)

 
}
function openGame(projectName){
    window.open()

}