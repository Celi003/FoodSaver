import { useState } from 'react';
import { Plus, User, LayoutGrid, HelpCircle, MapPin, Camera } from 'lucide-react';
import BottomNav from './BottomNav';

interface DonorCreateProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function DonorCreate({ onNavigate, currentPage }: DonorCreateProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: [] as string[],
    quantity: '',
    location: '123 Rue de la République, 75001 Paris',
    deadline: '',
    image: null as string | null
  });

  const foodTypes = ['#PlatsCuisinés', '#FruitsEtLégumes', '#Secs', '#Pâtisseries', '#Produits Laitiers'];

  const toggleType = (type: string) => {
    if (formData.type.includes(type)) {
      setFormData({ ...formData, type: formData.type.filter(t => t !== type) });
    } else {
      setFormData({ ...formData, type: [...formData.type, type] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate publishing
    alert('Don publié avec succès !');
    onNavigate('donor-transactions');
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Header */}
      <div className="relative p-6 border-b border-gray-800">
        <h1 className="text-xl text-white text-center">
          Publier un Don Rapide
        </h1>
        <HelpCircle className="text-gray-500 w-5 h-5 absolute top-7 right-6 cursor-pointer hover:text-orange-500" />
      </div>

      {/* Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Photo Upload */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Photo du don</label>
          <div className="w-full h-48 bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-orange-500 transition-colors">
            <Camera className="w-12 h-12 mb-2" />
            <span className="text-sm">Ajoutez une photo claire (obligatoire)</span>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-lg text-white mb-2 block">
            Titre de l'Offre
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-gray-800 p-3 rounded-lg text-white w-full focus:ring-2 focus:ring-orange-500 focus:outline-none border border-gray-700"
            placeholder="Ex: 30 pains au chocolat"
            required
          />
        </div>

        {/* Food Type Tags */}
        <div>
          <label className="text-lg text-white mb-2 block">
            Type de Nourriture
          </label>
          <div className="flex flex-wrap gap-2">
            {foodTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                className={`inline-flex items-center px-3 py-1 text-sm rounded-full border cursor-pointer transition-colors ${
                  formData.type.includes(type)
                    ? 'bg-orange-600/30 text-orange-400 border-orange-600'
                    : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-orange-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="text-lg text-white mb-2 block">
            Quantité / Poids
          </label>
          <input
            type="text"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="bg-gray-800 p-3 rounded-lg text-white w-full focus:ring-2 focus:ring-orange-500 focus:outline-none border border-gray-700"
            placeholder="Ex: 5 kg ou 20 portions"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-lg text-white mb-2 block">
            <MapPin className="inline w-5 h-5 mr-2 text-orange-500" />
            Localisation
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="bg-gray-800 p-3 rounded-lg text-white w-full focus:ring-2 focus:ring-orange-500 focus:outline-none border border-gray-700"
            required
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="text-lg text-white mb-2 block">
            Heure Limite de Récupération
          </label>
          <input
            type="datetime-local"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className="bg-gray-800 p-3 rounded-lg text-white w-full focus:ring-2 focus:ring-orange-500 focus:outline-none border border-gray-700"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 text-white py-4 rounded-full w-full mt-6 shadow-lg hover:bg-green-700 transition-colors"
        >
          Publier Maintenant
        </button>
      </form>

      {/* Bottom Navigation */}
      <BottomNav
        role="donor"
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
    </div>
  );
}