import { Series, Session } from "@prisma/client";
import { generateDates } from "../funcs/helper.funcs";
import prisma from "../prisma/client";
import { SessionForm } from "../types/SessionForm";

export class SeriesRepository {
  getAll() {
    return prisma.series.findMany();
  }

  getById(id: string) {
    return prisma.series.findUnique({ where: { id } });
  }



async create(data: SessionForm) {
  const { session, series } = data;
  
  if (!session) {
    throw new Error("Session data is required");
  }

  // If this is not a repeating session, just create/update a single session
  if (!series?.repeats || !series?.days?.length) {
    if (session.id) {
      const updatedSession = await prisma.session.update({
        where: { id: session.id },
        data: {
          description: session.description,
          duration: session.duration,
          date: session.date,
          groupId: session.groupId,
          subjectId: session.subjectId,
          seriesId: null,
        },
      });
      return { sessions: [updatedSession] };
    } else {
      const newSession = await prisma.session.create({
        data: {
          description: session.description ?? "",
          duration: session.duration!,
          date: session.date!,
          groupId: session.groupId!,
          subjectId: session.subjectId!,
        },
      });
      return { sessions: [newSession] };
    }
  }

  // Handle repeating sessions
  if (!session.date || !series.endsAt || !session.groupId || !session.subjectId) {
    throw new Error("Date, end date, group, and subject are required for repeating sessions");
  }

  let seriesRecord: Series;

  if (session.id) {
    const existingSession = await prisma.session.findUnique({
      where: { id: session.id },
    });

    if (existingSession?.seriesId) {
      // ✅ Update series info
      seriesRecord = await prisma.series.update({
        where: { id: existingSession.seriesId },
        data: {
          days: series.days,
          startsAt: session.date,
          endsAt: series.endsAt,
          repeats: true,
        },
      });

      // ✅ Delete all existing sessions in this series
      await prisma.session.deleteMany({
        where: { seriesId: seriesRecord.id },
      });

      console.log(`Reset series ${seriesRecord.id}, deleted old sessions, ready to recreate`);
    } else {
      // Session exists but not in a series → create a new series and attach this session
      seriesRecord = await prisma.series.create({
        data: {
          days: series.days,
          startsAt: session.date,
          endsAt: series.endsAt,
          repeats: true,
        },
      });

      await prisma.session.update({
        where: { id: session.id },
        data: { seriesId: seriesRecord.id },
      });
    }
  } else {
    // New session → new series
    seriesRecord = await prisma.series.create({
      data: {
        days: series.days,
        startsAt: session.date,
        endsAt: series.endsAt,
        repeats: true,
      },
    });
  }

  const startDate = new Date(session.date);
  const endDate = new Date(series.endsAt);
  endDate.setHours(23, 59, 59, 999);

  for (const requiredDate of generateDates(series.days, startDate, endDate)) {
    const newSession = await prisma.session.create({
      data: {
        description: session.description,
        duration: session.duration!,
        date: requiredDate,
        groupId: session.groupId,
        subjectId: session.subjectId,
        seriesId: seriesRecord.id,
      },
    });
  }
}

  update(id: string, data: any) {
    return prisma.series.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.series.delete({ where: { id } });
  }
}

export default new SeriesRepository();

