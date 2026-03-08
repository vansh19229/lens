import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumb = ({ items }) => (
  <nav className="flex items-center gap-1 text-sm text-white/30 mb-5">
    {items.map((item, i) => (
      <span key={i} className="flex items-center gap-1">
        {i > 0 && <FiChevronRight size={13} className="text-white/20" />}
        {item.href ? (
          <Link to={item.href} className="hover:text-white/60 transition-colors duration-200">{item.label}</Link>
        ) : (
          <span className="text-white/60 font-medium capitalize">{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;

