export const state = () => ({
  treinos: [],
  botaoEsquerdo: null,
  botaoDireito: null,
});

export const getters = {
  treinos(state) {
    return state.treinos.map(treino => {
      return {
        ...treino,
        exercicios: [...treino.exercicios],
      };
    });
  },
  temTreinos(state) {
    return state.treinos.length > 0;
  },
  botaoEsquerdo(state) {
    return state.botaoEsquerdo;
  },
  botaoDireito(state) {
    return state.botaoDireito;
  },
};

export const mutations = {
  setarBotaoEsquerdo(state, botaoEsquerdo) {
    state.botaoEsquerdo = botaoEsquerdo;
  },
  setarBotaoDireito(state, botaoDireito) {
    state.botaoDireito = botaoDireito;
  },
  setarTreinos(state, treinos) {
    state.treinos = [...treinos];
    window.localStorage.setItem('treinos', JSON.stringify(state.treinos));
  },
  adicionarTreino(state, treino) {
    state.treinos = [...state.treinos, treino];
    window.localStorage.setItem('treinos', JSON.stringify(state.treinos));
  },
  editarTreino(state, treino) {
    const index = state.treinos.findIndex(
      treinoState => treinoState.id.toString() === treino.id.toString(),
    );

    if (index > -1) {
      state.treinos[index] = treino;
      window.localStorage.setItem('treinos', JSON.stringify(state.treinos));
    } else {
      throw new Error('Treino não encontrado');
    }
  },
  removerTreino(state, id) {
    const index = state.treinos.findIndex(treino => treino.id.toString() === id.toString());

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
    const index = state.treinos.findIndex(treino => treino.id.toString() === id.toString());

    if (index > -1) {
      return {
        ...state.treinos[index],
        exercicios: [
          ...state.treinos[index].exercicios.map(exercicio => {
            return {
              ...exercicio,
            };
          }),
        ],
      };
    } else {
      throw new Error('Treino não encontrado');
    }
  },
  getExercicio({ state }, { idTreino, idExercicio }) {
    const indexTreino = state.treinos.findIndex(
      treino => treino.id.toString() === idTreino.toString(),
    );

    if (indexTreino > -1) {
      const indexExercicio = state.treinos[indexTreino].exercicios.findIndex(
        exercicio => exercicio.id.toString() === idExercicio.toString(),
      );

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
