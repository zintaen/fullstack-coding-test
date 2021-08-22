import { Flex, Button, HStack, Link as LinkUI } from '@chakra-ui/react';
import { FC } from 'react';
import Link from 'next/link';

import { useAuth } from 'components/Auth';

const AuthenticatedLayout: FC = ({ children }) => {
  const { logout, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  return (
    <>
      <Flex position="fixed" top={0} left={0} right={0} p={4} width="full" justifyContent="flex-end" alignItems="center">
        <HStack spacing={6}>
          <Link href="/blog">
            <LinkUI as="a">
              Blogs
            </LinkUI>
          </Link>
          <Button onClick={logout}>Logout</Button>
        </HStack>
      </Flex>
      {children}
    </>
  );
};

export default AuthenticatedLayout;
