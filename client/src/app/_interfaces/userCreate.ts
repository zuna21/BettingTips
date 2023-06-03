import { Package } from "./package"

export interface UserCreate {
    username: string
    email: string
    password: string
    package: Package
  }