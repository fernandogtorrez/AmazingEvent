let datos = []
let capacidad = []
let mayorAudiencia = []
let asistencia = []
let estimado = []
let precio = []
let categoria = []
let ingresoCategoria = []
let otraCategoria = []

async function getData(){
    await fetch('https://amazingeventsapi.herokuapp.com/api/eventos')
    .then (response => response.json())
    .then (json => datos.push(...json.eventos))

    capacidad = datos.map(dato => dato.capacity)
    asistencia = datos.map(dato => dato.assistance || dato.estimate)
    categoria = datos.map(dato => dato.category)
    categoria = new Set(categoria)
    categoria = [...categoria]
    
    ingresoCategoria = categoria.map(dato => date2(dato))
    otraCategoria = categoria.map(dato => audiencia(dato))
    
    date()
    date3()
    date4()
    date5()
}
getData()

function date(){
    var fila2 =  document.querySelector("#categoria")

   var html = ""
   categoria.map(item => {
       html +=
       `
       <td>${item}</td>
       `  
       var td = document.createElement("td")

    fila2.append(td)
    td.append(item)
   })
}

function audiencia(categoria){
    let porAsistencia = document.querySelector('#porcentajedeasistencia')
    let totalCapacidad = 0
    let totalAsistencia = 0
    let porcentajeAsistencia = []
    /* let porcentaje = [] */
    datos.forEach(data => {
        if(data.category === categoria && data.assistance){
            totalCapacidad += data.capacity
            totalAsistencia += data.assistance 
        }
        
    })
    porcentaje = ((totalAsistencia/totalCapacidad)*100).toFixed(2)+'%'
    porcentajeAsistencia.push(porcentaje)

    html = ""
    porcentajeAsistencia.map(item => {
        html +=
        `
        <td>${item}</td>
        `  
        var td2 = document.createElement("td")
 
        porAsistencia.append(td2)
        td2.append(item)
    })
}
    
function date2(categoria){
    var fila3 =  document.querySelector("#ingreso")
    var total = 0
    var precioArray = []
    datos.forEach(data => {
        if(data.category == categoria){
            total += (data.price) * (data.assistance || data.estimate)
        }
    })
    precioArray.push(total)

   var html = ""
   precioArray.map(item => {
       html +=
       `
       <td>${item}</td>
       `
       var td3 = document.createElement("td")

    fila3.append(td3)
    td3.append(item)
   })
}

let MaxAudiencia = []

function date3(){
    var fila4 =  document.querySelector('#mayorAudiencia')
    let nombre = ''

    var max = Math.max(...asistencia);
    
    datos.forEach(data => {
        if((data.assistance || data.estimate) === max){
            numero = (data.assistance || data.estimate)
            nombre = data.name
            MaxAudiencia.push(nombre)
        }
    })

   var html = ""
   MaxAudiencia.map(item => {

       html +=
       `
       <td>${item}</td>
       
       `
       var td4 = document.createElement("td")

    fila4.append(td4)
    td4.append(item)
    
   })
}

let MinAudiencia = []

function date4(){
    var fila5 =  document.querySelector('#menorAudiencia')

    var min = Math.min(...asistencia);
    let nombre = ''

    datos.forEach(data => {
        if((data.assistance || data.estimate) === min){
            numero = (data.assistance || data.estimate)
            nombre = data.name
            MinAudiencia.push(nombre)
        }
    })
    
   var html = ""
   MinAudiencia.map(item => {

       html +=
       `
       <td>${item}</td>
       `
       var td5 = document.createElement("td")

    fila5.append(td5)
    td5.append(item)
   })
}

let maxCapacidad = []

function date5(){
    var fila6 =  document.querySelector('#mayorCapacidad')
    let nombre = ''

    var max = Math.max(...capacidad);
    
    datos.forEach(data => {
        if(data.capacity === max){
            numero = data.capacity
            nombre = data.name
            maxCapacidad.push(nombre)
            console.log();
        }
    })

   var html = ""
   maxCapacidad.map(item => {

       html +=
       `
       <td>${item}</td>
       
       `
       var td6 = document.createElement("td")

    fila6.append(td6)
    td6.append(item)
   })
}