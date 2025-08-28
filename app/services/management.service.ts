import { Subject } from "@prisma/client";
import subjectRepository from "../repositories/subject.repository";
import courseRepository from "../repositories/course.repository";
import sessionRepository from "../repositories/session.repository";
import groupRepository from "../repositories/group.repository";
import seriesRepository from "../repositories/series.repository";

export class managementService {

  async getSubjects(): Promise<Subject[]> {
    return await subjectRepository.getAll();
  }
  async getSubjectsFromCourse(id: string): Promise<Subject[]> {
    return await subjectRepository.getSubjectsFromCourse(id);
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

  async getGroups() {
    return await groupRepository.getAll();
  }

  async getGroupByCourse(id: string) {
    return await groupRepository.getGroupByCourse(id);
  }

  async createGroup(data: any) {
    return await groupRepository.create(data);
  }

  async getSessions() {
    return await sessionRepository.getAll();
  }

  async createSession(data: any) {
    return await sessionRepository.create(data);
  }

  async createSeries(data: any) {
    return await seriesRepository.create(data);
  }

  async getSeries(id: string) {
    return await seriesRepository.getById(id);
  }
}

export default new managementService();
