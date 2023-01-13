export function checkReg(allrows, userinfo) {
   userinfo = JSON.stringify(userinfo);
   return allrows.some((e) => JSON.stringify(e._rawData) == userinfo);
}
