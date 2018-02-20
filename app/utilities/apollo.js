export const runMutation = async (mutationName, mutate, options) => {
  let mutationPayload;
  try {
    mutationPayload = await mutate(options);
  } catch(error) {
    const parsedError = JSON.parse(JSON.stringify(error));
    let errorName = '';
    if (parsedError.graphQLErrors.length) {
      errorName = parsedError.graphQLErrors[0].name;
    }
    mutationPayload = {
      error: { name: errorName, message: parsedError.message },
      data: {},
    };
    mutationPayload['data'][mutationName] = null;
    console.log(parsedError.message);
  }
  return mutationPayload;
};