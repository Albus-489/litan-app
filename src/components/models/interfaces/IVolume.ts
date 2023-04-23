import { ICharacter } from "./ICharacter";
import { ILocation } from "./ILocation";
import { ISummary } from "./ISummary";

export interface IVolume {
  name: string;
  characters?: ICharacter[];
  rate?: number;
  locations?: ILocation[];
  length?: number;
  summary?: ISummary[];
}
