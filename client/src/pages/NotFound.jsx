import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiSearch } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-9xl mb-6 inline-block animate-float"
        >
          👓
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-8xl font-black gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Page Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
            Looks like you've wandered off the path. The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <FiHome className="w-4 h-4" />
              Go Home
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
            >
              <FiSearch className="w-4 h-4" />
              Browse Products
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
