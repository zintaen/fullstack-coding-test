import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InputGroup, InputRightElement, Input, Center, VStack, Heading, Button, Text, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { FORM_MESSAGES } from 'constant';
import { useAuth } from 'components/Auth';

type Fields = {
  email: string;
  password: string;
  rePassword: string;
}

const LoginPage: FC = () => {
  const { register: authRegister } = useAuth();
  const router = useRouter();

  const [reveal, setReveal] = useState<boolean>(false);

  const { handleSubmit, formState, register, setError } = useForm<Fields>({
    defaultValues: {
      email: '',
      password: '',
      rePassword: '',
    }
  });

  const submitHandler: SubmitHandler<Fields> = async (fields) => {
    const { email, password, rePassword } = fields;
    if (password !== rePassword) {
      setError('rePassword', {
        type: 'validate',
        message: 'Password is not matched'
      })
      return;
    }
    
    authRegister(email, password);
  };

  const { errors, isDirty } = formState;

  return (
    <Center h="100vh">
      <VStack as="form" spacing={[0, 4]} onSubmit={handleSubmit(submitHandler)}>
        <Heading>Register</Heading>

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

        <Box w="full">
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={reveal ? "text" : "password"}
              placeholder="Re-enter password"
              isInvalid={Boolean(errors.rePassword?.message)}
              {...register('rePassword', { required: {
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
          {errors.rePassword?.message && (
            <Text mt="2" fontSize="sm" color="red.600">{errors.rePassword?.message}</Text>
          )}
        </Box>

        <Button
          w="100%"
          type="submit"
          disabled={!isDirty}
          colorScheme="messenger"
        >
          Create new account
        </Button>

        <Button w="100%" onClick={() => router.push('/login')}>
          or Login
        </Button>
      </VStack>
    </Center>
  );
};

export default LoginPage;
