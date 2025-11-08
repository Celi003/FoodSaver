export default function MarketplaceSoon({ onBackToSplash }: { onBackToSplash?: () => void }) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-3xl text-white mb-4">Marketplace</h1>
      <p className="text-lg text-orange-500 mb-8">Bientôt disponible !</p>
      <button
        onClick={onBackToSplash}
        className="bg-orange-600 text-white py-3 px-6 rounded-full shadow hover:bg-orange-700 transition duration-200"
      >
        Retour à l'accueil
      </button>
    </div>
  );
}
