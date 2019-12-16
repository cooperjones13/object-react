import React from 'react';

export default function RunCounts({theme, stats}){
  // console.log(stats);
  const style = {
    "backgroundColor":theme.accentColor,
    "color": "#ffffff"
  }

  return(
    <section className="stat-block" id="run-counts" style={style}>
      <h2>Runs</h2>
      <div className="runs-row">
        <h3>Scored</h3><h4>{stats.runsScored}</h4>
      </div>
      <div className="runs-row">
        <h3>Against</h3> <h4>{stats.runsAllowed}</h4>
      </div>
    </section>
  );
}
