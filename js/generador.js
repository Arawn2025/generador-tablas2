import { mezclar, cargarCartas } from './utils.js';

let celdaActiva = null;

export function generarTabla() {
  const estilo = document.getElementById('estilo').value;
  const tam = parseInt(document.getElementById('tamano').value);

  const cartas = mezclar(cargarCartas(estilo));
  const cantidadPorTabla = tam * tam;

  const tabla1 = document.getElementById('tabla1');
  tabla1.innerHTML = '';

  tabla1.style.gridTemplateColumns = `repeat(${tam}, 1fr)`;

  for (let i = 0; i < cantidadPorTabla; i++) {
    const img = document.createElement('img');
    img.src = cartas[i];
    img.onclick = () => abrirSelector(img);
    tabla1.appendChild(img);
  }

  for (let i = cantidadPorTabla; i < 2 * cantidadPorTabla; i++) {
    const img = document.createElement('img');
    img.src = cartas[i] || 'assets/blanco.png';
    img.onclick = () => abrirSelector(img);
  }
}

export function inicializarSelector() {
  // no se llama automáticamente, se actualiza al tocar una celda
}

function generarSelector(celda) {
  const estilo = document.getElementById('estilo').value;
  const selector = document.getElementById('selector');
  selector.innerHTML = '';

  const botonCerrar = document.createElement('button');
  botonCerrar.id = 'cerrarSelector';
  botonCerrar.textContent = 'X';
  botonCerrar.onclick = cerrarSelector;
  selector.appendChild(botonCerrar);

  const total = estilo === 'extendida' ? 108 : 54;
  const tabla = celda?.closest('.tabla');
  const usadas = Array.from(tabla?.querySelectorAll('img') || [])
    .map(e => e.getAttribute('src'))
    .filter(src => !src.includes('blanco.png'));

  for (let i = 1; i <= total; i++) {
    const num = i.toString().padStart(2, '0');
    const src = `assets/${estilo}/${num}.jpg`;

    const img = document.createElement('img');
    img.src = src;
    if (usadas.includes(src)) {
      img.classList.add('usada'); // solo filtro visual, se puede hacer clic
    }
    img.onclick = () => {
      if (celdaActiva) celdaActiva.src = src;
      cerrarSelector();
    };
    selector.appendChild(img);
  }

  selector.style.display = 'grid';
  document.body.classList.add('selector-activo');
}

export function abrirSelector(celda) {
  celdaActiva = celda;
  generarSelector(celda);
}

function cerrarSelector() {
  document.getElementById('selector').style.display = 'none';
  document.body.classList.remove('selector-activo');
  celdaActiva = null;
}