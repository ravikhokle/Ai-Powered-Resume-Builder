import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Loading from "../components/Loading";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

const PDFViewer = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);

  const handleResize = () => {
    const newScale = window.innerWidth < 768 ? window.innerWidth * 0.9 / 800 : 1;
    setScale(newScale);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);
  const onDocumentError = (error) => console.error("Error loading PDF:", error.message);

  return (
    <div className="pdf-viewer w-full h-auto overflow-x-auto p-4 sm:p-6 bg-gray-100 flex justify-center">
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentError}>
        {numPages &&
          Array.from({ length: numPages }, (_, index) => (
            <div
              key={`page_${index + 1}`}
              className="page-container mb-4 mx-auto"
              style={{ maxWidth: "800px" }}
            >
              <Page
                pageNumber={index + 1}
                scale={scale}
                loading={<Loading/>}
                className="border border-gray-300 rounded shadow-md"
              />
            </div>
          ))}
      </Document>
    </div>
  );
};

export default PDFViewer;
