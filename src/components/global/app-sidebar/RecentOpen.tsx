import type { JsonValue, Project } from "@/api/type";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { toast } from "sonner";

type Props = {
  recentProjects: Project[];
};
const RecentOpen = ({ recentProjects }: Props) => {
  const handleClick = (projectId: string, slides: JsonValue) => {
    if (!projectId || !slides) {
      toast.error("项目未找到", {
        description: "请重试",
      });
      return
    }
  };
  return (
    <>
      {recentProjects.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>最近打开</SidebarGroupLabel>
          <SidebarMenu>
            {recentProjects.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-primary-80">
                  <Button
                    variant="link"
                    onClick={() => handleClick(item.id, item.slides)}
                    className="text-xs items-center justify-start"
                  >
                    <span>{item.title}</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  );
};

export default RecentOpen;
