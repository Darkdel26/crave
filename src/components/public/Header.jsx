"use client"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LuMenu, LuShoppingCart, LuUserRound, LuX } from "react-icons/lu";
import { useEffect, useState } from 'react'
import { getTotalItems } from '@/lib/cart';

export default function Header() {

    const navLinks = [
        { title: "Accueil", href: "/" },
        { title: "Nos spécialités", href: "/our-specialties" },
        { title: "Notre histoire", href: "/our-history" },
        { title: "Contact", href: "/contact" },
    ]

    const pathName = usePathname()
    const [showMenu, setShowMenu] = useState(false)
    const router = useRouter()
    const [cartTotalItems, setCartTotalItems] = useState(0);

    useEffect(() => {
        const update = () => setCartTotalItems(getTotalItems());
        update();
        window.addEventListener("cart-updated", update);

        return () => window.removeEventListener("cart-updated", update);
    }, []);


    return (
        <div className='top-0 w-full sticky z-30 shadow-sm py-2 bg-white'>
            <div className="conteneur">
                <div className="flex items-center justify-between">
                    <Link href="/" className='text-lg md:text-xl lg:text-2xl font-bold'>
                        Crave.
                    </Link>
                    <div className="hidden md:flex items-center gap-4">
                        {navLinks.map((navLink, index) => (
                            <Link key={index} href={navLink.href} className={`text-base ${pathName == navLink.href ? "text-amber-900 font-semibold" : "text-gray-700"}`}>
                                {navLink.title}
                            </Link>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <LuUserRound className='size-4 md:size-5 cursor-pointer' onClick={() => router.push('/login')} />
                        <button type='button' className="cursor-pointer flex" onClick={() => router.push("/cart")}>
                            <LuShoppingCart className='size-4 md:size-5' />
                            <sup className='text-amber-900 font-bold text-sm'>{cartTotalItems}</sup>
                        </button>
                        {!showMenu ? <LuMenu className='size-4 md:size-5 cursor-pointer flex md:hidden' onClick={() => setShowMenu(true)} /> : <LuX className='size-4 md:size-5 cursor-pointer flex md:hidden' onClick={() => setShowMenu(false)} />}
                    </div>
                </div>
                {showMenu && (
                    <div className="flex flex-col gap-3 md:hidden mt-1">
                        {navLinks.map((navLink, index) => (
                            <Link key={index} href={navLink.href} className={`text-sm ${pathName == navLink.href ? "text-amber-900 font-semibold" : "text-gray-700"}`} onClick={() => setShowMenu(false)}>
                                {navLink.title}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
