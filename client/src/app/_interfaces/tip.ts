import { Package } from "./package"
import { Photo } from "./photo";

export interface Tip {
    id: number;
    homeTeam: string;
    awayTeam: string;
    packages: Package[];
    photo: Photo;
    createdAt: string;
  }