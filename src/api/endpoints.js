import { API_URL } from "../config";

export async function fetchLogin(form) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await response.json();
  return { status: response.status, data };
}

export async function fetchRegister(form) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await response.json();
  return { status: response.status, data };
}

export async function fetchRestaurants() {
  const response = await fetch(`${API_URL}/api/restaurants`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchNumberOfRestaurants() {
  const response = await fetch(`${API_URL}/api/restaurants/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchNumberOfCities() {
  const response = await fetch(`${API_URL}/api/restaurants/numberOfCities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchAllCities() {
  const response = await fetch(`${API_URL}/api/restaurants/cities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchNumberOfOpinions() {
  const response = await fetch(`${API_URL}/api/restaurants/numberOfOpinions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchSearchRestaurants(name, city) {
  const response = await fetch(
    `${API_URL}/api/restaurant/search?name=${name}&city=${city}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return { status: response.status, data };
}
