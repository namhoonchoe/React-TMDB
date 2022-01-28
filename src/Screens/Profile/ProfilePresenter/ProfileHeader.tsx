import React from "react";
import {
  Flex,
  HStack,
  VStack,
  Box,
  Text,
  useColorMode,
  chakra,
} from "@chakra-ui/react";
import ModalBox from "@components/Layout/ModalBox";
import InfoImage from "@components/Layout/InfoImage";

interface IHeaderProps {
  name?: string;
  profileSource?: string;
  bioGraphy: string;
}

const ProfileHeader: React.FC<IHeaderProps> = ({
  profileSource,
  name,
  bioGraphy,
}) => {
  const colorMode = useColorMode().colorMode;

  const HeaderLayout = chakra(Flex, {
    baseStyle: {
      width: "100%",
      height: "60vh",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colorMode === "light" ? "gray.50" : "gray.900",
    },
  });

  const InfoLayout = chakra(VStack, {
    baseStyle: {
      width: "80%",
      height: "80%",
      alignItems: "start",
      justifyContent: "space-between",
      pl: "2em",
      pt: "0.5em",
    },
  });

  const BiographyLayout = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      alignItems: "start",
      width: "35%",
    },
  });

  const BiographyContainer = chakra(Flex, {
    baseStyle: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
    },
  });

  return (
    <HeaderLayout>
      <HStack width="80%" height="60vh">
        <InfoImage
          width="20%"
          height="80%"
          imageType="portrait"
          imageSource={profileSource}
          borderRadius="lg"
        />
        <InfoLayout>
          <Text fontSize="2xl" fontWeight="semibold">
            {name}
          </Text>
          {bioGraphy !== "" && (
            <>
              {bioGraphy.length > 200 ? (
                <BiographyLayout>
                  <BiographyContainer>
                    <Text fontSize="lg" fontWeight="semibold">
                      Biography
                    </Text>
                    <ModalBox modalcontent={bioGraphy} />
                  </BiographyContainer>
                  <Text>{bioGraphy.substring(0, 200)}...</Text>
                </BiographyLayout>
              ) : (
                <Box width="35%">
                  <Text>{bioGraphy}</Text>
                </Box>
              )}
            </>
          )}
        </InfoLayout>
      </HStack>
    </HeaderLayout>
  );
};

export default ProfileHeader;
