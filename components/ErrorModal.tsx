import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { clearState } from "../redux/reducers/user";

const AlertDail = ({ message }: { message: string }) => {
  const [isOpen, setisOpen] = React.useState<boolean>(false);
  // React.useEffect(() => {
  //   setisOpen(false);
  //   return () => {
  //     setisOpen(false);
  //   };
  // }, []);
  const dispatch = useDispatch();
  return ReactDOM.createPortal(
    <Alert
      bg={"red.300"}
      status="error"
      // display={isOpen ? "none" : "inline"}
      position={"absolute"}
      top={0}
    >
      <AlertIcon />
      <AlertTitle mr={2}>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <CloseButton
        onClick={() => {
          dispatch(clearState());
        }}
        position="absolute"
        right="8px"
        top="8px"
      />
    </Alert>,
    document.body
  );
};

export default AlertDail;
