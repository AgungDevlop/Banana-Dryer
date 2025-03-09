// src/components/SplashScreen.tsx
import { useEffect, useState } from 'react';

const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Splash screen akan tampil selama 3 detik

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-orange-500 flex items-center justify-center z-50">
      <div className="text-center animate-fade-in">
        <img
          src="https://i.ibb.co.com/d0jb4q4Q/Picsart-25-02-16-02-43-02-394.jpg"
          alt="Splash Screen"
          className="w-64 h-64 object-cover rounded-full border-4 border-orange-300 mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-white">Selamat Datang</h1>
        <p className="text-orange-100 mt-2">Memuat aplikasi...</p>
        <div className="mt-4">
          <div className="w-16 h-16 border-4 border-orange-300 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;