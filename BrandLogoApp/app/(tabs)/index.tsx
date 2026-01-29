import { supabase } from "@/utils/supabase";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import defaultStyles from "../styles/defaultStyles";

/*
  Home Screen
  - Shows how many users are in each class period
  - ALWAYS refreshes when the tab becomes active
*/

type PeriodCounts = Record<string, number>;

export default function HomeScreen() {
  const [counts, setCounts] = useState<PeriodCounts>({});
  const [loading, setLoading] = useState(true);

  const fetchCounts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("class_period");

      if (error) {
        console.error("Error fetching counts:", error);
        return;
      }

      const newCounts: PeriodCounts = {};

      for (const row of data ?? []) {
        if (!row.class_period) continue;
        newCounts[row.class_period] = (newCounts[row.class_period] ?? 0) + 1;
      }

      setCounts(newCounts);
    } catch (err) {
      console.error("fetchCounts exception:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔑 THIS is the important part
  useFocusEffect(
    React.useCallback(() => {
      fetchCounts();
    }, [fetchCounts]),
  );

  return (
    <View style={defaultStyles.pageContainer}>
      <Text style={defaultStyles.bodyText}>Home page</Text>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            Period 1: {counts["1"] ?? 0} students
          </Text>
          <Text style={styles.countText}>
            Period 4: {counts["4"] ?? 0} students
          </Text>
          <Text style={styles.countText}>
            Period 6: {counts["6"] ?? 0} students
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  countContainer: {
    marginTop: 20,
  },
  countText: {
    fontSize: 16,
    marginBottom: 8,
  },
});
