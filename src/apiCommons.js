export function get(path: string): Promise<*> {
  return fetch(path, { method: "GET" });
}

export function post(path: string, data: Object): Promise<*> {
  return fetch(path, {
    method: "POST",
    body: JSON.stringify(data)
  });
}

export function put(path: string, data: ?Object): Promise<*> {
  return fetch(path, {
    method: "PUT",
    body: JSON.stringify(data || {})
  });
}

export function remove(path: string): Promise<*> {
  return fetch(path, { method: "DELETE" });
}
