import { ArrowLeft, MapPin, Clock, Phone, MessageSquare, Euro } from 'lucide-react';
import type { Donation } from '../App';

interface FarmerTrackingProps {
  donation: Donation | null;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function FarmerTracking({ donation, onNavigate, currentPage }: FarmerTrackingProps) {
  if (!donation) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Aucun produit sélectionné</p>
      </div>
    );
  }

  const handleConfirmPickup = () => {
    alert('Vente confirmée ! Paiement reçu.');
    onNavigate('farmer-transactions');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="relative p-6 border-b border-gray-800">
        <ArrowLeft
          onClick={() => onNavigate('farmer-transactions')}
          className="text-white w-6 h-6 hover:text-orange-500 absolute top-7 left-6 cursor-pointer"
        />
        <h1 className="text-xl text-white text-center">
          Suivi du Produit
        </h1>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Product Image */}
        <div className="w-full h-64 rounded-xl overflow-hidden">
          <img
            src={donation.image}
            alt={donation.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-2xl text-white mb-2">{donation.title}</h2>
          <p className="text-gray-400 mb-4">{donation.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Quantité</p>
              <p className="text-white font-medium">{donation.quantity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Prix</p>
              <div className="flex items-center text-green-400 font-semibold text-lg">
                <Euro className="w-5 h-5 mr-1" />
                <span>{donation.price?.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          {donation.status === 'reserved' && (
            <div className="bg-orange-600/20 border border-orange-600 rounded-lg p-3 mb-4">
              <p className="text-orange-400 text-sm">
                <span className="font-semibold">Réservé par :</span> {donation.receiver?.name}
              </p>
            </div>
          )}

          {donation.status === 'available' && (
            <div className="bg-green-600/20 border border-green-600 rounded-lg p-3 mb-4">
              <p className="text-green-400 text-sm">
                <span className="font-semibold">Statut :</span> Disponible à la vente
              </p>
            </div>
          )}
        </div>

        {/* Location Info */}
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <div className="flex items-start mb-3">
            <MapPin className="text-orange-500 w-5 h-5 mr-3 mt-1" />
            <div>
              <p className="text-sm text-gray-400 mb-1">Lieu de récupération</p>
              <p className="text-white">{donation.location.address}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="text-orange-500 w-5 h-5 mr-3 mt-1" />
            <div>
              <p className="text-sm text-gray-400 mb-1">Date limite</p>
              <p className="text-white">{donation.deadline.toLocaleString('fr-FR')}</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        {donation.instructions && (
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-sm text-gray-400 mb-2">Instructions</p>
            <p className="text-white">{donation.instructions}</p>
          </div>
        )}

        {/* Action Buttons */}
        {donation.status === 'reserved' && donation.receiver && (
          <div className="space-y-3">
            <div className="flex space-x-3">
              <button
                onClick={() => alert('Ouverture de Google Maps...')}
                className="flex-1 bg-gray-800 text-white py-3 rounded-full border border-gray-700 hover:border-orange-500 transition-colors flex items-center justify-center"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Itinéraire
              </button>
              <button
                onClick={() => alert('Appel en cours...')}
                className="flex-1 bg-gray-800 text-white py-3 rounded-full border border-gray-700 hover:border-orange-500 transition-colors flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Appeler
              </button>
            </div>

            <button
              onClick={handleConfirmPickup}
              className="bg-green-600 text-white py-4 rounded-full w-full shadow-lg hover:bg-green-700 transition-colors"
            >
              Confirmer la Vente et le Paiement
            </button>
          </div>
        )}

        {donation.status === 'available' && (
          <div className="bg-blue-600/20 border border-blue-600 rounded-lg p-4">
            <p className="text-blue-400 text-sm text-center">
              En attente d'acheteur. Votre produit est visible dans la liste des dons.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
