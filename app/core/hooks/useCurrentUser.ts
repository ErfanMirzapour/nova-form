import { useQuery } from 'blitz';

import { getCurrentUser } from '~users/resolvers';

const useCurrentUser = () => useQuery(getCurrentUser, null)[0];

export default useCurrentUser;
