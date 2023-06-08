import { Package } from "./package";

export interface User {
    id: number;
    username: string;
    email: string;
    token: string;
    package: Package;
    isAdmin: boolean;
    hasSubscription: boolean;
    startDate: string;
    endDate: string;
    createdAt: string;
  }