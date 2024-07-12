
import { useQuery } from '@tanstack/react-query';

async function fetchTransactions() {
  const response = await fetch('http://localhost:4000/transactions');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions
  });
}
