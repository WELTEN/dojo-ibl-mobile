import React from 'react';
import { FlatList } from 'react-native';
import Phase from './Phase';
import PropTypes from 'prop-types';

const Phases = ({ phases, gameId, navigate }) => (
  <FlatList
    data={phases}
    keyExtractor={(phase, index) => index}
    renderItem={({ item, index }) => (
      <Phase phase={item} gameId={gameId} navigate={navigate} index={index} />
    )}
  />
);

Phases.propTypes = {
  phases: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  })).isRequired,
  navigate: PropTypes.func.isRequired
};

export default Phases;
