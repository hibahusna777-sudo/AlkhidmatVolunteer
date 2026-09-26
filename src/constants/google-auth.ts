export const GOOGLE_WEB_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ??
  "758307128837-d6mvtq49fjjfk28koi78t2ndaostf9gj.apps.googleusercontent.com";

export const GOOGLE_ANDROID_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;

export const GOOGLE_IOS_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;

const GOOGLE_PAGES_REDIRECT_URI =
  "https://hibahusna777-sudo.github.io/AlkhidmatVolunteer/";

export function getGoogleRedirectUri() {
  const configuredRedirectUri =
    process.env.EXPO_PUBLIC_GOOGLE_REDIRECT_URI;

  if (configuredRedirectUri) {
    return configuredRedirectUri;
  }

  if (typeof window === "undefined") {
    return GOOGLE_PAGES_REDIRECT_URI;
  }

  const isGitHubPages = window.location.hostname.endsWith(".github.io");
  const basePath = isGitHubPages ? "/AlkhidmatVolunteer/" : "/";

  return new URL(basePath, window.location.origin).toString();
}
