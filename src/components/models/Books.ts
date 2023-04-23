import { IBook } from "./interfaces/IBook";
import { ICharacter } from "./interfaces/ICharacter";
import { ISummary } from "./interfaces/ISummary";
import { IVolume } from "./interfaces/IVolume";

export class Book implements IBook {
  constructor(name: string) {
    this.name = name;
    this.author = "Author Name";
    this.image = "../images/bookCover.png";
    this.volumes = [];
    this.summary = [];
    this.rate = 0;
    this.id = 1;
  }

  id: number;
  name: string;
  author: string;
  image: string;
  volumes: IVolume[];
  summary: ISummary[];
  rate: number;

  getFullNotes() {
    let bookInfo = {
      id: this.id,
      name: this.name,
      author: this.author,
      image: this.image,
      volumes: this.volumes,
      summary: this.summary,
      rate: this.rate,
    };

    return bookInfo;
  }
}
