import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Text, Spacer, Collapse } from "@chakra-ui/react";
import { CenteredBox } from "./BasicLayouts";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface ICollapseBoxProps {
  title: string;
}

const CollapseBox: React.FC<ICollapseBoxProps> = ({ title, children }) => {
  const { isOpen, onToggle} = useDisclosure()

  return (
    <>
      <CenteredBox my={2} px={2}>
        <Text fontSize="lg">{title}</Text>
        <Spacer />
        {isOpen ? (
          <ChevronDownIcon onClick={onToggle}/>
        ) : (
          <ChevronUpIcon onClick={onToggle} />
        )}
      </CenteredBox>
      <Collapse in={!isOpen} animateOpacity={true}>{children}</Collapse>
    </>
  );
};

export default CollapseBox;
