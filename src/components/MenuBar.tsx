import React, { useState } from 'react';
import {AppBar,Toolbar,Typography,IconButton,Box,MenuItem,Menu,Button,} from '@mui/material';
import {AccountCircle,Menu as MenuIcon,ArrowDropDown,} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import '../Style/auth.css'; 
const MenuBar: React.FC = () => {
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const theme = useTheme();

  const handleClose = () => {
    setDropdownAnchorEl(null);
    setUserMenuAnchorEl(null);
  };

  const handleDropdownMenu = (event: React.MouseEvent<HTMLElement>) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.primary.main,
        boxShadow: theme.shadows[3],
      }}
    >
      <Toolbar>
        {/* Logo và Tên Ứng Dụng */}
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            EmployeePolls
          </Typography>
        </Box>

        {/* Menu Dropdown cho Các Chức Năng Chính */}
        <Button
          color="inherit"
          onClick={handleDropdownMenu}
          endIcon={<ArrowDropDown />}
          sx={{ marginRight: 2 }}
        >
          Chức Năng
        </Button>
        <Menu
          anchorEl={dropdownAnchorEl}
          keepMounted
          open={Boolean(dropdownAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={RouterLink} to="/guides">
            Hướng dẫn sử dụng
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to="/new-questions"
          >
            Câu hỏi mới
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to="/category-list"
          >
            Danh sách danh mục
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to="/manage-questions"
          >
            Quản lý câu hỏi
          </MenuItem>
        </Menu>

        {/* Biểu Tượng Tài Khoản Người Dùng */}
        <IconButton
          size="large"
          edge="end"
          aria-label="account"
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={(e) => setUserMenuAnchorEl(e.currentTarget)}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={userMenuAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(userMenuAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={RouterLink} to="/login">
            Login
          </MenuItem>
          <MenuItem onClick={handleClose} component={RouterLink} to="/register">
            Register
          </MenuItem>
          <MenuItem onClick={handleClose} component={RouterLink} to="/register">
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
