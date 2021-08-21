import React, { useState } from "react";
import { Heading } from '@chakra-ui/react';

const DynamicText = () => {
  const [value, setValue] = useState("Random Text");

  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return <Heading as="h1" mb={3}>{value}</Heading>;
};

export default DynamicText;
