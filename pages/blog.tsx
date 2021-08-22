import { DocumentData } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { queryDocs } from "services/firebase/firestore";
import {
  Grid,
  GridItem,
  Box,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";

import MainLayout from "components/layouts/Main";

const BlogPage: FC = () => {
  const [blogs, setBlogs] = useState<DocumentData[] | null>();
  const [selected, setSelected] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    queryDocs("blogs").then((docs) => {
      setBlogs(docs);
    });
  }, []);

  if (!blogs) {
    return null;
  }

  const handleSelect = (blog: DocumentData) => {
    setSelected(blog);
    onOpen();
  };

  return (
    <>
      <Head>
        <title>Blog list</title>
      </Head>
      <MainLayout authProtect={false}>
        <Box py={6} mx={12}>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {blogs.map((blog) => (
              <GridItem key={blog.id} onClick={() => handleSelect(blog)}>
                <Box
                  position="relative"
                  borderRadius={4}
                  overflow="hidden"
                  h={230}
                >
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
                <Heading as="h2" size="md" my={3}>
                  {blog.title}
                </Heading>
              </GridItem>
            ))}
          </Grid>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selected?.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box
                position="relative"
                borderRadius={4}
                overflow="hidden"
                h={250}
                mb={6}
              >
                <Image
                  src={selected?.thumbnail}
                  alt={selected?.title}
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
              <Text maxH="40vh" overflow="auto">{selected?.content}</Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </MainLayout>
    </>
  );
};

export default BlogPage;
