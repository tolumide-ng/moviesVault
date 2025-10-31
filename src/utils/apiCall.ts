import axios, { AxiosRequestConfig } from 'axios';

/**
 * NB: Normally, the base API URL should come from an environment variable.
 * To make local development easier, we fall back to localhost by default.
 */
const API_URL = 'http://localhost:3000';

type Props = Omit<AxiosRequestConfig, 'url'> & { path: string };

export async function apiCall<T>({
  path,
  params,
  method,
  signal,
  data,
}: Props): Promise<T> {
  const url = new URL(path, API_URL).toString();

  try {
    const response = await axios({ url, method, params, data, signal });
    return response.data as unknown as T;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
}
