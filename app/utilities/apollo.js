export const runMutation = async (mutationName, mutate, options) => {
  let mutationPayload = {};
  try {
    mutationPayload = await mutate(options);
  } catch(error) {
    const errorMessage = JSON.parse(JSON.stringify(error)).message;
    mutationPayload['error'] = errorMessage;
    mutationPayload['data'] = {};
    mutationPayload['data'][mutationName] = null;
    console.log(errorMessage);
  }
  return mutationPayload;
};