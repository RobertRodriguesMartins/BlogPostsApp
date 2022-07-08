import { API_URL } from '../../api';
import generateJsonFormData from '../utils/convertFormToJson';

export const all = (payload) => {
  return {
    type: 'news/all',
    payload: payload,
  };
};

export const byId = (payload) => {
  return {
    type: 'news/byId',
    payload: payload,
  };
};

export const create = (payload) => {
  return {
    type: 'news/create',
    payload: payload,
  };
};

export const setOffset = (offset) => {
  return {
    type: 'offset/add',
    payload: offset,
  };
};

export const maxOffset = (offset) => {
  return {
    type: 'offset/max',
    payload: offset,
  };
};

export const maxOffsetThunk = () => async (dispatch) => {
  try {
    const rawData = await fetch(API_URL + 'offset', {
      method: 'GET',
    });

    const response = await rawData.json();

    dispatch(maxOffset(response));
  } catch (e) {
    console.log(e);
  }
};

export const someThunk = (offset) => async (dispatch) => {
  try {
    const rawData = await fetch(API_URL + `some?q=${offset}`, {
      method: 'GET',
    });

    const response = await rawData.json();
    console.log(response);

    dispatch(all(response));
  } catch (e) {
    console.log(e);
  }
};

export const byIdThunk = (id) => async (dispatch) => {
  try {
    const rawData = await fetch(`${API_URL}${id}`, {
      method: 'GET',
    });

    const response = await rawData.json();

    dispatch(byId(response));
  } catch (e) {
    console.log(e);
  }
};

export const createThunk = (e) => async (dispatch) => {
  e.preventDefault();
  try {
    const form = new FormData(e.target);

    const requestBody = generateJsonFormData(form, [
      'title',
      'content',
      'categoryName',
    ]);

    await fetch(API_URL, {
      method: 'post',
      body: requestBody,
      headers: {
        'Content-type': 'application/json',
      },
      mode: 'cors',
    });

    dispatch(create());
  } catch (e) {
    dispatch(create(e));
  }
};
