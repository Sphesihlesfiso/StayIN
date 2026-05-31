export type RoleType = "LANDLORD" | "TEENANT"

export type User = {
  username: string
  email: string
  password: string
  role: RoleType
}
