const BASE_URL = 'http://192.168.0.25:8080/api';
const USER_URL = `${BASE_URL}/users`;
const REGISTERED_USER_URL = `${BASE_URL}/users/validation`;

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
 *
 * @property {number} id
 */
/**
 * @typedef {Object} Roles
 *
 * @property {number} id
 * @property {string} name
 * @property {T} townhouse
 * @property {T} room
 */
/**
 * @typedef {Object} UserValidResponseBody
 * @property {string} name
 * @property {string} public_id
 * @property {string} createdAt
 * @property {string} excludedAt
 * @property {string} updatedAt
 * @property {boolean} active
 * @property {string} username
 * @property {string} email
 * @property {Roles[]} roles
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
