export const makeReq = async (url, method, body) => {
  console.log("helper.js");
  let response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // if (!response.ok) {
  //   throw new Error(`Something went wrong ${response.status}`);
  // }
  console.log(response);
  console.log(method);
  return await response.json();
};
