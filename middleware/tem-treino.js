export default async ({ store, redirect }) => {
  if (!store.getters.temTreinos) {
    redirect('/');
  }
};
