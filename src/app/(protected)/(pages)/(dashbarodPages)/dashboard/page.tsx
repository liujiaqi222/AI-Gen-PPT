import { cookies } from "next/headers";
import { getAllProjects } from "@/api/project";

const DashboardPage = async () => {
  const cookieStore = await cookies();
  const res = await getAllProjects({ headers: { cookie: cookieStore.toString() } });
  console.log(res);
  return <div>DashboardPage</div>;
};

export default DashboardPage;
