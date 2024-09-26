import { Category } from './category.enum';
import { ReadingBookClub } from './reading-club-list.model';

export class ProfileList {
  constructor(
    public username: string,
    public email: string,
    public password: string
  ) {}
}
