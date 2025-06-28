import { useState } from 'react';

const SubscribeButton = () => {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const toggleImage = () => {
    setIsImageOpen(!isImageOpen);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggleImage}
        className="px-6 py-3  text-white font-medium rounded-lg  transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
      >
        Subscribe
      </button>

      {isImageOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 pt-20">
          <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-lg max-w-md w-full shadow-2xl border border-blue-200">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                Your QR Code
              </h2>
              <p className="text-blue-600 mb-6">Scan this QR to subscribe</p>
              
              <div className="flex justify-center mb-6">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-29%20at%2000.50.47_7a62eea4.jpg-JqAFeyrtmP9kGoJh6ctKcdWhf7h4fp.jpeg"
                  alt="Subscription QR Code"
                  className="w-64 h-64 object-contain border-4 border-blue-100 rounded-lg"
                />
              </div>
              
              <button
                onClick={toggleImage}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribeButton;