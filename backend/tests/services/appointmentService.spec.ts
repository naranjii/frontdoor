import { describe, it, expect, vi } from 'vitest'
import * as appointmentRepository from '../../src/repositories/appointmentRepository'
import { AppointmentService } from '../../src/services/AppointmentService'

vi.mock('../../src/repositories/appointmentRepository')

describe('AppointmentService', () => {
  it('create calls repository', async () => {
    const spy = vi.spyOn(appointmentRepository as any, 'create').mockResolvedValue({ id: 'a1' })
    const res = await AppointmentService.create({ createdById: 1 } as any)
    expect(spy).toHaveBeenCalled()
    expect(res).toEqual({ id: 'a1' })
  })
})
