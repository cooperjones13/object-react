import React, {useState, useEffect} from 'react';
import SeasonRecord from './SeasonRecord';
import PostseasonResults from './PostseasonResults';
import RunCounts from './RunCounts';
import TopPlayers from './TopPlayers';
import AboutTeam from './AboutTeam';
import axios from 'axios';

export default function Stats({theme, id, year, teamStatsUrl, division, teamInfo}){
  // const [teamInfoUrl, setTeamInfoUrl] = useState("http://statsapi.mlb.com/api/v1/standings/regularSeason?leagueId=103,104&season=" + year);
  // console.log(id +" " + year);
  const [stats, setStats] = useState({
    "wins":"-",
    "losses":"-",
    "winningPercentage":"-",
    "leagueGamesBack":"-",
    "clinchIndicator":"",
    "records":{
      "splitRecords":[{"wins":"","losses":""},{"wins":"","losses":""},{"wins":"","losses":""},{"wins":"","losses":""},{"wins":"","losses":""}]
    }
  });

  useEffect(() => { 
    // console.log(teamInfoUrl);
    let cancel;
    axios.get(teamStatsUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      // console.log(teamInfoUrl);
      // console.log(res.data.records);
      for(var i = 0; i < res.data.records.length; i++){
        for(var j = 0; j<res.data.records[i].teamRecords.length; j++){
          // console.log(res.data.records[i].teamRecords[j].team.id + ": ");
          // console.log(typeof res.data.records[i].teamRecords[j].team.id);
          // console.log(typeof id);
          if(res.data.records[i].teamRecords[j].team.id === parseInt(id)){
            // console.log("match");
            setStats(res.data.records[i].teamRecords[j]);
          }
        }
      }
    })
    .catch(err =>{
      setStats({
        "wins":"-",
        "losses":"-",
        "winningPercentage":"-",
        "leagueGamesBack":"-",
        "clinchIndicator":"",
        "records":{
          "splitRecords":[{"wins":"","losses":""},{"wins":"","losses":""},{"wins":"","losses":""},{"wins":"","losses":""},{"wins":"","losses":""}]
        }
      });
      // console.log(err.message);
      // return err.message;
    })
    return () => cancel()
  }, [year, id, teamStatsUrl])
  // console.log(stats);
  // const stats_being_displayed = [{'display': 'Games Played', 'key': 'gamesPlayed'}, {'display': 'Wins', 'key': 'wins'}, {'display': 'Losses', 'key': 'losses'}, {'display': 'Win %', 'key': 'winningPercentage'}, {'display': 'Runs Allowed', 'key': 'runsAllowed'}, {'display': 'Runs Scored', 'key': 'runsScored'}, {'display': 'Division Rank', 'key': 'divisionRank'}, {'display': 'League Rank', 'key': 'leagueRank'}, {'display': 'Sport Rank', 'key': 'sportRank'}]
  // if(loading) return 0;
  return(
    <div className="stats-container" style={{"backgroundColor":theme.lightColor}}>
      <SeasonRecord theme={theme} stats={stats}/>
      <RunCounts theme={theme} stats={stats}/>
      <div className="stat-block" id="best-players" style={{"backgroundColor":theme.accentColor}}>
        <TopPlayers group="hitting" theme={theme} teamId={id} season={year} title="Top Batters by AVG"/>
        <TopPlayers group="pitching" theme={theme} teamId={id} season={year} title="Top Pitcher by ERA"/>
        <TopPlayers group="fielding" theme={theme} teamId={id} season={year} title="Top Fielders by %"/>
      </div>
      <PostseasonResults theme={theme} teamId={id} season={year} stats={stats} division={teamInfo.division.name} league={teamInfo.league.name}/>
      <AboutTeam theme={theme} teamId={id} season={year} teamInfo={teamInfo}/>
    </div>
  );
}
