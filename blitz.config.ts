import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from 'blitz';

const config: BlitzConfig = {
   middleware: [
      sessionMiddleware({
         cookiePrefix: 'blitz',
         isAuthorized: simpleRolesIsAuthorized,
      }),
   ],
   redirects() {
      return [
         {
            source: '/',
            destination: '/forms',
            permanent: true,
         },
      ];
   },
   eslint: {
      ignoreDuringBuilds: true,
   },
   typescript: {
      ignoreBuildErrors: true,
   },
};

module.exports = config;
