import db from '~db';

const deleteForm = async (id: string) => {
   await db.customInput.deleteMany({ where: { formId: id } });

   return db.form.delete({ where: { id } });
};

export default deleteForm;
