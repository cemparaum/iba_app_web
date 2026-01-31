
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarRange, 
  CheckCircle2, 
  MessageSquare, 
  Settings, 
  LogOut,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
import { Role } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: Role;
  setUserRole: (role: Role) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, userRole, setUserRole }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: [Role.PASTOR, Role.ADMIN, Role.LEADER] },
    { id: 'members', label: 'Membros', icon: Users, roles: [Role.PASTOR, Role.ADMIN] },
    { id: 'scales', label: 'Escalas', icon: CalendarRange, roles: [Role.PASTOR, Role.ADMIN, Role.LEADER] },
    { id: 'attendance', label: 'Frequência', icon: CheckCircle2, roles: [Role.ADMIN, Role.LEADER] },
    { id: 'notifications', label: 'Notificações', icon: MessageSquare, roles: [Role.ADMIN] },
  ].filter(item => item.roles.includes(userRole));

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-50 transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">EcclesiaPro</h1>
            </div>
            <button className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase px-3">Ambiente</p>
              <select 
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as Role)}
                className="w-full bg-slate-100 dark:bg-slate-700 border-none rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value={Role.PASTOR}>Visão Pastor</option>
                <option value={Role.ADMIN}>Visão Admin</option>
                <option value={Role.LEADER}>Visão Líder</option>
              </select>
            </div>
            <button 
              onClick={toggleDarkMode}
              className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <header className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-30">
          <div className="px-4 h-16 flex items-center justify-between">
            <button 
              className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-400"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center gap-4 ml-auto">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">Administrador</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{userRole.toLowerCase()}</p>
              </div>
              <img 
                src="https://picsum.photos/seed/admin/100" 
                alt="Profile" 
                className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
