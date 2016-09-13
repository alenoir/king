const GameSchema = {
  name: 'Score',
  properties: {
    id: { type: 'string', default: new Date().getTime().toString() },
    playerId: 'string',
    gameId: 'string',
    value: 'int',
    round: 'int',
    createdAt: { type: 'date', default: new Date() },
  },
};

export default GameSchema;
