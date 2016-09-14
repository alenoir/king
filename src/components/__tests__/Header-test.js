import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line

import CloseIcon from '../../assets/images/ic_close.png';
import AddIcon from '../../assets/images/ic_add.png';

import Header from '../Header';

describe('Header', () => {
  it('render small', () => {
    const props = {
      title: 'Title Small',
      buttonLeftImage: CloseIcon,
      buttonRightImage: AddIcon,
    };
    const tree = renderer.create(
      <Header {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render big', () => {
    const props = {
      title: 'Title Big',
      buttonLeftImage: CloseIcon,
      buttonRightImage: AddIcon,
    };
    const tree = renderer.create(
      <Header {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
