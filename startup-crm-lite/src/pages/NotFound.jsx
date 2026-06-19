import { Link } from 'react-router-dom';
import { Compass, MoveLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* Decorative Gradient Background Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Floating Icon Container */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary/10 to-blue-500/10 flex items-center justify-center border border-primary/20 dark:border-primary/30 animate-bounce shadow-xl shadow-primary/5">
          <Compass className="w-12 h-12 text-primary" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-danger flex items-center justify-center text-white text-[10px] font-bold shadow-md shadow-danger/25">
          404
        </div>
      </div>

      {/* Text Info */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
        Page Not Found
      </h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-md text-base md:text-lg mb-8 leading-relaxed">
        It looks like you've wandered off the track. The page you are looking for doesn't exist or has been relocated.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 group focus:outline-none focus:ring-2 focus:ring-primary/25"
      >
        <MoveLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
        <span>Back to Dashboard</span>
      </Link>
    </div>
  );
}
