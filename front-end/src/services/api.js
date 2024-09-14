const baseURL = 'http://192.168.1.10:8080';

export const signup = async data => {
  const response = await fetch(
    `${baseURL}/authentication/signup`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        bio: data.bio,
      }),
    },
  );
  if (!response.ok) {
    return 'Sign up failed';
  }
  const result = await response.json();
  return result;
};
