import PDFDocument from "pdfkit";

/**
 * Draws a horizontal line on the PDF.
 * @param {PDFDocument} pdf - The PDFDocument instance to draw the line on.
 * @param {number} top - The vertical position (y-coordinate) for the line.
 * @param {number} [left=0] - The starting horizontal position (x-coordinate) for the line.
 * @param {number} [right=pdf.page.width] - The ending horizontal position (x-coordinate) for the line.
 */
const drawLine = (pdf, top, left = 0, right = null) => {
 

  pdf.moveTo(left, top)
    .lineTo(right = pdf.page.width - 30, top)
    .stroke();
};

export default drawLine;
