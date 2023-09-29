import fs from 'fs/promises';
import path from 'path';

function ProductDetailsPage({ product }) {

  if (!product) {
    return <p>Loading...</p>
  }
  
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const prodId = params.prodId;

  const data = await getData();
  const product = data.products.find(product => product.id === prodId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const params = data.products.map((product) => {
    return {
      params: {
        prodId: product.id,
      },
    };
  });

  return {
    paths: params,
    fallback: true, //  true, to render the rest of the pages JIT
  }
}

export default ProductDetailsPage;
