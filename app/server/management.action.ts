"use server";

import managementServices from "../services/management.service";

export async function getSubjectsAction() {
  return await managementServices.getSubjects();
}

export async function uploadSubjectAction(data: any) {
  return await managementServices.createSubject(data);
}

export async function getCoursesAction(includeGroups: boolean = false, includeSubjects: boolean = false) {
  return await managementServices.getCourses(includeGroups, includeSubjects);
}

export async function uploadCoursesAction(data: any) {
  return await managementServices.createCourse(data);
}