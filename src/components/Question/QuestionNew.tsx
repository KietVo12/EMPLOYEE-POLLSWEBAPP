import {Button,Stack,TextField,Typography,} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { homeProps } from "../../config/sections";
import { QuestionData } from "../../config/types";
import { questionsActions } from "../../redux/questions";
import { getSession } from "../../redux/session";
import { useAppDispatch, useAppSelector as select } from "../../redux/store";
import QuestionFrame from "./QuestionFrame";
  
const QuestionNew = () => {
	const [error, setError] = useState<string | null>(null); // State để hiển thị lỗi
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const session = select(getSession());
  
	// Sử dụng useRef để lưu giá trị của các TextField
	const optionOne = useRef<HTMLInputElement>(null);
	const optionTwo = useRef<HTMLInputElement>(null);
  
	const handleOnClick = () => {
	  const o1 = optionOne.current?.value?.trim() || "";
	  const o2 = optionTwo.current?.value?.trim() || "";
  
	  if (o1 && o2) {
		const questionData: QuestionData = {
		  author: session.userDetails?.id ?? "",
		  optionOneText: o1,
		  optionTwoText: o2,
		};
		dispatch(questionsActions.saveQuestion(questionData));
		navigate(homeProps.path);
	  } else {
		setError("Please fill out both options.");
		setTimeout(() => setError(null), 3000);
	  }
	};
  
	useEffect(() => {
	  const handleOnEsc = (event: KeyboardEvent) => {
		if (event.key === "Escape") navigate(homeProps.path);
	  };
	  document.addEventListener("keyup", handleOnEsc);
	  return () => document.removeEventListener("keyup", handleOnEsc);
	}, [navigate]);
  
	if (!session?.userDetails) {
	  return <Typography variant="h6">Loading...</Typography>;
	}
  
	const { name, avatarURL } = session.userDetails;
  
	return (
	  <QuestionFrame name={name} avatarURL={avatarURL}>
		<Stack spacing={2} sx={{ mt: 3 }}>
		  <TextField
			inputRef={optionOne}
			label="Option One"
			variant="outlined"
			fullWidth
			required
		  />
		  <TextField
			inputRef={optionTwo}
			label="Option Two"
			variant="outlined"
			fullWidth
			required
		  />
		</Stack>
		<Button
		  onClick={handleOnClick}
		  variant="contained"
		  sx={{
			mt: 3,
			backgroundColor: "primary.main",
			fontWeight: "bold",
			":hover": {
			  backgroundColor: "primary.dark",
			},
		  }}
		>
		  Submit
		</Button>
	  </QuestionFrame>
	);
  };
  
  export default QuestionNew;
  