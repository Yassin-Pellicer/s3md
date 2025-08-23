import { Course } from "@prisma/client";
import prisma from "../prisma/client";

export class CourseRepository {
  async getAll(
    includeGroups: boolean = false,
    includeSubjects: boolean = false
  ): Promise<Course[]> {
    return prisma.course.findMany({
      include: {
        groups: includeGroups
          ? {
              include: {
                sessions: {
                  include: {
                    subject: {
                      select: {
                        id: true,
                        tutorId: true,
                        topic: true,
                        description: true,
                        color: true,
                        tutor: {
                          select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            }
          : undefined,
        subjects: includeSubjects ? true : undefined,
      },
    });
  }

  getById(id: string): Promise<Course | null> {
    const course = prisma.course.findUnique({
      where: { id },
      include: {
        subjects: true,
        groups: true,
      },
    });
    console.log(course);
    return course;
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
