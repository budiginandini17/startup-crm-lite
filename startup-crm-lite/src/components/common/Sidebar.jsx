import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, Menu, X, Sparkles } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Leads', path: '/leads', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
      isActive
        ? 'bg-primary text-white shadow-lg shadow-blue-500/20'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/60'
    }`;

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="flex md:hidden items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-40 w-full">
        <div className="flex items-center gap-2">
          <div className="p-2.5 bg-gradient-to-tr from-primary to-blue-400 rounded-xl text-white shadow-md shadow-blue-500/10">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <span className="font-semibold text-lg bg-gradient-to-r from-slate-900 via-blue-900 to-primary bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-blue-400">
            CRM Lite
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 md:w-72 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between py-6 px-4 z-50 transition-all duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Logo Section */}
          <div className="flex items-center gap-3 px-3">
            <div className="p-2.5 bg-gradient-to-tr from-primary to-blue-400 rounded-xl text-white shadow-md shadow-blue-500/10">
              <Sparkles size={22} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                CRM Lite
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Startup Accelerator
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeSidebar}
                className={navLinkClass}
              >
                <item.icon
                  size={20}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer Card / User Info */}
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-semibold shadow-md shadow-blue-500/15">
                JD
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                  John Doe
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                  john@startup.co
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
