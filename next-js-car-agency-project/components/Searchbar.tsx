'use client';
import React, { useState } from 'react';
import SearchManufacturer from '@/components/SearchManufacturer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchButton = ({
  otherClasses,
  text,
}: {
  otherClasses?: string;
  text: string;
}) => {
  return (
    <button
      type='submit'
      className={`-ml-3 z-10 ${otherClasses}`}
    >
      <Image
        src='/magnifying-glass.svg'
        alt={text}
        width={40}
        height={40}
        className='object-contain'
      />
    </button>
  );
};

function Searchbar() {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const router = useRouter();

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    model ? searchParams.set('model', model) : searchParams.delete('model');

    manufacturer
      ? searchParams.set('manufacturer', manufacturer)
      : searchParams.delete('manufacturer');

    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathName);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer === '' && model === '') {
      return alert('Please fill in the search bar');
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  return (
    <form
      className='searchbar'
      onSubmit={handleSearch}
    >
      <div className='searchbar__item'>
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton
          text='Search Manufacturer'
          otherClasses='sm:hidden'
        />
      </div>
      <div className='searchbar__item'>
        <Image
          src='/model-icon.png'
          alt='Car Model Icon'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
        />
        <input
          type='text'
          name='model'
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder='Tiguan'
          className='searchbar__input'
          aria-label='Model'
        />
        <SearchButton
          text='Search Model'
          otherClasses='sm:hidden'
        />
      </div>
      <SearchButton
        text='Search'
        otherClasses='max-sm:hidden'
      />
    </form>
  );
}

export default Searchbar;
