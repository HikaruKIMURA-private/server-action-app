// import { getPost } from "@/app/actions/post";
import PostForm from "../../../components/post-form";
import { notFound } from "next/navigation";
import { authGuard } from "../../../actions/auth";
import React from "react";
import { db } from "../../../../lib/prisma";

export default async function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const authorId = authGuard();

  const post = await db.post.findUnique({
    where: {
      id,
      authorId,
    },
  });

  if (!post) {
    notFound();
  }

  return <PostForm editId={id} />;
}
