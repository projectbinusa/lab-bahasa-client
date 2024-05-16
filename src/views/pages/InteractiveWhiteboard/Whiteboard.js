import React, { useState, useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { Button, IconButton, Tooltip, Stack, Box, Divider, Typography, TextField, List, ListItem } from '@mui/material';
import { Circle, FormatShapes, Brush, Send, Delete, FormatClear, Undo, Redo } from '@mui/icons-material';

const Whiteboard = () => {
    const [color, setColor] = useState('#000000');
    const [width, setWidth] = useState(5);
    const [tool, setTool] = useState('brush');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);

    const canvasRef = useRef();

    const handleShare = () => {
        console.log("Sharing the board");
    };

    const handleSendMessage = () => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
        setMessage('');
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
        const canvasData = await canvasRef.current.exportImage('png');
        setHistory([...history, canvasData]);
        handleClearBoard();
    };

    // Handle tool selection based on state
    const getToolProps = () => {
        switch (tool) {
            case 'brush':
                return { tool: 'pencil' };
            case 'shape':
                return { tool: 'rectangle' };
            case 'circle':
                return { tool: 'circle' };
            case 'eraser':
                return { tool: 'eraser' };
            default:
                return { tool: 'pencil' };
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Typography variant="h4" gutterBottom sx={{ p: 2 }}>Interactive Whiteboard</Typography>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2 }}>
                <Button variant="outlined" onClick={handleShare}>Share</Button>
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
                        <FormatClear />
                    </IconButton>
                </Tooltip>
                <Tooltip title="New">
                    <IconButton onClick={handleNewBoard}>
                        <Delete />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Brush">
                    <IconButton onClick={() => setTool('brush')}>
                        <Brush />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Shapes">
                    <IconButton onClick={() => setTool('shape')}>
                        <FormatShapes />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Circle">
                    <IconButton onClick={() => setTool('circle')}>
                        <Circle />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Eraser">
                    <IconButton onClick={() => setTool('eraser')}>
                        <Delete />
                    </IconButton>
                </Tooltip>
                <input type="color" value={color} onChange={e => setColor(e.target.value)} />
                <TextField size="small" type="number" value={width} onChange={e => setWidth(e.target.value)} />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <ReactSketchCanvas
                ref={canvasRef}
                style={{ width: '90%', height: '500px', border: '2px solid black', margin: '0 auto' }}
                {...getToolProps()}
                strokeWidth={width}
                strokeColor={tool === 'eraser' ? '#ffffff' : color}
                allowOnlyPointerType="all"
            />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Chat</Typography>
                <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {messages.map((msg, index) => (
                        <ListItem key={index}>{msg}</ListItem>
                    ))}
                </List>
                <Stack direction="row" spacing={1} alignItems="center">
                    <TextField fullWidth size="small" value={message} onChange={e => setMessage(e.target.value)} />
                    <IconButton onClick={handleSendMessage}>
                        <Send />
                    </IconButton>
                </Stack>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">History</Typography>
                <Stack direction="row" spacing={2} sx={{ overflowX: 'auto' }}>
                    {history.map((image, index) => (
                        <Box key={index} sx={{ minWidth: 100 }}>
                            <img src={image} alt={`Canvas ${index}`} width="100%" />
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};

export default Whiteboard;
