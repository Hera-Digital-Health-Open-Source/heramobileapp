export const languageOptions = [
  'English',
  'Arabic',
  'Turkish',
  'Dari',
  'Pashto',
];
export const genderOptions = ['Male', 'Female'];
export const pregnancyWeekOptions = Array.from({length: 42}, (_, i) =>
  (i + 1).toString(),
);

export const prenatalVisitsOptions = [...Array(10).keys()].map(String);
// export const baseURL = 'https://exciting-simply-hippo.ngrok-free.app';
export const baseURL =
  'https://herav2-web-service.production-turkey.herav2.heradigitalhealth.com';
// Home screen constants
export const keyWhatsappHotline = 'whatsapphotline';
export const keyFeedback = 'feedback';
export const keyAppointments = 'appointments';
export const keyPregnancy = 'pregnancy';
export const keyHealthRecords = 'healthrecords';
export const keyShrh = 'shrh';
export const keySrhr = 'srhr';
export const doctorAppointment = 'doctorappointment';
export const keyChildren = 'children';
export const keyHealthCenters = 'healthcenters';
export const keyEmergencyCall = 'emergencycall';
export const keyHealthTipsNews = 'healthtipsnews';
export const keySettings = 'settings';
export const keyFacebook = 'facebook';
export const keySOS = 'sos';
// Settings screen constants
export const keyEditProfile = 'editprofile';
export const keyContactUs = 'contactus';
export const keyVisitHeraWeb = 'visitheraweb';
export const keyFAQ = 'faq';
export const keyUserAgreement = 'useragreement';
export const keyKVKK = 'kvkk';
export const keyChangeLanguage = 'changelanguage';
export const keyTranslator = 'translator';
export const regionGeolocation = {
  latitude: 41.0082,
  longitude: 28.9784,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export const LANGUAGE_STORAGE_KEY = 'language';
export const ACCEPT_LANGUAGE_STORAGE_KEY = 'accept_language';
