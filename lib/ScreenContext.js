import React from 'react';

var createNamedContext = function createNamedContext(name) {
  var context = React.createContext();
  context.Provider.displayName = "".concat(name, ".Provider");
  context.Consumer.displayName = "".concat(name, ".Consumer");
  return context;
};

var context = createNamedContext('RSN');
export default context;