import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "react-router-dom";
import Routes from "./routes";
import { theme, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AuthProvider } from "./hooks/use-auth";
import history from "./services/history";
function App() {
    const queryClient = new QueryClient();

    return (
        <>
            <Router history={history}>
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
