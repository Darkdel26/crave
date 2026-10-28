import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";

export default function AdminLayout({ children }) {
    return (
        <AdminDashboardLayout>
            {children}
        </AdminDashboardLayout>
    )
}
