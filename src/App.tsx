import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { WalletStatus } from "./WalletStatus";
import Board from "./components/board";
import Structure from "./components/structure";
import { createBrowserRouter } from "react-router-dom";
import Router from "./Routers/Router";

function App() {
  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>Sui Connect 4</Heading>
        </Box>
        <Router>
           <Heading>Test 4</Heading>
        </Router>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 100}}
        > 
          <WalletStatus />
        </Container>
        <Structure/>
      </Container>
    </>
  );
}

export default App;
