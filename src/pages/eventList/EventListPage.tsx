import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import { EventDto } from "@/types/EventDto";
import axios from "axios";
import { dark } from "@mui/material/styles/createPalette";
//import { formatDistanceToNow } from 'date-fns';
import { format } from "date-fns";
import Countdown from "react-countdown";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const fetchEvents = async () => {
  const { data } = await axios.get<EventDto[]>("/api/events/get_events");
  return data;
};

const EventListPage: React.FC = () => {
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        bgcolor: "background.paper",
        outline: "10px black",
      }}
    >
      <nav aria-label="Events">
        <List>
          {events.map((event) => (
            <React.Fragment key={event.name}>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  sx={{
                    height: "260px",
                    width: "80vw",
                    backgroundImage: `url('${event.photo}')`,
                    position: "relative",
                    borderRadius: "30px",
                    padding: 0,
                    border: "20px solid white",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      height: "38%",
                      width: "100%",
                      bottom: 0,
                      backgroundColor: "white",
                      color: "black",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      paddingLeft: 2,
                      paddingRight: 2,
                      borderBottomLeftRadius: "9px",
                      borderBottomRightRadius: "9px",
                      //border: "2px solid grey",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Box sx={{ width: "50%" }}>
                        <Typography variant="h4">{event.name}</Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            {...stringAvatar("Kent Dodds")}
                            sx={{
                              width: 24,
                              height: 24,
                              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
                            }}
                          />
                          <Typography variant="body2">
                            {event.creator}
                          </Typography>
                        </Stack>
                      </Box>
                      <Box sx={{ width: "50%", textAlign: "right" }}>
                        <Typography variant="body2">{event.place}</Typography>
                        <Countdown
                          date={new Date(parseInt(event.start_time))}
                          renderer={({
                            days,
                            hours,
                            minutes,
                            seconds,
                            completed,
                          }) => {
                            if (completed) {
                              // Render a completed state
                              return (
                                <Typography variant="body2">
                                  Event has ended
                                </Typography>
                              );
                            } else {
                              // Render a countdown
                              return (
                                <Typography variant="body2">
                                  {days}d {hours}h {minutes}m {seconds}s until
                                  event starts
                                </Typography>
                              );
                            }
                          }}
                        />
                        <Typography variant="body2">
                          {event.participantsCount} / {event.participantsMax}{" "}
                          people
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </ListItemButton>
                <Divider />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default EventListPage;
