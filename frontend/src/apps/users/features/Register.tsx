import React from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Card, Link, Container, Typography } from "@mui/material";
// layouts
import AuthLayout from "../../layouts/AuthLayout";
// components
import Page from "../../common/components/Page";
import MHidden from "../../common/components/@material-extend/MHidden";
import RegisterForm from "../components/RegisterForm";
import AuthSocial from "../components/AuthSocial";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export function Register() {
  return (
    <RootStyle title="Register | Oblogs">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/login"
        >
          Login
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Easily upload your files to any cloud provider
          </Typography>
          <img alt="register" src="/create.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Cloud-agnostic solution
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Supports AWS, Azure, S3 with simultaneous requests
            </Typography>
          </Box>

          {/* <AuthSocial /> */}

          <RegisterForm />

          {/* <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: 3 }}
          >
            By registering, I agree to Oblog's&nbsp;
            <Link underline="always" sx={{ color: "text.primary" }}>
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" sx={{ color: "text.primary" }}>
              Privacy Policy
            </Link>
            .
          </Typography> */}

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: "center" }}>
              Already have an account?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
