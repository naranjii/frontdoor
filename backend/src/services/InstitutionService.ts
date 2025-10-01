import { InstitutionRepository } from "../repositories/institutionRepository";

export const InstitutionService = {
    async register(data: { name: string }) {
        return InstitutionRepository.create({ name: data.name });
    }
}