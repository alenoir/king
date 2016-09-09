import renderer from 'react-test-renderer'; // eslint-disable-line

import GameAddButton from '../AddButton';
import GameList from '../List';

describe('Game', () => {
  it('render Button', () => {
    const props = {
      text: 'Test String',
      onPress: () => {},
      selected: false,
    };
    const tree = renderer.create(
      <GameAddButton {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render List', () => {
    const props = {
      name: 'TestString',
    };
    const tree = renderer.create(
      <GameList {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
