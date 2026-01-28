import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./components/AuthProvider";


export default function RootLayout() {
  return (
    <>
      {/* Status bar appearance */}
      <AuthProvider>
        <StatusBar style="light"/>
        <Slot />
      </AuthProvider>
    </>
  );
}
