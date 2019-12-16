import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TeamHeader from './TeamHeader';
import Stats from './Stats';

function App(){
  const [year, setYear] = useState(2019);
  const [firstYearOfPlay, setFirstYearOfPlay] = useState(1869);
  const [teamId, setTeamId] = useState(115);
  const [error, setError] = useState(false);
  const [sliderValue, setSliderValue] = useState(1023);
  const [teamInfo, setTeamInfo] = useState({
    "venue": {
      "name": "-"
      },
    "locationName": "-",
    "firstYearOfPlay": "1890",
    "division":{
      "name": "-"
    },
    "fileCode":"col",
    "league":{
      "name": "-"
    }
  });
  const [teamName, setTeamName] = useState("");
  const [division, setDivision] = useState("-")
  const [theme, setTheme] = useState({
    "accentColor": "#aaa",
    "darkColor": "#000",
    "lightColor": "#fff"
  });
  // const [teamStats, setTeamStats] = useState({});
  const [teamInfoUrl, setTeamInfoUrl] = useState('http://statsapi.mlb.com/api/v1/teams?teamId='+ teamId +'&season='+ year);
  // const [teamInfoUrl, setTeamInfoUrl] = useState('http://statsapi.mlb.com/api/v1/teams?teamId='+ teamId +'&season='+ year);
  // const teamInfoUrl = 'http://statsapi.mlb.com/api/v1/teams?teamId='+ teamId +'&season='+ year;
  // const teamBackgroundColor = '#33006F';
  // const teamTextColor = '#C4CED4';

  useEffect(() => {
    setInterval(() => {
      let cancelYear
      axios.get("http://localhost:5000/api/data", {
        cancelToken: new axios.CancelToken(c => cancelYear = c),
        timeout:100
      })
      .then(res => {
        setSliderValue(res.data.sliderValue);
        setTeamId(res.data.id);
        setTheme(res.data.theme);
      })
      .catch(err =>{
        console.log(err.message);
      });
      return () => cancelYear()
    }, 300);
  },[])

  useEffect(() => {
    // console.log(year);
    setError(false);
    // setLoading(true);
    // setTeamFound(false);
    setTeamInfoUrl('http://statsapi.mlb.com/api/v1/teams?teamId='+ teamId +'&season='+ year);
    let cancel
    axios.get(teamInfoUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c),
      timeout:2000
    })
    .then(res => {
      setFirstYearOfPlay(res.data.teams[0].firstYearOfPlay);
      setTeamName(res.data.teams[0].name);
      setDivision(res.data.teams[0].division.name);
      // setLoading(false);
      // setTeamFound(true);
      setTeamInfo(res.data.teams[0]);
    })
    .catch(err =>{
      if(year < firstYearOfPlay){setYear(firstYearOfPlay);}
      if(teamId === -1){
        setTeamName("Loading...")
      }

      // setLoading(false);
      // setTeamFound(false);
      setError(true);
      // console.log(year);
      // console.log(err.message);
      // return "team not found";
    })

    return () => cancel()
  }, [year, teamId, teamInfoUrl])

  useEffect(() => {
    setYear(mapRange(parseInt(sliderValue), 0, 1023, parseInt(firstYearOfPlay), 2019));
    // console.log(sliderValue+":"+firstYearOfPlay);
  },[firstYearOfPlay, sliderValue])

  // if(loading) return "loading..."

  return(
    <div>
      <TeamHeader theme={theme} teamName={teamName} teamId={teamId} season={year} teamInfo={teamInfo}/>
      <Stats division={division} teamInfo={teamInfo} theme={theme} error={error} id={teamId} year={year} teamStatsUrl={"http://statsapi.mlb.com/api/v1/standings/regularSeason?leagueId=103,104&season=" + year}/>
    </div>
  );

}

function mapRange (value, a, b, c, d) {
    // first map value from (a..b) to (0..1)
    // console.log(value, a, b, c, d)
    value = (value - a) / (b - a);
    // then map it from (0..1) to (c..d) and return it
    // console.log(value, a, b, c, d)
    return Math.round(c + value * (d - c));
}

export default App;
