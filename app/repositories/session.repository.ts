import prisma from '../prisma/client';

export class SessionRepository {
  getAll() {
    return prisma.session.findMany({
    });
  }

  getById(id: string) {
    return prisma.session.findUnique({
      where: { id },
    });
  }

  create(data: any) {
    return prisma.session.create({ data });
  }

  update(id: string, data: any) {
    return prisma.session.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.session.delete({ where: { id } });
  }
}

export default new SessionRepository();