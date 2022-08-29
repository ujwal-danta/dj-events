import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    {/*Below we add the modal wrapper*/}
                    <div id="modal-root"></div>
                </body>
            </Html>
        );
    }
}

export default MyDocument;