export default ({ router, controllers }) => {
  const { test } = controllers;
  router.get('/', test.getCurrentTime);
};
