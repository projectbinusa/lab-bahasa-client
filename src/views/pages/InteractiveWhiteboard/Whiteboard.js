// Mengganti icon di dalam button dengan link
import React, { useState, useRef, useEffect } from "react";
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
  Checkbox,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Brush,
  Delete,
  Undo,
  Redo,
  AddCircleOutline,
  Share,
} from "@mui/icons-material";
import Navbar from "../../../component/Navbar1";

const users = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" },
];

const green500 = "#4caf50";
const Whiteboard = () => {
  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(5);
  const [tool, setTool] = useState("brush");
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedBoards, setSelectedBoards] = useState([]);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [modalSize, setModalSize] = useState({ width: "20%", height: "50%" });
  const [isResponsive, setIsResponsive] = useState(false);
  const [modalsSize, setModalsSize] = useState({
    width: "100%",
    height: "65%",
  });

  const canvasRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isResponsive) {
      setModalSize({ width: "90%", height: "60%" });
    } else {
      setModalSize({ width: "20%", height: "50%" });
    }
  }, [isResponsive]);

  const handleShare = () => {
    setOpenShareDialog(true);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allUserIds = users.map((user) => user.id);
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleCheckboxChange = (boardId) => {
    const isSelected = selectedBoards.some((board) => board.id === boardId);
    if (isSelected) {
      setSelectedBoards(selectedBoards.filter((board) => board.id !== boardId));
    } else {
      const boardToAdd = history.find((board) => board.id === boardId);
      setSelectedBoards([...selectedBoards, boardToAdd]);
    }
  };

  const handleUserToggle = (userId) => {
    const isSelected = selectedUsers.includes(userId);
    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleCloseShareDialog = () => {
    setOpenShareDialog(false);
  };

  const handleShareImages = () => {
    const selectedImages = history.filter((board) =>
      selectedBoards.some((selected) => selected.id === board.id)
    );

    const imagesToShare = selectedImages.map((board) => board.image);

    const imageLinks = imagesToShare.map((image) => {
      const imageLink = document.createElement("a");
      imageLink.href = image;
      imageLink.target = "_blank";
      imageLink.rel = "noopener noreferrer";
      imageLink.textContent = image;
      return imageLink;
    });

    selectedUsers.forEach((userId) => {
      const user = users.find((user) => user.id === userId);
      if (user) {
        console.log(`Mengirim link gambar kepada ${user.name}:`);
        imageLinks.forEach((link) => {
          console.log(link.href);
        });
      }
    });

    setOpenShareDialog(false);
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

  // Fungsi untuk menambah papan tulis baru
  const handleNewBoard = async () => {
    const paths = await canvasRef.current.exportPaths();
    if (paths.length > 0) {
      const image = await canvasRef.current.exportImage("png");
      const newBoard = { paths: paths, image: image };
      setHistory([...history, newBoard]);
      handleClearBoard();
    } else {
      alert(
        "Papan tulis kosong. Tambahkan sesuatu sebelum membuat papan tulis baru."
      );
    }
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
      setHistory(history.filter((item) => item.id !== board.id));
      setSelectedBoard(null);
    }
  };

  const handleDeleteBoard = (index) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus papan tulis ${index + 1}?`
    );
    if (isConfirmed) {
      setHistory(history.filter((board, idx) => idx !== index));
      setSelectedBoard(null);
    }
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
              height="76vh"
              tool={getToolProps().tool}
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
                    color={tool === "brush" ? "primary" : "default"}
                    onClick={() => setTool("brush")}
                  >
                    <Brush />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Penghapus">
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
                <Tooltip title="Batalkan">
                  <IconButton onClick={handleUndo}>
                    <Undo />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Ulangi">
                  <IconButton onClick={handleRedo}>
                    <Redo />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Bersihkan Papan Tulis">
                  <IconButton onClick={handleClearBoard}>
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Papan Tulis Baru">
                  <IconButton onClick={handleNewBoard}>
                    <AddCircleOutline />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Bagikan">
                  <span>
                    <IconButton
                      onClick={handleShare}
                      disabled={selectedBoards.length === 0}
                    >
                      <Share />
                    </IconButton>
                  </span>
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
                        flexBasis: "calc(50% - 8px)",
                        margin: "4px",
                      },
                    }}
                  >
                    {history.map((board, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: "relative",
                          borderRadius: "10px",
                          border: "1px solid #ccc",
                          overflow: "hidden",
                          width: "calc(50% - 8px)",
                          margin: "4px",
                        }}
                      >
                        <img
                          src={board.image}
                          alt={`Board ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          onClick={() => handleClickOpen(board)}
                        />
                        <Checkbox
                          checked={selectedBoards.some(
                            (selected) => selected.id === board.id
                          )}
                          onChange={() => handleCheckboxChange(board.id)}
                          color="default"
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 1,
                            color: green500,
                            "&.Mui-checked": {
                              color: "green500",
                            },
                          }}
                        />
                        <IconButton
                          onClick={() => handleDeleteBoard(index)}
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            zIndex: 1,
                            color: green500,
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={openShareDialog}
        onClose={handleCloseShareDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            width: modalSize.width,
            height: modalSize.height,
          },
        }}
      >
        <DialogTitle>Bagikan Papan</DialogTitle>
        <DialogContent>
          <Box>
            <ListItem>
              <Checkbox
                checked={selectedUsers.length === users.length}
                onChange={handleSelectAll}
              />
              <ListItemText primary="Pilih Semua" />
            </ListItem>
            {users.map((user) => (
              <ListItem key={user.id}>
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleUserToggle(user.id)}
                />
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShareDialog}>Batal</Button>
          <Button
            onClick={handleShareImages}
            color="primary"
            disabled={selectedUsers.length === 0}
          >
            Bagikan
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            width: modalsSize.width,
            height: modalsSize.height,
          },
        }}
      >
        <DialogTitle>
          Papan Tulis {history.indexOf(selectedBoard) + 1} Tersimpan
        </DialogTitle>
        <DialogContent>
          {selectedBoard && (
            <Box>
              <img
                src={selectedBoard.image}
                alt={`Papan ${selectedBoard.id}`}
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => handleLoadBoard(selectedBoard)}
          >
            Muat ke Papan Tulis
          </Button>
          <Button onClick={handleClose}>Tutup</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Whiteboard;
