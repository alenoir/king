export function findAllByType(component, testID) {
  if (!component) {
    return [];
  }

  let matches = [];

  if (component.props && component.props.testID === testID) {
    matches.push(component);
  }

  if (component.children) {
    component.children.forEach((child) => {
      matches = matches.concat(findAllByType(child, testID));
    });
  }

  return matches;
}

export default { findAllByType };
