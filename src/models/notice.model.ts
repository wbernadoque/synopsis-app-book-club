import { Choices } from "./choices.model";

export class Notice {
  constructor(
    public id: string,
    public title: string,
    public created_by_id: string,
    public creation_date: string,
    public update_date: string,
    public pin: boolean,
    public content?: string | "",
    public reading_id?: string,
    public bookclub_id?: string,
    public start_date?: string,
    public ending_date?: string,
    public type?: "POLL" | "QUIZ",
    public bookclub?: string,
    public reading?: string,
    public choices?: Choices[],
    public has_voted?: boolean
  ) {}
}
