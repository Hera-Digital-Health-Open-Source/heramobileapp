export default interface Appointment {
  date: string;
  event_type: string;
  pregnancy_id: string;
  weeks_pregnant: string;
  child_id: number;
  vaccine_names: string[];
  dose_ids: number[];
  event_key: string;
  person_name: string;
  week_age: number;
}