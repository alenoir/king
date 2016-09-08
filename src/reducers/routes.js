const initialState = {
  scene: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case "focus":
      return {
        ...state, // eslint-disable-line
        scene: action.scene,
      };

    // ...other actions

    default:
      return state;
  }
}
