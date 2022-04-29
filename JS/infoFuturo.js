let inputSearch = document.querySelector('#buscador')
let select = document.querySelector('#category')
let fechaActual = []
let futuros = []
let val = []
let search = ''
let primerOpcion = 'primerOp'
let valor = ''


async function capturaJSON(){
    await fetch('https://amazingeventsapi.herokuapp.com/api/eventos')
    .then(response => response.json())
    .then(json => val.push(json))
    fechaActual.push(val[0].fechaActual)
    futuros.push(...val[0].eventos.filter(item => item.date > fechaActual))
    
    displayCard(futuros)
}
capturaJSON()



function displayCard(data){
    var toDisplay = []
    if(data == undefined){
        toDisplay.push(...pasados)
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

 function buscar(event){
    valor = event.target.value
    var data = []

    search = valor

    if(eventSelected == '' || eventSelected == 'primerOp'){
        if(valor == ''){
            data.push(...futuros)
        }else{data.push(...futuros.filter(evento => evento.name.toLowerCase().includes(valor.toLowerCase())))}
    }else{
        if(valor == ''){
            data.push(...futuros.filter(evento => evento.category == eventSelected))
        }else{
            data.push(...futuros.filter(evento => evento.name.toLowerCase().includes(valor.toLowerCase()) && (evento.category == eventSelected)))
        }
    }

    displayCard(data)
}

function seleccionar(event){
    eventSelected = event.target.value
    var data = []

    if(valor !== ''){
        if(eventSelected == 'primerOp'){
            data.push(...futuros.filter(evento => evento.category.toLowerCase().includes(valor.toLowerCase())))
        }else{
            data.push(...futuros.filter(evento => evento.category === eventSelected && evento.category.toLowerCase().includes(valor.toLowerCase())))
            console.log(data);
        }
    }else{
        if(eventSelected == 'primerOp'){
            data.push(...futuros)
        }else{
            data.push(...futuros.filter(evento => evento.category === eventSelected))
        }
    }
    displayCard(data)
}

inputSearch.addEventListener('keyup',buscar)
select.addEventListener('change', seleccionar)