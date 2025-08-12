import prisma from '../prisma/client';

export class CourseRepository {
  getAll() {
    return prisma.course.findMany();
  }

  getById(id: string) {
    return prisma.course.findUnique({ where: { id } });
  }

  create(data: any) {
    return prisma.course.create({ data });
  }

  update(id: string, data: any) {
    return prisma.course.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.course.delete({ where: { id } });
  }
}

export default new CourseRepository();
