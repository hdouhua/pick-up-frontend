function x() {
  var r = "0123456789abcdef".split(""),
    o = function(n) {
      for (var t = "", e = 0; e < 4; e++)
        t += r[(n >> (8 * e + 4)) & 15] + r[(n >> (8 * e)) & 15];
      return t;
    },
    u = function(n) {
      for (var t = n.length, e = 0; e < t; e++) n[e] = o(n[e]);
      return n.join("");
    },
    f = function(n, t) {
      return (n + t) & 4294967295;
    },
    i = function(n, t, e, r, o, u, i) {
      return (function(n, t, e) {
        return f((n << o) | (n >>> (32 - o)), e);
      })(
        (t = (function(n, t, e, r) {
          return f(f(t, n), f(e, r));
        })(n, t, r, u)),
        0,
        e
      );
    },
    c = function(n, t, e, r, o, u, f, c) {
      return i((e & r) | (~e & o), t, e, u, f, c);
    },
    a = function(n, t, e, r, o, u, f, c) {
      return i((e & o) | (r & ~o), t, e, u, f, c);
    },
    l = function(n, t, e, r, o, u, f, c) {
      return i(e ^ r ^ o, t, e, u, f, c);
    },
    d = function(n, t, e, r, o, u, f, c) {
      return i(r ^ (e | ~o), t, e, u, f, c);
    },
    s = function(n, t, e) {
      void 0 === e && (e = f);
      var r = n[0],
        o = n[1],
        u = n[2],
        i = n[3],
        s = c.bind(null, e);
      o = s(
        (o = s(
          (o = s(
            (o = s(
              o,
              (u = s(
                u,
                (i = s(
                  i,
                  (r = s(r, o, u, i, t[0], 7, -680876936)),
                  o,
                  u,
                  t[1],
                  12,
                  -389564586
                )),
                r,
                o,
                t[2],
                17,
                606105819
              )),
              i,
              r,
              t[3],
              22,
              -1044525330
            )),
            (u = s(
              u,
              (i = s(
                i,
                (r = s(r, o, u, i, t[4], 7, -176418897)),
                o,
                u,
                t[5],
                12,
                1200080426
              )),
              r,
              o,
              t[6],
              17,
              -1473231341
            )),
            i,
            r,
            t[7],
            22,
            -45705983
          )),
          (u = s(
            u,
            (i = s(
              i,
              (r = s(r, o, u, i, t[8], 7, 1770035416)),
              o,
              u,
              t[9],
              12,
              -1958414417
            )),
            r,
            o,
            t[10],
            17,
            -42063
          )),
          i,
          r,
          t[11],
          22,
          -1990404162
        )),
        (u = s(
          u,
          (i = s(
            i,
            (r = s(r, o, u, i, t[12], 7, 1804603682)),
            o,
            u,
            t[13],
            12,
            -40341101
          )),
          r,
          o,
          t[14],
          17,
          -1502002290
        )),
        i,
        r,
        t[15],
        22,
        1236535329
      );
      var p = a.bind(null, e);
      o = p(
        (o = p(
          (o = p(
            (o = p(
              o,
              (u = p(
                u,
                (i = p(
                  i,
                  (r = p(r, o, u, i, t[1], 5, -165796510)),
                  o,
                  u,
                  t[6],
                  9,
                  -1069501632
                )),
                r,
                o,
                t[11],
                14,
                643717713
              )),
              i,
              r,
              t[0],
              20,
              -373897302
            )),
            (u = p(
              u,
              (i = p(
                i,
                (r = p(r, o, u, i, t[5], 5, -701558691)),
                o,
                u,
                t[10],
                9,
                38016083
              )),
              r,
              o,
              t[15],
              14,
              -660478335
            )),
            i,
            r,
            t[4],
            20,
            -405537848
          )),
          (u = p(
            u,
            (i = p(
              i,
              (r = p(r, o, u, i, t[9], 5, 568446438)),
              o,
              u,
              t[14],
              9,
              -1019803690
            )),
            r,
            o,
            t[3],
            14,
            -187363961
          )),
          i,
          r,
          t[8],
          20,
          1163531501
        )),
        (u = p(
          u,
          (i = p(
            i,
            (r = p(r, o, u, i, t[13], 5, -1444681467)),
            o,
            u,
            t[2],
            9,
            -51403784
          )),
          r,
          o,
          t[7],
          14,
          1735328473
        )),
        i,
        r,
        t[12],
        20,
        -1926607734
      );
      var b = l.bind(null, e);
      o = b(
        (o = b(
          (o = b(
            (o = b(
              o,
              (u = b(
                u,
                (i = b(
                  i,
                  (r = b(r, o, u, i, t[5], 4, -378558)),
                  o,
                  u,
                  t[8],
                  11,
                  -2022574463
                )),
                r,
                o,
                t[11],
                16,
                1839030562
              )),
              i,
              r,
              t[14],
              23,
              -35309556
            )),
            (u = b(
              u,
              (i = b(
                i,
                (r = b(r, o, u, i, t[1], 4, -1530992060)),
                o,
                u,
                t[4],
                11,
                1272893353
              )),
              r,
              o,
              t[7],
              16,
              -155497632
            )),
            i,
            r,
            t[10],
            23,
            -1094730640
          )),
          (u = b(
            u,
            (i = b(
              i,
              (r = b(r, o, u, i, t[13], 4, 681279174)),
              o,
              u,
              t[0],
              11,
              -358537222
            )),
            r,
            o,
            t[3],
            16,
            -722521979
          )),
          i,
          r,
          t[6],
          23,
          76029189
        )),
        (u = b(
          u,
          (i = b(
            i,
            (r = b(r, o, u, i, t[9], 4, -640364487)),
            o,
            u,
            t[12],
            11,
            -421815835
          )),
          r,
          o,
          t[15],
          16,
          530742520
        )),
        i,
        r,
        t[2],
        23,
        -995338651
      );
      var h = d.bind(null, e);
      (o = h(
        (o = h(
          (o = h(
            (o = h(
              o,
              (u = h(
                u,
                (i = h(
                  i,
                  (r = h(r, o, u, i, t[0], 6, -198630844)),
                  o,
                  u,
                  t[7],
                  10,
                  1126891415
                )),
                r,
                o,
                t[14],
                15,
                -1416354905
              )),
              i,
              r,
              t[5],
              21,
              -57434055
            )),
            (u = h(
              u,
              (i = h(
                i,
                (r = h(r, o, u, i, t[12], 6, 1700485571)),
                o,
                u,
                t[3],
                10,
                -1894986606
              )),
              r,
              o,
              t[10],
              15,
              -1051523
            )),
            i,
            r,
            t[1],
            21,
            -2054922799
          )),
          (u = h(
            u,
            (i = h(
              i,
              (r = h(r, o, u, i, t[8], 6, 1873313359)),
              o,
              u,
              t[15],
              10,
              -30611744
            )),
            r,
            o,
            t[6],
            15,
            -1560198380
          )),
          i,
          r,
          t[13],
          21,
          1309151649
        )),
        (u = h(
          u,
          (i = h(
            i,
            (r = h(r, o, u, i, t[4], 6, -145523070)),
            o,
            u,
            t[11],
            10,
            -1120210379
          )),
          r,
          o,
          t[2],
          15,
          718787259
        )),
        i,
        r,
        t[9],
        21,
        -343485551
      )),
        (n[0] = e(r, n[0])),
        (n[1] = e(o, n[1])),
        (n[2] = e(u, n[2])),
        (n[3] = e(i, n[3]));
    },
    p = function(n) {
      for (var t = [], e = 0; e < 64; e += 4)
        t[e >> 2] =
          n.charCodeAt(e) +
          (n.charCodeAt(e + 1) << 8) +
          (n.charCodeAt(e + 2) << 16) +
          (n.charCodeAt(e + 3) << 24);
      return t;
    },
    b = function(n, t) {
      var e,
        r = n.length,
        o = [1732584193, -271733879, -1732584194, 271733878];
      for (e = 64; e <= r; e += 64) s(o, p(n.substring(e - 64, e)), t);
      var u = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        f = (n = n.substring(e - 64)).length;
      for (e = 0; e < f; e++) u[e >> 2] |= n.charCodeAt(e) << (e % 4 << 3);
      if (((u[e >> 2] |= 128 << (e % 4 << 3)), e > 55))
        for (s(o, u, t), e = 16; e--; ) u[e] = 0;
      return (u[14] = 8 * r), s(o, u, t), o;
    };
  function h(n) {
    var t;
    return (
      "5d41402abc4b2a76b9719d911017c592" !== u(b("hello")) &&
        (t = function(n, t) {
          var e = (65535 & n) + (65535 & t);
          return (((n >> 16) + (t >> 16) + (e >> 16)) << 16) | (65535 & e);
        }),
      u(b(n, t))
    );
  }

  function n(t) {
    return t < 26
      ? t + 65
      : t < 52
      ? t + 71
      : t < 62
      ? t - 4
      : 62 === t
      ? 43
      : 63 === t
      ? 47
      : 65;
  }
  function g(t, r) {
    let e = r.length,
      o = [
        ...(function(t, n) {
          if (t.length !== n.length) return [];
          let r = [];
          for (let e = 0; e < t.length; e++)
            r.push(t.charCodeAt(e) ^ n.charCodeAt(e));
          return r;
        })(t, r)
      ];
    for (let t = 0; t < e; t++)
      t < e / 2 ? o.unshift(r.charCodeAt(t)) : o.push(r.charCodeAt(t));
    return (
      o.unshift(0),
      (function(t) {
        for (var r = 2, e = "", o = t.length, u = 0, i = 0; i < o; i++)
          (r = i % 3),
            i > 0 && ((4 * i) / 3) % 76 == 0 && (e += "\r\n"),
            (u |= t[i] << ((16 >>> r) & 24)),
            (2 !== r && t.length - i != 1) ||
              ((e += String.fromCodePoint(
                n((u >>> 18) & 63),
                n((u >>> 12) & 63),
                n((u >>> 6) & 63),
                n(63 & u)
              )),
              (u = 0));
        return (
          e.substring(0, e.length - 2 + r) +
          (2 === r ? "" : 1 === r ? "=" : "==")
        );
      })(o)
    );
  }
  let e = 0;
  return async function(n) {
    let o = Date.now();
    return (
      o === e ? (o -= 1) : (e = o),
      g(await h(n.join("")), await h(o.toString()))
    );
  };
}

export const gk = x();
