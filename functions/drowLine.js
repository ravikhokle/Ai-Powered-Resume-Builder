const drawLine = (pdf, top, left = 0, right = null) => {
  
  pdf.moveTo(left, top)
    .lineTo(right = pdf.page.width - 30, top)
    .stroke();
};

export default drawLine;
