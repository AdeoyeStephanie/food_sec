'use client';

import React, { useState } from 'react';
import { Pantry } from '@/lib/pantryData';
import { Navigation, Phone, CheckCircle2, ShoppingBag, Clock, Languages, ShieldCheck, ThumbsUp, ThumbsDown, X } from 'lucide-react';

interface PantryDetailSheetProps {
  pantry: Pantry;
  onClose?: () => void;
}

export default function PantryDetailSheet({ pantry, onClose }: PantryDetailSheetProps) {
  const [feedbackSent, setFeedbackSent] = useState<string | null>(null);

  const getBandStyles = (band: 'plenty' | 'low' | 'out') => {
    switch (band) {
      case 'plenty':
        return {
          textColor: 'text-emerald-800 font-semibold',
          barColor: 'bg-emerald-700',
          label: 'Plenty',
          bgLight: 'bg-emerald-50',
          border: 'border-emerald-200'
        };
      case 'low':
        return {
          textColor: 'text-amber-800 font-semibold',
          barColor: 'bg-amber-600',
          label: 'Low',
          bgLight: 'bg-amber-50',
          border: 'border-amber-200'
        };
      case 'out':
        return {
          textColor: 'text-rose-700 font-semibold',
          barColor: 'bg-rose-500',
          label: 'Out',
          bgLight: 'bg-rose-50',
          border: 'border-rose-200'
        };
    }
  };

  return (
    <div className="bg-[#f4f7f5] text-slate-800 rounded-3xl p-5 md:p-6 shadow-xl border border-emerald-950/10 flex flex-col gap-5 overflow-y-auto max-h-[85vh] md:max-h-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="inline-block bg-slate-200/70 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
            Sample data
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-emerald-950">{pantry.name}</h2>
          <p className="text-sm text-slate-600">{pantry.address}</p>
          <div className="mt-1 font-semibold text-emerald-800 text-sm flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            {pantry.hours_text}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-full transition"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${pantry.lat},${pantry.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#064e3b] text-white py-3 px-4 rounded-xl font-medium text-sm hover:bg-[#043d2e] active:scale-[0.98] transition shadow-sm"
        >
          <Navigation className="w-4 h-4" />
          Directions
        </a>
        <a
          href={`tel:${pantry.phone}`}
          className="flex items-center justify-center gap-2 bg-white text-emerald-950 border border-emerald-900/20 py-3 px-4 rounded-xl font-medium text-sm hover:bg-slate-50 active:scale-[0.98] transition shadow-sm"
        >
          <Phone className="w-4 h-4" />
          Call pantry
        </a>
      </div>

      {/* On the shelves section */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-900/10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-base text-emerald-950">On the shelves</h3>
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            40 min ago
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {pantry.shelf_items.map((item, idx) => {
            const styles = getBandStyles(item.band);
            return (
              <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-2 w-1/3">
                  <span className="text-base">{item.category_emoji}</span>
                  <span className="text-sm font-medium text-slate-800">{item.category_name}</span>
                </div>

                {/* Status Bar */}
                <div className="w-1/3 mx-2 h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${styles.barColor}`}
                    style={{
                      width: item.band === 'plenty' ? '85%' : item.band === 'low' ? '35%' : '8%'
                    }}
                  />
                </div>

                <div className="w-1/4 text-right">
                  <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${styles.bgLight} ${styles.border} ${styles.textColor}`}>
                    {styles.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-slate-500 mt-3 pt-2 border-t border-slate-100">
          Estimated from the pantry&apos;s check-ins and confirmed by a volunteer.
        </p>
      </div>

      {/* What to expect card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-900/10 flex flex-col gap-3">
        <h3 className="font-bold text-base text-emerald-950">What to expect</h3>

        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              {pantry.requires_id ? 'ID required on first visit' : 'No ID needed'}
            </h4>
            <p className="text-xs text-slate-600">
              {pantry.requires_id ? 'Just an ID with your name' : 'Just give your household size at the door.'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShoppingBag className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Bring your own bags</h4>
            <p className="text-xs text-slate-600">Two or three sturdy bags is usually enough.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              {pantry.allows_walkins ? 'Walk in, no appointment' : 'Appointments preferred'}
            </h4>
            <p className="text-xs text-slate-600">
              {pantry.distribution_model === 'client_choice'
                ? 'You pick your own items, like a small grocery store.'
                : pantry.distribution_model === 'pre_packed'
                ? 'Volunteers hand you a fresh prepared package.'
                : 'Select from an available list at check-in.'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Languages className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">{pantry.languages.join(' and ')} spoken</h4>
            <p className="text-xs text-slate-600">Someone can pick up for you with a short note.</p>
          </div>
        </div>
      </div>

      {/* Community Feedback Loop: "Been here today?" */}
      <div className="bg-[#1e293b] text-white rounded-2xl p-4 shadow-sm flex flex-col gap-2">
        <h3 className="font-bold text-sm">Been here today?</h3>
        <p className="text-xs text-slate-300">
          Did they have what you needed? Anonymous, and it helps the next neighbor.
        </p>

        {feedbackSent ? (
          <div className="bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 p-2.5 rounded-xl text-xs flex items-center gap-2 mt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Thank you for helping keep Baltimore shelves accurate!</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => setFeedbackSent('yes')}
              className="bg-white text-slate-900 hover:bg-slate-100 py-2 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
              Yes, they did
            </button>
            <button
              onClick={() => setFeedbackSent('no')}
              className="bg-slate-700/80 hover:bg-slate-700 text-white py-2 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <ThumbsDown className="w-3.5 h-3.5 text-rose-400" />
              No, they were out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
