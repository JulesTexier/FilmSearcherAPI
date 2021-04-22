// Nous allons créer une page qui permettra d'afficher la liste de films correspondants à la recherche de l'utilisateur. 
// On affichera également les informations sur un film si l'utilisateur clique dessus.


let input = document.querySelector("input")
let button = document.querySelector("button")

var url = ""

button.addEventListener('click', (e) => {
  e.preventDefault()
  changeUrlMovie(input.value);
  // changeUrlID(input.value);
  putPlace.innerHTML = "";
})

const changeUrlMovie = (input) => {
  let url = 'https://www.omdbapi.com/?s=' + input + '&apikey=4ee5ea8a';
  askAPI(url)
}

///API///////

const askAPI = (url) => {
  let requete = new XMLHttpRequest();
  requete.open('GET', url);
  requete.responseType = 'json';
  requete.send();
  requete.onload = function(){
    if (requete.readyState === XMLHttpRequest.DONE){
      if (requete.status === 200) {
        let reponse = requete.response;
        // displayResult(reponse.Search[0].Title, reponse.Search[0].Poster, reponse.Search[0].Year)
        reponse.Search.forEach(element => {
          displayResult(element.Title, element.Poster, element.Year);
        })
        intersectionAppear();
        getReadyModal();
      }
      
    } else {
      alert('Un problème est intervenu');
    };
  };
};

const getInfoModal = () =>{
  
};

// const changeUrlID = (input) => {
//   let urlId = 'http://www.omdbapi.com/?s=' + input + '&apikey=4ee5ea8a';
//   console.log(urlId);
// }


const displayResult = (title, cover, year) => {
  let putPlace = document.querySelector("#putPlace")
  let putModal = document.querySelector("#putModal")
  putPlace.innerHTML +=`
  <div id="card" class="container mt-5">
    <div class="row">
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0";>
          <div class="col-md-4">
            <img id="img" src="${cover}" width="auto">
          </div>
          <div class="col-md-8 px-5">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${year}</p>
            <button id="myButton" type="submit" class="btn btn-primary">En savoir plus</button>        </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
  putModal.innerHTML +=`
  <!-- Modal content -->
  <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <div id="modal" class="container mt-3">
        <div class="row">
          <div class="card mb-3" style="max-width: 740px;">
            <div class="row g-0";>
              <div class="col-md-4">
                <img src="${cover}">
              </div>
              <div class="col-md-8 px-5">
                <div class="card-body m-3">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">le 19/04/2012</p>
                  <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                    optio, eaque rerum! Provident similique accusantium nemo autem.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
}
// intersection Observer

const intersectionAppear = () => {
  let observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entries){
      if(entries.intersectionRatio> 0.5){
        entries.target.classList.remove('not-visible')
      }
    })
  }, {
    threshold:[0.5]
  })
  let items =  document.querySelectorAll('#card')
  items.forEach(function(item){
    item.classList.add('not-visible')
    observer.observe(item)
})
}

// Modale//////
// 1/clique sur un bouton

const getReadyModal = () => {
  var modal = document.querySelectorAll("#myModal");
  var myButtons = document.querySelectorAll("#myButton");
  getInfoModal();

    for(let i in myButtons){
    myButtons[i].addEventListener('click', () => {
        console.log('yes')
        modal[i].style.display = "block";
        var span = document.getElementsByClassName("close")[i];
      
      span.onclick = function() {
        modal[i].style.display = "none";
      }
            window.onclick = function(event) {
        if (event.target == modal) {
          modal[i].style.display = "none";
        }
      }
  } )
  }
}


// 2/ Récupérer l'ID
// 2/ Retrouver la description