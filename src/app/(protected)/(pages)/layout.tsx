import { getRecentProjects } from "@/api/project";
import AppSideBar from "@/components/global/app-sidebar/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

const layout = async ({ children }: PropsWithChildren) => {
  const recentProjects = await getRecentProjects()
  // TODO:用户信息存储
  return (
    <SidebarProvider>
      <AppSideBar user={{ name: "jiaqi",email:'2473487465@qq.com' }} recentProjects={recentProjects.data || []} />
    </SidebarProvider>
  );
};

export default layout;
