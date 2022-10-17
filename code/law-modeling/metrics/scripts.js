import { check } from "k6";
import http from "k6/http";

export default function () {
  var url = "http://localhost:80/articles";
  let res = http.get(url);
  check(
    res,
    {
      "is status 200": (r) => r.status === 200,
    },
    { my_tag: res.body }
  );
}
