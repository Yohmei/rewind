export interface User {
  _id: string
  name: string
  username: string
  hash: string
  salt: string
  timestamp: Date
}
