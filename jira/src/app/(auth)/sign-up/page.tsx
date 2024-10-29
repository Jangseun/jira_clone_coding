import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { SignUpCard } from "@/features/auth/components/sign-up-card";


const SingnUpPage = async () =>{
    const user = await getCurrent();

    console.log({user})

    if (user) redirect("/");

    return <SignUpCard />
};

export default SingnUpPage;
