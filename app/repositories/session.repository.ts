import prisma from "../prisma/client";

export class SessionRepository {
  getAll() {
    return prisma.session.findMany();
  }

  getById(id: string) {
    return prisma.session.findUnique({ where: { id } });
  }

  async create(data: any) {
    if (data?.id) {
      const existingSession = await prisma.session.findUnique({
        where: { id: data.id },
      });

      if (existingSession) {
        return prisma.session.update({
          where: { id: data.id },
          data,
        });
      }
    }
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
