import React from 'react';
import { FlatList } from 'react-native';
import Phase from './Phase';
import PropTypes from 'prop-types';

const Phases = ({ user, phases, runId, gameId, navigate }) => (
  <FlatList
    data={phases}
    keyExtractor={(phase, index) => index}
    renderItem={({ item, index }) => (
      <Phase
        user={user}
        phase={item}
        runId={runId}
        gameId={gameId}
        navigate={navigate}
        index={index}
        isLast={index == phases.length - 1}
      />
    )}
  />
);

Phases.propTypes = {
  user: PropTypes.object.isRequired,
  runId: PropTypes.number.isRequired,
  gameId: PropTypes.number.isRequired,
  phases: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  })).isRequired,
  navigate: PropTypes.func.isRequired
};

export default Phases;
