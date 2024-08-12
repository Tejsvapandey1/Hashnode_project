import Posts from "@/components/posts";
import { getPosts } from "@/lib/request";
import { PostMetadata } from "@/lib/types";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    getNextPageParam: (
      lastPage: {
        node: PostMetadata;
        cursor: string;
      }[]
    ) =>
      lastPage.length < 9 ? undefined : lastPage[lastPage.length - 1].cursor,
    initialPageParam: "",
  });

  return (
    <main className="max-w-7xl w-full px-3 xl:p-0 my-5 mx-auto ">
      <div className="grid grid-cols-1 lg:grid-col-3 gap-5 mt-4">
        <Posts />
      </div>
    </main>
  );
}
