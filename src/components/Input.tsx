type Props = {
  children: string;
};

export const Input = (props: Props) => (
  <p className="bg-dark-gray p-2 my-2 border-gray border-y-1 sm:border" {...props} />
);
