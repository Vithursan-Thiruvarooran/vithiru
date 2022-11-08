import React from "react";
import { useSelector } from 'react-redux';

import MUIDataTable from "mui-datatables";

import { Typography } from "@mui/material";

const CatanPlayerTable = () => {
  const columns = [
    {
      name: "player",
      label: "Player",
      options: {
        filterType: 'multiselect'
      }
    },
    {
      name: "wins",
      label: "Wins",
      options: {
        filter: false
      }
    },
    {
      name: "numGames",
      label: "Number Games",
      options: {
        filter: false
      }
    },
    {
      name: "avgCities",
      label: "(Avg) Cities",
      options: {
        filter: false
      }
    },
    {
      name: "avgSettlements",
      label: "(Avg) Settlements",
      options: {
        filter: false
      }
    },
    {
      name: "avgKnights",
      label: "(Avg) Knights",
      options: {
        filter: false
      }
    },
    {
      name: "avgRoads",
      label: "(Avg) Roads",
      options: {
        filter: false
      }
    },
    {
      name: "avgTrades",
      label: "(Avg) Trades",
      options: {
        filter: false
      }
    },
    {
      name: "avgRobbed",
      label: "(Avg) Robbed",
      options: {
        filter: false
      }
    }
  ];

  const options = {
    selectableRows: "none",
    filter: true,
    responsive: "standard",
    rowsPerPage: 10,
    page: 0
  };

  var playerStats = useSelector(state => state.catan.catanStats.playerStats);

  return (
    <MUIDataTable
      title={
        <Typography sx={{ fontSize: 20 }} color="primary">
          Catan Player Stats
        </Typography>
      }
      data={playerStats}
      columns={columns}
      options={options}
    />
  );
};

export default CatanPlayerTable;
