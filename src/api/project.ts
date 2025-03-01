import { serverGet } from "../lib/server-api";

export const getAllProjects = () => {
  return serverGet("/projects");
};

