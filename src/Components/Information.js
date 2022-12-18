import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import Loader from "./Loader";
import { MdDateRange } from "react-icons/md";

const ImgURl =
  "https://templates.designwizard.com/c2c7e700-f416-11ea-99dd-b9647870a6ce.jpg";
const Information = () => {
  const [moviesdata, setMoviesdata] = useState("");
  const [Loading, setLoading] = useState(false);
  const { id } = useParams();
  const getMovieinformation = async () => {
    setLoading(true);
    const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=e643e104`);
    const data = await res.json();
    setMoviesdata(data);
    setLoading(false);
  };
  useEffect(() => {
    getMovieinformation();
  }, [id]);

  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center flex-col">
      {Loading ? <Loader /> : ""}
      <div className="card flex relative justify-center rounded-md items-center flex-col border-2 pb-4 bg-gray-200 ">
        <button
          onClick={handlenavigate}
          className="backbtn bg-black text-white border-2 cursor-pointer max-md:right-2 max-md:top-6 h-12  border-black   absolute top-2 right-4  border-none rounded-md w-14 "
        >
          Back
        </button>
        <img
          className="h-60 object-contain"
          src={moviesdata.Poster === "N/A" ? ImgURl : moviesdata.Poster}
          alt="poster"
        />

        <h3 className="text-lg font-bold">{moviesdata.Title}</h3>
        <p className="text-sm">
          {moviesdata.Plot
            ? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?"
            : moviesdata.Plot}
        </p>
        <h5 className="text-sm">
          Actors:{" "}
          {moviesdata.Actors ? "not available sorry" : moviesdata.Actors}
          /Directors: {moviesdata.Director}
        </h5>
        <div>
          <span className="absolute bottom-1 mt-2 right-2 flex items-center gap-1">
            {moviesdata.imdbRating}
            <AiFillStar className="text-green-500" />
          </span>
          <span className="absolute bottom-1 mt-2 left-2 flex items-center gap-1 text-sm">
            Released-on:{" "}
            {moviesdata.Released ? "2012/11/03" : moviesdata.Released}
            <MdDateRange />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Information;
