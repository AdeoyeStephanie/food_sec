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
    appName: 'Pantry Pulse',
    appSubtitle: 'Baltimore',
    pantryView: 'Pantry View',
    heroTitle: 'What do you need today?',
    heroSubtitle: "Search by zip code (e.g. 21218, 21220), neighborhood, or food item. Say it however you'd ask a neighbor.",
    searchLabel: 'Search by food item, neighborhood, or zip code',
    searchPlaceholder: 'e.g. 21218, produce near Hampden, or diapers tonight',
    findFoodBtn: 'Find Food',
    presetTitle: 'Popular searches',
    presets: {
      formula: 'Diapers & baby formula',
      tonight: 'Open tonight',
      noId: 'No ID needed',
      produce: 'Fresh produce',
    },
    hotlineTitle: 'No data? Just call.',
    hotlineSubtitle: '(410) 737-8282 (or dial 211), any time, English or Spanish',
    dignityNotice: "No account needed. We don't save what you type.",
    matchesOpenToday: 'matches open today',
    walkingDistance: 'minutes walking',
    details: 'Details',
    directions: 'Directions',
    updatedAgo: 'Updated recently',
    sampleDataBadge: 'Verified Pantry',
    emptyTitle: 'No pantries found in this exact search',
    emptyDesc: 'Try searching by any Baltimore zip code (21201-21239), neighborhood (e.g. Hampden, Old Goucher, Essex), or food category.',
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
    appName: 'Pantry Pulse',
    appSubtitle: 'Baltimore',
    pantryView: 'Vista de Despensa',
    heroTitle: '¿Qué necesita el día de hoy?',
    heroSubtitle: 'Busque por código postal (ej. 21218, 21220), vecindario o alimento. Escríbalo como le preguntaría a un vecino.',
    searchLabel: 'Busque por alimento, vecindario o código postal',
    searchPlaceholder: 'ej. 21218, verduras en Hampden o pañales esta noche',
    findFoodBtn: 'Buscar Comida',
    presetTitle: 'Búsquedas populares',
    presets: {
      formula: 'Pañales y fórmula de bebé',
      tonight: 'Abierto esta noche',
      noId: 'Sin identificación requerida',
      produce: 'Frutas y verduras frescas',
    },
    hotlineTitle: '¿Sin internet o datos? Solo llame.',
    hotlineSubtitle: '(410) 737-8282 (o marque 211), a cualquier hora, en inglés o español',
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
