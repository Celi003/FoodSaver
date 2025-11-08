import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import RoleSelection from './components/RoleSelection';
import SignUpLogin from './components/SignUpLogin';
import DonorCreate from './components/DonorCreate';
import DonorTransactions from './components/DonorTransactions';
import DonorTracking from './components/DonorTracking';
import FarmerCreate from './components/FarmerCreate';
import FarmerTransactions from './components/FarmerTransactions';
import FarmerTracking from './components/FarmerTracking';
import ReceiverHome from './components/ReceiverHome';
import ReceiverDetail from './components/ReceiverDetail';
import ReceiverTransactions from './components/ReceiverTransactions';
import ReceiverTracking from './components/ReceiverTracking';
import Profile from './components/Profile';
import MarketplaceSoon from './components/MarketplaceSoon';

export type UserRole = 'donor' | 'receiver' | 'farmer' | null;

export type DonationStatus = 'available' | 'reserved' | 'completed' | 'cancelled';

export interface Donation {
  id: string;
  title: string;
  description: string;
  type: string;
  quantity: string;
  image: string;
  donor: {
    name: string;
    verified: boolean;
    type: string;
  };
  location: {
    address: string;
    distance: string;
  };
  deadline: Date;
  status: DonationStatus;
  price?: number; // Prix pour les produits des agriculteurs
  receiver?: {
    name: string;
    type: string;
  };
  instructions?: string;
}

export interface Message {
  id: string;
  sender: 'donor' | 'receiver';
  text: string;
  timestamp: Date;
}

function App() {
  const [currentPage, setCurrentPage] = useState<string>('splash');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [userStats, setUserStats] = useState({
    foodSaved: 247,
    transactions: 18,
    mealsRedistributed: 156
  });

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setCurrentPage('signup');
  };

  const handleSignUpComplete = () => {
    if (userRole === 'donor') {
      setCurrentPage('donor-create');
    } else if (userRole === 'farmer') {
      setCurrentPage('farmer-create');
    } else {
      setCurrentPage('receiver-home');
    }
  };

  const handleNavigation = (page: string, donation?: Donation) => {
    if (donation) {
      setSelectedDonation(donation);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'splash':
        return <SplashScreen onStart={() => setCurrentPage('role')} onVisitMarketplace={() => setCurrentPage('marketplace')} />;
      case 'marketplace':
        return <MarketplaceSoon onBackToSplash={() => setCurrentPage('splash')} />;
      case 'role':
        return <RoleSelection onSelectRole={handleRoleSelect} />;
      case 'signup':
        return <SignUpLogin role={userRole} onComplete={handleSignUpComplete} onBack={() => setCurrentPage('role')} />;
      case 'donor-create':
        return <DonorCreate onNavigate={handleNavigation} currentPage="create" />;
      case 'donor-transactions':
        return <DonorTransactions onNavigate={handleNavigation} currentPage="transactions" />;
      case 'donor-tracking':
        return <DonorTracking donation={selectedDonation} onNavigate={handleNavigation} currentPage="transactions" />;
      case 'donor-profile':
        return <Profile role="donor" stats={userStats} onNavigate={handleNavigation} currentPage="profile" />;
      case 'farmer-create':
        return <FarmerCreate onNavigate={handleNavigation} currentPage="create" />;
      case 'farmer-transactions':
        return <FarmerTransactions onNavigate={handleNavigation} currentPage="transactions" />;
      case 'farmer-tracking':
        return <FarmerTracking donation={selectedDonation} onNavigate={handleNavigation} currentPage="transactions" />;
      case 'farmer-profile':
        return <Profile role="farmer" stats={userStats} onNavigate={handleNavigation} currentPage="profile" />;
      case 'receiver-home':
        return <ReceiverHome onNavigate={handleNavigation} currentPage="home" />;
      case 'receiver-detail':
        return <ReceiverDetail donation={selectedDonation} onNavigate={handleNavigation} />;
      case 'receiver-transactions':
        return <ReceiverTransactions onNavigate={handleNavigation} currentPage="transactions" />;
      case 'receiver-tracking':
        return <ReceiverTracking donation={selectedDonation} onNavigate={handleNavigation} currentPage="transactions" />;
      case 'receiver-profile':
        return <Profile role="receiver" stats={userStats} onNavigate={handleNavigation} currentPage="profile" />;
      default:
        return <SplashScreen onStart={() => setCurrentPage('role')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {renderPage()}
    </div>
  );
}

export default App;
