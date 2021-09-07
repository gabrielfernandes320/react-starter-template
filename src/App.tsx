import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { theme, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AuthProvider } from "./hooks/use-auth";
function App() {
    const queryClient = new QueryClient();

    return (
        <>
            <Router>
                <ChakraProvider theme={theme}>
                    <QueryClientProvider client={queryClient}>
                        <ColorModeScript
                            initialColorMode={theme.config.initialColorMode}
                        />
                        <AuthProvider>
                            <Routes />
                        </AuthProvider>
                    </QueryClientProvider>
                </ChakraProvider>
            </Router>
        </>
    );
}

export default App;
