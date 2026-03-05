import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiGlobe, FiHeart } from 'react-icons/fi';

const TEAM = [
  { name: 'Arjun Mehta', role: 'Founder & CEO', emoji: '👨‍💼' },
  { name: 'Priya Nair', role: 'Head of Design', emoji: '👩‍🎨' },
  { name: 'Rohan Kapoor', role: 'Optical Expert', emoji: '👨‍⚕️' },
];

const STATS = [
  { icon: FiUsers, label: 'Happy Customers', value: '50,000+' },
  { icon: FiAward, label: 'Years of Excellence', value: '8+' },
  { icon: FiGlobe, label: 'Cities Served', value: '200+' },
  { icon: FiHeart, label: 'Styles Available', value: '1,000+' },
];

const About = () => (
  <div>
    {/* Hero */}
    <section className="bg-gradient-to-br from-blue-900 to-purple-900 py-20 text-white text-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-5xl font-extrabold mb-4">About Lens Master</h1>
        <p className="text-xl text-white/75 max-w-2xl mx-auto">
          Crafting clear vision and confident style for over 8 years. We believe everyone deserves perfect eyewear.
        </p>
      </motion.div>
    </section>

    {/* Mission */}
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            At Lens Master, we're on a mission to make premium eyewear accessible to everyone in India. 
            We combine cutting-edge lens technology with beautiful frame designs to deliver the perfect blend of style and vision care.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Founded in 2016 in Bengaluru, we've grown from a small optical shop to India's leading online eyewear destination, 
            serving over 50,000 satisfied customers across 200+ cities.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <s.icon size={22} className="text-blue-600" />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <div className="text-5xl mb-4">{m.emoji}</div>
              <h3 className="font-bold text-gray-900">{m.name}</h3>
              <p className="text-sm text-gray-500">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: '🎯', title: 'Quality First', desc: 'We never compromise on the quality of our products and services.' },
            { icon: '💡', title: 'Innovation', desc: 'Constantly pushing boundaries in eyewear technology and customer experience.' },
            { icon: '🤝', title: 'Accessibility', desc: 'Making premium eyewear affordable for everyone across India.' },
            { icon: '🌱', title: 'Sustainability', desc: 'Committed to eco-friendly practices and sustainable packaging.' },
          ].map((v) => (
            <div key={v.title} className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm">
              <span className="text-3xl">{v.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
