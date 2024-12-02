import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
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
  ChevronDown,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign
} from 'lucide-react';
import Logo from './Logo';

interface SubMenuItem {
  icon: any;
  label: string;
  path: string;
}

interface MenuItem {
  icon: any;
  label: string;
  path?: string;
  subMenu?: SubMenuItem[];
}

export default function Sidebar() {
  const { logout, userData } = useAuth();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const getMenuItems = (): MenuItem[] => {
    const isExternalOrAgent = userData?.role === 'externaluser' || userData?.role === 'agentuser';

    if (isExternalOrAgent) {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: `/dashboard/${userData?.role?.replace('user', '')}` },
        { 
          icon: Trophy, 
          label: 'Paris Sport',
          subMenu: [
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

    // Retourner le menu par défaut pour les autres rôles
    return [
      { icon: LayoutDashboard, label: 'Dashboard', path: `/dashboard/${userData?.role?.replace('user', '')}` },
      { icon: Users, label: 'Clients', path: `/dashboard/${userData?.role?.replace('user', '')}/clients` },
      { icon: History, label: 'Historique', path: `/dashboard/${userData?.role?.replace('user', '')}/history` },
      { icon: Settings, label: 'Paramètres', path: `/dashboard/${userData?.role?.replace('user', '')}/settings` },
    ];
  };

  const menuItems = getMenuItems();

  const toggleSubMenu = (label: string) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  return (
    <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0">
      <div className="p-4 border-b">
        <Logo />
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.subMenu ? (
                <>
                  <button
                    onClick={() => toggleSubMenu(item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openSubMenu === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {openSubMenu === item.label && (
                    <div className="ml-4 pl-4 border-l border-gray-200 space-y-1 mt-1">
                      {item.subMenu.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                              isActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`
                          }
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span className="font-medium text-sm">{subItem.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path!}
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
        </div>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
}