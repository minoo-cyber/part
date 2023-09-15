import { FC } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  ChangeEvent,
  SyntheticEvent,
  createRef,
  useEffect,
  useState,
} from "react";
import { formBox, wrapperInput } from "./otp.style";
import { useMutation } from "@tanstack/react-query";
import { getEmailOtpService } from "../../../../services/login.api";
import { useNavigate } from "react-router-dom";

interface IProps {
  email: string;
}

const Otp: FC<IProps> = (email) => {
  const navigate = useNavigate();
  const getEmailOtpQuery = useMutation(getEmailOtpService);
  const numberOfInputs = 5;
  const [inputRefsArray] = useState(() =>
    Array.from({ length: numberOfInputs }, () => createRef<HTMLInputElement>())
  );
  const [currentIndex, setCurrentIndex] = useState(numberOfInputs - 1);
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const [letters, setLetters] = useState(() =>
    Array.from({ length: numberOfInputs }, () => "")
  );
  const [lettersReverse, setLettersReverse] = useState(() =>
    Array.from({ length: numberOfInputs }, () => "")
  );
  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
    }
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    if (
      e.currentTarget.value === "" ||
      e.currentTarget.value.match(/^[0-9]{1}$/)
    ) {
      const { value } = e.target;
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex > 0 ? prevIndex - 1 : 0;
        const nextInput = inputRefsArray?.[nextIndex]?.current;
        nextInput?.focus();
        nextInput?.select();
        return nextIndex;
      });
      setLetters((letters) =>
        letters.map((letter, letterIndex) =>
          letterIndex === index ? value : letter
        )
      );
      setLettersReverse((letters: any) =>
        letters
          .reverse()
          .map((letter: any, letterIndex: any) =>
            letterIndex === index ? value : letter
          )
      );
    }
  };

  useEffect(() => {
    const lettersString = letters.reduce<string>(
      (prev, current) => `${current}${prev}`,
      ""
    );

    if (lettersString.length === 5) {
      setActiveButton(true);
    }
  }, [letters]);

  useEffect(() => {
    if (inputRefsArray?.[numberOfInputs - 1]?.current) {
      inputRefsArray?.[numberOfInputs - 1]?.current?.focus();
    }
  }, [inputRefsArray]);

  useEffect(() => {
    if (inputRefsArray?.[numberOfInputs - 1]?.current) {
      inputRefsArray?.[numberOfInputs - 1]?.current?.focus();
    }
    window.addEventListener("keyup", onKeyUp, false);
    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [inputRefsArray]);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    let otp = lettersReverse.reverse().toString().replace(/,/g, "");
    getEmailOtpQuery.mutate(otp, {
      onSuccess(data) {
        navigate("/userPanel");
      },
    });
    otp = lettersReverse.reverse().toString().replace(/,/g, "");
  };

  return (
    <Grid sx={formBox} component="form" onSubmit={handleSubmit}>
      <Typography variant="h5"> Sign In</Typography>
      <Typography>Please Enter Your Verify Code</Typography>
      <Box sx={wrapperInput}>
        {inputRefsArray.map((ref, index) => {
          return (
            <input
              ref={ref}
              type="text"
              key={index}
              id={`box${index}-1`}
              onChange={(e) => onChange(e, index)}
              onClick={() => {
                setCurrentIndex(index);
              }}
              value={letters[index]}
            />
          );
        })}
      </Box>
      <Button
        type="submit"
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main + "!important",
        }}
      >
        Sign In
      </Button>
    </Grid>
  );
};

export default Otp;
