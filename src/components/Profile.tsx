import { Settings, ChevronRight, LogOut, User as UserIcon, Bell, FileText } from 'lucide-react';
import BottomNav from './BottomNav';
import Swal from 'sweetalert2';

interface ProfileProps {
  role: 'donor' | 'receiver' | 'farmer';
  stats: {
    foodSaved: number;
    transactions: number;
    mealsRedistributed: number;
  };
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Profile({ role, stats, onNavigate, currentPage }: ProfileProps) {
  const menuItems = [
    {
      icon: <UserIcon className="w-5 h-5" />,
      label: 'Modifier mes Informations Personnelles',
      onClick: () => Swal.fire({
        icon: 'info',
        title: 'Navigation',
        text: 'Navigation vers les paramètres du profil',
        confirmButtonText: 'OK',
        width: 350
      })
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: 'Paramètres de Notification',
      onClick: () => Swal.fire({
        icon: 'info',
        title: 'Navigation',
        text: 'Navigation vers les paramètres de notification',
        confirmButtonText: 'OK',
        width: 350
      })
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: 'Télécharger mon reçu fiscal annuel',
      onClick: () => Swal.fire({
        icon: 'info',
        title: 'Téléchargement',
        text: 'Téléchargement du reçu fiscal...',
        confirmButtonText: 'OK',
        width: 350
      })
    }
  ];

  const handleLogout = () => {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler',
      width: 350
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Déconnexion réussie',
          confirmButtonText: 'OK',
          width: 350
        }).then(() => {
          onNavigate('splash');
        });
      }
    });
  };

  const roleText = role === 'donor' ? 'Particulier Donateur' : role === 'farmer' ? 'Agriculteur Vérifié' : 'Association Vérifiée';
  const userName = role === 'donor' ? 'Boulangerie Martin' : role === 'farmer' ? 'Ferme Dupont' : 'Secours Populaire';

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Header */}
      <div className="relative p-6 border-b border-gray-800">
        <h1 className="text-2xl text-white">
          Mon Compte et Impact
        </h1>
        <Settings className="text-white w-6 h-6 hover:text-orange-500 cursor-pointer absolute top-7 right-6" />
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Identity Section */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full object-cover border-2 border-orange-500 bg-gray-700 flex items-center justify-center mb-3">
            <span className="text-white text-2xl">{userName[0]}</span>
          </div>
          <h2 className="text-xl text-white mb-2">{userName}</h2>
          <span className="px-3 py-1 text-xs rounded-full bg-blue-600 text-white">
            {roleText}
          </span>
        </div>

        {/* Impact Dashboard */}
        <div>
          <h3 className="text-white mb-4">Mon Impact</h3>
          <div className="space-y-4">
            {/* Food Saved Card */}
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center">
              <p className="text-4xl text-green-500 mb-1">
                {stats.foodSaved} kg
              </p>
              <p className="text-sm text-gray-400">de Nourriture Sauvée</p>
            </div>

            {/* Transactions Card */}
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center">
              <p className="text-4xl text-orange-500 mb-1">
                {stats.transactions}
              </p>
              <p className="text-sm text-gray-400">Transactions Réussies</p>
            </div>

            {/* Meals Card */}
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center">
              <p className="text-4xl text-blue-500 mb-1">
                ~{stats.mealsRedistributed}
              </p>
              <p className="text-sm text-gray-400">Repas Redistribués (Estimé)</p>
            </div>
          </div>
        </div>

        {/* Account Management Menu */}
        <div>
          <h3 className="text-white mb-4">Gestion du Compte</h3>
          <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="flex justify-between items-center py-4 px-4 text-white hover:bg-gray-700 transition-colors w-full text-left border-b border-gray-700 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 text-red-500 mt-8 border border-gray-700 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        role={role}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
    </div>
  );
}
