import Head from "next/head";
import { useRef } from "react";
import { Center, Box, Input } from "@chakra-ui/react";
import { GetServerSidePropsContext, GetServerSideProps } from "next";

import { serverAuthenticate } from 'helpers/authServer';
import DynamicText from "components/DynamicText";

const Home = () => {
  const updateDynamicRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDynamicRef.current(e.target.value);
  };

  return (
    <Center h="100vh" px="12">
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main">
        <DynamicText ref={updateDynamicRef} />
        <Input onChange={onChange} />
      </Box>
    </Center>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const token = await serverAuthenticate(context);

  return {
    props: { auth: { ...token } }
  }
};

export default Home;
