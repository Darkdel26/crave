import UserDashboardLayout from "@/components/layout/UserDashboardLayout";

export default function layout({children}) {
    return (
        <UserDashboardLayout>
            {children}
        </UserDashboardLayout>
    )
}
