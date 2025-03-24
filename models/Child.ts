export default interface Child{
  id: number;
  name: string;
  gender: 'MALE' | 'FEMALE';
  date_of_birth: string;
  past_vaccinations: number[];
}