import { Box, Icon, IconButton, Text } from '@chakra-ui/react';
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';

import { HookForm, Select, TextArea, TextField } from '~core/components';
import { FormInputSchema, formInputSchema, FormSchema } from '../validations';

const addFieldInitialValues: FormInputSchema = {
   type: 'TEXT',
   label: '',
   placeholder: '',
   defaultValue: '',
};

interface Props {
   addField: (fields: FormInputSchema) => void;
}

const AddField = ({ addField }: Props) => {
   return (
      <HookForm
         submitText='اضافه کردن فیلد'
         submitScheme='orange'
         schema={formInputSchema}
         initialValues={addFieldInitialValues}
         onSubmit={addField}
         resetAfterSubmit
      >
         <Select name='type' label='نوع'>
            <option value='TEXT' selected>
               متن
            </option>
            <option value='PASSWORD'>رمز</option>
            <option value='EMAIL'>ایمیل</option>
            <option value='URL'>آدرس URL</option>
            <option value='NUMBER'>عدد</option>
            <option value='TEXTAREA'>متن طولانی</option>
         </Select>
         <TextField name='label' label='عنوان' />
         <TextField name='placeholder' label='نوشته موقت' />
         <TextField name='defaultValue' label='مقدار پیش فرض' />
      </HookForm>
   );
};

export default AddField;
