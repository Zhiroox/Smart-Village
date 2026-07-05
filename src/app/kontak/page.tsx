'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function KontakPage() {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !message) return;
    setSentSuccess(true);
    setSenderName('');
    setSenderEmail('');
    setSenderPhone('');
    setSubject('');
    setMessage('');
  };

  const handleWhatsAppRedirect = () => {
    const phone = '6281912345678';
    const text = encodeURIComponent(`Halo Admin Desa Pagutan, saya ingin berkonsultasi mengenai pelayanan masyarakat...`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const inputClass = "w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all shadow-xs";
  const labelClass = "block text-xs font-semibold text-slate-700 mb-1.5";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner Header */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white text-slate-800 border-b border-slate-200/80">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-250 text-emerald-700 rounded-full text-xs font-semibold mb-5">
            <Phone className="w-3.5 h-3.5" /> Pusat Kontak &amp; Layanan Aspirasi
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Hubungi{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Pemerintah Desa
            </span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
            Sampaikan pertanyaan, aspirasi, atau kendala pelayanan Anda secara langsung melalui loket WhatsApp resmi maupun formulir kontak online.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-10 space-y-8">
        {/* Quick WhatsApp Access Button */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-slate-850 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-widest">Layanan WhatsApp Resmi</span>
              <h3 className="font-extrabold text-lg mt-0.5 text-slate-800">WhatsApp Center Desa Pagutan</h3>
              <p className="text-xs text-slate-500 mt-1">Layanan aduan dan konsultasi cepat bersama sekretariat desa</p>
            </div>
            <button
              onClick={handleWhatsAppRedirect}
              className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2 hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" /> Hubungi WhatsApp
            </button>
          </div>
        </div>

        {/* Contact Details & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Info Details */}
          <div className="lg:col-span-5 bg-white border border-slate-200 shadow-md p-6 md:p-8 rounded-3xl space-y-5">
            <h3 className="font-bold text-slate-800 text-lg pb-3 border-b border-slate-100">Alamat &amp; Sekretariat</h3>

            <div className="space-y-4 text-xs">
              {[
                { Icon: MapPin, color: 'bg-emerald-50 text-emerald-700 border border-emerald-100', title: 'Kantor Desa Pagutan', text: 'Jl. Raya Pagutan No. 1, Kec. Batukliang, Kab. Lombok Tengah, NTB (83552)' },
                { Icon: Phone, color: 'bg-blue-50 text-blue-700 border border-blue-100', title: 'WhatsApp Center', text: '+62 819-1234-5678' },
                { Icon: Mail, color: 'bg-purple-50 text-purple-700 border border-purple-100', title: 'Email Resmi', text: 'layanan@smartvillage-pagutan.desa.id' },
                { Icon: Clock, color: 'bg-amber-50 text-amber-700 border border-amber-100', title: 'Jam Layanan Loket', text: 'Senin - Jumat: 08:00 - 15:30 WITA' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center shrink-0 mt-0.5`}>
                    <item.Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">{item.title}</h5>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 shadow-md p-6 md:p-8 rounded-3xl">
            <h3 className="font-bold text-slate-800 text-lg mb-1">Formulir Pesan &amp; Pengaduan Warga</h3>
            <p className="text-xs text-slate-500 mb-6">Kirimkan masukan atau pertanyaan langsung ke sekretariat desa.</p>

            {sentSuccess ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-800 text-base">Pesan Anda Berhasil Terkirim!</h4>
                <p className="text-xs text-slate-655">Tim sekretariat desa akan merespons melalui email atau WhatsApp yang Anda daftarkan.</p>
                <button onClick={() => setSentSuccess(false)} className="mt-2 text-xs font-semibold text-emerald-650 hover:text-emerald-700 transition-colors">Kirim Pesan Lain</button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Nomor HP / WA</label>
                    <input
                      type="tel"
                      placeholder="0812xxxx"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Subjek / Judul Pesan</label>
                  <input
                    type="text"
                    placeholder="Contoh: Pertanyaan Syarat SKU"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Isi Pesan / Aspirasi *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan isi pesan Anda secara rinci..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" /> Kirim Pesan Sekarang
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
