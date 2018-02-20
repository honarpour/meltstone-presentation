export const getCtrlUrl = instanceId =>
  `${window.location
    .toString()
    .replace(`${instanceId}/0`, '')
    .replace(`${instanceId}/1`, '')}ctrl/${instanceId}`;

export const getShareUrl = instanceId =>
  `${window.location
    .toString()
    .replace(`${instanceId}/0`, '')
    .replace(`${instanceId}/1`, '')}join/${instanceId}`;
