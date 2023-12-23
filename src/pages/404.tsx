import Link from "next/link";

export default function Custom404() {
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-secondary-light mb-8">The page you&lsquo;re looking for doesn&lsquo;t exist.</p>
            <Link href="/">
                <span className="text-blue-balloons-light hover:underline">Go back to the home page</span>
            </Link>
        </main>
    );
}