import { Category } from './category.enum';

export class Readings {
  constructor(
    public id: string,
    public bookclub: string,
    public book_edition: string,
    public book_title: string,
    public book_author: string,
    public book_cover: string,
    public book_publisher: string,
    public creation_date: Date,
    public predicted_ending: Date,
    public ending_date: Date,
    public calendar_type: string,
    public member_count?: number,
    public category?: keyof typeof Category,
    public name?: string
  ) {}
}
