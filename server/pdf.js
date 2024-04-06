// const { PDFDocument } = require('pdf-lib');
// const { Readable } = require('stream');

// async function createPdf(body) {
//     console.log(body);

//     const pdfDoc = await PDFDocument.create();

//     //temp
//     const page = pdfDoc.addPage([600, 400]);
//     const { width, height } = page.getSize();

//     page.drawText('Testing', { x: 50, y: height - 50 });
//     // page.drawText(body, { x: 50, y: height - 50 })

//     const pdfBytes = await pdfDoc.save();
    
//     // Convert the PDF bytes to a readable stream
//     const pdfStream = new Readable();
//     pdfStream.push(pdfBytes);
//     pdfStream.push(null); // Signal the end of the stream

//     return pdfStream;
// }

// module.exports = createPdf;

const { PDFDocument } = require('pdf-lib');
const { Readable } = require('stream');

async function createPdf(body) {
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();

    let y = height - 50;

    page.drawText(body.ListName, { x: 50, y, size: 18 }); 
    y -= 20; 
    page.drawText(`Total Points: ${body.TotalPoints}`, { x: 50, y, size: 12 }); 
    y -= 20; 

    for (const force of body.forces) {
        page.drawText(`Force: ${force.ForceName}`, { x: 50, y, size: 14 }); // ForceName as subheading
        y -= 20; // Adjust the y position for the next line

        // Add more text content for other properties if needed
        // For example:
        page.drawText(`Edition: ${force.ForceEdition}`, { x: 50, y, size: 12 });
        y -= 20;
        page.drawText(`Version: ${force.ForceVersion}`, { x: 50, y, size: 12 });
        y -= 20;
        page.drawText(`Total Points: ${force.ForceTotalPoints}`, { x: 50, y, size: 12 });
        y -= 20;
    }

    const pdfBytes = await pdfDoc.save();

    // Convert the PDF bytes to a readable stream
    const pdfStream = new Readable();
    pdfStream.push(pdfBytes);
    pdfStream.push(null); // Signal the end of the stream

    return pdfStream;
}

module.exports = createPdf;
