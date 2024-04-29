import React, { FC } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCard, setPage } from "../../../../redux/slices/GlobalStates";
// import { Sector } from "../../../../redux/models/Interfaces";
import "./HomePage.scss";
interface InputProps {
    inputPlaceHolder: string;
    input: string;
    setInput: (input: string) => void;
}
const Input: FC<InputProps> = ({ input, setInput, inputPlaceHolder }) => {
    return (
        <div className="input-container">

        </div>
    );
};

export default Input;
