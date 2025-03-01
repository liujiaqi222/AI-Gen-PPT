export type Session = {
  user: {
    id: string
    name:string
  }
  // accessToken: string
  // refreshToken:string
}

// export async function createSession(payload:Session) {
//   const expiredAt = new Date(Date.now() + 7 * 24 * 3600 * 1000)
  
// }