export default interface ISurvey{
  id: number;
  response: String | null;
  context: {date: string, event_type: string}
}