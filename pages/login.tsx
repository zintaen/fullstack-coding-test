import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InputGroup, InputRightElement, Input, Center, VStack, Heading, Button, Text, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { FORM_MESSAGES } from 'constant';
import { useAuth } from 'components/Auth';

type Fields = {
  email: string;
  password: string;
}

const LoginPage: FC = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [reveal, setReveal] = useState<boolean>(false);

  const { handleSubmit, formState, register } = useForm<Fields>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const submitHandler: SubmitHandler<Fields> = async ({ email, password }) => {
    login(email, password);
  };

  const { errors, isDirty } = formState;

  return (
    <Center h="100vh">
      <VStack as="form" spacing={[0, 4]} onSubmit={handleSubmit(submitHandler)}>
        <Heading>Sign in</Heading>

        <Box w="full">
          <Input
            isInvalid={Boolean(errors.email?.message)}
            placeholder="example@gmail.com"
            {...register('email', { required: {
              value: true,
              message: FORM_MESSAGES.ERRORS.REQUIRED
            }})}
          />
          {errors.email?.message && (
            <Text mt="2" fontSize="sm" color="red.600">{errors.email?.message}</Text>
          )}
        </Box>

        <Box w="full">
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={reveal ? "text" : "password"}
              placeholder="Enter password"
              isInvalid={Boolean(errors.password?.message)}
              {...register('password', { required: {
                value: true,
                message: FORM_MESSAGES.ERRORS.REQUIRED
              }})}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setReveal((prevState) => !prevState)}>
                {reveal ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password?.message && (
            <Text mt="2" fontSize="sm" color="red.600">{errors.password?.message}</Text>
          )}
        </Box>

        <Button
          w="100%"
          type="submit"
          disabled={!isDirty}
          colorScheme="facebook"
        >
          Submit
        </Button>
        
        <Button w="100%" onClick={() => router.push('/register')}>
          or Register
        </Button>
      </VStack>
    </Center>
  );
};

export default LoginPage;
