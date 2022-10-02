import { UnauthenticatedError } from "../errors";

export const checkPermissions = (
  requestUser: string,
  resourceUserId: object
): void => {
  console.log(requestUser, resourceUserId);

  if (requestUser === resourceUserId.toString()) return;
  throw new UnauthenticatedError("No permission to access this route!");
};
