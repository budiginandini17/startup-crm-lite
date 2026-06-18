import { Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/common/Sidebar';
import { routes } from './routes';

// loading fallback component
const Loader = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
    <div className="w-10 h-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 animate-pulse">
      Loading layout...
    </span>
  </div>
);

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-roboto">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden min-h-screen flex flex-col">
          <div className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto relative z-10">
            <Suspense fallback={<Loader />}>
              <AppRoutes />
            </Suspense>
          </div>
        </main>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#FFFFFF',
            color: '#0F172A',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          success: {
            iconTheme: {
              primary: '#22C55E',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
