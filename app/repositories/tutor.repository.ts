import prisma from '../prisma/client';

export class TutorRepository {
  getAll() {
    return prisma.tutor.findMany({
      include: { subjects: true, sessions: true },
    });
  }

  getById(id: string) {
    return prisma.tutor.findUnique({
      where: { id },
      include: { subjects: true, sessions: true },
    });
  }

  create(data: any) {
    return prisma.tutor.create({ data });
  }

  update(id: string, data: any) {
    return prisma.tutor.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.tutor.delete({ where: { id } });
  }
}

export default new TutorRepository();