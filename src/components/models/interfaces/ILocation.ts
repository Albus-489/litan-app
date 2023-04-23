import { ICharacter } from "./ICharacter";
import { ISummary } from "./ISummary";
import { IVolume } from "./IVolume";

export interface ILocation {
  name: string;
  volumes?: IVolume[];
  description: string[];
}
