import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import MenuBar from '../components/MenuBar';
import { styled } from '@mui/material/styles';
import '../Style/auth.css'; 

const Background = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  width: '100vw', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: theme.spacing(4),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: 'none',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius * 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  maxWidth: 400,
  width: '100%',
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const CardActionsStyled = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const HomePage: React.FC = () => {
  return (
    <Background>
      <MenuBar />
      <StyledContainer maxWidth={false}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
        >
          Chào mừng đến với trang web Employee-polls!
        </Typography>

        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Hướng Dẫn */}
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContentStyled>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Hướng dẫn sử dụng
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Hướng dẫn chi tiết để bạn bắt đầu sử dụng.
                </Typography>
              </CardContentStyled>
              <CardActionsStyled>
                <Button size="medium" variant="contained" color="primary" fullWidth>
                  Xem thêm
                </Button>
              </CardActionsStyled>
            </StyledCard>
          </Grid>

          {/* Câu hỏi mới */}
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContentStyled>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Câu hỏi mới
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Xem các câu hỏi mới nhất từ người dùng khác.
                </Typography>
              </CardContentStyled>
              <CardActionsStyled>
                <Button size="medium" variant="contained" color="primary" fullWidth>
                  Xem câu hỏi
                </Button>
              </CardActionsStyled>
            </StyledCard>
          </Grid>

          {/* Quản lý câu hỏi */}
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContentStyled>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Quản lý câu hỏi
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Chỉnh sửa và cập nhật câu hỏi của bạn.
                </Typography>
              </CardContentStyled>
              <CardActionsStyled>
                <Button size="medium" variant="contained" color="primary" fullWidth>
                  Quản lý ngay
                </Button>
              </CardActionsStyled>
            </StyledCard>
          </Grid>
        </Grid>
      </StyledContainer>
    </Background>
  );
};

export default HomePage;
