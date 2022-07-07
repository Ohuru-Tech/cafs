import React, { useEffect, useState } from "react";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";

// Material UI
import {
  InputAdornment,
  IconButton,
  Link,
  TextField,
  Typography,
  Stack,
  Box,
} from "@mui/material";

// Icons
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { LoadingButton } from "@mui/lab";

// Custom imports
import { successToastConfig } from "../../common/utils/general/configs";
import { validate } from "../../common/utils/general/validation";
import { UserCredentials } from "../models/user";
import useGlobalStore from "../stores/Global";

function Copyright() {
  return (
    <Typography sx={{ mt: 8 }} variant="subtitle2" align="center">
      {"Copyright © "}
      <Link href="https://ohuru.tech/" underline="none" variant="subtitle2">
        Ohuru
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export function LoginForm() {
  // Load CSSranslation, snackbar
  const navigate = useNavigate();
  let [params] = useSearchParams();

  // Get the required store functions
  const [{ loggedIn, userInfo }, { login }] = useGlobalStore();

  // Fields and their errors states
  const initialFormState: UserCredentials = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState<UserCredentials>(initialFormState);
  const [formDataErrors, setFormDataErrors] =
    useState<UserCredentials>(initialFormState);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Handling field input changes
  const handleInputChange = (inputId: string, value: string) => {
    if (!validate(inputId, value)) {
      setFormDataErrors({
        ...formDataErrors,
        [inputId]: `Not a valid ${inputId}`,
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

  // Set password visibility
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

  // const history = useHistory();

  const canSave =
    validate("email", formData.email) &&
    validate("password", formData.password) &&
    !loading;

  // Handle redirect on logged in
  useEffect(() => {
    if (loggedIn) {
      toast.success(
        `Succesfully logged in as ${userInfo?.user?.name}`,
        successToastConfig
      );
      if (params.get("from")) {
        navigate(params.get("from") as string);
      }
      navigate("/");
    }
  }, [loggedIn]);

  // Handle form submit
  const onLoginClicked = async () => {
    if (canSave) {
      try {
        setLoading(true);
        await login(formData);
      } finally {
        setLoading(false);
      }
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
          required
          helperText={formDataErrors.email}
        />
        <TextField
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          label="Password"
          onChange={(e) => handleInputChange("password", e.target.value)}
          error={formDataErrors.password !== ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={formDataErrors.password}
          variant="outlined"
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Link
          component={RouterLink}
          underline="none"
          variant="subtitle2"
          to="#"
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={onLoginClicked}
        loading={loading}
      >
        Login
      </LoadingButton>
      <Copyright />
    </Box>
  );
}
