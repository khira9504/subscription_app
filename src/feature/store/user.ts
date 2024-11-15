import prisma from "@/lib/prisma";

export const getUserById = async ({ userId }: { userId: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch(err) {
    throw err;
  };
};

export const updateUserCustomerId = async ({ userId, customerId }: { userId: string; customerId: string; }) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        customerId: customerId,
      }
    });
  } catch(err) {
    throw err;
  };
};