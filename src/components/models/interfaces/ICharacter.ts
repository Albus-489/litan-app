import { IVolume } from "./IVolume";

export interface ICharacter {
  names: string[];
  age?: number;
  gender?: string;
  volumes?: IVolume[];
  description?: string[];
  appearence?: string[];
  image?: string[];
  desires?: string[];
  friends?: ICharacter[];
  enemies?: ICharacter[];
  love?: ICharacter[];
}
