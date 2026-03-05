import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumb = ({ items }) => (
  <nav className="flex items-center gap-1 text-sm text-gray-500 mb-4">
    {items.map((item, i) => (
      <span key={i} className="flex items-center gap-1">
        {i > 0 && <FiChevronRight size={14} />}
        {item.href ? (
          <Link to={item.href} className="hover:text-blue-600 transition-colors">{item.label}</Link>
        ) : (
          <span className="text-gray-900 font-medium">{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;
