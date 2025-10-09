import { useState, useEffect } from "react";
import "./App.css";
import intelLogo from '/src/assets/AllianceIntelligence.svg'
import jediLogo from '/src/assets/Rebel_Alliance_Logo.svg'



export default function App() {
  const [results, setResults] = useState([]);
  const [dropdown, setDropdown] = useState("");
  const [pagedropdown, setPageDropdown] = useState("");
  const [credentials, credentialsVerify] = useState(false);
  const [columnOne, setColumnOne] = useState("");
  const [columnTwo, setColumnTwo] = useState("");
  const [columnThree, setColumnThree] = useState("");

  function doubleFunction(dropdown){
  setDropdown(dropdown),
  setColumn(dropdown);
}
function setColumn(dropdown) {
  if (dropdown === "starships") {
    setColumnOne("Name");
    setColumnTwo("Manufacturer");
    setColumnThree("Model");
  } else if (dropdown === "people") {
    setColumnOne("Name");
    setColumnTwo("Height (cm)");
    setColumnThree("Birthdate");
  } else if (dropdown === "planets") {
    setColumnOne("Name");
    setColumnTwo("Terrain");
    setColumnThree("Population");
  }
}
  const url = "https://swapi.dev/api/";
  useEffect(() => {
    fetch(url + dropdown + pagedropdown)
      .then((r) => r.json())
      .then((response) => {
        setResults(response.results);
      })
      .catch(error =>{console.log('Network error. Please try again.', error)});
  });

  return (
    <div className="App">
      <h1>Rebel Alliance Intelligence Database</h1>
      <div className="container">
        <div><img src={intelLogo} alt="intel logo" width="300" height="200"></img></div>
        <div></div>
        <div><img src={jediLogo} alt="jedi logo" width="300" height="200"></img></div>
      </div>
      {credentials != true ? (
        <button onClick={(x) => credentialsVerify(true)}>
          Please input credentials.
        </button>
      ) : (
        <button>Credentials verified. Welcome, commander.</button>
      )}
    {credentials ? (
      <div className="container">
        <div><select
              value={dropdown}
              onChange={(x) => doubleFunction(x.target.value)}
            >
              <option value="">Choose a database to query.</option>
              <option value="starships">Starship Registry</option>
              <option value="people">Summary Dossiers</option>
              <option value="planets">Planetary Database</option>
            </select>
        </div>
        <div><select
              value={pagedropdown}
              onChange={(y) => setPageDropdown(y.target.value)}
            >
              <option value="/?page=1">1</option>
              <option value="/?page=2">2</option>
              <option value="/?page=3">3</option>
            </select></div>
      </div>
    ) : (<div></div>
    )}
      <table>
        {credentials ? (
          <tbody>
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
      <footer><p>App created by Christian Love, Daniel Rowe, Jason Lopez. Github repository link:https://github.com/LMU-CMSI2021-F25/generic-api-backed-chris-jason-daniel-api-project </p></footer>
    </div>
  );
}
