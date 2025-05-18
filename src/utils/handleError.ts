export default function handleError(error: unknown) {
  if (error instanceof Error) {
    return { errorMsg: error.message };
  }
  return { errorMsg: "An unexpected error occured" };
}
