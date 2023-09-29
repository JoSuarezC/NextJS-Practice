import { Hero, Searchbar, CustomFilter, CarCard, ShowMore } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { FilterProps } from '@/types';
import { fetchCars } from '@/utils';
import Image from 'next/image';

export default async function Home({
  searchParams,
}: {
  searchParams: FilterProps;
}) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className='overflow-hidden'>
      <Hero />
      <div
        className='mt-12 padding-x padding-y max-width'
        id='discover'
      >
        <div className='home__text-container'>
          <h1 className='font-extrabold text-4xl'>Card Catalogue</h1>
          <p>Explore the cards you might like</p>
        </div>
        <div className='home__filters'>
          <Searchbar />
          <div className='home__filter-container'>
            <CustomFilter
              title='Fuel'
              options={fuels}
            />
            <CustomFilter
              title='Year'
              options={yearsOfProduction}
            />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars.map((car) => (
                <CarCard
                  key={car.model + car.year + car.city_mpg}
                  car={car}
                />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home_error-container'>
            <h2 className='text-black text-xl font-bold'> Oops, no results</h2>
          </div>
        )}
      </div>
    </main>
  );
}
