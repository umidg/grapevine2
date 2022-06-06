/* eslint-disable */
import { grapevineBackend } from '../ci.axios';

export const emailIsValid = (email) =>
  grapevineBackend('/auth/emailIsValid', email, 'POST').then((res) => res.data);
