import client from '../../client';

export const members = ({ slug }) => {
  return client.get(`/api/orgs/${slug}/members`);
};

export const removeMember = ({ slug, userId }) => {
  return client.post(`/api/orgs/${slug}/remove-member`, { userId });
};

export const updateMemberRole = ({ role, slug, userId }) => {
  return client.post(`/api/orgs/${slug}/update-member-role`, { role, userId });
};
