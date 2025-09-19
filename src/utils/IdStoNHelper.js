module.exports = (params) => {
  for (let p in params) {
    if (/Id|id/.test(p) || /ProjectId|projectId/.test(p)) {
      params[p] = Number(params[p]);
    }
  }
  return params;
};