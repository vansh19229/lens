import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiGlobe, FiHeart } from 'react-icons/fi';

const TEAM = [
  { name: 'Arjun Mehta', role: 'Founder & CEO', emoji: '👨‍💼' },
  { name: 'Priya Nair', role: 'Head of Design', emoji: '👩‍🎨' },
  { name: 'Rohan Kapoor', role: 'Optical Expert', emoji: '👨‍⚕️' },
];

const STATS = [
  { icon: FiUsers, label: 'Happy Customers', value: '50,000+', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: FiAward, label: 'Years of Excellence', value: '8+', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: FiGlobe, label: 'Cities Served', value: '200+', color: 'text-teal-400', bg: 'bg-teal-500/10' },
  { icon: FiHeart, label: 'Styles Available', value: '1,000+', color: 'text-violet-400', bg: 'bg-violet-500/10' },
];

const About = () => (
  <div className="bg-[#080808] min-h-screen">
    {/* Hero */}
    <section className="relative py-28 text-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0f1b3d_0%,_#080808_60%)]" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full glow-pulse"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)' }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
        <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4">Our Story</p>
        <h1 className="text-5xl font-black text-white mb-5 tracking-tight">About Lens<span className="gradient-text-blue">Master</span></h1>
        <p className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
          Crafting clear vision and confident style for over 8 years. We believe everyone deserves perfect eyewear.
        </p>
      </motion.div>
    </section>

    {/* Mission */}
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-lg text-white/50 leading-relaxed mb-5">
            At Lens Master, we're on a mission to make premium eyewear accessible to everyone in India. 
            We combine cutting-edge lens technology with beautiful frame designs to deliver the perfect blend of style and vision care.
          </p>
          <p className="text-white/35 leading-relaxed">
            Founded in 2016 in Bengaluru, we've grown from a small optical shop to India's leading online eyewear destination, 
            serving over 50,000 satisfied customers across 200+ cities.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 bg-[#080808]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card p-6 text-center"
            >
              <div className={`w-11 h-11 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <s.icon size={20} className={s.color} />
              </div>
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-sm text-white/35 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">People</p>
        <h2 className="text-3xl font-bold text-white mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card p-7"
            >
              <div className="text-5xl mb-5">{m.emoji}</div>
              <h3 className="font-bold text-white mb-1">{m.name}</h3>
              <p className="text-sm text-white/40">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-20 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { icon: '🎯', title: 'Quality First', desc: 'We never compromise on the quality of our products and services.' },
            { icon: '💡', title: 'Innovation', desc: 'Constantly pushing boundaries in eyewear technology and customer experience.' },
            { icon: '🤝', title: 'Accessibility', desc: 'Making premium eyewear affordable for everyone across India.' },
            { icon: '🌱', title: 'Sustainability', desc: 'Committed to eco-friendly practices and sustainable packaging.' },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 glass-card p-5"
            >
              <span className="text-3xl flex-shrink-0">{v.icon}</span>
              <div>
                <h3 className="font-bold text-white mb-1">{v.title}</h3>
                <p className="text-sm text-white/40">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;

