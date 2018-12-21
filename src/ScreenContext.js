import React from 'react';

const createNamedContext = name => {
  const context = React.createContext();
  context.Provider.displayName = `${name}.Provider`;
  context.Consumer.displayName = `${name}.Consumer`;
  return context;
};

const context = createNamedContext('RSN');
export default context;
