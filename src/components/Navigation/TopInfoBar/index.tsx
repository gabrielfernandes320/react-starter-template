import { ArrowBackIcon, AddIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Spacer,
  Button,
  Text,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

interface Props {
  title: string;
  subtitle: string;
  Buttons: any[];
}

const TopInfoBar: React.FC<Props> = ({ Buttons, subtitle, title }: Props) => {
  const history = useHistory();

  return (
    <>
      <Box
        marginBottom={"10"}
        borderBottomWidth={1}
        boxShadow={"md"}
        height={"fit-content"}
        p={4}
        pt={"2"}
        pl={"6"}
        display="flex"
        alignContent={"center"}
        alignItems="center"
      >
        <IconButton
          onClick={() => {
            history.goBack();
          }}
          mr="2"
          aria-label="Back"
          variant={"ghost"}
          icon={<ArrowBackIcon w={7} h={7} />}
        />

        <Box>
          <Text fontSize={"xl"} fontWeight="bold">
            {title}
          </Text>
          <Text fontSize={"md"}>{subtitle}</Text>
        </Box>

        <Spacer />
        <HStack pr={6}>{Buttons.map((Btn) => Btn)}</HStack>
      </Box>
    </>
  );
};

export default TopInfoBar;
