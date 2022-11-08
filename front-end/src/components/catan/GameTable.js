import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import MUIDataTable from "mui-datatables";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import Button from '@mui/material/Button';

// const Card = () => (
//   <tr>
//     <td className="fullWidth">
//       <h1>
//         lorem ipsum dorel em quol acee, vion, bloolw, wafeo, feiwjfoiew,
//         foiwejifowefjweoi, fewjoewjfowei, fwefwefewfewfewf
//       </h1>
//     </td>
//   </tr>
// );

import {
  getPlayers,
  getGame,
  getGames,
  getGamePlayers,
  getGameDice
} from '../../actions/catan';

const GameTable = ({ openCatanForm }) => {
  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        display: false,
        filter: false
      }
    },
    {
      name: "mode",
      label: "Mode",
      options: {
        filterType: 'multiselect'
      }
    },
    {
      name: "vp",
      label: "VP"
    },
    {
      name: "duration",
      label: "Duration (min)",
      options: {
        filter: false
      }
    },
    {
      name: "cardStack",
      label: "Card Stack",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (value ? 
                  <CheckIcon fontSize="small" sx={{ verticalAlign: 'middle'}}></CheckIcon> : 
                  <CloseIcon fontSize="small" sx={{ verticalAlign: 'middle'}}></CloseIcon>);
        }
      }
    },
    {
      name: "winner",
      label: "Winner",
      options: {
        filterType: 'multiselect'
      }
    },
    {
      name: "_id",
      label: "Edit",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                editGameEntry(value)
              }}
            >
              Edit
            </Button>
          );
        }
      }
    }
  ];

  const options = {
    filter: true,
    selectableRows: "none",
    filterType: "dropdown",
    responsive: "standard",
    rowsPerPage: 10,
    expandableRows: true,
    expandableRowsHeader: false,
    renderExpandableRow: (rowData, rowMeta) => {
      //console.log(rowData);
      const game = games.find(game => game._id === rowData[0]);
      //console.log(game);
      
      return (
        <React.Fragment>
          <tr>
            <td colSpan={7}>
              <TableContainer component={Paper}>
                <Table align="right" style={{ minWidth: "650" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Player</TableCell>
                      <TableCell align="right">VP</TableCell>
                      <TableCell align="right">DCVP</TableCell>
                      <TableCell align="right">EXVP</TableCell>
                      <TableCell align="right">Settlements</TableCell>
                      <TableCell align="right">Cities</TableCell>     
                      <TableCell align="right">Knights</TableCell>      
                      <TableCell align="right">Largest Army</TableCell>       
                      <TableCell align="right">Roads</TableCell>
                      <TableCell align="right">Longest Road</TableCell>   
                      <TableCell align="right">Has Longest Road</TableCell>
                      <TableCell align="right">Robbed</TableCell>
                      <TableCell align="right">Trades</TableCell>                             
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {game.gamePlayers.map(row => (
                      <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                          {getPlayerName(row.player)}
                        </TableCell>
                        <TableCell align="right">{row.vp}</TableCell>
                        <TableCell align="right">{row.dcVp}</TableCell>
                        <TableCell align="right">{row.exVp}</TableCell>
                        <TableCell align="right">{row.settlements}</TableCell>
                        <TableCell align="right">{row.cities}</TableCell>
                        <TableCell align="right">{row.knights}</TableCell>
                        <TableCell align="right">{row.largestArmy ? 
                          <CheckIcon fontSize="small" sx={{ verticalAlign: 'middle'}}></CheckIcon> : 
                          <CloseIcon fontSize="small" sx={{ verticalAlign: 'middle'}}></CloseIcon>}
                        </TableCell>
                        <TableCell align="right">{row.roads}</TableCell>
                        <TableCell align="right">{row.longestRoad}</TableCell>
                        <TableCell align="right">{row.hasLongestRoad ? 
                          <CheckIcon fontSize="small" sx={{ verticalAlign: 'middle'}}></CheckIcon> : 
                          <CloseIcon fontSize="small" sx={{ verticalAlign: 'middle'}}></CloseIcon>}
                        </TableCell>
                        <TableCell align="right">{row.robbed}</TableCell>
                        <TableCell align="right">{row.trades}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </td>
          </tr>
        </React.Fragment>
      );
    },
    page: 0
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
    dispatch(getPlayers());
  }, []);


  var games = useSelector(state => state.catan.games);
  var players = useSelector(state => state.catan.players);

  const getPlayerName = (id) => {
    return players.find(player => player._id === id).username;
  }

  //console.log(games);

  const editGameEntry = (_id) => {
    dispatch(getGame({ id: _id }));
    dispatch(getGamePlayers({ id: _id }));
    dispatch(getGameDice({ id: _id }));
    //console.log("Edit: ", _id);
    openCatanForm();
  }

  return (
    <MUIDataTable
      title={
        <Typography sx={{ fontSize: 20 }} color="primary">
          Catan Games
        </Typography>
      }
      data={games}
      columns={columns}
      options={options}
    />
  );
};

export default GameTable;
