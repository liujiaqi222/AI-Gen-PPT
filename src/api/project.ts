import { get,  } from '../lib/api'

export const getAllProjects = (options?: { headers?: HeadersInit }) => {
  return get("/projects", options);
};

