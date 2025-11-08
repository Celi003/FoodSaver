import { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import BottomNav from './BottomNav';
import type { Donation } from '../App';

interface DonorTransactionsProps {
  onNavigate: (page: string, donation?: Donation) => void;
  currentPage: string;
}

export default function DonorTransactions({ onNavigate, currentPage }: DonorTransactionsProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const activeDonations: Donation[] = [
    {
      id: '1',
      title: '30 Pains au Chocolat',
      description: 'Surplus de production du matin',
      type: '#Pâtisseries',
      quantity: '3 kg',
      image: 'https://images.unsplash.com/photo-1571157577110-493b325fdd3d',
      donor: {
        name: 'Boulangerie Martin',
        verified: true,
        type: 'Restaurant'
      },
      location: {
        address: '123 Rue de la République, 75001 Paris',
        distance: '0 m'
      },
      deadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
      status: 'reserved',
      receiver: {
        name: 'Secours Populaire',
        type: 'Association'
      }
    },
    {
      id: '2',
      title: 'Plats Préparés',
      description: '15 portions de lasagnes',
      type: '#PlatsCuisinés',
      quantity: '5 kg',
      image: 'https://images.unsplash.com/photo-1759277531767-b82c1028bf7d',
      donor: {
        name: 'Restaurant La Table',
        verified: true,
        type: 'Restaurant'
      },
      location: {
        address: '45 Avenue Montaigne, 75008 Paris',
        distance: '0 m'
      },
      deadline: new Date(Date.now() + 4 * 60 * 60 * 1000),
      status: 'available'
    }
  ];

  const historyDonations: Donation[] = [
    {
      id: '3',
      title: 'Fruits et Légumes',
      description: '10 kg de fruits de saison',
      type: '#FruitsEtLégumes',
      quantity: '10 kg',
      image: 'https://images.unsplash.com/photo-1748968218227-0d1951551255',
      donor: {
        name: 'Marché Bio',
        verified: true,
        type: 'Entreprise'
      },
      location: {
        address: '78 Boulevard Haussmann, 75009 Paris',
        distance: '0 m'
      },
      deadline: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
      receiver: {
        name: 'Restos du Cœur',
        type: 'Association'
      }
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'reserved':
        return 'bg-orange-600 text-white';
      case 'available':
        return 'bg-gray-600 text-white';
      case 'completed':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'reserved':
        return 'Réservé';
      case 'available':
        return 'En Attente';
      case 'completed':
        return 'Récupéré';
      default:
        return status;
    }
  };

  const getTimeRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diff < 0) return 'Expiré';
    if (hours > 0) return `${hours}h ${minutes}min`;
    return `${minutes}min`;
  };

  const donations = activeTab === 'active' ? activeDonations : historyDonations;

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl text-white">
          Mes Lots Publiés
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-start space-x-4 border-b border-gray-700 px-6 mb-6">
        <button
          onClick={() => setActiveTab('active')}
          className={`text-lg pb-2 ${
            activeTab === 'active'
              ? 'border-b-2 border-orange-500 text-orange-500'
              : 'text-gray-400'
          }`}
        >
          Actifs ({activeDonations.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`text-lg pb-2 ${
            activeTab === 'history'
              ? 'border-b-2 border-orange-500 text-orange-500'
              : 'text-gray-400'
          }`}
        >
          Historique
        </button>
      </div>

      {/* Donation List */}
      <div className="px-6 space-y-4">
        {donations.map((donation) => (
          <div
            key={donation.id}
            onClick={() => onNavigate('donor-tracking', donation)}
            className="relative bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 hover:border-orange-500 cursor-pointer transition-colors"
          >
            {/* Status Badge */}
            <span className={`inline-block px-3 py-1 text-xs rounded-full ${getStatusBadge(donation.status)} absolute top-3 right-3`}>
              {getStatusText(donation.status)}
            </span>

            {/* Content */}
            <div className="pr-24">
              <h3 className="text-white mb-1">{donation.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{donation.type}</p>
              
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <Clock className="w-4 h-4 mr-1 text-orange-500" />
                <span>Limite: {getTimeRemaining(donation.deadline)}</span>
              </div>

              {donation.receiver && (
                <div className="flex items-center text-sm text-green-400 mt-2">
                  <span>Receveur: {donation.receiver.name}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        role="donor"
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
    </div>
  );
}
