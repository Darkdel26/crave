import SuperAdminDashboardLayout from "@/components/layout/SuperAdminDashboardLayout";

export default function AdminLayout({ children }) {
    return (
        <SuperAdminDashboardLayout>
            {children}
        </SuperAdminDashboardLayout>
    )
}
