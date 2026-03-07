import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiHeart, FiZap, FiGlobe } from 'react-icons/fi';

const stats = [
  { value: '2020', label: 'Founded', icon: '🚀' },
  { value: '50K+', label: 'Happy Customers', icon: '😊' },
  { value: '1000+', label: 'Styles', icon: '👓' },
  { value: '15+', label: 'Cities Served', icon: '🏙️' },
];

const values = [
  { icon: FiStar, title: 'Quality First', desc: 'Every product meets our rigorous standards for clarity, durability, and comfort.', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  { icon: FiZap, title: 'Innovation', desc: 'We continuously evolve with the latest lens technology and frame designs.', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { icon: FiGlobe, title: 'Accessibility', desc: 'Premium eyewear at honest prices — vision care for everyone.', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { icon: FiHeart, title: 'Sustainability', desc: 'Eco-friendly materials and packaging for a greener tomorrow.', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20' },
];

const team = [
  { name: 'Arjun Sharma', role: 'Co-Founder & CEO', emoji: '👨‍💼', bio: 'Optical industry veteran with 15+ years of experience' },
  { name: 'Priya Patel', role: 'Head of Design', emoji: '👩‍🎨', bio: 'Fashion designer turned eyewear innovator' },
  { name: 'Rohan Mehta', role: 'CTO', emoji: '👨‍💻', bio: 'Tech entrepreneur passionate about vision care' },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/20 dark:to-purple-950/20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 border border-blue-200 dark:border-blue-800/50">
              Our Story
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Redefining How India
              <br />
              <span className="gradient-text">Sees the World</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              LensMaster was born from a simple belief — everyone deserves clear, stylish vision without compromising on quality or affordability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">Our Mission</p>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Making premium vision care accessible to all
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                We started in 2020 with a mission to democratize eyewear in India. We partnered with the world's leading lens manufacturers to bring you certified, high-quality eyewear at transparent prices.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Today, we serve 50,000+ customers across India, offering 1000+ styles from prescription glasses to designer sunglasses — all with our signature commitment to quality and care.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-10 text-white"
            >
              <div className="text-7xl mb-6">👁️</div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-blue-100 leading-relaxed text-lg">
                A world where every person can access the perfect pair of glasses — beautifully crafted, precisely fitted, and affordably priced.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[{ v: '100%', l: 'Authentic' }, { v: '30-day', l: 'Returns' }, { v: 'Free', l: 'Support' }, { v: '2-day', l: 'Delivery' }].map(({ v, l }) => (
                  <div key={l} className="bg-white/10 rounded-2xl p-4 text-center border border-white/10">
                    <div className="font-bold text-lg">{v}</div>
                    <div className="text-blue-200 text-xs mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">Our Core Values</h2>
            <p className="text-slate-500 dark:text-slate-400">The principles that guide everything we do</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800"
              >
                <div className={`w-12 h-12 ${v.bg} rounded-2xl flex items-center justify-center mb-4`}>
                  <v.icon className={`w-5 h-5 ${v.color}`} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">Meet the Team</h2>
            <p className="text-slate-500 dark:text-slate-400">The passionate people behind LensMaster</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">{member.role}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Vision?</h2>
          <p className="text-blue-100 mb-8">Join 50,000+ happy customers and find your perfect pair</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Shop Now <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
