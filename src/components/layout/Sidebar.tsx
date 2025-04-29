
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Package2, 
  ImageIcon, 
  FileText, 
  Settings, 
  Home, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: Home, 
      path: '/dashboard' 
    },
    { 
      name: 'Templates', 
      icon: LayoutGrid, 
      path: '/templates' 
    },
    { 
      name: 'Produtos', 
      icon: Package2, 
      path: '/produtos' 
    },
    { 
      name: 'Banco de Imagens', 
      icon: ImageIcon, 
      path: '/imagens' 
    },
    { 
      name: 'Encartes', 
      icon: FileText, 
      path: '/encartes' 
    },
    { 
      name: 'Configurações', 
      icon: Settings, 
      path: '/configuracoes' 
    }
  ];

  return (
    <div 
      className={cn(
        "fixed md:relative z-20 h-full bg-white dark:bg-gray-800 border-r flex flex-col transition-all duration-300 shadow-md md:shadow-none",
        isOpen ? "w-64" : "w-0 md:w-20 overflow-hidden"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <div className={cn("flex items-center", !isOpen && "md:hidden")}>
          <div className="w-8 h-8 rounded-md bg-primary-500 flex items-center justify-center">
            <FileText size={20} className="text-white" />
          </div>
          <span className="ml-2 font-heading font-bold text-dark dark:text-white">Encarte Pro</span>
        </div>
        <div className={cn("hidden md:flex items-center justify-center", !isOpen && "md:block w-full")}>
          {isOpen ? (
            <ChevronLeft
              size={20}
              className="cursor-pointer text-gray-500 hover:text-primary-500 transition-colors"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <ChevronRight
              size={20}
              className="cursor-pointer text-gray-500 hover:text-primary-500 transition-colors"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "sidebar-item",
                  isActive ? "sidebar-item-active" : "sidebar-item-inactive",
                  !isOpen && "md:justify-center"
                )}
              >
                <item.icon size={20} />
                {isOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <div className={cn(
          "flex items-center",
          !isOpen && "md:justify-center"
        )}>
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="font-medium text-primary-500">US</span>
          </div>
          {isOpen && (
            <div className="ml-2">
              <div className="font-medium text-sm">Usuário</div>
              <div className="text-xs text-gray-500">usuario@mercado.com</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
