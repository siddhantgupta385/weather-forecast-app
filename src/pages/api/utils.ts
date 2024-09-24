// utils/api.ts
export const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  retries: number = 3,
  delay: number = 1000
): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    return response;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${retries} left)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay);
    } else {
      throw new Error(`Failed after ${retries} attempts: ${error}`);
    }
  }
};
