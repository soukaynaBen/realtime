import { listProfilesQuery } from "@/instant.queries";
import schema from "@/instant.schema";
import { init } from "@instantdb/react-native";

const APP_ID = process.env.EXPO_PUBLIC_INSTANT_APP_ID;

if (!APP_ID) {
  throw new Error("You need to set your app id");
}

export const db = init({ appId: APP_ID, schema: schema });

export function useProfile() {
  const { user, error: userError } = db.useAuth();

  const { data, error } = db.useQuery(
    user?.id ? listProfilesQuery(user) : null,
  );

  if (userError) {
    return { profile: undefined, error: userError };
  }

  if (!user) {
    return { profile: undefined, error: null };
  }

  return {
    profile: data?.profiles?.[0],
    error,
  };
}
