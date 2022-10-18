import { check } from "k6";
import http from "k6/http";

export default function () {
  var url =
    __ENV.NODE_ENV === "dev"
      ? "http://host.docker.internal:3000/articles"
      : "http://host.docker.internal:80/articles";

  console.log(url);
  let res = http.get(url);
  check(
    res,
    {
      "is response success": (r) => r.status === 200,
    },
    { my_tag: res.body }
  );
}
