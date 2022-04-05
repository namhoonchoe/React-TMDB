import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Text, useColorMode, Tooltip, chakra } from "@chakra-ui/react";
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
      width:"14.4rem",
      height:"12rem",
      borderRadius: "lg",
      mt:2,
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
          <Flex direction="column" align="center" px={1}>
            <Text fontSize="xs">as</Text>
            <Flex justify="center" align="center" px={5}>
              {characterName[0].length > 20 ? (
                <Text
                  fontSize="xs"
                  fontWeight="semibold"
                  textOverflow="ellipsis"
                >
                  {characterName[0]}
                </Text>
              ) : (
                <Text fontSize="sm" fontWeight="semibold">
                  {characterName[0]}
                </Text>
              )}
            </Flex>
          </Flex>
        )}
      </CastingContainer>
    </CastingInfoContainer>
  );
};

export default CreditInfo;
