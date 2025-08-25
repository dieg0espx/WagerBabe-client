/**
 * Layout components - Page layout and navigation components
 * 
 * These components handle the overall page structure, navigation,
 * and layout patterns for the application. They provide the
 * framework within which other components are displayed.
 * 
 * Layout components should:
 * - Handle page structure and organization
 * - Provide navigation and routing support
 * - Manage responsive layout behavior
 * - Support the betting context theming
 * - Be reusable across different pages
 */

// Main layout component - USE THIS ONE
export { UnifiedLayout } from './unified-layout'

// Theme components
export { ThemeToggle } from './theme-toggle'
export { useThemeTransition } from './theme-transition'

// TODO: Create these layout components as needed
// export { DashboardLayout } from './dashboard-layout'

// TODO: Create these navigation components as needed
// export { MainNavbar } from './main-navbar'
// export { SportsNavbar } from './sports-navbar'
// export { MainSidebar } from './main-sidebar'
// export { SportsSidebar } from './sports-sidebar'
// export { MobileNav } from './mobile-nav'

// TODO: Create these header and footer components as needed
// export { AppHeader } from './app-header'
// export { AppFooter } from './app-footer'
// export { PageHeader } from './page-header'
// export { BreadcrumbNav } from './breadcrumb-nav'

// TODO: Create these container and wrapper components as needed
// export { Container } from './container'
// export { Section } from './section'
// export { ContentArea } from './content-area'
// export { SidePanel } from './side-panel'

// TODO: Create these responsive layout utilities as needed
// export { ResponsiveGrid } from './responsive-grid'
// export { FlexLayout } from './flex-layout'
// export { StackLayout } from './stack-layout'

// Re-export types
export type { UnifiedLayoutProps } from './unified-layout'
export type { ThemeToggleProps } from './theme-toggle'

// TODO: Add type exports when components are created
// export type { DashboardLayoutProps } from './dashboard-layout'
// export type { MainNavbarProps } from './main-navbar'
// export type { SportsNavbarProps } from './sports-navbar'
// export type { MainSidebarProps } from './main-sidebar'
// export type { SportsSidebarProps } from './sports-sidebar'
// export type { MobileNavProps } from './mobile-nav'
// export type { AppHeaderProps } from './app-header'
// export type { AppFooterProps } from './app-footer'
// export type { PageHeaderProps } from './page-header'
// export type { BreadcrumbNavProps } from './breadcrumb-nav'
// export type { ContainerProps } from './container'
// export type { SectionProps } from './section'
// export type { ContentAreaProps } from './content-area'
// export type { SidePanelProps } from './side-panel'
// export type { ResponsiveGridProps } from './responsive-grid'
// export type { FlexLayoutProps } from './flex-layout'
// export type { StackLayoutProps } from './stack-layout'
