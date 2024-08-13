import { PostMetadata } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "./card";
import Link from "next/link";

export default function BlogCard({ post }: { post: PostMetadata }) {
  return (
    <Card className="flex ">
      <CardHeader>
        
        <img
          src={
            post.coverImage?.url
              ? post.coverImage.url
              : "https://cdn.ebaumsworld.com/mediaFiles/picture/1151541/84693449.png"
          }
          alt={post.title}
          className="rounded-lg h-20 w-20"
        />
      </CardHeader>
      <CardTitle>
        <h2 className="text-xl text-bold font-bold">
          <Link className="hover:underline text-lg" href={`/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        <div className="mt-3 flex gap-3 item-center text-sm ">
          {post.author?.profilePicture && (
            <img
              src={post.author.profilePicture}
              className="rounded-full h-5 w-5 -mx-1 flex flex-shrink-0"
            />
          )}
          {post.author?.name}
        </div>
        <p className="text-gray-500 line-clamp-4 mt-3">
          {post.subtitle || post.content.text.slice(0,200)}
        </p>
      </CardTitle>
    </Card>
  );
}
