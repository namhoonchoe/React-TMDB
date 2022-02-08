import React, { useEffect } from "react";
import { Button, Flex, Text, useToast, useColorMode } from "@chakra-ui/react";
import { useNavigate } from  "react-router-dom";

export default function ErrorPopUp() {
  const toast = useToast();
  const navigate  = useNavigate();
  const colorMode = useColorMode().colorMode;

  const errorPopUp = () =>
    toast({
      title: "Error.",
      description: "An Error has Ocurred.",
      position: "top",
      status: "error",
      duration: 500,
      isClosable: true,
      onCloseComplete: () => navigate(-1),
      render: () => (
        <Flex
          color="white"
          p={3}
          bgColor={colorMode === "light" ? "gray.300" : "gray.700"}
          borderRadius="lg"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text mr="5%">An Error has Ocurred.</Text>
          <Button
            onClick={() => navigate(-1)}
            bgColor={colorMode === "light" ? "gray.400" : "gray.800"}
          >
            Close
          </Button>
        </Flex>
      ),
    });

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      errorPopUp();
    }

    return () => {
      mounted = false;
    };
  }, []);
  return <></>;
}
