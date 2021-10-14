import { Document, Html, DocumentHead, Main, BlitzScript } from 'blitz';

class MyDocument extends Document {
   render() {
      return (
         <Html lang='fa-IR' dir='rtl'>
            <DocumentHead>
               <link rel='icon' href='/favicon.ico' />
            </DocumentHead>
            <body>
               <Main />
               <BlitzScript />
            </body>
         </Html>
      );
   }
}

export default MyDocument;
