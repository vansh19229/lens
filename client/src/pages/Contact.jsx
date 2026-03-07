import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: '', email: '', subject: '', message: '' });
    setSending(false);
  };

  const inputClass = "w-full px-4 py-3 glass-card text-white text-sm placeholder-white/20 border border-white/08 rounded-xl transition-all duration-200";

  return (
    <div className="bg-[#080808] min-h-screen">
      {/* Hero */}
      <section className="relative py-24 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0f1b3d_0%,_#080808_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4">Get In Touch</p>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Contact <span className="gradient-text-blue">Us</span></h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">We'd love to hear from you. Our team is always here to help.</p>
        </motion.div>
      </section>

      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: FiPhone, title: 'Phone', info: '+91 800 123 4567', sub: 'Mon-Sat, 9AM-7PM', color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { icon: FiMail, title: 'Email', info: 'support@lensmaster.in', sub: '24hr response time', color: 'text-violet-400', bg: 'bg-violet-500/10' },
              { icon: FiMapPin, title: 'Address', info: '42 Vision Park, MG Road', sub: 'Bengaluru - 560001', color: 'text-teal-400', bg: 'bg-teal-500/10' },
            ].map(({ icon: Icon, title, info, sub, color, bg }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-5 flex gap-4"
              >
                <div className={`w-11 h-11 ${bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <Icon size={19} className={color} />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{title}</p>
                  <p className="text-sm text-white/50">{info}</p>
                  <p className="text-xs text-white/25 mt-0.5">{sub}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card p-5 border border-blue-500/20"
            >
              <h3 className="font-bold text-white mb-2.5 text-sm">🕐 Business Hours</h3>
              <p className="text-sm text-white/40">Mon – Sat: 9:00 AM – 7:00 PM</p>
              <p className="text-sm text-white/40 mt-1">Sunday: 10:00 AM – 4:00 PM</p>
            </motion.div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-7"
            >
              <h2 className="text-xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                    { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-white/50 mb-2">{label}</label>
                      <input
                        type={type}
                        required
                        value={form[key]}
                        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-2">Subject</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    required
                    className={inputClass}
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    <option value="" style={{ background: '#1a1a1a' }}>Select a subject</option>
                    {['Order Issue', 'Product Enquiry', 'Return/Exchange', 'Prescription Help', 'Other'].map(o => (
                      <option key={o} style={{ background: '#1a1a1a' }}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us how we can help you..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={sending}
                  className="flex items-center gap-2 px-7 py-3 bg-blue-600 text-white font-semibold rounded-xl btn-glow transition-all duration-300 disabled:opacity-50 text-sm"
                >
                  {sending ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FiSend size={15} />
                  )}
                  {sending ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

