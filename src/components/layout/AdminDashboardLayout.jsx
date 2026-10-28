'use client'
import { LuHouse, LuLayoutDashboard, LuLogOut, LuPackage, LuUserRound } from 'react-icons/lu'
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarSeparator, SidebarTrigger } from '../ui/sidebar'
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminDashboardLayout({ children }) {

    const sidebarLinks = [
        { icon: LuHouse, title: "Accueil", href: "/" },
        { icon: LuLayoutDashboard, title: "Dashboard", href: "/admin/dashboard" },
        { icon: LuPackage, title: "Commandes", href: "/admin/orders" }
    ];
    const currentUser = { lastName: "NHN", firstName: "Del" }
    const router = useRouter();
    const pathName = usePathname()

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <span className="text-lg font-semibold px-3">
                        Crave.
                    </span>
                </SidebarHeader>

                <SidebarSeparator />

                <SidebarContent className="p-3">
                    <SidebarMenu>
                        {sidebarLinks.map((sidebarLink, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton render={<Link href={sidebarLink.href} />} isActive={pathName === sidebarLink.href}>
                                    <sidebarLink.icon />
                                    <span>{sidebarLink.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>

            <main className="flex flex-1 flex-col">
                <nav className="px-4 py-2 sticky top-0 bg-white z-5 flex items-center justify-between border border-b">
                    <SidebarTrigger />
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarFallback>
                                    {currentUser.firstName.charAt(0).toUpperCase()}
                                    {currentUser.lastName.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => router.push('/admin/profile')} className="cursor-pointer">
                                <LuUserRound />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant='destructive' onClick={() => router.push('/profile')} className="cursor-pointer">
                                <LuLogOut />
                                Déconnexion
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>

                <div className="flex-1 flex p-4">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}