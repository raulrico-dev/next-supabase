import Link from "next/link";

export default function Navbar() {
    return(
        <section className="w-full flex justify-between items-center p-2 px-6">
            <div className="flex-1">
                <Link href={"/"} className="font-semibold text-2xl">Brandname.com</Link>
            </div>
            <nav className="flex flex-row justify-center items-center gap-2">
                <Link href={"/"}>Home</Link>
                <Link href={"/user/"}>Protected</Link>
                <Link href={"/auth/signup"}>Sign Up</Link>
                <Link href={"/auth/login"}>Log In</Link>
            </nav>
        </section>
    )
}