//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), l = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e, t, n, r) {
		var i = n ? n.call(r, e, t) : void 0;
		if (i !== void 0) return !!i;
		if (e === t) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var a = Object.keys(e), o = Object.keys(t);
		if (a.length !== o.length) return !1;
		for (var s = Object.prototype.hasOwnProperty.bind(t), c = 0; c < a.length; c++) {
			var l = a[c];
			if (!s(l)) return !1;
			var u = e[l], d = t[l];
			if (i = n ? n.call(r, u, d, l) : void 0, i === !1 || i === void 0 && u !== d) return !1;
		}
		return !0;
	};
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e, t, n, r, i, a, o, s) {
		if (!e) {
			var c;
			if (t === void 0) c = /* @__PURE__ */ Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
			else {
				var l = [
					n,
					r,
					i,
					a,
					o,
					s
				], u = 0;
				c = Error(t.replace(/%s/g, function() {
					return l[u++];
				})), c.name = "Invariant Violation";
			}
			throw c.framesToPop = 1, c;
		}
	};
})), d = /* @__PURE__ */ o(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = "~";
	function i() {}
	Object.create && (i.prototype = Object.create(null), new i().__proto__ || (r = !1));
	function a(e, t, n) {
		this.fn = e, this.context = t, this.once = n || !1;
	}
	function o(e, t, n, i, o) {
		if (typeof n != "function") throw TypeError("The listener must be a function");
		var s = new a(n, i || e, o), c = r ? r + t : t;
		return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e;
	}
	function s(e, t) {
		--e._eventsCount === 0 ? e._events = new i() : delete e._events[t];
	}
	function c() {
		this._events = new i(), this._eventsCount = 0;
	}
	c.prototype.eventNames = function() {
		var e = [], t, i;
		if (this._eventsCount === 0) return e;
		for (i in t = this._events) n.call(t, i) && e.push(r ? i.slice(1) : i);
		return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e;
	}, c.prototype.listeners = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		if (!n) return [];
		if (n.fn) return [n.fn];
		for (var i = 0, a = n.length, o = Array(a); i < a; i++) o[i] = n[i].fn;
		return o;
	}, c.prototype.listenerCount = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		return n ? n.fn ? 1 : n.length : 0;
	}, c.prototype.emit = function(e, t, n, i, a, o) {
		var s = r ? r + e : e;
		if (!this._events[s]) return !1;
		var c = this._events[s], l = arguments.length, u, d;
		if (c.fn) {
			switch (c.once && this.removeListener(e, c.fn, void 0, !0), l) {
				case 1: return c.fn.call(c.context), !0;
				case 2: return c.fn.call(c.context, t), !0;
				case 3: return c.fn.call(c.context, t, n), !0;
				case 4: return c.fn.call(c.context, t, n, i), !0;
				case 5: return c.fn.call(c.context, t, n, i, a), !0;
				case 6: return c.fn.call(c.context, t, n, i, a, o), !0;
			}
			for (d = 1, u = Array(l - 1); d < l; d++) u[d - 1] = arguments[d];
			c.fn.apply(c.context, u);
		} else {
			var f = c.length, p;
			for (d = 0; d < f; d++) switch (c[d].once && this.removeListener(e, c[d].fn, void 0, !0), l) {
				case 1:
					c[d].fn.call(c[d].context);
					break;
				case 2:
					c[d].fn.call(c[d].context, t);
					break;
				case 3:
					c[d].fn.call(c[d].context, t, n);
					break;
				case 4:
					c[d].fn.call(c[d].context, t, n, i);
					break;
				default:
					if (!u) for (p = 1, u = Array(l - 1); p < l; p++) u[p - 1] = arguments[p];
					c[d].fn.apply(c[d].context, u);
			}
		}
		return !0;
	}, c.prototype.on = function(e, t, n) {
		return o(this, e, t, n, !1);
	}, c.prototype.once = function(e, t, n) {
		return o(this, e, t, n, !0);
	}, c.prototype.removeListener = function(e, t, n, i) {
		var a = r ? r + e : e;
		if (!this._events[a]) return this;
		if (!t) return s(this, a), this;
		var o = this._events[a];
		if (o.fn) o.fn === t && (!i || o.once) && (!n || o.context === n) && s(this, a);
		else {
			for (var c = 0, l = [], u = o.length; c < u; c++) (o[c].fn !== t || i && !o[c].once || n && o[c].context !== n) && l.push(o[c]);
			l.length ? this._events[a] = l.length === 1 ? l[0] : l : s(this, a);
		}
		return this;
	}, c.prototype.removeAllListeners = function(e) {
		var t;
		return e ? (t = r ? r + e : e, this._events[t] && s(this, t)) : (this._events = new i(), this._eventsCount = 0), this;
	}, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = r, c.EventEmitter = c, t !== void 0 && (t.exports = c);
})), f = /* @__PURE__ */ c(l(), 1), p = /* @__PURE__ */ c(u(), 1), m = (/* @__PURE__ */ c(d(), 1)).default, h = Object.defineProperty, g = Object.defineProperties, _ = Object.getOwnPropertyDescriptors, v = Object.getOwnPropertySymbols, y = Object.prototype.hasOwnProperty, b = Object.prototype.propertyIsEnumerable, x = (e, t, n) => t in e ? h(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, S = (e, t) => {
	for (var n in t ||= {}) y.call(t, n) && x(e, n, t[n]);
	if (v) for (var n of v(t)) b.call(t, n) && x(e, n, t[n]);
	return e;
}, C = (e, t) => g(e, _(t)), w = (e, t) => {
	var n = {};
	for (var r in e) y.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && v) for (var r of v(e)) t.indexOf(r) < 0 && b.call(e, r) && (n[r] = e[r]);
	return n;
}, T = (e, t) => {
	for (var n in t) h(e, n, {
		get: t[n],
		enumerable: !0
	});
}, E = {};
T(E, {
	_1: () => ee,
	_2: () => ne,
	_3: () => ie,
	_4: () => oe,
	_5: () => ce,
	_6: () => ue,
	_7: () => fe,
	_8: () => me,
	__1: () => te,
	__2: () => re,
	__3: () => ae,
	__4: () => se,
	__5: () => le,
	__6: () => de,
	__7: () => pe,
	__8: () => he,
	app: () => O
});
function D(e, t, n) {
	for (var r = Array(n), i = 0, a = t; i < n;) r[i] = e[a], i = i + 1 | 0, a = a + 1 | 0;
	return r;
}
function O(e, t) {
	for (;;) {
		var n = t, r = e, i = r.length, a = i === 0 ? 1 : i, o = a - n.length | 0;
		if (o === 0) return r.apply(null, n);
		if (o >= 0) return function(e, t) {
			return function(n) {
				return O(e, t.concat([n]));
			};
		}(r, n);
		t = D(n, a, -o | 0), e = r.apply(null, D(n, 0, a));
	}
}
function ee(e, t) {
	var n = e.length;
	if (n === 1) return e(t);
	switch (n) {
		case 1: return e(t);
		case 2: return function(n) {
			return e(t, n);
		};
		case 3: return function(n, r) {
			return e(t, n, r);
		};
		case 4: return function(n, r, i) {
			return e(t, n, r, i);
		};
		case 5: return function(n, r, i, a) {
			return e(t, n, r, i, a);
		};
		case 6: return function(n, r, i, a, o) {
			return e(t, n, r, i, a, o);
		};
		case 7: return function(n, r, i, a, o, s) {
			return e(t, n, r, i, a, o, s);
		};
		default: return O(e, [t]);
	}
}
function te(e) {
	return e.length === 1 ? e : function(t) {
		return ee(e, t);
	};
}
function ne(e, t, n) {
	var r = e.length;
	if (r === 2) return e(t, n);
	switch (r) {
		case 1: return O(e(t), [n]);
		case 2: return e(t, n);
		case 3: return function(r) {
			return e(t, n, r);
		};
		case 4: return function(r, i) {
			return e(t, n, r, i);
		};
		case 5: return function(r, i, a) {
			return e(t, n, r, i, a);
		};
		case 6: return function(r, i, a, o) {
			return e(t, n, r, i, a, o);
		};
		case 7: return function(r, i, a, o, s) {
			return e(t, n, r, i, a, o, s);
		};
		default: return O(e, [t, n]);
	}
}
function re(e) {
	return e.length === 2 ? e : function(t, n) {
		return ne(e, t, n);
	};
}
function ie(e, t, n, r) {
	var i = e.length;
	if (i === 3) return e(t, n, r);
	switch (i) {
		case 1: return O(e(t), [n, r]);
		case 2: return O(e(t, n), [r]);
		case 3: return e(t, n, r);
		case 4: return function(i) {
			return e(t, n, r, i);
		};
		case 5: return function(i, a) {
			return e(t, n, r, i, a);
		};
		case 6: return function(i, a, o) {
			return e(t, n, r, i, a, o);
		};
		case 7: return function(i, a, o, s) {
			return e(t, n, r, i, a, o, s);
		};
		default: return O(e, [
			t,
			n,
			r
		]);
	}
}
function ae(e) {
	return e.length === 3 ? e : function(t, n, r) {
		return ie(e, t, n, r);
	};
}
function oe(e, t, n, r, i) {
	var a = e.length;
	if (a === 4) return e(t, n, r, i);
	switch (a) {
		case 1: return O(e(t), [
			n,
			r,
			i
		]);
		case 2: return O(e(t, n), [r, i]);
		case 3: return O(e(t, n, r), [i]);
		case 4: return e(t, n, r, i);
		case 5: return function(a) {
			return e(t, n, r, i, a);
		};
		case 6: return function(a, o) {
			return e(t, n, r, i, a, o);
		};
		case 7: return function(a, o, s) {
			return e(t, n, r, i, a, o, s);
		};
		default: return O(e, [
			t,
			n,
			r,
			i
		]);
	}
}
function se(e) {
	return e.length === 4 ? e : function(t, n, r, i) {
		return oe(e, t, n, r, i);
	};
}
function ce(e, t, n, r, i, a) {
	var o = e.length;
	if (o === 5) return e(t, n, r, i, a);
	switch (o) {
		case 1: return O(e(t), [
			n,
			r,
			i,
			a
		]);
		case 2: return O(e(t, n), [
			r,
			i,
			a
		]);
		case 3: return O(e(t, n, r), [i, a]);
		case 4: return O(e(t, n, r, i), [a]);
		case 5: return e(t, n, r, i, a);
		case 6: return function(o) {
			return e(t, n, r, i, a, o);
		};
		case 7: return function(o, s) {
			return e(t, n, r, i, a, o, s);
		};
		default: return O(e, [
			t,
			n,
			r,
			i,
			a
		]);
	}
}
function le(e) {
	return e.length === 5 ? e : function(t, n, r, i, a) {
		return ce(e, t, n, r, i, a);
	};
}
function ue(e, t, n, r, i, a, o) {
	var s = e.length;
	if (s === 6) return e(t, n, r, i, a, o);
	switch (s) {
		case 1: return O(e(t), [
			n,
			r,
			i,
			a,
			o
		]);
		case 2: return O(e(t, n), [
			r,
			i,
			a,
			o
		]);
		case 3: return O(e(t, n, r), [
			i,
			a,
			o
		]);
		case 4: return O(e(t, n, r, i), [a, o]);
		case 5: return O(e(t, n, r, i, a), [o]);
		case 6: return e(t, n, r, i, a, o);
		case 7: return function(s) {
			return e(t, n, r, i, a, o, s);
		};
		default: return O(e, [
			t,
			n,
			r,
			i,
			a,
			o
		]);
	}
}
function de(e) {
	return e.length === 6 ? e : function(t, n, r, i, a, o) {
		return ue(e, t, n, r, i, a, o);
	};
}
function fe(e, t, n, r, i, a, o, s) {
	var c = e.length;
	if (c === 7) return e(t, n, r, i, a, o, s);
	switch (c) {
		case 1: return O(e(t), [
			n,
			r,
			i,
			a,
			o,
			s
		]);
		case 2: return O(e(t, n), [
			r,
			i,
			a,
			o,
			s
		]);
		case 3: return O(e(t, n, r), [
			i,
			a,
			o,
			s
		]);
		case 4: return O(e(t, n, r, i), [
			a,
			o,
			s
		]);
		case 5: return O(e(t, n, r, i, a), [o, s]);
		case 6: return O(e(t, n, r, i, a, o), [s]);
		case 7: return e(t, n, r, i, a, o, s);
		default: return O(e, [
			t,
			n,
			r,
			i,
			a,
			o,
			s
		]);
	}
}
function pe(e) {
	return e.length === 7 ? e : function(t, n, r, i, a, o, s) {
		return fe(e, t, n, r, i, a, o, s);
	};
}
function me(e, t, n, r, i, a, o, s, c) {
	var l = e.length;
	if (l === 8) return e(t, n, r, i, a, o, s, c);
	switch (l) {
		case 1: return O(e(t), [
			n,
			r,
			i,
			a,
			o,
			s,
			c
		]);
		case 2: return O(e(t, n), [
			r,
			i,
			a,
			o,
			s,
			c
		]);
		case 3: return O(e(t, n, r), [
			i,
			a,
			o,
			s,
			c
		]);
		case 4: return O(e(t, n, r, i), [
			a,
			o,
			s,
			c
		]);
		case 5: return O(e(t, n, r, i, a), [
			o,
			s,
			c
		]);
		case 6: return O(e(t, n, r, i, a, o), [s, c]);
		case 7: return O(e(t, n, r, i, a, o, s), [c]);
		default: return O(e, [
			t,
			n,
			r,
			i,
			a,
			o,
			s,
			c
		]);
	}
}
function he(e) {
	return e.length === 8 ? e : function(t, n, r, i, a, o, s, c) {
		return me(e, t, n, r, i, a, o, s, c);
	};
}
var ge = {};
T(ge, {
	$$Map: () => Ye,
	$$Set: () => Xe,
	RenderDelegate: () => Ze,
	mount: () => Qe,
	renderWithDelegate: () => et,
	visit: () => $e
});
var _e = {};
T(_e, {
	create: () => Ge,
	isNode: () => Ke,
	shallowCopy: () => qe,
	symbol: () => We
});
function ve(e) {
	var t = typeof e;
	return t === "undefined" ? 3 : e === null ? 2 : t === "number" ? {
		TAG: 0,
		_0: e
	} : t === "bigint" ? {
		TAG: 5,
		_0: e
	} : t === "string" ? {
		TAG: 1,
		_0: e
	} : t === "boolean" ? +(e === !0) : t === "symbol" ? {
		TAG: 4,
		_0: e
	} : t === "function" ? {
		TAG: 2,
		_0: e
	} : {
		TAG: 3,
		_0: e
	};
}
function ye(e, t) {
	switch (t) {
		case 0: return e === void 0;
		case 1: return e === null;
		case 2: return typeof e == "boolean";
		case 3: return typeof e == "number";
		case 4: return typeof e == "string";
		case 5: return typeof e == "function";
		case 6: return typeof e == "object";
		case 7: return typeof e == "symbol";
		case 8: return typeof e == "bigint";
	}
}
function be(e) {
	return e === void 0 ? { BS_PRIVATE_NESTED_SOME_NONE: 0 } : e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? { BS_PRIVATE_NESTED_SOME_NONE: e.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0 } : e;
}
function xe(e) {
	if (!(e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) return e;
	var t = e.BS_PRIVATE_NESTED_SOME_NONE;
	if (t !== 0) return { BS_PRIVATE_NESTED_SOME_NONE: t - 1 | 0 };
}
function Se(e, t) {
	for (;;) {
		var n = t, r = e;
		if (!r) return n;
		var i = {
			hd: r.hd,
			tl: 0
		};
		n.tl = i, t = i, e = r.tl;
	}
}
function Ce(e, t, n) {
	for (;;) {
		var r = t, i = e;
		if (!i) return;
		var a = {
			hd: n(i.hd),
			tl: 0
		};
		r.tl = a, t = a, e = i.tl;
	}
}
function we(e, t, n, r) {
	for (;;) {
		var i = r, a = n, o = t;
		if (!a) return;
		var s = {
			hd: e(o, a.hd),
			tl: 0
		};
		i.tl = s, r = s, n = a.tl, t = o + 1 | 0;
	}
}
function Te(e, t) {
	if (!e) return t;
	var n = {
		hd: e.hd,
		tl: 0
	};
	return Se(e.tl, n).tl = t, n;
}
function Ee(e, t) {
	if (!e) return 0;
	var n = {
		hd: t(e.hd),
		tl: 0
	};
	return Ce(e.tl, n, t), n;
}
function De(e, t) {
	return Ee(e, te(t));
}
function Oe(e, t) {
	if (!e) return 0;
	var n = {
		hd: t(0, e.hd),
		tl: 0
	};
	return we(t, 1, e.tl, n), n;
}
function ke(e, t) {
	return Oe(e, re(t));
}
function Ae(e) {
	for (var t = e, n = 0;;) {
		var r = n, i = t;
		if (!i) return r;
		n = r + 1 | 0, t = i.tl;
	}
}
function je(e, t, n) {
	for (;;) {
		var r = n, i = t;
		if (!r) return;
		e[i] = r.hd, n = r.tl, t = i + 1 | 0;
	}
}
function Me(e) {
	for (var t = e.length - 1 | 0, n = 0;;) {
		var r = n, i = t;
		if (i < 0) return r;
		n = {
			hd: e[i],
			tl: r
		}, t = i - 1 | 0;
	}
}
function Ne(e) {
	var t = Ae(e), n = Array(t);
	return je(n, 0, e), n;
}
function Pe(e, t) {
	for (;;) {
		var n = e;
		if (!n) return;
		t(n.hd), e = n.tl;
	}
}
function Fe(e, t) {
	Pe(e, te(t));
}
function Ie(e, t, n) {
	for (;;) {
		var r = t, i = e;
		if (!i) return r;
		t = n(r, i.hd), e = i.tl;
	}
}
function Le(e, t, n, r) {
	for (let i in r) if (r.hasOwnProperty(i)) {
		let a = r[i];
		(!n.hasOwnProperty(i) || !(0, f.default)(n[i], a)) && ((a == null || typeof a == "number" && isNaN(a) || typeof a == "number" && !isFinite(a)) && console.warn(`Warning: applying a potentially erroneous property value. ${i}: ${a}`), e.setProperty(t, i, a), n[i] = a);
	}
}
function Re(e, t) {
	if (t in e) return be(e[t]);
}
function ze(e) {
	if (e !== void 0) return xe(e);
	throw Error("getExn");
}
function Be(e, t, n, r) {
	Le(e, t, n, r);
}
function Ve(e, t) {
	return Math.imul(e ^ t, 16777619);
}
function He(e, t) {
	for (var n = e, r = 0, i = t.length; r <= i; ++r) n = Ve(n, t.charCodeAt(r) | 0);
	return n;
}
function Ue(e, t, n) {
	var r = He(-2128831035, e), i = Re(t, "key");
	return Ie(n, i !== void 0 && ye(i, 4) ? He(r, i) : He(r, ze(JSON.stringify(t))), Ve) & 2147483647;
}
var We = "__ELEM_NODE__";
function Ge(e, t, n) {
	var r = Me(n);
	return {
		symbol: We,
		hash: Ue(e, t, De(r, function(e) {
			return Ve(e.hash, e.outputChannel);
		})),
		kind: e,
		props: t,
		outputChannel: 0,
		children: r
	};
}
function Ke(e) {
	var t = ve(e);
	if (typeof t == "number" || t.TAG !== 3) return !1;
	var n = ve(e.symbol);
	return typeof n == "number" || n.TAG !== 1 ? !1 : n._0 === We;
}
function qe(e) {
	return {
		symbol: e.symbol,
		hash: e.hash,
		kind: e.kind,
		props: Object.assign({}, e.props),
		outputChannel: e.outputChannel,
		generation: { contents: 0 }
	};
}
function Je(e) {
	return Array.from(e.values());
}
var Ye = { valuesArray: Je }, Xe = {}, Ze = {};
function Qe(e, t) {
	var n = e.getNodeMap();
	if (n.has(t.hash)) {
		var r = n.get(t.hash);
		return Be(e, r.hash, r.props, t.props);
	}
	e.createNode(t.hash, t.kind), Be(e, t.hash, {}, t.props), Fe(t.children, function(n) {
		e.appendChild(t.hash, n.hash, n.outputChannel);
	}), n.set(t.hash, qe(t));
}
function $e(e, t, n) {
	for (;;) {
		var r = n, i = function(e) {
			t.add(e.hash);
		};
		if (!r) return;
		var a = r.tl, o = r.hd;
		if (t.has(o.hash)) {
			n = a;
			continue;
		}
		i(o), Qe(e, o), n = Te(o.children, a);
	}
}
function et(e, t, n, r) {
	var i = /* @__PURE__ */ new Set(), a = ke(Me(t), function(e, t) {
		return Ge("root", {
			channel: e,
			fadeInMs: n,
			fadeOutMs: r
		}, [t]);
	});
	$e(e, i, a), e.activateRoots(Ne(De(a, function(e) {
		return e.hash;
	}))), e.commitUpdates();
}
var tt = E, nt = ge, rt = function(e, t, n, r) {
	return tt._4(nt.renderWithDelegate, e, t, n, r);
}, it = E, at = _e, ot = function(e, t, n) {
	return it._3(at.create, e, t, n);
}, st = at.isNode;
at.shallowCopy;
function k(e) {
	return typeof e == "number" ? ot("const", { value: e }, []) : ((0, p.default)(ct(e), `Whoops, expecting a Node type here! Got: ${typeof e}`), e);
}
function ct(e) {
	return st(e);
}
function A(e, t, n) {
	return ot(e, t, n.map(k));
}
function lt(e, t) {
	return Array.from({ length: t }, (t, n) => C(S({}, e), { outputChannel: n }));
}
var ut = {};
T(ut, {
	accum: () => ht,
	biquad: () => Vt,
	capture: () => Jt,
	constant: () => dt,
	convolve: () => Tt,
	counter: () => mt,
	delay: () => Ft,
	env: () => Nt,
	fft: () => qt,
	latch: () => vt,
	maxhold: () => yt,
	meter: () => Wt,
	metro: () => St,
	mm1p: () => Rt,
	once: () => bt,
	phasor: () => gt,
	pole: () => Mt,
	prewarp: () => Lt,
	rand: () => xt,
	sample: () => Ct,
	sampleseq: () => At,
	sampleseq2: () => jt,
	scope: () => Kt,
	sdelay: () => It,
	seq: () => Et,
	seq2: () => Dt,
	snapshot: () => Gt,
	sparseq: () => Ot,
	sparseq2: () => kt,
	sr: () => ft,
	svf: () => zt,
	svfshelf: () => Bt,
	syncphasor: () => _t,
	table: () => wt,
	tapIn: () => Ht,
	tapOut: () => Ut,
	time: () => pt,
	z: () => Pt
});
function dt(e) {
	return A("const", e, []);
}
function ft() {
	return A("sr", {}, []);
}
function pt() {
	return A("time", {}, []);
}
function mt(e) {
	return A("counter", {}, [k(e)]);
}
function ht(e, t) {
	return A("accum", {}, [k(e), k(t)]);
}
function gt(e) {
	return A("phasor", {}, [k(e)]);
}
function _t(e, t) {
	return A("sphasor", {}, [k(e), k(t)]);
}
function vt(e, t) {
	return A("latch", {}, [k(e), k(t)]);
}
function yt(e, t, n) {
	return A("maxhold", e, [k(t), k(n)]);
}
function bt(e, t) {
	return A("once", e, [k(t)]);
}
function xt(e) {
	return A("rand", e || {}, []);
}
function St(e) {
	return A("metro", e || {}, []);
}
function Ct(e, t, n) {
	return A("sample", e, [k(t), k(n)]);
}
function wt(e, t) {
	return A("table", e, [k(t)]);
}
function Tt(e, t) {
	return A("convolve", e, [k(t)]);
}
function Et(e, t, n) {
	return A("seq", e, [k(t), k(n)]);
}
function Dt(e, t, n) {
	return A("seq2", e, [k(t), k(n)]);
}
function Ot(e, t, n) {
	return A("sparseq", e, [k(t), k(n)]);
}
function kt(e, t) {
	return A("sparseq2", e, [k(t)]);
}
function At(e, t) {
	return A("sampleseq", e, [k(t)]);
}
function jt(e, t) {
	return A("sampleseq2", e, [k(t)]);
}
function Mt(e, t) {
	return A("pole", {}, [k(e), k(t)]);
}
function Nt(e, t, n) {
	return A("env", {}, [
		k(e),
		k(t),
		k(n)
	]);
}
function Pt(e) {
	return A("z", {}, [k(e)]);
}
function Ft(e, t, n, r) {
	return A("delay", e, [
		k(t),
		k(n),
		k(r)
	]);
}
function It(e, t) {
	return A("sdelay", e, [k(t)]);
}
function Lt(e) {
	return A("prewarp", {}, [k(e)]);
}
function Rt(e, t, n) {
	return A("mm1p", e, [k(t), k(n)]);
}
function zt(e, t, n, r) {
	return A("svf", e, [
		k(t),
		k(n),
		k(r)
	]);
}
function Bt(e, t, n, r, i) {
	return A("svfshelf", e, [
		k(t),
		k(n),
		k(r),
		k(i)
	]);
}
function Vt(e, t, n, r, i, a) {
	return A("biquad", {}, [
		k(e),
		k(t),
		k(n),
		k(r),
		k(i),
		k(a)
	]);
}
function Ht(e) {
	return A("tapIn", e, []);
}
function Ut(e, t) {
	return A("tapOut", e, [k(t)]);
}
function Wt(e, t) {
	return A("meter", e, [k(t)]);
}
function Gt(e, t, n) {
	return A("snapshot", e, [k(t), k(n)]);
}
function Kt(e, ...t) {
	return A("scope", e, t.map(k));
}
function qt(e, t) {
	return A("fft", e, [k(t)]);
}
function Jt(e, t, n) {
	return A("capture", e, [k(t), k(n)]);
}
var Yt = {};
T(Yt, {
	compress: () => Fn,
	skcompress: () => In
});
var Xt = {};
T(Xt, {
	abs: () => fn,
	add: () => xn,
	and: () => yn,
	asinh: () => nn,
	ceil: () => sn,
	cos: () => $t,
	div: () => wn,
	eq: () => vn,
	exp: () => dn,
	floor: () => cn,
	ge: () => hn,
	geq: () => gn,
	identity: () => Zt,
	le: () => pn,
	leq: () => mn,
	ln: () => rn,
	log: () => an,
	log2: () => on,
	max: () => Dn,
	min: () => En,
	mod: () => Tn,
	mul: () => Cn,
	or: () => bn,
	pow: () => _n,
	round: () => ln,
	sin: () => Qt,
	sqrt: () => un,
	sub: () => Sn,
	tan: () => en,
	tanh: () => tn
});
function Zt(e, t) {
	return ct(t) ? A("in", e, [t]) : A("in", e, []);
}
function Qt(e) {
	return A("sin", {}, [k(e)]);
}
function $t(e) {
	return A("cos", {}, [k(e)]);
}
function en(e) {
	return A("tan", {}, [k(e)]);
}
function tn(e) {
	return A("tanh", {}, [k(e)]);
}
function nn(e) {
	return A("asinh", {}, [k(e)]);
}
function rn(e) {
	return A("ln", {}, [k(e)]);
}
function an(e) {
	return A("log", {}, [k(e)]);
}
function on(e) {
	return A("log2", {}, [k(e)]);
}
function sn(e) {
	return A("ceil", {}, [k(e)]);
}
function cn(e) {
	return A("floor", {}, [k(e)]);
}
function ln(e) {
	return A("round", {}, [k(e)]);
}
function un(e) {
	return A("sqrt", {}, [k(e)]);
}
function dn(e) {
	return A("exp", {}, [k(e)]);
}
function fn(e) {
	return A("abs", {}, [k(e)]);
}
function pn(e, t) {
	return A("le", {}, [k(e), k(t)]);
}
function mn(e, t) {
	return A("leq", {}, [k(e), k(t)]);
}
function hn(e, t) {
	return A("ge", {}, [k(e), k(t)]);
}
function gn(e, t) {
	return A("geq", {}, [k(e), k(t)]);
}
function _n(e, t) {
	return A("pow", {}, [k(e), k(t)]);
}
function vn(e, t) {
	return A("eq", {}, [k(e), k(t)]);
}
function yn(e, t) {
	return A("and", {}, [k(e), k(t)]);
}
function bn(e, t) {
	return A("or", {}, [k(e), k(t)]);
}
function xn(...e) {
	return A("add", {}, e.map(k));
}
function Sn(...e) {
	return A("sub", {}, e.map(k));
}
function Cn(...e) {
	return A("mul", {}, e.map(k));
}
function wn(...e) {
	return A("div", {}, e.map(k));
}
function Tn(...e) {
	return A("mod", {}, e.map(k));
}
function En(...e) {
	return A("min", {}, e.map(k));
}
function Dn(...e) {
	return A("max", {}, e.map(k));
}
var On = {};
T(On, {
	db2gain: () => jn,
	gain2db: () => Mn,
	hann: () => Pn,
	ms2samps: () => kn,
	select: () => Nn,
	tau2pole: () => An
});
var j = S(S({}, ut), Xt);
function kn(e) {
	return j.mul(j.sr(), j.div(e, 1e3));
}
function An(e) {
	return j.exp(j.div(-1, j.mul(e, j.sr())));
}
function jn(e) {
	return j.pow(10, j.mul(e, 1 / 20));
}
function Mn(e) {
	return Nn(j.ge(e, 0), j.max(-120, j.mul(20, j.log(e))), -120);
}
function Nn(e, t, n) {
	return j.add(j.mul(e, t), j.mul(j.sub(1, e), n));
}
function Pn(e) {
	return j.mul(.5, j.sub(1, j.cos(j.mul(2 * Math.PI, e))));
}
var M = S(S(S({}, ut), Xt), On);
function Fn(e, t, n, r, i, a) {
	let o = M.env(M.tau2pole(M.mul(.001, e)), M.tau2pole(M.mul(.001, t)), i), s = M.gain2db(o), c = M.sub(1, M.div(1, r)), l = M.mul(c, M.sub(n, s)), u = M.min(0, l), d = M.db2gain(u);
	return M.mul(a, d);
}
function In(e, t, n, r, i, a, o) {
	let s = M.env(M.tau2pole(M.mul(.001, e)), M.tau2pole(M.mul(.001, t)), a), c = M.gain2db(s), l = M.sub(n, M.div(i, 2)), u = M.add(n, M.div(i, 2)), d = M.and(M.geq(c, l), M.leq(c, u)), f = M.sub(1, M.div(1, r)), p = M.select(d, M.mul(M.div(f, 2), M.mul(M.div(M.sub(c, l), i), M.sub(l, c))), M.mul(f, M.sub(n, c))), m = M.min(0, p), h = M.db2gain(m);
	return M.mul(o, h);
}
var Ln = {};
T(Ln, { adsr: () => $n });
var Rn = {};
T(Rn, {
	allpass: () => Jn,
	bandpass: () => Kn,
	dcblock: () => Hn,
	df11: () => Un,
	highpass: () => Gn,
	highshelf: () => Zn,
	lowpass: () => Wn,
	lowshelf: () => Xn,
	notch: () => qn,
	peak: () => Yn,
	pink: () => Qn,
	sm: () => Bn,
	smooth: () => zn,
	zero: () => Vn
});
var N = S(S(S({}, ut), Xt), On);
function zn(e, t) {
	return N.pole(e, N.mul(N.sub(1, e), t));
}
function Bn(e) {
	return zn(N.tau2pole(.02), e);
}
function Vn(e, t, n) {
	return N.sub(N.mul(e, n), N.mul(t, N.z(n)));
}
function Hn(e) {
	return N.pole(.995, Vn(1, 1, e));
}
function Un(e, t, n, r) {
	return N.pole(n, Vn(e, t, r));
}
function Wn(e, t, n) {
	return N.svf({ mode: "lowpass" }, e, t, n);
}
function Gn(e, t, n) {
	return N.svf({ mode: "highpass" }, e, t, n);
}
function Kn(e, t, n) {
	return N.svf({ mode: "bandpass" }, e, t, n);
}
function qn(e, t, n) {
	return N.svf({ mode: "notch" }, e, t, n);
}
function Jn(e, t, n) {
	return N.svf({ mode: "allpass" }, e, t, n);
}
function Yn(e, t, n, r) {
	return N.svfshelf({ mode: "peak" }, e, t, n, r);
}
function Xn(e, t, n, r) {
	return N.svfshelf({ mode: "lowshelf" }, e, t, n, r);
}
function Zn(e, t, n, r) {
	return N.svfshelf({ mode: "highshelf" }, e, t, n, r);
}
function Qn(e) {
	return ((e, t, n) => N.min(t, N.max(e, n)))(-1, 1, N.mul(N.db2gain(-30), N.add(N.pole(.99765, N.mul(e, .099046)), N.pole(.963, N.mul(e, .2965164)), N.pole(.57, N.mul(e, 1.0526913)), N.mul(.1848, e))));
}
var P = S(S(S(S({}, ut), Xt), Rn), On);
function $n(e, t, n, r, i) {
	let [a, o, s, c, l] = [
		e,
		t,
		n,
		r,
		i
	], u = P.mul(a, P.sr()), d = P.le(P.counter(l), u), f = P.select(l, P.select(d, 1, s), 0), p = P.max(1e-4, P.select(l, P.select(d, a, o), c)), m = P.tau2pole(P.div(p, 6.91));
	return P.smooth(m, f);
}
var er = {};
T(er, {
	capture: () => ar,
	sample: () => tr,
	sampleseq: () => nr,
	sampleseq2: () => rr,
	table: () => ir
});
function tr(e, t) {
	let n = e, { channels: r } = n, i = w(n, ["channels"]);
	return (0, p.default)(typeof r == "number" && r > 0, "Must provide a positive number channels prop"), lt(A("mc.sample", i, [k(t)]), r);
}
function nr(e, t) {
	let n = e, { channels: r } = n, i = w(n, ["channels"]);
	return (0, p.default)(typeof r == "number" && r > 0, "Must provide a positive number channels prop"), lt(A("mc.sampleseq", i, [k(t)]), r);
}
function rr(e, t) {
	let n = e, { channels: r } = n, i = w(n, ["channels"]);
	return (0, p.default)(typeof r == "number" && r > 0, "Must provide a positive number channels prop"), lt(A("mc.sampleseq2", i, [k(t)]), r);
}
function ir(e, t) {
	let n = e, { channels: r } = n, i = w(n, ["channels"]);
	return (0, p.default)(typeof r == "number" && r > 0, "Must provide a positive number channels prop"), lt(A("mc.table", i, [k(t)]), r);
}
function ar(e, t, ...n) {
	let r = e, { channels: i } = r, a = w(r, ["channels"]);
	return (0, p.default)(typeof i == "number" && i > 0, "Must provide a positive number channels prop"), lt(A("mc.capture", a, [k(t), ...n.map(k)]), i);
}
var or = {};
T(or, {
	blepsaw: () => fr,
	blepsquare: () => pr,
	bleptriangle: () => mr,
	cycle: () => cr,
	noise: () => hr,
	pinknoise: () => gr,
	saw: () => lr,
	square: () => ur,
	train: () => sr,
	triangle: () => dr
});
var F = S(S(S({}, ut), Xt), Rn);
function sr(e) {
	return F.le(F.phasor(e), .5);
}
function cr(e) {
	return F.sin(F.mul(2 * Math.PI, F.phasor(e)));
}
function lr(e) {
	return F.sub(F.mul(2, F.phasor(e)), 1);
}
function ur(e) {
	return F.sub(F.mul(2, sr(e)), 1);
}
function dr(e) {
	return F.mul(2, F.sub(.5, F.abs(lr(e))));
}
function fr(e) {
	return A("blepsaw", {}, [k(e)]);
}
function pr(e) {
	return A("blepsquare", {}, [k(e)]);
}
function mr(e) {
	return A("bleptriangle", {}, [k(e)]);
}
function hr(e) {
	return F.sub(F.mul(2, F.rand(e)), 1);
}
function gr(e) {
	return F.pink(hr(e));
}
var _r = class extends m {
	constructor() {
		super();
	}
}, I = C(S(S(S(S(S(S(S({}, ut), Yt), Ln), Rn), Xt), or), On), {
	mc: er,
	const: dt,
	in: Zt
}), vr = {
	CREATE_NODE: 0,
	APPEND_CHILD: 2,
	SET_PROPERTY: 3,
	ACTIVATE_ROOTS: 4,
	COMMIT_UPDATES: 5
}, yr = class {
	constructor() {
		this.nodeMap = /* @__PURE__ */ new Map(), this.currentActiveRoots = /* @__PURE__ */ new Set(), this.clear();
	}
	clear() {
		this.nodesAdded = 0, this.nodesRemoved = 0, this.edgesAdded = 0, this.propsWritten = 0, this.batch = {
			createNode: [],
			appendChild: [],
			setProperty: [],
			activateRoots: [],
			commitUpdates: []
		};
	}
	getNodeMap() {
		return this.nodeMap;
	}
	createNode(e, t) {
		this.nodesAdded++, this.batch.createNode.push([
			vr.CREATE_NODE,
			e,
			t
		]);
	}
	appendChild(e, t, n) {
		this.edgesAdded++, this.batch.appendChild.push([
			vr.APPEND_CHILD,
			e,
			t,
			n
		]);
	}
	setProperty(e, t, n) {
		this.propsWritten++, this.batch.setProperty.push([
			vr.SET_PROPERTY,
			e,
			t,
			n
		]);
	}
	activateRoots(e) {
		e.length === this.currentActiveRoots.size && e.every((e) => this.currentActiveRoots.has(e)) || (this.batch.activateRoots.push([vr.ACTIVATE_ROOTS, e]), this.currentActiveRoots = new Set(e));
	}
	commitUpdates() {
		this.batch.commitUpdates.push([vr.COMMIT_UPDATES]);
	}
	getPackedInstructions() {
		return [
			...this.batch.createNode,
			...this.batch.appendChild,
			...this.batch.setProperty,
			...this.batch.activateRoots,
			...this.batch.commitUpdates
		];
	}
};
function br() {
	return typeof performance > "u" ? Date.now() : performance.now();
}
var xr = class {
	constructor(e) {
		this._delegate = new yr(), this._sendMessage = e, this._nextRefId = 0;
	}
	createRef(e, t, n) {
		let r = `__refKey:${this._nextRefId++}`, i = A(e, Object.assign({ key: r }, t), n);
		return [i, (e) => {
			if (!this._delegate.nodeMap.has(i.hash)) throw Error("Cannot update a ref that has not been mounted; make sure you render your node first");
			let t = this._delegate.nodeMap.get(i.hash);
			this._delegate.clear(), Le(this._delegate, i.hash, t.props, e), this._delegate.commitUpdates();
			let n = this._delegate.getPackedInstructions();
			return Promise.resolve(this._sendMessage(n));
		}];
	}
	render(...e) {
		return this.renderWithOptions({
			rootFadeInMs: 20,
			rootFadeOutMs: 20
		}, ...e);
	}
	renderWithOptions(e, ...t) {
		let n = br();
		this._delegate.clear(), rt(this._delegate, t.map(k), e.rootFadeInMs, e.rootFadeOutMs);
		let r = br(), i = this._delegate.getPackedInstructions();
		return Promise.resolve(this._sendMessage(i)).then((e) => ({
			result: e,
			nodesAdded: this._delegate.nodesAdded,
			edgesAdded: this._delegate.edgesAdded,
			propsWritten: this._delegate.propsWritten,
			elapsedTimeMs: r - n
		}));
	}
	prune(e) {
		e.forEach((e) => {
			this._delegate.nodeMap.delete(e);
		});
	}
}, Sr = Object.getOwnPropertySymbols, Cr = Object.prototype.hasOwnProperty, wr = Object.prototype.propertyIsEnumerable, Tr = (e, t) => {
	var n = {};
	for (var r in e) Cr.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && Sr) for (var r of Sr(e)) t.indexOf(r) < 0 && wr.call(e, r) && (n[r] = e[r]);
	return n;
}, L = (e, t, n) => new Promise((r, i) => {
	var a = (e) => {
		try {
			s(n.next(e));
		} catch (e) {
			i(e);
		}
	}, o = (e) => {
		try {
			s(n.throw(e));
		} catch (e) {
			i(e);
		}
	}, s = (e) => e.done ? r(e.value) : Promise.resolve(e.value).then(a, o);
	s((n = n.apply(e, t)).next());
}), Er = "const EventTypes = {\n  CREATE_NODE: 0,\n  APPEND_CHILD: 2,\n  SET_PROPERTY: 3,\n  ACTIVATE_ROOTS: 4,\n  COMMIT_UPDATES: 5,\n  UPDATE_RESOURCE_MAP: 6,\n  RESET: 7,\n};\n\n\n// A recursive function looking for transferable objects per the Web Worker API\n// @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects\n//\n// Right now we're only looking for the ArrayBuffers behind Float32Array instances as that's\n// the only type of transferable object that the native engine delivers, but this could be\n// extended to other types easily.\nfunction findTransferables(val, transferables = []) {\n  if (val instanceof Float32Array) {\n    transferables.push(val.buffer);\n  } else if (typeof val === 'object') {\n    if (Array.isArray(val)) {\n      for (let i = 0; i < val.length; ++i) {\n        findTransferables(val[i], transferables);\n      }\n    } else if (val !== null) {\n      for (let key of Object.keys(val)) {\n        findTransferables(val[key], transferables);\n      }\n    }\n  }\n\n  return transferables;\n}\n\nclass ElementaryAudioWorkletProcessor extends AudioWorkletProcessor {\n  constructor(options) {\n    super(options);\n\n    const numInputChannels = options.numberOfInputs;\n    const numOutputChannels = options.outputChannelCount.reduce((acc, next) => acc + next, 0);\n\n    this._module = Module();\n    this._native = new this._module.ElementaryAudioProcessor(numInputChannels, numOutputChannels);\n\n    // The `sampleRate` variable is a globally defined constant in the AudioWorkletGlobalScope.\n    // We also manually set a block size of 128 samples here, per the Web Audio API spec.\n    //\n    // See: https://webaudio.github.io/web-audio-api/#rendering-loop\n    this._native.prepare(sampleRate, 128);\n\n    const hasProcOpts = options.hasOwnProperty('processorOptions') &&\n      typeof options.processorOptions === 'object' &&\n      options.processorOptions !== null;\n\n    if (hasProcOpts) {\n      const {virtualFileSystem, ...other} = options.processorOptions;\n\n      const validVFS = typeof virtualFileSystem === 'object' &&\n        virtualFileSystem !== null &&\n        Object.keys(virtualFileSystem).length > 0;\n\n      if (validVFS) {\n        for (let [key, val] of Object.entries(virtualFileSystem)) {\n          let result = this._native.addSharedResource(key, val);\n\n          if (!result.success) {\n            this.port.postMessage(['error', result.message]);\n          }\n        }\n      }\n    }\n\n    this.port.onmessage = (e) => {\n      let {requestId, requestType, payload} = e.data;\n\n      switch (requestType) {\n        case 'processQueuedEvents':\n          this._native.processQueuedEvents((evtBatch) => {\n            if (evtBatch.length > 0) {\n              let transferables = findTransferables(evtBatch);\n              this.port.postMessage(['events', evtBatch], transferables);\n            }\n          });\n\n          break;\n        case 'renderInstructions':\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: this._native.postMessageBatch(payload.batch),\n          }]);\n        case 'updateSharedResourceMap':\n          for (let [key, val] of Object.entries(payload.resources)) {\n            let result = this._native.addSharedResource(key, val);\n\n            if (!result.success) {\n              return this.port.postMessage(['reply', {\n                requestId,\n                result,\n              }]);\n            }\n          }\n\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: null,\n          }]);\n        case 'reset':\n          this._native.reset();\n\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: null,\n          }]);\n        case 'gc':\n          let pruned = this._native.gc();\n\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: pruned,\n          }]);\n        case 'pruneVirtualFileSystem':\n          this._native.pruneSharedResources();\n\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: null,\n          }]);\n        case 'listVirtualFileSystem':\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: this._native.listSharedResources(),\n          }]);\n        case 'setCurrentTime':\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: this._native.setCurrentTime(payload.time),\n          }]);\n        case 'setCurrentTimeMs':\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: this._native.setCurrentTimeMs(payload.time),\n          }]);\n        default:\n          break;\n      }\n    };\n\n    this.port.postMessage(['load', {\n      sampleRate,\n      blockSize: 128,\n      numInputChannels,\n      numOutputChannels,\n    }]);\n  }\n\n  process (inputs, outputs, parameters) {\n    if (inputs.length > 0) {\n      let m = 0;\n\n      // For each input\n      for (let i = 0; i < inputs.length; ++i) {\n        // For each channel on this input\n        for (let j = 0; j < inputs[i].length; ++j) {\n          const internalInputData = this._native.getInputBufferData(m++);\n\n          // For each sample on this input channel\n          for (let k = 0; k < inputs[i][j].length; ++k) {\n            internalInputData[k] = inputs[i][j][k];\n          }\n        }\n      }\n    }\n\n    const numSamples = (outputs.length > 0 && outputs[0].length > 0)\n      ? outputs[0][0].length\n      : 0;\n\n    this._native.process(numSamples);\n\n    if (outputs.length > 0) {\n      let m = 0;\n\n      // For each output\n      for (let i = 0; i < outputs.length; ++i) {\n        // For each channel on this output\n        for (let j = 0; j < outputs[i].length; ++j) {\n          const internalOutputData = this._native.getOutputBufferData(m++);\n\n          // For each sample on this input channel\n          for (let k = 0; k < outputs[i][j].length; ++k) {\n            outputs[i][j][k] = internalOutputData[k];\n          }\n        }\n      }\n    }\n\n    // Tells the browser to keep this node alive and continue calling process\n    return true;\n  }\n}\n\nregisterProcessor(`ElementaryAudioWorkletProcessor@${\"4.0.3\"}`, ElementaryAudioWorkletProcessor);\n", Dr = "\nvar Module = (() => {\n  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;\n  \n  return (\nfunction(moduleArg = {}) {\n\nvar l=moduleArg,aa,ba;l.ready=new Promise((a,b)=>{aa=a;ba=b});if(\"function\"!==typeof globalThis?.crypto?.getRandomValues){function a(b){for(var c=0;c<b.length;c++)b[c]=256*Math.random()|0}\"object\"===typeof globalThis.crypto?globalThis.crypto.getRandomValues=a:globalThis.crypto={getRandomValues:a}}var ca=Object.assign({},l),da;da=a=>{if(\"function\"==typeof readbuffer)return new Uint8Array(readbuffer(a));a=read(a,\"binary\");\"object\"==typeof a||p();return a};\n\"undefined\"==typeof clearTimeout&&(globalThis.clearTimeout=()=>{});\"undefined\"==typeof setTimeout&&(globalThis.setTimeout=a=>\"function\"==typeof a?a():p());\"undefined\"!=typeof print&&(\"undefined\"==typeof console&&(console={}),console.log=print,console.warn=console.error=\"undefined\"!=typeof printErr?printErr:print);var ea=l.printErr||console.error.bind(console);Object.assign(l,ca);ca=null;var fa;l.wasmBinary&&(fa=l.wasmBinary);\"object\"!=typeof WebAssembly&&p(\"no native wasm support detected\");\n\"undefined\"==typeof atob&&(\"undefined\"!=typeof global&&\"undefined\"==typeof globalThis&&(globalThis=global),globalThis.atob=function(a){var b=\"\",c=0;a=a.replace(/[^A-Za-z0-9\\+\\/=]/g,\"\");do{var d=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\".indexOf(a.charAt(c++));var e=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\".indexOf(a.charAt(c++));var g=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\".indexOf(a.charAt(c++));var f=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\".indexOf(a.charAt(c++));\nd=d<<2|e>>4;e=(e&15)<<4|g>>2;var h=(g&3)<<6|f;b+=String.fromCharCode(d);64!==g&&(b+=String.fromCharCode(e));64!==f&&(b+=String.fromCharCode(h))}while(c<a.length);return b});var w,ha=!1,ia,x,y,z,A,B,ja,ka;function la(){var a=w.buffer;l.HEAP8=ia=new Int8Array(a);l.HEAP16=y=new Int16Array(a);l.HEAPU8=x=new Uint8Array(a);l.HEAPU16=z=new Uint16Array(a);l.HEAP32=A=new Int32Array(a);l.HEAPU32=B=new Uint32Array(a);l.HEAPF32=ja=new Float32Array(a);l.HEAPF64=ka=new Float64Array(a)}var ma=[],na=[],oa=[];\nfunction pa(){var a=l.preRun.shift();ma.unshift(a)}var D=0,qa=null,E=null;function p(a){l.onAbort?.(a);a=\"Aborted(\"+a+\")\";ea(a);ha=!0;a=new WebAssembly.RuntimeError(a+\". Build with -sASSERTIONS for more info.\");ba(a);throw a;}var ra=a=>a.startsWith(\"data:application/octet-stream;base64,\"),F;F=\"data:application/octet-stream;base64,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IAAgAU4EQCADQgA3AC8gA0IANwIYIANCADcCICADQgA3AiggA0IANwIQIANBADYCDCADIAI2AgggAyAANgIEIAMgBDYCACADQQE2AjAgBCADIAEgAUEBQQAgBCgCACgCFBEKACADKAIYDQELQQAhACAEIANBOGogAUEBQQAgBCgCACgCGBEFAAJAAkAgAygCXA4CAAECCyADKAJMQQAgAygCWEEBRhtBACADKAJUQQFGG0EAIAMoAmBBAUYbIQAMAQsgAygCUEEBRwRAIAMoAmANASADKAJUQQFHDQEgAygCWEEBRw0BCyADKAJIIQALIANB8ABqJAAgAAvBAQICfwF8IwBBEGsiASQAAkAgAL1CIIinQf////8HcSICQfvDpP8DTQRAIAJBgIDA8gNJDQEgAEQAAAAAAAAAAEEAEFwhAAwBCyACQYCAwP8HTwRAIAAgAKEhAAwBCyAAIAEQeyECIAErAwghACABKwMAIQMCQAJAAkACQCACQQNxDgMAAQIDCyADIABBARBcIQAMAwsgAyAAEF0hAAwCCyADIABBARBcmiEADAELIAMgABBdmiEACyABQRBqJAAgAAu5AQEGfwJAAkAgACgCBCIARQ0AIAEoAgAgASABLQALIgLAQQBIIgMbIQQgASgCBCACIAMbIQEDQCAEIAAoAhAgAEEQaiAALQAbIgLAQQBIIgMbIgUgACgCFCACIAMbIgIgASABIAJLIgMbIgYQJyIHQQBIIAEgAkkgBxtBAUYEQCAAKAIAIgANAQwCCyAFIAQgBhAnIgJBAEggAyACG0EBRw0CIAAoAgQiAA0ACwtBtBMQNQALIABBIGoLkAQBBH8gASAAIAFGIgM6AAwCQCADDQADQCABKAIIIgMtAAwNAQJAIAMgAygCCCICKAIAIgRGBEACQCACKAIEIgRFDQAgBC0ADA0ADAILAkAgASADKAIARgRAIAMhAQwBCyADIAMoAgQiASgCACIENgIEIAMhACAEBEAgBCADNgIIIAMoAggiAigCACEACyABIAI2AgggAiACQQRqIAAgA0YbIAE2AgAgASADNgIAIAMgATYCCCABKAIIIgIoAgAhAwsgAUEBOgAMIAJBADoADCACIAMoAgQiADYCACAABEAgACACNgIICyADIAIoAggiADYCCCAAIAAoAgAgAkdBAnRqIAM2AgAgAyAC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IgYNAAsLIAEgB0sEQCAFIAEgB2tBA3RqIQEgAisDACELA0AgBSALOQMAIAVBCGoiBSABRw0ACyAAIAE2AgQPCyAAIAQgAUEDdGo2AgQPCyAEBEAgACAENgIEIAQQIiAAQQA2AgggAEIANwIAQQAhAwsCQCABQYCAgIACTw0AQf////8BIANBAnUiBCABIAEgBEkbIANB+P///wdPGyIDQYCAgIACTw0AIAAgA0EDdCIDECMiBDYCACAAIAMgBGo2AgggAisDACELIAQhAyABQQdxIgIEQANAIAMgCzkDACADQQhqIQMgBUEBaiIFIAJHDQALCyABQQN0IARqIQIgAUEBa0H/////AXFBB08EQANAIAMgCzkDOCADIAs5AzAgAyALOQMoIAMgCzkDICADIAs5AxggAyALOQMQIAMgCzkDCCADIAs5AwAgA0FAayIDIAJHDQALCyAAIAI2AgQPCxAsAAsdACABBEAgACABKAIAEFogACABKAIEEFogARAiCwsOACAAQdAAahBRQdAAaguZAQEDfCAAIACiIgMgAyADoqIgA0R81c9aOtnlPaJE65wriublWr6goiADIANEff6xV+Mdxz6iRNVhwRmgASq/oKJEpvgQERERgT+goCEFIAMgAKIhBCACRQRAIAQgAyAFokRJVVVVVVXFv6CiIACgDwsgACADIAFEAAAAAAAA4D+iIAUgBKKhoiABoSAERElVVVVVVcU/oqChC5IBAQN8RAAAAAAAAPA/IAAgAKIiAkQAAAAAAADgP6IiA6EiBEQAAAAAAADwPyAEoSADoSACIAIgAiACRJAVyxmgAfo+okR3UcEWbMFWv6CiRExVVVVVVaU/oKIgAiACoiIDIAOiIAIgAkTUOIi+6fqovaJExLG0vZ7uIT6gokStUpyAT36SvqCioKIgACABoqGgoAvcAwEEfyAAKAIMBEADQCAEQQJ0IgIgACgCFGooAgAiAQRAIAEoAggiAwRAIAMQIgsgAUIANwIIAkAgASgCFCIDRQ0AIAMQIiABQgA3AhQgAUHA8wI2AhAgAUEANgIAIAFBwPMCNgIEIAEoAggiA0UNACADECILIAEQIgsgACgCICACaigCACIBBEAgASgCCCICBEAgAhAiCyABQgA3AggCQCABKAIUIgJFDQAgAhAiIAFCADcCFCABQcDzAjYCECABQQA2AgAgAUHA8wI2AgQgASgCCCICRQ0AIAIQIgsgARAiCyAEQQFqIgQgACgCDEkNAAsLIABCADcCBCAAQgA3AgwgACAAKAIUNgIYIAAgACgCIDYCJCAAKAIwIgEEQCABECILIABCADcCMCAAKAI4IgFBACABKAIAKAIIEQEAIAAoAkQiAQRAIAEQIgsgAEIANwJEIAAoAlAiAQRAIAEQIgsgAEEANgI8IABCADcCUCAAKAJgIgEEQCABECILIABCADcCYCAAKAJsIgEEQCABECILIABBADYCWCAAQgA3AmwgACgCeCIBBEAgARAiCyAAQQA2AoABIABCADcCeCAAKAKIASIBBEAgARAiCyAAQQA2ApABIABCADcCiAELvAMBAX8gAEH08wI2AgAgABBeIABBwPMCNgKEASAAKAKIASIBBEAgARAiCyAAQgA3AogBIABBwPMCNgJ0IAAoAngiAQRAIAEQIgsgAEIANwJ4IAAoAmAiAQRAIAEQIgsgAEIANwJgAkAgACgCbCIBRQRAIABCADcCbCAAQQA2AlggAEHA8wI2AmggAEHA8wI2AlwMAQsgARAiIABCADcCbCAAQcDzAjYCaCAAQQA2AlggAEHA8wI2AlwgACgCYCIBRQ0AIAEQIgsgAEIANwJgIAAoAkQiAQRAIAEQIgsgAEIANwJEAkAgACgCUCIBRQRAIABCADcCUCAAQQA2AjwgAEHA8wI2AkwgAEFAa0HA8wI2AgAMAQsgARAiIABCADcCUCAAQcDzAjYCTCAAQQA2AjwgAEFAa0HA8wI2AgAgACgCRCIBRQ0AIAEQIgsgAEIANwJEIAAoAjghASAAQQA2AjggAQRAIAEgASgCACgCBBEAAAsgAEHA8wI2AiwgACgCMCIBBEAgARAiCyAAQgA3AjAgACgCICIBBEAgACABNgIkIAEQIgsgACgCFCIBBEAgACABNgIYIAEQIgsgAAuoAQEGfwJ/IAAoAgQiAARAIAEoAgAgASABLQALIgLAQQBIIgMbIQUgASgCBCACIAMbIQEDQCAFIAAoAhAgAEEQaiAALQAbIgLAQQBIIgMbIgQgACgCFCACIAMbIgIgASABIAJLIgMbIgYQJyIHQQBIIAEgAkkgBxsEfyAABUEBIAQgBSAGECciBEEASCADIAQbQQFHDQMaIABBBGoLKAIAIgANAAsLQQALC4ADAQR/IAAoAiQiAwRAIAAoAigiAiADIgFHBEADQAJAAkAgAkEYayICKAIQIgEgAkYEQEEEIQQgAiEBDAELQQUhBCABRQ0BCyABIAEoAgAgBEECdGooAgARAAALIAIgA0cNAAsgACgCJCEBCyAAIAM2AiggARAiCyAAKAIUIgMEQCAAKAIYIgIgAyIBRwRAA0ACQCACQQhrIgIoAgQiAUUNACABIAEoAgQiBEEBazYCBCAEDQAgASABKAIAKAIIEQAAIAEQJQsgAiADRw0ACyAAKAIUIQELIAAgAzYCGCABECILIAAoAggiAwRAIAAoAgwiAiADIgFHBEADQAJAIAJBCGsiAigCBCIBRQ0AIAEgASgCBCIEQQFrNgIEIAQNACABIAEoAgAoAggRAAAgARAlCyACIANHDQALIAAoAgghAQsgACADNgIMIAEQIgsCQCAAKAIEIgFFDQAgASABKAIEIgJBAWs2AgQgAg0AIAEgASgCACgCCBEAACABECULIAAL2AMBCX8CfyAAKAIIIgQgACgCBCIGSwRAIAQgBmsMAQsgACgCGCAAKAIAIAQgBmtqcQsiCyADTwRAIAMgBmohCQJAIAAoAhAgACgCDGtBDG0iBCACIAIgBEsbRQ0AQQAhBCADRQRAA0ACQCAJIAAoAgAiB0kNACABIARBAnRqIQUgByAGayEIIAYgB0YiB0UEQCAFKAIAIAAoAgwgBEEMbGooAgAgBkEDdGogCEEDdBAyCyAHDQAgCEEDdCIIIAUoAgBqIAAoAgwgBEEMbGooAgBBACAIaxAyCyAEQQFqIgQgACgCECAAKAIMa0EMbSIFIAIgAiAFSxtJDQAMAgsACyADQQN0IQwgBkEDdCEIA0ACQCAAKAIAIgogCU0EQCABIARBAnRqIQcgCiAGayEFIAYgCkcEQCAHKAIAIAAoAgwgBEEMbGooAgAgCGogBUEDdBAyCyADIAVGDQEgBygCACAFQQN0aiAAKAIMIARBDGxqKAIAIAMgBWtBA3QQMgwBCyABIARBAnRqKAIAIAAoAgwgBEEMbGooAgAgCGogDBAyCyAEQQFqIgQgACgCECAAKAIMa0EMbSIFIAIgAiAFSxtJDQALCyAAIAAoAhggCXE2AgQLIAMgC00L/wEBB38gASAAKAIIIgIgACgCBCIDa0ECdU0EQCAAIAEEfyADIAFBAnQiABAmIABqBSADCzYCBA8LAkAgAyAAKAIAIgVrQQJ1IgcgAWoiBEGAgICABEkEQEH/////AyACIAVrIgJBAXUiCCAEIAQgCEkbIAJB/P///wdPGyIEBEAgBEGAgICABE8NAiAEQQJ0ECMhBgsgB0ECdCAGaiICIAFBAnQiARAmIAFqIQEgAyAFRwRAA0AgAkEEayICIANBBGsiAyoCADgCACADIAVHDQALCyAAIAYgBEECdGo2AgggACABNgIEIAAgAjYCACAFBEAgBRAiCw8LECwACxA0AAsCAAvxHAIYfwF8IwBBsAFrIgMkAAJAAkACQAJAAkACQCACKAIEIgRBAWsOBAABAgMECyAAQQA6ABgMBAsgAEEBOgAYDAMLIABBAjoAGCAAQQE6AAAMAgsgAEECOgAYIABBADoAAAwBCyAEEB8EQCADQQA2AkAgAigCBEH8/QMgA0FAaxAJIRsgAygCQCIBBEAgARAECyAAQQM6ABggACAbOQMADAELIAIoAgQQHgRAIANBQGshASMAQRBrIgUkACAFQQA2AgwCQAJ/IAIoAgRBwOACIAVBDGoQCSIbRAAAAAAAAPBBYyAbRAAAAAAAAAAAZnEEQCAbqwwBC0EACyIHKAIAIgRB8P///wdJBEAgBSgCDCEGAkACQCAEQQtPBEAgBEEPckEBaiIIECMhAiABIAhBgICAgHhyNgIIIAEgAjYCACABIAQ2AgQgAiEBDAELIAEgBDoACyAERQ0BCyABIAdBBGogBBAvGgsgASAEakEAOgAAIAYEQCAGEAQLIAVBEGokAAwBCxBIAAsgAywAS0EATgRAIAAgAykCQDcCACAAIAMoAkg2AgggAEEEOgAYDAILIAAgAygCQCADKAJEEDEgAywASyEVIABBBDoAGCAVQQBODQEgAygCQBAiDAELQY4JEAghBCACKAIEIAQQDSEWIAQEQCAEEAALIBYEQCMAQRBrIgEkACACKAIEQekPEBEiBRAHIQQgBQRAIAUQAAsgAUEANgIIIARBzP0DIAFBCGoQCSEbIAEoAggiBQRAIAUQBAsCfyAbRAAAAAAAAPBBYyAbRAAAAAAAAAAAZnEEQCAbqwwBC0EACyEFIAQEQCAEEAALIANBQGsiBEEANgIIIARCADcCACABIAUEfyAEIAUQYyAEKAIABUEACzYCDCABIAU2AghB6OACIAFBCGoQAiEFIAIoAgQiAhAGIAEgAjYCCCABQQA2AgRB3IIELQAAQQFxRQRAQQJB8OACQQAQDCECQdyCBEEBOgAAQdiCBCACNgIAC0HYggQoAgAgBUHKCiABQQRqIAFBCGoQEBogASgCBCICBEAgAhAECyAFBEAgBRAACyABQRBqJAAgAEEANgIIIABCADcDAAJAAkAgBCgCBCIBIAQoAgAiBEcEQCABIARrIgFBAEgNASAAIAEQIyICNgIEIAAgAjYCACAAIAEgAmoiBTYCCCACIAQgARAvGiAAIAU2AgQLIABBBzoAGAwBCxAsAAsgAygCQCIARQ0BIAMgADYCRCAAECIMAQtBlQkQCCEEIAIoAgQgBBANIRcgBARAIAQQAAsgFwRAIANBQGsiBSACEKIBIwBBEGsiBCQAIARBADYCDCAFKAIEQaj9AyAEQQxqEAkhGyAEKAIMIgUEQCAFEAQLAn8gG5lEAAAAAAAA4EFjBEAgG6oMAQtBgICAgHgLIQYgBEEQaiQAIAMoAkQiBARAIAQQAAsgA0EANgIYIANCADcCECAGQQBKBEADQCACKAIEIQQgAyAKNgJAIAMgBEGo/QMgA0FAaxACIgQQBzYCdCADQbyDBDYCcCAEBEAgBBAACyADQYgBaiIHIAEgA0HwAGoQZQJAIAMoAhQiBSADKAIYSQRAQf8BIQQgBUH/AToAGCAFQQA6AAAgAy0AoAEiCEH/AUcEQCADQSQ2AmAgA0ElNgJcIANBJjYCWCADQSc2AlQgA0EoNgJQIANBKTYCTCADQSo2AkggA0ErNgJEIANBLDYCQCADQTBqIAUgByADQUBrIAhBAnRqKAIAEQMAIAUgAy0AoAEiBDoAGAsgAyAFQSBqNgIUDAELIANBEGogA0GIAWoQhQEgAy0AoAEhBAsgBEH/AUcEQCADQRs2AmAgA0EcNgJcIANBHTYCWCADQR42AlQgA0EfNgJQIANBIDYCTCADQSE2AkggA0EiNgJEIANBIzYCQCADQTBqIANBiAFqIANBQGsgBEECdGooAgARAQALIANB/wE6AKABIAMoAnQiBARAIAQQAAsgCkEBaiIKIAZHDQALCyAAIANBEGoQrgEjAEEwayIBJAAgAygCECIABEAgAygCFCIFIAAiAkcEQANAIAVBIGsiBSICLQAYIgRB/wFHBEAgAUEbNgIsIAFBHDYCKCABQR02AiQgAUEeNgIgIAFBHzYCHCABQSA2AhggAUEhNgIUIAFBIjYCECABQSM2AgwgAUELaiAFIAFBDGogBEECdGooAgARAQALIAJB/wE6ABggACAFRw0ACyADKAIQIQILIAMgADYCFCACECILIAFBMGokAAwBC0G9DhAIIQQgAigCBCAEEA0hGCAEBEAgBBAACyAYBEAgAEEAOgAYDAELQc4KEAghBCACKAIEIAQQDSEFIAQEQCAEEAALAkACQCAFBEAgA0HOChAINgJEIANBvIMENgJAIwBBEGsiBCQAIAIoAgQiBRAGIAQgBTYCCCAEQQA2AgRB5IIELQAAQQFxRQRAQQJB+OACQQAQDCEFQeSCBEEBOgAAQeCCBCAFNgIACwJ/QeCCBCgCACADQUBrKAIEQf8KIARBBGogBEEIahAQIhtEAAAAAAAA8EFjIBtEAAAAAAAAAABmcQRAIBurDAELQQALIQYgBCgCBCEFIAMgBjYCgAEgA0G8gwQ2AnwgBQRAIAUQBAsgBEEQaiQAIAMoAkQiBARAIAQQAAsgA0FAayIFIANB/ABqEKIBIwBBEGsiBCQAIARBADYCDCAFKAIEQcz9AyAEQQxqEAkhGyAEKAIMIgUEQCAFEAQLAn8gG0QAAAAAAADwQWMgG0QAAAAAAAAAAGZxBEAgG6sMAQtBAAshECAEQRBqJAAgAygCRCIEBEAgBBAACyADIANB9ABqNgJwIANCADcCdCAQRQ0CIANB0ABqIREDQCADKAKAASEZIAMgCjYCiAEgGUHM/QMgA0GIAWoQAiIEEAchDSAEBEAgBBAACyADQQA2AogBAn8gDUHA4AIgA0GIAWoQCSIbRAAAAAAAAPBBYyAbRAAAAAAAAAAAZnEEQCAbqwwBC0EACyIHKAIAIgVB8P///wdPDQIgAygCiAEhBgJAAkAgBUELTwRAIAVBD3JBAWoiCBAjIQQgAyAIQYCAgIB4cjYCOCADIAQ2AjAgAyAFNgI0DAELIAMgBToAOyADQTBqIQQgBUUNAQsgBCAHQQRqIAUQLxoLIAQgBWpBADoAACAGBEAgBhAECyADKAKAASEaIAMgCjYCiAEgGkHM/QMgA0GIAWoQAiIEEAchDiAEBEAgBBAACyADIAIoAgQgDhAHNgIMIANBvIMENgIIIANBEGoiBCABIANBCGoQZSADIAMoAjg2AkggA0EANgI4IANBADoAUCADIAMpAzA3A0AgA0IANwMwIANB/wE6AGggAy0AKCIFQf8BRwRAIANBJDYCqAEgA0ElNgKkASADQSY2AqABIANBJzYCnAEgA0EoNgKYASADQSk2ApQBIANBKjYCkAEgA0ErNgKMASADQSw2AogBIANBhwFqIBEgBCADQYgBaiAFQQJ0aigCABEDACADIAMtACg6AGgLIANBiAFqIQ8gA0FAayIIIQQjAEEwayIHJAACQAJAIANB8ABqIgsoAgQiBUUEQCALQQRqIgYhBAwBCyAEKAIAIAQgBC0ACyIGwEEASCIJGyEMIAQoAgQgBiAJGyEJA0AgDCAFIgQoAhAgBEEQaiAELQAbIgXAQQBIIgYbIhIgBCgCFCAFIAYbIgUgCSAFIAlJIhMbIhQQJyIGQQBIIAUgCUsgBhtBAUYEQCAEIQYgBCgCACIFDQEMAgtBACEGIBIgDCAUECciBUEASCATIAUbQQFHBEAgBCEFDAMLIAQoAgQiBQ0ACyAEQQRqIQYLQcAAECMiBUEQaiEJAkAgCCwAC0EATgRAIAkgCCkDADcDACAJIAgoAgg2AggMAQsgCSAIKAIAIAgoAgQQMQsgBUH/AToAOCAFQSBqIglBADoAACAILQAoIgxB/wFHBEAgB0EkNgIsIAdBJTYCKCAHQSY2AiQgB0EnNgIgIAdBKDYCHCAHQSk2AhggB0EqNgIUIAdBKzYCECAHQSw2AgwgB0ELaiAJIAhBEGogB0EMaiAMQQJ0aigCABEDACAFIAgtACg6ADgLIAUgBDYCCCAFQgA3AgAgBiAFNgIAIAUhBCALKAIAKAIAIggEQCALIAg2AgAgBigCACEECyALKAIEIAQQQEEBIQYgCyALKAIIQQFqNgIICyAPIAY6AAQgDyAFNgIAIAdBMGokACADLQBoIgRB/wFHBEAgA0EbNgKoASADQRw2AqQBIANBHTYCoAEgA0EeNgKcASADQR82ApgBIANBIDYClAEgA0EhNgKQASADQSI2AowBIANBIzYCiAEgA0GHAWogESAEQQJ0IA9qKAIAEQEACyADQf8BOgBoIAMsAEtBAEgEQCADKAJAECILIAMtACgiBEH/AUcEQCADQRs2AqgBIANBHDYCpAEgA0EdNgKgASADQR42ApwBIANBHzYCmAEgA0EgNgKUASADQSE2ApABIANBIjYCjAEgA0EjNgKIASADQYcBaiADQRBqIANBiAFqIARBAnRqKAIAEQEACyADQf8BOgAoIAMoAgwiBARAIAQQACADQQA2AgwLIA4EQCAOEAALIA0EQCANEAALIApBAWoiCiAQRw0ACwwCCyAAQQA6ABgMAgsQSAALIwBBEGsiBCQAIAAiAUIANwIEIAEgAUEEaiIFNgIAIANB8ABqIgYiAigCACIAIAJBBGoiB0cEQANAIARBCGogASAFIABBEGoiAiACEC0CQCAAKAIEIgIEQANAIAIiACgCACICDQAMAgsACwNAIAAgACgCCCIAKAIARw0ACwsgACAHRw0ACwsgAUEFOgAYIARBEGokACAGIAMoAnQQNiADKAKAASIARQ0AIAAQAAsgA0GwAWokAAtJAQJ/IAAoAgQiBUEIdSEGIAAoAgAiACABIAVBAXEEfyAGIAIoAgBqKAIABSAGCyACaiADQQIgBUECcRsgBCAAKAIAKAIYEQUAC0sBAn8CQCABEEEiAyAAKAIEIAAtAAsiAiACwCICQQBIG0YEfyADQX9GDQEgACgCACAAIAJBAEgbIAEgAxAnRQVBAAsPC0HSEBA1AAuDAQECfyMAQRBrIgEkAAJAIAC9QiCIp0H/////B3EiAkH7w6T/A00EQCACQYCAgPIDSQ0BIABEAAAAAAAAAABBABCRASEADAELIAJBgIDA/wdPBEAgACAAoSEADAELIAAgARB7IQIgASsDACABKwMIIAJBAXEQkQEhAAsgAUEQaiQAIAALqAEAAkAgAUGACE4EQCAARAAAAAAAAOB/oiEAIAFB/w9JBEAgAUH/B2shAQwCCyAARAAAAAAAAOB/oiEAQf0XIAEgAUH9F04bQf4PayEBDAELIAFBgXhKDQAgAEQAAAAAAABgA6IhACABQbhwSwRAIAFByQdqIQEMAQsgAEQAAAAAAABgA6IhAEHwaCABIAFB8GhMG0GSD2ohAQsgACABQf8Haq1CNIa/ogufDAMGfAN+CH8jAEEQayIOJAACQAJAIAG9IglCNIinIg1B/w9xIg9BvghrIhBB/35LIAC9IghCNIinIgtB/w9rQYJwT3ENACAJQgGGIgpCgICAgICAgBB8QoGAgICAgIAQVARARAAAAAAAAPA/IQIgCEKAgICAgICA+D9RDQIgClANAiAKQoGAgICAgIBwVCAIQgGGIghCgICAgICAgHBYcUUEQCAAIAGgIQIMAwsgCEKAgICAgICA8P8AUQ0CRAAAAAAAAAAAIAEgAaIgCUIAUyAIQoCAgICAgIDw/wBUcxshAgwCCyAIQgGGQoCAgICAgIAQfEKBgICAgICAEFQEQCAAIACiIQIgCEIAUwRAIAKaIAIgCRCSAUEBRhshAgsgCUIAWQ0CIwBBEGsiC0QAAAAAAADwPyACozkDCCALKwMIIQIMAgsgCEIAUwRAIAkQkgEiDEUEQCAAIAChIgAgAKMhAgwDCyALQf8PcSELIAxBAUZBEnQhDCAAvUL///////////8AgyEICyAQQf9+TQRARAAAAAAAAPA/IQIgCEKAgICAgICA+D9RDQIgD0G9B00EQCABIAGaIAhCgICAgICAgPg/VhtEAAAAAAAA8D+gIQIMAwsgDUH/D0sgCEKAgICAgICA+D9WRwRAIwBBEGsiC0QAAAAAAAAAcDkDCCALKwMIRAAAAAAAAABwoiECDAMLIwBBEGsiC0QAAAAAAAAAEDkDCCALKwMIRAAAAAAAAAAQoiECDAILIAsNACAARAAAAAAAADBDor1C////////////AINCgICAgICAgKADfSEICwJ8IAlCgICAQIO/IgUhByAOIAhCgICAgNCqpfM/fSIJQjSHp7ciA0Go1AMrAwCiIAlCLYinQf8AcUEFdCILQYDVA2orAwCgIAggCUKAgICAgICAeIN9IghCgICAgAh8QoCAgIBwg78iACALQejUA2orAwAiBKJEAAAAAAAA8L+gIgIgCL8gAKEgBKIiBKAiACADQaDUAysDAKIgC0H41ANqKwMAoCIDIAAgA6AiA6GgoCAEIABBsNQDKwMAIgSiIgYgAiAEoiIEoKKgIAIgBKIiAiADIAMgAqAiAqGgoCAAIAAgBqIiA6IgAyADIABB4NQDKwMAokHY1AMrAwCgoiAAQdDUAysDAKJByNQDKwMAoKCiIABBwNQDKwMAokG41AMrAwCgoKKgIgAgAiACIACgIgKhoDkDCCAHIAK9QoCAgECDvyIDoiEAIAEgBaEgA6IgDisDCCACIAOhoCABoqAhAQJAIAC9QjSIp0H/D3EiC0HJB2tBP0kNACALQckHSQRAIABEAAAAAAAA8D+gIgCaIAAgDBsMAgsgC0GJCEkhEUEAIQsgEQ0AIAC9QgBTBEAjAEEQayILRAAAAAAAAACQRAAAAAAAAAAQIAwbOQMIIAsrAwhEAAAAAAAAABCiDAILIwBBEGsiC0QAAAAAAAAA8EQAAAAAAAAAcCAMGzkDCCALKwMIRAAAAAAAAABwogwBC0GQkQMrAwAgAKJBmJEDKwMAIgKgIgMgAqEiAkGokQMrAwCiIAJBoJEDKwMAoiAAoKAgAaAiACAAoiIBIAGiIABByJEDKwMAokHAkQMrAwCgoiABIABBuJEDKwMAokGwkQMrAwCgoiADvSIJp0EEdEHwD3EiDUGAkgNqKwMAIACgoKAhACANQYiSA2opAwAgCSAMrXxCLYZ8IQggC0UEQAJ8IAlCgICAgAiDUARAIAhCgICAgICAgIg/fb8iASAAoiABoEQAAAAAAAAAf6IMAQsgCEKAgICAgICA8D98Igi/IgEgAKIiAyABoCIAmUQAAAAAAADwP2MEfCMAQRBrIgshEiALRAAAAAAAABAAOQMIIBIgCysDCEQAAAAAAAAQAKI5AwggCEKAgICAgICAgIB/g78gAEQAAAAAAADwv0QAAAAAAADwPyAARAAAAAAAAAAAYxsiAqAiBSADIAEgAKGgIAAgAiAFoaCgoCACoSIAIABEAAAAAAAAAABhGwUgAAtEAAAAAAAAEACiCwwBCyAIvyIBIACiIAGgCyECCyAOQRBqJAAgAgvBAQECfyAAKAIIIQICQCAAKAIMIAFGDQAgAgRAIAIQIgsgAEIANwIIIAFFBEBBACECDAELQX8gAUECdCABQf////8DSxsQIyECIAAgATYCDCAAIAI2AggLIAIgAUECdCIDECYaIAAoAhQhAgJAIAAoAhggAUYNACACBEAgAhAiCyAAQgA3AhQgAUUEQEEAIQIMAQtBfyADIAFB/////wNLGxAjIQIgACABNgIYIAAgAjYCFAsgAiADECYaIAAgATYCAAuWAgEGfwJAIAAoAgQiAkUNACABKAIEIgYgASgCACIEQQZ0aiAEQQJ2akHHjKKOBmsgBHMhASAAKAIAAn8gASACQQFrcSACaSIDQQFNDQAaIAEgASACSQ0AGiABIAJwCyIHQQJ0aigCACIARQ0AIAAoAgAiAEUNAAJAIANBAU0EQCACQQFrIQIDQAJAIAEgACgCBCIDRwRAIAIgA3EgB0cNBQwBCyAAKAIIIARHDQAgACgCDCAGRg0DCyAAKAIAIgANAAsMAgsDQAJAIAEgACgCBCIDRwRAIAIgA00EfyADIAJwBSADCyAHRw0EDAELIAAoAgggBEcNACAAKAIMIAZGDQILIAAoAgAiAA0ACwwBCyAAIQULIAUL/gMCCn8GfSMAQRBrIggkACAAKgIQIRAgACoCDCERIAAoAgghCSAAKAIEIQogACgCACEGAkAgASABKAIAKAIMEQIAIgUgAyADIAVLG0UNAEEAIQUgBEUEQANAIAhBCGogASAFIAEoAgAoAggRAwAgACoCECEQIAAqAgwhESAAKAIIIQkgACgCBCEKIAAoAgAhBiAFQQFqIgUgASABKAIAKAIMEQIAIgIgAyACIANJG0kNAAwCCwALA0AgCEEIaiABIAUgASgCACgCCBEDAEEAIQcgCCgCDCIGIAAoAhgiCWsiCkEAIAYgCk8bIQsgAiAFQQJ0aiEMIAgoAgggCUECdGohDSAAKgIQIRAgACoCDCERIAAoAgAhBiAAKAIIIgm+IRMgACgCBCIKviEUA0AgByALRwRAIAwoAgAgB0EDdGoiDiAOKwMAIA0gB0ECdGoqAgAgBr4iEiAUIg+Ti0O9N4Y1XwR9IA8FQwAAAABDAACAPyATIBKSIg8gD0MAAIA/XhsgD0MAAAAAXRu8IQYgEguUu6A5AwAgB0EBaiIHIARHDQELCyAFQQFqIgUgASABKAIAKAIMEQIAIgcgAyADIAdLG0kNAAsLIAAgEDgCECAAIBE4AgwgACAJNgIIIAAgCjYCBCAAIAY2AgAgACAAKAIYIARqNgIYIAhBEGokAAveBAECfyAAKAKkAyIBBEAgACABNgKoAyABECILIAAoApgDIgEEQCAAIAE2ApwDIAEQIgsgACgCjAMiAQRAIAAgATYCkAMgARAiCyAAKAKAAyIBBEAgACABNgKEAyABECILIAAoAvQCIgEEQCAAIAE2AvgCIAEQIgsgACgC6AIiAQRAIAAgATYC7AIgARAiCyAAKALcAiIBBEAgACABNgLgAiABECILIAAoAtACIgEEQCAAIAE2AtQCIAEQIgsgACgCuAIiAQRAIAAgATYCvAIgARAiCyAAKAKgAiIBBEAgACABNgKkAiABECILIAAoAoACIgEEQCAAIAE2AoQCIAEQIgsgACgC9AEiAQRAIAAgATYC+AEgARAiCyAAQYQBaiIBKAJkIgIEQCABIAI2AmggAhAiCyABKAJYIgIEQCABIAI2AlwgAhAiCyABKAJMIgIEQCABIAI2AlAgAhAiCyABQUBrKAIAIgIEQCABIAI2AkQgAhAiCyABKAI0IgIEQCABIAI2AjggAhAiCyABKAIkIgIEQCABIAI2AiggAhAiCyABKAIYIgIEQCABIAI2AhwgAhAiCyABKAIMIgIEQCABIAI2AhAgAhAiCyABKAIAIgIEQCABIAI2AgQgAhAiCyAAKAJ4IgEEQCAAIAE2AnwgARAiCyAAKAJgIgEEQCAAIAE2AmQgARAiCyAAQUBrKAIAIgEEQCAAIAE2AkQgARAiCwJAAkAgACgCKCIBIABBGGoiAEYEQEEEIQIgACEBDAELQQUhAiABRQ0BCyABIAEoAgAgAkECdGooAgARAAALC+QJAgp/AX4jAEEgayIDJAAgAEIANwMwIABCgICAgICAgPA/NwMQIABCgICAgICAgPg/NwMIIABBAToABCAAQQA2AgAgAEEANgJIIABBQGsiAkIANwMAIABBADYCKCADQgA3AxAgAkEBIANBEGoiAhBZIABCADcDOCAAQoCAgIAQNwJUIABCADcCTCAAQdwAakGYARAmGiAAQYQBakECELsBIABBADYCjAIgAEIANwKEAiAAQgA3AvwBIABCADcC9AEgAEEwakEAQQFBARC6ASAAQQA2AqgCIABBoAJqIgFCADcDACAAQgA3A5ACIANCADcDECABQQEgAhBZIABCADcDmAIgAEIANwO4AiAAQX82ArQCIABCADcCrAIgAEIANwC9AiAAQoCAgICAgID4PzcDyAIgAEEBOgDFAiAAQdACakHgABAmGiADQRAQIyIBNgIQIANCjICAgICCgICAfzcCFCABQZkPKAAANgAIIAFBkQ8pAAA3AAAgAUEAOgAMIwBBEGsiBiQAIwBBIGsiASQAAn8gAi0AC0EHdgRAIAIoAgAMAQsgAgshBCABAn8gAi0AC0EHdgRAIAIoAgQMAQsgAi0AC0H/AHELNgIcIAEgBDYCGCABQZEPNgIQIAFBkQ8QQTYCFCABIAEpAhg3AwggASABKQIQNwMAIwBBEGsiBCQAIAEoAgwgASgCBEYEQCAEIAEpAgAiCzcDACAEIAs3AwgjAEEQayIFJAAgBSABKAIMNgIMIAUgBCgCBDYCCCMAQRBrIgckACAFQQhqIggoAgAgBUEMaiIJKAIASSEKIAdBEGokAAJAIAEoAgggBCgCACAIIAkgChsoAgAQJyIHDQBBACEHIAEoAgwgBCgCBEYNAEF/QQEgASgCDCAEKAIESRshBwsgBUEQaiQAIAdFIQULIARBEGokACABQSBqJAAgBUUEQCMAQRBrIgckAEH7GhBBIQQCfyACLQALQQd2BEAgAigCBAwBCyACLQALQf8AcQshBUH7GiAEAn8CfyMAQRBrIggkACAGQQRqIgEhACAEIAVqIgNB7////wdNBEACQCADQQtJBEAgAEIANwIAIABBADYCCCAAIAAtAAtBgAFxIANB/wBxcjoACyAAIAAtAAtB/wBxOgALDAELIANBC08EfyADQRBqQXBxIgYgBkEBayIGIAZBC0YbBUEKC0EBaiIGECMhCSAAIAAoAghBgICAgHhxIAZB/////wdxcjYCCCAAIAAoAghBgICAgHhyNgIIIAAgCTYCACAAIAM2AgQLIAhBEGokACAADAELEHgACyIALQALQQd2BEAgACgCAAwBCyAACyIAEFACfyACLQALQQd2BEAgAigCAAwBCyACCyAFIAAgBGoiABBQIAAgBWohACMAQRBrIgIkACACQQA6AA9BASEDA0AgAwRAIAAgAi0ADzoAACADQQFrIQMgAEEBaiEADAELCyACQRBqJAAgB0EQaiQAQSwCfyABIgAtAAtBB3YEQCAAKAIADAELIAALEHcACyAGQRBqJAAgAywAG0EASARAIAMoAhAQIgsjAEEQayICJAAgAkEMakEEEBgEQEHIhAQoAgBBpBQQdwALIAIoAgwhASACQRBqJAAgAEEBIAFB/////wdwIgIgAkEBTRs2ArADIANBIGokACAAC94KAgt/An0gAigCBCACLQALIgYgBsBBAEgiBhsiDSEFIAIoAgAgAiAGGyIKIQICQCANIgdBBEkNAAJ/IAdBBGsiB0EEcQRAIA0hBiAKDAELIAooAABBldPH3gVsIgJBGHYgAnNBldPH3gVsIA1BldPH3gVscyEFIAchBiAKQQRqCyECIAdBBEkNACAGIQcDQCACKAAEQZXTx94FbCIGQRh2IAZzQZXTx94FbCACKAAAQZXTx94FbCIGQRh2IAZzQZXTx94FbCAFQZXTx94FbHNBldPH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IwBBEGsiAyQAAkAgAkEKTQRAIAAgAC0AC0GAAXEgAkH/AHFyOgALIAAgAC0AC0H/AHE6AAsgASACIAAQUCADQQA6AA8gACACaiADLQAPOgAADAELIABBCiACQQprIAAtAAtB/wBxIgAgACACIAEQjQELIANBEGokAAt2AQJ/IwBBEGsiBCQAAkAgAiAAKAIIQf////8HcSIDSQRAIAAoAgAhAyAAIAI2AgQgASACIAMQUCAEQQA6AA8gAiADaiAELQAPOgAADAELIAAgA0EBayACIANrQQFqIAAoAgQiACAAIAIgARCNAQsgBEEQaiQACxYAIAIQIyEBIAAgAjYCBCAAIAE2AgAL4AIBBX8jAEEQayIHJAAgAiABQX9zQe////8Hak0EQAJ/IAAtAAtBB3YEQCAAKAIADAELIAALIQggB0EEaiIJIAAgAUHn////A0kEfyAHIAFBAXQ2AgwgByABIAJqNgIEIwBBEGsiAiQAIAkoAgAgB0EMaiIKKAIASSELIAJBEGokACAKIAkgCxsoAgAiAkELTwR/IAJBEGpBcHEiAiACQQFrIgIgAkELRhsFQQoLQQFqBUHv////BwsQjAEgBygCBCECIAcoAggaIAUEQCAGIAUgAhBQCyADIARrIQYgAyAERwRAIAQgCGogBiACIAVqEFALIAFBCkcEQCAIECILIAAgAjYCACAAIAAoAghBgICAgHhxIAcoAghB/////wdxcjYCCCAAIAAoAghBgICAgHhyNgIIIAAgBSAGaiIANgIEIAdBADoADCAAIAJqIActAAw6AAAgB0EQaiQADwsQeAALSwECfyAAQbCABDYCACAAQaCBBDYCACABEEEiAkENahAjIgNBADYCCCADIAI2AgQgAyACNgIAIAAgA0EMaiABIAJBAWoQLzYCBCAACwUAEA4AC4gBAQR/IwBBEGsiBSQAIAVBADoADiMAQRBrIgMkACABIABrQQJ1IQEDQCABBEAgAyAANgIMIAMgAygCDCABQQF2IgRBAnRqNgIMIAEgBEF/c2ogBCADKAIMIgQoAgAgAigCAEkiBhshASAEQQRqIAAgBhshAAwBCwsgA0EQaiQAIAVBEGokACAAC6QDAwJ8An8BfiAAvSIHQoCAgICA/////wCDQoGAgIDwhOXyP1QiBkUEQEQYLURU+yHpPyAAIACaIAdCAFki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QTBqJAAgAAvMAgEGfyMAQTBrIgIkACAAQejLAjYCACAAKALcCCIBBEAgAEHgCGogATYCACABECILIAAoAkQiAwRAIAAoAkgiBCADIgFHBEADQCAEQQxrIgEoAgAiBQRAIARBCGsgBTYCACAFECILIAEiBCADRw0ACyAAKAJEIQELIAAgAzYCSCABECILIABB3CE2AgAgACgCECIBBEADQCABKAIAIQYgAS0AMCIEQf8BRwRAIAJBGzYCLCACQRw2AiggAkEdNgIkIAJBHjYCICACQR82AhwgAkEgNgIYIAJBITYCFCACQSI2AhAgAkEjNgIMIAJBC2ogAUEYaiACQQxqIARBAnRqKAIAEQEACyABQf8BOgAwIAEsABNBAEgEQCABKAIIECILIAEQIiAGIgENAAsLIAAoAgghASAAQQA2AgggAQRAIAEQIgsgAkEwaiQAIAALsgIBBn8jAEEwayICJAAgAEHQxAI2AgAgACgCWCIDBEAgACgCXCIEIAMiAUcEQANAIARBDGsiASgCACIFBEAgBEEIayAFNgIAIAUQIgsgASIEIANHDQALIAAoAlghAQsgACADNgJcIAEQIgsgAEHcITYCACAAKAIQIgEEQANAIAEoAgAhBiABLQAwIgRB/wFHBEAgAkEbNgIsIAJBHDYCKCACQR02AiQgAkEeNgIgIAJBHzYCHCACQSA2AhggAkEhNgIUIAJBIjYCECACQSM2AgwgAkELaiABQRhqIAJBDGogBEECdGooAgARAQALIAFB/wE6ADAgASwAE0EASARAIAEoAggQIgsgARAiIAYiAQ0ACwsgACgCCCEBIABBADYCCCABBEAgARAiCyACQTBqJAAgAAv6AgEGfyMAQTBrIgIkACAAQeCvAjYCAAJAIAAoAkwiAUUNACABIAEoAgQiBEEBazYCBCAEDQAgASABKAIAKAIIEQAAIAEQJQsgACgCOCIEBEAgACgCPCIBIAQiA0cEQANAAkAgAUEIayIBKAIEIgNFDQAgAyADKAIEIgVBAWs2AgQgBQ0AIAMgAygCACgCCBEAACADECULIAEgBEcNAAsgACgCOCEDCyAAIAQ2AjwgAxAiCyAAQdwhNgIAIAAoAhAiAQRAA0AgASgCACEGIAEtADAiA0H/AUcEQCACQRs2AiwgAkEcNgIoIAJBHTYCJCACQR42AiAgAkEfNgIcIAJBIDYCGCACQSE2AhQgAkEiNgIQIAJBIzYCDCACQQtqIAFBGGogAkEMaiADQQJ0aigCABEBAAsgAUH/AToAMCABLAATQQBIBEAgASgCCBAiCyABECIgBiIBDQALCyAAKAIIIQEgAEEANgIIIAEEQCABECILIAJBMGokACAAC6EFAQZ/IwBBMGsiBCQAIABB9KsCNgIAIAAoAtAFIgEEQCAAIAE2AtQFIAEQIgsgAEGIAmoQbgJAIAAoAoQBIgFFDQAgASABKAIEIgJBAWs2AgQgAg0AIAEgASgCACgCCBEAACABECULIAAoAnAiAwRAIAAoAnQiAiADIgFHBEADQAJAIAJBCGsiAigCBCIBRQ0AIAEgASgCBCIFQQFrNgIEIAUNACABIAEoAgAoAggRAAAgARAlCyACIANHDQALIAAoAnAhAQsgACADNgJ0IAEQIgsCQCAAKAJYIgFFDQAgASABKAIEIgJBAWs2AgQgAg0AIAEgASgCACgCCBEAACABECULIAAoAkQiAwRAIAAoAkgiAiADIgFHBEADQAJAIAJBCGsiAigCBCIBRQ0AIAEgASgCBCIFQQFrNgIEIAUNACABIAEoAgAoAggRAAAgARAlCyACIANHDQALIAAoAkQhAQsgACADNgJIIAEQIgsgACgCLCIDBEAgACgCMCICIAMiAUcEQANAAkAgAkEIayICKAIEIgFFDQAgASABKAIEIgVBAWs2AgQgBQ0AIAEgASgCACgCCBEAACABECULIAIgA0cNAAsgACgCLCEBCyAAIAM2AjAgARAiCyAAQdwhNgIAIAAoAhAiAgRAA0AgAigCACEGIAItADAiA0H/AUcEQCAEQRs2AiwgBEEcNgIoIARBHTYCJCAEQR42AiAgBEEfNgIcIARBIDYCGCAEQSE2AhQgBEEiNgIQIARBIzYCDCAEQQtqIAJBGGogBEEMaiADQQJ0aigCABEBAAsgAkH/AToAMCACLAATQQBIBEAgAigCCBAiCyACECIgBiICDQALCyAAKAIIIQEgAEEANgIIIAEEQCABECILIARBMGokACAAC/kDAgZ/AXwgACgCVCIFQQRqIgMhBCAFKAIEIgIEQANAIAIgBCACKwMQIAFkIgYbIQQgAiACQQRqIAYbKAIAIgINAAsLIAAgBDYCYCAFKAIAIARHBEACQCAEKAIAIgMEQANAIAMiAigCBCIDDQAMAgsACwNAIAQoAggiAigCACAERiEHIAIhBCAHDQALCyAAIAI2AlwgAEGIAWoiAyAAKALoAUEwbGoiAkEANgIEIAIgAkEQQQwgAioCACACKgIEXhtqKAIANgIIIAAgACgC6AFBf3NBAXEiBDYC6AEgACgCXCICKwMYRAAAAAAAAPC/oJlEje21oPfGsD5lBEAgAisDECEIIAAoAoABIgAgACgCACgCEBECACEAIAMgBEEwbGoiAkGAgID8AzYCBCACIAA2AhQgAiAIOQMoIAIgAkEQQQwgAioCACACKgIEXhtqKAIANgIIIAIgAAJ/IAEgCKEgAisDIKMgAEEBa7iiIgFEAAAAAAAA8EFjIAFEAAAAAAAAAABmcQRAIAGrDAELQQALIgMgACADSRs2AhgLDwsgAEEANgKMASAAIAM2AlwgAEEANgK8ASAAIABBiAFqQRBBDCAAKgKIASAAKgKMAV4baigCADYCkAEgACAAQbgBakEQQQwgACoCuAEgACoCvAFeG2ooAgA2AsABC6EFAQZ/IwBBMGsiBCQAIABB+KcCNgIAIAAoAtAFIgEEQCAAIAE2AtQFIAEQIgsgAEGIAmoQbgJAIAAoAoQBIgFFDQAgASABKAIEIgJBAWs2AgQgAg0AIAEgASgCACgCCBEAACABECULIAAoAnAiAwRAIAAoAnQiAiADIgFHBEADQAJAIAJBCGsiAigCBCIBRQ0AIAEgASgCBCIFQQFrNgIEIAUNACABIAEoAgAoAggRAAAgARAlCyACIANHDQALIAAoAnAhAQsgACADNgJ0IAEQIgsCQCAAKAJYIgFFDQAgASABKAIEIgJBAWs2AgQgAg0AIAEgASgCACgCCBEAACABECULIAAoAkQiAwRAIAAoAkgiAiADIgFHBEADQAJAIAJBCGsiAigCBCIBRQ0AIAEgASgCBCIFQQFrNgIEIAUNACABIAEoAgAoAggRAAAgARAlCyACIANHDQALIAAoAkQhAQsgACADNgJIIAEQIgsgACgCLCIDBEAgACgCMCICIAMiAUcEQANAAkAgAkEIayICKAIEIgFFDQAgASABKAIEIgVBAWs2AgQgBQ0AIAEgASgCACgCCBEAACABECULIAIgA0cNAAsgACgCLCEBCyAAIAM2AjAgARAiCyAAQdwhNgIAIAAoAhAiAgRAA0AgAigCACEGIAItADAiA0H/AUcEQCAEQRs2AiwgBEEcNgIoIARBHTYCJCAEQR42AiAgBEEfNgIcIARBIDYCGCAEQSE2AhQgBEEiNgIQIARBIzYCDCAEQQtqIAJBGGogBEEMaiADQQJ0aigCABEBAAsgAkH/AToAMCACLAATQQBIBEAgAigCCBAiCyACECIgBiICDQALCyAAKAIIIQEgAEEANgIIIAEEQCABECILIARBMGokACAAC90DAQZ/IwBBMGsiAiQAIABBkKQCNgIAAkAgACgCrAEiAUUNACABIAEoAgQiA0EBazYCBCADDQAgASABKAIAKAIIEQAAIAEQJQsCQCAAKAJcIgFFDQAgASABKAIEIgNBAWs2AgQgAw0AIAEgASgCACgCCBEAACABECULAkAgACgCTCIBRQ0AIAEgASgCBCIDQQFrNgIEIAMNACABIAEoAgAoAggRAAAgARAlCyAAKAI4IgMEQCAAKAI8IgEgAyIERwRAA0ACQCABQQhrIgEoAgQiBEUNACAEIAQoAgQiBUEBazYCBCAFDQAgBCAEKAIAKAIIEQAAIAQQJQsgASADRw0ACyAAKAI4IQQLIAAgAzYCPCAEECILIABB3CE2AgAgACgCECIBBEADQCABKAIAIQYgAS0AMCIEQf8BRwRAIAJBGzYCLCACQRw2AiggAkEdNgIkIAJBHjYCICACQR82AhwgAkEgNgIYIAJBITYCFCACQSI2AhAgAkEjNgIMIAJBC2ogAUEYaiACQQxqIARBAnRqKAIAEQEACyABQf8BOgAwIAEsABNBAEgEQCABKAIIECILIAEQIiAGIgENAAsLIAAoAgghASAAQQA2AgggAQRAIAEQIgsgAkEwaiQAIAALhwIBBH8jAEEwayICJAAgAEEANgIIIABCADcDAAJAIAEoAgQiBSABKAIAIgNHBEAgBSADayIEQQBIDQEgACAEECMiATYCBCAAIAE2AgAgACABIARqNgIIA0AgAUH/AToAGCABQQA6AAAgAy0AGCIEQf8BRwRAIAJBLTYCLCACQS42AiggAkEvNgIkIAJBMDYCICACQTE2AhwgAkEyNgIYIAJBMzYCFCACQTQ2AhAgAkE1NgIMIAJBC2ogASADIAJBDGogBEECdGooAgARAwAgASADLQAYOgAYCyABQSBqIQEgA0EgaiIDIAVHDQALIAAgATYCBAsgAEEGOgAYIAJBMGokAA8LECwAC5oDAQR/IwBBEGsiAyQAIABCADcCBCAAIAI2AgAgAEEMaiIFQgA3AgAgAEEANgIUIAAgAkEBazYCGAJAAkAgAUUNACACRQRAA0AgA0EANgIMIANCADcCBAJAIAAoAhAiAiAAKAIUTwRAIAUgA0EEahBEIAMoAgQiAkUNASADIAI2AgggAhAiDAELIAJBADYCCCACQgA3AgAgAiADKAIENgIAIAIgAygCCDYCBCACIAMoAgw2AgggACACQQxqNgIQCyAEQQFqIgQgAUcNAAwCCwALIAJBgICAgAJPDQEgAkEDdCEEA0AgAyAEECMiAjYCBCADIAIgBGo2AgwgAyACIAQQJiAEajYCCAJAIAAoAhAiAiAAKAIUSQRAIAJBADYCCCACQgA3AgAgAiADKAIENgIAIAIgAygCCDYCBCACIAMoAgw2AgggACACQQxqNgIQDAELIAUgA0EEahBEIAMoAgQiAkUNACADIAI2AgggAhAiCyAGQQFqIgYgAUcNAAsLIANBEGokACAADwsgA0EANgIMIANCADcCBBAsAAuNBAEHfyMAQTBrIgIkACAAQcCgAjYCACAAKALIASIEBEAgBCEDIAQgACgCzAEiAUcEQANAIAFBIGsiAS0AGCIDQf8BRwRAIAJBGzYCLCACQRw2AiggAkEdNgIkIAJBHjYCICACQR82AhwgAkEgNgIYIAJBITYCFCACQSI2AhAgAkEjNgIMIAJBC2ogASACQQxqIANBAnRqKAIAEQEACyABQf8BOgAYIAEgBEcNAAsgACgCyAEhAwsgACAENgLMASADECILIAAoArABIgEEQCAAIAE2ArQBIAEQIgsgACgCLCEFIABBADYCLCAFBEAgBSgCDCIEBEAgBSgCECIDIAQiAUcEQANAIANBDGsiASgCACIGBEAgA0EIayAGNgIAIAYQIgsgASIDIARHDQALIAUoAgwhAQsgBSAENgIQIAEQIgsgBRAiCyAAQdwhNgIAIAAoAhAiAQRAA0AgASgCACEHIAEtADAiBEH/AUcEQCACQRs2AiwgAkEcNgIoIAJBHTYCJCACQR42AiAgAkEfNgIcIAJBIDYCGCACQSE2AhQgAkEiNgIQIAJBIzYCDCACQQtqIAFBGGogAkEMaiAEQQJ0aigCABEBAAsgAUH/AToAMCABLAATQQBIBEAgASgCCBAiCyABECIgByIBDQALCyAAKAIIIQEgAEEANgIIIAEEQCABECILIAJBMGokACAAC5MGAQV/IwBBMGsiBCQAAn8CQAJAAkACQCABKAIEIAEtAAsiBSAFwCIFQQBIG0EERw0AIAEoAgAgASAFQQBIGygAAEHwwtHDBkcNAEEFIAItABhBBEcNBBoCQCACLAALQQBOBEAgBCACKAIINgIQIAQgAikCADcDCAwBCyAEQQhqIAIoAgAgAigCBBAxCyADIARBCGoQOCEFIAQsABNBAEgEQCAEKAIIECILQQYgBUUNBBogAi0AGEEERw0BAkAgAiwAC0EATgRAIAQgAigCCDYCECAEIAIpAgA3AwgMAQsgBEEIaiACKAIAIAIoAgQQMQsCQCADIARBCGoQOCIDRQRAQQAhBQwBCyADKAIUIQUgAygCGCIGRQRAQQAhBgwBCyAGIAYoAgRBAWo2AgQLIAQsABNBAEgEQCAEKAIIECILAn8gACgCMCIDIAAoAjQiB0sEQCADIAdrDAELIAAoAiwgAyAHa2oLBEAgACgCOCAHQQN0aiIDIAU2AgAgAygCBCEFIAMgBjYCBAJAIAVFDQAgBSAFKAIEIgNBAWs2AgQgAw0AIAUgBSgCACgCCBEAACAFECULIAAgACgCRCAHQQFqcTYCNAwBCyAGRQ0AIAYgBigCBCIDQQFrNgIEIAMNACAGIAYoAgAoAggRAAAgBhAlCyAEQQhqIABBCGogASABIAIQMyAELQAMDQIgBCgCCCIBQRhqIQUgAi0AGCEDIAEtADAiAEH/AUYEQCADQf8BRg0DDAILIANB/wFHDQEgBEEbNgIoIARBHDYCJCAEQR02AiAgBEEeNgIcIARBHzYCGCAEQSA2AhQgBEEhNgIQIARBIjYCDCAEQSM2AgggBEEEaiAFIARBCGogAEECdGooAgARAQAgAUH/AToAMAwCCxA7AAsgBCAFNgIEIARBODYCKCAEQTk2AiQgBEE6NgIgIARBOzYCHCAEQTw2AhggBEE9NgIUIARBPjYCECAEQT82AgwgBEHAADYCCCAEQQRqIAUgAiAEQQhqIANBAnRqKAIAEQMAC0EACyEIIARBMGokACAIC/oCAQZ/IwBBMGsiAiQAIABB8JwCNgIAAkAgACgCTCIBRQ0AIAEgASgCBCIEQQFrNgIEIAQNACABIAEoAgAoAggRAAAgARAlCyAAKAI4IgQEQCAAKAI8IgEgBCIDRwRAA0ACQCABQQhrIgEoAgQiA0UNACADIAMoAgQiBUEBazYCBCAFDQAgAyADKAIAKAIIEQAAIAMQJQsgASAERw0ACyAAKAI4IQMLIAAgBDYCPCADECILIABB3CE2AgAgACgCECIBBEADQCABKAIAIQYgAS0AMCIDQf8BRwRAIAJBGzYCLCACQRw2AiggAkEdNgIkIAJBHjYCICACQR82AhwgAkEgNgIYIAJBITYCFCACQSI2AhAgAkEjNgIMIAJBC2ogAUEYaiACQQxqIANBAnRqKAIAEQEACyABQf8BOgAwIAEsABNBAEgEQCABKAIIECILIAEQIiAGIgENAAsLIAAoAgghASAAQQA2AgggAQRAIAEQIgsgAkEwaiQAIAAL2RACFH8TfCMAQRBrIgwkACAAKAIwIhEEQANAIANBBHQiBSAAKAIAaiIEIAEoAgAgBWoiCisDACIXIAAoAiQgBWoiBSsDCCIYoiAKKwMIIhogBSsDACIZoqA5AwggBCAXIBmiIBggGqKhOQMAIANBAWoiAyARRw0ACwsgACgCDCEBIAwgACgCADYCDCAMIAE2AggjAEEQayIQJAAgAEEwaiIKKAI0IgEgCigCOCIDRwRAIAwoAgghBSAMKAIMIQQDQCAFIAEoAgBBBHRqIgcgBCABKAIEQQR0aiIGKQMANwMAIAcgBikDCDcDCCABQQhqIgEgA0cNAAsLIAooAhwiBCAKKAIgIhNHBEADQAJAAkACQAJAAkAgBCgCAA4EAwABAgQLIAQoAhAiAUUNAyAKKAIoIAQoAhRBBHRqIQcgDCgCCCAEKAIIQQR0aiEFQQAhCCAEKAIMIglBAEohCyAJQQV0IQ0DQCALBEAgBSAJQQR0Ig5qIQ8gBSEBIAchAwNAIAEgASsDCCIXIAEgDmoiBisDACIYIAMrAxgiGqIgBisDCCIZIAMrAxAiG6KgIhygOQMIIAEgASsDACIdIBggG6IgGiAZoqEiGKA5AwAgBiAXIByhOQMIIAYgHSAYoTkDACADQSBqIQMgAUEQaiIBIA9JDQALIAQoAhAhAQsgBSANaiEFIAhBAWoiCCABSQ0ACwwDCyAEKAIQIgFFDQIgCigCKCAEKAIUQQR0aiEHIAwoAgggBCgCCEEEdGohBUEAIQsgBCgCDCIGQQV0IQ0gBkEwbCEOA0AgBkEASgRAIAUgBkEEdCIPaiESIAUhASAHIQMDQCABIAErAwgiGyABIA9qIggrAwAiGiADKwMYIhmiIAgrAwgiHCADKwMQIh2ioCIXoCABIA1qIgkrAwAiHiADKwMoIh+iIAkrAwgiICADKwMgIiGioCIYoDkDCCABIAErAwAiIiAaIB2iIBkgHKKhIhqgIB4gIaIgHyAgoqEiGaA5AwAgCCAbIBcgGKBEAAAAAAAA4D+ioSIbIBogGaFEqkxY6Hq267+iIhygOQMIIAggIiAaIBmgRAAAAAAAAOA/oqEiGiAXIBihRKpMWOh6tuu/oiIXoTkDACAJIBsgHKE5AwggCSAXIBqgOQMAIANBMGohAyABQRBqIgEgEkkNAAsgBCgCECEBCyAFIA5qIQUgC0EBaiILIAFJDQALDAILIAQoAhAiAUUNASAKKAIoIAQoAhRBBHRqIQcgDCgCCCAEKAIIQQR0aiEFQQAhDSAEKAIMIgZBMGwhDiAGQQV0IQ8gBkEGdCESA0AgBkEASgRAIAUgBkEEdCIUaiEVIAUhASAHIQMDQCABIAErAwgiFyABIBRqIggrAwAiGCADKwMoIhqiIAgrAwgiGSADKwMgIhuioCIcoCIdIAEgD2oiCSsDACIeIAMrAxgiH6IgCSsDCCIgIAMrAxAiIaKgIiIgASAOaiILKwMAIiMgAysDOCIkoiALKwMIIiUgAysDMCImoqAiJ6AiKKA5AwggASABKwMAIikgGCAboiAaIBmioSIYoCIaIB4gIaIgHyAgoqEiGSAjICaiICQgJaKhIhugIh6gOQMAIAggFyAcoSIXIBkgG6EiGaE5AwggCCApIBihIhggIiAnoSIboDkDACAJIB0gKKE5AwggCSAaIB6hOQMAIAsgFyAZoDkDCCALIBggG6E5AwAgA0FAayEDIAFBEGoiASAVSQ0ACyAEKAIQIQELIAUgEmohBSANQQFqIg0gAUkNAAsMAQsgECAMKAIIIAQoAghBBHRqNgIMQQAhCwJAIAQoAhAiBkUNACAEKAIMIgNFDQAgCigCBCEJIAQoAgQhBSAQKAIMIQcgAyEBQQEhCANAAn9BACAIRQ0AGiAFRQRAQQAhBSABDAELIAW4IRsgCigCKCAEKAIUQQR0aiEIQQAhDQNAQQAhASAEKAIEBEADQCAJIAFBBHQiBmoiDiAHIAEgA2xBBHRqIg8rAwAiFyAGIAhqIgYrAwgiGKIgDysDCCIaIAYrAwAiGaKgOQMIIA4gFyAZoiAYIBqioTkDACABQQFqIgEgBCgCBEkNAAsLQQAhBgJAIAVBAU0EQCAJKwMAIRcgByAJKwMIOQMIIAcgFzkDAAwBCwNAIAa4RBgtRFT7IRlAoiEcIAkrAwghFyAJKwMAIRhBASEBA0AgCSABQQR0aiIOKwMAIRogHCABuKIgG6MiHRA+IRkgFyAOKwMIIh4gHRA3Ih2iIBogGaKhoCEXIBggGiAdoiAZIB6ioKAhGCABQQFqIgEgBUcNAAsgByADIAZsQQR0aiIBIBc5AwggASAYOQMAIAZBAWoiBiAFRw0ACwsgB0EQaiEHIAggBUEEdGohCCANQQFqIg0gBCgCDCIBSQ0ACyAEKAIQIQYgECgCDCEHIAQoAgQhBSABCyEIIBAgByAFIAhsQQR0aiIHNgIMIAtBAWoiCyAGSQ0ACwsLIARBGGoiBCATRw0ACwsgEEEQaiQAIBFBAXYhBUEAIQMDQCADQQR0IgEgAigCAGoiBCAAKAIMIgogAWoiBysDCCIXIAogESADQX9zakEEdCIGaiIKKwMIIhihRAAAAAAAAOA/oiIaIAcrAwAiGSAKKwMAIhuhRAAAAAAAAOA/oiIcIAAoAhggAWoiASsDCCIdoiAYIBegRAAAAAAAAOA/oiIXIAErAwAiGKKgIh6gOQMIIAQgGyAZoEQAAAAAAADgP6IiGSAcIBiiIB0gF6KhIhegOQMAIAIoAgAgBmoiASAaIB6hmjkDCCABIBkgF6E5AwAgAyAFRiEWIANBAWohAyAWRQ0ACyAMQRBqJAALzHACGn8UfCMAQTBrIhMkACATIAQ2AiggEyACNgIsAkACQAJAAkAgACgCrAIiCUEATA0AIAJBAEwNACABKAIAIREgAkH8////B3EhCiACQQNxIQggAkEESSESA0AgESAGQQJ0aigCACELQQAhBUEAIQ8gEkUEQANAIAsgBUEDdGoiBysDGCIgICCiIAcrAxAiICAgoiAHKwMIIiAgIKIgBysDACIgICCiIB+goKCgIR8gBUEEaiEFIA9BBGoiDyAKRw0ACwtBACEPIAgEQANAIAsgBUEDdGorAwAiICAgoiAfoCEfIAVBAWohBSAPQQFqIg8gCEcNAAsLIAZBAWoiBiAJRw0ACyAfRBZW556vA9I8Y0UNAQsgACgCACIFIAAoAlBBAXROBEACQCAALQAERQ0AIABBADoABCAAKALoAiIFIAAoAuwCIglGDQADQCAFQcgAECZByABqIgUgCUcNAAsLAkACQAJAAkAgAkEATARAIAAoAqwCIglBAEwNAiAEQQBMDQMgAygCACEHIARBA3QhA0EAIQ9BACEFIAlBBE8EQCAJQfz///8HcSEIQQAhBgNAIAcgBUECdGoiBCgCACADECYaIAQoAgQgAxAmGiAEKAIIIAMQJhogBCgCDCADECYaIAVBBGohBSAGQQRqIgYgCEcNAAsLIAlBA3EiBEUNAQNAIAcgBUECdGooAgAgAxAmGiAFQQFqIQUgD0EBaiIPIARHDQALDAELIAAoAqwCIQkgBEEATA0AIAlBAEwNASADKAIAIQMgASgCACEGIAlB/v///wdxIQsgCUEBcSERQQAhDwNAIA8gAnAhB0EAIQVBACEKIAlBAUcEQANAIA9BA3QiEiADIAVBAnQiCGooAgBqIAdBA3QiDSAGIAhqKAIAaisDADkDACASIAMgCEEEciIIaigCAGogBiAIaigCACANaisDADkDACAFQQJqIQUgCkECaiIKIAtHDQALCyARBEAgAyAFQQJ0IgVqKAIAIA9BA3RqIAUgBmooAgAgB0EDdGorAwA5AwALIA9BAWoiDyAERw0ACwsgCUEASg0BCyAAKAKYAiEHDAELQQAhDyAAKAKYAiEHIAIgACgCUCAAKAJYamsiA0EAIANBAEobIgMgAk4NACAAKAKgAiEEIAAoApwCIQggACgClAIhCiABKAIAIRIgAiADa0EDcSERIAMgAmtBfEshDQNAIAcgCiAPbGohASASIA9BAnRqKAIAIQtBACEGIAMhBSARBEADQCAEIAggASAFanFBA3RqIAsgBUEDdGorAwA5AwAgBUEBaiEFIAZBAWoiBiARRw0ACwsgDUUEQANAIAQgCCABIAVqcUEDdGogCyAFQQN0aisDADkDACAEIAggASAFQQFqIgZqcUEDdGogCyAGQQN0aisDADkDACAEIAggASAFQQJqIgZqcUEDdGogCyAGQQN0aisDADkDACAEIAggASAFQQNqIgZqcUEDdGogCyAGQQN0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AQsgA0HFEiACEDILIAIgA2pBADoAACABKAIAIgIQQSIBQfD///8HTw0BAkACQCABQQtPBEAgAUEPckEBaiIFECMhAyAEIAVBgICAgHhyNgIMIAQgAzYCBCAEIAE2AggMAQsgBCABOgAPIARBBGohAyABRQ0BCyADIAIgARAvGgsgASADakEAOgAAIAAgBCgCDDYCGCAAIAQpAgQ3AhAgAEEEOgAoIARBEGokACAADwsQSAALEEgAC78DAQZ/IAEoAgQoAighAkEcECMiBUHkgwI2AgAgBUIANwIEAn8jAEEQayIBJAAgBUEMaiIDQgA3AgQgA0EANgIMIANB3IQCNgIAIANBBGohBgJAAkAgAkUEQANAIAFBADYCDCABQgA3AgQCQCADKAIIIgIgAygCDE8EQCAGIAFBBGoQRCABKAIEIgJFDQEgASACNgIIIAIQIgwBCyACQQA2AgggAkIANwIAIAIgASgCBDYCACACIAEoAgg2AgQgAiABKAIMNgIIIAMgAkEMajYCCAsgBEEBaiIEQQFHDQAMAgsACyACQYCAgIAETw0BIAJBAnQhBANAIAEgBBAjIgI2AgQgASACIARqNgIMIAEgAiAEECYgBGo2AggCQCADKAIIIgIgAygCDEkEQCACQQA2AgggAkIANwIAIAIgASgCBDYCACACIAEoAgg2AgQgAiABKAIMNgIIIAMgAkEMajYCCAwBCyAGIAFBBGoQRCABKAIEIgJFDQAgASACNgIIIAIQIgsgB0EBaiIHQQFHDQALCyABQRBqJAAgAwwBCyABQQA2AgwgAUIANwIEECwACyEBIAAgBTYCBCAAIAE2AgAL+gIBBn8jAEEwayICJAAgAEGwgAI2AgACQCAAKAJMIgFFDQAgASABKAIEIgRBAWs2AgQgBA0AIAEgASgCACgCCBEAACABECULIAAoAjgiBARAIAAoAjwiASAEIgNHBEADQAJAIAFBCGsiASgCBCIDRQ0AIAMgAygCBCIFQQFrNgIEIAUNACADIAMoAgAoAggRAAAgAxAlCyABIARHDQALIAAoAjghAwsgACAENgI8IAMQIgsgAEHcITYCACAAKAIQIgEEQANAIAEoAgAhBiABLQAwIgNB/wFHBEAgAkEbNgIsIAJBHDYCKCACQR02AiQgAkEeNgIgIAJBHzYCHCACQSA2AhggAkEhNgIUIAJBIjYCECACQSM2AgwgAkELaiABQRhqIAJBDGogA0ECdGooAgARAQALIAFB/wE6ADAgASwAE0EASARAIAEoAggQIgsgARAiIAYiAQ0ACwsgACgCCCEBIABBADYCCCABBEAgARAiCyACQTBqJAAgAAvlAwEGfyMAQTBrIgMkACAAQbDeATYCAAJAIAAoAlgiAUUNACABIAEoAgQiAkEBazYCBCACDQAgASABKAIAKAIIEQAAIAEQJQsgACgCRCIEBEAgACgCSCICIAQiAUcEQANAAkAgAkEIayICKAIEIgFFDQAgASABKAIEIgVBAWs2AgQgBQ0AIAEgASgCACgCCBEAACABECULIAIgBEcNAAsgACgCRCEBCyAAIAQ2AkggARAiCyAAKAIsIgQEQCAAKAIwIgIgBCIBRwRAA0ACQCACQQhrIgIoAgQiAUUNACABIAEoAgQiBUEBazYCBCAFDQAgASABKAIAKAIIEQAAIAEQJQsgAiAERw0ACyAAKAIsIQELIAAgBDYCMCABECILIABB3CE2AgAgACgCECICBEADQCACKAIAIQYgAi0AMCIEQf8BRwRAIANBGzYCLCADQRw2AiggA0EdNgIkIANBHjYCICADQR82AhwgA0EgNgIYIANBITYCFCADQSI2AhAgA0EjNgIMIANBC2ogAkEYaiADQQxqIARBAnRqKAIAEQEACyACQf8BOgAwIAIsABNBAEgEQCACKAIIECILIAIQIiAGIgINAAsLIAAoAgghASAAQQA2AgggAQRAIAEQIgsgA0EwaiQAIAALDAAgASACLQAAOgAAC+UDAQZ/IwBBMGsiAyQAIABB0NoBNgIAAkAgACgCWCIBRQ0AIAEgASgCBCICQQFrNgIEIAINACABIAEoAgAoAggRAAAgARAlCyAAKAJEIgQEQCAAKAJIIgIgBCIBRwRAA0ACQCACQQhrIgIoAgQiAUUNACABIAEoAgQiBUEBazYCBCAFDQAgASABKAIAKAIIEQAAIAEQJQsgAiAERw0ACyAAKAJEIQELIAAgBDYCSCABECILIAAoAiwiBARAIAAoAjAiAiAEIgFHBEADQAJAIAJBCGsiAigCBCIBRQ0AIAEgASgCBCIFQQFrNgIEIAUNACABIAEoAgAoAggRAAAgARAlCyACIARHDQALIAAoAiwhAQsgACAENgIwIAEQIgsgAEHcITYCACAAKAIQIgIEQANAIAIoAgAhBiACLQAwIgRB/wFHBEAgA0EbNgIsIANBHDYCKCADQR02AiQgA0EeNgIgIANBHzYCHCADQSA2AhggA0EhNgIUIANBIjYCECADQSM2AgwgA0ELaiACQRhqIANBDGogBEECdGooAgARAQALIAJB/wE6ADAgAiwAE0EASARAIAIoAggQIgsgAhAiIAYiAg0ACwsgACgCCCEBIABBADYCCCABBEAgARAiCyADQTBqJAAgAAsMACABIAIrAwA5AwALPAAgAUEANgIIIAFCADcDACABIAIoAgA2AgAgASACKAIENgIEIAEgAigCCDYCCCACQQA2AgggAkIANwMAC+UDAQZ/IwBBMGsiAyQAIABBrMABNgIAAkAgACgCWCIBRQ0AIAEgASgCBCICQQFrNgIEIAINACABIAEoAgAoAggRAAAgARAlCyAAKAJEIgQEQCAAKAJIIgIgBCIBRwRAA0ACQCACQQhrIgIoAgQiAUUNACABIAEoAgQiBUEBazYCBCAFDQAgASABKAIAKAIIEQAAIAEQJQsgAiAERw0ACyAAKAJEIQELIAAgBDYCSCABECILIAAoAiwiBARAIAAoAjAiAiAEIgFHBEADQAJAIAJBCGsiAigCBCIBRQ0AIAEgASgCBCIFQQFrNgIEIAUNACABIAEoAgAoAggRAAAgARAlCyACIARHDQALIAAoAiwhAQsgACAENgIwIAEQIgsgAEHcITYCACAAKAIQIgIEQANAIAIoAgAhBiACLQAwIgRB/wFHBEAgA0EbNgIsIANBHDYCKCADQR02AiQgA0EeNgIgIANBHzYCHCADQSA2AhggA0EhNgIUIANBIjYCECADQSM2AgwgA0ELaiACQRhqIANBDGogBEECdGooAgARAQALIAJB/wE6ADAgAiwAE0EASARAIAIoAggQIgsgAhAiIAYiAg0ACwsgACgCCCEBIABBADYCCCABBEAgARAiCyADQTBqJAAgAAv8AwEGfyMAQTBrIgMkACAAQdS7ATYCAAJAIAAoAlgiAUUNACABIAEoAgQiAkEBazYCBCACDQAgASABKAIAKAIIEQAAIAEQJQsgACgCRCIEBEAgACgCSCICIAQiAUcEQANAIAJBDGsiAiIBLQAIIgVB/wFHBEAgA0HEADYCFCADQcUANgIQIANBxgA2AgwgA0ELaiACIANBDGogBUECdGooAgARAQALIAFB/wE6AAggAiAERw0ACyAAKAJEIQELIAAgBDYCSCABECILIAAoAiwiBARAIAAoAjAiAiAEIgFHBEADQAJAIAJBCGsiAigCBCIBRQ0AIAEgASgCBCIFQQFrNgIEIAUNACABIAEoAgAoAggRAAAgARAlCyACIARHDQALIAAoAiwhAQsgACAENgIwIAEQIgsgAEHcITYCACAAKAIQIgIEQANAIAIoAgAhBiACLQAwIgRB/wFHBEAgA0EbNgIsIANBHDYCKCADQR02AiQgA0EeNgIgIANBHzYCHCADQSA2AhggA0EhNgIUIANBIjYCECADQSM2AgwgA0ELaiACQRhqIANBDGogBEECdGooAgARAQALIAJB/wE6ADAgAiwAE0EASARAIAIoAggQIgsgAhAiIAYiAg0ACwsgACgCCCEBIABBADYCCCABBEAgARAiCyADQTBqJAAgAAvlAwEGfyMAQTBrIgMkACAAQZC4ATYCAAJAIAAoAlgiAUUNACABIAEoAgQiAkEBazYCBCACDQAgASABKAIAKAIIEQAAIAEQJQsgACgCRCIEBEAgACgCSCICIAQiAUcEQANAAkAgAkEIayICKAIEIgFFDQAgASABKAIEIgVBAWs2AgQgBQ0AIAEgASgCACgCCBEAACABECULIAIgBEcNAAsgACgCRCEBCyAAIAQ2AkggARAiCyAAKAIsIgQEQCAAKAIwIgIgBCIBRwRAA0ACQCACQQhrIgIoAgQiAUUNACABIAEoAgQiBUEBazYCBCAFDQAgASABKAIAKAIIEQAAIAEQJQsgAiAERw0ACyAAKAIsIQELIAAgBDYCMCABECILIABB3CE2AgAgACgCECICBEADQCACKAIAIQYgAi0AMCIEQf8BRwRAIANBGzYCLCADQRw2AiggA0EdNgIkIANBHjYCICADQR82AhwgA0EgNgIYIANBITYCFCADQSI2AhAgA0EjNgIMIANBC2ogAkEYaiADQQxqIARBAnRqKAIAEQEACyACQf8BOgAwIAIsABNBAEgEQCACKAIIECILIAIQIiAGIgINAAsLIAAoAgghASAAQQA2AgggAQRAIAEQIgsgA0EwaiQAIAALsgoDCH8BfAF+IwBBMGsiBCQAAkACQCABKAIEIgUgAS0ACyIDIAPAIgZB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KAIEEDELIANBBDoAMAJ/IANBOGohACMAQTBrIgUkAEGaChBBIgZB8P///wdJBEACQAJAIAZBC08EQCAGQQ9yQQFqIgkQIyEBIAAgCUGAgICAeHI2AgggACABNgIAIAAgBjYCBAwBCyAAIAY6AAsgACEBIAZFDQELIAFBmgogBhAyCyABIAZqQQA6AAAgAEH/AToAKCAAQQA6ABAgAi0AGCIBQf8BRwRAIAVBLTYCLCAFQS42AiggBUEvNgIkIAVBMDYCICAFQTE2AhwgBUEyNgIYIAVBMzYCFCAFQTQ2AhAgBUE1NgIMIAVBC2ogAEEQaiACIAVBDGogAUECdGooAgARAwAgACACLQAYOgAoCyAFQTBqJAAgAAwBCxBIAAshACADIANB8ABqIgI2AmwgA0IANwJwIANBnAFqIgEgA0HsAGoiBSACIANBCGoiBiAGEC0gASAFIAIgACAAEC0gA0IANwJ8IAMgA0H4AGpBBHIiBTYCeCACIAMoAmwiAEcEQANAIANBnAFqIANB+ABqIAUgAEEQaiIBIAEQLQJAIAAoAgQiAQRAA0AgASIAKAIAIgENAAwCCwALA0AgACAAKAIIIgAoAgBHDQALCyAAIAJHDQALCyADQQU6AJABAkAgBygCBCIAIAcoAghJBEBB/wEhASAAQf8BOgAYIABBADoAACADLQCQASICQf8BRwRAIANBJDYCvAEgA0ElNgK4ASADQSY2ArQBIANBJzYCsAEgA0EoNgKsASADQSk2AqgBIANBKjYCpAEgA0ErNgKgASADQSw2ApwBIANBmwFqIAAgA0H4AGogA0GcAWogAkECdGooAgARAwAgACADLQCQASIBOgAYCyAHIABBIGo2AgQMAQsgByADQfgAahCFASADLQCQASEBCyABQf8BcSIAQf8BRwRAIANBGzYCvAEgA0EcNgK4ASADQR02ArQBIANBHjYCsAEgA0EfNgKsASADQSA2AqgBIANBITYCpAEgA0EiNgKgASADQSM2ApwBIANBmwFqIANB+ABqIANBnAFqIABBAnRqKAIAEQEACyADQf8BOgCQASADQewAaiADKAJwEDYgAy0AYCIAQf8BRwRAIANBGzYCvAEgA0EcNgK4ASADQR02ArQBIANBHjYCsAEgA0EfNgKsASADQSA2AqgBIANBITYCpAEgA0EiNgKgASADQSM2ApwBIANBmwFqIANByABqIANBnAFqIABBAnRqKAIAEQEACyADQf8BOgBgIAMsAENBAEgEQCADKAI4ECILIAMtADAiAEH/AUcEQCADQRs2ArwBIANBHDYCuAEgA0EdNgK0ASADQR42ArABIANBHzYCrAEgA0EgNgKoASADQSE2AqQBIANBIjYCoAEgA0EjNgKcASADQZsBaiADQRhqIANBnAFqIABBAnRqKAIAEQEACyADQf8BOgAwIAMsABNBAEgEQCADKAIIECILIANBwAFqJAAgBC0AICIAQf8BRwRAIARBGzYCTCAEQRw2AkggBEEdNgJEIARBHjYCQCAEQR82AjwgBEEgNgI4IARBITYCNCAEQSI2AjAgBEEjNgIsIARBK2ogCCAEQSxqIABBAnRqKAIAEQEACyAEQdAAaiQACxUAIAFBxO4CNgIAIAEgACkCBDcCBAuLAQAjAEEwayIBJAAgACgCACIALQAYIgJBAUcEQCACQf8BRwRAIAFBGzYCLCABQRw2AiggAUEdNgIkIAFBHjYCICABQR82AhwgAUEgNgIYIAFBITYCFCABQSI2AhAgAUEjNgIMIAFBC2ogACABQQxqIAJBAnRqKAIAEQEACyAAQQE6ABgLIAFBMGokAAsdAQF/QQwQIyIBQcTuAjYCACABIAApAgQ3AgQgAQsUACAAQQxqQQAgASgCBEHo7QJGGwsZACAAKAIMIgAEQCAAIAAoAgAoAgQRAAALCwYAQbDsAgsUACAAQQRqQQAgASgCBEGQ7AJGGwueAgEFfwJAIAEoAgQiAEUNACAAKAIEDQAgASgCACICKAIYIgEgAigCFCIARwRAA0AgAUEwaxBhIgEgAEcNAAsLIAIgADYCGCACKAIMRQ0AIAIoAggiAQRAA0AgASgCACEGIAEQIiAGIgENAAsLQQAhASACQQA2AggCQCACKAIEIgBFDQAgAEEETwRAIABBfHEhBANAIAFBAnQiAyACKAIAakEANgIAIAIoAgAgA2pBADYCBCACKAIAIANqQQA2AgggAigCACADakEANgIMIAFBBGohASAFQQRqIgUgBEcNAAsLIABBA3EiA0UNAEEAIQADQCACKAIAIAFBAnRqQQA2AgAgAUEBaiEBIABBAWoiACADRw0ACwsgAkEANgIMCwsLACABQYDqAjYCAAsRAEEIECMiAEGA6gI2AgAgAAsGAEHY6QILqgEBAn8jAEEwayIDJAACQCAAKAIAIgAtABgiBEH/AUcEQCAEQQJGBEAgASACLQAAOgAADAILIANBGzYCLCADQRw2AiggA0EdNgIkIANBHjYCICADQR82AhwgA0EgNgIYIANBITYCFCADQSI2AhAgA0EjNgIMIANBC2ogACADQQxqIARBAnRqKAIAEQEACyACLQAAIQEgAEECOgAYIAAgAToAAAsgA0EwaiQAC2UBAn8jAEEQayIDJAAgASAAKAIEIgRBAXVqIQEgACgCACEAIANBCGogASACIARBAXEEfyABKAIAIABqKAIABSAACxEDACADKAIMIgAQBiADKAIMIgEEQCABEAALIANBEGokACAACxQAIABBBGpBACABKAIEQfTnAkYbC3MBAn8jAEEgayICJAAgACgCICEDIAIgACgCFDYCBCACIAAoAig2AgggAiAAKAIINgIMIAIgACgCLDYCECACIAEoAhA2AhQgAiABKAIUNgIYIAIgAC0ABDoAHCADIAJBBGogAygCACgCEBEBACACQSBqJAALYwECfwJAIAAoAiQiAUUNACABIAEoAgQiAkEBazYCBCACDQAgASABKAIAKAIIEQAAIAEQJQsgACgCFCIBBEAgACABNgIYIAEQIgsgACgCCCIBBEAgACABNgIMIAEQIgsgABAiC18BAn8CQCAAKAIkIgFFDQAgASABKAIEIgJBAWs2AgQgAg0AIAEgASgCACgCCBEAACABECULIAAoAhQiAQRAIAAgATYCGCABECILIAAoAggiAQRAIAAgATYCDCABECILCxgAIAFBtOUCNgIAIAFBBGogAEEEahCdAQsgAQF/QTAQIyIBQbTlAjYCACABQQRqIABBBGoQnQEgAQtsAQJ/IABBtOUCNgIAAkAgACgCJCIBRQ0AIAEgASgCBCICQQFrNgIEIAINACABIAEoAgAoAggRAAAgARAlCyAAKAIUIgEEQCAAIAE2AhggARAiCyAAKAIIIgEEQCAAIAE2AgwgARAiCyAAECILagECfyAAQbTlAjYCAAJAIAAoAiQiAUUNACABIAEoAgQiAkEBazYCBCACDQAgASABKAIAKAIIEQAAIAEQJQsgACgCFCIBBEAgACABNgIYIAEQIgsgACgCCCIBBEAgACABNgIMIAEQIgsgAAsGAEGk5QIL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CyAHIAEoAgAgASgCBBAxCyAGQQRqIQAgAkH/AToAOCACQSBqIgVBADoAACABLQAoIghB/wFHBEAgBEEtNgIsIARBLjYCKCAEQS82AiQgBEEwNgIgIARBMTYCHCAEQTI2AhggBEEzNgIUIARBNDYCECAEQTU2AgwgBEELaiAFIAFBEGogBEEMaiAIQQJ0aigCABEDACACIAEtACg6ADgLAkAgACIBKAIAIgVFDQAgAigCFCACLQAbIgAgAMBBAEgiABshCCACKAIQIAcgABshBwNAIAcgBSIAKAIQIABBEGogAC0AGyIBwEEASCIFGyAAKAIUIAEgBRsiASAIIAEgCEkbECciBUEASCABIAhLIAUbQQFGBEAgACIBKAIAIgUNAQwCCyAAKAIEIgUNAAsgAEEEaiEBCyACIAA2AgggAkIANwIAIAEgAjYCACACIQAgBigCACgCACICBEAgBiACNgIAIAEoAgAhAAsgBigCBCAAEEAgBiAGKAIIQQFqNgIIIARBMGokAAJAIAMoAgQiAQRAA0AgASICKAIAIgENAAwCCwALA0AgAygCCCICKAIAIANHIQ0gAiEDIA0NAAsLIAIiAyALRw0ACwsgCkEQaiQADAELIAkgAjYCDCAJIAA2AggjAEFAaiICJAAgCSgCCCEDIAkoAgwhASACIAJBEGoiBTYCDCACQgA3AhAgASgCACIAIAFBBGoiBkcEQANAIAJBHGogAkEMaiAFIABBEGoiASABEC0CQCAAKAIEIgEEQANAIAEiACgCACIBDQAMAgsACwNAIAAgACgCCCIAKAIARw0ACwsgACAGRw0ACwsgAy0AGCIAQf8BRwRAIAJBGzYCPCACQRw2AjggAkEdNgI0IAJBHjYCMCACQR82AiwgAkEgNgIoIAJBITYCJCACQSI2AiAgAkEjNgIcIAJBG2ogAyACQRxqIABBAnRqKAIAEQEACyADIAIoAgw2AgAgAyACKAIQIgA2AgQgAyACKAIUIgY2AgggA0EEaiEBAkAgBkUEQCADIAE2AgAMAQsgACABNgIIIAJCADcCECACIAU2AgxBACEACyADQQU6ABggAkEMaiAAEDYgAkFAayQACyAJQRBqJAALCQAgABCjARAiCw8AIABBuN0CNgIAIAAQIgsNACAAQbjdAjYCACAACwYAQZzfAgsUACAAQQRqQQAgASgCBEHo3gJGGwvZCwIGfwF8IAQoAgAhBiADKwMAIQsgAigCACECQZiaARAjIgFBuN0CNgIAIAFCADcCBCMAQeAAayIEJAAgAUEQaiIFQgA3AwggBSACNgIEIAUgBjYCKCAFIAs5AyAgBUEgNgJoIAVCADcDYCAFQn83A1ggBUKAgICAgICAiMAANwNQIAVCADcDSCAFQsAANwNAIAVCADcDOCAFQoCAgICAgICQwAA3AzAgBUEANgIsIAVCADcDECAFQYCAgPwDNgIYIAVCADcCbCAFQajeAjYCACAFQfQAaiICQgA3AgAgBUEANgJ8IAVBHzYCgAEgAhA6IAVCADcDiAEgBUGAAjYChAEgBUGQAWoiAkIANwMAIAVCgICAgPAfNwOYAQJAIAIoAggiBiACKAIEIgNrQZgBbUGAAk8EQCADQYCwAmohBgNAIANCfzcDACADQQhqQZABECYaIANCfzcDmAEgA0GgAWpBkAEQJhogA0J/NwOwAiADQbgCakGQARAmGiADQn83A8gDIANB0ANqQZABECYaIANCfzcD4AQgA0HoBGpBkAEQJhogA0J/NwP4BSADQYAGakGQARAmGiADQn83A5AHIANBmAdqQZABECYaIANCfzcDqAggA0GwCGpBkAEQJhogA0HACWoiAyAGRw0ACyACIAY2AgQMAQsCQCADIAIoAgAiB2tBmAFtIghBgAJqIgNB7NC8DUkEQEHr0LwNIAYgB2tBmAFtIgZBAXQiByADIAMgB0kbIAZBtajeBk8bIgcEQCAHQezQvA1PDQIgB0GYAWwQIyEJCyAJIAhBmAFsaiIGIQMgBkGAsAJqIQgDQCADQn83AwAgA0EIakGQARAmGiADQn83A5gBIANBoAFqQZABECYaIANCfzcDsAIgA0G4AmpBkAEQJhogA0J/NwPIAyADQdADakGQARAmGiADQn83A+AEIANB6ARqQZABECYaIANCfzcD+AUgA0GABmpBkAEQJhogA0J/NwOQByADQZgHakGQARAmGiADQn83A6gIIANBsAhqQZABECYaIANBwAlqIgMgCEcNAAsgAigCBCIDIAIoAgAiCkcEQANAIAZBmAFrIgYgA0GYAWsiA0GYARAvGiADIApHDQALIAIoAgAhAwsgAiAJIAdBmAFsajYCCCACIAg2AgQgAiAGNgIAIAMEQCADECILDAILECwACxA0AAsgBUGgAWpBgJgBECYaQaABIQMDQCADIAVqIgJCADcDCCACQQA7AQAgAkIANwMQIAJCADcDoAEgAkEAOwGYASACQgA3A6gBIAJCADcDuAIgAkEAOwGwAiACQgA3A8ACIAJCADcD0AMgAkEAOwHIAyACQgA3A9gDIANB4ARqIgNBoJkBRw0ACyAFQaCZAWpB1AAQJhogBUGAmgFqQgA3AwAgBUIANwP4mQEgBEHhCC0AADoAMCAEQQk6ADMgBEHZCCkAADcDKCAEQQA6ADEgBEEDOgAgIARCgICAgICAgIjAADcDCCAFIARBKGogBEEIaiICIAUoAgAoAggRBgAaIAQtACAiA0H/AUcEQCAEQRs2AlwgBEEcNgJYIARBHTYCVCAEQR42AlAgBEEfNgJMIARBIDYCSCAEQSE2AkQgBEEiNgJAIARBIzYCPCAEQTtqIAIgBEE8aiADQQJ0aigCABEBAAsgBCwAM0EASARAIAQoAigQIgsgBEEHOgAzIARBADoALyAEQeQJKAAANgIoIARB5wkoAAA2ACsgBEEDOgAgIARCgICAgICAgPi/fzcDCCAFIARBKGogBEEIaiICIAUoAgAoAggRBgAaIAQtACAiA0H/AUcEQCAEQRs2AlwgBEEcNgJYIARBHTYCVCAEQR42AlAgBEEfNgJMIARBIDYCSCAEQSE2AkQgBEEiNgJAIARBIzYCPCAEQTtqIAIgBEE8aiADQQJ0aigCABEBAAsgBCwAM0EASARAIAQoAigQIgsgBEHgAGokACAAIAE2AgQgACAFNgIACwsAIAFB9NsCNgIACxEAQQgQIyIAQfTbAjYCACAAC9wBAQd+AkAgASgCECIARQ0AIAEoAhQpAwAhBCABKAIIKAIAIQEgAK0iA0IDgyEFIABBBE8EQCADQvz///8PgyEIA0AgASACp0EDdGogAiAEfLk5AwAgASACQgGEIgOnQQN0aiADIAR8uTkDACABIAJCAoQiA6dBA3RqIAMgBHy5OQMAIAEgAkIDhCIDp0EDdGogAyAEfLk5AwAgAkIEfCECIAdCBHwiByAIUg0ACwsgBVANAANAIAEgAqdBA3RqIAIgBHy5OQMAIAJCAXwhAiAGQgF8IgYgBVINAAsLC7wOAQZ/IwBBEGsiCCQAAkAgACgCACIALQAYQQZGBEAgASACRg0BIAIoAgAhBCACKAIEIgAhBiMAQTBrIgMkAAJAAkAgACAEa0EFdSIHIAEoAggiBSABKAIAIgBrQQV1TQRAIAcgASgCBCICIABrIgVBBXVNDQEgBCAFaiEFIAAgAkcEQANAIAQtABghAgJAAkAgAC0AGCIHQf8BRgRAIAJB/wFGDQIMAQsgAkH/AUcNACADQRs2AiwgA0EcNgIoIANBHTYCJCADQR42AiAgA0EfNgIcIANBIDYCGCADQSE2AhQgA0EiNgIQIANBIzYCDCADQQhqIAAgA0EMaiAHQQJ0aigCABEBACAAQf8BOgAYDAELIAMgADYCCCADQTg2AiwgA0E5NgIoIANBOjYCJCADQTs2AiAgA0E8NgIcIANBPTYCGCADQT42AhQgA0E/NgIQIANBwAA2AgwgA0EIaiAAIAQgA0EMaiACQQJ0aigCABEDAAsgAEEgaiEAIARBIGoiBCAFRw0ACyABKAIEIQALIAAhBCAFIAZHBEADQCAEQf8BOgAYIARBADoAACAFLQAYIgJB/wFHBEAgA0EtNgIsIANBLjYCKCADQS82AiQgA0EwNgIgIANBMTYCHCADQTI2AhggA0EzNgIUIANBNDYCECADQTU2AgwgA0EIaiAEIAUgA0EMaiACQQJ0aigCABEDACAEIAUtABg6ABgLIARBIGohBCAFQSBqIgUgBkcNAAsLIAEgACAEIABrajYCBAwCCyAABEAgASgCBCIFIAAiAkcEQANAIAVBIGsiBS0AGCICQf8BRwRAIANBGzYCLCADQRw2AiggA0EdNgIkIANBHjYCICADQR82AhwgA0EgNgIYIANBITYCFCADQSI2AhAgA0EjNgIMIANBCGogBSADQQxqIAJBAnRqKAIAEQEACyAFQf8BOgAYIAAgBUcNAAsgASgCACECCyABIAA2AgQgAhAiIAFBADYCCCABQgA3AgBBACEFCwJAIAdBgICAwABPDQBB////PyAFQQR1IgAgByAAIAdLGyAFQeD///8HTxsiAEGAgIDAAE8NACABIABBBXQiAhAjIgA2AgQgASAANgIAIAEgACACajYCCCAEIAZHBEADQCAAQf8BOgAYIABBADoAACAELQAYIgJB/wFHBEAgA0EtNgIsIANBLjYCKCADQS82AiQgA0EwNgIgIANBMTYCHCADQTI2AhggA0EzNgIUIANBNDYCECAD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AgARAQALIAJB/wE6ALABIAJBjAFqIAIoApABEDYgBC0AKCIAQf8BRwRAIAJBGzYC7AEgAkEcNgLoASACQR02AuQBIAJBHjYC4AEgAkEfNgLcASACQSA2AtgBIAJBITYC1AEgAkEiNgLQASACQSM2AswBIAJBywFqIARBEGogAkHMAWogAEECdGooAgARAQALIARB/wE6ACggBCwAC0EASARAIAQoAgAQIgsgAi0AUCIAQf8BRwRAIAJBGzYC7AEgAkEcNgLoASACQR02AuQBIAJBHjYC4AEgAkEfNgLcASACQSA2AtgBIAJBITYC1AEgAkEiNgLQASACQSM2AswBIAJBywFqIAJBOGogAkHMAWogAEECdGooAgARAQALIAJB/wE6AFAgAi0AICIAQf8BRwRAIAJBGzYC7AEgAkEcNgLoASACQR02AuQBIAJBHjYC4AEgAkEfNgLcASACQSA2AtgBIAJBITYC1AEgAkEiNgLQASACQSM2AswBIAJBywFqIAJBCGogAkHMAWogAEECdGooAgARAQALIAIsADdBAEgEQCACKAIsECILIAIsAMcBQQBODQAgAigCvAEQIgsgAkHwAWokAA8LEEUAC7ABAwN8A34CfyABKAIQIggEQCAAKQNAuSEDIAEoAhQpAwAhBiABKAIIKAIAIQkgACsDMCECIAitIQcDQCACIQREAAAAAAAA8D9EAAAAAAAAAAAgBSAGfLkgA6MiAiACnKFEAAAAAAAA4D9jIgEbIQICQCAERAAAAAAAAOA/Y0UNACABRQ0AIABBAToAOAsgCSAFp0EDdGogAjkDACAAIAI5AzAgBUIBfCIFIAdSDQALCwuvBAEFfwJAIAAoAgAhAyMAQUBqIgAkAAJAAkAgAy0AGCIFQQdGBEAgASACRg0BIAIoAgAhAyACKAIEIQUCQAJAIAUgA2tBAnUiBCABKAIIIgYgASgCACICa0ECdU0EQCAEIAEoAgQiByACayIGQQJ1SwRAIAIgB0cEQCACIAMgBhAyIAEoAgQhAgsgBSADIAZqIgNrIQQMAgsgBSADayEEDAELIAIEQCABIAI2AgQgAhAiIAFBADYCCCABQgA3AgBBACEGCwJAIARBgICAgARPDQBB/////wMgBkEBdSICIAQgAiAESxsgBkH8////B08bIgJBgICAgARPDQAgASACQQJ0IgQQIyICNgIEIAEgAjYCACABIAIgBGo2AgggBSADayEEIAMgBUcEQCACIAMgBBAvGgsgASACIARqNgIEDAILECwACyADIAVHBEAgAiADIAQQMgsgASACIARqNgIECwwBC0EAIQEgAEEANgIUIABCADcCDCACKAIEIgQgAigCACICRwRAIAQgAmsiAUEASA0CIAEQIyIGIAIgARAvIAFqIQELIAVB/wFHBEAgAEEbNgI8IABBHDYCOCAAQR02AjQgAEEeNgIwIABBHzYCLCAAQSA2AiggAEEhNgIkIABBIjYCICAAQSM2AhwgAEEbaiADIABBHGogBUECdGooAgARAQALIANBBzoAGCADIAE2AgggAyABNgIEIAMgBjYCAAsgAEFAayQADAELECwACwsPACAAQbDWAjYCACAAECILDQAgAEGw1gI2AgAgAAsGAEGg2AILFAAgAEEEakEAIAEoAgRB7NcCRhsL4gICAXwBfyMAQeAAayIBJAAgAysDACEFIAQoAgAhAyACKAIAIQRB2AAQIyICQbDWAjYCACACQgA3AgQgAkGo1wI2AhAgAkIANwMYIAIgBDYCFCACQgA3AyAgAiADNgI4IAIgBTkDMCACQYCAgPwDNgIoIAJCADcDUCACQQA6AEggAkFAa0IANwMAIAFBADoAMCABQunc0aumzt2w7AA3AyggAUEIOgAzIAFBAzoAICABQoCAgICAgNDHwAA3AwggAkEQaiIDIAFBKGogAUEIaiIEEKQBGiABLQAgIgZB/wFHBEAgAUEbNgJcIAFBHDYCWCABQR02AlQgAUEeNgJQIAFBHzYCTCABQSA2AkggAUEhNgJEIAFBIjYCQCABQSM2AjwgAUE7aiAEIAFBPGogBkECdGooAgARAQALIAEsADNBAEgEQCABKAIoECILIAAgAjYCBCAAIAM2AgAgAUHgAGokAAsLACABQezUAjYCAAsRAEEIECMiAEHs1AI2AgAgAAukEwILfwF8IwBBoANrIgIkACACQQA6AMQBIAJB89LpqwY2AsABIAJBBDoAywECQAJAAkACQAJAAkAgAEEIaiIDIAJBwAFqIgQQOAR8IAMgBBAoIgNFDQEgAy0AMEEDRw0CIAMrAxgFRAAAAAAAAJBACyENIAIsAMsBQQBOIQwCfyANRAAAAAAAAPBBYyANRAAAAAAAAAAAZnEEQCAN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QQhqIAdBAnRqKAIAEQEAIANB/wE6ADAMAgsQOwALIAUgADYCBCAFQTg2AiggBUE5NgIkIAVBOjYCICAFQTs2AhwgBUE8NgIYIAVBPTYCFCAFQT42AhAgBUE/NgIMIAVBwAA2AgggBUEEaiAAIAIgBUEIaiABQQJ0aigCABEDAAtBAAshDCAFQTBqJAAgDAsJACAAEKYBECILDwAgAEG4zgI2AgAgABAiCw0AIABBuM4CNgIAIAALBgBBqNECCxQAIABBBGpBACABKAIEQfjQAkYbC5sDAgR/AXwjAEEwayIDJAACfwJAIAEoAgQgAS0ACyIEIATAIgRBAEgbQQdHDQAgASgCACABIARBAEgbQb4PQQcQJw0AQQUgAi0AGEEDRw0BGiAAAn8gAisDACIHmUQAAAAAAADgQWMEQCAHqgwBC0GAgICAeAs2AiwLIANBDGogAEEIaiABIAEgAhAzAkAgAy0AEA0AIAMoAgwiBEEYaiEAIAItABghAQJAIAQtADAiBUH/AUYEQCABQf8BRg0CDAELIAFB/wFHDQAgA0EbNgIsIANBHDYCKCADQR02AiQgA0EeNgIgIANBHzYCHCADQSA2AhggA0EhNgIUIANBIjYCECADQSM2AgwgA0EIaiAAIANBDGogBUECdGooAgARAQAgBEH/AToAMAwBCyADIAA2AgggA0E4NgIsIANBOTYCKCADQTo2AiQgA0E7NgIgIANBPDYCHCADQT02AhggA0E+NgIUIANBPzYCECADQcAANgIMIANBCGogACACIANBDGogAUECdGooAgARAwALQQALIQYgA0EwaiQAIAYLpwICAXwBfyADKwMAIQUgBCgCACEDIAIoAgAhAkH4ABAjIgFBuM4CNgIAIAFCADcCBCABQbDPAjYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggAUFAa0IANwMAIAFBIDYCPCABQcgAaiICQgA3AwAgAUKAgICA8AM3A1AgAhA6IAFCADcDcCABQgA3A2ggAUHgAGoiAkIANwMAIAFCADcDWAJ/IANFBEBBACECQQAMAQsgAiADEGMgASgCcCECIAEoAmwLIQQgAUEQaiEGAkAgAiAEa0ECdSICIANJBEAgAUHsAGogAyACaxBjDAELIAIgA00NACABIAQgA0EC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An4jAEEgayIDJAAgAEGoAWohCyAAQdgAaiEIRAAAAAAAAPA/IAArAyBEAAAAAAAAEECiRAAAAAAAQI9Ao6MiD5ohECAPvSEUIAEoAhAhCiABKAIMIQUgASgCBCEMIAEoAgghBiABKAIAIQ0DQAJAAkACQAJAAkACfyAAKAI0IgEgACgCMCICSwRAIAEgAmsMAQsgACgCRCAAKAIsIAEgAmtqcQtFBEACQCAFRQ0AIApFDQAgCkEDdCECQQAhBEEAIQEgBUEBa0EDTwRAIAVBfHEhDgNAIAYgAUECdGoiBygCACACECYaIAcoAgQgAhAmGiAHKAIIIAIQJhogBygCDCACECYaIAFBBGohASAJQQRqIgkgDkcNAAsLIAVBA3EiB0UNAANAIAYgAUECdGooAgAgAhAmGiABQQFqIQEgBEEBaiIEIAdHDQALCyAMRQ0DIAAoAkhFDQMgACsDiAIhDyAKDQFBACECDAILAn8gACgCNCIBIAAoAjAiAksEQCABIAJrDAELIAAoAkQgACgCLCABIAJranELBEAgACgCOCACQQN0aiIBKQIAIRUgAUIANwIAIAAoAkwhASAAIBU3A0gCQCABRQ0AIAEgASgCBCIEQQFrNgIEIAQNACABIAEoAgAoAggRAAAgARAlCyAAIAAoAkQgAkEBanE2AjALIAAoAkghAgJAIAAoAkwiAQRAIAEgASgCBEECajYCBCADQgA3ABggA0IANwAQIANCADcACCABIAEoAgQiBEEBazYCBCAERQRAIAEgASgCACgCCBEAACABECULIAEgASgCBEEBajYCBAwBCyADQgA3AAggA0IANwAYIANCADcAEAsgACACNgJYIAAoAlwhAiAAIAE2AlwCQCACRQ0AIAIgAigCBCIEQQFrNgIEIAQNACACIAIoAgAoAggRAAAgAhAlCyAAQQA6AIgBIAAgEDkDgAEgACAPOQN4IAAgFDcDcCAAQgA3A2ggAEIANwNgIAAgAykAGDcAoAEgACADKQARNwCZASAAIAMpAAk3AJEBIAAgAykAATcAiQECQCABRQ0AIAEgASgCBCICQQFrNgIEIAINACABIAEoAgAoAggRAAAgARAlCyAAKAJIIQIgACgCTCIBRQ0DIAEgASgCBEECajYCBCADQgA3ABggA0IANwAQIANCADcACCABIAEoAgQiBEEBazYC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AgQhBSABLQALIgchAwsCQCAFIAcgA8AiA0EASBtBDEcNACABKAIAIAEgA0EASBtBwRFBDBAnDQBBBSACLQAYQQNHDQQaIAAgAikDADcDiAILIARBCGogAEEIaiABIAEgAhAzIAQtAAwNAiAEKAIIIgFBGGohBiACLQAYIQMgAS0AMCIAQf8BRgRAIANB/wFGDQMMAgsgA0H/AUcNASAEQRs2AiggBEEcNgIkIARBHTYCICAEQR42AhwgBEEfNgIYIARBIDYCFCAEQSE2AhAgBEEiNgIMIARBIzYCCCAEQQRqIAYgBEEIaiAAQQJ0aigCABEBACABQf8BOgAwDAILEDsACyAEIAY2AgQgBEE4NgIoIARBOTYCJCAEQTo2AiAgBEE7NgIcIARBPDYCGCAEQT02AhQgBEE+NgIQIARBPzYCDCAEQcAANgIIIARBBGogBiACIARBCGogA0ECdGooAgARAwALQQALIQggBEEwaiQAIAgLCQAgABCtARAiCw8AIABBnKMCNgIAIAAQIgsNACAAQZyjAjYCACAACwYAQZClAgsUACAAQQRqQQAgASgCBEHUpAJGGwvbAwIBfgF8IAMrAwAhBiAEKAIAIQMgAigCACECQaACECMiAUGcowI2AgAgAUIANwIEIAFBkKQCNgIQIAFCADcDGCABIAI2AhQgAUIANwMgIAEgAzYCOCABIAY5AzAgAUGAgID8AzYCKCABQUBrQgA3AwAgAUEgNgI8IAFByABqIgJCADcDACABQoCAgIDwAzcDUCACEDogAUIANwN4IAFCADcDcCABQZABaiICQgA3AwAgAUIANwOAASABQgA3A2ggAUIANwNgIAFCADcDWCABQYgBaiIDQs6LmJXvic67PzcDACACIAMgASsDcCABKwN4ZBsiAykDACEFIAJCzouYle+Jzru/fzcDACABIAU3A4ABIAMpAwAhBSABQQA6AJgBIAEgBTcDgAEgAUGgAWpByAAQJhogAUHYAWoiAkLOi5iV74nOuz83AwAgAUHgAWogAiABKwPAASABKwPIAWQbIgIpAwAhBSABQs6LmJXvic67v383A+ABIAEgBTcD0AEgAUIANwPwASABQQA6AOgBIAFCADcD+AEgAUIANwOAAiABQgA3A4gCIAFCADcDkAIgASACKQMANwPQASABQoCAgICAgID4PzcDmAIg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ASADQRB0ajYCACAFIANBAXIiCUECdGogACgCsAEgCUEQdGo2AgAgBSADQQJyIglBAnRqIAAoArABIAlBEHRqNgIAIAUgA0EDciIJQQJ0aiAAKAKwASAJQRB0ajYCACADQQRqIQMgBkEEaiIGIApHDQALCyAIQQNxIghFDQADQCAFIANBAnRqIAAoArABIANBEHRqNgIAIANBAWohAyAHQQFqIgcgCEcNAAsLIARBDGogAEEIaiABIAEgAhAzIAQtABANAiAEKAIMIgNBGGohACACLQAYIQEgAy0AMCIFQf8BRgRAIAFB/wFGDQMMAgsgAUH/AUcNASAEQRs2AiwgBEEcNgIoIARBHTYCJCAEQR42AiAgBEEfNgIcIARBIDYCGCAEQSE2AhQgBEEiNgIQIARBIzYCDCAEQQhqIAAgBEEMaiAFQQJ0aigCABEBACADQf8BOgAwDAILECwACyAEIAA2AgggBEE4NgIsIARBOTYCKCAEQTo2AiQgBEE7NgIgIARBPDYCHCAEQT02AhggBEE+NgIUIARBPzYCECAEQcAANgIMIARBCGogACACIARBDGogAUECdGooAgARAwALQQALIQsgBEEwaiQAIAsLCQAgABCwARAiC3UBBH8gACgCICIDBEAgACgCJCICIAMiAUcEQANAIAJBMGsQYSICIANHDQALIAAoAiAhAQsgACADNgIkIAEQIgsgACgCFCICBEADQCACKAIAIQQgAhAiIAQiAg0ACwsgACgCDCEBIABBADYCDCABBEAgARAiCwsPACAAQcifAjYCACAAECILDQAgAEHInwI2AgAgAAsGAEHAoQILFAAgAEEEakEAIAEoAgRBhKECRhsLtQEBAXwgAysDACEFIAQoAgAhAyACKAIAIQJB+AEQIyIBQcifAjYCACABQgA3AgQgAUHAoAI2AhAgAUIANwMYIAEgAjYCFCABQgA3AyAgASADNgI4IAEgBTkDMCABQYCAgPwDNgIoIAFBADoA8AEgAUIANwPoASABQQA2AuABIAFCADcC2AEgAUEANgI8IAFCADcDwAEgAUIANwPIASABQgA3AM0BIAAgATYCBCAAIAFBEGo2AgALCwAgAUH4nQI2AgALEQBBCBAjIgBB+J0CNgIAIAALoAQEB38DfAF+AX0jAEEQayIEJAAgASgCECEDIAEoAgQhBSABKAIA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AgAgAAsRACAAQQA2AogBIABBADYCaAu3CQQOfwN8An0BfiMAQRBrIgMkACAAQfgAaiENIABB2ABqIQdEAAAAAAAA8D9EAAAAAAAA8L8gACsDILYiE7tEexSuR+F6hD+ioxBKobYhFCABKAIQIQggASgCBCEFIAEoAgAhCSABKAIIKAIAIQoDQAJAAkACfyAAKAI0IgEgACgCMCICSwRAIAEgAmsMAQsgACgCRCAAKAIsIAEgAmtqcQsEQAJ/IAAoAjQiASAAKAIwIgJLBEAgASACawwBCyAAKAJEIAAoAiwgASACa2pxCwRAIAAoAjggAkEDdGoiASkCACEVIAFCADcCACAAKAJMIQEgACAVNwNIAkAgAUUNACABIAEoAgQiBEEBazYCBCAEDQAgASABKAIAKAIIEQAAIAEQJQsgACAAKAJEIAJBAWpxNgIwCyAAKAJIIQICQCAAKAJMIgEEQCABIAEoAgRBAmo2AgQgA0IANwMIIANCADcDACABIAEoAgQiBEEBazYCBCAERQRAIAEgASgCACgCCBEAACABECULIAEgASgCBEEBajYCBAwBCyADQgA3AwggA0IANwMACyAAIAI2AlggACgCXCECIAAgATYCXAJAIAJFDQAgAiACKAIEIgRBAWs2AgQgBA0AIAIgAigCACgCCBEAACACECULIAAgFDgCZCAAIBM4AmAgACADKQMINwNwIAAgAykDADcDaAJAIAFFDQAgASABKAIEIgJBAWs2AgQgAg0AIAEgASgCACgCCBEAACABECULIAAoAkghAiAAKAJMIgFFDQEgASABKAIEQQJqNgIEIANCADcDCCADQgA3AwAgASABKAIEIgRBAWs2AgQgBEUEQCABIAEoAgAoAggRAAAgARAlCyABIAEoAgRBAWo2AgQMAgsCQAJAIAUEQCAAKAJIDQELIAhFDQEgCiAIQQN0ECYaDAELIAhFDQAgACgCpAEhAiAAKAKgASIEs7shEiAFQQFGIQ4gACgCnAEiD0ECRiEFQQAhAQNAIAArA1AhECAAIAFBA3QiCyAJKAIAaisDACIROQNQIBEgEKEiEUQAAAAAAAAAAGQhDEQAAAAAAADwPyEQIA5FBEAgCSgCBCALaisDACEQCyAMBEAgByAAKAKYASIGQQFxQQV0akEANgIQIAAgBkEBaiIGNgKYASAHIAZBAXFB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GGoiAxAoRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILQQQhBCACQQA6AB4gAkG4DS8AADsBHCACQQY6ACMgAkG0DSgAADYCGCACQYymATYCACACIAI2AhAgBSgCBEE8aiIHIAJBGGoiAxAoRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBBzoAIyACQQA6AB8gAkGzDSgAADYCGCACQbYNKAAANgAbIAJB5KkBNgIAIAIgAjYCECAFKAIEQTxqIgQgAkEYaiIDEChFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBADoAGiACQfPkATsBGCACQQI6ACMgAkG8rQE2AgAgAiACNgIQIAUoAgRBPGoiBCACQRhqIgMQKEUEQCACQShqIAQgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAQQQhBCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEDOgAjIAJBADoAGyACQYYOLwAAOwEYIAJBiA4tAAA6ABogAkGUsQE2AgAgAiACNgIQIAUoAgRBPGoiBCACQRhqIgMQKEUEQCACQShqIAQgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAQQQhBCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEAOgAcIAJB88rFkwM2AhhBBCEEIAJBBDoAIyACQdi1ATYCACACIAI2AhAgBSgCBEE8aiIHIAJBGGoiAxAoRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJB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BEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBADoAICACQvPsmZuHrZm25gA3AxggAkEIOgAjIAJB6PkBNgIAIAIgAjYCECAFKAIEQTxqIgQgAkEYaiIDEChFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILQQQhBCACQQA6AB0gAkGADy0AADoAHCACQQU6ACMgAkH8DigAADYCGCACQfj9ATYCACACIAI2AhAgBSgCBEE8aiIHIAJBGGoiAxAoRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILQQQhBCACQQA6AB4gAkHwCS8AADsBHCACQQY6ACMgAkHsCSgAADYCGCACQaCHAjYCACACIAI2AhAgBSgCBEE8aiIHIAJBGGoiAxAoRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILQQQhBCACQQA6AB4gAkGoEi8AADsBHCACQQY6ACMgAkGkEigAADYCGCACQaCOAjYCACACIAI2AhAgBSgCBEE8aiIHIAJBGGoiAxAoRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBADoAISACQYgOLQAAOgAgIAJBCToAIyACQYAOKQAANwMYIAJB6JICNgIAIAIgAjYCECAFKAIEQTxqIgQgAkEYaiIDEChFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJB2hovAAA7ASAgAkGAFDsBIiACQdIaKQAANwMYIAJB0JYCNgIAIAIgAjYCECAFKAIEQTxqIgQgAkEYaiIDEChFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILQQQhBCACQQA6AB0gAkHDEi0AADoAHCACQQU6ACMgAkG/EigAADYCGCACQbiaAjYCACACIAI2AhAgBSgCBEE8aiIHIAJBGGoiAxAoRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJB1hEvAAA7ASAgAkGAFDsBIiACQc4RKQAANwMYIAJB+J0CNgIAIAIgAjYCECAFKAIEQTxqIgQgAkEYaiIDEChFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBADoAISACQakSLQAAOgAgIAJBCToAIyACQaESKQAANwMYIAJB0KECNgIAIAIgAjYCECAFKAIEQTxqIgQgAkEYaiIDEChFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBEBAjIgM2AhggAkKMgICAgIKAgIB/NwIcIANBhQ4oAAA2AAggA0H9DSkAADcAACADQQA6AAwgAkGgpQI2AgAgAiACNgIQIAUoAgRBPGoiBCACQRhqIgMQKEUEQCACQShqIAQgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAQQQhBCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEQECMiAzYCGCACQo2AgICAgoCAgH83AhwgA0HUGikAADcABSADQc8aKQAANwAAIANBADoADSACQZypAjYCACACIAI2AhAgBSgCBEE8aiIEIAJBGGoiAxAoRQRAIAJBKGogBCADIAMgAhArCwJAAkAgAiAC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oqAiBSAFoCACoTkDYCAAIAogCaIgCCACIAaioKAiBiAGoCAIoTkDaEQAAAAAAAAAACECAkACQAJAAkAgDg4DAQIAAwsgAyADokQAAAAAAADwv6AgBKIgBaIgB6AhAgwCCyADIAOiRAAAAAAAAPC/oCAGoiADRAAAAAAAAPC/oCAEoiAFoiAHoKAhAgwBC0QAAAAAAADwPyADIAOiIgKhIAaiIAIgB6IgBSADRAAAAAAAAPA/IAOhIASioqKgoCECCyABIA1qIAI5AwAgDEEBaiIMIAtHDQALDAELIAtFDQAgDSALQQN0ECYaCwvgBAEFfyMAQTBrIgMkAAJ/AkAgASgCBCABLQALIgQgBMAiBEEASBtBBEcNACABKAIAIAEgBEEASBsoAABB7d6RqwZHDQBBBSACLQAYQQRHDQEaAkAgAiwAC0EATgRAIAMgAigCCDYCECADIAIpAgA3AwgMAQsgA0EIaiACKAIAIAIoAgQQMQtBACEEAkACQAJAAkACQCADKAIMIAMtABMiBSAFwCIFQQBIIgYbQQRrDgYCBAQEAAEECyADKAIIIANBCGogBhspAABC7N7dm4etmbbmAFENAgwDCyADKAIIIANBCGogBhtBkhFBCRAnDQJBASEEDAELQQIhBCADKAIIIANBCGogBUEASBsiBigAAEHiyrHjBkYNACAGKAAAQfDKhdsGRw0BCyAAIAQ2AiwLIAVBAE4NACADKAIIECILIANBCGogAEEIaiABIAEgAhAzAkAgAy0ADA0AIAMoAggiBEEYaiEAIAItABghAQJAIAQtADAiBUH/AUYEQCABQf8BRg0CDAELIAFB/wFHDQAgA0EbNgIoIANBHDYCJCADQR02AiAgA0EeNgIcIANBHzYCGCADQSA2AhQgA0EhNgIQIANBIjYCDCADQSM2AgggA0EEaiAAIANBCGogBUECdGooAgARAQAgBEH/AToAMAwBCyADIAA2AgQgA0E4NgIoIANBOTYCJCADQTo2AiAgA0E7NgIcIANBPDYCGCADQT02AhQgA0E+NgIQIANBPzYCDCADQcAANgIIIANBBGogACACIANBCGogAUECdGooAgARAwALQQALIQcgA0EwaiQAIAcLDwAgAEHE+wE2AgAgABAiCw0AIABBxPsBNgIAIAALBgBB6P0BCxQAIABBBGpBACABKAIEQZz9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IAQoAgAhAyACKAIAIQJByAAQIyIBQezzATYCACABQgA3AgQgAUHg9AE2AhAgAUIANwMYIAEgAjYCFCABQgA3AyAgASADNgI4IAEgBTkDMCABQYCAgPwDNgIoIAFBQGtCADcDACABQQA2AjwgACABNgIEIAAgAUEQajYCAAsLACABQaDyATYCAAsRAEEIECMiAEGg8gE2AgAgAAuUAQIDfwF8IAEoAhAhAiABKAIIKAIAIQMCQCABKAIERQRAIAJFDQEgAyACQQN0ECYaDwsgAkUNAEQAAAAAAADwPyAAKwMgoyEFIAEoAgAoAgAhAEEAIQEDQCADIAFBA3QiBGogBSAAIARqKwMARBgtRFT7IRlAoqJEAAAAAAAA4D+iEGg5AwAgAUEBaiIBIAJHDQALCwsPACAAQYzwATYCACAAECILDQAgAEGM8AE2AgAgAAsGAEGQ8gELgAIBA38jAEEwayIAJAAgAUEANgIIIAFCADcDAAJAIAIoAgQiBSACKAIAIgNHBEAgBSADayIEQQBIDQEgASAEECMiAjYCBCABIAI2AgAgASACIARqNgIIA0AgAkH/AToAGCACQQA6AAAgAy0AGCIEQf8BRwRAIABBLTYCLCAAQS42AiggAEEvNgIkIABBMDYCICAAQTE2AhwgAEEyNgIYIABBMzYCFCAAQTQ2AhAgAEE1NgIMIABBC2ogAiADIABBDGogBEECdGooAgARAwAgAiADLQAYOgAYCyACQSBqIQIgA0EgaiIDIAVHDQALIAEgAjYCBAsgAEEwaiQADwsQLAALFAAgAEEEakEAIAEoAgRB0PEBRhsLdgEBfCADKwMAIQUgBCgCACEDIAIoAgAhAkHAABAjIgFBjPABNgIAIAFCADcCBCABQYjxATYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggACABNgIEIAAgAUEQajYCAAsLACABQbjuATYCAAsRAEEIECMiAEG47gE2AgAgAAvrAQIJfwV8IAEoAhAhAiABKAIIKAIAIQQCQCABKAIEQQZPBEAgAkUNASABKAIAIgEoAhQhBSABKAIQIQYgASgCDCEHIAEoAgghCCABKAIEIQkgASgCACEKA0AgByADQQN0IgFqKwMAIQ0gASAJaisDACEOIAArAzghDyAAIAEgCGorAwAgASAFaisDACILoiABIApqKwMAIAuiIAArAzCgIgwgASAGaisDAKKhOQM4IAAgDyAOIAuiIAwgDaKhoDkDMCABIARqIAw5AwAgA0EBaiIDIAJHDQALDAELIAJFDQAgBCACQQN0ECYaCwsPACAAQajsATYCACAAECILDQAgAEGo7AE2AgAgAAsGAEGo7gELFAAgAEEEakEAIAEoAgRB6O0BRhsLhwEBAXwgAysDACEFIAQoAgAhAyACKAIAIQJB0AAQIyIBQajsATYCACABQgA3AgQgAUGg7QE2AhAgAUIANwMYIAEgAjYCFCABQgA3AyAgASADNgI4IAEgBTkDMCABQYCAgPwDNgIoIAFBQGtCADcDACABQgA3A0ggACABNgIEIAAgAUEQajYCAAtlAQJ/IAFBADYCCCABQgA3AwACQCACKAIEIgAgAigCACIDRwRAIAAgA2siAEEASA0BIAEgABAjIgI2AgQgASACNgIAIAEgACACaiIENgIIIAIgAyAAEC8aIAEgBDYCBAsPCxAsAAsLACABQdjqATYCAAsRAEEIECMiAEHY6gE2AgAgAAucAQIFfwJ8IAEoAhAhAiABKAIIKAIAIQMCQCABKAIEQQNPBEAgAkUNASABKAIAIgUoAgghBkEAIQEDQCAAIAUgBiABQQN0IgRqKwMAmSIHIAArAzAiCGRFQQJ0aigCACAEaisDACAIIAehoiAHoCIHOQMwIAMgBGogBzkDACABQQFqIgEgAkcNAAsMAQsgAkUNACADIAJBA3QQJhoLCw8AIABB1OgBNgIAIAAQIgsNACAAQdToATYCACAACwYAQcjqAQsUACAAQQRqQQAgASgCBEGM6gFGGwuAAQEBfCADKwMAIQUgBCgCACEDIAIoAgAhAkHIABAjIgFB1OgBNgIAIAFCADcCBCABQcjpATYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggAUFAa0IANwMAIAAgATYCBCAAIAFBEGo2AgALCwAgAUGI5wE2AgALEQBBCBAjIgBBiOcBNgIAIAALSwAgAigCECIARQRAIAFBADYCEA8LIAAgAkYEQCABIAE2AhAgAigCECIAIAEgACgCACgCDBEBAA8LIAEgACAAKAIAKAIIEQIANgIQC4UCAgd/AXwgASgCECEC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KwMAIAKiOQMAIAFBAWoiASAERw0ACwsLsAMBBH8jAEEwayIDJAACfwJAAkACQAJAIAEoAgQgAS0ACyIEIATAIgRBAEgbQQNHDQAgASgCACABIARBAEgbQYgPQQMQJw0AQQUgAi0AGEECRyIEDQQaIAApAzBC////////////AINCAFINACAEDQEgAEQAAAAAAADwP0QAAAAAAAAAACACLQAAGzkDMAsgA0EMaiAAQQhqIAEgASACEDMgAy0AEA0CIAMoAgwiBEEYaiEAIAItABghASAELQAwIgVB/wFGBEAgAUH/AUYNAwwCCyABQf8BRw0BIANBGzYCLCADQRw2AiggA0EdNgIkIANBHjYCICADQR82AhwgA0EgNgIYIANBITYCFCADQSI2AhAgA0EjNgIMIANBCGogACADQQxqIAVBAnRqKAIAEQEAIARB/wE6ADAMAgsQOwALIAMgADYCCCADQTg2AiwgA0E5NgIoIANBOjYCJCADQTs2AiAgA0E8NgIcIANBPTYCGCADQT42AhQgA0E/NgIQIANBwAA2AgwgA0EIaiAAIAIgA0EMaiABQQJ0aigCABEDAAtBAAshBiADQTBqJAAgBgsPACAAQZTSATYCACAAECILJAAgASACKQMANwMAIAEgAigCCDYCCCACQgA3AwAgAkEANgIICw0AIABBlNIBNgIAIAALBgBB+NMBCxQAIABBBGpBACABKAIEQcDTAUYbC44BAQF8IAMrAwAhBSAEKAIAIQMgAigCACECQdgAECMiAUGU0gE2AgAgAUIANwIEIAFBhNMBNgIQIAFCADcDGCABIAI2AhQgAUIANwMgIAEgAzYCOCABIAU5AzAgAUGAgID8AzYCKCABQUBrQgA3AwAgAUIANwNIIAFCADcDUCAAIAE2AgQgACABQRBqNgIACwsAIAFBzNABNgIACxEAQQgQIyIAQczQATYCACAAC4ECAgd/A3wgASgCECECIAEoAggoAgAhBAJAIAEoAgRBAU0EQCACRQ0BIAQgAkEDdBAmGg8LIAJFDQAgACgCOCEGIAAoAjwhAyABKAIAIgEoAgQhByABKAIAIQhBACEBA0AgCCABQQN0IgVqKwMAIQkgACsDMCEKIAAgBSAHaisDACILOQMwAkACfwJAIAsgCqFEAAAAAAAAAABkRQRAIAAgA0EBaiIDNgI8IAMgBkkNAQsgAEEANgI8IAAgCTkDQEEADAELIAkgACsDQCIKZEUNASAAIAk5A0AgAEEANgI8QQALIQMgCSEKCyAEIAVqIAo5AwAgAUEBaiIBIAJHDQALCwu2AwIEfwF8IwBBMGsiAyQAAn8CQCABKAIEIAEtAAsiBCAEwCIEQQBIG0EERw0AIAEoAgAgASAEQQBIGygAAEHo3rGjBkcNAEEFIAItABhBA0cNARogAAJ/IAArAyBE/Knx0k1iUD+iIAIrAwCiIgdEAAAAAAAA8EFjIAdEAAAAAAAAAABmcQRAIAerDAELQQALNgI4CyADQQxqIABBCGogASABIAIQMwJAIAMtABANACADKAIMIgRBGGohACACLQAYIQECQCAELQAwIgVB/wFGBEAgAUH/AUYNAgwBCyABQf8BRw0AIANBGzYCLCADQRw2AiggA0EdNgIkIANBHjYCICADQR82AhwgA0EgNgIYIANBITYCFCADQSI2AhAgA0EjNgIMIANBCGogACADQQxqIAVBAnRqKAIAEQEAIARB/wE6ADAMAQsgAyAANgIIIANBODYCLCADQTk2AiggA0E6NgIkIANBOzYCICADQTw2AhwgA0E9NgIYIANBPjYCFCADQT82AhAgA0HAADYCDCADQQhqIAAgAiADQQxqIAFBAnRqKAIAEQMAC0EACyEGIANBMGokACAGCw8AIABB3M4BNgIAIAAQIgsNACAAQdzOATYCACAAC1MBAn8gASACKAIANgIAIAEgAigCBCIDNgIEIAEgAigCCCIENgIIIAFBBGohACAERQRAIAEgADYCAA8LIAMgADYCCCACQgA3AgQgAiACQQRqNgIACwYAQbzQAQsUACAAQQRqQQAgASgCBEGI0AFGGwuSAQEBfCADKwMAIQUgBCgCACEDIAIoAgAhAkHYABAjIgFB3M4BNgIAIAFCADcCBCABQczPATYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggAUIANwNQIAFC/////w83AkggAUFAa0IANwMAIAAgATYCBCAAIAFBEGo2AgALCwAgAUGUzQE2AgALEQBBCBAjIgBBlM0BNgIAIAALtwECBX8CfCABKAIQIQIgASgCCCgCACEDAkAgASgCBEECTwRAIAJFDQEgASgCACIFKAIAIQZB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LQALIgQhBwsCQAJAAkACQCAFIAQgB8AiBEEASBtBBEcNACABKAIAIAEgBEEASBsoAABB7N69gwdHDQBBBSEEAn8CQAJAAkACQAJAIAItABhBAWsOBgEACgoKAgoLIAItAAANCQsgA0ECOgAQIANCfzcDCAJ/IAAoAjwiBCAAQUBrKAIAIgVLBEAgBCAFawwBCyAAKAI4IAQgBWtqCyEHIAMtABAiBCAHRQ0DGiAAKAJEIAVBDGxqIgYtAAgiB0H/AUYEQCAEQf8BRg0DDAILIARB/wFHDQEgA0HEADYCICADQcUANgIcIANBxgA2AhggAyAGIANBGGogB0ECdGooAgARAQAgBkH/AToACAwCCyACKAIAIgQtABhBA0cNBCAELQA4QQNHDQQgBCsDACEQIAQrAyAhESADQQI6ABACfyARmUQAAAAAAADgQWMEQCARqgwBC0GAgICAeAutQiCGIRIgAyASAn8gEJlEAAAAAAAA4EFjBEAgEKoMAQtBgICAgHgLrYQ3AwgCfyAAKAI8IgQgAEFAaygCACIFSwRAIAQgBWsMAQsgACgCOCAEIAVragshDiADLQAQIQQgDgR/AkACQCAAKAJEIAVBDGxqIgYtAAgiB0H/AUYEQCAEQf8BRg0CDAELIARB/wFHDQAgA0HEADYCICADQcUANgIcIANBxgA2AhggAyAGIANBGGogB0ECdGooAgARAQAgBkH/AToACAwBCyADIAY2AgAgA0HHADYCICADQcgANgIcIANByQA2AhggAyAGIANBCGogA0EYaiAEQQJ0aigCABEDAAsgACAAKAJQIAVBAWpxNgJAIAMtABAFIAQLQf8BcSIEQf8BRg0DIANBxAA2AiAgA0HFADYCHCADQcYANgIYIAMgA0EIaiADQRhqIARBAnRqKAIAEQEADAMLIAMgBjYCACADQccANgIgIANByAA2AhwgA0HJADYCGCADIAYgA0EIaiADQRhqIARBAnRqKAIAEQMACyAAIAAoAlAgBUEBanE2AkAgAy0AEAtB/wFxIgRB/wFGDQAgA0HEADYCICADQcUANgIcIANBxgA2AhggAyADQQhqIANBGGogBEECdGooAgARAQALAkAgASgCBCIFIAEtAAsiBCAEwCIHQQBIIgYbQQZHDQAgASgCACABIAYbQa4JQQYQJw0AQQUhBCACLQAYQQJH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ADcCBCABQaysATYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggAUFAa0IANwMAIAFCADcDSCAAIAE2AgQgACABQRBqNgIACwsAIAFB5KkBNgIACxEAQQgQIyIAQeSpATYCACAAC48BAgR/AnwgASgCECECIAEoAggoAgAhAwJAIAEoAgQEQCACRQ0BIAEoAgAoAgAhBEEAIQEDQCAAIAArAzgiBiAEIAFBA3QiBWorAwBEAAAAAAAA8D8gACsDIKOioCIHIAecoTkDOCADIAVqIAY5AwAgAUEBaiIBIAJHDQALDAELIAJFDQAgAyACQQN0ECYaCwsPACAAQdynATYCACAAECILDQAgAEHcpwE2AgAgAAsGAEHUqQELFAAgAEEEakEAIAEoAgRBmKkBRhsLhwEBAXwgAysDACEFIAQoAgAhAyACKAIAIQJB0AAQIyIBQdynATYCACABQgA3AgQgAUHUqAE2AhAgAUIANwMYIAEgAjYCFCABQgA3AyAgASADNgI4IAEgBTkDMCABQYCAgPwDNgIoIAFBQGtCADcDACABQgA3A0ggACABNgIEIAAgAUEQajYCAAsLACABQYymATYCAAsRAEEIECMiAEGMpgE2AgAgAAu6AQIBfgV/AkAgASgCECIDRQ0AIAApAzAhAiABKAIIKAIAIQRBACEAIANBCE8EQCADQXhxIQcDQCAEIABBA3RqIgEgAjcDACABIAI3AwggASACNwMQIAEgAjcDGCABIAI3AyAgASACNwMoIAEgAjcDMCABIAI3AzggAEEIaiEAIAZBCGoiBiAHRw0ACwsgA0EHcSIBRQ0AA0AgBCAAQQN0aiACNwMAIABBAWohACAFQQFqIgUgAUcNAAsLC/sCAQR/IwBBMGsiAyQAAn8CQCABKAIEIAEtAAsiBCAEwCIEQQBIG0EFRw0AIAEoAgAgASAEQQBIG0GoEUEFECcNAEEFIAItABhBA0cNARogACACKQMANwMwCyADQQxqIABBCGogASABIAIQMwJAIAMtABANACADKAIMIgRBGGohACACLQAYIQECQCAELQAwIgVB/wFGBEAgAUH/AUYNAgwBCyABQf8BRw0AIANBGzYCLCADQRw2AiggA0EdNgIkIANBHjYCICADQR82AhwgA0EgNgIYIANBITYCFCADQSI2AhAgA0EjNgIMIANBCGogACADQQxqIAVBAnRqKAIAEQEAIARB/wE6ADAMAQsgAyAANgIIIANBODYCLCADQTk2AiggA0E6NgIkIANBOzYCICADQTw2AhwgA0E9NgIYIANBPjYCFCADQT82AhAgA0HAADYCDCADQQhqIAAgAiADQQxqIAFBAnRqKAIAEQMAC0EACyEGIANBMGokACAGCw8AIABBlKQBNgIAIAAQIgsNACAAQZSkATYCACAACwYAQfylAQsUACAAQQRqQQAgASgCBEHEpQFGGwuIAQEBfCADKwMAIQUgBCgCACEDIAIoAgAhAkHIABAjIgFBlKQBNgIAIAFCADcCBCABQYSlATYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggAUFAa0KAgICAgICA+D83AwAgACABNgIEIAAgAUEQajYCAAsLACABQcyiATYCAAsRAEEIECMiAEHMogE2AgAgAAuOBQIHfwN8IAEoAhAhAiABKAIIKAIAIQMCQCABKAIERQRAIAJFDQEgAyACQQN0ECYaDwsgASgCACgCACEEIAArAzAiCyAAKwM4IglhBEAgAkEATA0BQQAhASACQQRPBEAgAkH8////B3EhBgNAIAMgAUEDdCIAaiAAIARqKwMAIAmiOQMAIAMgAEEIciIHaiAEIAdqKwMAIAmiOQMAIAMgAEEQciIHaiAEIAdqKwMAIAmiOQMAIAMgAEEYciIAaiAAIARqKwMAIAmiOQMAIAFBBGohASAIQQRqIgggBkcNAAsLIAJBA3EiAEUNAQNAIAMgAUEDdCICaiACIARqKwMAIAmiOQMAIAFBAWohASAFQQFqIgUgAEcNAAsMAQsgAEFAaysDACEJAkAgAkEATA0AQQAhASACQQFHBEAgAkH+////B3EhCANAIAMgAUEDdCIGaiAEIAZqKwMARAAAAAAAAAAARAAAAAAAAPA/IAkgAbeiIAugIgogCkQAAAAAAADwP2QbIApEAAAAAAAAAABjG6I5AwAgAyABQQFyIgZBA3QiB2ogBCAHaisDAEQAAAAAAAAAAEQAAAAAAADwPyAJIAa3oiALoCIKIApEAAAAAAAA8D9kGyAKRAAAAAAAAAAAYxuiOQMAIAFBAmohASAFQQJqIgUgCEcNAAsLIAJB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AgALEQBBCBAjIgBB4JYBNgIAIAALwQMBCn8gASgCECEAIAEoAggoAgAhAwJAIAEoAgQiBgRAIABFDQEgASgCACILKAIAIQRBACEBIABBBE8EQCAAQXxxIQkDQCADIAFBA3QiAmogAiAEaisDADkDACADIAJBCHIiB2ogBCAHaisDADkDACADIAJBEHIiB2ogBCAHaisDADkDACADIAJBGHIiAmogAiAEaisDADkDACABQQRqIQEgBUEEaiIFIAlHDQALCyAAQQNxIgUEQANAIAMgAUEDdCICaiACIARqKwMAOQMAIAFBAWohASAIQQFqIgggBUcNAAsLIAZBAUYNASAARQ0BQQIgBiAGQQJNGyEIIABBfnEhCSAAQQFxIQdBASEEA0AgCyAEQQJ0aigCACECQQAhAUEAIQUgAEEBRwRAA0AgAyABQQN0IgZqIgogCisDACACIAZqKwMAEFM5AwAgAyAGQQhyIgZqIgogCisDACACIAZqKwMAEFM5AwAgAUECaiEBIAVBAmoiBSAJRw0ACwsgBwRAIAMgAUEDdCIBaiIFIAUrAwAgASACaisDABBTOQMACyAEQQFqIgQgCEcNAAsMAQsgAEUNACADIABBA3QQJhoLCw8AIABBnJQBNgIAIAAQIgsNACAAQZyUATYCACAACwYAQdCWAQsUACAAQQRqQQAgASgCBEGAlgFGGwt2AQF8IAMrAwAhBSAEKAIAIQMgAigCACECQcAAECMiAUGclAE2AgAgAUIANwIEIAFBqJUBNgIQIAFCADcDGCABIAI2AhQgAUIANwMgIAEgAzYCOCABIAU5AzAgAUGAgID8AzYCKCAAIAE2AgQgACABQRBqNgIACwsAIAFBuJIBNgIACxEAQQgQIyIAQbiSATYCACAAC4gEAgp/AXwgASgCECEAIAEoAggoAgAhAwJAIAEoAgQiBQRAIABFDQEgASgCACILKAIAIQRBACEBIABBBE8EQCAAQXxxIQkDQCADIAFBA3QiAmogAiAEaisDADkDACADIAJBCHIiCGogBCAIaisDADkDACADIAJBEHIiCGogBCAIaisDADkDACADIAJBGHIiAmogAiAEaisDADkDACABQQRqIQEgB0EEaiIHIAlHDQALCyAAQQNxIgIEQANAIAMgAUEDdCIHaiAEIAdqKwMAOQMAIAFBAWohASAGQQFq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AkE4aiAGQQJ0aigCABEDACADIAQtABg6ABgLIANBIGohAyAEQSBqIgQgBUcNAAsgAiADNgIECyACQQY6ABggAkEgaiAAIAIQSSACKAIkIgAQBiACIAA2AjggAkEANgI0QfSCBC0AAEEBcUUEQEECQdTyAkEAEAwhAEH0ggRBAToAAEHwggQgADYCAAsCf0HwggQoAgAgASgCBCACQTRqIAJBOGoQFiILRAAAAAAAAPBBYyALRAAAAAAAAAAAZnEEQCALqwwBC0EACyEAIAIoAjQiAQRAIAEQBAsgAARAIAAQAAsgAigCJCIABEAgABAAIAJBADYCJAsgAi0AGCIAQf8BRwRAIAJBGzYCWCACQRw2AlQgAkEdNgJQIAJBHjYCTCACQR82AkggAkEgNgJEIAJBITYCQCACQSI2AjwgAkEjNgI4IAJBNGogAiACQThqIABBAnRqKAIAEQEACyACKAIoIgAEQCACKAIsIgMgACIERwRAA0AgA0EgayIDLQAYIgFB/wFHBEAgAkEbNgJYIAJBHDYCVCACQR02AlAgAkEeNgJMIAJBHzYCSCACQSA2AkQgAkEhNgJAIAJBIjYCPCACQSM2AjggAiADIAJBOGogAUECdGooAgARAQALIANB/wE6ABggACADRw0ACyACKAIoIQQLIAIgADYCLCAEECILIAJB4ABqJAAPCxAsAAsRAEEIECMiAEHY5gA2AgAgAAvCAwEIfyABKAIQIQAgASgCCCgCACEDAkAgASgCBEECTwRAIABFDQEgASgCACIGKAIAIQRBACEBIABBBE8EQCAAQXxxIQkDQCADIAFBA3QiAmogAiAEaisDADkDACADIAJBCHIiCGogBCAIaisDADkDACADIAJBEHIiCGogBCAIaisDADkDACADIAJBGHIiAmogAiAEaisDADkDACABQQRqIQEgBUEEaiIFIAlHDQALCyAAQQNxIgIEQANAIAMgAUEDdCIFaiAEIAVqKwMAOQMAIAFBAWohASAHQQFqIgcgAkcNAAsLIAYoAgQhBEEAIQEgAEEBRwRAIABBfnEhBUEAIQcDQCADIAFBA3QiAmoiBkQAAAAAAADwP0QAAAAAAAAAACAGKwMAIAIgBGorAwBlGzkDACADIAJBCHIiAmoiBkQAAAAAAADwP0QAAAAAAAAAACAGKwMAIAIgBGorAwBlGzkD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ACgCACIADQALCyAEQRBqJAALBQBBtBsLdgEBfCADKwMAIQUgBCgCACEDIAIoAgAhAkHAABAjIgFB9NYANgIAIAFCADcCBCABQfzXADYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggACABNgIEIAAgAUEQajYCAAsLACABQZTVADYCAAsRAEEIECMiAEGU1QA2AgAgAAv3AQEHfyABKAIQIQAgASgCCCgCACEDAkAgASgCBARAIABFDQEgASgCACgCACEEQQAhASAAQQRPBEAgAEF8cSEIA0AgAyABQQN0IgJqIAIgBGorAwCfOQMAIAMgAkEIciIFaiAEIAVqKwMAnzkDACADIAJBEHIiBWogBCAFaisDAJ85AwAgAyACQRhyIgJqIAIgBGorAwCfOQMAIAFBBGohASAHQQRqIgcgCEcNAAsLIABBA3EiAEUNAQNAIAMgAUEDdCICaiACIARqKwMAnzkDACABQQFqIQEgBkEBaiIGIABHDQALDAELIABFDQAgAyAAQQN0ECYaCwsPACAAQdjSADYCACAAECILDQAgAEHY0gA2AgAgAAsGAEGE1QALFAAgAEEEakEAIAEoAgRBtNQARhsLdgEBfCADKwMAIQUgBCgCACEDIAIoAgAhAkHAABAjIgFB2NIANgIAIAFCADcCBCABQeDTADYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggACABNgIEIAAgAUEQajYCAAsLACABQfjQADYCAAvMAQEGfyAAKAIAIQIjAEEQayIAJAAgAigChAEiAQRAIAJB/ABqIQMDQAJ/AkAgASgCGCICRQ0AIAIoAgQNACABKAIAIQYgAEEEaiADIAEQnAEgACgCBCEBIABBADYCBCABBEACQCAALQAMRQ0AAkAgASgCGCICRQ0AIAIgAigCBCIFQQFrNgIEIAUNACACIAIoAgAoAggRAAAgAhAlCyABLAATQQBODQAgASgCCBAiCyABECILIAYMAQsgASgCAAsiAQ0ACwsgAEEQaiQACxEAQQgQIyIAQfjQADYCACAAC/wBAQd/IAEoAhAhACABKAIIKAIAIQMCQCABKAIEBEAgAEUNASABKAIAKAIAIQRBACEBIABBBE8EQCAAQXxxIQgD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AkACQAJAAkAgBA4JAAECAwQFBgcICQsgAkHP1gE7AQAgAkECOgALIAJBAmoMCQsgAkEgECMiAzYCACACQpiAgICAhICAgH83AgQgA0GAFCkAADcAECADQfgTKQAANwAIIANB8BMpAAA3AAAgA0EYagwICyACQRAQIyIDNgIAIAJCjoCAgICCgICAfzcCBCADQdITKQAANwAGIANBzBMpAAA3AAAgA0EOagwHCyACQTAQIyIDNgIAIAJCr4CAgICGgICAfzcCBCADQeoLKQAANwAnIANB4wspAAA3ACAgA0HbCykAADcAGCADQdMLKQAANwAQIANBywspAAA3AAggA0HDCykAADcAACADQS9qDAYLIAJBwAAQIyIDNgIAIAJCtICAgICIgICAfzcCBCADQb4LKAAANgAwIANBtgspAAA3ACggA0GuCykAADcAICADQaYLKQAANwAYIANBngspAAA3ABAgA0GWCykAADcACCADQY4LKQAANwAAIANBNGoMBQsgAkEwECMiAzYCACACQq6AgICAhoCAgH83AgQgA0HQCCkAADcAJiADQcoIKQAANwAgIANBwggpAAA3ABggA0G6CCkAADcAECADQbIIKQAANwAIIANBqggpAAA3AAAgA0EuagwECyACQTAQIyIDNgIAIAJCqYCAgICGgICAfzcCBCADQagILQAAOgAoIANBoAgpAAA3ACAgA0GYCCkAADcAGCADQZAIKQAANwAQIANBiAgpAAA3AAggA0GACCkAADcAACADQSlqDAMLIAJBIBAjIgM2AgAgAkKTgICAgISAgIB/NwIEIANB1Q4oAAA2AA8gA0HODikAADcACCADQcYOKQAANwAAIANBE2oMAgsgAkEgECMiAzYCACACQpqAgICAhICAgH83AgQgA0HzCi8AADsAGCADQesKKQAANwAQIANB4wopAAA3AAggA0HbCikAADcAACADQRpqDAELIAJBIBAjIgM2AgAgAkKagICAgISAgIB/NwIEIANBoRQvAAA7ABggA0GZFCkAADcAECADQZEUKQAANwAIIANBiRQpAAA3AAAgA0EaagtBADoAACAJQcgSKAAANgBLIAlBBzoAUyAJQQA6AE8gCUHFEigAADYCSCAJQdgAaiECIAlByABqIQMCQCAJLAAXQQBOBEAgAiAJKQIMNwIAIAIgCSgCFDYC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bm9kZSB0aGF0IGFscmVhZHkgZXhpc3RzAHByb2Nlc3NRdWV1ZWRFdmVudHMAcHJvY2VzcwBzdWNjZXNzAGJhZF92YXJpYW50X2FjY2VzcwBsb3dwYXNzAGFsbHBhc3MAY29zAHZhbHVlcwBnYXRlcwBsaXN0U2hhcmVkUmVzb3VyY2VzAHBydW5lU2hhcmVkUmVzb3VyY2VzAGFicwBmYWRlT3V0TXMAc2V0Q3VycmVudFRpbWVNcwB2ZWN0b3IARWxlbWVudGFyeUF1ZGlvUHJvY2Vzc29yAHNwaGFzb3IAZmxvb3IAY291bnRlcgBtZXRlcgB0cmlnZ2VyAHVuc2lnbmVkIGNoYXIAbGl2ZUNsZWFyAHR4c2VxAHNwYXJzZXEAbWMuc2FtcGxlc2VxAGxlcQBnZXEAZXhwAHByZXdhcnAAc3RvcABsb29wAG1ldHJvAHN0ZDo6ZXhjZXB0aW9uAEZ1bmN0aW9uAEludmFyaWFudCB2aW9sYXRpb24Ac2luAG1pbgBfaW50ZXJuYWw6bnVtQ2hpbGRyZW4AdGFuAHRhcEluAGFjY3VtAGFybQBmcm9tAC9kZXYvdXJhbmRvbQBtdWwAYm9vbABzdGQ6OmJhZF9mdW5jdGlvbl9jYWxsAGNoYW5uZWwAdGlja0ludGVydmFsAHJlYWwAT2sAYmFkX2FycmF5X25ld19sZW5ndGgAYXNpbmgAbm90Y2gAc3RyZXRjaABsYXRjaABNYWxmb3JtZWQgbWVzc2FnZSBiYXRjaABwb3N0TWVzc2FnZUJhdGNoAGxvZwB1bnNpZ25lZCBsb25nAHN0ZDo6d3N0cmluZwBiYXNpY19zdHJpbmcAc3RkOjpzdHJpbmcAc3RkOjp1MTZzdHJpbmcAc3RkOjp1MzJzdHJpbmcAaW1hZwBzdmYAaGlnaHNoZWxmAGFjdGl2ZQBsaXZlAHZhbHVlAGludGVycG9sYXRlAHVwZGF0ZQBwbGF5YmFja1JhdGUAbWMuY2FwdHVyZQBibGVwc3F1YXJlAHByZXBhcmUAbmFtZSBtdXN0IGJlIGEgc3RyaW5nIHR5cGUAc2NvcGUAc2V0Q3VycmVudFRpbWUAbmFtZQBtYy5zYW1wbGUAYmxlcHRyaWFuZ2xlAGRvdWJsZQB0YWJsZQBtZXNzYWdlAGNhbm5vdCBvdmVyd3JpdGUgZXhpc3Rpbmcgc2hhcmVkIHJlc291cmNlAGFkZFNoYXJlZFJlc291cmNlAG1vZAByb3VuZAB1bm9yZGVyZWRfbWFwOjphdDoga2V5IG5vdCBmb3VuZABtYXA6OmF0OiAga2V5IG5vdCBmb3VuZABOb2RlIG5vdCBmb3VuZABhbmQAY21kAG1heGhvbGQAdm9pZABOb2RlIHR5cGUgbm90IHJlY29nbml6ZWQAUmV0dXJuIGNvZGUgbm90IHJlY29nbml6ZWQAcmFuZG9tX2RldmljZSBnZXRlbnRyb3B5IGZhaWxlZABhZGQAYmlxdWFkAHNlc3Npb25JZABzdGQ6OmJhZF9hbGxvYwBwYW5pYwBnYwByb3dzUGVyU2VjAHN1YgBkYXRhAGdldE91dHB1dEJ1ZmZlckRhdGEAZ2V0SW5wdXRCdWZmZXJEYXRhAGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBzaG9ydD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGZsb2F0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50NjRfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50NjRfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGNoYXI+AHN0ZDo6YmFzaWNfc3RyaW5nPHVuc2lnbmVkIGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxsb25nPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBsb25nPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxkb3VibGU+AG1jLnNhbXBsZXNlcTIAUHVyZSB2aXJ0dWFsIGZ1bmN0aW9uIGNhbGxlZCEAcmFuZG9tIGRldmljZSBub3Qgc3VwcG9ydGVkIAAyNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcgAADP8AAJgNAABQMjRFbGVtZW50YXJ5QXVkaW9Qcm9jZXNzb3IA7P8AALwNAAAAAAAAtA0AAFBLMjRFbGVtZW50YXJ5QXVkaW9Qcm9jZXNzb3IAAAAA7P8AAOgNAAABAAAAtA0AAGlpAHYAdmkA2A0AAKj+AACo/gAAaWlpaQBBwBwLsgNI/gAA2A0AAPz+AAC0/gAAdmlpZGkAAAAAAAAAyA4AAE8AAABQAAAAUQAAAFIAAABTAAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTlHcmFwaFJlbmRlclNlcXVlbmNlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAANP8AAHQOAAB0/AAAAAAAAOgPAABUAAAAVQAAAFYAAABXAAAAWAAAAFkAAABaAAAAWwAAAFwAAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzEySWRlbnRpdHlOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUATlN0M19fMjEwX19mdW5jdGlvbjZfX2Jhc2VJRk5TXzEwc2hhcmVkX3B0cklONGVsZW05R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAAAAz/AACUDwAANP8AAAAPAADgDwBB/B8LuswCYBAAAF0AAABeAAAAXwAAAFIAAABgAAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTJJZGVudGl0eU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFADT/AAAUEAAAdPwAAAAAAADIEAAAYQAAAGIAAABjAAAAZAAAAGUAAABmAAAAZwAAAE40ZWxlbTEySWRlbnRpdHlOb2RlSWRFRQBONGVsZW05R3JhcGhOb2RlSWRFRQAAAAz/AACpEAAANP8AAJAQAADAEAAAAAAAAMAQAABhAAAAaAAAAGkAAABkAAAAagAAAGYAAABnAAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzEySWRlbnRpdHlOb2RlSWRFRUVFAAAADP8AAPgQAAAAAAAAEBIAAFQAAABrAAAAbAAAAG0AAABuAAAAbwAAAHAAAABxAAAAcgAAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjNzaW5FRUVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAADT/AABoEQAA4A8AAAAAAACYEgAAcwAAAHQAAAB1AAAAUgAAAHYAAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM3NpbkVFRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAA0/wAAOBIAAHT8AAAAAAAA9BIAAGEAAAB3AAAAaQAAAGQAAAB4AAAAZgAAAGcAAABONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM3NpbkVFRUUAADT/AADIEgAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM3NpbkVFRUVFRQAM/wAAABMAAAAAAAAoFAAAVAAAAHkAAAB6AAAAewAAAHwAAAB9AAAAfgAAAH8AAACAAAAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM2Nvc0VFRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAANP8AAIATAADgDwAAAAAAALAUAACBAAAAggAAAIMAAABSAAAAhAAAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozY29zRUVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAAADT/AABQFAAAdPwAAAAAAAAMFQAAYQAAAIUAAABpAAAAZAAAAIYAAABmAAAAZwAAAE40ZWxlbTE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozY29zRUVFRQAANP8AAOAUAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozY29zRUVFRUVFAAz/AAAYFQAAAAAAAEAWAABUAAAAhwAAAIgAAACJAAAAigAAAIsAAACMAAAAjQAAAI4AAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozdGFuRUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAA0/wAAmBUAAOAPAAAAAAAAyBYAAI8AAACQAAAAkQAAAFIAAACSAAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjN0YW5FRUVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAANP8AAGgWAAB0/AAAAAAAACQXAABhAAAAkwAAAGkAAABkAAAAlAAAAGYAAABnAAAATjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjN0YW5FRUVFAAA0/wAA+BYAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjN0YW5FRUVFRUUADP8AADAXAAAAAAAAWBgAAFQAAACVAAAAlgAAAJcAAACYAAAAmQAAAJoAAACbAAAAnAAAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjR0YW5oRUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAADT/AACwFwAA4A8AAAAAAADgGAAAnQAAAJ4AAACfAAAAUgAAAKAAAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNHRhbmhFRUVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAA0/wAAgBgAAHT8AAAAAAAAPBkAAGEAAAChAAAAaQAAAGQAAACiAAAAZgAAAGcAAABONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNHRhbmhFRUVFADT/AAAQGQAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNHRhbmhFRUVFRUUAAAAADP8AAEgZAAAAAAAAdBoAAFQAAACjAAAApAAAAKUAAACmAAAApwAAAKgAAACpAAAAqgAAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjVhc2luaEVFRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFADT/AADMGQAA4A8AAAAAAAD8GgAAqwAAAKwAAACtAAAAUgAAAK4AAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNWFzaW5oRUVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQA0/wAAnBoAAHT8AAAAAAAAXBsAAGEAAACvAAAAaQAAAGQAAACwAAAAZgAAAGcAAABONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNWFzaW5oRUVFRQAAAAA0/wAALBsAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjVhc2luaEVFRUVFRQAAAAz/AABoGwAAAAAAAJQcAABUAAAAsQAAALIAAACzAAAAtAAAALUAAAC2AAAAtwAAALgAAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozbG9nRUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAA0/wAA7BsAAOAPAAAAAAAAHB0AALkAAAC6AAAAuwAAAFIAAAC8AAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjNsb2dFRUVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAANP8AALwcAAB0/AAAAAAAAHgdAABhAAAAvQAAAGkAAABkAAAAvgAAAGYAAABnAAAATjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjNsb2dFRUVFAAA0/wAATB0AAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjNsb2dFRUVFRUUADP8AAIQdAAAAAAAArB4AAFQAAAC/AAAAwAAAAMEAAADCAAAAwwAAAMQAAADFAAAAxgAAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjVsb2cxMEVFRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFADT/AAAEHgAA4A8AAAAAAAA0HwAAxwAAAMgAAADJAAAAUgAAAMoAAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNWxvZzEwRUVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQA0/wAA1B4AAHT8AAAAAAAAlB8AAGEAAADLAAAAaQAAAGQAAADMAAAAZgAAAGcAAABONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNWxvZzEwRUVFRQAAAAA0/wAAZB8AAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjVsb2cxMEVFRUVFRQAAAAz/AACgHwAAAAAAAMwgAABUAAAAzQAAAM4AAADPAAAA0AAAANEAAADSAAAA0wAAANQAAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1o0bG9nMkVFRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAA0/wAAJCAAAOAPAAAAAAAAVCEAANUAAADWAAAA1wAAAFIAAADYAAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjRsb2cyRUVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAANP8AAPQgAAB0/AAAAAAAALAhAABhAAAA2QAAAGkAAABkAAAA2gAAAGYAAABnAAAATjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjRsb2cyRUVFRQA0/wAAhCEAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjRsb2cyRUVFRUVFAAAAAAz/AAC8IQAAAAAAAOgiAABUAAAA2wAAANwAAADdAAAA3gAAAN8AAADgAAAA4QAAAOIAAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1o0Y2VpbEVFRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAA0/wAAQCIAAOAPAAAAAAAAcCMAAOMAAADkAAAA5QAAAFIAAADmAAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjRjZWlsRUVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAANP8AABAjAAB0/AAAAAAAAMwjAABhAAAA5wAAAGkAAABkAAAA6AAAAGYAAABnAAAATjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjRjZWlsRUVFRQA0/wAAoCMAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjRjZWlsRUVFRUVFAAAAAAz/AADYIwAAAAAAAAQlAABUAAAA6QAAAOoAAADrAAAA7AAAAO0AAADuAAAA7wAAAPAAAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1o1Zmxvb3JFRUVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQA0/wAAXCQAAOAPAAAAAAAAjCUAAPEAAADyAAAA8wAAAFIAAAD0AAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjVmbG9vckVFRUVOU185YWxsb2NhdG9ySVMzX0VFRUUANP8AACwlAAB0/AAAAAAAAOwlAABhAAAA9QAAAGkAAABkAAAA9gAAAGYAAABnAAAATjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjVmbG9vckVFRUUAAAAANP8AALwlAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1o1Zmxvb3JFRUVFRUUAAAAM/wAA+CUAAAAAAAAkJwAAVAAAAPcAAAD4AAAA+QAAAPoAAAD7AAAA/AAAAP0AAAD+AAAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNXJvdW5kRUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUANP8AAHwmAADgDwAAAAAAAKwnAAD/AAAAAAEAAAEBAABSAAAAAgEAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1o1cm91bmRFRUVFTlNfOWFsbG9jYXRvcklTM19FRUVFADT/AABMJwAAdPwAAAAAAAAMKAAAYQAAAAMBAABpAAAAZAAAAAQBAABmAAAAZwAAAE40ZWxlbTE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1o1cm91bmRFRUVFAAAAADT/AADcJwAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNXJvdW5kRUVFRUVFAAAADP8AABgoAAAAAAAARCkAAFQAAAAFAQAABgEAAAcBAAAIAQAACQEAAAoBAAALAQAADAEAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjRzcXJ0RUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAADT/AACcKAAA4A8AAAAAAADMKQAADQEAAA4BAAAPAQAAUgAAABABAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNHNxcnRFRUVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAA0/wAAbCkAAHT8AAAAAAAAKCoAAGEAAAARAQAAaQAAAGQAAAASAQAAZgAAAGcAAABONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNHNxcnRFRUVFADT/AAD8KQAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNHNxcnRFRUVFRUUAAAAADP8AADQqAAAAAAAAYCsAAFQAAAATAQAAFAEAABUBAAAWAQAAFwEAABgBAAAZAQAAGgEAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjNleHBFRUVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAADT/AAC4KgAA4A8AAAAAAADoKwAAGwEAABwBAAAdAQAAUgAAAB4BAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM2V4cEVFRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAA0/wAAiCsAAHT8AAAAAAAARCwAAGEAAAAfAQAAaQAAAGQAAAAgAQAAZgAAAGcAAABONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM2V4cEVFRUUAADT/AAAYLAAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM2V4cEVFRUVFRQAM/wAAUCwAAAAAAACELQAAVAAAACEBAAAiAQAAIwEAACQBAAAlAQAAJgEAACcBAAAoAQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM2Fic0I4dWUxNzAwMDRkRUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAAANP8AANAsAADgDwAAAAAAABguAAApAQAAKgEAACsBAABSAAAALAEAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozYWJzQjh1ZTE3MDAwNGRFRUVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAAADT/AACsLQAAdPwAAAAAAACALgAAYQAAAC0BAABpAAAAZAAAAC4BAABmAAAAZwAAAE40ZWxlbTE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozYWJzQjh1ZTE3MDAwNGRFRUVFAAAANP8AAEguAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozYWJzQjh1ZTE3MDAwNGRFRUVFRUUAAAz/AACMLgAAAAAAAMAvAABUAAAALwEAADABAAAxAQAAMgEAADMBAAA0AQAANQEAADYBAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlNfNGxlc3NJZEVFRUVFRU5TXzlhbGxvY2F0b3JJUzlfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAA0/wAAGC8AAOAPAAAAAAAASDAAADcBAAA4AQAAOQEAAFIAAAA6AQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU180bGVzc0lkRUVFRU5TXzlhbGxvY2F0b3JJUzVfRUVFRQAANP8AAOgvAAB0/AAAAAAAAKgwAABhAAAAOwEAAGkAAABkAAAAPAEAAGYAAABnAAAATjRlbGVtMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU3QzX18yNGxlc3NJZEVFRUUANP8AAHgwAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlN0M19fMjRsZXNzSWRFRUVFRUUAAAAADP8AALQwAAAAAAAA7DEAAFQAAAA9AQAAPgEAAD8BAABAAQAAQQEAAEIBAABDAQAARAEAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU18xMGxlc3NfZXF1YWxJZEVFRUVFRU5TXzlhbGxvY2F0b3JJUzlfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAANP8AADwxAADgDwAAAAAAAHwyAABFAQAARgEAAEcBAABSAAAASAEAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlNfMTBsZXNzX2VxdWFsSWRFRUVFTlNfOWFsbG9jYXRvcklTNV9FRUVFAAAANP8AABQyAAB0/AAAAAAAAOQyAABhAAAASQEAAGkAAABkAAAASgEAAGYAAABnAAAATjRlbGVtMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU3QzX18yMTBsZXNzX2VxdWFsSWRFRUVFAAA0/wAArDIAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU3QzX18yMTBsZXNzX2VxdWFsSWRFRUVFRUUADP8AAPAyAAAAAAAAKDQAAFQAAABLAQAATAEAAE0BAABOAQAATwEAAFABAABRAQAAUgEAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU183Z3JlYXRlcklkRUVFRUVFTlNfOWFsbG9jYXRvcklTOV9FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAA0/wAAfDMAAOAPAAAAAAAAtDQAAFMBAABUAQAAVQEAAFIAAABWAQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU183Z3JlYXRlcklkRUVFRU5TXzlhbGxvY2F0b3JJUzVfRUVFRQAAADT/AABQNAAAdPwAAAAAAAAYNQAAYQAAAFcBAABpAAAAZAAAAFgBAABmAAAAZwAAAE40ZWxlbTE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlN0M19fMjdncmVhdGVySWRFRUVFAAA0/wAA5DQAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU3QzX18yN2dyZWF0ZXJJZEVFRUVFRQAM/wAAJDUAAAAAAABgNgAAVAAAAFkBAABaAQAAWwEAAFwBAABdAQAAXgEAAF8BAABgAQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TXzEzZ3JlYXRlcl9lcXVhbElkRUVFRUVFTlNfOWFsbG9jYXRvcklTOV9FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAAANP8AAKw1AADgDwAAAAAAAPQ2AABhAQAAYgEAAGMBAABSAAAAZAEAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlNfMTNncmVhdGVyX2VxdWFsSWRFRUVFTlNfOWFsbG9jYXRvcklTNV9FRUVFAAAAADT/AACINgAAdPwAAAAAAABgNwAAYQAAAGUBAABpAAAAZAAAAGYBAABmAAAAZwAAAE40ZWxlbTE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlN0M19fMjEzZ3JlYXRlcl9lcXVhbElkRUVFRQAAADT/AAAkNwAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TdDNfXzIxM2dyZWF0ZXJfZXF1YWxJZEVFRUVFRQAADP8AAGw3AAAAAAAAqDgAAFQAAABnAQAAaAEAAGkBAABqAQAAawEAAGwBAABtAQAAbgEAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROUzJfN1NhZmVQb3dJZEVFRUVFRU5TXzlhbGxvY2F0b3JJUzlfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAA0/wAA/DcAAOAPAAAAAAAANDkAAG8BAABwAQAAcQEAAFIAAAByAQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROUzFfN1NhZmVQb3dJZEVFRUVOU185YWxsb2NhdG9ySVM1X0VFRUUAADT/AADQOAAAdPwAAAAAAACUOQAAYQAAAHMBAABpAAAAZAAAAHQBAABmAAAAZwAAAE40ZWxlbTE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlNfN1NhZmVQb3dJZEVFRUUAADT/AABkOQAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TXzdTYWZlUG93SWRFRUVFRUUADP8AAKA5AAAAAAAAzDoAAFQAAAB1AQAAdgEAAHcBAAB4AQAAeQEAAHoBAAB7AQAAfAEAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROUzJfMkVxSWRFRUVFRUVOU185YWxsb2NhdG9ySVM5X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAADT/AAAkOgAA4A8AAAAAAABUOwAAfQEAAH4BAAB/AQAAUgAAAIABAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TMV8yRXFJZEVFRUVOU185YWxsb2NhdG9ySVM1X0VFRUUAAAA0/wAA9DoAAHT8AAAAAAAAsDsAAGEAAACBAQAAaQAAAGQAAACCAQAAZgAAAGcAAABONGVsZW0xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TXzJFcUlkRUVFRQAAADT/AACEOwAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TXzJFcUlkRUVFRUVFAAAM/wAAvDsAAAAAAADsPAAAVAAAAIMBAACEAQAAhQEAAIYBAACHAQAAiAEAAIkBAACKAQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TMl85QmluYXJ5QW5kSWRFRUVFRUVOU185YWxsb2NhdG9ySVM5X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAAAA0/wAAPDwAAOAPAAAAAAAAfD0AAIsBAACMAQAAjQEAAFIAAACOAQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROUzFfOUJpbmFyeUFuZElkRUVFRU5TXzlhbGxvY2F0b3JJUzVfRUVFRQAAAAA0/wAAFD0AAHT8AAAAAAAA4D0AAGEAAACPAQAAaQAAAGQAAACQAQAAZgAAAGcAAABONGVsZW0xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TXzlCaW5hcnlBbmRJZEVFRUUAAAAANP8AAKw9AADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlNfOUJpbmFyeUFuZElkRUVFRUVFAAAADP8AAOw9AAAAAAAAID8AAFQAAACRAQAAkgEAAJMBAACUAQAAlQEAAJYBAACXAQAAmAEAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROUzJfOEJpbmFyeU9ySWRFRUVFRUVOU185YWxsb2NhdG9ySVM5X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQA0/wAAdD4AAOAPAAAAAAAArD8AAJkBAACaAQAAmwEAAFIAAACcAQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROUzFfOEJpbmFyeU9ySWRFRUVFTlNfOWFsbG9jYXRvcklTNV9FRUVFADT/AABIPwAAdPwAAAAAAAAMQAAAYQAAAJ0BAABpAAAAZAAAAJ4BAABmAAAAZwAAAE40ZWxlbTE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlNfOEJpbmFyeU9ySWRFRUVFADT/AADcPwAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TXzhCaW5hcnlPcklkRUVFRUVFAAAAAAz/AAAYQAAAAAAAAEhBAABUAAAAnwEAAKABAAChAQAAogEAAKMBAACkAQAApQEAAKYBAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU180cGx1c0lkRUVFRUVFTlNfOWFsbG9jYXRvcklTOV9FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAA0/wAAoEAAAOAPAAAAAAAA0EEAAKcBAACoAQAAqQEAAFIAAACqAQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMThCaW5hcnlSZWR1Y2luZ05vZGVJZE5TXzRwbHVzSWRFRUVFTlNfOWFsbG9jYXRvcklTNV9FRUVFAAAANP8AAHBBAAB0/AAAAAAAADBCAABhAAAAqwEAAGkAAABkAAAArAEAAGYAAABnAAAATjRlbGVtMThCaW5hcnlSZWR1Y2luZ05vZGVJZE5TdDNfXzI0cGx1c0lkRUVFRQAANP8AAABCAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU3QzX18yNHBsdXNJZEVFRUVFRQAM/wAAPEIAAAAAAABoQwAAVAAAAK0BAACuAQAArwEAALABAACxAQAAsgEAALMBAAC0AQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOEJpbmFyeVJlZHVjaW5nTm9kZUlkTlNfNW1pbnVzSWRFRUVFRUVOU185YWxsb2NhdG9ySVM5X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAANP8AAMBCAADgDwAAAAAAAPBDAAC1AQAAtgEAALcBAABSAAAAuAEAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU181bWludXNJZEVFRUVOU185YWxsb2NhdG9ySVM1X0VFRUUAADT/AACQQwAAdPwAAAAAAABQRAAAYQAAALkBAABpAAAAZAAAALoBAABmAAAAZwAAAE40ZWxlbTE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU3QzX18yNW1pbnVzSWRFRUVFADT/AAAgRAAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOEJpbmFyeVJlZHVjaW5nTm9kZUlkTlN0M19fMjVtaW51c0lkRUVFRUVFAAAAAAz/AABcRAAAAAAAAJRFAABUAAAAuwEAALwBAAC9AQAAvgEAAL8BAADAAQAAwQEAAMIBAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU18xMG11bHRpcGxpZXNJZEVFRUVFRU5TXzlhbGxvY2F0b3JJUzlfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAAADT/AADkRAAA4A8AAAAAAAAkRgAAwwEAAMQBAADFAQAAUgAAAMYBAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOEJpbmFyeVJlZHVjaW5nTm9kZUlkTlNfMTBtdWx0aXBsaWVzSWRFRUVFTlNfOWFsbG9jYXRvcklTNV9FRUVFAAAAADT/AAC8RQAAdPwAAAAAAACMRgAAYQAAAMcBAABpAAAAZAAAAMgBAABmAAAAZwAAAE40ZWxlbTE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU3QzX18yMTBtdWx0aXBsaWVzSWRFRUVFAAAANP8AAFRGAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU3QzX18yMTBtdWx0aXBsaWVzSWRFRUVFRUUAAAz/AACYRgAAAAAAANRHAABUAAAAyQEAAMoBAADLAQAAzAEAAM0BAADOAQAAzwEAANABAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROUzJfMTFTYWZlRGl2aWRlc0lkRUVFRUVFTlNfOWFsbG9jYXRvcklTOV9FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAADT/AAAkRwAA4A8AAAAAAABkSAAA0QEAANIBAADTAQAAUgAAANQBAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOEJpbmFyeVJlZHVjaW5nTm9kZUlkTlMxXzExU2FmZURpdmlkZXNJZEVFRUVOU185YWxsb2NhdG9ySVM1X0VFRUUAADT/AAD8RwAAdPwAAAAAAADISAAAYQAAANUBAABpAAAAZAAAANYBAABmAAAAZwAAAE40ZWxlbTE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU18xMVNhZmVEaXZpZGVzSWRFRUVFAAA0/wAAlEgAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThCaW5hcnlSZWR1Y2luZ05vZGVJZE5TXzExU2FmZURpdmlkZXNJZEVFRUVFRQAM/wAA1EgAAAAAAAAISgAAVAAAANcBAADYAQAA2QEAANoBAADbAQAA3AEAAN0BAADeAQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOEJpbmFyeVJlZHVjaW5nTm9kZUlkTlMyXzdNb2R1bHVzSWRFRUVFRUVOU185YWxsb2NhdG9ySVM5X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAADT/AABcSQAA4A8AAAAAAACUSgAA3wEAAOABAADhAQAAUgAAAOIBAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOEJpbmFyeVJlZHVjaW5nTm9kZUlkTlMxXzdNb2R1bHVzSWRFRUVFTlNfOWFsbG9jYXRvcklTNV9FRUVFAAAANP8AADBKAAB0/AAAAAAAAPRKAABhAAAA4wEAAGkAAABkAAAA5AEAAGYAAABnAAAATjRlbGVtMThCaW5hcnlSZWR1Y2luZ05vZGVJZE5TXzdNb2R1bHVzSWRFRUVFAAAANP8AAMRKAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU183TW9kdWx1c0lkRUVFRUVFAAAM/wAAAEsAAAAAAAAsTAAAVAAAAOUBAADmAQAA5wEAAOgBAADpAQAA6gEAAOsBAADsAQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOEJpbmFyeVJlZHVjaW5nTm9kZUlkTlMyXzNNaW5JZEVFRUVFRU5TXzlhbGxvY2F0b3JJUzlfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAANP8AAIRLAADgDwAAAAAAALRMAADtAQAA7gEAAO8BAABSAAAA8AEAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE4QmluYXJ5UmVkdWNpbmdOb2RlSWROUzFfM01pbklkRUVFRU5TXzlhbGxvY2F0b3JJUzVfRUVFRQAAADT/AABUTAAAdPwAAAAAAAAQTQAAYQAAAPEBAABpAAAAZAAAAPIBAABmAAAAZwAAAE40ZWxlbTE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU18zTWluSWRFRUVFAAAANP8AAORMAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU18zTWluSWRFRUVFRUUAAAz/AAAcTQAAAAAAAEROAABUAAAA8wEAAPQBAAD1AQAA9gEAAPcBAAD4AQAA+QEAAPoBAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROUzJfM01heElkRUVFRUVFTlNfOWFsbG9jYXRvcklTOV9FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAA0/wAAnE0AAOAPAAAAAAAAzE4AAPsBAAD8AQAA/QEAAFIAAAD+AQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMThCaW5hcnlSZWR1Y2luZ05vZGVJZE5TMV8zTWF4SWRFRUVFTlNfOWFsbG9jYXRvcklTNV9FRUVFAAAANP8AAGxOAAB0/AAAAAAAAChPAABhAAAA/wEAAGkAAABkAAAAAAIAAGYAAABnAAAATjRlbGVtMThCaW5hcnlSZWR1Y2luZ05vZGVJZE5TXzNNYXhJZEVFRUUAAAA0/wAA/E4AAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThCaW5hcnlSZWR1Y2luZ05vZGVJZE5TXzNNYXhJZEVFRUVFRQAADP8AADRPAAAAAAAARFAAAFQAAAABAgAAAgIAAAMCAAAEAgAABQIAAAYCAAAHAgAACAIAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfOFJvb3ROb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAADT/AAC0TwAA4A8AAAAAAAC0UAAACQIAAAoCAAALAgAAUgAAAAwCAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW04Um9vdE5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAA0/wAAbFAAAHT8AAAAAAAA+FAAAGEAAAANAgAADgIAAGQAAAAPAgAAZgAAAGcAAABONGVsZW04Um9vdE5vZGVJZEVFADT/AADkUAAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU184Um9vdE5vZGVJZEVFRUUAAAAADP8AAARRAAAAAAAAAFIAAFQAAAAQAgAAEQIAABICAAATAgAAFAIAABUCAAAWAgAAFwIAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfOUNvbnN0Tm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFADT/AABwUQAA4A8AAAAAAABwUgAAGAIAABkCAAAaAgAAUgAAABsCAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW05Q29uc3ROb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQA0/wAAKFIAAHT8AAAAAAAAuFIAAGEAAAAcAgAAHQIAAGQAAAAeAgAAZgAAAGcAAABONGVsZW05Q29uc3ROb2RlSWRFRQAAAAA0/wAAoFIAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfOUNvbnN0Tm9kZUlkRUVFRQAAAAz/AADEUgAAAAAAAMhTAABUAAAAHwIAACACAAAhAgAAIgIAACMCAAAkAgAAJQIAACYCAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzEwUGhhc29yTm9kZUlkTGIwRUVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAADT/AAAwUwAA4A8AAAAAAABAVAAAJwIAACgCAAApAgAAUgAAACoCAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xMFBoYXNvck5vZGVJZExiMEVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAAADT/AADwUwAAdPwAAAAAAACMVAAAYQAAACsCAABpAAAAZAAAACwCAABmAAAAZwAAAE40ZWxlbTEwUGhhc29yTm9kZUlkTGIwRUVFAAA0/wAAcFQAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTBQaGFzb3JOb2RlSWRMYjBFRUVFRQAM/wAAmFQAAAAAAACgVQAAVAAAAC0CAAAuAgAALwIAADACAAAxAgAAMgIAADMCAAA0AgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xMFBoYXNvck5vZGVJZExiMUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAA0/wAACFUAAOAPAAAAAAAAGFYAADUCAAA2AgAANwIAAFIAAAA4AgAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTBQaGFzb3JOb2RlSWRMYjFFRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAA0/wAAyFUAAHT8AAAAAAAAZFYAAGEAAAA5AgAAaQAAAGQAAAA6AgAAZgAAAGcAAABONGVsZW0xMFBoYXNvck5vZGVJZExiMUVFRQAANP8AAEhWAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzEwUGhhc29yTm9kZUlkTGIxRUVFRUUADP8AAHBWAAAAAAAAeFcAAFQAAAA7AgAAPAIAAD0CAAA+AgAAPwIAAEACAABBAgAAQgIAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTRTYW1wbGVSYXRlTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAANP8AAOBWAADgDwAAAAAAAPBXAABDAgAARAIAAEUCAABSAAAARgIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE0U2FtcGxlUmF0ZU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAANP8AAKBXAAB0/AAAAAAAADxYAABhAAAARwIAAGkAAABkAAAASAIAAGYAAABnAAAATjRlbGVtMTRTYW1wbGVSYXRlTm9kZUlkRUUAADT/AAAgWAAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xNFNhbXBsZVJhdGVOb2RlSWRFRUVFAAz/AABIWAAAAAAAAExZAABUAAAASQIAAEoCAABLAgAATAIAAE0CAABOAgAATwIAAFACAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzEyU2VxdWVuY2VOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUANP8AALhYAADgDwAAAAAAAMBZAABRAgAAUgIAAFMCAABSAAAAVAIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTEyU2VxdWVuY2VOb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQA0/wAAdFkAAHT8AAAAAAAADFoAAFUCAABWAgAAVwIAAGQAAABYAgAAZgAAAGcAAABONGVsZW0xMlNlcXVlbmNlTm9kZUlkRUUAAAAANP8AAPBZAADAEAAAAAAAAIBaAABZAgAAWgIAAFsCAABSAAAAXAIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU5TXzZ2ZWN0b3JJZE5TXzlhbGxvY2F0b3JJZEVFRUVOUzJfSVM0X0VFRUUAAAA0/wAANFoAAHT8AABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTJTZXF1ZW5jZU5vZGVJZEVFRUUAAAAM/wAAjFoAAAAAAACMWwAAVAAAAF0CAABeAgAAXwIAAGACAABhAgAAYgIAAGMCAABkAgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl84U2VxMk5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAANP8AAPxaAADgDwAAAAAAAPxbAABlAgAAZgIAAGcCAABSAAAAaAIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbThTZXEyTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAADT/AAC0WwAAdPwAAAAAAABAXAAAaQIAAGoCAABrAgAAZAAAAGwCAABmAAAAZwAAAE40ZWxlbThTZXEyTm9kZUlkRUUANP8AACxcAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzhTZXEyTm9kZUlkRUVFRQAAAAAM/wAATFwAAAAAAABMXQAAVAAAAG0CAABuAgAAbwIAAHACAABxAgAAcgIAAHMCAAB0AgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xMVNwYXJTZXFOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAADT/AAC4XAAA4A8AAAAAAADAXQAAdQIAAHYCAAB3AgAAUgAAAHgCAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xMVNwYXJTZXFOb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAANP8AAHRdAAB0/AAAAAAAAAheAAB5AgAAegIAAHsCAABkAAAAfAIAAGYAAABnAAAATjRlbGVtMTFTcGFyU2VxTm9kZUlkRUUANP8AAPBdAADAEAAAAAAAAJReAAB9AgAAfgIAAH8CAABSAAAAgAIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU5TXzNtYXBJaWROU180bGVzc0lpRUVOU185YWxsb2NhdG9ySU5TXzRwYWlySUtpZEVFRUVFRU5TNF9JUzlfRUVFRQAAAAA0/wAAMF4AAHT8AABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTFTcGFyU2VxTm9kZUlkRUVFRQAAAAAM/wAAoF4AAAAAAACkXwAAVAAAAIECAACCAgAAgwIAAIQCAACFAgAAhgIAAIcCAACIAgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xMlNwYXJTZXEyTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFADT/AAAQXwAA4A8AAAAAAAAYYAAAiQIAAIoCAACLAgAAUgAAAIwCAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xMlNwYXJTZXEyTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUANP8AAMxfAAB0/AAAAAAAAGRgAACNAgAAjgIAAI8CAABkAAAAkAIAAGYAAABnAAAATjRlbGVtMTJTcGFyU2VxMk5vZGVJZEVFAAAAADT/AABIYAAAwBAAAAAAAADwYAAAkQIAAJICAACTAgAAUgAAAJQCAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlOU18zbWFwSWRkTlNfNGxlc3NJZEVFTlNfOWFsbG9jYXRvcklOU180cGFpcklLZGRFRUVFRUVOUzRfSVM5X0VFRUUAAAAANP8AAIxgAAB0/AAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzEyU3BhclNlcTJOb2RlSWRFRUVFAAAADP8AAPxgAAAAAAAAAGIAAFQAAACVAgAAlgIAAJcCAACYAgAAmQIAAJoCAACbAgAAnAIAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTFDb3VudGVyTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAA0/wAAbGEAAOAPAAAAAAAAdGIAAJ0CAACeAgAAnwIAAFIAAACgAgAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTFDb3VudGVyTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAADT/AAAoYgAAdPwAAAAAAAC8YgAAYQAAAKECAABpAAAAZAAAAKICAABmAAAAZwAAAE40ZWxlbTExQ291bnRlck5vZGVJZEVFADT/AACkYgAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xMUNvdW50ZXJOb2RlSWRFRUVFAAAAAAz/AADIYgAAAAAAAMhjAABUAAAAowIAAKQCAAClAgAApgIAAKcCAACoAgAAqQIAAKoCAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzlBY2N1bU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQA0/wAAOGMAAOAPAAAAAAAAOGQAAKsCAACsAgAArQIAAFIAAACuAgAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtOUFjY3VtTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUANP8AAPBjAAB0/AAAAAAAAIBkAABhAAAArwIAAGkAAABkAAAAsAIAAGYAAABnAAAATjRlbGVtOUFjY3VtTm9kZUlkRUUAAAAANP8AAGhkAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzlBY2N1bU5vZGVJZEVFRUUAAAAM/wAAjGQAAAAAAACIZQAAVAAAALECAACyAgAAswIAALQCAAC1AgAAtgIAALcCAAC4AgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl85TGF0Y2hOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUANP8AAPhkAADgDwAAAAAAAPhlAAC5AgAAugIAALsCAABSAAAAvAIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTlMYXRjaE5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFADT/AACwZQAAdPwAAAAAAABAZgAAYQAAAL0CAABpAAAAZAAAAL4CAABmAAAAZwAAAE40ZWxlbTlMYXRjaE5vZGVJZEVFAAAAADT/AAAoZgAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU185TGF0Y2hOb2RlSWRFRUVFAAAADP8AAExmAAAAAAAASGcAAFQAAAC/AgAAwAIAAMECAADCAgAAwwIAAMQCAADFAgAAxgIAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfN01heEhvbGRJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAADT/AAC4ZgAA4A8AAAAAAAC4ZwAAxwIAAMgCAADJAgAAUgAAAMoCAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW03TWF4SG9sZElkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAA0/wAAcGcAAHT8AAAAAAAA/GcAAGEAAADLAgAAzAIAAGQAAADNAgAAZgAAAGcAAABONGVsZW03TWF4SG9sZElkRUUAADT/AADoZwAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU183TWF4SG9sZElkRUVFRQAM/wAACGgAAAAAAAAAaQAAVAAAAM4CAADPAgAA0AIAANECAADSAgAA0wIAANQCAADVAgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl84T25jZU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAANP8AAHBoAADgDwAAAAAAAHBpAADWAgAA1wIAANgCAABSAAAA2QIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbThPbmNlTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAADT/AAAoaQAAdPwAAAAAAAC0aQAAYQAAANoCAADbAgAAZAAAANwCAABmAAAAZwAAAE40ZWxlbThPbmNlTm9kZUlkRUUANP8AAKBpAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzhPbmNlTm9kZUlkRUVFRQAAAAAM/wAAwGkAAAAAAADMagAAVAAAAN0CAADeAgAA3wIAAOACAADhAgAA4gIAAOMCAADkAgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8yMlVuaWZvcm1SYW5kb21Ob2lzZU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAADT/AAAsagAA4A8AAAAAAABMawAA5QIAAOYCAADnAgAAUgAAAOgCAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0yMlVuaWZvcm1SYW5kb21Ob2lzZU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAANP8AAPRqAAB0/AAAAAAAAKBrAABhAAAA6QIAAOoCAABkAAAA6wIAAGYAAABnAAAATjRlbGVtMjJVbmlmb3JtUmFuZG9tTm9pc2VOb2RlSWRFRQAANP8AAHxrAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzIyVW5pZm9ybVJhbmRvbU5vaXNlTm9kZUlkRUVFRQAM/wAArGsAAAAAAADAbAAAVAAAAOwCAADtAgAA7gIAAO8CAADwAgAA8QIAAPICAADzAgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xN1ZhcmlhYmxlRGVsYXlOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAAANP8AACRsAADgDwAAAAAAADxtAAD0AgAA9QIAAPYCAABSAAAA9wIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE3VmFyaWFibGVEZWxheU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAAADT/AADobAAAdPwAAAAAAACMbQAA+AIAAPkCAAD6AgAAZAAAAPsCAABmAAAAZwAAAE40ZWxlbTE3VmFyaWFibGVEZWxheU5vZGVJZEVFAAAANP8AAGxtAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE3VmFyaWFibGVEZWxheU5vZGVJZEVFRUUAAAz/AACYbQAAAAAAAKRuAABUAAAA/AIAAP0CAAD+AgAA/wIAAAADAAABAwAAAgMAAAMDAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE1U2FtcGxlRGVsYXlOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAADT/AAAMbgAA4A8AAAAAAAAcbwAABAMAAAUDAAAGAwAAUgAAAAcDAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xNVNhbXBsZURlbGF5Tm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAADT/AADMbgAAdPwAAAAAAABobwAACAMAAAkDAAAKAwAAZAAAAAsDAABmAAAAZwAAAE40ZWxlbTE1U2FtcGxlRGVsYXlOb2RlSWRFRQA0/wAATG8AAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTVTYW1wbGVEZWxheU5vZGVJZEVFRUUAAAAADP8AAHRvAAAAAAAAiHAAAFQAAAAMAwAADQMAAA4DAAAPAwAAEAMAABEDAAASAwAAEwMAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMjFTaW5nbGVTYW1wbGVEZWxheU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAAAA0/wAA6G8AAOAPAAAAAAAACHEAABQDAAAVAwAAFgMAAFIAAAAXAwAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMjFTaW5nbGVTYW1wbGVEZWxheU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAAADT/AACwcAAAdPwAAAAAAABccQAAYQAAABgDAABpAAAAZAAAABkDAABmAAAAZwAAAE40ZWxlbTIxU2luZ2xlU2FtcGxlRGVsYXlOb2RlSWRFRQAAADT/AAA4cQAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18yMVNpbmdsZVNhbXBsZURlbGF5Tm9kZUlkRUVFRQAADP8AAGhxAAAAAAAAdHIAAFQAAAAaAwAAGwMAABwDAAAdAwAAHgMAAB8DAAAgAwAAIQMAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTFPbmVQb2xlTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAA0/wAA4HEAAOAPAAAAAAAA6HIAACIDAAAjAwAAJAMAAFIAAAAlAwAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTFPbmVQb2xlTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAADT/AACccgAAdPwAAAAAAAAwcwAAYQAAACYDAABpAAAAZAAAACcDAABmAAAAZwAAAE40ZWxlbTExT25lUG9sZU5vZGVJZEVFADT/AAAYcwAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xMU9uZVBvbGVOb2RlSWRFRUVFAAAAAAz/AAA8cwAAAAAAAEB0AABUAAAAKAMAACkDAAAqAwAAKwMAACwDAAAtAwAALgMAAC8DAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzEyRW52ZWxvcGVOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUANP8AAKxzAADgDwAAAAAAALR0AAAwAwAAMQMAADIDAABSAAAAMwMAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTEyRW52ZWxvcGVOb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQA0/wAAaHQAAHT8AAAAAAAAAHUAAGEAAAA0AwAAaQAAAGQAAAA1AwAAZgAAAGcAAABONGVsZW0xMkVudmVsb3BlTm9kZUlkRUUAAAAANP8AAOR0AADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzEyRW52ZWxvcGVOb2RlSWRFRUVFAAAADP8AAAx1AAAAAAAAFHYAAFQAAAA2AwAANwMAADgDAAA5AwAAOgMAADsDAAA8AwAAPQMAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTZCaXF1YWRGaWx0ZXJOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUANP8AAHx1AADgDwAAAAAAAIx2AAA+AwAAPwMAAEADAABSAAAAQQMAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE2QmlxdWFkRmlsdGVyTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUANP8AADx2AAB0/AAAAAAAANx2AABhAAAAQgMAAGkAAABkAAAAQwMAAGYAAABnAAAATjRlbGVtMTZCaXF1YWRGaWx0ZXJOb2RlSWRFRQAAAAA0/wAAvHYAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTZCaXF1YWRGaWx0ZXJOb2RlSWRFRUVFAAAADP8AAOh2AAAAAAAA+HcAAFQAAABEAwAARQMAAEYDAABHAwAASAMAAEkDAABKAwAASwMAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTdDdXRvZmZQcmV3YXJwTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAAADT/AABcdwAA4A8AAAAAAAB0eAAATAMAAE0DAABOAwAAUgAAAE8DAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xN0N1dG9mZlByZXdhcnBOb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAAAAA0/wAAIHgAAHT8AAAAAAAAxHgAAGEAAABQAwAAaQAAAGQAAABRAwAAZgAAAGcAAABONGVsZW0xN0N1dG9mZlByZXdhcnBOb2RlSWRFRQAAADT/AACkeAAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xN0N1dG9mZlByZXdhcnBOb2RlSWRFRUVFAAAM/wAA0HgAAAAAAADYeQAAVAAAAFIDAABTAwAAVAMAAFUDAABWAwAAVwMAAFgDAABZAwAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xMU11bHRpTW9kZTFwSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAADT/AABEeQAA4A8AAAAAAABMegAAWgMAAFsDAABcAwAAUgAAAF0DAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xMU11bHRpTW9kZTFwSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAANP8AAAB6AAB0/AAAAAAAAJR6AABhAAAAXgMAAF8DAABkAAAAYAMAAGYAAABnAAAATjRlbGVtMTFNdWx0aU1vZGUxcElkRUUANP8AAHx6AADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzExTXVsdGlNb2RlMXBJZEVFRUUAAAAADP8AAKB6AAAAAAAAsHsAAFQAAABhAwAAYgMAAGMDAABkAwAAZQMAAGYDAABnAwAAaAMAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMjNTdGF0ZVZhcmlhYmxlRmlsdGVyTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAA0/wAAEHsAAOAPAAAAAAAAMHwAAGkDAABqAwAAawMAAFIAAABsAwAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMjNTdGF0ZVZhcmlhYmxlRmlsdGVyTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAADT/AADYewAAdPwAAAAAAACEfAAAYQAAAG0DAABuAwAAZAAAAG8DAABmAAAAZwAAAE40ZWxlbTIzU3RhdGVWYXJpYWJsZUZpbHRlck5vZGVJZEVFADT/AABgfAAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18yM1N0YXRlVmFyaWFibGVGaWx0ZXJOb2RlSWRFRUVFAAAAAAz/AACQfAAAAAAAALB9AABUAAAAcAMAAHEDAAByAwAAcwMAAHQDAAB1AwAAdgMAAHcDAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzI4U3RhdGVWYXJpYWJsZVNoZWxmRmlsdGVyTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFADT/AAAMfQAA4A8AAAAAAAA0fgAAeAMAAHkDAAB6AwAAUgAAAHsDAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0yOFN0YXRlVmFyaWFibGVTaGVsZkZpbHRlck5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFADT/AADYfQAAdPwAAAAAAACQfgAAYQAAAHwDAAB9AwAAZAAAAH4DAABmAAAAZwAAAE40ZWxlbTI4U3RhdGVWYXJpYWJsZVNoZWxmRmlsdGVyTm9kZUlkRUUAAAAANP8AAGR+AADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzI4U3RhdGVWYXJpYWJsZVNoZWxmRmlsdGVyTm9kZUlkRUVFRQAAAAz/AACcfgAAAAAAAKx/AABUAAAAfwMAAIADAACBAwAAggMAAIMDAACEAwAAhQMAAIYDAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzlUYXBJbk5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQA0/wAAHH8AAOAPAAAAAAAAHIAAAIcDAACIAwAAiQMAAFIAAACKAwAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtOVRhcEluTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUANP8AANR/AAB0/AAAAAAAAGSAAACLAwAAjAMAAGkAAACNAwAAjgMAAGYAAABnAAAATjRlbGVtOVRhcEluTm9kZUlkRUUAAAAANP8AAEyAAADAEAAAAAAAANCBAACPAwAAkAMAAJEDAACSAwAAkwMAAJQDAACVAwAAlgMAAJcDAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0laTjRlbGVtOVRhcEluTm9kZUlkRTExc2V0UHJvcGVydHlFUktOU18xMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFUktOUzJfMmpzNVZhbHVlRVJOUzJfMTdTaGFyZWRSZXNvdXJjZU1hcEVFVWx2RV9OUzhfSVNKX0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfMTRTaGFyZWRSZXNvdXJjZUVFRXZFRUUATlN0M19fMjEwX19mdW5jdGlvbjZfX2Jhc2VJRk5TXzEwc2hhcmVkX3B0cklONGVsZW0xNFNoYXJlZFJlc291cmNlRUVFdkVFRQAAAAAM/wAAe4EAADT/AACcgAAAyIEAAAAAAABIggAAmAMAAJkDAACaAwAAUgAAAJsDAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOUF1ZGlvQnVmZmVyUmVzb3VyY2VFTlNfOWFsbG9jYXRvcklTMl9FRUVFADT/AAD4gQAAdPwAAAAAAACwggAAnAMAAJ0DAACeAwAAnwMAAKADAABONGVsZW0xOUF1ZGlvQnVmZmVyUmVzb3VyY2VFAE40ZWxlbTE0U2hhcmVkUmVzb3VyY2VFAAAAAAz/AACNggAANP8AAHCCAACoggAAWk40ZWxlbTlUYXBJbk5vZGVJZEUxMXNldFByb3BlcnR5RVJLTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOUzJfMTFjaGFyX3RyYWl0c0ljRUVOUzJfOWFsbG9jYXRvckljRUVFRVJLTlNfMmpzNVZhbHVlRVJOU18xN1NoYXJlZFJlc291cmNlTWFwRUVVbHZFXwAAAAz/AAC8ggAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzlUYXBJbk5vZGVJZEVFRUUAAAAM/wAAWIMAAAAAAABYhAAAVAAAAKEDAACiAwAAowMAAKQDAAClAwAApgMAAKcDAACoAwAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xMFRhcE91dE5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAADT/AADEgwAA4A8AAAAAAADMhAAAqQMAAKoDAACrAwAAUgAAAKwDAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xMFRhcE91dE5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAANP8AAICEAAB0/AAAAAAAABSFAACtAwAArgMAAGkAAACvAwAAsAMAAGYAAABnAAAATjRlbGVtMTBUYXBPdXROb2RlSWRFRQAANP8AAPyEAADAEAAAAAAAADCGAACPAwAAsQMAALIDAACzAwAAtAMAALUDAAC2AwAAtwMAALgDAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0laTjRlbGVtMTBUYXBPdXROb2RlSWRFMTFzZXRQcm9wZXJ0eUVSS05TXzEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVSS05TMl8yanM1VmFsdWVFUk5TMl8xN1NoYXJlZFJlc291cmNlTWFwRUVVbHZFX05TOF9JU0pfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl8xNFNoYXJlZFJlc291cmNlRUVFdkVFRQAAAAA0/wAATIUAAMiBAABaTjRlbGVtMTBUYXBPdXROb2RlSWRFMTFzZXRQcm9wZXJ0eUVSS05TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlMyXzExY2hhcl90cmFpdHNJY0VFTlMyXzlhbGxvY2F0b3JJY0VFRUVSS05TXzJqczVWYWx1ZUVSTlNfMTdTaGFyZWRSZXNvdXJjZU1hcEVFVWx2RV8ADP8AADyGAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTBUYXBPdXROb2RlSWRFRUVFAAz/AADYhgAAAAAAAPiHAABUAAAAuQMAALoDAAC7AwAAvAMAAL0DAAC+AwAAvwMAAMADAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzEwU2FtcGxlTm9kZUlkTlMyXzIzVmFyaWFibGVQaXRjaExlcnBSZWFkZXJJZkVFRUVFRU5TXzlhbGxvY2F0b3JJUzlfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAA0/wAARIcAAOAPAAAAAAAAjIgAAMEDAADCAwAAwwMAAFIAAADEAwAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTBTYW1wbGVOb2RlSWROUzFfMjNWYXJpYWJsZVBpdGNoTGVycFJlYWRlcklmRUVFRU5TXzlhbGxvY2F0b3JJUzVfRUVFRQAANP8AACCIAAB0/AAAAAAAAPSIAADFAwAAxgMAAGkAAADHAwAAyAMAAGYAAADJAwAATjRlbGVtMTBTYW1wbGVOb2RlSWROU18yM1ZhcmlhYmxlUGl0Y2hMZXJwUmVhZGVySWZFRUVFAAA0/wAAvIgAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTBTYW1wbGVOb2RlSWROU18yM1ZhcmlhYmxlUGl0Y2hMZXJwUmVhZGVySWZFRUVFRUUADP8AAACJAAAAAAAAKIoAAFQAAADKAwAAywMAAMwDAADNAwAAzgMAAM8DAADQAwAA0QMAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTNTYW1wbGVTZXFOb2RlSWRMYjBFRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAAADT/AACMiQAA4A8AAAAAAACkigAA0gMAANMDAADUAwAAUgAAANUDAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xM1NhbXBsZVNlcU5vZGVJZExiMEVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAAAAA0/wAAUIoAAHT8AAAAAAAA9IoAANYDAADXAwAAaQAAANgDAADZAwAAZgAAAGcAAABONGVsZW0xM1NhbXBsZVNlcU5vZGVJZExiMEVFRQAAADT/AADUigAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xM1NhbXBsZVNlcU5vZGVJZExiMEVFRUVFAAAM/wAAAIsAAAAAAAAQjAAAVAAAANoDAADbAwAA3AMAAN0DAADeAwAA3wMAAOADAADhAwAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xM1NhbXBsZVNlcU5vZGVJZExiMUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAAANP8AAHSLAADgDwAAAAAAAIyMAADiAwAA4wMAAOQDAABSAAAA5QMAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTEzU2FtcGxlU2VxTm9kZUlkTGIxRUVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAAADT/AAA4jAAAdPwAAAAAAADcjAAA5gMAAOcDAABpAAAA6AMAAOkDAABmAAAAZwAAAE40ZWxlbTEzU2FtcGxlU2VxTm9kZUlkTGIxRUVFAAAANP8AALyMAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzEzU2FtcGxlU2VxTm9kZUlkTGIxRUVFRUUAAAz/AADojAAAAAAAAOyNAABUAAAA6gMAAOsDAADsAwAA7QMAAO4DAADvAwAA8AMAAPEDAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzlUYWJsZU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQA0/wAAXI0AAOAPAAAAAAAAXI4AAPIDAADzAwAA9AMAAFIAAAD1AwAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtOVRhYmxlTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUANP8AABSOAAB0/AAAAAAAAKSOAAD2AwAA9wMAAGkAAAD4AwAA+QMAAGYAAABnAAAATjRlbGVtOVRhYmxlTm9kZUlkRUUAAAAANP8AAIyOAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzlUYWJsZU5vZGVJZEVFRUUAAAAM/wAAsI4AAAAAAAC0jwAAVAAAAPoDAAD7AwAA/AMAAP0DAAD+AwAA/wMAAAAEAAABBAAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xM01DQ2FwdHVyZU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAAAA0/wAAHI8AAOAPAAAAAAAALJAAAAIEAAADBAAABAQAAFIAAAAFBAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTNNQ0NhcHR1cmVOb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAAAAA0/wAA3I8AAHT8AAAAAAAAeJAAAAYEAAAHBAAACAQAAGQAAAAJBAAACgQAAGcAAABONGVsZW0xM01DQ2FwdHVyZU5vZGVJZEVFAAAANP8AAFyQAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzEzTUNDYXB0dXJlTm9kZUlkRUVFRQAADP8AAISQAAAAAAAAiJEAAFQAAAALBAAADAQAAA0EAAAOBAAADwQAABAEAAARBAAAEgQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTJNQ1NhbXBsZU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQA0/wAA9JAAAOAPAAAAAAAA/JEAABMEAAAUBAAAFQQAAFIAAAAWBAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTJNQ1NhbXBsZU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFADT/AACwkQAAdPwAAAAAAABIkgAAFwQAABgEAABpAAAAGQQAABoEAABmAAAAGwQAAE40ZWxlbTEyTUNTYW1wbGVOb2RlSWRFRQAAAAA0/wAALJIAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTJNQ1NhbXBsZU5vZGVJZEVFRUUAAAAM/wAAVJIAAAAAAABkkwAAVAAAABwEAAAdBAAAHgQAAB8EAAAgBAAAIQQAACIEAAAjBAAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOVN0ZXJlb1NhbXBsZVNlcU5vZGVJZExiMEVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAADT/AADEkgAA4A8AAAAAAADkkwAAJAQAACUEAAAmBAAAUgAAACcEAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOVN0ZXJlb1NhbXBsZVNlcU5vZGVJZExiMEVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAANP8AAIyTAAB0/AAAAAAAADiUAAAoBAAAKQQAAGkAAAAqBAAAKwQAAGYAAABnAAAATjRlbGVtMTlTdGVyZW9TYW1wbGVTZXFOb2RlSWRMYjBFRUUANP8AABSUAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE5U3RlcmVvU2FtcGxlU2VxTm9kZUlkTGIwRUVFRUUAAAAADP8AAESUAAAAAAAAYJUAAFQAAAAsBAAALQQAAC4EAAAvBAAAMAQAADEEAAAyBAAAMwQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTlTdGVyZW9TYW1wbGVTZXFOb2RlSWRMYjFFRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAA0/wAAwJQAAOAPAAAAAAAA4JUAADQEAAA1BAAANgQAAFIAAAA3BAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTlTdGVyZW9TYW1wbGVTZXFOb2RlSWRMYjFFRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAADT/AACIlQAAdPwAAAAAAAA0lgAAOAQAADkEAABpAAAAOgQAADsEAABmAAAAZwAAAE40ZWxlbTE5U3RlcmVvU2FtcGxlU2VxTm9kZUlkTGIxRUVFADT/AAAQlgAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOVN0ZXJlb1NhbXBsZVNlcU5vZGVJZExiMUVFRUVFAAAAAAz/AABAlgAAAAAAAFSXAABUAAAAPAQAAD0EAAA+BAAAPwQAAEAEAABBBAAAQgQAAEMEAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE1U3RlcmVvVGFibGVOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAADT/AAC8lgAA4A8AAAAAAADMlwAARAQAAEUEAABGBAAAUgAAAEcEAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xNVN0ZXJlb1RhYmxlTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAADT/AAB8lwAAdPwAAAAAAAAYmAAASAQAAEkEAABpAAAASgQAAEsEAABmAAAAZwAAAE40ZWxlbTE1U3RlcmVvVGFibGVOb2RlSWRFRQA0/wAA/JcAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTVTdGVyZW9UYWJsZU5vZGVJZEVFRUUAAAAADP8AACSYAAAAAAAASJkAAFQAAABMBAAATQQAAE4EAABPBAAAUAQAAFEEAABSBAAAUwQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMjJQb2x5QmxlcE9zY2lsbGF0b3JOb2RlSWRMTlMzXzhCbGVwTW9kZUUwRUVFRUVOU185YWxsb2NhdG9ySVM4X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAANP8AAJiYAADgDwAAAAAAAOCZAABUBAAAVQQAAFYEAABSAAAAVwQAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTIyUG9seUJsZXBPc2NpbGxhdG9yTm9kZUlkTE5TMV82ZGV0YWlsOEJsZXBNb2RlRTBFRUVOU185YWxsb2NhdG9ySVM1X0VFRUUAAAA0/wAAcJkAAHT8AAAAAAAATJoAAGEAAABYBAAAaQAAAGQAAABZBAAAZgAAAGcAAABONGVsZW0yMlBvbHlCbGVwT3NjaWxsYXRvck5vZGVJZExOU182ZGV0YWlsOEJsZXBNb2RlRTBFRUUAAAA0/wAAEJoAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMjJQb2x5QmxlcE9zY2lsbGF0b3JOb2RlSWRMTlMwXzhCbGVwTW9kZUUwRUVFRUUAAAAADP8AAFiaAAAAAAAAlJsAAFQAAABaBAAAWwQAAFwEAABdBAAAXgQAAF8EAABgBAAAYQQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMjJQb2x5QmxlcE9zY2lsbGF0b3JOb2RlSWRMTlMzXzhCbGVwTW9kZUUxRUVFRUVOU185YWxsb2NhdG9ySVM4X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAANP8AAOSaAADgDwAAAAAAACycAABiBAAAYwQAAGQEAABSAAAAZQQAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTIyUG9seUJsZXBPc2NpbGxhdG9yTm9kZUlkTE5TMV82ZGV0YWlsOEJsZXBNb2RlRTFFRUVOU185YWxsb2NhdG9ySVM1X0VFRUUAAAA0/wAAvJsAAHT8AAAAAAAAmJwAAGEAAABmBAAAaQAAAGQAAABnBAAAZgAAAGcAAABONGVsZW0yMlBvbHlCbGVwT3NjaWxsYXRvck5vZGVJZExOU182ZGV0YWlsOEJsZXBNb2RlRTFFRUUAAAA0/wAAXJwAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMjJQb2x5QmxlcE9zY2lsbGF0b3JOb2RlSWRMTlMwXzhCbGVwTW9kZUUxRUVFRUUAAAAADP8AAKScAAAAAAAA4J0AAFQAAABoBAAAaQQAAGoEAABrBAAAbAQAAG0EAABuBAAAbwQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMjJQb2x5QmxlcE9zY2lsbGF0b3JOb2RlSWRMTlMzXzhCbGVwTW9kZUUyRUVFRUVOU185YWxsb2NhdG9ySVM4X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAANP8AADCdAADgDwAAAAAAAHieAABwBAAAcQQAAHIEAABSAAAAcwQAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTIyUG9seUJsZXBPc2NpbGxhdG9yTm9kZUlkTE5TMV82ZGV0YWlsOEJsZXBNb2RlRTJFRUVOU185YWxsb2NhdG9ySVM1X0VFRUUAAAA0/wAACJ4AAHT8AAAAAAAA5J4AAGEAAAB0BAAAaQAAAGQAAAB1BAAAZgAAAGcAAABONGVsZW0yMlBvbHlCbGVwT3NjaWxsYXRvck5vZGVJZExOU182ZGV0YWlsOEJsZXBNb2RlRTJFRUUAAAA0/wAAqJ4AAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMjJQb2x5QmxlcE9zY2lsbGF0b3JOb2RlSWRMTlMwXzhCbGVwTW9kZUUyRUVFRUUAAAAADP8AAPCeAAAAAAAADKAAAFQAAAB2BAAAdwQAAHgEAAB5BAAAegQAAHsEAAB8BAAAfQQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfOU1ldGVyTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFADT/AAB8nwAA4A8AAAAAAAB8oAAAfgQAAH8EAACABAAAUgAAAIEEAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW05TWV0ZXJOb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQA0/wAANKAAAHT8AAAAAAAAxKAAAIIEAACDBAAAaQAAAGQAAACEBAAAhQQAAGcAAABONGVsZW05TWV0ZXJOb2RlSWRFRQAAAAA0/wAArKAAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfOU1ldGVyTm9kZUlkRUVFRQAAAAz/AADQoAAAAAAAAMyhAABUAAAAhgQAAIcEAACIBAAAiQQAAIoEAACLBAAAjAQAAI0EAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzlTY29wZU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQA0/wAAPKEAAOAPAAAAAAAAPKIAAI4EAACPBAAAkAQAAFIAAACRBAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtOVNjb3BlTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUANP8AAPShAAB0/AAAAAAAAISiAACSBAAAkwQAAJQEAABkAAAAlQQAAJYEAABnAAAATjRlbGVtOVNjb3BlTm9kZUlkRUUAAAAANP8AAGyiAADAEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzlTY29wZU5vZGVJZEVFRUUAAAAM/wAAkKIAAAAAAACQowAAVAAAAJcEAACYBAAAmQQAAJoEAACbBAAAnAQAAJ0EAACeBAAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xMlNuYXBzaG90Tm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFADT/AAD8ogAA4A8AAAAAAAAEpAAAnwQAAKAEAAChBAAAUgAAAKIEAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xMlNuYXBzaG90Tm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUANP8AALijAAB0/AAAAAAAAFCkAACjBAAApAQAAGkAAABkAAAApQQAAKYEAABnAAAATjRlbGVtMTJTbmFwc2hvdE5vZGVJZEVFAAAAADT/AAA0pAAAwBAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xMlNuYXBzaG90Tm9kZUlkRUVFRQAAAAz/AABcpAAAAAAAAGClAABUAAAApwQAAKgEAACpBAAAqgQAAKsEAACsBAAArQQAAK4EAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzExQ2FwdHVyZU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAANP8AAMykAADgDwAAAAAAANSlAACvBAAAsAQAALEEAABSAAAAsgQAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTExQ2FwdHVyZU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAA0/wAAiKUAAHT8AAAAAAAAHKYAALMEAAC0BAAAaQAAAGQAAAC1BAAAtgQAAGcAAABONGVsZW0xMUNhcHR1cmVOb2RlSWRFRQA0/wAABKYAAMAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTFDYXB0dXJlTm9kZUlkRUVFRQAAAAAM/wAAKKYAAAAAAAAkpwAAVAAAALcEAAC4BAAAuQQAALoEAAC7BAAAvAQAAL0EAAC+BAAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk4yNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcjdwcmVwYXJlRWRqRVVsaWRpRV9OU185YWxsb2NhdG9ySVMzX0VFRk5TXzEwc2hhcmVkX3B0cklONGVsZW05R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAA0/wAAmKYAAOAPAAAAAAAAnKcAAL8EAADABAAAwQQAAFIAAADCBAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTVDb252b2x1dGlvbk5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAA0/wAATKcAAHT8AAAAAAAA6KcAAMMEAADEBAAAaQAAAMUEAADGBAAAZgAAAGcAAABONGVsZW0xNUNvbnZvbHV0aW9uTm9kZUlkRUUANP8AAMynAADAEAAAAAAAAGyoAADHBAAAyAQAAMkEAABSAAAAygQAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU4xMmZmdGNvbnZvbHZlcjIwVHdvU3RhZ2VGRlRDb252b2x2ZXJFTlNfOWFsbG9jYXRvcklTMl9FRUVFAAAANP8AABCoAAB0/AAAWk4yNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcjdwcmVwYXJlRWRqRVVsaWRpRV8ADP8AAHioAAAAAAAAaKkAAFQAAADLBAAAzAQAAM0EAADOBAAAzwQAANAEAADRBAAA0gQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSVpOMjRFbGVtZW50YXJ5QXVkaW9Qcm9jZXNzb3I3cHJlcGFyZUVkakVVbGlkaUUwX05TXzlhbGxvY2F0b3JJUzNfRUVGTlNfMTBzaGFyZWRfcHRySU40ZWxlbTlHcmFwaE5vZGVJZEVFRUVpZGlFRUUANP8AANyoAADgDwAAAAAAANipAADTBAAA1AQAANUEAABSAAAA1gQAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTdGRlROb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAAADT/AACQqQAAdPwAAAAAAAAcqgAA1wQAANgEAADZBAAAZAAAANoEAADbBAAAZwAAAE40ZWxlbTdGRlROb2RlSWRFRQAANP8AAAiqAADAEAAAWk4yNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcjdwcmVwYXJlRWRqRVVsaWRpRTBfAAAAAAz/AAAoqgAAAAAAAByrAABUAAAA3AQAAN0EAADeBAAA3wQAAOAEAADhBAAA4gQAAOMEAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0laTjI0RWxlbWVudGFyeUF1ZGlvUHJvY2Vzc29yN3ByZXBhcmVFZGpFVWxpZGlFMV9OU185YWxsb2NhdG9ySVMzX0VFRk5TXzEwc2hhcmVkX3B0cklONGVsZW05R3JhcGhOb2RlSWRFRUVFaWRpRUVFADT/AACQqgAA4A8AAAAAAACUqwAA5AQAAOUEAADmBAAAUgAAAOcEAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xM01ldHJvbm9tZU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAAADT/AABEqwAAdPwAAAAAAADgqwAAYQAAAOgEAADpBAAAZAAAAOoEAADrBAAAZwAAAE40ZWxlbTEzTWV0cm9ub21lTm9kZUlkRUUAAAA0/wAAxKsAAMAQAABaTjI0RWxlbWVudGFyeUF1ZGlvUHJvY2Vzc29yN3ByZXBhcmVFZGpFVWxpZGlFMV8AAAAADP8AAOyrAAAAAAAA4KwAAFQAAADsBAAA7QQAAO4EAADvBAAA8AQAAPEEAADyBAAA8wQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSVpOMjRFbGVtZW50YXJ5QXVkaW9Qcm9jZXNzb3I3cHJlcGFyZUVkakVVbGlkaUUyX05TXzlhbGxvY2F0b3JJUzNfRUVGTlNfMTBzaGFyZWRfcHRySU40ZWxlbTlHcmFwaE5vZGVJZEVFRUVpZGlFRUUANP8AAFSsAADgDwAAAAAAAFitAAD0BAAA9QQAAPYEAABSAAAA9wQAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE0U2FtcGxlVGltZU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAANP8AAAitAAB0/AAAAAAAAKStAABhAAAA+AQAAGkAAABkAAAA+QQAAGYAAABnAAAATjRlbGVtMTRTYW1wbGVUaW1lTm9kZUlkRUUAADT/AACIrQAAwBAAAFpOMjRFbGVtZW50YXJ5QXVkaW9Qcm9jZXNzb3I3cHJlcGFyZUVkakVVbGlkaUUyXwAAAAAM/wAAsK0AAAAAAACkrgAAVAAAAPoEAAD7BAAA/AQAAP0EAAD+BAAA/wQAAAAFAAABBQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk4yNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcjdwcmVwYXJlRWRqRVVsaWRpRTNfTlNfOWFsbG9jYXRvcklTM19FRUZOU18xMHNoYXJlZF9wdHJJTjRlbGVtOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQA0/wAAGK4AAOAPAAAAAAAAFK8AAAIFAAADBQAABAUAAFIAAAAFBQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtOVR4U2VxTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUANP8AAMyuAAB0/AAAAAAAAFyvAAAGBQAABwUAAAgFAAAJBQAACgUAAAsFAABnAAAATjRlbGVtOVR4U2VxTm9kZUlkRUUAAAAANP8AAESvAADAEAAAWk4yNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcjdwcmVwYXJlRWRqRVVsaWRpRTNfAAAAAAz/AABorwAAxK8AANgNAACo/gAATjEwZW1zY3JpcHRlbjN2YWxFAAAM/wAAsK8AAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWRFRQAADP8AAMyvAADErwAA2A0AAMSvAABOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRQAADP8AAACwAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lmRUUAAAz/AABIsAAASP4AAMSvAADErwAAxK8AAMSvAADErwAAAAAAANyxAAAMBQAADQUAAA4FAAAPBQAAEAUAABEFAAASBQAAEwUAABQFAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0laTjRlbGVtMThSb290UmVuZGVyU2VxdWVuY2VJZEU0cHVzaEVSTlMyXzE1QnVmZmVyQWxsb2NhdG9ySWRFRVJOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVSS05TXzZ2ZWN0b3JJTlMyXzE2T3V0bGV0Q29ubmVjdGlvbkVOU185YWxsb2NhdG9ySVNFX0VFRUVFVWxSTlMyXzExSG9zdENvbnRleHRJZEVFRV9OU0ZfSVNOX0VFRnZTTV9FRUUATlN0M19fMjEwX19mdW5jdGlvbjZfX2Jhc2VJRnZSTjRlbGVtMTFIb3N0Q29udGV4dElkRUVFRUUAAAAM/wAAmbEAADT/AAC0sAAA1LEAAFpONGVsZW0xOFJvb3RSZW5kZXJTZXF1ZW5jZUlkRTRwdXNoRVJOU18xNUJ1ZmZlckFsbG9jYXRvcklkRUVSTlN0M19fMjEwc2hhcmVkX3B0cklOU185R3JhcGhOb2RlSWRFRUVFUktOUzVfNnZlY3RvcklOU18xNk91dGxldENvbm5lY3Rpb25FTlM1XzlhbGxvY2F0b3JJU0NfRUVFRUVVbFJOU18xMUhvc3RDb250ZXh0SWRFRUVfAAAADP8AAOixAAAAAAAA6LMAABUFAAAWBQAAFwUAABgFAAAZBQAAGgUAABsFAAAcBQAAHQUAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSVpONGVsZW0xOFJvb3RSZW5kZXJTZXF1ZW5jZUlkRTRwdXNoRVJOUzJfMTVCdWZmZXJBbGxvY2F0b3JJZEVFUk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRVJLTlNfNnZlY3RvcklOUzJfMTVJbmxldENvbm5lY3Rpb25FTlNfOWFsbG9jYXRvcklTRV9FRUVFUktOU0RfSU5TMl8xNk91dGxldENvbm5lY3Rpb25FTlNGX0lTS19FRUVFRVVsUk5TMl8xMUhvc3RDb250ZXh0SWRFRUVfTlNGX0lTU19FRUZ2U1JfRUVFAAAANP8AANiyAADUsQAAWk40ZWxlbTE4Um9vdFJlbmRlclNlcXVlbmNlSWRFNHB1c2hFUk5TXzE1QnVmZmVyQWxsb2NhdG9ySWRFRVJOU3QzX18yMTBzaGFyZWRfcHRySU5TXzlHcmFwaE5vZGVJZEVFRUVSS05TNV82dmVjdG9ySU5TXzE1SW5sZXRDb25uZWN0aW9uRU5TNV85YWxsb2NhdG9ySVNDX0VFRUVSS05TQl9JTlNfMTZPdXRsZXRDb25uZWN0aW9uRU5TRF9JU0lfRUVFRUVVbFJOU18xMUhvc3RDb250ZXh0SWRFRUVfAAAADP8AAPSzAABI/gAA2A0AAHZpaQDErwAA2A0AAGlpaQAAAAAABLYAAB4FAAAfBQAAIAUAACEFAAAiBQAAIwUAACQFAAAlBQAAJgUAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSVpONGVsZW03UnVudGltZUlkRTJnY0V2RVVsT1RfRV9OU185YWxsb2NhdG9ySVM3X0VFRnZSTlNfMTBzaGFyZWRfcHRySU5TMl8xOUdyYXBoUmVuZGVyU2VxdWVuY2VJZEVFRUVFRUUATlN0M19fMjEwX19mdW5jdGlvbjZfX2Jhc2VJRnZSTlNfMTBzaGFyZWRfcHRySU40ZWxlbTE5R3JhcGhSZW5kZXJTZXF1ZW5jZUlkRUVFRUVFRQAAAAz/AACntQAANP8AACS1AAD8tQAAWk40ZWxlbTdSdW50aW1lSWRFMmdjRXZFVWxPVF9FXwAM/wAAELYAQcDsAguHJMSvAADYDQAAxK8AAMSvAABpaWlpaQAAAAAAAADctgAAJwUAACgFAAApBQAAKgUAACsFAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjRlbGVtMTRTaGFyZWRSZXNvdXJjZUVOU18xNGRlZmF1bHRfZGVsZXRlSVMyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAAAAADT/AAB0tgAAdPwAAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU40ZWxlbTE0U2hhcmVkUmVzb3VyY2VFRUUAAABI/gAA2A0AAKj+AAB2aWlpAAAAAEj+AADYDQAAxK8AAAAAAACkuAAALAUAAC0FAAAuBQAALwUAADAFAAAxBQAAMgUAADMFAAA0BQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk4yNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcjE5cHJvY2Vzc1F1ZXVlZEV2ZW50c0VOMTBlbXNjcmlwdGVuM3ZhbEVFVWxSS05TXzEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVONGVsZW0yanM1VmFsdWVFRV9OUzhfSVNHX0VFRnZTQ19TRl9FRUUATlN0M19fMjEwX19mdW5jdGlvbjZfX2Jhc2VJRnZSS05TXzEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVONGVsZW0yanM1VmFsdWVFRUVFAAAM/wAALrgAADT/AABotwAAnLgAAFpOMjRFbGVtZW50YXJ5QXVkaW9Qcm9jZXNzb3IxOXByb2Nlc3NRdWV1ZWRFdmVudHNFTjEwZW1zY3JpcHRlbjN2YWxFRVVsUktOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TMl8xMWNoYXJfdHJhaXRzSWNFRU5TMl85YWxsb2NhdG9ySWNFRUVFTjRlbGVtMmpzNVZhbHVlRUVfAAz/AACwuAAAxK8AAMSvAABI/gAA2A0AAPz+AAB2aWlkAAAAAAAAAACwuQAANQUAADYFAAA3BQAAOAUAAE4xMmZmdGNvbnZvbHZlcjIwVHdvU3RhZ2VGRlRDb252b2x2ZXJFAAAM/wAAiLkAAAAAAADkuQAAOQUAADoFAABOMTJmZnRjb252b2x2ZXI2QnVmZmVySWZFRQAADP8AAMi5AAAAAAAAHLoAADsFAAA8BQAATjEyZmZ0Y29udm9sdmVyMTJGRlRDb252b2x2ZXJFAAAM/wAA/LkAAAAAAACAugAAPQUAAD4FAAA/BQAAQAUAAEEFAABOOGF1ZGlvZmZ0OE9vdXJhRkZURQBOOGF1ZGlvZmZ0NmRldGFpbDEyQXVkaW9GRlRJbXBsRQAAAAz/AABVugAANP8AAEC6AAB4ugAATlN0M19fMjEyYmFzaWNfc3RyaW5nSWhOU18xMWNoYXJfdHJhaXRzSWhFRU5TXzlhbGxvY2F0b3JJaEVFRUUAAAz/AACMugAATlN0M19fMjEyYmFzaWNfc3RyaW5nSXdOU18xMWNoYXJfdHJhaXRzSXdFRU5TXzlhbGxvY2F0b3JJd0VFRUUAAAz/AADUugAATlN0M19fMjEyYmFzaWNfc3RyaW5nSURzTlNfMTFjaGFyX3RyYWl0c0lEc0VFTlNfOWFsbG9jYXRvcklEc0VFRUUAAAAM/wAAHLsAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0lEaU5TXzExY2hhcl90cmFpdHNJRGlFRU5TXzlhbGxvY2F0b3JJRGlFRUVFAAAADP8AAGi7AABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0ljRUUAAAz/AAC0uwAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJYUVFAAAM/wAA3LsAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWhFRQAADP8AAAS8AABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lzRUUAAAz/AAAsvAAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJdEVFAAAM/wAAVLwAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWlFRQAADP8AAHy8AABOMTBlbXNjcmlwdGVuMTFtZW1v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\";if(!ra(F)){var sa=F;F=l.locateFile?l.locateFile(sa,\"\"):\"\"+sa}\nfunction ta(a){if(F==F&&fa)var b=new Uint8Array(fa);else{b=F;if(ra(b)){b=atob(b.slice(37));for(var c=new Uint8Array(b.length),d=0;d<b.length;++d)c[d]=b.charCodeAt(d);b=c}else b=void 0;if(!b)if(da)b=da(F);else throw\"sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)\";}b=new WebAssembly.Module(b);return[new WebAssembly.Instance(b,a),b]}var ua=a=>{for(;0<a.length;)a.shift()(l)};\nclass va{constructor(a){this.R=a-24}}\nvar wa=0,xa=0,za,G=a=>{for(var b=\"\";x[a];)b+=za[x[a++]];return b},H={},I={},Aa={},J,Ba=a=>{throw new J(a);},K,M=(a,b,c)=>{function d(h){h=c(h);if(h.length!==a.length)throw new K(\"Mismatched type converter count\");for(var m=0;m<a.length;++m)L(a[m],h[m])}a.forEach(function(h){Aa[h]=b});var e=Array(b.length),g=[],f=0;b.forEach((h,m)=>{I.hasOwnProperty(h)?e[m]=I[h]:(g.push(h),H.hasOwnProperty(h)||(H[h]=[]),H[h].push(()=>{e[m]=I[h];++f;f===g.length&&d(e)}))});0===g.length&&d(e)};\nfunction Ca(a,b,c={}){var d=b.name;if(!a)throw new J(`type \"${d}\" must have a positive integer typeid pointer`);if(I.hasOwnProperty(a)){if(c.sa)return;throw new J(`Cannot register type '${d}' twice`);}I[a]=b;delete Aa[a];H.hasOwnProperty(a)&&(b=H[a],delete H[a],b.forEach(e=>e()))}function L(a,b,c={}){if(!(\"argPackAdvance\"in b))throw new TypeError(\"registerType registeredInstance requires argPackAdvance\");return Ca(a,b,c)}\nvar Da=a=>{throw new J(a.O.S.P.name+\" instance already deleted\");},Ea=!1,Fa=()=>{},Ga=(a,b,c)=>{if(b===c)return a;if(void 0===c.U)return null;a=Ga(a,b,c.U);return null===a?null:c.pa(a)},Ha={},N=[],Ia=()=>{for(;N.length;){var a=N.pop();a.O.aa=!1;a[\"delete\"]()}},O,P={},Ja=(a,b)=>{if(void 0===b)throw new J(\"ptr should not be undefined\");for(;a.U;)b=a.da(b),a=a.U;return P[b]},Ka=(a,b)=>{if(!b.S||!b.R)throw new K(\"makeClassHandle requires ptr and ptrType\");if(!!b.V!==!!b.T)throw new K(\"Both smartPtrType and smartPtr must be specified\");\nb.count={value:1};return Q(Object.create(a,{O:{value:b,writable:!0}}))},Q=a=>{if(\"undefined\"===typeof FinalizationRegistry)return Q=b=>b,a;Ea=new FinalizationRegistry(b=>{b=b.O;--b.count.value;0===b.count.value&&(b.T?b.V.Z(b.T):b.S.P.Z(b.R))});Q=b=>{var c=b.O;c.T&&Ea.register(b,{O:c},b);return b};Fa=b=>{Ea.unregister(b)};return Q(a)};function La(){}\nvar R=(a,b)=>Object.defineProperty(b,\"name\",{value:a}),Ma=(a,b,c)=>{if(void 0===a[b].Y){var d=a[b];a[b]=function(){if(!a[b].Y.hasOwnProperty(arguments.length))throw new J(`Function '${c}' called with an invalid number of arguments (${arguments.length}) - expects one of (${a[b].Y})!`);return a[b].Y[arguments.length].apply(this,arguments)};a[b].Y=[];a[b].Y[d.ea]=d}},Na=(a,b)=>{if(l.hasOwnProperty(a))throw new J(`Cannot register public name '${a}' twice`);l[a]=b},Oa=a=>{if(void 0===a)return\"_unknown\";\na=a.replace(/[^a-zA-Z0-9_]/g,\"$\");var b=a.charCodeAt(0);return 48<=b&&57>=b?`_${a}`:a};function Pa(a,b,c,d,e,g,f,h){this.name=a;this.constructor=b;this.ba=c;this.Z=d;this.U=e;this.qa=g;this.da=f;this.pa=h;this.va=[]}var Qa=(a,b,c)=>{for(;b!==c;){if(!b.da)throw new J(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);a=b.da(a);b=b.U}return a};\nfunction Ra(a,b){if(null===b){if(this.ha)throw new J(`null is not a valid ${this.name}`);return 0}if(!b.O)throw new J(`Cannot pass \"${Sa(b)}\" as a ${this.name}`);if(!b.O.R)throw new J(`Cannot pass deleted object as a pointer of type ${this.name}`);return Qa(b.O.R,b.O.S.P,this.P)}\nfunction Ta(a,b){if(null===b){if(this.ha)throw new J(`null is not a valid ${this.name}`);if(this.ga){var c=this.wa();null!==a&&a.push(this.Z,c);return c}return 0}if(!b||!b.O)throw new J(`Cannot pass \"${Sa(b)}\" as a ${this.name}`);if(!b.O.R)throw new J(`Cannot pass deleted object as a pointer of type ${this.name}`);if(!this.fa&&b.O.S.fa)throw new J(`Cannot convert argument of type ${b.O.V?b.O.V.name:b.O.S.name} to parameter type ${this.name}`);c=Qa(b.O.R,b.O.S.P,this.P);if(this.ga){if(void 0===b.O.T)throw new J(\"Passing raw pointer to smart pointer is illegal\");\nswitch(this.ya){case 0:if(b.O.V===this)c=b.O.T;else throw new J(`Cannot convert argument of type ${b.O.V?b.O.V.name:b.O.S.name} to parameter type ${this.name}`);break;case 1:c=b.O.T;break;case 2:if(b.O.V===this)c=b.O.T;else{var d=b.clone();c=this.xa(c,S(()=>d[\"delete\"]()));null!==a&&a.push(this.Z,c)}break;default:throw new J(\"Unsupporting sharing policy\");}}return c}\nfunction Ua(a,b){if(null===b){if(this.ha)throw new J(`null is not a valid ${this.name}`);return 0}if(!b.O)throw new J(`Cannot pass \"${Sa(b)}\" as a ${this.name}`);if(!b.O.R)throw new J(`Cannot pass deleted object as a pointer of type ${this.name}`);if(b.O.S.fa)throw new J(`Cannot convert argument of type ${b.O.S.name} to parameter type ${this.name}`);return Qa(b.O.R,b.O.S.P,this.P)}function Va(a){return this.fromWireType(B[a>>2])}\nfunction Wa(a,b,c,d,e,g,f,h,m,k,n){this.name=a;this.P=b;this.ha=c;this.fa=d;this.ga=e;this.ua=g;this.ya=f;this.ma=h;this.wa=m;this.xa=k;this.Z=n;e||void 0!==b.U?this.toWireType=Ta:(this.toWireType=d?Ra:Ua,this.W=null)}\nvar Xa=(a,b)=>{if(!l.hasOwnProperty(a))throw new K(\"Replacing nonexistant public symbol\");l[a]=b;l[a].ea=void 0},Ya=[],Za,$a=a=>{var b=Ya[a];b||(a>=Ya.length&&(Ya.length=a+1),Ya[a]=b=Za.get(a));return b},ab=(a,b)=>{var c=[];return function(){c.length=0;Object.assign(c,arguments);if(a.includes(\"j\")){var d=l[\"dynCall_\"+a];d=c&&c.length?d.apply(null,[b].concat(c)):d.call(null,b)}else d=$a(b).apply(null,c);return d}},T=(a,b)=>{a=G(a);var c=a.includes(\"j\")?ab(a,b):$a(b);if(\"function\"!=typeof c)throw new J(`unknown function pointer with signature ${a}: ${b}`);\nreturn c},bb,db=a=>{a=cb(a);var b=G(a);U(a);return b},eb=(a,b)=>{function c(g){e[g]||I[g]||(Aa[g]?Aa[g].forEach(c):(d.push(g),e[g]=!0))}var d=[],e={};b.forEach(c);throw new bb(`${a}: `+d.map(db).join([\", \"]));},fb=(a,b)=>{for(var c=[],d=0;d<a;d++)c.push(B[b+4*d>>2]);return c},hb=a=>{for(;a.length;){var b=a.pop();a.pop()(b)}};function ib(a){for(var b=1;b<a.length;++b)if(null!==a[b]&&void 0===a[b].W)return!0;return!1}\nfunction jb(a){var b=Function;if(!(b instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);var c=R(b.name||\"unknownFunctionName\",function(){});c.prototype=b.prototype;c=new c;a=b.apply(c,a);return a instanceof Object?a:c}\nfunction kb(a,b,c,d,e,g){var f=b.length;if(2>f)throw new J(\"argTypes array size mismatch! Must at least get return value and 'this' types!\");var h=null!==b[1]&&null!==c,m=ib(b);c=\"void\"!==b[0].name;d=[Ba,d,e,hb,b[0],b[1]];for(e=0;e<f-2;++e)d.push(b[e+2]);if(!m)for(e=h?1:2;e<b.length;++e)null!==b[e].W&&d.push(b[e].W);m=ib(b);e=b.length;var k=\"\",n=\"\";for(f=0;f<e-2;++f)k+=(0!==f?\", \":\"\")+\"arg\"+f,n+=(0!==f?\", \":\"\")+\"arg\"+f+\"Wired\";k=`\\n        return function (${k}) {\\n        if (arguments.length !== ${e-\n2}) {\\n          throwBindingError('function ${a} called with ' + arguments.length + ' arguments, expected ${e-2}');\\n        }`;m&&(k+=\"var destructors = [];\\n\");var r=m?\"destructors\":\"null\",q=\"throwBindingError invoker fn runDestructors retType classParam\".split(\" \");h&&(k+=\"var thisWired = classParam['toWireType'](\"+r+\", this);\\n\");for(f=0;f<e-2;++f)k+=\"var arg\"+f+\"Wired = argType\"+f+\"['toWireType'](\"+r+\", arg\"+f+\"); // \"+b[f+2].name+\"\\n\",q.push(\"argType\"+f);h&&(n=\"thisWired\"+(0<n.length?\", \":\n\"\")+n);k+=(c||g?\"var rv = \":\"\")+\"invoker(fn\"+(0<n.length?\", \":\"\")+n+\");\\n\";if(m)k+=\"runDestructors(destructors);\\n\";else for(f=h?1:2;f<b.length;++f)g=1===f?\"thisWired\":\"arg\"+(f-2)+\"Wired\",null!==b[f].W&&(k+=g+\"_dtor(\"+g+\"); // \"+b[f].name+\"\\n\",q.push(g+\"_dtor\"));c&&(k+=\"var ret = retType['fromWireType'](rv);\\nreturn ret;\\n\");let [t,u]=[q,k+\"}\\n\"];t.push(u);b=jb(t).apply(null,d);return R(a,b)}var lb=a=>{a=a.trim();const b=a.indexOf(\"(\");return-1!==b?a.substr(0,b):a};\nclass mb{constructor(){this.X=[void 0];this.ia=[]}get(a){return this.X[a]}has(a){return void 0!==this.X[a]}}var V=new mb,nb=a=>{a>=V.ja&&0===--V.get(a).na&&(V.X[a]=void 0,V.ia.push(a))},Y=a=>{if(!a)throw new J(\"Cannot use deleted val. handle = \"+a);return V.get(a).value},S=a=>{switch(a){case void 0:return 1;case null:return 2;case !0:return 3;case !1:return 4;default:a={na:1,value:a};var b=V.ia.pop()||V.X.length;V.X[b]=a;return b}};function ob(a){return this.fromWireType(A[a>>2])}\nfor(var pb={name:\"emscripten::val\",fromWireType:a=>{var b=Y(a);nb(a);return b},toWireType:(a,b)=>S(b),argPackAdvance:8,readValueFromPointer:ob,W:null},Sa=a=>{if(null===a)return\"null\";var b=typeof a;return\"object\"===b||\"array\"===b||\"function\"===b?a.toString():\"\"+a},qb=(a,b)=>{switch(b){case 4:return function(c){return this.fromWireType(ja[c>>2])};case 8:return function(c){return this.fromWireType(ka[c>>3])};default:throw new TypeError(`invalid float width (${b}): ${a}`);}},rb=(a,b,c)=>{switch(b){case 1:return c?\nd=>ia[d>>0]:d=>x[d>>0];case 2:return c?d=>y[d>>1]:d=>z[d>>1];case 4:return c?d=>A[d>>2]:d=>B[d>>2];default:throw new TypeError(`invalid integer width (${b}): ${a}`);}},sb=\"undefined\"!=typeof TextDecoder?new TextDecoder(\"utf8\"):void 0,tb=\"undefined\"!=typeof TextDecoder?new TextDecoder(\"utf-16le\"):void 0,ub=(a,b)=>{var c=a>>1;for(var d=c+b/2;!(c>=d)&&z[c];)++c;c<<=1;if(32<c-a&&tb)return tb.decode(x.subarray(a,c));c=\"\";for(d=0;!(d>=b/2);++d){var e=y[a+2*d>>1];if(0==e)break;c+=String.fromCharCode(e)}return c},\nvb=(a,b,c)=>{c??=2147483647;if(2>c)return 0;c-=2;var d=b;c=c<2*a.length?c/2:a.length;for(var e=0;e<c;++e)y[b>>1]=a.charCodeAt(e),b+=2;y[b>>1]=0;return b-d},wb=a=>2*a.length,xb=(a,b)=>{for(var c=0,d=\"\";!(c>=b/4);){var e=A[a+4*c>>2];if(0==e)break;++c;65536<=e?(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023)):d+=String.fromCharCode(e)}return d},yb=(a,b,c)=>{c??=2147483647;if(4>c)return 0;var d=b;c=d+c-4;for(var e=0;e<a.length;++e){var g=a.charCodeAt(e);if(55296<=g&&57343>=g){var f=a.charCodeAt(++e);\ng=65536+((g&1023)<<10)|f&1023}A[b>>2]=g;b+=4;if(b+4>c)break}A[b>>2]=0;return b-d},zb=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&++c;b+=4}return b},Ab=(a,b)=>{var c=I[a];if(void 0===c)throw a=b+\" has unknown type \"+db(a),new J(a);return c},Bb=(a,b,c)=>{var d=[];a=a.toWireType(d,c);d.length&&(B[b>>2]=S(d));return a},Cb=[],Db={},Eb=a=>{var b=Db[a];return void 0===b?G(a):b},Fb=()=>\"object\"==typeof globalThis?globalThis:Function(\"return this\")(),Gb=a=>{var b=Cb.length;\nCb.push(a);return b},Hb=(a,b)=>{for(var c=Array(a),d=0;d<a;++d)c[d]=Ab(B[b+4*d>>2],\"parameter \"+d);return c},Ib=()=>{if(\"object\"==typeof crypto&&\"function\"==typeof crypto.getRandomValues)return a=>crypto.getRandomValues(a);p(\"initRandomDevice\")},Jb=a=>(Jb=Ib())(a),Kb=Array(256),Lb=0;256>Lb;++Lb)Kb[Lb]=String.fromCharCode(Lb);za=Kb;J=l.BindingError=class extends Error{constructor(a){super(a);this.name=\"BindingError\"}};K=l.InternalError=class extends Error{constructor(a){super(a);this.name=\"InternalError\"}};\nObject.assign(La.prototype,{isAliasOf:function(a){if(!(this instanceof La&&a instanceof La))return!1;var b=this.O.S.P,c=this.O.R;a.O=a.O;var d=a.O.S.P;for(a=a.O.R;b.U;)c=b.da(c),b=b.U;for(;d.U;)a=d.da(a),d=d.U;return b===d&&c===a},clone:function(){this.O.R||Da(this);if(this.O.ca)return this.O.count.value+=1,this;var a=Q,b=Object,c=b.create,d=Object.getPrototypeOf(this),e=this.O;a=a(c.call(b,d,{O:{value:{count:e.count,aa:e.aa,ca:e.ca,R:e.R,S:e.S,T:e.T,V:e.V}}}));a.O.count.value+=1;a.O.aa=!1;return a},\n[\"delete\"](){this.O.R||Da(this);if(this.O.aa&&!this.O.ca)throw new J(\"Object already scheduled for deletion\");Fa(this);var a=this.O;--a.count.value;0===a.count.value&&(a.T?a.V.Z(a.T):a.S.P.Z(a.R));this.O.ca||(this.O.T=void 0,this.O.R=void 0)},isDeleted:function(){return!this.O.R},deleteLater:function(){this.O.R||Da(this);if(this.O.aa&&!this.O.ca)throw new J(\"Object already scheduled for deletion\");N.push(this);1===N.length&&O&&O(Ia);this.O.aa=!0;return this}});l.getInheritedInstanceCount=()=>Object.keys(P).length;\nl.getLiveInheritedInstances=()=>{var a=[],b;for(b in P)P.hasOwnProperty(b)&&a.push(P[b]);return a};l.flushPendingDeletes=Ia;l.setDelayFunction=a=>{O=a;N.length&&O&&O(Ia)};\nObject.assign(Wa.prototype,{ra(a){this.ma&&(a=this.ma(a));return a},la(a){this.Z?.(a)},argPackAdvance:8,readValueFromPointer:Va,fromWireType:function(a){function b(){return this.ga?Ka(this.P.ba,{S:this.ua,R:c,V:this,T:a}):Ka(this.P.ba,{S:this,R:a})}var c=this.ra(a);if(!c)return this.la(a),null;var d=Ja(this.P,c);if(void 0!==d){if(0===d.O.count.value)return d.O.R=c,d.O.T=a,d.clone();d=d.clone();this.la(a);return d}d=this.P.qa(c);d=Ha[d];if(!d)return b.call(this);d=this.fa?d.oa:d.pointerType;var e=\nGa(c,this.P,d.P);return null===e?b.call(this):this.ga?Ka(d.P.ba,{S:d,R:e,V:this,T:a}):Ka(d.P.ba,{S:d,R:e})}});bb=l.UnboundTypeError=((a,b)=>{var c=R(b,function(d){this.name=b;this.message=d;d=Error(d).stack;void 0!==d&&(this.stack=this.toString()+\"\\n\"+d.replace(/^Error(:[^\\n]*)?\\n/,\"\"))});c.prototype=Object.create(a.prototype);c.prototype.constructor=c;c.prototype.toString=function(){return void 0===this.message?this.name:`${this.name}: ${this.message}`};return c})(Error,\"UnboundTypeError\");\nV.X.push({value:void 0},{value:null},{value:!0},{value:!1});Object.assign(V,{ja:V.X.length});l.count_emval_handles=()=>{for(var a=0,b=V.ja;b<V.X.length;++b)void 0!==V.X[b]&&++a;return a};\nvar Nb={l:(a,b,c)=>{var d=new va(a);B[d.R+16>>2]=0;B[d.R+4>>2]=b;B[d.R+8>>2]=c;wa=a;xa++;throw wa;},x:()=>{},C:(a,b,c,d)=>{b=G(b);L(a,{name:b,fromWireType:function(e){return!!e},toWireType:function(e,g){return g?c:d},argPackAdvance:8,readValueFromPointer:function(e){return this.fromWireType(x[e])},W:null})},H:(a,b,c,d,e,g,f,h,m,k,n,r,q)=>{n=G(n);g=T(e,g);h&&=T(f,h);k&&=T(m,k);q=T(r,q);var t=Oa(n);Na(t,function(){eb(`Cannot construct ${n} due to unbound types`,[d])});M([a,b,c],d?[d]:[],function(u){u=\nu[0];if(d){var v=u.P;var W=v.ba}else W=La.prototype;u=R(n,function(){if(Object.getPrototypeOf(this)!==ya)throw new J(\"Use 'new' to construct \"+n);if(void 0===C.$)throw new J(n+\" has no accessible constructor\");var gb=C.$[arguments.length];if(void 0===gb)throw new J(`Tried to invoke ctor of ${n} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(C.$).toString()}) parameters instead!`);return gb.apply(this,arguments)});var ya=Object.create(W,{constructor:{value:u}});u.prototype=\nya;var C=new Pa(n,u,ya,q,v,g,h,k);if(C.U){var X;(X=C.U).ka??(X.ka=[]);C.U.ka.push(C)}v=new Wa(n,C,!0,!1,!1);X=new Wa(n+\"*\",C,!1,!1,!1);W=new Wa(n+\" const*\",C,!1,!0,!1);Ha[a]={pointerType:X,oa:W};Xa(t,u);return[v,X,W]})},G:(a,b,c,d,e,g)=>{var f=fb(b,c);e=T(d,e);M([],[a],function(h){h=h[0];var m=`constructor ${h.name}`;void 0===h.P.$&&(h.P.$=[]);if(void 0!==h.P.$[b-1])throw new J(`Cannot register multiple constructors with identical number of parameters (${b-1}) for class '${h.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);\nh.P.$[b-1]=()=>{eb(`Cannot construct ${h.name} due to unbound types`,f)};M([],f,k=>{k.splice(1,0,null);h.P.$[b-1]=kb(m,k,null,e,g);return[]});return[]})},d:(a,b,c,d,e,g,f,h,m)=>{var k=fb(c,d);b=G(b);b=lb(b);g=T(e,g);M([],[a],function(n){function r(){eb(`Cannot call ${q} due to unbound types`,k)}n=n[0];var q=`${n.name}.${b}`;b.startsWith(\"@@\")&&(b=Symbol[b.substring(2)]);h&&n.P.va.push(b);var t=n.P.ba,u=t[b];void 0===u||void 0===u.Y&&u.className!==n.name&&u.ea===c-2?(r.ea=c-2,r.className=n.name,t[b]=\nr):(Ma(t,b,q),t[b].Y[c-2]=r);M([],k,function(v){v=kb(q,v,n,g,f,m);void 0===t[b].Y?(v.ea=c-2,t[b]=v):t[b].Y[c-2]=v;return[]});return[]})},B:a=>L(a,pb),u:(a,b,c)=>{b=G(b);L(a,{name:b,fromWireType:d=>d,toWireType:(d,e)=>e,argPackAdvance:8,readValueFromPointer:qb(b,c),W:null})},f:(a,b,c,d,e)=>{b=G(b);-1===e&&(e=4294967295);e=h=>h;if(0===d){var g=32-8*c;e=h=>h<<g>>>g}var f=b.includes(\"unsigned\")?function(h,m){return m>>>0}:function(h,m){return m};L(a,{name:b,fromWireType:e,toWireType:f,argPackAdvance:8,\nreadValueFromPointer:rb(b,c,0!==d),W:null})},b:(a,b,c)=>{function d(g){return new e(ia.buffer,B[g+4>>2],B[g>>2])}var e=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][b];c=G(c);L(a,{name:c,fromWireType:d,argPackAdvance:8,readValueFromPointer:d},{sa:!0})},t:(a,b)=>{b=G(b);var c=\"std::string\"===b;L(a,{name:b,fromWireType:function(d){var e=B[d>>2],g=d+4;if(c)for(var f=g,h=0;h<=e;++h){var m=g+h;if(h==e||0==x[m]){if(f){var k=f;var n=x,r=k+(m-f);for(f=k;n[f]&&\n!(f>=r);)++f;if(16<f-k&&n.buffer&&sb)k=sb.decode(n.subarray(k,f));else{for(r=\"\";k<f;){var q=n[k++];if(q&128){var t=n[k++]&63;if(192==(q&224))r+=String.fromCharCode((q&31)<<6|t);else{var u=n[k++]&63;q=224==(q&240)?(q&15)<<12|t<<6|u:(q&7)<<18|t<<12|u<<6|n[k++]&63;65536>q?r+=String.fromCharCode(q):(q-=65536,r+=String.fromCharCode(55296|q>>10,56320|q&1023))}}else r+=String.fromCharCode(q)}k=r}}else k=\"\";if(void 0===v)var v=k;else v+=String.fromCharCode(0),v+=k;f=m+1}}else{v=Array(e);for(h=0;h<e;++h)v[h]=\nString.fromCharCode(x[g+h]);v=v.join(\"\")}U(d);return v},toWireType:function(d,e){e instanceof ArrayBuffer&&(e=new Uint8Array(e));var g,f=\"string\"==typeof e;if(!(f||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Int8Array))throw new J(\"Cannot pass non-string to std::string\");var h;if(c&&f)for(g=h=0;g<e.length;++g){var m=e.charCodeAt(g);127>=m?h++:2047>=m?h+=2:55296<=m&&57343>=m?(h+=4,++g):h+=3}else h=e.length;g=h;h=Mb(4+g+1);m=h+4;B[h>>2]=g;if(c&&f){if(f=m,m=g+1,g=x,0<m){m=f+\nm-1;for(var k=0;k<e.length;++k){var n=e.charCodeAt(k);if(55296<=n&&57343>=n){var r=e.charCodeAt(++k);n=65536+((n&1023)<<10)|r&1023}if(127>=n){if(f>=m)break;g[f++]=n}else{if(2047>=n){if(f+1>=m)break;g[f++]=192|n>>6}else{if(65535>=n){if(f+2>=m)break;g[f++]=224|n>>12}else{if(f+3>=m)break;g[f++]=240|n>>18;g[f++]=128|n>>12&63}g[f++]=128|n>>6&63}g[f++]=128|n&63}}g[f]=0}}else if(f)for(f=0;f<g;++f){k=e.charCodeAt(f);if(255<k)throw U(m),new J(\"String has UTF-16 code units that do not fit in 8 bits\");x[m+f]=\nk}else for(f=0;f<g;++f)x[m+f]=e[f];null!==d&&d.push(U,h);return h},argPackAdvance:8,readValueFromPointer:Va,W(d){U(d)}})},p:(a,b,c)=>{c=G(c);if(2===b){var d=ub;var e=vb;var g=wb;var f=()=>z;var h=1}else 4===b&&(d=xb,e=yb,g=zb,f=()=>B,h=2);L(a,{name:c,fromWireType:m=>{for(var k=B[m>>2],n=f(),r,q=m+4,t=0;t<=k;++t){var u=m+4+t*b;if(t==k||0==n[u>>h])q=d(q,u-q),void 0===r?r=q:(r+=String.fromCharCode(0),r+=q),q=u+b}U(m);return r},toWireType:(m,k)=>{if(\"string\"!=typeof k)throw new J(`Cannot pass non-string to C++ string type ${c}`);\nvar n=g(k),r=Mb(4+n+b);B[r>>2]=n>>h;e(k,r+4,n+b);null!==m&&m.push(U,r);return r},argPackAdvance:8,readValueFromPointer:ob,W(m){U(m)}})},D:(a,b)=>{b=G(b);L(a,{ta:!0,name:b,argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})},j:(a,b,c)=>{a=Y(a);b=Ab(b,\"emval::as\");return Bb(b,c,a)},w:(a,b,c,d)=>{a=Cb[a];b=Y(b);return a(null,b,c,d)},q:(a,b,c,d,e)=>{a=Cb[a];b=Y(b);c=Eb(c);return a(b,b[c],d,e)},a:nb,i:a=>{if(0===a)return S(Fb());a=Eb(a);return S(Fb()[a])},m:(a,b,c)=>{b=Hb(a,b);var d=b.shift();a--;\nvar e=\"return function (obj, func, destructorsRef, args) {\\n\",g=0,f=[];0===c&&f.push(\"obj\");for(var h=[\"retType\"],m=[d],k=0;k<a;++k)f.push(\"arg\"+k),h.push(\"argType\"+k),m.push(b[k]),e+=`  var arg${k} = argType${k}.readValueFromPointer(args${g?\"+\"+g:\"\"});\\n`,g+=b[k].argPackAdvance;e+=`  var rv = ${1===c?\"new func\":\"func.call\"}(${f.join(\", \")});\\n`;d.ta||(h.push(\"emval_returnValue\"),m.push(Bb),e+=\"  return emval_returnValue(retType, destructorsRef, rv);\\n\");h.push(e+\"};\\n\");a=jb(h).apply(null,m);c=`methodCaller<(${b.map(n=>\nn.name).join(\", \")}) => ${d.name}>`;return Gb(R(c,a))},h:(a,b)=>{a=Y(a);b=Y(b);return S(a[b])},g:a=>{4<a&&(V.get(a).na+=1)},n:(a,b)=>{a=Y(a);b=Y(b);return a instanceof b},F:a=>{a=Y(a);return\"number\"==typeof a},E:a=>{a=Y(a);return\"string\"==typeof a},s:()=>S([]),r:a=>S(Eb(a)),v:()=>S({}),e:a=>{var b=Y(a);hb(b);nb(a)},k:(a,b,c)=>{a=Y(a);b=Y(b);c=Y(c);a[b]=c},c:(a,b)=>{a=Ab(a,\"_emval_take_value\");a=a.readValueFromPointer(b);return S(a)},o:()=>{p(\"\")},A:(a,b,c)=>x.copyWithin(a,b,b+c),z:a=>{var b=x.length;\na>>>=0;if(2147483648<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);var e=Math;d=Math.max(a,d);a:{e=(e.min.call(e,2147483648,d+(65536-d%65536)%65536)-w.buffer.byteLength+65535)/65536;try{w.grow(e);la();var g=1;break a}catch(f){}g=void 0}if(g)return!0}return!1},y:(a,b)=>{Jb(x.subarray(a,a+b));return 0}},Z=function(){function a(c){Z=c.exports;w=Z.I;la();Za=Z.L;na.unshift(Z.J);D--;l.monitorRunDependencies?.(D);0==D&&(null!==qa&&(clearInterval(qa),qa=null),E&&(c=E,E=null,\nc()));return Z}var b={a:Nb};D++;l.monitorRunDependencies?.(D);if(l.instantiateWasm)try{return l.instantiateWasm(b,a)}catch(c){ea(`Module.instantiateWasm callback failed with error: ${c}`),ba(c)}b=ta(b);return a(b[0])}(),Mb=Z.K,cb=Z.M,U=Z.N,Ob;E=function Pb(){Ob||Qb();Ob||(E=Pb)};\nfunction Qb(){function a(){if(!Ob&&(Ob=!0,l.calledRun=!0,!ha)){ua(na);aa(l);if(l.onRuntimeInitialized)l.onRuntimeInitialized();if(l.postRun)for(\"function\"==typeof l.postRun&&(l.postRun=[l.postRun]);l.postRun.length;){var b=l.postRun.shift();oa.unshift(b)}ua(oa)}}if(!(0<D)){if(l.preRun)for(\"function\"==typeof l.preRun&&(l.preRun=[l.preRun]);l.preRun.length;)pa();ua(ma);0<D||(l.setStatus?(l.setStatus(\"Running...\"),setTimeout(function(){setTimeout(function(){l.setStatus(\"\")},1);a()},1)):a())}}\nif(l.preInit)for(\"function\"==typeof l.preInit&&(l.preInit=[l.preInit]);0<l.preInit.length;)l.preInit.pop()();Qb();\n\n\n  return moduleArg\n}\n);\n})();\nif (typeof exports === 'object' && typeof module === 'object')\n  module.exports = Module;\nelse if (typeof define === 'function' && define['amd'])\n  define([], () => Module);\n", Or = "4.0.3", kr = class extends _r {
	constructor() {
		super(...arguments), this.context = null;
	}
	initialize(e) {
		return L(this, arguments, function* (e, t = {}, n = 16) {
			(0, p.default)(typeof e == "object" && !!e, "First argument to initialize must be a valid AudioContext instance."), (0, p.default)(typeof t == "object" && !!t, "The optional second argument to initialize must be an object."), this.context = e, typeof e._elemWorkletRegistry != "object" && (e._elemWorkletRegistry = {});
			let r = e._elemWorkletRegistry;
			if (!r.hasOwnProperty(Or)) {
				let t = new Blob([Dr, Er], { type: "text/javascript" }), n = URL.createObjectURL(t);
				if (!e.audioWorklet) throw Error("BaseAudioContext.audioWorklet is missing; are you running in a secure context (https)?");
				yield e.audioWorklet.addModule(n), r[Or] = !0;
			}
			return this._promiseMap = /* @__PURE__ */ new Map(), this._nextRequestId = 0, this._worklet = new AudioWorkletNode(e, `ElementaryAudioWorkletProcessor@${Or}`, Object.assign({
				numberOfInputs: 0,
				numberOfOutputs: 1,
				outputChannelCount: [2]
			}, t)), yield new Promise((e, t) => {
				this._worklet.port.onmessage = (t) => {
					let [n, r] = t.data;
					if (n === "load") return this._renderer = new xr((e) => L(this, null, function* () {
						return yield this._sendWorkletRequest("renderInstructions", { batch: e });
					})), e(this._worklet), this.emit(n, r);
					if (n === "events") return r.forEach((e) => {
						this.emit(e.type, e.event);
					});
					if (n === "reply") {
						let { requestId: e, result: t } = r, { resolve: n, reject: i } = this._promiseMap.get(e);
						return this._promiseMap.delete(e), n(t);
					}
				}, this._timer = window.setInterval(() => {
					this._worklet.port.postMessage({ requestType: "processQueuedEvents" });
				}, n);
			});
		});
	}
	_sendWorkletRequest(e, t) {
		(0, p.default)(this._worklet, "Can't send request before worklet is ready. Have you initialized your WebRenderer instance?");
		let n = this._nextRequestId++;
		return this._worklet.port.postMessage({
			requestId: n,
			requestType: e,
			payload: t
		}), new Promise((e, t) => {
			this._promiseMap.set(n, {
				resolve: e,
				reject: t
			});
		});
	}
	createRef(e, t, n) {
		return this._renderer.createRef(e, t, n);
	}
	render(...e) {
		return L(this, null, function* () {
			let t = yield this._renderer.render(...e), { result: n } = t, r = Tr(t, ["result"]);
			return n.success ? Promise.resolve(r) : Promise.reject(n);
		});
	}
	updateVirtualFileSystem(e) {
		return L(this, null, function* () {
			return (0, p.default)(typeof e == "object" && !!e, "Virtual file system must be an object mapping string type keys to Array<Float32Array> | Float32Array type values"), Object.keys(e).forEach(function(t) {
				(0, p.default)(typeof e[t] == "object" && (Array.isArray(e[t]) || e[t] instanceof Float32Array), "Virtual file system must be an object mapping string type keys to Array<Float32Array> | Float32Array type values");
			}), yield this._sendWorkletRequest("updateSharedResourceMap", { resources: e });
		});
	}
	pruneVirtualFileSystem() {
		return L(this, null, function* () {
			return yield this._sendWorkletRequest("pruneVirtualFileSystem", {});
		});
	}
	listVirtualFileSystem() {
		return L(this, null, function* () {
			return yield this._sendWorkletRequest("listVirtualFileSystem", {});
		});
	}
	reset() {
		return L(this, null, function* () {
			return yield this._sendWorkletRequest("reset", {});
		});
	}
	gc() {
		return L(this, null, function* () {
			let e = yield this._sendWorkletRequest("gc", {});
			return this._renderer.prune(e), e;
		});
	}
	setCurrentTime(e) {
		return L(this, null, function* () {
			return yield this._sendWorkletRequest("setCurrentTime", { time: e });
		});
	}
	setCurrentTimeMs(e) {
		return L(this, null, function* () {
			return yield this._sendWorkletRequest("setCurrentTimeMs", { time: e });
		});
	}
}, Ar = class {
	refs = /* @__PURE__ */ new Map();
	core = null;
	pending = [];
	attach(e) {
		this.core = e;
	}
	getOrCreate(e, t) {
		let n = this.refs.get(e);
		if (n) return n.node;
		if (!this.core) return I.const({
			key: e,
			value: t
		});
		let r = this.core.createRef("const", { value: t }, []), i = r[0], a = r[1];
		return this.refs.set(e, {
			node: i,
			setter: a
		}), i;
	}
	getOrCreateNode(e, t, n, r, i) {
		let a = this.refs.get(e);
		if (a) return a.node;
		if (!this.core) return A(t, n, r);
		let o = this.core.createRef(t, n, r), s = o[0], c = o[1], l = i?.(c);
		return this.refs.set(e, {
			node: s,
			setter: c,
			apply: l
		}), s;
	}
	setValue(e, t) {
		let n = this.refs.get(e);
		if (!n) {
			this.pending.push({
				key: e,
				value: t
			});
			return;
		}
		this.pending = this.pending.filter((t) => t.key !== e);
		try {
			n.apply ? n.apply(t) : n.setter({ value: t });
		} catch {
			this.pending.push({
				key: e,
				value: t
			});
		}
	}
	flushPending() {
		if (this.pending.length === 0) return;
		let e = this.pending;
		this.pending = [];
		for (let { key: t, value: n } of e) {
			let e = this.refs.get(t);
			if (e) try {
				e.apply ? e.apply(n) : e.setter({ value: n });
			} catch {}
		}
	}
	get pendingCount() {
		return this.pending.length;
	}
	clear() {
		this.refs.clear(), this.pending.length = 0;
	}
	panic() {
		for (let [e, t] of this.refs) if (e.endsWith(":gate") || e.endsWith(":vel")) try {
			t.setter({ value: 0 });
		} catch {}
	}
	get size() {
		return this.refs.size;
	}
}, jr = class {
	map = /* @__PURE__ */ new Map();
	pending = /* @__PURE__ */ new Map();
	frame = 0;
	refs = null;
	onFlush;
	attach(e) {
		this.refs = e;
	}
	register(e, t) {
		if (e <= 0) return;
		let n = this.map.get(e);
		n || (n = /* @__PURE__ */ new Set(), this.map.set(e, n)), n.add(t);
	}
	queue(e, t) {
		e === 21 && console.log(`[ccBindings] queue CC21 raw=${t}  @ ${performance.now().toFixed(0)}`), this.pending.set(e, t), this.frame === 0 && (this.frame = requestAnimationFrame(() => this.flushPending()));
	}
	clear() {
		this.map.clear(), this.pending.clear();
	}
	flushPending() {
		if (this.frame = 0, this.pending.size !== 0) {
			for (let [e, t] of this.pending) {
				if (this.onFlush?.(e, t), !this.refs) continue;
				let n = this.map.get(e);
				if (!n) continue;
				let r = t / 127;
				e === 21 && console.log(`[ccBindings] FLUSH CC21 norm=${r.toFixed(3)}  @ ${performance.now().toFixed(0)}`);
				for (let e of n) this.refs.setValue(e, r);
			}
			this.pending.clear();
		}
	}
};
//#endregion
//#region src/domain/notes.ts
function Mr(e) {
	return 440 * 2 ** ((e - 69) / 12);
}
function Nr(e, t) {
	return e / 60 * t;
}
//#endregion
//#region src/domain/types.ts
var Pr = {
	vibratoRate: 100,
	vibratoDepth: .5,
	tremoloRate: 100,
	tremoloDepth: 1,
	portamento: 4
};
function Fr(e) {
	let t = Math.round(e.voices ?? 4);
	return Math.max(1, Math.min(16, Number.isFinite(t) ? t : 4));
}
function Ir(e, t) {
	let n = null;
	for (let r of e.slots) if (r.note <= t) n = r;
	else break;
	return n;
}
var Lr = "master", Rr = {
	bpm: 120,
	linesPerBeat: 4
}, zr = class {
	refs;
	instId;
	size;
	noteMap = /* @__PURE__ */ new Map();
	freeStack = [];
	releaseTimers = /* @__PURE__ */ new Map();
	kit;
	constructor(e, t, n = 4) {
		this.refs = e, this.instId = t, this.size = n;
		for (let e = n - 1; e >= 0; e--) this.freeStack.push(e);
	}
	get isDrumKit() {
		return this.kit !== void 0;
	}
	get slotCount() {
		return this.kit?.slots.length ?? 0;
	}
	setKit(e) {
		this.kit ||= e;
	}
	getActiveNotes() {
		return new Map(this.noteMap);
	}
	get activeCount() {
		return this.noteMap.size;
	}
	onVoiceSteal = null;
	noteOn(e, t = 127) {
		if (this.kit) return this.drumNoteOn(e, t);
		let n = this.allocate(e), r = `${this.instId}:v:${n}`;
		return this.refs.setValue(`${r}:freq`, Mr(e)), this.refs.setValue(`${r}:vel`, t / 127), this.refs.setValue(`${r}:gate`, 1), n;
	}
	noteOff(e) {
		if (this.kit) {
			this.drumNoteOff(e);
			return;
		}
		let t = this.noteMap.get(e);
		t !== void 0 && (this.refs.setValue(`${this.instId}:v:${t}:gate`, 0), this.clearReleaseTimer(t), this.releaseTimers.set(t, setTimeout(() => {
			this.releaseTimers.delete(t), this.noteMap.delete(e), this.freeStack.push(t);
		}, 3500)));
	}
	panic() {
		for (let e of this.releaseTimers.values()) clearTimeout(e);
		if (this.releaseTimers.clear(), this.kit) for (let e = 0; e < this.kit.slots.length; e++) this.refs.setValue(`${this.instId}:ds:${e}:v0:gate`, 0);
		else for (let e = 0; e < this.size; e++) this.refs.setValue(`${this.instId}:v:${e}:gate`, 0);
		this.noteMap.clear(), this.freeStack.length = 0;
		for (let e = this.size - 1; e >= 0; e--) this.freeStack.push(e);
	}
	drumNoteOn(e, t = 127) {
		let n = this.kit, r = Ir(n, e);
		if (!r) return -1;
		let i = n.slots.findIndex((e) => e.id === r.id);
		if (i < 0) return -1;
		let a = `${this.instId}:ds:${i}:v0`, o = r.baseNote + (e - r.note);
		return this.refs.setValue(`${a}:gate`, 0), this.refs.setValue(`${a}:freq`, Mr(o)), this.refs.setValue(`${a}:vel`, t / 127), this.refs.setValue(`${a}:gate`, 1), i;
	}
	drumNoteOff(e) {
		let t = this.kit, n = Ir(t, e);
		if (!n) return;
		let r = t.slots.findIndex((e) => e.id === n.id);
		r < 0 || this.refs.setValue(`${this.instId}:ds:${r}:v0:gate`, 0);
	}
	allocate(e) {
		let t = this.noteMap.get(e);
		if (t !== void 0) return this.clearReleaseTimer(t), t;
		let n = this.freeStack.pop();
		if (n !== void 0) return this.noteMap.set(e, n), n;
		let r = this.stealSlot();
		return this.clearReleaseTimer(r), this.noteMap.set(e, r), this.onVoiceSteal?.(this.instId, e), r;
	}
	stealSlot() {
		for (let [e, t] of this.releaseTimers) {
			clearTimeout(t), this.releaseTimers.delete(e);
			for (let [t, n] of this.noteMap) if (n === e) {
				this.noteMap.delete(t);
				break;
			}
			return e;
		}
		for (let [e, t] of this.noteMap) if (t === 0) {
			this.noteMap.delete(e);
			break;
		}
		return 0;
	}
	clearReleaseTimer(e) {
		let t = this.releaseTimers.get(e);
		t !== void 0 && (clearTimeout(t), this.releaseTimers.delete(e));
	}
}, Br = [
	"vibratoRate",
	"vibratoDepth",
	"tremoloRate",
	"tremoloDepth",
	"portamento",
	"volumeSlide",
	"panning",
	"staccato"
];
function Vr(e) {
	return Br.includes(e);
}
//#endregion
//#region src/engine/voiceSlotLayout.ts
var Hr = 11, R = {
	gate: 0,
	freq: 1,
	vol: 2,
	portamento: 3,
	volumeSlide: 4,
	panning: 5,
	vibratoRate: 6,
	vibratoDepth: 7,
	tremoloRate: 8,
	tremoloDepth: 9,
	staccato: 10
}, z = {
	vol: 0,
	portamento: 1,
	volumeSlide: 2,
	panning: 3,
	vibratoRate: 4,
	vibratoDepth: 5,
	tremoloRate: 6,
	tremoloDepth: 7,
	staccato: 8
};
function Ur(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of Object.values(e.entities.patterns)) {
		let r = /* @__PURE__ */ new Map();
		for (let i of n.trackIds) {
			let n = e.entities.tracks[i];
			if (!n) continue;
			r.set(n.instrumentId, (r.get(n.instrumentId) ?? 0) + 1);
			let a = t.get(n.instrumentId);
			a || (a = {
				maxConcurrent: 0,
				namedInlets: /* @__PURE__ */ new Set()
			}, t.set(n.instrumentId, a));
			for (let e of n.effectLanes) Vr(e.type) || a.namedInlets.add(e.type);
		}
		for (let [e, n] of r) {
			let r = t.get(e);
			r && n > r.maxConcurrent && (r.maxConcurrent = n);
		}
	}
	return t;
}
function Wr(e, t) {
	let n = Ur(e);
	if (t && e.entities.instruments[t]) {
		let e = n.get(t);
		e ? e.maxConcurrent = Math.max(1, e.maxConcurrent) : n.set(t, {
			maxConcurrent: 1,
			namedInlets: /* @__PURE__ */ new Set()
		});
	}
	let r = [], i = [...n.keys()].sort();
	for (let t of i) {
		let i = n.get(t);
		if (!i || i.maxConcurrent === 0) continue;
		let a = e.entities.instruments[t];
		if (!a) continue;
		let o = a.kind === "drumkit", s = o ? a.slots.length : void 0, c = [...i.namedInlets].sort(), l = o ? 2 * (s ?? 0) + 10 + c.length : Hr + c.length;
		r.push({
			instId: t,
			slotCount: i.maxConcurrent,
			channelsPerSlot: l,
			namedInletIds: c,
			isDrumkit: o,
			drumSounds: s
		});
	}
	return r.length > 0 ? console.log("[slotLayout]", r.map((t) => `${e.entities.instruments[t.instId]?.name ?? t.instId.slice(0, 8)}: ${t.slotCount} slots × ${t.channelsPerSlot} signals${t.isDrumkit ? " (dk)" : ""}`).join("\n  ")) : console.log("[slotLayout] no instruments — empty doc"), r;
}
function Gr(e, t, n) {
	let r = 0;
	for (let i of e) {
		if (i.instId === t) return r + n;
		r += i.slotCount;
	}
	return -1;
}
//#endregion
//#region src/engine/sequences.ts
function Kr(e, t) {
	let n = 0;
	for (; n < t;) {
		let t = e.cells[n];
		if (!t?.hold || t.note != null || t.noteOff) break;
		n++;
	}
	return n;
}
function qr(e, t) {
	let n = Array(t), r = Array(t), i = Array(t), a = Array(t), o = Array(t).fill(1);
	for (let n = 0; n < t; n++) i[n] = e.cells[n]?.volume ?? 1;
	let s = {};
	for (let n of e.effectLanes) {
		let r = n.type === "portamento" ? .5 : n.type === "volumeSlide" ? 1 : +(n.type === "staccato"), i = Array(t).fill(r);
		for (let r = 0; r < t; r++) {
			let t = e.cells[r]?.effectLanes[n.id];
			t != null && (i[r] = t);
		}
		s[n.id] = i;
	}
	let c = e.effectLanes.find((e) => e.type === "staccato")?.id;
	function l(t) {
		if (!c) return null;
		let n = e.cells[t]?.effectLanes;
		return n ? n[c] ?? null : null;
	}
	let u = [], d = 0;
	for (; d < t;) {
		let n = e.cells[d]?.note ?? null;
		if (n !== null) {
			let r = {
				noteRow: d,
				note: n,
				lastHoldRow: d,
				nextNoteRow: t
			}, i = d + 1;
			for (; i < t;) {
				let t = e.cells[i];
				if (t?.note != null || t?.noteOff) break;
				if (t?.hold) r.lastHoldRow = i;
				else break;
				i++;
			}
			for (let n = r.lastHoldRow + 1; n < t; n++) if (e.cells[n]?.note != null) {
				r.nextNoteRow = n;
				break;
			}
			u.push(r), d = i;
		} else d++;
	}
	r.fill(0), n.fill(0), a.fill(null);
	for (let e = 0; e < u.length; e++) {
		let t = u[e], i = Mr(t.note);
		for (let e = t.noteRow; e <= t.lastHoldRow; e++) r[e] = 1, n[e] = i;
		a[t.noteRow] = t.note;
		let s = t.lastHoldRow, c = l(s);
		c !== null && (o[s] = c), e < u.length - 1 && u[e + 1].noteRow <= t.lastHoldRow + 1 && (t.lastHoldRow > t.noteRow ? (r[t.lastHoldRow] = 0, o[t.lastHoldRow] = 1) : o[t.lastHoldRow] >= 1 && (o[t.lastHoldRow] = .85));
	}
	let f = 0;
	for (let e = 0; e < t; e++) n[e] > 0 ? f = n[e] : n[e] = f;
	return {
		freqSeq: n,
		gateSeq: r,
		volumeSeq: i,
		noteSeq: a,
		effectLanes: s,
		laneDefs: e.effectLanes,
		staccatoSeq: o
	};
}
function Jr(e, t, n) {
	let r = {}, i = {};
	for (let e of n.slots) r[e.id] = Array(t).fill(0), i[e.id] = Array(t).fill(0);
	let { gateSeq: a } = qr(e, t), o = (t) => {
		let r = e.cells[t]?.note ?? null, i = r === null ? void 0 : Ir(n, r);
		return i && r !== null ? {
			slot: i,
			freq: Mr(i.baseNote + (r - i.note))
		} : null;
	}, s = null;
	for (let n = t - 1; n >= 0 && !s; n--) e.cells[n]?.note != null && (s = o(n));
	let c = {};
	s && (c[s.slot.id] = s.freq);
	for (let n = 0; n < t; n++) {
		e.cells[n]?.note != null && (s = o(n), s && (c[s.slot.id] = s.freq)), s && a[n] === 1 && (r[s.slot.id][n] = 1);
		for (let [e, t] of Object.entries(c)) i[e][n] = t;
	}
	return {
		slotGateSeqs: r,
		slotFreqSeqs: i
	};
}
//#endregion
//#region src/player/playbackData.ts
function Yr(e, t, n) {
	return t < 0 || n < t || n >= e.totalRows ? null : {
		...e,
		slots: e.slots.map((e) => ({
			...e,
			signals: e.signals.map((e) => e.slice(t, n + 1))
		})),
		totalRows: n - t + 1,
		rowOffset: t
	};
}
var Xr = {
	portamento: .5,
	volumeSlide: 1,
	panning: .5,
	vibratoRate: 0,
	vibratoDepth: 0,
	tremoloRate: 0,
	tremoloDepth: 0,
	staccato: 1
};
function Zr(e, t) {
	if (t.isDrumkit) {
		let n = z, r = t.drumSounds ?? 0;
		if (e in n) return 2 * r + n[e];
		let i = t.namedInletIds.indexOf(e);
		return i >= 0 ? 2 * r + 10 + i : -1;
	}
	let n = R;
	if (e in n) return n[e];
	let r = t.namedInletIds.indexOf(e);
	return r >= 0 ? 11 + r : -1;
}
function Qr(e, t, n, r) {
	let i = Array(r.channelsPerSlot);
	if (r.isDrumkit) {
		let e = r.drumSounds ?? 0;
		for (let t = 0; t < e; t++) i[t] = Array(n).fill(0), i[e + t] = Array(n).fill(0);
		let t = 2 * e;
		i[t + z.vol] = Array(n).fill(1);
		for (let [e, r] of Object.entries(z)) {
			if (e === "vol") continue;
			let a = t + r;
			i[a] = Array(n).fill(Xr[e] ?? 0);
		}
		for (let e = 0; e < r.namedInletIds.length; e++) i[t + 10 + e] = Array(n).fill(0);
	} else {
		i[R.gate] = Array(n).fill(0), i[R.freq] = Array(n).fill(0), i[R.vol] = Array(n).fill(1), i[R.staccato] = Array(n).fill(1);
		for (let [e, t] of Object.entries(R)) e === "gate" || e === "freq" || e === "vol" || e === "staccato" || (i[t] = Array(n).fill(Xr[e] ?? 0));
		for (let e = 0; e < r.namedInletIds.length; e++) i[11 + e] = Array(n).fill(0);
	}
	return {
		instId: e,
		slotIndex: t,
		signals: i,
		drumGateCount: r.isDrumkit ? r.drumSounds ?? 0 : 0
	};
}
function $r(e) {
	return Qr(e.instId, 0, 1, e).signals.map((e) => e[0]);
}
function ei(e, t, n, r, i, a) {
	let { freqSeq: o, gateSeq: s, volumeSeq: c, staccatoSeq: l } = r;
	for (let t = 0; t < a; t++) {
		let n = i + t;
		e.signals[R.gate][n] = s[t], e.signals[R.freq][n] = o[t], e.signals[R.vol][n] = c[t], e.signals[R.staccato][n] = l[t];
	}
	for (let r of n.effectLanes) {
		let o = Zr(r.type, t);
		if (!(o < 0 || o >= e.signals.length)) for (let t = 0; t < a; t++) {
			let a = n.cells[t]?.effectLanes[r.id];
			a != null && (e.signals[o][i + t] = a);
		}
	}
}
function ti(e, t, n) {
	let r = e.entities.patterns[t], i = /* @__PURE__ */ new Map();
	if (!r) return i;
	let a = n ?? (() => {
		let t = /* @__PURE__ */ new Map();
		for (let n of Wr(e)) t.set(n.instId, n);
		return t;
	})(), o = /* @__PURE__ */ new Map();
	for (let t of r.trackIds) {
		let n = e.entities.tracks[t];
		if (!n || !e.entities.instruments[n.instrumentId]) continue;
		let r = a.get(n.instrumentId);
		if (!r) continue;
		let s = o.get(n.instrumentId) ?? 0;
		o.set(n.instrumentId, s + 1), !(s >= r.slotCount) && i.set(t, s);
	}
	return i;
}
function ni(e, t, n, r) {
	let i = (t - 1 + r) % r, a = e.drumGateCount > 0 ? e.drumGateCount : 1;
	for (let r = 0; r < a; r++) {
		let a = e.drumGateCount > 0 ? r : R.gate, o = e.drumGateCount > 0 ? e.drumGateCount + r : R.freq;
		if (e.signals[a][i] === 1) for (let r = t; r < t + n; r++) e.signals[a][r] = 1, e.signals[o][r] = e.signals[o][i];
	}
}
function ri(e, t, n) {
	let r = (t - 1 + n) % n, i = e.drumGateCount;
	if (!(i > 0 ? Array.from({ length: i }, (e, t) => t) : [R.gate]).some((n) => e.signals[n][r] === 1 && e.signals[n][t] === 1)) return;
	let a = e.signals[i > 0 ? 2 * i + z.staccato : R.staccato];
	a && a[r] >= 1 && (a[r] = .85);
}
function ii(e, t, n) {
	let r = Wr(e, n), i = t.reduce((t, n) => t + (e.entities.patterns[n.patternId]?.length ?? 0), 0), a = /* @__PURE__ */ new Map();
	for (let e of r) a.set(e.instId, e);
	let o = [];
	for (let e of r) for (let t = 0; t < e.slotCount; t++) o.push(Qr(e.instId, t, i, e));
	let s = [], c = [];
	for (let n of t) {
		let t = e.entities.patterns[n.patternId];
		if (!t) continue;
		let r = ti(e, n.patternId, a);
		for (let [i, l] of r) {
			let r = e.entities.tracks[i];
			if (!r) continue;
			let u = e.entities.instruments[r.instrumentId];
			if (!u) continue;
			let d = a.get(r.instrumentId);
			if (!d) continue;
			let f = o.find((e) => e.instId === d.instId && e.slotIndex === l);
			if (!f) continue;
			let p = qr(r, t.length), m = Kr(r, t.length);
			if (m > 0 && s.push({
				slot: f,
				startRow: n.startRow,
				rows: m
			}), r.cells[0]?.note != null && c.push({
				slot: f,
				startRow: n.startRow
			}), d.isDrumkit && u.kind === "drumkit") {
				let { slotGateSeqs: e, slotFreqSeqs: i } = Jr(r, t.length, u), a = d.drumSounds ?? 0, o = 2 * a;
				for (let r = 0; r < a; r++) {
					let o = u.slots[r];
					if (!o) continue;
					let s = e[o.id], c = i[o.id];
					for (let e = 0; e < t.length; e++) s && (f.signals[r][n.startRow + e] = s[e]), c && (f.signals[a + r][n.startRow + e] = c[e]);
				}
				for (let e = 0; e < t.length; e++) {
					let t = n.startRow + e, r = o + z.vol;
					r < f.signals.length && (f.signals[r][t] = p.volumeSeq[e]);
					let i = o + z.staccato;
					i < f.signals.length && (f.signals[i][t] = p.staccatoSeq[e]);
				}
				for (let e of r.effectLanes) {
					let i = Zr(e.type, d);
					if (!(i < 0 || i >= f.signals.length)) for (let a = 0; a < t.length; a++) {
						let t = r.cells[a]?.effectLanes[e.id];
						t != null && (f.signals[i][n.startRow + a] = t);
					}
				}
			} else ei(f, d, r, p, n.startRow, t.length);
		}
	}
	for (let e of [...s.filter((e) => e.startRow > 0), ...s.filter((e) => e.startRow === 0)]) ni(e.slot, e.startRow, e.rows, i);
	for (let e of c) ri(e.slot, e.startRow, i);
	if (o.length > 0) {
		let t = o.map((t) => {
			let n = e.entities.instruments[t.instId]?.name ?? t.instId.slice(0, 8), r = t.signals[0]?.findIndex((e) => e !== 0), i = r != null && r >= 0 ? t.signals[0]?.lastIndexOf(1) : void 0;
			return `${n} slot ${t.slotIndex}: gate rows ${r ?? "none"}${i != null && i !== r ? `-${i}` : ""}${t.drumGateCount > 0 ? ` (dk ${t.drumGateCount})` : ""}`;
		});
		console.log("[playbackData]", t.join("\n  "), `\n  totalRows: ${i}`);
	}
	return {
		slots: o,
		totalRows: i,
		arrangement: [...t]
	};
}
//#endregion
//#region src/player/liveSlot.ts
function ai(e, t, n, r, i) {
	let a = $r(e), o = Math.max(0, Math.min(1, r / 127));
	if (e.isDrumkit) {
		if (t.kind !== "drumkit") return null;
		let r = e.drumSounds ?? 0, s = Ir(t, n), c = s ? t.slots.findIndex((e) => e.id === s.id) : -1;
		return !s || c < 0 || c >= r ? null : (a[c] = +!!i, a[r + c] = Mr(s.baseNote + (n - s.note)), a[2 * r + z.vol] = o, {
			gates: r,
			values: a
		});
	}
	return a[R.gate] = +!!i, a[R.freq] = Mr(n), a[R.vol] = o, {
		gates: 1,
		values: a
	};
}
function oi(e, t, n, r) {
	if (e <= 0) return -1;
	if (r !== void 0 && r >= 0 && r < e) return r;
	for (let r = 1; r <= e; r++) {
		let i = (n + r) % e;
		if (!t.includes(i)) return i;
	}
	return t[0] ?? 0;
}
function si(e, t) {
	return {
		liveVoiceInstIds: e && t ? [t] : [],
		ensureSlotInstId: e ? null : t
	};
}
//#endregion
//#region src/audio/liveNotes.ts
var ci = class {
	host;
	context;
	held = /* @__PURE__ */ new Map();
	slotOwner = /* @__PURE__ */ new Map();
	lastSlot = /* @__PURE__ */ new Map();
	layoutCache = null;
	constructor(e, t) {
		this.host = e, this.context = t;
	}
	noteOn(e, t, n = 127, r) {
		let { doc: i, freePlay: a, selectedInstrumentId: o } = this.context(), s = i.entities.instruments[e];
		if (!s) return;
		let c = `${e}:${t}`;
		if (this.release(c), a && e === o) {
			(s.kind === "drumkit" ? this.host.voicePool(e, 1, s) : this.host.voicePool(e, Fr(s))).noteOn(t, n), this.held.set(c, {
				instId: e,
				note: t,
				velocity: n,
				slot: -1
			});
			return;
		}
		let l = this.layouts(i, si(a, o).ensureSlotInstId), u = l.find((t) => t.instId === e);
		if (!u) return;
		let d = [...this.held.values()].filter((t) => t.instId === e && t.slot >= 0).map((t) => t.slot - Gr(l, e, 0)), f = oi(u.slotCount, d, this.lastSlot.get(e) ?? -1, r);
		if (f < 0) return;
		let p = ai(u, s, t, n, !0);
		if (!p) return;
		let m = Gr(l, e, f), h = this.slotOwner.get(m);
		h && this.held.delete(h), this.slotOwner.set(m, c), this.lastSlot.set(e, f), this.held.set(c, {
			instId: e,
			note: t,
			velocity: n,
			slot: m
		}), this.host.paramRefs.setValue("transport:playing", 1), this.host.sendTxSeqLive({
			type: "live",
			slot: m,
			...p
		});
	}
	noteOff(e, t) {
		this.release(`${e}:${t}`);
	}
	reset() {
		this.held.clear(), this.slotOwner.clear();
	}
	release(e) {
		let t = this.held.get(e);
		if (!t) return;
		if (this.held.delete(e), t.slot < 0) {
			this.host.voicePool(t.instId).noteOff(t.note);
			return;
		}
		if (this.slotOwner.get(t.slot) !== e) return;
		this.slotOwner.delete(t.slot);
		let { doc: n } = this.context(), r = n.entities.instruments[t.instId], i = this.layoutCache?.layouts.find((e) => e.instId === t.instId), a = r && i ? ai(i, r, t.note, t.velocity, !1) : null;
		a && this.host.sendTxSeqLive({
			type: "live",
			slot: t.slot,
			...a
		});
	}
	layouts(e, t) {
		let n = this.layoutCache;
		if (n && n.doc === e && n.ensure === t) return n.layouts;
		let r = Wr(e, t);
		return this.layoutCache = {
			doc: e,
			ensure: t,
			layouts: r
		}, r;
	}
}, li = 1500, ui = .004, di = class {
	ctx = null;
	core = null;
	analysers = null;
	ready = !1;
	starting = null;
	ctxStartTime = 0;
	renderBusy = !1;
	pendingGraph = null;
	settlePromise = null;
	settleResolve = null;
	paramRefs = new Ar();
	ccBindings = new jr();
	onReady = null;
	onVoicePoolCreated = null;
	skipNextRecompile = !1;
	samplePreviewBuffers = /* @__PURE__ */ new Map();
	previewSources = /* @__PURE__ */ new Set();
	heldPreviews = /* @__PURE__ */ new Map();
	voicePools = /* @__PURE__ */ new Map();
	live;
	externalCtx;
	destination;
	constructor(e) {
		this.live = new ci(this, e.liveContext), this.externalCtx = e.audioContext ?? null, this.destination = e.destination ?? null;
	}
	txSeqSetter = null;
	voicePool(e, t, n) {
		let r = this.voicePools.get(e);
		return r && !n && t !== void 0 && r.size !== t && (r.panic(), r = void 0), r || (r = new zr(this.paramRefs, e, t ?? 1), this.voicePools.set(e, r), this.onVoicePoolCreated?.()), n && r.setKit(n), r;
	}
	panic() {
		for (let e of this.voicePools.values()) e.panic();
		this.paramRefs.panic(), this.live.reset(), this.sendTxSeqLive({ type: "liveClear" });
	}
	sendTxSeqLive(e) {
		this.setTxSeqProps({ cmd: e });
	}
	setTxSeqProps(e) {
		if (this.txSeqSetter) try {
			this.txSeqSetter(e).catch((e) => console.error("[host] txSeq update failed:", e));
		} catch (e) {
			console.warn("[host] txSeq not mounted:", e);
		}
	}
	async playSamplePreview(e, t, n = 1, r) {
		if (await this.start(), !this.ctx) return;
		let i = this.samplePreviewBuffers.get(e);
		if (!i) {
			try {
				i = await this.ctx.decodeAudioData(t.slice(0));
			} catch (e) {
				console.error("[host] sample preview decode failed:", e);
				return;
			}
			this.samplePreviewBuffers.set(e, i);
		}
		this.playPreviewBuffer(i, n, r);
	}
	async playPcmNote(e, t, n = 1, r) {
		await this.start();
		let i = this.pcmBuffer(e, t);
		i && this.playPreviewBuffer(i, n, r);
	}
	replaceHeldPreviews(e, t) {
		let n = this.heldPreviews.size > 0 ? this.pcmBuffer(e, t) : null;
		if (!n || !this.ctx) return;
		let r = this.ctx.currentTime;
		for (let [e, t] of [...this.heldPreviews]) {
			t.amp.gain.setTargetAtTime(0, r, ui);
			try {
				t.src.stop(r + ui * 6);
			} catch {}
			this.heldPreviews.delete(e), this.playPreviewBuffer(n, t.src.playbackRate.value, e);
		}
	}
	playPreviewBuffer(e, t, n) {
		if (!this.ctx) return;
		let r = this.ctx.createBufferSource();
		if (r.buffer = e, r.playbackRate.value = t, n === void 0) r.connect(this.ctx.destination);
		else {
			this.stopSamplePreview(n), r.loop = !0;
			let e = this.ctx.createGain();
			e.gain.setValueAtTime(0, this.ctx.currentTime), e.gain.setTargetAtTime(1, this.ctx.currentTime, .003), r.connect(e).connect(this.ctx.destination), this.heldPreviews.set(n, {
				src: r,
				amp: e
			});
		}
		r.onended = () => {
			this.previewSources.delete(r), r.disconnect();
		}, this.previewSources.add(r), r.start();
	}
	stopSamplePreview(e) {
		let t = this.heldPreviews.get(e);
		if (!t || !this.ctx) return;
		this.heldPreviews.delete(e);
		let n = this.ctx.currentTime;
		t.amp.gain.setTargetAtTime(0, n, .01);
		try {
			t.src.stop(n + .08);
		} catch {}
	}
	stopSamplePreviews() {
		for (let e of this.previewSources) {
			e.onended = null;
			try {
				e.stop();
			} catch {}
			e.disconnect();
		}
		this.previewSources.clear(), this.heldPreviews.clear(), this.pcmPreview?.amp.disconnect(), this.pcmPreview = null;
	}
	async playPcmPreview(e, t, n = 0, r) {
		await this.start();
		let i = this.pcmBuffer(e, t);
		i && this.startPcmPreview(i, Math.max(0, Math.min(n, i.duration)), r, !1);
	}
	replacePcmPreview(e, t) {
		let n = this.pcmPreview;
		if (!n || !this.ctx || !this.previewSources.has(n.src)) return;
		let r = this.pcmBuffer(e, t);
		if (!r) return;
		let i = n.offset + (this.ctx.currentTime - n.startedAt);
		if (n.loop && i >= n.loop.end && (i = n.loop.start + (i - n.loop.start) % (n.loop.end - n.loop.start)), i >= r.duration) return;
		let a = this.ctx.currentTime;
		n.amp.gain.setTargetAtTime(0, a, ui);
		try {
			n.src.stop(a + ui * 6);
		} catch {}
		this.startPcmPreview(r, i, n.loop, !0);
	}
	pcmPreview = null;
	pcmBuffer(e, t) {
		let n = Array.isArray(e) ? e : [e], r = n[0]?.length ?? 0;
		if (!this.ctx || r === 0) return null;
		let i = this.ctx.createBuffer(n.length, r, t);
		return n.forEach((e, t) => i.copyToChannel(e, t)), i;
	}
	startPcmPreview(e, t, n, r) {
		let i = this.ctx;
		if (!i) return;
		let a = i.createBufferSource();
		a.buffer = e, n && n.end > n.start && (a.loop = !0, a.loopStart = n.start, a.loopEnd = Math.min(n.end, e.duration));
		let o = i.createGain();
		r && (o.gain.setValueAtTime(0, i.currentTime), o.gain.setTargetAtTime(1, i.currentTime, ui)), a.connect(o).connect(i.destination), a.onended = () => {
			this.previewSources.delete(a), this.pcmPreview?.src === a && (this.pcmPreview = null), o.disconnect();
		}, this.previewSources.add(a), this.pcmPreview = {
			src: a,
			amp: o,
			startedAt: i.currentTime,
			offset: t,
			loop: a.loop ? {
				start: a.loopStart,
				end: a.loopEnd
			} : void 0
		}, a.start(0, t);
	}
	playStartTime = 0;
	playStartRow = 0;
	get currentTime() {
		return this.ctx?.currentTime ?? 0;
	}
	outputTime(e = performance.now()) {
		let t = this.ctx;
		if (!t) return 0;
		let n = t.getOutputTimestamp?.();
		return n?.contextTime && n.performanceTime ? n.contextTime + (e - n.performanceTime) / 1e3 : t.currentTime - (t.outputLatency || t.baseLatency || 0);
	}
	get outputAgeMs() {
		return this.ctx ? (this.ctx.currentTime - this.ctxStartTime) * 1e3 : 0;
	}
	get isReady() {
		return this.ready;
	}
	getLevels() {
		if (!this.analysers) return [0, 0];
		let [e, t] = this.analysers, n = new Float32Array(e.fftSize), r = new Float32Array(t.fftSize);
		e.getFloatTimeDomainData(n), t.getFloatTimeDomainData(r);
		let i = 0, a = 0;
		for (let e = 0; e < n.length; e++) i += n[e] * n[e], a += r[e] * r[e];
		return [Math.sqrt(i / n.length), Math.sqrt(a / r.length)];
	}
	getWaveforms() {
		if (!this.analysers) return [/* @__PURE__ */ new Float32Array(), /* @__PURE__ */ new Float32Array()];
		let [e, t] = this.analysers, n = new Float32Array(e.fftSize), r = new Float32Array(t.fftSize);
		return e.getFloatTimeDomainData(n), t.getFloatTimeDomainData(r), [n, r];
	}
	async start() {
		if (this.ready) {
			await this.ctx?.resume();
			return;
		}
		return this.starting ? this.starting : (this.starting = (async () => {
			this.ctx = this.externalCtx ?? new AudioContext(), this.core = new kr(), this.paramRefs.attach(this.core), this.paramRefs, this.ccBindings.attach(this.paramRefs);
			let e = await this.core.initialize(this.ctx, {
				numberOfInputs: 0,
				numberOfOutputs: 1,
				outputChannelCount: [2]
			});
			e.connect(this.destination ?? this.ctx.destination);
			let t = this.ctx.createChannelSplitter(2);
			e.connect(t);
			let n = this.ctx.createAnalyser(), r = this.ctx.createAnalyser();
			n.fftSize = 2048, r.fftSize = 2048, t.connect(n, 0), t.connect(r, 1), this.analysers = [n, r];
			let i = this.ctx.createBuffer(1, this.ctx.sampleRate, this.ctx.sampleRate), a = i.getChannelData(0);
			for (let e = 0; e < a.length; e++) a[e] = (Math.random() * 2 - 1) * 1e-4;
			let o = this.ctx.createBufferSource();
			o.buffer = i, o.loop = !0, o.connect(this.ctx.destination), o.start(), await this.ctx.resume(), this.ctxStartTime = this.ctx.currentTime, this.ready = !0, this.starting = null, this.onReady?.();
		})(), this.starting = this.starting.catch((e) => {
			throw console.error("[host] start failed:", e), this.starting = null, e;
		}), this.starting);
	}
	render(e) {
		if (!this.ready || !this.core) return Promise.resolve();
		if (this.renderBusy) return this.pendingGraph = e, this.settlePromise ?? Promise.resolve();
		this.renderBusy = !0, this.pendingGraph = null, this.settlePromise = new Promise((e) => {
			this.settleResolve = e;
		});
		let t = () => {
			this.renderBusy = !1, this.paramRefs.flushPending(), console.log("[host] render complete");
			let e = this.pendingGraph;
			this.pendingGraph = null;
			let t = this.settleResolve;
			this.settleResolve = null, this.settlePromise = null, e ? this.render(e).then(() => t?.()) : t?.();
		}, n = () => {
			try {
				this.core.render(I.mul(e.left, I.const({
					key: "ch:l",
					value: 1
				})), I.mul(e.right, I.const({
					key: "ch:r",
					value: 1
				}))).then(t).catch((e) => {
					if (console.error("[host] Elementary render error:", e), e && typeof e == "object") {
						let t = e;
						console.error("  message:", t.message), console.error("  node property:", t.property), console.error("  node kind:", t.kind), console.error("  value:", t.value);
					}
					t();
				});
			} catch (e) {
				console.error("[host] Elementary render sync error:", e), t();
			}
		}, r = this.settlePromise;
		return n(), r;
	}
	async updateVfs(e) {
		if (this.core) try {
			await this.core.updateVirtualFileSystem(e);
		} catch (e) {
			console.error("Elementary VFS update error:", e);
		}
	}
	async pruneVfs() {
		if (this.core) try {
			await this.core.pruneVirtualFileSystem();
		} catch (e) {
			console.error("Elementary VFS prune error:", e);
		}
	}
}, fi = null;
function pi() {
	return (!fi || fi.state === "closed") && (fi = new AudioContext()), fi;
}
async function mi(e, t, n) {
	let r = {}, i = /* @__PURE__ */ new Set(), a = {}, o = {}, s = await Promise.all(t.map((e) => n(e.hash)));
	for (let [e, n] of t.entries()) {
		let t = s[e];
		if (!t) {
			console.warn(`Sample "${n.name}" (hash ${n.hash.slice(0, 8)}…) not found in storage — skipping VFS load`);
			continue;
		}
		try {
			let e = await pi().decodeAudioData(t.slice(0)), s = e.getChannelData(0), c = 0;
			for (let e = 0; e < s.length; e++) c += Math.abs(s[e]);
			if (a[n.hash] = c, o[n.hash] = {
				frames: e.length,
				sampleRate: e.sampleRate
			}, e.numberOfChannels === 1) r[n.hash] = new Float32Array(s);
			else {
				let t = [new Float32Array(s)];
				for (let n = 1; n < e.numberOfChannels; n++) t.push(new Float32Array(e.getChannelData(n)));
				r[n.hash] = t;
			}
			i.add(n.hash);
		} catch (e) {
			console.error("Failed to decode sample for VFS:", n.name, e);
		}
	}
	return Object.keys(r).length > 0 && await e.updateVfs(r), {
		loaded: i,
		l1Sums: a,
		decodedSizes: o
	};
}
//#endregion
//#region src/engine/samplePlay.ts
function hi(e) {
	return I.max(I.sub(e, I.z(e)), I.const({ value: 0 }));
}
function gi(e, t, n, r, i, a, o) {
	let s = hi(r), c = I.accum(r, s), l = I.and(I.le(I.const({ value: 0 }), c), I.le(c, I.const({ value: a / o + 128 }))), u = I.accum(I.mul(i, l), s);
	return I.mc.table({
		key: `${e}:tbl`,
		path: t,
		channels: n
	}, u);
}
function _i(e, t, n, r, i, a) {
	let o = I.mul(r, I.const({ value: a / i })), s = I.phasor(o);
	return I.mc.table({
		key: `${e}:tbl`,
		path: t,
		channels: n
	}, s);
}
//#endregion
//#region src/domain/moduleDefs.ts
var vi = [
	"saw",
	"square",
	"triangle",
	"sine",
	"pulse"
], yi = [
	"sine",
	"saw",
	"square",
	"triangle",
	"pulse"
], bi = [
	"sine",
	"triangle",
	"saw",
	"square",
	"pulse"
], xi = [
	"lowpass",
	"highpass",
	"bandpass"
], Si = ["add", "multiply"], Ci = 4096, wi = [
	"auto",
	"whole",
	"256",
	"512",
	"1024",
	"2048",
	"4096"
], Ti = {
	note: {
		type: "note",
		label: "Note",
		inlets: [],
		outlets: ["freq"],
		params: [],
		singleton: !0
	},
	gate: {
		type: "gate",
		label: "Gate",
		inlets: [],
		outlets: ["gate"],
		params: [],
		singleton: !0
	},
	volume: {
		type: "volume",
		label: "Volume",
		inlets: [],
		outlets: ["vol"],
		params: [],
		singleton: !0
	},
	eff: {
		type: "eff",
		group: "sources",
		label: "Eff In",
		inlets: [],
		outlets: ["val"],
		params: [{
			key: "cc",
			label: "CC",
			min: 0,
			max: 127,
			default: 0,
			step: 1,
			structural: !0
		}, {
			key: "default",
			label: "Default",
			min: 0,
			max: 1,
			default: 0,
			step: .01
		}]
	},
	midicc: {
		type: "midicc",
		group: "sources",
		label: "MIDI CC",
		inlets: [],
		outlets: ["val"],
		params: [{
			key: "cc",
			label: "CC",
			min: 0,
			max: 127,
			default: 1,
			step: 1,
			structural: !0
		}]
	},
	osc: {
		type: "osc",
		group: "generators",
		label: "Oscillator",
		inlets: ["freq", "fm"],
		outlets: ["out"],
		params: [
			{
				key: "waveform",
				label: "Wave",
				min: 0,
				max: 4,
				default: 0,
				step: 1,
				enumLabels: [...vi],
				structural: !0
			},
			{
				key: "detune",
				label: "Detune (st)",
				min: -24,
				max: 24,
				default: 0,
				step: 1,
				structural: !0
			},
			{
				key: "finetune",
				label: "Fine (ct)",
				min: -100,
				max: 100,
				default: 0,
				step: 1,
				structural: !0
			},
			{
				key: "pulseWidth",
				label: "Width",
				min: .05,
				max: .95,
				default: .5,
				step: .01
			},
			{
				key: "fmDepth",
				label: "FM depth",
				min: 0,
				max: 8,
				default: 1,
				step: .01
			},
			{
				key: "gain",
				label: "Level",
				min: 0,
				max: 2,
				default: 1,
				step: .01
			}
		]
	},
	dxop: {
		type: "dxop",
		group: "generators",
		label: "DX Operator",
		inlets: ["freq", "mod"],
		outlets: ["out"],
		params: [
			{
				key: "freqMode",
				label: "Freq mode",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["ratio", "fixed"],
				structural: !0
			},
			{
				key: "ratio",
				label: "Ratio",
				min: .5,
				max: 16,
				default: 1,
				step: .01
			},
			{
				key: "fixedHz",
				label: "Fixed (Hz)",
				min: 1,
				max: 1e3,
				default: 440,
				step: 1
			},
			{
				key: "waveform",
				label: "Wave",
				min: 0,
				max: 4,
				default: 0,
				step: 1,
				enumLabels: [...yi],
				structural: !0
			},
			{
				key: "pulseWidth",
				label: "Width",
				min: .05,
				max: .95,
				default: .5,
				step: .01
			},
			{
				key: "feedback",
				label: "Feedback",
				min: 0,
				max: .99,
				default: 0,
				step: .01
			},
			{
				key: "level",
				label: "Level",
				min: 0,
				max: 2,
				default: 1,
				step: .01
			}
		]
	},
	noise: {
		type: "noise",
		group: "generators",
		label: "Noise",
		inlets: [],
		outlets: ["out"],
		params: [{
			key: "mode",
			label: "Mode",
			min: 0,
			max: 1,
			default: 0,
			step: 1,
			enumLabels: ["normal", "pink"]
		}, {
			key: "level",
			label: "Level",
			min: 0,
			max: 2,
			default: 1,
			step: .01
		}]
	},
	filter: {
		type: "filter",
		group: "shaping",
		label: "Filter",
		inlets: ["in", "cutoffMod"],
		outlets: ["out"],
		params: [
			{
				key: "bypass",
				label: "Bypass",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["on", "off"],
				structural: !0
			},
			{
				key: "mode",
				label: "Mode",
				min: 0,
				max: 2,
				default: 0,
				step: 1,
				enumLabels: [...xi]
			},
			{
				key: "cutoff",
				label: "Cutoff (Hz)",
				min: 20,
				max: 18e3,
				default: 1200,
				step: 1
			},
			{
				key: "q",
				label: "Resonance",
				min: .1,
				max: 12,
				default: .7,
				step: .1
			},
			{
				key: "modDepth",
				label: "Mod depth",
				min: 0,
				max: 1,
				default: .5,
				step: .01,
				showScale: !0
			},
			{
				key: "modDepthScale",
				label: "×",
				min: 1,
				max: 99,
				default: 1,
				step: 1
			}
		]
	},
	adsr: {
		type: "adsr",
		group: "shaping",
		label: "ADSR",
		inlets: ["gate"],
		outlets: ["env"],
		params: [
			{
				key: "attack",
				label: "Attack (s)",
				min: .001,
				max: 2,
				default: .005,
				step: .001
			},
			{
				key: "decay",
				label: "Decay (s)",
				min: .001,
				max: 2,
				default: .12,
				step: .001
			},
			{
				key: "sustain",
				label: "Sustain",
				min: 0,
				max: 1,
				default: .7,
				step: .01
			},
			{
				key: "release",
				label: "Release (s)",
				min: .001,
				max: 3,
				default: .25,
				step: .001
			}
		]
	},
	gain: {
		type: "gain",
		group: "shaping",
		label: "Gain",
		inlets: ["in", "mod"],
		outlets: ["out"],
		params: [{
			key: "bypass",
			label: "Bypass",
			min: 0,
			max: 1,
			default: 0,
			step: 1,
			enumLabels: ["on", "off"],
			structural: !0
		}, {
			key: "level",
			label: "Level",
			min: 0,
			max: 2,
			default: .8,
			step: .01
		}]
	},
	comp: {
		type: "comp",
		group: "shaping",
		label: "Compressor",
		inlets: ["in"],
		outlets: ["out"],
		params: [
			{
				key: "bypass",
				label: "Bypass",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["on", "off"],
				structural: !0
			},
			{
				key: "mode",
				label: "Mode",
				min: 0,
				max: 1,
				default: 1,
				step: 1,
				enumLabels: ["hard", "soft"]
			},
			{
				key: "threshold",
				label: "Thresh (dB)",
				min: -60,
				max: 0,
				default: -20,
				step: 1
			},
			{
				key: "ratio",
				label: "Ratio",
				min: 1,
				max: 20,
				default: 4,
				step: 1
			},
			{
				key: "attack",
				label: "Attack (ms)",
				min: 1,
				max: 100,
				default: 10,
				step: 1
			},
			{
				key: "release",
				label: "Release (ms)",
				min: 10,
				max: 1e3,
				default: 100,
				step: 1
			},
			{
				key: "knee",
				label: "Knee (dB)",
				min: 0,
				max: 24,
				default: 6,
				step: 1
			},
			{
				key: "makeup",
				label: "Makeup (dB)",
				min: 0,
				max: 24,
				default: 0,
				step: 1
			}
		]
	},
	mix: {
		type: "mix",
		group: "shaping",
		label: "Mix",
		inlets: [
			"a",
			"b",
			"c",
			"d"
		],
		outlets: ["out"],
		params: [{
			key: "bypass",
			label: "Bypass",
			min: 0,
			max: 1,
			default: 0,
			step: 1,
			enumLabels: ["on", "off"],
			structural: !0
		}, {
			key: "mode",
			label: "Mode",
			min: 0,
			max: 1,
			default: 0,
			step: 1,
			enumLabels: [...Si]
		}]
	},
	lfo: {
		type: "lfo",
		group: "generators",
		label: "LFO",
		inlets: ["gate"],
		outlets: ["out"],
		params: [
			{
				key: "waveform",
				label: "Wave",
				min: 0,
				max: 4,
				default: 0,
				step: 1,
				enumLabels: [...bi]
			},
			{
				key: "rate",
				label: "Rate (Hz)",
				min: .1,
				max: 50,
				default: 4,
				step: .1
			},
			{
				key: "amount",
				label: "Amount",
				min: 0,
				max: 1,
				default: 1,
				step: .01,
				showScale: !0
			},
			{
				key: "amountScale",
				label: "×",
				min: 1,
				max: 99,
				default: 1,
				step: 1
			},
			{
				key: "pulseWidth",
				label: "Width",
				min: .05,
				max: .95,
				default: .5,
				step: .01
			},
			{
				key: "sync",
				label: "Sync",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["free", "gate"]
			}
		]
	},
	tanh: {
		type: "tanh",
		group: "distortion",
		label: "Saturator",
		inlets: ["in", "drive"],
		outlets: ["out"],
		params: [
			{
				key: "bypass",
				label: "Bypass",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["on", "off"],
				structural: !0
			},
			{
				key: "drive",
				label: "Drive",
				min: .5,
				max: 40,
				default: 4,
				step: .5
			},
			{
				key: "level",
				label: "Level",
				min: 0,
				max: 2,
				default: 1,
				step: .01
			}
		]
	},
	clip: {
		type: "clip",
		group: "distortion",
		label: "Hard Clip",
		inlets: ["in", "drive"],
		outlets: ["out"],
		params: [
			{
				key: "bypass",
				label: "Bypass",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["on", "off"],
				structural: !0
			},
			{
				key: "drive",
				label: "Drive",
				min: .5,
				max: 40,
				default: 4,
				step: .5
			},
			{
				key: "threshold",
				label: "Thresh",
				min: .05,
				max: 1,
				default: .7,
				step: .01
			},
			{
				key: "level",
				label: "Level",
				min: 0,
				max: 2,
				default: .7,
				step: .01
			}
		]
	},
	fold: {
		type: "fold",
		group: "distortion",
		label: "Wave Folder",
		inlets: ["in", "drive"],
		outlets: ["out"],
		params: [
			{
				key: "bypass",
				label: "Bypass",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["on", "off"],
				structural: !0
			},
			{
				key: "drive",
				label: "Drive",
				min: .5,
				max: 30,
				default: 3,
				step: .5
			},
			{
				key: "threshold",
				label: "Thresh",
				min: .05,
				max: 1,
				default: .35,
				step: .01
			},
			{
				key: "level",
				label: "Level",
				min: 0,
				max: 2,
				default: .7,
				step: .01
			}
		]
	},
	crush: {
		type: "crush",
		group: "distortion",
		label: "Bit Crusher",
		inlets: ["in", "bits"],
		outlets: ["out"],
		params: [
			{
				key: "bypass",
				label: "Bypass",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["on", "off"],
				structural: !0
			},
			{
				key: "bits",
				label: "Bits",
				min: 1,
				max: 16,
				default: 4,
				step: 1
			},
			{
				key: "level",
				label: "Level",
				min: 0,
				max: 2,
				default: 1,
				step: .01
			}
		]
	},
	delay: {
		type: "delay",
		group: "time",
		label: "Delay",
		inlets: ["in"],
		outlets: ["out"],
		params: [
			{
				key: "bypass",
				label: "Bypass",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["on", "off"],
				structural: !0
			},
			{
				key: "time",
				label: "Time (ticks)",
				min: .25,
				max: 16,
				default: 1.25,
				step: .25
			},
			{
				key: "mix",
				label: "Mix",
				min: 0,
				max: 1,
				default: .5,
				step: .01
			}
		]
	},
	echo: {
		type: "echo",
		group: "time",
		label: "Echo",
		inlets: ["in"],
		outlets: ["out"],
		params: [
			{
				key: "bypass",
				label: "Bypass",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["on", "off"],
				structural: !0
			},
			{
				key: "time",
				label: "Time (ticks)",
				min: .25,
				max: 16,
				default: 1.25,
				step: .25
			},
			{
				key: "feedback",
				label: "Feedback",
				min: 0,
				max: .95,
				default: .25,
				step: .01
			},
			{
				key: "mix",
				label: "Mix",
				min: 0,
				max: 1,
				default: .5,
				step: .01
			}
		]
	},
	reverb: {
		type: "reverb",
		group: "time",
		label: "Reverb",
		inlets: ["in", "inR"],
		outlets: ["outL", "outR"],
		params: [
			{
				key: "bypass",
				label: "Bypass",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["on", "off"],
				structural: !0
			},
			{
				key: "roomSize",
				label: "Room",
				min: .1,
				max: 1,
				default: .5,
				step: .01
			},
			{
				key: "feedback",
				label: "Feedback",
				min: 0,
				max: .95,
				default: .45,
				step: .01
			},
			{
				key: "damping",
				label: "Damping",
				min: 0,
				max: 1,
				default: .5,
				step: .01
			},
			{
				key: "stereoWidth",
				label: "Width",
				min: 0,
				max: 1,
				default: .6,
				step: .01
			},
			{
				key: "mix",
				label: "Mix",
				min: 0,
				max: 1,
				default: .35,
				step: .01
			}
		]
	},
	conv: {
		type: "conv",
		group: "time",
		label: "Convolution",
		samplePicker: "IR Sample",
		inlets: ["in", "inR"],
		outlets: [
			"out",
			"outL",
			"outR"
		],
		params: [
			{
				key: "bypass",
				label: "Bypass",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["on", "off"],
				structural: !0
			},
			{
				key: "mix",
				label: "Mix",
				min: 0,
				max: 1,
				default: .5,
				step: .01
			},
			{
				key: "gain",
				label: "Gain",
				min: 0,
				max: 32,
				default: 1,
				step: .01
			},
			{
				key: "width",
				label: "Width",
				min: 0,
				max: 2,
				default: 1,
				step: .01
			}
		]
	},
	delayS: {
		type: "delayS",
		group: "time",
		label: "Stereo Delay",
		inlets: ["in", "inR"],
		outlets: ["outL", "outR"],
		params: [
			{
				key: "bypass",
				label: "Bypass",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["on", "off"],
				structural: !0
			},
			{
				key: "time",
				label: "Time (ticks)",
				min: .25,
				max: 16,
				default: 1.25,
				step: .25
			},
			{
				key: "mix",
				label: "Mix",
				min: 0,
				max: 1,
				default: .5,
				step: .01
			},
			{
				key: "pingpong",
				label: "Ping-Pong",
				min: 0,
				max: 1,
				default: 0,
				step: .01
			}
		]
	},
	echoS: {
		type: "echoS",
		group: "time",
		label: "Stereo Echo",
		inlets: ["in", "inR"],
		outlets: ["outL", "outR"],
		params: [
			{
				key: "bypass",
				label: "Bypass",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["on", "off"],
				structural: !0
			},
			{
				key: "time",
				label: "Time (ticks)",
				min: .25,
				max: 16,
				default: 1.25,
				step: .25
			},
			{
				key: "feedback",
				label: "Feedback",
				min: 0,
				max: .95,
				default: .25,
				step: .01
			},
			{
				key: "mix",
				label: "Mix",
				min: 0,
				max: 1,
				default: .5,
				step: .01
			},
			{
				key: "pingpong",
				label: "Ping-Pong",
				min: 0,
				max: 1,
				default: 0,
				step: .01
			}
		]
	},
	width: {
		type: "width",
		group: "shaping",
		label: "Stereo Width",
		inlets: ["in", "inR"],
		outlets: ["outL", "outR"],
		params: [{
			key: "bypass",
			label: "Bypass",
			min: 0,
			max: 1,
			default: 0,
			step: 1,
			enumLabels: ["on", "off"],
			structural: !0
		}, {
			key: "width",
			label: "Width",
			min: 0,
			max: 2,
			default: 1,
			step: .01
		}]
	},
	sample: {
		type: "sample",
		group: "generators",
		label: "Sample",
		samplePicker: "Sample",
		inlets: ["gate", "freq"],
		outlets: ["out", "outR"],
		params: [
			{
				key: "startOffset",
				label: "Start (smp)",
				min: 0,
				max: 1e6,
				default: 0,
				step: 1
			},
			{
				key: "loop",
				label: "Loop",
				min: 0,
				max: 1,
				default: 0,
				step: 1,
				enumLabels: ["off", "on"],
				structural: !0
			},
			{
				key: "loopStart",
				label: "Loop start",
				min: 0,
				max: 1e6,
				default: 0,
				step: 1
			},
			{
				key: "pitchTrack",
				label: "Pitch track",
				min: 0,
				max: 1,
				default: 1,
				step: 1,
				enumLabels: ["off", "on"],
				structural: !0
			},
			{
				key: "playRate",
				label: "Play rate",
				min: -48,
				max: 48,
				default: 0,
				step: 1
			},
			{
				key: "finetune",
				label: "Finetune",
				min: -1,
				max: 1,
				default: 0,
				step: .01
			},
			{
				key: "gain",
				label: "Level",
				min: 0,
				max: 2,
				default: 1,
				step: .01
			}
		]
	},
	wave: {
		type: "wave",
		group: "generators",
		label: "Sample Waveform",
		samplePicker: "Sample",
		inlets: [
			"freq",
			"fm",
			"pm",
			"sync",
			"pos"
		],
		outlets: ["out", "outR"],
		params: [
			{
				key: "cycle",
				label: "Cycle",
				min: 0,
				max: wi.length - 1,
				default: 0,
				step: 1,
				enumLabels: [...wi],
				structural: !0
			},
			{
				key: "position",
				label: "Position",
				min: 0,
				max: 1,
				default: 0,
				step: .001
			},
			{
				key: "octave",
				label: "Octave",
				min: -4,
				max: 4,
				default: 0,
				step: 1,
				structural: !0
			},
			{
				key: "semi",
				label: "Coarse (st)",
				min: -24,
				max: 24,
				default: 0,
				step: 1,
				structural: !0
			},
			{
				key: "finetune",
				label: "Fine (ct)",
				min: -100,
				max: 100,
				default: 0,
				step: 1,
				structural: !0
			},
			{
				key: "fmDepth",
				label: "FM depth",
				min: 0,
				max: 8,
				default: 1,
				step: .01
			},
			{
				key: "pmDepth",
				label: "PM depth",
				min: 0,
				max: 4,
				default: 1,
				step: .01
			},
			{
				key: "phase",
				label: "Phase",
				min: 0,
				max: 1,
				default: 0,
				step: .01
			},
			{
				key: "gain",
				label: "Level",
				min: 0,
				max: 2,
				default: 1,
				step: .01
			}
		]
	},
	output: {
		type: "output",
		label: "Output",
		inlets: ["inL", "inR"],
		outlets: [],
		params: [{
			key: "gain",
			label: "Volume",
			min: 0,
			max: 2,
			default: 1,
			step: .01
		}],
		singleton: !0
	}
}, Ei = [
	"reverb",
	"delay",
	"echo",
	"delayS",
	"echoS",
	"comp",
	"width",
	"conv"
];
function Di(e) {
	return Ei.includes(e);
}
function Oi(e) {
	let t = {};
	for (let n of Ti[e].params) t[n.key] = n.default;
	return t;
}
//#endregion
//#region src/domain/sampleChoices.ts
function ki(e) {
	return e.cycleLength ? e.frames < e.cycleLength + 1 : e.frames <= Ci;
}
function Ai(e) {
	return ki(e) || e.frames <= 1048576 && (!!e.cycleLength || e.frames % 256 == 0);
}
function ji(e, t) {
	let n = wi[Math.round(t)] ?? "auto";
	return n === "whole" ? e.frames : Math.min(n === "auto" ? e.cycleLength ?? (ki(e) ? e.frames : 2048) : Number(n), e.frames);
}
function Mi(e, t) {
	return Math.max(1, Math.floor(e / t + .001));
}
function Ni(e) {
	return Object.values(e).sort((e, t) => e.name.localeCompare(t.name));
}
//#endregion
//#region src/engine/reverbFdn.ts
var Pi = 44100, Fi = (e) => Pi * e / 1e3, Ii = [
	[
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1
	],
	[
		1,
		-1,
		1,
		-1,
		1,
		-1,
		1,
		-1
	],
	[
		1,
		1,
		-1,
		-1,
		1,
		1,
		-1,
		-1
	],
	[
		1,
		-1,
		-1,
		1,
		1,
		-1,
		-1,
		1
	],
	[
		1,
		1,
		1,
		1,
		-1,
		-1,
		-1,
		-1
	],
	[
		1,
		-1,
		1,
		-1,
		-1,
		1,
		-1,
		1
	],
	[
		1,
		1,
		-1,
		-1,
		-1,
		-1,
		1,
		1
	],
	[
		1,
		-1,
		-1,
		1,
		-1,
		1,
		1,
		-1
	]
].map((e) => e.map((e) => e * Math.sqrt(1 / 8)));
function Li(e, t, n, r) {
	let i = r.map((r, i) => I.sdelay({
		key: `${e}:${t}:s${i}`,
		size: n * ((i + 1) / 8)
	}, r));
	return Ii.map((e) => I.add(...e.map((e, t) => I.mul(e, i[t]))));
}
function Ri(e, t, n, r, i, a, o) {
	let s = o.map((n, a) => I.add(n, I.mul(r, I.smooth(i, I.tapIn({ name: `${e}:${t}:fdn${a}` })))));
	return Ii.map((e) => I.add(...e.map((e, t) => I.mul(e, s[t])))).map((r, i) => {
		let o = I.mul(I.add(1, I.mul(3, n)), Fi((i + 1) * a)), s = I.add(o, I.mul(Fi(2.5), I.cycle(.1 + i * .01)));
		return I.tapOut({ name: `${e}:${t}:fdn${i}` }, I.delay({
			key: `${e}:${t}:d${i}`,
			size: Fi(750)
		}, s, 0, r));
	});
}
function zi(e, t, n, r, i, a, o, s) {
	let c = I.add(.25, I.mul(r, .6)), l = [
		o,
		s,
		I.mul(.5, I.add(o, s)),
		I.mul(.5, I.sub(o, s))
	], u = [...l, ...l.map((e) => I.mul(-1, e))], d = Li(e, "d1", Fi(14), u), f = Li(e, "d2", Fi(35), d), p = Ri(e, "r0", t, n, c, 12, Ri(e, "d4", t, .004, c, 8, Li(e, "d3", Fi(52), f))), m = I.mul(.25, I.add(p[0], p[2], p[4], p[6])), h = I.mul(.25, I.add(p[1], p[3], p[5], p[7])), g = I.mul(.5, I.add(m, h)), _ = I.mul(.5, I.sub(m, h));
	return {
		left: I.select(a, I.add(g, I.mul(i, _)), o),
		right: I.select(a, I.sub(g, I.mul(i, _)), s)
	};
}
//#endregion
//#region src/engine/modular.ts
var B = 0;
function Bi(e, t, n, r, i) {
	let a = I.const({ value: 1 }), o = I.const({ value: 0 }), s = I.const({ value: 1e-4 }), c = I.accum(i, I.sub(a, i)), l = I.mul(e, I.sr()), u = I.le(c, l), d = I.select(i, I.select(u, a, n), o), f = I.max(s, I.select(i, I.select(u, e, t), r));
	return I.smooth(I.tau2pole(f), d);
}
var V = 576e3, Vi = 2048;
function Hi(e, t) {
	return I.div(I.mul(e, I.sr()), t);
}
function Ui(e, t, n, r = e.id, i = {}, a = 1, o = {}, s, c, l, u = 8) {
	let d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Set(), p = (t) => `${e.id}:${t}`, m = (e, t) => {
		if (c) {
			let n = p(e);
			return c.getOrCreate(n, t);
		}
		return I.const({
			key: `${r}:${e}`,
			value: t
		});
	}, h = Object.values(e.connections);
	function g(e, t) {
		let n = h.filter((n) => n.to.moduleId === e && n.to.port === t);
		return n.length === 0 ? null : n.map((e) => {
			let t = _(e.from.moduleId, e.from.port);
			return I.mul(t, m(`${e.id}:gain`, e.gain));
		}).reduce((e, t) => I.add(e, t));
	}
	function _(t, n) {
		if (n && n !== "outL") {
			let e = d.get(`${t}:${n}`);
			if (e !== void 0) return e;
		}
		let r = d.get(t);
		if (r !== void 0) return r;
		if (f.has(t)) return B;
		let i = e.modules[t];
		if (!i) return B;
		f.add(t);
		let a = x(i);
		if (f.delete(t), d.set(t, a), n && n !== "outL") {
			let e = d.get(`${t}:${n}`);
			if (e !== void 0) return e;
		}
		return a;
	}
	function v(e, t) {
		let n = g(t.id, "fm");
		return n === null ? e : I.mul(e, I.add(I.const({ value: 1 }), I.mul(n, m(`${t.id}:fmDepth`, t.params.fmDepth ?? 1))));
	}
	function y(e, t, n) {
		switch (e) {
			case 0: return I.blepsaw(t);
			case 2: return I.dcblock(I.bleptriangle(t));
			case 3: return I.cycle(t);
			case 1: return I.blepsquare(t);
			default: return I.dcblock(I.sub(I.mul(I.le(I.phasor(t), n), I.const({ value: 2 })), I.const({ value: 1 })));
		}
	}
	function b(e, t, n, r) {
		if (e === 0) return I.sin(I.add(I.mul(t, I.const({ value: 2 * Math.PI })), n));
		let i = I.add(t, I.mul(n, I.const({ value: 1 / (2 * Math.PI) }))), a = I.sub(i, I.floor(i)), o = I.const({ value: 1 }), s = I.const({ value: 2 });
		switch (e) {
			case 1: return I.sub(I.mul(a, s), o);
			case 2: return I.sub(I.mul(I.le(a, I.const({ value: .5 })), s), o);
			case 3: return I.sub(o, I.mul(s, I.abs(I.sub(I.mul(a, s), o))));
			default: return I.sub(I.mul(I.le(a, r()), s), o);
		}
	}
	function x(e) {
		let c = e.params, f = (t) => `${e.id}:${t}`;
		switch (e.type) {
			case "note": return t;
			case "gate": return n;
			case "volume": return a;
			case "eff": {
				let t = e.name ?? "", n = t ? o[t] ?? null : null, r = Math.round(e.params.cc ?? 0), i = r > 0 ? (s?.[r] ?? 0) / 127 : 0, a = m(f("cc"), i);
				l?.register(r, p(f("cc")));
				let u = m(f("default"), c.default ?? 0);
				return I.add(n ?? u, a);
			}
			case "midicc": {
				let e = Math.round(c.cc ?? 1), t = s?.[e] ?? 0, n = m(f("val"), t / 127);
				return l?.register(e, p(f("val"))), n;
			}
			case "osc": {
				let t = g(e.id, "freq") ?? 440, n = 2 ** ((c.detune ?? 0) / 12 + (c.finetune ?? 0) / 1200), r = typeof t == "number" ? I.const({ value: t * n }) : n === 1 ? t : I.mul(t, I.const({ value: n })), i = I.max(I.const({ value: 0 }), v(r, e)), a = m(f("gain"), c.gain ?? 1);
				return I.mul(y(Math.round(c.waveform ?? 0), i, m(f("pulseWidth"), c.pulseWidth ?? .5)), a);
			}
			case "dxop": {
				let n = g(e.id, "freq") ?? t, i = g(e.id, "mod"), a = m(f("feedback"), c.feedback ?? 0), o = m(f("level"), c.level ?? 1), s = Math.round(c.freqMode ?? 0) === 1 ? m(f("fixedHz"), c.fixedHz ?? 440) : I.mul(n, m(f("ratio"), c.ratio ?? 1)), l = I.phasor(s), u = `${r}:${e.id}:fb`, d = I.mul(a, I.tapIn({ name: u })), p = i === null ? d : I.add(i, d), h = b(Math.round(c.waveform ?? 0), l, p, () => m(f("pulseWidth"), c.pulseWidth ?? .5));
				return I.mul(I.tapOut({ name: u }, h), o);
			}
			case "noise": {
				let t = m(f("mode"), c.mode ?? 0), n = m(f("level"), c.level ?? 1), i = I.noise({ key: `${r}:${e.id}:noise` }), a = I.pinknoise({ key: `${r}:${e.id}:pink` }), o = I.select(I.le(t, I.const({ value: .5 })), i, a);
				return I.mul(I.dcblock(o), n);
			}
			case "filter": {
				let t = g(e.id, "in") ?? B;
				if (c.bypass) return t;
				let n = g(e.id, "cutoffMod"), i = m(f("cutoff"), c.cutoff ?? 1200), a = m(f("q"), c.q ?? .7), o = n === null ? i : I.mul(i, I.add(I.const({ value: 1 }), I.mul(n, m(f("modDepth"), c.modDepth ?? .5), m(f("modDepthScale"), c.modDepthScale ?? 1)))), s = m(f("mode"), c.mode ?? 0), l = I.svf({
					key: `${r}:${e.id}:lp`,
					mode: "lowpass"
				}, o, a, t), u = I.svf({
					key: `${r}:${e.id}:hp`,
					mode: "highpass"
				}, o, a, t), d = I.svf({
					key: `${r}:${e.id}:bp`,
					mode: "bandpass"
				}, o, a, t);
				return I.select(I.le(s, I.const({ value: .5 })), l, I.select(I.le(s, I.const({ value: 1.5 })), u, d));
			}
			case "adsr": {
				let t = g(e.id, "gate") ?? B;
				return Bi(m(f("attack"), c.attack ?? .005), m(f("decay"), c.decay ?? .12), m(f("sustain"), c.sustain ?? .7), m(f("release"), c.release ?? .25), t);
			}
			case "gain": {
				let t = g(e.id, "in") ?? B;
				if (c.bypass) return t;
				let n = g(e.id, "mod") ?? 1;
				return I.mul(t, m(f("level"), c.level ?? .8), n);
			}
			case "comp": {
				let t = g(e.id, "in") ?? B;
				if (c.bypass) return t;
				let n = m(f("mode"), c.mode ?? 1), r = m(f("threshold"), c.threshold ?? -20), i = m(f("ratio"), c.ratio ?? 4), a = m(f("attack"), c.attack ?? 10), o = m(f("release"), c.release ?? 100), s = m(f("knee"), c.knee ?? 6), l = m(f("makeup"), c.makeup ?? 0), u = I.compress(a, o, r, i, t, t), d = I.max(s, I.const({ value: .01 })), p = I.skcompress(a, o, r, i, d, t, t), h = I.select(I.le(n, I.const({ value: .5 })), u, p);
				return I.mul(I.db2gain(l), h);
			}
			case "mix": {
				if (c.bypass) return g(e.id, "a") ?? B;
				let t = [
					"a",
					"b",
					"c",
					"d"
				].map((t) => g(e.id, t)).filter((e) => e !== null);
				if (t.length === 0) return B;
				let n = t.reduce((e, t) => I.add(e, t)), r = t.reduce((e, t) => I.mul(e, t)), i = m(f("mode"), c.mode ?? 0);
				return I.select(I.le(i, I.const({ value: .5 })), n, r);
			}
			case "lfo": {
				let t = m(f("rate"), c.rate ?? 4), n = m(f("pulseWidth"), c.pulseWidth ?? .5), r = m(f("amount"), c.amount ?? 1), i = m(f("amountScale"), c.amountScale ?? 1), a = m(f("sync"), c.sync ?? 0), o = g(e.id, "gate"), s = I.phasor(t), l = I.syncphasor(t, I.sub(I.const({ value: 1 }), o ?? B)), u = I.select(I.le(a, I.const({ value: .5 })), s, l), d = m(f("waveform"), c.waveform ?? 0), p = I.const({ value: 1 }), h = I.const({ value: 2 }), _ = I.const({ value: 2 * Math.PI }), v = I.sin(I.mul(u, _)), y = I.sub(p, I.mul(h, I.abs(I.sub(I.mul(u, h), p)))), b = I.sub(I.mul(u, h), p), x = I.sub(I.mul(I.le(u, n), h), p), S = I.select(I.le(d, I.const({ value: .5 })), v, I.select(I.le(d, I.const({ value: 1.5 })), y, I.select(I.le(d, I.const({ value: 2.5 })), b, I.select(I.le(d, I.const({ value: 3.5 })), x, x))));
				return I.mul(S, r, i);
			}
			case "tanh": {
				let t = g(e.id, "in") ?? B;
				if (c.bypass) return t;
				let n = g(e.id, "drive") ?? I.const({ value: 1 }), r = I.mul(m(f("drive"), c.drive ?? 4), n);
				return I.mul(I.tanh(I.mul(t, r)), m(f("level"), c.level ?? 1));
			}
			case "clip": {
				let t = g(e.id, "in") ?? B;
				if (c.bypass) return t;
				let n = g(e.id, "drive") ?? I.const({ value: 1 }), r = I.mul(m(f("drive"), c.drive ?? 4), n), i = m(f("threshold"), c.threshold ?? .7), a = I.sub(I.const({ value: 0 }), i), o = I.mul(t, r), s = I.max(a, I.min(i, o));
				return I.mul(s, m(f("level"), c.level ?? .7));
			}
			case "fold": {
				let t = g(e.id, "in") ?? B;
				if (c.bypass) return t;
				let n = g(e.id, "drive") ?? I.const({ value: 1 }), r = I.mul(m(f("drive"), c.drive ?? 3), n), i = m(f("threshold"), c.threshold ?? .35), a = I.sub(I.const({ value: 0 }), i), o = I.const({ value: 2 }), s = I.mul(t, r), l = I.ge(s, i), u = I.le(s, a), d = I.select(l, I.sub(I.mul(o, i), s), I.select(u, I.sub(I.mul(o, a), s), s));
				return I.mul(d, m(f("level"), c.level ?? .7));
			}
			case "crush": {
				let t = g(e.id, "in") ?? B;
				if (c.bypass) return t;
				let n = g(e.id, "bits") ?? I.const({ value: 1 }), r = I.mul(m(f("bits"), c.bits ?? 4), n), i = I.pow(I.const({ value: 2 }), I.sub(r, I.const({ value: 1 }))), a = I.div(I.round(I.mul(t, i)), i);
				return I.mul(a, m(f("level"), c.level ?? 1));
			}
			case "delay": {
				let t = g(e.id, "in") ?? B;
				if (c.bypass) return t;
				let n = Hi(m(f("time"), c.time ?? 1.25), u), i = I.delay({
					key: `${r}:${e.id}`,
					size: V
				}, n, 0, t), a = m(f("mix"), c.mix ?? .5);
				return I.add(I.mul(t, I.sub(I.const({ value: 1 }), a)), I.mul(i, a));
			}
			case "echo": {
				let t = g(e.id, "in") ?? B;
				if (c.bypass) return t;
				let n = Hi(m(f("time"), c.time ?? 1.25), u), i = m(f("feedback"), c.feedback ?? .25), a = I.delay({
					key: `${r}:${e.id}`,
					size: V
				}, n, i, t), o = m(f("mix"), c.mix ?? .5);
				return I.add(I.mul(t, I.sub(I.const({ value: 1 }), o)), I.mul(a, o));
			}
			case "delayS": {
				let t = g(e.id, "in") ?? B, n = g(e.id, "inR"), i = n !== null, a = i ? n : t;
				if (c.bypass) return d.set(`${e.id}:outR`, a), t;
				let o = Hi(m(f("time"), c.time ?? 1.25), u), s = m(f("mix"), c.mix ?? .5), l = m(f("pingpong"), c.pingpong ?? 0), p = I.sub(I.const({ value: 1 }), s), h = I.sub(I.const({ value: 1 }), l), _ = I.delay({
					key: `${r}:${e.id}:L`,
					size: V
				}, o, 0, t), v = I.delay({
					key: `${r}:${e.id}:R`,
					size: V
				}, o, 0, a), y = i ? v : I.const({ value: 0 }), b = I.add(I.mul(_, h), I.mul(y, l)), x = I.add(I.mul(v, h), I.mul(_, l)), S = I.add(I.mul(t, p), I.mul(b, s)), C = I.add(I.mul(a, p), I.mul(x, s));
				return d.set(`${e.id}:outR`, C), S;
			}
			case "echoS": {
				let t = g(e.id, "in") ?? B, n = g(e.id, "inR"), i = n !== null, a = i ? n : t;
				if (c.bypass) return d.set(`${e.id}:outR`, a), t;
				let o = Hi(m(f("time"), c.time ?? 1.25), u), s = I.mul(o, I.const({ value: 2 })), l = m(f("feedback"), c.feedback ?? .25), p = I.mul(l, l), h = m(f("mix"), c.mix ?? .5), _ = m(f("pingpong"), c.pingpong ?? 0), v = I.sub(I.const({ value: 1 }), h), y = I.sub(I.const({ value: 1 }), _), b = I.delay({
					key: `${r}:${e.id}:pL`,
					size: V
				}, o, l, t), x = I.delay({
					key: `${r}:${e.id}:pR`,
					size: V
				}, o, l, a), S = I.delay({
					key: `${r}:${e.id}:xL`,
					size: V
				}, o, 0, t), C = i ? I.delay({
					key: `${r}:${e.id}:xR`,
					size: V
				}, o, 0, a) : I.const({ value: 0 }), w = I.delay({
					key: `${r}:${e.id}:ppL`,
					size: V
				}, s, p, I.add(t, I.mul(C, l))), T = I.delay({
					key: `${r}:${e.id}:ppR`,
					size: V
				}, s, p, I.add(i ? a : I.const({ value: 0 }), I.mul(S, l))), E = I.add(I.mul(b, y), I.mul(I.add(C, w), _)), D = I.add(I.mul(x, y), I.mul(I.add(S, T), _)), O = I.add(I.mul(t, v), I.mul(E, h)), ee = I.add(I.mul(a, v), I.mul(D, h));
				return d.set(`${e.id}:outR`, ee), O;
			}
			case "conv": {
				let t = g(e.id, "in") ?? B, n = g(e.id, "inR"), a = n === null ? t : n;
				if (c.bypass) return d.set(`${e.id}:outR`, a), t;
				let o = e.sampleId ? i[e.sampleId] : void 0;
				if (!o?.hash) return d.set(`${e.id}:outR`, a), t;
				let s = m(f("mix"), c.mix ?? .5), l = m(f("gain"), c.gain ?? 1), u = o.l1 && o.l1 > 0 ? I.const({ value: 1 / o.l1 }) : I.const({ value: 1 }), p = (t, n) => I.mul(I.convolve({
					key: `${r}:${e.id}:${n}:${o.hash}`,
					path: o.hash
				}, t), u, l), h = I.sub(I.const({ value: 1 }), s), _ = m(f("width"), c.width ?? 1), v = p(t, "L"), y = p(a, "R"), b = I.mul(I.const({ value: .5 }), I.add(v, y)), x = I.mul(I.const({ value: .5 }), I.sub(v, y)), S = I.max(I.const({ value: 0 }), I.sub(_, I.const({ value: 1 }))), C = I.delay({
					key: `${r}:${e.id}:wspread`,
					size: Vi
				}, I.const({ value: 573 }), 0, b), w = I.add(b, I.mul(_, x), I.mul(S, C)), T = I.sub(b, I.mul(_, x), I.mul(S, C)), E = I.add(I.mul(t, h), I.mul(w, s)), D = I.add(I.mul(a, h), I.mul(T, s));
				return d.set(`${e.id}:outR`, D), E;
			}
			case "width": {
				let t = g(e.id, "in") ?? B, n = g(e.id, "inR"), i = n !== null;
				if (c.bypass) return d.set(`${e.id}:outR`, i ? n : t), t;
				let a = m(f("width"), c.width ?? 1), o = i ? n : t, s = I.mul(I.const({ value: .5 }), I.add(t, o)), l = I.mul(I.const({ value: .5 }), I.sub(t, o)), u = I.max(I.const({ value: 0 }), I.sub(a, I.const({ value: 1 }))), p = I.delay({
					key: `${r}:${e.id}:spread`,
					size: Vi
				}, I.const({ value: 573 }), 0, s), h = I.add(s, I.mul(a, l), I.mul(u, p)), _ = I.sub(s, I.mul(a, l), I.mul(u, p));
				return d.set(`${e.id}:outR`, _), h;
			}
			case "reverb": {
				let t = g(e.id, "in") ?? B, n = g(e.id, "inR"), i = n !== null;
				if (c.bypass) return d.set(`${e.id}:outR`, i ? n : t), t;
				let a = m(f("roomSize"), c.roomSize ?? .5), o = m(f("feedback"), c.feedback ?? .45), s = m(f("damping"), c.damping ?? .5), l = m(f("stereoWidth"), c.stereoWidth ?? .6), u = m(f("mix"), c.mix ?? .35), { left: p, right: h } = zi(`${r}:${e.id}`, a, o, s, l, u, t, i ? n : t);
				return d.set(`${e.id}:outR`, h), p;
			}
			case "sample": {
				let t = g(e.id, "gate") ?? B, n = g(e.id, "freq"), a = e.sampleId ? i[e.sampleId] : void 0;
				if (!a?.hash) return B;
				let o = Math.round(c.pitchTrack ?? 1), s = Math.round(c.loop ?? 0), l = m(f("gain"), c.gain ?? 1), u = m(f("playRate"), c.playRate ?? 0), p = m(f("finetune"), c.finetune ?? 0), h = I.const({ value: Math.LN2 }), _ = I.exp(I.mul(h, I.add(I.div(u, 12), I.div(p, 12)))), v = o && n !== null ? I.mul(I.div(n, I.const({ value: Mr(60) })), _) : _;
				if (s) {
					let n = _i(`${r}:${e.id}:${a.hash}`, a.hash, a.channels, v, a.frames, a.sampleRate), i = Bi(.001, .05, 1, .05, t), o = I.mul(n[0], l, i);
					return a.channels === 2 ? d.set(`${e.id}:outR`, I.mul(n[1], l, i)) : d.set(`${e.id}:outR`, o), o;
				}
				let y = gi(`${r}:${e.id}:${a.hash}`, a.hash, a.channels, t, I.div(v, I.const({ value: a.frames })), a.frames, .001), b = I.mul(y[0], l);
				return a.channels === 2 ? d.set(`${e.id}:outR`, I.mul(y[1], l)) : d.set(`${e.id}:outR`, b), b;
			}
			case "wave": {
				let t = g(e.id, "freq"), n = e.sampleId ? i[e.sampleId] : void 0;
				if (!n?.hash || !Ai(n)) return B;
				let a = m(f("gain"), c.gain ?? 1), o = 2 ** ((c.octave ?? 0) + (c.semi ?? 0) / 12 + (c.finetune ?? 0) / 1200), s = t === null ? I.const({ value: 440 * o }) : o === 1 ? t : I.mul(t, I.const({ value: o })), l = v(typeof s == "number" ? I.const({ value: s }) : s, e), u = g(e.id, "sync"), p = g(e.id, "pm"), h = u === null ? I.phasor(l) : I.syncphasor(l, u), _ = m(f("phase"), c.phase ?? 0), y = p === null ? I.add(h, _) : I.add(h, _, I.mul(p, m(f("pmDepth"), c.pmDepth ?? 1))), b = I.sub(y, I.floor(y)), x = ji(n, c.cycle ?? 0), S = Mi(n.frames, x), C = Math.max(1, n.frames - 1), w = (t, i) => I.mc.table({
					key: `${r}:${e.id}:${i}:${n.hash}`,
					path: n.hash,
					channels: n.channels
				}, I.div(I.add(I.mul(t, x), I.mul(b, x - 1)), C)), T;
				if (S === 1) T = w(0, "tbl");
				else {
					let t = g(e.id, "pos"), n = m(f("position"), c.position ?? 0), r = I.min(1, I.max(0, t === null ? n : I.add(n, t))), i = I.mul(r, S - 1), a = I.floor(i), o = I.min(S - 1, I.add(a, 1)), s = I.sub(i, a), l = w(a, "tblA"), u = w(o, "tblB");
					T = l.map((e, t) => I.add(e, I.mul(I.sub(u[t], e), s)));
				}
				let E = I.mul(T[0], a);
				return n.channels === 2 ? d.set(`${e.id}:outR`, I.mul(T[1], a)) : d.set(`${e.id}:outR`, E), E;
			}
			case "output": return B;
		}
	}
	let S = e.modules[e.outputId], C = S ? m(`${S.id}:gain`, S.params.gain ?? 1) : I.const({ value: 1 }), w = S ? g(e.outputId, "inL") ?? B : B, T = S ? g(e.outputId, "inR") ?? w : B, E = (e) => typeof e == "number" ? I.const({ value: e }) : e;
	return {
		left: I.mul(E(w), C),
		right: I.mul(E(T), C)
	};
}
//#endregion
//#region src/engine/instruments.ts
function Wi(e, t, n, r, i = {}, a = 0, o = {}, s = 1, c = {}, l, u, d, f = 8) {
	switch (e.kind) {
		case "modular": return Ui(e, t, n, r, i, s, c, l, u, d, f);
		case "drumkit": return {
			left: I.const({ value: 0 }),
			right: I.const({ value: 0 })
		};
	}
}
function Gi(e, t, n, r, i, a, o, s, c, l, u = {}, d, f = 0, p = 8) {
	let m = I.const({ value: 0 }), h = m, g = m;
	if (e.sampleId) {
		let t = o[e.sampleId];
		if (t || console.warn(`Drumkit slot "${e.id}" references unknown sample "${e.sampleId}" — no hash found`), t) {
			let r = a[e.sampleId];
			if (r?.hash || console.warn(`Sample hash "${t.slice(0, 8)}…" (slot "${e.id}") not loaded in VFS — sample may be missing from storage`), r?.hash) {
				let a = `${i}:slot:${e.id}:${t}`, o = Mr(e.baseNote) / 261.6255653005986, s = gi(a, t, r.channels, n, o / r.frames, r.frames, o);
				h = s[0], g = s[+(r.channels >= 2)];
			}
		}
	} else if (e.instrumentId) {
		let d = t[e.instrumentId];
		if (d) {
			let t = Wi(d, r, n, `${i}:${e.id}`, a, 0, o, 1, u, s, c, l, p);
			h = t.left, g = t.right;
		}
	}
	let _ = (t) => d ? `${d}:slot:${e.id}:${t}` : "", v = c && d ? c.getOrCreate(_("volume"), e.volume) : I.const({ value: e.volume }), y = c && d ? c.getOrCreate(_("pan"), e.pan) : I.const({ value: e.pan }), b = I.max(I.const({ value: -1 }), I.min(I.const({ value: 1 }), I.add(y, f))), x = I.add(I.mul(b, Math.PI / 4), Math.PI / 4), S = I.cos(x), C = I.sin(x);
	return {
		left: I.mul(h, v, S),
		right: I.mul(g, v, C)
	};
}
//#endregion
//#region src/engine/mixer.ts
function Ki(e, t, n) {
	return `chan:${e}:${t}:${n}`;
}
function qi(e, t, n) {
	return n ? n.getOrCreate(e, t) : I.const({
		key: e,
		value: t
	});
}
function Ji(e, t, n, r, i = 8, a = {}) {
	let o = t;
	for (let t of e) o = Yi(t, o, n, r, i, a);
	return o;
}
function Yi(e, t, n, r, i = 8, a = {}) {
	let o = e.params, s = (t) => Ki(n, e.id, t), c = (e, t) => qi(s(e), t, r), l = c("bypass", +!!o.bypass), u = Di(e.type), d = e.side;
	function f(e, t) {
		return u || !d ? {
			left: t(e.left),
			right: t(e.right)
		} : d === "L" ? {
			left: t(e.left),
			right: e.right
		} : {
			left: e.left,
			right: t(e.right)
		};
	}
	function p(e) {
		return {
			left: I.select(l, t.left, e.left),
			right: I.select(l, t.right, e.right)
		};
	}
	switch (e.type) {
		case "filter": {
			let r = c("cutoff", o.cutoff ?? 1200), i = c("q", o.q ?? .7), a = c("mode", o.mode ?? 0);
			return p(f(t, (t) => {
				let o = `${n}:${e.id}:${d ?? "LR"}`, s = I.svf({
					key: `${o}:lp`,
					mode: "lowpass"
				}, r, i, t), c = I.svf({
					key: `${o}:hp`,
					mode: "highpass"
				}, r, i, t), l = I.svf({
					key: `${o}:bp`,
					mode: "bandpass"
				}, r, i, t);
				return I.select(I.le(a, I.const({ value: .5 })), s, I.select(I.le(a, I.const({ value: 1.5 })), c, l));
			}));
		}
		case "gain": {
			let e = c("level", o.level ?? 1);
			return p(f(t, (t) => I.mul(t, e)));
		}
		case "tanh": {
			let e = c("drive", o.drive ?? 4), n = c("level", o.level ?? 1);
			return p(f(t, (t) => I.mul(I.tanh(I.mul(t, e)), n)));
		}
		case "clip": {
			let e = c("drive", o.drive ?? 4), n = c("threshold", o.threshold ?? .7), r = c("level", o.level ?? .7), i = I.sub(I.const({ value: 0 }), n);
			return p(f(t, (t) => {
				let a = I.mul(t, e);
				return I.mul(I.max(i, I.min(n, a)), r);
			}));
		}
		case "fold": {
			let e = c("drive", o.drive ?? 3), n = c("threshold", o.threshold ?? .35), r = c("level", o.level ?? .7), i = I.sub(I.const({ value: 0 }), n), a = I.const({ value: 2 });
			return p(f(t, (t) => {
				let o = I.mul(t, e), s = I.ge(o, n), c = I.le(o, i), l = I.select(s, I.sub(I.mul(a, n), o), I.select(c, I.sub(I.mul(a, i), o), o));
				return I.mul(l, r);
			}));
		}
		case "crush": {
			let e = c("bits", o.bits ?? 4), n = c("level", o.level ?? 1), r = I.pow(I.const({ value: 2 }), I.sub(e, I.const({ value: 1 })));
			return p(f(t, (e) => {
				let t = I.div(I.round(I.mul(e, r)), r);
				return I.mul(t, n);
			}));
		}
		case "delay": {
			let r = Hi(c("time", o.time ?? 1.25), i), a = c("mix", o.mix ?? .5), s = I.sub(I.const({ value: 1 }), a), l = I.delay({
				key: `${n}:${e.id}:L`,
				size: V
			}, r, 0, t.left), u = I.delay({
				key: `${n}:${e.id}:R`,
				size: V
			}, r, 0, t.right);
			return p({
				left: I.add(I.mul(t.left, s), I.mul(l, a)),
				right: I.add(I.mul(t.right, s), I.mul(u, a))
			});
		}
		case "echo": {
			let r = Hi(c("time", o.time ?? 1.25), i), a = c("feedback", o.feedback ?? .25), s = c("mix", o.mix ?? .5), l = I.sub(I.const({ value: 1 }), s), u = I.delay({
				key: `${n}:${e.id}:L`,
				size: V
			}, r, a, t.left), d = I.delay({
				key: `${n}:${e.id}:R`,
				size: V
			}, r, a, t.right);
			return p({
				left: I.add(I.mul(t.left, l), I.mul(u, s)),
				right: I.add(I.mul(t.right, l), I.mul(d, s))
			});
		}
		case "delayS": {
			let r = Hi(c("time", o.time ?? 1.25), i), a = c("mix", o.mix ?? .5), s = c("pingpong", o.pingpong ?? 0), l = I.sub(I.const({ value: 1 }), a), u = I.sub(I.const({ value: 1 }), s), d = I.delay({
				key: `${n}:${e.id}:L`,
				size: V
			}, r, 0, t.left), f = I.delay({
				key: `${n}:${e.id}:R`,
				size: V
			}, r, 0, t.right), m = I.add(I.mul(d, u), I.mul(f, s)), h = I.add(I.mul(f, u), I.mul(d, s));
			return p({
				left: I.add(I.mul(t.left, l), I.mul(m, a)),
				right: I.add(I.mul(t.right, l), I.mul(h, a))
			});
		}
		case "echoS": {
			let r = Hi(c("time", o.time ?? 1.25), i), a = I.mul(r, I.const({ value: 2 })), s = c("feedback", o.feedback ?? .25), l = I.mul(s, s), u = c("mix", o.mix ?? .5), d = c("pingpong", o.pingpong ?? 0), f = I.sub(I.const({ value: 1 }), u), m = I.sub(I.const({ value: 1 }), d), h = I.delay({
				key: `${n}:${e.id}:pL`,
				size: V
			}, r, s, t.left), g = I.delay({
				key: `${n}:${e.id}:pR`,
				size: V
			}, r, s, t.right), _ = I.delay({
				key: `${n}:${e.id}:xL`,
				size: V
			}, r, 0, t.left), v = I.delay({
				key: `${n}:${e.id}:xR`,
				size: V
			}, r, 0, t.right), y = I.delay({
				key: `${n}:${e.id}:ppL`,
				size: V
			}, a, l, I.add(t.left, I.mul(v, s))), b = I.delay({
				key: `${n}:${e.id}:ppR`,
				size: V
			}, a, l, I.add(t.right, I.mul(_, s))), x = I.add(I.mul(h, m), I.mul(I.add(v, y), d)), S = I.add(I.mul(g, m), I.mul(I.add(_, b), d));
			return p({
				left: I.add(I.mul(t.left, f), I.mul(x, u)),
				right: I.add(I.mul(t.right, f), I.mul(S, u))
			});
		}
		case "reverb": {
			let r = c("roomSize", o.roomSize ?? .5), i = c("feedback", o.feedback ?? .45), a = c("damping", o.damping ?? .5), s = c("stereoWidth", o.stereoWidth ?? .6), l = c("mix", o.mix ?? .35);
			return p(zi(`chan:${n}:${e.id}`, r, i, a, s, l, t.left, t.right));
		}
		case "comp": {
			let e = c("mode", o.mode ?? 1), n = c("threshold", o.threshold ?? -20), r = c("ratio", o.ratio ?? 4), i = c("attack", o.attack ?? 10), a = c("release", o.release ?? 100), s = c("knee", o.knee ?? 6), l = c("makeup", o.makeup ?? 0), u = I.mul(I.add(t.left, t.right), I.const({ value: .5 })), d = I.max(s, I.const({ value: .01 })), f = I.le(e, I.const({ value: .5 })), m = I.select(f, I.compress(i, a, n, r, u, t.left), I.skcompress(i, a, n, r, d, u, t.left)), h = I.select(f, I.compress(i, a, n, r, u, t.right), I.skcompress(i, a, n, r, d, u, t.right));
			return p({
				left: I.mul(I.db2gain(l), m),
				right: I.mul(I.db2gain(l), h)
			});
		}
		case "conv": {
			let r = e.sampleId ? a[e.sampleId] : void 0;
			if (!r?.hash) return t;
			let i = c("mix", o.mix ?? .5), s = c("gain", o.gain ?? 1), l = I.sub(I.const({ value: 1 }), i), u = r.l1 && r.l1 > 0 ? I.const({ value: 1 / r.l1 }) : I.const({ value: 1 }), f = (t, i) => I.mul(I.convolve({
				key: `${n}:${e.id}:${i}:${r.hash}`,
				path: r.hash
			}, t), u, s);
			if (d) {
				let e = {
					left: I.add(I.mul(t.left, l), I.mul(f(t.left, "L"), i)),
					right: I.add(I.mul(t.right, l), I.mul(f(t.right, "R"), i))
				};
				return p(d === "L" ? {
					left: e.left,
					right: t.right
				} : {
					left: t.left,
					right: e.right
				});
			}
			let m = c("width", o.width ?? 1), h = f(t.left, "L"), g = f(t.right, "R"), _ = I.mul(I.const({ value: .5 }), I.add(h, g)), v = I.mul(I.const({ value: .5 }), I.sub(h, g)), y = I.max(I.const({ value: 0 }), I.sub(m, I.const({ value: 1 }))), b = I.delay({
				key: `${n}:${e.id}:wspread`,
				size: Vi
			}, I.const({ value: 573 }), 0, _), x = I.add(_, I.mul(m, v), I.mul(y, b)), S = I.sub(_, I.mul(m, v), I.mul(y, b));
			return p({
				left: I.add(I.mul(t.left, l), I.mul(x, i)),
				right: I.add(I.mul(t.right, l), I.mul(S, i))
			});
		}
		case "width": {
			let r = c("width", o.width ?? 1), i = I.mul(I.const({ value: .5 }), I.add(t.left, t.right)), a = I.mul(I.const({ value: .5 }), I.sub(t.left, t.right)), s = I.max(I.const({ value: 0 }), I.sub(r, I.const({ value: 1 }))), l = I.delay({
				key: `${n}:${e.id}:spread`,
				size: 2048
			}, I.const({ value: 573 }), 0, i);
			return p({
				left: I.add(i, I.mul(r, a), I.mul(s, l)),
				right: I.sub(i, I.mul(r, a), I.mul(s, l))
			});
		}
		default: return t;
	}
}
function Xi(e, t) {
	let n = I.const({ value: 1 }), r = I.mul(I.add(t, n), I.const({ value: Math.PI / 4 }));
	return {
		left: I.mul(e.left, I.cos(r), I.const({ value: Math.SQRT2 })),
		right: I.mul(e.right, I.sin(r), I.const({ value: Math.SQRT2 }))
	};
}
function Zi(e, t, n, r, i) {
	let a = qi(`chan:${r}:volume`, t, i), o = Xi(e, qi(`chan:${r}:pan`, n, i));
	return {
		left: I.mul(o.left, a),
		right: I.mul(o.right, a)
	};
}
//#endregion
//#region src/engine/compile.ts
function Qi(e, t, n, r) {
	return Object.fromEntries(Object.values(e).map((e) => {
		let i = r?.[e.hash], a = i && e.frames > 0 ? i.frames / e.frames : 1;
		return [e.id, {
			hash: !t || t.has(e.hash) ? e.hash : "",
			channels: e.channels,
			sampleRate: i?.sampleRate ?? e.sampleRate,
			frames: i?.frames ?? e.frames,
			cycleLength: e.cycleLength === void 0 ? void 0 : e.cycleLength * a,
			l1: n?.[e.hash]
		}];
	}));
}
function $i(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) t[n] = r.hash;
	return t;
}
function ea(e) {
	return e.kind === "modular" ? 1 : e.params.gain;
}
function ta(e, t) {
	let n = I.const({ value: .5 }), r = I.mul(I.sub(e, n), 2 * t);
	return I.exp(I.mul(r, Math.LN2 / 12));
}
function na(e, t, n, r, i) {
	let a = I.mul(.5, I.exp(I.mul(t, Math.log(r / .5)))), o = I.cycle(a), s = I.mul(o, n, i), c = I.exp(I.mul(s, Math.LN2 / 12));
	return I.mul(e, c);
}
function ra(e, t, n, r, i) {
	let a = I.mul(.5, I.exp(I.mul(t, Math.log(r / .5)))), o = I.cycle(a), s = I.sub(1, I.mul(n, I.mul(I.sub(1, I.abs(o)), i)));
	return I.mul(e, s);
}
function ia(e, t, n, r, i, a, o = I.const({ value: 8 }), s) {
	if (!t) return null;
	let c = I.const({
		key: "lv:zero",
		value: 0
	}), l = Mr(69), u = c, d = c, f = s ? s.map((t) => e.entities.instruments[t]).filter((e) => e !== void 0) : Object.values(e.entities.instruments);
	if (f.length === 0) return null;
	for (let s of f) if (s.kind === "drumkit") {
		let f = c, p = c;
		for (let c = 0; c < s.slots.length; c++) for (let u = 0; u < 1; u++) {
			let d = `${s.id}:ds:${c}:v${u}`, m = t.getOrCreate(`${d}:freq`, l), h = t.getOrCreate(`${d}:gate`, 0), g = t.getOrCreate(`${d}:vel`, 1), _ = Gi(s.slots[c], e.entities.instruments, h, m, d, n, r, i, t, a, {}, s.id, s.pan ?? 0, o);
			f = I.add(f, I.mul(_.left, g)), p = I.add(p, I.mul(_.right, g));
		}
		let m = t.getOrCreate(`${s.id}:gain`, s.params.gain);
		u = I.add(u, I.mul(f, .3, m)), d = I.add(d, I.mul(p, .3, m));
	} else {
		let e = [];
		for (let c = 0; c < Fr(s); c++) {
			let u = `${s.id}:v:${c}`, d = t.getOrCreate(`${u}:freq`, l), f = t.getOrCreate(`${u}:gate`, 0), p = t.getOrCreate(`${u}:vel`, 1);
			e.push(Wi(s, d, f, u, n, 0, r, p, {}, i, t, a, o));
		}
		u = I.add(u, I.mul(e.reduce((e, t) => I.add(e, t.left), c), .3)), d = I.add(d, I.mul(e.reduce((e, t) => I.add(e, t.right), c), .3));
	}
	return {
		left: u,
		right: d
	};
}
function aa(e, t, n, r, i, a) {
	let o = I.const({ value: 0 }), s = I.const({ value: 1 }), c = /* @__PURE__ */ new Map(), l = t.reduce((e, t) => e + t.slotCount, 0), u = lt(n.txSeq ?? A("txseq", {
		key: "txseq",
		emitEvery: 4
	}, []), l * 32), d = (e) => {
		let t = c.get(e);
		return t || (t = [], c.set(e, t)), t;
	};
	for (let c of t) {
		let l = e.entities.instruments[c.instId];
		if (!l) continue;
		let f = l.kind === "drumkit" ? void 0 : l.effectSettings;
		for (let p = 0; p < c.slotCount; p++) {
			let m = Gr(t, c.instId, p) * 32, h = `${l.id}:ts:${p}`, g = {};
			if (c.isDrumkit) {
				let e = c.drumSounds ?? 0;
				for (let t = 0; t < c.namedInletIds.length; t++) g[c.namedInletIds[t]] = u[m + 2 * e + 10 + t];
			} else for (let e = 0; e < c.namedInletIds.length; e++) g[c.namedInletIds[e]] = u[m + 11 + e];
			let _ = n.paramRefs ? I.sm(n.paramRefs.getOrCreate(`tracker:${h}:mute`, 1)) : s, v = n.paramRefs ? n.paramRefs.getOrCreate(`${l.id}:gain`, ea(l)) : I.const({ value: ea(l) }), y = n.paramRefs ? n.paramRefs.getOrCreate(`inst:${l.id}:pan`, l.pan ?? 0) : I.const({ value: l.pan ?? 0 });
			if (c.isDrumkit && l.kind === "drumkit") {
				let t = c.drumSounds ?? 0, s = 2 * t, p = [], b = [];
				for (let e = 0; e < t; e++) p.push(u[m + e]), b.push(u[m + t + e]);
				let x = u[m + s + z.vol], S = u[m + s + z.portamento], C = ta(S, f?.portamento ?? 4), w = u[m + s + z.volumeSlide], T = u[m + s + z.panning], E = u[m + s + z.tremoloRate], D = u[m + s + z.tremoloDepth], O = ra(w, E, D, f?.tremoloRate ?? 100, f?.tremoloDepth ?? 1), ee = o, te = o;
				for (let o = 0; o < t; o++) {
					let t = l.slots[o], s = I.mul(b[o], C), c = Gi(t, e.entities.instruments, p[o], s, h, r, i, n.midiCcValues, n.paramRefs, n.ccBindings, g, l.id, y, a);
					ee = I.add(ee, c.left), te = I.add(te, c.right);
				}
				let ne = I.mul(T, Math.PI / 2), re = {
					left: I.mul(ee, O, x, _, I.cos(ne), v, I.const({ value: .25 })),
					right: I.mul(te, O, x, _, I.sin(ne), v, I.const({ value: .25 }))
				};
				d(l.channelId ?? "master").push(re);
			} else {
				let e = u[m + R.gate], t = u[m + R.freq], o = u[m + R.vol], s = u[m + R.portamento], c = ta(s, f?.portamento ?? 4), p = u[m + R.volumeSlide], v = u[m + R.panning], b = u[m + R.vibratoRate], x = u[m + R.vibratoDepth], S = u[m + R.tremoloRate], C = u[m + R.tremoloDepth], w = I.mul(t, c);
				w = na(w, b, x, f?.vibratoRate ?? 100, f?.vibratoDepth ?? .5);
				let T = ra(p, S, C, f?.tremoloRate ?? 100, f?.tremoloDepth ?? 1), E = Wi(l, w, e, h, r, 0, i, T, g, n.midiCcValues, n.paramRefs, n.ccBindings, a), D = I.mul(v, Math.PI / 2), O = {
					left: I.mul(E.left, I.cos(D)),
					right: I.mul(E.right, I.sin(D))
				}, ee = {
					left: I.mul(O.left, o, T, _, I.const({ value: .25 })),
					right: I.mul(O.right, o, T, _, I.const({ value: .25 }))
				};
				d(l.channelId ?? "master").push(Xi(ee, y));
			}
		}
	}
	return c;
}
function oa(e, t) {
	t.ccBindings?.clear();
	let n = Qi(e.entities.samples, t.vfsLoadedHashes, t.l1Sums, t.decodedSizes), r = $i(e.entities.samples), i = t.paramRefs ? t.paramRefs.getOrCreate("transport:rowHz", t.rowHz) : I.const({ value: t.rowHz }), a = ia(e, t.paramRefs, n, r, t.midiCcValues, t.ccBindings, i, t.liveVoiceInstIds), o = Wr(e, t.ensureSlotInstId), s = o.length > 0 ? aa(e, o, t, n, r, i) : /* @__PURE__ */ new Map();
	o.length > 0 && console.log("[compile] slots:", o.map((e) => `${e.instId}: ${e.slotCount} slots × ${e.channelsPerSlot} signals (${e.isDrumkit ? "dk" : "reg"})`).join(", "));
	let c = I.const({ value: 0 }), l = c, u = c;
	for (let [r, a] of s) {
		let o = {
			left: a.reduce((e, t) => I.add(e, t.left), c),
			right: a.reduce((e, t) => I.add(e, t.right), c)
		}, s = e.entities.mixChannels[r];
		if (!s) {
			l = I.add(l, o.left), u = I.add(u, o.right);
			continue;
		}
		let d = Zi(s.kind === "sub" || s.kind === "master" ? Ji(s.effects, o, r, t.paramRefs, i, n) : o, s.volume, s.pan, r, t.paramRefs);
		l = I.add(l, d.left), u = I.add(u, d.right);
	}
	let d = e.entities.mixChannels[Lr], f = {
		left: l,
		right: u
	};
	d && (f = Ji(d.effects, f, Lr, t.paramRefs, i, n), f = Zi(f, d.volume, d.pan, Lr, t.paramRefs));
	let p = t.paramRefs ? t.paramRefs.getOrCreate("transport:playing", t.playing) : I.const({ value: t.playing }), m = {
		left: I.mul(f.left, p),
		right: I.mul(f.right, p)
	};
	return a ? {
		left: I.add(m.left, a.left),
		right: I.add(m.right, a.right)
	} : m;
}
function sa(e) {
	let { slots: t, totalRows: n } = e, r = [
		1,
		n,
		t.length
	], i = 0;
	for (let e of t) {
		let t = e.signals.length;
		r.push(t, e.drumGateCount, i), i += t;
	}
	let a = new Float32Array(r.length + n * i);
	a.set(r, 0);
	for (let e = 0; e < n; e++) {
		let n = r.length + e * i, o = 0;
		for (let r of t) {
			for (let t = 0; t < r.signals.length; t++) a[n + o + t] = r.signals[t]?.[e] ?? 0;
			o += r.signals.length;
		}
	}
	return a;
}
//#endregion
//#region src/engine/arrangement.ts
function ca(e, t) {
	let n = [], r = 0;
	for (let i of t) {
		let t = e.entities.sections[i];
		t && t.patternIds.forEach((t, a) => {
			let o = e.entities.patterns[t];
			o && (n.push({
				patternId: t,
				startRow: r,
				sectionId: i,
				step: a
			}), r += o.length);
		});
	}
	return n;
}
//#endregion
//#region src/player/cues.ts
function la(e) {
	let t = e.sectionIds.flatMap((t) => {
		let n = e.entities.sections[t];
		if (!n) return [];
		let r = ca(e, [t]).reduce((t, n) => t + (e.entities.patterns[n.patternId]?.length ?? 0), 0);
		return [{
			kind: "section",
			id: t,
			name: n.name,
			rows: r
		}];
	}), n = Object.values(e.entities.patterns).map((e) => ({
		kind: "pattern",
		id: e.id,
		name: e.name,
		rows: e.length
	}));
	return [...t, ...n];
}
function ua(e, t) {
	let n = da(e, t);
	return n.length > 0 ? n : null;
}
function da(e, t) {
	if (typeof t == "object" && "song" in t) return ca(e, e.sectionIds);
	let n = typeof t == "string" || "section" in t ? fa(e, typeof t == "string" ? t : t.section) : void 0;
	if (n) return ca(e, [n]);
	if (typeof t == "object" && "section" in t) return [];
	let r = pa(e, typeof t == "string" ? t : t.pattern);
	return r ? [{
		patternId: r,
		startRow: 0
	}] : [];
}
function fa(e, t) {
	return e.sectionIds.find((e) => e === t) ?? e.sectionIds.find((n) => e.entities.sections[n]?.name === t);
}
function pa(e, t) {
	return e.entities.patterns[t] ? t : Object.values(e.entities.patterns).find((e) => e.name === t)?.id;
}
function ma(e, t, n, r) {
	let i = [], a = Object.values(e.entities.patterns).sort((e, t) => (e.id === n) - +(t.id === n));
	for (let n of a) {
		let a = ti(e, n.id);
		n.trackIds.forEach((n, o) => {
			let s = a.get(n), c = e.entities.tracks[n];
			s === void 0 || !c || r && !r.has(o + 1) || i.push([`tracker:${c.instrumentId}:ts:${s}:mute`, t(o + 1)]);
		});
	}
	return i;
}
function ha(e, t) {
	return {
		slots: e.slots.map((e, n) => ({
			...e,
			signals: e.signals.map((e, r) => e.concat(t.slots[n]?.signals[r] ?? Array(t.totalRows).fill(0)))
		})),
		totalRows: e.totalRows + t.totalRows,
		arrangement: [...e.arrangement, ...t.arrangement.map((t) => ({
			...t,
			startRow: t.startRow + e.totalRows
		}))]
	};
}
function ga(e, t) {
	let n = e.totalRows, r = [];
	for (let i = 0; n > 0 && i < t; i += n) for (let n of e.arrangement) i + n.startRow < t && r.push({
		...n,
		startRow: i + n.startRow
	});
	return {
		slots: e.slots.map((e) => ({
			...e,
			signals: e.signals.map((e) => Array.from({ length: t }, (t, r) => e[r % n] ?? 0))
		})),
		totalRows: t,
		arrangement: r
	};
}
function _a(e, t) {
	let n = e.totalRows, r = n > 0 ? (t % n + n) % n : 0;
	if (r === 0) return e;
	let i = [];
	return e.arrangement.forEach((t, a) => {
		let o = e.arrangement[a + 1]?.startRow ?? n;
		t.startRow < r && o > r ? i.push({
			...t,
			startRow: 0
		}, {
			...t,
			startRow: t.startRow - r + n
		}) : i.push({
			...t,
			startRow: (t.startRow - r + n) % n
		});
	}), {
		slots: e.slots.map((e) => ({
			...e,
			signals: e.signals.map((e) => e.slice(r).concat(e.slice(0, r)))
		})),
		totalRows: n,
		arrangement: i.sort((e, t) => e.startRow - t.startRow)
	};
}
function va(e, t, n) {
	return n > 0 ? ((e + t) % n + n) % n : 0;
}
function ya(e, t, n, r) {
	return t * r + n - e;
}
function ba(e, t, n, r = {
	start: 0,
	length: e.totalRows
}, i = 0) {
	let a = Math.max(1, Math.min(n, e.totalRows)), { rowOffset: o, ...s } = a < e.totalRows ? Yr(e, 0, a - 1) : e;
	return {
		at: a,
		bridge: ha(s, t),
		settle: ha(ga(t, a), t),
		target: t,
		fromStart: r.start,
		fromLength: r.length,
		toOffset: i
	};
}
function xa(e, t, n, r = 0) {
	if (!t) {
		let t = e.totalRows;
		return {
			data: ga(e, 2 * t),
			start: -r,
			length: t,
			limit: 2 * t
		};
	}
	let { at: i, target: a, toOffset: o } = t;
	return t.stage === "bridge" && n < i ? {
		data: t.bridge,
		start: t.fromStart,
		length: t.fromLength,
		limit: i
	} : n < i ? {
		data: t.settle,
		start: -o,
		length: a.totalRows,
		limit: i
	} : {
		data: t.settle,
		start: i - o,
		length: a.totalRows,
		limit: i + a.totalRows
	};
}
function Sa(e, t, n, r) {
	let i = e.totalRows;
	return !t && i > 2 * r && i - n <= r;
}
function Ca(e, t, n, r) {
	let i = e.length, a = ((t - e.start) % i + i) % i, o = n > 0 ? Math.min(n, i) : i, s = a + r, c = Math.ceil(s / o) * o, l = c <= i ? c : i + Math.ceil((s - i) / o) * o;
	return Math.min(e.limit, t + (l - a));
}
function wa(e, t, n, r) {
	if (t === "bridge" && !(n && r >= e.at)) return r >= e.at ? {
		send: null,
		sounding: "to",
		row: (r - e.at + e.toOffset) % e.target.totalRows
	} : {
		send: null,
		sounding: "from",
		row: ((r - e.fromStart) % e.fromLength + e.fromLength) % e.fromLength
	};
	let i = t === "bridge" ? "settle" : n && r < e.at ? "target" : null, a = e.target.totalRows;
	return {
		send: i,
		sounding: "to",
		row: ((r >= e.at ? r - e.at : r) + e.toOffset) % a
	};
}
//#endregion
//#region ../../../home/user/synthor/node_modules/fflate/esm/browser.js
var H = Uint8Array, Ta = Uint16Array, Ea = Int32Array, Da = new H([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]), Oa = new H([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]), ka = new H([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]), Aa = function(e, t) {
	for (var n = new Ta(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new Ea(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, ja = Aa(Da, 2), Ma = ja.b, Na = ja.r;
Ma[28] = 258, Na[258] = 28;
var Pa = Aa(Oa, 0), Fa = Pa.b;
Pa.r;
for (var Ia = new Ta(32768), U = 0; U < 32768; ++U) {
	var La = (U & 43690) >> 1 | (U & 21845) << 1;
	La = (La & 52428) >> 2 | (La & 13107) << 2, La = (La & 61680) >> 4 | (La & 3855) << 4, Ia[U] = ((La & 65280) >> 8 | (La & 255) << 8) >> 1;
}
for (var Ra = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new Ta(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new Ta(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new Ta(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[Ia[d] >> c] = l;
	} else for (s = new Ta(r), i = 0; i < r; ++i) e[i] && (s[i] = Ia[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), za = new H(288), U = 0; U < 144; ++U) za[U] = 8;
for (var U = 144; U < 256; ++U) za[U] = 9;
for (var U = 256; U < 280; ++U) za[U] = 7;
for (var U = 280; U < 288; ++U) za[U] = 8;
for (var Ba = new H(32), U = 0; U < 32; ++U) Ba[U] = 5;
var Va = /*#__PURE__*/ Ra(za, 9, 1), Ha = /*#__PURE__*/ Ra(Ba, 5, 1), Ua = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, W = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, Wa = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, Ga = function(e) {
	return (e + 7) / 8 | 0;
}, Ka = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new H(e.subarray(t, n));
}, qa = [
	"unexpected EOF",
	"invalid block type",
	"invalid length/literal",
	"invalid distance",
	"stream finished",
	"no stream handler",
	,
	"no callback",
	"invalid UTF-8 data",
	"extra field too long",
	"date not in range 1980-2099",
	"filename too long",
	"stream finishing",
	"invalid zip data"
], G = function(e, t, n) {
	var r = Error(t || qa[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, G), !n) throw r;
	return r;
}, Ja = function(e, t, n, r) {
	var i = e.length, a = r ? r.length : 0;
	if (!i || t.f && !t.l) return n || new H(0);
	var o = !n, s = o || t.i != 2, c = t.i;
	o && (n = new H(i * 3));
	var l = function(e) {
		var t = n.length;
		if (e > t) {
			var r = new H(Math.max(t * 2, e));
			r.set(n), n = r;
		}
	}, u = t.f || 0, d = t.p || 0, f = t.b || 0, p = t.l, m = t.d, h = t.m, g = t.n, _ = i * 8;
	do {
		if (!p) {
			u = W(e, d, 1);
			var v = W(e, d + 1, 3);
			if (d += 3, !v) {
				var y = Ga(d) + 4, b = e[y - 4] | e[y - 3] << 8, x = y + b;
				if (x > i) {
					c && G(0);
					break;
				}
				s && l(f + b), n.set(e.subarray(y, x), f), t.b = f += b, t.p = d = x * 8, t.f = u;
				continue;
			} else if (v == 1) p = Va, m = Ha, h = 9, g = 5;
			else if (v == 2) {
				var S = W(e, d, 31) + 257, C = W(e, d + 10, 15) + 4, w = S + W(e, d + 5, 31) + 1;
				d += 14;
				for (var T = new H(w), E = new H(19), D = 0; D < C; ++D) E[ka[D]] = W(e, d + D * 3, 7);
				d += C * 3;
				for (var O = Ua(E), ee = (1 << O) - 1, te = Ra(E, O, 1), D = 0; D < w;) {
					var ne = te[W(e, d, ee)];
					d += ne & 15;
					var y = ne >> 4;
					if (y < 16) T[D++] = y;
					else {
						var re = 0, ie = 0;
						for (y == 16 ? (ie = 3 + W(e, d, 3), d += 2, re = T[D - 1]) : y == 17 ? (ie = 3 + W(e, d, 7), d += 3) : y == 18 && (ie = 11 + W(e, d, 127), d += 7); ie--;) T[D++] = re;
					}
				}
				var ae = T.subarray(0, S), oe = T.subarray(S);
				h = Ua(ae), g = Ua(oe), p = Ra(ae, h, 1), m = Ra(oe, g, 1);
			} else G(1);
			if (d > _) {
				c && G(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var se = (1 << h) - 1, ce = (1 << g) - 1, le = d;; le = d) {
			var re = p[Wa(e, d) & se], ue = re >> 4;
			if (d += re & 15, d > _) {
				c && G(0);
				break;
			}
			if (re || G(2), ue < 256) n[f++] = ue;
			else if (ue == 256) {
				le = d, p = null;
				break;
			} else {
				var de = ue - 254;
				if (ue > 264) {
					var D = ue - 257, fe = Da[D];
					de = W(e, d, (1 << fe) - 1) + Ma[D], d += fe;
				}
				var pe = m[Wa(e, d) & ce], me = pe >> 4;
				pe || G(3), d += pe & 15;
				var oe = Fa[me];
				if (me > 3) {
					var fe = Oa[me];
					oe += Wa(e, d) & (1 << fe) - 1, d += fe;
				}
				if (d > _) {
					c && G(0);
					break;
				}
				s && l(f + 131072);
				var he = f + de;
				if (f < oe) {
					var ge = a - oe, _e = Math.min(oe, he);
					for (ge + f < 0 && G(3); f < _e; ++f) n[f] = r[ge + f];
				}
				for (; f < he; ++f) n[f] = n[f - oe];
			}
		}
		t.l = p, t.p = le, t.b = f, t.f = u, p && (u = 1, t.m = h, t.d = m, t.n = g);
	} while (!u);
	return f != n.length && o ? Ka(n, 0, f) : n.subarray(0, f);
}, Ya = /*#__PURE__*/ new H(0), K = function(e, t) {
	return e[t] | e[t + 1] << 8;
}, q = function(e, t) {
	return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
}, Xa = function(e, t) {
	return q(e, t) + q(e, t + 4) * 4294967296;
};
function Za(e, t) {
	return Ja(e, { i: 2 }, t && t.out, t && t.dictionary);
}
var Qa = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	Qa.decode(Ya, { stream: !0 });
} catch {}
var $a = function(e) {
	for (var t = "", n = 0;;) {
		var r = e[n++], i = (r > 127) + (r > 223) + (r > 239);
		if (n + i > e.length) return {
			s: t,
			r: Ka(e, n - 1)
		};
		i ? i == 3 ? (r = ((r & 15) << 18 | (e[n++] & 63) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) - 65536, t += String.fromCharCode(55296 | r >> 10, 56320 | r & 1023)) : i & 1 ? t += String.fromCharCode((r & 31) << 6 | e[n++] & 63) : t += String.fromCharCode((r & 15) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) : t += String.fromCharCode(r);
	}
};
function eo(e, t) {
	if (t) {
		for (var n = "", r = 0; r < e.length; r += 16384) n += String.fromCharCode.apply(null, e.subarray(r, r + 16384));
		return n;
	} else if (Qa) return Qa.decode(e);
	else {
		var i = $a(e), a = i.s, n = i.r;
		return n.length && G(8), a;
	}
}
var to = function(e, t) {
	return t + 30 + K(e, t + 26) + K(e, t + 28);
}, no = function(e, t, n) {
	var r = K(e, t + 28), i = K(e, t + 30), a = eo(e.subarray(t + 46, t + 46 + r), !(K(e, t + 8) & 2048)), o = t + 46 + r, s = ro(e, o, i, n, q(e, t + 20), q(e, t + 24), q(e, t + 42)), c = s[0], l = s[1], u = s[2];
	return [
		K(e, t + 10),
		c,
		l,
		a,
		o + i + K(e, t + 32),
		u
	];
}, ro = function(e, t, n, r, i, a, o) {
	var s = i == 4294967295, c = a == 4294967295, l = o == 4294967295, u = t + n, d = s + c + l;
	if (r && d) {
		for (; t + 4 < u; t += 4 + K(e, t + 2)) if (K(e, t) == 1) return [
			s ? Xa(e, t + 4 + 8 * c) : i,
			c ? Xa(e, t + 4) : a,
			l ? Xa(e, t + 4 + 8 * (c + s)) : o,
			1
		];
		r < 2 && G(13);
	}
	return [
		i,
		a,
		o,
		0
	];
};
function io(e, t) {
	for (var n = {}, r = e.length - 22; q(e, r) != 101010256; --r) (!r || e.length - r > 65558) && G(13);
	var i = K(e, r + 8);
	if (!i) return {};
	var a = q(e, r + 16), o = q(e, r - 20) == 117853008;
	if (o) {
		var s = q(e, r - 12);
		o = q(e, s) == 101075792, o && (i = q(e, s + 32), a = q(e, s + 48));
	}
	for (var c = t && t.filter, l = 0; l < i; ++l) {
		var u = no(e, a, o), d = u[0], f = u[1], p = u[2], m = u[3], h = u[4], g = u[5], _ = to(e, g);
		a = h, (!c || c({
			name: m,
			size: f,
			originalSize: p,
			compression: d
		})) && (d ? d == 8 ? n[m] = Za(e.subarray(_, _ + f), { out: new H(p) }) : G(14, "unknown compression type " + d) : n[m] = Ka(e, _, _ + f));
	}
	return n;
}
//#endregion
//#region src/domain/factory.ts
function ao(e, t) {
	let n = e.slice(0, t).map((e) => ({
		note: e.note,
		volume: e.volume,
		noteOff: e.noteOff,
		hold: e.hold ?? !1,
		effectLanes: { ...e.effectLanes }
	}));
	for (; n.length < t;) n.push({
		note: null,
		volume: null,
		noteOff: !1,
		hold: !1,
		effectLanes: {}
	});
	return n;
}
function oo() {
	return {
		id: Lr,
		name: "Master",
		kind: "master",
		volume: 1,
		pan: 0,
		mute: !1,
		solo: !1,
		effects: []
	};
}
function so(e) {
	let t = new Set(e);
	for (let e = 1;; e++) {
		let n = `Eff In ${String(e).padStart(2, "0")}`;
		if (!t.has(n)) return n;
	}
}
//#endregion
//#region src/domain/gameMusic.ts
var co = {
	groups: {},
	phraseBars: 4,
	fadeBars: 2,
	stays: [
		4,
		4,
		6,
		6,
		8
	]
}, lo = "play", uo = [
	"row",
	"beat",
	"bar"
], fo = [
	"up",
	"level",
	"down"
], po = (e) => typeof e == "object" && !!e && !Array.isArray(e), J = (e) => po(e) ? e : {}, mo = (e) => Array.isArray(e) ? e : [], ho = (e) => typeof e == "number" && Number.isFinite(e), go = (e, t) => ho(e) ? e : t, _o = (e, t) => Math.max(1, Math.round(go(e, t))), vo = (e, t, n) => Math.min(n, Math.max(t, e)), yo = (e) => [...new Set(mo(e).filter((e) => Number.isInteger(e) && e >= 1))];
function bo(e) {
	return Object.fromEntries(Object.entries(e).filter(([, e]) => e !== void 0));
}
function xo(e, t, n) {
	return bo({
		...e,
		cue: e.cue,
		energy: vo(go(e.energy, 3), 1, 5),
		bars: _o(e.bars, 4),
		toys: e.toys === void 0 ? void 0 : mo(e.toys).filter((e) => typeof e == "string" && n.has(e)),
		transition: typeof e.transition == "boolean" ? e.transition : void 0,
		next: e.next === void 0 ? void 0 : mo(e.next).filter((e) => typeof e == "string"),
		via: typeof e.via == "string" && t.cues.has(e.via) ? e.via : void 0,
		muted: e.muted === void 0 ? void 0 : yo(e.muted)
	});
}
function So(e) {
	let t = {};
	for (let [n, r] of Object.entries(J(e.groups))) t[n] = yo(r);
	let n = mo(e.stays).filter((e) => ho(e) && e > 0);
	return {
		...e,
		groups: t,
		phraseBars: _o(e.phraseBars, co.phraseBars),
		fadeBars: Math.max(0, go(e.fadeBars, co.fadeBars)),
		stays: n.length > 0 ? n : co.stays
	};
}
function Co(e) {
	return bo({
		...e,
		instrument: e.instrument,
		notes: mo(e.notes).filter(ho),
		at: uo.find((t) => t === e.at) ?? "row",
		rows: _o(e.rows, 1),
		velocity: ho(e.velocity) ? vo(e.velocity, 0, 127) : void 0
	});
}
function wo(e, t) {
	if (!po(e)) return;
	let n = (e) => typeof e == "string" && t.cues.has(e), r = So(J(e.dj)), i = new Set(Object.keys(r.groups)), a = J(e.song), o = mo(a.sections).filter((e) => po(e) && n(e.cue)).map((e) => xo(e, t, i)), s = new Set(o.map((e) => e.cue));
	for (let e of o) e.next &&= e.next.filter((e) => s.has(e));
	let c = typeof a.start == "string" && s.has(a.start) ? a.start : o[0]?.cue ?? "", l = J(a.peak), u = {};
	for (let [t, r] of Object.entries(J(e.moods))) t === "play" || !po(r) || !n(r.cue) || (u[t] = bo({
		...r,
		cue: r.cue,
		hit: n(r.hit) ? r.hit : void 0,
		muted: r.muted === void 0 ? void 0 : yo(r.muted),
		returns: typeof r.returns == "boolean" ? r.returns : void 0
	}));
	let d = {};
	for (let [t, n] of Object.entries(J(e.drops))) d[t] = yo(n);
	let f = {};
	for (let [n, r] of Object.entries(J(e.stingers))) po(r) && typeof r.instrument == "string" && t.instruments.has(r.instrument) && (f[n] = Co(r));
	let p = e.fills === void 0 ? void 0 : mo(e.fills).filter((e) => po(e) && n(e.cue) && fo.includes(e.goes)).map((e) => bo({
		...e,
		cue: e.cue,
		goes: e.goes,
		minEnergy: ho(e.minEnergy) ? e.minEnergy : void 0,
		maxEnergy: ho(e.maxEnergy) ? e.maxEnergy : void 0
	})), m = J(e.fill), h = J(e.levelUp), g = J(e.stops);
	return bo({
		...e,
		bar: _o(e.bar, t.linesPerBeat * 4),
		intro: n(e.intro) ? e.intro : void 0,
		song: bo({
			...a,
			start: c,
			sections: o,
			peak: typeof l.cue == "string" && s.has(l.cue) ? {
				...l,
				cue: l.cue,
				from: vo(go(l.from, .85), 0, 1)
			} : void 0
		}),
		dj: r,
		moods: u,
		fill: n(m.cue) ? bo({
			...m,
			cue: m.cue,
			minCascade: _o(m.minCascade, 3),
			minBarsApart: ho(m.minBarsApart) ? Math.max(0, m.minBarsApart) : void 0,
			minEnergy: ho(m.minEnergy) ? m.minEnergy : void 0
		}) : void 0,
		levelUp: n(h.cue) ? {
			...h,
			cue: h.cue
		} : void 0,
		fills: p,
		drops: d,
		stops: po(e.stops) ? {
			...g,
			tracks: yo(g.tracks),
			everyBars: _o(g.everyBars, 4),
			chance: vo(go(g.chance, .2), 0, 1),
			minEnergy: go(g.minEnergy, 0)
		} : void 0,
		stingers: f
	});
}
//#endregion
//#region src/persist/completeDoc.ts
var Y = (e) => typeof e == "object" && !!e && !Array.isArray(e), X = (e, t) => typeof e == "number" && Number.isFinite(e) ? e : t, Z = (e, t) => typeof e == "string" ? e : t, To = (e, t) => typeof e == "boolean" ? e : t, Q = (e) => Y(e) ? e : {}, Eo = (e) => Array.isArray(e) ? e : [], Do = (e) => typeof e == "string" && Object.hasOwn(Ti, e);
function Oo(e, t) {
	let n = Q(t), r = { ...n };
	for (let [t, i] of Object.entries(Oi(e))) r[t] = X(n[t], i);
	return r;
}
function ko(e) {
	let t = {};
	for (let [n, r] of Object.entries(Q(e.modules))) {
		if (!Y(r) || !Do(r.type)) continue;
		let e = Q(r.pos);
		t[n] = {
			...r,
			id: n,
			params: Oo(r.type, r.params),
			pos: {
				x: X(e.x, 0),
				y: X(e.y, 0)
			}
		};
	}
	let n = Z(e.outputId, "");
	if (t[n]?.type !== "output") {
		let r = Object.values(t).find((e) => e.type === "output");
		n = r ? r.id : `${Z(e.id, "inst")}:output`, t[n] ??= {
			id: n,
			type: "output",
			params: Oi("output"),
			pos: {
				x: 700,
				y: 160
			}
		};
	}
	let r = (e, n) => {
		let r = Q(e), i = t[Z(r.moduleId, "")];
		return !!i && Ti[i.type][n].includes(Z(r.port, ""));
	}, i = {};
	for (let [t, n] of Object.entries(Q(e.connections))) !Y(n) || !r(n.from, "outlets") || !r(n.to, "inlets") || (i[t] = {
		...n,
		id: t,
		gain: X(n.gain, 1)
	});
	return {
		...e,
		name: Z(e.name, "Synth"),
		modules: t,
		connections: i,
		outputId: n,
		effectSettings: {
			...Pr,
			...Q(e.effectSettings)
		},
		channelId: Z(e.channelId, Lr),
		pan: X(e.pan, 0)
	};
}
function Ao(e) {
	let t = Eo(e.slots).filter((e) => Y(e) && typeof e.note == "number").map((e) => {
		let { pitchOffset: t, gain: n, ...r } = e;
		return {
			...r,
			note: e.note,
			id: Z(e.id, `slot_${crypto.randomUUID()}`),
			sampleId: typeof e.sampleId == "string" ? e.sampleId : null,
			instrumentId: typeof e.instrumentId == "string" ? e.instrumentId : null,
			baseNote: X(e.baseNote, 60 + X(t, 0)),
			volume: X(e.volume, X(n, 1)),
			pan: X(e.pan, 0)
		};
	}).sort((e, t) => e.note - t.note);
	return {
		...e,
		name: Z(e.name, "Drum Kit"),
		slots: t,
		keyLo: X(e.keyLo, 36),
		keyHi: X(e.keyHi, 60),
		params: {
			...Q(e.params),
			gain: X(Q(e.params).gain, 1)
		},
		channelId: Z(e.channelId, Lr),
		pan: X(e.pan, 0)
	};
}
function jo(e, t) {
	let n = Eo(t.effects).filter((e) => Y(e) && Do(e.type)).map((e) => ({
		...e,
		id: Z(e.id, `chef_${crypto.randomUUID()}`),
		params: Oo(e.type, e.params)
	}));
	return {
		...t,
		id: e,
		name: Z(t.name, e === "master" ? "Master" : "Channel"),
		kind: e === "master" ? "master" : "sub",
		volume: X(t.volume, 1),
		pan: X(t.pan, 0),
		mute: To(t.mute, !1),
		solo: To(t.solo, !1),
		effects: n
	};
}
function Mo(e) {
	let t = Q(e);
	return {
		...t,
		note: typeof t.note == "number" ? t.note : null,
		volume: typeof t.volume == "number" ? t.volume : null,
		noteOff: To(t.noteOff, !1),
		hold: To(t.hold, !1),
		effectLanes: Q(t.effectLanes)
	};
}
function No(e) {
	if (!Y(e) || !Y(e.doc)) return e;
	let t = e.doc, n = Q(t.entities), r = {};
	for (let [e, t] of Object.entries(Q(n.mixChannels))) Y(t) && (r[e] = jo(e, t));
	r.master || (r[Lr] = oo());
	let i = {};
	for (let [e, t] of Object.entries(Q(n.instruments))) Y(t) && (t.kind === "modular" ? i[e] = ko({
		...t,
		id: e
	}) : t.kind === "drumkit" && (i[e] = Ao({
		...t,
		id: e
	})));
	let a = {};
	for (let [e, t] of Object.entries(Q(n.tracks))) Y(t) && (a[e] = {
		...t,
		id: e,
		cells: Eo(t.cells).map(Mo),
		effectLanes: Eo(t.effectLanes).filter(Y)
	});
	let o = {};
	for (let [e, t] of Object.entries(Q(n.patterns))) {
		if (!Y(t)) continue;
		let n = Eo(t.trackIds).filter((e) => typeof e == "string" && !!a[e]), r = Math.max(1, Math.round(X(t.length, a[n[0]]?.cells ? a[n[0]].cells.length : 16)));
		for (let e of n) {
			let t = a[e];
			t.cells.length !== r && (t.cells = ao(t.cells, r));
		}
		o[e] = {
			...t,
			id: e,
			name: Z(t.name, "Pattern"),
			length: r,
			trackIds: n
		};
	}
	let s = {};
	for (let [e, t] of Object.entries(Q(n.sections))) Y(t) && (s[e] = {
		...t,
		id: e,
		name: Z(t.name, "Section"),
		patternIds: Eo(t.patternIds).filter((e) => typeof e == "string" && !!o[e])
	});
	let c = Q(t.tempo), l = Math.max(1, Math.round(X(c.linesPerBeat, Rr.linesPerBeat))), u = Eo(t.sectionIds).filter((e) => typeof e == "string" && !!s[e]), d = (e, t) => e.flatMap((e) => [e, Z(t[e].name, "")]), f = wo(t.game, {
		cues: /* @__PURE__ */ new Set([...d(u, s), ...d(Object.keys(o), o)]),
		instruments: new Set(d(Object.keys(i), i)),
		linesPerBeat: l
	}), p = Eo(n.mixerInstrumentOrder).filter((e) => typeof e == "string" && !!i[e]), { game: m, ...h } = t;
	return {
		...e,
		doc: {
			...h,
			sectionIds: u,
			tempo: {
				bpm: Math.min(300, Math.max(20, X(c.bpm, Rr.bpm))),
				linesPerBeat: l
			},
			...f ? { game: f } : {},
			entities: {
				...n,
				instruments: i,
				tracks: a,
				patterns: o,
				sections: s,
				samples: Q(n.samples),
				mixChannels: r,
				mixerInstrumentOrder: [...new Set(p)]
			}
		}
	};
}
function Po(e) {
	let t;
	try {
		t = JSON.parse(e);
	} catch {
		throw Error("Not a valid song file: invalid JSON");
	}
	return Fo(t);
}
function Fo(e) {
	if (!$(e)) throw Error("Not a valid song file: expected an object");
	let t = e.schemaVersion;
	if (typeof t != "number") throw Error("Not a valid song file: missing schemaVersion");
	if (t > 18) throw Error(`Song file is version ${t}, newer than this app supports (18)`);
	return t < 2 && (e = Vo(e)), t < 3 && (e = Ho(e)), t < 4 && (e = Uo(e)), t < 5 && (e = Wo(e)), t < 6 && (e = Go(e)), t < 7 && (e = Ko(e)), t < 8 && (e = qo(e)), t < 9 && (e = Xo(e)), t < 10 && (e = Qo(e)), t < 12 && (e = Lo(e)), t < 13 && (e = zo(e)), t < 16 && (e = Bo(e)), e = ns(e), e = rs(e), e = $o(e), e = es(e), e = ts(e), e.schemaVersion !== 18 && (e = {
		...e,
		schemaVersion: 18
	}), e = No(e), Io(e), e;
}
function Io(e) {
	if (!$(e)) throw Error("Not a valid song file: expected an object");
	if (!$(e.meta) || typeof e.meta.name != "string") throw Error("Not a valid song file: missing meta.name");
	if (!$(e.doc) || !$(e.doc.entities)) throw Error("Not a valid song file: missing doc.entities");
	if (!$(e.doc.entities.samples)) throw Error("Not a valid song file: missing doc.entities.samples");
	if (!$(e.doc.entities.sections)) throw Error("Not a valid song file: missing doc.entities.sections");
	if (!Array.isArray(e.doc.sectionIds)) throw Error("Not a valid song file: missing doc.sectionIds");
	if (!$(e.doc.entities.mixChannels)) throw Error("Not a valid song file: missing doc.entities.mixChannels");
	if (!Array.isArray(e.doc.entities.mixerInstrumentOrder)) throw Error("Not a valid song file: missing doc.entities.mixerInstrumentOrder");
}
function $(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Lo(e) {
	let t = e.doc;
	if (!t || !$(t.entities) || !$(t.entities.instruments)) return e;
	let n = Object.fromEntries(Object.entries(t.entities.instruments).map(([e, t]) => [e, $(t) && t.kind === "modular" && t.voices === void 0 ? {
		...t,
		voices: 4
	} : t]));
	return {
		...e,
		schemaVersion: 12,
		doc: {
			...t,
			entities: {
				...t.entities,
				instruments: n
			}
		}
	};
}
var Ro = (e) => e.frames / e.sampleRate <= .25;
function zo(e) {
	let t = e.doc;
	if (!t || !$(t.entities)) return e;
	let n = Ni($(t.entities.samples) ? t.entities.samples : {}), r = (e) => {
		if (!$(e) || !Ti[e.type]?.samplePicker) return e;
		let { sampleIndex: t, ...r } = $(e.params) ? e.params : {}, i = typeof t == "number" ? Math.round(t) : 0, a = (e.type === "wave" ? n.filter(Ro) : n)[i]?.id;
		return {
			...e,
			params: r,
			...a ? { sampleId: a } : {}
		};
	}, i = (e) => {
		if (!$(e) || e.kind !== "modular" || !$(e.modules)) return e;
		let t = Object.fromEntries(Object.entries(e.modules).map(([e, t]) => [e, r(t)]));
		return Object.keys(t).some((n) => t[n] !== e.modules[n]) ? {
			...e,
			modules: t
		} : e;
	}, a = (e) => {
		if (!$(e) || !Array.isArray(e.effects)) return e;
		let t = e.effects.map(r);
		return t.some((t, n) => t !== e.effects[n]) ? {
			...e,
			effects: t
		} : e;
	}, o = (e, t) => $(e) ? Object.fromEntries(Object.entries(e).map(([e, n]) => [e, t(n)])) : e, s = o(t.entities.instruments, i), c = o(t.entities.mixChannels, a);
	return {
		...e,
		schemaVersion: 13,
		doc: {
			...t,
			entities: {
				...t.entities,
				instruments: s,
				mixChannels: c
			}
		}
	};
}
function Bo(e) {
	let t = e.doc;
	if (!t || !$(t.entities) || !$(t.entities.samples)) return e;
	let n = /* @__PURE__ */ new Set();
	for (let e of $(t.entities.instruments) ? Object.values(t.entities.instruments) : []) if (!(!$(e) || e.kind !== "modular" || !$(e.modules))) for (let t of Object.values(e.modules)) $(t) && t.type === "wave" && n.add(t.sampleId);
	let r = Object.fromEntries(Object.entries(t.entities.samples).map(([e, t]) => {
		let r = t;
		return [e, n.has(e) && !r.cycleLength && r.frames > 4096 && Ro(r) ? {
			...r,
			cycleLength: r.frames
		} : r];
	}));
	return {
		...e,
		schemaVersion: 16,
		doc: {
			...t,
			entities: {
				...t.entities,
				samples: r
			}
		}
	};
}
function Vo(e) {
	let t = e.doc;
	return t && $(t.entities) && !t.entities.samples ? {
		...e,
		doc: {
			...t,
			entities: {
				...t.entities,
				samples: {}
			}
		}
	} : e;
}
function Ho(e) {
	let t = e.doc;
	if (!t || !$(t.entities)) return e;
	let n = { ...t.entities };
	if (!n.sections || !$(n.sections)) {
		let e = {}, t = n.patterns ? Object.keys(n.patterns) : [];
		if (t.length > 0) {
			let n = "sec_migrated";
			e[n] = {
				id: n,
				name: "Section 1",
				patternIds: t
			};
		}
		n.sections = e;
	}
	let r = Array.isArray(e.doc.sectionIds) ? e.doc.sectionIds : [];
	if (r.length === 0 && n.sections) {
		let e = Object.keys(n.sections);
		e.length > 0 && r.push(e[0]);
	}
	if (n.tracks && $(n.tracks)) {
		let e = {};
		for (let [t, r] of Object.entries(n.tracks)) $(r) && Array.isArray(r.cells) ? e[t] = {
			...r,
			cells: r.cells.map((e) => $(e) ? {
				note: e.note ?? null,
				volume: e.volume ?? null,
				noteOff: e.noteOff ?? !1
			} : {
				note: null,
				volume: null,
				noteOff: !1
			})
		} : e[t] = r;
		n.tracks = e;
	}
	return {
		...e,
		schemaVersion: 3,
		doc: {
			...t,
			entities: n,
			sectionIds: r
		}
	};
}
function Uo(e) {
	let t = e.doc?.entities?.instruments;
	if (!t || !$(t)) return e;
	let n = !1, r = {};
	for (let [e, i] of Object.entries(t)) {
		if (!$(i) || i.kind !== "drumkit") {
			r[e] = i;
			continue;
		}
		let t = Array.isArray(i.slots) ? i.slots : [], a = [];
		for (let e of t) {
			if (!$(e)) continue;
			let t = typeof e.noteLo == "number" ? e.noteLo : typeof e.note == "number" ? e.note : 36;
			a.push({
				id: typeof e.id == "string" ? e.id : `slot_${crypto.randomUUID()}`,
				note: t,
				sampleId: typeof e.sampleId == "string" ? e.sampleId : null,
				instrumentId: typeof e.instrumentId == "string" ? e.instrumentId : null,
				pitchOffset: typeof e.pitchOffset == "number" ? e.pitchOffset : 0,
				gain: typeof e.gain == "number" ? e.gain : 1,
				pan: typeof e.pan == "number" ? e.pan : 0
			});
		}
		a.sort((e, t) => e.note - t.note), r[e] = {
			...i,
			slots: a,
			keyLo: typeof i.keyLo == "number" ? i.keyLo : 36,
			keyHi: typeof i.keyHi == "number" ? i.keyHi : 60
		}, n = !0;
	}
	return n ? {
		...e,
		schemaVersion: 4,
		doc: {
			...e.doc,
			entities: {
				...e.doc.entities,
				instruments: r
			}
		}
	} : e;
}
function Wo(e) {
	let t = e.doc?.entities;
	if (!t || !$(t.tracks)) return e;
	let n = !1, r = {};
	for (let [e, i] of Object.entries(t.tracks)) if ($(i) && Array.isArray(i.cells)) {
		let t = i.cells.map((e) => $(e) ? {
			...e,
			effect: e.effect ?? null,
			effectValue: e.effectValue ?? null
		} : {
			note: null,
			volume: null,
			noteOff: !1,
			effect: null,
			effectValue: null
		});
		i.cells.some((e) => $(e) && (e.effect === void 0 || e.effectValue === void 0)) && (n = !0), r[e] = {
			...i,
			cells: t
		};
	} else r[e] = i;
	return n ? {
		...e,
		schemaVersion: 5,
		doc: {
			...e.doc,
			entities: {
				...e.doc.entities,
				tracks: r
			}
		}
	} : {
		...e,
		schemaVersion: 5
	};
}
function Go(e) {
	let t = e.doc?.entities;
	if (!t || !$(t.tracks)) return e;
	let n = !1, r = {};
	for (let [e, i] of Object.entries(t.tracks)) $(i) && Array.isArray(i.cells) ? (r[e] = {
		...i,
		effectLanes: Array.isArray(i.effectLanes) ? i.effectLanes : [],
		cells: i.cells.map((e) => {
			if (!$(e)) return {
				note: null,
				volume: null,
				noteOff: !1,
				effectLanes: {}
			};
			let { effect: t, effectValue: n, ...r } = e;
			return {
				...r,
				effectLanes: $(e.effectLanes) ? e.effectLanes : {}
			};
		})
	}, n = !0) : r[e] = i;
	return n && (t.tracks = r), {
		...e,
		schemaVersion: 6,
		doc: {
			...e.doc,
			entities: t
		}
	};
}
function Ko(e) {
	let t = e.doc?.entities;
	if (!t || !$(t)) return e;
	let n = { ...t };
	if ((!n.mixChannels || !$(n.mixChannels)) && (n.mixChannels = { master: {
		id: "master",
		name: "Master",
		kind: "master",
		volume: 1,
		pan: 0,
		mute: !1,
		solo: !1,
		effects: []
	} }), !Array.isArray(n.mixerInstrumentOrder)) {
		let e = $(n.instruments) ? n.instruments : {};
		n.mixerInstrumentOrder = Object.keys(e);
	}
	if ($(n.instruments)) {
		let e = n.instruments, t = {};
		for (let [n, r] of Object.entries(e)) $(r) && (r.kind === "osc" || r.kind === "modular" || r.kind === "drumkit") ? t[n] = {
			...r,
			channelId: typeof r.channelId == "string" ? r.channelId : "master",
			pan: typeof r.pan == "number" ? r.pan : 0
		} : t[n] = r;
		n.instruments = t;
	}
	return {
		...e,
		schemaVersion: 7,
		doc: {
			...e.doc,
			entities: n
		}
	};
}
function qo(e) {
	let t = e.doc?.entities;
	if (!t || !$(t)) return e;
	let n = { ...t };
	if ($(n.instruments)) {
		let e = n.instruments, t = {};
		for (let [n, r] of Object.entries(e)) $(r) && r.kind === "drumkit" && Array.isArray(r.slots) ? t[n] = {
			...r,
			slots: r.slots.map((e) => {
				let t = $(e) ? e : {};
				return {
					...t,
					baseNote: 60 + (typeof t.pitchOffset == "number" ? t.pitchOffset : 0),
					volume: typeof t.gain == "number" ? t.gain : 1
				};
			})
		} : t[n] = r;
		n.instruments = t;
	}
	if ($(n.instruments)) {
		let e = n.instruments, t = {};
		for (let [n, r] of Object.entries(e)) if ($(r) && r.kind === "modular" && $(r.modules)) {
			let e = r.modules, i = {};
			for (let [t, n] of Object.entries(e)) if ($(n) && n.type === "sample" && $(n.params)) {
				let e = { ...n.params };
				delete e.centerNote, typeof e.playRate != "number" && (e.playRate = 0), typeof e.finetune != "number" && (e.finetune = 0), typeof e.pitchTrack != "number" && (e.pitchTrack = 1), i[t] = {
					...n,
					params: e
				};
			} else i[t] = n;
			t[n] = {
				...r,
				modules: i
			};
		} else t[n] = r;
		n.instruments = t;
	}
	return {
		...e,
		schemaVersion: 8,
		doc: {
			...e.doc,
			entities: n
		}
	};
}
var Jo = 125;
function Yo(e) {
	let t = Math.round(e / Jo / .25) * .25;
	return Math.min(16, Math.max(.25, t));
}
function Xo(e) {
	let t = e.doc?.entities;
	if (!t || !$(t)) return e;
	let n = { ...t }, r = !1;
	if ($(n.instruments)) {
		let e = n.instruments, t = {};
		for (let [n, i] of Object.entries(e)) if ($(i) && i.kind === "modular" && $(i.modules)) {
			let e = i.modules, a = {};
			for (let [t, n] of Object.entries(e)) $(n) && (n.type === "delay" || n.type === "echo") && $(n.params) && typeof n.params.time == "number" ? (a[t] = {
				...n,
				params: {
					...n.params,
					time: Yo(n.params.time)
				}
			}, r = !0) : a[t] = n;
			t[n] = {
				...i,
				modules: a
			};
		} else t[n] = i;
		n.instruments = t;
	}
	if ($(n.mixChannels)) {
		let e = n.mixChannels, t = {};
		for (let [n, i] of Object.entries(e)) if ($(i) && Array.isArray(i.effects)) {
			let e = i.effects.map((e) => $(e) && (e.type === "delay" || e.type === "echo") && $(e.params) && typeof e.params.time == "number" ? (r = !0, {
				...e,
				params: {
					...e.params,
					time: Yo(e.params.time)
				}
			}) : e);
			t[n] = {
				...i,
				effects: e
			};
		} else t[n] = i;
		n.mixChannels = t;
	}
	return r ? {
		...e,
		schemaVersion: 9,
		doc: {
			...e.doc,
			entities: n
		}
	} : {
		...e,
		schemaVersion: 9
	};
}
function Zo(e) {
	let t = (e) => `${e}_${crypto.randomUUID()}`, n = t("note"), r = t("gate"), i = t("osc"), a = t("adsr"), o = t("gain"), s = t("out"), c = {
		[n]: {
			id: n,
			type: "note",
			params: {},
			pos: {
				x: 40,
				y: 40
			}
		},
		[r]: {
			id: r,
			type: "gate",
			params: {},
			pos: {
				x: 40,
				y: 240
			}
		},
		[i]: {
			id: i,
			type: "osc",
			params: Oi("osc"),
			pos: {
				x: 260,
				y: 40
			}
		},
		[a]: {
			id: a,
			type: "adsr",
			params: Oi("adsr"),
			pos: {
				x: 260,
				y: 240
			}
		},
		[o]: {
			id: o,
			type: "gain",
			params: Oi("gain"),
			pos: {
				x: 480,
				y: 140
			}
		},
		[s]: {
			id: s,
			type: "output",
			params: {
				...Oi("output"),
				gain: e.params?.gain ?? 1
			},
			pos: {
				x: 700,
				y: 160
			}
		}
	}, l = (e, n, r, i) => {
		let a = t("con");
		return [a, {
			id: a,
			from: {
				moduleId: e,
				port: n
			},
			to: {
				moduleId: r,
				port: i
			},
			gain: 1
		}];
	}, u = Object.fromEntries([
		l(n, "freq", i, "freq"),
		l(i, "out", o, "in"),
		l(r, "gate", a, "gate"),
		l(a, "env", o, "mod"),
		l(o, "out", s, "inL")
	]);
	return {
		id: e.id,
		kind: "modular",
		name: e.name,
		modules: c,
		connections: u,
		outputId: s,
		effectSettings: e.effectSettings,
		channelId: typeof e.channelId == "string" ? e.channelId : "master",
		pan: typeof e.pan == "number" ? e.pan : 0,
		midiChannel: e.midiChannel
	};
}
function Qo(e) {
	let t = e.doc?.entities?.instruments;
	if (!t || !$(t)) return {
		...e,
		schemaVersion: 10
	};
	let n = !1, r = {};
	for (let [e, i] of Object.entries(t)) $(i) && i.kind === "osc" ? (r[e] = Zo(i), n = !0) : r[e] = i;
	return n ? {
		...e,
		schemaVersion: 10,
		doc: {
			...e.doc,
			entities: {
				...e.doc.entities,
				instruments: r
			}
		}
	} : {
		...e,
		schemaVersion: 10
	};
}
function $o(e) {
	let t = e.doc?.entities?.instruments;
	if (!t || !$(t)) return e;
	let n = !1, r = {};
	for (let [e, i] of Object.entries(t)) {
		if (!$(i) || i.kind !== "modular" || !$(i.modules)) {
			r[e] = i;
			continue;
		}
		let t = i.modules, a = $(i.connections) ? i.connections : {}, o = {}, s = {}, c = /* @__PURE__ */ new Map();
		for (let [e, r] of Object.entries(t)) if ($(r) && (r.type === "effect1" || r.type === "effect2")) {
			let t = `eff_${crypto.randomUUID()}`, i = r.type === "effect1" ? "01" : "02";
			c.set(e, t), o[t] = {
				id: t,
				type: "eff",
				name: `Eff ${i}`,
				params: { cc: typeof r.cc == "number" ? r.cc : 0 },
				pos: $(r.pos) ? r.pos : {
					x: 40,
					y: r.type === "effect2" ? 840 : 640
				}
			}, n = !0;
		} else o[e] = r;
		for (let [e, t] of Object.entries(a)) {
			if (!$(t) || !$(t.from) || !$(t.to)) {
				s[e] = t;
				continue;
			}
			let r = c.get(t.from.moduleId), i = c.get(t.to.moduleId);
			r || i ? (n = !0, s[e] = {
				...t,
				from: r ? {
					...t.from,
					moduleId: r
				} : t.from,
				to: i ? {
					...t.to,
					moduleId: i
				} : t.to
			}) : s[e] = t;
		}
		r[e] = n ? {
			...i,
			modules: o,
			connections: s
		} : i;
	}
	return n ? {
		...e,
		doc: {
			...e.doc,
			entities: {
				...e.doc.entities,
				instruments: r
			}
		}
	} : e;
}
function es(e) {
	let t = e.doc?.entities?.instruments;
	if (!t || !$(t)) return e;
	let n = !1, r = {};
	for (let [e, i] of Object.entries(t)) {
		if (!$(i) || i.kind !== "modular" || !$(i.modules)) {
			r[e] = i;
			continue;
		}
		let t = i.modules, a = /* @__PURE__ */ new Set(), o = {};
		for (let [e, r] of Object.entries(t)) {
			if (!$(r) || r.type !== "eff") {
				o[e] = r;
				continue;
			}
			let t = typeof r.name == "string" && r.name.trim() ? r.name.trim() : "";
			if (t && !a.has(t)) {
				a.add(t), o[e] = {
					...r,
					name: t
				};
				continue;
			}
			let i = so(a);
			a.add(i), o[e] = {
				...r,
				name: i
			}, n = !0;
		}
		n ? r[e] = {
			...i,
			modules: o
		} : r[e] = i;
	}
	return n ? {
		...e,
		doc: {
			...e.doc,
			entities: {
				...e.doc.entities,
				instruments: r
			}
		}
	} : e;
}
function ts(e) {
	let t = e.doc?.entities?.tracks;
	if (!t || !$(t)) return e;
	let n = !1, r = {};
	for (let [e, i] of Object.entries(t)) {
		if (!$(i) || !Array.isArray(i.effectLanes)) {
			r[e] = i;
			continue;
		}
		let t = i.effectLanes.map((e) => {
			if (e.type === "portaUp" || e.type === "portaDown") {
				n = !0;
				let t = e.type === "portaUp";
				return {
					...e,
					type: "portamento",
					_wasPortaDir: t ? "up" : "down"
				};
			}
			return e;
		});
		if (!n) {
			r[e] = i;
			continue;
		}
		let a = (Array.isArray(i.cells) ? i.cells : []).map((e) => {
			let n = e.effectLanes ?? {};
			if (!$(n)) return e;
			let r = {};
			for (let [e, i] of Object.entries(n)) {
				let n = t.find((t) => t.id === e);
				if (n && (n._wasPortaDir || n._wasPortaDir)) {
					let t = n._wasPortaDir === "up";
					typeof i == "number" ? r[e] = t ? .5 + i * .5 : .5 - i * .5 : r[e] = i;
				} else r[e] = i;
			}
			return {
				...e,
				effectLanes: r
			};
		}), o = t.map(({ _wasPortaDir: e, ...t }) => t);
		r[e] = {
			...i,
			effectLanes: o,
			cells: a
		};
	}
	return n ? {
		...e,
		doc: {
			...e.doc,
			entities: {
				...e.doc.entities,
				tracks: r
			}
		}
	} : e;
}
function ns(e) {
	let t = e.doc?.entities?.instruments;
	if (!t || !$(t)) return e;
	let n = !1, r = {};
	for (let [e, i] of Object.entries(t)) {
		if (!$(i) || i.kind !== "modular") {
			r[e] = i;
			continue;
		}
		let t = i.connections;
		if (!$(t)) {
			r[e] = i;
			continue;
		}
		let a = {};
		for (let [e, r] of Object.entries(t)) {
			if ($(r) && $(r.to) && r.to.port === "in") {
				let t = $(i.modules) ? i.modules[r.to.moduleId] : void 0;
				if ($(t) && t.type === "output") {
					a[e] = {
						...r,
						to: {
							...r.to,
							port: "inL"
						}
					}, n = !0;
					continue;
				}
			}
			a[e] = r;
		}
		r[e] = {
			...i,
			connections: a
		};
	}
	return n ? {
		...e,
		doc: {
			...e.doc,
			entities: {
				...e.doc.entities,
				instruments: r
			}
		}
	} : e;
}
function rs(e) {
	let t = e.doc?.entities?.instruments;
	if (!t || !$(t)) return e;
	let n = !1, r = {};
	for (let [e, i] of Object.entries(t)) {
		if (!$(i) || i.kind !== "modular" || !$(i.modules)) {
			r[e] = i;
			continue;
		}
		let t = i.modules, a = Object.values(t).some((e) => $(e) && e.type === "volume" && e.id !== "mod_volume_migrated"), o = {};
		for (let [e, r] of Object.entries(t)) {
			if (e === "mod_volume_migrated" && $(r) && r.type === "volume") {
				n = !0;
				continue;
			}
			o[e] = r;
		}
		if (!a) {
			let e = `vol_${crypto.randomUUID()}`;
			o[e] = {
				id: e,
				type: "volume",
				params: {},
				pos: {
					x: 40,
					y: 440
				}
			}, n = !0;
		}
		n ? r[e] = {
			...i,
			modules: o
		} : r[e] = i;
	}
	return n ? {
		...e,
		doc: {
			...e.doc,
			entities: {
				...e.doc.entities,
				instruments: r
			}
		}
	} : e;
}
//#endregion
//#region src/persist/songBundle.ts
function is(e) {
	let t = e instanceof Uint8Array ? e : new Uint8Array(e);
	if (t[0] === 123) return {
		file: Po(new TextDecoder().decode(t)),
		samples: /* @__PURE__ */ new Map()
	};
	let n = io(t), r = n["song.json"];
	if (!r) throw Error("Not a valid song file: missing song.json in zip");
	let i = /* @__PURE__ */ new Map();
	for (let [e, t] of Object.entries(n)) {
		let n = /^samples\/([0-9a-f]+)\.bin$/.exec(e);
		n && i.set(n[1], t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength));
	}
	return {
		file: Po(eo(r)),
		samples: i
	};
}
//#endregion
//#region src/player/songClock.ts
var as = 32;
function os(e) {
	return {
		rate: e,
		anchor: null,
		samples: [],
		lastRow: null
	};
}
var ss = (e, t) => ((e - t) % 1 + 1.5) % 1 - .5;
function cs(e, t, n) {
	let { rate: r, lastRow: i, anchor: a } = e;
	if (t === i) return e;
	if (a === null || i === null) return {
		...e,
		anchor: t + .5 - r * n,
		lastRow: t
	};
	if (t === i + 1 || t === 0) {
		let i = t - r * n, a = [...e.samples.slice(1 - as), i], o = Math.max(...a.map((e) => ss(e, i)));
		return {
			...e,
			anchor: i + o,
			samples: a,
			lastRow: t
		};
	}
	let o = r * n + a;
	return {
		...e,
		anchor: t + (o - Math.floor(o)) - r * n,
		lastRow: t
	};
}
function ls(e, t) {
	return e.anchor === null ? null : e.rate * t + e.anchor;
}
function us(e, t, n) {
	let r = ls(e, n);
	return {
		rate: t,
		anchor: r === null ? null : r - t * n,
		samples: [],
		lastRow: e.lastRow
	};
}
function ds(e, t, n) {
	let r = e / t, i = r / n;
	return {
		row: e,
		beat: r,
		beatPhase: r - Math.floor(r),
		beatInBar: Math.floor(r) % n,
		bar: Math.floor(i),
		barPhase: i - Math.floor(i)
	};
}
function fs(e, t, n) {
	let r = e - t;
	if (n > 0) for (; r < 0;) r += n;
	return Math.max(0, r);
}
//#endregion
//#region src/headless/SongPlayer.ts
var ps = 30, ms = .1, hs = class {
	host;
	doc = null;
	samples = /* @__PURE__ */ new Map();
	prepared = null;
	dataCache = /* @__PURE__ */ new Map();
	setTxSeq = null;
	txSeqNode = null;
	session = 0;
	uploadRev = 0;
	uploads = Promise.resolve();
	playing = !1;
	request = 0;
	current = null;
	transition = null;
	played = {
		startElapsed: 0,
		startRow: 0,
		loops: 0,
		lastRow: 0
	};
	left = /* @__PURE__ */ new Map();
	deferred = null;
	steps = [];
	noteTimers = /* @__PURE__ */ new Set();
	lastRow = 0;
	bpm;
	linesPerBeat;
	beatsPerBar;
	clock = os(1);
	clockCue = null;
	volume;
	muted = /* @__PURE__ */ new Set();
	levels = /* @__PURE__ */ new Map();
	trackLevels = /* @__PURE__ */ new Map();
	fades = /* @__PURE__ */ new Map();
	fadeTimer = null;
	rowListeners = /* @__PURE__ */ new Set();
	cueListeners = /* @__PURE__ */ new Set();
	constructor(e = {}) {
		this.bpm = Rr.bpm, this.linesPerBeat = Rr.linesPerBeat, this.beatsPerBar = e.beatsPerBar ?? 4, this.volume = e.volume ?? 1, this.host = new di({
			liveContext: () => ({
				doc: this.doc,
				freePlay: !1,
				selectedInstrumentId: null
			}),
			audioContext: e.audioContext,
			destination: e.destination
		}), this.host.onReady = () => this.attachTxSeq();
	}
	async load(e) {
		let t = "doc" in e ? {
			file: e,
			samples: /* @__PURE__ */ new Map()
		} : is(e);
		this.stop(), this.doc = t.file.doc, this.bpm = this.doc.tempo.bpm, this.linesPerBeat = this.doc.tempo.linesPerBeat, this.samples = t.samples, this.current = null, this.levels.clear(), this.trackLevels.clear(), this.fades.clear(), this.dataCache.clear(), this.prepared = null, this.host.isReady && await this.prepare();
	}
	async start() {
		await this.host.start(), this.doc && await this.prepare();
	}
	play(e) {
		return this.steps = [], this.restart(e);
	}
	async restart(e) {
		let t = this.requireDoc(), n = ++this.request;
		await this.prepare();
		let r = e ?? this.current?.cue ?? (t.sectionIds.length > 0 ? { song: !0 } : t.patternId), i = this.dataFor(r);
		for (; this.host.outputAgeMs < li;) await new Promise((e) => setTimeout(e, 50));
		n === this.request && (this.session++, this.transition = null, this.current = {
			cue: r,
			data: i,
			offset: 0
		}, this.played = {
			startElapsed: 0,
			startRow: 0,
			loops: 0,
			lastRow: 0
		}, this.left.clear(), this.dropDeferred(), this.lastRow = 0, this.clock = os(this.rowsPerSec), this.clockCue = null, this.playing = !0, this.host.paramRefs.setValue("transport:playing", 1), this.applyMutes(), await this.upload(i, "play"), this.emitCue(r));
	}
	cue(e, t = "end") {
		return this.steps = [], this.switchTo({
			cue: e,
			timing: t
		});
	}
	queue(e) {
		let [t, ...n] = e;
		return this.steps = n, t ? this.switchTo(t) : Promise.resolve();
	}
	switchTo(e) {
		let { cue: t, timing: n = "end", resume: r = !1 } = e;
		if (this.dropDeferred(), !this.playing || !this.current || n === "now") return this.restart(t);
		let i = this.transition;
		if (n === "sync" && !i) {
			let e = _a(this.dataFor(t), this.current.offset);
			return this.current = {
				cue: t,
				data: e,
				offset: this.current.offset
			}, this.applyMutes(), this.emitCue(t), this.upload(e, "update");
		}
		let a = Math.ceil(this.rowsPerSec * ms) + 1;
		if (Sa(this.current.data, i, this.lastRow, a)) return new Promise((t) => {
			this.deferred = {
				step: e,
				done: t
			};
		});
		i && i.cue !== this.current.cue && !(i.stage === "bridge" && this.lastRow < i.at) && (this.settleOn(i), this.applyMutes(), this.emitCue(i.cue));
		let o = xa(this.current.data, i, this.lastRow, this.current.offset), s = n === "end" ? o.length : n === "sync" ? 1 : n.every, c = Ca(o, this.lastRow, s, a), l = o.length, u = ((this.lastRow - o.start) % l + l) % l + (c - this.lastRow), { startElapsed: d, startRow: f, loops: p } = this.played, m = d + ya(f, p, u, l);
		this.left.set(gs(this.current.cue), {
			row: u % l,
			elapsed: m
		});
		let h = this.dataFor(t), g = r ? this.left.get(gs(t)) : void 0, _ = g ? va(g.row, m - g.elapsed, h.totalRows) : 0, v = ba(o.data, _a(h, _), c, o, _), y = {
			...v,
			cue: t,
			elapsedAt: m,
			stage: "bridge",
			landed: !1,
			finishing: !1
		};
		return this.transition = y, this.upload(v.bridge, "update").then(() => {
			y.landed = !0;
		});
	}
	settleOn(e) {
		this.current = {
			cue: e.cue,
			data: e.target,
			offset: e.toOffset
		}, this.played = {
			startElapsed: e.elapsedAt,
			startRow: e.toOffset,
			loops: 0,
			lastRow: e.toOffset
		};
	}
	dropDeferred() {
		this.deferred?.done(), this.deferred = null;
	}
	stop() {
		this.request++, this.steps = [];
		for (let e of this.noteTimers) clearTimeout(e);
		this.noteTimers.clear(), this.playing && (this.playing = !1, this.transition = null, this.dropDeferred(), this.host.paramRefs.setValue("transport:playing", 0), this.host.setTxSeqProps({ cmd: {
			type: "stop",
			sessionId: this.session
		} }));
	}
	setTrackMuted(e, t) {
		t ? this.muted.add(e) : this.muted.delete(e), this.applyMutes();
	}
	setMutedTracks(e) {
		this.muted = new Set(e), this.applyMutes();
	}
	setTrackLevel(e, t, n = 0) {
		let r = this.trackLevel(e);
		if (n <= 0 || r === t) {
			this.fades.delete(e), this.trackLevels.set(e, t), this.applyMutes(/* @__PURE__ */ new Set([e]));
			return;
		}
		this.fades.set(e, {
			from: r,
			to: t,
			start: performance.now(),
			ms: n * 1e3
		}), this.fadeTimer ??= setInterval(() => this.stepFades(), ps);
	}
	trackLevel(e) {
		return this.trackLevels.get(e) ?? 1;
	}
	stepFades() {
		let e = performance.now(), t = new Set(this.fades.keys());
		for (let [t, n] of this.fades) {
			let r = Math.min(1, (e - n.start) / n.ms);
			this.trackLevels.set(t, n.from + (n.to - n.from) * r), r >= 1 && this.fades.delete(t);
		}
		this.applyMutes(t), this.fades.size === 0 && this.fadeTimer && (clearInterval(this.fadeTimer), this.fadeTimer = null);
	}
	setInstrumentLevel(e, t) {
		let n = this.findInstrument(e);
		n && (this.levels.set(n.id, t), this.host.paramRefs.setValue(`${n.id}:gain`, ea(n) * t));
	}
	setVolume(e) {
		this.volume = e, this.host.paramRefs.setValue("player:volume", e);
	}
	setTempo(e, t = this.linesPerBeat) {
		this.bpm = e, this.linesPerBeat = t, this.host.paramRefs.setValue("transport:rowHz", this.rowsPerSec), this.host.setTxSeqProps({ rowsPerSec: this.rowsPerSec }), this.clock = us(this.clock, this.rowsPerSec, this.host.currentTime);
	}
	position(e = performance.now()) {
		let t = this.clockCue, n = t && this.playing ? ls(this.clock, this.host.outputTime(e)) : null;
		if (n === null || !t) return null;
		let r = (n % t.length + t.length) % t.length;
		return {
			cue: t.cue,
			rowsPerSecond: this.rowsPerSec,
			...ds(r, this.linesPerBeat, this.beatsPerBar)
		};
	}
	timeUntil(e, t = performance.now()) {
		let n = this.position(t);
		if (!n) return null;
		let r = e === "row" ? 1 : e === "beat" ? this.linesPerBeat : this.linesPerBeat * this.beatsPerBar;
		return (r - n.row % r) / n.rowsPerSecond;
	}
	noteOn(e, t, n = 127) {
		let r = this.findInstrument(e);
		r && this.host.isReady && this.host.live.noteOn(r.id, t, n);
	}
	playNote(e, t, n = {}) {
		let { at: r = "now", delayRows: i = 0, rows: a = 1, velocity: o = 127 } = n, s = 1 / this.rowsPerSec, c = r === "now" ? 0 : this.timeUntil(r), l = r === "beat" ? this.linesPerBeat : r === "bar" ? this.linesPerBeat * this.beatsPerBar : 1, u = Math.max(0, this.host.currentTime - this.host.outputTime()), d = c === null ? i * s : fs(c + i * s, r === "now" ? 0 : u, r === "now" ? 0 : l * s);
		this.later(d, () => {
			this.noteOn(e, t, o), this.later(a * s, () => this.noteOff(e, t));
		});
	}
	noteOff(e, t) {
		let n = this.findInstrument(e);
		n && this.host.isReady && this.host.live.noteOff(n.id, t);
	}
	panic() {
		this.stop(), this.host.panic();
	}
	onRow(e) {
		return this.rowListeners.add(e), () => this.rowListeners.delete(e);
	}
	onCue(e) {
		return this.cueListeners.add(e), () => this.cueListeners.delete(e);
	}
	get cues() {
		return this.doc ? la(this.doc) : [];
	}
	get game() {
		return this.doc?.game ?? null;
	}
	get instruments() {
		return this.doc ? Object.values(this.doc.entities.instruments).map(({ id: e, name: t }) => ({
			id: e,
			name: t
		})) : [];
	}
	get isPlaying() {
		return this.playing;
	}
	get currentCue() {
		return this.current?.cue ?? null;
	}
	get rowsPerSec() {
		return Nr(this.bpm, this.linesPerBeat);
	}
	later(e, t) {
		if (e <= 0) return t();
		let n = setTimeout(() => {
			this.noteTimers.delete(n), t();
		}, e * 1e3);
		this.noteTimers.add(n);
	}
	requireDoc() {
		if (!this.doc) throw Error("SongPlayer: no song loaded");
		return this.doc;
	}
	findInstrument(e) {
		let t = this.doc?.entities.instruments;
		if (t) return t[e] ?? Object.values(t).find((t) => t.name === e);
	}
	dataFor(e) {
		let t = gs(e), n = this.dataCache.get(t);
		if (!n) {
			let r = this.requireDoc(), i = ua(r, e);
			if (!i) throw Error(`SongPlayer: unknown cue ${t}`);
			n = ii(r, i), this.dataCache.set(t, n);
		}
		return n;
	}
	prepare() {
		return this.host.isReady ? (this.prepared ??= this.compile(this.requireDoc()), this.prepared) : Promise.reject(/* @__PURE__ */ Error("SongPlayer: call start() from a user gesture first"));
	}
	async compile(e) {
		let t = this.host, { loaded: n, l1Sums: r, decodedSizes: i } = await mi(t, Object.values(e.entities.samples), async (e) => this.samples.get(e) ?? null);
		if (e !== this.doc) return;
		t.paramRefs.clear();
		let a = oa(e, {
			rowHz: this.rowsPerSec,
			playing: 0,
			startRow: 0,
			playEpoch: 0,
			vfsLoadedHashes: n,
			l1Sums: r,
			decodedSizes: i,
			paramRefs: t.paramRefs,
			ccBindings: t.ccBindings,
			txSeq: this.txSeqNode,
			liveVoiceInstIds: [],
			ensureSlotInstId: null
		}), o = I.sm(t.paramRefs.getOrCreate("player:volume", this.volume));
		await t.render({
			left: I.mul(a.left, o),
			right: I.mul(a.right, o)
		});
		for (let [n, r] of this.levels) {
			let i = e.entities.instruments[n];
			i && t.paramRefs.setValue(`${n}:gain`, ea(i) * r);
		}
		this.applyMutes();
	}
	applyMutes(e) {
		if (!this.doc || !this.host.isReady) return;
		let t = this.current?.data.arrangement[0]?.patternId, n = (e) => this.muted.has(e) ? 0 : this.trackLevel(e);
		for (let [r, i] of ma(this.doc, n, t, e)) this.host.paramRefs.setValue(r, i);
	}
	upload(e, t) {
		let n = this.session;
		return this.uploads = this.uploads.then(async () => {
			let r = this.setTxSeq;
			if (!r || n !== this.session || !this.playing) return;
			let i = `txseq:${this.uploadRev++}`;
			await this.host.updateVfs({ [i]: sa(e) });
			let a = {
				type: t,
				sessionId: n,
				rowsPerSec: this.rowsPerSec,
				totalRows: e.totalRows,
				dataPath: i,
				...t === "play" ? { startRow: 0 } : {}
			};
			try {
				await r({
					cmd: a,
					dataPath: i
				});
			} catch (e) {
				console.warn("[SongPlayer] txSeq update failed:", e);
			}
			this.host.pruneVfs();
		}), this.uploads;
	}
	attachTxSeq() {
		let e = this.host.core;
		if (!e) return;
		let [t, n] = e.createRef("txseq", {
			key: "txseq",
			emitEvery: 4,
			name: "txseq"
		}, []);
		this.txSeqNode = t, this.setTxSeq = n, this.host.txSeqSetter = this.setTxSeq, e.on("txseq", (e) => {
			this.playing && e.sessionId === this.session && typeof e.row == "number" && this.onNodeRow(e.row);
		});
	}
	onNodeRow(e) {
		this.lastRow = e;
		let t = this.transition, n = this.current;
		if (!n) return;
		if (!t) {
			let t = n.data.totalRows;
			this.emitRow(n.cue, (e + n.offset) % t, t), this.runDeferred();
			return;
		}
		if (t.finishing) {
			let n = t.target.totalRows;
			this.emitRow(t.cue, ((e >= t.at ? e - t.at : e) + t.toOffset) % n, n);
			return;
		}
		let r = wa(t, t.stage, t.landed, e);
		r.send === "settle" ? (t.stage = "settle", t.landed = !1, this.upload(t.settle, "update").then(() => {
			t.landed = !0;
		}), this.settleOn(t), this.applyMutes(), this.emitCue(t.cue)) : r.send === "target" && (t.finishing = !0, this.upload(t.target, "update").then(() => {
			this.transition === t && (this.transition = null);
		})), r.sounding === "from" ? this.emitRow(n.cue, r.row, t.fromLength) : this.emitRow(t.cue, r.row, t.target.totalRows);
	}
	runDeferred() {
		let e = this.deferred;
		if (!e || !this.current) return;
		let t = Math.ceil(this.rowsPerSec * ms) + 1;
		Sa(this.current.data, this.transition, this.lastRow, t) || (this.deferred = null, this.switchTo(e.step).then(e.done));
	}
	emitRow(e, t, n) {
		e === this.current?.cue && (t < this.played.lastRow && this.played.loops++, this.played.lastRow = t), this.clock = cs(this.clock, t, this.host.currentTime), this.clockCue = {
			cue: e,
			length: n
		};
		for (let n of this.rowListeners) n({
			cue: e,
			row: t
		});
	}
	emitCue(e) {
		for (let t of this.cueListeners) t(e);
		let t = this.steps.shift();
		t && this.switchTo(t);
	}
}, gs = (e) => JSON.stringify(e);
//#endregion
//#region src/player/game/plans.ts
function _s(e, t) {
	let { sections: n, start: r } = e.song;
	return n.find((e) => e.cue === t) ?? n.find((e) => e.cue === r) ?? n[0];
}
function vs(e, t) {
	if (t.mood !== "play") {
		let n = e.moods[t.mood];
		return n ? {
			mood: t.mood,
			cue: n.cue,
			muted: n.muted ?? [],
			...n.hit ? { hit: n.hit } : {}
		} : null;
	}
	let n = _s(e, t.section);
	return n ? {
		mood: lo,
		cue: n.cue,
		muted: n.muted ?? [],
		via: n.via
	} : null;
}
function ys(e, t, n) {
	if (!t) return {
		kind: "cues",
		steps: [{
			cue: n.cue,
			timing: "now"
		}]
	};
	if (t.cue === n.cue) return Os(t.muted, n.muted) ? null : {
		kind: "layers",
		muted: n.muted
	};
	let r = { every: e.bar }, i = n.resume ? { resume: !0 } : {}, a = (e) => e ? {
		kind: "cues",
		steps: [{
			cue: e,
			timing: r
		}, {
			cue: n.cue,
			timing: "end",
			...i
		}]
	} : {
		kind: "cues",
		steps: [{
			cue: n.cue,
			timing: r,
			...i
		}]
	};
	return n.mood === "play" ? t.mood === "play" ? a(n.via) : e.moods[t.mood]?.returns ? {
		kind: "cues",
		steps: [{
			cue: n.cue,
			timing: r,
			resume: !0
		}]
	} : a(e.intro) : n.hit ? {
		kind: "cues",
		steps: [{
			cue: n.hit,
			timing: "now"
		}, {
			cue: n.cue,
			timing: "end"
		}]
	} : a(void 0);
}
function bs(e, t) {
	return !e || !t || e === t || t.energy === e.energy ? "level" : t.energy > e.energy ? "up" : "down";
}
function xs(e, t, n, r) {
	let i = (e.fills ?? []).filter((e) => e.goes === t && n >= (e.minEnergy ?? -Infinity) && n < (e.maxEnergy ?? Infinity));
	return i.length > 0 ? i[Math.min(i.length - 1, Math.floor(r() * i.length))].cue : void 0;
}
function Ss(e, t, n, r = Infinity, i = Math.random) {
	let a = e.fill;
	if (!a || t?.mood !== "play" || n !== a.minCascade || r < (a.minBarsApart ?? 0)) return null;
	let o = _s(e, t.cue)?.energy ?? 0, s = xs(e, "level", o, i) ?? (o >= (a.minEnergy ?? -Infinity) ? a.cue : void 0);
	return s ? {
		kind: "cues",
		steps: [{
			cue: s,
			timing: { every: e.bar }
		}, {
			cue: t.cue,
			timing: "end",
			resume: !0
		}],
		lands: !0
	} : null;
}
function Cs(e, t, n, r = Math.random) {
	if (t?.mood !== "play") return null;
	let i = n !== void 0 && n !== t.cue, a = _s(e, t.cue), o = i ? bs(a, _s(e, n)) : "level", s = xs(e, o, a?.energy ?? 0, r) ?? e.levelUp?.cue;
	if (!s) return null;
	let c = i ? {
		cue: n,
		timing: "end"
	} : {
		cue: t.cue,
		timing: "end",
		resume: !0
	};
	return {
		kind: "cues",
		steps: [{
			cue: s,
			timing: { every: e.bar }
		}, c],
		lands: o !== "down"
	};
}
function ws(e) {
	let t = (e.fills ?? []).map((e) => e.cue);
	return e.fill && t.push(e.fill.cue), e.levelUp && t.push(e.levelUp.cue), new Set(t);
}
function Ts(e, t) {
	return e && e.cue === t ? e.muted : [];
}
function Es(e, t) {
	let { notes: n } = e;
	return n[Math.min(Math.max(t, 1), n.length) - 1];
}
function Ds(e, t, n = 1) {
	let r = Math.min(Math.max(n, 1), 3);
	return Array.from({ length: r }, (n, r) => Es(e, t + r));
}
function Os(e, t) {
	let n = new Set(e);
	return e.length === t.length && t.every((e) => n.has(e));
}
//#endregion
//#region src/player/game/energy.ts
var ks = {
	heat: 0,
	rest: 0
}, As = .85, js = .9, Ms = 1.5;
function Ns(e) {
	return {
		heat: e.heat * As,
		rest: e.rest * js
	};
}
function Ps(e, t) {
	switch (t.kind) {
		case "reaction": return {
			...e,
			heat: Math.min(Ms, e.heat + .12 * (t.nr - 1))
		};
		case "levelUp": return {
			heat: 0,
			rest: 1
		};
		case "peakEnded": return {
			...e,
			rest: Math.max(e.rest, .7)
		};
	}
}
function Fs(e, t, n, r) {
	let i = 1.3 + 1.7 * t + .12 * Math.min(Math.max(n - 1, 0), 8) + 1.8 * e.heat - 2.2 * e.rest + r;
	return Math.min(5, Math.max(1, i));
}
function Is(e) {
	return [e.energy - (e.toys?.length ? 1.5 : 0), e.energy];
}
function Ls(e, t, n, r, i, a) {
	let o = t.next ? e.filter((e) => t.next.includes(e.cue)) : e.filter((e) => e.cue !== t.cue), s = o.find((e) => e.cue === a);
	if (s) return s;
	let c = o.length > 0 ? o : e, l = (e) => {
		let [t, r] = Is(e);
		return n < t ? t - n : n > r ? n - r : 0;
	}, u = (e) => -l(e) - (r.includes(e.cue) ? .8 : 0) + i() * .3;
	return c.map((e) => ({
		s: e,
		score: u(e)
	})).reduce((e, t) => t.score > e.score ? t : e).s;
}
function Rs(e, t, n, r) {
	return !e || t % e.everyBars !== 0 || n < e.minEnergy ? !1 : r() < e.chance;
}
//#endregion
//#region src/player/game/dj.ts
var zs = "drums", Bs = 1.5;
function Vs(e, t) {
	let n = e.energy - Bs;
	return Math.min(1, Math.max(0, (t - n) / Bs));
}
var Hs = (e, t) => e[Math.min(e.length - 1, Math.floor(t() * e.length))];
function Us(e, t, n, r, i = !1) {
	let a = e.toys ?? [], o = e.transition ? e.bars : e.bars * Hs(t.stays, r), s = Math.round(a.length * (1 - Vs(e, n)) * .6), c = i ? 0 : Math.min(a.length - 1, s), l = [], u = [...a];
	for (let e = 0; e < c; e++) l.push(...u.splice(Math.floor(r() * u.length), 1));
	return {
		section: e.cue,
		bars: 0,
		stay: o,
		out: l,
		cut: []
	};
}
function Ws(e) {
	return e.bars >= e.stay;
}
function Gs(e, t, n, r) {
	let i = t.toys ?? [];
	if (i.length === 0) return { kind: "hold" };
	let a = i.filter((t) => !e.out.includes(t)), o = e.out, s = a.length / i.length, c = Vs(t, n), l = (t) => {
		let n = t.filter((t) => t !== e.last);
		return Hs(n.length > 0 ? n : t, r);
	}, u = [
		["in", o.length > 0 ? s < c - .1 ? 4 : 1 : 0],
		["out", a.length > 1 ? s > c + .1 ? 4 : 1 : 0],
		["swap", o.length > 0 && a.length > 0 ? 2 : 0],
		["cut", a.includes(zs) && e.cut.length === 0 ? s > c ? 1.5 : .7 : 0],
		["hold", 4]
	], d = u.reduce((e, [, t]) => e + t, 0), f = r() * d, p = u.find(([, e]) => (f -= e) < 0)?.[0] ?? "hold";
	switch (p) {
		case "in": return {
			kind: p,
			part: l(o)
		};
		case "out": return {
			kind: p,
			part: l(a)
		};
		case "swap": return {
			kind: p,
			out: l(a),
			in: l(o)
		};
		case "cut": return {
			kind: p,
			part: zs
		};
		default: return { kind: "hold" };
	}
}
function Ks(e, t) {
	let n = new Set(e.out), r = e.last;
	switch (t.kind) {
		case "in":
			n.delete(t.part), r = t.part;
			break;
		case "out":
			n.add(t.part), r = t.part;
			break;
		case "swap":
			n.add(t.out), n.delete(t.in), r = t.in;
			break;
		case "cut":
			r = t.part;
			break;
	}
	return {
		...e,
		out: [...n],
		cut: t.kind === "cut" ? [t.part] : [],
		last: r
	};
}
function qs(e, t) {
	return e.cut.length > 0 || e.out.length === 0 ? { kind: "hold" } : {
		kind: "in",
		part: Hs(e.out, t)
	};
}
function Js(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let [r, i] of Object.entries(t.groups)) {
		let t = e.out.includes(r) || e.cut.includes(r);
		for (let e of i) n.set(e, +!t);
	}
	return n;
}
//#endregion
//#region src/headless/GameConductor.ts
var Ys = 4, Xs = 2, Zs = class {
	player;
	music;
	state;
	visit = null;
	nudged = !1;
	recentSections = [];
	energy = ks;
	sectionNoise = 0;
	lastRow = -1;
	lastMove = null;
	sounding = null;
	heard = null;
	dropped = [];
	layers = [];
	heldLayers = null;
	landing = !0;
	peakedLevel = 0;
	lastFillAt = -Infinity;
	enabled = !0;
	timers = /* @__PURE__ */ new Set();
	dropTimer = null;
	unsubscribe;
	random;
	log;
	constructor(e, t, n = {}) {
		this.player = e, this.music = t, this.random = n.random ?? Math.random, this.log = n.log ?? (() => {}), this.state = {
			mood: "",
			level: 1,
			progress: 0,
			section: t.song.start
		}, this.unsubscribe = [e.onRow(({ row: e }) => this.onRow(e)), e.onCue((e) => this.onCue(e))];
	}
	dispose() {
		this.unsubscribe.forEach((e) => e()), this.timers.forEach(clearTimeout), this.timers.clear();
	}
	setMood(e) {
		let t = this.state.mood === lo, n = this.music.moods[this.state.mood]?.returns;
		e === "play" && !t && !n && this.startSong(), this.state.mood = e, this.update();
	}
	setProgress(e, t) {
		this.state.level = e, this.state.progress = t;
		let n = _s(this.music, this.state.section), r = this.music.song.peak?.cue, i = n && !n.transition && n.energy < 4 && (!n.next || n.next.includes(r));
		this.headingForPeak && this.visit && i && n.cue !== r && (this.visit = {
			...this.visit,
			stay: Math.min(this.visit.stay, this.visit.bars)
		}, this.nudged = !0), this.update();
	}
	setEnabled(e) {
		this.enabled = e, this.update();
	}
	reaction(e, t = 1) {
		this.energy = Ps(this.energy, {
			kind: "reaction",
			nr: e
		}), e >= 2 && this.nudge();
		let { cascade: n } = this.music.stingers;
		n && this.playStinger(n, Ds(n, e, t));
		let r = performance.now(), i = (r - this.lastFillAt) / 1e3 / this.barSeconds, a = Ss(this.music, this.sounding, e, i, this.random);
		a && (this.lastFillAt = r), this.run(a);
	}
	key(e) {
		let { keys: t } = this.music.stingers;
		t && this.playStinger(t, [Es(t, e + 1)]);
	}
	levelUp(e) {
		let { levelUp: t } = this.music.stingers;
		t && this.playStinger(t), this.energy = Ps(this.energy, { kind: "levelUp" }), this.state.level = e, this.state.progress = 0;
		let n = _s(this.music, this.state.section);
		if (!(this.sounding?.mood !== "play" || !n) && !n.transition) {
			if (n.energy >= 4) {
				this.run(Cs(this.music, this.sounding, void 0, this.random)), this.visit &&= {
					...this.visit,
					stay: Math.max(this.visit.stay, this.visit.bars + n.bars)
				};
				return;
			}
			this.moveOn(n, (e) => Cs(this.music, this.sounding, e, this.random));
		}
	}
	stinger(e) {
		let t = this.music.stingers[e];
		t && this.playStinger(t);
	}
	nudge() {
		this.visit && Ws(this.visit) && (this.nudged = !0);
	}
	drop(e, t = 0) {
		let n = this.music.drops[e];
		n && this.sounding && this.dropUntilBar(n, t * this.barSeconds);
	}
	get conducting() {
		return this.sounding !== null;
	}
	get mood() {
		return this.state.mood;
	}
	position() {
		return this.sounding ? this.player.position() : null;
	}
	snapshot() {
		let { mood: e, section: t, level: n, progress: r } = this.state;
		return {
			mood: e,
			section: t,
			level: n,
			progress: r,
			sounding: this.sounding?.cue ?? null,
			visit: this.visit,
			due: this.visit ? Ws(this.visit) : !1,
			nudged: this.nudged,
			energy: this.energy,
			target: this.liveEnergy,
			lastMove: this.lastMove
		};
	}
	startSong() {
		this.state.section = this.music.song.start, this.visit = null, this.nudged = !1, this.recentSections = [], this.energy = ks, this.sectionNoise = 0, this.lastMove = null;
	}
	get headingForPeak() {
		let { peak: e } = this.music.song;
		return !!e && this.state.progress >= e.from && this.peakedLevel !== this.state.level;
	}
	get liveEnergy() {
		let { level: e, progress: t } = this.state;
		return Fs(this.energy, t, e, this.sectionNoise);
	}
	get barSeconds() {
		let e = this.player.position()?.rowsPerSecond ?? 8;
		return this.music.bar / e;
	}
	onRow(e) {
		let t = e === this.lastRow;
		this.lastRow = e;
		let { bar: n } = this.music;
		if (t || e % n !== n - Ys) return;
		this.energy = Ns(this.energy);
		let r = _s(this.music, this.state.section);
		if (this.sounding?.mood !== "play" || !r) return;
		let i = this.visit ?? Us(r, this.music.dj, this.liveEnergy, this.random);
		if (this.visit = {
			...i,
			bars: i.bars + 1
		}, Ws(this.visit) && (r.transition || this.nudged)) {
			this.moveOn(r);
			return;
		}
		if (Rs(this.music.stops, this.visit.bars, this.liveEnergy, this.random) && this.dropUntilBar(this.music.stops.tracks, 0), this.visit.bars % this.music.dj.phraseBars === 0) {
			let e = Gs(this.visit, r, this.liveEnergy, this.random), t = this.visit;
			this.visit = Ks(t, e), this.lastMove = e, this.log("dj", r.cue, e), this.playVisit(t);
		}
	}
	onCue(e) {
		let t = this.heard;
		this.heard = e;
		let n = this.isFill(e);
		this.heldLayers = n ? this.heldLayers ?? this.layers : null, this.isFill(t) && !n && this.land(), this.applyMutes(), n || this.playVisit();
	}
	isFill(e) {
		return typeof e == "string" && ws(this.music).has(e);
	}
	land() {
		if (!this.landing || !this.visit || this.sounding?.mood !== "play" || this.heard !== this.sounding.cue) return;
		let e = qs(this.visit, this.random);
		this.visit = Ks(this.visit, e), this.lastMove = e, this.log("dj", this.visit.section, "landing", e);
	}
	moveOn(e, t) {
		e.energy >= 4 && (this.energy = Ps(this.energy, { kind: "peakEnded" })), this.sectionNoise = (this.random() - .5) * .6;
		let n = this.liveEnergy, { peak: r } = this.music.song, i = this.headingForPeak ? r?.cue : void 0, a = Ls(this.music.song.sections, e, n, this.recentSections, this.random, i);
		if (a.cue === r?.cue && (this.peakedLevel = this.state.level), this.recentSections = [e.cue, ...this.recentSections].slice(0, Xs), this.state.section = a.cue, this.visit = Us(a, this.music.dj, n, this.random, e.transition), this.nudged = !1, this.lastMove = null, this.log("section", a.cue, "energy", n.toFixed(1), "for", this.visit.stay, "bars"), !t) {
			this.update();
			return;
		}
		this.run(t(a.cue)), this.sounding = vs(this.music, this.state);
	}
	get djTracks() {
		return Object.values(this.music.dj.groups).flat();
	}
	playVisit(e) {
		let { player: t } = this, { groups: n } = this.music.dj, r = this.music.dj.fadeBars * this.barSeconds, i = () => {
			if (this.heldLayers) return;
			let { visit: i, sounding: a } = this, o = i && a?.mood === "play" && this.heard === a.cue ? Js(i, this.music.dj) : /* @__PURE__ */ new Map(), s = new Set([...i?.cut ?? [], ...e?.cut ?? []].flatMap((e) => n[e] ?? []));
			for (let n of this.djTracks) {
				let i = o.get(n) ?? 1;
				t.trackLevel(n) !== i && t.setTrackLevel(n, i, e && !s.has(n) ? r : 0);
			}
		};
		if (!e) return i();
		this.later((t.timeUntil("bar") ?? 0) * 1e3, i);
	}
	dropUntilBar(e, t) {
		let n = this.player.timeUntil("bar");
		n != null && (this.dropTimer && this.clear(this.dropTimer), this.dropped = e, this.applyMutes(), this.dropTimer = this.later((n < t ? n + this.barSeconds : n) * 1e3, () => {
			this.dropped = [], this.applyMutes();
		}));
	}
	update() {
		if (!this.enabled || !this.state.mood) {
			this.sounding && this.player.stop(), this.sounding = null, this.heard = null, this.heldLayers = null;
			return;
		}
		let e = vs(this.music, this.state);
		if (!e) return;
		let t = ys(this.music, this.sounding, e);
		t && (this.log("music", this.sounding?.cue ?? "silent", "→", e.cue), this.sounding = e, this.run(t));
	}
	run(e) {
		if (e) {
			if (e.kind === "layers") {
				this.applyMutes();
				return;
			}
			e.lands !== void 0 && (this.landing = e.lands), this.player.queue(e.steps).catch((t) => this.log("cue failed", e.steps, t));
		}
	}
	applyMutes() {
		this.layers = this.heldLayers ?? Ts(this.sounding, this.heard), this.player.setMutedTracks([...this.layers, ...this.dropped]);
	}
	playStinger(e, t = e.notes) {
		this.sounding && t.forEach((t, n) => this.player.playNote(e.instrument, t, {
			at: e.at,
			delayRows: n,
			rows: e.rows,
			velocity: e.velocity
		}));
	}
	later(e, t) {
		let n = setTimeout(() => {
			this.timers.delete(n), t();
		}, e);
		return this.timers.add(n), n;
	}
	clear(e) {
		clearTimeout(e), this.timers.delete(e);
	}
};
//#endregion
export { Zs as GameConductor, lo as PLAY_MOOD, hs as SongPlayer, is as unpackSongBundle };

