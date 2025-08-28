"use server";

import managementServices from "../services/management.service";

export async function getSubjectsAction() {
  return await managementServices.getSubjects();
}

export async function getSubjectsFromCourse(id: string) {
  return await managementServices.getSubjectsFromCourse(id);
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

export async function getGroupsAction() {
  return await managementServices.getGroups();
}

export async function getGroupByCourseAction(id: string) {
  return await managementServices.getGroupByCourse(id);
}

export async function uploadGroupAction(data: any) {
  return await managementServices.createGroup(data);
}

export async function getSessionsAction() {
  return await managementServices.getSessions();
}

export async function uploadSessionAction(data: any) {
  return await managementServices.createSession(data);
}

export async function uploadSeriesAction(data: any) {
  return await managementServices.createSeries(data);
}

export async function getSeriesByIdAction(id: string) {
  return await managementServices.getSeries(id);
}