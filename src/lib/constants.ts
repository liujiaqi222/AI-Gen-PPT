import {  Home, LayoutTemplate, Settings2, Trash } from "lucide-react";

export const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

export const data = {
  user: {
    name: "shadcn",
    email: "abc@gamil.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "首页",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "模版",
      url: "/templates",
      icon: LayoutTemplate,
    },
    {
      title: "回收站",
      url: "/trash",
      icon: Trash,
    },
    {
      title: "设置",
      url: "/settings",
      icon: Settings2,
    },
  ],
};
