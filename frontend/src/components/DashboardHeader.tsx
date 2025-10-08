// Deprecated compatibility wrapper
// The dashboard headers were split into role-specific components:
// - ReceptionistDashboardHeader
// - CoordinatorDashboardHeader
// - AdminDashboardHeader
// Keep this file so older imports don't break; it re-exports the receptionist header.
export { ReceptionistDashboardHeader as DashboardHeader } from './ReceptionistDashboardHeader';