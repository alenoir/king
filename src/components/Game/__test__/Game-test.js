import renderer from 'react-test-renderer'; // eslint-disable-line

import GameList from '../List';

describe('Game', () => {
  it('Render List', () => {
    const props = {
      name: 'TestString',
      onPress: () => {},
      selected: false,
    };
    const tree = renderer.create(
      <GameList {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
