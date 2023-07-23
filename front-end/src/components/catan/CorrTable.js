import React from "react";
import { useSelector } from 'react-redux';

import MUIDataTable from "mui-datatables";
import { Typography } from "@mui/material";

import CorrStat from "./CorrStat";

const CorrTable = () => {
  const columns = [
    {
      name: "player",
      label: "Player",
      options: {
        filterType: 'multiselect'
      }
    },
    {
      name: "knightWvpCorr",
      label: "Knight - wt. Vp",
      options: {
        customBodyRender: value => <CorrStat value={value}></CorrStat>,
        filter: false
      }
    },
    {
      name: "roadWvpCorr",
      label: "Road - wt. Vp",
      options: {
        customBodyRender: value => <CorrStat value={value}></CorrStat>,
        filter: false
      }
    },
    {
      name: "cityWvpCorr",
      label: "City - wt. Vp",
      options: {
        customBodyRender: value => <CorrStat value={value}></CorrStat>,
        filter: false
      }
    },
    {
      name: "robbedWvpCorr",
      label: "Robbed - wt. Vp",
      options: {
        customBodyRender: value => <CorrStat value={value}></CorrStat>,
        filter: false
      }
    },
    {
      name: "tradesWvpCorr",
      label: "Trades - wt. Vp",
      options: {
        customBodyRender: value => <CorrStat value={value}></CorrStat>,
        filter: false
      }
    },
  ];

  const options = {
    selectableRows: "none",
    filter: true,
    responsive: "standard",
    rowsPerPage: 10,
    page: 0,
    sortOrder: {
      name: 'player',
      direction: 'desc'
    },
    customSort: (data, colIndex, order, meta) => {
      return data.sort((a, b) => {
        if (a.data[0] === "Base/Total") { return -1 } else 
        if (b.data[0] === "Base/Total") { return 1 } else 
        if (a.data[colIndex] === null) { return 1 } else 
        if (b.data[colIndex] === null) { return -1 }
        return (a.data[colIndex] < b.data[colIndex] ? -1: 1 ) * (order === 'desc' ? 1 : -1);
      });
    },
  };

  var corrStats = useSelector(state => state.catan.catanStats.corrStats);

  return (
    <MUIDataTable
      title={
        <Typography sx={{ fontSize: 20 }} color="primary">
          Correlation Stats
        </Typography>
      }
      data={corrStats?.players}
      columns={columns}
      options={options}
    />
  );
};

export default CorrTable;
