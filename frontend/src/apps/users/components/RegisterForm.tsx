import React, { useState } from "react";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";

// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import useGlobalStore from "../stores/Global";
import { SignupData } from "../models/user";
import { validate } from "../../common/utils/general/validation";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  // load CSS, snackbar and translation
  const navigate = useNavigate();

  // Get the required store functions
  // eslint-disable-next-line no-empty-pattern
  const [{}, { register }] = useGlobalStore();

  // Fields and their errors states
  const initialFormData: SignupData = {
    name: "",
    email: "",
    password1: "",
    password2: "",
  };
  const [formData, setFormData] = useState<SignupData>(initialFormData);
  const [formDataErrors, setFormDataErrors] =
    useState<SignupData>(initialFormData);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Handling field input changes
  const handleInputChange = (
    inputId: string,
    value: string,
    password?: string
  ) => {
    if (!validate(inputId, value, password)) {
      setFormDataErrors({
        ...formDataErrors,
        [inputId]:
          inputId !== "password1"
            ? `Not a valid ${inputId}`
            : `Not a valid password`,
      });
    } else {
      setFormDataErrors({
        ...formDataErrors,
        [inputId]: "",
      });
    }
    setFormData({
      ...formData,
      [inputId]: value,
    });
  };

  // Handle the case of password 2 separately
  const handleConfirmPassword = (password: string) => {
    if (password !== formData.password1) {
      setFormDataErrors({
        ...formDataErrors,
        password2: `The Confirm Password does not match with Password`,
      });
    } else {
      setFormDataErrors({
        ...formDataErrors,
        password2: "",
      });
    }
    setFormData({
      ...formData,
      password2: password,
    });
  };

  // Handle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  // Loading indicator
  const [loading, setLoading] = useState<boolean>(false);

  const canSave =
    validate("email", formData.email) &&
    validate("name", formData.name) &&
    validate("password", formData.password1) &&
    validate("password2", formData.password2, formData.password1) &&
    !loading;

  const onRegisterClicked = async () => {
    if (canSave) {
      setLoading(true);
      let status = await register(formData);
      if (status) {
        navigate("/login");
      }
      setLoading(false);
    }
  };

  return (
    <Box component="form">
      <Stack spacing={3}>
        <TextField
          id="email"
          name="email"
          value={formData.email}
          error={formDataErrors.email !== ""}
          onChange={(e) => handleInputChange("email", e.target.value)}
          label="Email"
          variant="outlined"
          helperText={formDataErrors.email}
        />
        <TextField
          id="name"
          name="name"
          value={formData.name}
          error={formDataErrors.name !== ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
          label="Name"
          variant="outlined"
          helperText={formDataErrors.name}
        />
        <TextField
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password1}
          label="Password"
          onChange={(e) => handleInputChange("password1", e.target.value)}
          error={formDataErrors.password1 !== ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={formDataErrors.password1}
          variant="outlined"
        />
        <TextField
          id="password2"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password2}
          label="Confirm Password"
          onChange={(e) => handleConfirmPassword(e.target.value)}
          error={formDataErrors.password2 !== ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={formDataErrors.password2}
          variant="outlined"
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
          onClick={onRegisterClicked}
          disabled={!canSave}
        >
          Register
        </LoadingButton>
      </Stack>
    </Box>
  );
}
