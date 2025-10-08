import { describe, it, expect, vi } from 'vitest'
import * as institutionRepository from '../../src/repositories/institutionRepository'
import { InstitutionService } from '../../src/services/InstitutionService'

vi.mock('../../src/repositories/institutionRepository')

describe('InstitutionService', () => {
  it('register calls repository.create', async () => {
    const spy = vi.spyOn(institutionRepository as any, 'create').mockResolvedValue({ id: 'i1' })
    const res = await InstitutionService.register({ institutionName: 'X' } as any)
    expect(spy).toHaveBeenCalled()
    expect(res).toEqual({ id: 'i1' })
  })
})
