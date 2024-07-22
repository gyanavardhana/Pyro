import axios from 'axios';
import Cookies from 'js-cookie';

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

  } catch (error) {
    console.error('Error generating or opening PDF:', error);
  }
};

export default generateAndOpenPdf;