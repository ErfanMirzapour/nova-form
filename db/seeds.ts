import db, { Prisma } from '.';
import { name, internet } from 'faker';

import inputs from './inputs';

const hashedPassword =
   'JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJHd0QVlZZjgxa2tMeWFhTmo0eGxUNGckN01mZ21PSnBpL09RZ1lOcFdUU2pOSEJBQk51ZzhtVGJnblZnOGVyYUc5TQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';

const users: Prisma.UserCreateInput[] = Array.from(Array(5), () => ({
   username: internet.userName(),
   fullName: `${name.firstName()} ${name.firstName()}`,
   hashedPassword,
}));
const customInputs: Omit<Prisma.CustomInputCreateInput, 'fieldSet'>[] = [
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
   await db.user.createMany({
      data: [
         {
            username: 'erfanmirzapour',
            fullName: 'Erfan Mirzapour',
            hashedPassword,
            role: 'ADMIN',
         },
         {
            username: 'test',
            fullName: 'Test User',
            hashedPassword,
            role: 'USER',
         },
         ...users,
      ],
   });

   await db.input.createMany({ data: inputs });

   await db.form.create({
      data: {
         title: 'فرم اول',
         owner: {
            connect: {
               username: 'erfanmirzapour',
            },
         },
         fieldSets: {
            create: {
               legend: 'مشخصات اولیه',
               inputs: {
                  createMany: {
                     data: customInputs,
                  },
               },
            },
         },
         results: {
            create: {
               submitter: {
                  connect: {
                     username: 'test',
                  },
               },
               result: formResult,
            },
         },
      },
   });
};

export default seed;
