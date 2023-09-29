import { useEffect, useState } from 'react';
import useSWR from 'swr';

/*
  useEffect(() => {
    fetch('/dummy-sales.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const salesData = data.sales;
        const sales = [];

        for (const key in salesData) {
          sales.push({
            id: key,
            ...salesData[key],
          });
        }

        setSales(sales);
        setIsLoading(false);
      });
  }, []);
  */

export default function LastSalesPage({ fetchedSales }) {
  const [sales, setSales] = useState(fetchedSales ?? []);

  const { data, error, isLoading } = useSWR('/dummy-sales.json', (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      console.log('data', data);
      const salesData = data.sales;
      const sales = [];

      for (const key in salesData) {
        sales.push({
          id: key,
          ...salesData[key],
        });
      }

      setSales(sales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => {
        return (
          <li key={sale.id}>
            {sale.username}-{sale.volume}
          </li>
        );
      })}
    </ul>
  );
}

/*
export async function getStaticProps() {
  return fetch('/dummy-sales.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const salesData = data.sales;
      const sales = [];

      for (const key in salesData) {
        sales.push({
          id: key,
          ...salesData[key],
        });
      }

      return {
        props: {
          sales: sales,
        },
        revalidate: 10,
      };
    });
}
*/