import { Gift, Heart, Sprout } from 'lucide-react';
import type { UserRole } from '../App';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
}

export default function RoleSelection({ onSelectRole }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col px-6">
      {/* Header */}
      <div className="text-2xl text-white text-center pt-8 mb-6">
        Vous êtes...
      </div>

      {/* Body - Role Cards */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Donor Card */}
        <div
          onClick={() => onSelectRole('donor')}
          className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-orange-500 cursor-pointer mb-4 transition-all"
        >
          <Gift className="text-orange-500 w-8 h-8 mb-3" />
          <h2 className="text-xl text-white mb-2">
            J'ai un Surplus à Offrir
          </h2>
          <p className="text-sm text-gray-400">
            Publiez rapidement votre don et obtenez une confirmation immédiate.
          </p>
        </div>

        {/* Receiver Card */}
        <div
          onClick={() => onSelectRole('receiver')}
          className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-orange-500 cursor-pointer mb-4 transition-all"
        >
          <Heart className="text-orange-500 w-8 h-8 mb-3" />
          <h2 className="text-xl text-white mb-2">
            Je cherche de la Nourriture
          </h2>
          <p className="text-sm text-gray-400">
            Accédez aux dons disponibles dans votre rayon de 500m.
          </p>
        </div>

        {/* Farmer Card */}
        <div
          onClick={() => onSelectRole('farmer')}
          className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-orange-500 cursor-pointer mb-4 transition-all"
        >
          <Sprout className="text-orange-500 w-8 h-8 mb-3" />
          <h2 className="text-xl text-white mb-2">
            Je suis un Agriculteur
          </h2>
          <p className="text-sm text-gray-400">
            Vendez vos invendus à prix réduit et évitez le gaspillage.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-400 text-center mt-10 pb-8">
        Déjà membre ?{' '}
        <span className="text-orange-500 hover:text-orange-400 cursor-pointer">
          Se connecter
        </span>
      </div>
    </div>
  );
}
