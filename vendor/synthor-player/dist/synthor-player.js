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
}), Er = "const EventTypes = {\n  CREATE_NODE: 0,\n  APPEND_CHILD: 2,\n  SET_PROPERTY: 3,\n  ACTIVATE_ROOTS: 4,\n  COMMIT_UPDATES: 5,\n  UPDATE_RESOURCE_MAP: 6,\n  RESET: 7,\n};\n\n\n// A recursive function looking for transferable objects per the Web Worker API\n// @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects\n//\n// Right now we're only looking for the ArrayBuffers behind Float32Array instances as that's\n// the only type of transferable object that the native engine delivers, but this could be\n// extended to other types easily.\nfunction findTransferables(val, transferables = []) {\n  if (val instanceof Float32Array) {\n    transferables.push(val.buffer);\n  } else if (typeof val === 'object') {\n    if (Array.isArray(val)) {\n      for (let i = 0; i < val.length; ++i) {\n        findTransferables(val[i], transferables);\n      }\n    } else if (val !== null) {\n      for (let key of Object.keys(val)) {\n        findTransferables(val[key], transferables);\n      }\n    }\n  }\n\n  return transferables;\n}\n\nclass ElementaryAudioWorkletProcessor extends AudioWorkletProcessor {\n  constructor(options) {\n    super(options);\n\n    const numInputChannels = options.numberOfInputs;\n    const numOutputChannels = options.outputChannelCount.reduce((acc, next) => acc + next, 0);\n\n    this._module = Module();\n    this._native = new this._module.ElementaryAudioProcessor(numInputChannels, numOutputChannels);\n\n    // The `sampleRate` variable is a globally defined constant in the AudioWorkletGlobalScope.\n    // We also manually set a block size of 128 samples here, per the Web Audio API spec.\n    //\n    // See: https://webaudio.github.io/web-audio-api/#rendering-loop\n    this._native.prepare(sampleRate, 128);\n\n    const hasProcOpts = options.hasOwnProperty('processorOptions') &&\n      typeof options.processorOptions === 'object' &&\n      options.processorOptions !== null;\n\n    if (hasProcOpts) {\n      const {virtualFileSystem, ...other} = options.processorOptions;\n\n      const validVFS = typeof virtualFileSystem === 'object' &&\n        virtualFileSystem !== null &&\n        Object.keys(virtualFileSystem).length > 0;\n\n      if (validVFS) {\n        for (let [key, val] of Object.entries(virtualFileSystem)) {\n          let result = this._native.addSharedResource(key, val);\n\n          if (!result.success) {\n            this.port.postMessage(['error', result.message]);\n          }\n        }\n      }\n    }\n\n    this.port.onmessage = (e) => {\n      let {requestId, requestType, payload} = e.data;\n\n      switch (requestType) {\n        case 'processQueuedEvents':\n          this._native.processQueuedEvents((evtBatch) => {\n            if (evtBatch.length > 0) {\n              let transferables = findTransferables(evtBatch);\n              this.port.postMessage(['events', evtBatch], transferables);\n            }\n          });\n\n          break;\n        case 'renderInstructions':\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: this._native.postMessageBatch(payload.batch),\n          }]);\n        case 'updateSharedResourceMap':\n          for (let [key, val] of Object.entries(payload.resources)) {\n            let result = this._native.addSharedResource(key, val);\n\n            if (!result.success) {\n              return this.port.postMessage(['reply', {\n                requestId,\n                result,\n              }]);\n            }\n          }\n\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: null,\n          }]);\n        case 'reset':\n          this._native.reset();\n\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: null,\n          }]);\n        case 'gc':\n          let pruned = this._native.gc();\n\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: pruned,\n          }]);\n        case 'pruneVirtualFileSystem':\n          this._native.pruneSharedResources();\n\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: null,\n          }]);\n        case 'listVirtualFileSystem':\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: this._native.listSharedResources(),\n          }]);\n        case 'setCurrentTime':\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: this._native.setCurrentTime(payload.time),\n          }]);\n        case 'setCurrentTimeMs':\n          return this.port.postMessage(['reply', {\n            requestId,\n            result: this._native.setCurrentTimeMs(payload.time),\n          }]);\n        default:\n          break;\n      }\n    };\n\n    this.port.postMessage(['load', {\n      sampleRate,\n      blockSize: 128,\n      numInputChannels,\n      numOutputChannels,\n    }]);\n  }\n\n  process (inputs, outputs, parameters) {\n    if (inputs.length > 0) {\n      let m = 0;\n\n      // For each input\n      for (let i = 0; i < inputs.length; ++i) {\n        // For each channel on this input\n        for (let j = 0; j < inputs[i].length; ++j) {\n          const internalInputData = this._native.getInputBufferData(m++);\n\n          // For each sample on this input channel\n          for (let k = 0; k < inputs[i][j].length; ++k) {\n            internalInputData[k] = inputs[i][j][k];\n          }\n        }\n      }\n    }\n\n    const numSamples = (outputs.length > 0 && outputs[0].length > 0)\n      ? outputs[0][0].length\n      : 0;\n\n    this._native.process(numSamples);\n\n    if (outputs.length > 0) {\n      let m = 0;\n\n      // For each output\n      for (let i = 0; i < outputs.length; ++i) {\n        // For each channel on this output\n        for (let j = 0; j < outputs[i].length; ++j) {\n          const internalOutputData = this._native.getOutputBufferData(m++);\n\n          // For each sample on this input channel\n          for (let k = 0; k < outputs[i][j].length; ++k) {\n            outputs[i][j][k] = internalOutputData[k];\n          }\n        }\n      }\n    }\n\n    // Tells the browser to keep this node alive and continue calling process\n    return true;\n  }\n}\n\nregisterProcessor(`ElementaryAudioWorkletProcessor@${\"4.0.3\"}`, ElementaryAudioWorkletProcessor);\n", Dr = "\nvar Module = (() => {\n  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;\n  \n  return (\nfunction(moduleArg = {}) {\n\nvar l=moduleArg,aa,ba;l.ready=new Promise((a,b)=>{aa=a;ba=b});if(\"function\"!==typeof globalThis?.crypto?.getRandomValues){function a(b){for(var c=0;c<b.length;c++)b[c]=256*Math.random()|0}\"object\"===typeof globalThis.crypto?globalThis.crypto.getRandomValues=a:globalThis.crypto={getRandomValues:a}}var ca=Object.assign({},l),da;da=a=>{if(\"function\"==typeof readbuffer)return new Uint8Array(readbuffer(a));a=read(a,\"binary\");\"object\"==typeof a||p();return a};\n\"undefined\"==typeof clearTimeout&&(globalThis.clearTimeout=()=>{});\"undefined\"==typeof setTimeout&&(globalThis.setTimeout=a=>\"function\"==typeof a?a():p());\"undefined\"!=typeof print&&(\"undefined\"==typeof console&&(console={}),console.log=print,console.warn=console.error=\"undefined\"!=typeof printErr?printErr:print);var ea=l.printErr||console.error.bind(console);Object.assign(l,ca);ca=null;var fa;l.wasmBinary&&(fa=l.wasmBinary);\"object\"!=typeof WebAssembly&&p(\"no native wasm support detected\");\n\"undefined\"==typeof atob&&(\"undefined\"!=typeof global&&\"undefined\"==typeof globalThis&&(globalThis=global),globalThis.atob=function(a){var b=\"\",c=0;a=a.replace(/[^A-Za-z0-9\\+\\/=]/g,\"\");do{var d=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\".indexOf(a.charAt(c++));var e=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\".indexOf(a.charAt(c++));var g=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\".indexOf(a.charAt(c++));var f=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\".indexOf(a.charAt(c++));\nd=d<<2|e>>4;e=(e&15)<<4|g>>2;var h=(g&3)<<6|f;b+=String.fromCharCode(d);64!==g&&(b+=String.fromCharCode(e));64!==f&&(b+=String.fromCharCode(h))}while(c<a.length);return b});var w,ha=!1,ia,x,y,z,A,B,ja,ka;function la(){var a=w.buffer;l.HEAP8=ia=new Int8Array(a);l.HEAP16=y=new Int16Array(a);l.HEAPU8=x=new Uint8Array(a);l.HEAPU16=z=new Uint16Array(a);l.HEAP32=A=new Int32Array(a);l.HEAPU32=B=new Uint32Array(a);l.HEAPF32=ja=new Float32Array(a);l.HEAPF64=ka=new Float64Array(a)}var ma=[],na=[],oa=[];\nfunction pa(){var a=l.preRun.shift();ma.unshift(a)}var D=0,qa=null,E=null;function p(a){l.onAbort?.(a);a=\"Aborted(\"+a+\")\";ea(a);ha=!0;a=new WebAssembly.RuntimeError(a+\". Build with -sASSERTIONS for more info.\");ba(a);throw a;}var ra=a=>a.startsWith(\"data:application/octet-stream;base64,\"),F;F=\"data:application/octet-stream;base64,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KAIANgIAIAFBBGohASAAQQRqIQAgAkEEayICQQNLDQALCyACRQ0AA0AgACABLQAAOgAAIABBAWohACABQQFqIQEgAkEBayICDQALCwsuAQF/QQQQXSIAQYCEBDYCACAAQdiDBDYCACAAQeyDBDYCACAAQdyEBEE2EAsAC70BAgJ8An8jAEEQayIDJAACfCAAvUIgiKdB/////wdxIgRB+8Ok/wNNBEBEAAAAAAAA8D8gBEGewZryA0kNARogAEQAAAAAAAAAABBfDAELIAAgAKEgBEGAgMD/B08NABogACADEHghBCADKwMIIQAgAysDACEBAkACQAJAAkAgBEEDcQ4DAAECAwsgASAAEF8MAwsgASAAQQEQXpoMAgsgASAAEF+aDAELIAEgAEEBEF4LIQIgA0EQaiQAIAILHwBBCBBdIAAQjAEiAEHUhQQ2AgAgAEH0hQRBNxALAAuxAQEBfyMAQTBrIgIkACABBEAgACABKAIAEDggACABKAIEEDggAS0AOCIAQf8BRwRAIAJBGzYCLCACQRw2AiggAkEdNgIkIAJBHjYCICACQR82AhwgAkEgNgIYIAJBITYCFCACQSI2AhAgAkEjNgIMIAJBC2ogAUEgaiACQQxqIABBAnRqKAIAEQEACyABQf8BOgA4IAEsABtBAEgEQCABKAIQECILIAEQIgsgAkEwaiQAC+QFAQl/IAEoAgQgAS0ACyICIALAQQBIIgIbIgghAyABKAIAIAEgAhsiBiEBAkAgCCICQQRJDQACfyACQQRrIgJBBHEEQCAIIQQgBgwBCyAGKAAAQZXTx94FbCIBQRh2IAFzQZXTx94FbCAIQZXTx94FbHMhAyACIQQgBkEEagshASACQQRJDQAgBCECA0AgASgABEGV08feBWwiBEEYdiAEc0GV08feBWwgASgAAEGV08feBWwiBEEYdiAEc0GV08feBWwgA0GV08feBWxzQZXTx94FbHMhAyABQQhqIQEgAkEIayICQQNLDQALCwJAAkACQAJAIAJBAWsOAwIBAAMLIAEtAAJBEHQgA3MhAwsgAS0AAUEIdCADcyEDCyADIAEtAABzQZXTx94FbCEDCwJAAkAgACgCBCIFRQ0AIANBDXYgA3NBldPH3gVsIgFBD3YgAXMhByAAKAIAAn8gByAFQQFrcSAFaSICQQFNDQAaIAcgBSAHSw0AGiAHIAVwCyIKQQJ0aigCACIARQ0AIAAoAgAiAUUNACACQQFNBEAgBUEBayEAA0ACQCABKAIEIgIgB0cEQCAAIAJxIApGDQFBAA8LIAEoAgwiAiABLQATIgQgBMAiBUEASCIJGyAIRw0AIAFBCGohAyAJRQRAIAYhAiAFRQ0FA0AgAy0AACACLQAARw0CIAJBAWohAiADQQFqIQMgBEEBayIEDQALDAULIAMoAgAgBiACECcNAAwECyABKAIAIgENAAsMAQsDQAJAIAEoAgQiAyAHRwRAIAMgBU8EfyADIAVwBSADCyAKRg0BQQAPCyABKAIMIgAgAS0AEyIEIATAIglBAEgiAhsgCEcNACABQQhqIQMgAkUEQCAGIQIgCUUNBANAIAMtAAAgAi0AAEcNAiACQQFqIQIgA0EBaiEDIARBAWsiBA0ACwwECyADKAIAIAYgABAnDQAMAwsgASgCACIBDQALC0EADwsgAQv4AgEHfyAAKAIIIgIgACgCBCIBa0EDdUEgTwRAIAAgAUGAAhAlQYACajYCBA8LAkACQAJAIAEgACgCACIEa0EDdSIFQSBqIgNBgICAgAJJBEBB/////wEgAiAEayICQQJ1IgYgAyADIAZJGyACQfj///8HTxsiAgRAIAJBgICAgAJPDQIgAkEDdBAjIQcLIAcgBUEDdGoiA0GAAhAlIgZBgAJqIQUgByACQQN0aiECIAEgBEYNAgNAIANBCGsiAyABQQhrIgEoAgA2AgAgAyABKAIENgIEIAFCADcCACABIARHDQALIAAgAjYCCCAAKAIEIQQgACAFNgIEIAAoAgAhASAAIAM2AgAgASAERg0DA0ACQCAEQQhrIgQoAgQiAEUNACAAIAAoAgQiA0EBazYCBCADDQAgACAAKAIAKAIIEQAAIAAQJgsgASAERw0ACwwDCxAtAAsQNQALIAAgAjYCCCAAIAU2AgQgACAGNgIACyABBEAgARAiCwscAQF/QQQQXSIAQeT8AzYCACAAQYj9A0E2EAsAC3QBAX8gAkUEQCAAKAIEIAEoAgRGDwsgACABRgRAQQEPCyABKAIEIgItAAAhAQJAIAAoAgQiAy0AACIARQ0AIAAgAUcNAANAIAItAAEhASADLQABIgBFDQEgAkEBaiECIANBAWohAyAAIAFGDQALCyAAIAFGC3YBA38gARBCIgJB8P///wdJBEACQAJAIAJBC08EQCACQQ9yQQFqIgQQIyEDIAAgBEGAgICAeHI2AgggACADNgIAIAAgAjYCBAwBCyAAIAI6AAsgACEDIAJFDQELIAMgASACEDQLIAIgA2pBADoAACAADwsQSAAL/wIBA38jAEHwAGsiAyQAIAAoAgAiBUEEaygCACEEIAVBCGsoAgAhBSADQgA3AlAgA0IANwJYIANCADcCYCADQgA3AGcgA0IANwJIIANBADYCRCADIAE2AkAgAyAANgI8IAMgAjYCOCAAIAVqIQECQCAEIAJBABA8BEBBACABIAUbIQAMAQsgACABTgRAIANCADcALyADQgA3AhggA0IANwIgIANCADcCKCADQgA3AhAgA0EANgIMIAMgAjYCCCADIAA2AgQgAyAENgIAIANBATYCMCAEIAMgASABQQFBACAEKAIAKAIUEQoAIAMoAhgNAQtBACEAIAQgA0E4aiABQQFBACAEKAIAKAIYEQUAAkACQCADKAJcDgIAAQILIAMoAkxBACADKAJYQQFGG0EAIAMoAlRBAUYbQQAgAygCYEEBRhshAAwBCyADKAJQQQFHBEAgAygCYA0BIAMoAlRBAUcNASADKAJYQQFHDQELIAMoAkghAAsgA0HwAGokACAAC7kBAQZ/AkACQCAAKAIEIgBFDQAgASgCACABIAEtAAsiAsBBAEgiAxshBCABKAIEIAIgAxshAQNAIAQgACgCECAAQRBqIAAtABsiAsBBAEgiAxsiBSAAKAIUIAIgAxsiAiABIAEgAksiAxsiBhAnIgdBAEggASACSSAHG0EBRgRAIAAoAgAiAA0BDAILIAUgBCAGECciAkEASCADIAIbQQFHDQIgACgCBCIADQALC0HEExA3AAsgAEEgagv/AgEFfwJAAkACQCAAKAIEIAAoAgAiA2siBEEMbSIFQQFqIgJB1qrVqgFJBEBB1arVqgEgACgCCCADa0EMbSIDQQF0IgYgAiACIAZJGyADQarVqtUATxsiAkHWqtWqAU8NASAEIAJBDGwiBhAjIgJqIgMgASgCADYCACACIAVBDGxqIgQgASgCBDYCBCAEIAEoAgg2AgggAUEANgIIIAFCADcCACACIAZqIQIgA0EMaiEEIAAoAgQiASAAKAIAIgVGDQIDQCADQQxrIgMgAUEMayIBKAIANgIAIAMgASgCBDYCBCADIAEoAgg2AgggAUEANgIIIAFCADcCACABIAVHDQALIAAgAjYCCCAAKAIEIQIgACAENgIEIAAoAgAhASAAIAM2AgAgASACRg0DA0AgAkEMayIAKAIAIgMEQCACQQhrIAM2AgAgAxAiCyAAIgIgAUcNAAsMAwsQLQALEDUACyAAIAI2AgggACAENgIEIAAgAzYCAAsgAQRAIAEQIgsLkAQBBH8gASAAIAFGIgM6AAwCQCADDQADQCABKAIIIgMtAAwNAQJAIAMgAygCCCICKAIAIgRGBEACQCACKAIEIgRFDQAgBC0ADA0ADAILAkAgASADKAIARgRAIAMhAQwBCyADIAMoAgQiASgCACIENgIEIAMhACAEBEAgBCADNgIIIAMoAggiAigCACEACyABIAI2AgggAiACQQRqIAAgA0YbIAE2AgAgASADNgIAIAMgATYCCCABKAIIIgIoAgAhAwsgAUEBOgAMIAJBADoADCACIAMoAgQiADYCACAABEAgACACNgIICyADIAIoAggiADYCCCAAIAAoAgAgAkdBAnRqIAM2AgAgAyACNgIEIAIgAzYCCA8LAkAgBEUNACAELQAMDQAMAQsCQCABIAMoAgBHBEAgAyEBDAELIAMgASgCBCIANgIAIAAEQCAAIAM2AgggAygCCCECCyABIAI2AgggAiACQQRqIAIoAgAgA0YbIAE2AgAgASADNgIEIAMgATYCCCABKAIIIQILIAFBAToADCACQQA6AAwgAiACKAIEIgAoAgAiATYCBCABBEAgASACNgIICyAAIAIoAggiATYCCCABIAEoAgAgAkdBAnRqIAA2AgAgACACNgIAIAIgADYCCAwCCyAEQQxqIQUgA0EBOgAMIAIgACACRjoADCAFQQE6AAAgAiIBIABHDQALCwt6AQN/AkACQCAAIgFBA3FFDQAgAS0AAEUEQEEADwsDQCABQQFqIgFBA3FFDQEgAS0AAA0ACwwBCwNAIAEiAkEEaiEBIAIoAgAiA0F/cyADQYGChAhrcUGAgYKEeHFFDQALA0AgAiIBQQFqIQIgAS0AAA0ACwsgASAAawv/AQEHfyABIAAoAggiAiAAKAIEIgNrQQN1TQRAIAAgAQR/IAMgAUEDdCIAECUgAGoFIAMLNgIEDwsCQCADIAAoAgAiBWtBA3UiByABaiIE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AgAgACgCACAHaigCACACNgIADAELIAUgAzYCACACIQMgASEECyADKAIAIgINAAsLC58MAwZ8A34IfyMAQRBrIg4kAAJAAkAgAb0iCUI0iKciDUH/D3EiD0G+CGsiEEH/fksgAL0iCEI0iKciC0H/D2tBgnBPcQ0AIAlCAYYiCkKAgICAgICAEHxCgYCAgICAgBBUBEBEAAAAAAAA8D8hAiAIQoCAgICAgID4P1ENAiAKUA0CIApCgYCAgICAgHBUIAhCAYYiCEKAgICAgICAcFhxRQRAIAAgAaAhAgwDCyAIQoCAgICAgIDw/wBRDQJEAAAAAAAAAAAgASABoiAJQgBTIAhCgICAgICAgPD/AFRzGyECDAILIAhCAYZCgICAgICAgBB8QoGAgICAgIAQVARAIAAgAKIhAiAIQgBTBEAgApogAiAJEJABQQFGGyECCyAJQgBZDQIjAEEQayILRAAAAAAAAPA/IAKjOQMIIAsrAwghAgwCCyAIQgBTBEAgCRCQASIMRQRAIAAgAKEiACAAoyECDAMLIAtB/w9xIQsgDEEBRkESdCEMIAC9Qv///////////wCDIQgLIBBB/35NBEBEAAAAAAAA8D8hAiAIQoCAgICAgID4P1ENAiAPQb0HTQRAIAEgAZogCEKAgICAgICA+D9WG0QAAAAAAADwP6AhAgwDCyANQf8PSyAIQoCAgICAgID4P1ZHBEAjAEEQayILRAAAAAAAAABwOQMIIAsrAwhEAAAAAAAAAHCiIQIMAwsjAEEQayILRAAAAAAAAAAQOQMIIAsrAwhEAAAAAAAAABCiIQIMAgsgCw0AIABEAAAAAAAAMEOivUL///////////8Ag0KAgICAgICAoAN9IQgLAnwgCUKAgIBAg78iBSEHIA4gCEKAgICA0Kql8z99IglCNIentyIDQfjXAysDAKIgCUItiKdB/wBxQQV0IgtB0NgDaisDAKAgCCAJQoCAgICAgIB4g30iCEKAgICACHxCgICAgHCDvyIAIAtBuNgDaisDACIEokQAAAAAAADwv6AiAiAIvyAAoSAEoiIEoCIAIANB8NcDKwMAoiALQcjYA2orAwCgIgMgACADoCIDoaCgIAQgAEGA2AMrAwAiBKIiBiACIASiIgSgoqAgAiAEoiICIAMgAyACoCICoaCgIAAgACAGoiIDoiADIAMgAEGw2AMrAwCiQajYAysDAKCiIABBoNgDKwMAokGY2AMrAwCgoKIgAEGQ2AMrAwCiQYjYAysDAKCgoqAiACACIAIgAKAiAqGgOQMIIAcgAr1CgICAQIO/IgOiIQAgASAFoSADoiAOKwMIIAIgA6GgIAGioCEBAkAgAL1CNIinQf8PcSILQckHa0E/SQ0AIAtByQdJBEAgAEQAAAAAAADwP6AiAJogACAMGwwCCyALQYkISSERQQAhCyARDQAgAL1CAFMEQCMAQRBrIgtEAAAAAAAAAJBEAAAAAAAAABAgDBs5AwggCysDCEQAAAAAAAAAEKIMAgsjAEEQayILRAAAAAAAAADwRAAAAAAAAABwIAwbOQMIIAsrAwhEAAAAAAAAAHCiDAELQeCUAysDACAAokHolAMrAwAiAqAiAyACoSICQfiUAysDAKIgAkHwlAMrAwCiIACgoCABoCIAIACiIgEgAaIgAEGYlQMrAwCiQZCVAysDAKCiIAEgAEGIlQMrAwCiQYCVAysDAKCiIAO9IgmnQQR0QfAPcSINQdCVA2orAwAgAKCgoCEAIA1B2JUDaikDACAJIAytfEIthnwhCCALRQRAAnwgCUKAgICACINQBEAgCEKAgICAgICAiD99vyIBIACiIAGgRAAAAAAAAAB/ogwBCyAIQoCAgICAgIDwP3wiCL8iASAAoiIDIAGgIgCZRAAAAAAAAPA/YwR8IwBBEGsiCyESIAtEAAAAAAAAEAA5AwggEiALKwMIRAAAAAAAABAAojkDCCAIQoCAgICAgICAgH+DvyAARAAAAAAAAPC/RAAAAAAAAPA/IABEAAAAAAAAAABjGyICoCIFIAMgASAAoaAgACACIAWhoKCgIAKhIgAgAEQAAAAAAAAAAGEbBSAAC0QAAAAAAAAQAKILDAELIAi/IgEgAKIgAaALIQILIA5BEGokACACC6oCAQN/IwBBMGsiAyQAIANBDGogAEEIaiABIAEgAhAzAkAgAy0AEA0AIAMoAgwiBEEYaiEAIAItABghAQJAIAQtADAiBUH/AUYEQCABQf8BRg0CDAELIAFB/wFHDQAgA0EbNgIsIANBHDYCKCADQR02AiQgA0EeNgIgIANBHzYCHCADQSA2AhggA0EhNgIUIANBIjYCECADQSM2AgwgA0EIaiAAIANBDGogBUECdGooAgARAQAgBEH/AToAMAwBCyADIAA2AgggA0E4NgIsIANBOTYCKCADQTo2AiQgA0E7NgIgIANBPDYCHCADQT02AhggA0E+NgIUIANBPzYCECADQcAANgIMIANBCGogACACIANBDGogAUECdGooAgARAwALIANBMGokAEEAC5YGBAl8CX8DfgF9IwBBEGsiECQAIAArAyghCSAAKwMgIQogACkDGCEZIAApAxAhGiAAKwNAIQcgACkDCCEYAkAgACgCACIPIA8oAgAoAgwRAgAiDyACIAIgD0sbRQRADAELQQAhDyAERQRAA0AgEEEIaiAAKAIAIgEgDyABKAIAKAIIEQMAIAArAyghCSAAKwMgIQogACkDGCEZIAApAxAhGiAAKQMIIRggACsDOCEGIBAoAgwhASAPQQFqIg8gACgCACIDIAMoAgAoAgwRAgAiAyACIAIgA0sbSQ0ACyABuCAGoSEIDAELIANBA3QhFANAIBBBCGogACgCACIDIA8gAygCACgCCBEDACABIA9BAnRqIRUgECgCDCITuCAAKwM4oSIIIAehIQwgACsDKCEJIAArAyAhCiAAKQMIIRggACkDGCIZvyENIAApAxAiGr8hDkEAIREgECgCCCESIAAtADAhFgNAAkACfyAIIBG4IAWiIAArA0igIgZlBEAgFkUNAiAHIAYgB6EgDBBToCEGCyAGRAAAAAAAAPBBYyAGRAAAAAAAAAAAZnEEQCAGqwwBC0EACyEDAnxEAAAAAAAAAAAgAyATTw0AGiATIANBAWoiF00EQCASIANBAnRqKgIAuwwBCyAGIAO4obYgEiAXQQJ0aioCACASIANBAnRqKgIAIhuTlCAbkrsLIQYgFSgCACARQQN0aiAUaiIDIAYgGL8iCyAOIgahmUSN7bWg98awPmUEfCAGBUQAAAAAAAAAAEQAAAAAAADwPyANIAugIgYgBkQAAAAAAADwP2QbIAZEAAAAAAAAAABjG70hGCALC6IgAysDAKA5AwALIBFBAWoiESAERw0ACyAPQQFqIg8gACgCACIDIAMoAgAoAgwRAgAiAyACIAIgA0sbSQ0ACwsgACAJOQMoIAAgCjkDICAAIBk3AxggACAaNwMQIAAgGDcDCCAAIAS4IAWiIAArA0igIgU5A0gCQCAFIAhmRQ0AIAAtADBFDQAgACAHIAUgB6EgCCAHoRBToDkD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ECILIAAoAiAgAmooAgAiAQRAIAEoAggiAgRAIAIQIgsgAUIANwIIAkAgASgCFCICRQ0AIAIQIiABQgA3AhQgAUGQ9wI2AhAgAUEANgIAIAFBkPcCNgIEIAEoAggiAkUNACACECILIAEQIgsgBEEBaiIEIAAoAgxJDQALCyAAQgA3AgQgAEIANwIMIAAgACgCFDYCGCAAIAAoAiA2AiQgACgCMCIBBEAgARAiCyAAQgA3AjAgACgCOCIBQQAgASgCACgCCBEBACAAKAJEIgEEQCABECILIABCADcCRCAAKAJQIgEEQCABECILIABBADYCPCAAQgA3AlAgACgCYCIBBEAgARAiCyAAQgA3AmAgACgCbCIBBEAgARAiCyAAQQA2AlggAEIANwJsIAAoAngiAQRAIAEQIgsgAEEANgKAASAAQgA3AnggACgCiAEiAQRAIAEQIgsgAEEANgKQASAAQgA3AogBC7wDAQF/IABBxPcCNgIAIAAQYCAAQZD3AjYChAEgACgCiAEiAQRAIAEQIgsgAEIANwKIASAAQZD3AjYCdCAAKAJ4IgEEQCABECILIABCADcCeCAAKAJgIgEEQCABECILIABCADcCYAJAIAAoAmwiAUUEQCAAQgA3AmwgAEEANgJYIABBkPcCNgJoIABBkPcCNgJcDAELIAEQIiAAQgA3AmwgAEGQ9wI2AmggAEEANgJYIABBkPcCNgJcIAAoAmAiAUUNACABECILIABCADcCYCAAKAJEIgEEQCABECILIABCADcCRAJAIAAoAlAiAUUEQCAAQgA3AlAgAEEANgI8IABBkPcCNgJMIABBQGtBkPcCNgIADAELIAEQIiAAQgA3AlAgAEGQ9wI2AkwgAEEANgI8IABBQGtBkPcCNgIAIAAoAkQiAUUNACABECILIABCADcCRCAAKAI4IQEgAEEANgI4IAEEQCABIAEoAgAoAgQRAAALIABBkPcCNgIsIAAoAjAiAQRAIAEQIgsgAEIANwIwIAAoAiAiAQRAIAAgATYCJCABECILIAAoAhQiAQRAIAAgATYCGCABECILIAALqAEBBn8CfyAAKAIEIgAEQCABKAIAIAEgAS0ACyICwEEASCIDGyEFIAEoAgQgAiADGyEBA0AgBSAAKAIQIABBEGogAC0AGyICwEEASCIDGyIEIAAoAhQgAiADGyICIAEg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IggoAgAgBUEMaiIJKAIASSEKIAdBEGokAAJAIAEoAgggBCgCACAIIAkgChsoAgAQJyIHDQBBACEHIAEoAgwgBCgCBEYNAEF/QQEgASgCDCAEKAIESRshBwsgBUEQaiQAIAdFIQULIARBEGokACABQSBqJAAgBUUEQCMAQRBrIgckAEGjGxBCIQQCfyACLQALQQd2BEAgAigCBAwBCyACLQALQf8AcQshBUGjGyAEAn8CfyMAQRBrIggkACAGQQRqIgEhACAEIAVqIgNB7////wdNBEACQCADQQtJBEAgAEIANwIAIABBADYCCCAAIAAtAAtBgAFxIANB/wBxcjoACyAAIAAtAAtB/wBxOgALDAELIANBC08EfyADQRBqQXBxIgYgBkEBayIGIAZBC0YbBUEKC0EBaiIGECMhCSAAIAAoAghBgICAgHhxIAZB/////wdxcjYCCCAAIAAoAghBgICAgHhyNgIIIAAgCTYCACAAIAM2AgQLIAhBEGokACAADAELEHUACyIALQALQQd2BEAgACgCAAwBCyAACyIAEFACfyACLQALQQd2BEAgAigCAAwBCyACCyAFIAAgBGoiABBQIAAgBWohACMAQRBrIgIkACACQQA6AA9BASEDA0AgAwRAIAAgAi0ADzoAACADQQFrIQMgAEEBaiEADAELCyACQRBqJAAgB0EQaiQAQSwCfyABIgAtAAtBB3YEQCAAKAIADAELIAALEHQACyAGQRBqJAAgAywAG0EASARAIAMoAhAQIgsjAEEQayICJAAgAkEMakEEEBgEQEH4iAQoAgBBtBQQdAALIAIoAgwhASACQRBqJAAgAEEBIAFB/////wdwIgIgAkEBTRs2ArADIANBIGokACAAC94KAgt/An0gAigCBCACLQALIgYgBsBBAEgiBhsiDSEFIAIoAgAgAiAGGyIKIQICQCANIgdBBEkNAAJ/IAdBBGsiB0EEcQRAIA0hBiAKDAELIAooAABBldPH3gVsIgJBGHYgAnNBldPH3gVsIA1BldPH3gVscyEFIAchBiAKQQRqCyECIAdBBEkNACAGIQcDQCACKAAEQZXTx94FbCIGQRh2IAZzQZXTx94FbCACKAAAQZXTx94FbCIGQRh2IAZzQZXTx94FbCAFQZXTx94FbHNBldPH3gVscyEFIAJBCGohAiAHQQhrIgdBA0sN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AWogATYCACABECILIAAoAtCZASIBBEAgAEHUmQFqIAE2AgAgARAiCwJAIABBrJkBaigCACIBRQ0AIAEgASgCBCIEQQFrNgIEIAQNACABIAEoAgAoAggRAAAgARAmCwJAIABBpJkBaigCACIBRQ0AIAEgASgCBCIEQQFrNgIEIAQNACABIAEoAgAoAggRAAAgARAmCyAAKAKQASIBBEAgACABNgKUASABECILIAAoAnQiBARAIAAoAngiASAEIgNHBEADQAJAIAFBCGsiASgCBCIDRQ0AIAMgAygCBCIFQQFrNgIEIAUNACADIAMoAgAoAggRAAAgAxAmCyABIARHDQALIAAoAnQhAwsgACAENgJ4IAMQIgsgAEH8ITYCACAAKAIQIgEEQANAIAEoAgAhBiABLQAwIgNB/wFHBEAgAkEbNgIsIAJBHDYCKCACQR02AiQgAkEeNgIgIAJBHzYCHCACQSA2AhggAkEhNgIUIAJBIjYCECACQSM2AgwgAkELaiABQRhqIAJBDGogA0ECdGooAgARAQALIAFB/wE6ADAgASwAE0EASARAIAEoAggQIgsgARAiIAYiAQ0ACwsgACgCCCEBIABBADYCCCABBEAgARAiCyACQTBqJAAgAAvjAwIEfwF8IwBBMGsiAyQAAn8CQCABKAIEIAEtAAsiBCAEwCIEQQBIG0EIRw0AIAEoAgAgASAEQQBIGykAAELp3NGrps7dsOwAUg0AQQUgAi0AGEEDRw0BGkEGIAIrAwAiB0QAAAAAAAAAAGUNARogAAJ+IAdE/Knx0k1iUD+iIAArAyCiIgdEAAAAAAAAAEAgB0QAAAAAAAAAQGQbIgeZRAAAAAAAAOBDYwRAIAewDAELQoCAgICAgICAgH8LNwNACyADQQxqIABBCGogASABIAIQMwJAIAMtABANACADKAIMIgRBGGohACACLQAYIQECQCAELQAwIgVB/wFGBEAgAUH/AUYNAgwBCyABQf8BRw0AIANBGzYCLCADQRw2AiggA0EdNgIkIANBHjYCICADQR82AhwgA0EgNgIYIANBITYCFCADQSI2AhAgA0EjNgIMIANBCGogACADQQxqIAVBAnRqKAIAEQEAIARB/wE6ADAMAQsgAyAANgIIIANBODYCLCADQTk2AiggA0E6NgIkIANBOzYCICADQTw2AhwgA0E9NgIY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AiggBEEdNgIkIARBHjYCICAEQR82AhwgBEEgNgIYIARBITYCFCAEQSI2AhAgBEEjNgIMIARBC2ogAkEYaiAEQQxqIANBAnRqKAIAEQEACyACQf8BOgAwIAIsABNBAEgEQCACKAIIECILIAIQIiAGIgINAAsLIAAoAgghASAAQQA2AgggAQRAIAEQIgsgBEEwaiQAIAAL3QMBBn8jAEEwayICJAAgAEGwpAI2AgACQCAAKAKsASIBRQ0AIAEgASgCBCIDQQFrNgIEIAMNACABIAEoAgAoAggRAAAgARAmCwJAIAAoAlwiAUUNACABIAEoAgQiA0EBazYCBCADDQAgASABKAIAKAIIEQAAIAEQJgsCQCAAKAJMIgFFDQAgASABKAIEIgNBAWs2AgQgAw0AIAEgASgCACgCCBEAACABECYLIAAoAjgiAwRAIAAoAjwiASADIgRHBEADQAJAIAFBCGsiASgCBCIERQ0AIAQgBCgCBCIFQQFrNgIEIAUNACAEIAQoAgAoAggRAAAgBBAmCyABIANHDQALIAAoAjghBAsgACADNgI8IAQQIgsgAEH8ITYCACAAKAIQIgEEQANAIAEoAgAhBiABLQAwIgRB/wFHBEAgAkEbNgIsIAJBHDYCKCACQR02AiQgAkEeNgIgIAJBHzYCHCACQSA2AhggAkEhNgIUIAJBIjYCECACQSM2AgwgAkELaiABQRhqIAJBDGogBEECdGooAgARAQALIAFB/wE6ADAgASwAE0EASARAIAEoAggQIgsgARAiIAYiAQ0ACwsgACgCCCEBIABBADYCCCABBEAgARAiCyACQTBqJAAgAAuHAgEEfyMAQTBrIgIkACAAQQA2AgggAEIANwMAAkAgASgCBCIFIAEoAgAiA0cEQCAFIANrIgRBAEgNASAAIAQQIyIBNgIEIAAgATYCACAAIAEgBGo2AggDQCABQf8BOgAYIAFBADoAACADLQAYIgRB/wFHBEAgAkEtNgIsIAJBLjYCKCACQS82AiQgAkEwNgIgIAJBMTYCHCACQTI2AhggAkEzNgIUIAJBNDYCECACQTU2AgwgAkELaiABIAMgAkEMaiAEQQJ0aigCABEDACABIAMtABg6ABgLIAFBIGohASADQSBqIgMgBUcNAAsgACABNgIECyAAQQY6ABggAkEwaiQADwsQLQALmgMBBH8j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AigCACIFa0EEdSIBIANJBEAgAiADIAFrEEwMAQsgASADTQ0AIAAgBSADQQR0ajYCOAsgBCgCECIAIAQoAhRHBEAgBCAANgIUCwJAAkACQCAEKAIAIgBBAk8EQEECIQMDQAJAIAAgACADbiIBIANsRgRAIAQoAhQiACAEKAIYRwRAIAAgAzYCACAEIABBBGo2AhQgASEADAILIAAgBCgCECIFayICQQJ1IgdBAWoiBkGAgICABE8NBUH/////AyACQQF1IgggBiAGIAhJGyACQfz///8HTxsiBgR/IAZBgICAgARPDQUgBkECdBAjBUEACyIIIAdBAnRqIgIgAzYCACACQQRqIQcgACAFRwRAA0AgAkEEayICIABBBGsiACgCADYCACAAIAVHDQALCyAEIAggBkECdGo2AhggBCAHNgIUIAQgAjYCECAFRQRAIAEhAAwCCyAFECIgASEADAELIAC4nyADuGMEQCAAIQMMAQsgA0EBaiEDCyAAQQFLDQALCyAEKAIcIgAgBCgCIEcEQCAEIAA2AiALIAQoAigiACAEKAIsRwRAIAQgADYCLAsgBEEAQQAgBCgCAEEBEIEBIAQoAjgiACAEKAI0IgNHBEAgBCADNgI4IAMhAAsCQAJAIAQoAjwiAiAASwRAIABCADcCACAEIABBCGo2AjgMAQsgACADa0EDdSIFQQFqIgFBgICAgAJPDQFB/////wEgAiADayICQQJ1IgYgASABIAZJGyACQfj///8HTxsiAQR/IAFBgICAgAJPDQMgAUEDdBAjBUEACyIGIAVBA3RqIgJCADcCACACQQhqIQUgACADRwRAA0AgAkEIayICIABBCGsiACkCADcCACAAIANHDQALIAQoAjQhAwsgBCAGIAFBA3RqNgI8IAQgBTYCOCAEIAI2AjQgA0UNACADECILIAQoAgAiAkECTwRAIAQoAhQgBCgCEGtBAnUhD0EBIQFBASEFIAIiBiEQA0AgBCgCECEAAkAgASAFTwRAIBFBAnQhAyARQQFqIREgECAAIANqKAIAIgpuIhAhByAKIAUiCGwhBQwBCyAGIAAgD0EBayIPQQJ0aigCACIKbiIGIQggCiABIgdsIQELAkAgCkECSQ0AIAQoAjgiACAEKAI0IgNGDQBBASEMQQEgACADa0EDdSIAIABBAU0bIRMDQCAIIAxsIRQg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ABEBAAsgAUH/AToAMCABLAATQQBIBEAgASgCCBAiCyABECIgBiIBDQALCyAAKAIIIQEgAEEANgIIIAEEQCABECILIAJBMGokACAAC+UDAQZ/IwBBMGsiAyQAIABB0N4BNgIAAkAgACgCWCIBRQ0AIAEgASgCBCICQQFrNgIEIAINACABIAEoAgAoAggRAAAgARAmCyAAKAJEIgQEQCAAKAJIIgIgBCIBRwRAA0ACQCACQQhrIgIoAgQiAUUNACABIAEoAgQiBUEBazYCBCAFDQAgASABKAIAKAIIEQAAIAEQJgsgAiAERw0ACyAAKAJEIQELIAAgBDYCSCABECILIAAoAiwiBARAIAAoAjAiAiAEIgFHBEADQAJAIAJBCGsiAigCBCIBRQ0AIAEgASgCBCIFQQFrNgIEIAUNACABIAEoAgAoAggRAAAgARAmCyACIARHDQALIAAoAiwhAQsgACAENgIwIAEQIgsgAEH8ITYCACAAKAIQIgIEQANAIAIoAgAhBiACLQAwIgRB/wFHBEAgA0EbNgIsIANBHDYCKCADQR02AiQgA0EeNgIgIANBHzYCHCADQSA2AhggA0EhNgIUIANBIjYCECADQSM2AgwgA0ELaiACQRhqIANBDGogBEECdGooAgARAQALIAJB/wE6ADAgAiwAE0EASARAIAIoAggQIgsgAhAiIAYiAg0ACwsgACgCCCEBIABBADYCCCABBEAgARAiCyADQTBqJAAgAAsMACABIAItAAA6AAAL5QMBBn8jAEEwayIDJAAgAEHw2gE2AgACQCAAKAJYIgFFDQAgASABKAIEIgJBAWs2AgQgAg0AIAEgASgCACgCCBEAACABECYLIAAoAkQiBARAIAAoAkgiAiAEIgFHBEADQAJAIAJBCGsiAigCBCIBRQ0AIAEgASgCBCIFQQFrNgIEIAUNACABIAEoAgAoAggRAAAgARAmCyACIARHDQALIAAoAkQhAQsgACAENgJIIAEQIgsgACgCLCIEBEAgACgCMCICIAQiAUcEQANAAkAgAkEIayICKAIEIgFFDQAgASABKAIEIgVBAWs2AgQgBQ0AIAEgASgCACgCCBEAACABECYLIAIgBEcNAAsgACgCLCEBCyAAIAQ2AjAgARAiCyAAQfwhNgIAIAAoAhAiAgRAA0AgAigCACEGIAItADAiBEH/AUcEQCADQRs2AiwgA0EcNgIoIANBHTYCJCADQR42AiAgA0EfNgIcIANBIDYCGCADQSE2AhQgA0EiNgIQIANBIzYCDCADQQtqIAJBGGogA0EMaiAEQQJ0aigCABEBAAsgAkH/AToAMCACLAATQQBIBEAgAigCCBAiCyACECIgBiICDQALCyAAKAIIIQEgAEEANgIIIAEEQCABECILIANBMGokACAACwwAIAEgAisDADkDAAs8ACABQQA2AgggAUIANwMAIAEgAigCADYCACABIAIoAgQ2AgQgASACKAIINgIIIAJBADYCCCACQgA3AwAL5QMBBn8jAEEwayIDJAAgAEHMwAE2AgACQCAAKAJYIgFFDQAgASABKAIEIgJBAWs2AgQgAg0AIAEgASgCACgCCBEAACABECYLIAAoAkQiBARAIAAoAkgiAiAEIgFHBEADQAJAIAJBCGsiAigCBCIBRQ0AIAEgASgCBCIFQQFrNgIEIAUNACABIAEoAgAoAggRAAAgARAmCyACIARHDQALIAAoAkQhAQsgACAENgJIIAEQIgsgACgCLCIEBEAgACgCMCICIAQiAUcEQANAAkAgAkEIayICKAIEIgFFDQAgASABKAIEIgVBAWs2AgQgBQ0AIAEgASgCACgCCBEAACABECYLIAIgBEcNAAsgACgCLCEBCyAAIAQ2AjAgARAiCyAAQfwhNgIAIAAoAhAiAgRAA0AgAigCACEGIAItADAiBEH/AUcEQCADQRs2AiwgA0EcNgIoIANBHTYCJCADQR42AiAgA0EfNgIcIANBIDYCGCADQSE2AhQgA0EiNgIQIANBIzYCDCADQQtqIAJBGGogA0EMaiAEQQJ0aigCABEBAAsgAkH/AToAMCACLAATQQBIBEAgAigCCBAiCyACECIgBiICDQALCyAAKAIIIQEgAEEANgIIIAEEQCABECILIANBMGokACAAC/wDAQZ/IwBBMGsiAyQAIABB9LsBNgIAAkAgACgCWCIBRQ0AIAEgASgCBCICQQFrNgIEIAINACABIAEoAgAoAggRAAAgARAmCyAAKAJEIgQEQCAAKAJIIgIgBCIBRwRAA0AgAkEMayICIgEtAAgiBUH/AUcEQCADQcQANgIUIANBxQA2AhAgA0HGADYCDCADQQtqIAIgA0EMaiAFQQJ0aigCABEBAAsgAUH/AToACCACIARHDQALIAAoAkQhAQsgACAENgJIIAEQIgsgACgCLCIEBEAgACgCMCICIAQiAUcEQANAAkAgAkEIayICKAIEIgFFDQAgASABKAIEIgVBAWs2AgQgBQ0AIAEgASgCACgCCBEAACABECYLIAIgBEcNAAsgACgCLCEBCyAAIAQ2AjAgARAiCyAAQfwhNgIAIAAoAhAiAgRAA0AgAigCACEGIAItADAiBEH/AUcEQCADQRs2AiwgA0EcNgIoIANBHTYCJCADQR42AiAgA0EfNgIcIANBIDYCGCADQSE2AhQgA0EiNgIQIANBIzYCDCADQQtqIAJBGGogA0EMaiAEQQJ0aigCABEBAAsgAkH/AToAMCACLAATQQBIBEAgAigCCBAiCyACECIgBiICDQALCyAAKAIIIQEgAEEANgIIIAEEQCABECILIANBMGokACAAC+UDAQZ/IwBBMGsiAyQAIABBsLgBNgIAAkAgACgCWCIBRQ0AIAEgASgCBCICQQFrNgIEIAINACABIAEoAgAoAggRAAAgARAmCyAAKAJEIgQEQCAAKAJIIgIgBCIBRwRAA0ACQCACQQhrIgIoAgQiAUUNACABIAEoAgQiBUEBazYCBCAFDQAgASABKAIAKAIIEQAAIAEQJgsgAiAERw0ACyAAKAJEIQELIAAgBDYCSCABECILIAAoAiwiBARAIAAoAjAiAiAEIgFHBEADQAJAIAJBCGsiAigCBCIBRQ0AIAEgASgCBCIFQQFrNgIEIAUNACABIAEoAgAoAggRAAAgARAmCyACIARHDQALIAAoAiwhAQsgACAENgIwIAEQIgsgAEH8ITYCACAAKAIQIgIEQANAIAIoAgAhBiACLQAwIgRB/wFHBEAgA0EbNgIsIANBHDYCKCADQR02AiQgA0EeNgIgIANBHzYCHCADQSA2AhggA0EhNgIUIANBIjYCECADQSM2AgwgA0ELaiACQRhqIANBDGogBEECdGooAgARAQALIAJB/wE6ADAgAiwAE0EASARAIAIoAggQIgsgAhAiIAYiAg0ACwsgACgCCCEBIABBADYCCCABBEAgARAiCyADQTBqJAAgAAuyCgMIfwF8AX4jAEEwayIEJAACQAJAIAEoAgQiBSABLQALIgMgA8AiBkEASCIHG0EERw0AIAEoAgAgASAHGygAAEHo3rGjBkcNAEEFIQMg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ASADQR42ArABIANBHzYCrAEgA0EgNgKoASADQSE2AqQBIANBIjYCoAEgA0EjNgKcASADQZsBaiADQfgAaiADQZwBaiAAQQJ0aigCABEBAAsgA0H/AToAkAEgA0HsAGogAygCcBA4IAMtAGAiAEH/AUcEQCADQRs2ArwBIANBHDYCuAEgA0EdNgK0ASADQR42ArABIANBHzYCrAEgA0EgNgKoASADQSE2AqQBIANBIjYCoAEgA0EjNgKcASADQZsBaiADQcgAaiADQZwBaiAAQQJ0aigCABEBAAsgA0H/AToAYCADLABDQQBIBEAgAygCOBAiCyADLQAwIgBB/wFHBEAgA0EbNgK8ASADQRw2ArgBIANBHTYCtAEgA0EeNgKwASADQR82AqwBIANBIDYCqAEgA0EhNgKkASADQSI2AqABIANBIzYCnAEgA0GbAWogA0EYaiADQZwBaiAAQQJ0aigCABEBAAsgA0H/AToAMCADLAATQQBIBEAgAygCCBAiCyADQcABaiQAIAQtACAiAEH/AUcEQCAEQRs2AkwgBEEcNgJIIARBHTYCRCAEQR42AkAgBEEfNgI8IARBIDYCOCAEQSE2AjQgBEEiNgIwIARBIzYCLCAEQStqIAggBEEsaiAAQQJ0aigCABEBAAsgBEHQAGokAAsVACABQZTyAjYCACABIAApAgQ3AgQLHQEBf0EMECMiAUGU8gI2AgAgASAAKQIENwIEIAELFAAgAEEMakEAIAEoAgRBuPECRhsLGQAgACgCDCIABEAgACAAKAIAKAIEEQAACwuIAQAjAEEwayIBJAAgACgCACIALQAYIgIEQCACQf8BRwRAIAFBGzYCLCABQRw2AiggAUEdNgIkIAFBHjYCICABQR82AhwgAUEgNgIYIAFBITYCFCABQSI2AhAgAUEjNgIMIAFBC2ogACABQQxqIAJBAnRqKAIAEQEACyAAQQA6ABgLIAFBMGokAAsGAEGI8AILFAAgAEEEakEAIAEoAgRB6O8CRhsLngIBBX8CQCABKAIEIgBFDQAgACgCBA0AIAEoAgAiAigCGCIBIAIoAhQiAEcEQANAIAFBMGsQYyIBIABHDQALCyACIAA2AhggAigCDEUNACACKAIIIgEEQANAIAEoAgAhBiABECIgBiIBDQALC0EAIQEgAkEANgIIAkAgAigCBCIARQ0AIABBBE8EQCAAQXxxIQQDQCABQQJ0IgMgAigCAGpBADYCACACKAIAIANqQQA2AgQgAigCACADakEANgIIIAIoAgAgA2pBADYCDCABQQRqIQEgBUEEaiIFIARHDQALCyAAQQNxIgNFDQBBACEAA0AgAigCACABQQJ0akEANgIAIAFBAWohASAAQQFqIgAgA0cNAAsLIAJBADYCDAsLCwAgAUHY7QI2AgALEQBBCBAjIgBB2O0CNgIAIAALBgBBsO0CCxQAIABBBGpBACABKAIEQczrAkYbC3MBAn8jAEEgayICJAAgACgCICEDIAIgACgCFDYCBCACIAAoAig2AgggAiAAKAIINgIMIAIgACgCLDYCECACIAEoAhA2AhQgAiABKAIUNgIYIAIgAC0ABDoAHCADIAJBBGogAygCACgCEBEBACACQSBqJAALYwECfwJAIAAoAiQiAUUNACABIAEoAgQiAkEBazYCBCACDQAgASABKAIAKAIIEQAAIAEQJgsgACgCFCIBBEAgACABNgIYIAEQIgsgACgCCCIBBEAgACABNgIMIAEQIgsgABAiC4sBACMAQTBrIgEkACAAKAIAIgAtABgiAkEBRwRAIAJB/wFHBEAgAUEbNgIsIAFBHDYCKCABQR02AiQgAUEeNgIgIAFBHzYCHCABQSA2AhggAUEhNgIUIAFBIjYCECABQSM2AgwgAUELaiAAIAFBDGogAkECdGooAgARAQALIABBAToAGAsgAUEwaiQAC18BAn8CQCAAKAIkIgFFDQAgASABKAIEIgJBAWs2AgQgAg0AIAEgASgCACgCCBEAACABECYLIAAoAhQiAQRAIAAgATYCGCABECILIAAoAggiAQRAIAAgATYCDCABECILCxgAIAFBjOkCNgIAIAFBBGogAEEEahCcAQsgAQF/QTAQIyIBQYzpAjYCACABQQRqIABBBGoQnAEgAQtsAQJ/IABBjOkCNgIAAkAgACgCJCIBRQ0AIAEgASgCBCICQQFrNgIEIAINACABIAEoAgAoAggRAAAgARAmCyAAKAIUIgEEQCAAIAE2AhggARAiCyAAKAIIIgEEQCAAIAE2AgwgARAiCyAAECILagECfyAAQYzpAjYCAAJAIAAoAiQiAUUNACABIAEoAgQiAkEBazYCBCACDQAgASABKAIAKAIIEQAAIAEQJgsgACgCFCIBBEAgACABNgIYIAEQIgsgACgCCCIBBEAgACABNgIMIAEQIgsgAAsGAEH86AILFAAgAEEEakEAIAEoAgRBwOcCRhsLcwECfyMAQSBrIgIkACAAKAIUIQMgAiABKAIANgIEIAIgASgCBDYCCCACIAAoAgg2AgwgAiAAKAIcNgIQIAIgASgCEDYCFCACIAEoAhQ2AhggAiAALQAEOgAcIAMgAkEEaiADKAIAKAIQEQEAIAJBIGokAAtOAQJ/AkAgACgCGCIBRQ0AIAEgASgCBCICQQFrNgIEIAINACABIAEoAgAoAggRAAAgARAmCyAAKAIIIgEEQCAAIAE2AgwgARAiCyAAECILqgEBAn8jAEEwayIDJAACQCAAKAIAIgAtABgiBEH/AUcEQCAEQQJGBEAgASACLQAAOgAADAILIANBGzYCLCADQRw2AiggA0EdNgIkIANBHjYCICADQR82AhwgA0EgNgIYIANBITYCFCADQSI2AhAgA0EjNgIMIANBC2ogACADQQxqIARBAnRqKAIAEQEACyACLQAAIQEgAEECOgAYIAAgAToAAAsgA0EwaiQAC2UBAn8jAEEQayIDJAAgASAAKAIEIgRBAXVqIQEgACgCACEAIANBCGogASACIARBAXEEfyABKAIAIABqKAIABSAACxEDACADKAIMIgAQBiADKAIMIgEEQCABEAALIANBEGokACAAC0oBAn8CQCAAKAIYIgFFDQAgASABKAIEIgJBAWs2AgQgAg0AIAEgASgCACgCCBEAACABECYLIAAoAggiAQRAIAAgATYCDCABECILC7MBAQR/IAFB6OQCNgIAIAAtAAQhAiABQQA2AhAgAUEIaiIDQgA3AgAgASACOgAEAkAgACgCDCICIAAoAggiBEcEQCACIARrIgJBAEgNASABIAIQIyIDNgIMIAEgAzYCCCABIAIgA2oiBTYCECADIAQgAhAvGiABIAU2AgwLIAEgACgCFDYCFCABIAAoAhgiAjYCGCACBEAgAiACKAIEQQFqNgIECyABIAAoAhw2AhwPCxAtAAuyAQEFf0EgECMiAkHo5AI2AgAgAC0ABCEBIAJBADYCECACQQhqIgNCADcCACACIAE6AAQCQCAAKAIMIgEgACgCCCIERwRAIAEgBGsiAUEASA0BIAIgARAjIgM2AgggAiABIANqIgU2AhAg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AnRqKAIAEQEACyACLACXAUEASARAIAIoAowBECILIAIsALcDQQBIBEAgAigCrAMQIgsgAEIANwNgCyACQeADaiQADwsQRQALmCQEE38MfgV8AX0gASgCECEGIAEoAgghDwJAIAEoAgwiDUUNACAGRQ0AIAZBA3QhAiANQQFrQQNPBEAgDUF8cSEFA0AgDyADQQJ0aiIEKAIAIAIQJRogBCgCBCACECUaIAQoAgggAhAlGiAEKAIMIAIQJRogA0EEaiEDIAlBBGoiCSAFRw0ACwsgDUEDcSIERQ0AA0AgDyADQQJ0aigCACACECUaIANBAWohAyAKQQFqIgogBEcNAAsLA0ACfyAAKAJwIgIgACgCbCIDSwRAIAIgA2sMAQsgACgCgAEgACgCaCACIANranELBEACfyAAKAJwIgIgACgCbCIDSwRAIAIgA2sMAQsgACgCgAEgACgCaCACIANranELRQ0BIAAoAnQgA0EDdGoiAikCACEVIAJCADcCACAAKAKkmQEhAiAAIBU3A6CZAQJAIAJFDQAgAiACKAIEIgRBAWs2AgQgBA0AIAIgAigCACgCCBEAACACECYLIAAgACgCgAEgA0EBanE2AmwMAQsLIwBBgAFrIgIkACACQYABECUhAyAAQagIaiEFIABBkAdqIQkgAEH4BWohCiAAQeAEaiEMIABByANqIQ4gAEGwAmohCyAAQZgBaiEHIABBoAFqIQhCfyEZA0ACQAJ/AkACfyAAKAKMASICIAAoAogBIgRLBEAgAiAEawwBCyAAKAKcASAAKAKEASACIARranELBEACfyAAKAKMASIEIAAoAogBIgJLBEAgBCACawwBCyAAKAKcASAAKAKEASAEIAJranELBEAgACgCkAEgAkGYAWxqIgQpAxAhFyAEKQMIIRYgBCkDACEZIAMgBEEYakGAARAvGiAAIAAoApwBIAJBAWpxNgKIAQsgGUIAUwRAQaABIQIDQCAAIAJqQQA6AAAgAiAHakEAOgAAIAIgC2pBADoAACACIA5qQQA6AAAgAiAMakEAOgAAIAIgCmpBADoAACACIAlqQQA6AAAgAiAFakEAOgAAIAJBwAlqIgJBoJkBRw0ACwwFCyAIIBmnQZgBbGoiAi0AAEUNASACKQMIIhUgAikDECIYIBUgGFMbIhhCAFcNAUIAIRUCQCACQRhqIgQqAgBDAAAAAF4EQCACIBY3AwggAiAXNwMQIAQgA0GAARAvGgwBCwNAIBggFUIBfCIVUgRAIAQgFadBAnRqKgIAQwAAAABeRQ0BCwsgAiAWNwMIIAIgFzcDECAEIANBgAEQLxpBACAVIBhZDQMaC0EAIBYgFyAWIBdTGyIYQgBXDQIaQgAhFUEBIAQqAgBDAAAAAF4NAhoDQCAYIBVCAXwiFVIEQCAEIBWnQQJ0aioCAEMAAAAAXkUNAQsLIBUgGFMMAgsgA0GAAWokAAwCCyACIBc3AxAgAiAWNwMIIAJBGGogA0GAARAvGkEACyEEIAIgBDoAASACQQE6AAAMAQsLAkAgACgCoJkBIgJFDQAgAC0ALEEBcUUNACAAKAKomQEgAkcEQCAAKAKkmQEiAwRAIAMgAygCBEEBajYCBAsgACACNgKomQEgAEGsmQFqIgQoAgAhAiAEIAM2AgACQCACRQ0AIAIgAigCBCIDQQFrNgIEIAMNACACIAIoAgAoAggRAAAgAhAmCyMAQRBrIgokACAKQQhqIAAoAqCZASICQQAgAigCACgCCBEDACAKKAIIIQkgACgCoJkBIgIgAigCACgCEBECACEDIABByJkBakIANwMAIABBwJkBakIANwMAIABBuJkBakIANwMAIABCADcDsJkBIABB1JkBaiAAKALQmQEiAjYCACAAQeCZAWogACgC3JkBIgU2AgAgAEHsmQFqIAAoAuiZATYCAAJAAkACQAJAAkACQCADQQNJDQACfiAJKgIAIiaLQwAAAF9dBEAgJq4MAQtCgICAgICAgICAfwtCAVINAAJ+IAkqAggiJotDAAAAX10EQCAmrgwBC0KAgICAgICAgIB/CyIVQgN+QgN8IhYgA61VIRMCfiAJKgIEIiaLQwAAAF9dBEAgJq4MAQtCgICAgICAgICAfwshGyATDQAgAEHcmQFqIQwgAEHQmQFqIQ4gACAWNwPImQECQCAVpyIEIABB2JkBaigCACACa0EDdU0NACAEQYCAgIACTw0CIAAgBEEDdCILECMiAzYC1JkBIAAgAzYC0JkBIAAgAyALajYC2JkBIAJFDQAgAhAiIAwoAgAhBQsCQCAAQeSZAWooAgAgBWtBA3UgBE8NACAEQYCAgIACTw0DIAAoAuCZASECIARBA3QiAxAjIgsgA2ohByALIAIgBWtqIgshAyACIAVHBEADQCADQQhrIgMgAkEIayICKQMANwMAIAIgBUcNAAsLIAAgBzYC5JkBIAAgCzYC4JkBIAAgAzYC3JkBIAVFDQAgBRAiCyAAQeiZAWohCwJAIABB8JkBaigCACAAKALomQEiBWtBA3UgBE8NACAEQYCAgIACTw0EIAAoAuyZASECIARBA3QiAxAjIgQgA2ohByAEIAIgBWtqIgQhAyACIAVHBEADQCADQQhrIgMgAkEIayICKQMANwMAIAIgBUcNAAsLIAAgBzYC8JkBIAAgBDYC7JkBIAAgAzYC6JkBIAVFDQAgBRAiC0IAIRYgFUIAVQRAA0AgACgC2JkBIQQgACgC1JkBIQICfiAJIBanQQxsaiIDKgIUIiaLQwAAAF9dBEAgJq4MAQtCgICAgICAgICAfwshFwJ+IAMqAhAiJotDAAAAX10EQCAmrgwBC0KAgICAgICAgIB/CyEYAn4gAyoCDCImi0MAAABfXQRAICauDAELQoCAgICAgICAgH8LIRkCQCACIARHBEAgAiAZNwMAIAAgAkEIajYC1JkBDAELIAIgDigCACIEayIDQQN1IgdBAWoiBUGAgICAAk8NBEH/////ASADQQJ1IgggBSAFIAhJGyADQfj///8HTxsiBQR/IAVBgICAgAJPDQggBUEDdBAjBUEACyIIIAdBA3RqIgMgGTcDACADQQhqIQcgAiAERwRAA0AgA0EIayIDIAJBCGsiAikDADcDACACIARHDQALCyAAIAggBUEDdGo2AtiZASAAIAc2AtSZASAAIAM2AtCZASAERQ0AIAQQIgsCQCAAKALgmQEiAiAAKALkmQFHBEAgAiAYNwMAIAAgAkEIajYC4JkBDAELIAIgDCgCACIEayIDQQN1IgdBAWoiBUGAgICAAk8NBUH/////ASADQQJ1IgggBSAFIAhJGyADQfj///8HTxsiBQR/IAVBgICAgAJPDQggBUEDdBAjBUEACyIIIAdBA3RqIgMgGDcDACADQQhqIQcgAiAERwRAA0AgA0EIayIDIAJBCGsiAikDADcDACACIARHDQALCyAAIAggBUEDdGo2AuSZASAAIAc2AuCZASAAIAM2AtyZASAERQ0AIAQQIgsCQCAAKALsmQEiAiAAKALwmQFHBEAgAiAXNwMAIAAgAkEIajYC7JkBDAELIAIgCygCACIE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BCAANgLAASAEQTg2AjggBEE5NgI0IARBOjYCMCAEQTs2AiwgBEE8NgIoIARBPTYCJCAEQT42AiAgBEE/NgIcIARBwAA2AhggBEHAAWogACACIARBGGogAUECdGooAgARAwALIARB0AFqJAAgBg8LQcQTEDcAC4MQAQt/IwBBEGsiCSQAAkAgACgCACIALQAYQQVGBEAgASACRg0BIAIoAgAhAyACQQRqIQtBACEAIwBBEGsiCiQAAkAgASIGKAIIRQ0AIAEoAgAhASAGIAZBBGo2AgAgBigCBEEANgIIIAZCADcCBCABKAIEIgIgASACGyICRQRAIAYgAhA4DAELAkAgAigCCCIFRQ0AIAIgBSgCACIBRgRAIAVBADYCACAFIgAoAgQiAUUNAQNAIAEiACgCACIBDQAgACgCBCIBDQALDAELIAVBADYCBCAFIQAgAUUNAANAIAEiACgCACIBDQAgACgCBCIBDQALCwJAIAMgC0YEQCACIQUMAQsgAyEBA0AgACEFIAogAkEgajYCDCAKIAJBEGo2AggjAEEwayIAJAACQCABQRBqIgMgCigCCCIERg0AIAMtAAsiCMAhByAELAALQQBOBEAgB0EATgRAIAQgAykCADcCACAEIAMoAgg2AggMAgsgBCADKAIAIAMoAgQQiAEMAQsgBCADKAIAIAMgB0EASCIEGyADKAIEIAggBBsQiQELIAMtACghBwJAAkAgCigCDCIELQAYIghB/wFGBEAgB0H/AUYNAgwBCyAHQf8BRw0AIABBGzYCLCAAQRw2AiggAEEdNgIkIABBHjYCICAAQR82AhwgAEEgNgIYIABBITYCFCAAQSI2AhAgAEEjNgIMIABBCGogBCAAQQxqIAhBAnRqKAIAEQEAIARB/wE6ABgMAQsgACAENgIIIABBODYCLCAAQTk2AiggAEE6NgIkIABBOzYCICAAQTw2AhwgAEE9NgIYIABBPjYCFCAAQT82AhAgAEHAADYCDCAAQQhqIAQgA0EQaiAAQQxqIAdBAnRqKAIAEQMACyAAQTBqJAACQCAGKAIEIgRFBEAgBkEEaiIAIQMMAQsgAigCECACQRBqIAItABsiAMBBAEgiAxshCCACKAIUIAAgAxshBwNAIAggBCIAKAIQIABBEGogAC0AGyIDwEEASCIEGyAAKAIUIAMgBBsiAyAHIAMgB0kbECciBEEASCADIAdLIAQbQQFGBEAgACEDIAAoAgAiBA0BDAILIAAoAgQiBA0ACyAAQQRqIQMLIAIgADYCCCACQgA3AgAgAyACNgIAIAIhACAGKAIAKAIAIgIEQCAGIAI2AgAgAygCACEACyAGKAIEIAAQQSAGIAYoAghBAWo2AghBACEAAkAgBUUNACAFKAIIIgJFDQAgBSACKAIAIgNGBEAgAkEANgIAIAIiACgCBCIDRQ0BA0AgAyIAKAIAIgMNACAAKAIEIgMNAAsMAQsgAkEANgIEIAIhACADRQ0AA0AgAyIAKAIAIgMNACAAKAIEIgMNAAsLAkAgASgCBCICBEADQCACIgMoAgAiAg0ADAILAAsDQCABKAIIIgMoAgAgAUchDCADIQEgDA0ACwsgBUUNASAFIQIgCyADIgFHDQALCyAGIAUQOCAARQ0AA0AgACgCCCIBBEAgASEADAELCyAGIAAQOAsgAyALRwRAA0AjAEEwayIEJABBwAAQIyICQRBqIQcCQCADQRBqIgEsAAtBAE4EQCAHIAEpAwA3AwAgByABKAIINgIIDAELIAcgASgCACABKAIEEDILIAZBBGohACACQf8BOgA4IAJBIGoiBUEAOgAAIAEtACgiCEH/AUcEQCAEQS02AiwgBEEuNgIoIARBLzYCJCAEQTA2AiAgBEExNgIcIARBMjYCGCAEQTM2AhQgBEE0NgIQIARBNTYCDCAEQQtqIAUgAUEQaiAEQQxqIAhBAnRqKAIAEQMAIAIgAS0AKDoAOAsCQCAAIgEoAgAiBUUNACACKAIUIAItABsiACAAwEEASCIAGyEIIAIoAhAgByAAGyEHA0AgByAFIgAoAhAgAEEQaiAALQAbIgHAQQBIIgUbIAAoAhQgASAFGyIBIAggASAISRsQJyIFQQBIIAEgCEsgBRtBAUYEQCAAIgEoAgAiBQ0BDAILIAAoAgQiBQ0ACyAAQQRqIQELIAIgADYCCCACQgA3AgAgASACNgIAIAIhACAGKAIAKAIAIgIEQCAGIAI2AgAgASgCACEACyAGKAIEIAAQQSAGIAYoAghBAWo2AgggBEEwaiQAAkAgAygCBCIBBEADQCABIgIoAgAiAQ0ADAILAAsDQCADKAIIIgIoAgAgA0chDSACIQMgDQ0ACwsgAiIDIAtHDQALCyAKQRBqJAAMAQsgCSACNgIMIAkgADYCCCMAQUBqIgIkACAJKAIIIQMgCSgCDCEBIAIgAkEQaiIFNgIMIAJCADcCECABKAIAIgAgAUEEaiIGRwRAA0AgAkEcaiACQQxqIAUgAEEQaiIBIAEQLgJAIAAoAgQiAQRAA0AgASIAKAIAIgENAAwCCwALA0AgACAAKAIIIgAoAgBHDQALCyAAIAZHDQALCyADLQAYIgBB/wFHBEAgAkEbNgI8IAJBHDYCOCACQR02AjQgAkEeNgIwIAJBHzYCLCACQSA2AiggAkEhNgIkIAJBIjYCICACQSM2AhwgAkEbaiADIAJBHGogAEECdGooAgARAQALIAMgAigCDDYCACADIAIoAhAiADYCBCADIAIoAhQiBjYCCCADQQRqIQECQCAGRQRAIAMgATYCAAwBCyAAIAE2AgggAkIANwIQIAIgBTYCDEEAIQALIANBBToAGCACQQxqIAAQOCACQUBrJAALIAlBEGokAAsJACAAEKQBECILDwAgAEHY3QI2AgAgABAiCw0AIABB2N0CNgIAIAALBgBBvN8CCxQAIABBBGpBACABKAIEQYjfAkYbC9kLAgZ/AXwgBCgCACEGIAMrAwAhCyACKAIAIQJBmJoBECMiAUHY3QI2AgAgAUIANwIEIwBB4ABrIgQkACABQRBqIgVCADcDCCAFIAI2AgQgBSAGNgIoIAUgCzkDICAFQSA2AmggBUIANwNgIAVCfzcDWCAFQoCAgICAgICIwAA3A1AgBUIANwNIIAVCwAA3A0AgBUIANwM4IAVCgICAgICAgJDAADcDMCAFQQA2AiwgBUIANwMQIAVBgICA/AM2AhggBUIANwJsIAVByN4CNgIAIAVB9ABqIgJCADcCACAFQQA2AnwgBUEfNgKAASACEDogBUIANwOIASAFQYACNgKEASAFQZABaiICQgA3AwAgBUKAgICA8B83A5gBAkAgAigCCCIGIAIoAgQiA2tBmAFtQYACTwRAIANBgLACaiEGA0AgA0J/NwMAIANBCGpBkAEQJRogA0J/NwOYASADQaABakGQARAlGiADQn83A7ACIANBuAJqQZABECUaIANCfzcDyAMgA0HQA2pBkAEQJRogA0J/NwPgBCADQegEakGQARAlGiADQn83A/gFIANBgAZqQZABECUaIANCfzcDkAcgA0GYB2pBkAEQJRog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IAQgBSADQQxqIAJBAnRqKAIAEQMAIAQgBS0AGDoAGAsgBEEgaiEEIAVBIGoiBSAGRw0ACwsgASAAIAQgAGtqNgIEDAILIAAEQCABKAIEIgUgACICRwRAA0AgBUEgayIFLQAYIgJB/wFHBEAgA0EbNgIsIANBHDYCKCADQR02AiQgA0EeNgIgIANBHzYCHCADQSA2AhggA0EhNgIUIANBIjYCECADQSM2AgwgA0EIaiAFIANBDGogAkECdGooAgARAQALIAVB/wE6ABggACAFRw0ACyABKAIAIQILIAEgADYCBCACECIgAUEANgIIIAFCADcCAEEAIQULAkAgB0GAgIDAAE8NAEH///8/IAVBBHUiACAHIAAgB0sbIAVB4P///wdPGyIAQYCAgMAATw0AIAEgAEEFdCICECMiADYCBCABIAA2AgAgASAAIAJqNgIIIAQgBkcEQANAIABB/wE6ABggAEEAOgAAIAQtABgiAkH/AUcEQCADQS02AiwgA0EuNgIoIANBLzYCJCADQTA2AiAgA0ExNgIcIANBMjYCGCADQTM2AhQgA0E0NgIQIANBNTYCDCADQQhqIAAgBCADQQxqIAJBAnRqKAIAEQMAIAAgBC0AGDoAGAsgAEEgaiEAIARBIGoiBCAGRw0ACwsgASAANgIEDAILEC0ACyAEIAZHBEADQCAELQAYIQICQAJAIAAtABgiBUH/AUYEQCACQf8BRg0CDAELIAJB/wFHDQAgA0EbNgIsIANBHDYCKCADQR02AiQgA0EeNgIgIANBHzYCHCADQSA2AhggA0EhNgIUIANBIjYCECADQSM2AgwgA0EIaiAAIANBDGogBUECdGooAgARAQAgAEH/AToAGAwBCyADIAA2AgggA0E4NgIsIANBOTYCKCADQTo2AiQgA0E7NgIgIANBPDYCHCADQT02AhggA0E+NgIUIANBPzYCECADQcAANgIMIANBCGogACAEIANBDGogAkECdGooAgARAwALIABBIGohACAEQSBqIgQgBkcNAAsgASgCBCECCyAAIAJHBEADQCACQSBrIgItABgiBEH/AUcEQCADQRs2AiwgA0EcNgIoIANBHTYCJCADQR42AiAgA0EfNgIcIANBIDYCGCADQSE2AhQgA0EiNgIQIANBIzYCDCADQQhqIAIgA0EMaiAEQQJ0aigCABEBAAsgAkH/AToAGCAAIAJHDQALCyABIAA2AgQLIANBMGokAAwBCyAIIAI2AgwgCCAANgIIQQAhASMAQUBqIgIkACAIKAIIIQQgCCgCDCEDIAJBADYCFCACQgA3AgxBACEAAkACQCADKAIEIgYgAygCACIDRwRAIAYgA2siAEEASA0BIAAQIyIBIABqIQUgASEAA0AgAEH/AToAGCAAQQA6AAAgAy0AGCIHQf8BRwRAIAJBLTYCPCACQS42AjggAkEvNgI0IAJBMDYCMCACQTE2AiwgAkEyNgIoIAJBMzYCJCACQTQ2AiAgAkE1NgIcIAJBG2ogACADIAJBHGogB0ECdGooAgARAwAgACADLQAYOgAYCyAAQSBqIQAgA0EgaiIDIAZHDQALCyAELQAYIgNB/wFHBEAgAkEbNgI8IAJBHDYCOCACQR02AjQgAkEeNgIwIAJBHzYCLCACQSA2AiggAkEhNgIkIAJBIjYCICACQSM2AhwgAkEbaiAEIAJBHGogA0ECdGooAgARAQALIARBBjoAGCAEIAU2AgggBCAANgIEIAQgATYCACACQUBrJAAMAQsQLQALCyAIQRBqJAAL1QEBBX8jAEEwayIBJAAgAEH8ITYCACAAKAIQIgIEQANAIAIoAgAhBSACLQAwIgRB/wFHBEAgAUEbNgIsIAFBHDYCKCABQR02AiQgAUEeNgIgIAFBHzYCHCABQSA2AhggAUEhNgIUIAFBIjYCECABQSM2AgwgAUELaiACQRhqIAFBDGogBEECdGooAgARAQALIAJB/wE6ADAgAiwAE0EASARAIAIoAggQIgsgAhAiIAUiAg0ACwsgACgCCCECIABBADYCCCACBEAgAhAiCyABQTBqJAAgAAsPACAAQZTaAjYCACAAECILDQAgAEGU2gI2AgAgAAsGAEGE3AILFAAgAEEEakEAIAEoAgRB0NsCRhsLdgEBfCADKwMAIQUgBCgCACEDIAIoAgAhAkHAABAjIgFBlNoCNgIAIAFCADcCBCABQYzbAjYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggACABNgIEIAAgAUEQajYCAAsLACABQdDYAjYCAAsRAEEIECMiAEHQ2AI2AgAgAAubBwEFfyMAQfABayICJAAgAC0AOCEDIABBADoAOAJAAkAg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7AIgABAiCyACQaADaiQADwtBoxMQNwALEDsACxAtAAsQLQALEC0ACxBFAAtbAQJ/IAEoAhAhAiABKAIIKAIAIQMCQCABKAIERQRAIAJFDQEgAyACQQN0ECUaDwsgASgCACEBIAIEQCADIAEoAgAgAkEDdBA0CyAAQcgAaiABQQEgAkEAEFkLC9QGAQN/IwBBIGsiBCQAAkAgACgCACIALQAYQQhGBEACQCACKAIQIgBFBEAgBEEANgIYDAELIAAgAkYEQCAEIARBCGoiADYCGCACIAAgAigCACgCDBEBAAwBCyAEIAAgACgCACgCCBECADYCGAsjAEEQayIFJAACQCABIARBCGoiA0YNACABKAIQIQIgAyADKAIQIgBGBEAgASACRgRAIAMgBSADKAIAKAIMEQEAIAMoAhAiACAAKAIAKAIQEQAAIANBADYCECABKAIQIgAgAyAAKAIAKAIMEQEAIAEoAhAiACAAKAIAKAIQEQAAIAFBADYCECADIAM2AhAgBSABIAUoAgAoAgwRAQAgBSAFKAIAKAIQEQAAIAEgATYCEAwCCyADIAEgAygCACgCDBEBACADKAIQIgAgACgCACgCEBEAACADIAEoAhA2AhAgASABNgIQDAELIAEgAkYEQCABIAMgASgCACgCDBEBACABKAIQIgAgACgCACgCEBEAACABIAMoAhA2AhAgAyADNgIQDAELIAMgAjYCECABIAA2AhALIAVBEGokAAJAIAMgBCgCGCICRgRAQQQhACADIQIMAQtBBSEAIAJFDQILIAIgAigCACAAQQJ0aigCABEAAAwBCyAEIAI2AgwgBCAANgIIIwBBQGoiASQAIAQoAgghAwJAIAQoAgwiAigCECIARQRAIAFBADYCEAwBCyAAIAJGBEAgASABNgIQIAIgASACKAIAKAIMEQEADAELIAEgACAAKAIAKAIIEQIANgIQCyADLQAYIgBB/wFHBEAgAUEbNgI8IAFBHDYCOCABQR02AjQgAUEeNgIwIAFBHzYCLCABQSA2AiggAUEhNgIkIAFBIjYCICABQSM2AhwgAUEbaiADIAFBHGogAEECdGooAgARAQALIANB/wE6ABgCQCABKAIQIgBFBEAgA0EIOgAYIANBADYCEAwBCwJAAkAgACABRgRAIAMgAzYCECABIAMgASgCACgCDBEBACABKAIQIQAgA0EIOgAYIAAgAUcNAUEEIQIgASEADAILIANBCDoAGCADIAA2AhAMAgtBBSECIABFDQELIAAgACgCACACQQJ0aigCABEAAAsgAUFAayQACyAEQSBqJAALngYCBX8CfCMAQTBrIgMkAAJAAkAgASgCBCIFIAEtAAsiBCAEwCIGQQBIIgcbQQRHDQAgASgCACABIAcbKAAAQfPS6asGRw0AQQUhBCACLQAYQQNHDQFBBiEEAn8gAisDACIImUQAAAAAAADgQWMEQCAIqgwBC0GAgICAeAsiBUGAAmtBgD5LDQEgBUH/////B2ogBXENASAAKAIsIgQgBSAEKAIAKAIIEQEAAkAgAEFAaygCACAAKAI8IgZrQQN1IgQgBUkEQCAAQTxqIAUgBGsQQwwBCyAEIAVNDQAgACAGIAVBA3RqNgJACyAAQTBqIQQCQCAAKAI0IAAoAjAiB2tBA3UiBiAFSQRAIAQgBSAGaxBDDAELIAUgBk8NACAAIAcgBUEDdGo2AjQLIAVBAWu3IQkgBCgCACEGQQAhBANAIAYgBEEDdGogBLggCaMiCEQYLURU+yEpQKIQNkS9GMqJdhXCP6IgCEQYLURU+yEZQKIQNkSOrz2zJEDfv6JE9ihcj8L11j+goCAIRNIhM3982TJAohA2RLJjIxCv64e/oqA5AwAgBEEBaiIEIAVHDQALIAEoAgQhBSABLQALIgQhBgsCQCAFIAQgBsAiBEEASBtBBEcNACABKAIAIAEgBEEASBsoAABB7sK1qwZHDQBBBSEEIAItABhBBEcNAQsgA0EMaiAAQQhqIAEgASACEDNBACEEIAMtABANACADKAIMIgVBGGohACACLQAYIQECQCAFLQAwIgZB/wFGBEAgAUH/AUYNAgwBCyABQf8BRw0AIANBGzYCLCADQRw2AiggA0EdNgIkIANBHjYCICADQR82AhwgA0EgNgIYIANBITYCFCADQSI2AhAgA0EjNgIMIANBCGogACADQQxqIAZBAnRqKAIAEQEAIAVB/wE6ADAMAQsgAyAANgIIIANBODYCLCADQTk2AiggA0E6NgIkIANBOzYCICADQTw2AhwgA0E9NgIYIANBPjYCFCADQT82AhAgA0HAADYCDCADQQhqIAAgAiADQQxqIAFBAnRqKAIAEQMACyADQTBqJAAgBAsJACAAEKYBECILDwAgAEGc0wI2AgAgABAiCw0AIABBnNMCNgIAIAALBgBB/NQCCxQAIABBBGpBACABKAIEQcjUAkYbC+ADAgJ/AXwgBCgCACEEIAMrAwAhByACKAIAIQVB+AAQIyIBQZzTAjYCACABQgA3AgQjAEHgAGsiAiQAIAFBEGoiA0IANwMIIAMgBTYCBCADIAQ2AiggAyAHOQMgIANCADcDECADQYCAgPwDNgIYIANBjNQCNgIAIANBLGoQmAEgA0FAa0IANwMAIANCADcDOCADQgA3AzAgA0IANwJMIANBgMAANgJIIANB1ABqIgVCADcCACADQoCAgIDw/wc3AlwgAkGAgAQQIyIENgI8IAIgBEGAgARqIgY2AkQgBEGAgAQQJRogAiAGNgJAIAUgAkE8ahBAIAIoAjwiBARAIAIgBDYCQCAEECILIAJBADoAMCACQfPS6asGNgIsIAJBBDoANyACQQM6ACAgAkKAgICAgICAyMAANwMIIAMgAkEsaiACQQhqIgQgAygCACgCCBEGABogAi0AICIFQf8BRwRAIAJBGzYCXCACQRw2AlggAkEdNgJUIAJBHjYCUCACQR82AkwgAkEgNgJIIAJBITYCRCACQSI2AkAgAkEjNgI8IAJBO2ogBCACQTxqIAVBAnRqKAIAEQEACyACLAA3QQBIBEAgAigCLBAiCyACQeAAaiQAIAAgATYCBCAAIAM2AgALCwAgAUHY0QI2AgALEQBBCBAjIgBB2NECNgIAIAALDwAgAEGc0AI2AgAgABAiCw0AIABBnNACNgIAIAAL5wUCCX8BfiABKAIQIQQgASgCBCEGIAEoAgAhBSABKAIIKAIAIQcDQAJ/IAAoAjQiASAAKAIwIgJLBEAgASACawwBCyAAKAJEIAAoAiwgASACa2pxCwRAAn8gACgCNCIBIAAoAjAiA0sEQCABIANrDAELIAAoAkQgACgCLCABIANranELRQ0BIAAoAjggA0EDdGoiASkCACELIAFCADcCACAAKAJMIQEgACALNwNIAkAgAUUNACABIAEoAgQiAkEBazYCBCACDQAgASABKAIAKAIIEQAAIAEQJgsgACAAKAJEIANBAWpxNgIwDAELCwJAAkACQCAGBEAgACgCSCIGDQELIARFDQEgByAEQQN0ECUaDwsgACgCXCEBIAAoAlAhAiAERQ0BIAUoAgAhA0EAIQVBACEAIARBBE8EQCAEQXxxIQoDQCACIABBAnRqIAMgAEEDdGorAwC2OAIAIAIgAEEBciIIQQJ0aiADIAhBA3RqKwMAtjgCACACIABBAnIiCEECdGogAyAIQQN0aisDALY4AgAgAiAAQQNyIghBAnRqIAMgCEEDdGorAwC2OAIAIABBBGohACAJQQRqIgkgCkcNAAsLIARBA3EiCQRAA0AgAiAAQQJ0aiADIABBA3RqKwMAtjgCACAAQQFqIQAgBUEBaiIFIAlHDQALCyAGIAIgASAEEJkBQQAhAkEAIQAgBEEETwRAIARBfHEhBkEAIQMDQCAHIABBA3RqIAEgAEECdGoqAgC7OQMAIAcgAEEBciIFQQN0aiABIAVBAnRqKgIAuzkDACAHIABBAnIiBUEDdGogASAFQQJ0aioCALs5AwAgByAAQQNyIgVBA3RqIAEgBUECdGoqAgC7OQMAIABBBGohACADQQRqIgMgBkcNAAsLIARBA3EiBEUNAANAIAcgAEEDdGogASAAQQJ0aioCALs5AwAgAEEBaiEAIAJBAWoiAiAERw0ACwsPCyAGIAIgAUEAEJkBC4IPAQl/IwBBMGsiBSQAAn8CQAJAAkACQCABKAIEIAEtAAsiByAHwCIHQQBIG0EERw0AIAEoAgAgASAHQQBIGygAAEHwwtHDBkcNAEEFIAItABhBBEcNBBoCQCACLAALQQBOBEAgBSACKAIINgIQIAUgAikCADcDCAwBCyAFQQhqIAIoAgAgAigCBBAyCyADIAVBCGoQOSEHIAUsABNBAEgEQCAFKAIIECILQQYgB0UNBBogAi0AGEEERw0BAkAgAiwAC0EATgRAIAUgAigCCDYCECAFIAIpAgA3AwgMAQsgBUEIaiACKAIAIAIoAgQQMgsCQCADIAVBCGoQOSIHRQRAQQAhAwwBCyAHKAIUIQMgBygCGCIIRQRAQQAhCAwBCyAIIAgoAgRBAWo2AgQLIAUsABNBAEgEQCAFKAIIECILAkAgA0UNAEGkBBAjIglBnNACNgIAIAlCADcCBCAJQQxqIgRCADcCBCAEQcj2AjYCACAEQQxqEH0gBEGgAWoQfSAEQgA3AsQCIARBkPcCNgLAAiAEQgA3ArgCIARBkPcCNgK0AiAEQcwCahB9IARCADcC/AMgBEGQ9wI2AvgDIARCADcC8AMgBEGQ9wI2AuwDIARCADcC5AMgBEGQ9wI2AuADIARCADcChAQgBEIANwKQBCAEQZD3AjYCjAQgBUEIaiADQQAgAygCACgCCBEDACAEEH4gBSgCCCELIAUoAgwhBiAEEH4CQCAGRQ0AIAtBBGshAwNAIAMgBkECdGoqAgCLQ703hjVdRQRAQQEhAwNAIAMiCkEBdCEDIApBgARJDQALIAQgCjYCBEEBIQMDQCADIgdBAXQhAyAHQYAgSQ0ACyAEIAc2AgggBEEMaiAKIAsgByAGIAYgB0sbEHwgBCgCCCIDIAZJBEAgBEGgAWogBCgCBCALIANBAnRqIAMgBiADayIHIAMgB0kbEHwgBCgCuAIhAwJAIAQoAggiByAEKAK8AkYNACADBEAgAxAiCyAEQgA3ArgCIAdFBEBBACEDDAELQX8gB0ECdCAHQf////8DSxsQIyEDIAQgBzYCvAIgBCADNgK4AgsgAyAHQQJ0ECUaIAQoAsQCIQMCQCAEKAIIIgcgBCgCyAJGDQAgAwRAIAMQIgsgBEIANwLEAiAHRQRAQQAhAwwBC0F/IAdBAnQgB0H/////A0sbECMhAyAEIAc2AsgCIAQgAzYCxAILIAMgB0ECdBAlGiAEKAIIIQMLIANBAXQiByAGSQRAIARBzAJqIAMgCyAHQQJ0aiAGIAdrEHwgBCgC5AMhBgJAIAQoAggiAyAEKALoA0YNACAGBEAgBhAiCyAEQgA3AuQDIANFBEBBACEGDAELQX8gA0ECdCADQf////8DSxsQIyEGIAQgAzYC6AMgBCAGNgLkAwsgBiADQQJ0ECUaIAQoAvADIQYCQCAEKAIIIgMgBCgC9ANGDQAgBgRAIAYQIgsgBEIANwLwAyADRQRAQQAhBgwBC0F/IANBAnQgA0H/////A0sbECMhBiAEIAM2AvQDIAQgBjYC8AMLIAYgA0ECdBAlGiAEKAKQBCEGAkAgBCgCCCIDIAQoApQERg0AIAYEQCAGECILIARCADcCkAQgA0UEQEEAIQYMAQtBfyADQQJ0IANB/////wNLGxAjIQYgBCADNgKUBCAEIAY2ApAECyAGIANBAnQQJRoLIAQoAsgCIAQoAvQDcgRAIAQoAvwDIQYCQCAEKAIIIgMgBCgCgARGDQAgBgRAIAYQIgsgBEIANwL8AyADRQRAQQAhBgwBC0F/IANBAnQgA0H/////A0sbECMhBiAEIAM2AoAEIAQgBjYC/AMLIAYgA0ECdBAlGgsgBEIANwKEBAwCCyAGQQFrIgYNAAsLAn8gACgCMCIDIAAoAjQiB0sEQCADIAdrDAELIAAoAiwgAyAHa2oLBEAgACgCOCAHQQN0aiIKIAQ2AgAgCigCBCEDIAogCTYCBAJAIANFDQAgAyADKAIEIgpBAWs2AgQgCg0AIAMgAygCACgCCBEAACADECYLIAAgACgCRCAHQQFqcTYCNAwBCyAJIAkoAgQiA0EBazYCBCADDQAgCSAJKAIAKAIIEQAAIAkQJgsgCEUNACAIIAgoAgQiA0EBazYCBCADDQAgCCAIKAIAKAIIEQAAIAgQJgsgBUEIaiAAQQhqIAEgASACEDMgBS0ADA0CIAUoAggiA0EYaiEAIAItABghASADLQAwIgdB/wFGBEAgAUH/AUYNAwwCCyABQf8BRw0BIAVBGzYCKCAFQRw2AiQgBUEdNgIgIAVBHjYCHCAFQR82AhggBUEgNgIUIAVBITYCECAFQSI2AgwgBUEjNgIIIAVBBGogACAFQQhqIAdBAnRqKAIAEQEAIANB/wE6ADAMAgsQOwALIAUgADYCBCAFQTg2AiggBUE5NgIkIAVBOjYCICAFQTs2AhwgBUE8NgIYIAVBPTYCFCAFQT42AhAgBUE/NgIMIAVBwAA2AgggBUEEaiAAIAIgBUEIaiABQQJ0aigCABEDAAtBAAshDCAFQTBqJAAgDAsJACAAEKcBECILDwAgAEHYzgI2AgAgABAiCw0AIABB2M4CNgIAIAALBgBByNECCxQAIABBBGpBACABKAIEQZjRAkYbC5sDAgR/AXwjAEEwayIDJAACfwJAIAEoAgQgAS0ACyIEIATAIgRBAEgbQQdHDQAgASgCACABIARBAEgbQcgPQQcQJw0AQQUgAi0AGEEDRw0BGiAAAn8gAisDACIHmUQAAAAAAADgQWMEQCAHqgwBC0GAgICAeAs2AiwLIANBDGogAEEIaiABIAEgAhAzAkAgAy0AEA0AIAMoAgwiBEEYaiEAIAItABghAQJAIAQtADAiBUH/AUYEQCABQf8BRg0CDAELIAFB/wFHDQAgA0EbNgIsIANBHDYCKCADQR02AiQgA0EeNgIgIANBHzYCHCADQSA2AhggA0EhNgIUIANBIjYCECADQSM2AgwgA0EIaiAAIANBDGogBUECdGooAgARAQAgBEH/AToAMAwBCyADIAA2AgggA0E4NgIsIANBOTYCKCADQTo2AiQgA0E7NgIgIANBPDYCHCADQT02AhggA0E+NgIUIANBPzYCECADQcAANgIMIANBCGogACACIANBDGogAUECdGooAgARAwALQQALIQYgA0EwaiQAIAYLpwICAXwBfyADKwMAIQUgBCgCACEDIAIoAgAhAkH4ABAjIgFB2M4CNgIAIAFCADcCBCABQdDPAjYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggAUFAa0IANwMAIAFBIDYCPCABQcgAaiICQgA3AwAgAUKAgICA8AM3A1AgAhA6IAFCADcDcCABQgA3A2ggAUHgAGoiAkIANwMAIAFCADcDWAJ/IANFBEBBACECQQAMAQsgAiADEFsgASgCcCECIAEoAmwLIQQgAUEQaiEGAkAgAiAEa0ECdSICIANJBEAgAUHsAGogAyACaxBbDAELIAIgA00NACABIAQgA0ECdGo2AnALIAAgATYCBCAAIAY2AgALCwAgAUGUzQI2AgALEQBBCBAjIgBBlM0CNgIAIAALswwBC38jAEGgAmsiAiQAAkACQAJ/IABBQGsoAgAiAyAAKAI8IgRLBEAgAyAEawwBCyAAKAJQIAAoAjggAyAEa2pxCyIDBEAgAEE4aiELAkAgAEHgCGooAgAgACgC3AgiBGsiCUEDdSIFIAMgBWoiBkkEQCAAQdwIaiIEIAMQQyAEKAIAIQQMAQsgBSAGTQ0AIAAgBCAGQQN0ajYC4AgLIAIgBCAJajYCUCALIAJB0ABqQQEgAxBkRQ0BCyAALQDoCCEMIABBADoA6AggDEEBcUUNACACQQA2AvQBIAJCADcC7AECQCAAQeAIaigCACIDIAAoAtwIIgRGDQAgAkHsAWogAyAEa0EDdSIGEFtBASAGIAZBAU0bIgpBA3EhCEEAIQkgAigC7AEhBUEAIQMgBkEETwRAIApBfHEhCkEAIQYDQCAFIANBAnRqIAQgA0EDdGorAwC2OAIAIAUgA0EBciIHQQJ0aiAEIAdBA3RqKwMAtjgCACAFIANBAnIiB0ECdGogBCAHQQN0aisDALY4AgAgBSADQQNyIgdBAnRqIAQgB0EDdGorAwC2OAIAIANBBGohAyAGQQRqIgYgCkcNAAsLIAhFDQADQCAFIANBAnRqIAQgA0EDdGorAwC2OAIAIANBAWohAyAJQQFqIgkgCEcNAAsLIAAgACgC3Ag2AuAIIAJBBzoA6wEgAkHbESgAADYC4AEgAkHeESgAADYA4wEgAkEAOgDnASACQQA6ACggAkHuwrWrBjYCJCACQQQ6AC8gAkEAOgAYIAJBMGoiAyAAIAJBJGogAhBLIAJB0ABqQZITIAMQRyIAQTBqQagVIAJB7AFqEIABIQMgAiACQbgBaiIFNgK0ASACQgA3ArgBIAJB/AFqIgQgAkG0AWoiBiAFIAAgABAuIAQgBiAFIAMgAxAuIAJCADcCxAEgAiACQcABakEEciIGNgLAASAFIAIoArQBIgNHBEADQCACQfwBaiACQcABaiAGIANBEGoiBCAEEC4CQCADKAIEIgQEQANAIAQiAygCACIEDQAMAgsACwNAIAMgAygCCCIDKAIARw0ACwsgAyAFRw0ACwsgAkEFOgDYASABKAIQIgFFDQEgASACQeABaiACQcABaiIDIAEoAgAoAhgRAwAgAi0A2AEiAUH/AUcEQCACQRs2ApwCIAJBHDYCmAIgAkEdNgKUAiACQR42ApACIAJBHzYCjAIgAkEgNgKIAiACQSE2AoQCIAJBIjYCgAIgAkEjNgL8ASACQfsBaiADIAJB/AFqIAFBAnRqKAIAEQEACyACQf8BOgDYASACQbQBaiACKAK4ARA4IAAtAFgiAUH/AUcEQCACQRs2ApwCIAJBHDYCmAIgAkEdNgKUAiACQR42ApACIAJBHzYCjAIgAkEgNgKIAiACQSE2AoQCIAJBIjYCgAIgAkEjNgL8ASACQfsBaiAAQUBrIAJB/AFqIAFBAnRqKAIAEQEACyAAQf8BOgBYIAAsADtBAEgEQCAAKAIwECILIAAtACgiAUH/AUcEQCACQRs2ApwCIAJBHDYCmAIgAkEdNgKUAiACQR42ApACIAJBHzYCjAIgAkEgNgKIAiACQSE2AoQCIAJBIjYCgAIgAkEjNgL8ASACQfsBaiAAQRBqIAJB/AFqIAFBAnRqKAIAEQEACyAAQf8BOgAoIAAsAAtBAEgEQCAAKAIAECILIAItAEgiAEH/AUcEQCACQRs2ApwCIAJBHDYCmAIgAkEdNgKUAiACQR42ApACIAJBHzYCjAIgAkEgNgKIAiACQSE2AoQCIAJBIjYCgAIgAkEjNgL8ASACQfsBaiACQTBqIAJB/AFqIABBAnRqKAIAEQEACyACQf8BOgBIIAItABgiAEH/AUcEQCACQRs2ApwCIAJBHDYCmAIgAkEdNgKUAiACQR42ApACIAJBHzYCjAIgAkEgNgKIAiACQSE2AoQCIAJBIjYCgAIgAkEjNgL8ASACQfsBaiACIAJB/AFqIABBAnRqKAIAEQEACyACLAAvQQBIBEAgAigCJBAiCyACLADrAUEASARAIAIoAuABECILIAIoAuwBIgBFDQAgAiAANgLwASAAECILIAJBoAJqJAAPCxBFAAv0AgIHfwJ8IwBBEGsiAyQAIAEoAhAhBCABKAIIKAIAIQICQCABKAIEQQFNBEAgBEUNASACIARBA3QQJRoMAQsgBEUNACACIAEoAgAiBigCBCAEQQN0EDQgAEE4aiEHIABB2ABqIQVBACEBA0AgACsDMCEKIAAgAUEDdCIIIAYoAgBqKwMAIgk5AzACQAJARAAAAAAAAPA/RAAAAAAAAPC/RAAAAAAAAAAAIAkgCqEiCkQAAAAAAAAAAGMbIApEAAAAAAAAAABkG0QAAAAAAADgv2NFBEAgACgC2AgiAkGAAUkNAiADIAU2AgwgByADQQxqQQEgAkEAEFkMAQsgAyAFNgIMIAcgA0EMakEBIAAoAtgIQQAQWSAAQQE6AOgICyAAQQA2AtgIQQAhAgsgCUQAAAAAAAAAAGIEQCAGKAIEIAhqKwMAIQkgACACQQFqNgLYCCAFIAJBA3RqIAk5AwALIAFBAWoiASAERw0ACwsgA0EQaiQACwkAIAAQqAEQIgsPACAAQZTLAjYCACAAECILDQAgAEGUywI2AgAgAAsGAEGEzQILFAAgAEEEakEAIAEoAgRByMwCRhsLhwICAXwBfyADKwMAIQUgBCgCACEDIAIoAgAhAkGACRAjIgFBlMsCNgIAIAFCADcCBCABQYjMAjYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggAUFAa0IANwMAIAFBEGohBgJAAn8gBUQAAAAAAADwQWMgBUQAAAAAAAAAAGZxBEAgBasMAQtBAAsiAkEBayACcUUEQCACIQMMAQtBASEEA0AgBCIDQQF0IQQgAiADSg0ACwsgAUHIAGpBASADELABGiABQfgIakEAOgAAIAFB8AhqQgA3AwAgAUHoCGpCADcDACAAIAE2AgQgACAGNgIACwsAIAFByMkCNgIACxEAQQgQIyIAQcjJAjYCACAAC/8JAgV/AXwjAEGgAmsiAiQAAkACQAJ/IAAoAjQiBCAAKAIwIgNLBEAgBCADawwBCyAAKAJEIAAoAiwgBCADa2pxC0UNAANAAn8gACgCNCIEIAAoAjAiA0sEQCAEIANrDAELIAAoAkQgACgCLCAEIANranELBEACfyAAKAI0IgMgACgCMCIESwRAIAMgBGsMAQsgACgCRCAAKAIsIAMgBGtqcQtFDQIgACgCOCAEQQN0aisDACEHIAAgACgCRCAEQQFqcTYCMAwBCwsgAkEAOgDwASACQvPchYO3jtq39AA3A+gBIAJBCDoA8wEgAkEAOgAwIAJB7sK1qwY2AiwgAkEEOgA3IAJBADoAICACQThqIgQgACACQSxqIAJBCGoQSyACQdgAakGSEyAEEEciA0HkwtGLBjYCMCADQQQ6ADsgA0EDOgBYIANBQGsgBzkDACADQQA6ADQgAiACQcABaiIFNgK8ASACQgA3AsABIAJB/AFqIgAgAkG8AWoiBCAFIAMgAxAuIAAgBCAFIANBMGoiACAAEC4gAkIANwLMASACIAJByAFqQQRyIgY2AsgBIAUgAigCvAEiAEcEQANAIAJB/AFqIAJByAFqIAYgAEEQaiIEIAQQLgJAIAAoAgQiBARAA0AgBCIAKAIAIgQNAAwCCwALA0AgACAAKAIIIgAoAgBHDQALCyAAIAVHDQALCyACQQU6AOABIAEoAhAiAEUNASAAIAJB6AFqIAJByAFqIgEgACgCACgCGBEDACACLQDgASIAQf8BRwRAIAJBGzYCnAIgAkEcNgKYAiACQR02ApQCIAJBHjYCkAIgAkEfNgKMAiACQSA2AogCIAJBITYChAIgAkEiNgKAAiACQSM2AvwBIAJB+wFqIAEgAkH8AWogAEECdGooAgARAQALIAJB/wE6AOABIAJBvAFqIAIoAsABEDggAy0AWCIAQf8BRwRAIAJBGzYCnAIgAkEcNgKYAiACQR02ApQCIAJBHjYCkAIgAkEfNgKMAiACQSA2AogCIAJBITYChAIgAkEiNgKAAiACQSM2AvwBIAJB+wFqIANBQGsgAkH8AWogAEECdGooAgARAQALIANB/wE6AFggAywAO0EASARAIAMoAjAQIgsgAy0AKCIAQf8BRwRAIAJBGzYCnAIgAkEcNgKYAiACQR02ApQCIAJBHjYCkAIgAkEfNgKMAiACQSA2AogCIAJBITYChAIgAkEiNgKAAiACQSM2AvwBIAJB+wFqIANBEGogAkH8AWogAEECdGooAgARAQALIANB/wE6ACggAywAC0EASARAIAMoAgAQIgsgAi0AUCIAQf8BRwRAIAJBGzYCnAIgAkEcNgKYAiACQR02ApQCIAJBHjYCkAIgAkEfNgKMAiACQSA2AogCIAJBITYChAIgAkEiNgKAAiACQSM2AvwBIAJB+wFqIAJBOGogAkH8AWogAEECdGooAgARAQALIAJB/wE6AFAgAi0AICIAQf8BRwRAIAJBGzYCnAIgAkEcNgKYAiACQR02ApQCIAJBHjYCkAIgAkEfNgKMAiACQSA2AogCIAJBITYChAIgAkEiNgKAAiACQSM2AvwBIAJB+wFqIAJBCGogAkH8AWogAEECdGooAgARAQALIAIsADdBAEgEQCACKAIsECILIAIsAPMBQQBODQAgAigC6AEQIgsgAkGgAmokAA8LEEUAC/QBAgZ/AnwgASgCECECIAEoAggoAgAhBAJAIAEoAgRBAk8EQCACRQ0BIAEoAgAhBUEAIQEDQCABQQN0IgYgBSgCBGorAwAhCCAFKAIAIAZqKwMAIQkCQCAAKwNImUQAAAAAAACwPGVFDQAgCUQAAAAAAACwPGRFDQACfyAAKAIwIgcgACgCNCIDSwRAIAcgA2sMAQsgACgCLCAHIANragtFDQAgACgCOCADQQN0aiAIOQMAIAAgACgCRCADQQFqcTYCNAsgACAJOQNIIAQgBmogCDkDACABQQFqIgEgAkcNAAsMAQsgAkUNACAEIAJBA3QQJRoLC/UBAQV/IwBBMGsiAiQAIABBuMgCNgIAIAAoAjgiAQRAIAAgATYCPCABECILIABB/CE2AgAgACgCECIBBEADQCABKAIAIQUgAS0AMCIEQf8BRwRAIAJBGzYCLCACQRw2AiggAkEdNgIkIAJBHjYCICACQR82AhwgAkEgNgIYIAJBITYCFCACQSI2AhAgAkEjNgIMIAJBC2ogAUEYaiACQQxqIARBAnRqKAIAEQEACyABQf8BOgAwIAEsABNBAEgEQCABKAIIECILIAEQIiAFIgENAAsLIAAoAgghASAAQQA2AgggAQRAIAEQIgsgABAiIAJBMGokAAvzAQEFfyMAQTBrIgIkACAAQbjIAjYCACAAKAI4IgEEQCAAIAE2AjwgARAiCyAAQfwhNgIAIAAoAhAiAQRAA0AgASgCACEFIAEtADAiBEH/AUcEQCACQRs2AiwgAkEcNgIoIAJBHTYCJCACQR42AiAgAkEfNgIcIAJBIDYCGCACQSE2AhQgAkEiNgIQIAJBIzYCDCACQQtqIAFBGGogAkEMaiAEQQJ0aigCABEBAAsgAUH/AToAMCABLAATQQBIBEAgASgCCBAiCyABECIgBSIBDQALCyAAKAIIIQEgAEEANgIIIAEEQCABECILIAJBMGokACAACw8AIABBxMcCNgIAIAAQIgtYAQF/IwBBEGsiAyQAIAEoAgQgAkEMbGoiASgCBCECIAMgASgCACIBNgIMIAMgAiABa0EDdTYCCCAAQcTjAiADQQhqEAI2AgQgAEHohwQ2AgAgA0EQaiQACw0AIABBxMcCNgIAIAALBgBBuMkCCxQAIABBBGpBACABKAIEQfzIAkYbC5UDAgR/AXwgAysDACEJIAQoAgAhAyACKAIAIQJB4AAQIyIBQcTHAjYCACABQgA3AgQgAUG4yAI2AhAgAUIANwMYIAEgAjYCFCABQgA3AyAgASADNgI4IAEgCTkDMCABQYCAgPwDNgIoIAFBQGtCADcDACABQSA2AjwgAUIANwNIIAFCgICAgPADNwNQAkAgASgCUCIFIAEoAkwiA2tBA3VBIE8EQCABIANBgAIQJUGAAmo2AkwMAQsCQCADIAEoAkgiAmtBA3UiBkEgaiIEQYCAgIACSQRAQf////8BIAUgAmsiBUECdSIIIAQgBCAISRsgBUH4////B08bIgQEQCAEQYCAgIACTw0CIARBA3QQIyEHCyAGQQN0IAdqIgVBgAIQJUGAAmohBiACIANHBEADQCAFQQhrIgUgA0EIayIDKQMANwMAIAIgA0cNAAsLIAEgByAEQQN0ajYCUCABIAY2AkwgASAFNgJIIAIEQCACECILDAILEC0ACxA1AAsgAUIANwNYIAAgATYCBCAAIAFBEGo2AgALCwAgAUH4xQI2AgALEQBBCBAjIgBB+MUCNgIAIAALmhkCEX8BfCMAQbACayICJAAgAkEAOgBUIAJB89LpqwY2AlAgAkEEOgBbAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEEIaiIDIAJB0ABqIgQQOQR8IAMgBBApIgRFDQEgBC0AMEEDRw0IIAQrAxgFRAAAAAAAAIBACyETIAIsAFtBAE4hEQJ/IBNEAAAAAAAA8EFjIBNEAAAAAAAAAABmcQRAIBOrDAELQQALIQggEUUEQCACKAJQECILIAJBADoAWCACQuPQhfPmrZm28wA3A1AgAkEIOgBbIAMgAkHQAGoiBBA5BHwgAyAEECkiA0UNAiADLQAwQQNHDQggAysDGAVEAAAAAAAA8D8LIRMgAiwAW0EATiESAn8gE0QAAAAAAADwQWMgE0QAAAAAAAAAAGZxBEAgE6sMAQtBAAshCSASRQRAIAIoAlAQIgsCfyAAKAJUIgMgACgCUCIESwRAIAMgBGsMAQsgACgCZCAAKAJMIAMgBGtqcQsgCE0NCkEAIQQgAkEANgKAAiACQgA3AvgBIAkEQCAJQYCAgMAATw0DIAIgCUEFdCIDECMiBzYC+AEgAiADIAdqIgo2AoACIAchAyAJQQdxIgYEQANAIANBADoAGCADQSBqIQMgBUEBaiIFIAZHDQALCyAJQQFrQf///z9xQQdPBEADQCADQQA6ABggA0EAOgD4ASADQQA6ANgBIANBADoAuAEgA0EAOgCYASADQQA6AHggA0EAOgBYIANBADoAOCADQYACaiIDIApHDQALCyACIAo2AvwBCyACQQA2AvQBIAJCADcC7AEgCCAJbCIDBEAgA0GAgICAAk8NBCACIANBA3QiAxAjIgQ2AuwBIAIgAyAEaiIFNgL0ASAEIAMQJRogAiAFNgLwAQsgAEHMAGohDCAJBEAgAEEsaiENIAhBgICAgARJIQ8gCEECdCILQQBOIRBBACEFA0AgAkEANgI4IAJCADcCMAJAIAhFBEBBACEDIAJBADYCkAIgAkIANwOIAkEAIQoMAQsgD0UNByACIAsQIyIDNgIwIAIgAyALaiIENgI4IAMgCxAlGiACQQA2ApACIAJCADcDiAIgAiAENgI0IBBFDQggAiALECMiCjYCiAIgAiAKIAtqIgM2ApACIAogCxAlGiACIAM2AowCCyACQQc6AKACAkAgByAFQQV0aiIGLQAYIgRB/wFGBH8gAwUgBEEHRgRAIAMhBCAGIAYoAgAiAwR/IAYgAzYCBCADECIgAigCjAIhBCACKAKIAiEKIAIoApACBSAECzYCCCAGIAQ2AgQgBiAKNgIAIAJBADYCkAIgAkIANwOIAgwCCyACQRs2AnAgAkEcNgJsIAJBHTYCaCACQR42AmQgAkEfNgJgIAJBIDYCXCACQSE2AlggAkEiNgJUIAJBIzYCUCACIAYgAkHQAGogBEECdGooAgARAQAgAigCkAIhAyACKAKIAiEKIAIoAowCCyEEIAYgAzYCCCAGIAQ2AgQgBiAKNgIAIAJBADYCkAIgAkIANwOIAiAGQQc6ABgLIAItAKACIgNB/wFHBEAgAkEbNgJwIAJBHDYCbCACQR02AmggAkEeNgJkIAJBHzYCYCACQSA2AlwgAkEhNgJYIAJBIjYCVCACQSM2AlAgAiACQYgCaiACQdAAaiADQQJ0aigCABEBAAsgAkH/AToAoAIgAigCMCIDBEAgAxAiCyANIAVBAnRqIAIoAuwBIgQgBSAIbEEDdGo2AgAgCSAFQQFqIgVHDQALDAcLIAwgAEEsakEAIAgQZEUNCQwIC0GjExA3AAtBoxMQNwALEC0ACxAtAAsQLQALEC0ACyAMIA0gCSAIEGRFDQIgCARAIAhBfHEhDyAIQQNxIQxBACELIAhBBEkhEANAIAcgC0EFdGoiAy0AGEEHRw0CIAQgCCALbEEDdGohBSADKAIAIQZBACEKQQAhA0EAIQ0gEEUEQANAIAYgA0ECdGogBSADQQN0aisDALY4AgAgBiADQQFyIg5BAnRqIAUgDkEDdGorAwC2OAIAIAYgA0ECciIOQQJ0aiAFIA5BA3RqKwMAtjgCACAGIANBA3IiDkECdGogBSAOQQN0aisDALY4AgAgA0EEaiEDIA1BBGoiDSAPRw0ACwsgDARAA0AgBiADQQJ0aiAFIANBA3RqKwMAtjgCACADQQFqIQMgCkEBaiIKIAxHDQALCyALQQFqIgsgCUcNAAsMAgsgB0EYaiEEQQAhAwNAIAQgA0EFdGotAABBB0cNASAJIANBAWoiA0cNAAsMAQsQOwALIAJBlRItAAA6AOQBIAJBBToA6wEgAkEAOgDlASACQZESKAAANgLgASACQQA6ACggAkHuwrWrBjYCJCACQQQ6AC8gAkEAOgAYIAJBMGoiAyAAIAJBJGogAhBLIAJB0ABqQZITIAMQRyIAQeTC0YsGNgIwIABBBDoAOyAAQQA2AkggAEFAayIIQgA3AwAgAEEAOgA0IAcgAigC/AEiBEcEQCAEIAdrIgVBAEgNAyAAIAUQIyIDNgJEIAAgAzYCQCAAIAMgBWo2AkgDQCADQf8BOgAYIANBADoAACAHLQAYIgVB/wFHBEAgAkEtNgKoAiACQS42AqQCIAJBLzYCoAIgAkEwNgKcAiACQTE2ApgCIAJBMjYClAIgAkEzNgKQAiACQTQ2AowCIAJBNTYCiAIgAkG0AWogAyAHIAJBiAJqIAVBAnRqKAIAEQMAIAMgBy0AGDoAGAsgA0EgaiEDIAdBIGoiByAERw0ACyAAIAM2AkQLIABBBjoAWCACIAJBuAFqIgQ2ArQBIAJCADcCuAEgAkGIAmoiAyACQbQBaiIHIAQgACAAEC4gAyAHIAQgAEEwaiIHIAcQLiACQgA3AsQBIAIgAkHAAWpBBHIiCTYCwAEgBCACKAK0ASIDRwRAA0AgAkGIAmogAkHAAWogCSADQRBqIgUgBRAuAkAgAygCBCIFBEADQCAFIgMoAgAiBQ0ADAILAAsDQCADIAMoAggiAygCAEcNAAsLIAMgBEcNAAsLIAJBBToA2AEgASgCECIBRQ0DIAEgAkHgAWogAkHAAWoiAyABKAIAKAIYEQMAIAItANgBIgFB/wFHBEAgAkEbNgKoAiACQRw2AqQCIAJBHTYCoAIgAkEeNgKcAiACQR82ApgCIAJBIDYClAIgAkEhNgKQAiACQSI2AowCIAJBIzYCiAIgAkGHAmogAyACQYgCaiABQQJ0aigCABEBAAsgAkH/AToA2AEgAkG0AWogAigCuAEQOCAALQBYIgFB/wFHBEAgAkEbNgKoAiACQRw2AqQCIAJBHTYCoAIgAkEeNgKcAiACQR82ApgCIAJBIDYClAIgAkEhNgKQAiACQSI2AowCIAJBIzYCiAIgAkGHAmogCCACQYgCaiABQQJ0aigCABEBAAsgAEH/AToAWCAALAA7QQBIBEAgBygCABAiCyAALQAoIgFB/wFHBEAgAkEbNgKoAiACQRw2AqQCIAJBHTYCoAIgAkEeNgKcAiACQR82ApgCIAJBIDYClAIgAkEhNgKQAiACQSI2AowCIAJBIzYCiAIgAkGHAmogAEEQaiACQYgCaiABQQJ0aigCABEBAAsgAEH/AToAKCAALAALQQBIBEAgACgCABAiCyACLQBIIgBB/wFHBEAgAkEbNgKoAiACQRw2AqQCIAJBHTYCoAIgAkEeNgKcAiACQR82ApgCIAJBIDYClAIgAkEhNgKQAiACQSI2AowCIAJBIzYCiAIgAkGHAmogAkEwaiACQYgCaiAAQQJ0aigCABEBAAsgAkH/AToASCACLQAYIgBB/wFHBEAgAkEbNgKoAiACQRw2AqQCIAJBHTYCoAIgAkEeNgKcAiACQR82ApgCIAJBIDYClAIgAkEhNgKQAiACQSI2AowCIAJBIzYCiAIgAkGHAmogAiACQYgCaiAAQQJ0aigCABEBAAsgAiwAL0EASARAIAIoAiQQIgsgAiwA6wFBAEgEQCACKALgARAiCyACKALsASEECyAEBEAgAiAENgLwASAEECILIAIoAvgBIgBFDQAgACACKAL8ASIDRwR/A0AgA0EgayIDIgEtABgiBEH/AUcEQCACQRs2AnAgAkEcNgJsIAJBHTYCaCACQR42AmQgAkEfNgJgIAJBIDYCXCACQSE2AlggAkEiNgJUIAJBIzYCUCACQYgCaiADIAJB0ABqIARBAnRqKAIAEQEACyABQf8BOgAYIAAgA0cNAAsgAigC+AEFIAALECILIAJBsAJqJAAPCxAtAAsQRQALXQEDfyABKAIQIQIgASgCCCgCACEDAkAgASgCBCIERQRAIAJFDQEgAyACQQN0ECUaDwsgASgCACEBIAIEQCADIAEoAgAgAkEDdBA0CyAAQcwAaiABIAQgAkEAEFkLC5kEAgN/AXwjAEEwayIDJAACQAJAAkACQCABKAIEIAEtAAsiBCAEwCIEQQBIIgUbQQRrDgUAAgICAQILIAEoAgAgASAEQQBIGyIFKAAAQfPS6asGRgRAQQUhBCACLQAYQQNHDQNBBiEEIAIrAwAiBkQAAAAAAABwQGMNAyAGRAAAAAAAAMBAZA0DCyAFKAAAQe7CtasGRw0BQQUhBCACLQAYQQRGDQEMAgsgASgCACABIAUbKQAAQuPQhfPmrZm28wBSDQBBBSEEIAItABhBA0cNAUEGIQQgAisDACIGRAAAAAAAAAAAYw0BIAZEAAAAAAAAEEBkDQELIANBDGogAEEIaiABIAEgAhAzAkAgAy0AEA0AIAMoAgwiBEEYaiEAIAItABghAQJAIAQtADAiBUH/AUYEQCABQf8BRg0CDAELIAFB/wFHDQAgA0EbNgIsIANBHDYCKCADQR02AiQgA0EeNgIgIANBHzYCHCADQSA2AhggA0EhNgIUIANBIjYCECADQSM2AgwgA0EIaiAAIANBDGogBUECdGooAgARAQAgBEH/AToAMAwBCyADIAA2AgggA0E4NgIsIANBOTYCKCADQTo2AiQgA0E7NgIgIANBPDYCHCADQT02AhggA0E+NgIUIANBPzYCECADQcAANgIMIANBCGogACACIANBDGogAUECdGooAgARAwALQQAhBAsgA0EwaiQAIAQLCQAgABCpARAiCw4AIABBoCA2AgAgABAiCw8AIABBgMQCNgIAIAAQIgsNACAAQYDEAjYCACAACwYAQejFAgsUACAAQQRqQQAgASgCBEGwxQJGGwvBCAICfwF8IAQoAgAhBCADKwMAIQcgAigCACEFQfgAECMiAUGAxAI2AgAgAUIANwIEIwBB4ABrIgIkACABQRBqIgNCADcDCCADIAU2AgQgAyAENgIoIAMgBzkDICADQYDAADYCTCADQgA3AxAgA0GAgID8AzYCGCADQgA3A1AgA0HwxAI2AgAgA0HYAGoiBUIANwMAIANCgICAgPD/BzcDYCACQYCABBAjIgQ2AjwgAiAEQYCABGoiBjYCRCAEQYCABBAlGiACIAY2AkAgBSACQTxqEEAgAigCPCIEBEAgAiAENgJAIAQQIgsgAkGAgAQQIyIENgI8IAIgBEGAgARqIgY2AkQgBEGAgAQQJRogAiAGNgJAAkAgAygCXCIEIAMoAmBPBEAgBSACQTxqEEAgAigCPCIERQ0BIAIgBDYCQCAEECIMAQsgBEEANgIIIARCADcCACAEIAIoAjw2AgAgBCACKAJANgIEIAQgAigCRDYCCCADIARBDGo2AlwLIAJBgIAEECMiBDYCPCACIARBgIAEaiIGNgJEIARBgIAEECUaIAIgBjYCQAJAIAMoAlwiBCADKAJgTwRAIAUgAkE8ahBAIAIoAjwiBEUNASACIAQ2AkAgBBAiDAELIARBADYCCCAEQgA3AgAgBCACKAI8NgIAIAQgAigCQDYCBCAEIAIoAkQ2AgggAyAEQQxqNgJcCyACQYCABBAjIgQ2AjwgAiAEQYCA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ACABIAEoAgAoAggRAAAgARAmCyAAIAAoAkQgAkEBanE2AjALIAAoAkghAgJAIAAoAkwiAQRAIAEgASgCBEECajYCBCADQgA3ABggA0IANwAQIANCADcACCABIAEoAgQiBEEBazYCBCAERQRAIAEgASgCACgCCBEAACABECYLIAEgASgCBEEBajYCBAwBCyADQgA3AAggA0IANwAYIANCADcAEAsgACACNgJYIAAoAlwhAiAAIAE2AlwCQCACRQ0AIAIgAigCBCIEQQFrNgIEIAQNACACIAIoAgAoAggRAAAgAhAmCyAAQQA6AIgBIAAgEDkDgAEgACAPOQN4IAAgFDcDcCAAQgA3A2ggAEIANwNgIAAgAykAGDcAoAEgACADKQARNwCZASAAIAMpAAk3AJEBIAAgAykAATcAiQECQCABRQ0AIAEgASgCBCICQQFrNgIEIAINACABIAEoAgAoAggRAAAgARAmCyAAKAJIIQIgACgCTCIBRQ0DIAEgASgCBEECajYCBCADQgA3ABggA0IANwAQIANCADcACCABIAEoAgQiBEEBazYCBCAERQRAIAEgASgCACgCCBEAACABECYLIAEgASgCBEEBajYCBAwECyAAKAL8ASIEQQJGIQcgACgChAK4IRIgACgCgAK4IRBBACEBQQAhAgNAIAArA1AhESAAIA0oAgAgAUEDdGorAwAiEzkDUCATIBGhIhFEAAAAAAAAAABkIgkEQCAIIAYgBSACIAEgAmsiDCAPEFggCyAGIAUgAiAMIA8QWCAIIAAoAvgBQQFxQdAAbGoiAkEQakIANwMAIAIgAkEIakEgQRggAisDCCACKwMQZBtqKQMANwMYIAAgACgC+AFBAWoiAjYC+AEgCCACQQFxQdAAbGoiAkEQakKAgICAgICA+D83AwAgAiAQOQNAIAIgEjkDOCACIBA5A0ggAiAHOgAwIAIgAkEIakEgQRggAisDCCACKwMQZBtqKQMANwMYIAEhAgsCQCAERQ0ARAAAAAAAAPA/RAAAAAAAAPC/RAAAAAAAAAAAIBFEAAAAAAAAAABjGyAJG0QAAAAAAADgv2NFDQAgCCAGIAUgAiABIAJrIgkgDxBYIAsgBiAFIAIgCSAPEFggCCAAKAL4AUEBcUHQAGxqIgJBEGpCADcDACACIAJBCGpBIEEYIAIrAwggAisDEGQb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AUG8owI2AgAgAUIANwIEIAFBsKQCNgIQIAFCADcDGCABIAI2AhQgAUIANwMgIAEgAzYCOCABIAY5AzAgAUGAgID8AzYCKCABQUBrQgA3AwAgAUEgNgI8IAFByABqIgJCADcDACABQoCAgIDwAzcDUCACEDogAUIANwN4IAFCADcDcCABQZABaiICQgA3AwAgAUIANwOAASABQgA3A2ggAUIANwNgIAFCADcDWCABQYgBaiIDQs6LmJXvic67PzcDACACIAMgASsDcCABKwN4ZBsiAykDACEFIAJCzouYle+Jzru/fzcDACABIAU3A4ABIAMpAwAhBSABQQA6AJgBIAEgBTcDgAEgAUGgAWpByAAQJRogAUHYAWoiAkLOi5iV74nOuz83AwAgAUHgAWogAiABKwPAASABKwPIAWQbIgIpAwAhBSABQs6LmJXvic67v383A+ABIAEgBTcD0AEgAUIANwPwASABQQA6AOgBIAFCADcD+AEgAUIANwOAAiABQgA3A4gCIAFCADcDkAIgASACKQMANwPQASABQoCAgICAgID4PzcDmAIgACABNgIEIAAgAUEQajYCAAsLACABQfChAjYCAAsRAEEIECMiAEHwoQI2AgAgAAs5AQF/IAEgACgCBCIEQQF1aiEBIAAoAgAhACABIAIgAyAEQQFxBH8gASgCACAAaigCAAUgAAsREQALxhgBEn8jAEGgAmsiAiQAAn8gACgCLCIDKAIIIgUgAygCBCIESwRAIAUgBGsMAQsgAygCGCADKAIAIAUgBGtqcQshDyAAQcgBaiEHAkACQAJAAkAgACgCLCIDRQ0AIA9BAEwNACAAQTBqIREDQCAAKAK0ASIEIAAoArABIgVHBEAgBSAEIAVrECUaCyADIBEgACgCvAEiBSADKAIQIAMoAgxrQQxtIgMgAyAFSxsiDiAAKALAASIDIA8gAyAPSBsiCxBkRQ0CIAJBBzoAkAIgAkEANgKAAiACQgA3A/gBAkAgACgCzAEiAyAAKALIASIEa0EFdSIFIA5JBEAgAkH4AWohBkEAIQwjAEEwayIEJAACQAJAAkAgDiAFayIJIAcoAggiBSAHKAIEIgNrQQV1TQRAIAcgCQR/IAMgCUEFdGohBQNAIANB/wE6ABggA0EAOgAAIAYtABgiCUH/AUcEQCAEQS02AiwgBEEuNgIoIARB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IANHDQALDAELIANFDQAgByADQQN0ECUaCyAEQRBqJAALDgAgAEGAHTYCACAAECILCQAgABCzARAiCw8AIABBoJwCNgIAIAAQIgsNACAAQaCcAjYCACAACwYAQYieAgsUACAAQQRqQQAgASgCBEHQnQJGGwurAQEBfCADKwMAIQUgBCgCACEDIAIoAgAhAkHgABAjIgFBoJwCNgIAIAFCADcCBCABQZCdAjYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggAUFAa0IANwMAIAFBIDYCPCABQcgAaiICQgA3AwAgAUKAgICA8AM3A1AgAhA6IAFCADcCWCAAIAE2AgQgACABQRBqNgIACwsAIAFB2JoCNgIACxEAQQgQIyIAQdiaAjYCACAACwwAIABBgB02AgAgAAvMDAQJfwJ8BX0CfiMAQRBrIgQkACABKAIAIQUgBCABKAIIKAIANgIMIAEoAhAhCCABKAIEIQkgACkDiAIiEr8iCyAAKwOQAmIEQCAAQgA3A4gBIAAgEjcDkAIgAEIANwO4ASAAQgA3A6gBIAAgEjcDoAEgAEIANwPAASAAQgA3A/ABIABCADcD4AEgACASNwPYAQsDQAJ/IAAoAmwiASAAKAJoIgJLBEAgASACawwBCyAAKAJ8IAAoAmQgASACa2pxCwRAAn8gACgCbCIBIAAoAmgiA0sEQCABIANrDAELIAAoAnwgACgCZCABIANranELBEAgACgCcCADQQN0aiIBKQIAIRMgAUIANwIAIAAoAoQBIQEgACATNwOAAQJAIAFFDQAgASABKAIEIgJBAWs2AgQgAg0AIAEgASgCACgCCBEAACABECYLIAAgACgCfCADQQFqcTYCaAsgAEIANwOoASAAIBI3A6ABIABCADcDiAEgAEIANwPAASAAQgA3A7gBIABCADcD8AEgAEIANwPgASAAIBI3A9gBDAELCwJ/IABBQGsoAgAiASAAKAI8IgJLBEAgASACawwBCyAAKAJQIAAoAjggASACa2pxCwRAA0ACfyAAKAJAIgEgACgCPCICSwRAIAEgAmsMAQsgACgCUCAAKAI4IAEgAmtqcQsEQAJ/IAAoAkAiASAAKAI8IgNLBEAgASADawwBCyAAKAJQIAAoAjggASADa2pxC0UNASAAKAJEIANB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DQEgBCAEKAIEIgZBAWs2AgQgBg0BIAQgBCgCACgCCBEAACAEECYMAQsgBSAENgIEIAUgBzYCACACIAVBCGo2AjALIAJBIDYCOCACQgA3AjwgAkHEAGoiBEIANwIAIAJCgICAgPADNwJMIAQQOiACQgA3AlwgAkIANwJUIAJCADcDaCACQSA2AmQgAkHwAGoiBEIANwMAIAJCgICAgPADNwN4IAQQOiACQgA3A4gBIAJCADcDgAEgAkIANwKUASACQYquj+UDNgKQASACQgA3ApwBIAJCADcCpAEgAkIANwKsASACQgA3ArQBIAJCADcCvAEgAkIANwLMASACQoCAgICg4fXRPDcCxAEgAkIANwLUASACQgA3AtwBIAJCADcC5AEgAkIANwLsASACQgA3AvQBIAJCADcDkAIgAkIANwOIAiACQgA3A4ACIAJBmAJqEG4aIAJBADYC6AUgAkIANwPgBSACQoCAgICAgID4PzcD2AUgAkIANwPQBSADQRBqJAAgACABNgIEIAAgAjYCAAsLACABQYiTAjYCAAsRAEEIECMiAEGIkwI2AgAgAAsRACAAQQA2AogBIABBADYCaAu3CQQOfwN8An0BfiMAQRBrIgMkACAAQfgAaiENIABB2ABqIQdEAAAAAAAA8D9EAAAAAAAA8L8gACsDILYiE7tEexSuR+F6hD+ioxBKobYhFCABKAIQIQggASgCBCEFIAEoAgAhCSABKAIIKAIAIQoDQAJAAkACfyAAKAI0IgEgACgCMCICSwRAIAEgAmsMAQsgACgCRCAAKAIsIAEgAmtqcQsEQAJ/IAAoAjQiASAAKAIwIgJLBEAgASACawwBCyAAKAJEIAAoAiwgASACa2pxCwRAIAAoAjggAkEDdGoiASkCACEVIAFCADcCACAAKAJMIQEgACAVNwNIAkAgAUUNACABIAEoAgQiBEEBazYCBCAEDQAgASABKAIAKAIIEQAAIAEQJgsgACAAKAJEIAJBAWpxNgIwCyAAKAJIIQICQCAAKAJMIgEEQCABIAEoAgRBAmo2AgQgA0IANwMIIANCADcDACABIAEoAgQiBEEBazYCBCAERQRAIAEgASgCACgCCBEAACABECYLIAEgASgCBEEBajYCBAwBCyADQgA3AwggA0IANwMACyAAIAI2AlggACgCXCECIAAgATYCXAJAIAJF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OgAcIAJB8+LJowc2AhhBBCEEIAJBBDoAIyACQZjRADYCACACIAI2AhAgBigCBEE8aiIHIAJBGGoiAxApRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBAzoAIyACQQA6ABsgAkGcDi8AADsBGCACQZ4OLQAAOgAaIAJBtNUANgIAIAIgAjYCECAGKAIEQTxqIgQgAkEYaiIDEClFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBAzoAIyACQQA6ABsgAkH+DC8AADsBGCACQYANLQAAOgAaIAJBzNkANgIAIAIgAjYCECAGKAIEQTxqIgQgAkEYaiIDEClFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBADoAGiACQezKATsBGCACQQI6ACMgAkGU3gA2AgAgAiACNgIQIAYoAgRBPGoiBCACQRhqIgMQKUUEQCACQShqIAQgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAQQQhBCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEDOgAjIAJBADoAGyACQZQOLwAAOwEYIAJBlg4tAAA6ABogAkG44gA2AgAgAiACNgIQIAYoAgRBPGoiBCACQRhqIgMQKUUEQCACQShqIAQgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAQQQhBCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEAOgAaIAJB58oBOwEYIAJBAjoAIyACQfjmADYCACACIAI2AhAgBigCBEE8aiIEIAJBGGoiAxApRQRAIAJBKGogBCADIAMgAhArCwJAAkAgAiACKAIQIgNGBEBBBCEEIAIhAwwB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IAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEDOgAjIAJBADoAGyACQaIJLwAAOwEYIAJBpAktAAA6ABogAkGYmwE2AgAgAiACNgIQIAYoAgRBPGoiBCACQRhqIgMQKUUEQCACQShqIAQgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAQQQhBCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEAOgAcIAJB8t69owc2AhhBBCEEIAJBBDoAIyACQbCfATYCACACIAI2AhAgBigCBEE8aiIHIAJBGGoiAxApRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILQQQhBCACQQA6AB0gAkH3CS0AADoAHCACQQU6ACMgAkHzCSgAADYCGCACQeyiATYCACACIAI2AhAgBigCBEE8aiIHIAJBGGoiAxApRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILQQQhBCACQQA6AB4gAkHCDS8AADsBHCACQQY6ACMgAkG+DSgAADYCGCACQaymATYCACACIAI2AhAgBigCBEE8aiIHIAJBGGoiAxApRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBBzoAIyACQQA6AB8gAkG9DSgAADYCGCACQcANKAAANgAbIAJBhKoBNgIAIAIgAjYCECAGKAIEQTxqIgQgAkEYaiIDEClFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBADoAGiACQfPkATsBGCACQQI6ACMgAkHcrQE2AgAgAiACNgIQIAYoAgRBPGoiBCACQRhqIgMQKUUEQCACQShqIAQgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAQQQhBCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEDOgAjIAJBADoAGyACQZAOLwAAOwEYIAJBkg4tAAA6ABogAkG0sQE2AgAgAiACNgIQIAYoAgRBPGoiBCACQRhqIgMQKUUEQCACQShqIAQgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAQQQhBCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEAOgAcIAJB88rFkwM2AhhBBCEEIAJBBDoAIyACQfi1ATYCACACIAI2AhAgBigCBEE8aiIHIAJBGGoiAxApRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBBzoAIyACQQA6AB8gAkH/DSgAADYCGCACQYIOKAAANgAbIAJBtLkBNgIAIAIgAjYCECAGKAIEQTxqIgQgAkEYaiIDEClFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBADoAICACQvPghZO3rtm4MjcDGCACQQg6ACMgAkGMvgE2AgAgAiACNgIQIAYoAgRBPGoiBCACQRhqIgMQKUUEQCACQShqIAQgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAQQQhBCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEHOgAjIAJBADoAHyACQcsNKAAANgIYIAJBzg0oAAA2ABsgAkHowgE2AgAgAiACNgIQIAYoAgRBPGoiBCACQRhqIgMQKUUEQCACQShqIAQgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAQQQhBCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgtBBCEEIAJBADoAHSACQZAPLQAAOgAcIAJBBToAIyACQYwPKAAANgIYIAJBtMYBNgIAIAIgAjYCECAGKAIEQTxqIgcgAkEYaiIDEClFBEAgAkEoaiAHIAMgAyACECsLAkACQCACIAIoAhAiA0YEQCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgtBBCEEIAJBADoAHSACQZIQLQAAOgAcIAJBBToAIyACQY4QKAAANgIYIAJB9MkBNgIAIAIgAjYCECAGKAIEQTxqIgcgAkEYaiIDEClFBEAgAkEoaiAHIAMgAyACECsLAkACQCACIAIoAhAiA0YEQCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEHOgAjIAJBADoAHyACQfMTKAAANgIYIAJB9hMoAAA2ABsgAkG0zQE2AgAgAiACNgIQIAYoAgRBPGoiBCACQRhqIgMQKUUEQCACQShqIAQgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAQQQhBCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEAOgAcIAJB79yNqwY2AhhBBCEEIAJBBDoAIyACQezQATYCACACIAI2AhAgBigCBEE8aiIHIAJBGGoiAxApRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBADoAHCACQfLCuaMGNgIYQQQhBCACQQQ6ACMgAkGo1AE2AgAgAiACNgIQIAYoAgRBPGoiByACQRhqIgMQKUUEQCACQShqIAcgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAIAIhAwwBC0EFIQQgA0UNAQsgAyADKAIAIARBAnRqKAIAEQAACyACLAAjQQBIBEAgAigCGBAiC0EEIQQgAkEAOgAdIAJBoAktAAA6ABwgAkEFOgAjIAJBnAkoAAA2AhggAkGg2AE2AgAgAiACNgIQIAYoAgRBPGoiByACQRhqIgMQKUUEQCACQShqIAcgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAIAIhAwwBC0EFIQQgA0UNAQsgAyADKAIAIARBAnRqKAIAEQAACyACLAAjQQBIBEAgAigCGBAiC0EEIQQgAkEAOgAeIAJBnwkvAAA7ARwgAkEGOgAjIAJBmwkoAAA2AhggAkGI3AE2AgAgAiACNgIQIAYoAgRBPGoiByACQRhqIgMQKUUEQCACQShqIAcgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAIAIhAwwBC0EFIQQgA0UNAQsgAyADKAIAIARBAnRqKAIAEQAACyACLAAjQQBIBEAgAigCGBAiCyACQfoAOwEYIAJBAToAIyACQeTfATYCACACIAI2AhAgBigCBEE8aiIEIAJBGGoiAxApRQRAIAJBKGogBCADIAMgAhArCwJAAkAgAiACKAIQIgNGBEBBBCEEIAIhAwwBC0EFIQQgA0UNAQsgAyADKAIAIARBAnRqKAIAEQAACyACLAAjQQBIBEAgAigCGBAiCyACQQA6ABwgAkHw3rGrBjYCGEEEIQQgAkEEOgAjIAJB3OMBNgIAIAIgAjYCECAGKAIEQTxqIgcgAkEYaiIDEClFBEAgAkEoaiAHIAMgAyACECsLAkACQCACIAIoAhAiA0YEQCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEDOgAjIAJBADoAGyACQdwJLwAAOwEYIAJB3gktAAA6ABogAkGo5wE2AgAgAiACNgIQIAYoAgRBPGoiBCACQRhqIgMQKUUEQCACQShqIAQgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAQQQhBCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgtBBCEEIAJBADoAHiACQe4ULwAAOwEcIAJBBjoAIyACQeoUKAAANgIYIAJB+OoBNgIAIAIgAjYCECAGKAIEQTxqIgcgAkEYaiIDEClFBEAgAkEoaiAHIAMgAyACECsLAkACQCACIAIoAhAiA0YEQCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEHOgAjIAJBADoAHyACQaAOKAAANgIYIAJBow4oAAA2ABsgAkHY7gE2AgAgAiACNgIQIAYoAgRBPGoiBCACQRhqIgMQKUUEQCACQShqIAQgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAQQQhBCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEAOgAcIAJB7drFgQc2AhhBBCEEIAJBBDoAIyACQcDyATYCACACIAI2AhAgBigCBEE8aiIHIAJBGGoiAxApRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBAzoAIyACQQA6ABsgAkGYES8AADsBGCACQZoRLQAAOgAaIAJBjPYBNgIAIAIgAjYCECAGKAIEQTxqIgQgAkEYaiIDEClFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBADoAICACQvPsmZuHrZm25gA3AxggAkEIOgAjIAJBiPoBNgIAIAIgAjYCECAGKAIEQTxqIgQgAkEYaiIDEClFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILQQQhBCACQQA6AB0gAkGKDy0AADoAHCACQQU6ACMgAkGGDygAADYCGCACQZj+ATYCACACIAI2AhAgBigCBEE8aiIHIAJBGGoiAxApRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILQQQhBCACQQA6AB4gAkHwCS8AADsBHCACQQY6ACMgAkHsCSgAADYCGCACQcCHAjYCACACIAI2AhAgBigCBEE8aiIHIAJBGGoiAxApRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILQQQhBCACQQA6AB4gAkG4Ei8AADsBHCACQQY6ACMgAkG0EigAADYCGCACQcCOAjYCACACIAI2AhAgBigCBEE8aiIHIAJBGGoiAxApRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBADoAISACQZIOLQAAOgAgIAJBCToAIyACQYoOKQAANwMYIAJBiJMCNgIAIAIgAjYCECAGKAIEQTxqIgQgAkEYaiIDEClFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBghsvAAA7ASAgAkGAFDsBIiACQfoaKQAANwMYIAJB8JYCNgIAIAIgAjYCECAGKAIEQTxqIgQgAkEYaiIDEClFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILQQQhBCACQQA6AB0gAkHTEi0AADoAHCACQQU6ACMgAkHPEigAADYCGCACQdiaAjYCACACIAI2AhAgBigCBEE8aiIHIAJBGGoiAxApRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJB4BEvAAA7ASAgAkGAFDsBIiACQdgRKQAANwMYIAJBmJ4CNgIAIAIgAjYCECAGKAIEQTxqIgQgAkEYaiIDEClFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBADoAISACQbkSLQAAOgAgIAJBCToAIyACQbESKQAANwMYIAJB8KECNgIAIAIgAjYCECAGKAIEQTxqIgQgAkEYaiIDEClFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBEBAjIgM2AhggAkKMgICAgIKAgIB/NwIcIANBjw4oAAA2AAggA0GHDikAADcAACADQQA6AAwgAkHApQI2AgAgAiACNgIQIAYoAgRBPGoiBCACQRhqIgMQKUUEQCACQShqIAQgAyADIAIQKwsCQAJAIAIgAigCECIDRgRAQQQhBCACIQMMAQtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAiwAI0EASARAIAIoAhgQIgsgAkEQECMiAzYCGCACQo2AgICAgoCAgH83AhwgA0H8GikAADcABSADQfcaKQAANwAAIANBADoADSACQbypAjYCACACIAI2AhAgBigCBEE8aiIEIAJBGGoiAxApRQRAIAJBKGogBCADIAMgAhArCwJAAkAgAiACKAIQIgNGBEBBBCEEIAIhAwwBC0EFIQQgA0UNAQsgAyADKAIAIARBAnRqKAIAEQAACyACLAAjQQBIBEAgAigCGBAiCyACQQA6ACAgAkLtxrmhl8yYtuUANwMYIAJBCDoAIyACQbitAjYCACACIAI2AhAgBigCBEE8aiIEIAJBGGoiAxApRQRAIAJBKGogBCADIAMgAhArCwJAAkAgAiACKAIQIgNGBEBBBCEEIAIhAwwBC0EFIQQgA0UNAQsgAyADKAIAIARBAnRqKAIAEQAACyACLAAjQQBIBEAgAigCGBAiCyACQQc6ACMgAkEAOgAfIAJB1AkoAAA2AhggAkHXCSgAADYAGyACQZSxAjYCACACIAI2AhAgBigCBEE8aiIEIAJBGGoiAxApRQRAIAJBKGogBCADIAMgAhArCwJAAkAgAiACKAIQIgNGBEBBBCEEIAIhAwwBC0EFIQQgA0UNAQsgAyADKAIAIARBAnRqKAIAEQAACyACLAAjQQBIBEAgAigCGBAiCyACQesRLwAAOwEgIAJBgBQ7ASIgAkHjESkAADcDGCACQeC1AjYCACACIAI2AhAgBigCBEE8aiIEIAJBGGoiAxApRQRAIAJBKGogBCADIAMgAhArCwJAAkAgAiACKAIQIgNGBEBBBCEEIAIhAwwBC0EFIQQgA0UNAQsgAyADKAIAIARBAnRqKAIAEQAACyACLAAjQQBIBEAgAigCGBAiCyACQRAQIyIDNgIYIAJCjICAgICCgICAfzcCHCADQcMSKAAANgAIIANBuxIpAAA3AAAgA0EAOgAMIAJBrLoCNgIAIAIgAjYCECAGKAIEQTxqIgQgAkEYaiIDEClFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILQQQhBCACQQA6AB0gAkHXDS0AADoAHCACQQU6ACMgAkHTDSgAADYCGCACQfi+AjYCACACIAI2AhAgBigCBEE8aiIHIAJBGGoiAxApRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILQQQhBCACQQA6AB0gAkGVEi0AADoAHCACQQU6ACMgAkGREigAADYCGCACQbjCAjYCACACIAI2AhAgBigCBEE8aiIHIAJBGGoiAxApRQRAIAJBKGogByADIAMgAhArCwJAAkAgAiACKAIQIgNGBEAgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBADoAICACQvPchYO3jtq39AA3AxggAkEIOgAjIAJB+MUCNgIAIAIgAjYCECAGKAIEQTxqIgQgAkEYaiIDEClFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiA0YEQEEEIQQgAiEDDAELQQUhBCADRQ0BCyADIAMoAgAgBEECdGooAgARAAALIAIsACNBAEgEQCACKAIYECILIAJBBzoAIyACQQA6AB8gAkHbESgAADYCGCACQd4RKAAANgAbIAJByMkCNgIAIAIgAjYCECAGKAIEQTxqIgQgAkEYaiIDEClFBEAgAkEoaiAEIAMgAyACECsLAkACQCACIAIoAhAiBEYEQEEEIQMgAiEEDAELQQUhAyAERQ0BCyAEIAQoAgAgA0ECdGooAgARAAALIAIs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QQUgAi0AGEEERw0BGgJAIAIsAAtBAE4EQCADIAIoAgg2AhAgAyACKQIANwMIDAELIANBCGogAigCACACKAIEEDILQQAhBAJAAkACQAJAAkAgAygCDCADLQATIgUgBcAiBUEASCIGG0EEaw4GAgQEBAABBAsgAygCCCADQQhqIAYbKQAAQuze3ZuHrZm25gBRDQIMAwsgAygCCCADQQhqIAYbQZwRQQkQJw0CQQEhBAwBC0ECIQQgAygCCCADQQhqIAVBAEgbIgYoAABB4sqx4wZGDQAgBigAAEHwyoXbBkcNAQsgACAENgIsCyAFQQBODQAgAygCCBAiCyADQQhqIABBCGogASABIAIQMwJAIAMtAAwNACADKAIIIgRBGGohACACLQAYIQECQCAELQAwIgVB/wFGBEAgAUH/AUYNAgwBCyABQf8BRw0AIANBGzYCKCADQRw2AiQgA0EdNgIgIANBHjYCHCADQR82AhggA0EgNgIUIANBITYCECADQSI2AgwgA0EjNgIIIANBBGogACADQQhqIAVBAnRqKAIAEQEAIARB/wE6ADAMAQsgAyAANgIEIANBODYCKCADQTk2AiQgA0E6NgIgIANBOzYCHCADQTw2AhggA0E9NgIUIANBPjYCECADQT82AgwgA0HAADYCCCADQQRqIAAgAiADQQhqIAFBAnRqKAIAEQMAC0EACyEHIANBMGokACAHCw8AIABB5PsBNgIAIAAQIgsNACAAQeT7ATYCACAACwYAQYj+AQsUACAAQQRqQQAgASgCBEG8/QFGGwuBAQEBfCADKwMAIQUgBCgCACEDIAIoAgAhAkGAARAjIgFB5PsBNgIAIAFCADcCBCABQej8ATYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggAUE8akHEABAlGiAAIAE2AgQgACABQRBqNgIACwsAIAFBiPoBNgIACxEAQQgQIyIAQYj6ATYCACAAC/kDAgh8B38gASgCECEKIAEoAggoAgAhDQJAIAEoAgRBA08EQCAKRQ0BIAAoAiwhDiABKAIAIgEoAgghDyABKAIEIRAgASgCACEBA0AgACsDICECIAEgC0EDdCIMaisDACEEIAwgD2orAwAhBSAARAAAAAAAABBARAAAAAAAAPA/RAAAAAAAADRAIAwgEGorAwAiAyADRAAAAAAAADRAZBujIANEAAAAAAAA0D9jGyIGOQM4IABEpDpVKXpqT0AgAkQ51sVtNAAAQKMiAyAEIAMgBGMbROouRFT7IQlAoiAERAAAAAAAADRAYxsgAqMQaCICOQMwIABEAAAAAAAA8D8gAiAGIAKgokQAAAAAAADwP6CjIgM5A0AgACACIAOiIgc5A0ggACACIAeiIgQ5A1AgACAAKwNYIgggA6IgByAFIAArA2AiCaEiAqKgIgMgA6AgCKE5A1ggACACIASiIAkgCCAHoqCgIgIgAqAgCaE5A2ACQAJAAkACQAJAAkAgDg4FBQABAgMECyADIQIMBAsgBSAGIAOioSACoSECDAMLIAUgBiADoqEhAgwCCyAGRAAAAAAAAADAoiADoiAFoCECDAELRAAAAAAAAAAAIQILIAwgDWogAjkDACALQQFqIgsgCkcNAAsMAQsgCkUNACANIApBA3QQJRoLC4sFAQR/IwBBMGsiAyQAAn8CQCABKAIEIAEtAAsiBCAEwCIEQQBIG0EERw0AIAEoAgAgASAEQQBIGygAAEHt3pGrBkcNAEEFIAItABhBBEcNARoCQCACLAALQQBOBEAgAyACKAIINgIQIAMgAikCADcDCAwBCyADQQhqIAIoAgAgAigCBBAyCwJAIAACfwJAAkACQCADKAIMIAMtABMiBCAEwCIEQQBIIgUbQQVrDgQCBAABBAsgAygCCCADQQhqIAUbQbQMQQcQJ0UEQCAAQQA2AiwLIAMoAgggA0EIaiAEQQBIG0G8DEEHECcNA0EEDAILIAMoAgggA0EIaiAFGykAAELiwrmjhq7YufMAUQRAIABBATYCLAsgAygCCCADQQhqIARBAEgbKQAAQujSncOGrti58wBSDQJBAgwBCyADKAIIIANBCGogBRtBgBBBBRAnDQFBAws2AiwLIARBAE4NACADKAIIECILIANBCGogAEEIaiABIAEgAhAzAkAgAy0ADA0AIAMoAggiBEEYaiEAIAItABghAQJAIAQtADAiBUH/AUYEQCABQf8BRg0CDAELIAFB/wFHDQAgA0EbNgIoIANBHDYCJCADQR02AiAgA0EeNgIcIANBHzYCGCADQSA2AhQgA0EhNgIQIANBIjYCDCADQSM2AgggA0EEaiAAIANBCGogBUECdGooAgARAQAgBEH/AToAMAwBCyADIAA2AgQgA0E4NgIoIANBOTYCJCADQTo2AiAgA0E7NgIcIANBPDYCGCADQT02AhQgA0E+NgIQIANBPzYCDCADQcAANgIIIANBBGogACACIANBCGogAUECdGooAgARAwALQQALIQYgA0EwaiQAIAYLMAAgAiwAC0EATgRAIAEgAikDADcDACABIAIoAgg2AggPCyABIAIoAgAgAigCBBAyCw8AIABB5PcBNgIAIAAQIgsNACAAQeT3ATYCACAACwYAQfj5AQsUACAAQQRqQQAgASgCBEGw+QFGGwuuAQEBfCADKwMAIQUgBCgCACEDIAIoAgAhAkH4ABAjIgFB5PcBNgIAIAFCADcCBCABQeT4ATYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggAUIANwI8IAFCADcCRCABQgA3AkwgAUIANwJUIAFCADcCXCABQgA3AmQgAUIANwJsIAFBADYCdCAAIAE2AgQgACABQRBqNgIACwsAIAFBjPYBNgIACxEAQQgQIyIAQYz2ATYCACAAC4YCAgN8Bn8gASgCECEFIAEoAggoAgAhBgJAIAEoAgRBAU0EQCAFRQ0BIAYgBUEDdBAlGg8LIAVFDQAgACgCLCEIIAEoAgAiASgCBCEJIAEoAgAhCkEAIQEDQCAAIAkgAUEDdCIHaisDACIDIAArAzAiBKFEAAAAAAAAAABEHqfoSC7/7z8gByAKaisDACICIAJEHqfoSC7/7z9kGyACRAAAAAAAAAAAYxsiAiACRAAAAAAAAPA/oKOiIgIgBCACoCICoDkDMAJAAkACQAJAIAgOBQIDAAMBAwsgAyACoSECDAELIAIgAqAgA6EhAgsgBiAHaiACOQMACyABQQFqIgEgBUcNAAsLC8MEAQR/IwBBMGsiAyQAAn8CQCABKAIEIAEtAAsiBCAEwCIEQQBIG0EERw0AIAEoAgAgASAEQQBIGygAAEHt3pGrBkcNAEEFIAItABhBBEcNARoCQCACLAALQQBOBEAgAyACKAIINgIQIAMgAikCADcDCAwBCyADQQhqIAIoAgAgAigCBBAyCwJAIAACfwJAAkAgAygCDCADLQATIgQgBMAiBEEASCIFG0EHaw4CAAEDCyADKAIIIANBCGogBRtBtAxBBxAnRQRAIABB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fyABQQA2AgggAUIANwMAAkAgAigCBCIAIAIoAgAiA0cEQCAAIANrIgBBAEgNASABIAAQIyICNgIEIAEgAjYCACABIAAgAmoiBDYCCCACIAMgABAvGiABIAQ2AgQLDwsQLQALCwAgAUH46gE2AgALEQBBCBAjIgBB+OoBNgIAIAALnAECBX8CfCABKAIQIQIgASgCCCgCACEDAkAgASgCBEEDTwRAIAJFDQEgASgCACIFKAIIIQZBACEBA0AgACAFIAYgAUEDdCIEaisDAJkiByAAKwMwIghkRUECdGooAgAgBGorAwAgCCAHoaIgB6AiBzkDMCADIARqIAc5AwAgAUEBaiIBIAJHDQALDAELIAJFDQAgAyACQQN0ECUaCwsPACAAQfToATYCACAAECILDQAgAEH06AE2AgAgAAsGAEHo6gELFAAgAEEEakEAIAEoAgRBrOoBRhsLgAEBAXwgAysDACEFIAQoAgAhAyACKAIAIQJByAAQIyIBQfToATYCACABQgA3AgQgAUHo6QE2AhAgAUIANwMYIAEgAjYCFCABQgA3AyAgASADNgI4IAEgBTkDMCABQYCAgPwDNgIoIAFBQGtCADcDACAAIAE2AgQgACABQRBqNgIACwsAIAFBqOcBNgIACxEAQQgQIyIAQajnATYCACAAC0sAIAIoAhAiAEUEQCABQQA2AhAPCyAAIAJGBEAgASABNgIQIAIoAhAiACABIAAoAgAoAgwRAQAPCyABIAAgACgCACgCCBECADYCEAuFAgIHfwF8IAEoAhAhAiABKAIIKAIAIQQCQCABKAIEQQJPBEAgAkUNASABKAIAIgEoAgQhBSABKAIAIQZBACEBIAJBAUcEQCACQX5xIQgDQCAAIAYgAUEDdCIDaisDACAAKwMwoiADIAVqKwMAoCIJOQMwIAMgBGogCTkDACAAIAYgA0EIciIDaisDACAAKwMwoiADIAVqKwMAoCIJOQMwIAMgBGogCTkDACABQQJqIQEgB0ECaiIHIAhHDQALCyACQQFxRQ0BIAAgBiABQQN0IgFqKwMAIAArAzCiIAEgBWorAwCgIgk5AzAgASAEaiAJOQMADwsgAkUNACAEIAJBA3QQJRoLCw8AIABBqOUBNgIAIAAQIgsNACAAQajlATYCACAACwYAQZjnAQsUACAAQQRqQQAgASgCBEHc5gFGGwuAAQEBfCADKwMAIQUgBCgCACEDIAIoAgAhAkHIABAjIgFBqOUBNgIAIAFCADcCBCABQZzmATYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggAUFAa0IANwMAIAAgATYCBCAAIAFBEGo2AgALCwAgAUHc4wE2AgALEQBBCBAjIgBB3OMBNgIAIAALwgICCH8CfCABKAIQIQIgASgCCCgCACEDAkACQAJAIAEoAgQEQCACRQ0DIAJBA3EhBiAAKwMwIQogASgCACgCACEEIAJBBE8NAUEAIQEMAgsgAkUNAiADIAJBA3QQJRoPCyACQXxxIQlBACEBA0AgBCABQQN0IgJqKwMAIQsgAiADaiAKOQMAIAAgCzkDMCAEIAJBCHIiBWorAwAhCiADIAVqIAs5AwAgACAKOQMwIAQgAkEQciIFaisDACELIAMgBWogCjkDACAAIAs5AzAgBCACQRhyIgJqKwMAIQogAiADaiALOQMAIAAgCjkDMCABQQRqIQEgCEEEaiIIIAlHDQALCyAGRQ0AA0AgBCABQQN0IgJqKwMAIQsgAiADaiAKOQMAIAAgCzkDMCABQQFqIQEgCyEKIAdBAWoiByAGRw0ACwsLDwAgAEG84QE2AgAgABAiCw0AIABBvOEBNgIAIAALBgBBzOMBCxQAIABBBGpBACABKAIEQYjjAUYbC4ABAQF8IAMrAwAhBSAEKAIAIQMgAigCACECQcgAECMiAUG84QE2AgAgAUIANwIEIAFBvOIBNgIQIAFCADcDGCABIAI2AhQgAUIANwMgIAEgAzYCOCABIAU5AzAgAUGAgID8AzYCKCABQUBrQgA3AwAgACABNgIEIAAgAUEQajYCAAsLACABQeTfATYCAAsRAEEIECMiAEHk3wE2AgAgAAvFBgINfwF+IAEoAhAhBiABKAIEIQMgASgCACEEIAEoAggoAgAhCQNAAn8gACgCQCIBIAAoAjwiAksEQCABIAJrDAELIAAoAlAgACgCOCABIAJranELBEACfyAAKAJAIgEgACgCPCICSwRAIAEgAmsMAQsgACgCUCAAKAI4IAEgAmtqcQsEQCAAKAJEIAJBA3RqIgEpAgAhDyABQgA3AgAgACgCWCEBIAAgDzcCVAJAIAFFDQAgASABKAIEIgVBAWs2AgQgBQ0AIAEgASgCACgCCBEAACABECYLIAAgACgCUCACQQFqcTYCPAsgAEEANgJgDAELCwJAAkACQAJAIAMEQCAAKAJUIgENAQsgBg0BDAMLIAEoAgQiAiABKAIAIgFHDQEgBkUNAgsgCSAGQQN0ECUaDwsgBkUNACACIAFrQQN1IgxBAWshAyAAKAJcIQ0gBCgCACEHIAAoAlQoAgAhBEEAIQUgACgCYCICIQEgBkEETwRAIAZBfHEhDgNAIAQgAUEDdGogByAFQQN0aiIIKwMAOQMAIAQgAUEBaiADcSIBQQN0aiAIKwMIOQMAIAQgAUEBaiADcSIBQQN0aiAIKwMQOQMAIAQgAUEBaiADcSIBQQN0aiAIKwMYOQMAIAVBBGohBSABQQFqIANxIQEgC0EEaiILIA5HDQALCyAGQQNxIggEQANAIAQgAUEDdGogByAFQQN0aisDADkDACAFQQFqIQUgAUEBaiADcSEBIApBAWoiCiAIRw0ACwsgACABNgJgIAZBAEwNACAMIA1rIAJqIQFBACEFQQAhACAGQQRPBEAgBkH8////B3EhCEEAIQIDQCAJIABBA3RqIAQgACABaiADcUEDdGorAwA5AwAgCSAAQQFyIgdBA3RqIAQgASAHaiADcUEDdGorAwA5AwAgCSAAQQJyIgdBA3RqIAQgASAHaiADcUEDdGorAwA5AwAgCSAAQQNyIgdBA3RqIAQgASAHaiADcUEDdGorAwA5AwAgAEEEaiEAIAJBBGoiAiAIRw0ACwsgBkEDcSICRQ0AA0AgCSAAQQN0aiAEIAAgAWogA3FBA3RqKwMAOQMAIABBAWohACAFQQFqIgUgAkcNAAsLC4oIAwp/AXwBfiMAQTBrIgMkAAJ/AkAgASgCBCABLQALIgQgBMAiBEEASBtBBEcNACABKAIAIAEgBEEASBsoAABB89LpqwZHDQBBBSACLQAYQQNHDQEaIAAoAmQhBAJAIAQCfyACKwMAIg2ZRAAAAAAAAOBBYwRAIA2qDAELQYCAgIB4CyIJaiIGIAZBAWtxRQRAIAYhBAwBC0EBIQUDQCAFIgRBAXQhBSAEIAZIDQALCwJAAkAgACgCMCIHIAAoAiwiBkcEQEEBIAcgBmtBA3UiBSAFQQFNGyEKQQAhBQNAIAYgBUEDdGooAgQiCARAIAgoAgRFDQMLIAVBAWoiBSAKRw0ACwtBGBAjIgVCADcCDCAFQcC0ATYCACAFQgA3AgQgBUEANgIUIAMgBTYCECADIAVBDGoiBjYCDCAAKAI0IAdHBEAgByAFNgIEIAcgBjYCACAFIAUoAgRBAWo2AgQgACAHQQhqNgIwDAILIABBLGogA0EMahBEIAMoAgwhBgwBCyAGIAVBA3RqKAIAIQYgAyAINgIQIAMgBjYCDCAIIAgoAgRBAWo2AgQLAkAgBigCBCIHIAYoAgAiBWtBA3UiCCAESQRAIAYgBCAIaxBDIAMoAgwiBCgCACEFIAQoAgQhBwwBCyAEIAhPDQAgBiAFIARBA3RqIgc2AgQLIAUgB0cEQCAFQQEgByAFa0EDdSIEIARBAU0bQQN0ECUaCwJ/IAAoAjwiBCAAQUBrKAIAIgVLBEAgBCAFawwBCyAAKAI4IAQgBWtqCwRAIAAoAkQhCyADKQIMIQ4gA0IANwIMIAsgBUEDdGoiBigCBCEEIAYgDjcCAAJAIARFDQAgBCAEKAIEIgZBAWs2AgQgBg0AIAQgBCgCACgCCBEAACAEECYLIAAgACgCUCAFQQFqcTYCQAsgACAJNgJcIAMoAhAiBEUNACAEIAQoAgQiBUEBazYCBCAFDQAgBCAEKAIAKAIIEQAAIAQQJgsgA0EMaiAAQQhqIAEgASACEDMCQCADLQAQDQAgAygCDCIEQRhqIQAgAi0AGCEBAkAgBC0AMCIFQf8BRgRAIAFB/wFGDQIMAQsgAUH/AUcNACADQRs2AiwgA0EcNgIoIANBHTYCJCADQR42AiAgA0EfNgIcIANBIDYCGCADQSE2AhQgA0EiNgIQIANBIzYCDCADQQhqIAAgA0EMaiAFQQJ0aigCABEBACAEQf8BOgAwDAELIAMgADYCCCADQTg2AiwgA0E5NgIoIANBOjYCJCADQTs2AiAgA0E8NgIcIANBPTYCGCADQT42AhQgA0E/NgIQIANBwAA2AgwgA0EIaiAAIAIgA0EMaiABQQJ0aigCABEDAAtBAAshDCADQTBqJAAgDAsJACAAEMUBECILDwAgAEHY3QE2AgAgABAiCw0AIABB2N0BNgIAIAALBgBB1N8BCxQAIABBBGpBACABKAIEQZTfAUYbC9AHAgR/AXwgBCgCACEGIAMrAwAhCSACKAIAIQRB+AAQIyIBQdjdATYCACABQgA3AgQjAEHgAGsiAiQAIAFBEGoiA0IANwMIIAMgBDYCBCADIAY2AiggAyAJOQMgIANCADcCLCADQgA3AxAgA0GAgID8AzYCGCADQQA2AjQgA0HQ3gE2AgBBGBAjIgRCADcCDCAEQcC0ATYCACAEQgA3AgQgBEEANgIUIAIgBDYCQCACIARBDGo2AjwgA0EsaiIHIAJBPGoQMQJAIAIoAkAiBEUNACAEIAQoAgQiBUEBazYCBCAFDQAgBCAEKAIAKAIIEQAAIAQQJgtBGBAjIgRCADcCDCAEQcC0ATYCACAEQgA3AgQgBEEANgIUIAIgBDYCQCACIARBDGoiCDYCPAJAIAMoAjAiBSADKAI0TwRAIAcgAkE8ahAxIAIoAkAiBEUNASAEIAQoAgQiBUEBazYCBCAFDQEgBCAEKAIAKAIIEQAAIAQQJgwBCyAFIAQ2AgQgBSAINgIAIAMgBUEIajYCMAtBGBAjIgRCADcCDCAEQcC0ATYCACAEQgA3AgQgBEEANgIUIAIgBDYCQCACIARBDGoiCDYCPAJAIAMoAjAiBSADKAI0TwRAIAcgAkE8ahAxIAIoAkAiBEUNASAEIAQoAgQiBUEBazYCBCAFDQEgBCAEKAIAKAIIEQAAIAQQJgwBCyAFIAQ2AgQgBSAINgIAIAMgBUEIajYCMAtBGBAjIgRCADcCDCAEQcC0ATYCACAEQgA3AgQgBEEANgIUIAIgBDYCQCACIARBDGoiCDYCPAJAIAMoAjAiBSADKAI0TwRAIAcgAkE8ahAxIAIoAkAiBEUNASAEIAQoAgQiB0EBazYCBCAHDQEgBCAEKAIAKAIIEQAAIAQQJgwBCyAFIAQ2AgQgBSAINgIAIAMgBUEIajYCMAsgA0EgNgI4IANCADcCPCADQcQAaiIEQgA3AgAgA0KAgICA8AM3AkwgBBA6IANCADcCXCADQgA3AlQgAyAGNgJkIAJBADoAMCACQfPS6asGNgIsIAJBBDoANyACQQM6ACAgAiAGtzkDCCADIAJBLGogAkEIaiIEIAMoAgAoAggRBgAaIAItACAiBkH/AUcEQCACQRs2AlwgAkEcNgJYIAJBHTYCVCACQR42AlAgAkEfNgJMIAJBIDYCSCACQSE2AkQgAkEiNgJAIAJBIzYCPCACQTtqIAQgAkE8aiAGQQJ0aigCABEBAAsgAiwAN0EASARAIAIoAiwQIgsgAkHgAGokACAAIAE2AgQgACADNgIACwsAIAFBiNwBNgIACxEAQQgQIyIAQYjcATYCACAAC5EFAwN8CX8BfiABKAIQIQYgASgCBCEHIAEoAgAhCSABKAIIKAIAIQoDQAJ/IAAoAkAiASAAKAI8IgVLBEAgASAFawwBCyAAKAJQIAAoAjggASAFa2pxCwRAAn8gACgCQCIBIAAoAjwiBUsEQCABIAVrDAELIAAoAlAgACgCOCABIAVranELBEAgACgCRCAFQQN0aiIBKQIAIQ4gAUIANwIAIAAoAlghASAAIA43AlQCQCABRQ0AIAEgASgCBCIIQQFrNgIEIAgNACABIAEoAgAoAggRAAAgARAmCyAAIAAoAlAgBUEBanE2AjwLIABBADYCXAwBCwsCQCAHQQJNBEAgBkUNASAKIAZBA3QQJRoPCyAAKAJUIgEoAgQiBSABKAIAIgdHBEAgBkUNASAAKAJcIQEgBSAHa0EDdSIFtyEEIAkoAgAhDANAAkACQCAMIAtBA3QiCGorAwAiAkQAAAAAAAAAAGNFBEAgBCACIAIgBGQbIgJEAAAAAAAAsDxlRQ0BCyAJKAIIIAhqKwMAIgIhAwwBCyABIAVqtyACoSICIAKcoSAHAn8gAplEAAAAAAAA4EFjBEAgAqoMAQtBgICAgHgLIg1BAWogBW9BA3RqKwMAIAcgDSAFb0EDdGorAwAiAqGiIAKgIQMCfEQAAAAAAADwvyAJKAIEIAhqKwMAIgJEAAAAAAAA8L9jDQAaRAAAAAAAAPA/IAJEAAAAAAAA8D9kDQAaIAILIAOiIAkoAgggCGorAwCgIQILIAcgAUEDdGogAjkDACAIIApqIAM5AwAgAUEBaiIBIAVBACABIAVOG2shASALQQFqIgsgBkcNAAsgACABNgJcDAELIAZFDQAgCiAJKAIAIAZBA3QQNAsL0gcDCX8BfAF+IwBBMGsiBCQAAn8CQCABKAIEIAEtAAsiAyADwCIDQQBIG0EERw0AIAEoAgAgASADQQBIGygAAEHz0umrBkcNAEEFIAItABhBA0cNARogACgCMCIGIAAoAiwiBUYhAwJ/IAIrAwAiDJlEAAAAAAAA4EFjBEAgDKoMAQtBgICAgHgLIQgCQAJAIANFBEBBASAGIAVrQQN1IgMgA0EBTRshCUEAIQMDQCAFIANBA3RqKAIEIgcEQCAHKAIERQ0DCyADQQFqIgMgCUcNAAsLQRgQIyIDQgA3AgwgA0HAtAE2AgAgA0IANwIEIANBADYCFCAEIAM2AhAgBCADQQxqIgU2AgwgACgCNCAGRwRAIAYgAzYCBCAGIAU2AgAgAyADKAIEQQFqNgIEIAAgBkEIajYCMAwCCyAAQSxqIARBDGoQRCAEKAIMIQUMAQsgBSADQQN0aigCACEFIAQgBzYCECAEIAU2AgwgByAHKAIEQQFqNgIECwJAIAUoAgQiBiAFKAIAIgNrQQN1IgcgCEkEQCAFIAggB2sQQyAEKAIMIgUoAgAhAyAFKAIEIQYMAQsgByAITQ0AIAUgAyAIQQN0aiIGNgIECyADIAZHBEAgA0EBIAYgA2tBA3UiAyADQQFNG0EDdBAlGgsCfyAAKAI8IgMgAEFAaygCACIFSwRAIAMgBWsMAQsgACgCOCADIAVragsEQCAAKAJEIQogBCkCDCENIARCADcCDCAKIAVBA3RqIgYoAgQhAyAGIA03AgACQCADRQ0AIAMgAygCBCIGQQFrNgIEIAYNACADIAMoAgAoAggRAAAgAxAmCyAAIAAoAlAgBUEBanE2AkALIAQoAhAiA0UNACADIAMoAgQiBUEBazYCBCAFDQAgAyADKAIAKAIIEQAAIAMQJgsgBEEMaiAAQQhqIAEgASACEDMCQCAELQAQDQAgBCgCDCIDQRhqIQAgAi0AGCEBAkAgAy0AMCIFQf8BRgRAIAFB/wFGDQIMAQsgAUH/AUcNACAEQRs2AiwgBEEcNgIoIARBHTYCJCAEQR42AiAgBEEfNgIcIARBIDYCGCAEQSE2AhQgBEEiNgIQIARBIzYCDCAEQQhqIAAgBEEMaiAFQQJ0aigCABEBACADQf8BOgAwDAELIAQgADYCCCAEQTg2AiwgBEE5NgIoIARBOjYCJCAEQTs2AiAgBEE8NgIcIARBPTYCGCAEQT42AhQgBEE/NgIQIARBwAA2AgwgBEEIaiAAIAIgBEEMaiABQQJ0aigCABEDAAtBAAshCyAEQTBqJAAgCwsJACAAEMcBECILUgEBf0E4ECMhAiAAKAIAIQAgASgCACEBIAJBADYCGCACQgA3AxAgAkIANwMIIAJCADcDACACQgA3AyAgAkIANwMoIAIgATYCNCACIAA2AjAgAgsPACAAQfTZATYCACAAECILDQAgAEH02QE2AgAgAAsGAEH42wELFAAgAEEEakEAIAEoAgRBuNsBRhsLyQcCBH8BfCAEKAIAIQggAysDACEJIAIoAgAhBEHwABAjIgFB9NkBNgIAIAFCADcCBCMAQeAAayICJAAgAUEQaiIDQgA3AwggAyAENgIEIAMgCDYCKCADIAk5AyAgA0IANwIsIANCADcDECADQYCAgPwDNgIYIANBADYCNCADQfDaATYCAEEYECMiBEIANwIMIARBwLQBNgIAIARCADcCBCAEQQA2AhQgAiAENgJAIAIgBEEMajYCPCADQSxqIgYgAkE8ahAxAkAgAigCQCIERQ0AIAQgBCgCBCIFQQFrNgIEIAUNACAEIAQoAgAoAggRAAAgBBAmC0EYECMiBEIANwIMIARBwLQBNgIAIARCADcCBCAEQQA2AhQgAiAENgJAIAIgBEEMaiIHNgI8AkAgAygCMCIFIAMoAjRPBEAgBiACQTxqEDEgAigCQCIERQ0BIAQgBCgCBCIFQQFrNgIEIAUNASAEIAQoAgAoAggRAAAgBBAmDAELIAUgBDYCBCAFIAc2AgAgAyAFQQhqNgIwC0EYECMiBEIANwIMIARBwLQBNgIAIARCADcCBCAEQQA2AhQgAiAENgJAIAIgBEEMaiIHNgI8AkAgAygCMCIFIAMoAjRPBEAgBiACQTxqEDEgAigCQCIERQ0BIAQgBCgCBCIFQQFrNgIEIAUNASAEIAQoAgAoAggRAAAgBBAmDAELIAUgBDYCBCAFIAc2AgAgAyAFQQhqNgIwC0EYECMiBEIANwIMIARBwLQBNgIAIARCADcCBCAEQQA2AhQgAiAENgJAIAIgBEEMaiIHNgI8AkAgAygCMCIFIAMoAjRPBEAgBiACQTxqEDEgAigCQCIERQ0BIAQgBCgCBCIGQQFrNgIEIAYNASAEIAQoAgAoAggRAAAgBBAmDAELIAUgBDYCBCAFIAc2AgAgAyAFQQhqNgIwCyADQSA2AjggA0IANwI8IANBxABqIgRCADcCACADQoCAgIDwAzcCTCAEEDogA0EANgJcIANCADcCVCACQQA6ADAgAkHz0umrBjYCLCACQQQ6ADcgAkEDOgAgIAIgCLc5AwggAyACQSxqIAJBCGoiBCADKAIAKAIIEQYAGiACLQAgIgZB/wFHBEAgAkEbNgJcIAJBHDYCWCACQR02AlQgAkEeNgJQIAJBHzYCTCACQSA2AkggAkEhNgJEIAJBIjYCQCACQSM2AjwgAkE7aiAEIAJBPGogBkECdGooAgARAQALIAIsADdBAEgEQCACKAIsECILIAJB4ABqJAAgACABNgIEIAAgAzYCAAsLACABQaDYATYCAAsRAEEIECMiAEGg2AE2AgAgAAvrAQEHfyABKAIQIgMEQCABKAIIKAIAIQQgA0EBcSEIIAAoAiwhAgJAIANBAUYEQEEAIQEMAQsgA0F+cSEGQQAhAUEAIQMDQCAEIAFBA3RqIgcgAkH9hw1sQcO9mgFqIgJBEHZB//8BcbdEAAAAAMD/30CjOQMAIAcgAkH9hw1sQcO9mgFqIgJBEHZB//8BcbdEAAAAAMD/30CjOQMIIAFBAmohASADQQJqIgMgBkcNAAsLIAgEQCAEIAFBA3RqIAJB/YcNbEHDvZoBaiICQRB2Qf//AXG3RAAAAADA/99AozkDAAsgACACNgIsCwumAwIEfwF8IwBBMGsiAyQAAn8CQCABKAIEIAEtAAsiBCAEwCIEQQBIG0EERw0AIAEoAgAgASAEQQBIGygAAEHzypWjBkcNAEEFIAItABhBA0cNARogAAJ/IAIrAwAiB0QAAAAAAADwQWMgB0QAAAAAAAAAAGZxBEAgB6sMAQtBAAs2AiwLIANBDGogAEEIaiABIAEgAhAzAkAgAy0AEA0AIAMoAgwiBEEYaiEAIAItABghAQJAIAQtADAiBUH/AUYEQCABQf8BRg0CDAELIAFB/wFHDQAgA0EbNgIsIANBHDYCKCADQR02AiQgA0EeNgIgIANBHzYCHCADQSA2AhggA0EhNgIUIANBIjYCECADQSM2AgwgA0EIaiAAIANBDGogBUECdGooAgARAQAgBEH/AToAMAwBCyADIAA2AgggA0E4NgIsIANBOTYCKCADQTo2AiQgA0E7NgIgIANBPDYCHCADQT02AhggA0E+NgIUIANBPzYCECADQcAANgIMIANBCGogACACIANBDGogAUECdGooAgARAwALQQALIQYgA0EwaiQAIAYLDwAgAEGA1gE2AgAgABAiCw0AIABBgNYBNgIAIAALBgBBkNgBCxQAIABBBGpBACABKAIEQczXAUYbC6EBAgF8AX4gAysDACEFIAQoAgAhAyACKAIAIQJBwAAQIyIBQYDWATYCACABQgA3AgQgAUGA1wE2AhAgAUIANwMYIAEgAjYCFCABQgA3AyAgASADNgI4IAEgBTkDMCABQYCAgPwDNgIoQfCIBEHwiAQpAwBCrf7V5NSF/ajYAH5CAXwiBjcDACABIAZCIYg+AjwgACABNgIEIAAgAUEQajYCAAsLACABQajUATYCAAsRAEEIECMiAEGo1AE2AgAgAAvLAwICfAV/IAEoAhAhBCABKAIIKAIAIQcCQCABKAIERQRAIARFDQEgByAEQQN0ECUaDwsgBEUNACABKAIAIggoAgAhBUEAIQEgACkDMEL///////////8Ag1AEQANAIAArA0AhAyAAIAUgAUEDdCIGaiIIKwMAIgI5A0ACfEQAAAAAAADwP0QAAAAAAADwv0QAAAAAAAAAACACIAOhIgNEAAAAAAAAAABjGyADRAAAAAAAAAAAZBtEAAAAAAAA4L9jRQRAIAArAzgMAQsgAEIANwM4IAgrAwAhAkQAAAAAAAAAAAshAyAGIAdqIAIgA6I5AwAgAUEBaiIBIARHDQAMAgsACwNAIAArA0AhAiAAIAUgAUEDdCIGaisDACIDOQNARAAAAAAAAPA/RAAAAAAAAPC/RAAAAAAAAAAAIAMgAqEiAkQAAAAAAAAAAGMbIAJEAAAAAAAAAABkIgUbIQIgBQRAIABCADcDMCAAQoCAgICAgID4PzcDOAsCfCACRAAAAAAAAOC/Y0UEQCAAKwM4DAELIABCADcDOEQAAAAAAAAAAAshAiAGIAdqIAgoAgAiBSAGaisDACACojkDACABQQFqIgEgBEcNAAsLC7ADAQR/IwBBMGsiAyQAAn8CQAJAAkACQCABKAIEIAEtAAsiBCAEwCIEQQBIG0EDRw0AIAEoAgAgASAEQQBIG0GSD0EDECcNAEEFIAItABhBAkciBA0EGiAAKQMwQv///////////wCDQgBSDQAgBA0BIABEAAAAAAAA8D9EAAAAAAAAAAAgAi0AABs5AzALIANBDGogAEEIaiABIAEgAhAzIAMtABANAiADKAIMIgRBGGohACACLQAYIQEgBC0AMCIFQf8BRgRAIAFB/wFGDQMMAgsgAUH/AUcNASADQRs2AiwgA0EcNgIoIANBHTYCJCADQR42AiAgA0EfNgIcIANBIDYCGCADQSE2AhQgA0EiNgIQIANBIzYCDCADQQhqIAAgA0EMaiAFQQJ0aigCABEBACAEQf8BOgAwDAILEDsACyADIAA2AgggA0E4NgIsIANBOTYCKCADQTo2AiQgA0E7NgIgIANBPDYCHCADQT02AhggA0E+NgIUIANBPzYCECADQcAANgIMIANBCGogACACIANBDGogAUECdGooAgARAwALQQALIQYgA0EwaiQAIAYLDwAgAEG00gE2AgAgABAiCyQAIAEgAikDADcDACABIAIoAgg2AgggAkIANwMAIAJBADYCCAsNACAAQbTSATYCACAACwYAQZjUAQsUACAAQQRqQQAgASgCBEHg0wFGGwuOAQEBfCADKwMAIQUgBCgCACEDIAIoAgAhAkHYABAjIgFBtNIBNgIAIAFCADcCBCABQaTTATYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggAUFAa0IANwMAIAFCADcDSCABQgA3A1AgACABNgIEIAAgAUEQajYCAAsLACABQezQATYCAAsRAEEIECMiAEHs0AE2AgAgAAuBAgIHfwN8IAEoAhAhAiABKAIIKAIAIQQCQCABKAIEQQFNBEAgAkUNASAEIAJBA3QQJRoPCyACRQ0AIAAoAjghBiAAKAI8IQMgASgCACIBKAIEIQcgASgCACEIQQAhAQNAIAggAUEDdCIFaisDACEJIAArAzAhCiAAIAUgB2orAwAiCzkDMAJAAn8CQCALIAqhRAAAAAAAAAAAZEUEQCAAIANBAWoiAzYCPCADIAZJDQELIABBADYCPCAAIAk5A0BBAAwBCyAJIAArA0AiCmRFDQEgACAJOQNAIABBADYCPEEACyEDIAkhCgsgBCAFaiAKOQMAIAFBAWoiASACRw0ACwsLtgMCBH8BfCMAQTBrIgMkAAJ/AkAgASgCBCABLQALIgQgBMAiBEEASBtBBEcNACABKAIAIAEgBEEASBsoAABB6N6xowZHDQBBBSACLQAYQQNHDQEaIAACfyAAKwMgRPyp8dJNYlA/oiACKwMAoiIHRAAAAAAAAPBBYyAHRAAAAAAAAAAAZnEEQCAHqwwBC0EACzYCOAsgA0EMaiAAQQhqIAEgASACEDMCQCADLQAQDQAgAygCDCIEQRhqIQAgAi0AGCEBAkAgBC0AMCIFQf8BRgRAIAFB/wFGDQIM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CyAAKAKMAWohBSAALQCIASEJIAArA6ABIRYgACgCmAEhByABKAIQIQwgASgCBCEKIAEoAgAhDSABKAIIKAIAIQ4CQCAAKAJwIgJBAEgNACAAKAJ0IgFBAEgNACABIAVKDQAgASACayIDQQBMDQAgAAJ/IAAtAIABBEAgAEEAOgCAASAAIAApA3giGjcDcCAaQiCIpyIDIBqnIgJxQX9GDQIgBSABayADIAJrbyACagwBCyAFIAFrIANvIAJqCyIFIAtrNgKMAQsCQAJ/IABBQGsoAgAiASAAKAI8IgJLBEAgASACawwBCyAAKAJQIAAoAjggASACa2pxC0UNAANAAkACfwJAAn8gACgCQCIBIAAoAjwiAksEQCABIAJrDAELIAAoAlAgACgCOCABIAJranELBEAgBEEAOgAMAn8gACgCQCIBIAAoAjwiAksEQCABIAJrDAELIAAoAlAgACgCOCABIAJranELIRIgBC0ADCEBIBJFDQMgACgCRCACQQxsaiIGLQAIIQMgAUH/AUYEQEH/ASADQf8BRg0DGgwCCyADQf8BRw0BIARBxAA2AhwgBEHFADYCGCAEQcYANgIUIARBEGogBEEEaiAEQRRqIAFBAnRqKAIAEQEAIARB/wE6AAxB/wEMAgsgACgCVCIGQQRqIgMhAiAGKAIEIgEEQANAIAEgAiABKAIQIAVKIggbIQIgASABQQRqIAgbKAIAIgENAAsLAkAgBigCACACRgRAIAMgAiACKAIQGyEBDAELIAIoAgAiAwRAA0AgAyIBKAIEIgMNAAwCCwALA0AgAigCCCIBKAIAIAJGIRMgASECIBMNAAsLIAAgATYClAEMBAsgBCAEQQRqIgE2AhAgBEHHADYCHCAEQcgANgIYIARByQA2AhQgBEEQaiABIAYgBEEUaiADQQJ0aigCABEDACAELQAMCyEBIAAgACgCUCACQQFqcTYCPAsgBCAANgIAIAFB/wFxIgFB/wFHBEAgBCAENgIQIARBygA2AhwgBEHLADYCGCAEQcwANgIUIARBEGoiAiAEQQRqIgMgBEEUaiABQQJ0aigCABEBACAELQAMIgFB/wFGDQEgBEHEADYCHCAEQcUANgIYIARBxgA2AhQgAiADIARBFGogAUECdGooAgARAQAMAQsLEDsACwJAIAAtAIABRQRAQQAhCAwBCyAAKAJw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ATYCECABQgA3AxggASACNgIUIAFCADcDICABIAQ2AjggASAFOQMwIAFBgICA/AM2AiggAUKAgICAgICA+D83A0ggAUFAa0IANwMAIAFBfzYCaCABIAaaOQNgIAEgASkDWDcDUCAAIAE2AgQgACABQRBqNgIACwsAIAFBsJ8BNgIACxEAQQgQIyIAQbCfATYCACAAC9sDAgp/AnwgASgCECEAIAEoAggoAgAhAwJAIAEoAgQiBQRAIABFDQEgASgCACILKAIAIQRBACEBIABBBE8EQCAAQXxxIQkDQCADIAFBA3QiAmogAiAEaisDADkDACADIAJBCHIiCGogBCAIaisDADkDACADIAJBEHIiCGogBCAIaisDADkDACADIAJBGHIiAmogAiAEaisDADkDACABQQRqIQEgB0EEaiIHIAlHDQALCyAAQQNxIgIEQANAIAMgAUEDdCIHaiAEIAdqKwMAOQMAIAFBAWohASAGQQFqIgYgAkcNAAsLIAVBAUYNASAARQ0BQQIgBSAFQQJNGyEHIABBfnEhCSAAQQFxIQhBASEEA0AgCyAEQQJ0aigCACECQQAhAUEAIQYgAEEBRwRAA0AgAyABQQN0IgVqIgogAiAFaisDACIMIAorAwAiDSAMIA1kGzkDACADIAVBCHIiBWoiCiACIAVqKwMAIgwgCisDACINIAwgDWQbOQMAIAFBAmohASAGQQJqIgYgCUcNAAsLIAgEQCADIAFBA3QiAWoiBiABIAJqKwMAIgwgBisDACINIAwgDWQbOQMACyAEQQFqIgQgB0cNAAsMAQsgAEUNACADIABBA3QQJRoLCw8AIABB+JwBNgIAIAAQIgsNACAAQficATYCACAACwYAQaCfAQsUACAAQQRqQQAgASgCBEHUngFGGwt2AQF8IAMrAwAhBSAEKAIAIQMgAigCACECQcAAECMiAUH4nAE2AgAgAUIANwIEIAFBgJ4BNgIQIAFCADcDGCABIAI2AhQgAUIANwMgIAEgAzYCOCABIAU5AzAgAUGAgID8AzYCKCAAIAE2AgQgACABQRBqNgIACwsAIAFBmJsBNgIACxEAQQgQIyIAQZibATYCACAAC9sDAgp/AnwgASgCECEAIAEoAggoAgAhAwJAIAEoAgQiBQRAIABFDQEgASgCACILKAIAIQRBACEBIABBBE8EQCAAQXxx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ABAiCw0AIABByIsBNgIAIAALBgBBkI4BCxQAIABBBGpBACABKAIEQbiNAUYbC3YBAXwgAysDACEFIAQoAgAhAyACKAIAIQJBwAAQIyIBQciLATYCACABQgA3AgQgAUHYjAE2AhAgAUIANwMYIAEgAjYCFCABQgA3AyAgASADNgI4IAEgBTkDMCABQYCAgPwDNgIoIAAgATYCBCAAIAFBEGo2AgALCwAgAUHgiQE2AgALEQBBCBAjIgBB4IkBNgIAIAALlwQBDH8gASgCECECIAEoAggoAgAhAAJAIAEoAgQiBwRAIAJFDQEgASgCACIMKAIAIQNBACEBIAJBBE8EQCACQXxxIQoDQCAAIAFBA3QiBGogAyAEaisDADkDACAAIARBCHIiCWogAyAJaisDADkDACAAIARBEHIiCWogAyAJaisDADkDACAAIARBGHIiBGogAyAEaisDADkDACABQQRqIQEgBUEEaiIFIApHDQALCyACQQNxIgUEQANAIAAgAUEDdCIEaiADIARqKwMAOQMAIAFBAWohASAIQQFqIgggBUcNAAsLIAdBAUYNASACRQ0BQQIgByAHQQJNGyEKIAJBfHEhCSACQQNxIQcgAkEESSENQQEhBANAIAwgBEECdGooAgAhAkEAIQhBACEBQQAhBSANRQRAA0AgACABQQN0IgNqIgYgBisDACACIANqKwMAoTkDACAAIANBCHIiBmoiCyALKwMAIAIgBmorAwChOQMAIAAgA0EQciIGaiILIAsrAwAgAiAGaisDAKE5AwAgACADQRhyIgNqIgYgBisDACACIANqKwMAoTkDACABQQRqIQEgBUEEaiIFIAlHDQALCyAHBEADQCAAIAFBA3QiA2oiBSAFKwMAIAIgA2orAwChOQMAIAFBAWohASAIQQFqIgggB0cNAAsLIARBAWoiBCAKRw0ACwwBCyACRQ0AIAAgAkEDdBAlGgsLDwAgAEGchwE2AgAgABAiCw0AIABBnIcBNgIAIAALBgBB0IkBCxQAIABBBGpBACABKAIEQfyIAUYbC3YBAXwgAysDACEFIAQoAgAhAyACKAIAIQJBwAAQIyIBQZyHATYCACABQgA3AgQgAUGkiAE2AhAgAUIANwMYIAEgAjYCFCABQgA3AyAgASADNgI4IAEgBTkDMCABQYCAgPwDNgIoIAAgATYCBCAA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AwEIfyABKAIQIQAgASgCCCgCACEDAkAgASgCBEECTwRAIABFDQEgASgCACIGKAIAIQRBACEBIABBBE8EQCAAQXxxIQkDQCADIAFBA3QiAmogAiAEaisDADkDACADIAJBCHIiCGogBCAIaisDADkDACADIAJBEHIiCGogBCAIaisDADkDACADIAJBGHIiAmogAiAEaisDADkDACABQQRqIQEgBUEEaiIFIAlHDQALCyAAQQNxIgIEQANAIAMgAUEDdCIFaiAEIAVqKwMAOQMAIAFBAWohASAHQQFqIgcgAkcNAAsLIAYoAgQhBEEAIQEgAEEBRwRAIABBfnEhBUEAIQcDQCADIAFBA3QiAmoiBkQAAAAAAADwP0QAAAAAAAAAACAGKwMAIAIgBGorAwBjGzkDACADIAJBCHIiAmoiBkQAAAAAAADwP0QAAAAAAAAAACAGKwMAIAIgBGorAwBjGzkDACABQQJqIQEgB0ECaiIHIAVHDQALCyAAQQFxRQ0BIAMgAUEDdCIAaiIBRAAAAAAAAPA/RAAAAAAAAAAAIAErAwAgACAEaisDAGMbOQMADwsgAEUNACADIABBA3QQJRoLCzcBAX8gASAAKAIEIgNBAXVqIQEgACgCACEAIAEgAiADQQFxBH8gASgCACAAaigCAAUgAAsRAQALDwAgAEH03wA2AgAgABAiCw0AIABB9N8ANgIAIAALBgBBqOIACxQAIABBBGpBACABKAIEQdThAEYbC3YBAXwgAysDACEFIAQoAgAhAyACKAIAIQJBwAAQIyIBQfTfADYCACABQgA3AgQgAUH84AA2AhAgAUIANwMYIAEgAjYCFCABQgA3AyAgASADNgI4IAEgBTkDMCABQYCAgPwDNgIoIAAgATYCBCAAIAFBEGo2AgALCwAgAUGU3gA2AgALEQBBCBAjIgBBlN4ANgIAIAAL9wEBB38gASgCECEAIAEoAggoAgAhAwJAIAEoAgQEQCAARQ0BIAEoAgAoAgAhBEEAIQEgAEEETwRAIABBfHEhCANAIAMgAUEDdCICaiACIARqKwMAmTkDACADIAJBCHIiBWogBCAFaisDAJk5AwAgAyACQRByIgVqIAQgBWorAwCZOQMAIAMgAkEYciICaiACIARqKwMAmTkDACABQQRqIQEgB0EEaiIHIAhHDQALCyAAQQNxIgBFDQEDQCADIAFBA3QiAmogAiAEaisDAJk5AwAgAUEBaiEBIAZBAWoiBiAARw0ACwwBCyAARQ0AIAMgAEEDdBAlGgsLDwAgAEG42wA2AgAgABAiCw0AIABBuNsANgIAIAAL8g0CEH8BfgJAIAAoAjQiBCAAKAIwIgNNDQAgACgCCCAAKAIEIgZrQQxtIQcgBCADIgJrQQFxBEACQCADIAdPDQAgBiADQQxsaiICKAIEIAIoAgAiAmsiBUEATA0AIAIgBRAlGgsgA0EBaiECCyADQQFqIARGDQADQAJAIAIgB08NACAGIAJBDGxqIgUoAgQgBSgCACIFayIIQQBMDQAgBSAIECUaCwJAIAJBAWoiBSAHTw0AIAYgBUEMbGoiBSgCBCAFKAIAIgVrIghBAEwNACAFIAgQJRoLIAJBAmoiAiAERw0ACwsgACgCECICIQogAiADIgZBAnRqIQcCQAJ/IAAoAgAiBSgCKCIDIAUoAiQiAksEQCADIAJrDAELIAUoAjggBSgCICADIAJranELRQ0AQQAhAgNAIAIhAwJAA0ACfyAFKAIoIgIgBSgCJCIISwRAIAIgCGsMAQsgBSgCOCAFKAIgIAIgCGtqcQtFDQECfyAFKAIoIgIgBSgCJCIISwRAIAIgCGsMAQsgBSgCOCAFKAIgIAIgCGtqcQtFDQALIAUoAiwgCEEDdGoiCSgCBCECIAlBADYCBCAJKAIAIQsgCUEANgIAAkAgA0UNACADIAMoAgQiCUEBazYCBCAJDQAgAyADKAIAKAIIEQAAIAMQJgsgBSAFKAI4IAhBAWpxNgIkDAELCyADBEAgAyADKAIEQQFqNgIECyAFIAs2AhggBSgCHCECIAUgAzYCHAJAIAJFDQAgAiACKAIEIghBAWs2AgQgCA0AIAIgAigCACgCCBEAACACECYLIANFDQAgAyADKAIEIgJBAWs2AgQgAg0AIAMgAygCACgCCBEAACADECYLIAUoAhgiAwRAQQAhCCMAQSBrIgUkACAFIABBIGo2AhQgBSABNgIQIAUgBCICNgIMIAUgByIENgIIIAUgBjYCBCAFIAo2AgACQCACRQ0AIAFFDQAgAUEDdCEJQQAhB0EAIQYgAkEBa0EDTwRAIAJBfHEhCwNAIAQgBkECdGoiCigCACAJECUaIAooAgQgCRAlGiAKKAIIIAkQJRogCigCDCAJECUaIAZBBGohBiAIQQRqIgggC0cNAAsLIAJBA3EiAkUNAANAIAQgBkECdGooAgAgCRAlGiAGQQFqIQYgB0EBaiIHIAJHDQALCwJAIAMoAhQiBiADKAIYIg9GDQADQEEAIQgjAEEQayIJJAACQAJAAkACQCAGKAIAIgQrAzhEAAAAAAAA4D9kBH9BAAUgBCsDOCAEKwMwoZlEje21oPfGsD5lCw0AIAQoAlgiAiAFKAIMTw0AIAYoAiQiBCAGKAIoRwRAQQAhBwNAIAQgB0EYbGooAhAiBEUNBCAEIAUgBCgCACgCGBEBACAHQQFqIgcgBigCKCAGKAIkIgRrQRhtSQ0ACwsgBigCICERIAYoAgAoAgQhByAJQQA2AgwgCSAHNgIIIBEgCUEIahBrIgRFDQEgBSgCECILRQ0AIAQoAhAhBCAFKAIIIAJBAnRqKAIAIQJBACEOQQAhByALQQRPBEAgC0F8cSEQA0AgAiAHQQN0IgpqIgwgBCAKaisDACAMKwMAoDkDACACIApBCHIiDGoiDSAEIAxqKwMAIA0rAwCgOQMAIAIgCkEQciIMaiINIAQgDGorAwAgDSsDAKA5AwAgAiAKQRhyIgpqIgwgBCAKaisDACAMKwMAoDkDACAHQQRqIQcgCEEEaiIIIBBHDQALCyALQQNxIghFDQADQCACIAdBA3QiCmoiCyAEIApqKwMAIAsrAwCgOQMAIAdBAWohByAOQQFqIg4gCEcNAAsLIAlBEGokAAwCC0GjExA3AAsQRQALIAZBMGoiBiAPRw0ACyADKAIUIgYgAygCGCIIRg0AIAFBAnQhCQNAAkAgBigCACsDOEQAAAAAAADgP2RFDQAgBigCFCIHIAYoAhgiCkYNAANAIAcoAgAhAwNAAn8gAygCQCIEIAMoAjwiAksEQCAEIAJrDAELIAMoAlAgAygCOCAEIAJranELBEACfyADKAJAIgQgAygCPCICSwRAIAQgAmsMAQsgAygCUCADKAI4IAQgAmtqcQtFDQEgAygCRCACQQN0aiIEKQIAIRIgBEIANwIAIAMoAlghBCADIBI3AlQCQCAERQ0AIAQgBCgCBCILQQFrNgIEIAsNACAEIAQoAgAoAggRAAAgBBAmCyADIAMoAlAgAkEBanE2AjwMAQsLAkAgAygCVCIERQ0AIAVBGGogBEEAIAQoAgAoAggRAwAgAUUNACAFKAIYIAMoAiwgCRA0CyAHQQhqIgcgCkcNAAsLIAZBMGoiBiAIRw0ACwsgBUEgaiQACyAAIAApAyAgAax8NwMgCwYAQYTeAAsUACAAQQRqQQAgASgCBEGs3QBGGwt2AQF8IAMrAwAhBSAEKAIAIQMgAigCACECQcAAECMiAUG42wA2AgAgAUIANwIEIAFBzNwANgIQIAFCADcDGCABIAI2AhQgAUIANwMgIAEgAzYCOCABIAU5AzAgAUGAgID8AzYCKCAAIAE2AgQgACABQRBqNgIACwsAIAFBzNkANgIACxEAQQgQIyIAQczZADYCACAAC2oBA38gASgCECEAIAEoAggoAgAhAgJAIAEoAgQEQCAARQ0BIAEoAgAoAgAhA0EAIQEDQCACIAFBA3QiBGogAyAEaisDABBKOQMAIAFBAWoiASAARw0ACwwBCyAARQ0AIAIgAEEDdBAlGgsLDwAgAEGU1wA2AgAgABAiCw0AIABBlNcANgIAIAALBgBBvNkACxQAIABBBGpBACABKAIEQfDYAEYbC8QBAQV/IwBBEGsiBCQAIAAQEiIFNgIEIABB6IcENgIAIAEoAgAoAoQBIgAEQEEAIQEDQCAAKAIMIAAtABMiAiACwEEASCIGGyICQQRqEFEiAyACNgIAIANBBGogACgCCCAAQQhqIAYbIAIQLxogBCADNgIIQZjkAiAEQQhqIgMQAiECIAQgATYCCCAFQZyBBCADEAIiAyACEAogAwRAIAMQAAsgAgRAIAIQAAsgAUEBaiEBIAAoAgAiAA0ACwsgBEEQaiQACwUAQdwbC3YBAXwgAysDACEFIAQoAgAhAyACKAIAIQJBwAAQIyIBQZTXADYCACABQgA3AgQgAUGc2AA2AhAgAUIANwMYIAEgAjYCFCABQgA3AyAgASADNgI4IAEgBTkDMCABQYCAgPwDNgIoIAAgATYCBCAAIAFBEGo2AgALCwAgAUG01QA2AgALEQBBCBAjIgBBtNUANgIAIAAL9wEBB38gASgCECEAIAEoAggoAgAhAwJAIAEoAgQEQCAARQ0BIAEoAgAoAgAhBEEAIQEgAEEETwRAIABBfHEhCANAIAMgAUEDdCICaiACIARqKwMAnzkDACADIAJBCHIiBWogBCAFaisDAJ85AwAgAyACQRByIgVqIAQgBWorAwCfOQMAIAMgAkEYciICaiACIARqKwMAnzkDACABQQRqIQEgB0EEaiIHIAhHDQALCyAAQQNxIgBFDQEDQCADIAFBA3QiAmogAiAEaisDAJ85AwAgAUEBaiEBIAZBAWoiBiAARw0ACwwBCyAARQ0AIAMgAEEDdBAlGgsLDwAgAEH40gA2AgAgABAiCw0AIABB+NIANgIAIAALBgBBpNUACxQAIABBBGpBACABKAIEQdTUAEYbC3YBAXwgAysDACEFIAQoAgAhAyACKAIAIQJBwAAQIyIBQfjSADYCACABQgA3AgQgAUGA1AA2AhAgAUIANwMYIAEgAjYCFCABQgA3AyAgASADNgI4IAEgBTkDMCABQYCAgPwDNgIoIAAgATYCBCAAIAFBEGo2AgALCwAgAUGY0QA2AgALzAEBBn8gACgCACECIwBBEGsiACQAIAIoAoQBIgEEQCACQfwAaiEDA0ACfwJAIAEoAhgiAkUNACACKAIEDQAgASgCACEGIABBBGogAyABEJsBIAAoAgQhASAAQQA2AgQgAQRAAkAgAC0ADEUNAAJAIAEoAhgiAkUNACACIAIoAgQiBUEBazYCBCAFDQAgAiACKAIAKAIIEQAAIAIQJgsgASwAE0EATg0AIAEoAggQIgsgARAiCyAGDAELIAEoAgALIgENAAsLIABBEGokAAsRAEEIECMiAEGY0QA2AgAgAAv8AQEHfyABKAIQIQAgASgCCCgCACEDAkAgASgCBARAIABFDQEgASgCACgCACEEQQAhASAAQQRPBEAgAEF8cSEIA0AgAyABQQN0IgJqIAIgBGorAwAQUjkDACADIAJBCHIiBWogBCAFaisDABBSOQMAIAMgAkEQciIFaiAEIAVqKwMAEFI5AwAgAyACQRhyIgJqIAIgBGorAwAQUjkDACABQQRqIQEgB0EEaiIHIAhHDQALCyAAQQNxIgBFDQEDQCADIAFBA3QiAmogAiAEaisDABBSOQMAIAFBAWohASAGQQFqIgYgAEcNAAsMAQsgAEUNACADIABBA3QQJRoLCw8AIABB2M4ANgIAIAAQIgsNACAAQdjOADYCACAACwYAQYjRAAsUACAAQQRqQQAgASgCBEG40ABGGwt2AQF8IAMrAwAhBSAEKAIAIQMgAigCACECQcAAECMiAUHYzgA2AgAgAUIANwIEIAFB4M8ANgIQIAFCADcDGCABIAI2AhQgAUIANwMgIAEgAzYCOCABIAU5AzAgAUGAgID8AzYCKCAAIAE2AgQgACABQRBqNgIACwsAIAFB+MwANgIACxEAQQgQIyIAQfjMADYCACAAC/cBAQd/IAEoAhAhACABKAIIKAIAIQMCQCABKAIEBEAgAEUNASABKAIAKAIAIQRBACEBIABBBE8EQCAAQXxxIQgDQCADIAFBA3QiAmogAiAEaisDAJw5AwAgAyACQQhyIgVqIAQgBWorAwCcOQMAIAMgAkEQciIFaiAEIAVqKwMAnDkDACADIAJBGHIiAmogAiAEaisDAJw5AwAgAUEEaiEBIAdBBGoiByAIRw0ACwsgAEEDcSIARQ0BA0AgAyABQQN0IgJqIAIgBGorAwCcOQMAIAFBAWohASAGQQFqIgYgAEcNAAsMAQsgAEUNACADIABBA3QQJRoLC7gBAQJ/IwBBIGsiBCQAIAEgACgCBCIFQQF1aiEBIAAoAgAhACAFQQFxBEAgASgCACAAaigCACEACyAEIAI2AhQgBEHohwQ2AhAgBCADNgIMIARB6IcENgIIIARBGGogASAEQRBqIARBCGogABEHACAEKAIcIgAQBiAEKAIcIgEEQCABEAAgBEEANgIcCyAEKAIMIgEEQCABEAAgBEEANgIMCyAEKAIUIgEEQCABEAALIARBIGokACAACw8AIABBuMoANgIAIAAQIgsNACAAQbjKADYCACAACwYAQejMAAsUACAAQQRqQQAgASgCBEGYzABGGwt2AQF8IAMrAwAhBSAEKAIAIQMgAigCACECQcAAECMiAUG4ygA2AgAgAUIANwIEIAFBwMsANgIQIAFCADcDGCABIAI2AhQgAUIANwMgIAEgAzYCOCABIAU5AzAgAUGAgID8AzYCKCAAIAE2AgQgACABQRBqNgIACwsAIAFB2MgANgIACxEAQQgQIyIAQdjIADYCACAAC/cBAQd/IAEoAhAhACABKAIIKAIAIQMCQCABKAIEBEAgAEUNASABKAIAKAIAIQRBACEBIABBBE8EQCAAQXxxIQgDQCADIAFBA3QiAmogAiAEaisDAJs5AwAgAyACQQhyIgVqIAQgBWorAwCbOQMAIAMgAkEQciIFaiAEIAVqKwMAmzkDACADIAJBGHIiAmogAiAEaisDAJs5AwAgAUEEaiEBIAdBBGoiByAIRw0ACwsgAEEDcSIARQ0BA0AgAyABQQN0IgJqIAIgBGorAwCbOQMAIAFBAWohASAGQQFqIgYgAEcNAAsMAQsgAEUNACADIABBA3QQJRoLCw8AIABBnMYANgIAIAAQIgsNACAAQZzGADYCACAAC98tAQl/IwBBoAJrIgQkACAEQdABaiABIAIQZiAEQbABaiABIAMQZgJAAkACQAJAIAQtAOgBQQRHBEAgBEECOgBIIARBBzoAKyAEQZkMKAAANgIgIARBnAwoAAA2ACMgBEEAOgAwIARBADoAJyAEQdAAakH2ERByIQIgBCAEQYgBaiIFNgKEASAEQgA3AogBIARB+AFqIgMgBEGEAWoiByAFIARBIGoiBiAGEC4gAyAHIAUgAiACEC4gBEIANwKUASAEIARBkAFqQQRyIgc2ApABIAUgBCgChAEiAkcEQANAIARB+AFqIARBkAFqIAcgAkEQaiIDIAMQLgJAIAIoAgQiAwRAA0AgAyICKAIAIgMNAAwCCwALA0AgAiACKAIIIgIoAgBHDQALCyACIAVHDQALCyAEQQU6AKgBIAAgASAEQZABaiIAEEkgBC0AqAEiAUH/AUcEQCAEQRs2ApgCIARBHDYClAIgBEEdNgKQAiAEQR42AowCIARBHzYCiAIgBEEgNgKEAiAEQSE2AoACIARBIjYC/AEgBEEjNgL4ASAEQRRqIAAgBEH4AWogAUECdGooAgARAQALIARB/wE6AKgBIARBhAFqIAQoAogBEDggBC0AeCIAQf8BRwRAIARBGzYCmAIgBEEcNgKUAiAEQR02ApACIARBHjYCjAIgBEEfNgKIAiAEQSA2AoQCIARBITYCgAIgBEEiNgL8ASAEQSM2AvgBIARBFGogBEHgAGogBEH4AWogAEECdGooAgARAQALIARB/wE6AHggBCwAW0EASARAIAQoAlAQIgsgBC0ASCIAQf8BRwRAIARBGzYCmAIgBEEcNgKUAiAEQR02ApACIARBHjYCjAIgBEEfNgKIAiAEQSA2AoQCIARBITYCgAIgBEEiNgL8ASAEQSM2AvgBIARBFGogBEEwaiAEQfgBaiAAQQJ0aigCABEBAAsgBEH/AToASCAELAArQQBODQEgBCgCIBAiDAELAkACQAJAIAQtAMgBQQZrDgIBAgALIARBAjoASCAEQQc6ACsgBEGZDCgAADYCICAEQZwMKAAANgAjIARBADoAMCAEQQA6ACcgBEHQAGpB4wgQciECIAQgBEGIAWoiBTYChAEgBEIANwKIASAEQfgBaiIDIARBhAFqIgcgBSAEQSBqIgYgBhAuIAMgByAFIAIgAhAuIARCADcClAEgBCAEQZABakEEciIHNgKQASAFIAQoAoQBIgJHBEADQCAEQfgBaiAEQZABaiAHIAJBEGoiAyADEC4CQCACKAIEIgMEQANAIAMiAigCACIDDQAMAgsACwNAIAIgAigCCCICKAIARw0ACwsgAiAFRw0ACwsgBEEFOgCoASAAIAEgBEGQAWoiABBJIAQtAKgBIgFB/wFHBEAgBEEbNgKYAiAEQRw2ApQCIARBHTYCkAIgBEEeNgKMAiAEQR82AogCIARBIDYChAIgBEEhNgKAAiAEQSI2AvwBIARBIzYC+AEgBEEUaiAAIARB+AFqIAFBAnRqKAIAEQEACyAEQf8BOgCoASAEQYQBaiAEKAKIARA4IAQtAHgiAEH/AUcEQCAEQRs2ApgCIARBHDYClAIgBEEdNgKQAiAEQR42AowCIARBHzYCiAIgBEEgNgKEAiAEQSE2AoACIARBIjYC/AEgBEEjNgL4ASAEQRRqIARB4ABqIARB+AFqIABBAnRqKAIAEQEACyAEQf8BOgB4IAQsAFtBAEgEQCAEKAJQECILIAQtAEgiAEH/AUcEQCAEQRs2ApgCIARBHDYClAIgBEEdNgKQAiAEQR42AowCIARBHzYCiAIgBEEgNgKEAiAEQSE2AoACIARBIjYC/AEgBEEjNgL4ASAEQRRqIARBMGogBEH4AWogAEECdGooAgARAQALIARB/wE6AEggBCwAK0EATg0CIAQoAiAQIgwCCyAEQQA2AowBIARCADcChAEgBEEANgIcIARCADcCFCAEKAKwASEDQQAhAgJAA0AgAyAHQQV0aiIGLQAYQQdHBEAgBEECOgBIIARBBzoAKyAEQZkMKAAANgIgIARBnAwoAAA2ACMgBEEAOgAwIARBADoAJyAEQdAAakHjCBByIQIgBCAEQQxqIgU2AgggBEIANwIMIARB+AFqIgMgBEEIaiIHIAUgBEEgaiIGIAYQLiADIAcgBSACIAIQLiAEQgA3ApQBIAQgBEGQAWpBBHIiBzYCkAEgBSAEKAIIIgJHBEADQCAEQfgBaiAEQZABaiAHIAJBEGoiAyADEC4CQCACKAIEIgMEQANAIAMiAigCACIDDQAMAgsACwNAIAIgAigCCCICKAIARw0ACwsgAiAFRw0ACwsgBEEFOgCoASAAIAEgBEGQAWoiABBJIAQtAKgBIgFB/wFHBEAgBEEbNgKYAiAEQRw2ApQCIARBHTYCkAIgBEEeNgKMAiAEQR82AogCIARBIDYChAIgBEEhNgKAAiAEQSI2AvwBIARBIzYC+AEgBEEEaiAAIARB+AFqIAFBAnRqKAIAEQEACyAEQf8BOgCoASAEQQhqIAQoAgwQOCAELQB4IgBB/wFHBEAgBEEbNgKYAiAEQRw2ApQCIARBHTYCkAIgBEEeNgKMAiAEQR82AogCIARBIDYChAIgBEEhNgKAAiAEQSI2AvwBIARBIzYC+AEgBEEEaiAEQeAAaiAEQfgBaiAAQQJ0aigCABEBAAsgBEH/AToAeCAELABbQQBIBEAgBCgCUBAiCyAELQBIIgBB/wFHBEAgBEEbNgKYAiAEQRw2ApQCIARBHTYCkAIgBEEeNgKMAiAEQR82AogCIARBIDYChAIgBEEhNgKAAiAEQSI2AvwBIARBIzYC+AEgBEEEaiAEQTBqIARB+AFqIABBAnRqKAIAEQEACyAEQf8BOgBIIAQsACtBAE4NAiAEKAIgECIMAgsCQCAEKAKIASIDIAQoAowBRwRAIANBADYCCCADQgA3AgAgBigCBCIFIAYoAgAiCEcEQCAFIAhrIgVBAEgNCSADIAUQIyIGNgIEIAMgBjYCACADIAUgBmoiCTYCCCAGIAggBRAvGiADIAk2AgQLIAQgA0EMajYCiAEMAQtBACECAkACQAJAIAQoAogBIgUgBCgChAEiCGtBDG0iCkEBaiIDQdaq1aoBSQRAQdWq1aoBIAQoAowBIAhrQQxtIglBAXQiCyADIAMgC0kbIAlBqtWq1QBPGyIJBEAgCUHWqtWqAU8NAiAJQQxsECMhAgsgAiAKQQxsaiIDQQA2AgggA0IANwIAIAYoAgQiCyAGKAIAIgpHBEAgCyAKayIGQQBIDQwgAyAGECMiCzYCACADIAYgC2oiDDYCCCALIAogBhAvGiADIAw2AgQLIAIgCUEMbGohAiADQQxqIQYgBSAIRg0CA0AgA0EMayIDQQA2AgggAyAFQQxrIgUoAgA2AgAgAyAFKAIENgIEIAMgBSgCCDYCCCAFQQA2AgggBUIANwIAIAUgCEcNAAsgBCACNgKMASAEKAKIASECIAQgBjYCiAEgBCgChAEhBSAEIAM2AoQBIAIgBUYNAwNAIAJBDGsiAygCACIGBEAgAkEIayAGNgIAIAYQIgsgAyICIAVHDQALDAMLDAoLEDUACyAEIAI2AowBIAQgBjYCiAEgBCADNgKEAQsgBQRAIAUQIgsgBCgCGCECCyAEKAKEASAHQQxsaigCACEFAkAgBCgCHCIIIAJLBEAgAiAFNgIAIAQgAkEEaiICNgIYDAELIAIgBCgCFCIGa0ECdSIJQQFqIgNBgICAgARPDQdB/////wMgCCAGayIIQQF1IgogAyADIApJGyAIQfz///8HTxsiCAR/IAhBgICAgARPDQYgCEECdBAjBUEACyIKIAlBAnRqIgMgBTYCACADQQRqIQUgAiAGRwRAA0AgA0EEayIDIAJBBGsiAigCADYCACACIAZHDQALIAQoAhQhAgsgBCAKIAhBAnRqNgIcIAQgBTYCGCAEIAM2AhQgAgRAIAIQIgsgBSECCyAHQQFqIgcgBCgCtAEgBCgCsAEiA2tBBXVJDQALIAQoAhQhCCAEKAIYIQYgBCgChAEiAigCACEFIAIoAgQhAgJ/QRAQIyEDIAIgBWtBAnUhBUEAIQcjAEEQayICJAAgA0IANwIEIANBADYCDCADQfyEAjYCAAJAAkAgBiAIa0ECdSIJRQ0AIANBBGohCiAFRQRAA0AgAkEANgIMIAJCADcCBAJAIAMoAggiBSADKAIMTwRAIAogAkEEahBAIAIoAgQiBUUNASACIAU2AgggBRAiDAELIAVBADYCCCAFQgA3AgAgBSACKAIENgIAIAUgAigCCDYCBCAFIAIoAgw2AgggAyAFQQxqNgIICyAHQQFqIgcgCUcNAAwCCwALIAVBAEgNASAFQQJ0IQYDQCAIIAdBAnRqKAIAIQsgAiAGECMiBTYCCCACIAU2AgQgAiAFIAZqIgw2AgwgBSALIAYQLxogAiAMNgIIAkAgAygCCCIFIAMoAgxJBEAgBUEANgIIIAVCADcCACAFIAIoAgQ2AgAgBSACKAIINgIEIAUgAigCDDYCCCADIAVBDGo2AggMAQsgCiACQQRqEEAgAigCBCIFRQ0AIAIgBTYCCCAFECILIAdBAWoiByAJRw0ACwsgAkEQaiQAIAMMAQsgAkEANgIMIAJCADcCBAwGCyEDIAQtAOgBQQRHDQQgASgCACEFAkAgBCwA2wFBAE4EQCAEIAQoAtgBNgIoIAQgBCkD0AE3AyAMAQsgBEEgaiAEKALQASAEKALUARAyC0EQECMiAiADNgIMIAJBsPACNgIAIAJCADcCBCAEIAI2ApQBIAQgAzYCkAEgBEH4AWogBUH8AGogBEEgaiICIAIgBEGQAWoQbyAELQD8ASEDAkAgBCgClAEiAkUNACACIAIoAgQiBUEBazYCBCAFDQAgAiACKAIAKAIIEQAAIAIQJgsgBCwAK0EASARAIAQoAiAQIgsgBEECOgBIIARBBzoAKyAEQQA6ACcgBEGZDCgAADYCICAEQZwMKAAANgAjIAQgAzoAMCAEQeIPQd0SIAMbNgIEIARB0ABqIARBBGoQwgEhAiAEIARBDGoiBTYCCCAEQgA3AgwgBEH4AWoiAyAEQQhqIgcgBSAEQSBqIgYgBhAuIAMgByAFIAIgAhAuIARCADcClAEgBCAEQZABakEEciIHNgKQASAFIAQoAggiAkcEQANAIARB+AFqIARBkAFqIAcgAkEQaiIDIAMQLgJAIAIoAgQiAwRAA0AgAyICKAIAIgMNAAwCCwALA0AgAiACKAIIIgIoAgBHDQALCyACIAVHDQALCyAEQQU6AKgBIAAgASAEQZABaiIAEEkgBC0AqAEiAUH/AUcEQCAEQRs2ApgCIARBHDYClAIgBEEdNgKQAiAEQR42AowCIARBHzYCiAIgBEEgNgKEAiAEQSE2AoACIARBIjYC/AEgBEEjNgL4ASAEQfcBaiAAIARB+AFqIAFBAnRqKAIAEQEACyAEQf8BOgCoASAEQQhqIAQoAgwQOCAELQB4IgBB/wFHBEAgBEEbNgKYAiAEQRw2ApQCIARBHTYCkAIgBEEeNgKMAiAEQR82AogCIARBIDYChAIgBEEhNgKAAiAEQSI2AvwBIARBIzYC+AEgBEH3AWogBEHgAGogBEH4AWogAEECdGooAgARAQALIARB/wE6AHggBCwAW0EASARAIAQoAlAQIgsgBC0ASCIAQf8BRwRAIARBGzYCmAIgBEEcNgKUAiAEQR02ApACIARBHjYCjAIgBEEfNgKIAiAEQSA2AoQCIARBITYCgAIgBEEiNgL8ASAEQSM2AvgBIARB9wFqIARBMGogBEH4AWogAEECdGooAgARAQALIARB/wE6AEggBCwAK0EATg0AIAQoAiAQIgsgBCgCFCIABEAgABAiCyAEKAKEASIARQ0BIAQoAogBIgMgACICRwRAA0AgA0EMayIBKAIAIgIEQCADQQhrIAI2AgAgAhAiCyABIgMgAEcNAAsgBCgChAEhAgsgBCAANgKIASACECIMAQsgASgCACEGAkAgBCwA2wFBAE4EQCAEIAQoAtgBNgKAAiAEIAQpA9ABNwP4AQwBCyAEQfgBaiAEKALQASAEKALUARAyCyAEKAK0ASEFIAQoArABIQNBEBAjIgJCADcCBCACQfyEAjYCACACQQA2AgwgBEEANgIoIARCADcCICADIAVHBEAgBSADayIFQQBIDQQgBCAFECMiBzYCICAEIAUgB2oiCDYCKCAHIAMgBRAvGiAEIAg2AiQLIAJBBGogBEEgahBAIAQoAiAiAwRAIAQgAzYCJCADECILQRAQIyIDIAI2AgwgA0Gw8AI2AgAgA0IANwIEIAQgAzYClAEgBCACNgKQASAEQSBqIAZB/ABqIARB+AFqIgIgAiAEQZABahBvIAQtACQhAwJAIAQoApQBIgJFDQAgAiACKAIEIgVBAWs2AgQgBQ0AIAIgAigCACgCCBEAACACECYLIAQsAIMCQQBIBEAgBCgC+AEQIgsgBEECOgBIIARBBzoAKyAEQQA6ACcgBEGZDCgAADYCICAEQZwMKAAANgAjIAQgAzoAMCAEQeIPQd0SIAMbNgIUIARB0ABqIARBFGoQwgEhAiAEIARBiAFqIgU2AoQBIARCADcCiAEgBEH4AWoiAyAEQYQBaiIHIAUgBEEgaiIGIAYQLiADIAcgBSACIAIQLiAEQgA3ApQBIAQgBEGQAWpBBHIiBzYCkAEgBSAEKAKEASICRwRAA0AgBEH4AWogBEGQAWogByACQRBqIgMgAxAuAkAgAigCBCIDBEADQCADIgIoAgAiAw0ADAILAAsDQCACIAIoAggiAigCAEcNAAsLIAIgBUcNAAsLIARBBToAqAEgACABIARBkAFqIgAQSSAELQCoASIBQf8BRwRAIARBGzYCmAIgBEEcNgKUAiAEQR02ApACIARBHjYCjAIgBEEfNgKIAiAEQSA2AoQCIARBITYCgAIgBEEiNgL8ASAEQSM2AvgBIARBCGogACAEQfgBaiABQQJ0aigCABEBAAsgBEH/AToAqAEgBEGEAWogBCgCiAEQOCAELQB4IgBB/wFHBEAgBEEbNgKYAiAEQRw2ApQCIARBHTYCkAIgBEEeNgKMAiAEQR82AogCIARBIDYChAIgBEEhNgKAAiAEQSI2AvwBIARBIzYC+AEgBEEIaiAEQeAAaiAEQfgBaiAAQQJ0aigCABEBAAsgBEH/AToAeCAELABbQQBIBEAgBCgCUBAiCyAELQBIIgBB/wFHBEAgBEEbNgKYAiAEQRw2ApQCIARBHTYCkAIgBEEeNgKMAiAEQR82AogCIARBIDYChAIgBEEhNgKAAiAEQSI2AvwBIARBIzYC+AEgBEEIaiAEQTBqIARB+AFqIABBAnRqKAIAEQEACyAEQf8BOgBIIAQsACtBAE4NACAEKAIgECILIAQtAMgBIgBB/wFHBEAgBEEbNgJAIARBHDYCPCAEQR02AjggBEEeNgI0IARBHzYCMCAEQSA2AiwgBEEhNgIoIARBIjYCJCAEQSM2AiAgBEH4AWogBEGwAWogBEEgaiAAQQJ0aigCABEBAAsgBC0A6AEiAEH/AUcEQCAEQRs2AkAgBEEcNgI8IARBHTYCOCAEQR42AjQgBEEfNgIwIARBIDYCLCAEQSE2AiggBEEiNgIkIARBIzYCICAEQfgBaiAEQdABaiAEQSBqIABBAnRqKAIAEQEACyAEQaACaiQADwsQNQALEDsACxAtAAsGAEHIyAALFAAgAEEEakEAIAEoAgRB+McARhsLdgEBfCADKwMAIQUgBCgCACEDIAIoAgAhAkHAABAjIgFBnMYANgIAIAFCADcCBCABQaTHADYCECABQgA3AxggASACNgIUIAFCADcDICABIAM2AjggASAFOQMwIAFBgICA/AM2AiggACABNgIEIAAgAUEQajYCAAsLACABQbzEADYCAAsRAEEIECMiAEG8xAA2AgAgAAtrAQN/IAEoAhAhACABKAIIKAIAIQICQCABKAIEBEAgAEUNASABKAIAKAIAIQNBACEBA0AgAiABQQN0IgRqIAMgBGorAwAQkQE5AwAgAUEBaiIBIABHDQALDAELIABFDQAgAiAAQQN0ECUaCwsPACAAQYDCADYCACAAECILDQAgAEGAwgA2AgAgAAsGAEGsxAALFAAgAEEEakEAIAEoAgRB3MMARhsLYwECfyMAQRBrIgIkACABIAAoAgQiA0EBdWohASAAKAIAIQAgAkEIaiABIANBAXEEfyABKAIAIABqKAIABSAACxEBACACKAIMIgAQBiACKAIMIgEEQCABEAALIAJBEGokACAAC3YBAXwgAysDACEFIAQoAgAhAyACKAIAIQJBwAAQIyIBQYDCADYCACABQgA3AgQgAUGIwwA2AhAgAUIANwMYIAEgAjYCFCABQgA3AyAgASADNgI4IAEgBTkDMCABQYCAgPwDNgIoIAAgATYCBCAAIAFBEGo2AgALCwAgAUGgwAA2AgALEQBBCBAjIgBBoMAANgIAIAALzwQDB3wFfwF+IAEoAhAhACABKAIIKAIAIQsCQCABKAIEBEAgAEUNASABKAIAKAIAIQ1BACEBA0AgCyABQQN0IglqAnwCQAJAAkACQCAJIA1qKwMAIgK9Ig5CAFkEQCAOQiCIpyIJQf//P0sNAQtEAAAAAAAA8L8gAiACoqMgAr1C////////////AINQDQQaIA5CAFkNASACIAKhRAAAAAAAAAAAowwECyAJQf//v/8HSw0CQYCAwP8DIQpBgXghDCAJQYCAwP8DRwRAIAkhCgwCCyAOpw0BRAAAAAAAAAAADAMLIAJEAAAAAAAAUEOivSIOQiCIpyEKQct3IQwLIAwgCkHiviVqIglBFHZqtyIHRABgn1ATRNM/oiIDIA5C/////w+DIAlB//8/cUGewZr/A2qtQiCGhL9EAAAAAAAA8L+gIgIgAiACRAAAAAAAAOA/oqIiBaG9QoCAgIBwg78iBkQAACAVe8vbP6IiBKAiCCAEIAMgCKGgIAIgAkQAAAAAAAAAQKCjIgMgBSADIAOiIgQgBKIiAyADIANEn8Z40Amawz+iRK94jh3Fccw/oKJEBPqXmZmZ2T+goiAEIAMgAyADRERSPt8S8cI/okTeA8uWZEbHP6CiRFmTIpQkSdI/oKJEk1VVVVVV5T+goqCgoiACIAahIAWhoCICRAAAIBV7y9s/oiAHRDYr8RHz/lk9oiACIAagRNWtmso4lLs9oqCgoKAhAgsgAgs5AwAgAUEBaiIBIABHDQALDAELIABFDQAgCyAAQQN0ECUaCwsOACAAQeA9NgIAIAAQIgsMACAAQeA9NgIAIAALBgBBkMAACxMAIABBBGpBACABKAIEQcA/RhsLdAEBfCADKwMAIQUgBCgCACEDIAIoAgAhAkHAABAjIgFB4D02AgAgAUIANwIEIAFB6D42AhAgAUIANwMYIAEgAjYCFCABQgA3AyAgASADNgI4IAEgBTkDMCABQYCAgPwDNgIoIAAgATYCBCAAIAFBEGo2AgALCgAgAUGAPDYCAAuQEQESfyMAQeAAayICJAAgAkEsaiEMIAEoAgAhDSMAQSBrIg4kACAOQdjtAjYCCCAOIA5BCGoiAzYCGEEEIQUCQAJAAkACQCANKAJwIgcgDSgCdEYNAANAIA4oAhgiCUUNAyAJIAcgBEEDdGogCSgCACgCGBEBACAEQQFqIgQgDSgCdCANKAJwIgdrQQN1SQ0ACyAOKAIYIgQgDkEIakYNAEEFIQUgBCIDRQ0BCyADIAMoAgAgBUECdGooAgARAAALIAxCADcCBCAMIAxBBGoiCTYCAAJAIA0oAlgiCkUNACANQdAAaiESA0ACQAJAIAooAhAiA0UNACADKAIEDQAgCigCCCEGAkACQCAJIgMiBCgCACIFRQ0AA0AgBSIEKAIQIgMgBkoEQCAEIgMoAgAiBQ0BDAILIAMgBk4NAiAEKAIEIgUNAAsgBEEEaiEDC0EUECMiBSAENgIIIAVCADcCACAFIAY2AhAgAyAFNgIAIAwoAgAoAgAiBARAIAwgBDYCACADKAIAIQULIAwoAgQgBRBBIAwgDCgCCEEBajYCCAsgCigCFCIQIAooAhgiC0YNASANKAJUIgdFDQEDQAJAIAdFDQAgEigCACIFAn8gECgCACIIIAdBAWtxIAdpQQFLIhFFDQAaIAggByAISw0AGiAIIAdwCyIGQQJ0aigCACIDRQ0AIAMoAgAiBEUNACAHQQFrIQ8CQCARRQRAA0ACQCAEKAIEIgMgCEcEQCADIA9xIAZGDQEMBQsgBCgCCCAIRg0DCyAEKAIAIgQNAAwDCwALA0ACQCAEKAIEIgMgCEcEQCADIAdPBH8gAyAHcAUgAwsgBkYNAQwECyAEKAIIIAhGDQILIAQoAgAiBA0ACwwBCwJAAkAgBQJ/IAggD3EgEUUNABogCCAHIAhLDQAaIAggB3ALIgZBAnRqKAIAIgNFDQAgAygCACIERQ0AIBFFBEADQAJAIAggBCgCBCIDRwRAIAMgD3EgBkYNAQwECyAEKAIIIAhGDQQLIAQoAgAiBA0ADAILAAsDQAJAIAggBCgCBCIDRwRAIAMgB08EfyADIAdwBSADCyAGRg0BDAMLIAQoAgggCEYNAwsgBCgCACIEDQALC0GjExA3AAsCQCAEKAIgIgUgBCgCJCIDRg0AIAooAgghBgNAIAUoAgAgBkYNASAFQQhqIgUgA0cNAAsMAQsCQCADIAVGDQAgBUEIaiIHIANGDQADQCAHKAIAIAooAghHBEAgBSAHKQIANwIAIAVBCGohBQsgB0EIaiIHIANHDQALIAQoAiQhAwsgAyAFRg0AIAMgBSADIAVraiIPayEGIAMgD0cEQCAFIA8gBhA0CyAEIAUgBmo2AiQLIBBBCGoiECALRg0CIA0oAlQhBwwACwALIAooAgAiCg0BDAILIwBBEGsiBiQAIAooAgAhEyAGQQRqIBIgChCbASAGKAIEIQsgBkEANgIEIAsEQAJAIAYtAAxFDQAgCygCICIDBEAgCyADNgIkIAMQIgsgCygCFCIDBEAgCyADNgIYIAMQIgsgCygCECIFRQ0AIAUgBSgCBCIDQQFrNgIEIAMNACAFIAUoAgAoAggRAAAgBRAmCyALECILIAZBEGokACATIgoNAAsLIA5BIGokAAwBCxBFAAsgAkEANgIoIAJCADcCIAJAIAIoAiwiBCACQTBqIgVHBEADQCAEKAIQIQMgAkEDOgAYIAIgA7c5AwACQCACKAIkIgYgAigCKEkEQEH/ASEDIAZB/wE6ABggBkEAOgAAIAItABgiCUH/AUcEQCACQSQ2AlwgAkElNgJYIAJBJjYCVCACQSc2AlAgAkEoNgJMIAJBKTYCSCACQSo2AkQgAkErNgJAIAJBLDYCPCACQTtqIAYgAiACQTxqIAlBAnRqKAIAEQMAIAYgAi0AGCIDOgAYCyACIAZBIGo2AiQMAQsgAkEgaiACEIIBIAItABghAwsgA0H/AXEiA0H/AUcEQCACQRs2AlwgAkEcNgJYIAJBHTYCVCACQR42AlAgAkEfNgJMIAJBIDYCSCACQSE2AkQgAkEiNgJAIAJBIzYCPCACQTtqIAIgAkE8aiADQQJ0aigCABEBAAsCQCAEKAIEIgMEQANAIAMiBCgCACIDDQAMAgsACwNAIAQgBCgCCCIEKAIARw0ACwsgBCAFRw0ACyACKAIkIQUgAigCICEDIAJBADYCCCACQgA3AwAgAyAFRg0BIAUgA2siCUEATgRAIAIgCRAjIgQ2AgQgAiAENgIAIAIgBCAJajYCCANAIARB/wE6ABggBEEAOgAAIAMtABgiCUH/AUcEQCACQS02AlwgAkEuNgJYIAJBLzYCVCACQTA2AlAgAkExNgJMIAJBMjYCSCACQTM2AkQgAkE0NgJAIAJBNTYCPCACQTtqIAQgAyACQTxqIAlBAnRqKAIAEQMAIAQgAy0AGDoAGAsgBEEgaiEEIANBIGoiAyAFRw0ACyACIAQ2AgQMAgsQLQALIAJBADYCCCACQgA3AwALIAJBBjoAGCAAIAEgAhBJIAItABgiAEH/AUcEQCACQRs2AlwgAkEcNgJYIAJBHTYCVCACQR42AlAgAkEfNgJMIAJBIDYCSCACQSE2AkQgAkEiNgJAIAJBIzYCPCACQTtqIAIgAkE8aiAAQQJ0aigCABEBAAsgAigCICIABEAgAigCJCIEIAAiA0cEQANAIARBIGsiBCIDLQAYIgFB/wFHBEAgAkEbNgJcIAJBHDYCWCACQR02AlQgAkEeNgJQIAJBHzYCTCACQSA2AkggAkEhNgJEIAJBIjYCQCACQSM2AjwgAiAEIAJBPGogAUECdGooAgARAQALIANB/wE6ABggACAERw0ACyACKAIgIQMLIAIgADYCJCADECILIAJBLGogAigCMBBcIAJB4ABqJAALEABBCBAjIgBBgDw2AgAgAAtqAQN/IAEoAhAhACABKAIIKAIAIQICQCABKAIEBEAgAEUNASABKAIAKAIAIQNBACEBA0AgAiABQQN0IgRqIAMgBGorAwAQdzkDACABQQFqIgEgAEcNAAsMAQsgAEUNACACIABBA3QQJRoLCw4AIABByDk2AgAgABAiCwwAIABByDk2AgAgAAsFAEHwOwsTACAAQQRqQQAgASgCBEGkO0YbC3QBAXwgAysDACEFIAQoAgAhAyACKAIAIQJBwAAQIyIBQcg5NgIAIAFCADcCBCABQdA6NgIQIAFCADcDGCABIAI2AhQgAUIANwMgIAEgAzYCOCABIAU5AzAgAUGAgID8AzYCKCAAIAE2AgQgACABQRBqNgIACwoAIAFB6Dc2AgALEABBCBAjIgBB6Dc2AgAgAAvcBQMFfAZ/An4gASgCECEAIAEoAggoAgAhCAJAIAEoAgQEQCAARQ0BIAEoAgAoAgAhCUEAIQEDQCAIIAFBA3QiB2ohDCAHIAlqKwMAIgOZIQICQCADvSIOQjSIp0H/D3EiB0GZCE8EQCACEHdE7zn6/kIu5j+gIQIMAQsgB0GACE8EQCACIAKgRAAAAAAAAPA/IAIgAyADokQAAAAAAADwP6CfoKOgEHchAgwBCyAHQeUHSQ0AAnxEAAAAAAAAAAAhBAJAAnwCfAJAIAIgAyADoiICIAJEAAAAAAAA8D+gn0QAAAAAAADwP6CjoCICvSINQiCIpyIHQfmE6v4DSyANQgBZcUUEQCAHQYCAwP97TwRARAAAAAAAAPD/IAJEAAAAAAAA8L9hDQQaIAIgAqFEAAAAAAAAAACjDAYLIAdBAXRBgICAygdJDQQgB0HF/cr+e08NAUQAAAAAAAAAAAwCCyAHQf//v/8HSw0DCyACRAAAAAAAAPA/oCIDvSINQiCIp0HiviVqIgdBFHZB/wdrIQsgB0H//7+aBE0EQCACIAOhRAAAAAAAAPA/oCACIANEAAAAAAAA8L+goSAHQf//v4AESxsgA6MhBAsgDUL/////D4MgB0H//z9xQZ7Bmv8Daq1CIIaEv0QAAAAAAADwv6AhAiALtwsiBUQAAOD+Qi7mP6IgAiACIAJEAAAAAAAAAECgoyIDIAIgAkQAAAAAAADgP6KiIgYgAyADoiIDIAOiIgIgAiACRJ/GeNAJmsM/okSveI4dxXHMP6CiRAT6l5mZmdk/oKIgAyACIAIgAkREUj7fEvHCP6JE3gPLlmRGxz+gokRZkyKUJEnSP6CiRJNVVVVVVeU/oKKgoKIgBUR2PHk17znqPaIgBKCgIAahoKALDAELIAILIQILIAwgApogAiAOQgBTGzkDACABQQFqIgEgAEcNAAsMAQsgAEUNACAIIABBA3QQJRoLCzUBAX8gASAAKAIEIgJBAXVqIQEgACgCACEAIAEgAkEBcQR/IAEoAgAgAGooAgAFIAALEQAACw4AIABBqDU2AgAgABAiCwwAIABBqDU2AgAgAAsFAEHYNwsTACAAQQRqQQAgASgCBEGIN0YbC3QBAXwgAysDACEFIAQoAgAhAyACKAIAIQJBwAAQIyIBQag1NgIAIAFCADcCBCABQbA2NgIQIAFCADcDGCABIAI2AhQgAUIANwMgIAEgAzYCOCABIAU5AzAgAUGAgID8AzYCKCAAIAE2AgQgACABQRBqNgIACwoAIAFByDM2AgALEABBCBAjIgBByDM2AgAgAAuyAgICfAR/IAEoAhAhACABKAIIKAIAIQUCQCABKAIEBEAgAEUNASABKAIAKAIAIQZBACEBA0AgBSABQQN0IgRqIQcCQCAEIAZqKwMAIgOZIgK9QiCIpyIEQeunhv8DTwRAIARBgYDQgQRPBEBEAAAAAAAAAIAgAqNEAAAAAAAA8D+gIQIMAgtEAAAAAAAA8D9EAAAAAAAAAEAgAiACoBB2RAAAAAAAAABAoKOhIQIMAQsgBEGvscH+A08EQCACIAKgEHYiAiACRAAAAAAAAABAoKMhAgwBCyAEQYCAwABJDQAgAkQAAAAAAAAAwKIQdiICmiACRAAAAAAAAABAoKMhAgsgByACmiACIAO9QgBTGzkDACABQQFqIgEgAEcNAAsMAQsgAEUNACAFIABBA3QQJRoLCw4AIABBjDE2AgAgABAiCwwAIABBjDE2AgAgAAsvAQF/IAAoAgAoAlgiAARAA0AgACgCDCIBIAEoAgAoAhgRAAAgACgCACIADQALCwsFAEG4MwsTACAAQQRqQQAgASgCBEHoMkYbC3QBAXwgAysDACEFIAQoAgAhAyACKAIAIQJBwAAQIyIBQYwxNgIAIAFCADcCBCABQZQyNgIQIAFCADcDGCABIAI2AhQgAUIANwMgIAEgAzYCOCABIAU5AzAgAUGAgID8AzYCKCAAIAE2AgQgACABQRBqNgIACwoAIAFBrC82AgALEABBCBAjIgBBrC82AgAgAAtqAQN/IAEoAhAhACABKAIIKAIAIQICQCABKAIEBEAgAEUNASABKAIAKAIAIQNBACEBA0AgAiABQQN0IgRqIAMgBGorAwAQaDkDACABQQFqIgEgAEcNAAsMAQsgAEUNACACIABBA3QQJRoLCw4AIABB9Cw2AgAgABAiCwwAIABB9Cw2AgAgAAsFAEGcLwsTACAAQQRqQQAgASgCBEHQLkYbC4sBAQJ/IwBBEGsiAyQAIAEgACgCBCIEQQF1aiEBIAAoAgAhACAEQQFxBEAgASgCACAAaigCACEACyADIAI2AgQgA0HohwQ2AgAgA0EIaiABIAMgABEDACADKAIMIgAQBiADKAIMIgEEQCABEAAgA0EANgIMCyADKAIEIgEEQCABEAALIANBEGokACAAC3QBAXwgAysDACEFIAQoAgAhAyACKAIAIQJBwAAQIyIBQfQsNgIAIAFCADcCBCABQfwtNgIQIAFCADcDGCABIAI2AhQgAUIANwMgIAEgAzYCOCABIAU5AzAgAUGAgID8AzYCKCAAIAE2AgQgACABQRBqNgIACwoAIAFBlCs2AgALEABBCBAjIgBBlCs2AgAgAAv8AQEHfyABKAIQIQAgASgCCCgCACEDAkAgASgCBARAIABFDQEgASgCACgCACEEQQAhASAAQQRPBEAgAEF8cSEIA0AgAyABQQN0IgJqIAIgBGorAwAQNjkDACADIAJBCHIiBWogBCAFaisDABA2OQMAIAMgAkEQciIFaiAEIAVqKwMAEDY5AwAgAyACQRhyIgJqIAIgBGorAwAQNjkDACABQQRqIQEgB0EEaiIHIAhHDQALCyAAQQNxIgBFDQEDQCADIAFBA3QiAmogAiAEaisDABA2OQMAIAFBAWohASAGQQFqIgYgAEcNAAsMAQsgAEUNACADIABBA3QQJRoLCw4AIABB3Cg2AgAgABAiCwwAIABB3Cg2AgAgAAsFAEGEKwsTACAAQQRqQQAgASgCBEG4KkYbC3QBAXwgAysDACEFIAQoAgAhAyACKAIAIQJBwAAQIyIBQdwoNgIAIAFCADcCBCABQeQpNgIQIAFCADcDGCABIAI2AhQgAUIANwMgIAEgAzYCOCABIAU5AzAgAUGAgID8AzYCKCAAIAE2AgQgACABQRBqNgIACwoAIAFB/CY2AgAL8ngEIH8BfAJ9A34jAEHwAWsiCSQAIAlBqAFqIAEgAhBmAkACQAJAIAktAMABQQZHBEAgCUFAa0ECOgAAIAlBBzoAIyAJQZkMKAAANgIYIAlBnAwoAAA2ABsgCUEAOgAoIAlBADoAHyAJQcgAakGUEBByIQIgCSAJQYABaiIENgJ8IAlCADcCgAEgCUHMAWoiAyAJQfwAaiIFIAQgCUEYaiIHIAcQLiADIAUgBCACIAIQLiAJQgA3AowBIAkgCUGIAWpBBHIiBTYCiAEgBCAJKAJ8IgJHBEADQCAJQcwBaiAJQYgBaiAFIAJBEGoiAyADEC4CQCACKAIEIgMEQANAIAMiAigCACIDDQAMAgsACwNAIAIgAigCCCICKAIARw0ACwsgAiAERw0ACwsgCUEFOgCgASAAIAEgCUGIAWoiABBJIAktAKABIgFB/wFHBEAgCUEbNgLsASAJQRw2AugBIAlBHTYC5AEgCUEeNgLgASAJQR82AtwBIAlBIDYC2AEgCUEhNgLUASAJQSI2AtABIAlBIzYCzAEgCUEMaiAAIAlBzAFqIAFBAnRqKAIAEQEACyAJQf8BOgCgASAJQfwAaiAJKAKAARA4IAktAHAiAEH/AUcEQCAJQRs2AuwBIAlBHDYC6AEgCUEdNgLkASAJQR42AuABIAlBHzYC3AEgCUEgNgLYASAJQSE2AtQBIAlBIjYC0AEgCUEjNgLMASAJQQxqIAlB2ABqIAlBzAFqIABBAnRqKAIAEQEACyAJQf8BOgBwIAksAFNBAEgEQCAJKAJIECILIAlBQGstAAAiAEH/AUcEQCAJQRs2AuwBIAlBHDYC6AEgCUEdNgLkASAJQR42AuABIAlBHzYC3AEgCUEgNgLYASAJQSE2AtQBIAlBIjYC0AEgCUEjNgLMASAJQQxqIAlBKGogCUHMAWogAEECdGooAgARAQALIAlB/wE6AEAgCSwAI0EATg0BIAkoAhgQIgwBCyABKAIAIQ8jAEFAaiIRJAACQCAJKAKoASIVIAkoAqwBIhhHBEBBACECA0BBCCEEIBUtABhBBkcNAiAVKAIAIggtABhBA0cNAgJAAkACQAJAAkACQAJAAn8gCCsDACIjmUQAAAAAAADgQWMEQCAjqgwBC0GAgICAeAsOBgQGAQACAwYLIAhBQGshAyAIQeAAaiEOIwBBEGsiBiQAQQghBQJAIAgtADhBA0cNACADLQAYQQRHDQAgAywAC0EASCEFAn8gCCsDICIjmUQAAAAAAADgQWMEQCAjqgwBC0GAgICAeAshBAJAIAVFBEAgBiADKAIINgIIIAYgAykCADcDAAwBCyAGIAMoAgAgAygCBBAyCwJAIA8oAlQiB0UEQEECIQUMAQtBAiEFIA8oAlAiDAJ/IAdBAWsgBHEgB2kiCEEBTQ0AGiAEIAQgB0kNABogBCAHcAsiDUECdGooAgAiA0UNACADKAIAIgNFDQAgB0EBayEKAkAgCEEBTQRAA0ACQCAEIAMoAgQiC0cEQCAKIAtxIA1GDQEMBQsgAygCCCAERg0DCyADKAIAIgMNAAwDCwALA0ACQCAEIAMoAgQiC0cEQCAHIAtNBH8gCyAHcAUgCwsgDUYNAQwECyADKAIIIARGDQILIAMoAgAiAw0ACwwBCyAMAn8gBCAKcSAIQQFNDQAaIAQgBCAHSQ0AGiAEIAdwCyILQQJ0aigCACIDRQ0MIAMoAgAiA0UNDAJAIAhBAU0EQANAAkAgBCADKAIEIgVHBEAgBSAKcSALRg0BDBELIAMoAgggBEYNAwsgAygCACIDDQAMDwsACwNAAkAgBCADKAIEIgVHBEAgBSAHTwR/IAUgB3AFIAULIAtGDQEMEAsgAygCCCAERg0CCyADKAIAIgMNAAsMDQsgAygCDCIDIAYgDiAPQfwAaiADKAIAKAIMEQgAIQULIAYsAAtBAE4NACAGKAIAECILIAZBEGokACAFIQQMBAsCfyAIQUBrIQNBCCEFAkACQAJAIAgtADhBA0cNACADLQAYQQNHDQAgCC0AeEEDRw0AIA8oAlQhBAJ/IAgrA2AiI5lEAAAAAAAA4EFjBEAgI6oMAQtBgICAgHgLIQsCfyADKwMAIiOZRAAAAAAAAOBBYwRAICOqDAELQYCAgIB4CyEHAn8gCCsDICIjmUQAAAAAAADgQWMEQCAjqgwBC0GAgICAeAshCEECIARFDQMaQQIhBSAPKAJQIg0CfyAEQQFrIAhxIARpIgZBAU0NABogCCAEIAhLDQAaIAggBHALIgxBAnRqKAIAIgNFDQAgAygCACIDRQ0AIARBAWshCgJAIAZBAU0EQANAAkAgCCADKAIEIg5HBEAgCiAOcSAMRg0BDAULIAMoAgggCEYNAwsgAygCACIDDQAMAwsACwNAAkAgCCADKAIEIg5HBEAgBCAOTQR/IA4gBHAFIA4LIAxGDQEMBAsgAygCCCAIRg0CCyADKAIAIgMNAAsMAQsgDQJ/IAcgCnEgBkEBTQ0AGiAHIAQgB0sNABogByAEcAsiDEECdGooAgAiA0UNACADKAIAIgNFDQACQCAGQQFNBEADQAJAIAcgAygCBCIORwRAIAogDnEgDEYNAQwFCyADKAIIIAdGDQMLIAMoAgAiAw0ADAMLAAsDQAJAIAcgAygCBCIORwRAIAQgDk0EfyAOIARwBSAOCyAMRg0BDAQLIAMoAgggB0YNAgsgAygCACIDDQALDAELIA0CfyAIIApxIAZBAU0NABogCCAEIAhLDQAaIAggBHALIg5BAnRqKAIAIgNFDQ0gAygCACIDRQ0NAkAgBkEBTQRAA0ACQCAIIAMoAgQiBUcEQCAFIApxIA5GDQEMEgsgAygCCCAIRg0DCyADKAIAIgMNAAwQCwALA0ACQCAIIAMoAgQiBUcEQCAEIAVNBH8gBSAEcAUgBQsgDkYNAQwRCyADKAIIIAhGDQILIAMoAgAiAw0ACwwOCyANAn8gByAKcSAGQQFNDQAaIAcgBCAHSw0AGiAHIARwCyIMQQJ0aigCACIFRQ0NIAUoAgAiDkUNDQJAIAZBAU0EQANAAkAgByAOKAIEIgRHBEAgBCAKcSAMRg0BDBILIA4oAgggB0YNAwsgDigCACIODQAMEAsACwNAAkAgByAOKAIEIgVHBEAgBCAFTQR/IAUgBHAFIAULIAxGDQEMEQsgDigCCCAHRg0CCyAOKAIAIg4NAAsMDgsCQCADKAIYIgYgAygCHCIKSQRAIAYgB60gC61CIIaENwIAIAMgBkEIajYCGAwBCyAGIAMoAhQiBGtBA3UiDUEBaiIFQYCAgIACTw0PQf////8BIAogBGsiCkECdSIMIAUgBSAMSRsgCkH4////B08bIgoEfyAKQYCAgIACTw0DIApBA3QQIwVBAAsiDCANQQN0aiIFIAetIAutQiCGhDcCACAFQQhqIQcgBCAGRwRAA0AgBUEIayIFIAZBCGsiBikCADcCACAEIAZHDQALIAMoAhQhBgsgAyAMIApBA3RqNgIcIAMgBzYCGCADIAU2AhQgBkUNACAGECILIA4oAiQiAyAOKAIoIgdJBEAgAyAIrSALrUIghoQ3AgAgDiADQQhqNgIkQQAMBAsgAyAOKAIgIgRrQQN1IgZBAWoiBUGAgICAAk8NAkH/////ASAHIARrIgdBAnUiCiAFIAUgCkkbIAdB+P///wdPGyIFBH8gBUGAgICAAk8NAiAFQQN0ECMFQQALIgcgBkEDdGoiBiAIrSALrUIghoQ3AgAgBkEIaiEIIAMgBEcEQANAIAZBCGsiBiADQQhrIgMpAgA3AgAgAyAERw0ACyAOKAIgIQMLIA4gByAFQQN0ajYCKCAOIAg2AiQgDiAGNgIgQQAhBSADRQ0AIAMQIgsgBQwCCxA1AAsMCwshBAwDCyMAQTBrIgIkAAJAIAgtADhBBkYEQCARQQA2AhQgEUIANwIMIAgoAiQiAyAIKAIgIgRHBEAgAyAEayIHQQBIDQwgESAHECMiBTYCECARIAU2AgwgESAFIAdqNgIUA0AgBUH/AToAGCAFQQA6AAAgBC0AGCIHQf8BRwRAIAJBLTYCLCACQS42AiggAkEvNgIkIAJBMDYCICACQTE2AhwgAkEyNgIYIAJBMzYCFCACQTQ2AhAgAkE1NgIMIAJBC2ogBSAEIAJBDGogB0ECdGooAgARAwAgBSAELQAYOgAYCyAFQSBqIQUgBEEgaiIEIANHDQALIBEgBTYCEAsgAkEwaiQADAELEDsACyMAQeAAayIGJAAgBkIANwIwIAYgBkEwaiIHNgIsAkAgESgCDCIFIBEoAhAiDUcEQANAIAUtABhBA0cEQEEIIQMMAwsgDygCVCEEAn8gBSsDACIjmUQAAAAAAADgQWMEQCAjqgwBC0GAgICAeAshCCAERQRAQQIhAwwDC0ECIQMgDygCUAJ/IARBAWsgCHEgBGlBAUsiCkUNABogCCAEIAhLDQAaIAggBHALIgtBAnRqKAIAIgJFDQIgAigCACICRQ0CAkAgCkUEQCAEQQFrIQQDQAJAIAggAigCBCIKRwRAIAQgCnEgC0YNAQwHCyACKAIIIAhGDQMLIAIoAgAiAg0ACwwECwNAAkAgCCACKAIEIgpHBEAgBCAKTQR/IAogBHAFIAoLIAtGDQEMBgsgAigCCCAIRg0CCyACKAIAIgINAAsMAwsCQCACKAIMIgNFDQAgA0HgIUGYogEQPiIDRQ0AIAIoAhAiCgRAIAogCigCBEEBajYCBAsgBkEAOgAmIAZBqhEvAAA7ASQgBkEGOgArIAZBphEoAAA2AiAgBkECOgAYIAZBAToAACADIAZBIGogBiADKAIAKAIIEQYAGiAGLQAYIgJB/wFHBEAgBkEbNgJcIAZBHDYCWCAGQR02AlQgBkEeNgJQIAZBHzYCTCAGQSA2AkggBkEhNgJEIAZBIjYCQCAGQSM2AjwgBkE7aiAGIAZBPGogAkECdGooAgARAQALIAYsACtBAEgEQCAGKAIgECILIAciAyECAkACQCAGKAIwIgRFDQADQCAIIAQiAigCECIDSARAIAIiAygCACIEDQEMAgsgAyAITg0CIAIoAgQiBA0ACyACQQRqIQMLQRQQIyIEIAI2AgggBEIANwIAIAQgCDYCECADIAQ2AgAgBigCLCgCACICBEAgBiACNgIsIAMoAgAhBAsgBigCMCAEEEEgBiAGKAI0QQFqNgI0CyAKRQ0AIAogCigCBCICQQFrNgIEIAINACAKIAooAgAoAggRAAAgChAmCyAFQSBqIgUgDUcNAAsLIA9B5ABqIQsCQCAPKAJkIgQgD0HoAGoiDUYNACAPKAJUIgNFDQADQAJAIANFDQAgDygCUAJ/IAQoAhAiBSADQQFrcSADaUEBSyIIRQ0AGiAFIAMgBUsNABogBSADcAsiCkECdGooAgAiAkUNACACKAIAIgJFDQACQCAIRQRAIANBAWshAwNAAkAgBSACKAIEIghHBEAgAyAIcSAKRg0BDAULIAIoAgggBUYNAwsgAigCACICDQALDAILA0ACQCAFIAIoAgQiCEcEQCADIAhNBH8gCCADcAUgCAsgCkYNAQwECyACKAIIIAVGDQILIAIoAgAiAg0ACwwBCyACKAIMIgNFDQAgA0HgIUGYogEQPiIDRQ0AIAIoAhAiCARAIAggCCgCBEEBajYCBAsCQCAGKAIwIgIEQCAEKAIQIQUDQCACKAIQIgogBUwEfyAFIApMDQMgAkEEagUgAgsoAgAiAg0ACwsgBkGqES8AADsBJCAGQQY6ACsgBkEAOgAmIAZBphEoAAA2AiAgBkECOgAYIAZBADoAACADIAZBIGogBiADKAIAKAIIEQYAGiAGLQAYIgJB/wFHBEAgBkEbNgJcIAZBHDYCWCAGQR02AlQgBkEeNgJQIAZBHzYCTCAGQSA2AkggBkEhNgJEIAZBIjYCQCAGQSM2AjwgBkE7aiAGIAZBPGogAkECdGooAgARAQALIAYsACtBAE4NACAGKAIgECILAkAgAysDOCIjRAAAAAAAAOA/ZEUEQCAjIAMrAzChmUSN7bWg98awPmUNAQsgBCgCECEKIAciBSECAkAgBigCMCIDRQ0AA0AgAyICKAIQIgMgCkoEQCACIQUgAigCACIDDQEMAgsgAyAKTg0CIAIoAgQiAw0ACyACQQRqIQULQRQQIyIDIAI2AgggA0IANwIAIAMgCjYCECAFIAM2AgAgBigCLCgCACICBEAgBiACNgIsIAUoAgAhAwsgBigCMCADEEEgBiAGKAI0QQFqNgI0CyAIRQ0AIAggCCgCBCICQQFrNgIEIAINACAIIAgoAgAoAggRAAAgCBAmCwJAIAQoAgQiAwRAA0AgAyICKAIAIgMNAAwCCwALA0AgBCgCCCICKAIAIARHIRogAiEEIBoNAAsLIAIgDUcEQCAPKAJUIQMgAiEEDAELCyALKAIAIQQLIA8gBigCLDYCZCAGIAQ2AiwgDygCaCECIA8gBigCMCIENgJoIAYgAjYCMCAPKAJsIQMgDyAGKAI0IgU2AmwgBiADNgI0IARBCGogCyAFGyANNgIAIAJBCGogBkEsaiADGyAHNgIAQQAhAwsgBkEsaiAGKAIwEFwgBkHgAGokACADIQQgESgCDCIFBEAgESgCECICIAUiA0cEQANAIAJBIGsiAi0AGCIDQf8BRwRAIBFBGzYCPCARQRw2AjggEUEdNgI0IBFBHjYCMCARQR82AiwgEUEgNgIoIBFBITYCJCARQSI2AiAgEUEjNgIcIBFBG2ogAiARQRxqIANBAnRqKAIAEQEACyACQf8BOgAYIAIgBUcNAAsgESgCDCEDCyARIAU2AhAgAxAiC0EBIQIMAgsgAiEbQQAhAiAbRQ0CIBFBHGohCyMAQeAAayIHJAACQAJAIA8oAnQiAyAPKAJwIgVHBEBBASADIAVrQQN1IgIgAkEBTRshBkEAIQIDQCAFIAJBA3RqKAIEIgQEQCAEKAIERQ0DCyACQQFqIgIgBkcNAAsLQSwQIyICQgA3AgwgAkGAHTYCACACQgA3AgQgAkIANwIUIAJCADcCJCACQoCAgPwDNwIcIAsgAjYCBCALIAJBDGoiBDYCACAPKAJ4IANHBEAgAyACNgIEIAMgBDYCACACIAIoAgRBAWo2AgQgDyADQQhqNgJ0DAILIA9B8ABqIAsQRAwBCyAFIAJBA3RqKAIAIQIgCyAENgIEIAsgAjYCACAEIAQoAgRBAWo2AgQLIAsoAgAiBSgCGCICIAUoAhQiA0cEQANAIAJBMGsQYyICIANHDQALCyAFIAM2AhggBSgCDARAIAUoAggiAgRAA0AgAigCACEcIAIQIiAcIgINAAsLQQAhAiAFQQA2AggCQCAFKAIEIgRFDQAgBEEETwRAIARBfHEhCEEAIQMDQCACQQJ0IgYgBSgCAGpBADYCACAFKAIAIAZqQQA2AgQgBSgCACAGakEANgIIIAUoAgAgBmpBADYCDCACQQRqIQIgA0EEaiIDIAhHDQALCyAEQQNxIgNFDQBBACEEA0AgBSgCACACQQJ0akEANgIAIAJBAWohAiAEQQFqIgQgA0cNAAsLIAVBADYCDAsgD0IANwMQIAdBADYCXCAHIAdB1ABqIgI2AlggByACNgJUIAcgB0HMAGo2AkggB0IANwJMAkAgDygCZCIDIA9B6ABqIgpGDQACQAJAA0AgDygCVCIERQ0LIA8oAlACfyADKAIQIgUgBEEBa3EgBGlBAUsiBkUNABogBSAEIAVLDQAaIAUgBHALIghBAnRqKAIAIgJFDQsgAigCACICRQ0LAkAgBkUEQCAEQQFrIQQDQAJAIAUgAigCBCIGRwRAIAQgBnEgCEYNAQwQCyACKAIIIAVGDQMLIAIoAgAiAg0ACwwNCwNAAkAgBSACKAIEIgZHBEAgBCAGTQR/IAYgBHAFIAYLIAhGDQEMDwsgAigCCCAFRg0CCyACKAIAIgINAAsMDAsCQAJAIAIoAgwiBEUNACAEQeAhQZiiARA+IgVFDQAgAigCECICBEAgAiACKAIEQQFqNgIEC0EAIQYgB0GqES8AADsBHCAHQQY6ACMgB0EAOgAeIAdBphEoAAA2AhggBUEIaiIEIAdBGGoiCBA5BEAgBCAIECkiBEUNAiAELQAwQQJHDQQgBC0AGCEGCyAHLAAjQQBIBEAgBygCGBAiC0EQECMiBCAFNgIIIAQgAjYCDAJAIAYEQCACBEAgAiACKAIEQQFqNgIECyAEIAdB1ABqNgIAIAQgBygCWCIFNgIEIAUgBDYCACAHIAQ2AlgMAQsgAgRAIAIgAigCBEEBajYCBAsgBCAHQdQAajYCBCAEIAcoAlQiBTYCACAFIAQ2AgQgByAENgJUCyAHIAcoAlxBAWo2AlwgAkUNACACIAIoAgQiBEEBazYCBCAEDQAgAiACKAIAKAIIEQAAIAIQJgsCQCADKAIEIgQEQANAIAQiAigCACIEDQAMAgsACwNAIAMoAggiAigCACADRyEdIAIhAyAdDQALCyAKIAIiA0YNAwwBCwsMCgsQOwALIAcoAlgiDSAHQdQAakYNAANAIAsoAgAhAyAHIA0oAgg2AhggByANKAIMIgI2AhwgAgRAIAIgAigCBEEBajYCBAsgB0IANwIgIAdCADcCMCAHQgA3AiggB0EANgJEIAdCADcCPCAHIAM2AjggB0EANgIUIAdCADcCDCAHIA0oAggoAgQ2AgggDyAHQcgAaiAHQQxqIAdBCGoQoAEgBygCDCIOIAcoAhAiE0cEQANAIA8oAlQiBUUNCyAOKAIAIQQCQCAFaUEBSyIGRQRAIAVBAWsgBHEhAwwBCyAEIgMgBUkNACADIAVwIQMLIA8oAlAgA0ECdGooAgAiAkUNCyACKAIAIgJFDQsCQCAGRQRAIAVBAWshBQNAAkAgBCACKAIEIgZHBEAgBSAGcSADRg0BDBALIAIoAgggBEYNAwsgAigCACICDQALDA0LA0ACQCAEIAIoAgQiBkcEQCAFIAZNBH8gBiAFcAUgBgsgA0YNAQwPCyACKAIIIARGDQILIAIoAgAiAg0ACwwMCyAHQRhqIQMgAkEMaiEEIAJBIGohBUIAISYjAEHwAGsiCCQAAkAgAigCGCACKAIURgRAIwBBMGsiAiQAAkAgAygCDCIGIAMoAhBHBEAgBiAEKAIANgIAIAYgBCgCBCIKNgIEIAoEQCAKIAooAgRBAWo2AgQLIAMgBkEIajYCDAwBCyADQQhqIAQQRAsCQCAEKAIAIgZFDQAgBkHgIUG0igIQPiIMRQ0AIAIgDDYCACACIAQoAgQiBjYCBAJAAkACQAJAIAZFBEAgA0EYaiIQKAIAIgogAygCHEYNASAKIAY2AgQgCiAMNgIADAMLIAYgBigCBEEBajYCBCADQRhqIhAoAgAiCiADKAIcRw0BCyADQRRqIAIQRCACKAIEIQYMAgsgCiAGNgIEIAogDDYCACAGIAYoAgRBAWo2AgQLIBAgCkEIajYCAAsgBkUNACAGIAYoAgQiCkEBazYCBCAKDQAgBiAGKAIAKAIIEQAAIAYQJgsCQCAFKAIAIgogBSgCBCIFRwRAQQEhBgNAIAYgCigCBEEBaiIMIAYgDEsbIQYgCkEIaiIKIAVHDQALIAJBADYCJCACQgA3AhwgBkGAgICABEkNARAtAAsgAkIANwIgQQEhBgsgAiAGQQJ0IgUQIyIKNgIcIAIgBSAKaiIMNgIkIAogBRAlIQUgAiAMNgIgIAatIScCQANAAkAgAygCICEKIAQoAgA1AgQhKCACIA8QnwE2AgggAiAoICZCIIaENwMAIAJBKGogCiACIAIQngEgAygCICEeIAQoAgAoAgQhDCACICanIhA2AgQgAiAMNgIAIB4gAhBrIgpFDQAgBSAQQQJ0aiAKKAIQNgIAICcgJkIBfCImUg0BDAILC0GjExA3AAsgAygCACsDOCEjIAIoAiQhCiACQQA2AiQgAigCICEMIAJBADYCICAEKAIAIRAgAigCHCESIAQoAgQiBQRAIAUgBSgCBEEBajYCBAtBIBAjIgQgI0QAAAAAAADgP2Q6AAQgBEHo5AI2AgAgBCAGNgIcIAQgBTYCGCAEIBA2AhQgBCAKNgIQIAQgDDYCDCAEIBI2AgggAiAENgIQAkACQAJAIAMoAigiBSADKAIsTwRAIANBJGogAhCdASACKAIQIgMgAkcNAUEEIQQgAiEDDAILIAUgBDYCECADIAVBGGo2AigMAgtBBSEEIANFDQELIAMgAygCACAEQQJ0aigCABEAAAsgAkEwaiQADAELAkAgAygCDCIGIAMoAhBHBEAgBiAEKAIANgIAIAYgBCgCBCIKNgIEIAoEQCAKIAooAgRBAWo2AgQLIAMgBkEIajYCDAwBCyADQQhqIAQQRAsCQAJAIAQoAgAiBkUNACAGQeAhQbSKAhA+IgpFDQAgCCAKNgJIIAggBCgCBCIGNgJMIAYEQCAGIAYoAgRBAWo2AgQLIAMoAhgiBiADKAIcRwRAIAYgCjYCACAGIAgoAkwiCjYCBCAKBEAgCiAKKAIEQQFqNgIECyADIAZBCGo2AhgMAgsgA0EUaiAIQcgAahBEDAELIAhCADcCSAsCQCAIKAJMIgZFDQAgBiAGKAIEIgpBAWs2AgQgCg0AIAYgBigCACgCCBEAACAGECYLAkAgBSgCACIGIAUoAgQiBUcEQEEBIQoDQCAKIAYoAgRBAWoiDCAKIAxLGyEKIAZBCGoiBiAFRw0ACyAIQQA2AkAgCEIANwI4IApBgICAgARJDQEMDwsgCEIANwI8QQEhCgsgCCAKQQJ0IgUQIyIGNgI4IAggBSAGaiIMNgJAIAYgBRAlIQYgCCAMNgI8IAqtIScDQCADKAIgIQUgBCgCADUCBCEoIAggDxCfATYCUCAIICggJkIghoQ3A0ggCCAFIAhByABqIgUgBRCeASADKAIgIR8gBCgCACgCBCEMIAggJqciEDYCTCAIIAw2AkggHyAFEGsiBUUNDSAGIBBBAnRqIAUoAhA2AgAgJkIBfCImICdSDQALIAIoAhQhCiACKAIYIQwgCEEANgI0IAhCADcCLCAMIAprIhBBA3UhBkEAIQUgCiAMRiISRQRAIAZBgICAgARPDQ4gCCAQQQF1IgoQIyIFNgIsIAggBSAGQQJ0ajYCNCAIIAUgChAlIApqNgIwCyAEKAIAIQwgCEEgECMiCjYCICAIQpWAgICAhICAgH83AiQgCkH5DikAADcADSAKQfQOKQAANwAIIApB7A4pAAA3AAAgCkEAOgAVIAhBAzoAGCAIIAa4OQMAIAwgCEEgaiAIIAwoAgAoAggRBgAaIAgtABgiCkH/AUcEQCAIQRs2AmggCEEcNgJkIAhBHTYCYCAIQR42AlwgCEEfNgJYIAhBIDYCVCAIQSE2AlAgCEEiNgJMIAhBIzYCSCAIQccAaiAIIAhByABqIApBAnRqKAIAEQEACyAILAArQQBIBEAgCCgCIBAiCwJAIBJFBEBBASAGIAZBAU0bIQxBACEKA0AgAygCICEgIAggAigCFCAKQQN0aiISKAIANgJIIAggEigCBDYCTCAgIAhByABqEGsiEEUNAiAFIApBAnRqIBAoAhA2AgAgCkEBaiIKIAxHDQALCyADKAIAKwM4ISMgCCgCQCEFIAhBADYCQCAIKAI8IQogCEEANgI8IAQoAgAhDCAIKAI0IRAgCCgCMCESIAgoAiwhFCAIKAI4IRYgBCgCBCIEBEAgBCAEKAIEQQFqNgIEC0EwECMiAiAjRAAAAAAAAOA/ZDoABCACQYzpAjYCACACIAQ2AiQgAiAMNgIgIAIgEDYCHCACIBI2AhggAiAUNgIUIAIgBTYCECACIAo2AgwgAiAWNgIIIAIgBq0gJ0IghoQ3AiggCCACNgJYAkACQCADKAIoIgQgAygCLE8EQCADQSRqIAhByABqIgIQnQEgAiAIKAJYIgNHDQFBBCEKIAIhAwwCCyAEIAI2AhAgAyAEQRhqNgIoDAMLQQUhCiADRQ0CCyADIAMoAgAgCkECdGooAgARAAAMAQsMDAsgCEHwAGokACAOQQRqIg4gE0cNAAsLAkAgCygCACIDKAIYIgIgAygCHEkEQCACIAcoAhg2AgAgAiAHKAIcNgIEIAdCADcCGCACQQA2AhAgAkIANwIIIAIgBygCIDYCCCACIAcoAiQ2AgwgAiAHKAIoNgIQIAdBADYCKCAHQgA3AiAgAkEANgIcIAJCADcCFCACIAcoAiw2AhQgAiAHKAIwNgIYIAIgBygCNDYCHCAHQQA2AjQgB0IANwIsIAcoAjghBCACQQA2AiwgAkIANwIkIAIgBDYCICACIAcoAjw2AiQgAiAHKAJANgIoIAIgBygCRDYCLCAHQQA2AkQgB0IANwI8IAMgAkEwajYCGAwBCwJAAkACQCADKAIYIAMoAhQiBGsiBUEwbSIIQQFqIgJB1qrVKkkEQEHVqtUqIAMoAhwgBGtBMG0iBEEBdCIGIAIgAiAGSRsgBEGq1aoVTxsiAkHWqtUqTw0BIAUgAkEwbCIKECMiBGoiBiAHKAIYNgIAIAYgBygCHDYCBCAHQgA3AhggBCAIQTBsaiICIAcoAiA2AgggAiAHKAIkNgIMIAIgBygCKDYCECAHQQA2AiggB0IANwIgIAIgBygCLDYCFCACIAcoAjA2AhggAiAHKAI0NgIcIAdBADYCNCAHQgA3AiwgAiAHKAI4NgIgIAIgBygCPDYCJCACIAcoAkA2AiggAiAHKAJENgIsIAdBADYCRCAHQgA3AjwgBCAKaiECIAZBMGohBCADKAIYIgUgAygCFCIIRg0CA0AgBkEwayIGIAVBMGsiBSgCADYCACAGIAUoAgQ2AgQgBUIANwIAIAYgBSgCCDYCCCAGIAUoAgw2AgwgBiAFKAIQNgIQIAVBADYCECAFQgA3AgggBiAFKAIUNgIUIAYgBSgCGDYCGCAGIAUoAhw2AhwgBUEANgIcIAVCADcCFCAGIAUoAiA2AiAgBiAFKAIkNgIkIAYgBSgCKDYCKCAGIAUoAiw2AiwgBUEANgIsIAVCADcCJCAFIAhHDQALIAMgAjYCHCADKAIYIQIgAyAENgIYIAMoAhQhBSADIAY2AhQgAiAFRg0DA0AgAkEwaxBjIgIgBUcNAAsMAwsMDgsQNQALIAMgAjYCHCADIAQ2AhggAyAGNgIUCyAFBEAgBRAiCwsgBygCDCICBEAgByACNgIQIAIQIgsgB0EYahBjGiANKAIEIg0gB0HUAGpHDQALCyAHQcgAaiAHKAJMEFwCQCAHKAJcRQ0AIAcoAlgiAigCACIDIAcoAlQoAgQiBDYCBCAEIAM2AgAgB0EANgJcIAIgB0HUAGpGDQADQCACIgMoAgQhAgJAIAMoAgwiBEUNACAEIAQoAgQiBUEBazYCBCAFDQAgBCAEKAIAKAIIEQAAIAQQJgsgAxAiIAIgB0HUAGpHDQALCyAHQeAAaiQAAn8gDygCJCICIA8oAigiA0sEQCACIANrDAELIA8oAiAgAiADa2oLBEAgDygCLCEhIBEpAhwhJiARQgA3AhwgISADQQN0aiIEKAIEIQIgBCAmNwIAAkAgAkUNACACIAIoAgQiBEEBazYCBCAEDQAgAiACKAIAKAIIEQAAIAIQJgsgDyAPKAI4IANBAWpxNgIoCwJAIBEoAiAiAkUNACACIAIoAgQiA0EBazYCBCADDQAgAiACKAIAKAIIEQAAIAIQJgtBASECDAILIAhBQGshBEEAIQYjAEHwAGsiCiQAQQghAwJAIAgtADhBA0cNACAELQAYQQRHDQAgCgJ/IAgrAyAiI5lEAAAAAAAA4EFjBEAgI6oMAQtBgICAgHgLIhM2AmQCQCAELAALQQBOBEAgCiAEKAIINgJgIAogBCkCADcDWAwBCyAKQdgAaiAEKAIAIAQoAgQQMgsCf0EBIA9BPGoiECAKQdgAahApRQ0AGiAPQdAAaiEMAkACQCAPKAJUIgNFDQAgDCgCAAJ/IANBAWsgE3EgA2kiBUEBTQ0AGiATIAMgE0sNABogEyADcAsiB0ECdGooAgAiBEUNACAEKAIAIgRFDQAgBUEBTQRAIANBAWshAwNAAkAgEyAEKAIEIgVHBEAgAyAFcSAHRw0EDAELIAQoAgggE0YNBAsgBCgCACIEDQALDAELA0ACQCATIAQoAgQiBUcEQCADIAVNBH8gBSADcAUgBQsgB0cNAwwBCyAEKAIIIBNGDQMLIAQoAgAiBA0ACwsgCiAKQdgAaiIDNgIIIApBKGohFCAKQQhqIRYgAygCBCADLQALIgQgBMBBAEgiBBsiByELIAMoAgAgAyAEGyIFIQ0CQCAHIgRBBEkNAAJ/IARBBGsiBEEEcQRAIAchAyAFDAELIAUoAABBldPH3gVsIgNBGHYgA3NBldPH3gVsIAdBldPH3gVscyELIAQhAyAFQQRqCyENIARBBEkNACADIQQDQCANKAAEQZXTx94FbCIDQRh2IANzQZXTx94FbCANKAAAQZXTx94FbCIDQRh2IANzQZXTx94FbCALQZXTx94FbHNBldPH3gVscyELIA1BCGohDSAEQQhrIgRBA0sNAAsLAkACQAJAAkAgBEEBaw4DAgEAAwsgDS0AAkEQdCALcyELCyANLQABQQh0IAtzIQsLIAsgDS0AAHNBldPH3gVsIQsLIAtBDXYgC3NBldPH3gVsIgNBD3YgA3MhCAJAAkAgECgCBCILRQ0AIBAoAgACfyAIIAtBAWtxIAtpIgNBAU0NABogCCAIIAtJDQAaIAggC3ALIgZBAnRqKAIAIgRFDQAgBCgCACINRQ0AIANBAU0EQCALQQFrIRcDQAJAIAggDSgCBCIDRwRAIAMgF3EgBkcNBAwBCyANKAIMIgMgDS0AEyISIBLAIhlBAEgiDhsgB0cNACANQQhqIQQgDkUEQEEAIQ4gBSEDIBlFDQUDQCAELQAAIAMtAABHDQIgA0EBaiEDIARBAWohBCASQQFrIhINAAsMBQsgBCgCACAFIAMQJw0AQQAhDgwECyANKAIAIg0NAAsMAQsDQAJAIAggDSgCBCIDRwRAIAMgC08EfyADIAtwBSADCyAGRw0DDAELIA0oAgwiAyANLQATIhIgEsAiF0EASCIOGyAHRw0AIA1BCGohBCAORQRAQQAhDiAFIQMgF0UNBANAIAQtAAAgAy0AAEcNAiADQQFqIQMgBEEBaiEEIBJBAWsiEg0ACwwECyAEKAIAIAUgAxAnDQBBACEODAMLIA0oAgAiDQ0ACwtBMBAjIg1BCGohBAJAIBYoAgAiAywAC0EATgRAIAQgAykCADcCACAEIAMoAgg2AggMAQsgBCADKAIAIAMoAgQQMgsgDSAINgIEIA1BADYCACANQQA2AiggECoCECEkIBAoAgxBAWqzISUCQCALBEAgJCALs5QgJV1FDQELAkACf0ECIAsgC0EBa3FBAEcgC0EDSXIgC0EBdHIiAwJ/ICUgJJWNIiRDAACAT10gJEMAAAAAYHEEQCAkqQwBC0EACyIEIAMgBEsbIgNBAUYNABogAyADIANBAWtxRQ0AGiADEEYLIgsgECgCBCIDTQRAIAMgC00NASADQQNJIQUCfyAQKAIMsyAQKgIQlY0iJEMAAIBPXSAkQwAAAABgcQRAICSpDAELQQALIQQgAyALAn8CQCAFDQAgA2lBAUsNACAEQQFBICAEQQFrZ2t0IARBAkkbDAELIAQQRgsiBCAEIAtJGyILTQ0BCyAQIAsQVQsgECgCBCILIAtBAWsiA3FFBEAgAyAIcSEGDAELIAggC0kEQCAIIQYMAQsgCCALcCEGCwJAAkAgECgCACAGQQJ0aiIDKAIAIgRFBEAgDSAQQQhqIgQoAgA2AgAgECANNgIIIAMgBDYCACANKAIAIgNFDQIgAygCBCEEAkAgCyALQQFrIgNxRQRAIAMgBHEhBAwBCyAEIAtJDQAgBCALcCEECyAQKAIAIARBAnRqIQQMAQsgDSAEKAIANgIACyAEIA02AgALQQEhDiAQIBAoAgxBAWo2AgwLIBQgDjoABCAUIA02AgAgCigCKCEiIA8oApgBIQQgDysDkAEhIyAKIBM2AgggCiAjOQMoIAogBDYCaCAiKAIoIgMEQCAKQdAAaiADIBYgFCAKQegAaiADKAIAKAIYEQUAIAogCigCUDYCCCAKIAooAlQiAzYCDCADBEAgAyADKAIEQQFqNgIECyAKQgA3AiAgCkIANwIYIApCADcCEEEAIQMCfyAKQShqIgQgCigCZDYCACAEIAooAgg2AgQgBCAKKAIMIgU2AgggBQRAIAUgBSgCBEEBajYCBAsgBEEANgIUIARCADcCDCAKKAIUIgUgCigCECIGRwRAIAUgBmsiBUEASA0NIAQgBRAjIgc2AhAgBCAHNgIMIAQgBSAHaiIINgIUIAcgBiAFEC8aIAQgCDYCEAsgBEEANgIgIARCADcCGAJAIAooAiAiBSAKKAIcIgZHBEAgBSAGayIFQQBIDQEgBCAFECMiBzYCHCAEIAc2AhggBCAFIAdqIgg2AiAgByAGIAUQLxogBCAINgIcCyAEDAELDAwLIggoAgAhBCAKAn8CQCAMKAIEIgZFDQAgDCgCAAJ/IAZBAWsgBHEgBmkiB0EBTQ0AGiAEIAQgBkkNABogBCAGcAsiA0ECdGooAgAiBUUNACAFKAIAIgVFDQAgB0EBTQRAIAZBAWshBwNAAkAgBCAFKAIEIgtHBEAgByALcSADRw0EDAELIAUoAgggBEcNAEEADAQLIAUoAgAiBQ0ACwwBCwNAAkAgBCAFKAIEIgdHBEAgBiAHTQR/IAcgBnAFIAcLIANHDQMMAQsgBSgCCCAERw0AQQAMAwsgBSgCACIFDQALC0EsECMiBSAIKAIANgIIIAUgCCgCBDYCDCAFIAgoAgg2AhAgCEIANwIEIAUgCCgCDDYCFCAFIAgoAhA2AhggBSAIKAIUNgIcIAhBADYCFCAIQgA3AgwgBSAIKAIYNgIgIAUgCCgCHDYCJCAFIAgoAiA2AiggCEEANgIgIAhCADcCGCAFQQA2AgAgBSAENgIEIAwqAhAhJCAMKAIMQQFqsyElAkAgBgRAICQgBrOUICVdRQ0BC0ECIQMCQCAGIAZBAWtxQQBHIAZBA0lyIAZBAXRyIgcCfyAlICSVjSIkQwAAgE9dICRDAAAAAGBxBEAgJKkMAQtBAAsiCyAHIAtLGyIHQQFGDQAgByAHQQFrcUUEQCAHIQMMAQsgBxBGIQMgDCgCBCEGCwJAIAMgBk0EQCADIAZPDQEgBkEDSSELAn8gDCgCDLMgDCoCEJWNIiRDAACAT10gJEMAAAAAYHEEQCAkqQwBC0EACyEHIAMCfwJAIAsNACAGaUEBSw0AIAdBAUEgIAdBAWtna3QgB0ECSRsMAQsgBxBGCyIHIAMgB0sbIgMgBk8NAQsgDCADEFULIAwoAgQiBiAGQQFrIgNxRQRAIAMgBHEhAwwBCyAEIAZJBEAgBCEDDAELIAQgBnAhAwsCQAJAIAwoAgAgA0ECdGoiBCgCACIDRQRAIAUgDEEIaiIDKAIANgIAIAwgBTYCCCAEIAM2AgAgBSgCACIDRQ0CIAMoAgQhAwJAIAYgBkEBayIEcUUEQCADIARxIQMMAQsgAyAGSQ0AIAMgBnAhAwsgDCgCACADQQJ0aiEDDAELIAUgAygCADYCAAsgAyAFNgIACyAMIAwoAgxBAWo2AgxBAQs6AGwgCiAFNgJoIAgoAhgiAwRAIAggAzYCHCADECILIAgoAgwiAwRAIAggAzYCECADECILAkAgCCgCCCIDRQ0AIAMgAygCBCIEQQFrNgIEIAQNACADIAMoAgAoAggRAAAgAxAmCyAKKAIcIgMEQCAKIAM2AiAgAxAiCyAKKAIQIgMEQCAKIAM2AhQgAxAiCwJAIAooAgwiA0UNACADIAMoAgQiBEEBazYCBCAEDQAgAyADKAIAKAIIEQAAIAMQJgsCQCAKKAJUIgNFDQAgAyADKAIEIgRBAWs2AgQgBA0AIAMgAygCACgCCBEAACADECYLQQAMAgsQRQALQQMLIQMgCiwAY0EATg0AIAooAlgQIgsgCkHwAGokACADIQQLIAQNAwsgFUEgaiIVIBhHDQALC0EAIQQLIBFBQGskACAJQUBrQQI6AAAgCUEHOgAjIAlBmQwoAAA2AhggCUGcDCgAADYAGyAJIARFOgAoIAlBADoAHyAJQQxqIQICfwJAAkACQAJAAkACQAJAAkACQAJAIAQOCQABAgMEBQYHCAkLIAJBz9YBOwEAIAJBAjoACyACQQJqDAkLIAJBIBAjIgM2AgAgAkKYgICAgISAgIB/NwIEIANBkBQpAAA3ABAgA0GIFCkAADcACCADQYAUKQAANwAAIANBGGoMCAsgAkEQECMiAzYCACACQo6AgICAgoCAgH83AgQgA0HiEykAADcABiADQdwTKQAANwAAIANBDmoMBwsgAkEwECMiAzYCACACQq+AgICAhoCAgH83AgQgA0H0CykAADcAJyADQe0LKQAANwAgIANB5QspAAA3ABggA0HdCykAADcAECADQdULKQAANwAIIANBzQspAAA3AAAgA0EvagwGCyACQcAAECMiAzYCACACQrSAgICAiICAgH83AgQgA0HICygAADYAMCADQcALKQAANwAoIANBuAspAAA3ACAgA0GwCykAADcAGCADQagLKQAANwAQIANBoAspAAA3AAggA0GYCykAADcAACADQTRqDAULIAJBMBAjIgM2AgAgAkKugICAgIaAgIB/NwIEIANB0AgpAAA3ACYgA0HKCCkAADcAICADQcIIKQAANwAYIANBuggpAAA3ABAgA0GyCCkAADcACCADQaoIKQAANwAAIANBLmoMBAsgAkEwECMiAzYCACACQqmAgICAhoCAgH83AgQgA0GoCC0AADoAKCADQaAIKQAANwAgIANBmAgpAAA3ABggA0GQCCkAADcAECADQYgIKQAANwAIIANBgAgpAAA3AAAgA0EpagwDCyACQSAQIyIDNgIAIAJCk4CAgICEgICAfzcCBCADQd8OKAAANgAPIANB2A4pAAA3AAggA0HQDikAADcAACADQRNqDAILIAJBIBAjIgM2AgAgAkKagICAgISAgIB/NwIEIANB/QovAAA7ABggA0H1CikAADcAECADQe0KKQAANwAIIANB5QopAAA3AAAgA0EaagwBCyACQSAQIyIDNgIAIAJCmoCAgICEgICAfzcCBCADQbEULwAAOwAYIANBqRQpAAA3ABAgA0GhFCkAADcACCADQZkUKQAANwAAIANBGmoLQQA6AAAgCUHYEigAADYASyAJQQc6AFMgCUEAOgBPIAlB1RIoAAA2AkggCUHYAGohAiAJQcgAaiEDAkAgCSwAF0EATgRAIAIgCSkCDDcCACACIAkoAhQ2AggMAQsgAiAJKAIMIAkoAhAQMgsgCUEEOgBwIAlCADcCgAEgCSAJQYABaiIE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QX82AhQgAyAANgIQIAMgATYCCCABIANBCGogAigCAEEBIAEoAgAoAhwRBwAgAygCICIAQQFGBEAgAiADKAIYNgIACyAAQQFGCyEEIANBQGskACAEC2EBAX8jAEEQayIDJAAgASgCBCABKAIwQQxsaiACQQxsaiIBKAIEIQIgAyABKAIAIgE2AgwgAyACIAFrQQN1NgIIIABBxOMCIANBCGoQAjYCBCAAQeiHBDYCACADQRBqJAALC9z7A4cBAEGACAuSGEludmFsaWQgdmFsdWUgZm9yIHRoZSBnaXZlbiBub2RlIHByb3BlcnR5AEludmFsaWQgdmFsdWUgdHlwZSBmb3IgdGhlIGdpdmVuIG5vZGUgcHJvcGVydHkAZW1pdEV2ZXJ5AGJ1ZmZlciBtdXN0IGJlIGFuIEFycmF5PEZsb2F0MzJBcnJheT4gb3IgYSBGbG9hdDMyQXJyYXkAc2RlbGF5AG1heAByb3cAcG93AGZvbGxvdwBfX25leHRfcHJpbWUgb3ZlcmZsb3cAc3RhcnRSb3cAYmxlcHNhdwBlbnYAZGl2AHRlc3RPdXQAdGFwT3V0AGNvbnN0AHVuc2lnbmVkIHNob3J0AHNsb3QAdW5zaWduZWQgaW50AGV2ZW50AGJhbmRsaW1pdABzaGlmdABmZnQAb2Zmc2V0AHN0YXJ0T2Zmc2V0AHN0b3BPZmZzZXQAcmVzZXQAT2JqZWN0AGZsb2F0AEludmFsaWQgaW5zdHJ1Y3Rpb24gZm9ybWF0AHVpbnQ2NF90AGtleXMAdG90YWxSb3dzAEF0dGVtcHRpbmcgdG8gY3JlYXRlIGEgbm9kZSB0eXBlIHRoYXQgYWxyZWFkeSBleGlzdHMAQXR0ZW1wdGluZyB0byBjcmVhdGUgYSBub2RlIHRoYXQgYWxyZWFkeSBleGlzdHMAcHJvY2Vzc1F1ZXVlZEV2ZW50cwBwcm9jZXNzAHN1Y2Nlc3MAYmFkX3ZhcmlhbnRfYWNjZXNzAGxvd3Bhc3MAYWxscGFzcwBjb3MAdmFsdWVzAGdhdGVzAGxpc3RTaGFyZWRSZXNvdXJjZXMAcHJ1bmVTaGFyZWRSZXNvdXJjZXMAYWJzAGZhZGVPdXRNcwBzZXRDdXJyZW50VGltZU1zAHZlY3RvcgBFbGVtZW50YXJ5QXVkaW9Qcm9jZXNzb3IAc3BoYXNvcgBmbG9vcgBjb3VudGVyAG1ldGVyAHRyaWdnZXIAdW5zaWduZWQgY2hhcgBsaXZlQ2xlYXIAdHhzZXEAc3BhcnNlcQBtYy5zYW1wbGVzZXEAbGVxAGdlcQBleHAAcHJld2FycABzdG9wAGxvb3AAbWV0cm8Ac3RkOjpleGNlcHRpb24ARnVuY3Rpb24ASW52YXJpYW50IHZpb2xhdGlvbgBzaW4AbWluAF9pbnRlcm5hbDpudW1DaGlsZHJlbgB0YW4AdGFwSW4AYWNjdW0AYXJtAGZyb20AL2Rldi91cmFuZG9tAG11bABib29sAHN0ZDo6YmFkX2Z1bmN0aW9uX2NhbGwAY2hhbm5lbAB0aWNrSW50ZXJ2YWwAcmVhbABPawBiYWRfYXJyYXlfbmV3X2xlbmd0aABhc2luaABub3RjaABzdHJldGNoAGxhdGNoAE1hbGZvcm1lZCBtZXNzYWdlIGJhdGNoAHBvc3RNZXNzYWdlQmF0Y2gAbG9nAHVuc2lnbmVkIGxvbmcAc3RkOjp3c3RyaW5nAGJhc2ljX3N0cmluZwBzdGQ6OnN0cmluZwBzdGQ6OnUxNnN0cmluZwBzdGQ6OnUzMnN0cmluZwBpbWFnAHN2ZgBoaWdoc2hlbGYAYWN0aXZlAGxpdmUAdmFsdWUAaW50ZXJwb2xhdGUAdXBkYXRlAHBsYXliYWNrUmF0ZQBtYy5jYXB0dXJlAGJsZXBzcXVhcmUAcHJlcGFyZQBuYW1lIG11c3QgYmUgYSBzdHJpbmcgdHlwZQBzY29wZQBzaGFwZQBzZXRDdXJyZW50VGltZQBuYW1lAG1jLnNhbXBsZQBibGVwdHJpYW5nbGUAZG91YmxlAHRhYmxlAG1lc3NhZ2UAY2Fubm90IG92ZXJ3cml0ZSBleGlzdGluZyBzaGFyZWQgcmVzb3VyY2UAYWRkU2hhcmVkUmVzb3VyY2UAbW9kAHJvdW5kAHVub3JkZXJlZF9tYXA6OmF0OiBrZXkgbm90IGZvdW5kAG1hcDo6YXQ6ICBrZXkgbm90IGZvdW5kAE5vZGUgbm90IGZvdW5kAGFuZABjbWQAbWF4aG9sZAB2b2lkAE5vZGUgdHlwZSBub3QgcmVjb2duaXplZABSZXR1cm4gY29kZSBub3QgcmVjb2duaXplZAByYW5kb21fZGV2aWNlIGdldGVudHJvcHkgZmFpbGVkAG11dGV4IGxvY2sgZmFpbGVkAGFkZABiaXF1YWQAc2Vzc2lvbklkAHd0b3NjAHN0ZDo6YmFkX2FsbG9jAHBhbmljAGdjAHJvd3NQZXJTZWMAc3ViAGRhdGEAZ2V0T3V0cHV0QnVmZmVyRGF0YQBnZXRJbnB1dEJ1ZmZlckRhdGEAZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8c2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8ZmxvYXQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDhfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDE2X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDE2X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQ2NF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ2NF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8Y2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgY2hhcj4Ac3RkOjpiYXNpY19zdHJpbmc8dW5zaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8c2lnbmVkIGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGxvbmc+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGxvbmc+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGRvdWJsZT4AbWMuc2FtcGxlc2VxMgBQdXJlIHZpcnR1YWwgZnVuY3Rpb24gY2FsbGVkIQByYW5kb20gZGV2aWNlIG5vdCBzdXBwb3J0ZWQgADI0RWxlbWVudGFyeUF1ZGlvUHJvY2Vzc29yAADcAAEAwA0AAFAyNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcgC8AQEA5A0AAAAAAADcDQAAUEsyNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcgAAAAC8AQEAEA4AAAEAAADcDQAAaWkAdgB2aQAADgAAeAABAHgAAQBpaWlpAAAAAAAAAAAYAAEAAA4AAMwAAQCEAAEAdmlpZGkAAAAAAAAA6A4AAFAAAABRAAAAUgAAAFMAAABUAAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTlHcmFwaFJlbmRlclNlcXVlbmNlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAABAEBAJQOAABE/gAAAAAAAAgQAABVAAAAVgAAAFcAAABYAAAAWQAAAFoAAABbAAAAXAAAAF0AAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzEySWRlbnRpdHlOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUATlN0M19fMjEwX19mdW5jdGlvbjZfX2Jhc2VJRk5TXzEwc2hhcmVkX3B0cklONGVsZW05R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAAANwAAQC0DwAABAEBACAPAAAAEABBnCAL+/MCgBAAAF4AAABfAAAAYAAAAFMAAABhAAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTJJZGVudGl0eU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAQBAQA0EAAARP4AAAAAAADoEAAAYgAAAGMAAABkAAAAZQAAAGYAAABnAAAAaAAAAE40ZWxlbTEySWRlbnRpdHlOb2RlSWRFRQBONGVsZW05R3JhcGhOb2RlSWRFRQAAANwAAQDJEAAABAEBALAQAADgEAAAAAAAAOAQAABiAAAAaQAAAGoAAABlAAAAawAAAGcAAABoAAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzEySWRlbnRpdHlOb2RlSWRFRUVFAAAA3AABABgRAAAAAAAAMBIAAFUAAABsAAAAbQAAAG4AAABvAAAAcAAAAHEAAAByAAAAcwAAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjNzaW5FRUVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAAAQBAQCIEQAAABAAAAAAAAC4EgAAdAAAAHUAAAB2AAAAUwAAAHcAAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM3NpbkVFRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAAEAQEAWBIAAET+AAAAAAAAFBMAAGIAAAB4AAAAagAAAGUAAAB5AAAAZwAAAGgAAABONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM3NpbkVFRUUAAAQBAQDoEgAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM3NpbkVFRUVFRQDcAAEAIBMAAAAAAABIFAAAVQAAAHoAAAB7AAAAfAAAAH0AAAB+AAAAfwAAAIAAAACBAAAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM2Nvc0VFRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAABAEBAKATAAAAEAAAAAAAANAUAACCAAAAgwAAAIQAAABTAAAAhQAAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozY29zRUVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAAAAQBAQBwFAAARP4AAAAAAAAsFQAAYgAAAIYAAABqAAAAZQAAAIcAAABnAAAAaAAAAE40ZWxlbTE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozY29zRUVFRQAABAEBAAAVAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozY29zRUVFRUVFANwAAQA4FQAAAAAAAGAWAABVAAAAiAAAAIkAAACKAAAAiwAAAIwAAACNAAAAjgAAAI8AAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozdGFuRUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAAEAQEAuBUAAAAQAAAAAAAA6BYAAJAAAACRAAAAkgAAAFMAAACTAAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjN0YW5FRUVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAABAEBAIgWAABE/gAAAAAAAEQXAABiAAAAlAAAAGoAAABlAAAAlQAAAGcAAABoAAAATjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjN0YW5FRUVFAAAEAQEAGBcAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjN0YW5FRUVFRUUA3AABAFAXAAAAAAAAeBgAAFUAAACWAAAAlwAAAJgAAACZAAAAmgAAAJsAAACcAAAAnQAAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjR0YW5oRUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAQBAQDQFwAAABAAAAAAAAAAGQAAngAAAJ8AAACgAAAAUwAAAKEAAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNHRhbmhFRUVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAEAQEAoBgAAET+AAAAAAAAXBkAAGIAAACiAAAAagAAAGUAAACjAAAAZwAAAGgAAABONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNHRhbmhFRUVFAAQBAQAwGQAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNHRhbmhFRUVFRUUAAAAA3AABAGgZAAAAAAAAlBoAAFUAAACkAAAApQAAAKYAAACnAAAAqAAAAKkAAACqAAAAqwAAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjVhc2luaEVFRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAQBAQDsGQAAABAAAAAAAAAcGwAArAAAAK0AAACuAAAAUwAAAK8AAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNWFzaW5oRUVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAEAQEAvBoAAET+AAAAAAAAfBsAAGIAAACwAAAAagAAAGUAAACxAAAAZwAAAGgAAABONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNWFzaW5oRUVFRQAAAAAEAQEATBsAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjVhc2luaEVFRUVFRQAAANwAAQCIGwAAAAAAALQcAABVAAAAsgAAALMAAAC0AAAAtQAAALYAAAC3AAAAuAAAALkAAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozbG9nRUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAAEAQEADBwAAAAQAAAAAAAAPB0AALoAAAC7AAAAvAAAAFMAAAC9AAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjNsb2dFRUVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAABAEBANwcAABE/gAAAAAAAJgdAABiAAAAvgAAAGoAAABlAAAAvwAAAGcAAABoAAAATjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjNsb2dFRUVFAAAEAQEAbB0AAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjNsb2dFRUVFRUUA3AABAKQdAAAAAAAAzB4AAFUAAADAAAAAwQAAAMIAAADDAAAAxAAAAMUAAADGAAAAxwAAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjVsb2cxMEVFRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAQBAQAkHgAAABAAAAAAAABUHwAAyAAAAMkAAADKAAAAUwAAAMsAAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNWxvZzEwRUVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAEAQEA9B4AAET+AAAAAAAAtB8AAGIAAADMAAAAagAAAGUAAADNAAAAZwAAAGgAAABONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNWxvZzEwRUVFRQAAAAAEAQEAhB8AAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjVsb2cxMEVFRUVFRQAAANwAAQDAHwAAAAAAAOwgAABVAAAAzgAAAM8AAADQAAAA0QAAANIAAADTAAAA1AAAANUAAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1o0bG9nMkVFRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAEAQEARCAAAAAQAAAAAAAAdCEAANYAAADXAAAA2AAAAFMAAADZAAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjRsb2cyRUVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAABAEBABQhAABE/gAAAAAAANAhAABiAAAA2gAAAGoAAABlAAAA2wAAAGcAAABoAAAATjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjRsb2cyRUVFRQAEAQEApCEAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjRsb2cyRUVFRUVFAAAAANwAAQDcIQAAAAAAAAgjAABVAAAA3AAAAN0AAADeAAAA3wAAAOAAAADhAAAA4gAAAOMAAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1o0Y2VpbEVFRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAEAQEAYCIAAAAQAAAAAAAAkCMAAOQAAADlAAAA5gAAAFMAAADnAAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjRjZWlsRUVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAABAEBADAjAABE/gAAAAAAAOwjAABiAAAA6AAAAGoAAABlAAAA6QAAAGcAAABoAAAATjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjRjZWlsRUVFRQAEAQEAwCMAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjRjZWlsRUVFRUVFAAAAANwAAQD4IwAAAAAAACQlAABVAAAA6gAAAOsAAADsAAAA7QAAAO4AAADvAAAA8AAAAPEAAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1o1Zmxvb3JFRUVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAEAQEAfCQAAAAQAAAAAAAArCUAAPIAAADzAAAA9AAAAFMAAAD1AAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjVmbG9vckVFRUVOU185YWxsb2NhdG9ySVMzX0VFRUUABAEBAEwlAABE/gAAAAAAAAwmAABiAAAA9gAAAGoAAABlAAAA9wAAAGcAAABoAAAATjRlbGVtMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjVmbG9vckVFRUUAAAAABAEBANwlAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1o1Zmxvb3JFRUVFRUUAAADcAAEAGCYAAAAAAABEJwAAVQAAAPgAAAD5AAAA+gAAAPsAAAD8AAAA/QAAAP4AAAD/AAAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNXJvdW5kRUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUABAEBAJwmAAAAEAAAAAAAAMwnAAAAAQAAAQEAAAIBAABTAAAAAwEAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1o1cm91bmRFRUVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAQBAQBsJwAARP4AAAAAAAAsKAAAYgAAAAQBAABqAAAAZQAAAAUBAABnAAAAaAAAAE40ZWxlbTE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1o1cm91bmRFRUVFAAAAAAQBAQD8JwAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNXJvdW5kRUVFRUVFAAAA3AABADgoAAAAAAAAZCkAAFUAAAAGAQAABwEAAAgBAAAJAQAACgEAAAsBAAAMAQAADQEAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjRzcXJ0RUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAQBAQC8KAAAABAAAAAAAADsKQAADgEAAA8BAAAQAQAAUwAAABEBAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNHNxcnRFRUVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAEAQEAjCkAAET+AAAAAAAASCoAAGIAAAASAQAAagAAAGUAAAATAQAAZwAAAGgAAABONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNHNxcnRFRUVFAAQBAQAcKgAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aNHNxcnRFRUVFRUUAAAAA3AABAFQqAAAAAAAAgCsAAFUAAAAUAQAAFQEAABYBAAAXAQAAGAEAABkBAAAaAQAAGwEAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMThVbmFyeU9wZXJhdGlvbk5vZGVJZFhhZExfWjNleHBFRUVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAAAQBAQDYKgAAABAAAAAAAAAILAAAHAEAAB0BAAAeAQAAUwAAAB8BAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM2V4cEVFRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAAEAQEAqCsAAET+AAAAAAAAZCwAAGIAAAAgAQAAagAAAGUAAAAhAQAAZwAAAGgAAABONGVsZW0xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM2V4cEVFRUUAAAQBAQA4LAAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM2V4cEVFRUVFRQDcAAEAcCwAAAAAAACkLQAAVQAAACIBAAAjAQAAJAEAACUBAAAmAQAAJwEAACgBAAApAQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOFVuYXJ5T3BlcmF0aW9uTm9kZUlkWGFkTF9aM2Fic0I4dWUxNzAwMDRkRUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAAABAEBAPAsAAAAEAAAAAAAADguAAAqAQAAKwEAACwBAABTAAAALQEAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozYWJzQjh1ZTE3MDAwNGRFRUVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAAAAQBAQDMLQAARP4AAAAAAACgLgAAYgAAAC4BAABqAAAAZQAAAC8BAABnAAAAaAAAAE40ZWxlbTE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozYWJzQjh1ZTE3MDAwNGRFRUVFAAAABAEBAGguAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE4VW5hcnlPcGVyYXRpb25Ob2RlSWRYYWRMX1ozYWJzQjh1ZTE3MDAwNGRFRUVFRUUAANwAAQCsLgAAAAAAAOAvAABVAAAAMAEAADEBAAAyAQAAMwEAADQBAAA1AQAANgEAADcBAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlNfNGxlc3NJZEVFRUVFRU5TXzlhbGxvY2F0b3JJUzlfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAEAQEAOC8AAAAQAAAAAAAAaDAAADgBAAA5AQAAOgEAAFMAAAA7AQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU180bGVzc0lkRUVFRU5TXzlhbGxvY2F0b3JJUzVfRUVFRQAABAEBAAgwAABE/gAAAAAAAMgwAABiAAAAPAEAAGoAAABlAAAAPQEAAGcAAABoAAAATjRlbGVtMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU3QzX18yNGxlc3NJZEVFRUUABAEBAJgwAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlN0M19fMjRsZXNzSWRFRUVFRUUAAAAA3AABANQwAAAAAAAADDIAAFUAAAA+AQAAPwEAAEABAABBAQAAQgEAAEMBAABEAQAARQEAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU18xMGxlc3NfZXF1YWxJZEVFRUVFRU5TXzlhbGxvY2F0b3JJUzlfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAABAEBAFwxAAAAEAAAAAAAAJwyAABGAQAARwEAAEgBAABTAAAASQEAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlNfMTBsZXNzX2VxdWFsSWRFRUVFTlNfOWFsbG9jYXRvcklTNV9FRUVFAAAABAEBADQyAABE/gAAAAAAAAQzAABiAAAASgEAAGoAAABlAAAASwEAAGcAAABoAAAATjRlbGVtMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU3QzX18yMTBsZXNzX2VxdWFsSWRFRUVFAAAEAQEAzDIAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU3QzX18yMTBsZXNzX2VxdWFsSWRFRUVFRUUA3AABABAzAAAAAAAASDQAAFUAAABMAQAATQEAAE4BAABPAQAAUAEAAFEBAABSAQAAUwEAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU183Z3JlYXRlcklkRUVFRUVFTlNfOWFsbG9jYXRvcklTOV9FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAAEAQEAnDMAAAAQAAAAAAAA1DQAAFQBAABVAQAAVgEAAFMAAABXAQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU183Z3JlYXRlcklkRUVFRU5TXzlhbGxvY2F0b3JJUzVfRUVFRQAAAAQBAQBwNAAARP4AAAAAAAA4NQAAYgAAAFgBAABqAAAAZQAAAFkBAABnAAAAaAAAAE40ZWxlbTE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlN0M19fMjdncmVhdGVySWRFRUVFAAAEAQEABDUAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROU3QzX18yN2dyZWF0ZXJJZEVFRUVFRQDcAAEARDUAAAAAAACANgAAVQAAAFoBAABbAQAAXAEAAF0BAABeAQAAXwEAAGABAABhAQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TXzEzZ3JlYXRlcl9lcXVhbElkRUVFRUVFTlNfOWFsbG9jYXRvcklTOV9FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAAABAEBAMw1AAAAEAAAAAAAABQ3AABiAQAAYwEAAGQBAABTAAAAZQEAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlNfMTNncmVhdGVyX2VxdWFsSWRFRUVFTlNfOWFsbG9jYXRvcklTNV9FRUVFAAAAAAQBAQCoNgAARP4AAAAAAACANwAAYgAAAGYBAABqAAAAZQAAAGcBAABnAAAAaAAAAE40ZWxlbTE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlN0M19fMjEzZ3JlYXRlcl9lcXVhbElkRUVFRQAAAAQBAQBENwAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TdDNfXzIxM2dyZWF0ZXJfZXF1YWxJZEVFRUVFRQAA3AABAIw3AAAAAAAAyDgAAFUAAABoAQAAaQEAAGoBAABrAQAAbAEAAG0BAABuAQAAbwEAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROUzJfN1NhZmVQb3dJZEVFRUVFRU5TXzlhbGxvY2F0b3JJUzlfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAEAQEAHDgAAAAQAAAAAAAAVDkAAHABAABxAQAAcgEAAFMAAABzAQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROUzFfN1NhZmVQb3dJZEVFRUVOU185YWxsb2NhdG9ySVM1X0VFRUUAAAQBAQDwOAAARP4AAAAAAAC0OQAAYgAAAHQBAABqAAAAZQAAAHUBAABnAAAAaAAAAE40ZWxlbTE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlNfN1NhZmVQb3dJZEVFRUUAAAQBAQCEOQAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TXzdTYWZlUG93SWRFRUVFRUUA3AABAMA5AAAAAAAA7DoAAFUAAAB2AQAAdwEAAHgBAAB5AQAAegEAAHsBAAB8AQAAfQEAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROUzJfMkVxSWRFRUVFRUVOU185YWxsb2NhdG9ySVM5X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAAAQBAQBEOgAAABAAAAAAAAB0OwAAfgEAAH8BAACAAQAAUwAAAIEBAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TMV8yRXFJZEVFRUVOU185YWxsb2NhdG9ySVM1X0VFRUUAAAAEAQEAFDsAAET+AAAAAAAA0DsAAGIAAACCAQAAagAAAGUAAACDAQAAZwAAAGgAAABONGVsZW0xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TXzJFcUlkRUVFRQAAAAQBAQCkOwAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TXzJFcUlkRUVFRUVFAADcAAEA3DsAAAAAAAAMPQAAVQAAAIQBAACFAQAAhgEAAIcBAACIAQAAiQEAAIoBAACLAQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TMl85QmluYXJ5QW5kSWRFRUVFRUVOU185YWxsb2NhdG9ySVM5X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAAAAEAQEAXDwAAAAQAAAAAAAAnD0AAIwBAACNAQAAjgEAAFMAAACPAQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROUzFfOUJpbmFyeUFuZElkRUVFRU5TXzlhbGxvY2F0b3JJUzVfRUVFRQAAAAAEAQEAND0AAET+AAAAAAAAAD4AAGIAAACQAQAAagAAAGUAAACRAQAAZwAAAGgAAABONGVsZW0xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TXzlCaW5hcnlBbmRJZEVFRUUAAAAABAEBAMw9AADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlNfOUJpbmFyeUFuZElkRUVFRUVFAAAA3AABAAw+AAAAAAAAQD8AAFUAAACSAQAAkwEAAJQBAACVAQAAlgEAAJcBAACYAQAAmQEAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROUzJfOEJpbmFyeU9ySWRFRUVFRUVOU185YWxsb2NhdG9ySVM5X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAEAQEAlD4AAAAQAAAAAAAAzD8AAJoBAACbAQAAnAEAAFMAAACdAQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTlCaW5hcnlPcGVyYXRpb25Ob2RlSWROUzFfOEJpbmFyeU9ySWRFRUVFTlNfOWFsbG9jYXRvcklTNV9FRUVFAAQBAQBoPwAARP4AAAAAAAAsQAAAYgAAAJ4BAABqAAAAZQAAAJ8BAABnAAAAaAAAAE40ZWxlbTE5QmluYXJ5T3BlcmF0aW9uTm9kZUlkTlNfOEJpbmFyeU9ySWRFRUVFAAQBAQD8PwAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOUJpbmFyeU9wZXJhdGlvbk5vZGVJZE5TXzhCaW5hcnlPcklkRUVFRUVFAAAAANwAAQA4QAAAAAAAAGhBAABVAAAAoAEAAKEBAACiAQAAowEAAKQBAAClAQAApgEAAKcBAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU180cGx1c0lkRUVFRUVFTlNfOWFsbG9jYXRvcklTOV9FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAAEAQEAwEAAAAAQAAAAAAAA8EEAAKgBAACpAQAAqgEAAFMAAACrAQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMThCaW5hcnlSZWR1Y2luZ05vZGVJZE5TXzRwbHVzSWRFRUVFTlNfOWFsbG9jYXRvcklTNV9FRUVFAAAABAEBAJBBAABE/gAAAAAAAFBCAABiAAAArAEAAGoAAABlAAAArQEAAGcAAABoAAAATjRlbGVtMThCaW5hcnlSZWR1Y2luZ05vZGVJZE5TdDNfXzI0cGx1c0lkRUVFRQAABAEBACBCAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU3QzX18yNHBsdXNJZEVFRUVFRQDcAAEAXEIAAAAAAACIQwAAVQAAAK4BAACvAQAAsAEAALEBAACyAQAAswEAALQBAAC1AQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOEJpbmFyeVJlZHVjaW5nTm9kZUlkTlNfNW1pbnVzSWRFRUVFRUVOU185YWxsb2NhdG9ySVM5X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAABAEBAOBCAAAAEAAAAAAAABBEAAC2AQAAtwEAALgBAABTAAAAuQEAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU181bWludXNJZEVFRUVOU185YWxsb2NhdG9ySVM1X0VFRUUAAAQBAQCwQwAARP4AAAAAAABwRAAAYgAAALoBAABqAAAAZQAAALsBAABnAAAAaAAAAE40ZWxlbTE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU3QzX18yNW1pbnVzSWRFRUVFAAQBAQBARAAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOEJpbmFyeVJlZHVjaW5nTm9kZUlkTlN0M19fMjVtaW51c0lkRUVFRUVFAAAAANwAAQB8RAAAAAAAALRFAABVAAAAvAEAAL0BAAC+AQAAvwEAAMABAADBAQAAwgEAAMMBAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU18xMG11bHRpcGxpZXNJZEVFRUVFRU5TXzlhbGxvY2F0b3JJUzlfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAAAAQBAQAERQAAABAAAAAAAABERgAAxAEAAMUBAADGAQAAUwAAAMcBAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOEJpbmFyeVJlZHVjaW5nTm9kZUlkTlNfMTBtdWx0aXBsaWVzSWRFRUVFTlNfOWFsbG9jYXRvcklTNV9FRUVFAAAAAAQBAQDcRQAARP4AAAAAAACsRgAAYgAAAMgBAABqAAAAZQAAAMkBAABnAAAAaAAAAE40ZWxlbTE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU3QzX18yMTBtdWx0aXBsaWVzSWRFRUVFAAAABAEBAHRGAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU3QzX18yMTBtdWx0aXBsaWVzSWRFRUVFRUUAANwAAQC4RgAAAAAAAPRHAABVAAAAygEAAMsBAADMAQAAzQEAAM4BAADPAQAA0AEAANEBAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROUzJfMTFTYWZlRGl2aWRlc0lkRUVFRUVFTlNfOWFsbG9jYXRvcklTOV9FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAQBAQBERwAAABAAAAAAAACESAAA0gEAANMBAADUAQAAUwAAANUBAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOEJpbmFyeVJlZHVjaW5nTm9kZUlkTlMxXzExU2FmZURpdmlkZXNJZEVFRUVOU185YWxsb2NhdG9ySVM1X0VFRUUAAAQBAQAcSAAARP4AAAAAAADoSAAAYgAAANYBAABqAAAAZQAAANcBAABnAAAAaAAAAE40ZWxlbTE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU18xMVNhZmVEaXZpZGVzSWRFRUVFAAAEAQEAtEgAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThCaW5hcnlSZWR1Y2luZ05vZGVJZE5TXzExU2FmZURpdmlkZXNJZEVFRUVFRQDcAAEA9EgAAAAAAAAoSgAAVQAAANgBAADZAQAA2gEAANsBAADcAQAA3QEAAN4BAADfAQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOEJpbmFyeVJlZHVjaW5nTm9kZUlkTlMyXzdNb2R1bHVzSWRFRUVFRUVOU185YWxsb2NhdG9ySVM5X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAAAQBAQB8SQAAABAAAAAAAAC0SgAA4AEAAOEBAADiAQAAUwAAAOMBAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOEJpbmFyeVJlZHVjaW5nTm9kZUlkTlMxXzdNb2R1bHVzSWRFRUVFTlNfOWFsbG9jYXRvcklTNV9FRUVFAAAABAEBAFBKAABE/gAAAAAAABRLAABiAAAA5AEAAGoAAABlAAAA5QEAAGcAAABoAAAATjRlbGVtMThCaW5hcnlSZWR1Y2luZ05vZGVJZE5TXzdNb2R1bHVzSWRFRUVFAAAABAEBAORKAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU183TW9kdWx1c0lkRUVFRUVFAADcAAEAIEsAAAAAAABMTAAAVQAAAOYBAADnAQAA6AEAAOkBAADqAQAA6wEAAOwBAADtAQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOEJpbmFyeVJlZHVjaW5nTm9kZUlkTlMyXzNNaW5JZEVFRUVFRU5TXzlhbGxvY2F0b3JJUzlfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAABAEBAKRLAAAAEAAAAAAAANRMAADuAQAA7wEAAPABAABTAAAA8QEAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE4QmluYXJ5UmVkdWNpbmdOb2RlSWROUzFfM01pbklkRUVFRU5TXzlhbGxvY2F0b3JJUzVfRUVFRQAAAAQBAQB0TAAARP4AAAAAAAAwTQAAYgAAAPIBAABqAAAAZQAAAPMBAABnAAAAaAAAAE40ZWxlbTE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU18zTWluSWRFRUVFAAAABAEBAARNAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROU18zTWluSWRFRUVFRUUAANwAAQA8TQAAAAAAAGROAABVAAAA9AEAAPUBAAD2AQAA9wEAAPgBAAD5AQAA+gEAAPsBAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE4QmluYXJ5UmVkdWNpbmdOb2RlSWROUzJfM01heElkRUVFRUVFTlNfOWFsbG9jYXRvcklTOV9FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAAEAQEAvE0AAAAQAAAAAAAA7E4AAPwBAAD9AQAA/gEAAFMAAAD/AQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMThCaW5hcnlSZWR1Y2luZ05vZGVJZE5TMV8zTWF4SWRFRUVFTlNfOWFsbG9jYXRvcklTNV9FRUVFAAAABAEBAIxOAABE/gAAAAAAAEhPAABiAAAAAAIAAGoAAABlAAAAAQIAAGcAAABoAAAATjRlbGVtMThCaW5hcnlSZWR1Y2luZ05vZGVJZE5TXzNNYXhJZEVFRUUAAAAEAQEAHE8AAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMThCaW5hcnlSZWR1Y2luZ05vZGVJZE5TXzNNYXhJZEVFRUVFRQAA3AABAFRPAAAAAAAAZFAAAFUAAAACAgAAAwIAAAQCAAAFAgAABgIAAAcCAAAIAgAACQIAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfOFJvb3ROb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAQBAQDUTwAAABAAAAAAAADUUAAACgIAAAsCAAAMAgAAUwAAAA0CAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW04Um9vdE5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAEAQEAjFAAAET+AAAAAAAAGFEAAGIAAAAOAgAADwIAAGUAAAAQAgAAZwAAAGgAAABONGVsZW04Um9vdE5vZGVJZEVFAAQBAQAEUQAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU184Um9vdE5vZGVJZEVFRUUAAAAA3AABACRRAAAAAAAAIFIAAFUAAAARAgAAEgIAABMCAAAUAgAAFQIAABYCAAAXAgAAGAIAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfOUNvbnN0Tm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAQBAQCQUQAAABAAAAAAAACQUgAAGQIAABoCAAAbAgAAUwAAABwCAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW05Q29uc3ROb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAEAQEASFIAAET+AAAAAAAA2FIAAGIAAAAdAgAAHgIAAGUAAAAfAgAAZwAAAGgAAABONGVsZW05Q29uc3ROb2RlSWRFRQAAAAAEAQEAwFIAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfOUNvbnN0Tm9kZUlkRUVFRQAAANwAAQDkUgAAAAAAAOhTAABVAAAAIAIAACECAAAiAgAAIwIAACQCAAAlAgAAJgIAACcCAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzEwUGhhc29yTm9kZUlkTGIwRUVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAAAQBAQBQUwAAABAAAAAAAABgVAAAKAIAACkCAAAqAgAAUwAAACsCAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xMFBoYXNvck5vZGVJZExiMEVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAAAAQBAQAQVAAARP4AAAAAAACsVAAAYgAAACwCAABqAAAAZQAAAC0CAABnAAAAaAAAAE40ZWxlbTEwUGhhc29yTm9kZUlkTGIwRUVFAAAEAQEAkFQAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTBQaGFzb3JOb2RlSWRMYjBFRUVFRQDcAAEAuFQAAAAAAADAVQAAVQAAAC4CAAAvAgAAMAIAADECAAAyAgAAMwIAADQCAAA1AgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xMFBoYXNvck5vZGVJZExiMUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAAEAQEAKFUAAAAQAAAAAAAAOFYAADYCAAA3AgAAOAIAAFMAAAA5AgAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTBQaGFzb3JOb2RlSWRMYjFFRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAAEAQEA6FUAAET+AAAAAAAAhFYAAGIAAAA6AgAAagAAAGUAAAA7AgAAZwAAAGgAAABONGVsZW0xMFBoYXNvck5vZGVJZExiMUVFRQAABAEBAGhWAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzEwUGhhc29yTm9kZUlkTGIxRUVFRUUA3AABAJBWAAAAAAAAmFcAAFUAAAA8AgAAPQIAAD4CAAA/AgAAQAIAAEECAABCAgAAQwIAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTRTYW1wbGVSYXRlTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAABAEBAABXAAAAEAAAAAAAABBYAABEAgAARQIAAEYCAABTAAAARwIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE0U2FtcGxlUmF0ZU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAABAEBAMBXAABE/gAAAAAAAFxYAABiAAAASAIAAGoAAABlAAAASQIAAGcAAABoAAAATjRlbGVtMTRTYW1wbGVSYXRlTm9kZUlkRUUAAAQBAQBAWAAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xNFNhbXBsZVJhdGVOb2RlSWRFRUVFANwAAQBoWAAAAAAAAGxZAABVAAAASgIAAEsCAABMAgAATQIAAE4CAABPAgAAUAIAAFECAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzEyU2VxdWVuY2VOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUABAEBANhYAAAAEAAAAAAAAOBZAABSAgAAUwIAAFQCAABTAAAAVQIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTEyU2VxdWVuY2VOb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAEAQEAlFkAAET+AAAAAAAALFoAAFYCAABXAgAAWAIAAGUAAABZAgAAZwAAAGgAAABONGVsZW0xMlNlcXVlbmNlTm9kZUlkRUUAAAAABAEBABBaAADgEAAAAAAAAKBaAABaAgAAWwIAAFwCAABTAAAAXQIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU5TXzZ2ZWN0b3JJZE5TXzlhbGxvY2F0b3JJZEVFRUVOUzJfSVM0X0VFRUUAAAAEAQEAVFoAAET+AABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTJTZXF1ZW5jZU5vZGVJZEVFRUUAAADcAAEArFoAAAAAAACsWwAAVQAAAF4CAABfAgAAYAIAAGECAABiAgAAYwIAAGQCAABlAgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl84U2VxMk5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAABAEBABxbAAAAEAAAAAAAABxcAABmAgAAZwIAAGgCAABTAAAAaQIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbThTZXEyTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAQBAQDUWwAARP4AAAAAAABgXAAAagIAAGsCAABsAgAAZQAAAG0CAABnAAAAaAAAAE40ZWxlbThTZXEyTm9kZUlkRUUABAEBAExcAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzhTZXEyTm9kZUlkRUVFRQAAAADcAAEAbFwAAAAAAABsXQAAVQAAAG4CAABvAgAAcAIAAHECAAByAgAAcwIAAHQCAAB1AgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xMVNwYXJTZXFOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAQBAQDYXAAAABAAAAAAAADgXQAAdgIAAHcCAAB4AgAAUwAAAHkCAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xMVNwYXJTZXFOb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAABAEBAJRdAABE/gAAAAAAACheAAB6AgAAewIAAHwCAABlAAAAfQIAAGcAAABoAAAATjRlbGVtMTFTcGFyU2VxTm9kZUlkRUUABAEBABBeAADgEAAAAAAAALReAAB+AgAAfwIAAIACAABTAAAAgQIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU5TXzNtYXBJaWROU180bGVzc0lpRUVOU185YWxsb2NhdG9ySU5TXzRwYWlySUtpZEVFRUVFRU5TNF9JUzlfRUVFRQAAAAAEAQEAUF4AAET+AABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTFTcGFyU2VxTm9kZUlkRUVFRQAAAADcAAEAwF4AAAAAAADEXwAAVQAAAIICAACDAgAAhAIAAIUCAACGAgAAhwIAAIgCAACJAgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xMlNwYXJTZXEyTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAQBAQAwXwAAABAAAAAAAAA4YAAAigIAAIsCAACMAgAAUwAAAI0CAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xMlNwYXJTZXEyTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUABAEBAOxfAABE/gAAAAAAAIRgAACOAgAAjwIAAJACAABlAAAAkQIAAGcAAABoAAAATjRlbGVtMTJTcGFyU2VxMk5vZGVJZEVFAAAAAAQBAQBoYAAA4BAAAAAAAAAQYQAAkgIAAJMCAACUAgAAUwAAAJUCAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlOU18zbWFwSWRkTlNfNGxlc3NJZEVFTlNfOWFsbG9jYXRvcklOU180cGFpcklLZGRFRUVFRUVOUzRfSVM5X0VFRUUAAAAABAEBAKxgAABE/gAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzEyU3BhclNlcTJOb2RlSWRFRUVFAAAA3AABABxhAAAAAAAAIGIAAFUAAACWAgAAlwIAAJgCAACZAgAAmgIAAJsCAACcAgAAnQIAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTFDb3VudGVyTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAEAQEAjGEAAAAQAAAAAAAAlGIAAJ4CAACfAgAAoAIAAFMAAAChAgAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTFDb3VudGVyTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAQBAQBIYgAARP4AAAAAAADcYgAAYgAAAKICAABqAAAAZQAAAKMCAABnAAAAaAAAAE40ZWxlbTExQ291bnRlck5vZGVJZEVFAAQBAQDEYgAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xMUNvdW50ZXJOb2RlSWRFRUVFAAAAANwAAQDoYgAAAAAAAOhjAABVAAAApAIAAKUCAACmAgAApwIAAKgCAACpAgAAqgIAAKsCAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzlBY2N1bU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAEAQEAWGMAAAAQAAAAAAAAWGQAAKwCAACtAgAArgIAAFMAAACvAgAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtOUFjY3VtTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUABAEBABBkAABE/gAAAAAAAKBkAABiAAAAsAIAAGoAAABlAAAAsQIAAGcAAABoAAAATjRlbGVtOUFjY3VtTm9kZUlkRUUAAAAABAEBAIhkAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzlBY2N1bU5vZGVJZEVFRUUAAADcAAEArGQAAAAAAACoZQAAVQAAALICAACzAgAAtAIAALUCAAC2AgAAtwIAALgCAAC5AgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl85TGF0Y2hOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUABAEBABhlAAAAEAAAAAAAABhmAAC6AgAAuwIAALwCAABTAAAAvQIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTlMYXRjaE5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAQBAQDQZQAARP4AAAAAAABgZgAAYgAAAL4CAABqAAAAZQAAAL8CAABnAAAAaAAAAE40ZWxlbTlMYXRjaE5vZGVJZEVFAAAAAAQBAQBIZgAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU185TGF0Y2hOb2RlSWRFRUVFAAAA3AABAGxmAAAAAAAAaGcAAFUAAADAAgAAwQIAAMICAADDAgAAxAIAAMUCAADGAgAAxwIAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfN01heEhvbGRJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAAAQBAQDYZgAAABAAAAAAAADYZwAAyAIAAMkCAADKAgAAUwAAAMsCAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW03TWF4SG9sZElkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAAEAQEAkGcAAET+AAAAAAAAHGgAAGIAAADMAgAAzQIAAGUAAADOAgAAZwAAAGgAAABONGVsZW03TWF4SG9sZElkRUUAAAQBAQAIaAAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU183TWF4SG9sZElkRUVFRQDcAAEAKGgAAAAAAAAgaQAAVQAAAM8CAADQAgAA0QIAANICAADTAgAA1AIAANUCAADWAgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl84T25jZU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAABAEBAJBoAAAAEAAAAAAAAJBpAADXAgAA2AIAANkCAABTAAAA2gIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbThPbmNlTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAQBAQBIaQAARP4AAAAAAADUaQAAYgAAANsCAADcAgAAZQAAAN0CAABnAAAAaAAAAE40ZWxlbThPbmNlTm9kZUlkRUUABAEBAMBpAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzhPbmNlTm9kZUlkRUVFRQAAAADcAAEA4GkAAAAAAADsagAAVQAAAN4CAADfAgAA4AIAAOECAADiAgAA4wIAAOQCAADlAgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8yMlVuaWZvcm1SYW5kb21Ob2lzZU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAAAQBAQBMagAAABAAAAAAAABsawAA5gIAAOcCAADoAgAAUwAAAOkCAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0yMlVuaWZvcm1SYW5kb21Ob2lzZU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAABAEBABRrAABE/gAAAAAAAMBrAABiAAAA6gIAAOsCAABlAAAA7AIAAGcAAABoAAAATjRlbGVtMjJVbmlmb3JtUmFuZG9tTm9pc2VOb2RlSWRFRQAABAEBAJxrAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzIyVW5pZm9ybVJhbmRvbU5vaXNlTm9kZUlkRUVFRQDcAAEAzGsAAAAAAADgbAAAVQAAAO0CAADuAgAA7wIAAPACAADxAgAA8gIAAPMCAAD0AgAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xN1ZhcmlhYmxlRGVsYXlOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAAABAEBAERsAAAAEAAAAAAAAFxtAAD1AgAA9gIAAPcCAABTAAAA+AIAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE3VmFyaWFibGVEZWxheU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAAAAQBAQAIbQAARP4AAAAAAACsbQAA+QIAAPoCAAD7AgAAZQAAAPwCAABnAAAAaAAAAE40ZWxlbTE3VmFyaWFibGVEZWxheU5vZGVJZEVFAAAABAEBAIxtAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE3VmFyaWFibGVEZWxheU5vZGVJZEVFRUUAANwAAQC4bQAAAAAAAMRuAABVAAAA/QIAAP4CAAD/AgAAAAMAAAEDAAACAwAAAwMAAAQDAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE1U2FtcGxlRGVsYXlOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAQBAQAsbgAAABAAAAAAAAA8bwAABQMAAAYDAAAHAwAAUwAAAAgDAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xNVNhbXBsZURlbGF5Tm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAQBAQDsbgAARP4AAAAAAACIbwAACQMAAAoDAAALAwAAZQAAAAwDAABnAAAAaAAAAE40ZWxlbTE1U2FtcGxlRGVsYXlOb2RlSWRFRQAEAQEAbG8AAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTVTYW1wbGVEZWxheU5vZGVJZEVFRUUAAAAA3AABAJRvAAAAAAAAqHAAAFUAAAANAwAADgMAAA8DAAAQAwAAEQMAABIDAAATAwAAFAMAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMjFTaW5nbGVTYW1wbGVEZWxheU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAAAAEAQEACHAAAAAQAAAAAAAAKHEAABUDAAAWAwAAFwMAAFMAAAAYAwAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMjFTaW5nbGVTYW1wbGVEZWxheU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAAAAQBAQDQcAAARP4AAAAAAAB8cQAAYgAAABkDAABqAAAAZQAAABoDAABnAAAAaAAAAE40ZWxlbTIxU2luZ2xlU2FtcGxlRGVsYXlOb2RlSWRFRQAAAAQBAQBYcQAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18yMVNpbmdsZVNhbXBsZURlbGF5Tm9kZUlkRUVFRQAA3AABAIhxAAAAAAAAlHIAAFUAAAAbAwAAHAMAAB0DAAAeAwAAHwMAACADAAAhAwAAIgMAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTFPbmVQb2xlTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAEAQEAAHIAAAAQAAAAAAAACHMAACMDAAAkAwAAJQMAAFMAAAAmAwAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTFPbmVQb2xlTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAQBAQC8cgAARP4AAAAAAABQcwAAYgAAACcDAABqAAAAZQAAACgDAABnAAAAaAAAAE40ZWxlbTExT25lUG9sZU5vZGVJZEVFAAQBAQA4cwAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xMU9uZVBvbGVOb2RlSWRFRUVFAAAAANwAAQBccwAAAAAAAGB0AABVAAAAKQMAACoDAAArAwAALAMAAC0DAAAuAwAALwMAADADAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzEyRW52ZWxvcGVOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUABAEBAMxzAAAAEAAAAAAAANR0AAAxAwAAMgMAADMDAABTAAAANAMAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTEyRW52ZWxvcGVOb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAEAQEAiHQAAET+AAAAAAAAIHUAAGIAAAA1AwAAagAAAGUAAAA2AwAAZwAAAGgAAABONGVsZW0xMkVudmVsb3BlTm9kZUlkRUUAAAAABAEBAAR1AADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzEyRW52ZWxvcGVOb2RlSWRFRUVFAAAA3AABACx1AAAAAAAANHYAAFUAAAA3AwAAOAMAADkDAAA6AwAAOwMAADwDAAA9AwAAPgMAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTZCaXF1YWRGaWx0ZXJOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUABAEBAJx1AAAAEAAAAAAAAKx2AAA/AwAAQAMAAEEDAABTAAAAQgMAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE2QmlxdWFkRmlsdGVyTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUABAEBAFx2AABE/gAAAAAAAPx2AABiAAAAQwMAAGoAAABlAAAARAMAAGcAAABoAAAATjRlbGVtMTZCaXF1YWRGaWx0ZXJOb2RlSWRFRQAAAAAEAQEA3HYAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTZCaXF1YWRGaWx0ZXJOb2RlSWRFRUVFAAAA3AABAAh3AAAAAAAAGHgAAFUAAABFAwAARgMAAEcDAABIAwAASQMAAEoDAABLAwAATAMAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTdDdXRvZmZQcmV3YXJwTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAAAAQBAQB8dwAAABAAAAAAAACUeAAATQMAAE4DAABPAwAAUwAAAFADAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xN0N1dG9mZlByZXdhcnBOb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAAAAAEAQEAQHgAAET+AAAAAAAA5HgAAGIAAABRAwAAagAAAGUAAABSAwAAZwAAAGgAAABONGVsZW0xN0N1dG9mZlByZXdhcnBOb2RlSWRFRQAAAAQBAQDEeAAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xN0N1dG9mZlByZXdhcnBOb2RlSWRFRUVFAADcAAEA8HgAAAAAAAD4eQAAVQAAAFMDAABUAwAAVQMAAFYDAABXAwAAWAMAAFkDAABaAwAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xMU11bHRpTW9kZTFwSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAQBAQBkeQAAABAAAAAAAABsegAAWwMAAFwDAABdAwAAUwAAAF4DAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xMU11bHRpTW9kZTFwSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAABAEBACB6AABE/gAAAAAAALR6AABiAAAAXwMAAGADAABlAAAAYQMAAGcAAABoAAAATjRlbGVtMTFNdWx0aU1vZGUxcElkRUUABAEBAJx6AADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzExTXVsdGlNb2RlMXBJZEVFRUUAAAAA3AABAMB6AAAAAAAA0HsAAFUAAABiAwAAYwMAAGQDAABlAwAAZgMAAGcDAABoAwAAaQMAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMjNTdGF0ZVZhcmlhYmxlRmlsdGVyTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAEAQEAMHsAAAAQAAAAAAAAUHwAAGoDAABrAwAAbAMAAFMAAABtAwAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMjNTdGF0ZVZhcmlhYmxlRmlsdGVyTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAQBAQD4ewAARP4AAAAAAACkfAAAYgAAAG4DAABvAwAAZQAAAHADAABnAAAAaAAAAE40ZWxlbTIzU3RhdGVWYXJpYWJsZUZpbHRlck5vZGVJZEVFAAQBAQCAfAAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18yM1N0YXRlVmFyaWFibGVGaWx0ZXJOb2RlSWRFRUVFAAAAANwAAQCwfAAAAAAAANB9AABVAAAAcQMAAHIDAABzAwAAdAMAAHUDAAB2AwAAdwMAAHgDAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzI4U3RhdGVWYXJpYWJsZVNoZWxmRmlsdGVyTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAQBAQAsfQAAABAAAAAAAABUfgAAeQMAAHoDAAB7AwAAUwAAAHwDAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0yOFN0YXRlVmFyaWFibGVTaGVsZkZpbHRlck5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAQBAQD4fQAARP4AAAAAAACwfgAAYgAAAH0DAAB+AwAAZQAAAH8DAABnAAAAaAAAAE40ZWxlbTI4U3RhdGVWYXJpYWJsZVNoZWxmRmlsdGVyTm9kZUlkRUUAAAAABAEBAIR+AADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzI4U3RhdGVWYXJpYWJsZVNoZWxmRmlsdGVyTm9kZUlkRUVFRQAAANwAAQC8fgAAAAAAAMx/AABVAAAAgAMAAIEDAACCAwAAgwMAAIQDAACFAwAAhgMAAIcDAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzlUYXBJbk5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAEAQEAPH8AAAAQAAAAAAAAPIAAAIgDAACJAwAAigMAAFMAAACLAwAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtOVRhcEluTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUABAEBAPR/AABE/gAAAAAAAISAAACMAwAAjQMAAGoAAACOAwAAjwMAAGcAAABoAAAATjRlbGVtOVRhcEluTm9kZUlkRUUAAAAABAEBAGyAAADgEAAAAAAAAPCBAACQAwAAkQMAAJIDAACTAwAAlAMAAJUDAACWAwAAlwMAAJgDAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0laTjRlbGVtOVRhcEluTm9kZUlkRTExc2V0UHJvcGVydHlFUktOU18xMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFUktOUzJfMmpzNVZhbHVlRVJOUzJfMTdTaGFyZWRSZXNvdXJjZU1hcEVFVWx2RV9OUzhfSVNKX0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfMTRTaGFyZWRSZXNvdXJjZUVFRXZFRUUATlN0M19fMjEwX19mdW5jdGlvbjZfX2Jhc2VJRk5TXzEwc2hhcmVkX3B0cklONGVsZW0xNFNoYXJlZFJlc291cmNlRUVFdkVFRQAAAADcAAEAm4EAAAQBAQC8gAAA6IEAAAAAAABoggAAmQMAAJoDAACbAwAAUwAAAJwDAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOUF1ZGlvQnVmZmVyUmVzb3VyY2VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAAQBAQAYggAARP4AAAAAAADQggAAnQMAAJ4DAACfAwAAoAMAAKEDAABONGVsZW0xOUF1ZGlvQnVmZmVyUmVzb3VyY2VFAE40ZWxlbTE0U2hhcmVkUmVzb3VyY2VFAAAAANwAAQCtggAABAEBAJCCAADIggAAWk40ZWxlbTlUYXBJbk5vZGVJZEUxMXNldFByb3BlcnR5RVJLTlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOUzJfMTFjaGFyX3RyYWl0c0ljRUVOUzJfOWFsbG9jYXRvckljRUVFRVJLTlNfMmpzNVZhbHVlRVJOU18xN1NoYXJlZFJlc291cmNlTWFwRUVVbHZFXwAAANwAAQDcggAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzlUYXBJbk5vZGVJZEVFRUUAAADcAAEAeIMAAAAAAAB4hAAAVQAAAKIDAACjAwAApAMAAKUDAACmAwAApwMAAKgDAACpAwAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xMFRhcE91dE5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAAAQBAQDkgwAAABAAAAAAAADshAAAqgMAAKsDAACsAwAAUwAAAK0DAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xMFRhcE91dE5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAABAEBAKCEAABE/gAAAAAAADSFAACuAwAArwMAAGoAAACwAwAAsQMAAGcAAABoAAAATjRlbGVtMTBUYXBPdXROb2RlSWRFRQAABAEBAByFAADgEAAAAAAAAFCGAACQAwAAsgMAALMDAAC0AwAAtQMAALYDAAC3AwAAuAMAALkDAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0laTjRlbGVtMTBUYXBPdXROb2RlSWRFMTFzZXRQcm9wZXJ0eUVSS05TXzEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUVSS05TMl8yanM1VmFsdWVFUk5TMl8xN1NoYXJlZFJlc291cmNlTWFwRUVVbHZFX05TOF9JU0pfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl8xNFNoYXJlZFJlc291cmNlRUVFdkVFRQAAAAAEAQEAbIUAAOiBAABaTjRlbGVtMTBUYXBPdXROb2RlSWRFMTFzZXRQcm9wZXJ0eUVSS05TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlMyXzExY2hhcl90cmFpdHNJY0VFTlMyXzlhbGxvY2F0b3JJY0VFRUVSS05TXzJqczVWYWx1ZUVSTlNfMTdTaGFyZWRSZXNvdXJjZU1hcEVFVWx2RV8A3AABAFyGAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTBUYXBPdXROb2RlSWRFRUVFANwAAQD4hgAAAAAAABiIAABVAAAAugMAALsDAAC8AwAAvQMAAL4DAAC/AwAAwAMAAMEDAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzEwU2FtcGxlTm9kZUlkTlMyXzIzVmFyaWFibGVQaXRjaExlcnBSZWFkZXJJZkVFRUVFRU5TXzlhbGxvY2F0b3JJUzlfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAEAQEAZIcAAAAQAAAAAAAArIgAAMIDAADDAwAAxAMAAFMAAADFAwAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTBTYW1wbGVOb2RlSWROUzFfMjNWYXJpYWJsZVBpdGNoTGVycFJlYWRlcklmRUVFRU5TXzlhbGxvY2F0b3JJUzVfRUVFRQAABAEBAECIAABE/gAAAAAAABSJAADGAwAAxwMAAGoAAADIAwAAyQMAAGcAAADKAwAATjRlbGVtMTBTYW1wbGVOb2RlSWROU18yM1ZhcmlhYmxlUGl0Y2hMZXJwUmVhZGVySWZFRUVFAAAEAQEA3IgAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTBTYW1wbGVOb2RlSWROU18yM1ZhcmlhYmxlUGl0Y2hMZXJwUmVhZGVySWZFRUVFRUUA3AABACCJAAAAAAAASIoAAFUAAADLAwAAzAMAAM0DAADOAwAAzwMAANADAADRAwAA0gMAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTNTYW1wbGVTZXFOb2RlSWRMYjBFRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAAAAQBAQCsiQAAABAAAAAAAADEigAA0wMAANQDAADVAwAAUwAAANYDAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xM1NhbXBsZVNlcU5vZGVJZExiMEVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAAAAAEAQEAcIoAAET+AAAAAAAAFIsAANcDAADYAwAAagAAANkDAADaAwAAZwAAAGgAAABONGVsZW0xM1NhbXBsZVNlcU5vZGVJZExiMEVFRQAAAAQBAQD0igAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xM1NhbXBsZVNlcU5vZGVJZExiMEVFRUVFAADcAAEAIIsAAAAAAAAwjAAAVQAAANsDAADcAwAA3QMAAN4DAADfAwAA4AMAAOEDAADiAwAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xM1NhbXBsZVNlcU5vZGVJZExiMUVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAAABAEBAJSLAAAAEAAAAAAAAKyMAADjAwAA5AMAAOUDAABTAAAA5gMAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTEzU2FtcGxlU2VxTm9kZUlkTGIxRUVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAAAAQBAQBYjAAARP4AAAAAAAD8jAAA5wMAAOgDAABqAAAA6QMAAOoDAABnAAAAaAAAAE40ZWxlbTEzU2FtcGxlU2VxTm9kZUlkTGIxRUVFAAAABAEBANyMAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzEzU2FtcGxlU2VxTm9kZUlkTGIxRUVFRUUAANwAAQAIjQAAAAAAAAyOAABVAAAA6wMAAOwDAADtAwAA7gMAAO8DAADwAwAA8QMAAPIDAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzlUYWJsZU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAEAQEAfI0AAAAQAAAAAAAAfI4AAPMDAAD0AwAA9QMAAFMAAAD2AwAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtOVRhYmxlTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUABAEBADSOAABE/gAAAAAAAMSOAAD3AwAA+AMAAGoAAAD5AwAA+gMAAGcAAABoAAAATjRlbGVtOVRhYmxlTm9kZUlkRUUAAAAABAEBAKyOAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzlUYWJsZU5vZGVJZEVFRUUAAADcAAEA0I4AAAAAAADUjwAAVQAAAPsDAAD8AwAA/QMAAP4DAAD/AwAAAAQAAAEEAAACBAAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xM01DQ2FwdHVyZU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAAAAAEAQEAPI8AAAAQAAAAAAAATJAAAAMEAAAEBAAABQQAAFMAAAAGBAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTNNQ0NhcHR1cmVOb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAAAAAEAQEA/I8AAET+AAAAAAAAmJAAAAcEAAAIBAAACQQAAGUAAAAKBAAACwQAAGgAAABONGVsZW0xM01DQ2FwdHVyZU5vZGVJZEVFAAAABAEBAHyQAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzEzTUNDYXB0dXJlTm9kZUlkRUVFRQAA3AABAKSQAAAAAAAAqJEAAFUAAAAMBAAADQQAAA4EAAAPBAAAEAQAABEEAAASBAAAEwQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTJNQ1NhbXBsZU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAEAQEAFJEAAAAQAAAAAAAAHJIAABQEAAAVBAAAFgQAAFMAAAAXBAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTJNQ1NhbXBsZU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAQBAQDQkQAARP4AAAAAAABokgAAGAQAABkEAABqAAAAGgQAABsEAABnAAAAHAQAAE40ZWxlbTEyTUNTYW1wbGVOb2RlSWRFRQAAAAAEAQEATJIAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTJNQ1NhbXBsZU5vZGVJZEVFRUUAAADcAAEAdJIAAAAAAACEkwAAVQAAAB0EAAAeBAAAHwQAACAEAAAhBAAAIgQAACMEAAAkBAAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xOVN0ZXJlb1NhbXBsZVNlcU5vZGVJZExiMEVFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAQBAQDkkgAAABAAAAAAAAAElAAAJQQAACYEAAAnBAAAUwAAACgEAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xOVN0ZXJlb1NhbXBsZVNlcU5vZGVJZExiMEVFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAABAEBAKyTAABE/gAAAAAAAFiUAAApBAAAKgQAAGoAAAArBAAALAQAAGcAAABoAAAATjRlbGVtMTlTdGVyZW9TYW1wbGVTZXFOb2RlSWRMYjBFRUUABAEBADSUAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzE5U3RlcmVvU2FtcGxlU2VxTm9kZUlkTGIwRUVFRUUAAAAA3AABAGSUAAAAAAAAgJUAAFUAAAAtBAAALgQAAC8EAAAwBAAAMQQAADIEAAAzBAAANAQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMTlTdGVyZW9TYW1wbGVTZXFOb2RlSWRMYjFFRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAEAQEA4JQAAAAQAAAAAAAAAJYAADUEAAA2BAAANwQAAFMAAAA4BAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTlTdGVyZW9TYW1wbGVTZXFOb2RlSWRMYjFFRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAQBAQColQAARP4AAAAAAABUlgAAOQQAADoEAABqAAAAOwQAADwEAABnAAAAaAAAAE40ZWxlbTE5U3RlcmVvU2FtcGxlU2VxTm9kZUlkTGIxRUVFAAQBAQAwlgAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xOVN0ZXJlb1NhbXBsZVNlcU5vZGVJZExiMUVFRUVFAAAAANwAAQBglgAAAAAAAHSXAABVAAAAPQQAAD4EAAA/BAAAQAQAAEEEAABCBAAAQwQAAEQEAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzE1U3RlcmVvVGFibGVOb2RlSWRFRUVFTlNfOWFsbG9jYXRvcklTN19FRUZOU18xMHNoYXJlZF9wdHJJTlMyXzlHcmFwaE5vZGVJZEVFRUVpZGlFRUUAAAQBAQDclgAAABAAAAAAAADslwAARQQAAEYEAABHBAAAUwAAAEgEAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xNVN0ZXJlb1RhYmxlTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAAAQBAQCclwAARP4AAAAAAAA4mAAASQQAAEoEAABqAAAASwQAAEwEAABnAAAAaAAAAE40ZWxlbTE1U3RlcmVvVGFibGVOb2RlSWRFRQAEAQEAHJgAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTVTdGVyZW9UYWJsZU5vZGVJZEVFRUUAAAAA3AABAESYAAAAAAAAaJkAAFUAAABNBAAATgQAAE8EAABQBAAAUQQAAFIEAABTBAAAVAQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMjJQb2x5QmxlcE9zY2lsbGF0b3JOb2RlSWRMTlMzXzhCbGVwTW9kZUUwRUVFRUVOU185YWxsb2NhdG9ySVM4X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAABAEBALiYAAAAEAAAAAAAAACaAABVBAAAVgQAAFcEAABTAAAAWAQAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTIyUG9seUJsZXBPc2NpbGxhdG9yTm9kZUlkTE5TMV82ZGV0YWlsOEJsZXBNb2RlRTBFRUVOU185YWxsb2NhdG9ySVM1X0VFRUUAAAAEAQEAkJkAAET+AAAAAAAAbJoAAGIAAABZBAAAagAAAGUAAABaBAAAZwAAAGgAAABONGVsZW0yMlBvbHlCbGVwT3NjaWxsYXRvck5vZGVJZExOU182ZGV0YWlsOEJsZXBNb2RlRTBFRUUAAAAEAQEAMJoAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMjJQb2x5QmxlcE9zY2lsbGF0b3JOb2RlSWRMTlMwXzhCbGVwTW9kZUUwRUVFRUUAAAAA3AABAHiaAAAAAAAAtJsAAFUAAABbBAAAXAQAAF0EAABeBAAAXwQAAGAEAABhBAAAYgQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMjJQb2x5QmxlcE9zY2lsbGF0b3JOb2RlSWRMTlMzXzhCbGVwTW9kZUUxRUVFRUVOU185YWxsb2NhdG9ySVM4X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAABAEBAASbAAAAEAAAAAAAAEycAABjBAAAZAQAAGUEAABTAAAAZgQAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTIyUG9seUJsZXBPc2NpbGxhdG9yTm9kZUlkTE5TMV82ZGV0YWlsOEJsZXBNb2RlRTFFRUVOU185YWxsb2NhdG9ySVM1X0VFRUUAAAAEAQEA3JsAAET+AAAAAAAAuJwAAGIAAABnBAAAagAAAGUAAABoBAAAZwAAAGgAAABONGVsZW0yMlBvbHlCbGVwT3NjaWxsYXRvck5vZGVJZExOU182ZGV0YWlsOEJsZXBNb2RlRTFFRUUAAAAEAQEAfJwAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMjJQb2x5QmxlcE9zY2lsbGF0b3JOb2RlSWRMTlMwXzhCbGVwTW9kZUUxRUVFRUUAAAAA3AABAMScAAAAAAAAAJ4AAFUAAABpBAAAagQAAGsEAABsBAAAbQQAAG4EAABvBAAAcAQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfMjJQb2x5QmxlcE9zY2lsbGF0b3JOb2RlSWRMTlMzXzhCbGVwTW9kZUUyRUVFRUVOU185YWxsb2NhdG9ySVM4X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAABAEBAFCdAAAAEAAAAAAAAJieAABxBAAAcgQAAHMEAABTAAAAdAQAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTIyUG9seUJsZXBPc2NpbGxhdG9yTm9kZUlkTE5TMV82ZGV0YWlsOEJsZXBNb2RlRTJFRUVOU185YWxsb2NhdG9ySVM1X0VFRUUAAAAEAQEAKJ4AAET+AAAAAAAABJ8AAGIAAAB1BAAAagAAAGUAAAB2BAAAZwAAAGgAAABONGVsZW0yMlBvbHlCbGVwT3NjaWxsYXRvck5vZGVJZExOU182ZGV0YWlsOEJsZXBNb2RlRTJFRUUAAAAEAQEAyJ4AAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMjJQb2x5QmxlcE9zY2lsbGF0b3JOb2RlSWRMTlMwXzhCbGVwTW9kZUUyRUVFRUUAAAAA3AABABCfAAAAAAAALKAAAFUAAAB3BAAAeAQAAHkEAAB6BAAAewQAAHwEAAB9BAAAfgQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOUzJfOU1ldGVyTm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAQBAQCcnwAAABAAAAAAAACcoAAAfwQAAIAEAACBBAAAUwAAAIIEAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW05TWV0ZXJOb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAEAQEAVKAAAET+AAAAAAAA5KAAAIMEAACEBAAAagAAAGUAAACFBAAAhgQAAGgAAABONGVsZW05TWV0ZXJOb2RlSWRFRQAAAAAEAQEAzKAAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfOU1ldGVyTm9kZUlkRUVFRQAAANwAAQDwoAAAAAAAAOyhAABVAAAAhwQAAIgEAACJBAAAigQAAIsEAACMBAAAjQQAAI4EAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzlTY29wZU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAEAQEAXKEAAAAQAAAAAAAAXKIAAI8EAACQBAAAkQQAAFMAAACSBAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtOVNjb3BlTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUABAEBABSiAABE/gAAAAAAAKSiAACTBAAAlAQAAJUEAABlAAAAlgQAAJcEAABoAAAATjRlbGVtOVNjb3BlTm9kZUlkRUUAAAAABAEBAIyiAADgEAAATjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TXzlTY29wZU5vZGVJZEVFRUUAAADcAAEAsKIAAAAAAACwowAAVQAAAJgEAACZBAAAmgQAAJsEAACcBAAAnQQAAJ4EAACfBAAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJTjRlbGVtNmRldGFpbDE4R2VuZXJpY05vZGVGYWN0b3J5SU5TMl8xMlNuYXBzaG90Tm9kZUlkRUVFRU5TXzlhbGxvY2F0b3JJUzdfRUVGTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAQBAQAcowAAABAAAAAAAAAkpAAAoAQAAKEEAACiBAAAUwAAAKMEAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xMlNuYXBzaG90Tm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUABAEBANijAABE/gAAAAAAAHCkAACkBAAApQQAAGoAAABlAAAApgQAAKcEAABoAAAATjRlbGVtMTJTbmFwc2hvdE5vZGVJZEVFAAAAAAQBAQBUpAAA4BAAAE40ZWxlbTZkZXRhaWwxOEdlbmVyaWNOb2RlRmFjdG9yeUlOU18xMlNuYXBzaG90Tm9kZUlkRUVFRQAAANwAAQB8pAAAAAAAAIClAABVAAAAqAQAAKkEAACqBAAAqwQAAKwEAACtBAAArgQAAK8EAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlMyXzExQ2FwdHVyZU5vZGVJZEVFRUVOU185YWxsb2NhdG9ySVM3X0VFRk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAABAEBAOykAAAAEAAAAAAAAPSlAACwBAAAsQQAALIEAABTAAAAswQAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTExQ2FwdHVyZU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAEAQEAqKUAAET+AAAAAAAAPKYAALQEAAC1BAAAagAAAGUAAAC2BAAAtwQAAGgAAABONGVsZW0xMUNhcHR1cmVOb2RlSWRFRQAEAQEAJKYAAOAQAABONGVsZW02ZGV0YWlsMThHZW5lcmljTm9kZUZhY3RvcnlJTlNfMTFDYXB0dXJlTm9kZUlkRUVFRQAAAADcAAEASKYAAAAAAABEpwAAVQAAALgEAAC5BAAAugQAALsEAAC8BAAAvQQAAL4EAAC/BAAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk4yNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcjdwcmVwYXJlRWRqRVVsaWRpRV9OU185YWxsb2NhdG9ySVMzX0VFRk5TXzEwc2hhcmVkX3B0cklONGVsZW05R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAAEAQEAuKYAAAAQAAAAAAAAvKcAAMAEAADBBAAAwgQAAFMAAADDBAAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtMTVDb252b2x1dGlvbk5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAEAQEAbKcAAET+AAAAAAAACKgAAMQEAADFBAAAagAAAMYEAADHBAAAZwAAAGgAAABONGVsZW0xNUNvbnZvbHV0aW9uTm9kZUlkRUUABAEBAOynAADgEAAAAAAAAIyoAADIBAAAyQQAAMoEAABTAAAAywQAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU4xMmZmdGNvbnZvbHZlcjIwVHdvU3RhZ2VGRlRDb252b2x2ZXJFTlNfOWFsbG9jYXRvcklTMl9FRUVFAAAABAEBADCoAABE/gAAWk4yNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcjdwcmVwYXJlRWRqRVVsaWRpRV8A3AABAJioAAAAAAAAiKkAAFUAAADMBAAAzQQAAM4EAADPBAAA0AQAANEEAADSBAAA0wQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSVpOMjRFbGVtZW50YXJ5QXVkaW9Qcm9jZXNzb3I3cHJlcGFyZUVkakVVbGlkaUUwX05TXzlhbGxvY2F0b3JJUzNfRUVGTlNfMTBzaGFyZWRfcHRySU40ZWxlbTlHcmFwaE5vZGVJZEVFRUVpZGlFRUUABAEBAPyoAAAAEAAAAAAAAPipAADUBAAA1QQAANYEAABTAAAA1wQAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTdGRlROb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAAAAQBAQCwqQAARP4AAAAAAAA8qgAA2AQAANkEAADaBAAAZQAAANsEAADcBAAAaAAAAE40ZWxlbTdGRlROb2RlSWRFRQAABAEBACiqAADgEAAAWk4yNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcjdwcmVwYXJlRWRqRVVsaWRpRTBfAAAAANwAAQBIqgAAAAAAADyrAABVAAAA3QQAAN4EAADfBAAA4AQAAOEEAADiBAAA4wQAAOQEAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0laTjI0RWxlbWVudGFyeUF1ZGlvUHJvY2Vzc29yN3ByZXBhcmVFZGpFVWxpZGlFMV9OU185YWxsb2NhdG9ySVMzX0VFRk5TXzEwc2hhcmVkX3B0cklONGVsZW05R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAQBAQCwqgAAABAAAAAAAAC0qwAA5QQAAOYEAADnBAAAUwAAAOgEAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW0xM01ldHJvbm9tZU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAAAAQBAQBkqwAARP4AAAAAAAAArAAAYgAAAOkEAADqBAAAZQAAAOsEAADsBAAAaAAAAE40ZWxlbTEzTWV0cm9ub21lTm9kZUlkRUUAAAAEAQEA5KsAAOAQAABaTjI0RWxlbWVudGFyeUF1ZGlvUHJvY2Vzc29yN3ByZXBhcmVFZGpFVWxpZGlFMV8AAAAA3AABAAysAAAAAAAAAK0AAFUAAADtBAAA7gQAAO8EAADwBAAA8QQAAPIEAADzBAAA9AQAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSVpOMjRFbGVtZW50YXJ5QXVkaW9Qcm9jZXNzb3I3cHJlcGFyZUVkakVVbGlkaUUyX05TXzlhbGxvY2F0b3JJUzNfRUVGTlNfMTBzaGFyZWRfcHRySU40ZWxlbTlHcmFwaE5vZGVJZEVFRUVpZGlFRUUABAEBAHSsAAAAEAAAAAAAAHitAAD1BAAA9gQAAPcEAABTAAAA+AQAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9lbXBsYWNlSU40ZWxlbTE0U2FtcGxlVGltZU5vZGVJZEVFTlNfOWFsbG9jYXRvcklTM19FRUVFAAAABAEBACitAABE/gAAAAAAAMStAABiAAAA+QQAAGoAAABlAAAA+gQAAGcAAABoAAAATjRlbGVtMTRTYW1wbGVUaW1lTm9kZUlkRUUAAAQBAQCorQAA4BAAAFpOMjRFbGVtZW50YXJ5QXVkaW9Qcm9jZXNzb3I3cHJlcGFyZUVkakVVbGlkaUUyXwAAAADcAAEA0K0AAAAAAADErgAAVQAAAPsEAAD8BAAA/QQAAP4EAAD/BAAAAAUAAAEFAAACBQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk4yNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcjdwcmVwYXJlRWRqRVVsaWRpRTNfTlNfOWFsbG9jYXRvcklTM19FRUZOU18xMHNoYXJlZF9wdHJJTjRlbGVtOUdyYXBoTm9kZUlkRUVFRWlkaUVFRQAEAQEAOK4AAAAQAAAAAAAANK8AAAMFAAAEBQAABQUAAFMAAAAGBQAATlN0M19fMjIwX19zaGFyZWRfcHRyX2VtcGxhY2VJTjRlbGVtOVR4U2VxTm9kZUlkRUVOU185YWxsb2NhdG9ySVMzX0VFRUUABAEBAOyuAABE/gAAAAAAAHyvAAAHBQAACAUAAAkFAAAKBQAACwUAAAwFAABoAAAATjRlbGVtOVR4U2VxTm9kZUlkRUUAAAAABAEBAGSvAADgEAAAWk4yNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcjdwcmVwYXJlRWRqRVVsaWRpRTNfAAAAANwAAQCIrwAAAAAAAHywAABVAAAADQUAAA4FAAAPBQAAEAUAABEFAAASBQAAEwUAABQFAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0laTjI0RWxlbWVudGFyeUF1ZGlvUHJvY2Vzc29yN3ByZXBhcmVFZGpFVWxpZGlFNF9OU185YWxsb2NhdG9ySVMzX0VFRk5TXzEwc2hhcmVkX3B0cklONGVsZW05R3JhcGhOb2RlSWRFRUVFaWRpRUVFAAQBAQDwrwAAABAAAAAAAADssAAAFQUAABYFAAAXBQAAUwAAABgFAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfZW1wbGFjZUlONGVsZW05V3RPc2NOb2RlSWRFRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAEAQEApLAAAET+AAAAAAAANLEAABkFAAAaBQAAGwUAABwFAAAdBQAAZwAAAGgAAABONGVsZW05V3RPc2NOb2RlSWRFRQAAAAAEAQEAHLEAAOAQAABaTjI0RWxlbWVudGFyeUF1ZGlvUHJvY2Vzc29yN3ByZXBhcmVFZGpFVWxpZGlFNF8AAAAA3AABAECxAACcsQAAAA4AAHgAAQBOMTBlbXNjcmlwdGVuM3ZhbEUAANwAAQCIsQAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJZEVFAADcAAEApLEAAJyxAAAADgAAnLEAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFAADcAAEA2LEAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWZFRQAA3AABACCyAAAYAAEAnLEAAJyxAACcsQAAnLEAAJyxAAAAAAAAtLMAAB4FAAAfBQAAIAUAACEFAAAiBQAAIwUAACQFAAAlBQAAJgUAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSVpONGVsZW0xOFJvb3RSZW5kZXJTZXF1ZW5jZUlkRTRwdXNoRVJOUzJfMTVCdWZmZXJBbGxvY2F0b3JJZEVFUk5TXzEwc2hhcmVkX3B0cklOUzJfOUdyYXBoTm9kZUlkRUVFRVJLTlNfNnZlY3RvcklOUzJfMTZPdXRsZXRDb25uZWN0aW9uRU5TXzlhbGxvY2F0b3JJU0VfRUVFRUVVbFJOUzJfMTFIb3N0Q29udGV4dElkRUVFX05TRl9JU05fRUVGdlNNX0VFRQBOU3QzX18yMTBfX2Z1bmN0aW9uNl9fYmFzZUlGdlJONGVsZW0xMUhvc3RDb250ZXh0SWRFRUVFRQAAANwAAQBxswAABAEBAIyyAACsswAAWk40ZWxlbTE4Um9vdFJlbmRlclNlcXVlbmNlSWRFNHB1c2hFUk5TXzE1QnVmZmVyQWxsb2NhdG9ySWRFRVJOU3QzX18yMTBzaGFyZWRfcHRySU5TXzlHcmFwaE5vZGVJZEVFRUVSS05TNV82dmVjdG9ySU5TXzE2T3V0bGV0Q29ubmVjdGlvbkVOUzVfOWFsbG9jYXRvcklTQ19FRUVFRVVsUk5TXzExSG9zdENvbnRleHRJZEVFRV8AAADcAAEAwLMAAAAAAADAtQAAJwUAACgFAAApBQAAKgUAACsFAAAsBQAALQUAAC4FAAAvBQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk40ZWxlbTE4Um9vdFJlbmRlclNlcXVlbmNlSWRFNHB1c2hFUk5TMl8xNUJ1ZmZlckFsbG9jYXRvcklkRUVSTlNfMTBzaGFyZWRfcHRySU5TMl85R3JhcGhOb2RlSWRFRUVFUktOU182dmVjdG9ySU5TMl8xNUlubGV0Q29ubmVjdGlvbkVOU185YWxsb2NhdG9ySVNFX0VFRUVSS05TRF9JTlMyXzE2T3V0bGV0Q29ubmVjdGlvbkVOU0ZfSVNLX0VFRUVFVWxSTlMyXzExSG9zdENvbnRleHRJZEVFRV9OU0ZfSVNTX0VFRnZTUl9FRUUAAAAEAQEAsLQAAKyzAABaTjRlbGVtMThSb290UmVuZGVyU2VxdWVuY2VJZEU0cHVzaEVSTlNfMTVCdWZmZXJBbGxvY2F0b3JJZEVFUk5TdDNfXzIxMHNoYXJlZF9wdHJJTlNfOUdyYXBoTm9kZUlkRUVFRVJLTlM1XzZ2ZWN0b3JJTlNfMTVJbmxldENvbm5lY3Rpb25FTlM1XzlhbGxvY2F0b3JJU0NfRUVFRVJLTlNCX0lOU18xNk91dGxldENvbm5lY3Rpb25FTlNEX0lTSV9FRUVFRVVsUk5TXzExSG9zdENvbnRleHRJZEVFRV8AAADcAAEAzLUAABgAAQAADgAAdmlpAJyxAAAADgAAaWlpAAAAAADctwAAMAUAADEFAAAyBQAAMwUAADQFAAA1BQAANgUAADcFAAA4BQAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk40ZWxlbTdSdW50aW1lSWRFMmdjRXZFVWxPVF9FX05TXzlhbGxvY2F0b3JJUzdfRUVGdlJOU18xMHNoYXJlZF9wdHJJTlMyXzE5R3JhcGhSZW5kZXJTZXF1ZW5jZUlkRUVFRUVFRQBOU3QzX18yMTBfX2Z1bmN0aW9uNl9fYmFzZUlGdlJOU18xMHNoYXJlZF9wdHJJTjRlbGVtMTlHcmFwaFJlbmRlclNlcXVlbmNlSWRFRUVFRUVFAAAA3AABAH+3AAAEAQEA/LYAANS3AABaTjRlbGVtN1J1bnRpbWVJZEUyZ2NFdkVVbE9UX0VfANwAAQDotwAAnLEAAAAOAACcsQAAnLEAAGlpaWlpAAAAAAAAAKy4AAA5BQAAOgUAADsFAAA8BQAAPQUAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBONGVsZW0xNFNoYXJlZFJlc291cmNlRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUAAAAABAEBAES4AABE/gAATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjRlbGVtMTRTaGFyZWRSZXNvdXJjZUVFRQAAABgAAQAADgAAeAABAHZpaWkAAAAAGAABAAAOAACcsQAAAAAAAHS6AAA+BQAAPwUAAEAFAABBBQAAQgUAAEMFAABEBQAARQUAAEYFAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0laTjI0RWxlbWVudGFyeUF1ZGlvUHJvY2Vzc29yMTlwcm9jZXNzUXVldWVkRXZlbnRzRU4xMGVtc2NyaXB0ZW4zdmFsRUVVbFJLTlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRU40ZWxlbTJqczVWYWx1ZUVFX05TOF9JU0dfRUVGdlNDX1NGX0VFRQBOU3QzX18yMTBfX2Z1bmN0aW9uNl9fYmFzZUlGdlJLTlNfMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRU40ZWxlbTJqczVWYWx1ZUVFRUUAANwAAQD+uQAABAEBADi5AABsugAAWk4yNEVsZW1lbnRhcnlBdWRpb1Byb2Nlc3NvcjE5cHJvY2Vzc1F1ZXVlZEV2ZW50c0VOMTBlbXNjcmlwdGVuM3ZhbEVFVWxSS05TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlMyXzExY2hhcl90cmFpdHNJY0VFTlMyXzlhbGxvY2F0b3JJY0VFRUVONGVsZW0yanM1VmFsdWVFRV8A3AABAIC6AACcsQAAnLEAABgAAQAADgAAzAABAHZpaWQAAAAAAAAAAIC7AABHBQAASAUAAEkFAABKBQAATjEyZmZ0Y29udm9sdmVyMjBUd29TdGFnZUZGVENvbnZvbHZlckUAANwAAQBYuwAAAAAAALS7AABLBQAATAUAAE4xMmZmdGNvbnZvbHZlcjZCdWZmZXJJZkVFAADcAAEAmLsAAAAAAADsuwAATQUAAE4FAABOMTJmZnRjb252b2x2ZXIxMkZGVENvbnZvbHZlckUAANwAAQDMuwAAAAAAAFC8AABPBQAAUAUAAFEFAABSBQAAUwUAAE44YXVkaW9mZnQ4T291cmFGRlRFAE44YXVkaW9mZnQ2ZGV0YWlsMTJBdWRpb0ZGVEltcGxFAAAA3AABACW8AAAEAQEAELwAAEi8AABOU3QzX18yMTJiYXNpY19zdHJpbmdJaE5TXzExY2hhcl90cmFpdHNJaEVFTlNfOWFsbG9jYXRvckloRUVFRQAA3AABAFy8AABOU3QzX18yMTJiYXNpY19zdHJpbmdJd05TXzExY2hhcl90cmFpdHNJd0VFTlNfOWFsbG9jYXRvckl3RUVFRQAA3AABAKS8AABOU3QzX18yMTJiYXNpY19zdHJpbmdJRHNOU18xMWNoYXJfdHJhaXRzSURzRUVOU185YWxsb2NhdG9ySURzRUVFRQAAANwAAQDsvAAATlN0M19fMjEyYmFzaWNfc3RyaW5nSURpTlNfMTFjaGFyX3RyYWl0c0lEaUVFTlNfOWFsbG9jYXRvcklEaUVFRUUAAADcAAEAOL0AAE4xMGVtc2NyaXB0ZW4x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\";if(!ra(F)){var sa=F;F=l.locateFile?l.locateFile(sa,\"\"):\"\"+sa}\nfunction ta(a){if(F==F&&fa)var b=new Uint8Array(fa);else{b=F;if(ra(b)){b=atob(b.slice(37));for(var c=new Uint8Array(b.length),d=0;d<b.length;++d)c[d]=b.charCodeAt(d);b=c}else b=void 0;if(!b)if(da)b=da(F);else throw\"sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)\";}b=new WebAssembly.Module(b);return[new WebAssembly.Instance(b,a),b]}var ua=a=>{for(;0<a.length;)a.shift()(l)};\nclass va{constructor(a){this.R=a-24}}\nvar wa=0,xa=0,za,G=a=>{for(var b=\"\";x[a];)b+=za[x[a++]];return b},H={},I={},Aa={},J,Ba=a=>{throw new J(a);},K,M=(a,b,c)=>{function d(h){h=c(h);if(h.length!==a.length)throw new K(\"Mismatched type converter count\");for(var m=0;m<a.length;++m)L(a[m],h[m])}a.forEach(function(h){Aa[h]=b});var e=Array(b.length),g=[],f=0;b.forEach((h,m)=>{I.hasOwnProperty(h)?e[m]=I[h]:(g.push(h),H.hasOwnProperty(h)||(H[h]=[]),H[h].push(()=>{e[m]=I[h];++f;f===g.length&&d(e)}))});0===g.length&&d(e)};\nfunction Ca(a,b,c={}){var d=b.name;if(!a)throw new J(`type \"${d}\" must have a positive integer typeid pointer`);if(I.hasOwnProperty(a)){if(c.sa)return;throw new J(`Cannot register type '${d}' twice`);}I[a]=b;delete Aa[a];H.hasOwnProperty(a)&&(b=H[a],delete H[a],b.forEach(e=>e()))}function L(a,b,c={}){if(!(\"argPackAdvance\"in b))throw new TypeError(\"registerType registeredInstance requires argPackAdvance\");return Ca(a,b,c)}\nvar Da=a=>{throw new J(a.O.S.P.name+\" instance already deleted\");},Ea=!1,Fa=()=>{},Ga=(a,b,c)=>{if(b===c)return a;if(void 0===c.U)return null;a=Ga(a,b,c.U);return null===a?null:c.pa(a)},Ha={},N=[],Ia=()=>{for(;N.length;){var a=N.pop();a.O.aa=!1;a[\"delete\"]()}},O,P={},Ja=(a,b)=>{if(void 0===b)throw new J(\"ptr should not be undefined\");for(;a.U;)b=a.da(b),a=a.U;return P[b]},Ka=(a,b)=>{if(!b.S||!b.R)throw new K(\"makeClassHandle requires ptr and ptrType\");if(!!b.V!==!!b.T)throw new K(\"Both smartPtrType and smartPtr must be specified\");\nb.count={value:1};return Q(Object.create(a,{O:{value:b,writable:!0}}))},Q=a=>{if(\"undefined\"===typeof FinalizationRegistry)return Q=b=>b,a;Ea=new FinalizationRegistry(b=>{b=b.O;--b.count.value;0===b.count.value&&(b.T?b.V.Z(b.T):b.S.P.Z(b.R))});Q=b=>{var c=b.O;c.T&&Ea.register(b,{O:c},b);return b};Fa=b=>{Ea.unregister(b)};return Q(a)};function La(){}\nvar R=(a,b)=>Object.defineProperty(b,\"name\",{value:a}),Ma=(a,b,c)=>{if(void 0===a[b].Y){var d=a[b];a[b]=function(){if(!a[b].Y.hasOwnProperty(arguments.length))throw new J(`Function '${c}' called with an invalid number of arguments (${arguments.length}) - expects one of (${a[b].Y})!`);return a[b].Y[arguments.length].apply(this,arguments)};a[b].Y=[];a[b].Y[d.ea]=d}},Na=(a,b)=>{if(l.hasOwnProperty(a))throw new J(`Cannot register public name '${a}' twice`);l[a]=b},Oa=a=>{if(void 0===a)return\"_unknown\";\na=a.replace(/[^a-zA-Z0-9_]/g,\"$\");var b=a.charCodeAt(0);return 48<=b&&57>=b?`_${a}`:a};function Pa(a,b,c,d,e,g,f,h){this.name=a;this.constructor=b;this.ba=c;this.Z=d;this.U=e;this.qa=g;this.da=f;this.pa=h;this.va=[]}var Qa=(a,b,c)=>{for(;b!==c;){if(!b.da)throw new J(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);a=b.da(a);b=b.U}return a};\nfunction Ra(a,b){if(null===b){if(this.ha)throw new J(`null is not a valid ${this.name}`);return 0}if(!b.O)throw new J(`Cannot pass \"${Sa(b)}\" as a ${this.name}`);if(!b.O.R)throw new J(`Cannot pass deleted object as a pointer of type ${this.name}`);return Qa(b.O.R,b.O.S.P,this.P)}\nfunction Ta(a,b){if(null===b){if(this.ha)throw new J(`null is not a valid ${this.name}`);if(this.ga){var c=this.wa();null!==a&&a.push(this.Z,c);return c}return 0}if(!b||!b.O)throw new J(`Cannot pass \"${Sa(b)}\" as a ${this.name}`);if(!b.O.R)throw new J(`Cannot pass deleted object as a pointer of type ${this.name}`);if(!this.fa&&b.O.S.fa)throw new J(`Cannot convert argument of type ${b.O.V?b.O.V.name:b.O.S.name} to parameter type ${this.name}`);c=Qa(b.O.R,b.O.S.P,this.P);if(this.ga){if(void 0===b.O.T)throw new J(\"Passing raw pointer to smart pointer is illegal\");\nswitch(this.ya){case 0:if(b.O.V===this)c=b.O.T;else throw new J(`Cannot convert argument of type ${b.O.V?b.O.V.name:b.O.S.name} to parameter type ${this.name}`);break;case 1:c=b.O.T;break;case 2:if(b.O.V===this)c=b.O.T;else{var d=b.clone();c=this.xa(c,S(()=>d[\"delete\"]()));null!==a&&a.push(this.Z,c)}break;default:throw new J(\"Unsupporting sharing policy\");}}return c}\nfunction Ua(a,b){if(null===b){if(this.ha)throw new J(`null is not a valid ${this.name}`);return 0}if(!b.O)throw new J(`Cannot pass \"${Sa(b)}\" as a ${this.name}`);if(!b.O.R)throw new J(`Cannot pass deleted object as a pointer of type ${this.name}`);if(b.O.S.fa)throw new J(`Cannot convert argument of type ${b.O.S.name} to parameter type ${this.name}`);return Qa(b.O.R,b.O.S.P,this.P)}function Va(a){return this.fromWireType(B[a>>2])}\nfunction Wa(a,b,c,d,e,g,f,h,m,k,n){this.name=a;this.P=b;this.ha=c;this.fa=d;this.ga=e;this.ua=g;this.ya=f;this.ma=h;this.wa=m;this.xa=k;this.Z=n;e||void 0!==b.U?this.toWireType=Ta:(this.toWireType=d?Ra:Ua,this.W=null)}\nvar Xa=(a,b)=>{if(!l.hasOwnProperty(a))throw new K(\"Replacing nonexistant public symbol\");l[a]=b;l[a].ea=void 0},Ya=[],Za,$a=a=>{var b=Ya[a];b||(a>=Ya.length&&(Ya.length=a+1),Ya[a]=b=Za.get(a));return b},ab=(a,b)=>{var c=[];return function(){c.length=0;Object.assign(c,arguments);if(a.includes(\"j\")){var d=l[\"dynCall_\"+a];d=c&&c.length?d.apply(null,[b].concat(c)):d.call(null,b)}else d=$a(b).apply(null,c);return d}},T=(a,b)=>{a=G(a);var c=a.includes(\"j\")?ab(a,b):$a(b);if(\"function\"!=typeof c)throw new J(`unknown function pointer with signature ${a}: ${b}`);\nreturn c},bb,db=a=>{a=cb(a);var b=G(a);U(a);return b},eb=(a,b)=>{function c(g){e[g]||I[g]||(Aa[g]?Aa[g].forEach(c):(d.push(g),e[g]=!0))}var d=[],e={};b.forEach(c);throw new bb(`${a}: `+d.map(db).join([\", \"]));},fb=(a,b)=>{for(var c=[],d=0;d<a;d++)c.push(B[b+4*d>>2]);return c},hb=a=>{for(;a.length;){var b=a.pop();a.pop()(b)}};function ib(a){for(var b=1;b<a.length;++b)if(null!==a[b]&&void 0===a[b].W)return!0;return!1}\nfunction jb(a){var b=Function;if(!(b instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);var c=R(b.name||\"unknownFunctionName\",function(){});c.prototype=b.prototype;c=new c;a=b.apply(c,a);return a instanceof Object?a:c}\nfunction kb(a,b,c,d,e,g){var f=b.length;if(2>f)throw new J(\"argTypes array size mismatch! Must at least get return value and 'this' types!\");var h=null!==b[1]&&null!==c,m=ib(b);c=\"void\"!==b[0].name;d=[Ba,d,e,hb,b[0],b[1]];for(e=0;e<f-2;++e)d.push(b[e+2]);if(!m)for(e=h?1:2;e<b.length;++e)null!==b[e].W&&d.push(b[e].W);m=ib(b);e=b.length;var k=\"\",n=\"\";for(f=0;f<e-2;++f)k+=(0!==f?\", \":\"\")+\"arg\"+f,n+=(0!==f?\", \":\"\")+\"arg\"+f+\"Wired\";k=`\\n        return function (${k}) {\\n        if (arguments.length !== ${e-\n2}) {\\n          throwBindingError('function ${a} called with ' + arguments.length + ' arguments, expected ${e-2}');\\n        }`;m&&(k+=\"var destructors = [];\\n\");var r=m?\"destructors\":\"null\",q=\"throwBindingError invoker fn runDestructors retType classParam\".split(\" \");h&&(k+=\"var thisWired = classParam['toWireType'](\"+r+\", this);\\n\");for(f=0;f<e-2;++f)k+=\"var arg\"+f+\"Wired = argType\"+f+\"['toWireType'](\"+r+\", arg\"+f+\"); // \"+b[f+2].name+\"\\n\",q.push(\"argType\"+f);h&&(n=\"thisWired\"+(0<n.length?\", \":\n\"\")+n);k+=(c||g?\"var rv = \":\"\")+\"invoker(fn\"+(0<n.length?\", \":\"\")+n+\");\\n\";if(m)k+=\"runDestructors(destructors);\\n\";else for(f=h?1:2;f<b.length;++f)g=1===f?\"thisWired\":\"arg\"+(f-2)+\"Wired\",null!==b[f].W&&(k+=g+\"_dtor(\"+g+\"); // \"+b[f].name+\"\\n\",q.push(g+\"_dtor\"));c&&(k+=\"var ret = retType['fromWireType'](rv);\\nreturn ret;\\n\");let [t,u]=[q,k+\"}\\n\"];t.push(u);b=jb(t).apply(null,d);return R(a,b)}var lb=a=>{a=a.trim();const b=a.indexOf(\"(\");return-1!==b?a.substr(0,b):a};\nclass mb{constructor(){this.X=[void 0];this.ia=[]}get(a){return this.X[a]}has(a){return void 0!==this.X[a]}}var V=new mb,nb=a=>{a>=V.ja&&0===--V.get(a).na&&(V.X[a]=void 0,V.ia.push(a))},Y=a=>{if(!a)throw new J(\"Cannot use deleted val. handle = \"+a);return V.get(a).value},S=a=>{switch(a){case void 0:return 1;case null:return 2;case !0:return 3;case !1:return 4;default:a={na:1,value:a};var b=V.ia.pop()||V.X.length;V.X[b]=a;return b}};function ob(a){return this.fromWireType(A[a>>2])}\nfor(var pb={name:\"emscripten::val\",fromWireType:a=>{var b=Y(a);nb(a);return b},toWireType:(a,b)=>S(b),argPackAdvance:8,readValueFromPointer:ob,W:null},Sa=a=>{if(null===a)return\"null\";var b=typeof a;return\"object\"===b||\"array\"===b||\"function\"===b?a.toString():\"\"+a},qb=(a,b)=>{switch(b){case 4:return function(c){return this.fromWireType(ja[c>>2])};case 8:return function(c){return this.fromWireType(ka[c>>3])};default:throw new TypeError(`invalid float width (${b}): ${a}`);}},rb=(a,b,c)=>{switch(b){case 1:return c?\nd=>ia[d>>0]:d=>x[d>>0];case 2:return c?d=>y[d>>1]:d=>z[d>>1];case 4:return c?d=>A[d>>2]:d=>B[d>>2];default:throw new TypeError(`invalid integer width (${b}): ${a}`);}},sb=\"undefined\"!=typeof TextDecoder?new TextDecoder(\"utf8\"):void 0,tb=\"undefined\"!=typeof TextDecoder?new TextDecoder(\"utf-16le\"):void 0,ub=(a,b)=>{var c=a>>1;for(var d=c+b/2;!(c>=d)&&z[c];)++c;c<<=1;if(32<c-a&&tb)return tb.decode(x.subarray(a,c));c=\"\";for(d=0;!(d>=b/2);++d){var e=y[a+2*d>>1];if(0==e)break;c+=String.fromCharCode(e)}return c},\nvb=(a,b,c)=>{c??=2147483647;if(2>c)return 0;c-=2;var d=b;c=c<2*a.length?c/2:a.length;for(var e=0;e<c;++e)y[b>>1]=a.charCodeAt(e),b+=2;y[b>>1]=0;return b-d},wb=a=>2*a.length,xb=(a,b)=>{for(var c=0,d=\"\";!(c>=b/4);){var e=A[a+4*c>>2];if(0==e)break;++c;65536<=e?(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023)):d+=String.fromCharCode(e)}return d},yb=(a,b,c)=>{c??=2147483647;if(4>c)return 0;var d=b;c=d+c-4;for(var e=0;e<a.length;++e){var g=a.charCodeAt(e);if(55296<=g&&57343>=g){var f=a.charCodeAt(++e);\ng=65536+((g&1023)<<10)|f&1023}A[b>>2]=g;b+=4;if(b+4>c)break}A[b>>2]=0;return b-d},zb=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&++c;b+=4}return b},Ab=(a,b)=>{var c=I[a];if(void 0===c)throw a=b+\" has unknown type \"+db(a),new J(a);return c},Bb=(a,b,c)=>{var d=[];a=a.toWireType(d,c);d.length&&(B[b>>2]=S(d));return a},Cb=[],Db={},Eb=a=>{var b=Db[a];return void 0===b?G(a):b},Fb=()=>\"object\"==typeof globalThis?globalThis:Function(\"return this\")(),Gb=a=>{var b=Cb.length;\nCb.push(a);return b},Hb=(a,b)=>{for(var c=Array(a),d=0;d<a;++d)c[d]=Ab(B[b+4*d>>2],\"parameter \"+d);return c},Ib=()=>{if(\"object\"==typeof crypto&&\"function\"==typeof crypto.getRandomValues)return a=>crypto.getRandomValues(a);p(\"initRandomDevice\")},Jb=a=>(Jb=Ib())(a),Kb=Array(256),Lb=0;256>Lb;++Lb)Kb[Lb]=String.fromCharCode(Lb);za=Kb;J=l.BindingError=class extends Error{constructor(a){super(a);this.name=\"BindingError\"}};K=l.InternalError=class extends Error{constructor(a){super(a);this.name=\"InternalError\"}};\nObject.assign(La.prototype,{isAliasOf:function(a){if(!(this instanceof La&&a instanceof La))return!1;var b=this.O.S.P,c=this.O.R;a.O=a.O;var d=a.O.S.P;for(a=a.O.R;b.U;)c=b.da(c),b=b.U;for(;d.U;)a=d.da(a),d=d.U;return b===d&&c===a},clone:function(){this.O.R||Da(this);if(this.O.ca)return this.O.count.value+=1,this;var a=Q,b=Object,c=b.create,d=Object.getPrototypeOf(this),e=this.O;a=a(c.call(b,d,{O:{value:{count:e.count,aa:e.aa,ca:e.ca,R:e.R,S:e.S,T:e.T,V:e.V}}}));a.O.count.value+=1;a.O.aa=!1;return a},\n[\"delete\"](){this.O.R||Da(this);if(this.O.aa&&!this.O.ca)throw new J(\"Object already scheduled for deletion\");Fa(this);var a=this.O;--a.count.value;0===a.count.value&&(a.T?a.V.Z(a.T):a.S.P.Z(a.R));this.O.ca||(this.O.T=void 0,this.O.R=void 0)},isDeleted:function(){return!this.O.R},deleteLater:function(){this.O.R||Da(this);if(this.O.aa&&!this.O.ca)throw new J(\"Object already scheduled for deletion\");N.push(this);1===N.length&&O&&O(Ia);this.O.aa=!0;return this}});l.getInheritedInstanceCount=()=>Object.keys(P).length;\nl.getLiveInheritedInstances=()=>{var a=[],b;for(b in P)P.hasOwnProperty(b)&&a.push(P[b]);return a};l.flushPendingDeletes=Ia;l.setDelayFunction=a=>{O=a;N.length&&O&&O(Ia)};\nObject.assign(Wa.prototype,{ra(a){this.ma&&(a=this.ma(a));return a},la(a){this.Z?.(a)},argPackAdvance:8,readValueFromPointer:Va,fromWireType:function(a){function b(){return this.ga?Ka(this.P.ba,{S:this.ua,R:c,V:this,T:a}):Ka(this.P.ba,{S:this,R:a})}var c=this.ra(a);if(!c)return this.la(a),null;var d=Ja(this.P,c);if(void 0!==d){if(0===d.O.count.value)return d.O.R=c,d.O.T=a,d.clone();d=d.clone();this.la(a);return d}d=this.P.qa(c);d=Ha[d];if(!d)return b.call(this);d=this.fa?d.oa:d.pointerType;var e=\nGa(c,this.P,d.P);return null===e?b.call(this):this.ga?Ka(d.P.ba,{S:d,R:e,V:this,T:a}):Ka(d.P.ba,{S:d,R:e})}});bb=l.UnboundTypeError=((a,b)=>{var c=R(b,function(d){this.name=b;this.message=d;d=Error(d).stack;void 0!==d&&(this.stack=this.toString()+\"\\n\"+d.replace(/^Error(:[^\\n]*)?\\n/,\"\"))});c.prototype=Object.create(a.prototype);c.prototype.constructor=c;c.prototype.toString=function(){return void 0===this.message?this.name:`${this.name}: ${this.message}`};return c})(Error,\"UnboundTypeError\");\nV.X.push({value:void 0},{value:null},{value:!0},{value:!1});Object.assign(V,{ja:V.X.length});l.count_emval_handles=()=>{for(var a=0,b=V.ja;b<V.X.length;++b)void 0!==V.X[b]&&++a;return a};\nvar Nb={l:(a,b,c)=>{var d=new va(a);B[d.R+16>>2]=0;B[d.R+4>>2]=b;B[d.R+8>>2]=c;wa=a;xa++;throw wa;},x:()=>{},C:(a,b,c,d)=>{b=G(b);L(a,{name:b,fromWireType:function(e){return!!e},toWireType:function(e,g){return g?c:d},argPackAdvance:8,readValueFromPointer:function(e){return this.fromWireType(x[e])},W:null})},H:(a,b,c,d,e,g,f,h,m,k,n,r,q)=>{n=G(n);g=T(e,g);h&&=T(f,h);k&&=T(m,k);q=T(r,q);var t=Oa(n);Na(t,function(){eb(`Cannot construct ${n} due to unbound types`,[d])});M([a,b,c],d?[d]:[],function(u){u=\nu[0];if(d){var v=u.P;var W=v.ba}else W=La.prototype;u=R(n,function(){if(Object.getPrototypeOf(this)!==ya)throw new J(\"Use 'new' to construct \"+n);if(void 0===C.$)throw new J(n+\" has no accessible constructor\");var gb=C.$[arguments.length];if(void 0===gb)throw new J(`Tried to invoke ctor of ${n} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(C.$).toString()}) parameters instead!`);return gb.apply(this,arguments)});var ya=Object.create(W,{constructor:{value:u}});u.prototype=\nya;var C=new Pa(n,u,ya,q,v,g,h,k);if(C.U){var X;(X=C.U).ka??(X.ka=[]);C.U.ka.push(C)}v=new Wa(n,C,!0,!1,!1);X=new Wa(n+\"*\",C,!1,!1,!1);W=new Wa(n+\" const*\",C,!1,!0,!1);Ha[a]={pointerType:X,oa:W};Xa(t,u);return[v,X,W]})},G:(a,b,c,d,e,g)=>{var f=fb(b,c);e=T(d,e);M([],[a],function(h){h=h[0];var m=`constructor ${h.name}`;void 0===h.P.$&&(h.P.$=[]);if(void 0!==h.P.$[b-1])throw new J(`Cannot register multiple constructors with identical number of parameters (${b-1}) for class '${h.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);\nh.P.$[b-1]=()=>{eb(`Cannot construct ${h.name} due to unbound types`,f)};M([],f,k=>{k.splice(1,0,null);h.P.$[b-1]=kb(m,k,null,e,g);return[]});return[]})},d:(a,b,c,d,e,g,f,h,m)=>{var k=fb(c,d);b=G(b);b=lb(b);g=T(e,g);M([],[a],function(n){function r(){eb(`Cannot call ${q} due to unbound types`,k)}n=n[0];var q=`${n.name}.${b}`;b.startsWith(\"@@\")&&(b=Symbol[b.substring(2)]);h&&n.P.va.push(b);var t=n.P.ba,u=t[b];void 0===u||void 0===u.Y&&u.className!==n.name&&u.ea===c-2?(r.ea=c-2,r.className=n.name,t[b]=\nr):(Ma(t,b,q),t[b].Y[c-2]=r);M([],k,function(v){v=kb(q,v,n,g,f,m);void 0===t[b].Y?(v.ea=c-2,t[b]=v):t[b].Y[c-2]=v;return[]});return[]})},B:a=>L(a,pb),u:(a,b,c)=>{b=G(b);L(a,{name:b,fromWireType:d=>d,toWireType:(d,e)=>e,argPackAdvance:8,readValueFromPointer:qb(b,c),W:null})},f:(a,b,c,d,e)=>{b=G(b);-1===e&&(e=4294967295);e=h=>h;if(0===d){var g=32-8*c;e=h=>h<<g>>>g}var f=b.includes(\"unsigned\")?function(h,m){return m>>>0}:function(h,m){return m};L(a,{name:b,fromWireType:e,toWireType:f,argPackAdvance:8,\nreadValueFromPointer:rb(b,c,0!==d),W:null})},b:(a,b,c)=>{function d(g){return new e(ia.buffer,B[g+4>>2],B[g>>2])}var e=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][b];c=G(c);L(a,{name:c,fromWireType:d,argPackAdvance:8,readValueFromPointer:d},{sa:!0})},t:(a,b)=>{b=G(b);var c=\"std::string\"===b;L(a,{name:b,fromWireType:function(d){var e=B[d>>2],g=d+4;if(c)for(var f=g,h=0;h<=e;++h){var m=g+h;if(h==e||0==x[m]){if(f){var k=f;var n=x,r=k+(m-f);for(f=k;n[f]&&\n!(f>=r);)++f;if(16<f-k&&n.buffer&&sb)k=sb.decode(n.subarray(k,f));else{for(r=\"\";k<f;){var q=n[k++];if(q&128){var t=n[k++]&63;if(192==(q&224))r+=String.fromCharCode((q&31)<<6|t);else{var u=n[k++]&63;q=224==(q&240)?(q&15)<<12|t<<6|u:(q&7)<<18|t<<12|u<<6|n[k++]&63;65536>q?r+=String.fromCharCode(q):(q-=65536,r+=String.fromCharCode(55296|q>>10,56320|q&1023))}}else r+=String.fromCharCode(q)}k=r}}else k=\"\";if(void 0===v)var v=k;else v+=String.fromCharCode(0),v+=k;f=m+1}}else{v=Array(e);for(h=0;h<e;++h)v[h]=\nString.fromCharCode(x[g+h]);v=v.join(\"\")}U(d);return v},toWireType:function(d,e){e instanceof ArrayBuffer&&(e=new Uint8Array(e));var g,f=\"string\"==typeof e;if(!(f||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Int8Array))throw new J(\"Cannot pass non-string to std::string\");var h;if(c&&f)for(g=h=0;g<e.length;++g){var m=e.charCodeAt(g);127>=m?h++:2047>=m?h+=2:55296<=m&&57343>=m?(h+=4,++g):h+=3}else h=e.length;g=h;h=Mb(4+g+1);m=h+4;B[h>>2]=g;if(c&&f){if(f=m,m=g+1,g=x,0<m){m=f+\nm-1;for(var k=0;k<e.length;++k){var n=e.charCodeAt(k);if(55296<=n&&57343>=n){var r=e.charCodeAt(++k);n=65536+((n&1023)<<10)|r&1023}if(127>=n){if(f>=m)break;g[f++]=n}else{if(2047>=n){if(f+1>=m)break;g[f++]=192|n>>6}else{if(65535>=n){if(f+2>=m)break;g[f++]=224|n>>12}else{if(f+3>=m)break;g[f++]=240|n>>18;g[f++]=128|n>>12&63}g[f++]=128|n>>6&63}g[f++]=128|n&63}}g[f]=0}}else if(f)for(f=0;f<g;++f){k=e.charCodeAt(f);if(255<k)throw U(m),new J(\"String has UTF-16 code units that do not fit in 8 bits\");x[m+f]=\nk}else for(f=0;f<g;++f)x[m+f]=e[f];null!==d&&d.push(U,h);return h},argPackAdvance:8,readValueFromPointer:Va,W(d){U(d)}})},p:(a,b,c)=>{c=G(c);if(2===b){var d=ub;var e=vb;var g=wb;var f=()=>z;var h=1}else 4===b&&(d=xb,e=yb,g=zb,f=()=>B,h=2);L(a,{name:c,fromWireType:m=>{for(var k=B[m>>2],n=f(),r,q=m+4,t=0;t<=k;++t){var u=m+4+t*b;if(t==k||0==n[u>>h])q=d(q,u-q),void 0===r?r=q:(r+=String.fromCharCode(0),r+=q),q=u+b}U(m);return r},toWireType:(m,k)=>{if(\"string\"!=typeof k)throw new J(`Cannot pass non-string to C++ string type ${c}`);\nvar n=g(k),r=Mb(4+n+b);B[r>>2]=n>>h;e(k,r+4,n+b);null!==m&&m.push(U,r);return r},argPackAdvance:8,readValueFromPointer:ob,W(m){U(m)}})},D:(a,b)=>{b=G(b);L(a,{ta:!0,name:b,argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})},j:(a,b,c)=>{a=Y(a);b=Ab(b,\"emval::as\");return Bb(b,c,a)},w:(a,b,c,d)=>{a=Cb[a];b=Y(b);return a(null,b,c,d)},q:(a,b,c,d,e)=>{a=Cb[a];b=Y(b);c=Eb(c);return a(b,b[c],d,e)},a:nb,i:a=>{if(0===a)return S(Fb());a=Eb(a);return S(Fb()[a])},m:(a,b,c)=>{b=Hb(a,b);var d=b.shift();a--;\nvar e=\"return function (obj, func, destructorsRef, args) {\\n\",g=0,f=[];0===c&&f.push(\"obj\");for(var h=[\"retType\"],m=[d],k=0;k<a;++k)f.push(\"arg\"+k),h.push(\"argType\"+k),m.push(b[k]),e+=`  var arg${k} = argType${k}.readValueFromPointer(args${g?\"+\"+g:\"\"});\\n`,g+=b[k].argPackAdvance;e+=`  var rv = ${1===c?\"new func\":\"func.call\"}(${f.join(\", \")});\\n`;d.ta||(h.push(\"emval_returnValue\"),m.push(Bb),e+=\"  return emval_returnValue(retType, destructorsRef, rv);\\n\");h.push(e+\"};\\n\");a=jb(h).apply(null,m);c=`methodCaller<(${b.map(n=>\nn.name).join(\", \")}) => ${d.name}>`;return Gb(R(c,a))},h:(a,b)=>{a=Y(a);b=Y(b);return S(a[b])},g:a=>{4<a&&(V.get(a).na+=1)},n:(a,b)=>{a=Y(a);b=Y(b);return a instanceof b},F:a=>{a=Y(a);return\"number\"==typeof a},E:a=>{a=Y(a);return\"string\"==typeof a},s:()=>S([]),r:a=>S(Eb(a)),v:()=>S({}),e:a=>{var b=Y(a);hb(b);nb(a)},k:(a,b,c)=>{a=Y(a);b=Y(b);c=Y(c);a[b]=c},c:(a,b)=>{a=Ab(a,\"_emval_take_value\");a=a.readValueFromPointer(b);return S(a)},o:()=>{p(\"\")},A:(a,b,c)=>x.copyWithin(a,b,b+c),z:a=>{var b=x.length;\na>>>=0;if(2147483648<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);var e=Math;d=Math.max(a,d);a:{e=(e.min.call(e,2147483648,d+(65536-d%65536)%65536)-w.buffer.byteLength+65535)/65536;try{w.grow(e);la();var g=1;break a}catch(f){}g=void 0}if(g)return!0}return!1},y:(a,b)=>{Jb(x.subarray(a,a+b));return 0}},Z=function(){function a(c){Z=c.exports;w=Z.I;la();Za=Z.L;na.unshift(Z.J);D--;l.monitorRunDependencies?.(D);0==D&&(null!==qa&&(clearInterval(qa),qa=null),E&&(c=E,E=null,\nc()));return Z}var b={a:Nb};D++;l.monitorRunDependencies?.(D);if(l.instantiateWasm)try{return l.instantiateWasm(b,a)}catch(c){ea(`Module.instantiateWasm callback failed with error: ${c}`),ba(c)}b=ta(b);return a(b[0])}(),Mb=Z.K,cb=Z.M,U=Z.N,Ob;E=function Pb(){Ob||Qb();Ob||(E=Pb)};\nfunction Qb(){function a(){if(!Ob&&(Ob=!0,l.calledRun=!0,!ha)){ua(na);aa(l);if(l.onRuntimeInitialized)l.onRuntimeInitialized();if(l.postRun)for(\"function\"==typeof l.postRun&&(l.postRun=[l.postRun]);l.postRun.length;){var b=l.postRun.shift();oa.unshift(b)}ua(oa)}}if(!(0<D)){if(l.preRun)for(\"function\"==typeof l.preRun&&(l.preRun=[l.preRun]);l.preRun.length;)pa();ua(ma);0<D||(l.setStatus?(l.setStatus(\"Running...\"),setTimeout(function(){setTimeout(function(){l.setStatus(\"\")},1);a()},1)):a())}}\nif(l.preInit)for(\"function\"==typeof l.preInit&&(l.preInit=[l.preInit]);0<l.preInit.length;)l.preInit.pop()();Qb();\n\n\n  return moduleArg\n}\n);\n})();\nif (typeof exports === 'object' && typeof module === 'object')\n  module.exports = Module;\nelse if (typeof define === 'function' && define['amd'])\n  define([], () => Module);\n", Or = "4.0.3", kr = class extends _r {
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
	async listVfs() {
		if (!this.core) return /* @__PURE__ */ new Set();
		try {
			let e = await this.core.listVirtualFileSystem();
			return new Set(Array.isArray(e) ? e : Object.keys(e ?? {}));
		} catch (e) {
			return console.error("Elementary VFS list error:", e), /* @__PURE__ */ new Set();
		}
	}
	async pruneVfs() {
		if (this.core) try {
			await this.core.pruneVirtualFileSystem();
		} catch (e) {
			console.error("Elementary VFS prune error:", e);
		}
	}
}, fi = [
	"pulse 25%",
	"pulse 12%",
	"half sine",
	"abs sine",
	"organ",
	"trapezoid",
	"sync saw",
	"stairs",
	"soft saw",
	"hollow",
	"shark fin",
	"double saw"
], pi = [
	"saw",
	"square",
	"triangle",
	"sine",
	"pulse",
	...fi
], mi = [
	"sine",
	"saw",
	"square",
	"triangle",
	"pulse"
], hi = [
	"sine",
	"triangle",
	"saw",
	"square",
	"pulse",
	...fi
], gi = [
	"lowpass",
	"highpass",
	"bandpass"
], _i = ["add", "multiply"], vi = 4096, yi = [
	"auto",
	"whole",
	"256",
	"512",
	"1024",
	"2048",
	"4096"
], bi = {
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
				max: pi.length - 1,
				default: 0,
				step: 1,
				enumLabels: [...pi],
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
				enumLabels: [...mi],
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
				enumLabels: [...gi]
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
			enumLabels: [..._i]
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
				max: hi.length - 1,
				default: 0,
				step: 1,
				enumLabels: [...hi],
				structural: !0
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
				enumLabels: ["free", "gate"],
				structural: !0
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
				max: yi.length - 1,
				default: 0,
				step: 1,
				enumLabels: [...yi],
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
}, xi = [
	"reverb",
	"delay",
	"echo",
	"delayS",
	"echoS",
	"comp",
	"width",
	"conv"
];
function Si(e) {
	return xi.includes(e);
}
function Ci(e) {
	let t = {};
	for (let n of bi[e].params) t[n.key] = n.default;
	return t;
}
//#endregion
//#region src/audio/vfsDecode.ts
var wi = null;
function Ti() {
	return (!wi || wi.state === "closed") && (wi = new AudioContext()), wi;
}
async function Ei(e, t, n) {
	let r = {}, i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set(), o = {}, s = {}, c = await Promise.all(t.map((e) => n(e.hash)));
	for (let [e, n] of t.entries()) {
		let t = c[e];
		if (!t) {
			console.warn(`Sample "${n.name}" (hash ${n.hash.slice(0, 8)}…) not found in storage — skipping VFS load`);
			continue;
		}
		try {
			let e = await Ti().decodeAudioData(t.slice(0)), c = e.getChannelData(0), l = 0;
			for (let e = 0; e < c.length; e++) l += Math.abs(c[e]);
			if (o[n.hash] = l, s[n.hash] = {
				frames: e.length,
				sampleRate: e.sampleRate
			}, e.numberOfChannels === 1) r[n.hash] = new Float32Array(c);
			else {
				let t = [new Float32Array(c)];
				for (let n = 1; n < e.numberOfChannels; n++) t.push(new Float32Array(e.getChannelData(n)));
				r[n.hash] = t;
			}
			e.length <= 1048576 && i.set(n.hash, Array.from({ length: e.numberOfChannels }, (t, n) => new Float32Array(e.getChannelData(n)))), a.add(n.hash);
		} catch (e) {
			console.error("Failed to decode sample for VFS:", n.name, e);
		}
	}
	return Object.keys(r).length > 0 && await e.updateVfs(r), {
		loaded: a,
		l1Sums: o,
		decodedSizes: s,
		pcm: i
	};
}
//#endregion
//#region src/domain/sampleChoices.ts
function Di(e) {
	return e.cycleLength ? e.frames < e.cycleLength + 1 : e.frames <= vi;
}
function Oi(e) {
	return Di(e) || e.frames <= 1048576 && (!!e.cycleLength || e.frames % 256 == 0);
}
function ki(e, t) {
	let n = yi[Math.round(t)] ?? "auto";
	return n === "whole" ? e.frames : Math.min(n === "auto" ? e.cycleLength ?? (Di(e) ? e.frames : 2048) : Number(n), e.frames);
}
function Ai(e, t) {
	return Math.max(1, Math.floor(e / t + .001));
}
function ji(e) {
	return Object.values(e).sort((e, t) => e.name.localeCompare(t.name));
}
var Mi = 256, Ni = 24;
function Pi(e) {
	let t = Math.max(1, Math.ceil(e / 2) - 1), n = [], r = [], i = [], a = 0;
	for (let e = 0; e < 10; e++) {
		let o = Math.min(Mi, 512 >> e, t);
		if (n.push(o), e > 0 && o === n[e - 1]) {
			r.push(r[e - 1]), i.push(i[e - 1]);
			continue;
		}
		let s = Math.max(64, 2 ** Math.ceil(Math.log2(4 * o)));
		r.push(s), i.push(a), a += s + 1;
	}
	return {
		harmonics: n,
		sizes: r,
		offsets: i,
		stride: a
	};
}
function Fi(e, t, n) {
	return `${e}:wt:${Math.round(t * 1e3) / 1e3}:c${n}`;
}
function Ii(e, t) {
	let n = Ai(e.length, t), r = Pi(t), i = new Float32Array(Ni + n * r.stride);
	i[0] = 2, i[1] = n, i[2] = 10, r.sizes.forEach((e, t) => {
		i[3 + t] = e;
	}), r.offsets.forEach((e, t) => {
		i[13 + t] = e;
	}), i[23] = r.stride;
	let a = Math.min(4096, Math.max(64, 2 ** Math.ceil(Math.log2(Math.max(1, t))))), o = new Float64Array(a), s = new Float64Array(a), c = Math.max(...r.sizes), l = new Float64Array(c), u = new Float64Array(c);
	for (let c = 0; c < n; c++) {
		let n = c * t;
		for (let r = 0; r < a; r++) o[r] = Li(e, n, t, r * t / a), s[r] = 0;
		Ri(o, s, !1);
		let d = Ni + c * r.stride;
		for (let e = 0; e < 10; e++) {
			if (e > 0 && r.offsets[e] === r.offsets[e - 1]) continue;
			let t = r.sizes[e], n = Math.min(r.harmonics[e], a / 2 - 1);
			l.fill(0, 0, t), u.fill(0, 0, t), l[0] = o[0] / a;
			for (let e = 1; e <= n; e++) l[e] = 2 * o[e] / a, u[e] = 2 * s[e] / a;
			Ri(l.subarray(0, t), u.subarray(0, t), !0);
			let c = d + r.offsets[e];
			for (let e = 0; e < t; e++) i[c + e] = l[e];
			i[c + t] = i[c];
		}
	}
	return i;
}
function Li(e, t, n, r) {
	let i = t + n, a = (r) => {
		let a = r;
		return a >= i ? a -= n : a < t && (a += n), e[Math.min(e.length - 1, Math.max(0, Math.round(a)))];
	}, o = t + r, s = Math.floor(o), c = o - s, l = a(s - 1), u = a(s), d = a(s + 1), f = a(s + 2);
	return u + .5 * c * (d - l + c * (2 * l - 5 * u + 4 * d - f + c * (3 * (u - d) + f - l)));
}
function Ri(e, t, n) {
	let r = e.length;
	for (let n = 1, i = 0; n < r; n++) {
		let a = r >> 1;
		for (; i & a; a >>= 1) i ^= a;
		i ^= a, n < i && ([e[n], e[i]] = [e[i], e[n]], [t[n], t[i]] = [t[i], t[n]]);
	}
	let i = n ? 1 : -1;
	for (let n = 2; n <= r; n <<= 1) {
		let a = i * 2 * Math.PI / n, o = Math.cos(a), s = Math.sin(a);
		for (let i = 0; i < r; i += n) {
			let r = 1, a = 0;
			for (let c = 0; c < n / 2; c++) {
				let l = i + c, u = l + n / 2, d = e[u] * r - t[u] * a, f = e[u] * a + t[u] * r;
				e[u] = e[l] - d, t[u] = t[l] - f, e[l] += d, t[l] += f;
				let p = r * o - a * s;
				a = r * s + a * o, r = p;
			}
		}
	}
}
function zi(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of Object.values(e.entities.instruments)) if (r.kind === "modular") for (let e of Object.values(r.modules)) {
		if (e.type !== "wave" || !e.sampleId) continue;
		let r = t[e.sampleId];
		if (!r?.hash || !Oi(r)) continue;
		let i = ki(r, e.params.cycle ?? 0), a = Array.from({ length: r.channels }, (e, t) => Fi(r.hash, i, t));
		n.set(a[0], {
			hash: r.hash,
			size: i,
			keys: a
		});
	}
	return [...n.values()];
}
//#endregion
//#region src/audio/wavetableVfs.ts
function Bi(e, t) {
	let n = /* @__PURE__ */ new Map(), r = [], i = "", a = /* @__PURE__ */ new Set(), o = 0, s = null, c = !1, l = async () => {
		let i = await e.listVfs(), s = !1;
		for (let t of r) {
			if (t.keys.every((e) => i.has(e))) continue;
			let r = n.get(t.hash);
			if (!r || r.length < t.keys.length) continue;
			let o = {};
			t.keys.forEach((e, n) => {
				o[e] = Ii(r[n], t.size);
			}), await e.updateVfs(o), t.keys.some((e) => a.has(e)) && (s = !0), t.keys.forEach((e) => i.add(e)), await new Promise((e) => setTimeout(e, 0));
		}
		let c = new Set(r.flatMap((e) => e.keys).filter((e) => i.has(e)));
		(s || c.size !== a.size || [...c].some((e) => !a.has(e))) && (a = c, o++, t());
	}, u = () => s ? (c = !0, s) : (s = (async () => {
		do {
			c = !1;
			try {
				await l();
			} catch (e) {
				console.error("[wavetableVfs] building tables failed:", e);
			}
		} while (c);
		s = null;
	})(), s), d = (e) => {
		let t = e.map((e) => e.keys.join("+")).sort().join(",");
		return t === i ? !1 : (r = e, i = t, !0);
	};
	return {
		keys: () => a,
		revision: () => o,
		setPcm(e) {
			n = e, u();
		},
		want(e) {
			d(e) && u();
		},
		invalidate() {
			u();
		},
		ensure(e) {
			return d(e), u();
		}
	};
}
//#endregion
//#region src/engine/samplePlay.ts
function Vi(e) {
	return I.max(I.sub(e, I.z(e)), I.const({ value: 0 }));
}
function Hi(e, t, n, r, i, a, o) {
	let s = Vi(r), c = I.accum(r, s), l = I.and(I.le(I.const({ value: 0 }), c), I.le(c, I.const({ value: a / o + 128 }))), u = I.accum(I.mul(i, l), s);
	return I.mc.table({
		key: `${e}:tbl`,
		path: t,
		channels: n
	}, u);
}
function Ui(e, t, n, r, i, a) {
	let o = I.mul(r, I.const({ value: a / i })), s = I.phasor(o);
	return I.mc.table({
		key: `${e}:tbl`,
		path: t,
		channels: n
	}, s);
}
//#endregion
//#region src/engine/reverbFdn.ts
var Wi = 44100, Gi = (e) => Wi * e / 1e3, Ki = [
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
function qi(e, t, n, r) {
	let i = r.map((r, i) => I.sdelay({
		key: `${e}:${t}:s${i}`,
		size: n * ((i + 1) / 8)
	}, r));
	return Ki.map((e) => I.add(...e.map((e, t) => I.mul(e, i[t]))));
}
function Ji(e, t, n, r, i, a, o) {
	let s = o.map((n, a) => I.add(n, I.mul(r, I.smooth(i, I.tapIn({ name: `${e}:${t}:fdn${a}` })))));
	return Ki.map((e) => I.add(...e.map((e, t) => I.mul(e, s[t])))).map((r, i) => {
		let o = I.mul(I.add(1, I.mul(3, n)), Gi((i + 1) * a)), s = I.add(o, I.mul(Gi(2.5), I.cycle(.1 + i * .01)));
		return I.tapOut({ name: `${e}:${t}:fdn${i}` }, I.delay({
			key: `${e}:${t}:d${i}`,
			size: Gi(750)
		}, s, 0, r));
	});
}
function Yi(e, t, n, r, i, a, o, s) {
	let c = I.add(.25, I.mul(r, .6)), l = [
		o,
		s,
		I.mul(.5, I.add(o, s)),
		I.mul(.5, I.sub(o, s))
	], u = [...l, ...l.map((e) => I.mul(-1, e))], d = qi(e, "d1", Gi(14), u), f = qi(e, "d2", Gi(35), d), p = Ji(e, "r0", t, n, c, 12, Ji(e, "d4", t, .004, c, 8, qi(e, "d3", Gi(52), f))), m = I.mul(.25, I.add(p[0], p[2], p[4], p[6])), h = I.mul(.25, I.add(p[1], p[3], p[5], p[7])), g = I.mul(.5, I.add(m, h)), _ = I.mul(.5, I.sub(m, h));
	return {
		left: I.select(a, I.add(g, I.mul(i, _)), o),
		right: I.select(a, I.sub(g, I.mul(i, _)), s)
	};
}
//#endregion
//#region src/engine/wavetableShapes.ts
var Xi = [
	"sine",
	"saw",
	"square",
	"triangle",
	"pulse 25%",
	"pulse 12%",
	"half sine",
	"abs sine",
	"organ",
	"trapezoid",
	"sync saw",
	"stairs",
	"soft saw",
	"hollow",
	"shark fin",
	"double saw"
];
function Zi(e, t, { bandlimit: n = !0, ...r } = {}) {
	let i = { shape: e };
	return n || (i.bandlimit = !1), $i(i, t, r);
}
function Qi(e, t, { position: n, ...r } = {}) {
	return $i({ path: e }, t, r, n);
}
function $i(e, t, { phase: n, reset: r, key: i }, a) {
	i && (e.key = i);
	let o = () => I.const({ value: 0 }), s = [
		t,
		n,
		r,
		a
	], c = s.reduce((e, t, n) => t ? n : e, 0);
	return A("wtosc", e, s.slice(0, c + 1).map((e) => e ?? o()));
}
//#endregion
//#region src/engine/modular.ts
var B = 0, ea = (e) => typeof e == "number" ? I.const({ value: e }) : e;
function ta(e, t, n, r, i) {
	let a = I.const({ value: 1 }), o = I.const({ value: 0 }), s = I.const({ value: 1e-4 }), c = I.accum(i, I.sub(a, i)), l = I.mul(e, I.sr()), u = I.le(c, l), d = I.select(i, I.select(u, a, n), o), f = I.max(s, I.select(i, I.select(u, e, t), r));
	return I.smooth(I.tau2pole(f), d);
}
var V = 576e3, na = 2048;
function ra(e, t) {
	return I.div(I.mul(e, I.sr()), t);
}
function ia(e, t, n, r = e.id, i = {}, a = 1, o = {}, s, c, l, u = 8) {
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
		let a = C(i);
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
		let r = () => I.max(I.const({ value: 0 }), t);
		switch (pi[e]) {
			case "saw": return I.blepsaw(r());
			case "square": return I.blepsquare(r());
			case "pulse": return I.dcblock(I.sub(I.mul(I.le(I.phasor(r()), n), I.const({ value: 2 })), I.const({ value: 1 })));
			default: return Zi(Xi.indexOf(pi[e]), t);
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
	function x(e, t, n, r) {
		let i = hi[e];
		if (i === "pulse") {
			let e = n === null ? I.phasor(t) : I.syncphasor(t, n);
			return I.sub(I.mul(I.le(e, r()), I.const({ value: 2 })), I.const({ value: 1 }));
		}
		return Zi(Xi.indexOf(i), t, {
			bandlimit: !1,
			...n === null ? {} : { reset: n }
		});
	}
	function S(e, t, n, i, a, o, s, c) {
		let l = o === null ? I.phasor(a) : I.syncphasor(a, o), u = I.add(l, s), d = I.sub(u, I.floor(u)), f = Math.max(1, t.frames - 1), p = (i, a) => I.mc.table({
			key: `${r}:${e}:${a}:${t.hash}`,
			path: t.hash,
			channels: t.channels
		}, I.div(I.add(I.mul(i, n), I.mul(d, n - 1)), f));
		if (i === 1) return p(0, "tbl");
		let m = I.mul(c(), i - 1), h = I.floor(m), g = I.min(i - 1, I.add(h, 1)), _ = I.sub(m, h), v = p(h, "tblA"), y = p(g, "tblB");
		return v.map((e, t) => I.add(e, I.mul(I.sub(y[t], e), _)));
	}
	function C(e) {
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
				let t = g(e.id, "freq") ?? 440, n = 2 ** ((c.detune ?? 0) / 12 + (c.finetune ?? 0) / 1200), r = v(typeof t == "number" ? I.const({ value: t * n }) : n === 1 ? t : I.mul(t, I.const({ value: n })), e), i = m(f("gain"), c.gain ?? 1);
				return I.mul(y(Math.round(c.waveform ?? 0), r, m(f("pulseWidth"), c.pulseWidth ?? .5)), i);
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
				return ta(m(f("attack"), c.attack ?? .005), m(f("decay"), c.decay ?? .12), m(f("sustain"), c.sustain ?? .7), m(f("release"), c.release ?? .25), t);
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
				let t = m(f("rate"), c.rate ?? 4), n = m(f("amount"), c.amount ?? 1), r = m(f("amountScale"), c.amountScale ?? 1), i = Math.round(c.sync ?? 0) === 1 ? ea(g(e.id, "gate") ?? B) : null, a = x(Math.round(c.waveform ?? 0), t, i, () => m(f("pulseWidth"), c.pulseWidth ?? .5));
				return I.mul(a, n, r);
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
				let n = ra(m(f("time"), c.time ?? 1.25), u), i = I.delay({
					key: `${r}:${e.id}`,
					size: V
				}, n, 0, t), a = m(f("mix"), c.mix ?? .5);
				return I.add(I.mul(t, I.sub(I.const({ value: 1 }), a)), I.mul(i, a));
			}
			case "echo": {
				let t = g(e.id, "in") ?? B;
				if (c.bypass) return t;
				let n = ra(m(f("time"), c.time ?? 1.25), u), i = m(f("feedback"), c.feedback ?? .25), a = I.delay({
					key: `${r}:${e.id}`,
					size: V
				}, n, i, t), o = m(f("mix"), c.mix ?? .5);
				return I.add(I.mul(t, I.sub(I.const({ value: 1 }), o)), I.mul(a, o));
			}
			case "delayS": {
				let t = g(e.id, "in") ?? B, n = g(e.id, "inR"), i = n !== null, a = i ? n : t;
				if (c.bypass) return d.set(`${e.id}:outR`, a), t;
				let o = ra(m(f("time"), c.time ?? 1.25), u), s = m(f("mix"), c.mix ?? .5), l = m(f("pingpong"), c.pingpong ?? 0), p = I.sub(I.const({ value: 1 }), s), h = I.sub(I.const({ value: 1 }), l), _ = I.delay({
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
				let o = ra(m(f("time"), c.time ?? 1.25), u), s = I.mul(o, I.const({ value: 2 })), l = m(f("feedback"), c.feedback ?? .25), p = I.mul(l, l), h = m(f("mix"), c.mix ?? .5), _ = m(f("pingpong"), c.pingpong ?? 0), v = I.sub(I.const({ value: 1 }), h), y = I.sub(I.const({ value: 1 }), _), b = I.delay({
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
					size: na
				}, I.const({ value: 573 }), 0, b), w = I.add(b, I.mul(_, x), I.mul(S, C)), T = I.sub(b, I.mul(_, x), I.mul(S, C)), E = I.add(I.mul(t, h), I.mul(w, s)), D = I.add(I.mul(a, h), I.mul(T, s));
				return d.set(`${e.id}:outR`, D), E;
			}
			case "width": {
				let t = g(e.id, "in") ?? B, n = g(e.id, "inR"), i = n !== null;
				if (c.bypass) return d.set(`${e.id}:outR`, i ? n : t), t;
				let a = m(f("width"), c.width ?? 1), o = i ? n : t, s = I.mul(I.const({ value: .5 }), I.add(t, o)), l = I.mul(I.const({ value: .5 }), I.sub(t, o)), u = I.max(I.const({ value: 0 }), I.sub(a, I.const({ value: 1 }))), p = I.delay({
					key: `${r}:${e.id}:spread`,
					size: na
				}, I.const({ value: 573 }), 0, s), h = I.add(s, I.mul(a, l), I.mul(u, p)), _ = I.sub(s, I.mul(a, l), I.mul(u, p));
				return d.set(`${e.id}:outR`, _), h;
			}
			case "reverb": {
				let t = g(e.id, "in") ?? B, n = g(e.id, "inR"), i = n !== null;
				if (c.bypass) return d.set(`${e.id}:outR`, i ? n : t), t;
				let a = m(f("roomSize"), c.roomSize ?? .5), o = m(f("feedback"), c.feedback ?? .45), s = m(f("damping"), c.damping ?? .5), l = m(f("stereoWidth"), c.stereoWidth ?? .6), u = m(f("mix"), c.mix ?? .35), { left: p, right: h } = Yi(`${r}:${e.id}`, a, o, s, l, u, t, i ? n : t);
				return d.set(`${e.id}:outR`, h), p;
			}
			case "sample": {
				let t = g(e.id, "gate") ?? B, n = g(e.id, "freq"), a = e.sampleId ? i[e.sampleId] : void 0;
				if (!a?.hash) return B;
				let o = Math.round(c.pitchTrack ?? 1), s = Math.round(c.loop ?? 0), l = m(f("gain"), c.gain ?? 1), u = m(f("playRate"), c.playRate ?? 0), p = m(f("finetune"), c.finetune ?? 0), h = I.const({ value: Math.LN2 }), _ = I.exp(I.mul(h, I.add(I.div(u, 12), I.div(p, 12)))), v = o && n !== null ? I.mul(I.div(n, I.const({ value: Mr(60) })), _) : _;
				if (s) {
					let n = Ui(`${r}:${e.id}:${a.hash}`, a.hash, a.channels, v, a.frames, a.sampleRate), i = ta(.001, .05, 1, .05, t), o = I.mul(n[0], l, i);
					return a.channels === 2 ? d.set(`${e.id}:outR`, I.mul(n[1], l, i)) : d.set(`${e.id}:outR`, o), o;
				}
				let y = Hi(`${r}:${e.id}:${a.hash}`, a.hash, a.channels, t, I.div(v, I.const({ value: a.frames })), a.frames, .001), b = I.mul(y[0], l);
				return a.channels === 2 ? d.set(`${e.id}:outR`, I.mul(y[1], l)) : d.set(`${e.id}:outR`, b), b;
			}
			case "wave": {
				let t = g(e.id, "freq"), n = e.sampleId ? i[e.sampleId] : void 0;
				if (!n?.hash || !Oi(n)) return B;
				let r = m(f("gain"), c.gain ?? 1), a = 2 ** ((c.octave ?? 0) + (c.semi ?? 0) / 12 + (c.finetune ?? 0) / 1200), o = t === null ? I.const({ value: 440 * a }) : a === 1 ? t : I.mul(t, I.const({ value: a })), s = v(typeof o == "number" ? I.const({ value: o }) : o, e), l = g(e.id, "sync"), u = g(e.id, "pm"), p = m(f("phase"), c.phase ?? 0), h = u === null ? p : I.add(p, I.mul(u, m(f("pmDepth"), c.pmDepth ?? 1))), _ = ki(n, c.cycle ?? 0), y = Ai(n.frames, _), b = g(e.id, "pos"), x = m(f("position"), c.position ?? 0), C = () => I.min(1, I.max(0, b === null ? x : I.add(x, b))), w, T = Array.from({ length: n.channels }, (e, t) => Fi(n.hash, _, t));
				w = T.every((e) => n.mipKeys?.has(e)) ? T.map((e) => Qi(e, s, {
					phase: h,
					...l === null ? {} : { reset: ea(l) },
					...y > 1 ? { position: C() } : {}
				})) : S(e.id, n, _, y, s, l, h, C);
				let E = I.mul(w[0], r);
				return n.channels === 2 ? d.set(`${e.id}:outR`, I.mul(w[1], r)) : d.set(`${e.id}:outR`, E), E;
			}
			case "output": return B;
		}
	}
	let w = e.modules[e.outputId], T = w ? m(`${w.id}:gain`, w.params.gain ?? 1) : I.const({ value: 1 }), E = w ? g(e.outputId, "inL") ?? B : B, D = w ? g(e.outputId, "inR") ?? E : B, O = (e) => typeof e == "number" ? I.const({ value: e }) : e;
	return {
		left: I.mul(O(E), T),
		right: I.mul(O(D), T)
	};
}
//#endregion
//#region src/engine/instruments.ts
function aa(e, t, n, r, i = {}, a = 0, o = {}, s = 1, c = {}, l, u, d, f = 8) {
	switch (e.kind) {
		case "modular": return ia(e, t, n, r, i, s, c, l, u, d, f);
		case "drumkit": return {
			left: I.const({ value: 0 }),
			right: I.const({ value: 0 })
		};
	}
}
function oa(e, t, n, r, i, a, o, s, c, l, u = {}, d, f = 0, p = 8) {
	let m = I.const({ value: 0 }), h = m, g = m;
	if (e.sampleId) {
		let t = o[e.sampleId];
		if (t || console.warn(`Drumkit slot "${e.id}" references unknown sample "${e.sampleId}" — no hash found`), t) {
			let r = a[e.sampleId];
			if (r?.hash || console.warn(`Sample hash "${t.slice(0, 8)}…" (slot "${e.id}") not loaded in VFS — sample may be missing from storage`), r?.hash) {
				let a = `${i}:slot:${e.id}:${t}`, o = Mr(e.baseNote) / 261.6255653005986, s = Hi(a, t, r.channels, n, o / r.frames, r.frames, o);
				h = s[0], g = s[+(r.channels >= 2)];
			}
		}
	} else if (e.instrumentId) {
		let d = t[e.instrumentId];
		if (d) {
			let t = aa(d, r, n, `${i}:${e.id}`, a, 0, o, 1, u, s, c, l, p);
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
function sa(e, t, n) {
	return `chan:${e}:${t}:${n}`;
}
function ca(e, t, n) {
	return n ? n.getOrCreate(e, t) : I.const({
		key: e,
		value: t
	});
}
function la(e, t, n, r, i = 8, a = {}) {
	let o = t;
	for (let t of e) o = ua(t, o, n, r, i, a);
	return o;
}
function ua(e, t, n, r, i = 8, a = {}) {
	let o = e.params, s = (t) => sa(n, e.id, t), c = (e, t) => ca(s(e), t, r), l = c("bypass", +!!o.bypass), u = Si(e.type), d = e.side;
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
			let r = ra(c("time", o.time ?? 1.25), i), a = c("mix", o.mix ?? .5), s = I.sub(I.const({ value: 1 }), a), l = I.delay({
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
			let r = ra(c("time", o.time ?? 1.25), i), a = c("feedback", o.feedback ?? .25), s = c("mix", o.mix ?? .5), l = I.sub(I.const({ value: 1 }), s), u = I.delay({
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
			let r = ra(c("time", o.time ?? 1.25), i), a = c("mix", o.mix ?? .5), s = c("pingpong", o.pingpong ?? 0), l = I.sub(I.const({ value: 1 }), a), u = I.sub(I.const({ value: 1 }), s), d = I.delay({
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
			let r = ra(c("time", o.time ?? 1.25), i), a = I.mul(r, I.const({ value: 2 })), s = c("feedback", o.feedback ?? .25), l = I.mul(s, s), u = c("mix", o.mix ?? .5), d = c("pingpong", o.pingpong ?? 0), f = I.sub(I.const({ value: 1 }), u), m = I.sub(I.const({ value: 1 }), d), h = I.delay({
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
			return p(Yi(`chan:${n}:${e.id}`, r, i, a, s, l, t.left, t.right));
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
				size: na
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
function da(e, t) {
	let n = I.const({ value: 1 }), r = I.mul(I.add(t, n), I.const({ value: Math.PI / 4 }));
	return {
		left: I.mul(e.left, I.cos(r), I.const({ value: Math.SQRT2 })),
		right: I.mul(e.right, I.sin(r), I.const({ value: Math.SQRT2 }))
	};
}
function fa(e, t, n, r, i) {
	let a = ca(`chan:${r}:volume`, t, i), o = da(e, ca(`chan:${r}:pan`, n, i));
	return {
		left: I.mul(o.left, a),
		right: I.mul(o.right, a)
	};
}
//#endregion
//#region src/engine/compile.ts
function pa(e, t, n, r, i) {
	return Object.fromEntries(Object.values(e).map((e) => {
		let a = r?.[e.hash], o = a && e.frames > 0 ? a.frames / e.frames : 1;
		return [e.id, {
			hash: !t || t.has(e.hash) ? e.hash : "",
			channels: e.channels,
			sampleRate: a?.sampleRate ?? e.sampleRate,
			frames: a?.frames ?? e.frames,
			cycleLength: e.cycleLength === void 0 ? void 0 : e.cycleLength * o,
			l1: n?.[e.hash],
			mipKeys: i
		}];
	}));
}
function ma(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) t[n] = r.hash;
	return t;
}
function ha(e) {
	return e.kind === "modular" ? 1 : e.params.gain;
}
function ga(e, t) {
	let n = I.const({ value: .5 }), r = I.mul(I.sub(e, n), 2 * t);
	return I.exp(I.mul(r, Math.LN2 / 12));
}
function _a(e, t, n, r, i) {
	let a = I.mul(.5, I.exp(I.mul(t, Math.log(r / .5)))), o = I.cycle(a), s = I.mul(o, n, i), c = I.exp(I.mul(s, Math.LN2 / 12));
	return I.mul(e, c);
}
function va(e, t, n, r, i) {
	let a = I.mul(.5, I.exp(I.mul(t, Math.log(r / .5)))), o = I.cycle(a), s = I.sub(1, I.mul(n, I.mul(I.sub(1, I.abs(o)), i)));
	return I.mul(e, s);
}
function ya(e, t, n, r, i, a, o = I.const({ value: 8 }), s) {
	if (!t) return null;
	let c = I.const({
		key: "lv:zero",
		value: 0
	}), l = Mr(69), u = c, d = c, f = s ? s.map((t) => e.entities.instruments[t]).filter((e) => e !== void 0) : Object.values(e.entities.instruments);
	if (f.length === 0) return null;
	for (let s of f) if (s.kind === "drumkit") {
		let f = c, p = c;
		for (let c = 0; c < s.slots.length; c++) for (let u = 0; u < 1; u++) {
			let d = `${s.id}:ds:${c}:v${u}`, m = t.getOrCreate(`${d}:freq`, l), h = t.getOrCreate(`${d}:gate`, 0), g = t.getOrCreate(`${d}:vel`, 1), _ = oa(s.slots[c], e.entities.instruments, h, m, d, n, r, i, t, a, {}, s.id, s.pan ?? 0, o);
			f = I.add(f, I.mul(_.left, g)), p = I.add(p, I.mul(_.right, g));
		}
		let m = t.getOrCreate(`${s.id}:gain`, s.params.gain);
		u = I.add(u, I.mul(f, .3, m)), d = I.add(d, I.mul(p, .3, m));
	} else {
		let e = [];
		for (let c = 0; c < Fr(s); c++) {
			let u = `${s.id}:v:${c}`, d = t.getOrCreate(`${u}:freq`, l), f = t.getOrCreate(`${u}:gate`, 0), p = t.getOrCreate(`${u}:vel`, 1);
			e.push(aa(s, d, f, u, n, 0, r, p, {}, i, t, a, o));
		}
		u = I.add(u, I.mul(e.reduce((e, t) => I.add(e, t.left), c), .3)), d = I.add(d, I.mul(e.reduce((e, t) => I.add(e, t.right), c), .3));
	}
	return {
		left: u,
		right: d
	};
}
function ba(e, t, n, r, i, a) {
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
			let _ = n.paramRefs ? I.sm(n.paramRefs.getOrCreate(`tracker:${h}:mute`, 1)) : s, v = n.paramRefs ? n.paramRefs.getOrCreate(`${l.id}:gain`, ha(l)) : I.const({ value: ha(l) }), y = n.paramRefs ? n.paramRefs.getOrCreate(`inst:${l.id}:pan`, l.pan ?? 0) : I.const({ value: l.pan ?? 0 });
			if (c.isDrumkit && l.kind === "drumkit") {
				let t = c.drumSounds ?? 0, s = 2 * t, p = [], b = [];
				for (let e = 0; e < t; e++) p.push(u[m + e]), b.push(u[m + t + e]);
				let x = u[m + s + z.vol], S = u[m + s + z.portamento], C = ga(S, f?.portamento ?? 4), w = u[m + s + z.volumeSlide], T = u[m + s + z.panning], E = u[m + s + z.tremoloRate], D = u[m + s + z.tremoloDepth], O = va(w, E, D, f?.tremoloRate ?? 100, f?.tremoloDepth ?? 1), ee = o, te = o;
				for (let o = 0; o < t; o++) {
					let t = l.slots[o], s = I.mul(b[o], C), c = oa(t, e.entities.instruments, p[o], s, h, r, i, n.midiCcValues, n.paramRefs, n.ccBindings, g, l.id, y, a);
					ee = I.add(ee, c.left), te = I.add(te, c.right);
				}
				let ne = I.mul(T, Math.PI / 2), re = {
					left: I.mul(ee, O, x, _, I.cos(ne), v, I.const({ value: .25 })),
					right: I.mul(te, O, x, _, I.sin(ne), v, I.const({ value: .25 }))
				};
				d(l.channelId ?? "master").push(re);
			} else {
				let e = u[m + R.gate], t = u[m + R.freq], o = u[m + R.vol], s = u[m + R.portamento], c = ga(s, f?.portamento ?? 4), p = u[m + R.volumeSlide], v = u[m + R.panning], b = u[m + R.vibratoRate], x = u[m + R.vibratoDepth], S = u[m + R.tremoloRate], C = u[m + R.tremoloDepth], w = I.mul(t, c);
				w = _a(w, b, x, f?.vibratoRate ?? 100, f?.vibratoDepth ?? .5);
				let T = va(p, S, C, f?.tremoloRate ?? 100, f?.tremoloDepth ?? 1), E = aa(l, w, e, h, r, 0, i, T, g, n.midiCcValues, n.paramRefs, n.ccBindings, a), D = I.mul(v, Math.PI / 2), O = {
					left: I.mul(E.left, I.cos(D)),
					right: I.mul(E.right, I.sin(D))
				}, ee = {
					left: I.mul(O.left, o, T, _, I.const({ value: .25 })),
					right: I.mul(O.right, o, T, _, I.const({ value: .25 }))
				};
				d(l.channelId ?? "master").push(da(ee, y));
			}
		}
	}
	return c;
}
function xa(e, t) {
	t.ccBindings?.clear();
	let n = pa(e.entities.samples, t.vfsLoadedHashes, t.l1Sums, t.decodedSizes, t.wavetableMips), r = ma(e.entities.samples), i = t.paramRefs ? t.paramRefs.getOrCreate("transport:rowHz", t.rowHz) : I.const({ value: t.rowHz }), a = ya(e, t.paramRefs, n, r, t.midiCcValues, t.ccBindings, i, t.liveVoiceInstIds), o = Wr(e, t.ensureSlotInstId), s = o.length > 0 ? ba(e, o, t, n, r, i) : /* @__PURE__ */ new Map();
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
		let d = fa(s.kind === "sub" || s.kind === "master" ? la(s.effects, o, r, t.paramRefs, i, n) : o, s.volume, s.pan, r, t.paramRefs);
		l = I.add(l, d.left), u = I.add(u, d.right);
	}
	let d = e.entities.mixChannels[Lr], f = {
		left: l,
		right: u
	};
	d && (f = la(d.effects, f, Lr, t.paramRefs, i, n), f = fa(f, d.volume, d.pan, Lr, t.paramRefs));
	let p = t.paramRefs ? t.paramRefs.getOrCreate("transport:playing", t.playing) : I.const({ value: t.playing }), m = {
		left: I.mul(f.left, p),
		right: I.mul(f.right, p)
	};
	return a ? {
		left: I.add(m.left, a.left),
		right: I.add(m.right, a.right)
	} : m;
}
function Sa(e) {
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
function Ca(e, t) {
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
function wa(e) {
	let t = e.sectionIds.flatMap((t) => {
		let n = e.entities.sections[t];
		if (!n) return [];
		let r = Ca(e, [t]).reduce((t, n) => t + (e.entities.patterns[n.patternId]?.length ?? 0), 0);
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
function Ta(e, t) {
	let n = Ea(e, t);
	return n.length > 0 ? n : null;
}
function Ea(e, t) {
	if (typeof t == "object" && "song" in t) return Ca(e, e.sectionIds);
	let n = typeof t == "string" || "section" in t ? Da(e, typeof t == "string" ? t : t.section) : void 0;
	if (n) return Ca(e, [n]);
	if (typeof t == "object" && "section" in t) return [];
	let r = Oa(e, typeof t == "string" ? t : t.pattern);
	return r ? [{
		patternId: r,
		startRow: 0
	}] : [];
}
function Da(e, t) {
	return e.sectionIds.find((e) => e === t) ?? e.sectionIds.find((n) => e.entities.sections[n]?.name === t);
}
function Oa(e, t) {
	return e.entities.patterns[t] ? t : Object.values(e.entities.patterns).find((e) => e.name === t)?.id;
}
function ka(e, t, n, r) {
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
function Aa(e, t) {
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
function ja(e, t) {
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
function Ma(e, t) {
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
function Na(e, t, n) {
	return n > 0 ? ((e + t) % n + n) % n : 0;
}
function Pa(e, t, n, r) {
	return t * r + n - e;
}
function Fa(e, t, n, r = {
	start: 0,
	length: e.totalRows
}, i = 0) {
	let a = Math.max(1, Math.min(n, e.totalRows)), { rowOffset: o, ...s } = a < e.totalRows ? Yr(e, 0, a - 1) : e;
	return {
		at: a,
		bridge: Aa(s, t),
		settle: Aa(ja(t, a), t),
		target: t,
		fromStart: r.start,
		fromLength: r.length,
		toOffset: i
	};
}
function Ia(e, t, n, r = 0) {
	if (!t) {
		let t = e.totalRows;
		return {
			data: ja(e, 2 * t),
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
function La(e, t, n, r) {
	let i = e.totalRows;
	return !t && i > 2 * r && i - n <= r;
}
function Ra(e, t, n, r) {
	let i = e.length, a = ((t - e.start) % i + i) % i, o = n > 0 ? Math.min(n, i) : i, s = a + r, c = Math.ceil(s / o) * o, l = c <= i ? c : i + Math.ceil((s - i) / o) * o;
	return Math.min(e.limit, t + (l - a));
}
function za(e, t, n, r) {
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
//#region node_modules/fflate/esm/browser.js
var H = Uint8Array, Ba = Uint16Array, Va = Int32Array, Ha = new H([
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
]), Ua = new H([
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
]), Wa = new H([
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
]), Ga = function(e, t) {
	for (var n = new Ba(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new Va(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, Ka = Ga(Ha, 2), qa = Ka.b, Ja = Ka.r;
qa[28] = 258, Ja[258] = 28;
var Ya = Ga(Ua, 0), Xa = Ya.b;
Ya.r;
for (var Za = new Ba(32768), U = 0; U < 32768; ++U) {
	var Qa = (U & 43690) >> 1 | (U & 21845) << 1;
	Qa = (Qa & 52428) >> 2 | (Qa & 13107) << 2, Qa = (Qa & 61680) >> 4 | (Qa & 3855) << 4, Za[U] = ((Qa & 65280) >> 8 | (Qa & 255) << 8) >> 1;
}
for (var $a = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new Ba(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new Ba(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new Ba(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[Za[d] >> c] = l;
	} else for (s = new Ba(r), i = 0; i < r; ++i) e[i] && (s[i] = Za[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), eo = new H(288), U = 0; U < 144; ++U) eo[U] = 8;
for (var U = 144; U < 256; ++U) eo[U] = 9;
for (var U = 256; U < 280; ++U) eo[U] = 7;
for (var U = 280; U < 288; ++U) eo[U] = 8;
for (var to = new H(32), U = 0; U < 32; ++U) to[U] = 5;
var no = /*#__PURE__*/ $a(eo, 9, 1), ro = /*#__PURE__*/ $a(to, 5, 1), io = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, W = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, ao = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, oo = function(e) {
	return (e + 7) / 8 | 0;
}, so = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new H(e.subarray(t, n));
}, co = [
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
	var r = Error(t || co[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, G), !n) throw r;
	return r;
}, lo = function(e, t, n, r) {
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
				var y = oo(d) + 4, b = e[y - 4] | e[y - 3] << 8, x = y + b;
				if (x > i) {
					c && G(0);
					break;
				}
				s && l(f + b), n.set(e.subarray(y, x), f), t.b = f += b, t.p = d = x * 8, t.f = u;
				continue;
			} else if (v == 1) p = no, m = ro, h = 9, g = 5;
			else if (v == 2) {
				var S = W(e, d, 31) + 257, C = W(e, d + 10, 15) + 4, w = S + W(e, d + 5, 31) + 1;
				d += 14;
				for (var T = new H(w), E = new H(19), D = 0; D < C; ++D) E[Wa[D]] = W(e, d + D * 3, 7);
				d += C * 3;
				for (var O = io(E), ee = (1 << O) - 1, te = $a(E, O, 1), D = 0; D < w;) {
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
				h = io(ae), g = io(oe), p = $a(ae, h, 1), m = $a(oe, g, 1);
			} else G(1);
			if (d > _) {
				c && G(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var se = (1 << h) - 1, ce = (1 << g) - 1, le = d;; le = d) {
			var re = p[ao(e, d) & se], ue = re >> 4;
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
					var D = ue - 257, fe = Ha[D];
					de = W(e, d, (1 << fe) - 1) + qa[D], d += fe;
				}
				var pe = m[ao(e, d) & ce], me = pe >> 4;
				pe || G(3), d += pe & 15;
				var oe = Xa[me];
				if (me > 3) {
					var fe = Ua[me];
					oe += ao(e, d) & (1 << fe) - 1, d += fe;
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
	return f != n.length && o ? so(n, 0, f) : n.subarray(0, f);
}, uo = /*#__PURE__*/ new H(0), K = function(e, t) {
	return e[t] | e[t + 1] << 8;
}, q = function(e, t) {
	return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
}, fo = function(e, t) {
	return q(e, t) + q(e, t + 4) * 4294967296;
};
function po(e, t) {
	return lo(e, { i: 2 }, t && t.out, t && t.dictionary);
}
var mo = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	mo.decode(uo, { stream: !0 });
} catch {}
var ho = function(e) {
	for (var t = "", n = 0;;) {
		var r = e[n++], i = (r > 127) + (r > 223) + (r > 239);
		if (n + i > e.length) return {
			s: t,
			r: so(e, n - 1)
		};
		i ? i == 3 ? (r = ((r & 15) << 18 | (e[n++] & 63) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) - 65536, t += String.fromCharCode(55296 | r >> 10, 56320 | r & 1023)) : i & 1 ? t += String.fromCharCode((r & 31) << 6 | e[n++] & 63) : t += String.fromCharCode((r & 15) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) : t += String.fromCharCode(r);
	}
};
function go(e, t) {
	if (t) {
		for (var n = "", r = 0; r < e.length; r += 16384) n += String.fromCharCode.apply(null, e.subarray(r, r + 16384));
		return n;
	} else if (mo) return mo.decode(e);
	else {
		var i = ho(e), a = i.s, n = i.r;
		return n.length && G(8), a;
	}
}
var _o = function(e, t) {
	return t + 30 + K(e, t + 26) + K(e, t + 28);
}, vo = function(e, t, n) {
	var r = K(e, t + 28), i = K(e, t + 30), a = go(e.subarray(t + 46, t + 46 + r), !(K(e, t + 8) & 2048)), o = t + 46 + r, s = yo(e, o, i, n, q(e, t + 20), q(e, t + 24), q(e, t + 42)), c = s[0], l = s[1], u = s[2];
	return [
		K(e, t + 10),
		c,
		l,
		a,
		o + i + K(e, t + 32),
		u
	];
}, yo = function(e, t, n, r, i, a, o) {
	var s = i == 4294967295, c = a == 4294967295, l = o == 4294967295, u = t + n, d = s + c + l;
	if (r && d) {
		for (; t + 4 < u; t += 4 + K(e, t + 2)) if (K(e, t) == 1) return [
			s ? fo(e, t + 4 + 8 * c) : i,
			c ? fo(e, t + 4) : a,
			l ? fo(e, t + 4 + 8 * (c + s)) : o,
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
function bo(e, t) {
	for (var n = {}, r = e.length - 22; q(e, r) != 101010256; --r) (!r || e.length - r > 65558) && G(13);
	var i = K(e, r + 8);
	if (!i) return {};
	var a = q(e, r + 16), o = q(e, r - 20) == 117853008;
	if (o) {
		var s = q(e, r - 12);
		o = q(e, s) == 101075792, o && (i = q(e, s + 32), a = q(e, s + 48));
	}
	for (var c = t && t.filter, l = 0; l < i; ++l) {
		var u = vo(e, a, o), d = u[0], f = u[1], p = u[2], m = u[3], h = u[4], g = u[5], _ = _o(e, g);
		a = h, (!c || c({
			name: m,
			size: f,
			originalSize: p,
			compression: d
		})) && (d ? d == 8 ? n[m] = po(e.subarray(_, _ + f), { out: new H(p) }) : G(14, "unknown compression type " + d) : n[m] = so(e, _, _ + f));
	}
	return n;
}
//#endregion
//#region src/domain/factory.ts
function xo(e, t) {
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
function So() {
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
function Co(e) {
	let t = new Set(e);
	for (let e = 1;; e++) {
		let n = `Eff In ${String(e).padStart(2, "0")}`;
		if (!t.has(n)) return n;
	}
}
//#endregion
//#region src/domain/gameMusic.ts
var wo = {
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
}, To = "play", Eo = [
	"row",
	"beat",
	"bar"
], Do = [
	"up",
	"level",
	"down"
], Oo = (e) => typeof e == "object" && !!e && !Array.isArray(e), J = (e) => Oo(e) ? e : {}, ko = (e) => Array.isArray(e) ? e : [], Ao = (e) => typeof e == "number" && Number.isFinite(e), jo = (e, t) => Ao(e) ? e : t, Mo = (e, t) => Math.max(1, Math.round(jo(e, t))), No = (e, t, n) => Math.min(n, Math.max(t, e)), Po = (e) => [...new Set(ko(e).filter((e) => Number.isInteger(e) && e >= 1))];
function Fo(e) {
	return Object.fromEntries(Object.entries(e).filter(([, e]) => e !== void 0));
}
function Io(e, t, n) {
	return Fo({
		...e,
		cue: e.cue,
		energy: No(jo(e.energy, 3), 1, 5),
		bars: Mo(e.bars, 4),
		toys: e.toys === void 0 ? void 0 : ko(e.toys).filter((e) => typeof e == "string" && n.has(e)),
		transition: typeof e.transition == "boolean" ? e.transition : void 0,
		next: e.next === void 0 ? void 0 : ko(e.next).filter((e) => typeof e == "string"),
		via: typeof e.via == "string" && t.cues.has(e.via) ? e.via : void 0,
		muted: e.muted === void 0 ? void 0 : Po(e.muted)
	});
}
function Lo(e) {
	let t = {};
	for (let [n, r] of Object.entries(J(e.groups))) t[n] = Po(r);
	let n = ko(e.stays).filter((e) => Ao(e) && e > 0);
	return {
		...e,
		groups: t,
		phraseBars: Mo(e.phraseBars, wo.phraseBars),
		fadeBars: Math.max(0, jo(e.fadeBars, wo.fadeBars)),
		stays: n.length > 0 ? n : wo.stays
	};
}
function Ro(e) {
	return Fo({
		...e,
		instrument: e.instrument,
		notes: ko(e.notes).filter(Ao),
		at: Eo.find((t) => t === e.at) ?? "row",
		rows: Mo(e.rows, 1),
		velocity: Ao(e.velocity) ? No(e.velocity, 0, 127) : void 0
	});
}
function zo(e, t) {
	if (!Oo(e)) return;
	let n = (e) => typeof e == "string" && t.cues.has(e), r = Lo(J(e.dj)), i = new Set(Object.keys(r.groups)), a = J(e.song), o = ko(a.sections).filter((e) => Oo(e) && n(e.cue)).map((e) => Io(e, t, i)), s = new Set(o.map((e) => e.cue));
	for (let e of o) e.next &&= e.next.filter((e) => s.has(e));
	let c = typeof a.start == "string" && s.has(a.start) ? a.start : o[0]?.cue ?? "", l = J(a.peak), u = {};
	for (let [t, r] of Object.entries(J(e.moods))) t === "play" || !Oo(r) || !n(r.cue) || (u[t] = Fo({
		...r,
		cue: r.cue,
		hit: n(r.hit) ? r.hit : void 0,
		muted: r.muted === void 0 ? void 0 : Po(r.muted),
		returns: typeof r.returns == "boolean" ? r.returns : void 0
	}));
	let d = {};
	for (let [t, n] of Object.entries(J(e.drops))) d[t] = Po(n);
	let f = {};
	for (let [n, r] of Object.entries(J(e.stingers))) Oo(r) && typeof r.instrument == "string" && t.instruments.has(r.instrument) && (f[n] = Ro(r));
	let p = e.fills === void 0 ? void 0 : ko(e.fills).filter((e) => Oo(e) && n(e.cue) && Do.includes(e.goes)).map((e) => Fo({
		...e,
		cue: e.cue,
		goes: e.goes,
		minEnergy: Ao(e.minEnergy) ? e.minEnergy : void 0,
		maxEnergy: Ao(e.maxEnergy) ? e.maxEnergy : void 0
	})), m = J(e.fill), h = J(e.levelUp), g = J(e.stops);
	return Fo({
		...e,
		bar: Mo(e.bar, t.linesPerBeat * 4),
		intro: n(e.intro) ? e.intro : void 0,
		song: Fo({
			...a,
			start: c,
			sections: o,
			peak: typeof l.cue == "string" && s.has(l.cue) ? {
				...l,
				cue: l.cue,
				from: No(jo(l.from, .85), 0, 1)
			} : void 0
		}),
		dj: r,
		moods: u,
		fill: n(m.cue) ? Fo({
			...m,
			cue: m.cue,
			minCascade: Mo(m.minCascade, 3),
			minBarsApart: Ao(m.minBarsApart) ? Math.max(0, m.minBarsApart) : void 0,
			minEnergy: Ao(m.minEnergy) ? m.minEnergy : void 0
		}) : void 0,
		levelUp: n(h.cue) ? {
			...h,
			cue: h.cue
		} : void 0,
		fills: p,
		drops: d,
		stops: Oo(e.stops) ? {
			...g,
			tracks: Po(g.tracks),
			everyBars: Mo(g.everyBars, 4),
			chance: No(jo(g.chance, .2), 0, 1),
			minEnergy: jo(g.minEnergy, 0)
		} : void 0,
		stingers: f
	});
}
//#endregion
//#region src/persist/completeDoc.ts
var Y = (e) => typeof e == "object" && !!e && !Array.isArray(e), X = (e, t) => typeof e == "number" && Number.isFinite(e) ? e : t, Z = (e, t) => typeof e == "string" ? e : t, Bo = (e, t) => typeof e == "boolean" ? e : t, Q = (e) => Y(e) ? e : {}, Vo = (e) => Array.isArray(e) ? e : [], Ho = (e) => typeof e == "string" && Object.hasOwn(bi, e);
function Uo(e, t) {
	let n = Q(t), r = { ...n };
	for (let [t, i] of Object.entries(Ci(e))) r[t] = X(n[t], i);
	return r;
}
function Wo(e) {
	let t = {};
	for (let [n, r] of Object.entries(Q(e.modules))) {
		if (!Y(r) || !Ho(r.type)) continue;
		let e = Q(r.pos);
		t[n] = {
			...r,
			id: n,
			params: Uo(r.type, r.params),
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
			params: Ci("output"),
			pos: {
				x: 700,
				y: 160
			}
		};
	}
	let r = (e, n) => {
		let r = Q(e), i = t[Z(r.moduleId, "")];
		return !!i && bi[i.type][n].includes(Z(r.port, ""));
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
function Go(e) {
	let t = Vo(e.slots).filter((e) => Y(e) && typeof e.note == "number").map((e) => {
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
function Ko(e, t) {
	let n = Vo(t.effects).filter((e) => Y(e) && Ho(e.type)).map((e) => ({
		...e,
		id: Z(e.id, `chef_${crypto.randomUUID()}`),
		params: Uo(e.type, e.params)
	}));
	return {
		...t,
		id: e,
		name: Z(t.name, e === "master" ? "Master" : "Channel"),
		kind: e === "master" ? "master" : "sub",
		volume: X(t.volume, 1),
		pan: X(t.pan, 0),
		mute: Bo(t.mute, !1),
		solo: Bo(t.solo, !1),
		effects: n
	};
}
function qo(e) {
	let t = Q(e);
	return {
		...t,
		note: typeof t.note == "number" ? t.note : null,
		volume: typeof t.volume == "number" ? t.volume : null,
		noteOff: Bo(t.noteOff, !1),
		hold: Bo(t.hold, !1),
		effectLanes: Q(t.effectLanes)
	};
}
function Jo(e) {
	if (!Y(e) || !Y(e.doc)) return e;
	let t = e.doc, n = Q(t.entities), r = {};
	for (let [e, t] of Object.entries(Q(n.mixChannels))) Y(t) && (r[e] = Ko(e, t));
	r.master || (r[Lr] = So());
	let i = {};
	for (let [e, t] of Object.entries(Q(n.instruments))) Y(t) && (t.kind === "modular" ? i[e] = Wo({
		...t,
		id: e
	}) : t.kind === "drumkit" && (i[e] = Go({
		...t,
		id: e
	})));
	let a = {};
	for (let [e, t] of Object.entries(Q(n.tracks))) Y(t) && (a[e] = {
		...t,
		id: e,
		cells: Vo(t.cells).map(qo),
		effectLanes: Vo(t.effectLanes).filter(Y)
	});
	let o = {};
	for (let [e, t] of Object.entries(Q(n.patterns))) {
		if (!Y(t)) continue;
		let n = Vo(t.trackIds).filter((e) => typeof e == "string" && !!a[e]), r = Math.max(1, Math.round(X(t.length, a[n[0]]?.cells ? a[n[0]].cells.length : 16)));
		for (let e of n) {
			let t = a[e];
			t.cells.length !== r && (t.cells = xo(t.cells, r));
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
		patternIds: Vo(t.patternIds).filter((e) => typeof e == "string" && !!o[e])
	});
	let c = Q(t.tempo), l = Math.max(1, Math.round(X(c.linesPerBeat, Rr.linesPerBeat))), u = Vo(t.sectionIds).filter((e) => typeof e == "string" && !!s[e]), d = (e, t) => e.flatMap((e) => [e, Z(t[e].name, "")]), f = zo(t.game, {
		cues: /* @__PURE__ */ new Set([...d(u, s), ...d(Object.keys(o), o)]),
		instruments: new Set(d(Object.keys(i), i)),
		linesPerBeat: l
	}), p = Vo(n.mixerInstrumentOrder).filter((e) => typeof e == "string" && !!i[e]), { game: m, ...h } = t;
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
function Yo(e) {
	let t;
	try {
		t = JSON.parse(e);
	} catch {
		throw Error("Not a valid song file: invalid JSON");
	}
	return Xo(t);
}
function Xo(e) {
	if (!$(e)) throw Error("Not a valid song file: expected an object");
	let t = e.schemaVersion;
	if (typeof t != "number") throw Error("Not a valid song file: missing schemaVersion");
	if (t > 18) throw Error(`Song file is version ${t}, newer than this app supports (18)`);
	return t < 2 && (e = ns(e)), t < 3 && (e = rs(e)), t < 4 && (e = is(e)), t < 5 && (e = as(e)), t < 6 && (e = os(e)), t < 7 && (e = ss(e)), t < 8 && (e = cs(e)), t < 9 && (e = ds(e)), t < 10 && (e = ps(e)), t < 12 && (e = Qo(e)), t < 13 && (e = es(e)), t < 16 && (e = ts(e)), e = _s(e), e = vs(e), e = ms(e), e = hs(e), e = gs(e), e.schemaVersion !== 18 && (e = {
		...e,
		schemaVersion: 18
	}), e = Jo(e), Zo(e), e;
}
function Zo(e) {
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
function Qo(e) {
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
var $o = (e) => e.frames / e.sampleRate <= .25;
function es(e) {
	let t = e.doc;
	if (!t || !$(t.entities)) return e;
	let n = ji($(t.entities.samples) ? t.entities.samples : {}), r = (e) => {
		if (!$(e) || !bi[e.type]?.samplePicker) return e;
		let { sampleIndex: t, ...r } = $(e.params) ? e.params : {}, i = typeof t == "number" ? Math.round(t) : 0, a = (e.type === "wave" ? n.filter($o) : n)[i]?.id;
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
function ts(e) {
	let t = e.doc;
	if (!t || !$(t.entities) || !$(t.entities.samples)) return e;
	let n = /* @__PURE__ */ new Set();
	for (let e of $(t.entities.instruments) ? Object.values(t.entities.instruments) : []) if (!(!$(e) || e.kind !== "modular" || !$(e.modules))) for (let t of Object.values(e.modules)) $(t) && t.type === "wave" && n.add(t.sampleId);
	let r = Object.fromEntries(Object.entries(t.entities.samples).map(([e, t]) => {
		let r = t;
		return [e, n.has(e) && !r.cycleLength && r.frames > 4096 && $o(r) ? {
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
function ns(e) {
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
function rs(e) {
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
function is(e) {
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
function as(e) {
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
function os(e) {
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
function ss(e) {
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
function cs(e) {
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
var ls = 125;
function us(e) {
	let t = Math.round(e / ls / .25) * .25;
	return Math.min(16, Math.max(.25, t));
}
function ds(e) {
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
					time: us(n.params.time)
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
					time: us(e.params.time)
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
function fs(e) {
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
			params: Ci("osc"),
			pos: {
				x: 260,
				y: 40
			}
		},
		[a]: {
			id: a,
			type: "adsr",
			params: Ci("adsr"),
			pos: {
				x: 260,
				y: 240
			}
		},
		[o]: {
			id: o,
			type: "gain",
			params: Ci("gain"),
			pos: {
				x: 480,
				y: 140
			}
		},
		[s]: {
			id: s,
			type: "output",
			params: {
				...Ci("output"),
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
function ps(e) {
	let t = e.doc?.entities?.instruments;
	if (!t || !$(t)) return {
		...e,
		schemaVersion: 10
	};
	let n = !1, r = {};
	for (let [e, i] of Object.entries(t)) $(i) && i.kind === "osc" ? (r[e] = fs(i), n = !0) : r[e] = i;
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
function ms(e) {
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
function hs(e) {
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
			let i = Co(a);
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
function gs(e) {
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
function _s(e) {
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
function vs(e) {
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
function ys(e) {
	let t = e instanceof Uint8Array ? e : new Uint8Array(e);
	if (t[0] === 123) return {
		file: Yo(new TextDecoder().decode(t)),
		samples: /* @__PURE__ */ new Map()
	};
	let n = bo(t), r = n["song.json"];
	if (!r) throw Error("Not a valid song file: missing song.json in zip");
	let i = /* @__PURE__ */ new Map();
	for (let [e, t] of Object.entries(n)) {
		let n = /^samples\/([0-9a-f]+)\.bin$/.exec(e);
		n && i.set(n[1], t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength));
	}
	return {
		file: Yo(go(r)),
		samples: i
	};
}
//#endregion
//#region src/player/songClock.ts
var bs = 32;
function xs(e) {
	return {
		rate: e,
		anchor: null,
		samples: [],
		lastRow: null
	};
}
var Ss = (e, t) => ((e - t) % 1 + 1.5) % 1 - .5;
function Cs(e, t, n) {
	let { rate: r, lastRow: i, anchor: a } = e;
	if (t === i) return e;
	if (a === null || i === null) return {
		...e,
		anchor: t + .5 - r * n,
		lastRow: t
	};
	if (t === i + 1 || t === 0) {
		let i = t - r * n, a = [...e.samples.slice(1 - bs), i], o = Math.max(...a.map((e) => Ss(e, i)));
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
function ws(e, t) {
	return e.anchor === null ? null : e.rate * t + e.anchor;
}
function Ts(e, t, n) {
	let r = ws(e, n);
	return {
		rate: t,
		anchor: r === null ? null : r - t * n,
		samples: [],
		lastRow: e.lastRow
	};
}
function Es(e, t, n) {
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
function Ds(e, t, n) {
	let r = e - t;
	if (n > 0) for (; r < 0;) r += n;
	return Math.max(0, r);
}
//#endregion
//#region src/headless/SongPlayer.ts
var Os = 30, ks = .1, As = class {
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
	clock = xs(1);
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
		} : ys(e);
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
		}, this.left.clear(), this.dropDeferred(), this.lastRow = 0, this.clock = xs(this.rowsPerSec), this.clockCue = null, this.playing = !0, this.host.paramRefs.setValue("transport:playing", 1), this.applyMutes(), await this.upload(i, "play"), this.emitCue(r));
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
			let e = Ma(this.dataFor(t), this.current.offset);
			return this.current = {
				cue: t,
				data: e,
				offset: this.current.offset
			}, this.applyMutes(), this.emitCue(t), this.upload(e, "update");
		}
		let a = Math.ceil(this.rowsPerSec * ks) + 1;
		if (La(this.current.data, i, this.lastRow, a)) return new Promise((t) => {
			this.deferred = {
				step: e,
				done: t
			};
		});
		i && i.cue !== this.current.cue && !(i.stage === "bridge" && this.lastRow < i.at) && (this.settleOn(i), this.applyMutes(), this.emitCue(i.cue));
		let o = Ia(this.current.data, i, this.lastRow, this.current.offset), s = n === "end" ? o.length : n === "sync" ? 1 : n.every, c = Ra(o, this.lastRow, s, a), l = o.length, u = ((this.lastRow - o.start) % l + l) % l + (c - this.lastRow), { startElapsed: d, startRow: f, loops: p } = this.played, m = d + Pa(f, p, u, l);
		this.left.set(js(this.current.cue), {
			row: u % l,
			elapsed: m
		});
		let h = this.dataFor(t), g = r ? this.left.get(js(t)) : void 0, _ = g ? Na(g.row, m - g.elapsed, h.totalRows) : 0, v = Fa(o.data, Ma(h, _), c, o, _), y = {
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
		}), this.fadeTimer ??= setInterval(() => this.stepFades(), Os);
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
		n && (this.levels.set(n.id, t), this.host.paramRefs.setValue(`${n.id}:gain`, ha(n) * t));
	}
	setVolume(e) {
		this.volume = e, this.host.paramRefs.setValue("player:volume", e);
	}
	setTempo(e, t = this.linesPerBeat) {
		this.bpm = e, this.linesPerBeat = t, this.host.paramRefs.setValue("transport:rowHz", this.rowsPerSec), this.host.setTxSeqProps({ rowsPerSec: this.rowsPerSec }), this.clock = Ts(this.clock, this.rowsPerSec, this.host.currentTime);
	}
	position(e = performance.now()) {
		let t = this.clockCue, n = t && this.playing ? ws(this.clock, this.host.outputTime(e)) : null;
		if (n === null || !t) return null;
		let r = (n % t.length + t.length) % t.length;
		return {
			cue: t.cue,
			rowsPerSecond: this.rowsPerSec,
			...Es(r, this.linesPerBeat, this.beatsPerBar)
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
		let { at: r = "now", delayRows: i = 0, rows: a = 1, velocity: o = 127 } = n, s = 1 / this.rowsPerSec, c = r === "now" ? 0 : this.timeUntil(r), l = r === "beat" ? this.linesPerBeat : r === "bar" ? this.linesPerBeat * this.beatsPerBar : 1, u = Math.max(0, this.host.currentTime - this.host.outputTime()), d = c === null ? i * s : Ds(c + i * s, r === "now" ? 0 : u, r === "now" ? 0 : l * s);
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
		return this.doc ? wa(this.doc) : [];
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
		let t = js(e), n = this.dataCache.get(t);
		if (!n) {
			let r = this.requireDoc(), i = Ta(r, e);
			if (!i) throw Error(`SongPlayer: unknown cue ${t}`);
			n = ii(r, i), this.dataCache.set(t, n);
		}
		return n;
	}
	prepare() {
		return this.host.isReady ? (this.prepared ??= this.compile(this.requireDoc()), this.prepared) : Promise.reject(/* @__PURE__ */ Error("SongPlayer: call start() from a user gesture first"));
	}
	async compile(e) {
		let t = this.host, { loaded: n, l1Sums: r, decodedSizes: i, pcm: a } = await Ei(t, Object.values(e.entities.samples), async (e) => this.samples.get(e) ?? null);
		if (e !== this.doc) return;
		let o = Bi(t, () => {});
		if (o.setPcm(a), await o.ensure(zi(e, pa(e.entities.samples, n, void 0, i))), e !== this.doc) return;
		t.paramRefs.clear();
		let s = xa(e, {
			rowHz: this.rowsPerSec,
			playing: 0,
			startRow: 0,
			playEpoch: 0,
			vfsLoadedHashes: n,
			l1Sums: r,
			decodedSizes: i,
			wavetableMips: o.keys(),
			paramRefs: t.paramRefs,
			ccBindings: t.ccBindings,
			txSeq: this.txSeqNode,
			liveVoiceInstIds: [],
			ensureSlotInstId: null
		}), c = I.sm(t.paramRefs.getOrCreate("player:volume", this.volume));
		await t.render({
			left: I.mul(s.left, c),
			right: I.mul(s.right, c)
		});
		for (let [n, r] of this.levels) {
			let i = e.entities.instruments[n];
			i && t.paramRefs.setValue(`${n}:gain`, ha(i) * r);
		}
		this.applyMutes();
	}
	applyMutes(e) {
		if (!this.doc || !this.host.isReady) return;
		let t = this.current?.data.arrangement[0]?.patternId, n = (e) => this.muted.has(e) ? 0 : this.trackLevel(e);
		for (let [r, i] of ka(this.doc, n, t, e)) this.host.paramRefs.setValue(r, i);
	}
	upload(e, t) {
		let n = this.session;
		return this.uploads = this.uploads.then(async () => {
			let r = this.setTxSeq;
			if (!r || n !== this.session || !this.playing) return;
			let i = `txseq:${this.uploadRev++}`;
			await this.host.updateVfs({ [i]: Sa(e) });
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
		let r = za(t, t.stage, t.landed, e);
		r.send === "settle" ? (t.stage = "settle", t.landed = !1, this.upload(t.settle, "update").then(() => {
			t.landed = !0;
		}), this.settleOn(t), this.applyMutes(), this.emitCue(t.cue)) : r.send === "target" && (t.finishing = !0, this.upload(t.target, "update").then(() => {
			this.transition === t && (this.transition = null);
		})), r.sounding === "from" ? this.emitRow(n.cue, r.row, t.fromLength) : this.emitRow(t.cue, r.row, t.target.totalRows);
	}
	runDeferred() {
		let e = this.deferred;
		if (!e || !this.current) return;
		let t = Math.ceil(this.rowsPerSec * ks) + 1;
		La(this.current.data, this.transition, this.lastRow, t) || (this.deferred = null, this.switchTo(e.step).then(e.done));
	}
	emitRow(e, t, n) {
		e === this.current?.cue && (t < this.played.lastRow && this.played.loops++, this.played.lastRow = t), this.clock = Cs(this.clock, t, this.host.currentTime), this.clockCue = {
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
}, js = (e) => JSON.stringify(e);
//#endregion
//#region src/player/game/plans.ts
function Ms(e, t) {
	let { sections: n, start: r } = e.song;
	return n.find((e) => e.cue === t) ?? n.find((e) => e.cue === r) ?? n[0];
}
function Ns(e, t) {
	if (t.mood !== "play") {
		let n = e.moods[t.mood];
		return n ? {
			mood: t.mood,
			cue: n.cue,
			muted: n.muted ?? [],
			...n.hit ? { hit: n.hit } : {}
		} : null;
	}
	let n = Ms(e, t.section);
	return n ? {
		mood: To,
		cue: n.cue,
		muted: n.muted ?? [],
		via: n.via
	} : null;
}
function Ps(e, t, n) {
	if (!t) return {
		kind: "cues",
		steps: [{
			cue: n.cue,
			timing: "now"
		}]
	};
	if (t.cue === n.cue) return Us(t.muted, n.muted) ? null : {
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
function Fs(e, t) {
	return !e || !t || e === t || t.energy === e.energy ? "level" : t.energy > e.energy ? "up" : "down";
}
function Is(e, t, n, r) {
	let i = (e.fills ?? []).filter((e) => e.goes === t && n >= (e.minEnergy ?? -Infinity) && n < (e.maxEnergy ?? Infinity));
	return i.length > 0 ? i[Math.min(i.length - 1, Math.floor(r() * i.length))].cue : void 0;
}
function Ls(e, t, n, r = Infinity, i = Math.random) {
	let a = e.fill;
	if (!a || t?.mood !== "play" || n !== a.minCascade || r < (a.minBarsApart ?? 0)) return null;
	let o = Ms(e, t.cue)?.energy ?? 0, s = Is(e, "level", o, i) ?? (o >= (a.minEnergy ?? -Infinity) ? a.cue : void 0);
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
function Rs(e, t, n, r = Math.random) {
	if (t?.mood !== "play") return null;
	let i = n !== void 0 && n !== t.cue, a = Ms(e, t.cue), o = i ? Fs(a, Ms(e, n)) : "level", s = Is(e, o, a?.energy ?? 0, r) ?? e.levelUp?.cue;
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
function zs(e) {
	let t = (e.fills ?? []).map((e) => e.cue);
	return e.fill && t.push(e.fill.cue), e.levelUp && t.push(e.levelUp.cue), new Set(t);
}
function Bs(e, t) {
	return e && e.cue === t ? e.muted : [];
}
function Vs(e, t) {
	let { notes: n } = e;
	return n[Math.min(Math.max(t, 1), n.length) - 1];
}
function Hs(e, t, n = 1) {
	let r = Math.min(Math.max(n, 1), 3);
	return Array.from({ length: r }, (n, r) => Vs(e, t + r));
}
function Us(e, t) {
	let n = new Set(e);
	return e.length === t.length && t.every((e) => n.has(e));
}
//#endregion
//#region src/player/game/energy.ts
var Ws = {
	heat: 0,
	rest: 0
}, Gs = .85, Ks = .9, qs = 1.5;
function Js(e) {
	return {
		heat: e.heat * Gs,
		rest: e.rest * Ks
	};
}
function Ys(e, t) {
	switch (t.kind) {
		case "reaction": return {
			...e,
			heat: Math.min(qs, e.heat + .12 * (t.nr - 1))
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
function Xs(e, t, n, r) {
	let i = 1.3 + 1.7 * t + .12 * Math.min(Math.max(n - 1, 0), 8) + 1.8 * e.heat - 2.2 * e.rest + r;
	return Math.min(5, Math.max(1, i));
}
function Zs(e) {
	return [e.energy - (e.toys?.length ? 1.5 : 0), e.energy];
}
function Qs(e, t, n, r, i, a) {
	let o = t.next ? e.filter((e) => t.next.includes(e.cue)) : e.filter((e) => e.cue !== t.cue), s = o.find((e) => e.cue === a);
	if (s) return s;
	let c = o.length > 0 ? o : e, l = (e) => {
		let [t, r] = Zs(e);
		return n < t ? t - n : n > r ? n - r : 0;
	}, u = (e) => -l(e) - (r.includes(e.cue) ? .8 : 0) + i() * .3;
	return c.map((e) => ({
		s: e,
		score: u(e)
	})).reduce((e, t) => t.score > e.score ? t : e).s;
}
function $s(e, t, n, r) {
	return !e || t % e.everyBars !== 0 || n < e.minEnergy ? !1 : r() < e.chance;
}
//#endregion
//#region src/player/game/dj.ts
var ec = "drums", tc = 1.5;
function nc(e, t) {
	let n = e.energy - tc;
	return Math.min(1, Math.max(0, (t - n) / tc));
}
var rc = (e, t) => e[Math.min(e.length - 1, Math.floor(t() * e.length))];
function ic(e, t, n, r, i = !1) {
	let a = e.toys ?? [], o = e.transition ? e.bars : e.bars * rc(t.stays, r), s = Math.round(a.length * (1 - nc(e, n)) * .6), c = i ? 0 : Math.min(a.length - 1, s), l = [], u = [...a];
	for (let e = 0; e < c; e++) l.push(...u.splice(Math.floor(r() * u.length), 1));
	return {
		section: e.cue,
		bars: 0,
		stay: o,
		out: l,
		cut: []
	};
}
function ac(e) {
	return e.bars >= e.stay;
}
function oc(e, t, n, r) {
	let i = t.toys ?? [];
	if (i.length === 0) return { kind: "hold" };
	let a = i.filter((t) => !e.out.includes(t)), o = e.out, s = a.length / i.length, c = nc(t, n), l = (t) => {
		let n = t.filter((t) => t !== e.last);
		return rc(n.length > 0 ? n : t, r);
	}, u = [
		["in", o.length > 0 ? s < c - .1 ? 4 : 1 : 0],
		["out", a.length > 1 ? s > c + .1 ? 4 : 1 : 0],
		["swap", o.length > 0 && a.length > 0 ? 2 : 0],
		["cut", a.includes(ec) && e.cut.length === 0 ? s > c ? 1.5 : .7 : 0],
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
			part: ec
		};
		default: return { kind: "hold" };
	}
}
function sc(e, t) {
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
function cc(e, t) {
	return e.cut.length > 0 || e.out.length === 0 ? { kind: "hold" } : {
		kind: "in",
		part: rc(e.out, t)
	};
}
function lc(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let [r, i] of Object.entries(t.groups)) {
		let t = e.out.includes(r) || e.cut.includes(r);
		for (let e of i) n.set(e, +!t);
	}
	return n;
}
//#endregion
//#region src/headless/GameConductor.ts
var uc = 4, dc = 2, fc = class {
	player;
	music;
	state;
	visit = null;
	nudged = !1;
	recentSections = [];
	energy = Ws;
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
		let t = this.state.mood === To, n = this.music.moods[this.state.mood]?.returns;
		e === "play" && !t && !n && this.startSong(), this.state.mood = e, this.update();
	}
	setProgress(e, t) {
		this.state.level = e, this.state.progress = t;
		let n = Ms(this.music, this.state.section), r = this.music.song.peak?.cue, i = n && !n.transition && n.energy < 4 && (!n.next || n.next.includes(r));
		this.headingForPeak && this.visit && i && n.cue !== r && (this.visit = {
			...this.visit,
			stay: Math.min(this.visit.stay, this.visit.bars)
		}, this.nudged = !0), this.update();
	}
	setEnabled(e) {
		this.enabled = e, this.update();
	}
	reaction(e, t = 1) {
		this.energy = Ys(this.energy, {
			kind: "reaction",
			nr: e
		}), e >= 2 && this.nudge();
		let { cascade: n } = this.music.stingers;
		n && this.playStinger(n, Hs(n, e, t));
		let r = performance.now(), i = (r - this.lastFillAt) / 1e3 / this.barSeconds, a = Ls(this.music, this.sounding, e, i, this.random);
		a && (this.lastFillAt = r), this.run(a);
	}
	key(e) {
		let { keys: t } = this.music.stingers;
		t && this.playStinger(t, [Vs(t, e + 1)]);
	}
	levelUp(e) {
		let { levelUp: t } = this.music.stingers;
		t && this.playStinger(t), this.energy = Ys(this.energy, { kind: "levelUp" }), this.state.level = e, this.state.progress = 0;
		let n = Ms(this.music, this.state.section);
		if (!(this.sounding?.mood !== "play" || !n) && !n.transition) {
			if (n.energy >= 4) {
				this.run(Rs(this.music, this.sounding, void 0, this.random)), this.visit &&= {
					...this.visit,
					stay: Math.max(this.visit.stay, this.visit.bars + n.bars)
				};
				return;
			}
			this.moveOn(n, (e) => Rs(this.music, this.sounding, e, this.random));
		}
	}
	stinger(e) {
		let t = this.music.stingers[e];
		t && this.playStinger(t);
	}
	nudge() {
		this.visit && ac(this.visit) && (this.nudged = !0);
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
			due: this.visit ? ac(this.visit) : !1,
			nudged: this.nudged,
			energy: this.energy,
			target: this.liveEnergy,
			lastMove: this.lastMove
		};
	}
	startSong() {
		this.state.section = this.music.song.start, this.visit = null, this.nudged = !1, this.recentSections = [], this.energy = Ws, this.sectionNoise = 0, this.lastMove = null;
	}
	get headingForPeak() {
		let { peak: e } = this.music.song;
		return !!e && this.state.progress >= e.from && this.peakedLevel !== this.state.level;
	}
	get liveEnergy() {
		let { level: e, progress: t } = this.state;
		return Xs(this.energy, t, e, this.sectionNoise);
	}
	get barSeconds() {
		let e = this.player.position()?.rowsPerSecond ?? 8;
		return this.music.bar / e;
	}
	onRow(e) {
		let t = e === this.lastRow;
		this.lastRow = e;
		let { bar: n } = this.music;
		if (t || e % n !== n - uc) return;
		this.energy = Js(this.energy);
		let r = Ms(this.music, this.state.section);
		if (this.sounding?.mood !== "play" || !r) return;
		let i = this.visit ?? ic(r, this.music.dj, this.liveEnergy, this.random);
		if (this.visit = {
			...i,
			bars: i.bars + 1
		}, ac(this.visit) && (r.transition || this.nudged)) {
			this.moveOn(r);
			return;
		}
		if ($s(this.music.stops, this.visit.bars, this.liveEnergy, this.random) && this.dropUntilBar(this.music.stops.tracks, 0), this.visit.bars % this.music.dj.phraseBars === 0) {
			let e = oc(this.visit, r, this.liveEnergy, this.random), t = this.visit;
			this.visit = sc(t, e), this.lastMove = e, this.log("dj", r.cue, e), this.playVisit(t);
		}
	}
	onCue(e) {
		let t = this.heard;
		this.heard = e;
		let n = this.isFill(e);
		this.heldLayers = n ? this.heldLayers ?? this.layers : null, this.isFill(t) && !n && this.land(), this.applyMutes(), n || this.playVisit();
	}
	isFill(e) {
		return typeof e == "string" && zs(this.music).has(e);
	}
	land() {
		if (!this.landing || !this.visit || this.sounding?.mood !== "play" || this.heard !== this.sounding.cue) return;
		let e = cc(this.visit, this.random);
		this.visit = sc(this.visit, e), this.lastMove = e, this.log("dj", this.visit.section, "landing", e);
	}
	moveOn(e, t) {
		e.energy >= 4 && (this.energy = Ys(this.energy, { kind: "peakEnded" })), this.sectionNoise = (this.random() - .5) * .6;
		let n = this.liveEnergy, { peak: r } = this.music.song, i = this.headingForPeak ? r?.cue : void 0, a = Qs(this.music.song.sections, e, n, this.recentSections, this.random, i);
		if (a.cue === r?.cue && (this.peakedLevel = this.state.level), this.recentSections = [e.cue, ...this.recentSections].slice(0, dc), this.state.section = a.cue, this.visit = ic(a, this.music.dj, n, this.random, e.transition), this.nudged = !1, this.lastMove = null, this.log("section", a.cue, "energy", n.toFixed(1), "for", this.visit.stay, "bars"), !t) {
			this.update();
			return;
		}
		this.run(t(a.cue)), this.sounding = Ns(this.music, this.state);
	}
	get djTracks() {
		return Object.values(this.music.dj.groups).flat();
	}
	playVisit(e) {
		let { player: t } = this, { groups: n } = this.music.dj, r = this.music.dj.fadeBars * this.barSeconds, i = () => {
			if (this.heldLayers) return;
			let { visit: i, sounding: a } = this, o = i && a?.mood === "play" && this.heard === a.cue ? lc(i, this.music.dj) : /* @__PURE__ */ new Map(), s = new Set([...i?.cut ?? [], ...e?.cut ?? []].flatMap((e) => n[e] ?? []));
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
		let e = Ns(this.music, this.state);
		if (!e) return;
		let t = Ps(this.music, this.sounding, e);
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
		this.layers = this.heldLayers ?? Bs(this.sounding, this.heard), this.player.setMutedTracks([...this.layers, ...this.dropped]);
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
export { fc as GameConductor, To as PLAY_MOOD, As as SongPlayer, ys as unpackSongBundle };

