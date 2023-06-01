import { Package } from "./package";

export interface TipCreate {
    homeTeam: string;
    awayTeam: string;
    packages: Package[]
}