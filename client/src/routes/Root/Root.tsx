import { Link, NavLink, Outlet } from "react-router-dom"
import AccountCircle from "@mui/icons-material/AccountCircle"
import "./styles.css"
import { UserProvider, useUserContext } from "./context"
import {
  AppBar,
  Button,
  Container,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"
import { useState } from "react"

export const Root = () => {
  return (
    <UserProvider>
      <MainHeader />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </UserProvider>
  )
}

const MainHeader = () => {
  const { username } = useUserContext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Stack direction="row" spacing={2}>
          <Button variant="text" color="inherit" component={NavLink} to="/">
            Home
          </Button>
          <Button
            variant="text"
            color="inherit"
            component={NavLink}
            to="/games"
          >
            Games
          </Button>
        </Stack>
        <div style={{ marginLeft: "auto" }}>
          <Button
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
            <Typography variant="h6">{username}</Typography>
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/profile">
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/logout">
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}
