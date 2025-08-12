import prisma from '../prisma/client';

export class GroupRepository {
  getAll() {
    return prisma.group.findMany();
  }

  getById(id: string) {
    return prisma.group.findUnique({ where: { id } });
  }

  create(data: any) {
    return prisma.group.create({ data });
  }

  update(id: string, data: any) {
    return prisma.group.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.group.delete({ where: { id } });
  }
}

export default new GroupRepository();
