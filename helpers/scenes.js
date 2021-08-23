const isFunction = require('lodash/isFunction');
const { limitCalls } = require('~/helpers/function');

const changeScene = (ctx, props) => {
  try {
    const { scene = '' } = props;
    ctx.scene.enter(scene);
  } catch {
    const { onError = (context) => context.scene.leave() } = props;
    if (isFunction(onError)) {
      onError(ctx);
    }
  }
};
const changeSceneSafe = (ctx, props) => {
  // eslint-disable-next-line no-underscore-dangle
  const { current, step } = ctx.session.__scene;
  // TODO [refactor] Check if just setting step to +1 is enough
  changeScene(ctx, {
    ...props,
    onError: (context) => {
      context.scene.enter(current, step + 1);
      if (isFunction(props.onError)) {
        props.onError(context);
      }
    },
  });
};

const getSceneChangerFromInput = (props = {}) => {
  const {
    maxAttempts = 5, onError, onFail, resetOnFail = true,
  } = props;

  const [limitedChangeScene, limitController] = limitCalls(
    changeSceneSafe,
    onFail,
    { max: maxAttempts, resetOnLimitReach: resetOnFail },
  );

  return [
    (context) => {
      let userAnswer = context.message.text;

      if (userAnswer.length) {
        userAnswer = userAnswer.toLowerCase();

        limitedChangeScene(
          context,
          {
            scene: userAnswer,
            onError: () => { onError(context, limitController.calls); },
          },
        );
      }
    },
    (context) => {
      context.scene.step -= 1;
    },
  ];
};

module.exports = {
  changeScene,
  changeSceneSafe,
  getSceneChangerFromInput,
};
