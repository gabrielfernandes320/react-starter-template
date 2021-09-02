import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Spacer, Text, HStack } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";
import { useHistory } from "react-router-dom";

interface Props {
    title: string;
    subtitle: string;
    Buttons: ReactNode[];
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
                    <Text fontSize={[0, "xl"]} fontWeight="bold">
                        {title}
                    </Text>
                    <Text fontSize={[0, "md"]}>{subtitle}</Text>
                </Box>

                <Spacer />
                <HStack pr={[0, 6]}>
                    {Buttons.map((Btn, index) => (
                        <React.Fragment key={index}>{Btn} </React.Fragment>
                    ))}
                </HStack>
            </Box>
        </>
    );
};

export default TopInfoBar;
