import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import type { UserRole } from '../App';

interface SignUpLoginProps {
  role: UserRole;
  onComplete: () => void;
  onBack: () => void;
}

export default function SignUpLogin({ role, onComplete, onBack }: SignUpLoginProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  const roleText = role === 'donor' ? 'Donateur' : role === 'receiver' ? 'Receveur' : 'Agriculteur';

  return (
    <div className="min-h-screen bg-gray-900 px-6 pb-8">
      {/* Header */}
      <div className="relative pt-6 mb-10">
        <ArrowLeft
          onClick={onBack}
          className="text-white w-6 h-6 hover:text-orange-500 absolute top-6 left-0 cursor-pointer"
        />
        <h1 className="text-3xl text-white text-center pt-8 mb-10">
          {isLogin ? `Se Connecter - ${roleText}` : `Créer un Compte ${roleText}`}
        </h1>
      </div>

      {/* Body - Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field - Only show for signup */}
        {!isLogin && (
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Nom ou Raison Sociale
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-800 p-4 rounded-xl text-white w-full focus:ring-2 focus:ring-orange-500 focus:outline-none border border-gray-700"
              placeholder="Votre nom"
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Adresse E-mail
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-gray-800 p-4 rounded-xl text-white w-full focus:ring-2 focus:ring-orange-500 focus:outline-none border border-gray-700"
            placeholder="exemple@email.com"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-gray-800 p-4 rounded-xl text-white w-full focus:ring-2 focus:ring-orange-500 focus:outline-none border border-gray-700"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Social Separator */}
        <div className="text-gray-500 text-center my-6">
          ou continuer avec
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            type="button"
            className="bg-gray-800 p-3 rounded-full border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#fff"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#fff"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#fff"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="bg-gray-800 p-3 rounded-full border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#fff">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-orange-600 text-white py-4 rounded-full w-full mt-8 shadow-lg hover:bg-orange-700 transition-colors"
        >
          {isLogin ? 'Se Connecter' : 'Créer mon Compte'}
        </button>

        {/* Toggle Login/Signup */}
        <div className="text-sm text-gray-400 text-center mt-4">
          {isLogin ? "Pas encore de compte ? " : "Déjà membre ? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-500 hover:text-orange-400"
          >
            {isLogin ? "Créer un compte" : "Se connecter"}
          </button>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center mt-4">
          En cliquant, vous acceptez les CGU.
        </p>
      </form>
    </div>
  );
}
