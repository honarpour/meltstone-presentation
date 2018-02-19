export const getCtrlUrl = instanceId =>
  `${window.location
    .toString()
    .replace(`${instanceId}/0`, '')}ctrl/${instanceId}`;

export const getShareUrl = instanceId =>
  `${window.location
    .toString()
    .replace(`${instanceId}/0`, '')}join/${instanceId}`;
