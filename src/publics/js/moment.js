import AlloyFinger from 'alloyfinger';
import '../sass/moment.scss';

var avatar = new AlloyFinger('#avatar', {
  tap: function () {
    alert(123);
  },
});

