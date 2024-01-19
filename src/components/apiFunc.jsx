import { DebounceInput } from 'react-debounce-input';
import { useDebounce } from 'use-debounce';
import useSWR from 'swr';

const apiKey = 'hWdaj14WL8WDgVYei8imulkY2hKH8uxTfiDUvVHP';
export const fetcher = async (url) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
    });
    if (!res.ok) throw new Error(res.status);
    return res.json();
};

export { DebounceInput, useDebounce, useSWR};