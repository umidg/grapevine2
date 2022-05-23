import React, { useState, useEffect } from "react";
import { Box, Text, Button, Center } from "native-base";
import Notification from "./Notification";

const NotificationContainer = ({ time, notifications }) => {
  console.log(notifications);
  return (
    <Box>
      <Text fontSize="13px" color={"#8a8b90"} fontWeight="800">
        {time}
      </Text>

      <Box pl="5px" pr="5px">
        {notifications.map((_notification) => {
          return (
            <Notification
              key={_notification.uuid}
              profileImage={require("../../../assets/Images/1.png")}
              message={_notification.message}
              time="2h"
              username={_notification.username}
              // component={
              //   d % 2 == 0 && (
              //     <Center>
              //       <Button
              //         onPress={() => acceptRequest(d.id)}
              //         h="7"
              //         pt="0"
              //         pb="0"
              //         bg="buttonPrimaryColor"
              //       >
              //         Accept
              //       </Button>
              //     </Center>
              //   )
              // }
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
