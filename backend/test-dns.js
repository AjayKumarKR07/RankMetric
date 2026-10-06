const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.ajay.vcg6sid.mongodb.net",
  (err, addresses) => {
    if (err) {
      console.error(err);
    } else {
      console.log(addresses);
    }
  }
);