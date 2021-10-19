import db, { Prisma } from '.';
import { SecurePassword } from 'blitz';
import { name, internet } from 'faker';

import inputs from './inputs';

const customInputs: Prisma.CustomInputCreateManyFormInput[] = [
   {
      label: 'نام',
      placeholder: 'نام خود را وارد کنید',
      validations: ['MANDATORY', 'LENGTH'],
      wide: false,
   },
   {
      label: 'نام خانوادگی',
      placeholder: 'نام خانوادگی خود را وارد کنید',
      validations: ['MANDATORY', 'LENGTH'],
      wide: false,
   },
   {
      type: 'SELECT',
      label: 'کشور',
      options: ['ایران', 'امارات', 'ترکیه'],
   },
];
const formResult = [
   {
      title: 'مشخصات اولیه',
      results: {
         نام: 'تست',
         'نام خانوادگی': 'تستی',
         کشور: 'ایران',
      },
   },
];

const seed = async () => {
   const hashedPassword = await SecurePassword.hash('123456');

   const users: Prisma.UserCreateInput[] = Array.from(Array(5), () => ({
      username: internet.userName(),
      // fullName: `${name.firstName()} ${name.firstName()}`,
      hashedPassword,
   }));

   await db.user.createMany({
      data: [
         {
            username: 'erfanmirzapour',
            // fullName: 'Erfan Mirzapour',
            hashedPassword,
            role: 'ADMIN',
         },
         {
            username: 'test',
            // fullName: 'Test User',
            hashedPassword,
            role: 'USER',
         },
         ...users,
      ],
   });

   await db.input.createMany({ data: inputs });

   const newForm = {
      data: {
         title: 'فرم اول',
         description: 'توضیحات فرم',
         submitMessage: 'با تشکر از شما',
         owner: {
            connect: {
               username: 'erfanmirzapour',
            },
         },
         // fieldSets: {
         //    create: {
         //       legend: 'مشخصات اولیه',
         //       inputs: {
         //          createMany: {
         //             data: customInputs,
         //          },
         //       },
         //    },
         // },
         inputs: {
            createMany: {
               data: customInputs,
            },
         },
         // results: {
         //    create: {
         //       submitter: {
         //          connect: {
         //             username: 'test',
         //          },
         //       },
         //       result: formResult,
         //    },
         // },
      },
   };
   await db.form.create(newForm);
   await db.form.create(newForm);
   await db.form.create(newForm);
};

export default seed;
