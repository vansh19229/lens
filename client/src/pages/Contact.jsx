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
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setSending(false);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-purple-900 py-16 text-white text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-extrabold mb-3">Contact Us</h1>
          <p className="text-white/75">We'd love to hear from you. Our team is always here to help.</p>
        </motion.div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-5">
            {[
              { icon: FiPhone, title: 'Phone', info: '+91 800 123 4567', sub: 'Mon-Sat, 9AM-7PM' },
              { icon: FiMail, title: 'Email', info: 'support@lensmaster.in', sub: '24hr response time' },
              { icon: FiMapPin, title: 'Address', info: '42 Vision Park, MG Road', sub: 'Bengaluru - 560001' },
            ].map(({ icon: Icon, title, info, sub }) => (
              <div key={title} className="bg-white rounded-2xl p-5 shadow-sm flex gap-4">
                <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{title}</p>
                  <p className="text-sm text-gray-700">{info}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              </div>
            ))}
            <div className="bg-blue-600 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-2">🕐 Business Hours</h3>
              <p className="text-sm text-white/80">Mon – Sat: 9:00 AM – 7:00 PM</p>
              <p className="text-sm text-white/80">Sunday: 10:00 AM – 4:00 PM</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                    { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                      <input
                        type={type}
                        required
                        value={form[key]}
                        onChange={e => setForm(p => ({...p, [key]: e.target.value}))}
                        placeholder={placeholder}
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm(p => ({...p, subject: e.target.value}))}
                    required
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option>Order Issue</option>
                    <option>Product Enquiry</option>
                    <option>Return/Exchange</option>
                    <option>Prescription Help</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(p => ({...p, message: e.target.value}))}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={sending}
                  className="flex items-center gap-2 px-7 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {sending ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiSend size={16} />}
                  {sending ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
