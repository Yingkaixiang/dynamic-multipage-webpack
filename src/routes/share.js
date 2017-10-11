export default ({ router, controllers }) => {
  const { share } = controllers;
  router.get('/share/moment/theme', share.getMomentTheme);
};
