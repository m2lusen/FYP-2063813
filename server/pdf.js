


// const { PDFDocument } = require('pdf-lib');
// const { Readable } = require('stream');

// async function createPdf(body) {
//     const pdfDoc = await PDFDocument.create();

//     const page = pdfDoc.addPage([600, 400]);
//     const { width, height } = page.getSize();

//     let y = height - 50;

//     page.drawText(body.ListName, { x: 50, y, size: 18 }); 
//     y -= 20; 
//     page.drawText(`Total Points: ${body.TotalPoints}`, { x: 50, y, size: 12 }); 
//     y -= 20; 

//     for (const force of body.forces) {
//         page.drawText(`Force: ${force.ForceName}`, { x: 50, y, size: 14 }); // ForceName as subheading
//         y -= 20; // Adjust the y position for the next line

//         // Add more text content for other properties if needed
//         // For example:
//         page.drawText(`Edition: ${force.ForceEdition}`, { x: 50, y, size: 12 });
//         y -= 20;
//         page.drawText(`Version: ${force.ForceVersion}`, { x: 50, y, size: 12 });
//         y -= 20;
//         page.drawText(`Total Points: ${force.ForceTotalPoints}`, { x: 50, y, size: 12 });
//         y -= 20;
//     }

//     const pdfBytes = await pdfDoc.save();

//     // Convert the PDF bytes to a readable stream
//     const pdfStream = new Readable();
//     pdfStream.push(pdfBytes);
//     pdfStream.push(null); // Signal the end of the stream

//     return pdfStream;
// }

// module.exports = createPdf;


// const { PDFDocument } = require('pdf-lib');
// const { Readable } = require('stream');

// async function createPdf(body) {
//     const pdfDoc = await PDFDocument.create();


//     const page = pdfDoc.addPage([600, 800]);
//     const pageWidth = 600; // Width of each page
//     const pageHeight = 800; // Height of each page
//     let y = pageHeight - 50; // Initial y-coordinate for text

//     page.drawText(body.ListName, { x: 50, y, size: 24 }); 
//     y -= 25; 
//     page.drawText(`Total Points: ${body.TotalPoints}`, { x: 50, y, size: 18 }); 
//     y -= 20; 

//     for (const force of body.forces) {
//         // const page = pdfDoc.addPage([pageWidth, pageHeight]); // Add a new page

//         page.drawText(`Force: ${force.ForceName}`, { x: 50, y, size: 20 }); // ForceName as subheading
//         y -= 30; // Increase spacing for larger font size

//         page.drawText(`Edition: ${force.ForceEdition}`, { x: 50, y, size: 16 });
//         y -= 25;
//         page.drawText(`Version: ${force.ForceVersion}`, { x: 50, y, size: 16 });
//         y -= 25;
//         page.drawText(`Total Points: ${force.ForceTotalPoints}`, { x: 50, y, size: 16 });
//         y -= 25;

//         if (y < 50) {
//             y = pageHeight - 50; // Reset y-coordinate for the next page
//         }
//     }

//     const pdfBytes = await pdfDoc.save();

//     // Convert the PDF bytes to a readable stream
//     const pdfStream = new Readable();
//     pdfStream.push(pdfBytes);
//     pdfStream.push(null); // Signal the end of the stream

//     return pdfStream;
// }

// module.exports = createPdf;



/**
 * Creates a PDF document based on the provided body data.
 * @param {object} body - The body data containing the details to be included in the PDF.
 * @returns {Readable} - Readable stream containing the generated PDF.
 */
const { PDFDocument } = require('pdf-lib');
const { Readable } = require('stream');

