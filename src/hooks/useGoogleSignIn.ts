import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { useAuth } from "../context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_WEB_CLIENT_ID =
  "758307128837-d6mvtq49fjjfk28koi78t2ndaostf9gj.apps.googleusercontent.com";

export default function useGoogleSignIn() {
  const router = useRouter();
  const { loginWithGoogleProfile } = useAuth();

  const [googleLoading, setGoogleLoading] = useState(false);

  const [request, response, promptAsync] =
    Google.useAuthRequest({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });

  useEffect(() => {
    if (!response) {
      return;
    }

    const handleGoogleResponse = async () => {
      if (
        response.type === "cancel" ||
        response.type === "dismiss"
      ) {
        setGoogleLoading(false);
        return;
      }

      if (response.type === "error") {
        setGoogleLoading(false);

        Alert.alert(
          "Google Sign-In",
          "Google Sign-In could not be completed. Please try again."
        );

        return;
      }

      if (response.type !== "success") {
        setGoogleLoading(false);
        return;
      }

      try {
        setGoogleLoading(true);

        const accessToken =
          response.authentication?.accessToken;

        if (!accessToken) {
          throw new Error("Google access token missing.");
        }

        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!userInfoResponse.ok) {
          throw new Error(
            "Unable to get Google account information."
          );
        }

        const googleUser = await userInfoResponse.json();

        const email = String(
          googleUser.email || ""
        ).trim();

        const name = String(
          googleUser.name ||
            googleUser.given_name ||
            email.split("@")[0] ||
            "Volunteer"
        ).trim();

        if (!email) {
          throw new Error(
            "Google email address was not available."
          );
        }

        await loginWithGoogleProfile({
          name,
          email,
        });

        router.replace("/home");
      } catch (error) {
        console.log(
          "Google Sign-In Error:",
          error
        );

        Alert.alert(
          "Google Sign-In Failed",
          "Google account information could not be saved. Please try again."
        );
      } finally {
        setGoogleLoading(false);
      }
    };

    handleGoogleResponse();
  }, [response, loginWithGoogleProfile, router]);

  const promptGoogleSignIn = async () => {
    if (!request) {
      Alert.alert(
        "Please Wait",
        "Google Sign-In is still preparing. Please try again."
      );
      return;
    }

    try {
      setGoogleLoading(true);
      await promptAsync();
    } catch (error) {
      console.log(
        "Google Prompt Error:",
        error
      );

      setGoogleLoading(false);

      Alert.alert(
        "Google Sign-In",
        "Google Sign-In could not be opened. Please try again."
      );
    }
  };

  return {
    promptGoogleSignIn,
    googleLoading,
    isGoogleReady: !!request,
  };
}