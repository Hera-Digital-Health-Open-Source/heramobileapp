export interface UserProfile {
  name: string;
  gender: 'MALE' | 'FEMALE';
  date_of_birth: string;
  language_code: 'en' | 'ar' | 'tr';
  time_zone: string;
};