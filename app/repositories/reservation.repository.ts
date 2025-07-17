import prisma from '../prisma/client';

export class ReservationRepository {
  getAll() {
    return prisma.reservation.findMany({
      include: { session: true },
    });
  }

  getById(id: string) {
    return prisma.reservation.findUnique({
      where: { id },
      include: { session: true },
    });
  }

  create(data: any) {
    return prisma.reservation.create({ data });
  }

  update(id: string, data: any) {
    return prisma.reservation.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.reservation.delete({ where: { id } });
  }
}

export default new ReservationRepository();