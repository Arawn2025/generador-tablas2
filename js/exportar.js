
export function descargarPDF() {
  const mensaje = document.querySelector('.mensaje-edicion');
  if (mensaje) mensaje.style.display = 'none';

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'letter' });

  const originalTablas = document.getElementById('tablas');
  const selector = document.getElementById('selector');
  if (selector) selector.style.display = 'none';
  document.body.classList.remove('selector-activo');

  html2canvas(originalTablas, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#FFFFFF'
  }).then(canvas => {
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let top = canvas.height, bottom = 0, left = canvas.width, right = 0;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2], a = pixels[i + 3];
        const isWhite = r > 250 && g > 250 && b > 250 && a > 250;
        if (!isWhite) {
          if (y < top) top = y;
          if (y > bottom) bottom = y;
          if (x < left) left = x;
          if (x > right) right = x;
        }
      }
    }

    const width = right - left + 1;
    const height = bottom - top + 1;

    const trimmedCanvas = document.createElement("canvas");
    trimmedCanvas.width = width;
    trimmedCanvas.height = height;
    const trimmedCtx = trimmedCanvas.getContext("2d");
    trimmedCtx.drawImage(canvas, left, top, width, height, 0, 0, width, height);

    const imgData = trimmedCanvas.toDataURL("image/png");
    const imgProps = doc.getImageProperties(imgData);

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 20; // margen fijo en px
    const usableWidth = pageWidth - 2 * margin;
    const usableHeight = pageHeight - 2 * margin;

    const imgRatio = imgProps.width / imgProps.height;
    const pageRatio = usableWidth / usableHeight;

    let imgWidth, imgHeight;

    if (imgRatio > pageRatio) {
      imgWidth = usableWidth;
      imgHeight = imgWidth / imgRatio;
    } else {
      imgHeight = usableHeight;
      imgWidth = imgHeight * imgRatio;
    }

    const xOffset = (pageWidth - imgWidth) / 2;
    const yOffset = (pageHeight - imgHeight) / 2;

    doc.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
    doc.save("tabla.pdf");
  });
}
