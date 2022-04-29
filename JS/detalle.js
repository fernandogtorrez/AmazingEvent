var eventos = []
async function capturaJSON(){
    await fetch('https://amazingeventsapi.herokuapp.com/api/eventos')
    .then(response => response.json())
    .then(json => eventos.push(...json.eventos))
    console.log(eventos)

    var id = location.search.split("?id=").filter(Number)
    var selectedId = Number(id[0])
    var evento = eventos.find(function(evento){
        return evento.id == selectedId
    })
    console.log(evento);

    var html = `
        <div class="card">
            <img src="${evento.image}">
            <div class="info">
                <h2>${evento.name}</h2>
                <p>${evento.date} - ${evento.place}</p>
                <p>Assistance: ${evento.assistance || evento.estimate}</p>
                <p>Price: $${evento.price}</p>
            </div>
        </div>
        `
    document.querySelector('#mainCards').innerHTML = html
}
capturaJSON()