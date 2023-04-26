import { IBook } from "./interfaces/IBook";
import { ICharacter } from "./interfaces/ICharacter";
import { ISummary } from "./interfaces/ISummary";
import { IVolume } from "./interfaces/IVolume";

export class Book implements IBook {
  constructor(
    name: string,
    author: string,
    image: string = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._I3mUgPn2UWllDgKSswFrgHaKw%26pid%3DApi&f=1&ipt=7c8b17b5ae127e0b37befe310853f07a12da3bdf4c516c978376a3fc62a89122&ipo=images"
  ) {
    this.name = name;
    this.author = "Author Name";
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
