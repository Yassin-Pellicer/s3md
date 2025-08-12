import { Subject } from "@prisma/client";
import subjectRepository from "../repositories/subject.repository";

export class managementService {

  async getSubjects(): Promise<Subject[]> {
    return await subjectRepository.getAll();
  }

  async createSubject(data: any) {
    return await subjectRepository.create(data);
  }
}

export default new managementService();
