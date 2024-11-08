/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { UseAsyncOptions, UseAsyncResult, useAsync } from './useAsync';

/**
 * This hook allow the declaration of a custom hook that wraps an async function.
 * It provides a simpler way to make your useAsync hook more readable and maintainable.
 *
 * @example
 * // Example of using useAsync to manage fetching user data from an API.
 * const fetchUserData = async (userId) => {
 *   const response = await fetch(`/api/users/${userId}`);
 *   if (!response.ok) throw new Error('Failed to fetch');
 *   return await response.json();
 * };
 *
 * // Define a custom hook that wraps the fetchUserData function
 * const useUserDetails = useAsyncWrapper('userDetails', fetchUserData);
 *
 * // Use the custom hook to fetch user data
 * const UserDetails = ({ userId }) => {
 *   const {
 *     isLoading,
 *     data,
 *     error,
 *     revalidate,
 *   } = useUserDetails(userId);
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   return (
 *     <div>
 *       <h1>{data.name}</h1>
 *       <button onClick={() => revalidate()}>Refresh</button>
 *     </div>
 *   );
 * };
 */
export const useAsyncWrapper =
  <U extends string, T extends (...args: any[]) => Promise<any>>(
    key: U,
    asyncFunction: T,
    options?: UseAsyncOptions<T>
  ): ((...args: Parameters<T>) => UseAsyncResult<U, T>) =>
  (...args: Parameters<T>) =>
    useAsync(key, asyncFunction, {
      ...options,
      args,
    });
