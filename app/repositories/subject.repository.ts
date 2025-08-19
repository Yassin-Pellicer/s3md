import { Subject } from '@prisma/client';
import prisma from '../prisma/client';

export class SubjectRepository {
  getAll() {
    return prisma.subject.findMany();
  }

  getById(id: string) {
    return prisma.subject.findUnique({ where: { id } });
  }

  create(data: any) {
    return prisma.subject.create({ data });
  }

  update(id: string, data: any) {
    return prisma.subject.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.subject.delete({ where: { id } });
  }

  getSubjectsFromCourse(id: string): Promise<Subject[]> {
    return prisma.subject.findMany({
      where: {
        courses: {
          some: {
            id,
          },
        },
      },
      include: {
        tutor: true,
        sessions: true,
      },
    });
  }
}

export default new SubjectRepository();
