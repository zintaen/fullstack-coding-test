import { Flex, Button, HStack, Box, Link as LinkUI } from "@chakra-ui/react";
import { FC } from "react";
import Link from "next/link";

import { useAuth } from "components/Auth";

type Props = {
  authProtect?: boolean;
};

const AuthenticatedLayout: FC<Props> = ({ children, authProtect = true }) => {
  const { user, logout, isReady } = useAuth({ authProtect });

  if (!isReady) {
    return null;
  }

  return (
    <>
      <Flex
        position="fixed"
        top={0}
        left={0}
        right={0}
        p={4}
        width="full"
        justifyContent="flex-end"
        alignItems="center"
        bg="white"
        boxShadow="sm"
        zIndex={1000}
      >
        <HStack spacing={6}>
          <Link href="/">
            <LinkUI as="a">Dynamic search</LinkUI>
          </Link>
          <Link href="/blog">
            <LinkUI as="a">Blogs</LinkUI>
          </Link>
          {user && <Button onClick={logout}>Logout</Button>}
        </HStack>
      </Flex>
      <Box mt={16}>{children}</Box>
    </>
  );
};

export default AuthenticatedLayout;
