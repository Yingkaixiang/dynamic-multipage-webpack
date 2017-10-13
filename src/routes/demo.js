export default ({ router, controllers }) => {
  const { demo } = controllers;
  router.get('/demo', demo.demo);
};
