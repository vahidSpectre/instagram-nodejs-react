export const baseURL = 'http://192.168.1.10:8080';

export const signup = async data => {
  const response = await fetch(`${baseURL}/authentication/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
      bio: data.bio,
    }),
  });
  if (!response.ok) {
    return 'Sign up failed';
  }
  const result = await response.json();
  return { response, result };
};

export const login = async data => {
  const response = await fetch(`${baseURL}/authentication/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });
  const result = await response.json();
  return { response, result };
};

export const createPost = async (data, token) => {
  const formData = new FormData();
  for (let i = 0; i < data.postImages.length; i++) {
    formData.append(`files`, data.postImages[i]);
  }
  formData.append('caption', data.caption);

  const response = await fetch(`${baseURL}/post/create`, {
    method: 'POST',
    headers: {
      Authorization: 'bearer ' + token,
    },
    body: formData,
  });
  if (!response.ok) {
    return 'Creation failed';
  }
  const result = await response.json();
  return { response, result };
};

export const updatePost = async () => {};

export const deletePost = async () => {};

export const getAllPosts = async (token, page) => {
  const response = await fetch(`${baseURL}/post/getall?page=` + page, {
    method: 'GET',
    headers: {
      Authorization: 'bearer ' + token,
    },
  });

  const result = await response.json();
  return { response, result };
};

export const getPost = async (token, id) => {
  const response = await fetch(`${baseURL}/post/find?id=` + id, {
    headers: { Authorization: 'bearer ' + token },
  });

  if (!response.ok) return 'Post not found!';
  const result = await response.json();

  return { response, result };
};

export const searchUsers = async (token, param) => {
  const response = await fetch(`${baseURL}/user/search?param=` + param, {
    headers: { Authorization: 'bearer ' + token },
  });
  const result = await response.json();
  return { response, result };
};

export const getUser = async (token, id) => {
  const response = await fetch(`${baseURL}/user/find?id=` + id, {
    headers: { Authorization: 'bearer ' + token },
  });
  if (!response.ok) {
    return 'User not found';
  }
  const result = await response.json();
  return { response, result };
};

export const followUser = async (token, targetId) => {
  const response = await fetch(`${baseURL}/user/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + token,
    },
    body: JSON.stringify({ targetId }),
  });
  const result = await response.json();
  return { response, result };
};

export const followUserState = async (token, targetId) => {
  const response = await fetch(`${baseURL}/user/follow?id=${targetId}`, {
    method: 'GET',
    headers: {
      Authorization: 'bearer ' + token,
    },
  });
  const result = await response.json();
  return { response, result };
};

export const getFeed = async (token, page) => {
  const response = await fetch(`${baseURL}/feed/home?page=${page}`, {
    headers: { Authorization: 'bearer ' + token },
  });
  const result = await response.json();
  return { response, result };
};

export const sendDirect = async (token, data) => {
  const response = await fetch(`${baseURL}/direct/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + token,
    },
    body: JSON.stringify({
      targetId: data.targetId,
      message: data.message,
    }),
  });
  const result = await response.json();
  return { response, result };
};

export const getDirects = async (token) => {
  const response = await fetch(`${baseURL}/direct/get`, {
    method: 'GET',
    headers: { Authorization: 'bearer ' + token },
  });

  const result = await response.json();
  return { response, result };
};
