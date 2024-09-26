import { Category } from "./category.enum";
import { ReadingBookClub } from "./reading-club-list.model";

export class ClubList {
  constructor(
    public id: string,
    public name: string,
    public created_by_id: number,
    public cover_url: string,
    public description: string,
    public creation_date: Date,
    public ending_date: Date,
    public is_active: boolean,
    public type: string,
    public category: keyof typeof Category,
    public reading: ReadingBookClub[],
    public member_count: number,
    public members: {
      bookclub_id: number;
      id: number;
      membership_date: Date;
      profile: string;
      user_id: number;
      username: string;
    }[],
    public moderador?: boolean,
    public reading_ongoing?: number,
    public reading_finished?: number,
    public profile?: "moderador" | "leitor" | null
  ) {}
}
