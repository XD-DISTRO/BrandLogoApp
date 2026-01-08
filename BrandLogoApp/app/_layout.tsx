import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";


export default function RootLayout() {
  return (
    <>
      {/* Status bar appearance */}
      <StatusBar style="light"/>
      <Slot />
    </>
  );
}
