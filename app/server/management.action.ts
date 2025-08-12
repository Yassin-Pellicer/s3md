"use server";

import managementServices from "../services/management.service";

export async function getSubjectsAction() {
  return await managementServices.getSubjects();
}

export async function uploadSubjectAction(data: any) {
  return await managementServices.createSubject(data);
}