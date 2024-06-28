import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Canvas from "./Canvas";
import {
  Grid,
  Typography,
  Slider,
  Tooltip,
  IconButton,
  Stack,
  Divider,
  Box,
  TextField,
} from "@mui/material";
import {
  Undo,
  Redo,
  Brush,
  Crop54,
  Delete,
  TripOrigin,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPlusMinus } from "@fortawesome/free-solid-svg-icons";

const Room = ({ userNo, socket, setUsers, setUserNo }) => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState("pencil");
  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => {
    socket.on("message", (data) => {
      toast.info(data.message);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, [setUsers, setUserNo]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setElements([]);
    setHistory([]);
  };

  const undo = () => {
    if (elements.length > 0) {
      const lastElement = elements[elements.length - 1];
      setHistory((prevHistory) => [...prevHistory, lastElement]);
      setElements((prevElements) =>
        prevElements.filter((ele, index) => index !== elements.length - 1)
      );
    }
  };

  const redo = () => {
    if (history.length > 0) {
      const lastHistory = history[history.length - 1];
      setElements((prevElements) => [...prevElements, lastHistory]);
      setHistory((prevHistory) =>
        prevHistory.filter((ele, index) => index !== history.length - 1)
      );
    }
  };

  const handleLineWidthChange = (event, newValue) => {
    setLineWidth(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingBottom: "20px",
        overflowX: "hidden",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ pt: 1, px: 2 }}>
        Interactive Whiteboard - Users Online: {userNo}
      </Typography>
      <Divider />

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={9}>
          <Canvas
            canvasRef={canvasRef}
            color={color}
            setElements={setElements}
            elements={elements}
            tool={tool}
            height="76vh"
            socket={socket}
            lineWidth={lineWidth}
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              overflow: "hidden",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Stack spacing={2} sx={{ ml: 1, mr: 2, mt: 2 }}>
            <Box>
              <Typography variant="h6">Peralatan</Typography>
              <Tooltip title="Kuas">
                <IconButton
                  color={tool === "pencil" ? "primary" : "default"}
                  onClick={() => setTool("pencil")}
                >
                  <Brush />
                </IconButton>
              </Tooltip>
              <Tooltip title="Garis">
                <IconButton
                  color={tool === "line" ? "primary" : "default"}
                  onClick={() => setTool("line")}
                >
                  <FontAwesomeIcon icon={faPlusMinus} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Lingkaran">
                <IconButton
                  color={tool === "circle" ? "primary" : "default"}
                  onClick={() => setTool("circle")}
                >
                  <TripOrigin />
                </IconButton>
              </Tooltip>
              <Tooltip title="Persegi">
                <IconButton
                  color={tool === "rect" ? "primary" : "default"}
                  onClick={() => setTool("rect")}
                >
                  <Crop54 />
                </IconButton>
              </Tooltip>
              <Tooltip title="Penghapus">
                <IconButton
                  color={tool === "eraser" ? "primary" : "default"}
                  onClick={() => setTool("eraser")}
                >
                  <FontAwesomeIcon icon={faEraser} />
                </IconButton>
              </Tooltip>
            </Box>
            <Divider />
            <Box>
              <Typography variant="h6">Pengaturan</Typography>
              <Typography sx={{ mt: 1 }} gutterBottom>
                Lebar Goresan
              </Typography>
              <Slider
                value={lineWidth}
                min={1}
                max={100}
                onChange={handleLineWidthChange}
                valueLabelDisplay="auto"
                sx={{ flexGrow: 1, maxWidth: "90%" }}
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
              <Tooltip title="Batalkan">
                <IconButton onClick={undo} disabled={elements.length === 0}>
                  <Undo />
                </IconButton>
              </Tooltip>
              <Tooltip title="Ulangi">
                <IconButton onClick={redo} disabled={history.length === 0}>
                  <Redo />
                </IconButton>
              </Tooltip>
              <Tooltip title="Bersihkan Papan Tulis">
                <IconButton
                  onClick={clearCanvas}
                  disabled={elements.length === 0 && history.length === 0}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Room;
