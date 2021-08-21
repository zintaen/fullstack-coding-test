import { forwardRef, useState } from "react";
import { Heading } from '@chakra-ui/react';

type ChangeFunc = (newValue: string) => void;

const DynamicText = (_, ref) => {
  const [value, setValue] = useState("Random Text");

  const changeValue: ChangeFunc = (newValue) => {
    setValue(newValue);
  };

  ref.current = changeValue;

  return <Heading as="h1" mb={3}>{value}</Heading>;
};

export default forwardRef(DynamicText);
