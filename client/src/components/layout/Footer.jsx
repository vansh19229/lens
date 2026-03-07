import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const footerLinks = {
  Shop: [
    { label: 'Eyeglasses', to: '/products?category=eyeglasses' },
    { label: 'Sunglasses', to: '/products?category=sunglasses' },
    { label: 'Contact Lenses', to: '/products?category=contact-lenses' },
    { label: 'New Arrivals', to: '/products?sort=newest' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Careers', to: '/about' },
    { label: 'Blog', to: '/about' },
  ],
  Support: [
    { label: 'FAQ', to: '/contact' },
    { label: 'Shipping Policy', to: '/contact' },
    { label: 'Returns', to: '/contact' },
    { label: 'Track Order', to: '/profile' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-base">👁</span>
              </div>
              <span className="font-bold text-white text-xl">
                Lens<span className="text-blue-400">Master</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Your trusted destination for premium eyewear. Discover thousands of styles crafted for comfort, clarity, and style.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: FiInstagram, href: '#', label: 'Instagram' },
                { icon: FiTwitter, href: '#', label: 'Twitter' },
                { icon: FiFacebook, href: '#', label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-6">
              {[
                { icon: FiMail, text: 'support@lensmaster.in' },
                { icon: FiPhone, text: '+91 98765 43210' },
                { icon: FiMapPin, text: 'Mumbai, Maharashtra, India' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-slate-400">
                  <Icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Lens Master. All rights reserved. GST: 27AABCU9603R1ZX
          </p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <span className="text-slate-700">·</span>
            <Link to="/contact" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
