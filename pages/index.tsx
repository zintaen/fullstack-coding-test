import Head from "next/head";
import { useRef } from "react";
import { Center, Box, Input } from "@chakra-ui/react";

import DynamicText from "components/DynamicText";
import MainLayout from 'components/layouts/Main';

const Home = () => {
  const updateDynamicRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDynamicRef.current(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Coding Test</title>
      </Head>
      <MainLayout>
        <Center h="100vh" px="12">
          <Box as="main">
            <DynamicText ref={updateDynamicRef} />
            <Input onChange={onChange} />
          </Box>
        </Center>
      </MainLayout>
    </>
  );
};

export default Home;
