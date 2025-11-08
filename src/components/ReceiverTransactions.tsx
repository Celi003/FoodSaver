import { useState } from 'react';
import { Clock, MapPin, MessageCircle, Navigation } from 'lucide-react';
import BottomNav from './BottomNav';
import type { Donation } from '../App';

interface ReceiverTransactionsProps {
  onNavigate: (page: string, donation?: Donation) => void;
  currentPage: string;
}

export default function ReceiverTransactions({ onNavigate, currentPage }: ReceiverTransactionsProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'history' | 'cancelled'>('active');

  const activeReservations: Donation[] = [
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
        distance: '380m'
      },
      deadline: new Date(Date.now() + 25 * 60 * 1000),
      status: 'reserved'
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
        distance: '450m'
      },
      deadline: new Date(Date.now() + 90 * 60 * 1000),
      status: 'reserved'
    }
  ];

  const historyReservations: Donation[] = [
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
        distance: '290m'
      },
      deadline: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed'
    }
  ];

  const getTimeRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diff < 0) return { text: 'Expiré', urgent: true };
    if (hours === 0 && minutes < 30) return { text: `${minutes} min restantes`, urgent: true };
    if (hours === 0) return { text: `${minutes} min`, urgent: false };
    return { text: `${hours}h ${minutes}min`, urgent: false };
  };

  const donations = activeTab === 'active' ? activeReservations : activeTab === 'history' ? historyReservations : [];

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl text-white">
          Mes Réservations
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
          À Récupérer ({activeReservations.length})
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
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`text-lg pb-2 ${
            activeTab === 'cancelled'
              ? 'border-b-2 border-orange-500 text-orange-500'
              : 'text-gray-400'
          }`}
        >
          Annulées
        </button>
      </div>

      {/* Reservation List */}
      <div className="px-6 space-y-4">
        {donations.map((donation) => {
          const timeInfo = getTimeRemaining(donation.deadline);
          return (
            <div
              key={donation.id}
              onClick={() => onNavigate('receiver-tracking', donation)}
              className="relative bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 hover:border-orange-500 cursor-pointer transition-colors"
            >
              {/* Status Badge */}
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-yellow-600 text-white absolute top-3 right-3">
                Réservé - En Attente
              </span>

              {/* Content */}
              <div className="pr-32">
                <h3 className="text-white mb-1">{donation.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{donation.donor.name}</p>
                
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <MapPin className="w-4 h-4 mr-1 text-orange-500" />
                  <span className="text-xs">{donation.location.address}</span>
                </div>

                <div className={`flex items-center text-sm mb-3 ${timeInfo.urgent ? 'text-red-500' : 'text-gray-400'}`}>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{timeInfo.text}</span>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('receiver-tracking', donation);
                    }}
                    className="flex items-center text-orange-500 hover:text-white text-sm"
                  >
                    <MessageCircle className="w-5 h-5 mr-1" />
                    <span>Message</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('Ouverture de la navigation...');
                    }}
                    className="flex items-center text-orange-500 hover:text-white text-sm"
                  >
                    <Navigation className="w-5 h-5 mr-1" />
                    <span>Navigation</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {donations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Aucune réservation dans cette catégorie</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        role="receiver"
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
    </div>
  );
}
