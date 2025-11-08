import SplashCarousel from './SplashCarousel';

interface SplashScreenProps {
  onStart: () => void;
  onVisitMarketplace?: () => void;
}

// Extend the Window interface to include setCurrentPage
declare global {
  interface Window {
    setCurrentPage?: (page: string) => void;
  }
}

export default function SplashScreen({ onStart, onVisitMarketplace }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header - Status Bar Space */}
      <div className="dark:bg-gray-900 h-10 w-full" />

      {/* Body - Image with Gradient and Text */}
      <div className="relative flex-1 flex flex-col">
        {/* Impact Image */}
        <SplashCarousel />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        
        {/* Text on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl text-white mb-2">
            Food Saver : Le Don Alimentaire Local.
          </h1>
          <p className="text-base text-gray-300 mb-8">
            Connectez-vous pour sauver des repas et renforcer votre communauté en temps réel.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-4">
        <button
          onClick={onStart}
          className="bg-orange-600 text-white py-4 px-6 rounded-full w-4/5 mx-auto shadow-lg hover:bg-orange-700 transition duration-200"
        >
          Démarrer
        </button>
        <button
          onClick={onVisitMarketplace}
          className="bg-gray-800 text-orange-500 py-3 px-6 rounded-full w-4/5 mx-auto shadow hover:bg-gray-700 transition duration-200 border border-orange-500"
        >
          Visiter notre marketplace
        </button>
      </div>
    </div>
  );
}
