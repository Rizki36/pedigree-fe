import { createContext, useContext, useState, type ReactNode } from "react";

type SidebarContextType = {
  collapsed: boolean;
  toggleSidebar: () => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(prev => !prev);
  const expandSidebar = () => setCollapsed(false);
  const collapseSidebar = () => setCollapsed(true);

  return (
    <SidebarContext.Provider 
      value={{ 
        collapsed, 
        toggleSidebar, 
        expandSidebar, 
        collapseSidebar 
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};