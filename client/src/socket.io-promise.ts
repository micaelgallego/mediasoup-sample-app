// Adds support for Promise to socket.io-client
const promise = function(socket: any) {
  return function request(type:any, data = {}) {
    return new Promise((resolve) => {
      socket.emit(type, data, resolve);
    });
  }
};

export default promise;