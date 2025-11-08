import { useState } from 'react';
import { Clock, MapPin, Euro } from 'lucide-react';
import BottomNav from './BottomNav';
import type { Donation } from '../App';

interface FarmerTransactionsProps {
  onNavigate: (page: string, donation?: Donation) => void;
  currentPage: string;
}

export default function FarmerTransactions({ onNavigate, currentPage }: FarmerTransactionsProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const activeProducts: Donation[] = [
    {
      id: '1',
      title: 'Tomates Bio Fraîches',
      description: 'Surplus de récolte de tomates bio',
      type: '#FruitsEtLégumes',
      quantity: '25 kg',
      image: 'https://images.unsplash.com/photo-1592921870789-04563d55041c',
      donor: {
        name: 'Ferme Dupont',
        verified: true,
        type: 'Agriculteur'
      },
      location: {
        address: '12 Chemin des Champs, 75018 Paris',
        distance: '0 m'
      },
      deadline: new Date(Date.now() + 3 * 60 * 60 * 1000),
      status: 'reserved',
      price: 12.50,
      receiver: {
        name: 'Restaurant Bio',
        type: 'Restaurant'
      }
    },
    {
      id: '2',
      title: 'Pommes de Terre',
      description: 'Invendus de la semaine',
      type: '#FruitsEtLégumes',
      quantity: '40 kg',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655',
      donor: {
        name: 'Ferme Martin',
        verified: true,
        type: 'Agriculteur'
      },
      location: {
        address: '34 Route du Village, 75019 Paris',
        distance: '0 m'
      },
      deadline: new Date(Date.now() + 5 * 60 * 60 * 1000),
      status: 'available',
      price: 8.00
    }
  ];

  const historyProducts: Donation[] = [
    {
      id: '3',
      title: 'Carottes Bio',
      description: '30 kg de carottes fraîches',
      type: '#FruitsEtLégumes',
      quantity: '30 kg',
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
      donor: {
        name: 'Ferme Dupont',
        verified: true,
        type: 'Agriculteur'
      },
      location: {
        address: '12 Chemin des Champs, 75018 Paris',
        distance: '0 m'
      },
      deadline: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
      price: 15.00,
      receiver: {
        name: 'Marché Local',
        type: 'Entreprise'
      }
    },
    {
      id: '4',
      title: 'Salades Vertes',
      description: '20 salades bio',
      type: '#FruitsEtLégumes',
      quantity: '5 kg',
      image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1',
      donor: {
        name: 'Ferme Dupont',
        verified: true,
        type: 'Agriculteur'
      },
      location: {
        address: '12 Chemin des Champs, 75018 Paris',
        distance: '0 m'
      },
      deadline: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'completed',
      price: 6.50,
      receiver: {
        name: 'Épicerie du Coin',
        type: 'Entreprise'
      }
    }
  ];

  const getTimeRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diff < 0) return { text: 'Expiré', urgent: true };
    if (hours === 0 && minutes < 60) return { text: `${minutes}min`, urgent: true };
    if (hours > 0) return { text: `${hours}h ${minutes}min`, urgent: false };
    return { text: `${minutes}min`, urgent: false };
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-600/30 text-green-400">Disponible</span>;
      case 'reserved':
        return <span className="px-2 py-1 text-xs rounded-full bg-orange-600/30 text-orange-400">Réservé</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-600/30 text-blue-400">Complété</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-600/30 text-gray-400">Annulé</span>;
      default:
        return null;
    }
  };

  const donations = activeTab === 'active' ? activeProducts : historyProducts;

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl text-white text-center mb-4">
          Mes Produits
        </h1>

        {/* Tabs */}
        <div className="flex space-x-2 bg-gray-800 p-1 rounded-full">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 rounded-full text-sm transition-colors ${
              activeTab === 'active'
                ? 'bg-orange-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Actifs
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 rounded-full text-sm transition-colors ${
              activeTab === 'history'
                ? 'bg-orange-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Historique
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="p-6 space-y-4">
        {donations.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p>Aucun produit {activeTab === 'active' ? 'actif' : 'dans l\'historique'}</p>
          </div>
        ) : (
          donations.map((product) => {
            const timeInfo = activeTab === 'active' ? getTimeRemaining(product.deadline) : null;
            return (
              <div
                key={product.id}
                onClick={() => onNavigate('farmer-tracking', product)}
                className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 hover:border-orange-500 cursor-pointer transition-colors"
              >
                <div className="flex items-start mb-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-lg mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-white font-medium">{product.title}</h3>
                      {getStatusBadge(product.status)}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{product.quantity}</p>
                    
                    {/* Prix */}
                    <div className="flex items-center text-green-400 font-semibold">
                      <Euro className="w-4 h-4 mr-1" />
                      <span>{product.price?.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                {product.receiver && (
                  <div className="text-sm text-gray-400 mb-2">
                    <span className="text-orange-500">→</span> {product.receiver.name}
                  </div>
                )}

                {timeInfo && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Votre ferme</span>
                    </div>
                    <div className={`flex items-center ${timeInfo.urgent ? 'text-red-500' : 'text-gray-400'}`}>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{timeInfo.text}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        role="farmer"
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
    </div>
  );
}
