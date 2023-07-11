import { useState, useEffect } from "react";
import axios from "axios";

// added pagination functionality...
export default function App() {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageData, setPerPageData] = useState(25);

  let lastIndexOfPage = currentPage * perPageData;
  let firstIndexOfPage = lastIndexOfPage - perPageData;
  console.log("first and last index", firstIndexOfPage, lastIndexOfPage);

  let showData = apiData.slice(firstIndexOfPage, lastIndexOfPage);

  const totalPages = [
    ...Array(Math.ceil(apiData.length / perPageData) + 1).keys(),
  ].slice(1);
  console.log("total pages", totalPages);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setApiData(res.data));
  }, []);

  return (
    <div className="App">
      <>
        <select onChange={(e) => setPerPageData(e.target.value)}>
          <option value="25">25</option>
          <option value="20">20</option>
          <option value="10">10</option>
        </select>
      </>
      {showData.map((each) => {
        return (
          <p className="title-data" key={each.id}>
            {each.title}
          </p>
        );
      })}
      <div className="pages-list">
        <hr></hr>
        <button
          onClick={() =>
            currentPage !== 1 && setCurrentPage((prev) => prev - 1)
          }
        >
          Previous
        </button>
        <spam> |</spam>
        {totalPages.map((page) => {
          return (
            <>
              <span
                className={`${currentPage === page ? "active-page" : ""}`}
                onClick={() => setCurrentPage(page)}
                key={page}
              >{`  ${page} `}</span>
              <span>| </span>
            </>
          );
        })}
        <button
          onClick={() =>
            currentPage < totalPages.length &&
            setCurrentPage((prev) => prev + 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
