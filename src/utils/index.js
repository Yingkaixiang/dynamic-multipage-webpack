// 格式化app接口返回的时间格式
function formatMomentDate(str) {
  if (!str) {
    return '';
  }
  const format = {
    0: '刚刚',
    1: '秒前',
    2: '分钟前',
    3: '小时前',
    4: '天前',
  };
  const arr = str.split('_');
  return `${arr[1]}${format[arr[0]] || ''}`;
}

// 标签匹配
function formatMomentTag(str) {
  return str.replace(/(#.*#)/g, '<span>$1</span>');
}

export default {
  formatMomentDate,
  formatMomentTag,
};

