export class Choices {
  constructor(
    public id: string,
    public question_id: string,
    public text: string,
    public votes: number,
    public is_correct: boolean,
    public personal_vote: boolean
  ) {}
}
