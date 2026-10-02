"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FoundationLogo } from "@/components/foundation-logo";
import { useDashboardIdentity } from "@/components/dashboard/use-dashboard-identity";
import { Icon } from "@/components/icon";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: "grid" },
  { label: "Masterlist", href: "/dashboard/masterlist", icon: "users", count: "4.2k" },
  { label: "CARES Program", href: "/dashboard/cares-program", icon: "heart" },
  { label: "SGL Database", href: "/dashboard/sgl-database", icon: "activity" },
  { label: "SGM Database", href: "/dashboard/sgm-database", icon: "shield" },
  { label: "SD Calendar", href: "/dashboard/calendar", icon: "calendar" },
  { label: "Reports", href: "/dashboard/reports", icon: "file" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
] as const;

function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen, identity }: {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  identity: ReturnType<typeof useDashboardIdentity>;
}) {
  const pathname = usePathname();
  return (
    <>
      {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""} ${mobileOpen ? "sidebar-mobile-open" : ""}`}>
        <div className="sidebar-brand">
          <FoundationLogo className="foundation-logo" />
          <div className="brand-copy"><span className="brand-name">Tanglaw</span><span className="brand-caption">TOUCH CARE FOUNDATION</span></div>
          <button className="collapse-button" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={() => setCollapsed(!collapsed)}><Icon name="chevron-left" size={16} /></button>
          <button className="mobile-close" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><Icon name="x" /></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
            return <Link key={item.href} href={item.href} className={`nav-link ${active ? "nav-link-active" : ""}`} onClick={() => setMobileOpen(false)} title={collapsed ? item.label : undefined}>
              <Icon name={item.icon} size={18} /><span className="nav-text">{item.label}</span>{"count" in item && <span className="nav-count">{item.count}</span>}
            </Link>;
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><Icon name="help" size={17} /></div><div className="help-copy"><strong>Need a hand?</strong><span>Visit the help center</span></div><Icon name="chevron-right" size={15} className="help-arrow" /></div>
          <div className="sidebar-user"><div className="user-avatar">{identity.initials}</div><div className="user-copy"><strong>{identity.name}</strong><span>Area administrator</span></div><Link href="/" aria-label="Sign out" className="logout-button" title="Sign out"><Icon name="logout" size={17} /></Link></div>
        </div>
      </aside>
    </>
  );
}

function TopBar({ setMobileOpen, identity }: { setMobileOpen: (open: boolean) => void; identity: ReturnType<typeof useDashboardIdentity> }) {
  const pathname = usePathname();
  const activeItem = navItems.find((item) => item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href));
  return (
    <header className="topbar">
      <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Icon name="menu" size={21} /></button>
      <div className="breadcrumb"><span>Workspace</span><Icon name="chevron-right" size={14} /><strong>{activeItem?.label ?? "Metro East Area"}</strong></div>
      <div className="topbar-actions">
        <Link className="global-search" href="/dashboard/masterlist"><Icon name="search" size={17} /><span>Search anything...</span><kbd>⌘ K</kbd></Link>
        <button className="icon-button notification-button" aria-label="Notifications"><Icon name="bell" size={19} /><i /></button>
        <div className="topbar-divider" />
        <button className="topbar-profile" aria-label="Open profile menu"><span className="user-avatar">{identity.initials}</span><span className="profile-chevron"><Icon name="chevron-down" size={15} /></span></button>
      </div>
    </header>
  );
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const identity = useDashboardIdentity();
  const activeItem = navItems.find((item) => item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href));
  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} identity={identity} />
      <div className={`main-column ${collapsed ? "main-column-wide" : ""}`}>
        <TopBar setMobileOpen={setMobileOpen} identity={identity} />
        <main className="main-content">
          <div className="mobile-page-title">{activeItem?.label ?? "Dashboard"}</div>
          {children}
          <footer className="app-footer"><span>© 2026 Tanglaw Touch Care Foundation</span><span>Made for stronger communities <span className="footer-heart">♥</span></span></footer>
        </main>
      </div>
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {navItems.filter((item) => ["Overview", "Masterlist", "CARES Program", "SD Calendar"].includes(item.label)).map((item) => {
          const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
          const label = item.label === "CARES Program" ? "Programs" : item.label === "SD Calendar" ? "Calendar" : item.label;
          return <Link key={item.href} href={item.href} className={active ? "mobile-nav-active" : ""}><Icon name={item.icon} size={19} /><span>{label}</span></Link>;
        })}
      </nav>
    </div>
  );
}
