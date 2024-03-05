

// what info is required for the pdf
// army list name
// game system
// army

// all Units
// statblock

// all Upgrades

// all rules


const { PDFDocument } = require('pdf-lib');
const { Readable } = require('stream');

async function createPdf() {
    const pdfDoc = await PDFDocument.create();

    //temp
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();
    page.drawText('Testing', { x: 50, y: height - 50 });

    const pdfBytes = await pdfDoc.save();
    
    // Convert the PDF bytes to a readable stream
    const pdfStream = new Readable();
    pdfStream.push(pdfBytes);
    pdfStream.push(null); // Signal the end of the stream

    return pdfStream;
}

module.exports = createPdf;