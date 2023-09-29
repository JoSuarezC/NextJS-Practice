import Document, { Html, Main, Head, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(){
    return (
      <Html lang='en'>
        <Head/>
        <body>
          <div id="overlays">
            Get using React Portals
          </div>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}
