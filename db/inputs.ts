import { Prisma } from '.';

export default [
   {
      title: 'متن',
      type: 'TEXT',
      validations: ['MANDATORY', 'LENGTH'],
   },
   {
      title: 'رمز',
      type: 'PASSWORD',
      validations: ['MANDATORY', 'LENGTH'],
   },
   {
      title: 'ایمیل',
      type: 'EMAIL',
      validations: ['MANDATORY', 'LENGTH'],
   },
   {
      title: 'ادرس وب',
      type: 'URL',
      validations: ['MANDATORY', 'LENGTH'],
   },
   {
      title: 'عدد',
      type: 'NUMBER',
      validations: ['MANDATORY', 'RANGE'],
   },
   {
      title: 'انتخاب از بین گزینه ها',
      type: 'SELECT',
      validations: [],
   },
   {
      title: 'متن چند خظی',
      type: 'TEXTAREA',
      validations: ['MANDATORY', 'LENGTH'],
   },
   {
      title: 'سوییچ',
      type: 'SWITCH',
      validations: [],
   },
   // {
   //    title: 'چکباکس',
   //    type: 'CHECKBOX',
   //    validations: ['MANDATORY', 'LENGTH'],
   // },
   // {
   //    title: 'متنی',
   //    type: 'RADIO',
   //    validations: ['MANDATORY', 'LENGTH'],
   // },
] as Prisma.InputCreateInput[];
