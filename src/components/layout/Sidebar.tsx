
import { NavLink } from 'react-router-dom';
import { BookOpen, Briefcase, User, FileText, Home } from 'lucide-react';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useI18n } from '@/contexts/I18nContext';

export const Sidebar = () => {
  const { t } = useI18n();

  const menuItems = [
    {
      title: t('nav.dashboard'),
      url: '/dashboard',
      icon: Home,
    },
    {
      title: t('nav.courses'),
      url: '/courses',
      icon: BookOpen,
    },
    {
      title: t('nav.jobs'),
      url: '/jobs',
      icon: Briefcase,
    },
    {
      title: t('nav.profile'),
      url: '/profile',
      icon: User,
    },
    {
      title: t('nav.resume'),
      url: '/resume',
      icon: FileText,
    },
  ];

  return (
    <ShadcnSidebar>
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg">{t('layout.appname')}</h2>
          </div>
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('nav.mainnavigation')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent hover:text-accent-foreground'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="mt-auto p-4">
        <SidebarTrigger />
      </div>
    </ShadcnSidebar>
  );
};
