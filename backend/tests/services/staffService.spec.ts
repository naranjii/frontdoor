import { describe, it, expect, vi } from 'vitest'
import * as staffRepository from '../../src/repositories/staffRepository'
import * as StaffService from '../../src/services/StaffService'
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

vi.mock('../../src/repositories/staffRepository')
vi.mock('bcryptjs')

describe('StaffService', () => {
  it('register hashes password and calls repository', async () => {
    const spy = vi.spyOn(staffRepository as any, 'create').mockResolvedValue({ id: 's1' })
  // bcrypt.hash returns a Promise<string>
  vi.spyOn(bcrypt, 'hash').mockImplementation(async () => 'hashed' as any)
  const res = await StaffService.register({ institutionName: 'X', username: 'u', name: 'n', password: 'p', role: 'RECEPTIONIST' } as any)
    expect(spy).toHaveBeenCalled()
    expect(res).toEqual({ id: 's1' })
  })

  it('login throws when user not found', async () => {
    vi.spyOn(staffRepository as any, 'findByUsername').mockResolvedValue(undefined)
    await expect(StaffService.login('u','p')).rejects.toBeDefined()
  })
})
