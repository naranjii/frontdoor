import * as InstitutionRepository from "../repositories/institutionRepository";

export const InstitutionService = {
    async register(data: { institutionName: string }) {
        return InstitutionRepository.create({ institutionName: data.institutionName });
    }
}