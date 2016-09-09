const initialState = {
  scene: {},
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    case "REACT_NATIVE_ROUTER_FLUX_FOCUS":
      return {
        ...state,
        scene: action.scene,
      };

    default:
      return state;
  }
}
