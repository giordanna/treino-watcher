export const state = () => ({
  treinos: [],
});

export const getters = {
  treinos(state) {
    return state.treinos;
  },
  temTreinos(state) {
    return state.treinos.length > 0;
  },
};

export const mutations = {
  setarTreinos(state, treinos) {
    state.treinos = [...treinos];
    window.localStorage.setItem('treinos', JSON.stringify(state.treinos));
  },
  adicionarTreino(state, treino) {
    state.treinos = [...state.treinos, treino];
    window.localStorage.setItem('treinos', JSON.stringify(state.treinos));
  },
  editarTreino(state, treino) {
    const index = state.treinos.findIndex(treinoState => {
      treinoState.id === treino.id;
    });

    if (index > -1) {
      state.treinos[index] = treino;
      window.localStorage.setItem('treinos', JSON.stringify(state.treinos));
    } else {
      throw new Error('Treino não encontrado');
    }
  },
  removerTreino(state, id) {
    const index = state.treinos.findIndex(treino => {
      treino.id === id;
    });

    if (index > -1) {
      state.treinos[index].splice(index, 1);
      window.localStorage.setItem('treinos', JSON.stringify(state.treinos));
    } else {
      throw new Error('Treino não encontrado');
    }
  },
};

export const actions = {
  getTreino({ state }, id) {
    const index = state.treinos.findIndex(treino => {
      treino.id === id;
    });

    if (index > -1) {
      return {
        ...state.treinos[index],
      };
    } else {
      throw new Error('Treino não encontrado');
    }
  },
  getExercicio({ state }, { idTreino, idExercicio }) {
    const indexTreino = state.treinos.findIndex(treino => {
      treino.id === idTreino;
    });

    if (indexTreino > -1) {
      const indexExercicio = state.treinos[indexTreino].exercicios.findIndex(exercicio => {
        exercicio.id === idExercicio;
      });

      if (indexExercicio > -1) {
        return {
          ...state.treinos[indexTreino].exercicios[indexExercicio],
        };
      } else {
        throw new Error('Exercício não encontrado');
      }
    } else {
      throw new Error('Treino não encontrado');
    }
  },
};
