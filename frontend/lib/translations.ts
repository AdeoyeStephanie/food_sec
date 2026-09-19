export type Language = 'en' | 'es';

export interface TranslationDict {
  appName: string;
  appSubtitle: string;
  pantryView: string;
  heroTitle: string;
  heroSubtitle: string;
  searchLabel: string;
  searchPlaceholder: string;
  findFoodBtn: string;
  presetTitle: string;
  presets: {
    formula: string;
    tonight: string;
    noId: string;
    produce: string;
  };
  hotlineTitle: string;
  hotlineSubtitle: string;
  dignityNotice: string;
  matchesOpenToday: string;
  walkingDistance: string;
  details: string;
  directions: string;
  updatedAgo: string;
  sampleDataBadge: string;
  emptyTitle: string;
  emptyDesc: string;
  showAllBtn: string;
  // Detail sheet
  overview: string;
  liveShelfStock: string;
  confidence: string;
  hoursAndWalkins: string;
  noAppointment: string;
  appointmentRequired: string;
  noIdNeeded: string;
  idRequired: string;
  languagesSpoken: string;
  howItWorks: string;
  phoneContact: string;
  callPantry: string;
  getDirections: string;
  feedbackQuestion: string;
  feedbackYes: string;
  feedbackNo: string;
  feedbackThankYou: string;
  // Stock labels
  plenty: string;
  low: string;
  out: string;
}

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  en: {
    appName: 'Find Food Baltimore',
    appSubtitle: 'Live Shelf Stock & Pantries',
    pantryView: 'Pantry View',
    heroTitle: 'What do you need today?',
    heroSubtitle: "Say it however you would to a friend. We'll find pantries near you that have it right now.",
    searchLabel: 'Tell us what you need',
    searchPlaceholder: 'diapers near Hampden after 6pm',
    findFoodBtn: 'Find food',
    presetTitle: 'Or try one of these',
    presets: {
      formula: 'Baby formula near me',
      tonight: 'Open tonight',
      noId: 'No ID needed',
      produce: 'Fresh produce',
    },
    hotlineTitle: 'No data? Just call.',
    hotlineSubtitle: '(410) 555-FOOD, any time, English or Spanish',
    dignityNotice: "No account needed. We don't save what you type.",
    matchesOpenToday: 'matches open today',
    walkingDistance: 'minutes walking',
    details: 'Details',
    directions: 'Directions',
    updatedAgo: 'Updated recently',
    sampleDataBadge: 'Verified Pantry',
    emptyTitle: 'No pantries found in this exact search',
    emptyDesc: 'Try clearing filters, searching by neighborhood (e.g. Hampden, Old Goucher, Essex), or exploring all pantries.',
    showAllBtn: 'Show All Pantries',
    overview: 'Pantry Overview',
    liveShelfStock: 'Live Shelf Stock',
    confidence: 'est. confidence',
    hoursAndWalkins: 'Hours & Access',
    noAppointment: 'Walk in, no appointment needed',
    appointmentRequired: 'Appointment recommended',
    noIdNeeded: 'No ID or documents required',
    idRequired: 'Photo ID requested',
    languagesSpoken: 'Languages Spoken',
    howItWorks: 'How it Works',
    phoneContact: 'Contact Phone',
    callPantry: 'Call Pantry',
    getDirections: 'Get Walking Directions',
    feedbackQuestion: 'Did this pantry have what you needed today?',
    feedbackYes: 'Yes, got what I needed',
    feedbackNo: 'Shelf was empty',
    feedbackThankYou: 'Thank you! Your anonymous neighbor feedback helps update stock estimates.',
    plenty: 'Plenty',
    low: 'Low',
    out: 'Out',
  },
  es: {
    appName: 'Encuentra Comida Baltimore',
    appSubtitle: 'Disponibilidad de Alimentos en Vivo',
    pantryView: 'Vista de Despensa',
    heroTitle: '¿Qué necesita el día de hoy?',
    heroSubtitle: 'Escríbalo o dígalo como si hablara con un amigo. Encontraremos despensas cercanas que lo tengan ahora mismo.',
    searchLabel: 'Díganos qué necesita',
    searchPlaceholder: 'pañales cerca de Hampden después de las 6pm',
    findFoodBtn: 'Buscar comida',
    presetTitle: 'O pruebe una de estas opciones',
    presets: {
      formula: 'Fórmula para bebé cerca de mí',
      tonight: 'Abierto esta noche',
      noId: 'Sin identificación requerida',
      produce: 'Frutas y verduras frescas',
    },
    hotlineTitle: '¿Sin internet o datos? Solo llame.',
    hotlineSubtitle: '(410) 555-FOOD, a cualquier hora, en inglés o español',
    dignityNotice: 'No se requiere cuenta. No guardamos lo que escribe.',
    matchesOpenToday: 'despensas disponibles hoy',
    walkingDistance: 'minutos caminando',
    details: 'Detalles',
    directions: 'Cómo llegar',
    updatedAgo: 'Actualizado recientemente',
    sampleDataBadge: 'Despensa Verificada',
    emptyTitle: 'No se encontraron despensas con esta búsqueda exacta',
    emptyDesc: 'Intente buscar por vecindario (ej. Hampden, Old Goucher, Essex) o explore todas las despensas disponibles.',
    showAllBtn: 'Mostrar Todas las Despensas',
    overview: 'Información de la Despensa',
    liveShelfStock: 'Estado de Alimentos en Estantería',
    confidence: 'confianza estimada',
    hoursAndWalkins: 'Horarios y Acceso',
    noAppointment: 'Entrada libre, no requiere cita previa',
    appointmentRequired: 'Se recomienda cita previa',
    noIdNeeded: 'No requiere identificación ni documentos',
    idRequired: 'Se solicita identificación',
    languagesSpoken: 'Idiomas de Atención',
    howItWorks: 'Cómo Funciona',
    phoneContact: 'Teléfono de Contacto',
    callPantry: 'Llamar a la Despensa',
    getDirections: 'Obtener Indicaciones a Pie',
    feedbackQuestion: '¿Encontró lo que necesitaba en esta despensa?',
    feedbackYes: 'Sí, encontré lo necesario',
    feedbackNo: 'Los estantes estaban vacíos',
    feedbackThankYou: '¡Muchas gracias! Su respuesta anónima ayuda a actualizar los estimados para toda la comunidad.',
    plenty: 'Mucho',
    low: 'Poco',
    out: 'Agotado',
  },
};
