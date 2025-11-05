import type {Metadata} from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import {ReactNode} from "react";
import {Toaster} from "react-hot-toast";
import Providers from "@/components/Providers";
import FooterComponent from "../components/Footer";

export const metadata: Metadata = {
    title: "Note Master",
};

export default function RootLayout({children,}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="">
        <Providers>
            <div className=""
                 style={
                     {
                         backgroundImage: `url("/images/leafwing.png")`,
                         backgroundSize: "cover",
                         backgroundPosition: "center",
                     }
                 }>
                <Toaster
                    position="bottom-right"
                    reverseOrder={true}
                />
            <Navbar/>
                {children}
            <FooterComponent/>
            </div>
        </Providers>
        </body>
        </html>
    );
}
