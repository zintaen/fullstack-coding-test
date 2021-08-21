import Head from "next/head";
import { Center, Box, Input } from "@chakra-ui/react";

import DynamicText from "components/DynamicText";

const Home = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <Center h="100vh">
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main">
        <DynamicText />
        <Input onChange={onChange} />
      </Box>
    </Center>
  );
};

export default Home;
