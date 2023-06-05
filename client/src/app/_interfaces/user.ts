import { Package } from "./package";

export interface User {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
    token: string;
    hasSubscription: boolean;
    package: Package;
    startDate: string;
    endDate: string;
    createdAt: string;
  }