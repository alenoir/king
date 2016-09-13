const GameSchema = {
  name: 'Game',
  properties: {
    id: { type: 'string' },
    title: { type: 'string', optional: true },
    playerIds: 'string',
    winnerId: { type: 'string', optional: true },
    looserId: { type: 'string', optional: true },
    createdAt: { type: 'date', default: new Date() },
    closedAt: { type: 'date', optional: true },
  },
};

export default GameSchema;
