import { z } from "zod";
import { Hono } from "hono";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie"
import { zValidator } from "@hono/zod-validator";

import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";

import { AUTH_COOKIE } from "../constans";
import { loginSchema, registerSchema } from "../schema";

const app = new Hono()
    .get(                   
        "/current",
        sessionMiddleware,
        (c) => {
            const user = c.get("user");

            return c.json({ data : user});
        }
    )
    .post(
        "/login",
        zValidator("json", loginSchema), //zva 어쩌구 애는 타입검증
         async (c) => {
            const { email, password } = c.req.valid("json");  //유저가 우리에게 보내오는 정보 req 리쿼스트
                                                                 //우리가 유저에게 보내면 리스폰스
            const { account } = await createAdminClient();
            const session = await account.createEmailPasswordSession(email, password); 
            
            setCookie(c, AUTH_COOKIE, session.secret, {  //secet : 애는 암호화
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
            });

        return c.json({ email, password });
        }
    )
    .post(
        "/register",
        zValidator("json", registerSchema),
        async (c) => {
            const { name, email, password } = c.req.valid("json");

            const { account } = await createAdminClient();

            await account.create(ID.unique(), email, password, name);

            const session = await account.createEmailPasswordSession(email, password);
            
            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
            });

            return c.json({ name, email, password });
        })
        .post("/logout", sessionMiddleware, async (c) => {
            const account = c.get("account");

            deleteCookie(c, AUTH_COOKIE);
            await account.deleteSession("current");    // 세션 삭제

            return c.json({success: "ok"});
        });

export default app;

