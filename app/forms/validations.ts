import { z } from 'zod';

import errors from '~core/errors';

const maxHundredError = errors.max(100);

export const formInputSchema = z.object({
   id: z.string().optional(),
   type: z.enum([
      'TEXT',
      'PASSWORD',
      'EMAIL',
      'URL',
      'NUMBER',
      // 'SELECT',
      // 'CHECKBOX',
      // 'RADIO',
      'TEXTAREA',
      // 'SWITCH',
   ]),
   label: z.string().nonempty(errors.required).max(50, errors.max(50)),
   placeholder: z.string().max(100, maxHundredError).optional(),
   defaultValue: z.string().optional(),
   // wide: z.boolean(),
   // options: z.array(z.string()).optional,
   // validations: z.array(z.enum(['MANDATORY', 'LENGTH', 'RANGE'])),
});

export const formSchema = z.object({
   id: z.string().optional(),
   title: z.string().nonempty(errors.required).max(100, maxHundredError),
   description: z.string().optional(),
   // submitMessage: z.string().optional(),
   inputs: z.array(formInputSchema),
});

export type FormSchema = z.infer<typeof formSchema>;
export type FormInputSchema = z.infer<typeof formInputSchema>;
