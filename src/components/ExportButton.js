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
      const canvas = await html2canvas(cvRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');

      const pageWidth = 595.28;
      const pageHeight = 841.89;

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let position = 0;

      // If content height > one page, add pages as needed
      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        let remainingHeight = imgHeight;

        while (remainingHeight > 0) {
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          remainingHeight -= pageHeight;
          position -= pageHeight;

          if (remainingHeight > 0) {
            pdf.addPage();
          }
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


