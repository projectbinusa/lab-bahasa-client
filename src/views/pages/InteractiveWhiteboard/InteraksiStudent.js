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

const socket = io("http://localhost:5000");

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
  const [list, setList] = useState([]);
  const [mode, setMode] = useState("co-draw");
  const [openDialog, setOpenDialog] = useState(false);
  const class_id = localStorage.getItem("class_id");
  const role = localStorage.getItem("role");

  const canvasRef = useRef();
  const guruCanvasRef = useRef();

  
  useEffect(() => {
    getAllData();
    getAllSiswaWhiteboards();

    const room = role === "instructur" ? `guru_${class_id}` : `siswa_${class_id}`;
    socket.emit("joinWhiteboard", { room, role });

    socket.on("drawing", ({ whiteboardId, paths }) => {
      // Menggunakan whiteboardId untuk membedakan pembaruan yang diterima
      if (whiteboardId === `guru_${class_id}`) {
        canvasRef.current.loadPaths(paths);
      } else if (siswaWhiteboards[whiteboardId]) {
        siswaWhiteboards[whiteboardId].current.loadPaths(paths);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [class_id, role]);



  useEffect(() => {
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
  }, [mode, selectedStudents]);

  const handleShare = () => {
    console.log("Berbagi papan");
  };

  const handleClearBoard = () => {
    if (mode === "co-draw") {
      canvasRef.current.clearCanvas();
    } else {
      guruCanvasRef.current.clearCanvas();
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
      guruCanvasRef.current.undo();
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
      guruCanvasRef.current.redo();
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

        // Setelah menambahkan siswa, perlu update state siswaWhiteboards
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
    } catch (error) {
      console.log(error);
    }
  };


  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/management_name_list?limit=100`,
        authConfig
      );
      const filteredUsers = response.data.data.filter(
        (user) =>
          (role === "instructur" &&
            user.role === "student" &&
            user.class_id === parseInt(class_id)) ||
          (role === "student" &&
            user.role === "instructur" &&
            user.class_id === parseInt(class_id))
      );
      setStudents(filteredUsers);
      console.log(filteredUsers);
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
      setList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDraw = async (paths) => {
    const whiteboardId = mode === "co-draw" ? `guru_${class_id}` : `student_${class_id}`;
    socket.emit("drawing", { whiteboardId, paths });
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
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            px: 2,
          }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}>
                <Tooltip title="Brush" placement="right">
                  <IconButton
                    color={tool === "brush" ? "primary" : "default"}
                    onClick={() => setTool("brush")}>
                    <Brush />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Shape" placement="right">
                  <IconButton
                    color={tool === "shape" ? "primary" : "default"}
                    onClick={() => setTool("shape")}>
                    <FormatShapes />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Circle" placement="right">
                  <IconButton
                    color={tool === "circle" ? "primary" : "default"}
                    onClick={() => setTool("circle")}>
                    <Circle />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eraser" placement="right">
                  <IconButton
                    color={tool === "eraser" ? "primary" : "default"}
                    onClick={() => setTool("eraser")}>
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Divider />
                <Tooltip title="Undo" placement="right">
                  <IconButton onClick={handleUndo}>
                    <Undo />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Redo" placement="right">
                  <IconButton onClick={handleRedo}>
                    <Redo />
                  </IconButton>
                </Tooltip>
                <Divider />
                <Tooltip title="Add New Board" placement="right">
                  <IconButton onClick={handleNewBoard}>
                    <AddCircleOutline />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share" placement="right">
                  <IconButton onClick={handleOpenDialog}>
                    <Share />
                  </IconButton>
                </Tooltip>
                <Divider />
                <Typography variant="subtitle1" gutterBottom>
                  Color
                </Typography>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  style={{ width: "100%" }}
                />
                <Typography variant="subtitle1" gutterBottom>
                  Width
                </Typography>
                <Slider
                  value={width}
                  onChange={(e, newValue) => setWidth(newValue)}
                  min={1}
                  max={20}
                />
                <Divider />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={mode === "individual"}
                      onChange={() =>
                        setMode((prevMode) =>
                          prevMode === "individual" ? "co-draw" : "individual"
                        )
                      }
                    />
                  }
                  label="Individual Mode"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  height: "70vh",
                  overflowY: "auto",
                }}>
                {mode === "co-draw" && (
                  <ReactSketchCanvas
                    ref={canvasRef}
                    style={{ border: "0.0625rem solid #9c9c9c", height: "60vh" }}
                    width="100%"
                    height="100%"
                    strokeColor={color}
                    strokeWidth={width}
                    onUpdate={(updatedPaths) => handleDraw(updatedPaths)}
                    {...getToolProps()}
                  />
                )}
                {mode === "individual" && (
                  <>
                    <ReactSketchCanvas
                      ref={guruCanvasRef}
                      style={{ border: "0.0625rem solid #9c9c9c", height: "60vh" }}
                      width="100%"
                      height="100%"
                      strokeColor={color}
                      strokeWidth={width}
                      onUpdate={(updatedPaths) => handleDraw(updatedPaths)}
                      {...getToolProps()}
                    />
                    <Typography variant="h6" gutterBottom>
                      Siswa-siswa yang dipilih:
                    </Typography>
                    <Grid container spacing={2}>
                      {selectedStudents.map((studentId) => (
                        <Grid item xs={12} sm={6} key={studentId}>
                          <Typography variant="subtitle1">
                            {students.find((student) => student.id === studentId)?.name}
                          </Typography>
                          <ReactSketchCanvas
                            ref={siswaWhiteboards[studentId]}
                            style={{ border: "0.0625rem solid #9c9c9c", height: "30vh" }}
                            width="100%"
                            height="100%"
                            strokeColor={color}
                            strokeWidth={width}
                            onUpdate={(updatedPaths) => handleDraw(updatedPaths)}
                            {...getToolProps()}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Bagikan Papan Interaksi dengan Siswa</DialogTitle>
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
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button onClick={saveChange} variant="contained" color="primary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InteraksiStudent;
