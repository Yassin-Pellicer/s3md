import { usePathname, useRouter } from "next/navigation";

export const hooks = () => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    { name: "Home", route: "/", icon: "home" },
    { name: "Blog", route: "/tutor/blog", icon: "article" },
    { name: "Schedules", route: "/editor", icon: "event" },
    { name: "Resources", route: "/tutor/resources", icon: "folder" },
    { name: "Settings", route: "/settings", icon: "settings" },
    { name: "About", route: "/logout", icon: "info" },
  ];

  const handleRouteChange = (route: string) => {
    router.push(route);
  };

  return {
    routes,
    handleRouteChange
  };
};
