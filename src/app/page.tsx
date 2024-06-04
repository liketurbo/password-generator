"use client";
import { useState, ChangeEvent, useEffect } from "react";
import {
  Container,
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Tooltip,
  Snackbar,
  Alert,
  RadioGroup,
  Radio,
  LinearProgress,
  Link,
  GlobalStyles,
  useTheme,
  lighten,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  calculateComplexity,
  generatePassword,
} from "@/utils/passwordGenerator";
import { PasswordOptions, Preset } from "@/types";

export default function Home() {
  const theme = useTheme();

  const [length, setLength] = useState<number>(12);
  const [options, setOptions] = useState<PasswordOptions>({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [preset, setPreset] = useState<Preset>("allCharacters");
  const [complexity, setComplexity] = useState<number>(0);

  useEffect(() => {
    const newPassword = generatePassword(length, options, preset);
    setPassword(newPassword);
    setComplexity(calculateComplexity(newPassword));
  }, [length, options, preset]);

  useEffect(() => {
    handlePreset(preset);
  }, [preset]);

  function handleChangeLength(event: Event, newValue: number | number[]): void {
    setLength(newValue as number);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setLength(value);
    }
  }

  function handleChangeOption(event: ChangeEvent<HTMLInputElement>): void {
    const { name, checked } = event.target;

    const newOptions = {
      ...options,
      [name]: checked,
    };

    if (
      !newOptions.lowercase &&
      !newOptions.uppercase &&
      !newOptions.numbers &&
      !newOptions.symbols
    ) {
      return;
    }

    setOptions(newOptions);
  }

  function handleCopyToClipboard(): void {
    navigator.clipboard.writeText(password).then(() => {
      setSnackbarOpen(true);
    });
  }

  function handleCloseSnackbar(
    _?: Event | React.SyntheticEvent,
    reason?: string
  ) {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  }

  function handleRefreshPassword(): void {
    const newPassword = generatePassword(length, options, preset);
    setPassword(newPassword);
  }

  function handlePreset(preset: Preset): void {
    switch (preset) {
      case "easyToSay":
        setOptions({
          lowercase: true,
          uppercase: true,
          numbers: false,
          symbols: false,
        });
        break;
      case "easyToRead":
        setOptions({
          lowercase: true,
          uppercase: true,
          numbers: true,
          symbols: true,
        });
        break;
      case "allCharacters":
        setOptions({
          lowercase: true,
          uppercase: true,
          numbers: true,
          symbols: true,
        });
        break;
      default:
        break;
    }
  }

  function getProgressColor(complexity: number) {
    if (complexity < 40) {
      return theme.palette.error.main;
    } else if (complexity < 70) {
      return theme.palette.warning.main;
    } else {
      return theme.palette.success.main;
    }
  }

  function getStrengthText(complexity: number): string {
    if (complexity < 40) {
      return "Weak";
    } else if (complexity < 70) {
      return "Medium";
    } else {
      return "Strong";
    }
  }

  function getStrengthColor(complexity: number): string {
    if (complexity < 40) {
      return theme.palette.error.main;
    } else if (complexity < 70) {
      return theme.palette.warning.main;
    } else {
      return theme.palette.success.main;
    }
  }

  return (
    <Container maxWidth="sm">
      <GlobalStyles
        styles={{
          body: { backgroundColor: lighten(theme.palette.primary.light, 0.8) },
        }}
      />
      <Box my={4}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
          Password Generator
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          A plain password generator without ads or cookies, unlike LastPass.
        </Typography>
      </Box>
      <Box
        my={4}
        sx={{
          backgroundColor: theme.palette.common.white,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <TextField
          fullWidth
          label="Generated Password"
          value={password}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Copy">
                  <IconButton
                    aria-label="copy to clipboard"
                    onClick={handleCopyToClipboard}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Generate">
                  <IconButton
                    aria-label="generate new password"
                    onClick={handleRefreshPassword}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.grey[400],
              },
              "&:hover fieldset": {
                borderColor: theme.palette.grey[400],
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.grey[400],
                borderWidth: 1,
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: theme.palette.grey[600],
              },
            },
          }}
        />
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            marginTop: 1,
            color: getStrengthColor(complexity),
          }}
        >
          {getStrengthText(complexity)}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={complexity}
          sx={{
            marginTop: 2,
            height: 10,
            borderRadius: 5,
            backgroundColor: theme.palette.grey[300],
            "& .MuiLinearProgress-bar": {
              backgroundColor: getProgressColor(complexity),
            },
          }}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.common.white,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Customize your password
        </Typography>
        <Grid
          container
          justifyContent="space-between"
          spacing={2}
          flexWrap="nowrap"
        >
          <Grid
            container
            alignItems="center"
            columnSpacing={2}
            item
            xs={6}
            flexBasis={100}
          >
            <Grid item>
              <TextField
                type="number"
                value={length}
                onChange={handleInputChange}
                inputProps={{ min: 1, max: 50 }}
                label="Length"
                variant="outlined"
                margin="normal"
                style={{ width: "80px" }}
              />
            </Grid>
            <Grid item>
              <Slider
                value={length}
                onChange={handleChangeLength}
                aria-labelledby="password-length-slider"
                valueLabelDisplay="auto"
                step={1}
                min={1}
                max={50}
                style={{ width: "200px" }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <RadioGroup
              row
              aria-label="presets"
              name="presets"
              value={preset}
              onChange={(event) => setPreset(event.target.value as Preset)}
            >
              <Box display="flex" alignItems="center">
                <FormControlLabel
                  value="easyToSay"
                  control={<Radio />}
                  label="Easy to Say"
                />
                <Tooltip title="Avoids numbers and special characters">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box display="flex" alignItems="center">
                <FormControlLabel
                  value="easyToRead"
                  control={<Radio />}
                  label="Easy to Read"
                />
                <Tooltip title="Avoids ambiguous characters like l, 1, O, and 0">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box display="flex" alignItems="center">
                <FormControlLabel
                  value="allCharacters"
                  control={<Radio />}
                  label="All Characters"
                />
                <Tooltip title="Any character combinations like !, 7, h, K, and l1">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </RadioGroup>
          </Grid>
          <Grid item>
            <Box display="flex" flexDirection="column">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.lowercase}
                    onChange={handleChangeOption}
                    name="lowercase"
                  />
                }
                label="Lowercase"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.uppercase}
                    onChange={handleChangeOption}
                    name="uppercase"
                  />
                }
                label="Uppercase"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.numbers}
                    onChange={handleChangeOption}
                    name="numbers"
                    disabled={preset === "easyToSay"}
                  />
                }
                label="Numbers"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.symbols}
                    onChange={handleChangeOption}
                    name="symbols"
                    disabled={preset === "easyToSay"}
                  />
                }
                label="Symbols"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="body2">
          Enjoying this tool? ⭐ Star it on{" "}
          <GitHubIcon
            fontSize="small"
            sx={{ mr: 0.5, verticalAlign: "text-bottom" }}
          />
          <Link
            href="https://github.com/liketurbo/password-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          !
        </Typography>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copied
        </Alert>
      </Snackbar>
    </Container>
  );
}
