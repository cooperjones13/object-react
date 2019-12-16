import React from 'react';
export default function TeamHeader({ theme, teamName, season, teamInfo}){
  const style = {
    "backgroundColor":theme.darkColor,
    "color": "#ffffff",
    "borderColor": theme.accentColor
  }
  return(
    <header style={style}>
      <div id="logo-name">
        <img alt={teamName+" Logo"} src={"https://clientcontent.mlb.com/images/wallpapers/images/teams/large/"+ teamInfo.fileCode +"_wallpaper_logo_01.png"}/>
        <h1>{teamName}</h1>
      </div>
      <h1>{season}</h1>
    </header>
  );
}
