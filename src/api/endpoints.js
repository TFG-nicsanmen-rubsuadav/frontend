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

export async function fetchRestaurant(id) {
  const response = await fetch(`${API_URL}/api/restaurant/${id}`, {
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

export async function fetchRecommendarions() {
  const response = await fetch(`${API_URL}/api/recommendations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("access_token")}`,
    },
  });

  const data = await response.json();
  return { status: response.status, recData: data };
}

export async function fetchRestaurantByUserId(userId) {
  const response = await fetch(
    `${API_URL}/api/restaurant/restaurantByUser?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
}

export async function fetchTotalVisits(restaurantId) {
  const response = await fetch(
    `${API_URL}/api/restaurant/${restaurantId}/visits`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
}

export async function fetchVisitsByDate(restaurantId, date) {
  const response = await fetch(
    `${API_URL}/api/restaurant/${restaurantId}/visitsByDate?date=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
}

export async function fetchVisitsByRange(restaurantId, range) {
  const response = await fetch(
    `${API_URL}/api/restaurant/${restaurantId}/visitsByRange?days=${range}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
}

export async function fetchRestaurantById(restaurantId) {
  const response = await fetch(`${API_URL}/api/restaurant/${restaurantId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchUser(userId) {
  const response = await fetch(`${API_URL}/auth/profile/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchCreateDish(form, restaurantId, menuId, sectionId) {
  const response = await fetch(
    `${API_URL}/api/${restaurantId}/${menuId}/${sectionId}/createDish`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(form),
    }
  );

  const data = await response.json();
  return { status: response.status, data };
}