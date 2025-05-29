import { generarTabla, abrirSelector } from './generador.js';
import { descargarPDF } from './exportar.js';

document.getElementById('generarBtn').addEventListener('click', generarTabla);
document.getElementById('descargarBtn').addEventListener('click', descargarPDF);
document.getElementById('limpiarBtn').addEventListener('click', limpiarTablas);

window.addEventListener('DOMContentLoaded', () => {
  generarTabla();
});

function limpiarTablas() {
  const tam = parseInt(document.getElementById('tamano').value);
  const tabla1 = document.getElementById('tabla1');
  tabla1.innerHTML = '';

  tabla1.style.gridTemplateColumns = `repeat(${tam}, 1fr)`;

  for (let i = 0; i < tam * tam; i++) {
    const img1 = document.createElement('img');
    const img2 = document.createElement('img');
    img1.src = 'assets/blanco.png';
    img2.src = 'assets/blanco.png';
    img1.onclick = () => abrirSelector(img1);
    img2.onclick = () => abrirSelector(img2);
    tabla1.appendChild(img1);
  }

  document.getElementById('selector').style.display = 'none';
}


// Cerrar selector al presionar ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('selector').style.display = 'none';
  }
});

// Cerrar selector al hacer clic fuera del área
document.addEventListener('click', (e) => {
  const selector = document.getElementById('selector');
  if (selector.style.display === 'grid' && !selector.contains(e.target) && e.target.tagName !== 'IMG') {
    selector.style.display = 'none';
  }
});