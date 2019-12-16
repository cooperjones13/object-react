//"http://statsapi.mlb.com/api/v1/stats?stats=season&teamId=113&group=hitting&season=1999"

import React from 'react';
export default function AboutTeam({theme, teamId, season, teamInfo}){
  // console.log(stats);
//   const [manager,setManager] = useState("-");


  const style = {
    "backgroundColor":theme.accentColor,
    "color": "#ffffff"
  }
  // console.log(top3);

  return(
    <div className="stat-block" id="about-team" style={style}>
        <div className="runs-row">
            <h2>League</h2> <h3>{teamInfo.league.name}</h3>
        </div>
        <div className="runs-row">
            <h2>Division</h2> <h3>{teamInfo.division.name.replace("American League", "AL").replace("National League", "NL")}</h3>
        </div>
        <div className="runs-row">
            <h2>Venue</h2><h3>{teamInfo.venue.name}</h3>
        </div>
        <div className="runs-row">
            <h2>City</h2> <h3>{teamInfo.locationName}</h3>
        </div>
        <div className="runs-row">
            <h2>Established</h2> <h3>{teamInfo.firstYearOfPlay}</h3>
        </div>
    </div>
  );
}
