"use client";

import React from "react";
import { getPosts } from "@/lib/request";
import { useInfiniteQuery } from "@tanstack/react-query";
import BlogCard from "./ui/blog-card";
import { Button } from "./ui/button";

export default function Posts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    getNextPageParam: (lastPage) =>
      lastPage.length < 9 ? undefined : lastPage[lastPage.length - 1].cursor,
    initialPageParam: "",
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.pages.map((group) =>
        group?.map((post) => <BlogCard key={post.cursor} post={post.node} />)
      )}
      <div className="col-span-full flex justify-center items-center my-5">
        <Button
          className="w-full max-w-xs"
          variant="outline"
          disabled={!hasNextPage || isFetching}
          onClick={() => fetchNextPage()}
        >
          {isFetching
            ? "Loading..."
            : hasNextPage
            ? "Load more"
            : "That's all for today!"}
        </Button>
      </div>
    </div>
  );
}
