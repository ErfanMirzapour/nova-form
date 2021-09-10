import { z } from 'zod';

import { Form, FormProps, LabeledTextField } from '~core/components';

const QuestionForm = <S extends z.ZodType<any, any>>(props: FormProps<S>) => {
   return (
      <Form<S> {...props}>
         <LabeledTextField name='text' label='Text' placeholder='Text' />
      </Form>
   );
};

export default QuestionForm;
