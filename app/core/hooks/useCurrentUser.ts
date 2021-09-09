import { useQuery } from 'blitz';
import getCurrentUser from 'app/users/queries/getCurrentUser';

export const useCurrentUser = () => useQuery(getCurrentUser, null)[0];
