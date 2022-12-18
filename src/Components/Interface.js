import React, { useEffect } from "react";
import { useState } from "react";
import Loader from "./Loader";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink } from "react-router-dom";
const imgUrl =
  "https://templates.designwizard.com/c2c7e700-f416-11ea-99dd-b9647870a6ce.jpg";

const Interface = () => {
  const [moviesdata, setMoviesdata] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    const fetchMovies = async () => {
        setLoading(true)
      const res = await fetch(
        `https://www.omdbapi.com/?s=batman&apikey=e643e104`
      );
      const data = await res.json();
      setMoviesdata(data.Search);
      setLoading(false)
    };
    fetchMovies();
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    const SearchedMovies = async () => {
        setLoading(true)
      const res = await fetch(
        `https://www.omdbapi.com/?s=${search}&apikey=e643e104`
      );
      const data = await res.json();
      setMoviesdata(data.Search);
      setLoading(false)
    };
    SearchedMovies();
    setSearch("");
   
  };

  return (
    <div>
      <div className="flex text-white h-16 pl-10 pr-10 sticky top-0 z-10 bg-black items-center justify-between">
        <h2  className="font-bold text-lg">GetMovie</h2>
        <form
          className="flex relative items-center justify-center "
          onSubmit={handleSubmit}
        >
          <input
            className="search-tag border-none h-8 outline-none text-black pl-2 max-sm:w-  rounded-sm"
            type="text"
            placeholder="search...."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AiOutlineSearch
            className=" cursor-pointer text-black absolute right-2"
            onClick={handleSubmit}
          />
        </form>
      </div>
      {loading ? <Loader /> : ""}
      <div className="grid grid-cols-3  pl-8 pr-8 pt-6 gap-4 grid-rows-3 max-md:grid-cols-2 max-md:grid-rows-5 max-sm:grid-cols-1 max-sm:grid-rows-10">
        {moviesdata ? moviesdata.map((movie) => {
            const { imdbID ,Poster,Title,Year} = movie;
            return (
              <NavLink to={`value/${imdbID?movie.imdbID:imdbID}`} key={imdbID} className="border-2 bg-slate-300 relative flex items-center justify-center flex-col">
                <div>
                  <img
                    className="pb-10 p-2 mb-3"
                    src={Poster === "N/A" ? imgUrl :Poster}
                    alt="Doesn't contain poster"
                  />
                  <div className=" flex items-center justify-center">
                  <h3 className="absolute bottom-4 font-semibold">
                    {Title}
                  </h3>
                  <p className="absolute bottom-0 right-4">{Year}</p>
                  </div>
                  </div>
              </NavLink>
            );
          })
         : (
          <p className="flex items-center text-red-600 font-bold text-2xl justify-center">
            Sorry movie not Found '"'
          </p>
        )}
      </div>
    </div>
  );
};

export default Interface;
