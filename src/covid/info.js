const Info = ({ data, localdata, onClick }) => {
  return (
    <>
      <div className="covid-container">
        <table id="covid-stat">
          <thead>
            <tr>
              <th>Country</th>
              <th>Total Confirmed Cases</th>
              <th>Total Death Cases</th>
              <th>Total New Death Cases</th>
              <th>Last Updated Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Global</td>
              <td>{data.TotalConfirmed}</td>
              <td>{data.TotalDeaths}</td>
              <td>{data.TotalDeaths}</td>
              <td>{data.Date}</td>
            </tr>
          </tbody>
        </table>
        <table id="covid-stat">
          <thead>
            <tr>
              <th>Country</th>
              <th>New Confirmed Cases</th>
              <th>New Death Cases</th>
              <th>Total Confirmed Cases</th>
              <th>Total Death Cases</th>
              <th>Last Updated Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{localdata.Country}</td>
              <td>{localdata.NewConfirmed}</td>
              <td>{localdata.NewDeaths}</td>
              <td>{localdata.TotalConfirmed}</td>
              <td>{localdata.TotalDeaths}</td>
              <td>{localdata.Date}</td>
            </tr>
          </tbody>
        </table>

        <div className="refresh-btn">
          <button
            className="noselect"
            onClick={() => {
              onClick();
            }}
          >
            Refresh
          </button>
        </div>
      </div>
    </>
  );
};

export default Info;
