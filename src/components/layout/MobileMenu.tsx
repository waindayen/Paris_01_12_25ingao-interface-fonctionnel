import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { X, ChevronDown } from 'lucide-react';
import { 
  LayoutDashboard, 
  Dices, 
  Wallet, 
  History, 
  Users, 
  Gift, 
  Lock, 
  UserCircle, 
  LogOut,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign
} from 'lucide-react';
import Logo from './Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { logout, userData } = useAuth();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const getMenuItems = () => {
    const isExternalOrAgent = userData?.role === 'externaluser' || userData?.role === 'agentuser';

    if (isExternalOrAgent) {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: `/dashboard/${userData?.role?.replace('user', '')}` },
        { 
          icon: Trophy, 
          label: 'Paris Sport',
          subItems: [
            { icon: Clock, label: 'Paris en cours', path: '/dashboard/bets/active' },
            { icon: CheckCircle, label: 'Paris gagnés', path: '/dashboard/bets/won' },
            { icon: XCircle, label: 'Paris perdus', path: '/dashboard/bets/lost' },
            { icon: History, label: 'Historique', path: '/dashboard/bets/history' }
          ]
        },
        { icon: Wallet, label: 'Dépôt', path: '/deposit' },
        { icon: DollarSign, label: 'Retrait', path: '/withdraw' },
        { icon: History, label: 'Transactions', path: '/transactions' },
        { icon: Users, label: 'Parrainage', path: '/referral' },
        { icon: Gift, label: 'Bonus', path: '/bonus' },
        { icon: Lock, label: 'Sécurité', path: '/security' },
        { icon: UserCircle, label: 'Profile', path: '/profile' }
      ];
    }

    return [
      { icon: LayoutDashboard, label: 'Dashboard', path: `/dashboard/${userData?.role?.replace('user', '')}` },
      { icon: Users, label: 'Clients', path: `/dashboard/${userData?.role?.replace('user', '')}/clients` },
      { icon: History, label: 'Historique', path: `/dashboard/${userData?.role?.replace('user', '')}/history` },
      { icon: Settings, label: 'Paramètres', path: `/dashboard/${userData?.role?.replace('user', '')}/settings` },
    ];
  };

  const menuItems = getMenuItems();

  const toggleSubMenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out">
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <Logo />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        <nav className="p-4">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-2">
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleSubMenu(item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-200 ${
                        expandedMenu === item.label ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-200 ${
                      expandedMenu === item.label ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="ml-4 pl-4 border-l border-gray-200 space-y-1 py-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.path}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                              isActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`
                          }
                        >
                          <subItem.icon className="w-4 h-4" />
                          {subItem.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  );
}