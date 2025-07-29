export const hooks = () => {
  
  const routes = [
    {name: "Home", route: "/", icon: "home"},
    {name: "Blog", route: "", icon: "article"},
    {name: "Schedules", route: "/editor", icon: "event"},
    {name: "Resources", route: "/explorer", icon: "folder"},
    {name: "Settings", route: "/settings", icon: "settings"},
    {name: "About", route: "/logout", icon: "info"},
  ]

  const handleRouteChange = (route: string) => {
  };

  return {
    routes
  };
};
