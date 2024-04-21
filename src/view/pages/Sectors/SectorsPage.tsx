import React, { FC } from "react";
import { Sector } from "../../models/Types";
import { Fade } from "react-awesome-reveal";
import SectorCard from "./SectorCard/SectorCard";
import "./SectorsPage.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCard } from "../../../redux/slices/GlobalStates";
import { sectors } from "../../../data/sectors";
import HomePage from "../../components/Common/HomePage/HomePage";

const SectorsPage: FC = () => {

  return (
    <>
      <HomePage objects={sectors} page="Sector" Component={SectorCard} />
    </>
  );
};

export default SectorsPage;
