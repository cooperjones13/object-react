//"http://statsapi.mlb.com/api/v1/stats?stats=season&teamId=113&group=hitting&season=1999"

import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function TopPlayers({theme, season, teamId, group, title}){
  // console.log(stats);
  const [top3, setTop3] = useState([{"name":"-","stat":"-"}]);
  const statsURL = "http://statsapi.mlb.com/api/v1/stats?stats=season&teamId="+ teamId +"&group="+ group +"&season="+ season;
  const style = {
    "backgroundColor":theme.accentColor,
    "color": "#ffffff"
  }
  const mainStat = {
    "hitting":"avg",
    "pitching":"era",
    "fielding":"fielding"
  }[group];



  useEffect(() => {
    // console.log(mainStat);
    let cancel;
    axios.get(statsURL, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      // console.log(res.data.stats[0].splits[0].player);
      if(mainStat !== "era"){
        setTop3([
          {
          "name":res.data.stats[0].splits[0].player.fullName,
          "stat":res.data.stats[0].splits[0].stat[mainStat]
          },
          {
          "name":res.data.stats[0].splits[1].player.fullName,
          "stat":res.data.stats[0].splits[1].stat[mainStat]
          },
          {
          "name":res.data.stats[0].splits[2].player.fullName,
          "stat":res.data.stats[0].splits[2].stat[mainStat]
          }
        ]);
      } else{
        setTop3([
          {
          "name":res.data.stats[0].splits[0].player.fullName,
          "stat":res.data.stats[0].splits[0].stat[mainStat]
          }
        ]);
      }
      // console.log(group + " is working");
    })
    .catch(err =>{
      // console.log(group + " is not working");
    })
    return () => cancel()
    // console.log(top3);
  }, [mainStat, statsURL])
  // console.log(top3);

  return(
    <div className="stat-list" style={style}>
      <div className="top-player-container">
        <h2>{title}</h2>
      </ div>
      <ol className="top-3">
        {top3.map(player => (
        <li key={player.stat+player.name+title}> 
          <div className="player-row">
            {/* {console.log(player.stat+player.name+title)} */}
            <h3 className="player-name">{player.name}</h3> 
            <h3 className="player-stat">{player.stat}</h3> 
          </div>
        </li>))
        }
      </ol>
    </div>
  );
}
