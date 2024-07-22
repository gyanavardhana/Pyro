import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, Zoom } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const generateAndOpenPdf = async () => {
  try {
    const token = Cookies.get('authToken');
    const response = await axios.get(`${import.meta.env.VITE_APP_URL}report/generatePdf`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      responseType: 'blob', // Important: This tells axios to treat the response as a Blob
    });

    // Create a URL from the blob
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

    // Open the URL in a new tab
    const pdfWindow = window.open();
    pdfWindow.location.href = url;

    // Notify the user of successful PDF generation
    toast.success('PDF generated and opened successfully!', {
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
    // Notify the user of an error
    toast.error('Error generating or opening PDF', {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
      transition: Zoom,
    });

    console.error('Error generating or opening PDF:', error);
  }
};

export default generateAndOpenPdf;
