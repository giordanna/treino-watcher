export default async ({ store }) => {
  try {
    const treinos = JSON.parse(window.localStorage.getItem('treinos'));
    if (!!treinos) {
      store.commit('setarTreinos', treinos);
      console.log('setou treinos de localstorage!');
    }
  } catch (error) {
    window.localStorage.removeItem('treinos');
  }
};
