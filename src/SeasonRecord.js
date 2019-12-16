import React from 'react';

export default function SeasonRecord({theme, stats}){
  // console.log(stats);
  const style = {
    "backgroundColor":theme.accentColor,
    "color": "#ffffff"
  }

  return(
    <section className="stat-block" id="record" style={style}>
      <h2>Season Record</h2>
      <table>
        <thead>
          <tr>
            <th>Win</th><th>Lose</th><th>Win%</th><th>GB</th><th>Home</th><th>Away</th><th>L10</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="small-col">{stats.wins}</td>
            <td>{stats.losses}</td>
            <td>{stats.winningPercentage}</td>
            <td>{stats.leagueGamesBack}</td>
            <td>{stats.records.splitRecords[0].wins} - {stats.records.splitRecords[0].losses}</td>
            <td>{stats.records.splitRecords[1].wins} - {stats.records.splitRecords[1].losses}</td>
            <td>{stats.records.splitRecords[4].wins} - {stats.records.splitRecords[4].losses}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
