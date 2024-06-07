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
  TextField,
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Circle,
  FormatShapes,
  Brush,
  Send,
  Delete,
  Undo,
  Redo,
  AddCircleOutline,
  Share,
} from "@mui/icons-material";
import Navbar from "../../../component/Navbar1";

const InteraksiStudent = () => {
  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(5);
  const [tool, setTool] = useState("brush");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [students, setStudents] = useState([
    { id: "student1", name: "Murid 1" },
    { id: "student2", name: "Murid 2" },
    { id: "student3", name: "Murid 3" },
  ]);
  const [mode, setMode] = useState("individual"); // Mode: "individual" atau "co-draw"
  const [openDialog, setOpenDialog] = useState(false); // State untuk mengelola dialog

  const canvasRef = useRef();

  const handleShare = () => {
    // Implementasi logika berbagi papan dengan siswa
    console.log("Berbagi papan");
  };

  const handleSendMessage = () => {
    const newMessages = [...messages, message];
    setMessages(newMessages);
    setMessage("");
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

  const handleStudentSelection = (event, student) => {
    const selected = event.target.checked;
    if (selected) {
      setSelectedStudents([...selectedStudents, student.id]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== student.id));
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === "co-draw") {
      // Logika untuk mengajak siswa menggambar di papan yang sama
      console.log("Mengajak siswa menggambar di papan yang sama");
    } else if (newMode === "individual") {
      // Logika untuk meminta siswa menggambar di papan masing-masing
      console.log("Meminta siswa menggambar di papan masing-masing");
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
        <Typography variant="h4" gutterBottom sx={{ py: 1, px: 2, mt: 2 }}>
          Papan Interaksi Dengan Siswa
        </Typography>
        <Divider />
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={9}>
            <ReactSketchCanvas
              ref={canvasRef}
              height="77vh"
              style={{ backgroundColor: "white" }}
              {...getToolProps()}
              strokeWidth={width}
              strokeColor={tool === "eraser" ? "#ffffff" : color}
              allowOnlyPointerType="all"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={2} sx={{ ml: 1, mr: 2, mt: 2 }}>
              <Box>
                <Typography variant="h6">Peralatan</Typography>
                <Tooltip title="Kuas">
                  <IconButton onClick={() => setTool("brush")}>
                    <Brush />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Bentuk">
                  <IconButton onClick={() => setTool("shape")}>
                    <FormatShapes />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Lingkaran">
                  <IconButton onClick={() => setTool("circle")}>
                    <Circle />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Penghapus">
                  <IconButton onClick={() => setTool("eraser")}>
                    <i className="fa-solid fa-eraser"></i>{" "}
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Typography variant="h6">Pengaturan</Typography>
                <Typography sx={{ mt: 1 }} gutterBottom>
                  Ketebalan Garis
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
                <Tooltip title="Bersihkan Papan">
                  <IconButton onClick={handleClearBoard}>
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Papan Baru">
                  <IconButton onClick={handleNewBoard}>
                    <AddCircleOutline />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Papan Baru">
                  <IconButton onClick={handleShare}>
                    <Share />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Typography variant="h6">Interaksi</Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleOpenDialog}
                    sx={{ mb: 2 }}
                  >
                    Pemilihan murid
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => handleModeChange("individual")}
                  >
                    Menggambar secara individual
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2 }} />
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Obrolan</Typography>
          <List sx={{ maxHeight: 300, overflow: "auto" }}>
            {messages.map((msg, index) => (
              <ListItem key={index}>{msg}</ListItem>
            ))}
          </List>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              fullWidth
              size="small"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton onClick={handleSendMessage}>
              <Send />
            </IconButton>
          </Stack>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">History</Typography>
          <Grid container spacing={2}>
            {history.map((image, index) => (
              <Grid item key={index} xs={12} sm={6}>
                <Box sx={{ width: "100%" }}>
                  <img src={image} alt={`Canvas ${index}`} width="100%" />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Pilih Murid</DialogTitle>
        <DialogContent>
          <List>
            {students.map((student) => (
              <ListItem key={student.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onChange={(e) => handleStudentSelection(e, student)}
                    />
                  }
                  label={student.name}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Tutup
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Pilih
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InteraksiStudent;
