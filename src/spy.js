function spy() {
  function fn(...args) {
    fn.spyArgs.push(args);
    fn.called = true;
    fn.args = fn.spyArgs;
    fn.callCount += 1;
  }

  fn.spyArgs = [];
  fn.called = false;
  fn.callCount = 0;

  fn.calledWith = val => {
    let wasCalledWithValue = false;

    fn.spyArgs.forEach(args => {
      wasCalledWithValue = wasCalledWithValue
        ? true
        : compareStrategy(val, args);
    });

    return wasCalledWithValue;
  };

  return fn;
}

function compareStrategy(val, args) {
  const strategies = {
    object: compareObjTypes,
    default: compareSimpleTypes
  };

  return strategies[typeof val]
    ? strategies[typeof val](val, args)
    : strategies.default(val, args);
}

function compareObjTypes(val, args) {
  let found = false;
  args.forEach(arg => {
    if (JSON.stringify(arg) === JSON.stringify(val)) {
      found = true;
    }
  });
  return found;
}

function compareSimpleTypes(val, args) {
  return args.includes(val);
}

module.exports = spy;