async function createPdf(body) {
    const pdfDoc = await PDFDocument.create();

    const pageWidth = 600; // Width of each page
    const pageHeight = 800; // Height of each page
    const headerHeight = 50; // Height of the header
    const footerHeight = 50; // Height of the footer

    let currentPage = pdfDoc.addPage([pageWidth, pageHeight]); // Initial page
    let y = pageHeight - headerHeight; // Initial y-coordinate for text

    // Function to check if a new page is needed
    function checkNewPage() {
        if (y < footerHeight) {
            currentPage = pdfDoc.addPage([pageWidth, pageHeight]); // Add a new page
            y = pageHeight - headerHeight; // Reset y-coordinate
        }
    }

    // Header
    currentPage.drawText(body.ListName, { x: 50, y: pageHeight - 25, size: 24 }); 
    currentPage.drawText(`Total Points: ${body.TotalPoints}`, { x: 50, y: pageHeight - 50, size: 18 }); 
    currentPage.drawLine({
        start: { x: 50, y: pageHeight - headerHeight },
        end: { x: pageWidth - 50, y: pageHeight - headerHeight },
        thickness: 3,
    });
    y -= headerHeight + 30; // Move the y-coordinate below the header

    for (const force of body.forces) {
        checkNewPage(); // Check if a new page is needed before starting the force section

        // Footer
        currentPage.drawLine({
            start: { x: 50, y: footerHeight },
            end: { x: pageWidth - 50, y: footerHeight },
            thickness: 3,
        });
        y -= footerHeight + 30; // Move the y-coordinate above the footer

        // Content
        currentPage.drawText(`Force: ${force.ForceName}`, { x: 50, y, size: 20 });
        checkNewPage(); // Check if a new page is needed after drawing each force
        y -= 30;

        currentPage.drawText(`Edition: ${force.ForceEdition}`, { x: 50, y, size: 16 });
        checkNewPage(); // Check if a new page is needed after drawing each edition
        y -= 25;
        currentPage.drawText(`Version: ${force.ForceVersion}`, { x: 50, y, size: 16 });
        checkNewPage(); // Check if a new page is needed after drawing each version
        y -= 25;
        currentPage.drawText(`Total Points: ${force.ForceTotalPoints}`, { x: 50, y, size: 16 });
        checkNewPage(); // Check if a new page is needed after drawing each total points
        y -= 25;

        const unitMap = new Map();

        for (const unit of force.ForceUnits) {
            if (!unitMap.has(unit.superTypeId)) {
                unitMap.set(unit.superTypeId, []);
            }
            unitMap.get(unit.superTypeId).push(unit);
        }

        for (const [superTypeId, units] of unitMap) {
            currentPage.drawText(`Super Type ID: ${superTypeId}`, { x: 70, y, size: 16 });
            checkNewPage(); // Check if a new page is needed after drawing each super type ID
            y -= 20;

            for (const unit of units) {
                currentPage.drawText(`Unit Name: ${unit.unitName}`, { x: 90, y, size: 14 });
                checkNewPage(); // Check if a new page is needed after drawing each unit name
                y -= 20;
                currentPage.drawText(`Unit Color: ${unit.unitColor}`, { x: 90, y, size: 14 });
                checkNewPage(); // Check if a new page is needed after drawing each unit color
                y -= 20;
                currentPage.drawText(`Unit Title: ${unit.unitTitle}`, { x: 90, y, size: 14 });
                checkNewPage(); // Check if a new page is needed after drawing each unit title
                y -= 20;
                currentPage.drawText(`Unit Point Cost: ${unit.unitPointCost}`, { x: 90, y, size: 14 });
                checkNewPage(); // Check if a new page is needed after drawing each unit point cost
                y -= 20;
                currentPage.drawText(`Unit Total Point Cost: ${unit.unitTotalPointCost}`, { x: 90, y, size: 14 });
                checkNewPage(); // Check if a new page is needed after drawing each unit total point cost
                y -= 20;
                currentPage.drawLine({
                    start: { x: 50, y },
                    end: { x: pageWidth - 50, y },
                    thickness: 1,
                });
                checkNewPage(); // Check if a new page is needed after drawing each line
                y -= 30; 
            }

            currentPage.drawLine({
                start: { x: 50, y },
                end: { x: pageWidth - 50, y },
                thickness: 2,
            });
            checkNewPage(); // Check if a new page is needed after drawing each line
            y -= 30; 
        }
        console.log(y)
    }

    const pdfBytes = await pdfDoc.save();

    const pdfStream = new Readable();
    pdfStream.push(pdfBytes);
    pdfStream.push(null);

    return pdfStream;
}

module.exports = createPdf;
