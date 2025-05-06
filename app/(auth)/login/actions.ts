'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';
import { FormActionResult } from '@/util';
import db from '@/lib/db';
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/consts';
import { doLogin } from '@/util/async';

const formSchema = z.object({
  id: z.string().superRefine(async (userId, ctx) => {
    const user = await db.user.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    if (user === null) {
      ctx.addIssue({
        code: 'custom',
        message: '존재하지 않는 아이디입니다.',
        fatal: true,
      });
    }

    return z.NEVER;
  }),
  password: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function handleForm(_: any, formData: FormData): Promise<FormActionResult> {
  const data = {
    id: formData.get('id'),
    password: formData.get('password'),
  };

  const result = await formSchema.spa(data);

  if (result.success) {
    const user = await db.user.findUnique({
      where: {
        userId: result.data.id,
      },
      select: {
        id: true,
        password: true,
        avatar: true,
        username: true,
      },
    });

    if (user) {
      const ok = await bcrypt.compare(result.data.password, user.password ?? '');
      if (ok) {
        return doLogin({ id: user.id });
      } else {
        return {
          success: false,
          fieldErrors: { password: ['비밀번호를 확인해 주세요.'] },
        };
      }
    } else {
      return {
        success: false,
        fieldErrors: { password: ['비밀번호를 확인해 주세요.'] },
      };
    }
  } else {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }
}
