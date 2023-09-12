'use server';

import { prisma } from '@/utils/prisma';
import { getSession } from '@/utils/auth';
import type { Page } from '@/types';

type CreatePageDto = Pick<Page, 'title' | 'content' | 'slug' | 'locale'>;

export const createPage = async (formData: FormData) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const entries = Object.fromEntries(formData.entries()) as CreatePageDto;

  const result = await prisma.page.create({
    data: {
      ...entries,
      authorId: session.user.id,
    },
  });

  return result;
};

type UpdatePageDto = Partial<CreatePageDto>;

export const updatePage = async (id: string, formData: FormData) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const entries = Object.fromEntries(formData.entries()) as UpdatePageDto;

  const result = await prisma.page.update({
    where: { id, authorId: session.user.id },
    data: entries,
  });

  return result;
};