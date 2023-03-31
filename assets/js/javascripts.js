let calculadoraVacaciones = document.getElementById ('calculadoraVacaciones')

calculadoraVacaciones.addEventListener('submit' , calcExpenses)

function getValues () {
  let destino = document.getElementById('destino').value,
      presupuesto = document.getElementById('presupuesto').value,
      alojamiento = document.getElementById('alojamiento').value,
      transporte = document.getElementById('transporte').value,
      comida = document.getElementById('comida').value;
      
  return {destino, presupuesto, alojamiento, transporte, comida}    
 
}

function calcExpenses(e) {
  e.preventDefault();

  const {destino, presupuesto, alojamiento, transporte, comida} = getValues();
  let expenses = parseInt(alojamiento) + parseInt(transporte) + parseInt(comida)
  let balance = presupuesto - expenses;
  let climaTemp;

  const key = "e3e408867e8b827ae487b925eaf54125"
  let ciudad = document.querySelector('#ciudad').value;
  ciudad = encodeURIComponent(ciudad)

  if(ciudad != "") {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}`

    fetch(url)
      .then (res => {
          return res.json()
      })
      .then( clima => {
        let temp = clima.main.temp
        tempC = temp - 273.15
        climaTemp = parseInt(tempC.toFixed(0));
        
        console.log(destino, presupuesto, balance, climaTemp)
        UI(destino, presupuesto, balance, climaTemp)
      })
      .catch()
  }
}




function UI(destino, presupuesto, balance, climaTemp) {
  let resultado = document.getElementById('resultado')
  let dataPrint = document.createElement('div')

  dataPrint.innerHTML = `
  <div class="contenedor-data row">
    <div class="col s4">
      <h6>${destino}</h6>
    </div>
    <div class="col s4">
      <h6>${presupuesto}</h6>
    </div>
    <div class="col s4">
      <h6>${balance}</h6>
    </div>
    <div class="col s4">
      <h6>${climaTemp}</h6>
    </div>
  </div>  `;

  resultado.appendChild(dataPrint)

  if (climaTemp < 10) {
    dataPrint.className = "cold"
  }
  
  else {
    dataPrint.className = "warm"
  }

  reset();
  
}


function reset() {
  document.getElementById('calculadoraVacaciones').reset()
  
}

const resetBtn = document.querySelector("#btnReset");

resetBtn.addEventListener("click", () => {
  let ver = document.querySelector("#resultado div");
  if(ver){
    ver.innerHTML = `
      <div class="contenedor-data row">
        <div class="col s4">
          <h6>${""}</h6>
        </div>
        <div class="col s4">
          <h6>${""}</h6>
        </div>
        <div class="col s4">
          <h6>${""}</h6>
        </div>
        <div class="col s4">
          <h6>${""}</h6>
        </div>
      </div>  `;
    
      Swal.fire({
        title: 'Estas seguro??',
        text: "¡El registro se eliminara totalmente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado',
            'Se elimino totalmente',
            'success'
          )
        }
      })
  }
})


lista = [
  { 
    destino: " - Miami = ",
    presupuesto : 5000,
    alojamiento : 100,
    transporte : 100,
    comida : 100,
    
  }
  ,
  { 
    destino: " - Chile = ",
    presupuesto : 1000,
    alojamiento : 100,
    transporte : 100, 
    comida : 100,
    
  }
  ,
  { 
    destino: " - Brasil = ",
    presupuesto : 3000,
    alojamiento : 600,
    transporte : 600,
    comida : 800,
    
  }
]

localStorage.setItem("lista", JSON.stringify(lista));

function verListado() {
  preg = document.querySelector("#resultadoHistorial");
  preg2 = document.querySelector("#suma");
  if(preg.textContent == "" && preg2.textContent === ""){
      document.addEventListener("click", (evt)=> {
      evt.preventDefault();
      lista = JSON.parse(localStorage.getItem("lista"))
      let text = "";
      for(let i=0; i<lista.length; i++){
        text += Object.values(lista[i])+" <br> ";
      }
      const suma = lista.map(function(item) {
        return item.presupuesto - (item.alojamiento + item.comida + item.transporte);
    })
    document.getElementById("resultadoHistorial").innerHTML = text;
    document.getElementById("suma").innerHTML = suma.join(" <br> ");
  })
  }
}

/*Fetch*/

/* const btn4 = document.querySelector('#btnClima')

btn4.addEventListener('click', () => {
  
  const key = "e3e408867e8b827ae487b925eaf54125"
  let ciudad = document.querySelector('#ciudad').value;
  ciudad = encodeURIComponent(ciudad)

  if(ciudad != "") {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}`
    //console.log(url)

    fetch(url)
      .then (res => {
         // console.log(res)
          return res.json()
      })

      .then( clima => {
        let temp = clima.main.temp
        tempC = temp - 273.15
        let html = document.getElementById('resultado')
        html.innerHTML = tempC.toFixed(0)

        if (tempC < 10) {
          html.className = "cold"
        }
          else {
            html.className = "warm"
            
          }
      })
      .catch()
  }
}) */

/*
fetch ('https://jsonplaceholder.typicode.com/posts')
  .then( (resp) => resp.json() )
  .then ( (data) => {
    console.log(data)
  })
  */