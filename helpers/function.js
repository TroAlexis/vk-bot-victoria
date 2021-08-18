const limitCalls = (func, onLimitReach, options = {}) => {
  const controller = {
    calls: 0,
  };
  const { max = 5, resetOnLimitReach } = options;

  function limiter(...args) {
    if (controller.calls < max) {
      func(...args);
    } else {
      onLimitReach(...args);
      if (resetOnLimitReach) {
        controller.calls = -1;
      }
    }

    controller.calls += 1;
  }

  return [limiter, controller];
};

module.exports = {
  limitCalls,
};
