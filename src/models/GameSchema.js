const GameSchema = {
  name: 'Game',
  properties: {
    id: { type: 'string', default: new Date().getTime().toString() },
    title: { type: 'string', optional: true },
    playerIds: 'string',
    winnerId: { type: 'string', optional: true },
    createdAt: { type: 'date', default: new Date() },
    closedAt: { type: 'date', optional: true },
  },
};

export default GameSchema;
