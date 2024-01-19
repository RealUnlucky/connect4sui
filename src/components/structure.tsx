import React, { useState, useEffect } from "react";
import { Button, Container, Flex, RadioGroup, Text } from "@radix-ui/themes";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import {
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from "@mysten/dapp-kit";
import Board from "./board";
import { SuiObjectData } from "@mysten/sui.js/client";
//import { HexColorPicker } from "react-colorful";

const UPPER_BOUND = 1920;
const LOWER_BOUND = 0;


const Structure: React.FC = () => {
    const [col, setColumn] = useState<number>(0);
    const [currentX, setCurrentX] = useState<number>(0);
    const [currentY, setCurrentY] = useState<number>(0);    
    //const [color, setColor] = useState("#aabbcc");

  const handleMouseMove = (event: React.MouseEvent) => {
      setCurrentX(event.clientX);
      setCurrentY(event.clientY);
      placeHand(getColumn([currentX, currentY]));
  };

    // document.addEventListener('click', (event: MouseEvent) => {
    //     const mouseX = event.clientX; 
    //     const mouseY = event.clientY;
      
    //     console.log(`Clicked at coordinates: (${mouseX}, ${mouseY})`);
    
    //     placeHand(getColumn([mouseX, mouseY]));
    
    // });

    function getColumn([x, y]: [number, number]) {
        if (y < UPPER_BOUND && y > LOWER_BOUND && x > 230) {
            if (x < 385){
                return "0";
            }
            if (x < 506){
                return "1";
            }
            if (x < 626){
                return "2";
            }
            if (x < 746){
                return "3";
            }
            if (x < 866){
                return "4";
            }
            if (x < 986){
                return "5";
            }
            if (x < 1150){
                return "6";
            }
        }
        return "";
    }

    function placeHand(column : String) { 
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
            
            <p>{"HIIII"}</p>
            <img
                src="https://chipsandgames.com/cdn/shop/products/DESIGN-RED-CHIP-CUSTOM-POKER-CHIPS-SINGLE-COLOR-HOT-STAMP-DICE_500x500.png?v=1593711462"
                style={{ position: "relative", top: 100, left: col, width: '100px', height: '100px'}} // Initial position
            />
            <img 
                src="https://i.imgur.com/cBltSyt.png"
                style={{ position: "relative", top: 100, width: "1000px"}}
            />
        </div>
    );
}
  

export default Structure;