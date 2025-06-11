
import React from 'react';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ExportButton({ cvRef }) {
  const handleDownload = async () => {
    if (!cvRef?.current) {
      toast.error('CV reference not found!');
      return;
    }

    try {
      // Lower scale and enable CORS
      const canvas = await html2canvas(cvRef.current, {
        scale: 1.5,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: '#ffffff', // ensure white background
      });

      // Convert to JPEG for smaller file size
      const imgData = canvas.toDataURL('image/jpeg', 0.6);
      const pdf = new jsPDF('p', 'pt', 'a4', true); // 'true' enables compression

      const pageWidth = 595.28;
      const pageHeight = 841.89;

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add image content with pagination
      while (heightLeft > 0) {
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
        if (heightLeft > 0) {
          pdf.addPage();
        }
      }

      pdf.save('resume.pdf');
      toast.success('CV downloaded successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to download CV.');
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-6 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded hover:shadow-lg transition-all"
    >
      Download as PDF
    </button>
  );
}

