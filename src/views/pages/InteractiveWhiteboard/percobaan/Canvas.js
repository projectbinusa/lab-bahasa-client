import React, { useEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();

const Canvas = ({
  canvasRef,
  color,
  setElements,
  elements,
  tool,
  socket,
  lineWidth,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const roughCanvas = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const handleResize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * 2;
      canvas.height = height * 2;
      context.scale(2, 2);
      context.lineCap = "round";
      redrawElements(); // Redraw elements on resize
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size setup

    roughCanvas.current = rough.canvas(canvasRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      socket.off("canvasImage");
    };
  }, []);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    context.lineWidth = lineWidth;
  }, [color, lineWidth, tool]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    setIsDrawing(true);

    if (tool === "pencil" || tool === "eraser") {
      setElements((prevElements) => [
        ...prevElements,
        {
          path: [[offsetX, offsetY]],
          stroke: tool === "eraser" ? "#ffffff" : color,
          element: tool,
          lineWidth: lineWidth,
        },
      ]);
    } else if (tool === "line" || tool === "rect") {
      setElements((prevElements) => [
        ...prevElements,
        {
          startX: offsetX,
          startY: offsetY,
          endX: offsetX,
          endY: offsetY,
          stroke: color,
          element: tool,
          lineWidth: lineWidth,
        },
      ]);
    } else if (tool === "circle") {
      setElements((prevElements) => [
        ...prevElements,
        {
          centerX: offsetX,
          centerY: offsetY,
          radius: 0,
          stroke: color,
          element: tool,
          lineWidth: lineWidth,
        },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;
    const lastIndex = elements.length - 1;

    if (tool === "pencil" || tool === "eraser") {
      if (Array.isArray(elements[lastIndex].path)) {
        const updatedPath = [...elements[lastIndex].path, [offsetX, offsetY]];
        setElements((prevElements) => [
          ...prevElements.slice(0, lastIndex),
          {
            ...prevElements[lastIndex],
            path: updatedPath,
          },
        ]);
      }
    } else if (tool === "line" || tool === "rect") {
      setElements((prevElements) => [
        ...prevElements.slice(0, lastIndex),
        {
          ...prevElements[lastIndex],
          endX: Math.min(Math.max(offsetX, 0), canvasRef.current.width),
          endY: Math.min(Math.max(offsetY, 0), canvasRef.current.height),
        },
      ]);
    } else if (tool === "circle") {
      const centerX = elements[lastIndex].centerX;
      const centerY = elements[lastIndex].centerY;
      const radius = Math.sqrt(
        Math.pow(
          Math.min(Math.max(offsetX, 0), canvasRef.current.width) - centerX,
          2
        ) +
          Math.pow(
            Math.min(Math.max(offsetY, 0), canvasRef.current.height) - centerY,
            2
          )
      );
      setElements((prevElements) => [
        ...prevElements.slice(0, lastIndex),
        {
          ...prevElements[lastIndex],
          radius: radius,
        },
      ]);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    socket.emit("drawing", canvasRef.current.toDataURL());
  };

  useEffect(() => {
    redrawElements();
  }, [elements]);

  const redrawElements = () => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    elements.forEach((ele) => {
      if (ele.element === "pencil" || ele.element === "eraser") {
        roughCanvas.current.linearPath(ele.path, {
          stroke: ele.stroke,
          strokeWidth: ele.lineWidth,
          roughness: 1,
        });
      } else if (ele.element === "line") {
        context.beginPath();
        context.moveTo(ele.startX, ele.startY);
        context.lineTo(ele.endX, ele.endY);
        context.strokeStyle = ele.stroke;
        context.lineWidth = ele.lineWidth;
        context.stroke();
      } else if (ele.element === "rect") {
        context.beginPath();
        context.rect(
          ele.startX,
          ele.startY,
          ele.endX - ele.startX,
          ele.endY - ele.startY
        );
        context.strokeStyle = ele.stroke;
        context.lineWidth = ele.lineWidth;
        context.stroke();
      } else if (ele.element === "circle") {
        context.beginPath();
        context.arc(
          ele.centerX,
          ele.centerY,
          ele.radius,
          0,
          2 * Math.PI
        );
        context.strokeStyle = ele.stroke;
        context.lineWidth = ele.lineWidth;
        context.stroke();
      }
    });
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: "20px",
        overflow: "hidden"
      }}
    />
  );
};

export default Canvas;
