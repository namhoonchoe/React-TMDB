import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Text, useColorMode, chakra } from "@chakra-ui/react";
import InfoImage from "@components/Display/InfoImage";

interface ICreditInfo {
  id: number;
  profilePath: string;
  name: string;
  character: string;
}

const CreditInfo: React.FC<ICreditInfo> = ({
  id,
  profilePath,
  name,
  character,
}) => {
  const { colorMode } = useColorMode();

  let navigate = useNavigate();

  const toPerson = (path: string) => {
    navigate(path);
  };

  const CastingInfoContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "14.4rem",
      height: "12rem",
      borderRadius: "lg",
      mt: 2,
      py: 1.5,
      backgroundColor: colorMode === "light" ? "gray.200" : "gray.700",
      _hover: {
        boxShadow: colorMode === "light" ? "xl" : "dark-lg",
      },
    },
  });

  const CastingContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 2,
      width: "100%",
    },
  });

  const characterName = character.split("/");

  return (
    <CastingInfoContainer
      key={id}
      onClick={() => toPerson(`/profile/${id}`)}
      backgroundColor={colorMode === "light" ? "gray.200" : "gray.700"}
    >
      <InfoImage
        width="7rem"
        height="7rem"
        imageSource={profilePath}
        imageType="portrait"
        borderRadius="full"
      />
      <CastingContainer>
        <Text fontSize="sm" fontWeight="semibold">
          {name}
        </Text>
        {character !== "" && (
          <Flex direction={"column"} alignItems={"center"} px={1}>
            <Text fontSize="xs">as</Text>
            <Flex justifyContent={"center"} alignItems={"center"} px={5} >
              {characterName.length > 1 ? (
                <>
                  {characterName[0].length > 15 ?(
                    <Text fontSize="xs" fontWeight="semibold" > 
                      {characterName[0]}/{characterName[1].substring(0,5)}...
                    </Text>) 
                    
                  : (
                    <Text fontSize="xs" fontWeight="semibold" > 
                      {characterName[0]}/{characterName[1]}
                    </Text>
                  )}
              </>
              ) : (
                <>
                  {characterName[0].length > 20 ? (
                    <Text
                      fontSize="xs"
                      fontWeight="semibold"
                      textOverflow={"ellipsis"}
                    >
                      {characterName[0]}
                    </Text>
                  ) : (
                    <Text fontSize="sm" fontWeight="semibold">
                      {characterName[0]}
                    </Text>
                  )}
                </>
              )}
            </Flex>
          </Flex>
        )}
      </CastingContainer>
    </CastingInfoContainer>
  );
};

export default CreditInfo;
