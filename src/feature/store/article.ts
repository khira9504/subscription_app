import prisma from "@/lib/prisma";

export const getAllArticlesForList = async () => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: [{ updatedAt: "desc" }],
    });
    return articles;
  } catch(err) {
    throw err;
  };
};

export const getArticleById = async (id: string) => {
  try {
    const article = await prisma.article.findUnique({ where: { id } });
    return article;
  } catch(err) {
    throw err;
  };
};