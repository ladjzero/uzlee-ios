import moment from 'moment';
import leftPad from 'left-pad';

export let formatDay = function (str) {
  let date = moment(str);
  let now = moment(new Date());
  let yesterday = moment().subtract(1, 'day');

  if (date.isSame(now, 'day')) {
    return '今天';
  } else if (date.isSame(yesterday, 'day')) {
    return '昨天';
  } else if (date.isSame(now, 'year')) {
    return date.format('M月D日');
  } else {
    return date.format('YYYY/M/D');
  }
};

export let buildUserImage = function (uid) {
  let str = leftPad(uid, 6, 0);
  return "http://www.hi-pda.com/forum/uc_server/data/avatar/000/" + str.replace(/\B(?=(\d{2})+(?!\d))/g, '/') + "_avatar_middle.jpg";
}