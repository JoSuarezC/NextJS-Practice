'use client';
import Image from 'next/image';
import { MouseEventHandler } from 'react';

interface CustomButtonProps {
  title: string;
  btnType?: 'button' | 'submit' | 'reset';
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
};

function CustomButton({
  title,
  containerStyles,
  handleClick,
  btnType,
  textStyles,
  rightIcon,
  isDisabled,
}: CustomButtonProps) {
  return (
    <button
      className={`custom-btn ${containerStyles}`}
      disabled={false}
      type={btnType ?? 'button'}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className='relative w-6 h-6'>
          <Image
            className='object-contain'
            src={rightIcon}
            alt=''
            fill
          />
        </div>
      )}
    </button>
  );
}

export default CustomButton;
