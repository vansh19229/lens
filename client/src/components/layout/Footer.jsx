import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#060606] border-t border-white/05">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                <span className="text-white text-xl">👁</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Lens<span className="text-blue-400">Master</span>
              </span>
            </Link>
            <p className="text-sm text-white/35 leading-relaxed mb-6">
              Premium eyewear crafted for the modern lifestyle. See clearly, live confidently.
            </p>
            <div className="flex gap-2.5">
              {[FiFacebook, FiInstagram, FiTwitter].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 glass-card rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:border-blue-500/30 transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm tracking-wide">Products</h3>
            <ul className="space-y-3">
              {[
                { label: 'Eyeglasses', href: '/products?category=eyeglasses' },
                { label: 'Sunglasses', href: '/products?category=sunglasses' },
                { label: 'Contact Lenses', href: '/products?category=contact-lenses' },
                { label: 'All Products', href: '/products' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href}
                    className="text-sm text-white/35 hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm tracking-wide">Company</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Careers', href: '/about' },
                { label: 'Blog', href: '/about' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href}
                    className="text-sm text-white/35 hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold mt-7 mb-5 text-sm tracking-wide">Support</h3>
            <ul className="space-y-3">
              {[
                { label: 'FAQ', href: '/contact' },
                { label: 'Returns', href: '/contact' },
                { label: 'Shipping', href: '/contact' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href}
                    className="text-sm text-white/35 hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm tracking-wide">Contact Us</h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm">
                <FiMapPin size={15} className="mt-0.5 text-blue-400 flex-shrink-0" />
                <span className="text-white/35">42 Vision Park, MG Road, Bengaluru — 560001</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiPhone size={15} className="text-blue-400 flex-shrink-0" />
                <a href="tel:+918001234567" className="text-white/35 hover:text-white transition-colors duration-200">+91 800 123 4567</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiMail size={15} className="text-blue-400 flex-shrink-0" />
                <a href="mailto:support@lensmaster.in" className="text-white/35 hover:text-white transition-colors duration-200">support@lensmaster.in</a>
              </li>
            </ul>
            <div className="mt-5 p-3 glass-card rounded-xl">
              <p className="text-xs text-white/25">GST: <span className="text-white/40">29AADCL1234A1Z1</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/05">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/20">© 2024 Lens Master. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/about" className="text-xs text-white/20 hover:text-white/50 transition-colors duration-200">Privacy Policy</Link>
            <Link to="/about" className="text-xs text-white/20 hover:text-white/50 transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

