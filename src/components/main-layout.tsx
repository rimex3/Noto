import Sidebar from "./sidebar";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex items-center">
            <Sidebar />
            {children}
        </main>
    )
}
