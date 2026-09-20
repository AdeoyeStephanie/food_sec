'use client';

import React, { useState } from 'react';
import { Pantry, getUrgencyIndicator } from '@/lib/pantryData';
import { useNow } from '@/lib/useNow';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { Navigation, Phone, CheckCircle2, ShoppingBag, Clock, Languages, ShieldCheck, ThumbsUp, ThumbsDown, X, Bus, Accessibility, Sparkles } from 'lucide-react';

interface PantryDetailSheetProps {
  pantry: Pantry;
  language?: Language;
  onClose?: () => void;
}

export default function PantryDetailSheet({ pantry, language = 'en', onClose }: PantryDetailSheetProps) {
  const [feedbackSent, setFeedbackSent] = useState<string | null>(null);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const now = useNow();
  const urgency = getUrgencyIndicator(pantry, now);

  const getBandStyles = (band: 'plenty' | 'low' | 'out') => {
    switch (band) {
      case 'plenty':
        return {
          textColor: 'text-emerald-800 font-semibold',
          barColor: 'bg-emerald-700',
          label: t.plenty,
          bgLight: 'bg-emerald-50',
          border: 'border-emerald-200'
        };
      case 'low':
        return {
          textColor: 'text-amber-800 font-semibold',
          barColor: 'bg-amber-600',
          label: t.low,
          bgLight: 'bg-amber-50',
          border: 'border-amber-200'
        };
      case 'out':
        return {
          textColor: 'text-rose-700 font-semibold',
          barColor: 'bg-rose-500',
          label: t.out,
          bgLight: 'bg-rose-50',
          border: 'border-rose-200'
        };
    }
  };

  return (
    <div className="bg-white text-slate-800 rounded-2xl p-5 md:p-6 shadow-md border border-emerald-950/10 flex flex-col gap-5 overflow-y-auto max-h-[85vh] md:max-h-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          {/* Urgency Pill & Sample Data Badge */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full shadow-xs ${urgency.badgeClass}`}>
              <span className={`w-2 h-2 rounded-full ${urgency.dotClass}`}></span>
              {urgency.label}
            </span>
            <span className="bg-slate-200/80 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {t.sampleDataBadge}
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-emerald-950">{pantry.name}</h2>
          <p className="text-sm text-slate-600 font-medium">{pantry.address}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 -mr-1 -mt-1 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs rounded-full transition cursor-pointer flex items-center justify-center shrink-0"
            aria-label="Close and return to pantry list"
            title="Return to pantry list"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Action Buttons: Directions & Phone */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${pantry.lat},${pantry.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1e5322] hover:bg-[#043d2e] active:scale-[0.98] text-white font-bold text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition"
        >
          <Navigation className="w-4 h-4 shrink-0" />
          <span>{t.directions}</span>
        </a>
        <a
          href={`tel:${pantry.phone}`}
          className="bg-white hover:bg-slate-50 active:scale-[0.98] border border-slate-300 text-slate-800 font-bold text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-xs transition"
        >
          <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{t.callPantry}</span>
        </a>
      </div>

      {/* Category Stock Level Section matching Page 2 Detail Sheet */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-emerald-950">{t.liveShelfStock}</h3>
          <span className="text-[11px] text-slate-600 font-semibold">85% {t.confidence}</span>
        </div>

        <div className="flex flex-col gap-2">
          {pantry.shelf_items.map((item, idx) => {
            const styles = getBandStyles(item.band);
            return (
              <div
                key={idx}
                className={`p-3 rounded-2xl border flex items-center justify-between transition-colors ${styles.bgLight} ${styles.border}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{item.category_emoji}</span>
                  <span className="text-sm font-medium text-slate-800">
                    {item.category_name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs capitalize ${styles.textColor}`}>
                    {styles.label}
                  </span>
                  <div className="w-14 bg-slate-200/80 h-2 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full ${styles.barColor} transition-all duration-300`}
                      style={{
                        width:
                          item.band === 'plenty'
                            ? '100%'
                            : item.band === 'low'
                            ? '40%'
                            : '8%',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practical Needs & Access Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 flex flex-col gap-3.5 shadow-xs">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              {pantry.requires_id ? t.idRequired : t.noIdNeeded}
            </h4>
            <p className="text-xs text-slate-600">
              {pantry.requires_id
                ? 'Please bring a photo ID or mail with your name and address.'
                : 'No government ID, proof of income, or papers required.'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShoppingBag className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              {language === 'es' ? 'Traiga sus propias bolsas' : 'Bring your own bags'}
            </h4>
            <p className="text-xs text-slate-600">
              {language === 'es' ? 'Dos o tres bolsas resistentes suelen ser suficientes.' : 'Two or three sturdy bags is usually enough.'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              {pantry.allows_walkins ? t.noAppointment : t.appointmentRequired}
            </h4>
            <p className="text-xs text-slate-600">
              {pantry.distribution_model === 'client_choice'
                ? (language === 'es' ? 'Usted elige sus propios artículos, como en un supermercado pequeño.' : 'You pick your own items, like a small grocery store.')
                : pantry.distribution_model === 'pre_packed'
                ? (language === 'es' ? 'Los voluntarios le entregan una caja familiar preparada.' : 'Volunteers hand you a fresh prepared package.')
                : (language === 'es' ? 'Seleccione de una lista disponible al registrarse.' : 'Select from an available list at check-in.')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Languages className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              {pantry.languages.join(' & ')} {t.languagesSpoken}
            </h4>
            <p className="text-xs text-slate-600">
              {language === 'es' ? 'Un familiar o vecino puede recoger alimentos por usted con una nota simple.' : 'Someone can pick up for you with a short note.'}
            </p>
          </div>
        </div>

        {/* MTA Transit Lines & Accessibility */}
        <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
          <Bus className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              {language === 'es' ? 'Transporte Público MTA' : 'Baltimore MTA Transit Lines'}
            </h4>
            <p className="text-xs text-slate-600">
              {pantry.neighborhood.includes('Hampden') 
                ? 'CityLink Silver, Bus 21 (stops right at 36th St)'
                : pantry.neighborhood.includes('Goucher') || pantry.neighborhood.includes('Charles')
                ? 'CityLink Red & Bus 51 (North Charles St corridor)'
                : 'MTA CityLink & LocalLink connection within 2 blocks.'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                <Accessibility className="w-3 h-3 text-emerald-700" />
                {language === 'es' ? 'Acceso en silla de ruedas' : 'Wheelchair Accessible'}
              </span>
              <span className="inline-flex items-center text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                {language === 'es' ? 'Acepta cochecitos de bebé' : 'Stroller Friendly'}
              </span>
            </div>
          </div>
        </div>

        {/* Specialty Offerings & Cultural Diets */}
        {((pantry.specialty_tags && pantry.specialty_tags.length > 0) || (pantry.notes && pantry.notes.toLowerCase().includes('halal'))) && (
          <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
            <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-slate-900">
                {language === 'es' ? 'Dietas y Servicios Especiales' : 'Specialty Offerings & Dietary Needs'}
              </h4>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {(pantry.specialty_tags?.includes('halal') || (pantry.notes && pantry.notes.toLowerCase().includes('halal'))) && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                    🕌 {language === 'es' ? 'Certificado Halal' : 'Halal Certified'}
                  </span>
                )}
                {pantry.specialty_tags?.includes('kosher') && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-900 bg-blue-100 px-2.5 py-1 rounded-full border border-blue-300">
                    ✡️ {language === 'es' ? 'Certificado Kosher' : 'Kosher Certified'}
                  </span>
                )}
                {(pantry.specialty_tags?.includes('formula') || pantry.shelf_items.some((it) => it.category_name.toLowerCase().includes('diaper'))) && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-900 bg-pink-100 px-2.5 py-1 rounded-full border border-pink-300">
                    🍼 {language === 'es' ? 'Fórmula y Pañales' : 'Infant Formula & Diapers'}
                  </span>
                )}
                {pantry.specialty_tags?.includes('no_cook') && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                    🥫 {language === 'es' ? 'Bolsas Listas Para Comer' : 'No-Cook / Pop-Top Bags'}
                  </span>
                )}
                {pantry.specialty_tags?.includes('pet_food') && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-300">
                    🐾 {language === 'es' ? 'Alimento Para Mascotas' : 'Pet Food Available'}
                  </span>
                )}
                {pantry.specialty_tags?.includes('dietary') && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-900 bg-teal-100 px-2.5 py-1 rounded-full border border-teal-300">
                    🩺 {language === 'es' ? 'Bajo en Sodio / Diabético' : 'Diabetic & Low-Sodium'}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Community Feedback Loop: "Been here today?" */}
      <div className="bg-[#1e293b] text-white rounded-2xl p-4 shadow-sm flex flex-col gap-2">
        <h3 className="font-bold text-sm">
          {language === 'es' ? '¿Estuvo aquí hoy?' : 'Been here today?'}
        </h3>
        <p className="text-xs text-slate-300">
          {t.feedbackQuestion}
        </p>

        {feedbackSent ? (
          <div className="bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 p-2.5 rounded-xl text-xs flex items-center gap-2 mt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.feedbackThankYou}</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => setFeedbackSent('yes')}
              className="bg-white text-slate-900 hover:bg-slate-100 py-2 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
              {t.feedbackYes}
            </button>
            <button
              onClick={() => setFeedbackSent('no')}
              className="bg-slate-700/80 hover:bg-slate-700 text-white py-2 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <ThumbsDown className="w-3.5 h-3.5 text-rose-400" />
              {t.feedbackNo}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
