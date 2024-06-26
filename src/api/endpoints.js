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
  const response = await fetch(
    `${API_URL}/api/restaurants/restaurantsWithoutOwner`,
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

export async function fetchScrapingData() {
  const response = await fetch(`${API_URL}/scraping-data`, {
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

// DISHES ENDPOINTS //
export async function fetchDishById(restaurantId, sectionId, dishId) {
  const response = await fetch(
    `${API_URL}/api/${restaurantId}/zUKq6KT3LRmYAe2yLOCR/${sectionId}/showDish/${dishId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return { data };
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

export async function fetchUpdateDish(form, restaurantId, sectionId, dishId) {
  const response = await fetch(
    `${API_URL}/api/${restaurantId}/zUKq6KT3LRmYAe2yLOCR/${sectionId}/updateDish/${dishId}`,
    {
      method: "PATCH",
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

export async function fetchDeleteDish(restaurantId, menuId, sectionId, dishId) {
  const response = await fetch(
    `${API_URL}/api/${restaurantId}/${menuId}/${sectionId}/deleteDish/${dishId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("access_token")}`,
      },
    }
  );
  return { status: response.status };
}

// SECTIONS ENDPOINTS //
export async function fetchSectionById(restaurantId, sectionId) {
  const response = await fetch(
    `${API_URL}/api/${restaurantId}/zUKq6KT3LRmYAe2yLOCR/showSection/${sectionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return { data };
}

export async function fetchCreateSection(form, restaurantId) {
  const response = await fetch(
    `${API_URL}/api/${restaurantId}/zUKq6KT3LRmYAe2yLOCR/createSection`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(form),
    }
  );

  return { status: response.status };
}

export async function fetchUpdateSection(form, restaurantId, sectionId) {
  const response = await fetch(
    `${API_URL}/api/${restaurantId}/zUKq6KT3LRmYAe2yLOCR/updateSection/${sectionId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(form),
    }
  );

  return { status: response.status };
}

export async function fetchDeleteSection(restaurantId, menuId, sectionId) {
  const response = await fetch(
    `${API_URL}/api/${restaurantId}/${menuId}/deleteSection/${sectionId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("access_token")}`,
      },
    }
  );
  return { status: response.status };
}

export async function fetchUpdateRestaurantCount(restaurantId) {
  const response = await fetch(
    `${API_URL}/api/restaurant/${restaurantId}/updateCount`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
}

export async function fetchGetRestaurantCount(restaurantId) {
  const response = await fetch(
    `${API_URL}/api/restaurant/${restaurantId}/getCount`,
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

export async function fetchWebScrapping() {
  const response = await fetch(`${API_URL}/scrapping`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.status;
}
