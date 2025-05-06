'use server';

import bcrypt from 'bcrypt';
import { z } from 'zod';
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '../../../../lib/consts';
import { FormActionResult } from '../../../../util';
import db from '../../../../lib/db';
import getSession from '../../../../lib/session';

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    prev_password: z.string().superRefine(async (pw, ctx) => {
      const session = await getSession();
      const user = await db.user.findUnique({
        where: {
          id: session.id,
        },
        select: {
          password: true,
        },
      });

      if (user) {
        const ok = await bcrypt.compare(pw, user.password ?? '');
        if (!ok) {
          ctx.addIssue({
            code: 'custom',
            message: '비밀번호가 맞지 않습니다.',
            fatal: true,
          });
        }
      }
      return z.NEVER;
    }),
    password: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string(),
  })
  .refine(checkPasswords, { message: '비밀번호를 확인해 주세요', path: ['confirm_password'] });

export async function handleForm(_: any, formData: FormData): Promise<FormActionResult> {
  const data = {
    prev_password: formData.get('prev_password'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };
  const result = await formSchema.spa(data);

  if (result.success) {
    return {
      success: true,
    };
  } else {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  return { success: true };
}
