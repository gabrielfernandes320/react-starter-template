import React from "react";
import { Box, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

interface Props {
  message: string;
  status?: "error" | "success" | "warning" | "info";
}

export default function ErrorMessage({ message, status }: Props) {
  return (
    <Box my={4}>
      <Alert status={status} borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
}
