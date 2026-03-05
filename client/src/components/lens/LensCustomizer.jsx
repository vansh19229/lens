import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiCheck } from 'react-icons/fi';
import Modal from '../ui/Modal';
import { formatPrice, LENS_PRICES } from '../../utils/helpers';

const STEPS = ['Prescription', 'Lens Type', 'Material', 'Coatings', 'Review'];

const LENS_TYPES = [
  { id: 'singleVision', label: 'Single Vision', desc: 'For distance or near correction', price: LENS_PRICES.lensType.singleVision },
  { id: 'bifocal', label: 'Bifocal', desc: 'Two viewing zones in one lens', price: LENS_PRICES.lensType.bifocal },
  { id: 'progressive', label: 'Progressive', desc: 'Seamless multi-zone correction', price: LENS_PRICES.lensType.progressive },
];

const MATERIALS = [
  { id: 'plastic', label: 'Plastic', desc: 'Standard, lightweight', price: LENS_PRICES.material.plastic },
  { id: 'polycarbonate', label: 'Polycarbonate', desc: 'Impact resistant, ideal for sports', price: LENS_PRICES.material.polycarbonate },
  { id: 'highIndex', label: 'High Index', desc: 'Thinnest lenses, for strong prescriptions', price: LENS_PRICES.material.highIndex },
];

const COATINGS = [
  { id: 'antiGlare', label: 'Anti-Glare', desc: 'Reduces reflections & eye strain', price: LENS_PRICES.coatings.antiGlare },
  { id: 'blueLightFilter', label: 'Blue Light Filter', desc: 'Protects from digital screen light', price: LENS_PRICES.coatings.blueLightFilter },
  { id: 'uvProtection', label: 'UV Protection', desc: 'Shields eyes from UV rays', price: LENS_PRICES.coatings.uvProtection },
  { id: 'scratchResistant', label: 'Scratch Resistant', desc: 'Harder coating for durability', price: LENS_PRICES.coatings.scratchResistant },
];

