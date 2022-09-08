import React, { useEffect, useRef, useState } from "react";
import { Button, Box } from "@mui/material";

export default function Canvas() {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [image, setImage] = useState(null);

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
    context.lineWidth = 5;
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
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    contextRef.current.drawImage(image, 0, 0);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = dataURL;
    link.click();
  };

  useEffect(() => {
    prepareCanvas();
  }, []);

  useEffect(() => {
    const catImage = new Image();
    catImage.src = "https://thiscatdoesnotexist.com/";
    catImage.onload = () => {
      setImage(catImage);
    };
  }, []);

  useEffect(() => {
    if (image && contextRef.current) {
      contextRef.current.drawImage(image, 0, 0);
    }
  }, [image, contextRef]);

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
          sx={{ m: 1 }}
          variant="contained"
          size="large"
          onClick={saveDrawing}
        >
          {"Save Drawing"}
        </Button>
      </Box>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}
