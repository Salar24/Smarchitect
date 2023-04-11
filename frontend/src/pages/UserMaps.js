import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { GetUserMaps } from "../services/apiServices";
import {
    Button,
    Grid,
    Card,
    CardActions,
    CardContent,
    Typography,
    Box,
    Divider,
    TextField
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SearchBox from "../components/SearchBox";
import { theme } from "../Themes/Default-theme";

const UserMaps = () => {
    const [fps, setFps] = useState(0)
    const auth = useContext(AuthContext)
    const nav = useNavigate();
    const [searchedMap, setSearchedMap] = useState("");
    const [mapOptions, setMapOptions] = useState([])
    const [maps, setMaps] = useState([])
    const [mapsMaster, setMapsMaster] = useState([])
    useEffect(()=>{
        GetUserMaps(auth.user.ID)
        .then(res=>{
            console.log("DATA: ", res.data)
            setMaps(res.data.filter(item=>item.Floorplan_Name!==""))
            setMapsMaster(res.data.filter(item=>item.Floorplan_Name!==""))
            const temp_list = []
            for (var i=0; i<res.data.length; i++){
                if (res.data[i].Floorplan_Name !== "")
                 temp_list.push(res.data[i].Floorplan_Name)
            }
            setMapOptions(temp_list)
            setFps(temp_list.length)
        })
        .catch(err=>console.log("ERROR: ", err))


    }, [])

    const textChange = (value) => {
        setSearchedMap(value);
        //console.log("here: " + value);
        if (typeof value === "string") {
          const filteredArray = mapsMaster.filter((map) => {
            return map.Floorplan_Name.toLowerCase().includes(value.toLowerCase());
          });
          setMaps(filteredArray);
        }
        if (value.length === 0) setMaps(mapsMaster);
        
    };

    const handleViewClick = (id) => {
        console.log("Floor Plan ID Clicked : ", id)
        auth.setSelectedMap(id)
        nav('/')
    }

    return (
      <Grid container spacing={3} padding={2}>
  <Grid item xs={12} md={3}>
    <SearchBox
      onChange={textChange}
      inputValue={searchedMap}
      options={mapOptions}
      label="Map Name"
    />
    <Box sx={{ marginTop: "16px", backgroundColor: "#f9f9f9", padding: "16px", borderRadius: "10px", boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)" , backgroundColor: "#F57663",
              color: "#fff",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
              },}}>
    
<Typography variant="h5" sx={{ marginBottom: "8px", fontFamily: "Roboto", fontWeight: 600, color: "#000000", textTransform: "uppercase", letterSpacing: "2px" }}>
  TOTAL FLOORPLANS GENERATED
</Typography>
<Typography variant="h5" sx={{ fontSize: "20px", fontFamily: "Roboto", fontWeight: 400, lineHeight: "1.5", color: "#000" }}>
  {fps}
</Typography>
    </Box>
  </Grid>
  <Grid item xs={12} md={9}>
    <Grid container spacing={3}>
    {maps.map((item) => (
  <Grid
    item
    xs={12}
    sm={6}
    md={4}
    key={item.Floorplan_ID}
    sx={{
      display: "flex",
      justifyContent: "center",
      "&:hover": {
        transform: "scale(1.05)",
        transition: "transform 0.2s ease-in-out",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
      },
    }}
  >
    <Card
      sx={{
        maxWidth: 320,
        minWidth: 320,
        borderRadius: "10px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent sx={{ backgroundColor: "#f9f9f9" }}>
        <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
          {item.Floorplan_Name}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            sx={{
              width: "100%",
              borderRadius: "10px",
              backgroundColor: "#F57663",
              color: "#fff",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
              },
            }}
            variant="contained"
            component="label"
            startIcon={<EditIcon />}
            onClick={() => handleViewClick(item.Floorplan_ID)}
          >
            View
          </Button>
          
        </Box>
      </CardActions>
    </Card>
  </Grid>
))}
    </Grid>
  </Grid>
</Grid>
    )
}

export default UserMaps;