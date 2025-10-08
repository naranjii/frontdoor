import { describe, it, expect, vi } from 'vitest'
import * as patientRepository from '../../src/repositories/patientRepository'
import { PatientService } from '../../src/services/PatientService'

vi.mock('../../src/repositories/patientRepository')

describe('PatientService', () => {
  it('create calls repository with parsed data', async () => {
    const spy = vi.spyOn(patientRepository as any, 'create').mockResolvedValue({ id: 'p1' })
    const result = await PatientService.create({ patientCode: 123, supportLevel: 1, createdById: 1, name: 'x' } as any)
    expect(spy).toHaveBeenCalled()
    expect(result).toEqual({ id: 'p1' })
  })

  it('getAll calls findAll', async () => {
    const spy = vi.spyOn(patientRepository as any, 'findAll').mockResolvedValue([])
    const res = await PatientService.getAll()
    expect(spy).toHaveBeenCalled()
    expect(res).toEqual([])
  })
})
