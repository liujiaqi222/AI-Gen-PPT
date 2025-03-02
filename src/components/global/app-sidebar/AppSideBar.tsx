'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar, SidebarContent, SidebarFooter,  SidebarHeader, SidebarMenuButton } from "@/components/ui/sidebar";
import NavMain from "./NavMain";
import { data } from "@/lib/constants";
import RecentOpen from "./RecentOpen";
import { Project } from "@/api/type";
type Props = {
  recentProjects: Project[];
  user: any;
} & React.ComponentProps<typeof Sidebar>;

const AppSideBar = ({ recentProjects, user, ...props }: Props) => {
  return (
    <Sidebar collapsible="icon" className="max-w-[212px] bg-background-900" {...props}>
      <SidebarHeader className="pt-6 px-3 pb-0">
        <SidebarMenuButton size={"lg"} className="data-[state=open] :text-sidebar-accent-foreground">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src={"./ai-gen.svg"} />
              <AvatarFallback>AI-GEN</AvatarFallback>
            </Avatar>
          </div>
          <span className="truncate text-primary text-xl font-semibold">Slides-Gen</span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="px-3 mt-10 gap-y-6">
        <NavMain items={data.navMain} />
        <RecentOpen recentProjects={recentProjects}/>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSideBar;
