import { Subject } from "@prisma/client";
import subjectRepository from "../repositories/subject.repository";
import courseRepository from "../repositories/course.repository";

export class managementService {

  async getSubjects(): Promise<Subject[]> {
    return await subjectRepository.getAll();
  }

  async createSubject(data: any) {
    return await subjectRepository.create(data);
  }

  async getCourses(includeGroups: boolean = false, includeSubjects: boolean = false) {
    return await courseRepository.getAll(includeGroups, includeSubjects);
  }

  async createCourse(data: any) {
    return await courseRepository.create(data);
  }
}

export default new managementService();
