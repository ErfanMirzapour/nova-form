import { Global } from '@emotion/react';

const Fonts = () => (
   <Global
      styles={`
      @font-face {
        font-family: 'Iran Yekan';
        font-weight: 100;
        font-style-normal;
        src: url('/fonts/iranyekanwebthinfanum.woff') format('woff');
      }
      @font-face {
        font-family: 'Iran Yekan';
        font-weight: 300;
        font-style-normal;
        src: url('/fonts/iranyekanweblightfanum.woff') format('woff');
      }
      @font-face {
        font-family: 'Iran Yekan';
        font-weight: 400;
        font-style-normal;
        src: url('/fonts/iranyekanwebregularfanum.woff') format('woff');
      }
      @font-face {
        font-family: 'Iran Yekan';
        font-weight: 500;
        font-style-normal;
        src: url('/fonts/iranyekanwebmediumfanum.woff') format('woff');
      }
      @font-face {
        font-family: 'Iran Yekan';
        font-weight: 700;
        font-style-normal;
        src: url('/fonts/iranyekanwebboldfanum.woff') format('woff');
      }
      @font-face {
        font-family: 'Iran Yekan';
        font-weight: 800;
        font-style-normal;
        src: url('/fonts/iranyekanwebextraboldfanum.woff') format('woff');
      }
      `}
   />
);
export default Fonts;
