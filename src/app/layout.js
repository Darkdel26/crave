import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppinsSans = Poppins({
    variable: "--font-poppins-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export const metadata = {
    title: "Crave",
    description: "Votre patisserie en ligne",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="fr"
            className={`${poppinsSans.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                {children}
                <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
            </body>
        </html>
    );
}
