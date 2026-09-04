const API_URL = "/admin-data.php";

export type ResourceType = "products" | "partners" | "news" | "careers";

function adminPassword(): string {
  return sessionStorage.getItem("scope_admin_pw") ?? "";
}

export async function fetchServerData<T>(type: ResourceType): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}?type=${type}`);
    const json = await res.json();
    return json.success && json.data ? (json.data as T) : null;
  } catch {
    return null;
  }
}

export async function saveServerData<T>(type: ResourceType, data: T): Promise<boolean> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, password: adminPassword(), data }),
    });
    const json = await res.json();
    return !!json.success;
  } catch {
    return false;
  }
}

export async function resetServerData(type: ResourceType): Promise<boolean> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, password: adminPassword(), action: "reset" }),
    });
    const json = await res.json();
    return !!json.success;
  } catch {
    return false;
  }
}