const LensCustomizer = ({ isOpen, onClose, framePrice, onAddToCart }) => {
  const [step, setStep] = useState(0);
  const [prescription, setPrescription] = useState({
    rightEye: { sph: '', cyl: '', axis: '' },
    leftEye: { sph: '', cyl: '', axis: '' },
    pd: '',
  });
  const [noPrescription, setNoPrescription] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [lensType, setLensType] = useState('singleVision');
  const [material, setMaterial] = useState('plastic');
  const [coatings, setCoatings] = useState([]);

  const toggleCoating = (id) => {
    setCoatings(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const lensPrice =
    (LENS_PRICES.lensType[lensType] || 0) +
    (LENS_PRICES.material[material] || 0) +
    coatings.reduce((a, c) => a + (LENS_PRICES.coatings[c] || 0), 0);

  const totalPrice = framePrice + lensPrice;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setPrescriptionFile(file);
    } else if (file) {
      alert('File size must be under 5MB');
    }
  };

  const handleAddToCart = () => {
    const customization = {
      lensType: LENS_TYPES.find(l => l.id === lensType)?.label,
      material: MATERIALS.find(m => m.id === material)?.label,
      coatings: COATINGS.filter(c => coatings.includes(c.id)).map(c => c.label),
      prescription: noPrescription ? null : prescription,
      lensPrice,
    };
    onAddToCart(customization);
    onClose();
  };

  const PrescriptionField = ({ eye, field }) => (
    <input
      type="number"
      step="0.25"
      placeholder={field.toUpperCase()}
      value={prescription[eye][field]}
      onChange={(e) =>
        setPrescription(prev => ({
          ...prev,
          [eye]: { ...prev[eye], [field]: e.target.value },
        }))
      }
      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
    />
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => i < step && setStep(i)}
                className={`text-xs font-medium transition-colors ${
                  i === step ? 'text-blue-600' : i < step ? 'text-green-600 cursor-pointer' : 'text-gray-400'
                }`}
              >
                {i < step ? '✓' : i + 1}. {s}
              </button>
            ))}
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step 1: Prescription */}
            {step === 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Enter Your Prescription</h3>
                <p className="text-sm text-gray-500 mb-4">Fill in your eye prescription details below</p>
                {!noPrescription && (
                  <div className="space-y-4">
                    {[['rightEye', 'Right Eye (OD)'], ['leftEye', 'Left Eye (OS)']].map(([eye, label]) => (
                      <div key={eye}>
                        <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {['sph', 'cyl', 'axis'].map(field => (
                            <div key={field}>
                              <p className="text-xs text-gray-400 mb-1 text-center">{field.toUpperCase()}</p>
                              <PrescriptionField eye={eye} field={field} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">PD (Pupillary Distance)</p>
                      <input
                        type="number"
                        step="0.5"
                        placeholder="e.g. 64"
                        value={prescription.pd}
                        onChange={(e) => setPrescription(prev => ({ ...prev, pd: e.target.value }))}
                        className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                      />
                    </div>
                    <div className="border border-dashed border-gray-300 rounded-xl p-4 text-center">
                      <label className="cursor-pointer">
                        <FiUpload className="mx-auto mb-2 text-gray-400" size={24} />
                        <p className="text-sm text-gray-600">Or upload prescription file</p>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF (max 5MB)</p>
                        <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileUpload} className="hidden" />
                        {prescriptionFile && (
                          <p className="text-xs text-green-600 mt-2 font-medium">✓ {prescriptionFile.name}</p>
                        )}
                      </label>
                    </div>
                  </div>
                )}
                <label className="flex items-center gap-2 mt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noPrescription}
                    onChange={(e) => setNoPrescription(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span className="text-sm text-gray-600">I don't have my prescription yet</span>
                </label>
              </div>
            )}

            {/* Step 2: Lens Type */}
            {step === 1 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Choose Lens Type</h3>
                <p className="text-sm text-gray-500 mb-4">Select the type that best suits your needs</p>
                <div className="space-y-3">
                  {LENS_TYPES.map(lt => (
                    <button
                      key={lt.id}
                      onClick={() => setLensType(lt.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        lensType === lt.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{lt.label}</p>
                        <p className="text-sm text-gray-500">{lt.desc}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-blue-600">{formatPrice(lt.price)}</span>
                        {lensType === lt.id && <FiCheck className="text-blue-500" size={18} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Material */}
            {step === 2 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Choose Lens Material</h3>
                <p className="text-sm text-gray-500 mb-4">Material affects thickness, weight and impact resistance</p>
                <div className="space-y-3">
                  {MATERIALS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setMaterial(m.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        material === m.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{m.label}</p>
                        <p className="text-sm text-gray-500">{m.desc}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-blue-600">{m.price === 0 ? 'Free' : formatPrice(m.price)}</span>
                        {material === m.id && <FiCheck className="text-blue-500" size={18} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Coatings */}
            {step === 3 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Add Lens Coatings</h3>
                <p className="text-sm text-gray-500 mb-4">Select one or more coatings to enhance your lenses</p>
                <div className="space-y-3">
                  {COATINGS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => toggleCoating(c.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        coatings.includes(c.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          coatings.includes(c.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                        }`}>
                          {coatings.includes(c.id) && <FiCheck size={12} className="text-white" />}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{c.label}</p>
                          <p className="text-sm text-gray-500">{c.desc}</p>
                        </div>
                      </div>
                      <span className="font-bold text-blue-600">+{formatPrice(c.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {step === 4 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Review Your Selection</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Lens Type</span>
                    <span className="font-medium">{LENS_TYPES.find(l => l.id === lensType)?.label} — {formatPrice(LENS_PRICES.lensType[lensType])}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Material</span>
                    <span className="font-medium">{MATERIALS.find(m => m.id === material)?.label} — {material === 'plastic' ? 'Free' : formatPrice(LENS_PRICES.material[material])}</span>
                  </div>
                  {coatings.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Coatings</span>
                      <div className="text-right">
                        {COATINGS.filter(c => coatings.includes(c.id)).map(c => (
                          <p key={c.id} className="font-medium">{c.label} — +{formatPrice(c.price)}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Frame</span>
                      <span className="font-medium">{formatPrice(framePrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Lenses</span>
                      <span className="font-medium">{formatPrice(lensPrice)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base mt-2 text-gray-900">
                      <span>Total</span>
                      <span className="text-blue-600">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => step > 0 ? setStep(step - 1) : onClose()}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {step === 0 ? 'Cancel' : '← Back'}
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity"
            >
              Add to Cart — {formatPrice(totalPrice)}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default LensCustomizer;
