import xfetch from '../utils/xfetch';
import api from '../config/api';

export async function getMoment(momentId) {
  const { data } = await xfetch({
    url: api.getMoment,
    method: 'GET',
    params: {
      id_str: String(momentId),
    },
  });
  return data.data;
}

