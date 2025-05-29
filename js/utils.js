export function mezclar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function cargarCartas(estilo) {
  const total = estilo === 'extendida' ? 108 : 54;
  let cartas = [];

  for (let i = 1; i <= total; i++) {
    const num = i.toString().padStart(2, '0');
    cartas.push(`assets/${estilo}/${num}.jpg`);
  }

  return cartas;
}
