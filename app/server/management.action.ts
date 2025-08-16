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

export async function getGroupsAction() {
  return await managementServices.getGroups();
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