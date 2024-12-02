import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import Header from './Header';
import MobileMenu from './MobileMenu';
import MobileNavigation from './MobileNavigation';
import { Menu } from 'lucide-react';

export default function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onToggleBetSlip={() => {}} showBetSlip={false} />
      
      {/* Bouton Menu Hamburger - Visible uniquement sur mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-3 left-4 z-50 p-2 rounded-lg bg-gray-900 text-white"
        aria-label="Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Menu Mobile */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 lg:ml-64 pt-16 pb-20">
          <Outlet />
        </div>
      </div>

      {/* Navigation mobile unifiée */}
      <MobileNavigation />
    </div>
  );
}