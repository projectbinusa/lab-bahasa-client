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
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Brush, Delete, Undo, Redo, AddCircleOutline, Share } from "@mui/icons-material";
import Navbar from "../../../component/Navbar1";

const Whiteboard = () => {
  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(5);
  const [tool, setTool] = useState("brush");
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);

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
    const paths = await canvasRef.current.exportPaths();
    const image = await canvasRef.current.exportImage("png");
    const newBoard = { id: history.length + 1, paths: paths, image: image };
    setHistory([...history, newBoard]);
    handleClearBoard();
  };

  const handleClickOpen = (board) => {
    setSelectedBoard(board);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBoard(null);
  };

  const handleLoadBoard = async (board) => {
    setOpen(false);
    if (board) {
      await canvasRef.current.loadPaths(board.paths);
    }
  };

  const handleDeleteBoard = (boardId) => {
    setHistory(history.filter((board) => board.id !== boardId));
    setSelectedBoard(null);
  };

  const getToolProps = () => {
    switch (tool) {
      case "brush":
        return { tool: "pencil", strokeColor: color };
      case "eraser":
        return { tool: "eraser", strokeColor: "#FFFFFF" };
      default:
        return { tool: "pencil", strokeColor: color };
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
        <Typography variant="h4" gutterBottom sx={{ py: 1, px: 2 }}>
        Papan tulis interaktif
        </Typography>
        <Divider />
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={9}>
            <ReactSketchCanvas
              ref={canvasRef}
              strokeColor={getToolProps().strokeColor}
              strokeWidth={width}
              height="77vh"
              tool={getToolProps().tool}
              style={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={2} sx={{ ml: 1, mr: 2, mt: 2 }}>
              <Box>
                <Typography variant="h6">Peralatan</Typography>
                <Tooltip title="Brush">
                  <IconButton
                    color={tool === "brush" ? "primary" : "default"}
                    onClick={() => setTool("brush")}
                  >
                    <Brush />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eraser">
                  <IconButton
                    color={tool === "eraser" ? "primary" : "default"}
                    onClick={() => setTool("eraser")}
                  >
                    <i className="fa-solid fa-eraser"></i>{" "}
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Typography variant="h6">Pengaturan</Typography>
                <Typography sx={{ mt: 1 }} gutterBottom>
                Lebar Goresan
                </Typography>
                <Slider
                  value={width}
                  onChange={(e, newValue) => setWidth(newValue)}
                  min={1}
                  max={100}
                  valueLabelDisplay="auto"
                  sx={{ mx: 0 }}
                />
                <TextField
                  label="Warna"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  fullWidth
                  sx={{ mt: 2 }}
                />
              </Box>
              <Divider />
              <Box>
                <Typography variant="h6">Kontrol</Typography>
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
                <Tooltip title="Clear Board">
                  <IconButton onClick={handleClearBoard}>
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip title="New Board">
                  <IconButton onClick={handleNewBoard}>
                    <AddCircleOutline />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton onClick={handleShare}>
                    <Share  />
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider />
              <Box>
                <Typography variant="h6">Sejarah Dewan</Typography>
                <Box sx={{ maxHeight: "75px", overflowY: "auto" }}>
                  <Stack
                    spacing={0}
                    direction="row"
                    flexWrap="wrap"
                    sx={{
                      "& > *": {
                        flexBasis: "50%",
                        maxWidth: "50%",
                      },
                    }}
                  >
                    {history.map((board) => (
                      <Button
                        key={board.id}
                        variant="outlined"
                        onClick={() => handleClickOpen(board)}
                        sx={{ flexBasis: "135px", maxWidth: "50%" }}
                      >
                        Papan {board.id}
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBoard(board.id);
                          }}
                          sx={{ marginLeft: "auto" }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Button>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Papan {selectedBoard?.id}</DialogTitle>
        <DialogContent>
          {selectedBoard && (
            <img
              src={selectedBoard.image}
              alt={`Board ${selectedBoard.id}`}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleLoadBoard(selectedBoard)}
            color="primary"
          >
            Muat ke Papan Tulis
          </Button>
          <Button onClick={handleClose} color="primary">
          Menutup
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Whiteboard;
