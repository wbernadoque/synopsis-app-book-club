export class Goals {
  constructor(
    public id: string,
    public name: string,
    public reading_id: string,
    public description: string,
    public predicted_ending: string,
    public creation_date: string,
    public is_active: boolean
  ) {}
}
