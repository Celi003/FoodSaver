import { useState } from 'react';
import { Search, Filter, MapPin, Clock, Euro } from 'lucide-react';
import BottomNav from './BottomNav';
import type { Donation } from '../App';
import { Image } from 'lucide-react';
// Import local images so Vite handles the correct paths in production
import ebaImg from '@/assets/eba.jpeg';
import rizImg from '@/assets/riz.jpeg';
import ahImg from '@/assets/ah.jpeg';
import tomatoesImg from '@/assets/3432.jpg';
import mapPinsImg from '@/assets/from-pins-map.jpg';

interface ReceiverHomeProps {
  onNavigate: (page: string, donation?: Donation) => void;
  currentPage: string;
}

export default function ReceiverHome({ onNavigate, currentPage }: ReceiverHomeProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const donations: Donation[] = [
    {
      id: '1',
      title: '3 plats de Piron',
      description: 'Surplus de diner',
      type: '#Pâtisseries',
      quantity: '3 kg',
  image: ebaImg,
      donor: {
        name: 'Boulangerie Martin',
        verified: true,
        type: 'Restaurant'
      },
      location: {
        address: '123 Rue de la République, 75001 Paris',
        distance: '380m'
      },
      deadline: new Date(Date.now() + 30 * 60 * 1000),
      status: 'available',
      instructions: 'Entrée par la porte de service à l\'arrière du magasin.'
    },
    {
      id: '2',
      title: 'Plats Préparés',
      description: '15 portions de lasagnes',
      type: '#PlatsCuisinés',
      quantity: '5 kg',
  image: rizImg,
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
      status: 'available',
      instructions: 'Demander le responsable à l\'accueil.'
    },
    {
      id: '3',
      title: 'Riz',
      description: '10 kg de fruits de saison',
      type: '#RepasChaud',
      quantity: '10 kg',
  image: ahImg,
      donor: {
        name: 'Marché Bio',
        verified: true,
        type: 'Entreprise'
      },
      location: {
        address: '78 Boulevard Haussmann, 75009 Paris',
        distance: '290m'
      },
      deadline: new Date(Date.now() + 120 * 60 * 1000),
      status: 'available'
    },
    {
      id: '4',
      title: 'Tomates Bio Fraîches',
      description: 'Surplus de récolte de tomates bio',
      type: '#FruitsEtLégumes',
      quantity: '25 kg',
  image: tomatoesImg,
      donor: {
        name: 'Ferme Dupont',
        verified: true,
        type: 'Agriculteur'
      },
      location: {
        address: '12 Chemin des Champs, 75018 Paris',
        distance: '500m'
      },
      deadline: new Date(Date.now() + 180 * 60 * 1000),
      status: 'available',
      price: 12.50 // Prix pour produit agriculteur
    },
    {
      id: '5',
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
        distance: '620m'
      },
      deadline: new Date(Date.now() + 240 * 60 * 1000),
      status: 'available',
      price: 8.00 // Prix pour produit agriculteur
    }
  ];

  const urgencyFilters = ['Moins d\'1h', 'Végétarien', 'Halal', 'Sans Gluten'];

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

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Header - Search Bar */}
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un don..."
              className="bg-gray-800 p-3 pl-10 rounded-full text-white w-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button className="p-3 bg-gray-800 rounded-full border border-gray-700 hover:border-orange-500 transition-colors">
            <Filter className="text-white w-6 h-6 hover:text-orange-500" />
          </button>
        </div>

        {/* Map View */}
        <div className="w-full h-64 bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
            <img
              src={mapPinsImg}
              alt="Carte des dons à proximité"
              className="w-full h-full object-cover"
            />
        </div>

        {/* Urgency Filters */}
        <div className="flex overflow-x-auto space-x-3 pb-2 -mx-6 px-6">
          {urgencyFilters.map((filter) => (
            <button
              key={filter}
              className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-400 border border-gray-700 hover:border-orange-600 whitespace-nowrap transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Donation List */}
      <div className="px-6 space-y-3">
        <h2 className="text-white mb-2">Dons Disponibles</h2>
        {donations.map((donation) => {
          const timeInfo = getTimeRemaining(donation.deadline);
          return (
            <div
              key={donation.id}
              onClick={() => onNavigate('receiver-detail', donation)}
              className="flex items-center bg-gray-800 p-3 rounded-xl shadow-md border border-gray-700 hover:border-orange-500 cursor-pointer transition-colors"
            >
              {/* Image */}
              <img
                src={donation.image}
                alt={donation.title}
                className="w-20 h-20 object-cover rounded-lg mr-3"
              />

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-white mb-1">{donation.title}</h3>
                <p className="text-xs text-gray-400 mb-2">
                  {donation.donor.name}
                  {donation.donor.type === 'Agriculteur' && (
                    <span className="ml-2 text-green-500">• Agriculteur</span>
                  )}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center text-sm text-orange-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{donation.location.distance}</span>
                    </div>
                    
                    {/* Prix affiché seulement pour les produits d'agriculteurs */}
                    {donation.price !== undefined && (
                      <div className="flex items-center text-sm text-green-400 font-semibold">
                        <Euro className="w-4 h-4 mr-1" />
                        <span>{donation.price.toFixed(2)}€</span>
                      </div>
                    )}
                  </div>
                  
                  <div className={`flex items-center text-sm ${timeInfo.urgent ? 'text-red-500' : 'text-gray-400'}`}>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{timeInfo.text}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
