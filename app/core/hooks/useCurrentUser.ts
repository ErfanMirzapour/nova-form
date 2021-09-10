import { useQuery } from 'blitz';

import getCurrentUser from '~users/queries/getCurrentUser';

export const useCurrentUser = () => useQuery(getCurrentUser, null)[0];
