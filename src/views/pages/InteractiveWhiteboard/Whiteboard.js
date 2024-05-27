import React, { useState, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {
  Button,
  Grid,
  IconButton,
  Tooltip,
  Stack,
  Box,
  Divider,
  Typography,
  Slider,
  TextField,
} from "@mui/material";
import {
  Circle as CircleIcon,
  FormatShapes,
  Brush,
  Delete,
  FormatClear,
  Undo,
  Redo,
} from "@mui/icons-material";
import Navbar from "../../../component/Navbar1";

const Whiteboard = () => {
  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(5);
  const [tool, setTool] = useState("brush");
  const [history, setHistory] = useState([]);

  const canvasRef = useRef();

  const handleShare = () => {
    console.log("Sharing the board");
  };

  const handleClearBoard = () => {
    canvasRef.current.clearCanvas();
  };

  const handleUndo = () => {
    canvasRef.current.undo();
  };

  const handleRedo = () => {
    canvasRef.current.redo();
  };

  const handleNewBoard = async () => {
    const canvasData = await canvasRef.current.exportImage("png");
    setHistory([...history, canvasData]);
    handleClearBoard();
  };

  const getToolProps = () => {
    switch (tool) {
      case "brush":
        return { tool: "pencil" };
      case "shape":
        return { tool: "rectangle" };
      case "circle":
        return { tool: "circle" };
      case "eraser":
        return { tool: "eraser" };
      default:
        return { tool: "pencil" };
    }
  };

  return (
    <div className="all bg-[#F4F4F4]">
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          marginTop: "60px",
          paddingBottom: "20px",
          overflowX: "hidden",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ p: 2 }}>
          Interactive Whiteboard
        </Typography>
        <Divider />
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={9}>
            <ReactSketchCanvas
              ref={canvasRef}
              strokeColor={color}
              strokeWidth={width}
              height="75vh"
              {...getToolProps()}
              style={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={2} sx={{ mx: 2 }}>
              <Box>
                <Typography variant="h6">Tools</Typography>
                <Tooltip title="Brush">
                  <IconButton
                    color={tool === "brush" ? "primary" : "default"}
                    onClick={() => setTool("brush")}
                  >
                    <Brush />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Shape">
                  <IconButton
                    color={tool === "shape" ? "primary" : "default"}
                    onClick={() => setTool("shape")}
                  >
                    <FormatShapes />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Circle">
                  <IconButton
                    color={tool === "circle" ? "primary" : "default"}
                    onClick={() => setTool("circle")}
                  >
                    <CircleIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eraser">
                  <IconButton
                    color={tool === "eraser" ? "primary" : "default"}
                    onClick={() => setTool("eraser")}
                  >
                    <FormatClear />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Typography variant="h6">Settings</Typography>
                <Typography sx={{ mt: 1 }} gutterBottom>Stroke Width</Typography>
                <Slider
                  value={width}
                  onChange={(e, newValue) => setWidth(newValue)}
                  min={1}
                  max={50}
                  valueLabelDisplay="auto"
                  sx={{ mx: 0 }}
                />
                <TextField
                  label="Color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  fullWidth
                  sx={{ mt: 2 }}
                />
              </Box>
              <Divider />
              <Box>
                <Typography variant="h6">Controls</Typography>
                <Tooltip title="Undo">
                  <IconButton onClick={handleUndo}>
                    <Undo />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Redo">
                  <IconButton onClick={handleRedo}>
                    <Redo />
                  </IconButton>
                </Tooltip>
                <Tooltip title="New Board">
                  <IconButton onClick={handleNewBoard}>
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Button variant="contained" onClick={handleShare}>
                  Share
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Whiteboard;