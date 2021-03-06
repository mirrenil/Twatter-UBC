export const makeReq = async (url, method, body) => {
  let response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // response.ok
  return await response.json();
};
