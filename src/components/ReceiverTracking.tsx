import { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Send } from 'lucide-react';
import BottomNav from './BottomNav';
import type { Donation, Message } from '../App';

interface ReceiverTrackingProps {
  donation: Donation | null;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function ReceiverTracking({ donation, onNavigate, currentPage }: ReceiverTrackingProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'receiver',
      text: 'Bonjour, je serai là dans 15 minutes pour récupérer le don.',
      timestamp: new Date(Date.now() - 10 * 60 * 1000)
    },
    {
      id: '2',
      sender: 'donor',
      text: 'Parfait ! Je vous attends à l\'entrée principale.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          sender: 'receiver',
          text: message,
          timestamp: new Date()
        }
      ]);
      setMessage('');
    }
  };

  const handleCancelReservation = () => {
    if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      alert('Réservation annulée. Le lot est de nouveau disponible.');
      onNavigate('receiver-transactions');
    }
  };

  if (!donation) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Aucune réservation sélectionnée</p>
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

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Header */}
      <div className="relative p-6 border-b border-gray-800">
        <ArrowLeft
          onClick={() => onNavigate('receiver-transactions')}
          className="text-white w-6 h-6 hover:text-orange-500 cursor-pointer absolute top-7 left-6"
        />
        <h1 className="text-xl text-white text-center">
          Lot Réservé : {donation.title}
        </h1>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Donor Info */}
        <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-xl">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">{donation.donor.name[0]}</span>
          </div>
          <div>
            <h3 className="text-white">{donation.donor.name}</h3>
            <p className="text-sm text-gray-400">{donation.donor.type}</p>
          </div>
        </div>

        {/* Time Remaining */}
        <div className="bg-orange-600/20 border border-orange-600 p-4 rounded-xl">
          <p className="text-orange-500">
            ⏰ Temps restant pour la récupération : {getTimeRemaining(donation.deadline)}
          </p>
        </div>

        {/* Address */}
        <div className="bg-gray-800 p-4 rounded-xl text-white border border-gray-700">
          <h3 className="text-white mb-3">Adresse de Récupération</h3>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-orange-500 mt-1" />
            <div>
              <p>{donation.location.address}</p>
              <p className="text-base text-orange-500 mt-1">Distance : {donation.location.distance}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <button
            onClick={() => alert('Ouverture de Google Maps...')}
            className="w-full py-3 bg-gray-700 text-white rounded-full flex items-center justify-center space-x-2 hover:bg-gray-600 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            <span>Obtenir l'Itinéraire</span>
          </button>
          
          <button
            onClick={() => alert('Appel en cours...')}
            className="w-full py-3 bg-gray-700 text-white rounded-full flex items-center justify-center space-x-2 hover:bg-gray-600 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>Appeler le Donateur</span>
          </button>
        </div>

        {/* Messaging */}
        <div className="bg-gray-800 rounded-xl p-4">
          <h3 className="text-white mb-4">Messagerie Sécurisée</h3>
          
          {/* Messages */}
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === 'receiver'
                    ? 'bg-orange-600 ml-auto text-white'
                    : 'bg-gray-700 text-white mr-auto'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs opacity-70">
                  {msg.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrivez un message..."
              className="flex-1 p-3 bg-gray-700 rounded-full text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="p-3 bg-orange-600 rounded-full hover:bg-orange-700 transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </form>
        </div>

        {/* Cancel Button */}
        <button
          onClick={handleCancelReservation}
          className="w-full py-3 text-red-500 mt-4 hover:bg-gray-800 rounded-full border border-gray-700 transition-colors"
        >
          ANNULER LA RÉSERVATION
        </button>
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
