import React, { useState } from 'react';



const PdfViewer = () => {
    const [pdfUrl, setPdfUrl] = useState('');

    const fetchPdf = async () => {
        const response = await fetch('http://localhost:4000/pdf');
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        console.log(url);
        setPdfUrl(url);
    };

    return (
        <div>
            <button onClick={fetchPdf}>Generate PDF</button>
            {pdfUrl && <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="600px" />}
        </div>
    );
};

export default PdfViewer;
