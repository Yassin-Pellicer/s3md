import prisma from '../prisma/client';

export class SessionRepository {
  getAll() {
    return prisma.session.findMany({
      include: { tutor: true, reservation: true },
    });
  }

  getById(id: string) {
    return prisma.session.findUnique({
      where: { id },
      include: { tutor: true, reservation: true },
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