import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      name,
      email,
      password,
    });

    const data = response.data;

    if (!data.success) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error: unknown) {
    const message =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : error instanceof Error
        ? error.message
        : 'Something went wrong';

    throw new Error(message);
  }
};


export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { email, password },
      {
        withCredentials: true,
      }
    );

    const data = response.data;

    if (!data.success) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error: unknown) {
    const message =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : error instanceof Error
        ? error.message
        : 'Something went wrong';

    throw new Error(message);
  }
};