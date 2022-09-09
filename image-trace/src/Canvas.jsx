import React, { useEffect, useRef, useState } from "react";
import { getImage, testApi } from "./api";
import { Button, Box } from "@mui/material";

export default function Canvas() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [image, setImage] = useState(null);
  const [xCoords, setXCoords] = useState([]);
  const [yCoords, setYCoords] = useState([]);
  const [finalCoords, setFinalCoords] = useState([]);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    setFinalCoords([xCoords, yCoords]);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setXCoords((xCoords) => [...xCoords, offsetX]);
    setYCoords((yCoords) => [...yCoords, offsetY]);
  };

  const clearCanvas = () => {
    contextRef.current.drawImage(image, 0, 0);
  };

  const arrayToCsv = (data) => {
    return data
      .map(
        (row) =>
          row
            .map(String) // convert every value to String
            .map((v) => v.replaceAll('"', '""')) // escape double colons
            .map((v) => `"${v}"`) // quote it
            .join(",") // comma-separated
      )
      .join("\r\n"); // rows starting on new lines
  };

  const saveCoordinates = () => {
    const formattedCoords = arrayToCsv(finalCoords);
    const data = new Blob([formattedCoords], { type: "text/csv" });
    const csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "Coordinates" + Date() + ".csv");
    tempLink.click();
  };

  useEffect(() => {
    prepareCanvas();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      const traceImage = new Image();
      const imageRequest = await getImage("get");
      traceImage.src = imageRequest.request.responseURL;
      traceImage.crossOrigin = "Anonymous";
      traceImage.onload = () => {
        setImage(traceImage);
      };
    };
    fetchImage();
  }, []);

  useEffect(() => {
    if (image && contextRef.current) {
      contextRef.current.drawImage(image, 0, 0);
    }
  }, [image, contextRef]);

  useEffect(() => {
    testApi("get").then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      <Box
        m={2}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Button
          sx={{ m: 1 }}
          variant="contained"
          size="large"
          onClick={clearCanvas}
        >
          {"Clear"}
        </Button>
        <Button
          onClick={saveCoordinates}
          sx={{ m: 1 }}
          variant="contained"
          size="large"
        >
          {"Save Drawing"}
        </Button>
      </Box>
      <canvas
        id="canvas"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}
