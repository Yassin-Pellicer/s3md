import prisma from '../prisma/client';

export class SubjectRepository {
  getAll() {
    return prisma.subject.findMany({ include: { tutor: true, post: true } });
  }

  getById(id: string) {
    return prisma.subject.findUnique({
      where: { id },
    });
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
}

export default new SubjectRepository();
