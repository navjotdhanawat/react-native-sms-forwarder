import {
  Box,
  Heading,
  FlatList,
  Spacer,
  HStack,
  Avatar,
  VStack,
  Text,
} from "native-base";
import { useEffect, useState } from "react";
import { data } from "./constant";
import { enablePromise, openDatabase } from "react-native-sqlite-storage";
import { NativeEventEmitter } from "react-native";
enablePromise(true);

const avatarUrl =
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

const getDBConnection = async () => {
  return openDatabase({ name: "AWESOME.DB", location: "default" });
};

const getData = async () => {
  try {
    const db = await getDBConnection();
    const records = await db.executeSql(
      "SELECT SENDER as sender, CONTENT as content, _ID as id FROM INBOX"
    );
    const inboxItems = [];
    records.forEach((record) => {
      for (let index = 0; index < record.rows.length; index++) {
        inboxItems.push(record.rows.item(index));
      }
    });
    return inboxItems;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get inboxItems !!!");
  }
};
const Inbox = () => {
  const [inbox, setInbox] = useState([]);

  const fetchDate = () => {
    Promise.resolve(getData()).then((data) => {
      console.log("data: : ", data);
      setInbox(data);
    });
  };
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter();
    eventEmitter.addListener("notificationReceived", (event) => {
      console.log("event.eventProperty"); // "someValue"
      fetchDate();
    });
  }, []);

  useEffect(() => {
    fetchDate();
  }, []);

  return (
    <Box style={{ padding: 30 }}>
      <Heading p="4" pb="3" size="lg">
        Inbox
      </Heading>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={inbox}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            borderBottomColor={"gray.300"}
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="3"
          >
            <HStack space={[2, 3]} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: avatarUrl,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.sender}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.content}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                {"10:21"}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

export default Inbox;
