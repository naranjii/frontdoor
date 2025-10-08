import { describe, it, expect, vi } from 'vitest'
import * as logbookRepository from '../../src/repositories/logbookRepository'
import { LogbookService } from '../../src/services/LogbookService'

vi.mock('../../src/repositories/logbookRepository')

describe('LogbookService', () => {
  it('create calls repository', async () => {
    const spy = vi.spyOn(logbookRepository as any, 'create').mockResolvedValue({ id: 'l1' })
    const res = await LogbookService.create({ createdById: 1 } as any)
    expect(spy).toHaveBeenCalled()
    expect(res).toEqual({ id: 'l1' })
  })
})
