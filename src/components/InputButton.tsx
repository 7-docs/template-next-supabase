import type { InputHTMLAttributes } from 'react';

export const InputButton = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className="px-2 py-1 border border-gray cursor-pointer bg-dark-gray text-off-white max-w-[120px] self-end hover:bg-darker-gray"
    {...props}
  />
);
