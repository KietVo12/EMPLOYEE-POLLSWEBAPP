import { AppBar, Toolbar } from "@mui/material";
import NavMenu from "./nav_menu";
import UserMenu from "./user_menu";

export default function Header() {
  return (
    <AppBar data-testid="header-appbar" position="sticky" color="primary">
      <Toolbar variant="dense">
        <NavMenu />
       <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
