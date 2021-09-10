import { z } from 'zod';

import { Form, FormProps } from '~core/components/Form';
import { LabeledTextField } from '~core/components/LabeledTextField';
export { FORM_ERROR } from '~core/components/Form';

export function QuestionForm<S extends z.ZodType<any, any>>(
   props: FormProps<S>
) {
   return (
      <Form<S> {...props}>
         <LabeledTextField name='text' label='Text' placeholder='Text' />
      </Form>
   );
}
