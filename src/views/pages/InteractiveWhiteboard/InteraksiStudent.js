import React, { useState, useRef, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {
  Button,
  Grid,
  IconButton,
  Tooltip,
  Box,
  Divider,
  Typography,
  Slider,
  TextField,
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Brush,
  FormatShapes,
  Circle,
  Delete,
  Undo,
  Redo,
  AddCircleOutline,
  Share,
} from "@mui/icons-material";
import Navbar from "../../../component/Navbar1";
import { API_DUMMY } from "../../../utils/api";
import axios from "axios";
import Swal from "sweetalert2";
import io from "socket.io-client";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

const socket = io(API_DUMMY);

const InteraksiStudent = () => {
  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(5);
  const [tool, setTool] = useState("brush");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [siswaWhiteboards, setSiswaWhiteboards] = useState({});
  const [mode, setMode] = useState("co-draw"); // Default mode is "co-draw"
  const [openDialog, setOpenDialog] = useState(false); // State untuk mengelola dialog
  const class_id = localStorage.getItem("class_id");

  const canvasRef = useRef();
  const guruCanvasRef = useRef(); // Ref untuk papan gambar guru

  useEffect(() => {
    getAllData();
    getAllSiswaWhiteboards();

    // Join guru ke papan gambar mereka sendiri
    socket.emit("joinWhiteboard", `guru_${class_id}`);

    // Listener untuk perintah menggambar dari server
    socket.on("drawing", (drawData) => {
      if (canvasRef.current) {
        canvasRef.current.loadPaths(drawData);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Handle mode changes
    if (mode === "individual") {
      const newCanvases = {};
      selectedStudents.forEach((studentId) => {
        if (!siswaWhiteboards[studentId]) {
          newCanvases[studentId] = React.createRef();
        }
      });
      setSiswaWhiteboards((prevWhiteboards) => ({
        ...prevWhiteboards,
        ...newCanvases,
      }));
    }
  }, [mode, selectedStudents, siswaWhiteboards]);

  const handleShare = () => {
    console.log("Berbagi papan");
  };

  const handleSendMessage = () => {
    const newMessages = [...messages, message];
    setMessages(newMessages);
    setMessage("");
  };

  const handleClearBoard = () => {
    if (mode === "co-draw") {
      canvasRef.current.clearCanvas();
    } else {
      // Clear guru's canvas
      guruCanvasRef.current.clearCanvas();
      // Clear selected students' canvases
      selectedStudents.forEach((studentId) => {
        if (siswaWhiteboards[studentId]) {
          siswaWhiteboards[studentId].current.clearCanvas();
        }
      });
    }
  };

  const handleUndo = () => {
    if (mode === "co-draw") {
      canvasRef.current.undo();
    } else {
      // Undo guru's canvas
      guruCanvasRef.current.undo();
      // Undo selected students' canvases
      selectedStudents.forEach((studentId) => {
        if (siswaWhiteboards[studentId]) {
          siswaWhiteboards[studentId].current.undo();
        }
      });
    }
  };

  const handleRedo = () => {
    if (mode === "co-draw") {
      canvasRef.current.redo();
    } else {
      // Redo guru's canvas
      guruCanvasRef.current.redo();
      // Redo selected students' canvases
      selectedStudents.forEach((studentId) => {
        if (siswaWhiteboards[studentId]) {
          siswaWhiteboards[studentId].current.redo();
        }
      });
    }
  };

  const handleNewBoard = async () => {
    const canvasData = await (mode === "co-draw"
      ? canvasRef.current.exportImage("png")
      : guruCanvasRef.current.exportImage("png"));
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

  const handleStudentSelection = (e, student) => {
    const isSelected = e.target.checked;
    if (isSelected) {
      setSelectedStudents([...selectedStudents, student.id]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== student.id));
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === "individual") {
      const newCanvases = {};
      selectedStudents.forEach((id) => {
        if (!siswaWhiteboards[id]) {
          newCanvases[id] = React.createRef();
        }
      });
      setSiswaWhiteboards((prevWhiteboards) => ({
        ...prevWhiteboards,
        ...newCanvases,
      }));
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const saveChange = async (e) => {
    e.preventDefault();
    const data = {
      user_id: selectedStudents,
    };
    const url_hit = `${API_DUMMY}/api/instructur/class/${class_id}/whiteboard`;

    try {
      const response = await axios.post(url_hit, data, authConfig);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menambahkan client.",
          showConfirmButton: false,
          timer: 1500,
        });
        setOpenDialog(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/management_name_list`,
        authConfig
      );
      setStudents(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSiswaWhiteboards = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/whiteboard`,
        authConfig
      );
      setSiswaWhiteboards(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDraw = async (paths) => {
    if (mode === "co-draw") {
      socket.emit("drawing", { whiteboardId: `guru_${class_id}`, paths });
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
          paddingBottom: "20px",
          overflowX: "hidden",
        }}>
        <Typography variant="h4" gutterBottom sx={{ py: 1, px: 2 }}>
          Papan Interaksi dengan Siswa
        </Typography>
        <Divider />
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={9}>
            {mode === "co-draw" ? (
              <ReactSketchCanvas
                ref={canvasRef}
                height="77vh"
                style={{ backgroundColor: "white" }}
                {...getToolProps()}
                strokeWidth={width}
                strokeColor={tool === "eraser" ? "#ffffff" : color}
                allowOnlyPointerType="all"
                onChange={handleDraw}
              />
            ) : (
              <Box key="guru" sx={{ width: "100%", marginBottom: "20px" }}>
                <Typography variant="h6">{`Papan Guru`}</Typography>
                <ReactSketchCanvas
                  ref={guruCanvasRef}
                  height="77vh"
                  style={{ backgroundColor: "white" }}
                  {...getToolProps()}
                  strokeWidth={width}
                  strokeColor={tool === "eraser" ? "#ffffff" : color}
                  allowOnlyPointerType="all"
                />
              </Box>
            )}
            {mode === "individual" &&
              selectedStudents.map((studentId) => (
                <Box
                  key={studentId}
                  sx={{ width: "100%", marginBottom: "20px" }}>
                  <Typography variant="h6">{`Papan untuk siswa ${studentId}`}</Typography>
                  <ReactSketchCanvas
                    ref={siswaWhiteboards[studentId]}
                    height="77vh"
                    style={{ backgroundColor: "white" }}
                    {...getToolProps()}
                    strokeWidth={width}
                    strokeColor={tool === "eraser" ? "#ffffff" : color}
                    allowOnlyPointerType="all"
                  />
                </Box>
              ))}
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ ml: 1, mr: 2, mt: 2 }}>
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
                  <Delete />
                </IconButton>
              </Tooltip>
              <Divider />
              <Typography variant="h6">Pengaturan</Typography>
              <Typography gutterBottom>Ketebalan Garis</Typography>
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
              <Divider />
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
              <Tooltip title="Bersihkan">
                <IconButton onClick={handleClearBoard}>
                  <Delete />
                </IconButton>
              </Tooltip>
              <Tooltip title="Papan Baru">
                <IconButton onClick={handleNewBoard}>
                  <AddCircleOutline />
                </IconButton>
              </Tooltip>
              <Tooltip title="Bagikan">
                <IconButton onClick={handleShare}>
                  <Share />
                </IconButton>
              </Tooltip>
              <Divider />
              {/* <Typography variant="h6">Pesan</Typography> */}
              {/* <Box sx={{ height: 200, overflowY: "auto" }}>
                {messages.map((msg, index) => (
                  <Typography key={index}>{msg}</Typography>
                ))}
              </Box>
              <TextField
                label="Ketik pesan"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                multiline
                rows={4}
                sx={{ mt: 2 }}
              />
              <Button variant="contained" onClick={handleSendMessage} sx={{ mt: 2 }}>
                Kirim
              </Button> */}
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleOpenDialog}
                  sx={{ mb: 2 }}>
                  Pilih Murid
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  onClick={() => handleModeChange("individual")}>
                  Mode Individual
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2 }} />
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
            {students.map((student, index) => (
              <ListItem key={index}>
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
            Batal
          </Button>
          <Button onClick={saveChange} color="primary">
            Pilih
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InteraksiStudent;