"use server";

import { z } from "zod";
import { db } from "../../lib/prisma";
import { authGuard } from "../actions/auth";
import { Prisma } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const UserSchema = z.object({
  name: z.string().max(240),
});

export const createUser = async (formData: FormData) => {
  "use server";

  const id = authGuard();
  const validatedData = UserSchema.parse({
    name: formData.get("name"),
  });

  const data: Prisma.UserUncheckedCreateInput = {
    id,
    name: validatedData.name,
  };

  await db.user.create({
    data,
  });

  await clerkClient.users.updateUserMetadata(id, {
    publicMetadata: {
      onboraded: true,
    },
  });

  // キャッシュをクリア
  revalidatePath("/");

  // トップページへリダイレクト
  redirect("/");
};
