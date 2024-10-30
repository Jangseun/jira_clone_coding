"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";

import { Sidebar } from "./sidebar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { usePathname } from "next/navigation";

export const MobileSidebar = () => {
    const [isOpen, setOpoen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {

    },[pathname]);
    return(
        <Sheet modal={false}>
            <SheetTrigger asChild>
                <Button variant="secondary" className="lg:hidden">
                    <MenuIcon className="size-4 text-neutral-500" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};