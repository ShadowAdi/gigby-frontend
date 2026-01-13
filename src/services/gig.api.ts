import axios from "axios";
import { API_BASE_URL } from "../constants/BACKEND_URL";

export const createGig = async ({
  title, description, budget
}: {
  title: string;
  description: string;
  budget: number;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/gigs/`, {
      title, description, budget
    });

    const data = response.data;

    if (!data.success) {
      throw new Error(data.message || 'Gig Creation failed');
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

export const GetAllGigs = async (query:string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gigs?title=${query}`);

    const data = response.data;

    if (!data.success) {
      throw new Error(data.message || 'Failed to get gigs');
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