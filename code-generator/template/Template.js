import http from '@/config/axios/index';

export default {
  one: id => http(`/@{templateName}/${id}`, {}, 'GET'),
  get: data => http('/@{templateName}/page', data, 'GET'),
  save: data => http('/@{templateName}', data, 'POST'),
  update: data => http('/@{templateName}', data, 'PUT'),
  del: id => http(`/@{templateName}/${id}`, {}, 'DELETE'),
};
