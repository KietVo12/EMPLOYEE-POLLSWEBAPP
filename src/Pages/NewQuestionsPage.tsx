import React, { useEffect, useState } from 'react';
import {Container,Typography,Box,List,ListItem,ListItemText,Paper,Divider,} from '@mui/material';
import { questions, Question } from '../data/mockData';
import '../Style/auth.css'; 
const NewQuestionsPage: React.FC = () => {
  const [latestQuestions, setLatestQuestions] = useState<Question[]>([]);

  useEffect(() => {

    const fetchLatestQuestions = () => {
      const sortedQuestions = [...questions].sort((a, b) => b.id - a.id);
      setLatestQuestions(sortedQuestions);
    };

    fetchLatestQuestions();
  }, []);

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Câu Hỏi Mới
        </Typography>
        <Paper elevation={3}>
          <List>
            {latestQuestions.map((question) => (
              <React.Fragment key={question.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={question.title}
                    secondary={question.content}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default NewQuestionsPage;
