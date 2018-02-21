import Config from './Config';

export const getCtrlUrl = instanceId =>
  `${window.location
    .toString()
    .replace(`/${Config.secret}/${instanceId}/0`, '')
    .replace(`/${Config.secret}/${instanceId}/1`, '')}/ctrl/${
    Config.secret
  }/${instanceId}`;

export const getShareUrl = instanceId =>
  `${window.location
    .toString()
    .replace(`/${Config.secret}/${instanceId}/0`, '')
    .replace(`/${Config.secret}/${instanceId}/1`, '')}/join/${instanceId}`;
