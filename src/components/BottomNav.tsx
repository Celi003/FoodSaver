import { Plus, RefreshCw, User, Home, MapIcon } from 'lucide-react';

interface BottomNavProps {
  role: 'donor' | 'receiver' | 'farmer';
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function BottomNav({ role, currentPage, onNavigate }: BottomNavProps) {
  if (role === 'donor') {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-6 py-3 flex justify-around items-center">
        <button
          onClick={() => onNavigate('donor-create')}
          className={`flex flex-col items-center space-y-1 ${
            currentPage === 'create' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Plus className="w-6 h-6" />
          <span className="text-xs">Donner</span>
        </button>
        <button
          onClick={() => onNavigate('donor-transactions')}
          className={`flex flex-col items-center space-y-1 ${
            currentPage === 'transactions' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          <RefreshCw className="w-6 h-6" />
          <span className="text-xs">Mes Lots</span>
        </button>
        <button
          onClick={() => onNavigate('donor-profile')}
          className={`flex flex-col items-center space-y-1 ${
            currentPage === 'profile' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Profil</span>
        </button>
      </div>
    );
  }

  if (role === 'farmer') {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-6 py-3 flex justify-around items-center">
        <button
          onClick={() => onNavigate('farmer-create')}
          className={`flex flex-col items-center space-y-1 ${
            currentPage === 'create' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Plus className="w-6 h-6" />
          <span className="text-xs">Publier</span>
        </button>
        <button
          onClick={() => onNavigate('farmer-transactions')}
          className={`flex flex-col items-center space-y-1 ${
            currentPage === 'transactions' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          <RefreshCw className="w-6 h-6" />
          <span className="text-xs">Mes Produits</span>
        </button>
        <button
          onClick={() => onNavigate('farmer-profile')}
          className={`flex flex-col items-center space-y-1 ${
            currentPage === 'profile' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Profil</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-6 py-3 flex justify-around items-center">
      <button
        onClick={() => onNavigate('receiver-home')}
        className={`flex flex-col items-center space-y-1 ${
          currentPage === 'home' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
        }`}
      >
        <MapIcon className="w-6 h-6" />
        <span className="text-xs">Accueil</span>
      </button>
      <button
        onClick={() => onNavigate('receiver-transactions')}
        className={`flex flex-col items-center space-y-1 ${
          currentPage === 'transactions' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
        }`}
      >
        <RefreshCw className="w-6 h-6" />
        <span className="text-xs">Mes Réservations</span>
      </button>
      <button
        onClick={() => onNavigate('receiver-profile')}
        className={`flex flex-col items-center space-y-1 ${
          currentPage === 'profile' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
        }`}
      >
        <User className="w-6 h-6" />
        <span className="text-xs">Profil</span>
      </button>
    </div>
  );
}
