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

  const handleWhatsAppRedirect = (village: 'Pagutan' | 'Bujak') => {
    const phone = village === 'Pagutan' ? '6281912345678' : '6281987654321';
    const text = encodeURIComponent(`Halo Admin Desa ${village}, saya ingin berkonsultasi mengenai pelayanan masyarakat...`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="py-10 space-y-10">
      {/* Banner Header */}
      <section className="bg-slate-900 text-white py-12 px-4 border-b-4 border-emerald-600">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold mb-3">
            <Phone className="w-3.5 h-3.5" /> Pusat Kontak & Layanan Aspirasi
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Hubungi Pemerintahan Desa</h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto">
            Sampaikan pertanyaan, aspirasi, atau kendala pelayanan Anda secara langsung melalui loket WhatsApp resmi maupun formulir kontak online.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl space-y-12">
        {/* Quick WhatsApp Access Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-900 text-white p-6 rounded-3xl shadow-lg flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Layanan Langsung</span>
              <h3 className="font-extrabold text-lg">WhatsApp Desa Pagutan</h3>
              <p className="text-xs text-emerald-100 mt-1">Konsultasi cepat dengan petugas loket Pagutan</p>
            </div>
            <button
              onClick={() => handleWhatsAppRedirect('Pagutan')}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" /> Hubungi WA
            </button>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Layanan Langsung</span>
              <h3 className="font-extrabold text-lg">WhatsApp Desa Bujak</h3>
              <p className="text-xs text-slate-300 mt-1">Konsultasi cepat dengan petugas loket Bujak</p>
            </div>
            <button
              onClick={() => handleWhatsAppRedirect('Bujak')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" /> Hubungi WA
            </button>
          </div>
        </div>

        {/* Contact Details & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Details */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
            <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">Alamat & Sekretariat</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Kantor Desa Pagutan</h5>
                  <p className="text-slate-500 mt-0.5">Jl. Raya Pagutan No. 1, Kec. Batukliang, Kab. Lombok Tengah, NTB (83552)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Kantor Desa Bujak</h5>
                  <p className="text-slate-500 mt-0.5">Jl. Raya Bujak Batukliang, Kab. Lombok Tengah, NTB (83552)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Email Resmi</h5>
                  <p className="text-slate-500">layanan@smartvillage-batukliang.desa.id</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Jam Layanan Loket</h5>
                  <p className="text-slate-500">Senin - Jumat: 08:00 - 15:30 WITA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Form */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-soft">
            <h3 className="font-bold text-slate-900 text-lg mb-1">Formulir Pesan & Pengaduan Warga</h3>
            <p className="text-xs text-slate-500 mb-6">Kirimkan masukan atau pertanyaan langsung ke sekretariat desa.</p>

            {sentSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">Pesan Anda Berhasil Terkirim!</h4>
                <p className="text-xs text-slate-600">Tim sekretariat desa akan merespons melalui email atau WhatsApp yang Anda daftarkan.</p>
                <button onClick={() => setSentSuccess(false)} className="mt-2 text-xs font-semibold text-emerald-700 hover:underline">Kirim Pesan Lain</button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor HP / WA</label>
                    <input
                      type="tel"
                      placeholder="0812xxxx"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subjek / Judul Pesan</label>
                  <input
                    type="text"
                    placeholder="Contoh: Pertanyaan Syarat SKU"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Isi Pesan / Aspirasi *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan isi pesan Anda secara rinci..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
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
