'use client';

import React, { useState, useEffect } from 'react';
import { PhoneCall, PhoneOff, Mic, X, Volume2 } from 'lucide-react';
import { Language } from '@/lib/translations';

interface HotlineModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  onSelectPantryQuery: (query: string) => void;
}

export default function HotlineModal({ isOpen, language, onClose, onSelectPantryQuery }: HotlineModalProps) {
  const [callState, setCallState] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [step, setStep] = useState<number>(0);
  const [transcript, setTranscript] = useState<Array<{ sender: 'agent' | 'user'; text: string }>>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset the simulated call whenever the modal closes (prop-driven reset).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCallState('ringing');
      setStep(0);
      setTranscript([]);
      return;
    }

    // Simulate ringing then connect
    const ringTimer = setTimeout(() => {
      setCallState('connected');
      setIsSpeaking(true);
      const greeting = language === 'es'
        ? "Hola, gracias por llamar a la línea de alimentos de Baltimore. ¿En qué vecindario o código postal se encuentra y qué alimentos necesita hoy?"
        : "Hello, thank you for calling Baltimore Food Access. What neighborhood or zip code are you in, and what food items do you need today?";
      setTranscript([{ sender: 'agent', text: greeting }]);
      setTimeout(() => setIsSpeaking(false), 2200);
    }, 1200);

    return () => clearTimeout(ringTimer);
  }, [isOpen, language]);

  if (!isOpen) return null;

  const simulateUserResponse = (userText: string, queryToSearch: string) => {
    setTranscript((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsSpeaking(true);
    setStep((prev) => prev + 1);

    setTimeout(() => {
      const response = language === 'es'
        ? `Entendido. Encontré 2 despensas abiertas cerca de ${userText} con productos frescos disponibles sin cita previa. ¿Le gustaría que le envíe la dirección por mensaje de texto o verla en la pantalla?`
        : `Got it. I found 2 pantries open near ${userText} with fresh produce in stock right now, no appointment required. Would you like me to open them on your screen?`;
      setTranscript((prev) => [...prev, { sender: 'agent', text: response }]);
      setIsSpeaking(false);
      onSelectPantryQuery(queryToSearch);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 text-white rounded-2xl max-w-md w-full p-6 md:p-8 shadow-md border border-slate-700 flex flex-col gap-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-600 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Call Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition ${
            callState === 'ringing' 
              ? 'bg-amber-500/20 text-amber-400 animate-pulse'
              : 'bg-emerald-500/20 text-emerald-400 ring-4 ring-emerald-500/20'
          }`}>
            <PhoneCall className="w-8 h-8 animate-bounce" />
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400">
              {callState === 'ringing' 
                ? (language === 'es' ? 'Marcando...' : 'Calling...') 
                : (language === 'es' ? 'Llamada Conectada' : 'Call Connected')}
            </span>
            <h3 className="text-2xl font-black text-white mt-0.5">
              (410) 737-8282
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Baltimore Multilingual Voice AI Hotline • No Data Needed
            </p>
          </div>
        </div>

        {/* Live Conversation Transcript */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 flex flex-col gap-3 min-h-[160px] max-h-[220px] overflow-y-auto">
          {transcript.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                msg.sender === 'agent' ? 'items-start' : 'items-end'
              }`}
            >
              <div
                className={`rounded-2xl px-3.5 py-2 text-xs leading-relaxed max-w-[85%] ${
                  msg.sender === 'agent'
                    ? 'bg-slate-800 text-slate-200 border border-slate-700'
                    : 'bg-emerald-700 text-white'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isSpeaking && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium animate-pulse">
              <Volume2 className="w-4 h-4" />
              <span>Voice Agent speaking...</span>
            </div>
          )}
        </div>

        {/* Simulated Caller Options */}
        {callState === 'connected' && step === 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider text-center">
              {language === 'es' ? 'Simular lo que el vecino responde:' : 'Simulate caller saying:'}
            </span>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => simulateUserResponse(
                  language === 'es' ? 'Estoy en el 21218 y busco frutas y verduras' : 'I am in 21218 and looking for fresh produce',
                  '21218'
                )}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs py-2.5 px-3 rounded-xl transition text-left flex items-center justify-between cursor-pointer"
              >
                <span>&ldquo;{language === 'es' ? 'Estoy en 21218 y busco verduras' : 'I am in 21218 looking for fresh produce'}&rdquo;</span>
                <Mic className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </button>
              <button
                onClick={() => simulateUserResponse(
                  language === 'es' ? 'Hampden, necesito pañales esta noche' : 'Hampden, I need diapers tonight after 6pm',
                  'Hampden diapers'
                )}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs py-2.5 px-3 rounded-xl transition text-left flex items-center justify-between cursor-pointer"
              >
                <span>&ldquo;{language === 'es' ? 'Hampden, necesito pañales hoy' : 'Hampden, I need diapers tonight'}&rdquo;</span>
                <Mic className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </button>
            </div>
          </div>
        )}

        {/* End Call Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onClose}
            className="bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold py-3 px-6 rounded-full flex items-center gap-2 shadow-lg transition cursor-pointer"
          >
            <PhoneOff className="w-4 h-4" />
            <span>{language === 'es' ? 'Finalizar Llamada' : 'Hang Up'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
