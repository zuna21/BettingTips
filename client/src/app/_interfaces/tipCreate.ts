import { Package } from "./package";
import { Photo } from "./photo";

export interface TipCreate {
    homeTeam: string;
    awayTeam: string;
    packages: Package[];
    photo: Photo;
}