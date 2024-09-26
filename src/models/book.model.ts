export class Book {
  constructor(
    public id: string,
    public title: string,
    public author: string,
    public publisher: string,
    public page_qty: number,
    public synopsis: string,
    public publication_date: Date,
    public publisher_imprint?: string,
    public cover_url?: string,
    public cover?: string
  ) {}
}
