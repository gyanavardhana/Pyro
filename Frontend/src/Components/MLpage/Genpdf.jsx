import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const generateAndOpenPdf = async () => {
  try {
    const token = Cookies.get('authToken');
    const response = await axios.get(`${import.meta.env.VITE_APP_URL}report/generatePdf`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      responseType: 'blob', // Treat response as Blob (PDF)
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Open the PDF in a new tab
    let pdfWindow = window.open();
    if (pdfWindow) {
      pdfWindow.location.href = url;
    } else {
      window.open(url, '_blank');
    }

    // Create a download link and trigger click
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.pdf'); // Set download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up

    // Notify the user of success
    toast.success('PDF opened and downloaded successfully!', {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
      transition: Zoom,
    });

  } catch (error) {
    toast.error('Error generating or downloading PDF', {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
      transition: Zoom,
    });

    console.error('Error generating or downloading PDF:', error);
  }
};

export default generateAndOpenPdf;
