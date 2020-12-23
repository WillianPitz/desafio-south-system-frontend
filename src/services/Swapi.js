import api from './api';

async function basicFetch(endpoint) {
  try {
    const { data } = await api.get(`/${endpoint}`)
    return data;
  } catch (error) {
    console.log(error)
  }
}

const getHomeList = async () => {
  const { data } = await api.get('/')
  return data;
}

const getDetailInfo = async (path) => {
  return [
    {
      items: await basicFetch(path)
    },
  ];
}

export default {getHomeList, getDetailInfo}