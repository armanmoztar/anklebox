"use strict";
(self.webpackChunkanklebox = self.webpackChunkanklebox || []).push([
  [179],
  {
    716: () => {
      function ne(e) {
        return "function" == typeof e;
      }
      function Xr(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const mi = Xr(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function eo(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class at {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (ne(r))
              try {
                r();
              } catch (i) {
                t = i instanceof mi ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Nd(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof mi ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new mi(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Nd(t);
            else {
              if (t instanceof at) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && eo(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && eo(n, t), t instanceof at && t._removeParent(this);
        }
      }
      at.EMPTY = (() => {
        const e = new at();
        return (e.closed = !0), e;
      })();
      const Td = at.EMPTY;
      function Ad(e) {
        return (
          e instanceof at ||
          (e && "closed" in e && ne(e.remove) && ne(e.add) && ne(e.unsubscribe))
        );
      }
      function Nd(e) {
        ne(e) ? e() : e.unsubscribe();
      }
      const Tn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        yi = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = yi;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = yi;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Rd(e) {
        yi.setTimeout(() => {
          const { onUnhandledError: t } = Tn;
          if (!t) throw e;
          t(e);
        });
      }
      function xd() {}
      const L0 = Ia("C", void 0, void 0);
      function Ia(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let An = null;
      function vi(e) {
        if (Tn.useDeprecatedSynchronousErrorHandling) {
          const t = !An;
          if ((t && (An = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = An;
            if (((An = null), n)) throw r;
          }
        } else e();
      }
      class Sa extends at {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Ad(t) && t.add(this))
              : (this.destination = U0);
        }
        static create(t, n, r) {
          return new to(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Ta(
                (function j0(e) {
                  return Ia("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Ta(
                (function k0(e) {
                  return Ia("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Ta(L0, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const $0 = Function.prototype.bind;
      function Ma(e, t) {
        return $0.call(e, t);
      }
      class B0 {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Di(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Di(r);
            }
          else Di(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Di(n);
            }
        }
      }
      class to extends Sa {
        constructor(t, n, r) {
          let o;
          if ((super(), ne(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Tn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && Ma(t.next, i),
                  error: t.error && Ma(t.error, i),
                  complete: t.complete && Ma(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new B0(o);
        }
      }
      function Di(e) {
        Tn.useDeprecatedSynchronousErrorHandling
          ? (function V0(e) {
              Tn.useDeprecatedSynchronousErrorHandling &&
                An &&
                ((An.errorThrown = !0), (An.error = e));
            })(e)
          : Rd(e);
      }
      function Ta(e, t) {
        const { onStoppedNotification: n } = Tn;
        n && yi.setTimeout(() => n(e, t));
      }
      const U0 = {
          closed: !0,
          next: xd,
          error: function H0(e) {
            throw e;
          },
          complete: xd,
        },
        Aa =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function cn(e) {
        return e;
      }
      function Od(e) {
        return 0 === e.length
          ? cn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let Ce = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function W0(e) {
              return (
                (e && e instanceof Sa) ||
                ((function G0(e) {
                  return e && ne(e.next) && ne(e.error) && ne(e.complete);
                })(e) &&
                  Ad(e))
              );
            })(n)
              ? n
              : new to(n, r, o);
            return (
              vi(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Pd(r))((o, i) => {
              const s = new to({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [Aa]() {
            return this;
          }
          pipe(...n) {
            return Od(n)(this);
          }
          toPromise(n) {
            return new (n = Pd(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Pd(e) {
        var t;
        return null !== (t = e ?? Tn.Promise) && void 0 !== t ? t : Promise;
      }
      const q0 = Xr(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Ut = (() => {
        class e extends Ce {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Fd(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new q0();
          }
          next(n) {
            vi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            vi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            vi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? Td
              : ((this.currentObservers = null),
                i.push(n),
                new at(() => {
                  (this.currentObservers = null), eo(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new Ce();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Fd(t, n)), e;
      })();
      class Fd extends Ut {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Td;
        }
      }
      class ut extends Ut {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function Ld(e) {
        return ne(e?.lift);
      }
      function Me(e) {
        return (t) => {
          if (Ld(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Te(e, t, n, r, o) {
        return new Z0(e, t, n, r, o);
      }
      class Z0 extends Sa {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function re(e, t) {
        return Me((n, r) => {
          let o = 0;
          n.subscribe(
            Te(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function dn(e) {
        return this instanceof dn ? ((this.v = e), this) : new dn(e);
      }
      function $d(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Oa(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const Bd = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Hd(e) {
        return ne(e?.then);
      }
      function Ud(e) {
        return ne(e[Aa]);
      }
      function zd(e) {
        return Symbol.asyncIterator && ne(e?.[Symbol.asyncIterator]);
      }
      function Gd(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Wd = (function hw() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function qd(e) {
        return ne(e?.[Wd]);
      }
      function Zd(e) {
        return (function Vd(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof dn
                  ? Promise.resolve(f.value.v).then(l, c)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function l(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield dn(n.read());
              if (o) return yield dn(void 0);
              yield yield dn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Qd(e) {
        return ne(e?.getReader);
      }
      function mt(e) {
        if (e instanceof Ce) return e;
        if (null != e) {
          if (Ud(e))
            return (function pw(e) {
              return new Ce((t) => {
                const n = e[Aa]();
                if (ne(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Bd(e))
            return (function gw(e) {
              return new Ce((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Hd(e))
            return (function mw(e) {
              return new Ce((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Rd);
              });
            })(e);
          if (zd(e)) return Yd(e);
          if (qd(e))
            return (function yw(e) {
              return new Ce((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Qd(e))
            return (function vw(e) {
              return Yd(Zd(e));
            })(e);
        }
        throw Gd(e);
      }
      function Yd(e) {
        return new Ce((t) => {
          (function Dw(e, t) {
            var n, r, o, i;
            return (function kd(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = $d(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function zt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Ne(e, t, n = 1 / 0) {
        return ne(t)
          ? Ne((r, o) => re((i, s) => t(r, i, o, s))(mt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            Me((r, o) =>
              (function ww(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (g) => (l < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), l++;
                    let y = !1;
                    mt(n(g, c++)).subscribe(
                      Te(
                        t,
                        (D) => {
                          o?.(D), i ? h(D) : t.next(D);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (l--; u.length && l < r; ) {
                                const D = u.shift();
                                s ? zt(t, s, () => p(D)) : p(D);
                              }
                              f();
                            } catch (D) {
                              t.error(D);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Te(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function er(e = 1 / 0) {
        return Ne(cn, e);
      }
      const Tt = new Ce((e) => e.complete());
      function Pa(e) {
        return e[e.length - 1];
      }
      function no(e) {
        return (function _w(e) {
          return e && ne(e.schedule);
        })(Pa(e))
          ? e.pop()
          : void 0;
      }
      function Kd(e, t = 0) {
        return Me((n, r) => {
          n.subscribe(
            Te(
              r,
              (o) => zt(r, e, () => r.next(o), t),
              () => zt(r, e, () => r.complete(), t),
              (o) => zt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Jd(e, t = 0) {
        return Me((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Xd(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new Ce((n) => {
          zt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            zt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Re(e, t) {
        return t
          ? (function Nw(e, t) {
              if (null != e) {
                if (Ud(e))
                  return (function Iw(e, t) {
                    return mt(e).pipe(Jd(t), Kd(t));
                  })(e, t);
                if (Bd(e))
                  return (function Mw(e, t) {
                    return new Ce((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Hd(e))
                  return (function Sw(e, t) {
                    return mt(e).pipe(Jd(t), Kd(t));
                  })(e, t);
                if (zd(e)) return Xd(e, t);
                if (qd(e))
                  return (function Tw(e, t) {
                    return new Ce((n) => {
                      let r;
                      return (
                        zt(n, t, () => {
                          (r = e[Wd]()),
                            zt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ne(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Qd(e))
                  return (function Aw(e, t) {
                    return Xd(Zd(e), t);
                  })(e, t);
              }
              throw Gd(e);
            })(e, t)
          : mt(e);
      }
      function L(...e) {
        return Re(e, no(e));
      }
      function ef(e = {}) {
        const {
          connector: t = () => new Ut(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (i) => {
          let s,
            a,
            u,
            l = 0,
            c = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = u = void 0), (c = d = !1);
            },
            p = () => {
              const g = s;
              h(), g?.unsubscribe();
            };
          return Me((g, y) => {
            l++, !d && !c && f();
            const D = (u = u ?? t());
            y.add(() => {
              l--, 0 === l && !d && !c && (a = Fa(p, o));
            }),
              D.subscribe(y),
              !s &&
                l > 0 &&
                ((s = new to({
                  next: (m) => D.next(m),
                  error: (m) => {
                    (d = !0), f(), (a = Fa(h, n, m)), D.error(m);
                  },
                  complete: () => {
                    (c = !0), f(), (a = Fa(h, r)), D.complete();
                  },
                })),
                mt(g).subscribe(s));
          })(i);
        };
      }
      function Fa(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new to({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return mt(t(...n)).subscribe(r);
      }
      function At(e, t) {
        return Me((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            Te(
              r,
              (u) => {
                o?.unsubscribe();
                let l = 0;
                const c = i++;
                mt(e(u, c)).subscribe(
                  (o = Te(
                    r,
                    (d) => r.next(t ? t(u, d, c, l++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Ow(e, t) {
        return e === t;
      }
      function ee(e) {
        for (let t in e) if (e[t] === ee) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function _e(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(_e).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function ka(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const Pw = ee({ __forward_ref__: ee });
      function ja(e) {
        return (
          (e.__forward_ref__ = ja),
          (e.toString = function () {
            return _e(this());
          }),
          e
        );
      }
      function k(e) {
        return Va(e) ? e() : e;
      }
      function Va(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(Pw) &&
          e.__forward_ref__ === ja
        );
      }
      function $a(e) {
        return e && !!e.ɵproviders;
      }
      class w extends Error {
        constructor(t, n) {
          super(
            (function wi(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function j(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Ci(e, t) {
        throw new w(-201, !1);
      }
      function lt(e, t) {
        null == e &&
          (function X(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function O(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function hn(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function _i(e) {
        return nf(e, Ei) || nf(e, sf);
      }
      function nf(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function rf(e) {
        return e && (e.hasOwnProperty(Ba) || e.hasOwnProperty(Hw))
          ? e[Ba]
          : null;
      }
      const Ei = ee({ ɵprov: ee }),
        Ba = ee({ ɵinj: ee }),
        sf = ee({ ngInjectableDef: ee }),
        Hw = ee({ ngInjectorDef: ee });
      var T = (() => (
        ((T = T || {})[(T.Default = 0)] = "Default"),
        (T[(T.Host = 1)] = "Host"),
        (T[(T.Self = 2)] = "Self"),
        (T[(T.SkipSelf = 4)] = "SkipSelf"),
        (T[(T.Optional = 8)] = "Optional"),
        T
      ))();
      let Ha;
      function Ge(e) {
        const t = Ha;
        return (Ha = e), t;
      }
      function uf(e, t, n) {
        const r = _i(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & T.Optional
          ? null
          : void 0 !== t
          ? t
          : void Ci(_e(e));
      }
      const oe = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        ro = {},
        Ua = "__NG_DI_FLAG__",
        bi = "ngTempTokenPath",
        zw = /\n/gm,
        lf = "__source";
      let tr;
      function pn(e) {
        const t = tr;
        return (tr = e), t;
      }
      function qw(e, t = T.Default) {
        if (void 0 === tr) throw new w(-203, !1);
        return null === tr
          ? uf(e, void 0, t)
          : tr.get(e, t & T.Optional ? null : void 0, t);
      }
      function N(e, t = T.Default) {
        return (
          (function af() {
            return Ha;
          })() || qw
        )(k(e), t);
      }
      function b(e, t = T.Default) {
        return N(e, Ii(t));
      }
      function Ii(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function za(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = k(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new w(900, !1);
            let o,
              i = T.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = Zw(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(N(o, i));
          } else t.push(N(r));
        }
        return t;
      }
      function oo(e, t) {
        return (e[Ua] = t), (e.prototype[Ua] = t), e;
      }
      function Zw(e) {
        return e[Ua];
      }
      function Gt(e) {
        return { toString: e }.toString();
      }
      var Nt = (() => (
          ((Nt = Nt || {})[(Nt.OnPush = 0)] = "OnPush"),
          (Nt[(Nt.Default = 1)] = "Default"),
          Nt
        ))(),
        tt = (() => {
          return (
            ((e = tt || (tt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            tt
          );
          var e;
        })();
      const Wt = {},
        Q = [],
        Si = ee({ ɵcmp: ee }),
        Ga = ee({ ɵdir: ee }),
        Wa = ee({ ɵpipe: ee }),
        df = ee({ ɵmod: ee }),
        qt = ee({ ɵfac: ee }),
        io = ee({ __NG_ELEMENT_ID__: ee }),
        ff = ee({ __NG_ENV_ID__: ee });
      function hf(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      function qa(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            gf(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function pf(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function gf(e) {
        return 64 === e.charCodeAt(0);
      }
      function so(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  mf(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function mf(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      const yf = "ng-template";
      function Kw(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== hf(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function vf(e) {
        return 4 === e.type && e.value !== yf;
      }
      function Jw(e, t, n) {
        return t === (4 !== e.type || n ? e.value : yf);
      }
      function Xw(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function nC(e) {
            for (let t = 0; t < e.length; t++) if (pf(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !Jw(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (yt(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!Kw(e.attrs, l, n)) {
                    if (yt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = eC(8 & r ? "class" : u, o, vf(e), n);
                if (-1 === d) {
                  if (yt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== hf(h, l, 0)) || (2 & r && l !== f)) {
                    if (yt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !yt(r) && !yt(u)) return !1;
            if (s && yt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return yt(r) || s;
      }
      function yt(e) {
        return 0 == (1 & e);
      }
      function eC(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function rC(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Df(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (Xw(e, t[r], n)) return !0;
        return !1;
      }
      function wf(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function iC(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !yt(s) && ((t += wf(i, o)), (o = "")),
              (r = s),
              (i = i || !yt(r));
          n++;
        }
        return "" !== o && (t += wf(i, o)), t;
      }
      function Za(e) {
        return Gt(() => {
          const t = _f(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Nt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || tt.Emulated,
              styles: e.styles || Q,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          Ef(n);
          const r = e.dependencies;
          return (
            (n.directiveDefs = Mi(r, !1)),
            (n.pipeDefs = Mi(r, !0)),
            (n.id = (function hC(e) {
              let t = 0;
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
              return (t += 2147483648), "c" + t;
            })(n)),
            n
          );
        });
      }
      function lC(e) {
        return K(e) || Pe(e);
      }
      function cC(e) {
        return null !== e;
      }
      function Nn(e) {
        return Gt(() => ({
          type: e.type,
          bootstrap: e.bootstrap || Q,
          declarations: e.declarations || Q,
          imports: e.imports || Q,
          exports: e.exports || Q,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Cf(e, t) {
        if (null == e) return Wt;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function je(e) {
        return Gt(() => {
          const t = _f(e);
          return Ef(t), t;
        });
      }
      function K(e) {
        return e[Si] || null;
      }
      function Pe(e) {
        return e[Ga] || null;
      }
      function qe(e) {
        return e[Wa] || null;
      }
      function nt(e, t) {
        const n = e[df] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${_e(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function _f(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || Q,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Cf(e.inputs, t),
          outputs: Cf(e.outputs),
        };
      }
      function Ef(e) {
        e.features?.forEach((t) => t(e));
      }
      function Mi(e, t) {
        if (!e) return null;
        const n = t ? qe : lC;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(cC);
      }
      const Ee = 0,
        _ = 1,
        B = 2,
        le = 3,
        vt = 4,
        Rn = 5,
        Fe = 6,
        rr = 7,
        he = 8,
        or = 9,
        xn = 10,
        V = 11,
        ao = 12,
        bf = 13,
        ir = 14,
        ye = 15,
        uo = 16,
        sr = 17,
        Rt = 18,
        lo = 19,
        If = 20,
        gn = 21,
        Zt = 22,
        Ti = 23,
        Ai = 24,
        W = 25,
        Qa = 1,
        Sf = 2,
        xt = 7,
        Ni = 8,
        ar = 9,
        xe = 11;
      function rt(e) {
        return Array.isArray(e) && "object" == typeof e[Qa];
      }
      function Ze(e) {
        return Array.isArray(e) && !0 === e[Qa];
      }
      function Ya(e) {
        return 0 != (4 & e.flags);
      }
      function On(e) {
        return e.componentOffset > -1;
      }
      function Ri(e) {
        return 1 == (1 & e.flags);
      }
      function Dt(e) {
        return !!e.template;
      }
      function Ka(e) {
        return 0 != (512 & e[B]);
      }
      function Pn(e, t) {
        return e.hasOwnProperty(qt) ? e[qt] : null;
      }
      let vC =
          oe.WeakRef ??
          class yC {
            constructor(t) {
              this.ref = t;
            }
            deref() {
              return this.ref;
            }
          },
        wC = 0,
        Ot = null,
        xi = !1;
      function Ae(e) {
        const t = Ot;
        return (Ot = e), t;
      }
      class Rf {
        constructor() {
          (this.id = wC++),
            (this.ref = (function DC(e) {
              return new vC(e);
            })(this)),
            (this.producers = new Map()),
            (this.consumers = new Map()),
            (this.trackingVersion = 0),
            (this.valueVersion = 0);
        }
        consumerPollProducersForChange() {
          for (const [t, n] of this.producers) {
            const r = n.producerNode.deref();
            if (void 0 !== r && n.atTrackingVersion === this.trackingVersion) {
              if (r.producerPollStatus(n.seenValueVersion)) return !0;
            } else this.producers.delete(t), r?.consumers.delete(this.id);
          }
          return !1;
        }
        producerMayHaveChanged() {
          const t = xi;
          xi = !0;
          try {
            for (const [n, r] of this.consumers) {
              const o = r.consumerNode.deref();
              void 0 !== o && o.trackingVersion === r.atTrackingVersion
                ? o.onConsumerDependencyMayHaveChanged()
                : (this.consumers.delete(n), o?.producers.delete(this.id));
            }
          } finally {
            xi = t;
          }
        }
        producerAccessed() {
          if (xi) throw new Error("");
          if (null === Ot) return;
          let t = Ot.producers.get(this.id);
          void 0 === t
            ? ((t = {
                consumerNode: Ot.ref,
                producerNode: this.ref,
                seenValueVersion: this.valueVersion,
                atTrackingVersion: Ot.trackingVersion,
              }),
              Ot.producers.set(this.id, t),
              this.consumers.set(Ot.id, t))
            : ((t.seenValueVersion = this.valueVersion),
              (t.atTrackingVersion = Ot.trackingVersion));
        }
        get hasProducers() {
          return this.producers.size > 0;
        }
        get producerUpdatesAllowed() {
          return !1 !== Ot?.consumerAllowSignalWrites;
        }
        producerPollStatus(t) {
          return (
            this.valueVersion !== t ||
            (this.onProducerUpdateValueVersion(), this.valueVersion !== t)
          );
        }
      }
      let xf = null;
      const Pf = () => {};
      class bC extends Rf {
        constructor(t, n, r) {
          super(),
            (this.watch = t),
            (this.schedule = n),
            (this.dirty = !1),
            (this.cleanupFn = Pf),
            (this.registerOnCleanup = (o) => {
              this.cleanupFn = o;
            }),
            (this.consumerAllowSignalWrites = r);
        }
        notify() {
          this.dirty || this.schedule(this), (this.dirty = !0);
        }
        onConsumerDependencyMayHaveChanged() {
          this.notify();
        }
        onProducerUpdateValueVersion() {}
        run() {
          if (
            ((this.dirty = !1),
            0 !== this.trackingVersion &&
              !this.consumerPollProducersForChange())
          )
            return;
          const t = Ae(this);
          this.trackingVersion++;
          try {
            this.cleanupFn(),
              (this.cleanupFn = Pf),
              this.watch(this.registerOnCleanup);
          } finally {
            Ae(t);
          }
        }
        cleanup() {
          this.cleanupFn();
        }
      }
      class IC {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Fn() {
        return Ff;
      }
      function Ff(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = MC), SC;
      }
      function SC() {
        const e = kf(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Wt) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function MC(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            kf(e) ||
            (function TC(e, t) {
              return (e[Lf] = t);
            })(e, { previous: Wt, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new IC(u && u.currentValue, t, a === Wt)), (e[r] = t);
      }
      Fn.ngInherit = !0;
      const Lf = "__ngSimpleChanges__";
      function kf(e) {
        return e[Lf] || null;
      }
      const Pt = function (e, t, n) {};
      function se(e) {
        for (; Array.isArray(e); ) e = e[Ee];
        return e;
      }
      function Qe(e, t) {
        return se(t[e.index]);
      }
      function $f(e, t) {
        return e.data[t];
      }
      function Ye(e, t) {
        const n = t[e];
        return rt(n) ? n : n[Ee];
      }
      function Li(e) {
        return 128 == (128 & e[B]);
      }
      function mn(e, t) {
        return null == t ? null : e[t];
      }
      function Bf(e) {
        e[sr] = 0;
      }
      function PC(e) {
        1024 & e[B] || ((e[B] |= 1024), Uf(e, 1));
      }
      function Hf(e) {
        1024 & e[B] && ((e[B] &= -1025), Uf(e, -1));
      }
      function Uf(e, t) {
        let n = e[le];
        if (null === n) return;
        n[Rn] += t;
        let r = n;
        for (
          n = n[le];
          null !== n && ((1 === t && 1 === r[Rn]) || (-1 === t && 0 === r[Rn]));

        )
          (n[Rn] += t), (r = n), (n = n[le]);
      }
      const P = {
        lFrame: eh(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function Wf() {
        return P.bindingsEnabled;
      }
      function v() {
        return P.lFrame.lView;
      }
      function q() {
        return P.lFrame.tView;
      }
      function Ln(e) {
        return (P.lFrame.contextLView = e), e[he];
      }
      function kn(e) {
        return (P.lFrame.contextLView = null), e;
      }
      function Oe() {
        let e = qf();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function qf() {
        return P.lFrame.currentTNode;
      }
      function Ft(e, t) {
        const n = P.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function ru() {
        return P.lFrame.isParent;
      }
      function cr() {
        return P.lFrame.bindingIndex++;
      }
      function WC(e, t) {
        const n = P.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), iu(t);
      }
      function iu(e) {
        P.lFrame.currentDirectiveIndex = e;
      }
      function au(e) {
        P.lFrame.currentQueryIndex = e;
      }
      function ZC(e) {
        const t = e[_];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[Fe] : null;
      }
      function Jf(e, t, n) {
        if (n & T.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & T.Host ||
              ((o = ZC(i)), null === o || ((i = i[ir]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (P.lFrame = Xf());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function uu(e) {
        const t = Xf(),
          n = e[_];
        (P.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Xf() {
        const e = P.lFrame,
          t = null === e ? null : e.child;
        return null === t ? eh(e) : t;
      }
      function eh(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function th() {
        const e = P.lFrame;
        return (
          (P.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const nh = th;
      function lu() {
        const e = th();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function $e() {
        return P.lFrame.selectedIndex;
      }
      function jn(e) {
        P.lFrame.selectedIndex = e;
      }
      function ae() {
        P.lFrame.currentNamespace = "svg";
      }
      function ue() {
        !(function JC() {
          P.lFrame.currentNamespace = null;
        })();
      }
      let oh = !0;
      function ki() {
        return oh;
      }
      function yn(e) {
        oh = e;
      }
      function ji(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks ??= []).push(-n, s),
            a &&
              ((e.contentHooks ??= []).push(n, a),
              (e.contentCheckHooks ??= []).push(n, a)),
            u && (e.viewHooks ??= []).push(-n, u),
            l &&
              ((e.viewHooks ??= []).push(n, l),
              (e.viewCheckHooks ??= []).push(n, l)),
            null != c && (e.destroyHooks ??= []).push(n, c);
        }
      }
      function Vi(e, t, n) {
        ih(e, t, 3, n);
      }
      function $i(e, t, n, r) {
        (3 & e[B]) === n && ih(e, t, n, r);
      }
      function cu(e, t) {
        let n = e[B];
        (3 & n) === t && ((n &= 4095), (n += 1), (e[B] = n));
      }
      function ih(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[sr] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[sr] += 65536),
              (a < i || -1 == i) &&
                (e_(e, n, t, u), (e[sr] = (4294901760 & e[sr]) + u + 2)),
              u++;
      }
      function sh(e, t) {
        Pt(4, e, t);
        const n = Ae(null);
        try {
          t.call(e);
        } finally {
          Ae(n), Pt(5, e, t);
        }
      }
      function e_(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        o
          ? e[B] >> 12 < e[sr] >> 16 &&
            (3 & e[B]) === t &&
            ((e[B] += 4096), sh(a, i))
          : sh(a, i);
      }
      const dr = -1;
      class ho {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function ah(e) {
        return e !== dr;
      }
      function Bi(e) {
        return 32767 & e;
      }
      function Hi(e, t) {
        let n = (function o_(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[ir]), n--;
        return r;
      }
      let fu = !0;
      function Ui(e) {
        const t = fu;
        return (fu = e), t;
      }
      const uh = 255,
        lh = 5;
      let i_ = 0;
      const Lt = {};
      function zi(e, t) {
        const n = ch(e, t);
        if (-1 !== n) return n;
        const r = t[_];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          hu(r.data, e),
          hu(t, null),
          hu(r.blueprint, null));
        const o = pu(e, t),
          i = e.injectorIndex;
        if (ah(o)) {
          const s = Bi(o),
            a = Hi(o, t),
            u = a[_].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function hu(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function ch(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function pu(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = vh(o)), null === r)) return dr;
          if ((n++, (o = o[ir]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return dr;
      }
      function gu(e, t, n) {
        !(function s_(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(io) && (r = n[io]),
            null == r && (r = n[io] = i_++);
          const o = r & uh;
          t.data[e + (o >> lh)] |= 1 << o;
        })(e, t, n);
      }
      function dh(e, t, n) {
        if (n & T.Optional || void 0 !== e) return e;
        Ci();
      }
      function fh(e, t, n, r) {
        if (
          (n & T.Optional && void 0 === r && (r = null),
          !(n & (T.Self | T.Host)))
        ) {
          const o = e[or],
            i = Ge(void 0);
          try {
            return o ? o.get(t, r, n & T.Optional) : uf(t, r, n & T.Optional);
          } finally {
            Ge(i);
          }
        }
        return dh(r, 0, n);
      }
      function hh(e, t, n, r = T.Default, o) {
        if (null !== e) {
          if (2048 & t[B] && !(r & T.Self)) {
            const s = (function d_(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 2048 & s[B] && !(512 & s[B]);

              ) {
                const a = ph(i, s, n, r | T.Self, Lt);
                if (a !== Lt) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[If];
                  if (l) {
                    const c = l.get(n, Lt, r);
                    if (c !== Lt) return c;
                  }
                  (u = vh(s)), (s = s[ir]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, Lt);
            if (s !== Lt) return s;
          }
          const i = ph(e, t, n, r, Lt);
          if (i !== Lt) return i;
        }
        return fh(t, n, r, o);
      }
      function ph(e, t, n, r, o) {
        const i = (function l_(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(io) ? e[io] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & uh : c_) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Jf(t, e, r)) return r & T.Host ? dh(o, 0, r) : fh(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & T.Optional) return s;
            Ci();
          } finally {
            nh();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = ch(e, t),
            u = dr,
            l = r & T.Host ? t[ye][Fe] : null;
          for (
            (-1 === a || r & T.SkipSelf) &&
            ((u = -1 === a ? pu(e, t) : t[a + 8]),
            u !== dr && mh(r, !1)
              ? ((s = t[_]), (a = Bi(u)), (t = Hi(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[_];
            if (gh(i, a, c.data)) {
              const d = u_(a, t, n, s, r, l);
              if (d !== Lt) return d;
            }
            (u = t[a + 8]),
              u !== dr && mh(r, t[_].data[a + 8] === l) && gh(i, a, t)
                ? ((s = c), (a = Bi(u)), (t = Hi(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function u_(e, t, n, r, o, i) {
        const s = t[_],
          a = s.data[e + 8],
          c = (function Gi(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && Dt(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? On(a) && fu : r != s && 0 != (3 & a.type),
            o & T.Host && i === a
          );
        return null !== c ? Vn(t, s, c, a) : Lt;
      }
      function Vn(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function t_(e) {
            return e instanceof ho;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function Fw(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new w(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function J(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : j(e);
              })(i[n])
            );
          const a = Ui(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? Ge(s.injectImpl) : null;
          Jf(e, r, T.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function XC(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = Ff(t);
                    (n.preOrderHooks ??= []).push(e, s),
                      (n.preOrderCheckHooks ??= []).push(e, s);
                  }
                  o && (n.preOrderHooks ??= []).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ??= []).push(e, i),
                      (n.preOrderCheckHooks ??= []).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && Ge(u), Ui(a), (s.resolving = !1), nh();
          }
        }
        return o;
      }
      function gh(e, t, n) {
        return !!(n[t + (e >> lh)] & (1 << e));
      }
      function mh(e, t) {
        return !(e & T.Self || (e & T.Host && t));
      }
      class fr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return hh(this._tNode, this._lView, t, Ii(r), n);
        }
      }
      function c_() {
        return new fr(Oe(), v());
      }
      function mu(e) {
        return Va(e)
          ? () => {
              const t = mu(k(e));
              return t && t();
            }
          : Pn(e);
      }
      function vh(e) {
        const t = e[_],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[Fe] : null;
      }
      const pr = "__parameters__";
      function mr(e, t, n) {
        return Gt(() => {
          const r = (function yu(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(pr)
                ? u[pr]
                : Object.defineProperty(u, pr, { value: [] })[pr];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      function mo(e, t) {
        e.forEach((n) => (Array.isArray(n) ? mo(n, t) : t(n)));
      }
      function wh(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function qi(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const Qi = oo(mr("Optional"), 8),
        Yi = oo(mr("SkipSelf"), 4);
      function es(e) {
        return 128 == (128 & e.flags);
      }
      var Ke = (() => (
        ((Ke = Ke || {})[(Ke.Important = 1)] = "Important"),
        (Ke[(Ke.DashCase = 2)] = "DashCase"),
        Ke
      ))();
      const bu = new Map();
      let $_ = 0;
      const Su = "__ngContext__";
      function Le(e, t) {
        rt(t)
          ? ((e[Su] = t[lo]),
            (function H_(e) {
              bu.set(e[lo], e);
            })(t))
          : (e[Su] = t);
      }
      let Mu;
      function Tu(e, t) {
        return Mu(e, t);
      }
      function wo(e) {
        const t = e[le];
        return Ze(t) ? t[le] : t;
      }
      function Au(e) {
        return $h(e[ao]);
      }
      function Nu(e) {
        return $h(e[vt]);
      }
      function $h(e) {
        for (; null !== e && !Ze(e); ) e = e[vt];
        return e;
      }
      function wr(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Ze(r) ? (i = r) : rt(r) && ((s = !0), (r = r[Ee]));
          const a = se(r);
          0 === e && null !== n
            ? null == o
              ? Gh(t, n, a)
              : $n(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? $n(t, n, a, o || null, !0)
            : 2 === e
            ? (function ss(e, t, n) {
                const r = os(e, t);
                r &&
                  (function aE(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function cE(e, t, n, r, o) {
                const i = n[xt];
                i !== se(n) && wr(t, e, r, i, o);
                for (let a = xe; a < n.length; a++) {
                  const u = n[a];
                  _o(u[_], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function rs(e, t, n) {
        return e.createElement(t, n);
      }
      function Hh(e, t) {
        const n = e[ar],
          r = n.indexOf(t);
        Hf(t), n.splice(r, 1);
      }
      function xu(e, t) {
        if (e.length <= xe) return;
        const n = xe + t,
          r = e[n];
        if (r) {
          const o = r[uo];
          null !== o && o !== e && Hh(o, r), t > 0 && (e[n - 1][vt] = r[vt]);
          const i = qi(e, xe + t);
          !(function X_(e, t) {
            _o(e, t, t[V], 2, null, null), (t[Ee] = null), (t[Fe] = null);
          })(r[_], r);
          const s = i[Rt];
          null !== s && s.detachView(i[_]),
            (r[le] = null),
            (r[vt] = null),
            (r[B] &= -129);
        }
        return r;
      }
      function Uh(e, t) {
        if (!(256 & t[B])) {
          const n = t[V];
          t[Ti]?.destroy(),
            t[Ai]?.destroy(),
            n.destroyNode && _o(e, t, n, 3, null, null),
            (function nE(e) {
              let t = e[ao];
              if (!t) return Ou(e[_], e);
              for (; t; ) {
                let n = null;
                if (rt(t)) n = t[ao];
                else {
                  const r = t[xe];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[vt] && t !== e; )
                    rt(t) && Ou(t[_], t), (t = t[le]);
                  null === t && (t = e), rt(t) && Ou(t[_], t), (n = t && t[vt]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Ou(e, t) {
        if (!(256 & t[B])) {
          (t[B] &= -129),
            (t[B] |= 256),
            (function sE(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof ho)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        Pt(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          Pt(5, a, u);
                        }
                      }
                    else {
                      Pt(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        Pt(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function iE(e, t) {
              const n = e.cleanup,
                r = t[rr];
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
                  } else n[i].call(r[n[i + 1]]);
              null !== r && (t[rr] = null);
              const o = t[gn];
              if (null !== o) {
                t[gn] = null;
                for (let i = 0; i < o.length; i++) (0, o[i])();
              }
            })(e, t),
            1 === t[_].type && t[V].destroy();
          const n = t[uo];
          if (null !== n && Ze(t[le])) {
            n !== t[le] && Hh(n, t);
            const r = t[Rt];
            null !== r && r.detachView(e);
          }
          !(function U_(e) {
            bu.delete(e[lo]);
          })(t);
        }
      }
      function Pu(e, t, n) {
        return (function zh(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[Ee];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === tt.None || i === tt.Emulated) return null;
            }
            return Qe(r, n);
          }
        })(e, t.parent, n);
      }
      function $n(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Gh(e, t, n) {
        e.appendChild(t, n);
      }
      function Wh(e, t, n, r, o) {
        null !== r ? $n(e, t, n, r, o) : Gh(e, t, n);
      }
      function os(e, t) {
        return e.parentNode(t);
      }
      let Fu,
        Vu,
        Qh = function Zh(e, t, n) {
          return 40 & e.type ? Qe(e, n) : null;
        };
      function is(e, t, n, r) {
        const o = Pu(e, r, t),
          i = t[V],
          a = (function qh(e, t, n) {
            return Qh(e, t, n);
          })(r.parent || t[Fe], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Wh(i, o, n[u], a, !1);
          else Wh(i, o, n, a, !1);
        void 0 !== Fu && Fu(i, r, t, n, o);
      }
      function Co(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Qe(t, e);
          if (4 & n) return Lu(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Co(e, r);
            {
              const o = e[t.index];
              return Ze(o) ? Lu(-1, o) : se(o);
            }
          }
          if (32 & n) return Tu(t, e)() || se(e[t.index]);
          {
            const r = Kh(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Co(wo(e[ye]), r)
              : Co(e, t.next);
          }
        }
        return null;
      }
      function Kh(e, t) {
        return null !== t ? e[ye][Fe].projection[t.projection] : null;
      }
      function Lu(e, t) {
        const n = xe + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[_].firstChild;
          if (null !== o) return Co(r, o);
        }
        return t[xt];
      }
      function ku(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && Le(se(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) ku(e, t, n.child, r, o, i, !1), wr(t, e, o, a, i);
            else if (32 & u) {
              const l = Tu(n, r);
              let c;
              for (; (c = l()); ) wr(t, e, o, c, i);
              wr(t, e, o, a, i);
            } else 16 & u ? Xh(e, t, r, n, o, i) : wr(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function _o(e, t, n, r, o, i) {
        ku(n, r, e.firstChild, t, o, i, !1);
      }
      function Xh(e, t, n, r, o, i) {
        const s = n[ye],
          u = s[Fe].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) wr(t, e, o, u[l], i);
        else {
          let l = u;
          const c = s[le];
          es(r) && (l.flags |= 128), ku(e, t, l, c, o, i, !0);
        }
      }
      function ep(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function tp(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && qa(e, t, r),
          null !== o && ep(e, t, o),
          null !== i &&
            (function fE(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      class M {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = O({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Mo = new M("ENVIRONMENT_INITIALIZER"),
        gp = new M("INJECTOR", -1),
        mp = new M("INJECTOR_DEF_TYPES");
      class yp {
        get(t, n = ro) {
          if (n === ro) {
            const r = new Error(`NullInjectorError: No provider for ${_e(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function VE(...e) {
        return { ɵproviders: Dp(0, e), ɵfromNgModule: !0 };
      }
      function Dp(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          mo(t, (i) => {
            const s = i;
            Gu(s, n, [], r) && ((o ||= []), o.push(s));
          }),
          void 0 !== o && wp(o, n),
          n
        );
      }
      function wp(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          Wu(o, (i) => {
            t.push(i);
          });
        }
      }
      function Gu(e, t, n, r) {
        if (!(e = k(e))) return !1;
        let o = null,
          i = rf(e);
        const s = !i && K(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = rf(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) Gu(l, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                mo(i.imports, (c) => {
                  Gu(c, t, n, r) && ((l ||= []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && wp(l, t);
            }
            if (!a) {
              const l = Pn(o) || (() => new o());
              t.push(
                { provide: o, useFactory: l, deps: Q },
                { provide: mp, useValue: o, multi: !0 },
                { provide: Mo, useValue: () => N(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              Wu(u, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function Wu(e, t) {
        for (let n of e)
          $a(n) && (n = n.ɵproviders), Array.isArray(n) ? Wu(n, t) : t(n);
      }
      const $E = ee({ provide: String, useValue: ee });
      function qu(e) {
        return null !== e && "object" == typeof e && $E in e;
      }
      function Bn(e) {
        return "function" == typeof e;
      }
      const Zu = new M("Set Injector scope."),
        cs = {},
        HE = {};
      let Qu;
      function ds() {
        return void 0 === Qu && (Qu = new yp()), Qu;
      }
      class Jt {}
      class Yu extends Jt {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Ju(t, (s) => this.processProvider(s)),
            this.records.set(gp, _r(void 0, this)),
            o.has("environment") && this.records.set(Jt, _r(void 0, this));
          const i = this.records.get(Zu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(mp.multi, Q, T.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const n of t) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = pn(this),
            r = Ge(void 0);
          try {
            return t();
          } finally {
            pn(n), Ge(r);
          }
        }
        get(t, n = ro, r = T.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(ff)))
            return t[ff](this);
          r = Ii(r);
          const o = pn(this),
            i = Ge(void 0);
          try {
            if (!(r & T.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function qE(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof M)
                    );
                  })(t) && _i(t);
                (a = u && this.injectableDefInScope(u) ? _r(Ku(t), cs) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & T.Self ? ds() : this.parent).get(
              t,
              (n = r & T.Optional && n === ro ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[bi] = s[bi] || []).unshift(_e(t)), o)) throw s;
              return (function Qw(e, t, n, r) {
                const o = e[bi];
                throw (
                  (t[lf] && o.unshift(t[lf]),
                  (e.message = (function Yw(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = _e(t);
                    if (Array.isArray(t)) o = t.map(_e).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : _e(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      zw,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[bi] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            Ge(i), pn(o);
          }
        }
        resolveInjectorInitializers() {
          const t = pn(this),
            n = Ge(void 0);
          try {
            const r = this.get(Mo.multi, Q, T.Self);
            for (const o of r) o();
          } finally {
            pn(t), Ge(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(_e(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new w(205, !1);
        }
        processProvider(t) {
          let n = Bn((t = k(t))) ? t : k(t && t.provide);
          const r = (function zE(e) {
            return qu(e)
              ? _r(void 0, e.useValue)
              : _r(
                  (function Ep(e, t, n) {
                    let r;
                    if (Bn(e)) {
                      const o = k(e);
                      return Pn(o) || Ku(o);
                    }
                    if (qu(e)) r = () => k(e.useValue);
                    else if (
                      (function _p(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...za(e.deps || []));
                    else if (
                      (function Cp(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => N(k(e.useExisting));
                    else {
                      const o = k(e && (e.useClass || e.provide));
                      if (
                        !(function GE(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return Pn(o) || Ku(o);
                      r = () => new o(...za(e.deps));
                    }
                    return r;
                  })(e),
                  cs
                );
          })(t);
          if (Bn(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = _r(void 0, cs, !0)),
              (o.factory = () => za(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === cs && ((n.value = HE), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function WE(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = k(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function Ku(e) {
        const t = _i(e),
          n = null !== t ? t.factory : Pn(e);
        if (null !== n) return n;
        if (e instanceof M) throw new w(204, !1);
        if (e instanceof Function)
          return (function UE(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function yo(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new w(204, !1))
              );
            const n = (function Bw(e) {
              return (e && (e[Ei] || e[sf])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new w(204, !1);
      }
      function _r(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function Ju(e, t) {
        for (const n of e)
          Array.isArray(n) ? Ju(n, t) : n && $a(n) ? Ju(n.ɵproviders, t) : t(n);
      }
      const fs = new M("AppId", { providedIn: "root", factory: () => ZE }),
        ZE = "ng",
        bp = new M("Platform Initializer"),
        Er = new M("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        Ip = new M("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function Eo() {
              if (void 0 !== Vu) return Vu;
              if (typeof document < "u") return document;
              throw new w(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let Mp = (e, t) => null;
      function Tp(e, t) {
        return Mp(e, t);
      }
      class r1 {}
      class Rp {}
      class i1 {
        resolveComponentFactory(t) {
          throw (function o1(e) {
            const t = Error(`No component factory found for ${_e(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let ys = (() => {
        class e {}
        return (e.NULL = new i1()), e;
      })();
      function s1() {
        return br(Oe(), v());
      }
      function br(e, t) {
        return new Dn(Qe(e, t));
      }
      let Dn = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = s1), e;
      })();
      class Op {}
      let l1 = (() => {
        class e {}
        return (
          (e.ɵprov = O({ token: e, providedIn: "root", factory: () => null })),
          e
        );
      })();
      class Ds {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const c1 = new Ds("16.0.5"),
        ll = {};
      function Ro(e) {
        for (; e; ) {
          e[B] |= 64;
          const t = wo(e);
          if (Ka(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function cl(e) {
        return e.ngOriginalError;
      }
      class Hn {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && cl(t);
          for (; n && cl(n); ) n = cl(n);
          return n || null;
        }
      }
      const Lp = new M("", { providedIn: "root", factory: () => !1 });
      function Xt(e) {
        return e instanceof Function ? e() : e;
      }
      class Bp extends Rf {
        constructor() {
          super(...arguments),
            (this.consumerAllowSignalWrites = !1),
            (this._lView = null);
        }
        set lView(t) {
          this._lView = t;
        }
        onConsumerDependencyMayHaveChanged() {
          Ro(this._lView);
        }
        onProducerUpdateValueVersion() {}
        get hasReadASignal() {
          return this.hasProducers;
        }
        runInContext(t, n, r) {
          const o = Ae(this);
          this.trackingVersion++;
          try {
            t(n, r);
          } finally {
            Ae(o);
          }
        }
        destroy() {
          this.trackingVersion++;
        }
      }
      let Cs = null;
      function Hp() {
        return (Cs ??= new Bp()), Cs;
      }
      function Up(e, t) {
        return e[t] ?? Hp();
      }
      function zp(e, t) {
        const n = Hp();
        n.hasReadASignal && ((e[t] = Cs), (n.lView = e), (Cs = new Bp()));
      }
      const $ = {};
      function wn(e) {
        Gp(q(), v(), $e() + e, !1);
      }
      function Gp(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[B])) {
            const i = e.preOrderCheckHooks;
            null !== i && Vi(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && $i(t, i, 0, n);
          }
        jn(n);
      }
      function Qp(e, t = null, n = null, r) {
        const o = Yp(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Yp(e, t = null, n = null, r, o = new Set()) {
        const i = [n || Q, VE(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : _e(e))),
          new Yu(i, t || ds(), r || null, o)
        );
      }
      let en = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Qp({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return Qp({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = ro),
          (e.NULL = new yp()),
          (e.ɵprov = O({ token: e, providedIn: "any", factory: () => N(gp) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function R(e, t = T.Default) {
        const n = v();
        return null === n ? N(e, t) : hh(Oe(), n, k(e), t);
      }
      function _s(e, t, n, r, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice();
        return (
          (d[Ee] = o),
          (d[B] = 140 | r),
          (null !== l || (e && 2048 & e[B])) && (d[B] |= 2048),
          Bf(d),
          (d[le] = d[ir] = e),
          (d[he] = n),
          (d[xn] = s || (e && e[xn])),
          (d[V] = a || (e && e[V])),
          (d[or] = u || (e && e[or]) || null),
          (d[Fe] = i),
          (d[lo] = (function B_() {
            return $_++;
          })()),
          (d[Zt] = c),
          (d[If] = l),
          (d[ye] = 2 == t.type ? e[ye] : d),
          d
        );
      }
      function Sr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function dl(e, t, n, r, o) {
            const i = qf(),
              s = ru(),
              u = (e.data[t] = (function R1(e, t, n, r, o, i) {
                let s = t ? t.injectorIndex : -1,
                  a = 0;
                return (
                  (function lr() {
                    return null !== P.skipHydrationRootTNode;
                  })() && (a |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: o,
                    attrs: i,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function GC() {
              return P.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function fo() {
            const e = P.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Ft(i, !0), i;
      }
      function xo(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Jp(e, t, n, r, o) {
        const i = Up(t, Ti),
          s = $e(),
          a = 2 & r;
        try {
          if (
            (jn(-1), a && t.length > W && Gp(e, t, W, !1), Pt(a ? 2 : 0, o), a)
          )
            i.runInContext(n, r, o);
          else {
            const l = Ae(null);
            try {
              n(r, o);
            } finally {
              Ae(l);
            }
          }
        } finally {
          a && null === t[Ti] && zp(t, Ti), jn(s), Pt(a ? 3 : 1, o);
        }
      }
      function fl(e, t, n) {
        if (Ya(t)) {
          const r = Ae(null);
          try {
            const i = t.directiveEnd;
            for (let s = t.directiveStart; s < i; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, n[s], s);
            }
          } finally {
            Ae(r);
          }
        }
      }
      function hl(e, t, n) {
        Wf() &&
          ((function j1(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            On(n) &&
              (function G1(e, t, n) {
                const r = Qe(t, e),
                  s = Es(
                    e,
                    _s(
                      e,
                      Xp(n),
                      null,
                      n.onPush ? 64 : 16,
                      r,
                      t,
                      null,
                      e[xn].rendererFactory.createRenderer(r, n),
                      null,
                      null,
                      null
                    )
                  );
                e[t.index] = s;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || zi(n, t),
              Le(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = Vn(t, e, a, n);
              Le(l, t),
                null !== s && W1(0, a - o, l, u, 0, s),
                Dt(u) && (Ye(n.index, t)[he] = Vn(t, e, a, n));
            }
          })(e, t, n, Qe(n, t)),
          64 == (64 & n.flags) && og(e, t, n));
      }
      function pl(e, t, n = Qe) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function Xp(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = gl(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t;
      }
      function gl(e, t, n, r, o, i, s, a, u, l, c) {
        const d = W + r,
          f = d + o,
          h = (function I1(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : $);
            return n;
          })(d, f),
          p = "function" == typeof l ? l() : l;
        return (h[_] = {
          type: e,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: c,
        });
      }
      let eg = (e) => null;
      function tg(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? ng(n, t, o, i)
              : r.hasOwnProperty(o) && ng(n, t, r[o], i);
          }
        return n;
      }
      function ng(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function ml(e, t, n, r) {
        if (Wf()) {
          const o = null === r ? null : { "": -1 },
            i = (function $1(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (Df(t, s.selectors, !1))
                    if ((r || (r = []), Dt(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          yl(e, t, a.length);
                      } else r.unshift(s), yl(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && rg(e, t, n, s, o, a),
            o &&
              (function B1(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new w(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = so(n.mergedAttrs, n.attrs);
      }
      function rg(e, t, n, r, o, i) {
        for (let l = 0; l < r.length; l++) gu(zi(n, t), e, r[l].type);
        !(function U1(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          u = xo(e, t, r.length, null);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          (n.mergedAttrs = so(n.mergedAttrs, c.hostAttrs)),
            z1(e, n, t, u, c),
            H1(u, c, o),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            u++;
        }
        !(function x1(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            l = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = tg(d.inputs, c, u, f ? f.inputs : null)),
              (l = tg(d.outputs, c, l, p));
            const g = null === u || null === s || vf(t) ? null : q1(u, c, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = l);
        })(e, n, i);
      }
      function og(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function qC() {
            return P.lFrame.currentDirectiveIndex;
          })();
        try {
          jn(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              l = t[a];
            iu(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                V1(u, l);
          }
        } finally {
          jn(-1), iu(s);
        }
      }
      function V1(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function yl(e, t, n) {
        (t.componentOffset = n), (e.components ??= []).push(t.index);
      }
      function H1(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Dt(t) && (n[""] = e);
        }
      }
      function z1(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Pn(o.type)),
          s = new ho(i, Dt(o), R);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function L1(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function k1(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, xo(e, n, o.hostVars, $), o);
      }
      function W1(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s)
          for (let a = 0; a < s.length; ) ig(r, n, s[a++], s[a++], s[a++]);
      }
      function ig(e, t, n, r, o) {
        const i = Ae(null);
        try {
          null !== e.setInput ? e.setInput(t, o, n, r) : (t[r] = o);
        } finally {
          Ae(i);
        }
      }
      function q1(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function sg(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null, null];
      }
      function ag(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              au(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Es(e, t) {
        return e[ao] ? (e[bf][vt] = t) : (e[ao] = t), (e[bf] = t), t;
      }
      function Dl(e, t, n) {
        au(0);
        const r = Ae(null);
        try {
          t(e, n);
        } finally {
          Ae(r);
        }
      }
      function dg(e, t) {
        const n = e[or],
          r = n ? n.get(Hn, null) : null;
        r && r.handleError(t);
      }
      function wl(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++];
          ig(e.data[s], t[s], r, a, o);
        }
      }
      function tn(e, t, n) {
        const r = (function Fi(e, t) {
          return se(t[e]);
        })(t, e);
        !(function Bh(e, t, n) {
          e.setValue(t, n);
        })(e[V], r, n);
      }
      function Z1(e, t) {
        const n = Ye(t, e),
          r = n[_];
        !(function Q1(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n);
        const o = n[Ee];
        null !== o && null === n[Zt] && (n[Zt] = Tp(o, n[or])), Cl(r, n, n[he]);
      }
      function Cl(e, t, n) {
        uu(t);
        try {
          const r = e.viewQuery;
          null !== r && Dl(1, r, n);
          const o = e.template;
          null !== o && Jp(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && ag(e, t),
            e.staticViewQueries && Dl(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function Y1(e, t) {
              for (let n = 0; n < t.length; n++) Z1(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[B] &= -5), lu();
        }
      }
      let fg = (() => {
        class e {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(n, r, o) {
            const i = typeof Zone > "u" ? null : Zone.current,
              s = new bC(
                n,
                (l) => {
                  this.all.has(l) && this.queue.set(l, i);
                },
                o
              );
            let a;
            this.all.add(s), s.notify();
            const u = () => {
              s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s);
            };
            return (a = r?.onDestroy(u)), { destroy: u };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [n, r] of this.queue)
                this.queue.delete(n), r ? r.run(() => n.run()) : n.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
        }
        return (
          (e.ɵprov = O({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          })),
          e
        );
      })();
      function bs(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = ka(o, a))
              : 2 == i && (r = ka(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Oo(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(se(i)), Ze(i))) {
            for (let a = xe; a < i.length; a++) {
              const u = i[a],
                l = u[_].firstChild;
              null !== l && Oo(u[_], u, l, r);
            }
            i[xt] !== i[Ee] && r.push(i[xt]);
          }
          const s = n.type;
          if (8 & s) Oo(e, t, n.child, r);
          else if (32 & s) {
            const a = Tu(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = Kh(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = wo(t[ye]);
              Oo(u[_], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      function Is(e, t, n, r = !0) {
        const o = t[xn].rendererFactory;
        o.begin && o.begin();
        try {
          Ss(e, t, e.template, n);
        } catch (s) {
          throw (r && dg(t, s), s);
        } finally {
          o.end && o.end(), t[xn].effectManager?.flush();
        }
      }
      function Ss(e, t, n, r) {
        const o = t[B];
        if (256 != (256 & o)) {
          t[xn].effectManager?.flush(), uu(t);
          try {
            Bf(t),
              (function Qf(e) {
                return (P.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Jp(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && Vi(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && $i(t, l, 0, null), cu(t, 0);
            }
            if (
              ((function nb(e) {
                for (let t = Au(e); null !== t; t = Nu(t)) {
                  if (!t[Sf]) continue;
                  const n = t[ar];
                  for (let r = 0; r < n.length; r++) {
                    PC(n[r]);
                  }
                }
              })(t),
              (function tb(e) {
                for (let t = Au(e); null !== t; t = Nu(t))
                  for (let n = xe; n < t.length; n++) {
                    const r = t[n],
                      o = r[_];
                    Li(r) && Ss(o, r, o.template, r[he]);
                  }
              })(t),
              null !== e.contentQueries && ag(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && Vi(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && $i(t, l, 1), cu(t, 1);
            }
            !(function b1(e, t) {
              const n = e.hostBindingOpCodes;
              if (null === n) return;
              const r = Up(t, Ai);
              try {
                for (let o = 0; o < n.length; o++) {
                  const i = n[o];
                  if (i < 0) jn(~i);
                  else {
                    const s = i,
                      a = n[++o],
                      u = n[++o];
                    WC(a, s), r.runInContext(u, 2, t[s]);
                  }
                }
              } finally {
                null === t[Ai] && zp(t, Ai), jn(-1);
              }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function ob(e, t) {
                for (let n = 0; n < t.length; n++) rb(e, t[n]);
              })(t, a);
            const u = e.viewQuery;
            if ((null !== u && Dl(2, u, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && Vi(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && $i(t, l, 2), cu(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[B] &= -73),
              Hf(t);
          } finally {
            lu();
          }
        }
      }
      function rb(e, t) {
        const n = Ye(t, e);
        if (Li(n)) {
          const r = n[_];
          80 & n[B] ? Ss(r, n, r.template, n[he]) : n[Rn] > 0 && _l(n);
        }
      }
      function _l(e) {
        for (let r = Au(e); null !== r; r = Nu(r))
          for (let o = xe; o < r.length; o++) {
            const i = r[o];
            if (Li(i))
              if (1024 & i[B]) {
                const s = i[_];
                Ss(s, i, s.template, i[he]);
              } else i[Rn] > 0 && _l(i);
          }
        const n = e[_].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = Ye(n[r], e);
            Li(o) && o[Rn] > 0 && _l(o);
          }
      }
      class Po {
        get rootNodes() {
          const t = this._lView,
            n = t[_];
          return Oo(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[he];
        }
        set context(t) {
          this._lView[he] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[B]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[le];
            if (Ze(t)) {
              const n = t[Ni],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (xu(t, r), qi(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Uh(this._lView[_], this._lView);
        }
        onDestroy(t) {
          !(function zf(e, t) {
            if (256 == (256 & e[B])) throw new w(911, !1);
            null === e[gn] && (e[gn] = []), e[gn].push(t);
          })(this._lView, t);
        }
        markForCheck() {
          Ro(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[B] &= -129;
        }
        reattach() {
          this._lView[B] |= 128;
        }
        detectChanges() {
          Is(this._lView[_], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new w(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function tE(e, t) {
              _o(e, t, t[V], 2, null, null);
            })(this._lView[_], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new w(902, !1);
          this._appRef = t;
        }
      }
      class ib extends Po {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Is(t[_], t, t[he], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class hg extends ys {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = K(t);
          return new Fo(n, this.ngModule);
        }
      }
      function pg(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class ab {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Ii(r);
          const o = this.injector.get(t, ll, r);
          return o !== ll || n === ll ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Fo extends Rp {
        get inputs() {
          return pg(this.componentDef.inputs);
        }
        get outputs() {
          return pg(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function sC(e) {
              return e.map(iC).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof Jt ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new ab(t, i) : t,
            a = s.get(Op, null);
          if (null === a) throw new w(407, !1);
          const c = {
              rendererFactory: a,
              sanitizer: s.get(l1, null),
              effectManager: s.get(fg, null),
            },
            d = a.createRenderer(null, this.componentDef),
            f = this.componentDef.selectors[0][0] || "div",
            h = r
              ? (function S1(e, t, n, r) {
                  const i = r.get(Lp, !1) || n === tt.ShadowDom,
                    s = e.selectRootElement(t, i);
                  return (
                    (function M1(e) {
                      eg(e);
                    })(s),
                    s
                  );
                })(d, r, this.componentDef.encapsulation, s)
              : rs(
                  d,
                  f,
                  (function sb(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(f)
                ),
            p = this.componentDef.onPush ? 576 : 528,
            g = gl(0, null, null, 1, 0, null, null, null, null, null, null),
            y = _s(null, g, null, p, null, null, c, d, s, null, null);
          let D, m;
          uu(y);
          try {
            const I = this.componentDef;
            let F,
              G = null;
            I.findHostDirectiveDefs
              ? ((F = []),
                (G = new Map()),
                I.findHostDirectiveDefs(I, F, G),
                F.push(I))
              : (F = [I]);
            const Mt = (function lb(e, t) {
                const n = e[_],
                  r = W;
                return (e[r] = t), Sr(n, r, 2, "#host", null);
              })(y, h),
              F0 = (function cb(e, t, n, r, o, i, s) {
                const a = o[_];
                !(function db(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = so(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (bs(t, t.mergedAttrs, !0), null !== n && tp(r, n, t));
                })(r, e, t, s);
                let u = null;
                null !== t && (u = Tp(t, o[or]));
                const l = i.rendererFactory.createRenderer(t, n),
                  c = _s(
                    o,
                    Xp(n),
                    null,
                    n.onPush ? 64 : 16,
                    o[e.index],
                    e,
                    i,
                    l,
                    null,
                    null,
                    u
                  );
                return (
                  a.firstCreatePass && yl(a, e, r.length - 1),
                  Es(o, c),
                  (o[e.index] = c)
                );
              })(Mt, h, I, F, y, c, d);
            (m = $f(g, W)),
              h &&
                (function hb(e, t, n, r) {
                  if (r) qa(e, n, ["ng-version", c1.full]);
                  else {
                    const { attrs: o, classes: i } = (function aC(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!yt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && qa(e, n, o),
                      i && i.length > 0 && ep(e, n, i.join(" "));
                  }
                })(d, I, h, r),
              void 0 !== n &&
                (function pb(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(m, this.ngContentSelectors, n),
              (D = (function fb(e, t, n, r, o, i) {
                const s = Oe(),
                  a = o[_],
                  u = Qe(s, o);
                rg(a, o, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  Le(Vn(o, a, s.directiveStart + c, s), o);
                og(a, o, s), u && Le(u, o);
                const l = Vn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[he] = o[he] = l), null !== i))
                  for (const c of i) c(l, t);
                return fl(a, s, e), l;
              })(F0, I, F, G, y, [gb])),
              Cl(g, y, null);
          } finally {
            lu();
          }
          return new ub(this.componentType, D, br(m, y), y, m);
        }
      }
      class ub extends r1 {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new ib(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), n))
            )
              return;
            const i = this._rootLView;
            wl(i[_], i, o, t, n),
              this.previousInputValues.set(t, n),
              Ro(Ye(this._tNode.index, i));
          }
        }
        get injector() {
          return new fr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function gb() {
        const e = Oe();
        ji(v()[_], e);
      }
      function ke(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function zn(e, t, n, r, o, i, s, a) {
        const u = v(),
          l = q(),
          c = e + W,
          d = l.firstCreatePass
            ? (function zb(e, t, n, r, o, i, s, a, u) {
                const l = t.consts,
                  c = Sr(t, e, 4, s || null, mn(l, a));
                ml(t, n, c, mn(l, u)), ji(t, c);
                const d = (c.tView = gl(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  l,
                  null
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, l, u, t, n, r, o, i, s)
            : l.data[c];
        Ft(d, !1);
        const f = xg(l, u, d, e);
        ki() && is(l, u, f, d),
          Le(f, u),
          Es(u, (u[c] = sg(f, u, f, d))),
          Ri(d) && hl(l, u, d),
          null != s && pl(u, d, a);
      }
      let xg = function Og(e, t, n, r) {
        return yn(!0), t[V].createComment("");
      };
      function Cn(e) {
        return (function ur(e, t) {
          return e[t];
        })(
          (function zC() {
            return P.lFrame.contextLView;
          })(),
          W + e
        );
      }
      function _n(e, t, n) {
        const r = v();
        return (
          ke(r, cr(), t) &&
            (function it(e, t, n, r, o, i, s, a) {
              const u = Qe(t, n);
              let c,
                l = t.inputs;
              !a && null != l && (c = l[r])
                ? (wl(e, n, c, r, o),
                  On(t) &&
                    (function P1(e, t) {
                      const n = Ye(t, e);
                      16 & n[B] || (n[B] |= 64);
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function O1(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  i.setProperty(u, r, o));
            })(
              q(),
              (function ce() {
                const e = P.lFrame;
                return $f(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[V],
              n,
              !1
            ),
          _n
        );
      }
      function Rl(e, t, n, r, o) {
        const s = o ? "class" : "style";
        wl(e, n, t.inputs[s], s, r);
      }
      function C(e, t, n, r) {
        const o = v(),
          i = q(),
          s = W + e,
          a = o[V],
          u = i.firstCreatePass
            ? (function Zb(e, t, n, r, o, i) {
                const s = t.consts,
                  u = Sr(t, e, 2, r, mn(s, o));
                return (
                  ml(t, n, u, mn(s, i)),
                  null !== u.attrs && bs(u, u.attrs, !1),
                  null !== u.mergedAttrs && bs(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          l = Pg(i, o, u, a, t, e);
        o[s] = l;
        const c = Ri(u);
        return (
          Ft(u, !0),
          tp(a, l, u),
          32 != (32 & u.flags) && ki() && is(i, o, l, u),
          0 ===
            (function LC() {
              return P.lFrame.elementDepthCount;
            })() && Le(l, o),
          (function kC() {
            P.lFrame.elementDepthCount++;
          })(),
          c && (hl(i, o, u), fl(i, u, o)),
          null !== r && pl(o, u),
          C
        );
      }
      function S() {
        let e = Oe();
        ru()
          ? (function ou() {
              P.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Ft(e, !1));
        const t = e;
        (function VC(e) {
          return P.skipHydrationRootTNode === e;
        })(t) &&
          (function UC() {
            P.skipHydrationRootTNode = null;
          })(),
          (function jC() {
            P.lFrame.elementDepthCount--;
          })();
        const n = q();
        return (
          n.firstCreatePass && (ji(n, e), Ya(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function n_(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            Rl(n, t, v(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function r_(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Rl(n, t, v(), t.stylesWithoutHost, !1),
          S
        );
      }
      function Z(e, t, n, r) {
        return C(e, t, n, r), S(), Z;
      }
      let Pg = (e, t, n, r, o, i) => (
        yn(!0),
        rs(
          r,
          o,
          (function rh() {
            return P.lFrame.currentNamespace;
          })()
        )
      );
      function xs(e) {
        return !!e && "function" == typeof e.then;
      }
      function jg(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function nn(e, t, n, r) {
        const o = v(),
          i = q(),
          s = Oe();
        return (
          (function $g(e, t, n, r, o, i, s) {
            const a = Ri(r),
              l =
                e.firstCreatePass &&
                (function lg(e) {
                  return e.cleanup || (e.cleanup = []);
                })(e),
              c = t[he],
              d = (function ug(e) {
                return e[rr] || (e[rr] = []);
              })(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = Qe(r, t),
                y = s ? s(g) : g,
                D = d.length,
                m = s ? (F) => s(se(F[r.index])) : r.index;
              let I = null;
              if (
                (!s &&
                  a &&
                  (I = (function eI(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[rr],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== I)
              )
                ((I.__ngLastListenerFn__ || I).__ngNextListenerFn__ = i),
                  (I.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = Hg(r, t, c, i, !1);
                const F = n.listen(y, o, i);
                d.push(i, F), l && l.push(o, m, D, D + 1);
              }
            } else i = Hg(r, t, c, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let y = 0; y < g; y += 2) {
                  const G = t[p[y]][p[y + 1]].subscribe(i),
                    Mt = d.length;
                  d.push(i, G), l && l.push(o, r.index, Mt, -(Mt + 1));
                }
            }
          })(i, o, o[V], s, e, t, r),
          nn
        );
      }
      function Bg(e, t, n, r) {
        try {
          return Pt(6, t, n), !1 !== n(r);
        } catch (o) {
          return dg(e, o), !1;
        } finally {
          Pt(7, t, n);
        }
      }
      function Hg(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          Ro(e.componentOffset > -1 ? Ye(e.index, t) : t);
          let u = Bg(t, n, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = Bg(t, n, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && s.preventDefault(), u;
        };
      }
      function Y(e, t = "") {
        const n = v(),
          r = q(),
          o = e + W,
          i = r.firstCreatePass ? Sr(r, o, 1, t, null) : r.data[o],
          s = hm(r, n, i, t, e);
        (n[o] = s), ki() && is(r, n, s, i), Ft(i, !1);
      }
      let hm = (e, t, n, r, o) => (
        yn(!0),
        (function ns(e, t) {
          return e.createText(t);
        })(t[V], r)
      );
      function Fs(e, t, n) {
        const r = v(),
          o = (function Tr(e, t, n, r) {
            return ke(e, cr(), n) ? t + j(n) + r : $;
          })(r, e, t, n);
        return o !== $ && tn(r, $e(), o), Fs;
      }
      const jr = "en-US";
      let Lm = jr;
      class Vr {}
      class uy {}
      class Gl extends Vr {
        constructor(t, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new hg(this));
          const o = nt(t);
          (this._bootstrapComponents = Xt(o.bootstrap)),
            (this._r3Injector = Yp(
              t,
              n,
              [
                { provide: Vr, useValue: this },
                { provide: ys, useValue: this.componentFactoryResolver },
                ...r,
              ],
              _e(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Wl extends uy {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Gl(this.moduleType, t, []);
        }
      }
      class ly extends Vr {
        constructor(t) {
          super(),
            (this.componentFactoryResolver = new hg(this)),
            (this.instance = null);
          const n = new Yu(
            [
              ...t.providers,
              { provide: Vr, useValue: this },
              { provide: ys, useValue: this.componentFactoryResolver },
            ],
            t.parent || ds(),
            t.debugName,
            new Set(["environment"])
          );
          (this.injector = n),
            t.runEnvironmentInitializers && n.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function ql(e, t, n = null) {
        return new ly({
          providers: e,
          parent: t,
          debugName: n,
          runEnvironmentInitializers: !0,
        }).injector;
      }
      let YS = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = Dp(0, n.type),
                o =
                  r.length > 0
                    ? ql([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = O({
            token: e,
            providedIn: "environment",
            factory: () => new e(N(Jt)),
          })),
          e
        );
      })();
      function cy(e) {
        e.getStandaloneInjector = (t) =>
          t.get(YS).getOrCreateStandaloneInjector(e);
      }
      function Ql(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const He = class _M extends Ut {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = Ql(i)), o && (o = Ql(o)), s && (s = Ql(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof at && t.add(a), a;
        }
      };
      let rn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = SM), e;
      })();
      const bM = rn,
        IM = class extends bM {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n, null);
          }
          createEmbeddedViewImpl(t, n, r) {
            const o = this._declarationTContainer.tView,
              i = _s(
                this._declarationLView,
                o,
                t,
                16,
                null,
                o.declTNode,
                null,
                null,
                null,
                n || null,
                r || null
              );
            i[uo] = this._declarationLView[this._declarationTContainer.index];
            const a = this._declarationLView[Rt];
            return (
              null !== a && (i[Rt] = a.createEmbeddedView(o)),
              Cl(o, i, t),
              new Po(i)
            );
          }
        };
      function SM() {
        return (function $s(e, t) {
          return 4 & e.type ? new IM(t, e, br(e, t)) : null;
        })(Oe(), v());
      }
      let _t = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = OM), e;
      })();
      function OM() {
        return (function My(e, t) {
          let n;
          const r = t[e.index];
          return (
            Ze(r)
              ? (n = r)
              : ((n = sg(r, t, null, e)), (t[e.index] = n), Es(t, n)),
            Ty(n, t, e, r),
            new Iy(n, e, t)
          );
        })(Oe(), v());
      }
      const PM = _t,
        Iy = class extends PM {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return br(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new fr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = pu(this._hostTNode, this._hostLView);
            if (ah(t)) {
              const n = Hi(t, this._hostLView),
                r = Bi(t);
              return new fr(n[_].data[r + 8], n);
            }
            return new fr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = Sy(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - xe;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const a = t.createEmbeddedViewImpl(n || {}, i, null);
            return this.insertImpl(a, o, false), a;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function go(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const g = n || {};
              (a = g.index),
                (r = g.injector),
                (o = g.projectableNodes),
                (i = g.environmentInjector || g.ngModuleRef);
            }
            const u = s ? t : new Fo(K(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const y = (s ? l : this.parentInjector).get(Jt, null);
              y && (i = y);
            }
            K(u.componentType ?? {});
            const h = u.create(l, o, null, i);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(t, n) {
            return this.insertImpl(t, n, !1);
          }
          insertImpl(t, n, r) {
            const o = t._lView,
              i = o[_];
            if (
              (function OC(e) {
                return Ze(e[le]);
              })(o)
            ) {
              const u = this.indexOf(t);
              if (-1 !== u) this.detach(u);
              else {
                const l = o[le],
                  c = new Iy(l, l[Fe], l[le]);
                c.detach(c.indexOf(t));
              }
            }
            const s = this._adjustIndex(n),
              a = this._lContainer;
            if (
              ((function rE(e, t, n, r) {
                const o = xe + r,
                  i = n.length;
                r > 0 && (n[o - 1][vt] = t),
                  r < i - xe
                    ? ((t[vt] = n[o]), wh(n, xe + r, t))
                    : (n.push(t), (t[vt] = null)),
                  (t[le] = n);
                const s = t[uo];
                null !== s &&
                  n !== s &&
                  (function oE(e, t) {
                    const n = e[ar];
                    t[ye] !== t[le][le][ye] && (e[Sf] = !0),
                      null === n ? (e[ar] = [t]) : n.push(t);
                  })(s, t);
                const a = t[Rt];
                null !== a && a.insertView(e), (t[B] |= 128);
              })(i, o, a, s),
              !r)
            ) {
              const u = Lu(s, a),
                l = o[V],
                c = os(l, a[xt]);
              null !== c &&
                (function eE(e, t, n, r, o, i) {
                  (r[Ee] = o), (r[Fe] = t), _o(e, r, n, 1, o, i);
                })(i, a[Fe], l, o, c, u);
            }
            return t.attachToViewContainerRef(), wh(Jl(a), s, t), t;
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = Sy(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = xu(this._lContainer, n);
            r && (qi(Jl(this._lContainer), n), Uh(r[_], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = xu(this._lContainer, n);
            return r && null != qi(Jl(this._lContainer), n) ? new Po(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function Sy(e) {
        return e[Ni];
      }
      function Jl(e) {
        return e[Ni] || (e[Ni] = []);
      }
      let Ty = function Ay(e, t, n, r) {
        if (e[xt]) return;
        let o;
        (o =
          8 & n.type
            ? se(r)
            : (function FM(e, t) {
                const n = e[V],
                  r = n.createComment(""),
                  o = Qe(t, e);
                return (
                  $n(
                    n,
                    os(n, o),
                    r,
                    (function uE(e, t) {
                      return e.nextSibling(t);
                    })(n, o),
                    !1
                  ),
                  r
                );
              })(t, n)),
          (e[xt] = o);
      };
      const lc = new M("Application Initializer");
      let cc = (() => {
          class e {
            constructor() {
              (this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise((n, r) => {
                  (this.resolve = n), (this.reject = r);
                })),
                (this.appInits = b(lc, { optional: !0 }) ?? []);
            }
            runInitializers() {
              if (this.initialized) return;
              const n = [];
              for (const o of this.appInits) {
                const i = o();
                if (xs(i)) n.push(i);
                else if (jg(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
              const r = () => {
                (this.done = !0), this.resolve();
              };
              Promise.all(n)
                .then(() => {
                  r();
                })
                .catch((o) => {
                  this.reject(o);
                }),
                0 === n.length && r(),
                (this.initialized = !0);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        ev = (() => {
          class e {
            log(n) {
              console.log(n);
            }
            warn(n) {
              console.warn(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const on = new M("LocaleId", {
        providedIn: "root",
        factory: () =>
          b(on, T.Optional | T.SkipSelf) ||
          (function fT() {
            return (typeof $localize < "u" && $localize.locale) || jr;
          })(),
      });
      let tv = (() => {
        class e {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new ut(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const n = this.taskId++;
            return this.pendingTasks.add(n), n;
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class pT {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let nv = (() => {
        class e {
          compileModuleSync(n) {
            return new Wl(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = Xt(nt(n).declarations).reduce((s, a) => {
                const u = K(a);
                return u && s.push(new Fo(u)), s;
              }, []);
            return new pT(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const yT = (() => Promise.resolve(0))();
      function dc(e) {
        typeof Zone > "u"
          ? yT.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      function iv(...e) {}
      class de {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new He(!1)),
            (this.onMicrotaskEmpty = new He(!1)),
            (this.onStable = new He(!1)),
            (this.onError = new He(!1)),
            typeof Zone > "u")
          )
            throw new w(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function vT() {
              let e = oe.requestAnimationFrame,
                t = oe.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function CT(e) {
              const t = () => {
                !(function wT(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(oe, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                hc(e),
                                (e.isCheckStableRunning = !0),
                                fc(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    hc(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return sv(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      av(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return sv(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), av(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          hc(e),
                          fc(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!de.isInAngularZone()) throw new w(909, !1);
        }
        static assertNotInAngularZone() {
          if (de.isInAngularZone()) throw new w(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, DT, iv, iv);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const DT = {};
      function fc(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function hc(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function sv(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function av(e) {
        e._nesting--, fc(e);
      }
      class _T {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new He()),
            (this.onMicrotaskEmpty = new He()),
            (this.onStable = new He()),
            (this.onError = new He());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const uv = new M("", { providedIn: "root", factory: lv });
      function lv() {
        const e = b(de);
        let t = !0;
        return (function Rw(...e) {
          const t = no(e),
            n = (function bw(e, t) {
              return "number" == typeof Pa(e) ? e.pop() : t;
            })(e, 1 / 0),
            r = e;
          return r.length ? (1 === r.length ? mt(r[0]) : er(n)(Re(r, t))) : Tt;
        })(
          new Ce((o) => {
            (t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                o.next(t), o.complete();
              });
          }),
          new Ce((o) => {
            let i;
            e.runOutsideAngular(() => {
              i = e.onStable.subscribe(() => {
                de.assertNotInAngularZone(),
                  dc(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), o.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              de.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    o.next(!1);
                  }));
            });
            return () => {
              i.unsubscribe(), s.unsubscribe();
            };
          }).pipe(ef())
        );
      }
      const cv = new M(""),
        Hs = new M("");
      let mc,
        pc = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                mc ||
                  ((function ET(e) {
                    mc = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      de.assertNotInAngularZone(),
                        dc(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                dc(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(N(de), N(gc), N(Hs));
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        gc = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return mc?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        bn = null;
      const dv = new M("AllowMultipleToken"),
        yc = new M("PlatformDestroyListeners"),
        vc = new M("appBootstrapListener");
      class hv {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function gv(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new M(r);
        return (i = []) => {
          let s = Dc();
          if (!s || s.injector.get(dv, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function ST(e) {
                  if (bn && !bn.get(dv, !1)) throw new w(400, !1);
                  (function fv() {
                    !(function _C(e) {
                      xf = e;
                    })(() => {
                      throw new w(600, !1);
                    });
                  })(),
                    (bn = e);
                  const t = e.get(yv);
                  (function pv(e) {
                    e.get(bp, null)?.forEach((n) => n());
                  })(e);
                })(
                  (function mv(e = [], t) {
                    return en.create({
                      name: t,
                      providers: [
                        { provide: Zu, useValue: "platform" },
                        { provide: yc, useValue: new Set([() => (bn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function TT(e) {
            const t = Dc();
            if (!t) throw new w(401, !1);
            return t;
          })();
        };
      }
      function Dc() {
        return bn?.get(yv) ?? null;
      }
      let yv = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function AT(e = "zone.js", t) {
              return "noop" === e ? new _T() : "zone.js" === e ? new de(t) : e;
            })(
              r?.ngZone,
              (function vv(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: r?.ngZoneEventCoalescing,
                runCoalescing: r?.ngZoneRunCoalescing,
              })
            );
            return o.run(() => {
              const i = (function QS(e, t, n) {
                  return new Gl(e, t, n);
                })(
                  n.moduleType,
                  this.injector,
                  (function Ev(e) {
                    return [
                      { provide: de, useFactory: e },
                      {
                        provide: Mo,
                        multi: !0,
                        useFactory: () => {
                          const t = b(RT, { optional: !0 });
                          return () => t.initialize();
                        },
                      },
                      { provide: _v, useFactory: NT },
                      { provide: uv, useFactory: lv },
                    ];
                  })(() => o)
                ),
                s = i.injector.get(Hn, null);
              return (
                o.runOutsideAngular(() => {
                  const a = o.onError.subscribe({
                    next: (u) => {
                      s.handleError(u);
                    },
                  });
                  i.onDestroy(() => {
                    Us(this._modules, i), a.unsubscribe();
                  });
                }),
                (function Dv(e, t, n) {
                  try {
                    const r = n();
                    return xs(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(s, o, () => {
                  const a = i.injector.get(cc);
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function km(e) {
                          lt(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Lm = e.toLowerCase().replace(/_/g, "-"));
                        })(i.injector.get(on, jr) || jr),
                        this._moduleDoBootstrap(i),
                        i
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = wv({}, r);
            return (function bT(e, t, n) {
              const r = new Wl(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Hr);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new w(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new w(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(yc, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(en));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function wv(e, t) {
        return Array.isArray(t) ? t.reduce(wv, e) : { ...e, ...t };
      }
      let Hr = (() => {
        class e {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = b(_v)),
              (this.zoneIsStable = b(uv)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = b(tv).hasPendingTasks.pipe(
                At((n) => (n ? L(!1) : this.zoneIsStable)),
                (function xw(e, t = cn) {
                  return (
                    (e = e ?? Ow),
                    Me((n, r) => {
                      let o,
                        i = !0;
                      n.subscribe(
                        Te(r, (s) => {
                          const a = t(s);
                          (i || !e(o, a)) && ((i = !1), (o = a), r.next(s));
                        })
                      );
                    })
                  );
                })(),
                ef()
              )),
              (this._injector = b(Jt));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const o = n instanceof Rp;
            if (!this._injector.get(cc).done)
              throw (
                (!o &&
                  (function nr(e) {
                    const t = K(e) || Pe(e) || qe(e);
                    return null !== t && t.standalone;
                  })(n),
                new w(405, !1))
              );
            let s;
            (s = o ? n : this._injector.get(ys).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function IT(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Vr),
              l = s.create(en.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(cv, null);
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  Us(this.components, l),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new w(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this.internalErrorHandler(n);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Us(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(vc, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Us(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new w(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Us(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const _v = new M("", {
        providedIn: "root",
        factory: () => b(Hn).handleError.bind(void 0),
      });
      function NT() {
        const e = b(de),
          t = b(Hn);
        return (n) => e.runOutsideAngular(() => t.handleError(n));
      }
      let RT = (() => {
        class e {
          constructor() {
            (this.zone = b(de)), (this.applicationRef = b(Hr));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      let wc = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = OT), e;
      })();
      function OT(e) {
        return (function PT(e, t, n) {
          if (On(e) && !n) {
            const r = Ye(e.index, t);
            return new Po(r, r);
          }
          return 47 & e.type ? new Po(t[ye], t) : null;
        })(Oe(), v(), 16 == (16 & e));
      }
      const qT = gv(null, "core", []);
      let ZT = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(N(Hr));
            }),
            (e.ɵmod = Nn({ type: e })),
            (e.ɵinj = hn({})),
            e
          );
        })(),
        Tc = null;
      function Ur() {
        return Tc;
      }
      class sA {}
      const ft = new M("DocumentToken");
      let Ac = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({
            token: e,
            factory: function () {
              return b(uA);
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const aA = new M("Location Initialized");
      let uA = (() => {
        class e extends Ac {
          constructor() {
            super(),
              (this._doc = b(ft)),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Ur().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Ur().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = Ur().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, o) {
            this._history.pushState(n, r, o);
          }
          replaceState(n, r, o) {
            this._history.replaceState(n, r, o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({
            token: e,
            factory: function () {
              return new e();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function Nc(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function Vv(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function sn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Zn = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({
            token: e,
            factory: function () {
              return b(Bv);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const $v = new M("appBaseHref");
      let Bv = (() => {
          class e extends Zn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  b(ft).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Nc(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  sn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + sn(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + sn(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(N(Ac), N($v, 8));
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        lA = (() => {
          class e extends Zn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Nc(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + sn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + sn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(N(Ac), N($v, 8));
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Rc = (() => {
          class e {
            constructor(n) {
              (this._subject = new He()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function fA(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(Vv(Hv(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + sn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function dA(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, Hv(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + sn(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + sn(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = sn),
            (e.joinWithSlash = Nc),
            (e.stripTrailingSlash = Vv),
            (e.ɵfac = function (n) {
              return new (n || e)(N(Zn));
            }),
            (e.ɵprov = O({
              token: e,
              factory: function () {
                return (function cA() {
                  return new Rc(N(Zn));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function Hv(e) {
        return e.replace(/\/index.html$/, "");
      }
      class Hc {
        constructor(t, n) {
          (this._viewContainerRef = t),
            (this._templateRef = n),
            (this._created = !1);
        }
        create() {
          (this._created = !0),
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        destroy() {
          (this._created = !1), this._viewContainerRef.clear();
        }
        enforceState(t) {
          t && !this._created
            ? this.create()
            : !t && this._created && this.destroy();
        }
      }
      let ra = (() => {
          class e {
            constructor() {
              (this._defaultViews = []),
                (this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1);
            }
            set ngSwitch(n) {
              (this._ngSwitch = n),
                0 === this._caseCount && this._updateDefaultCases(!0);
            }
            _addCase() {
              return this._caseCount++;
            }
            _addDefault(n) {
              this._defaultViews.push(n);
            }
            _matchCase(n) {
              const r = n == this._ngSwitch;
              return (
                (this._lastCasesMatched = this._lastCasesMatched || r),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                r
              );
            }
            _updateDefaultCases(n) {
              if (this._defaultViews.length > 0 && n !== this._defaultUsed) {
                this._defaultUsed = n;
                for (const r of this._defaultViews) r.enforceState(n);
              }
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = je({
              type: e,
              selectors: [["", "ngSwitch", ""]],
              inputs: { ngSwitch: "ngSwitch" },
              standalone: !0,
            })),
            e
          );
        })(),
        tD = (() => {
          class e {
            constructor(n, r, o) {
              (this.ngSwitch = o), o._addCase(), (this._view = new Hc(n, r));
            }
            ngDoCheck() {
              this._view.enforceState(
                this.ngSwitch._matchCase(this.ngSwitchCase)
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(_t), R(rn), R(ra, 9));
            }),
            (e.ɵdir = je({
              type: e,
              selectors: [["", "ngSwitchCase", ""]],
              inputs: { ngSwitchCase: "ngSwitchCase" },
              standalone: !0,
            })),
            e
          );
        })(),
        nD = (() => {
          class e {
            constructor(n, r, o) {
              o._addDefault(new Hc(n, r));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(_t), R(rn), R(ra, 9));
            }),
            (e.ɵdir = je({
              type: e,
              selectors: [["", "ngSwitchDefault", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        bN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Nn({ type: e })),
            (e.ɵinj = hn({})),
            e
          );
        })();
      function sD(e) {
        return "server" === e;
      }
      let TN = (() => {
        class e {}
        return (
          (e.ɵprov = O({
            token: e,
            providedIn: "root",
            factory: () => new AN(N(ft), window),
          })),
          e
        );
      })();
      class AN {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function NN(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              "function" == typeof e.body.attachShadow
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              aD(this.window.history) ||
              aD(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function aD(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class oR extends sA {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class qc extends oR {
        static makeCurrent() {
          !(function iA(e) {
            Tc || (Tc = e);
          })(new qc());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r),
            () => {
              t.removeEventListener(n, r);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function iR() {
            return (
              (Xo = Xo || document.querySelector("base")),
              Xo ? Xo.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function sR(e) {
                (aa = aa || document.createElement("a")),
                  aa.setAttribute("href", e);
                const t = aa.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Xo = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function QA(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let aa,
        Xo = null,
        uR = (() => {
          class e {
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const Zc = new M("EventManagerPlugins");
      let fD = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            let r = this._eventNameToPlugin.get(n);
            if (r) return r;
            if (((r = this._plugins.find((i) => i.supports(n))), !r))
              throw new w(5101, !1);
            return this._eventNameToPlugin.set(n, r), r;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(Zc), N(de));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class hD {
        constructor(t) {
          this._doc = t;
        }
      }
      const Qc = "ng-app-id";
      let pD = (() => {
        class e {
          constructor(n, r, o, i = {}) {
            (this.doc = n),
              (this.appId = r),
              (this.nonce = o),
              (this.platformId = i),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = sD(i)),
              this.resetHostNodes();
          }
          addStyles(n) {
            for (const r of n)
              1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
          }
          removeStyles(n) {
            for (const r of n)
              this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
          }
          ngOnDestroy() {
            const n = this.styleNodesInDOM;
            n && (n.forEach((r) => r.remove()), n.clear());
            for (const r of this.getAllStyles()) this.onStyleRemoved(r);
            this.resetHostNodes();
          }
          addHost(n) {
            this.hostNodes.add(n);
            for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
          }
          removeHost(n) {
            this.hostNodes.delete(n);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(n) {
            for (const r of this.hostNodes) this.addStyleToHost(r, n);
          }
          onStyleRemoved(n) {
            const r = this.styleRef;
            r.get(n)?.elements?.forEach((o) => o.remove()), r.delete(n);
          }
          collectServerRenderedStyles() {
            const n = this.doc.head?.querySelectorAll(
              `style[${Qc}="${this.appId}"]`
            );
            if (n?.length) {
              const r = new Map();
              return (
                n.forEach((o) => {
                  null != o.textContent && r.set(o.textContent, o);
                }),
                r
              );
            }
            return null;
          }
          changeUsageCount(n, r) {
            const o = this.styleRef;
            if (o.has(n)) {
              const i = o.get(n);
              return (i.usage += r), i.usage;
            }
            return o.set(n, { usage: r, elements: [] }), r;
          }
          getStyleElement(n, r) {
            const o = this.styleNodesInDOM,
              i = o?.get(r);
            if (i?.parentNode === n)
              return o.delete(r), i.removeAttribute(Qc), i;
            {
              const s = this.doc.createElement("style");
              return (
                this.nonce && s.setAttribute("nonce", this.nonce),
                (s.textContent = r),
                this.platformIsServer && s.setAttribute(Qc, this.appId),
                s
              );
            }
          }
          addStyleToHost(n, r) {
            const o = this.getStyleElement(n, r);
            n.appendChild(o);
            const i = this.styleRef,
              s = i.get(r)?.elements;
            s ? s.push(o) : i.set(r, { elements: [o], usage: 1 });
          }
          resetHostNodes() {
            const n = this.hostNodes;
            n.clear(), n.add(this.doc.head);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(ft), N(fs), N(Ip, 8), N(Er));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Yc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Kc = /%COMP%/g,
        fR = new M("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function mD(e, t) {
        return t.map((n) => n.replace(Kc, e));
      }
      let yD = (() => {
        class e {
          constructor(n, r, o, i, s, a, u, l = null) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestory = i),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = u),
              (this.nonce = l),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = sD(a)),
              (this.defaultRenderer = new Jc(n, s, u, this.platformIsServer));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            this.platformIsServer &&
              r.encapsulation === tt.ShadowDom &&
              (r = { ...r, encapsulation: tt.Emulated });
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof DD
                ? o.applyToHost(n)
                : o instanceof Xc && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.doc,
                a = this.ngZone,
                u = this.eventManager,
                l = this.sharedStylesHost,
                c = this.removeStylesOnCompDestory,
                d = this.platformIsServer;
              switch (r.encapsulation) {
                case tt.Emulated:
                  i = new DD(u, l, r, this.appId, c, s, a, d);
                  break;
                case tt.ShadowDom:
                  return new mR(u, l, n, r, s, a, this.nonce, d);
                default:
                  i = new Xc(u, l, r, c, s, a, d);
              }
              (i.onDestroy = () => o.delete(r.id)), o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(
              N(fD),
              N(pD),
              N(fs),
              N(fR),
              N(ft),
              N(Er),
              N(de),
              N(Ip)
            );
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Jc {
        constructor(t, n, r, o) {
          (this.eventManager = t),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? this.doc.createElementNS(Yc[n] || n, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, n) {
          (vD(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (vD(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? this.doc.querySelector(t) : t;
          if (!r) throw new w(5104, !1);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = Yc[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Yc[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (Ke.DashCase | Ke.Important)
            ? t.style.setProperty(n, r, o & Ke.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Ke.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          if (
            "string" == typeof t &&
            !(t = Ur().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${n}`);
          return this.eventManager.addEventListener(
            t,
            n,
            this.decoratePreventDefault(r)
          );
        }
        decoratePreventDefault(t) {
          return (n) => {
            if ("__ngUnwrap__" === n) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(n))
                : t(n)) && n.preventDefault();
          };
        }
      }
      function vD(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class mR extends Jc {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, u),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const l = mD(o.id, o.styles);
          for (const c of l) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = c),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class Xc extends Jc {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, a),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestory = o),
            (this.rendererUsageCount = 0),
            (this.styles = u ? mD(u, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class DD extends Xc {
        constructor(t, n, r, o, i, s, a, u) {
          const l = o + "-" + r.id;
          super(t, n, r, i, s, a, u, l),
            (this.contentAttr = (function hR(e) {
              return "_ngcontent-%COMP%".replace(Kc, e);
            })(l)),
            (this.hostAttr = (function pR(e) {
              return "_nghost-%COMP%".replace(Kc, e);
            })(l));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let yR = (() => {
        class e extends hD {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(ft));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const wD = ["alt", "control", "meta", "shift"],
        vR = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        DR = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let wR = (() => {
        class e extends hD {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Ur().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              wD.forEach((l) => {
                const c = r.indexOf(l);
                c > -1 && (r.splice(c, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = vR[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                wD.forEach((s) => {
                  s !== o && (0, DR[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(ft));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const bR = gv(qT, "browser", [
          { provide: Er, useValue: "browser" },
          {
            provide: bp,
            useValue: function CR() {
              qc.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: ft,
            useFactory: function ER() {
              return (
                (function mE(e) {
                  Vu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        IR = new M(""),
        ED = [
          {
            provide: Hs,
            useClass: class aR {
              addToWindow(t) {
                (oe.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i) throw new w(5103, !1);
                  return i;
                }),
                  (oe.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (oe.getAllAngularRootElements = () => t.getAllRootElements()),
                  oe.frameworkStabilizers || (oe.frameworkStabilizers = []),
                  oe.frameworkStabilizers.push((r) => {
                    const o = oe.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach(function (u) {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Ur().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: cv, useClass: pc, deps: [de, gc, Hs] },
          { provide: pc, useClass: pc, deps: [de, gc, Hs] },
        ],
        bD = [
          { provide: Zu, useValue: "root" },
          {
            provide: Hn,
            useFactory: function _R() {
              return new Hn();
            },
            deps: [],
          },
          { provide: Zc, useClass: yR, multi: !0, deps: [ft, de, Er] },
          { provide: Zc, useClass: wR, multi: !0, deps: [ft] },
          yD,
          pD,
          fD,
          { provide: Op, useExisting: yD },
          { provide: class RN {}, useClass: uR, deps: [] },
          [],
        ];
      let SR = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [{ provide: fs, useValue: n.appId }],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(N(IR, 12));
            }),
            (e.ɵmod = Nn({ type: e })),
            (e.ɵinj = hn({ providers: [...bD, ...ED], imports: [bN, ZT] })),
            e
          );
        })(),
        ID = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(N(ft));
            }),
            (e.ɵprov = O({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function TR() {
                        return new ID(N(ft));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      typeof window < "u" && window;
      const { isArray: PR } = Array,
        { getPrototypeOf: FR, prototype: LR, keys: kR } = Object;
      const { isArray: $R } = Array;
      function td(...e) {
        const t = no(e),
          n = (function Ew(e) {
            return ne(Pa(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: o } = (function jR(e) {
            if (1 === e.length) {
              const t = e[0];
              if (PR(t)) return { args: t, keys: null };
              if (
                (function VR(e) {
                  return e && "object" == typeof e && FR(e) === LR;
                })(t)
              ) {
                const n = kR(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return Re([], t);
        const i = new Ce(
          (function zR(e, t, n = cn) {
            return (r) => {
              AD(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    AD(
                      t,
                      () => {
                        const l = Re(e[u], t);
                        let c = !1;
                        l.subscribe(
                          Te(
                            r,
                            (d) => {
                              (i[u] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            t,
            o
              ? (s) =>
                  (function UR(e, t) {
                    return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
                  })(o, s)
              : cn
          )
        );
        return n
          ? i.pipe(
              (function HR(e) {
                return re((t) =>
                  (function BR(e, t) {
                    return $R(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : i;
      }
      function AD(e, t, n) {
        e ? zt(n, e, t) : t();
      }
      const ua = Xr(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function nd(...e) {
        return (function GR() {
          return er(1);
        })()(Re(e, no(e)));
      }
      function ND(e) {
        return new Ce((t) => {
          mt(e()).subscribe(t);
        });
      }
      function ei(e, t) {
        const n = ne(e) ? e : () => e,
          r = (o) => o.error(n());
        return new Ce(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function rd() {
        return Me((e, t) => {
          let n = null;
          e._refCount++;
          const r = Te(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class RD extends Ce {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Ld(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new at();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Te(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = at.EMPTY));
          }
          return t;
        }
        refCount() {
          return rd()(this);
        }
      }
      function zr(e) {
        return e <= 0
          ? () => Tt
          : Me((t, n) => {
              let r = 0;
              t.subscribe(
                Te(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function Sn(e, t) {
        return Me((n, r) => {
          let o = 0;
          n.subscribe(Te(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function la(e) {
        return Me((t, n) => {
          let r = !1;
          t.subscribe(
            Te(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function xD(e = qR) {
        return Me((t, n) => {
          let r = !1;
          t.subscribe(
            Te(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function qR() {
        return new ua();
      }
      function Qn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Sn((o, i) => e(o, i, r)) : cn,
            zr(1),
            n ? la(t) : xD(() => new ua())
          );
      }
      function ti(e, t) {
        return ne(t) ? Ne(e, t, 1) : Ne(e, 1);
      }
      function ze(e, t, n) {
        const r = ne(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Me((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Te(
                  i,
                  (u) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete();
                  },
                  (u) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, u),
                      i.error(u);
                  },
                  () => {
                    var u, l;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : cn;
      }
      function Yn(e) {
        return Me((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            Te(n, void 0, void 0, (s) => {
              (i = mt(e(s, Yn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function od(e) {
        return e <= 0
          ? () => Tt
          : Me((t, n) => {
              let r = [];
              t.subscribe(
                Te(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function id(e) {
        return Me((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const H = "primary",
        ni = Symbol("RouteTitle");
      class JR {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Gr(e) {
        return new JR(e);
      }
      function XR(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Bt(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !OD(e[o], t[o]))) return !1;
        return !0;
      }
      function OD(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function PD(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Mn(e) {
        return (function OR(e) {
          return !!e && (e instanceof Ce || (ne(e.lift) && ne(e.subscribe)));
        })(e)
          ? e
          : xs(e)
          ? Re(Promise.resolve(e))
          : L(e);
      }
      const tx = {
          exact: function kD(e, t, n) {
            if (
              !Kn(e.segments, t.segments) ||
              !ca(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !kD(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: jD,
        },
        FD = {
          exact: function nx(e, t) {
            return Bt(e, t);
          },
          subset: function rx(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => OD(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function LD(e, t, n) {
        return (
          tx[n.paths](e.root, t.root, n.matrixParams) &&
          FD[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function jD(e, t, n) {
        return VD(e, t, t.segments, n);
      }
      function VD(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!Kn(o, n) || t.hasChildren() || !ca(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Kn(e.segments, n) || !ca(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !jD(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(Kn(e.segments, o) && ca(e.segments, o, r) && e.children[H]) &&
            VD(e.children[H], t, i, r)
          );
        }
      }
      function ca(e, t, n) {
        return t.every((r, o) => FD[n](e[o].parameters, r.parameters));
      }
      class Wr {
        constructor(t = new te([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Gr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return sx.serialize(this);
        }
      }
      class te {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Object.values(n).forEach((r) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return da(this);
        }
      }
      class ri {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Gr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return HD(this);
        }
      }
      function Kn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let oi = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({
            token: e,
            factory: function () {
              return new sd();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class sd {
        parse(t) {
          const n = new yx(t);
          return new Wr(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${ii(t.root, !0)}`,
            r = (function lx(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${fa(n)}=${fa(o)}`).join("&")
                    : `${fa(n)}=${fa(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function ax(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const sx = new sd();
      function da(e) {
        return e.segments.map((t) => HD(t)).join("/");
      }
      function ii(e, t) {
        if (!e.hasChildren()) return da(e);
        if (t) {
          const n = e.children[H] ? ii(e.children[H], !1) : "",
            r = [];
          return (
            Object.entries(e.children).forEach(([o, i]) => {
              o !== H && r.push(`${o}:${ii(i, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function ix(e, t) {
            let n = [];
            return (
              Object.entries(e.children).forEach(([r, o]) => {
                r === H && (n = n.concat(t(o, r)));
              }),
              Object.entries(e.children).forEach(([r, o]) => {
                r !== H && (n = n.concat(t(o, r)));
              }),
              n
            );
          })(e, (r, o) =>
            o === H ? [ii(e.children[H], !1)] : [`${o}:${ii(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[H]
            ? `${da(e)}/${n[0]}`
            : `${da(e)}/(${n.join("//")})`;
        }
      }
      function $D(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function fa(e) {
        return $D(e).replace(/%3B/gi, ";");
      }
      function ad(e) {
        return $D(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function ha(e) {
        return decodeURIComponent(e);
      }
      function BD(e) {
        return ha(e.replace(/\+/g, "%20"));
      }
      function HD(e) {
        return `${ad(e.path)}${(function ux(e) {
          return Object.keys(e)
            .map((t) => `;${ad(t)}=${ad(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const cx = /^[^\/()?;#]+/;
      function ud(e) {
        const t = e.match(cx);
        return t ? t[0] : "";
      }
      const dx = /^[^\/()?;=#]+/,
        hx = /^[^=?&#]+/,
        gx = /^[^&#]+/;
      class yx {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new te([], {})
              : new te([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) &&
              (r[H] = new te(t, n)),
            r
          );
        }
        parseSegment() {
          const t = ud(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new w(4009, !1);
          return this.capture(t), new ri(ha(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = (function fx(e) {
            const t = e.match(dx);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = ud(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[ha(n)] = ha(r);
        }
        parseQueryParam(t) {
          const n = (function px(e) {
            const t = e.match(hx);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function mx(e) {
              const t = e.match(gx);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = BD(n),
            i = BD(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = ud(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new w(4010, !1);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = H);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[H] : new te([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new w(4011, !1);
        }
      }
      function UD(e) {
        return e.segments.length > 0 ? new te([], { [H]: e }) : e;
      }
      function zD(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = zD(e.children[r]);
          if (r === H && 0 === i.segments.length && i.hasChildren())
            for (const [s, a] of Object.entries(i.children)) t[s] = a;
          else (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function vx(e) {
          if (1 === e.numberOfChildren && e.children[H]) {
            const t = e.children[H];
            return new te(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new te(e.segments, t));
      }
      function Jn(e) {
        return e instanceof Wr;
      }
      function GD(e) {
        let t;
        const o = UD(
          (function n(i) {
            const s = {};
            for (const u of i.children) {
              const l = n(u);
              s[u.outlet] = l;
            }
            const a = new te(i.url, s);
            return i === e && (t = a), a;
          })(e.root)
        );
        return t ?? o;
      }
      function WD(e, t, n, r) {
        let o = e;
        for (; o.parent; ) o = o.parent;
        if (0 === t.length) return ld(o, o, o, n, r);
        const i = (function wx(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new ZD(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Object.entries(i.outlets).forEach(([u, l]) => {
                    a[u] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new ZD(n, t, r);
        })(t);
        if (i.toRoot()) return ld(o, o, new te([], {}), n, r);
        const s = (function Cx(e, t, n) {
            if (e.isAbsolute) return new ga(t, !0, 0);
            if (!n) return new ga(t, !1, NaN);
            if (null === n.parent) return new ga(n, !0, 0);
            const r = pa(e.commands[0]) ? 0 : 1;
            return (function _x(e, t, n) {
              let r = e,
                o = t,
                i = n;
              for (; i > o; ) {
                if (((i -= o), (r = r.parent), !r)) throw new w(4005, !1);
                o = r.segments.length;
              }
              return new ga(r, !1, o - i);
            })(n, n.segments.length - 1 + r, e.numberOfDoubleDots);
          })(i, o, e),
          a = s.processChildren
            ? ai(s.segmentGroup, s.index, i.commands)
            : QD(s.segmentGroup, s.index, i.commands);
        return ld(o, s.segmentGroup, a, n, r);
      }
      function pa(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function si(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function ld(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Object.entries(r).forEach(([u, l]) => {
            i[u] = Array.isArray(l) ? l.map((c) => `${c}`) : `${l}`;
          }),
          (s = e === t ? n : qD(e, t, n));
        const a = UD(zD(s));
        return new Wr(a, i, o);
      }
      function qD(e, t, n) {
        const r = {};
        return (
          Object.entries(e.children).forEach(([o, i]) => {
            r[o] = i === t ? n : qD(i, t, n);
          }),
          new te(e.segments, r)
        );
      }
      class ZD {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && pa(r[0]))
          )
            throw new w(4003, !1);
          const o = r.find(si);
          if (o && o !== PD(r)) throw new w(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class ga {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function QD(e, t, n) {
        if (
          (e || (e = new te([], {})),
          0 === e.segments.length && e.hasChildren())
        )
          return ai(e, t, n);
        const r = (function bx(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (si(a)) break;
              const u = `${a}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && l && "object" == typeof l && void 0 === l.outlets) {
                if (!KD(u, l, s)) return i;
                r += 2;
              } else {
                if (!KD(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new te(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[H] = new te(e.segments.slice(r.pathIndex), e.children)),
            ai(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new te(e.segments, {})
          : r.match && !e.hasChildren()
          ? cd(e, t, n)
          : r.match
          ? ai(e, 0, o)
          : cd(e, t, n);
      }
      function ai(e, t, n) {
        if (0 === n.length) return new te(e.segments, {});
        {
          const r = (function Ex(e) {
              return si(e[0]) ? e[0].outlets : { [H]: e };
            })(n),
            o = {};
          if (
            !r[H] &&
            e.children[H] &&
            1 === e.numberOfChildren &&
            0 === e.children[H].segments.length
          ) {
            const i = ai(e.children[H], t, n);
            return new te(e.segments, i.children);
          }
          return (
            Object.entries(r).forEach(([i, s]) => {
              "string" == typeof s && (s = [s]),
                null !== s && (o[i] = QD(e.children[i], t, s));
            }),
            Object.entries(e.children).forEach(([i, s]) => {
              void 0 === r[i] && (o[i] = s);
            }),
            new te(e.segments, o)
          );
        }
      }
      function cd(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (si(i)) {
            const u = Ix(i.outlets);
            return new te(r, u);
          }
          if (0 === o && pa(n[0])) {
            r.push(new ri(e.segments[t].path, YD(n[0]))), o++;
            continue;
          }
          const s = si(i) ? i.outlets[H] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && pa(a)
            ? (r.push(new ri(s, YD(a))), (o += 2))
            : (r.push(new ri(s, {})), o++);
        }
        return new te(r, {});
      }
      function Ix(e) {
        const t = {};
        return (
          Object.entries(e).forEach(([n, r]) => {
            "string" == typeof r && (r = [r]),
              null !== r && (t[n] = cd(new te([], {}), 0, r));
          }),
          t
        );
      }
      function YD(e) {
        const t = {};
        return Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t;
      }
      function KD(e, t, n) {
        return e == n.path && Bt(t, n.parameters);
      }
      const ui = "imperative";
      class Ht {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class dd extends Ht {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Xn extends Ht {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class ma extends Ht {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class li extends Ht {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class fd extends Ht {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class Sx extends Ht {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Mx extends Ht {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Tx extends Ht {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class Ax extends Ht {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Nx extends Ht {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Rx {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class xx {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class Ox {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Px {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Fx {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Lx {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class JD {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class kx {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.injector = null),
            (this.children = new ci()),
            (this.attachRef = null);
        }
      }
      let ci = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new kx()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class XD {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = hd(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = hd(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = pd(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return pd(t, this._root).map((n) => n.value);
        }
      }
      function hd(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = hd(e, n);
          if (r) return r;
        }
        return null;
      }
      function pd(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = pd(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class un {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function qr(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class e0 extends XD {
        constructor(t, n) {
          super(t), (this.snapshot = n), gd(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function t0(e, t) {
        const n = (function jx(e, t) {
            const s = new ya([], {}, {}, "", {}, H, t, null, {});
            return new r0("", new un(s, []));
          })(0, t),
          r = new ut([new ri("", {})]),
          o = new ut({}),
          i = new ut({}),
          s = new ut({}),
          a = new ut(""),
          u = new Zr(r, o, s, a, i, H, t, n.root);
        return (u.snapshot = n.root), new e0(new un(u, []), n);
      }
      class Zr {
        constructor(t, n, r, o, i, s, a, u) {
          (this.urlSubject = t),
            (this.paramsSubject = n),
            (this.queryParamsSubject = r),
            (this.fragmentSubject = o),
            (this.dataSubject = i),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = u),
            (this.title =
              this.dataSubject?.pipe(re((l) => l[ni])) ?? L(void 0)),
            (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(re((t) => Gr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(re((t) => Gr(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function n0(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function Vx(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class ya {
        get title() {
          return this.data?.[ni];
        }
        constructor(t, n, r, o, i, s, a, u, l) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._resolve = l);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Gr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Gr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class r0 extends XD {
        constructor(t, n) {
          super(n), (this.url = t), gd(this, n);
        }
        toString() {
          return o0(this._root);
        }
      }
      function gd(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => gd(e, n));
      }
      function o0(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(o0).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function md(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Bt(t.queryParams, n.queryParams) ||
              e.queryParamsSubject.next(n.queryParams),
            t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
            Bt(t.params, n.params) || e.paramsSubject.next(n.params),
            (function ex(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Bt(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.urlSubject.next(n.url),
            Bt(t.data, n.data) || e.dataSubject.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot),
            e.dataSubject.next(e._futureSnapshot.data);
      }
      function yd(e, t) {
        const n =
          Bt(e.params, t.params) &&
          (function ox(e, t) {
            return (
              Kn(e, t) && e.every((n, r) => Bt(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || yd(e.parent, t.parent))
        );
      }
      let vd = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = H),
              (this.activateEvents = new He()),
              (this.deactivateEvents = new He()),
              (this.attachEvents = new He()),
              (this.detachEvents = new He()),
              (this.parentContexts = b(ci)),
              (this.location = b(_t)),
              (this.changeDetector = b(wc)),
              (this.environmentInjector = b(Jt)),
              (this.inputBinder = b(va, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0);
          }
          get activatedComponentRef() {
            return this.activated;
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new w(4012, !1);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new w(4012, !1);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new w(4012, !1);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new w(4013, !1);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new $x(n, a, o.injector);
            (this.activated = o.createComponent(s, {
              index: o.length,
              injector: u,
              environmentInjector: r ?? this.environmentInjector,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = je({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [Fn],
          })),
          e
        );
      })();
      class $x {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Zr
            ? this.route
            : t === ci
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      const va = new M("");
      let s0 = (() => {
        class e {
          constructor() {
            this.outletDataSubscriptions = new Map();
          }
          bindActivatedRouteToOutletComponent(n) {
            this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
          }
          unsubscribeFromRouteData(n) {
            this.outletDataSubscriptions.get(n)?.unsubscribe(),
              this.outletDataSubscriptions.delete(n);
          }
          subscribeToRouteData(n) {
            const { activatedRoute: r } = n,
              o = td([r.queryParams, r.params, r.data])
                .pipe(
                  At(
                    ([i, s, a], u) => (
                      (a = { ...i, ...s, ...a }),
                      0 === u ? L(a) : Promise.resolve(a)
                    )
                  )
                )
                .subscribe((i) => {
                  if (
                    !n.isActivated ||
                    !n.activatedComponentRef ||
                    n.activatedRoute !== r ||
                    null === r.component
                  )
                    return void this.unsubscribeFromRouteData(n);
                  const s = (function oA(e) {
                    const t = K(e);
                    if (!t) return null;
                    const n = new Fo(t);
                    return {
                      get selector() {
                        return n.selector;
                      },
                      get type() {
                        return n.componentType;
                      },
                      get inputs() {
                        return n.inputs;
                      },
                      get outputs() {
                        return n.outputs;
                      },
                      get ngContentSelectors() {
                        return n.ngContentSelectors;
                      },
                      get isStandalone() {
                        return t.standalone;
                      },
                    };
                  })(r.component);
                  if (s)
                    for (const { templateName: a } of s.inputs)
                      n.activatedComponentRef.setInput(a, i[a]);
                  else this.unsubscribeFromRouteData(n);
                });
            this.outletDataSubscriptions.set(n, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function di(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function Hx(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return di(e, r, o);
              return di(e, r);
            });
          })(e, t, n);
          return new un(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => di(e, a))),
                s
              );
            }
          }
          const r = (function Ux(e) {
              return new Zr(
                new ut(e.url),
                new ut(e.params),
                new ut(e.queryParams),
                new ut(e.fragment),
                new ut(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => di(e, i));
          return new un(r, o);
        }
      }
      const Dd = "ngNavigationCancelingError";
      function a0(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = Jn(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = u0(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function u0(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Dd] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function l0(e) {
        return c0(e) && Jn(e.url);
      }
      function c0(e) {
        return e && e[Dd];
      }
      let d0 = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Za({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [cy],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && Z(0, "router-outlet");
            },
            dependencies: [vd],
            encapsulation: 2,
          })),
          e
        );
      })();
      function wd(e) {
        const t = e.children && e.children.map(wd),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== H &&
            (n.component = d0),
          n
        );
      }
      function St(e) {
        return e.outlet || H;
      }
      function fi(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class Yx {
        constructor(t, n, r, o, i) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o),
            (this.inputBindingEnabled = i);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            md(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = qr(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Object.values(o).forEach((i) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = qr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = qr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = qr(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new Lx(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new Px(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((md(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                md(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = fi(o.snapshot);
              (s.attachRef = null),
                (s.route = o),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class f0 {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Da {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function Kx(e, t, n) {
        const r = e._root;
        return hi(r, t ? t._root : null, n, [r.value]);
      }
      function Qr(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function $w(e) {
              return null !== _i(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function hi(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = qr(t);
        return (
          e.children.forEach((s) => {
            (function Xx(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function eO(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Kn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Kn(e.url, t.url) || !Bt(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !yd(e, t) || !Bt(e.queryParams, t.queryParams);
                    default:
                      return !yd(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new f0(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  hi(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Da(a.outlet.component, s));
              } else
                s && pi(t, a, o),
                  o.canActivateChecks.push(new f0(r)),
                  hi(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Object.entries(i).forEach(([s, a]) => pi(a, n.getContext(s), o)),
          o
        );
      }
      function pi(e, t, n) {
        const r = qr(e),
          o = e.value;
        Object.entries(r).forEach(([i, s]) => {
          pi(s, o.component ? (t ? t.children.getContext(i) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Da(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function gi(e) {
        return "function" == typeof e;
      }
      function h0(e) {
        return e instanceof ua || "EmptyError" === e?.name;
      }
      const wa = Symbol("INITIAL_VALUE");
      function Yr() {
        return At((e) =>
          td(
            e.map((t) =>
              t.pipe(
                zr(1),
                (function WR(...e) {
                  const t = no(e);
                  return Me((n, r) => {
                    (t ? nd(e, n, t) : nd(e, n)).subscribe(r);
                  });
                })(wa)
              )
            )
          ).pipe(
            re((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === wa) return wa;
                  if (!1 === n || n instanceof Wr) return n;
                }
              return !0;
            }),
            Sn((t) => t !== wa),
            zr(1)
          )
        );
      }
      function p0(e) {
        return (function z0(...e) {
          return Od(e);
        })(
          ze((t) => {
            if (Jn(t)) throw a0(0, t);
          }),
          re((t) => !0 === t)
        );
      }
      class Ca {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class g0 {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Kr(e) {
        return ei(new Ca(e));
      }
      function m0(e) {
        return ei(new g0(e));
      }
      class wO {
        constructor(t, n) {
          (this.urlSerializer = t), (this.urlTree = n);
        }
        noMatchError(t) {
          return new w(4002, !1);
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return L(r);
            if (o.numberOfChildren > 1 || !o.children[H])
              return ei(new w(4e3, !1));
            o = o.children[H];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new Wr(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Object.entries(t).forEach(([o, i]) => {
              if ("string" == typeof i && i.startsWith(":")) {
                const a = i.substring(1);
                r[o] = n[a];
              } else r[o] = i;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Object.entries(n.children).forEach(([a, u]) => {
              s[a] = this.createSegmentGroup(t, u, r, o);
            }),
            new te(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new w(4001, !1);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      const Cd = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function CO(e, t, n, r, o) {
        const i = _d(e, t, n);
        return i.matched
          ? ((r = (function zx(e, t) {
              return (
                e.providers &&
                  !e._injector &&
                  (e._injector = ql(e.providers, t, `Route: ${e.path}`)),
                e._injector ?? t
              );
            })(t, r)),
            (function yO(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? L(
                    o.map((s) => {
                      const a = Qr(s, e);
                      return Mn(
                        (function sO(e) {
                          return e && gi(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(Yr(), p0())
                : L(!0);
            })(r, t, n).pipe(re((s) => (!0 === s ? i : { ...Cd }))))
          : L(i);
      }
      function _d(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Cd }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || XR)(n, e, t);
        if (!o) return { ...Cd };
        const i = {};
        Object.entries(o.posParams ?? {}).forEach(([a, u]) => {
          i[a] = u.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function y0(e, t, n, r) {
        return n.length > 0 &&
          (function bO(e, t, n) {
            return n.some((r) => _a(e, t, r) && St(r) !== H);
          })(e, n, r)
          ? {
              segmentGroup: new te(t, EO(r, new te(n, e.children))),
              slicedSegments: [],
            }
          : 0 === n.length &&
            (function IO(e, t, n) {
              return n.some((r) => _a(e, t, r));
            })(e, n, r)
          ? {
              segmentGroup: new te(e.segments, _O(e, 0, n, r, e.children)),
              slicedSegments: n,
            }
          : { segmentGroup: new te(e.segments, e.children), slicedSegments: n };
      }
      function _O(e, t, n, r, o) {
        const i = {};
        for (const s of r)
          if (_a(e, n, s) && !o[St(s)]) {
            const a = new te([], {});
            i[St(s)] = a;
          }
        return { ...o, ...i };
      }
      function EO(e, t) {
        const n = {};
        n[H] = t;
        for (const r of e)
          if ("" === r.path && St(r) !== H) {
            const o = new te([], {});
            n[St(r)] = o;
          }
        return n;
      }
      function _a(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      class AO {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.configLoader = n),
            (this.rootComponentType = r),
            (this.config = o),
            (this.urlTree = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a),
            (this.allowRedirects = !0),
            (this.applyRedirects = new wO(this.urlSerializer, this.urlTree));
        }
        noMatchError(t) {
          return new w(4002, !1);
        }
        recognize() {
          const t = y0(this.urlTree.root, [], [], this.config).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            H
          ).pipe(
            Yn((n) => {
              if (n instanceof g0)
                return (
                  (this.allowRedirects = !1),
                  (this.urlTree = n.urlTree),
                  this.match(n.urlTree)
                );
              throw n instanceof Ca ? this.noMatchError(n) : n;
            }),
            re((n) => {
              const r = new ya(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  H,
                  this.rootComponentType,
                  null,
                  {}
                ),
                o = new un(r, n),
                i = new r0("", o),
                s = (function Dx(e, t, n = null, r = null) {
                  return WD(GD(e), t, n, r);
                })(r, [], this.urlTree.queryParams, this.urlTree.fragment);
              return (
                (s.queryParams = this.urlTree.queryParams),
                (i.url = this.urlSerializer.serialize(s)),
                this.inheritParamsAndData(i._root),
                { state: i, tree: s }
              );
            })
          );
        }
        match(t) {
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t.root,
            H
          ).pipe(
            Yn((r) => {
              throw r instanceof Ca ? this.noMatchError(r) : r;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = n0(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o, !0);
        }
        processChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return Re(o).pipe(
            ti((i) => {
              const s = r.children[i],
                a = (function Zx(e, t) {
                  const n = e.filter((r) => St(r) === t);
                  return n.push(...e.filter((r) => St(r) !== t)), n;
                })(n, i);
              return this.processSegmentGroup(t, a, s, i);
            }),
            (function QR(e, t) {
              return Me(
                (function ZR(e, t, n, r, o) {
                  return (i, s) => {
                    let a = n,
                      u = t,
                      l = 0;
                    i.subscribe(
                      Te(
                        s,
                        (c) => {
                          const d = l++;
                          (u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u);
                        },
                        o &&
                          (() => {
                            a && s.next(u), s.complete();
                          })
                      )
                    );
                  };
                })(e, t, arguments.length >= 2, !0)
              );
            })((i, s) => (i.push(...s), i)),
            la(null),
            (function YR(e, t) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? Sn((o, i) => e(o, i, r)) : cn,
                  od(1),
                  n ? la(t) : xD(() => new ua())
                );
            })(),
            Ne((i) => {
              if (null === i) return Kr(r);
              const s = v0(i);
              return (
                (function NO(e) {
                  e.sort((t, n) =>
                    t.value.outlet === H
                      ? -1
                      : n.value.outlet === H
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(s),
                L(s)
              );
            })
          );
        }
        processSegment(t, n, r, o, i, s) {
          return Re(n).pipe(
            ti((a) =>
              this.processSegmentAgainstRoute(
                a._injector ?? t,
                n,
                a,
                r,
                o,
                i,
                s
              ).pipe(
                Yn((u) => {
                  if (u instanceof Ca) return L(null);
                  throw u;
                })
              )
            ),
            Qn((a) => !!a),
            Yn((a) => {
              if (h0(a))
                return (function MO(e, t, n) {
                  return 0 === t.length && !e.children[n];
                })(r, o, i)
                  ? L([])
                  : Kr(r);
              throw a;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return (function SO(e, t, n, r) {
            return (
              !!(St(e) === r || (r !== H && _a(t, n, e))) &&
              ("**" === e.path || _d(t, e, n).matched)
            );
          })(r, o, i, s)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, o, r, i, s, a)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s)
              : Kr(o)
            : Kr(o);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirects.applyRedirectCommands(
            [],
            r.redirectTo,
            {}
          );
          return r.redirectTo.startsWith("/")
            ? m0(i)
            : this.applyRedirects.lineralizeSegments(r, i).pipe(
                Ne((s) => {
                  const a = new te(s, {});
                  return this.processSegment(t, n, a, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: l,
            positionalParamSegments: c,
          } = _d(n, o, i);
          if (!a) return Kr(n);
          const d = this.applyRedirects.applyRedirectCommands(
            u,
            o.redirectTo,
            c
          );
          return o.redirectTo.startsWith("/")
            ? m0(d)
            : this.applyRedirects
                .lineralizeSegments(o, d)
                .pipe(
                  Ne((f) => this.processSegment(t, r, n, f.concat(l), s, !1))
                );
        }
        matchSegmentAgainstRoute(t, n, r, o, i, s) {
          let a;
          if ("**" === r.path) {
            const u = o.length > 0 ? PD(o).parameters : {};
            (a = L({
              snapshot: new ya(
                o,
                u,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                D0(r),
                St(r),
                r.component ?? r._loadedComponent ?? null,
                r,
                w0(r)
              ),
              consumedSegments: [],
              remainingSegments: [],
            })),
              (n.children = {});
          } else
            a = CO(n, r, o, t).pipe(
              re(
                ({
                  matched: u,
                  consumedSegments: l,
                  remainingSegments: c,
                  parameters: d,
                }) =>
                  u
                    ? {
                        snapshot: new ya(
                          l,
                          d,
                          Object.freeze({ ...this.urlTree.queryParams }),
                          this.urlTree.fragment,
                          D0(r),
                          St(r),
                          r.component ?? r._loadedComponent ?? null,
                          r,
                          w0(r)
                        ),
                        consumedSegments: l,
                        remainingSegments: c,
                      }
                    : null
              )
            );
          return a.pipe(
            At((u) =>
              null === u
                ? Kr(n)
                : this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                    At(({ routes: l }) => {
                      const c = r._loadedInjector ?? t,
                        {
                          snapshot: d,
                          consumedSegments: f,
                          remainingSegments: h,
                        } = u,
                        { segmentGroup: p, slicedSegments: g } = y0(n, f, h, l);
                      if (0 === g.length && p.hasChildren())
                        return this.processChildren(c, l, p).pipe(
                          re((D) => (null === D ? null : [new un(d, D)]))
                        );
                      if (0 === l.length && 0 === g.length)
                        return L([new un(d, [])]);
                      const y = St(r) === i;
                      return this.processSegment(
                        c,
                        l,
                        p,
                        g,
                        y ? H : i,
                        !0
                      ).pipe(re((D) => [new un(d, D)]));
                    })
                  )
            )
          );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? L({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? L({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function mO(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? L(!0)
                    : L(
                        o.map((s) => {
                          const a = Qr(s, e);
                          return Mn(
                            (function nO(e) {
                              return e && gi(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(Yr(), p0());
                })(t, n, r).pipe(
                  Ne((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          ze((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function DO(e) {
                          return ei(u0(!1, 3));
                        })()
                  )
                )
            : L({ routes: [], injector: t });
        }
      }
      function RO(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path;
      }
      function v0(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!RO(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = v0(r.children);
          t.push(new un(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function D0(e) {
        return e.data || {};
      }
      function w0(e) {
        return e.resolve || {};
      }
      function C0(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Ed(e) {
        return At((t) => {
          const n = e(t);
          return n ? Re(n).pipe(re(() => t)) : L(t);
        });
      }
      const Jr = new M("ROUTES");
      let bd = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = b(nv));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return L(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = Mn(n.loadComponent()).pipe(
                re(_0),
                ze((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                id(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new RD(r, () => new Ut()).pipe(rd());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return L({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                re((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let u, l;
                  return (
                    Array.isArray(a)
                      ? (l = a)
                      : ((u = a.create(n).injector),
                        (l = u.get(Jr, [], T.Self | T.Optional).flat())),
                    { routes: l.map(wd), injector: u }
                  );
                }),
                id(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new RD(i, () => new Ut()).pipe(rd());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return Mn(n()).pipe(
              re(_0),
              Ne((r) =>
                r instanceof uy || Array.isArray(r)
                  ? L(r)
                  : Re(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function _0(e) {
        return (function jO(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Ea = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new Ut()),
              (this.configLoader = b(bd)),
              (this.environmentInjector = b(Jt)),
              (this.urlSerializer = b(oi)),
              (this.rootContexts = b(ci)),
              (this.inputBindingEnabled = null !== b(va, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => L(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new xx(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new Rx(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n) {
            return (
              (this.transitions = new ut({
                id: 0,
                currentUrlTree: n.currentUrlTree,
                currentRawUrl: n.currentUrlTree,
                extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                urlAfterRedirects: n.urlHandlingStrategy.extract(
                  n.currentUrlTree
                ),
                rawUrl: n.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: ui,
                restoredState: null,
                currentSnapshot: n.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: n.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                Sn((r) => 0 !== r.id),
                re((r) => ({
                  ...r,
                  extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl),
                })),
                At((r) => {
                  let o = !1,
                    i = !1;
                  return L(r).pipe(
                    ze((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    At((s) => {
                      const a = n.browserUrlTree.toString(),
                        u =
                          !n.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== n.currentUrlTree.toString();
                      if (
                        !u &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const c = "";
                        return (
                          this.events.next(
                            new li(s.id, n.serializeUrl(r.rawUrl), c, 0)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          Tt
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          E0(s.source) && (n.browserUrlTree = s.extractedUrl),
                          L(s).pipe(
                            At((c) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new dd(
                                    c.id,
                                    this.urlSerializer.serialize(
                                      c.extractedUrl
                                    ),
                                    c.source,
                                    c.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? Tt
                                  : Promise.resolve(c)
                              );
                            }),
                            (function xO(e, t, n, r, o, i) {
                              return Ne((s) =>
                                (function TO(
                                  e,
                                  t,
                                  n,
                                  r,
                                  o,
                                  i,
                                  s = "emptyOnly"
                                ) {
                                  return new AO(
                                    e,
                                    t,
                                    n,
                                    r,
                                    o,
                                    s,
                                    i
                                  ).recognize();
                                })(e, t, n, r, s.extractedUrl, o, i).pipe(
                                  re(({ state: a, tree: u }) => ({
                                    ...s,
                                    targetSnapshot: a,
                                    urlAfterRedirects: u,
                                  }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.rootComponentType,
                              n.config,
                              this.urlSerializer,
                              n.paramsInheritanceStrategy
                            ),
                            ze((c) => {
                              if (
                                ((r.targetSnapshot = c.targetSnapshot),
                                (r.urlAfterRedirects = c.urlAfterRedirects),
                                (this.currentNavigation = {
                                  ...this.currentNavigation,
                                  finalUrl: c.urlAfterRedirects,
                                }),
                                "eager" === n.urlUpdateStrategy)
                              ) {
                                if (!c.extras.skipLocationChange) {
                                  const f = n.urlHandlingStrategy.merge(
                                    c.urlAfterRedirects,
                                    c.rawUrl
                                  );
                                  n.setBrowserUrl(f, c);
                                }
                                n.browserUrlTree = c.urlAfterRedirects;
                              }
                              const d = new Sx(
                                c.id,
                                this.urlSerializer.serialize(c.extractedUrl),
                                this.urlSerializer.serialize(
                                  c.urlAfterRedirects
                                ),
                                c.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        u &&
                        n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)
                      ) {
                        const {
                            id: c,
                            extractedUrl: d,
                            source: f,
                            restoredState: h,
                            extras: p,
                          } = s,
                          g = new dd(c, this.urlSerializer.serialize(d), f, h);
                        this.events.next(g);
                        const y = t0(0, this.rootComponentType).snapshot;
                        return L(
                          (r = {
                            ...s,
                            targetSnapshot: y,
                            urlAfterRedirects: d,
                            extras: {
                              ...p,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const c = "";
                        return (
                          this.events.next(
                            new li(s.id, n.serializeUrl(r.extractedUrl), c, 1)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          Tt
                        );
                      }
                    }),
                    ze((s) => {
                      const a = new Mx(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    re(
                      (s) =>
                        (r = {
                          ...s,
                          guards: Kx(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function uO(e, t) {
                      return Ne((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? L({ ...n, guardsResult: !0 })
                          : (function lO(e, t, n, r) {
                              return Re(e).pipe(
                                Ne((o) =>
                                  (function gO(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? L(
                                          i.map((a) => {
                                            const u = fi(t) ?? o,
                                              l = Qr(a, u);
                                            return Mn(
                                              (function iO(e) {
                                                return e && gi(e.canDeactivate);
                                              })(l)
                                                ? l.canDeactivate(e, t, n, r)
                                                : u.runInContext(() =>
                                                    l(e, t, n, r)
                                                  )
                                            ).pipe(Qn());
                                          })
                                        ).pipe(Yr())
                                      : L(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                Qn((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              Ne((a) =>
                                a &&
                                (function tO(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function cO(e, t, n, r) {
                                      return Re(t).pipe(
                                        ti((o) =>
                                          nd(
                                            (function fO(e, t) {
                                              return (
                                                null !== e && t && t(new Ox(e)),
                                                L(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function dO(e, t) {
                                              return (
                                                null !== e && t && t(new Fx(e)),
                                                L(!0)
                                              );
                                            })(o.route, r),
                                            (function pO(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function Jx(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    ND(() =>
                                                      L(
                                                        s.guards.map((u) => {
                                                          const l =
                                                              fi(s.node) ?? n,
                                                            c = Qr(u, l);
                                                          return Mn(
                                                            (function oO(e) {
                                                              return (
                                                                e &&
                                                                gi(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : l.runInContext(
                                                                  () => c(r, e)
                                                                )
                                                          ).pipe(Qn());
                                                        })
                                                      ).pipe(Yr())
                                                    )
                                                  );
                                              return L(i).pipe(Yr());
                                            })(e, o.path, n),
                                            (function hO(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return L(!0);
                                              const o = r.map((i) =>
                                                ND(() => {
                                                  const s = fi(t) ?? n,
                                                    a = Qr(i, s);
                                                  return Mn(
                                                    (function rO(e) {
                                                      return (
                                                        e && gi(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(Qn());
                                                })
                                              );
                                              return L(o).pipe(Yr());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        Qn((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, t)
                                  : L(a)
                              ),
                              re((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    ze((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), Jn(s.guardsResult))
                      )
                        throw a0(0, s.guardsResult);
                      const a = new Tx(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    Sn(
                      (s) =>
                        !!s.guardsResult ||
                        (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    Ed((s) => {
                      if (s.guards.canActivateChecks.length)
                        return L(s).pipe(
                          ze((a) => {
                            const u = new Ax(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          }),
                          At((a) => {
                            let u = !1;
                            return L(a).pipe(
                              (function OO(e, t) {
                                return Ne((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return L(n);
                                  let i = 0;
                                  return Re(o).pipe(
                                    ti((s) =>
                                      (function PO(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !C0(o) &&
                                            (i[ni] = o.title),
                                          (function FO(e, t, n, r) {
                                            const o = (function LO(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return L({});
                                            const i = {};
                                            return Re(o).pipe(
                                              Ne((s) =>
                                                (function kO(e, t, n, r) {
                                                  const o = fi(t) ?? r,
                                                    i = Qr(e, o);
                                                  return Mn(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  Qn(),
                                                  ze((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              od(1),
                                              (function KR(e) {
                                                return re(() => e);
                                              })(i),
                                              Yn((s) => (h0(s) ? Tt : ei(s)))
                                            );
                                          })(i, e, t, r).pipe(
                                            re(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = n0(e, n).resolve),
                                                o &&
                                                  C0(o) &&
                                                  (e.data[ni] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    ze(() => i++),
                                    od(1),
                                    Ne((s) => (i === o.length ? L(n) : Tt))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              ze({
                                next: () => (u = !0),
                                complete: () => {
                                  u ||
                                    (n.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          ze((a) => {
                            const u = new Nx(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          })
                        );
                    }),
                    Ed((s) => {
                      const a = (u) => {
                        const l = [];
                        u.routeConfig?.loadComponent &&
                          !u.routeConfig._loadedComponent &&
                          l.push(
                            this.configLoader.loadComponent(u.routeConfig).pipe(
                              ze((c) => {
                                u.component = c;
                              }),
                              re(() => {})
                            )
                          );
                        for (const c of u.children) l.push(...a(c));
                        return l;
                      };
                      return td(a(s.targetSnapshot.root)).pipe(la(), zr(1));
                    }),
                    Ed(() => this.afterPreactivation()),
                    re((s) => {
                      const a = (function Bx(e, t, n) {
                        const r = di(e, t._root, n ? n._root : void 0);
                        return new e0(r, t);
                      })(
                        n.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    ze((s) => {
                      (n.currentUrlTree = s.urlAfterRedirects),
                        (n.rawUrlTree = n.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (n.routerState = s.targetRouterState),
                        "deferred" === n.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            n.setBrowserUrl(n.rawUrlTree, s),
                          (n.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, t, n, r) =>
                      re(
                        (o) => (
                          new Yx(
                            t,
                            o.targetRouterState,
                            o.currentRouterState,
                            n,
                            r
                          ).activate(e),
                          o
                        )
                      ))(
                      this.rootContexts,
                      n.routeReuseStrategy,
                      (s) => this.events.next(s),
                      this.inputBindingEnabled
                    ),
                    zr(1),
                    ze({
                      next: (s) => {
                        (o = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (n.navigated = !0),
                          this.events.next(
                            new Xn(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(n.currentUrlTree)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        o = !0;
                      },
                    }),
                    id(() => {
                      o || i || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    Yn((s) => {
                      if (((i = !0), c0(s))) {
                        l0(s) || ((n.navigated = !0), n.restoreHistory(r, !0));
                        const a = new ma(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), l0(s))) {
                          const u = n.urlHandlingStrategy.merge(
                              s.url,
                              n.rawUrlTree
                            ),
                            l = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === n.urlUpdateStrategy || E0(r.source),
                            };
                          n.scheduleNavigation(u, ui, null, l, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        n.restoreHistory(r, !0);
                        const a = new fd(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(n.errorHandler(s));
                        } catch (u) {
                          r.reject(u);
                        }
                      }
                      return Tt;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new ma(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o
            );
            this.events.next(i), n.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function E0(e) {
        return e !== ui;
      }
      let b0 = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === H));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[ni];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({
              token: e,
              factory: function () {
                return b(VO);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        VO = (() => {
          class e extends b0 {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(N(ID));
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        $O = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({
              token: e,
              factory: function () {
                return b(HO);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class BO {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let HO = (() => {
        class e extends BO {}
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (
                t ||
                (t = (function yh(e) {
                  return Gt(() => {
                    const t = e.prototype.constructor,
                      n = t[qt] || mu(t),
                      r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r; ) {
                      const i = o[qt] || mu(o);
                      if (i && i !== n) return i;
                      o = Object.getPrototypeOf(o);
                    }
                    return (i) => new i();
                  });
                })(e))
              )(r || e);
            };
          })()),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const ba = new M("", { providedIn: "root", factory: () => ({}) });
      let UO = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({
              token: e,
              factory: function () {
                return b(zO);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        zO = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      var st = (() => (
        ((st = st || {})[(st.COMPLETE = 0)] = "COMPLETE"),
        (st[(st.FAILED = 1)] = "FAILED"),
        (st[(st.REDIRECTING = 2)] = "REDIRECTING"),
        st
      ))();
      function I0(e, t) {
        e.events
          .pipe(
            Sn(
              (n) =>
                n instanceof Xn ||
                n instanceof ma ||
                n instanceof fd ||
                n instanceof li
            ),
            re((n) =>
              n instanceof Xn || n instanceof li
                ? st.COMPLETE
                : n instanceof ma && (0 === n.code || 1 === n.code)
                ? st.REDIRECTING
                : st.FAILED
            ),
            Sn((n) => n !== st.REDIRECTING),
            zr(1)
          )
          .subscribe(() => {
            t();
          });
      }
      function GO(e) {
        throw e;
      }
      function WO(e, t, n) {
        return t.parse("/");
      }
      const qO = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        ZO = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let gt = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            if ("computed" === this.canceledNavigationResolution)
              return this.location.getState()?.ɵrouterPageId;
          }
          get events() {
            return this.navigationTransitions.events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = b(ev)),
              (this.isNgZoneEnabled = !1),
              (this.options = b(ba, { optional: !0 }) || {}),
              (this.pendingTasks = b(tv)),
              (this.errorHandler = this.options.errorHandler || GO),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || WO),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = b(UO)),
              (this.routeReuseStrategy = b($O)),
              (this.titleStrategy = b(b0)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = b(Jr, { optional: !0 })?.flat() ?? []),
              (this.navigationTransitions = b(Ea)),
              (this.urlSerializer = b(oi)),
              (this.location = b(Rc)),
              (this.componentInputBindingEnabled = !!b(va, { optional: !0 })),
              (this.isNgZoneEnabled =
                b(de) instanceof de && de.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new Wr()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = t0(0, null)),
              this.navigationTransitions.setupNavigations(this).subscribe(
                (n) => {
                  (this.lastSuccessfulId = n.id),
                    (this.currentPageId = this.browserPageId ?? 0);
                },
                (n) => {
                  this.console.warn(`Unhandled Navigation Error: ${n}`);
                }
              );
          }
          resetRootComponentType(n) {
            (this.routerState.root.component = n),
              (this.navigationTransitions.rootComponentType = n);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const n = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), ui, n);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(n.url, r, n.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(n, r, o) {
            const i = { replaceUrl: !0 },
              s = o?.navigationId ? o : null;
            if (o) {
              const u = { ...o };
              delete u.navigationId,
                delete u.ɵrouterPageId,
                0 !== Object.keys(u).length && (i.state = u);
            }
            const a = this.parseUrl(n);
            this.scheduleNavigation(a, r, s, i);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          get lastSuccessfulNavigation() {
            return this.navigationTransitions.lastSuccessfulNavigation;
          }
          resetConfig(n) {
            (this.config = n.map(wd)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: u,
              } = r,
              l = u ? this.currentUrlTree.fragment : s;
            let d,
              c = null;
            switch (a) {
              case "merge":
                c = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                c = this.currentUrlTree.queryParams;
                break;
              default:
                c = i || null;
            }
            null !== c && (c = this.removeEmptyProps(c));
            try {
              d = GD(o ? o.snapshot : this.routerState.snapshot.root);
            } catch {
              ("string" != typeof n[0] || !n[0].startsWith("/")) && (n = []),
                (d = this.currentUrlTree.root);
            }
            return WD(d, n, c, l ?? null);
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = Jn(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, ui, null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function QO(e) {
                for (let t = 0; t < e.length; t++)
                  if (null == e[t]) throw new w(4008, !1);
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (((o = !0 === r ? { ...qO } : !1 === r ? { ...ZO } : r), Jn(n)))
              return LD(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return LD(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          scheduleNavigation(n, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, u, l;
            s
              ? ((a = s.resolve), (u = s.reject), (l = s.promise))
              : (l = new Promise((d, f) => {
                  (a = d), (u = f);
                }));
            const c = this.pendingTasks.add();
            return (
              I0(this, () => {
                Promise.resolve().then(() => this.pendingTasks.remove(c));
              }),
              this.navigationTransitions.handleNavigationRequest({
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                rawUrl: n,
                extras: i,
                resolve: a,
                reject: u,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((d) => Promise.reject(d))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n);
            if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
              const s = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId),
              };
              this.location.replaceState(o, "", s);
            } else {
              const i = {
                ...r.extras.state,
                ...this.generateNgRouterState(
                  r.id,
                  (this.browserPageId ?? 0) + 1
                ),
              };
              this.location.go(o, "", i);
            }
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const i =
                this.currentPageId - (this.browserPageId ?? this.currentPageId);
              0 !== i
                ? this.location.historyGo(i)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === i &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class S0 {}
      let JO = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                Sn((n) => n instanceof Xn),
                ti(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = ql(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return Re(o).pipe(er());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : L(null);
              const i = o.pipe(
                Ne((s) =>
                  null === s
                    ? L(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? Re([i, this.loader.loadComponent(r)]).pipe(er())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(gt), N(nv), N(Jt), N(S0), N(bd));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Sd = new M("");
      let M0 = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof dd
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof Xn
                ? ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ))
                : n instanceof li &&
                  0 === n.code &&
                  ((this.lastSource = void 0),
                  (this.restoredId = 0),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.url).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof JD &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new JD(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            !(function Kp() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function ln(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function A0() {
        const e = b(en);
        return (t) => {
          const n = e.get(Hr);
          if (t !== n.components[0]) return;
          const r = e.get(gt),
            o = e.get(N0);
          1 === e.get(Md) && r.initialNavigation(),
            e.get(R0, null, T.Optional)?.setUpPreloading(),
            e.get(Sd, null, T.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const N0 = new M("", { factory: () => new Ut() }),
        Md = new M("", { providedIn: "root", factory: () => 1 }),
        R0 = new M("");
      function nP(e) {
        return ln(0, [
          { provide: R0, useExisting: JO },
          { provide: S0, useExisting: e },
        ]);
      }
      const x0 = new M("ROUTER_FORROOT_GUARD"),
        oP = [
          Rc,
          { provide: oi, useClass: sd },
          gt,
          ci,
          {
            provide: Zr,
            useFactory: function T0(e) {
              return e.routerState.root;
            },
            deps: [gt],
          },
          bd,
          [],
        ];
      function iP() {
        return new hv("Router", gt);
      }
      let O0 = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                oP,
                [],
                { provide: Jr, multi: !0, useValue: n },
                {
                  provide: x0,
                  useFactory: lP,
                  deps: [[gt, new Qi(), new Yi()]],
                },
                { provide: ba, useValue: r || {} },
                r?.useHash
                  ? { provide: Zn, useClass: lA }
                  : { provide: Zn, useClass: Bv },
                {
                  provide: Sd,
                  useFactory: () => {
                    const e = b(TN),
                      t = b(de),
                      n = b(ba),
                      r = b(Ea),
                      o = b(oi);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new M0(o, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? nP(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: hv, multi: !0, useFactory: iP },
                r?.initialNavigation ? cP(r) : [],
                r?.bindToComponentInputs
                  ? ln(8, [s0, { provide: va, useExisting: s0 }]).ɵproviders
                  : [],
                [
                  { provide: P0, useFactory: A0 },
                  { provide: vc, multi: !0, useExisting: P0 },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: Jr, multi: !0, useValue: n }],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(x0, 8));
          }),
          (e.ɵmod = Nn({ type: e })),
          (e.ɵinj = hn({})),
          e
        );
      })();
      function lP(e) {
        return "guarded";
      }
      function cP(e) {
        return [
          "disabled" === e.initialNavigation
            ? ln(3, [
                {
                  provide: lc,
                  multi: !0,
                  useFactory: () => {
                    const t = b(gt);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Md, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? ln(2, [
                { provide: Md, useValue: 0 },
                {
                  provide: lc,
                  multi: !0,
                  deps: [en],
                  useFactory: (t) => {
                    const n = t.get(aA, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const o = t.get(gt),
                              i = t.get(N0);
                            I0(o, () => {
                              r(!0);
                            }),
                              (t.get(Ea).afterPreactivation = () => (
                                r(!0), i.closed ? L(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const P0 = new M(""),
        fP = [];
      let hP = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Nn({ type: e })),
          (e.ɵinj = hn({ imports: [O0.forRoot(fP), O0] })),
          e
        );
      })();
      function pP(e, t) {
        1 & e && (C(0, "pre"), Y(1, "ng generate component xyz"), S());
      }
      function gP(e, t) {
        1 & e && (C(0, "pre"), Y(1, "ng add @angular/material"), S());
      }
      function mP(e, t) {
        1 & e && (C(0, "pre"), Y(1, "ng add @angular/pwa"), S());
      }
      function yP(e, t) {
        1 & e && (C(0, "pre"), Y(1, "ng add _____"), S());
      }
      function vP(e, t) {
        1 & e && (C(0, "pre"), Y(1, "ng test"), S());
      }
      function DP(e, t) {
        1 & e && (C(0, "pre"), Y(1, "ng build"), S());
      }
      let wP = (() => {
          class e {
            constructor() {
              this.title = "anklebox";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Za({
              type: e,
              selectors: [["app-root"]],
              decls: 152,
              vars: 7,
              consts: [
                ["role", "banner", 1, "toolbar"],
                [
                  "width",
                  "40",
                  "alt",
                  "Angular Logo",
                  "src",
                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==",
                ],
                [1, "spacer"],
                [
                  "aria-label",
                  "Angular on twitter",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://twitter.com/angular",
                  "title",
                  "Twitter",
                ],
                [
                  "id",
                  "twitter-logo",
                  "height",
                  "24",
                  "data-name",
                  "Logo",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "viewBox",
                  "0 0 400 400",
                ],
                ["width", "400", "height", "400", "fill", "none"],
                [
                  "d",
                  "M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23",
                  "fill",
                  "#fff",
                ],
                [
                  "aria-label",
                  "Angular on YouTube",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://youtube.com/angular",
                  "title",
                  "YouTube",
                ],
                [
                  "id",
                  "youtube-logo",
                  "height",
                  "24",
                  "width",
                  "24",
                  "data-name",
                  "Logo",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "viewBox",
                  "0 0 24 24",
                  "fill",
                  "#fff",
                ],
                ["d", "M0 0h24v24H0V0z", "fill", "none"],
                [
                  "d",
                  "M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z",
                ],
                ["role", "main", 1, "content"],
                [1, "card", "highlight-card", "card-small"],
                [
                  "id",
                  "rocket",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "101.678",
                  "height",
                  "101.678",
                  "viewBox",
                  "0 0 101.678 101.678",
                ],
                [
                  "id",
                  "Group_83",
                  "data-name",
                  "Group 83",
                  "transform",
                  "translate(-141 -696)",
                ],
                [
                  "id",
                  "Ellipse_8",
                  "data-name",
                  "Ellipse 8",
                  "cx",
                  "50.839",
                  "cy",
                  "50.839",
                  "r",
                  "50.839",
                  "transform",
                  "translate(141 696)",
                  "fill",
                  "#dd0031",
                ],
                [
                  "id",
                  "Group_47",
                  "data-name",
                  "Group 47",
                  "transform",
                  "translate(165.185 720.185)",
                ],
                [
                  "id",
                  "Path_33",
                  "data-name",
                  "Path 33",
                  "d",
                  "M3.4,42.615a3.084,3.084,0,0,0,3.553,3.553,21.419,21.419,0,0,0,12.215-6.107L9.511,30.4A21.419,21.419,0,0,0,3.4,42.615Z",
                  "transform",
                  "translate(0.371 3.363)",
                  "fill",
                  "#fff",
                ],
                [
                  "id",
                  "Path_34",
                  "data-name",
                  "Path 34",
                  "d",
                  "M53.3,3.221A3.09,3.09,0,0,0,50.081,0,48.227,48.227,0,0,0,18.322,13.437c-6-1.666-14.991-1.221-18.322,7.218A33.892,33.892,0,0,1,9.439,25.1l-.333.666a3.013,3.013,0,0,0,.555,3.553L23.985,43.641a2.9,2.9,0,0,0,3.553.555l.666-.333A33.892,33.892,0,0,1,32.647,53.3c8.55-3.664,8.884-12.326,7.218-18.322A48.227,48.227,0,0,0,53.3,3.221ZM34.424,9.772a6.439,6.439,0,1,1,9.106,9.106,6.368,6.368,0,0,1-9.106,0A6.467,6.467,0,0,1,34.424,9.772Z",
                  "transform",
                  "translate(0 0.005)",
                  "fill",
                  "#fff",
                ],
                [
                  "id",
                  "rocket-smoke",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "516.119",
                  "height",
                  "1083.632",
                  "viewBox",
                  "0 0 516.119 1083.632",
                ],
                [
                  "id",
                  "Path_40",
                  "data-name",
                  "Path 40",
                  "d",
                  "M644.6,141S143.02,215.537,147.049,870.207s342.774,201.755,342.774,201.755S404.659,847.213,388.815,762.2c-27.116-145.51-11.551-384.124,271.9-609.1C671.15,139.365,644.6,141,644.6,141Z",
                  "transform",
                  "translate(-147.025 -140.939)",
                  "fill",
                  "#f5f5f5",
                ],
                [1, "card-container"],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://angular.io/tutorial",
                  1,
                  "card",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "24",
                  "height",
                  "24",
                  "viewBox",
                  "0 0 24 24",
                  1,
                  "material-icons",
                ],
                [
                  "d",
                  "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
                ],
                ["d", "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://angular.io/cli",
                  1,
                  "card",
                ],
                [
                  "d",
                  "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
                ],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://material.angular.io",
                  1,
                  "card",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "21.813",
                  "height",
                  "23.453",
                  "viewBox",
                  "0 0 179.2 192.7",
                  2,
                  "margin-right",
                  "8px",
                ],
                [
                  "fill",
                  "#ffa726",
                  "d",
                  "M89.4 0 0 32l13.5 118.4 75.9 42.3 76-42.3L179.2 32 89.4 0z",
                ],
                [
                  "fill",
                  "#fb8c00",
                  "d",
                  "M89.4 0v192.7l76-42.3L179.2 32 89.4 0z",
                ],
                [
                  "fill",
                  "#ffe0b2",
                  "d",
                  "m102.9 146.3-63.3-30.5 36.3-22.4 63.7 30.6-36.7 22.3z",
                ],
                [
                  "fill",
                  "#fff3e0",
                  "d",
                  "M102.9 122.8 39.6 92.2l36.3-22.3 63.7 30.6-36.7 22.3z",
                ],
                [
                  "fill",
                  "#fff",
                  "d",
                  "M102.9 99.3 39.6 68.7l36.3-22.4 63.7 30.6-36.7 22.4z",
                ],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://blog.angular.io/",
                  1,
                  "card",
                ],
                [
                  "d",
                  "M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z",
                ],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://angular.io/devtools/",
                  1,
                  "card",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "enable-background",
                  "new 0 0 24 24",
                  "height",
                  "24px",
                  "viewBox",
                  "0 0 24 24",
                  "width",
                  "24px",
                  "fill",
                  "#000000",
                  1,
                  "material-icons",
                ],
                ["fill", "none", "height", "24", "width", "24"],
                [
                  "d",
                  "M14.73,13.31C15.52,12.24,16,10.93,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.43,0,2.74-0.48,3.81-1.27L19.59,21L21,19.59L14.73,13.31z M9.5,14C7.01,14,5,11.99,5,9.5S7.01,5,9.5,5S14,7.01,14,9.5 S11.99,14,9.5,14z",
                ],
                [
                  "points",
                  "10.29,8.44 9.5,6 8.71,8.44 6.25,8.44 8.26,10.03 7.49,12.5 9.5,10.97 11.51,12.5 10.74,10.03 12.75,8.44",
                ],
                ["type", "hidden"],
                ["selection", ""],
                ["tabindex", "0", 1, "card", "card-small", 3, "click"],
                ["d", "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"],
                [1, "terminal", 3, "ngSwitch"],
                [4, "ngSwitchDefault"],
                [4, "ngSwitchCase"],
                [
                  "title",
                  "Find a Local Meetup",
                  "href",
                  "https://www.meetup.com/find/?keywords=angular",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  1,
                  "circle-link",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "24.607",
                  "height",
                  "23.447",
                  "viewBox",
                  "0 0 24.607 23.447",
                ],
                [
                  "id",
                  "logo--mSwarm",
                  "d",
                  "M21.221,14.95A4.393,4.393,0,0,1,17.6,19.281a4.452,4.452,0,0,1-.8.069c-.09,0-.125.035-.154.117a2.939,2.939,0,0,1-2.506,2.091,2.868,2.868,0,0,1-2.248-.624.168.168,0,0,0-.245-.005,3.926,3.926,0,0,1-2.589.741,4.015,4.015,0,0,1-3.7-3.347,2.7,2.7,0,0,1-.043-.38c0-.106-.042-.146-.143-.166a3.524,3.524,0,0,1-1.516-.69A3.623,3.623,0,0,1,2.23,14.557a3.66,3.66,0,0,1,1.077-3.085.138.138,0,0,0,.026-.2,3.348,3.348,0,0,1-.451-1.821,3.46,3.46,0,0,1,2.749-3.28.44.44,0,0,0,.355-.281,5.072,5.072,0,0,1,3.863-3,5.028,5.028,0,0,1,3.555.666.31.31,0,0,0,.271.03A4.5,4.5,0,0,1,18.3,4.7a4.4,4.4,0,0,1,1.334,2.751,3.658,3.658,0,0,1,.022.706.131.131,0,0,0,.1.157,2.432,2.432,0,0,1,1.574,1.645,2.464,2.464,0,0,1-.7,2.616c-.065.064-.051.1-.014.166A4.321,4.321,0,0,1,21.221,14.95ZM13.4,14.607a2.09,2.09,0,0,0,1.409,1.982,4.7,4.7,0,0,0,1.275.221,1.807,1.807,0,0,0,.9-.151.542.542,0,0,0,.321-.545.558.558,0,0,0-.359-.534,1.2,1.2,0,0,0-.254-.078c-.262-.047-.526-.086-.787-.138a.674.674,0,0,1-.617-.75,3.394,3.394,0,0,1,.218-1.109c.217-.658.509-1.286.79-1.918a15.609,15.609,0,0,0,.745-1.86,1.95,1.95,0,0,0,.06-1.073,1.286,1.286,0,0,0-1.051-1.033,1.977,1.977,0,0,0-1.521.2.339.339,0,0,1-.446-.042c-.1-.092-.2-.189-.307-.284a1.214,1.214,0,0,0-1.643-.061,7.563,7.563,0,0,1-.614.512A.588.588,0,0,1,10.883,8c-.215-.115-.437-.215-.659-.316a2.153,2.153,0,0,0-.695-.248A2.091,2.091,0,0,0,7.541,8.562a9.915,9.915,0,0,0-.405.986c-.559,1.545-1.015,3.123-1.487,4.7a1.528,1.528,0,0,0,.634,1.777,1.755,1.755,0,0,0,1.5.211,1.35,1.35,0,0,0,.824-.858c.543-1.281,1.032-2.584,1.55-3.875.142-.355.28-.712.432-1.064a.548.548,0,0,1,.851-.24.622.622,0,0,1,.185.539,2.161,2.161,0,0,1-.181.621c-.337.852-.68,1.7-1.018,2.552a2.564,2.564,0,0,0-.173.528.624.624,0,0,0,.333.71,1.073,1.073,0,0,0,.814.034,1.22,1.22,0,0,0,.657-.655q.758-1.488,1.511-2.978.35-.687.709-1.37a1.073,1.073,0,0,1,.357-.434.43.43,0,0,1,.463-.016.373.373,0,0,1,.153.387.7.7,0,0,1-.057.236c-.065.157-.127.316-.2.469-.42.883-.846,1.763-1.262,2.648A2.463,2.463,0,0,0,13.4,14.607Zm5.888,6.508a1.09,1.09,0,0,0-2.179.006,1.09,1.09,0,0,0,2.179-.006ZM1.028,12.139a1.038,1.038,0,1,0,.01-2.075,1.038,1.038,0,0,0-.01,2.075ZM13.782.528a1.027,1.027,0,1,0-.011,2.055A1.027,1.027,0,0,0,13.782.528ZM22.21,6.95a.882.882,0,0,0-1.763.011A.882.882,0,0,0,22.21,6.95ZM4.153,4.439a.785.785,0,1,0,.787-.78A.766.766,0,0,0,4.153,4.439Zm8.221,18.22a.676.676,0,1,0-.677.666A.671.671,0,0,0,12.374,22.658ZM22.872,12.2a.674.674,0,0,0-.665.665.656.656,0,0,0,.655.643.634.634,0,0,0,.655-.644A.654.654,0,0,0,22.872,12.2ZM7.171-.123A.546.546,0,0,0,6.613.43a.553.553,0,1,0,1.106,0A.539.539,0,0,0,7.171-.123ZM24.119,9.234a.507.507,0,0,0-.493.488.494.494,0,0,0,.494.494.48.48,0,0,0,.487-.483A.491.491,0,0,0,24.119,9.234Zm-19.454,9.7a.5.5,0,0,0-.488-.488.491.491,0,0,0-.487.5.483.483,0,0,0,.491.479A.49.49,0,0,0,4.665,18.936Z",
                  "transform",
                  "translate(0 0.123)",
                  "fill",
                  "#f64060",
                ],
                [
                  "title",
                  "Join the Conversation on Discord",
                  "href",
                  "https://discord.gg/angular",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  1,
                  "circle-link",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "26",
                  "height",
                  "26",
                  "viewBox",
                  "0 0 245 240",
                ],
                [
                  "d",
                  "M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z",
                ],
                [
                  "d",
                  "M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z",
                ],
                [
                  "href",
                  "https://github.com/angular/angular",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                ],
                [1, "github-star-badge"],
                ["d", "M0 0h24v24H0z", "fill", "none"],
                [
                  "d",
                  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
                ],
                [
                  "d",
                  "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
                  "fill",
                  "#1976d2",
                ],
                [
                  "id",
                  "clouds",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "2611.084",
                  "height",
                  "485.677",
                  "viewBox",
                  "0 0 2611.084 485.677",
                ],
                [
                  "id",
                  "Path_39",
                  "data-name",
                  "Path 39",
                  "d",
                  "M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z",
                  "transform",
                  "translate(142.69 -634.312)",
                  "fill",
                  "#eee",
                ],
              ],
              template: function (n, r) {
                if (1 & n) {
                  const o = (function kg() {
                    return v();
                  })();
                  C(0, "div", 0),
                    Z(1, "img", 1),
                    C(2, "span"),
                    Y(3, "Welcome"),
                    S(),
                    Z(4, "div", 2),
                    C(5, "a", 3),
                    ae(),
                    C(6, "svg", 4),
                    Z(7, "rect", 5)(8, "path", 6),
                    S()(),
                    ue(),
                    C(9, "a", 7),
                    ae(),
                    C(10, "svg", 8),
                    Z(11, "path", 9)(12, "path", 10),
                    S()()(),
                    ue(),
                    C(13, "div", 11)(14, "div", 12),
                    ae(),
                    C(15, "svg", 13)(16, "title"),
                    Y(17, "Rocket Ship"),
                    S(),
                    C(18, "g", 14),
                    Z(19, "circle", 15),
                    C(20, "g", 16),
                    Z(21, "path", 17)(22, "path", 18),
                    S()()(),
                    ue(),
                    C(23, "span"),
                    Y(24),
                    S(),
                    ae(),
                    C(25, "svg", 19)(26, "title"),
                    Y(27, "Rocket Ship Smoke"),
                    S(),
                    Z(28, "path", 20),
                    S()(),
                    ue(),
                    C(29, "h2"),
                    Y(30, "Resources"),
                    S(),
                    C(31, "p"),
                    Y(32, "Here are some links to help you get started:"),
                    S(),
                    C(33, "div", 21)(34, "a", 22),
                    ae(),
                    C(35, "svg", 23),
                    Z(36, "path", 24),
                    S(),
                    ue(),
                    C(37, "span"),
                    Y(38, "Learn Angular"),
                    S(),
                    ae(),
                    C(39, "svg", 23),
                    Z(40, "path", 25),
                    S()(),
                    ue(),
                    C(41, "a", 26),
                    ae(),
                    C(42, "svg", 23),
                    Z(43, "path", 27),
                    S(),
                    ue(),
                    C(44, "span"),
                    Y(45, "CLI Documentation"),
                    S(),
                    ae(),
                    C(46, "svg", 23),
                    Z(47, "path", 25),
                    S()(),
                    ue(),
                    C(48, "a", 28),
                    ae(),
                    C(49, "svg", 29),
                    Z(50, "path", 30)(51, "path", 31)(52, "path", 32)(
                      53,
                      "path",
                      33
                    )(54, "path", 34),
                    S(),
                    ue(),
                    C(55, "span"),
                    Y(56, "Angular Material"),
                    S(),
                    ae(),
                    C(57, "svg", 23),
                    Z(58, "path", 25),
                    S()(),
                    ue(),
                    C(59, "a", 35),
                    ae(),
                    C(60, "svg", 23),
                    Z(61, "path", 36),
                    S(),
                    ue(),
                    C(62, "span"),
                    Y(63, "Angular Blog"),
                    S(),
                    ae(),
                    C(64, "svg", 23),
                    Z(65, "path", 25),
                    S()(),
                    ue(),
                    C(66, "a", 37),
                    ae(),
                    C(67, "svg", 38)(68, "g"),
                    Z(69, "rect", 39),
                    S(),
                    C(70, "g")(71, "g"),
                    Z(72, "path", 40)(73, "polygon", 41),
                    S()()(),
                    ue(),
                    C(74, "span"),
                    Y(75, "Angular DevTools"),
                    S(),
                    ae(),
                    C(76, "svg", 23),
                    Z(77, "path", 25),
                    S()()(),
                    ue(),
                    C(78, "h2"),
                    Y(79, "Next Steps"),
                    S(),
                    C(80, "p"),
                    Y(81, "What do you want to do next with your app?"),
                    S(),
                    Z(82, "input", 42, 43),
                    C(84, "div", 21)(85, "button", 44),
                    nn("click", function () {
                      return Ln(o), kn((Cn(83).value = "component"));
                    }),
                    ae(),
                    C(86, "svg", 23),
                    Z(87, "path", 45),
                    S(),
                    ue(),
                    C(88, "span"),
                    Y(89, "New Component"),
                    S()(),
                    C(90, "button", 44),
                    nn("click", function () {
                      return Ln(o), kn((Cn(83).value = "material"));
                    }),
                    ae(),
                    C(91, "svg", 23),
                    Z(92, "path", 45),
                    S(),
                    ue(),
                    C(93, "span"),
                    Y(94, "Angular Material"),
                    S()(),
                    C(95, "button", 44),
                    nn("click", function () {
                      return Ln(o), kn((Cn(83).value = "pwa"));
                    }),
                    ae(),
                    C(96, "svg", 23),
                    Z(97, "path", 45),
                    S(),
                    ue(),
                    C(98, "span"),
                    Y(99, "Add PWA Support"),
                    S()(),
                    C(100, "button", 44),
                    nn("click", function () {
                      return Ln(o), kn((Cn(83).value = "dependency"));
                    }),
                    ae(),
                    C(101, "svg", 23),
                    Z(102, "path", 45),
                    S(),
                    ue(),
                    C(103, "span"),
                    Y(104, "Add Dependency"),
                    S()(),
                    C(105, "button", 44),
                    nn("click", function () {
                      return Ln(o), kn((Cn(83).value = "test"));
                    }),
                    ae(),
                    C(106, "svg", 23),
                    Z(107, "path", 45),
                    S(),
                    ue(),
                    C(108, "span"),
                    Y(109, "Run and Watch Tests"),
                    S()(),
                    C(110, "button", 44),
                    nn("click", function () {
                      return Ln(o), kn((Cn(83).value = "build"));
                    }),
                    ae(),
                    C(111, "svg", 23),
                    Z(112, "path", 45),
                    S(),
                    ue(),
                    C(113, "span"),
                    Y(114, "Build for Production"),
                    S()()(),
                    C(115, "div", 46),
                    zn(116, pP, 2, 0, "pre", 47),
                    zn(117, gP, 2, 0, "pre", 48),
                    zn(118, mP, 2, 0, "pre", 48),
                    zn(119, yP, 2, 0, "pre", 48),
                    zn(120, vP, 2, 0, "pre", 48),
                    zn(121, DP, 2, 0, "pre", 48),
                    S(),
                    C(122, "div", 21)(123, "a", 49),
                    ae(),
                    C(124, "svg", 50)(125, "title"),
                    Y(126, "Meetup Logo"),
                    S(),
                    Z(127, "path", 51),
                    S()(),
                    ue(),
                    C(128, "a", 52),
                    ae(),
                    C(129, "svg", 53)(130, "title"),
                    Y(131, "Discord Logo"),
                    S(),
                    Z(132, "path", 54)(133, "path", 55),
                    S()()(),
                    ue(),
                    C(134, "footer"),
                    Y(135, " Love Angular?\xa0 "),
                    C(136, "a", 56),
                    Y(137, " Give our repo a star. "),
                    C(138, "div", 57),
                    ae(),
                    C(139, "svg", 23),
                    Z(140, "path", 58)(141, "path", 59),
                    S(),
                    Y(142, " Star "),
                    S()(),
                    ue(),
                    C(143, "a", 56),
                    ae(),
                    C(144, "svg", 23),
                    Z(145, "path", 60)(146, "path", 58),
                    S()()(),
                    C(147, "svg", 61)(148, "title"),
                    Y(149, "Gray Clouds Background"),
                    S(),
                    Z(150, "path", 62),
                    S()(),
                    ue(),
                    Z(151, "router-outlet");
                }
                if (2 & n) {
                  const o = Cn(83);
                  wn(24),
                    Fs("", r.title, " app is running!"),
                    wn(91),
                    _n("ngSwitch", o.value),
                    wn(2),
                    _n("ngSwitchCase", "material"),
                    wn(1),
                    _n("ngSwitchCase", "pwa"),
                    wn(1),
                    _n("ngSwitchCase", "dependency"),
                    wn(1),
                    _n("ngSwitchCase", "test"),
                    wn(1),
                    _n("ngSwitchCase", "build");
                }
              },
              dependencies: [ra, tD, nD, vd],
              styles: [
                '[_nghost-%COMP%] {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n    font-size: 14px;\n    color: #333;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%] {\n    margin: 8px 0;\n  }\n\n  p[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n\n  .spacer[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .toolbar[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 8px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #youtube-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%]:hover, .toolbar[_ngcontent-%COMP%]   #youtube-logo[_ngcontent-%COMP%]:hover {\n    opacity: 0.8;\n  }\n\n  .content[_ngcontent-%COMP%] {\n    display: flex;\n    margin: 82px auto 32px;\n    padding: 0 16px;\n    max-width: 960px;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%] {\n    height: 24px;\n    width: auto;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 8px;\n  }\n\n  .card[_ngcontent-%COMP%]   svg.material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: #888;\n  }\n\n  .card-container[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    margin-top: 16px;\n  }\n\n  .card[_ngcontent-%COMP%] {\n    all: unset;\n    border-radius: 4px;\n    border: 1px solid #eee;\n    background-color: #fafafa;\n    height: 40px;\n    width: 200px;\n    margin: 0 8px 16px;\n    padding: 16px;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    transition: all 0.2s ease-in-out;\n    line-height: 24px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 0;\n  }\n\n  .card.card-small[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 168px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card) {\n    cursor: pointer;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover {\n    transform: translateY(-3px);\n    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover   .material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: rgb(105, 103, 103);\n  }\n\n  .card.highlight-card[_ngcontent-%COMP%] {\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n    border: none;\n    width: auto;\n    min-width: 30%;\n    position: relative;\n  }\n\n  .card.card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin-left: 60px;\n  }\n\n  svg#rocket[_ngcontent-%COMP%] {\n    width: 80px;\n    position: absolute;\n    left: -10px;\n    top: -24px;\n  }\n\n  svg#rocket-smoke[_ngcontent-%COMP%] {\n    height: calc(100vh - 95px);\n    position: absolute;\n    top: 10px;\n    right: 180px;\n    z-index: -10;\n  }\n\n  a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover {\n    color: #1976d2;\n    text-decoration: none;\n  }\n\n  a[_ngcontent-%COMP%]:hover {\n    color: #125699;\n  }\n\n  .terminal[_ngcontent-%COMP%] {\n    position: relative;\n    width: 80%;\n    max-width: 600px;\n    border-radius: 6px;\n    padding-top: 45px;\n    margin-top: 8px;\n    overflow: hidden;\n    background-color: rgb(15, 15, 16);\n  }\n\n  .terminal[_ngcontent-%COMP%]::before {\n    content: "\\2022 \\2022 \\2022";\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 4px;\n    background: rgb(58, 58, 58);\n    color: #c2c3c4;\n    width: 100%;\n    font-size: 2rem;\n    line-height: 0;\n    padding: 14px 0;\n    text-indent: 4px;\n  }\n\n  .terminal[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;\n    color: white;\n    padding: 0 1rem 1rem;\n    margin: 0;\n  }\n\n  .circle-link[_ngcontent-%COMP%] {\n    height: 40px;\n    width: 40px;\n    border-radius: 40px;\n    margin: 8px;\n    background-color: white;\n    border: 1px solid #eeeeee;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n    transition: 1s ease-out;\n  }\n\n  .circle-link[_ngcontent-%COMP%]:hover {\n    transform: translateY(-0.25rem);\n    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n  }\n\n  footer[_ngcontent-%COMP%] {\n    margin-top: 8px;\n    display: flex;\n    align-items: center;\n    line-height: 20px;\n  }\n\n  footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%] {\n    color: #24292e;\n    display: flex;\n    align-items: center;\n    font-size: 12px;\n    padding: 3px 10px;\n    border: 1px solid rgba(27,31,35,.2);\n    border-radius: 3px;\n    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);\n    margin-left: 4px;\n    font-weight: 600;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]:hover {\n    background-image: linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);\n    border-color: rgba(27,31,35,.35);\n    background-position: -.5em;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 16px;\n    margin-right: 4px;\n  }\n\n  svg#clouds[_ngcontent-%COMP%] {\n    position: fixed;\n    bottom: -160px;\n    left: -230px;\n    z-index: -10;\n    width: 1920px;\n  }\n\n  \n\n  @media screen and (max-width: 767px) {\n    .card-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.circle-link), .terminal[_ngcontent-%COMP%] {\n      width: 100%;\n    }\n\n    .card[_ngcontent-%COMP%]:not(.highlight-card) {\n      height: 16px;\n      margin: 8px 0;\n    }\n\n    .card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      margin-left: 72px;\n    }\n\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      right: 120px;\n      transform: rotate(-5deg);\n    }\n  }\n\n  @media screen and (max-width: 575px) {\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      display: none;\n      visibility: hidden;\n    }\n  }',
              ],
            })),
            e
          );
        })(),
        CP = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Nn({ type: e, bootstrap: [wP] })),
            (e.ɵinj = hn({ imports: [SR, hP] })),
            e
          );
        })();
      bR()
        .bootstrapModule(CP)
        .catch((e) => console.error(e));
    },
  },
  (ne) => {
    ne((ne.s = 716));
  },
]);
