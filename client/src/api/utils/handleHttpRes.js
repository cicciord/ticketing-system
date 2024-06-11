export function handleHttpRes(httpRes) {
  return new Promise((resolve, reject) => {
    httpRes
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((json) => resolve(json))
            .catch(() => reject({ error: "Cannot parse server response" }));
        } else {
          response
            .json()
            .then((obj) => reject(obj))
            .catch(() => reject({ error: "Cannot parse server response" }));
        }
      })
      .catch(() => reject({ error: "Cannot communicate" }));
  });
}
