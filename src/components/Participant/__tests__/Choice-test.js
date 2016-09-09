import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line

import ParticipantChoice from '../Choice';

// jest.enableAutomock();

describe('Participant Choice', () => {
  it('render', () => {
    const props = {
      value: 'Test String',
      onChange: () => {},
    };
    const output = renderer.create(
      <ParticipantChoice {...props} />
    );
    const tree = output.toJSON();
    expect(tree).toMatchSnapshot();

    const instance = output.getInstance();
    //
    // instance.handleInputChange('testPlayer');
    // expect(instance.state.currentInputText).toEqual('testPlayer');

    instance.state.currentInputText = 'testPlayer';

    instance.handleAddPlayer();
    expect(instance.state.selectedPlayers).toEqual(['testPlayer']);

    instance.handleRemovePlayer('testPlayer');
    expect(instance.state.selectedPlayers).toEqual([]);
  });
});
