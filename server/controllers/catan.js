import express from 'express';
import { sampleCorrelation } from 'simple-statistics'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

import { validationResult } from 'express-validator';

import Game from '../models/game.js';
import GamePlayer from '../models/gamePlayer.js';
import GameDice from '../models/gameDice.js';
import GameMode from '../models/gameMode.js';
import Player from '../models/player.js';

const router = express.Router();

export const getGame = async (req, res) => {
  try {
    const { id } = req.params

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const oldGame = await Game.findOne({ _id: id });

    if (!oldGame) return res.status(400).json({ message: "Game doesn't exist" });

    res.status(201).json(
      oldGame
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const getGames = async (req, res) => {
  try {
      
    const games = await Game.aggregate([
      {
        $lookup:
          {
            from: "game_players",
            localField: "_id",
            foreignField: "game",
            as: "gamePlayers"
          }
      },
      {
        $lookup:
          {
            from: "game_modes",
            localField: "mode",
            foreignField: "_id",
            as: "mode"
          }
      },
      {
        $lookup:
          {
            from: "players",
            localField: "winner",
            foreignField: "_id",
            as: "winner"
          }
      },
      {
        $project: {
          mode: { $arrayElemAt: [ "$mode", 0 ] },
          winner: { $arrayElemAt: [ "$winner", 0 ] },
          _id: 1,
          vp: 1,
          duration: 1,
          cardStack: 1,
          gamePlayers: 1
        }
      },
      {
        $project: {
          mode: "$mode.label",
          winner: "$winner.username",
          _id: 1,
          vp: 1,
          duration: 1,
          cardStack: 1,
          gamePlayers: 1
        }
      },
    ]);

    // const gamesWithGamePlayers = await GamePlayer.aggregate([
    //   {
    //     $group:
    //       {
    //         _id: '_id',
    //         from: "game_players",
    //         localField: "_id",
    //         foreignField: "game",
    //         as: "gamePlayers"
    //       }
    //   }
    // ]);

    // const gamesWithMode = await Game
    //   .populate(gamesWithGamePlayers, { path: 'mode', select: 'label' });

    // const gamesWithWinner = await Game
    //   .populate(gamesWithMode, { path: 'winner', select: 'username' });

    // const games = await GamePlayer
    //   .populate(gamesWithWinner, { path: 'gamePlayer.player', select: 'username' });


    res.status(201).json(
      games
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const createGame = async (req, res) => {
  try {
    //console.log(req.body);
    const { mode, vp, cardStack, duration, winner } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const newGame = new Game({ mode, vp, cardStack, duration, winner });
    await newGame.save();
    
   
    res.status(201).json(
      newGame
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const updateGame = async (req, res) => {
  try {
    const { id } = req.params
    const { mode, vp, cardStack, winner } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const oldGame = await Game.findOne({ _id: id });

    if (!oldGame) return res.status(400).json({ message: "Game doesn't exist" });

    const newGame = await Game.findByIdAndUpdate(id, 
      { mode, vp, cardStack, winner },
      { new: true });
   
    res.status(201).json(
      newGame
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;

    const oldGame = await Game.findOne({ _id: id });

    if (!oldGame) return res.status(400).json({ message: "Game doesn't exist" });
  
    await Game.deleteOne({ _id: id });
    await GamePlayer.deleteMany({ game: id });
    await GameDice.deleteMany({ game: id });
   
    res.status(200).send('Deleted Game');
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const getGameModes = async (req, res) => {
  try {
    const gameModes = await GameMode.find({});

    res.status(201).json({
      gameModes
    });
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find({});

    res.status(201).json({
      players
    });
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const createPlayer = async (req, res) => {
  try {
    const { username } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const oldPlayer = await Player.findOne({ username });
    if (oldPlayer !== null) return res.status(422).json({ message: 'Username already exists.'});

    const newPlayer = new Player({ username });
    await newPlayer.save();
    
    res.status(201).json(
      newPlayer
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params
    const { username } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const oldPlayer = await Player.findOne({ _id: id });

    if (!oldPlayer) return res.status(400).json({ message: "Player doesn't exist" });

    const newPlayer = await Player.findByIdAndUpdate(id, 
      { username },
      { new: true });
   
    res.status(201).json(
      newPlayer
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const oldPlayer = await Player.findOne({ _id: id });

    if (!oldPlayer) return res.status(400).json({ message: "Player doesn't exist" });
    const playerGames = await GamePlayer.find({ player: id});
    if (playerGames.length !== 0) return res.status(400).json({ message: "Cannot delete. Player has game entries." });

    await Player.deleteOne({ _id: id });
   
    res.status(200).json(
      oldPlayer
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const getGamePlayers = async (req, res) => {
  try {
    const { id } = req.params

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const gamePlayers = await GamePlayer.find({ game: id });

    if (!gamePlayers) return res.status(400).json({ message: "Game Players don't exist" });

    res.status(201).json(
      gamePlayers
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const createGamePlayer = async (req, res) => {
  try {
    //console.log(req.body);
    const { 
      game,
      player,
      vp,
      dcVp,
      exVp,
      knights,
      largestArmy,
      roads,
      longestRoad,
      hasLongestRoad,
      cities,
      settlements,
      robbed,
      trades
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const newGamePlayer = new GamePlayer({
      game,
      player,
      vp,
      dcVp,
      exVp,
      knights,
      largestArmy,
      roads,
      longestRoad,
      hasLongestRoad,
      cities,
      settlements,
      robbed,
      trades
    });
    newGamePlayer.save();
  
    res.status(201).json(
      newGamePlayer
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const updateGamePlayer = async (req, res) => {
  try {
    const { id } = req.params
    const { 
      game,
      player,
      vp,
      dcVp,
      exVp,
      knights,
      largestArmy,
      roads,
      longestRoad,
      hasLongestRoad,
      cities,
      settlements,
      robbed,
      trades
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const oldGamePlayer = await GamePlayer.findOne({ _id: id });

    if (!oldGamePlayer) return res.status(400).json({ message: "Game Player doesn't exist" });

    const newGamePlayer = await GamePlayer.findByIdAndUpdate(id, 
      {
        game,
        player,
        vp,
        dcVp,
        exVp,
        knights,
        largestArmy,
        roads,
        longestRoad,
        hasLongestRoad,
        cities,
        settlements,
        robbed,
        trades
      },
      { new: true });
   
    res.status(201).json(
      newGamePlayer
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const deleteGamePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const oldGamePlayer = await GamePlayer.findOne({ _id: id });

    if (!oldGamePlayer) return res.status(400).json({ message: "Game Player doesn't exist" });
  
    await GamePlayer.deleteOne({ _id: id });
   
    res.status(200).json(
      oldGamePlayer
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const getGameDice = async (req, res) => {
  try {
    const { id } = req.params

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const gameDice = await GameDice.findOne({ game: id });

    if (!gameDice) return res.status(400).json({ message: "Game dice doesn't exist" });

    res.status(201).json(
      gameDice
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const createGameDice = async (req, res) => {
  try {
    //console.log(req.body);
    const { 
      game,
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
      nine,
      ten,
      eleven,
      twelve
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const newGameDice = new GameDice({ 
      game,
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
      nine,
      ten,
      eleven,
      twelve
    });
    newGameDice.save();
  
    res.status(201).json(
      newGameDice
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const updateGameDice = async (req, res) => {
  try {
    const { id } = req.params
    const { 
      game,
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
      nine,
      ten,
      eleven,
      twelve
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const oldGameDice = await GameDice.findOne({ _id: id });

    if (!oldGameDice) return res.status(400).json({ message: "Game dice doesn't exist" });

    const newGameDice = await GameDice.findByIdAndUpdate(id, 
      { 
        game,
        two,
        three,
        four,
        five,
        six,
        seven,
        eight,
        nine,
        ten,
        eleven,
        twelve
      },
      { new: true });
   
    res.status(201).json(
      newGameDice
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const deleteGameDice = async (req, res) => {
  try {
    const { id } = req.params;

    const oldGameDice = await GameDice.findOne({ _id: id });

    if (!oldGameDice) return res.status(400).json({ message: "Game dice doesn't exist" });
  
    await GameDice.deleteOne({ _id: id });
   
    res.status(200).json(
      oldGameDice
    );
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const getStats = async (req, res) => {
  try {
    const genStats = [];
    
    // Query all player games stats and group by player
    const playerStats = await GamePlayer.aggregate([
      {
        $lookup:
          {
            from: "games",
            let: { game: "$game", player: "$player" },
            pipeline: [
              { 
                $match: { $expr: { $eq: ["$_id", "$$game"] }}
              },
              {
                $project: {
                  _id: 0,
                  wins: {
                    $cond: {
                      if: {$eq: ["$winner", "$$player"]},
                      then: 1,
                      else: 0 
                    }
                  }
                }
              },
              
            ],
            as: "game_info"
          }
      },
      { 
        $unwind: { path: "$game_info" } 
      },
      {
        $lookup:
          {
            from: "players",
            localField: "player",
            foreignField: "_id",
            as: "player"
          }
      },
      {
        $group:
          {
            _id: '$player',
            numGames: { $sum: 1 },
            avgTrades: { $avg: "$trades" },
            avgRobbed: { $avg: "$robbed" },
            avgRoads: { $avg: "$roads" },
            avgKnights: { $avg: "$knights" },
            avgCities: { $avg: "$cities" },
            avgSettlements: { $avg: "$settlements" },
            wins: { $sum: "$game_info.wins" }
          }
      },
      {
        $project: {
          _id: { $arrayElemAt: [ "$_id", 0 ] },
          numGames: 1,
          avgTrades: 1,
          avgRobbed: 1,
          avgRoads: 1,
          avgKnights: 1,
          avgCities: 1,
          avgSettlements: 1,
          wins: 1
        }
      },
      {
        $project: {
          _id: 0,
          player: "$_id.username",
          numGames: 1,
          avgTrades: 1,
          avgRobbed: 1,
          avgRoads: 1,
          avgKnights: 1,
          avgCities: 1,
          avgSettlements: 1,
          wins: 1
        }
      },
      {
        $project: {
          _id: 0,
          player: 1,
          numGames: 1,
          avgTrades: { $round: [ "$avgTrades", 2 ] },
          avgRobbed: { $round: [ "$avgRobbed", 2 ] },
          avgRoads: { $round: [ "$avgRoads", 2 ] },
          avgKnights: { $round: [ "$avgKnights", 2 ] },
          avgCities: { $round: [ "$avgCities", 2 ] },
          avgSettlements: { $round: [ "$avgSettlements", 2 ] },
          wins: 1
        }
      },
      {
        $sort : { wins: -1 }
      }
    ]);

    // Commpute general stats (most wins, most knights, etc.)
    var mostWinsIndex = 0;
    var mostRobbedIndex = 0;
    var mostCitiesIndex = 0;
    var mostTradesIndex = 0;
    var mostKnightsIndex = 0;
    var mostRoadsIndex = 0;

    for (var i = 0; i < playerStats.length; i++) {
      if (playerStats[i].wins > playerStats[mostWinsIndex].wins) {
        mostWinsIndex = i;
      }
      if (playerStats[i].avgRobbed > playerStats[mostRobbedIndex].avgRobbed) {
        mostRobbedIndex = i;
      }
      if (playerStats[i].avgCities > playerStats[mostCitiesIndex].avgCities) {
        mostCitiesIndex = i;
      }
      if (playerStats[i].avgTrades > playerStats[mostTradesIndex].avgTrades) {
        mostTradesIndex = i;
      }
      if (playerStats[i].avgKnights > playerStats[mostKnightsIndex].avgKnights) {
        mostKnightsIndex = i;
      }
      if (playerStats[i].avgRoads > playerStats[mostRoadsIndex].avgRoads) {
        mostRoadsIndex = i;
      }
    }

    genStats.push({ 
      statName: "Most Wins", 
      player: playerStats[mostWinsIndex].player, 
      value: playerStats[mostWinsIndex].wins
    });

    genStats.push({ 
      statName: "Most Robbed", 
      player: playerStats[mostRobbedIndex].player, 
      value: playerStats[mostRobbedIndex].avgRobbed
    });

    genStats.push({ 
      statName: "Most Cities", 
      player: playerStats[mostCitiesIndex].player, 
      value: playerStats[mostCitiesIndex].avgCities
    });

    genStats.push({ 
      statName: "Most Trades", 
      player: playerStats[mostTradesIndex].player, 
      value: playerStats[mostTradesIndex].avgTrades
    });

    genStats.push({ 
      statName: "Most Knights", 
      player: playerStats[mostKnightsIndex].player, 
      value: playerStats[mostKnightsIndex].avgKnights
    });

    genStats.push({ 
      statName: "Most Roads", 
      player: playerStats[mostRoadsIndex].player, 
      value: playerStats[mostRoadsIndex].avgRoads
    });

    // Query player game stats for to and calculate correlation
    const playerCorrStats = await GamePlayer.aggregate([
      {
        $lookup:
          {
            from: "games",
            let: { game: "$game", player: "$player" },
            pipeline: [
              { 
                $match: { $expr: { $eq: ["$_id", "$$game"] }}
              },
              {
                $project: {
                  _id: 0,
                  wins: {
                    $cond: {
                      if: {$eq: ["$winner", "$$player"]},
                      then: 1,
                      else: 0 
                    }
                  },
                  tVP: "$vp"
                }
              },
              
            ],
            as: "game_info"
          }
      },
      { 
        $unwind: { path: "$game_info" } 
      },
      {
        $lookup:
          {
            from: "players",
            localField: "player",
            foreignField: "_id",
            as: "player"
          }
      },
      {
        $project: {
          _id: 0,
          player: "$player.username",
          knights: 1,
          roads: 1,
          cities: 1,
          robbed: 1,
          trades: 1,
          won: "$game_info.wins",
          wVP: { $round: [{ $divide: ["$vp", "$game_info.tVP"] }, 2] },
          createdAt: 1
        }
      },
      {
        $group : {
           _id : "$player", entries: {$push: "$$ROOT"}
        }
      },
      {
        $project: {
          _id: 0,
          name: { $arrayElemAt: [ "$_id", 0 ] },
          entries: 1
        }
      },
      {
        $sort: { player: 1, createdAt: 1 }
      }
    ]);

    // For base/global correlation
    let knights = [];
    let cities = [];
    let roads = [];
    let robbed = [];
    let trades = [];
    let wins = [];
    let wVPs = [];

    // For individual player correlation
    let playerCorr = {};
    for (const player of playerCorrStats) {
      //console.log('  ', player.name)
      let pKnights = [];
      let pCities = [];
      let pRoads = [];
      let pRobbed = [];
      let pTrades = [];
      let pWins = [];
      let pWVPs = [];
      for (const rec of player.entries) {
        //console.log(rec);
        knights.push(rec.knights);
        pKnights.push(rec.knights);
        cities.push(rec.cities);
        pCities.push(rec.cities);
        roads.push(rec.roads);
        pRoads.push(rec.roads);
        robbed.push(rec.robbed);
        pRobbed.push(rec.robbed);
        trades.push(rec.trades);
        pTrades.push(rec.trades);
        wins.push(rec.won);
        pWins.push(rec.won);
        wVPs.push(rec.wVP);
        pWVPs.push(rec.wVP);
      }
      playerCorr[player.name] = {
        knights: pKnights,
        cities: pCities,
        roads: pRoads,
        robbed: pRobbed,
        trades: pTrades,
        wins: pWins,
        wVPs: pWVPs
      }
    }

    let corrStats = {
      base: {
        player: 'Base/Total',
        knightWvpCorr: sampleCorrelation(knights, wVPs),
        roadWvpCorr: sampleCorrelation(roads, wVPs),
        cityWvpCorr: sampleCorrelation(cities, wVPs),
        robbedWvpCorr: sampleCorrelation(robbed, wVPs),
        tradesWvpCorr: sampleCorrelation(trades, wVPs)
      },
      players: [],
    }

    for (const p in playerCorr) {      
      corrStats.players.push({
        player: p,
        knightWvpCorr: playerCorr[p].knights.length > 2 ? sampleCorrelation(playerCorr[p].knights, playerCorr[p].wVPs) : null,
        roadWvpCorr: playerCorr[p].roads.length > 2 ? sampleCorrelation(playerCorr[p].roads, playerCorr[p].wVPs) : null,
        cityWvpCorr: playerCorr[p].cities.length > 2 ? sampleCorrelation(playerCorr[p].cities, playerCorr[p].wVPs) : null,
        robbedWvpCorr: playerCorr[p].robbed.length > 2 ? sampleCorrelation(playerCorr[p].robbed, playerCorr[p].wVPs) : null,
        tradesWvpCorr: playerCorr[p].trades.length > 2 ? sampleCorrelation(playerCorr[p].trades, playerCorr[p].wVPs) : null,
      });      
    }

    corrStats.players.push(corrStats.base);

    //console.log(playerCorrStats);
    //console.log(sampleCorrelation([5,5,4,5,5], [0.43,0.78,0.22,0.64,1]))

    res.status(201).json({
      playerStats,
      genStats,
      corrStats,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export default router;