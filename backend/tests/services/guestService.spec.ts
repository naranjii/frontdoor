import { describe, it, expect, vi } from 'vitest'
import * as guestRepository from '../../src/repositories/guestRepository'
import { GuestService } from '../../src/services/GuestService'

vi.mock('../../src/repositories/guestRepository')

describe('GuestService', () => {
  it('create calls repository with parsed data', async () => {
    const spy = vi.spyOn(guestRepository as any, 'create').mockResolvedValue({ id: '1' })
    const result = await GuestService.create({ createdById: 1 })
    expect(spy).toHaveBeenCalled()
    expect(result).toEqual({ id: '1' })
  })

  it('getAll calls findAll', async () => {
    const spy = vi.spyOn(guestRepository as any, 'findAll').mockResolvedValue([])
    const res = await GuestService.getAll()
    expect(spy).toHaveBeenCalled()
    expect(res).toEqual([])
  })
})
