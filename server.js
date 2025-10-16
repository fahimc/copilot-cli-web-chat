import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// WARNING: This endpoint executes arbitrary CLI commands for demonstration purposes.
// In production, you should:
// - Implement authentication and authorization
// - Add rate limiting
// - Whitelist allowed commands
// - Sanitize and validate all inputs
// - Run commands in a sandboxed environment
app.post('/api/execute', (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: 'Command is required' });
  }

  // Parse the command to extract the CLI command and arguments
  const commandParts = command.trim().split(' ');
  const cliCommand = commandParts[0];
  const args = commandParts.slice(1);

  let output = '';
  let errorOutput = '';

  // Execute the command
  const childProcess = spawn(cliCommand, args, {
    shell: true,
    cwd: process.cwd()
  });

  childProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  childProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  childProcess.on('close', (code) => {
    if (code !== 0) {
      return res.json({
        success: false,
        output: errorOutput || `Command exited with code ${code}`,
        error: true
      });
    }

    res.json({
      success: true,
      output: output || 'Command executed successfully (no output)'
    });
  });

  childProcess.on('error', (error) => {
    res.json({
      success: false,
      output: `Error executing command: ${error.message}`,
      error: true
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
