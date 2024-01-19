import React, { useState, useEffect } from "react";
import { Button, Container, Flex, RadioGroup, Text } from "@radix-ui/themes";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import {
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from "@mysten/dapp-kit";
import Board from "./board";
import { useGetCanvas } from "../useGetCanvas";
import { SuiObjectData } from "@mysten/sui.js/client";
//import { HexColorPicker } from "react-colorful";


const Structure: React.FC = () => {
    const client = useSuiClient();
    const [selected, setSelected] = useState<boolean>(false); 
    const [col, setColumn] = useState<number>(0);   
    const [currentX, setCurrentX] = useState<number>(0);
    const [currentY, setCurrentY] = useState<number>(0);
    const [nextMove, setMove] = useState<number>(0);
    const [srcA, setSrc] = useState<string>("https://chipsandgames.com/cdn/shop/products/DESIGN-RED-CHIP-CUSTOM-POKER-CHIPS-SINGLE-COLOR-HOT-STAMP-DICE_500x500.png?v=1593711462");

    const [currentPlayer, setCurrentPlayer] = useState<string>("B80F0A");
    const [length, setLength] = useState<number>(0);

    const [overallGrid, setGrid] = useState<string[][]>([]);
    const [localGrid, setLocalGrid] = useState<string[][]>([]);
    const { handleGetCanvas } = useGetCanvas();
    const { data, isLoading, error, refetch } = handleGetCanvas();
    const { mutate: signAndExecuteTransactionBlock } =
    useSignAndExecuteTransactionBlock();
    //const [color, setColor] = useState("#aabbcc");

  const handleMouseMove = (event: React.MouseEvent) => {
      setCurrentX(event.clientX);
      setCurrentY(event.clientY);
      placeHand(getColumn([currentX, currentY]));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      console.log(interval);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading && !error && data.data) {
      console.log(data);
      const currentCanvas = getArrayFields(data.data);
      setGrid(currentCanvas);
      if (length !== currentCanvas.length) {
        setLength(currentCanvas.length);
        if (currentCanvas) {
          // Create a new grid with the same dimensions as currentCanvas
          const newLocalGrid = Array.from(
            { length: currentCanvas.length },
            () => Array(currentCanvas[0].length).fill("0"),
          );
          setLocalGrid(newLocalGrid);
        }
      }
    }
  }, [data, isLoading, error]);

  const handleMoveSubmission = async () => {
      let transactionBlock = new TransactionBlock();
      //transactionBlock.setGasBudget(1000000000);
      transactionBlock.moveCall({
        target: `0x3457fe99e5ff9bb1fff58ab0b6399645f89c9aa674b9d8ef82db73b61a0c25f8::board::drop_token`,
        arguments: [
          transactionBlock.object(
            "0xb6bc953caf18a7c8666a57ed22f25d34554d2533a3845481444039977482bd04",
          ),
          transactionBlock.pure(nextMove),
          transactionBlock.pure(currentPlayer),
        ],
      });
      

      signAndExecuteTransactionBlock(
        {
          transactionBlock,
          chain: "sui:testnet",
        },
      {
        onSuccess: (tx) => {
          console.log(tx);
          setMove(0);
          client.waitForTransactionBlock({ digest: tx.digest }).then(() => {
            refetch(); // Update board into the console and refresh it.
          });
          if (currentPlayer == "B80F0A") {
            setCurrentPlayer("FEE12B");
            setSrc("https://chipsandgames.com/cdn/shop/products/CUSTOM-POKER-CHIPS-6-STRIPE-DESIGN-YELLOW-CHIPS-12-GRAM-CLAY-COMPOSITE_500x500.png?v=1593709672");
          } else {
            setCurrentPlayer("B80F0A");
            setSrc("https://chipsandgames.com/cdn/shop/products/DESIGN-RED-CHIP-CUSTOM-POKER-CHIPS-SINGLE-COLOR-HOT-STAMP-DICE_500x500.png?v=1593711462")
          }
          setSelected(false);
        },
        onError: (err) => {
          console.log(err);
          
        },
      },
    );
  };

  document.addEventListener('click', (event: MouseEvent) => {
        const mouseX = event.clientX; 
        const mouseY = event.clientY;
        if (mouseY > 360) {
            setSelected(!selected);
        }
      
        console.log(`Clicked at coordinates: (${mouseX}, ${mouseY})`);

    
    });
    function getColumn([x, y]: [number, number]) {
        if (x > 230) {
            if (x < 475){
                return "0";
            }
            if (x < 600){
                return "1";
            }
            if (x < 720){
                return "2";
            }
            if (x < 840){
                return "3";
            }
            if (x < 960){
                return "4";
            }
            if (x < 1080){
                return "5";
            }
            if (x < 1200){
                return "6";
            }
        }
        return "";
    }

    function placeHand(column : string) { 
        setMove(parseInt(column));
        if (selected == true) {
            return;
        }
        switch(column) { 
            case("0"):
                setColumn(90);
                break;
            case("1"):
                setColumn(210);
                break;
            case("2"):
                setColumn(330);
                break;
            case("3"):
                setColumn(450);
                break;
            case("4"):
                setColumn(570);
                break;
            case("5"):
                setColumn(690);
                break;
            case("6"):
                setColumn(810);
                break;
            default:
                setColumn(-10000); // make it disappear (unselecting)
                break;
            
        }
    }
    
    return (
        <div
          onMouseMove={handleMouseMove}
        >
            <Flex direction = "row">
                <Button onClick={handleMoveSubmission}> Submit Txn </Button>
            </Flex>
            <Container>
                
                <img
                    src = {srcA}
                    style={{ position: "relative", top: 100, left: col, width: '100px', height: '100px'}} // Initial position
                />
            </Container>
            <Flex>
                <Board
                    C4board = {overallGrid}
                    localBoard = {localGrid}
                    player1Color = "B80F0A"
                    player2Color = "FEE12B">
                </Board>
                <img 
                    src="https://i.imgur.com/cBltSyt.png"
                    style={{ position: "absolute", top: 500, width: "1000px"}}
                />
            </Flex>
                
        </div>
    );
}

function getArrayFields(data: SuiObjectData) {
    if (data.content?.dataType !== "moveObject") {
      throw new Error("Content not found");
    }
  
    const { tokens } = data.content.fields as { tokens: Array<Array<string>> };
    return tokens;
}

export default Structure;