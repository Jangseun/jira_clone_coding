import { redirect } from "next/navigation"; 

import { getCurrent } from "@/features/auth/actions";
import { SignInCard } from "@/features/auth/components/sign-in-card";

const SingnInPage = async () => {
    const user = await getCurrent();

    if (user) redirect("/");

    return <SignInCard />
};

export default SingnInPage;
