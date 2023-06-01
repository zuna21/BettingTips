import { Package } from "./package"

export interface Tip {
    id: number;
    homeTeam: string;
    awayTeam: string;
    packages: Package[];
    createdAt: string;
  }