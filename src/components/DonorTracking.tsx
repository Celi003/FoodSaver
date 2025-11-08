import { useState } from 'react';
import { ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import BottomNav from './BottomNav';
import type { Donation, Message } from '../App';

interface DonorTrackingProps {
  donation: Donation | null;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function DonorTracking({ donation, onNavigate, currentPage }: DonorTrackingProps) {
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
          sender: 'donor',
          text: message,
          timestamp: new Date()
        }
      ]);
      setMessage('');
    }
  };

  const handleConfirmPickup = () => {
    alert('Récupération confirmée ! Merci pour votre contribution.');
    onNavigate('donor-transactions');
  };

  if (!donation) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Aucun lot sélectionné</p>
      </div>
    );
  }

  const statuses = [
    { label: 'Publié', active: true, completed: true },
    { label: 'Réservé', active: donation.status === 'reserved' || donation.status === 'completed', completed: donation.status === 'completed' },
    { label: 'Récupéré', active: donation.status === 'completed', completed: donation.status === 'completed' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Header */}
      <div className="relative p-6 border-b border-gray-800">
        <ArrowLeft
          onClick={() => onNavigate('donor-transactions')}
          className="text-white w-6 h-6 hover:text-orange-500 cursor-pointer absolute top-7 left-6"
        />
        <h1 className="text-xl text-white text-center">
          Suivi du Lot : {donation.title}
        </h1>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Status Tracking */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-white mb-4">Statut de la Transaction</h2>
          <div className="flex justify-between items-center">
            {statuses.map((status, index) => (
              <div key={status.label} className="flex flex-col items-center flex-1">
                <div className="relative flex items-center w-full">
                  {index > 0 && (
                    <div className={`flex-1 h-0.5 ${status.completed ? 'bg-orange-600' : 'bg-gray-700'}`} />
                  )}
                  <div className={`w-4 h-4 rounded-full ${status.active ? 'bg-orange-600' : 'bg-gray-700'} ${index === 0 ? 'ml-auto' : index === statuses.length - 1 ? 'mr-auto' : ''}`} />
                  {index < statuses.length - 1 && (
                    <div className={`flex-1 h-0.5 ${status.completed ? 'bg-orange-600' : 'bg-gray-700'}`} />
                  )}
                </div>
                <span className={`text-xs mt-2 text-center ${status.active ? 'text-orange-500' : 'text-gray-500'}`}>
                  {status.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Receiver Info */}
        {donation.receiver && (
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white mb-2">Receveur</h3>
            <p className="text-gray-300">{donation.receiver.name}</p>
            <p className="text-sm text-gray-400">{donation.receiver.type}</p>
          </div>
        )}

        {/* Messaging */}
        <div className="bg-gray-800 rounded-xl p-4">
          <h3 className="text-white mb-4">Messagerie Sécurisée</h3>
          
          {/* Messages */}
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === 'donor'
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

        {/* Confirm Button */}
        {donation.status === 'reserved' && (
          <button
            onClick={handleConfirmPickup}
            className="bg-green-600 text-white py-4 rounded-full w-full mt-4 shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>CONFIRMER LA RÉCUPÉRATION</span>
          </button>
        )}
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
