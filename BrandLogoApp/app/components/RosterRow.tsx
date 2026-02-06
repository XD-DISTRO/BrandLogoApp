//generated this file completely using chatGPT based on the code provided in the notes
export type RosterProfile = {
  id: string;
  first_name: string;
  last_name: string;
  location?: string; // optional for now
  date?: string;
  show_loc?: boolean;
};
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  item: {
    id: string;
    first_name: string;
    last_name: string;
    location?: string;
    date?: string;
    show_loc?: boolean;
  };
};

export default function RosterRow({ item }: Props) {
  return (
    <Pressable style={styles.row}>
      <View>
        <Text style={styles.name}>
          {item.first_name} {item.last_name}
        </Text>

        {item.show_loc ? (
          <>
            <Text style={styles.location}>
              📍 {item.location ?? "Location unknown"}
            </Text>

            {item.date ? <Text style={styles.date}>{item.date}</Text> : null}
          </>
        ) : null}
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  row: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  location: {
    marginTop: 4,
    color: "#555",
  },
  date: {
    marginTop: 2,
    fontSize: 12,
    color: "#888",
  },
});
