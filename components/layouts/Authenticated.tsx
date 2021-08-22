import { Flex, Button } from '@chakra-ui/react';
import { FC } from 'react';

import { useAuth } from 'components/Auth';

const AuthenticatedLayout: FC = ({ children }) => {
  const { logout } = useAuth();

  return (
    <>
      <Flex position="fixed" top={0} left={0} right={0} p={4} width="full" justifyContent="flex-end">
        <Button onClick={logout}>Logout</Button>
      </Flex>
      {children}
    </>
  );
};

export default AuthenticatedLayout;
