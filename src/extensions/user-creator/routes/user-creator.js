module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/user-creator/create',
        handler: 'user-creator.create',
        config: {
          auth: {
            strategies: ['users-permissions'],
          },
        },
      },
    ],
  };
  