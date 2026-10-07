import React, { useState } from 'react';
import { BespokeAppointment } from '../types';
import { X, Calendar, Clock, Scissors, CheckCircle, MapPin, User, Phone, Mail } from 'lucide-react';

interface BespokeAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (appointment: BespokeAppointment) => void;
}

const SERVICES = [
  { id: 'bespoke_suit', title: 'Bespoke Suit & Tuxedo Fitting', duration: '90 mins' },
  { id: 'wedding_bandhgala', title: 'Wedding & Heritage Bandhgala Consultation', duration: '60 mins' },
  { id: 'linen_curation', title: 'Tropical European Linen Wardrobe', duration: '45 mins' },
  { id: 'alterations', title: 'Master Alterations & Silhouette Tuning', duration: '30 mins' },
];

const TIME_SLOTS = [
  '11:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
  '08:00 PM',
];

export default function BespokeAppointmentModal({
  isOpen,
  onClose,
  onBookingSuccess,
}: BespokeAppointmentModalProps) {
  if (!isOpen) return null;

  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[1]);
  const [customerName, setCustomerName] = useState('Siva Kumar');
  const [phone, setPhone] = useState('+91 98401 23456');
  const [email, setEmail] = useState('isrosiva00005@gmail.com');
  const [notes, setNotes] = useState('Wedding suit fitting for upcoming gala.');
  const [confirmed, setConfirmed] = useState<BespokeAppointment | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceObj = SERVICES.find((s) => s.id === selectedService);
    const appointment: BespokeAppointment = {
      id: `apt-${Date.now()}`,
      customerName,
      phone,
      email,
      service: serviceObj ? serviceObj.title : 'Bespoke Consultation',
      date,
      timeSlot,
      notes,
      status: 'Confirmed',
      createdAt: new Date().toLocaleTimeString(),
    };

    setConfirmed(appointment);
    onBookingSuccess(appointment);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#111111] border border-white/15 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl z-10 my-8">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2.5">
            <Scissors className="w-5 h-5 text-[#c5a059]" />
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">
              Bespoke Fitting Room Reservation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
                Fitting Room Confirmed
              </span>
              <h4 className="font-display text-2xl font-bold text-white mt-1">
                We await your arrival, {confirmed.customerName}
              </h4>
            </div>

            <div className="bg-zinc-950 p-5 rounded-xl border border-white/10 text-left text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-zinc-400">Atelier Location</span>
                <span className="text-white font-medium">Phase 2, Second Floor, Spencer Plaza</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Service</span>
                <span className="text-white font-medium">{confirmed.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Appointment Slot</span>
                <span className="text-[#c5a059] font-mono font-bold">
                  {confirmed.date} · {confirmed.timeSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Master Cutter</span>
                <span className="text-zinc-300">Mr. T. Srinivasan (Head Tailor)</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400">
              Complimentary valet parking tokens provided at Gate 3 on Anna Salai.
            </p>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded hover:bg-[#c5a059] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-lg border border-white/5">
              <MapPin className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Private VIP fitting lounge at Spencer Plaza, Anna Salai, Chennai.</span>
            </div>

            {/* Service Selection */}
            <div>
              <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-2">
                1. Select Atelier Consultation
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICES.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedService(srv.id)}
                    className={`p-3 rounded-lg border text-left text-xs transition-all ${
                      selectedService === srv.id
                        ? 'border-[#c5a059] bg-[#c5a059]/10 text-white'
                        : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold text-white truncate">{srv.title}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{srv.duration}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-1.5">
                  2. Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-1.5">
                  3. Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customer Contact */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block">
                4. Contact Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone (+91)"
                  className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specific measurements or event details (e.g. wedding on Dec 14th)"
                className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-white text-black hover:bg-[#c5a059] font-bold text-xs uppercase tracking-widest rounded-md transition-colors"
              >
                Confirm VIP Fitting Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
