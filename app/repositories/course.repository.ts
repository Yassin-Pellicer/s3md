import prisma from '../prisma/client';
import { Course } from '../types/Course';

export class CourseRepository {
  async getAll(includeGroups: boolean = false, includeSubjects: boolean = false): Promise<Course[]> {
    return prisma.course.findMany({
      include: {
        groups: includeGroups,
        subjects: includeSubjects
      }
    });
  }

  getById(id: string) {
    return prisma.course.findUnique({ where: { id } });
  }

create(data: any) {
  const { subjects, groups, ...rest } = data;

  return prisma.course.create({
    data: {
      ...rest,
      subjects: subjects?.length
        ? {
            connect: subjects.map((s: { id: string }) => ({ id: s.id })),
          }
        : undefined,
      groups: groups?.length
        ? {
            connect: groups.map((g: { id: string }) => ({ id: g.id })),
          }
        : undefined,
    },
  });
}


  update(id: string, data: any) {
    return prisma.course.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.course.delete({ where: { id } });
  }
}

export default new CourseRepository();
