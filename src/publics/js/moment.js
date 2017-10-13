import '../sass/moment.scss';

const avatar = new AlloyFinger('#avatar', {
  tap() {
    alert('跳转');
  },
});

const viewDetail = new AlloyFinger('#viewDetail', {
  tap() {
    alert('查看详情');
  },
});
