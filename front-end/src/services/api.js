const baseURL = 'http://192.168.1.10:8080';

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
  if (!response.ok) {
    return 'Login failed';
  }
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
    return 'Createtion failed';
  }
  const result = await response.json();
  return { response, result };
};

export const updatePost = async () => {};

export const deletePost = async () => {};

export const getAllPosts = async (token, page) => {
  const response = await fetch(`${baseURL}/post/get?page=` + page, {
    method: 'GET',
    headers: {
      Authorization: 'bearer ' + token,
    },
  });

  if (!response.ok) {
    return 'Failed to fetch';
  }
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
