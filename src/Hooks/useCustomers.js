
import { useQuery } from '@tanstack/react-query';

async function fetchCustomers() {
  const response = await fetch('http://localhost:4000/customers');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function useCustomers() {
  return useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers
  });
}
