import { Suspense } from 'react';
import {
   Head,
   Link,
   useRouter,
   useQuery,
   useMutation,
   useParam,
   BlitzPage,
   Routes,
} from 'blitz';

import { Layout, FORM_ERROR } from '~core/components';
import { getQuestion, updateQuestion } from '~questions/resolvers';
import { QuestionForm } from '~questions/components';

export const EditQuestion = () => {
   const router = useRouter();
   const questionId = useParam('questionId', 'string');
   const [question, { setQueryData }] = useQuery(
      getQuestion,
      { id: questionId },
      {
         // This ensures the query never refreshes and overwrites the form data while the user is editing.
         staleTime: Infinity,
      }
   );
   const [updateQuestionMutation] = useMutation(updateQuestion);

   return (
      <>
         <Head>
            <title>Edit Question {question.id}</title>
         </Head>

         <div>
            <h1>Edit Question {question.id}</h1>
            <pre>{JSON.stringify(question, null, 2)}</pre>

            <QuestionForm
               submitText='Update Question'
               // TODO use a zod schema for form validation
               //  - Tip: extract mutation's schema into a shared `validations.ts` file and
               //         then import and use it here
               // schema={UpdateQuestion}
               initialValues={question}
               onSubmit={async values => {
                  try {
                     const updated = await updateQuestionMutation({
                        id: question.id,
                        ...values,
                     });
                     await setQueryData(updated);
                     router.push(
                        Routes.ShowQuestionPage({ questionId: updated.id })
                     );
                  } catch (error) {
                     console.error(error);
                     return {
                        [FORM_ERROR]: error.toString(),
                     };
                  }
               }}
            />
         </div>
      </>
   );
};

const EditQuestionPage: BlitzPage = () => {
   return (
      <div>
         <Suspense fallback={<div>Loading...</div>}>
            <EditQuestion />
         </Suspense>

         <p>
            <Link href={Routes.QuestionsPage()}>
               <a>Questions</a>
            </Link>
         </p>
      </div>
   );
};

EditQuestionPage.authenticate = true;
EditQuestionPage.getLayout = page => <Layout>{page}</Layout>;

export default EditQuestionPage;
