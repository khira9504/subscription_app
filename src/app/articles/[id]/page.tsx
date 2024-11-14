import { notFound } from "next/navigation";
import ArticleDetail from "@/components/article/ArticleDetail";
import { getArticleById } from "@/feature/store/article";

export default async function page({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id);

  if(!article) {
    notFound();
  };

  return (
    <main className="max-w-screen-md mx-auto bg-white">
      <ArticleDetail article={ article } />
    </main>
  )
}
