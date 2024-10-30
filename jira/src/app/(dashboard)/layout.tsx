interface DashboardLayoutProps {
    children: React.ReactNode;
};


const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen">
            <div className="flex w-full h-full">
                <div className="flixed left-0 hidden lg:block lg:w-[264px]">

                </div>
                <div className="lg:pl-[264px]">
                    <div className="mx-auto max-w-screen-2xl h-full">
                        {/* TODO: Navbar */}
                        <main className="h-full py-8 px-6 flex flex-col">
                            {children} 
                        </main>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default DashboardLayout;