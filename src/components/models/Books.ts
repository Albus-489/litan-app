import { IBook } from "./interfaces/IBook";
import { ICharacter } from "./interfaces/ICharacter";
import { ISummary } from "./interfaces/ISummary";
import { IVolume } from "./interfaces/IVolume";
const nopreview = require("../images/nopreview.png");

export class Book implements IBook {
  constructor(name: string, author: string, image: string = nopreview) {
    this.name = name;
    this.author = author;
    this.image = image;
    this.volumes = [];
    this.summary = [];
    this.rate = 0;
  }

  _id?: string;
  name: string;
  author: string;
  image: string;
  volumes: IVolume[];
  summary: ISummary[];
  rate: number;

  getFullNotes() {
    let bookInfo = {
      id: this._id,
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
