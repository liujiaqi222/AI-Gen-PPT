import { serverGet } from "../lib/server-api";
import type { ApiResponse, Project } from "./type";

export const getAllProjects = () => {
  return serverGet<ApiResponse<Project[]>>("/projects");
};

export const getRecentProjects = () => {
  return serverGet<ApiResponse<Project[]>>("/projects/recent");
};
