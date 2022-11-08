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
