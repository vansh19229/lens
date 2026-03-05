import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">👁</span>
              </div>
              <span className="text-xl font-bold text-white">Lens Master</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Premium eyewear crafted for the modern lifestyle. See clearly, live confidently.
            </p>
            <div className="flex gap-3">
              {[FiFacebook, FiInstagram, FiTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Eyeglasses', href: '/products?category=eyeglasses' },
                { label: 'Sunglasses', href: '/products?category=sunglasses' },
                { label: 'Contact Lenses', href: '/products?category=contact-lenses' },
                { label: 'All Products', href: '/products' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Careers', href: '/about' },
                { label: 'Blog', href: '/about' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold mt-6 mb-4">Support</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'FAQ', href: '/contact' },
                { label: 'Returns', href: '/contact' },
                { label: 'Shipping', href: '/contact' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <FiMapPin size={16} className="mt-0.5 text-blue-400 flex-shrink-0" />
                <span>42 Vision Park, MG Road, Bengaluru - 560001</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <FiPhone size={16} className="text-blue-400 flex-shrink-0" />
                <a href="tel:+918001234567" className="hover:text-white transition-colors">+91 800 123 4567</a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <FiMail size={16} className="text-blue-400 flex-shrink-0" />
                <a href="mailto:support@lensmaster.in" className="hover:text-white transition-colors">support@lensmaster.in</a>
              </li>
            </ul>
            <div className="mt-5 p-3 bg-gray-800 rounded-xl">
              <p className="text-xs text-gray-400">GST: <span className="text-gray-300">29AADCL1234A1Z1</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">© 2024 Lens Master. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/about" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/about" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
