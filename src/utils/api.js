const SERVER = 'app-icorrespondencia.azurewebsites.net';
const BASE_URL = `https://${SERVER}/api`;
const USER_URL = `${BASE_URL}/users`;
const REGISTERED_USER_URL = `${BASE_URL}/users/validation`;
const TOWNHOUSE_URL = `${BASE_URL}/townhouses`;

export const getUser = async id => {
  try {
    const response = await fetch(`${USER_URL}/${id}`);

    if (response.status !== 200) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

/**
 * @typedef {Object} T
 * @property {number} id
 *
 * @typedef {Object} Role
 * @property {number} id
 * @property {string} name
 * @property {T} townhouse
 * @property {T} room
 *
 * @typedef {Object} UserValidResponseBody
 * @property {string} name
 * @property {string} public_id
 * @property {string} createdAt
 * @property {string} excludedAt
 * @property {string} updatedAt
 * @property {boolean} active
 * @property {string} username
 * @property {string} email
 * @property {Role} role
 */

/**
 * Validate if user exists and returns object
 * @return {UserValidResponseBody}
 */
export const getUserByUsernameAndPassword = async ({ username, password }) => {
  try {
    const response = await fetch(REGISTERED_USER_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status !== 200) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserByPublicId = async publicId => {
  try {
    const response = await fetch(`${USER_URL}/${publicId}`);

    if (response.status !== 200) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

/**
 * Create user
 * @return {UserValidResponseBody}
 */
export const createUser = async user => {
  let response;
  let json;

  try {
    response = await fetch(USER_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    json = await response.json();

    if (response.status === 201) {
      return json;
    }
  } catch (error) {
    console.log(`catch Api: ${error}`);
  }

  if (response.status === 400) {
    throw new Error(json.details);
  }

  throw new Error(`Erro de servidor: ${response.message}`);
};

export const updateUser = async user => {
  let response;
  let json;

  try {
    response = await fetch(USER_URL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    json = await response.json();

    if (response.status !== 204) {
      return json;
    }
  } catch (error) {
    console.log(error);
  }

  console.log(json);
};

/**
 * @typedef {Object} Mailing
 * @property {number} id
 * @property {string} deliveryDate
 * @property {boolean} read
 * @property {string} description
 * @property {string} read_at
 */
/**
 * Obtain all mailings by user
 * @param {string} user_id User public id
 * @returns {Mailing[]} Mailings list
 */
export const getMailings = async user_id => {
  try {
    const response = await fetch(`${USER_URL}/${user_id}/mailings`);

    if (response.status !== 200) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

/**
 * @typedef {Object} TownhousesValidResponse
 * @property {string} name
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {boolean} active
 * @property {string} site
 * @property {string} cnpj
 * @property {string} email
 * @property {string} phone
 * @property {string} public_id
 */
/**
 * Obtain all townhouses
 * @returns {TownhousesValidResponse[]} List of townhouses or empty list
 */
export const getTownhouses = async () => {
  try {
    const response = await fetch(TOWNHOUSE_URL);

    if (response.status !== 200) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
/**
 * @typedef {Object} Room
 * @property {number} id
 * @property {number} number
 *
 * @typedef {Object} Block
 * @property {number} id
 * @property {string} name
 * @property {Room[]} rooms
 *
 * @typedef {Object} Blocks
 * @property {Block[]} blocks
 *
 * @typedef {TownhousesValidResponse & Blocks} TownhouseResponse
 */

/**
 */
/**Obtain townhouse data by public_id
 * @param {string} publicId id to search
 * @returns {TownhouseResponse}
 */
export const getTownhouseByPublicId = async publicId => {
  try {
    const response = await fetch(`${TOWNHOUSE_URL}/${publicId}`);

    if (response.status !== 200) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const setMailingRead = async ({ user_id, mailing_id }) => {
  try {
    await fetch(`${USER_URL}/${user_id}/mailings/${mailing_id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  }
};
