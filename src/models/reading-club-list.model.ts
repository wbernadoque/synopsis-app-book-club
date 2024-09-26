import { Book } from './book.model';

export class ReadingBookClub {
  constructor(
    public id: string,
    public bookclub_id: string,
    public book_edition_id: string,
    public creation_date: Date,
    public predicted_ending: Date,
    public ending_date: Date,
    public calendar_type: string,
    public book_edition: Book
  ) {}
}
