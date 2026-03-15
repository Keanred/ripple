import { Input, Paper } from "@mui/material";
import { Box } from "@mui/system";

export const Chat: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="background.default">
      <Box bgcolor="background.paper" p={4} borderRadius={4} boxShadow={3} maxWidth={800} width="100%">
        <h1>Chat Component</h1>
        <Paper variant="outlined" sx={{ height: 800, overflowY: 'auto', mb: 2 }}>
          {/* Chat messages will go here */}
        </Paper>
        <Input placeholder="Type your message..." fullWidth />
      </Box>
    </Box>
  );
}
