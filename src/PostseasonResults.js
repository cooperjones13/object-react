//"http://statsapi.mlb.com/api/v1/stats?stats=season&teamId=113&group=hitting&season=1999"

import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function PostseasonResults({theme, season, teamId, stats, division, league}){
  // console.log(stats);

  const [messages, setMessages] = useState([]);
  const style = {
    "backgroundColor":theme.accentColor,
    "color": "#ffffff"
  }

  useEffect(() => {
    if(stats.clinchIndicator !== ""){

        let cancel;
        axios.get("https://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season="+ season+ "&hydrate=seriesStatus(useOverride=true)&SameSite=None", {
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
        .then(res => {
        // console.log(res.data);
        let msg = [];
        switch(stats.clinchIndicator) {
            case "z":
                msg.push("Best Record in "+ league);
                break;
            case "w":
                msg.push("Clinched Wild Card");
                break;
            case "y":
                msg.push("Clinched Division "+ division);
                break;  
            default:
                if(season >= 1903 && season !== 1904){
                    msg.push("Did Not Advance to Postseason");
                    console.log(stats.divisionRank);
                    if(typeof stats.divisionRank !== 'undefined'){
                      msg.push("Ranked #"+stats.divisionRank+" in "+ division.replace("American League", "AL").replace("National League", "NL"));
                    } else{
                      msg.push("Ranked #"+stats.leagueRank+" in "+ league);
                      }
                }else{
                    msg.push("No Postseason For "+season);
                    msg.push("Ranked #"+stats.leagueRank+" in "+ league);
                }
                setMessages(msg);
              break;

          }
        for(let i = 1; i < res.data.series.length; i++){
            // console.log(typeof teamId);
            let seriesStatus = res.data.series[i].games[res.data.series[i].games.length-1].seriesStatus;
            // console.log(typeof seriesStatus.winningTeam.id);
            if(seriesStatus.winningTeam.id === parseInt(teamId)){
                msg.push(seriesStatus.result);
            }
            if(seriesStatus.losingTeam.id === parseInt(teamId)){
                msg.push("Loses " + seriesStatus.shortName + " to " + seriesStatus.result.slice(0,3));
            }
        }
        if(res.data.series[0].games[res.data.series[0].games.length-1].seriesStatus.winningTeam.id === parseInt(teamId)){
            msg.push(res.data.series[0].games[res.data.series[0].games.length-1].seriesStatus.result);
        }
        if(res.data.series[0].games[res.data.series[0].games.length-1].seriesStatus.losingTeam.id === parseInt(teamId)){
            msg.push("Lost World Series to " + res.data.series[0].games[res.data.series[0].games.length-1].seriesStatus.result.slice(0,3));
        }
        setMessages(msg);
        })
        .catch(err =>{
            console.log(err);
        })
        return () => cancel()
    }
    else{
        setMessages(["Did Not Advance to Postseason"])
    }
  }, [season, teamId, stats, division, league])
  // console.log(top3);

  return(
    <div className="stat-block" id="postseason-results" style={style}>
        <h2>Postseason</h2>
        {messages.map(msg => (
            <h3 key={msg}>{msg}</h3>
        ))
        }
    </div>
  );
}
