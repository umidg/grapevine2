import React, { useState, useEffect } from "react";
import { Box, Text, Button, Center } from "native-base";
import Notification from "./Notification";

const NotificationContainer = ({ time }) => {
  const data = [1, 2, 3];
  // const acceptRequest = (id) => {
  //   setShowModal(true);
  //   grapevineBackend(
  //     "/friendship/acceptfriendrequest",
  //     { friendship_id: id, user_accept: user_id },
  //     "POST"
  //   )
  //     .then(async ({ data }) => {
  //       setModalMessage(data.message);
  //     })
  //     .catch((err) => {
  //       setModalMessage("Something Went Wrong");
  //       console.log(err);
  //     });
  // };
  // const sendRequest = (id) => {
  //   setShowModal(true);
  //   grapevineBackend(
  //     "/friendship/sendfriendrequest",
  //     { user_request: user_id, user_accept: id },
  //     "POST"
  //   )
  //     .then(async ({ data }) => {
  //       setModalMessage(data.data.message);
  //     })
  //     .catch((err) => {
  //       setModalMessage("Something Went Wrong");
  //       console.log(err);
  //     });
  // };
  return (
    <Box>
      <Text fontSize="13px" color={"#8a8b90"} fontWeight="800">
        {time}
      </Text>

      <Box pl="5px" pr="5px">
        {data.map((d) => {
          return (
            <Notification
              key={d}
              profileImage={require("../../../assets/Images/1.png")}
              message={"Sent You Friend Request"}
              time="2h"
              username={"Username"}
              component={
                d % 2 == 0 && (
                  <Center>
                    <Button
                      onPress={() => acceptRequest(d.id)}
                      h="7"
                      pt="0"
                      pb="0"
                      bg="buttonPrimaryColor"
                    >
                      Accept
                    </Button>
                  </Center>
                )
              }
            />
          );
        })}
        {/* {friendRequest ? (
          friendRequest.map((d) => {
            return (
              <Notification
                key={d.id}
                profileImage={require("../../../assets/Images/1.png")}
                message={"Sent You Friend Request"}
                time="2h"
                username={d.username}
                component={
                  <Center>
                    <Button
                      onPress={() => acceptRequest(d.id)}
                      h="7"
                      pt="0"
                      pb="0"
                      bg="buttonPrimaryColor"
                    >
                      Accept
                    </Button>
                  </Center>
                }
              />
            );
          })
        ) : (
          <>
            {friends
              ? friends.map((d) => {
                  return (
                    <Notification
                      key={d.id}
                      profileImage={require("../../../assets/Images/3.png")}
                      message=""
                      time="2h"
                      username={d.username}
                      component={
                        <Center>
                          <Text color={"buttonPrimaryColor"}>Friend</Text>
                        </Center>
                      }
                    />
                  );
                })
              : users.map((d) => {
                  return (
                    <Notification
                      key={d.id}
                      profileImage={require("../../../assets/Images/3.png")}
                      message={`Connect With ${d.email}`}
                      time="2h"
                      username={d.username}
                      component={
                        <Center>
                          <Button
                            onPress={() => sendRequest(d.id)}
                            h="7"
                            pt="0"
                            pb="0"
                            bg="buttonPrimaryColor"
                          >
                            Connect
                          </Button>
                        </Center>
                      }
                    />
                  );
                })}
          </>
        )} */}
      </Box>
    </Box>
  );
};

export default NotificationContainer;
