import { USERS, WORKSPACE } from "@/lib/data/demo";
import type { Session } from "@/lib/types";

export const CURRENT_SESSION: Session = {
  user: USERS[0],
  workspace: WORKSPACE,
};
