export interface JwtPayload {
  id: number;
  role: 'ADMIN' | 'STAFF';
}