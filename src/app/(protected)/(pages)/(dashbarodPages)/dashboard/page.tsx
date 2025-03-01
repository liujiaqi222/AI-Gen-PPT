import { getAllProjects } from "@/api/project";

const DashboardPage = async () => {
  const res = await getAllProjects();
  console.log(res);
  return <div>DashboardPage</div>;
};

export default DashboardPage;
