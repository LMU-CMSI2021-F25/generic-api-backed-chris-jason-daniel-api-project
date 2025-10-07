import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function setColumns(dropdown) {
  if (dropdown == "starships") {
    columnTwo = "Manufacturer";
    columnThree = "Model";
  } else if (dropdown == "people") {
    columnTwo = "Height(cm)";
    columnThree = "Birth Year";
  } else if (dropdown == "planets") {
    columnTwo = "Terrain";
    columnThree = "Population";
  }
}

export default function App() {
  const [results, setResults] = useState([]);
  const [dropdown, setDropdown] = useState("");
  const [pagedropdown, setPageDropdown] = useState("");
  const [credentials, credentialsVerify] = useState(false);
  const columnOne = "";
  const columnTwo = "";
  const columnThree = "";

  const url = "https://swapi.dev/api/";
  useEffect(() => {
    fetch(url + dropdown + pagedropdown)
      .then((r) => r.json())
      .then((response) => {
        setResults(response.results);
      });
  });

  return (
    <div className="App">
      <h1>Rebel Alliance Intelligence Database</h1>
      {credentials != true ? (
        <button onClick={(x) => credentialsVerify(true)}>
          Please input credentials.
        </button>
      ) : (
        <button>Credentials verified. Welcome, commander.</button>
      )}
      <table>
        {credentials ? (
          <tbody>
            <select
              value={dropdown}
              onChange={(x) => setDropdown(x.target.value)}
            >
              <option value="">Choose a database to query.</option>
              <option value="starships">Starships</option>
              <option value="people">People</option>
              <option value="planets">Planets</option>
            </select>
            <select
              value={pagedropdown}
              onChange={(y) => setPageDropdown(y.target.value)}
            >
              <option value="/?page=1">1</option>
              <option value="/?page=2">2</option>
              <option value="/?page=3">3</option>
            </select>
            <tr>
              <th>{columnOne}</th>
              <th>{columnTwo}</th>
              <th>{columnThree}</th>
            </tr>
            {results &&
              results.map((results) => (
                <tr key={results.name}>
                  <td>{results.name}</td>
                  <td>
                    {results.manufacturer}
                    {results.height}
                    {results.terrain}
                  </td>
                  <td>
                    {results.model}
                    {results.birth_year}
                    {results.population}
                  </td>
                </tr>
              ))}
          </tbody>
        ) : (
          <tbody></tbody>
        )}
      </table>
    </div>
  );
}
