export default ({ router, controllers }) => {
  const { share } = controllers;
  router.get('/share/moment/:momentType', share.getMomentTheme);
};
