let eventos = []
const inputSearch = document.querySelector('#buscador')

async function capturaJSON(){
    await fetch('https://amazingeventsapi.herokuapp.com/api/eventos')
    .then(response => response.json())
    .then(json => eventos.push(...json.eventos))

    displayCard(eventos)
}

function displayCard(data){
    var toDisplay = []
    if(data == undefined){
        toDisplay.push(...eventos)
    }else{
        toDisplay.push(...data)
    }
    
    var html = ''

    toDisplay.map(evento =>{
        html += `
        <div class="card">
            <img src="${evento.image}">
            <div class="info">
                <a class="detalle" href="./detalles.html?id=${evento.id}"><h2>${evento.name}</h2></a>
                <p>${evento.date}</p>
                <p>${evento.description}</p>
            </div>
        </div>
        `
    })
    document.querySelector('#mainCards').innerHTML = html
}

capturaJSON()

function search(event){
    let val = event.target.value
    var data = eventos.filter(evento => evento.name.toLowerCase().includes(val.toLowerCase()))
    displayCard(data)
}

inputSearch.addEventListener('keyup',search)
