'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Brain,
  DollarSign,
  Settings,
  Users,
  AlertTriangle,
  Activity,
  GitBranch,
  Shield,
  Zap,
  FileText,
  Database
} from 'lucide-react';

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: Activity,
  },
  {
    name: 'Quality',
    href: '/dashboard/quality',
    icon: Brain,
  },
  {
    name: 'Cost Optimization',
    href: '/dashboard/costs',
    icon: DollarSign,
  },
  {
    name: 'Prompts',
    href: '/dashboard/prompts',
    icon: GitBranch,
  },
  {
    name: 'Models',
    href: '/dashboard/models',
    icon: Zap,
  },
  {
    name: 'Traces',
    href: '/dashboard/traces',
    icon: Database,
  },
  {
    name: 'Alerts',
    href: '/dashboard/alerts',
    icon: AlertTriangle,
  },
  {
    name: 'Security',
    href: '/dashboard/security',
    icon: Shield,
  },
  {
    name: 'Team',
    href: '/dashboard/team',
    icon: Users,
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: FileText,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
      <nav className="p-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200 mt-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Quick Stats
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">This Month</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Requests</span>
              <span className="text-sm font-medium">847.2K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Cost Saved</span>
              <span className="text-sm font-medium text-green-600">$2,341</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Accuracy</span>
              <span className="text-sm font-medium text-blue-600">99.7%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}