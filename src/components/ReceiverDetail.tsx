import { ArrowLeft, Share2, MapPin, Clock, CheckCircle } from 'lucide-react';
import type { Donation } from '../App';

interface ReceiverDetailProps {
  donation: Donation | null;
  onNavigate: (page: string, donation?: Donation) => void;
}

export default function ReceiverDetail({ donation, onNavigate }: ReceiverDetailProps) {
  if (!donation) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Aucun don sélectionné</p>
      </div>
    );
  }

  const getTimeRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diff < 0) return 'Expiré';
    if (hours === 0) return `${minutes} minutes`;
    return `${hours}h ${minutes}min`;
  };

  const handleReserve = () => {
    const updatedDonation = { ...donation, status: 'reserved' as const };
    alert('Lot réservé avec succès !');
    onNavigate('receiver-tracking', updatedDonation);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="relative">
        <ArrowLeft
          onClick={() => onNavigate('receiver-home')}
          className="text-white w-6 h-6 hover:text-orange-500 cursor-pointer absolute top-6 left-6 z-10"
        />
        <Share2 className="text-white w-6 h-6 hover:text-orange-500 cursor-pointer absolute top-6 right-6 z-10" />
        
        {/* Large Image */}
        <div className="relative w-full h-80">
          <img
            src={donation.image}
            alt={donation.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          
          {/* Time Remaining Badge */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-red-500/90 text-white px-4 py-2 rounded-lg inline-flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-red-500 text-xl">
                Temps restant: {getTimeRemaining(donation.deadline)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Title and Type */}
        <div>
          <h1 className="text-2xl text-white mb-2">{donation.title}</h1>
          <p className="text-gray-400">{donation.description}</p>
          <div className="flex items-center space-x-2 mt-2">
            <span className="inline-block px-3 py-1 text-sm rounded-full bg-orange-600/30 text-orange-400 border border-orange-600">
              {donation.type}
            </span>
          </div>
        </div>

        {/* Donor Info */}
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <h3 className="text-white mb-2">Donateur</h3>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">{donation.donor.name[0]}</span>
            </div>
            <div>
              <p className="text-white">{donation.donor.name}</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">{donation.donor.type}</span>
                {donation.donor.verified && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <h3 className="text-white mb-3">Détails du Don</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Quantité:</span>
              <span className="text-white">{donation.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Type:</span>
              <span className="text-white">{donation.type}</span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <h3 className="text-white mb-3">Localisation</h3>
          <div className="flex items-start space-x-3 mb-3">
            <MapPin className="w-5 h-5 text-orange-500 mt-1" />
            <div className="flex-1">
              <p className="text-white">{donation.location.address}</p>
              <p className="text-lg text-orange-500 mt-1">Distance: {donation.location.distance}</p>
            </div>
          </div>
          <button className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
            Obtenir l'Itinéraire
          </button>
        </div>

        {/* Instructions */}
        {donation.instructions && (
          <div className="bg-gray-800 p-4 rounded-xl text-gray-300 border border-gray-700">
            <h3 className="text-white mb-2">Instructions de Récupération</h3>
            <p className="text-sm">{donation.instructions}</p>
          </div>
        )}

        {/* Reserve Button */}
        <button
          onClick={handleReserve}
          className="bg-orange-600 text-white py-4 rounded-full w-full mt-6 shadow-lg hover:bg-orange-700 transition-colors"
        >
          RÉSERVER CE LOT MAINTENANT
        </button>
      </div>
    </div>
  );
}
