import { ArticleList } from "@/components/article/ArticleList";
import { ArticleItemSkeleton } from "@/components/article/ArticleSkeletonList";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="max-w-screen-md mx-auto">
      <Suspense fallback={<ArticleItemSkeleton />}>
        <ArticleList />
      </Suspense>
    </main>
  );
}