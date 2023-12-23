import Link from "next/link";

export default function Custom500() {
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">500 - Internal Server Error</h1>
            <p className="text-fore-secondary-light mb-8">Oops! Something went wrong on our end.</p>
            <p className="text-fore-secondary-light">Please try again later.</p>
            <Link href="/">
                <span className="text-blue-balloons-light hover:underline">Go back to the home page</span>
            </Link>
        </main>
    );
}