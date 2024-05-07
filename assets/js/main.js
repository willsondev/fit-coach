const cronometro_pantalla = document.getElementById('cronometro')
const cronometro_opciones = document.getElementById('cronometro-opciones')
const cronometro_border = document.getElementById('cronometro-border')
const cronometro_score = document.getElementById('cronometro-score')

var min = 0
var cseg = 0
var seg = 0
var contador = null
var cantPoints = 0

console.log(cronometro_opciones.children[1])

const getContador = () => {
  return setInterval(function(){
    cseg++
    if (min >= 60 && seg >=60 && cseg >= 100) {
      clearInterval(contador)
    } else if (cseg === 100) {
      seg++
      cseg = 0
      if (seg === 60) {
        min++
        seg = 0
        cronometro_pantalla.children[0].innerHTML = min
        cronometro_pantalla.children[2].innerHTML = 0
      } else {
        cronometro_pantalla.children[2].innerHTML = seg
      }
    }
    cronometro_pantalla.children[3].innerHTML = cseg
  }, 10)
}

const startCronometro = () => {
  contador = getContador()
  cronometro_opciones.children[1].innerHTML = '||'
  cronometro_border.classList.add('rotar')
}

const stopCronometro = () => {
  clearInterval(contador)
  contador = null
  cronometro_opciones.children[1].innerHTML = '►'
  cronometro_border.classList.remove('rotar')
}

const resetCronometro = () => {
  stopCronometro()
  min = 0
  cseg = 0
  seg = 0
  cantPoints = 0
  cronometro_pantalla.children[0].innerHTML = 0
  cronometro_pantalla.children[2].innerHTML = 0
  cronometro_pantalla.children[3].innerHTML = 0
  cronometro_score.innerHTML = ''
}

const addPoint = (time = '0:00') => {
  cantPoints++
  if (cantPoints <= 3) {
    cronometro_score.innerHTML += `<p>${time}</p>`
  } else {
    stopCronometro()
  }
}

cronometro_opciones.addEventListener('click', (e) => {
  switch (e.target.id) {
    case 'cronometro-iniciar':
      if (contador === null) {
        startCronometro()
      } else {
        stopCronometro()
      }
      break;
    case 'cronometro-reiniciar':
      resetCronometro()
      break;
    case 'cronometro-anotar':
      addPoint(`${min === 0 ? '' : min + ':'} ${seg} : ${cseg}`)
      break;
  }
})