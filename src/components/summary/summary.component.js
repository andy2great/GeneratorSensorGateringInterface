import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { DataTables } from "material-ui-datatables";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Button } from "@material-ui/core";
import summaryService from "./summary.service";
import { SENSEURS_TYPE } from "../../constants/senseurs.constants";

import "./summary.style.css";

export const Summary = (props) => {
  const [ipToSend, setIpToSend] = useState("");
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [chartType, setChartType] = useState(SENSEURS_TYPE.TEMPERATURE);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    refreshChart();
  }, [chartData, chartType]);

  const refreshData = () => {
    summaryService.getLastValue().then((res) => {
      const rows = [];
      const locations = new Set(
        res.map((data) => {
          return data.location;
        })
      );

      locations.forEach((location) => {
        const row = {
          location: location,
          modeOpr: "NaN",
          temp: "NaN",
          hum: "NaN",
          co: "NaN",
          lpg: "NaN",
          autre: true,
          temps: NaN,
        };

        const senseurs = res.filter((x) => {
          return x.location === location;
        });

        senseurs.forEach((x) => {
          const time = new Date(x.timestamp);
          row.temps =
            !row.temps &&
            `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

          const senseurInfo = summaryService.getSensorInfo(x.senseur);
          row[`${senseurInfo.type}`] = x.val;
        });

        rows.push(row);
      });
      setTableData(rows);
    });

    summaryService.getGlobalChartValues().then((res) => {
      setChartData(res);
      refreshChart();
    });
  };

  const refreshChart = () => {
    let minY = 0;
    let maxY = 0;
    let minX = 0;
    let maxX = 0;
    const senseurInfo = summaryService.getSensorInfo(chartType);

    const data = chartData
      .filter((x) => x._id.senseur === chartType)
      .map((x) => ({
        name: x._id.location,
        data: x.val.map((y) => {
          const time = new Date(y.timestamp).getTime();

          if (!minY || minY > y.val) minY = y.val;
          if (!maxY || maxY < y.val) maxY = y.val;
          if (!minX || minX > time) minX = time;
          if (!maxX || maxX < time) maxX = time;

          return {
            x: time,
            y: y.val,
          };
        }),
      }));

    setChartOptions({
      chart: {
        type: "line",
        zoomType: "x",
      },
      title: {
        text: senseurInfo.name,
      },
      xAxis: {
        type: "datetime",
        max: maxX + 20000000,
        min: minX - 10000000,
      },
      yAxis: {
        min: minY - 10,
        max: maxY + 10,
        title: {
          text: `${senseurInfo.name} ${
            senseurInfo.symbole ? "(" + senseurInfo.symbole + ")" : ""
          }`,
        },
      },
      plotOptions: {
        series: {
          turboThreshold: 0,
        },
      },
      series: data.map((x) => ({
        name: x.name,
        data: x.data,
      })),
    });
  };

  const handleCellClick = (row, column, event) => {
    if (column === 0) {
      props.handler(event);
    }
    setChartType(column - 1);
  };

  const TABLE_COLUMNS = [
    {
      key: "location",
      label: "Module",
    },
    {
      key: "modeOpr",
      label: "Act.",
    },
    {
      key: "temp",
      label: "Temp",
    },
    {
      key: "hum",
      label: "Hum",
    },
    {
      key: "co",
      label: "CO",
    },
    {
      key: "lpg",
      label: "LPG",
    },
    {
      key: "autre",
      label: "Autre",
    },
    {
      key: "temps",
      label: "Temps",
    },
  ];

  return (
    <div className="summary-content">
      <p className="summary-title">Sommaire</p>
      <Button
        css="button"
        color="primary"
        variant="contained"
        onClick={() => refreshData()}
      >
        Rafraichir
      </Button>
      <div className="summary-info">
        <MuiThemeProvider>
          <DataTables
            height={"auto"}
            selectable={false}
            showRowHover={true}
            columns={TABLE_COLUMNS}
            data={tableData}
            showCheckboxes={false}
            onCellClick={handleCellClick}
            showFooterToolbar={false}
          />
        </MuiThemeProvider>

        <HighchartsReact highcharts={Highcharts} options={chartOptions} />

        <input onChange={(e) => setIpToSend(e.target.value)}></input>
        <Button
          onClick={() => {
            fetch("http://" + ipToSend).catch((e) => {});
          }}
        >
          Poke!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        </Button>
      </div>
    </div>
  );
};
