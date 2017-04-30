/**
	responseHTML
	(c) 2007-2008 xul.fr		
	Licence Mozilla 1.1
*/


/**
	Searches for body, extracts and return the content
	New version contributed by users
*/

function createXHR() {
	var request = false;
	try {
		request = new ActiveXObject('Msxml2.XMLHTTP');
	} catch (err2) {
		try {
			request = new ActiveXObject('Microsoft.XMLHTTP');
		} catch (err3) {
			try {
				request = new XMLHttpRequest();
			} catch (err1) {
				request = false;
			}
		}
	}
	return request;
}

/* ----------------------------------------------------------------------------------------------------- */

function getBody(content) {
	test = content.toLowerCase(); // to eliminate case sensitivity
	var x = test.indexOf("<body");
	if (x == -1) return "";

	x = test.indexOf(">", x);
	if (x == -1) return "";

	var y = test.lastIndexOf("</body>");
	if (y == -1) y = test.lastIndexOf("</html>");
	if (y == -1) y = content.length; // If no HTML then just grab everything till end

	return content.slice(x + 1, y);
}

/**
	Loads a HTML page
	Put the content of the body tag into the current page.
	Arguments:
		url of the other HTML page to load
		id of the tag that has to hold the content
*/

function loadHTML(url, fun, storage, param) {
	var xhr = createXHR();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			//if(xhr.status == 200)
			{
				storage.innerHTML = getBody(xhr.responseText);
				fun(storage, param);
			}
		}
	};

	xhr.open("GET", url, true);
	xhr.send(null);

}

/**
	Callback
	Assign directly a tag
*/


function processHTML(temp, target) {
	target.innerHTML = temp.innerHTML;
}

function loadWholePage(url) {
	var y = document.getElementById("storage");
	var x = document.getElementById("displayed");
	loadHTML(url, processHTML, x, y);
}


/**
	Create responseHTML
	for acces by DOM's methods
*/

function processByDOM(responseHTML, target) {
	target.innerHTML = "Extracted by id:<br />";

	// does not work with Chrome/Safari
	//var message = responseHTML.getElementsByTagName("div").namedItem("two").innerHTML;
	var message = responseHTML.getElementsByTagName("div").item(1).innerHTML;

	target.innerHTML += message;

	target.innerHTML += "<br />Extracted by name:<br />";

	message = responseHTML.getElementsByTagName("form").item(0);
	target.innerHTML += message.dyn.value;
}

function accessByDOM(url) {
	//var responseHTML = document.createElement("body");	// Bad for opera
	var responseHTML = document.getElementById("storage");
	var y = document.getElementById("displayed");
	loadHTML(url, processByDOM, responseHTML, y);
}

/* ----------------------------------------------------------------------------------------------------- */

var hljs = new function () {
	function k(v) {
		return v.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
	}

	function t(v) {
		return v.nodeName.toLowerCase()
	}

	function i(w, x) {
		var v = w && w.exec(x);
		return v && v.index == 0
	}

	function d(v) {
		return Array.prototype.map.call(v.childNodes, function (w) {
			if (w.nodeType == 3) {
				return b.useBR ? w.nodeValue.replace(/\n/g, "") : w.nodeValue
			}
			if (t(w) == "br") {
				return "\n"
			}
			return d(w)
		}).join("")
	}

	function r(w) {
		var v = (w.className + " " + (w.parentNode ? w.parentNode.className : "")).split(/\s+/);
		v = v.map(function (x) {
			return x.replace(/^language-/, "")
		});
		return v.filter(function (x) {
			return j(x) || x == "no-highlight"
		})[0]
	}

	function o(x, y) {
		var v = {};
		for (var w in x) {
			v[w] = x[w]
		}
		if (y) {
			for (var w in y) {
				v[w] = y[w]
			}
		}
		return v
	}

	function u(x) {
		var v = [];
		(function w(y, z) {
			for (var A = y.firstChild; A; A = A.nextSibling) {
				if (A.nodeType == 3) {
					z += A.nodeValue.length
				} else {
					if (t(A) == "br") {
						z += 1
					} else {
						if (A.nodeType == 1) {
							v.push({
								event: "start",
								offset: z,
								node: A
							});
							z = w(A, z);
							v.push({
								event: "stop",
								offset: z,
								node: A
							})
						}
					}
				}
			}
			return z
		})(x, 0);
		return v
	}

	function q(w, y, C) {
		var x = 0;
		var F = "";
		var z = [];

		function B() {
			if (!w.length || !y.length) {
				return w.length ? w : y
			}
			if (w[0].offset != y[0].offset) {
				return (w[0].offset < y[0].offset) ? w : y
			}
			return y[0].event == "start" ? w : y
		}

		function A(H) {
			function G(I) {
				return " " + I.nodeName + '="' + k(I.value) + '"'
			}
			F += "<" + t(H) + Array.prototype.map.call(H.attributes, G).join("") + ">"
		}

		function E(G) {
			F += "</" + t(G) + ">"
		}

		function v(G) {
			(G.event == "start" ? A : E)(G.node)
		}
		while (w.length || y.length) {
			var D = B();
			F += k(C.substr(x, D[0].offset - x));
			x = D[0].offset;
			if (D == w) {
				z.reverse().forEach(E);
				do {
					v(D.splice(0, 1)[0]);
					D = B()
				} while (D == w && D.length && D[0].offset == x);
				z.reverse().forEach(A)
			} else {
				if (D[0].event == "start") {
					z.push(D[0].node)
				} else {
					z.pop()
				}
				v(D.splice(0, 1)[0])
			}
		}
		return F + k(C.substr(x))
	}

	function m(y) {
		function v(z) {
			return (z && z.source) || z
		}

		function w(A, z) {
			return RegExp(v(A), "m" + (y.cI ? "i" : "") + (z ? "g" : ""))
		}

		function x(D, C) {
			if (D.compiled) {
				return
			}
			D.compiled = true;
			D.k = D.k || D.bK;
			if (D.k) {
				var z = {};

				function E(G, F) {
					if (y.cI) {
						F = F.toLowerCase()
					}
					F.split(" ").forEach(function (H) {
						var I = H.split("|");
						z[I[0]] = [G, I[1] ? Number(I[1]) : 1]
					})
				}
				if (typeof D.k == "string") {
					E("keyword", D.k)
				} else {
					Object.keys(D.k).forEach(function (F) {
						E(F, D.k[F])
					})
				}
				D.k = z
			}
			D.lR = w(D.l || /\b[A-Za-z0-9_]+\b/, true);
			if (C) {
				if (D.bK) {
					D.b = D.bK.split(" ").join("|")
				}
				if (!D.b) {
					D.b = /\B|\b/
				}
				D.bR = w(D.b);
				if (!D.e && !D.eW) {
					D.e = /\B|\b/
				}
				if (D.e) {
					D.eR = w(D.e)
				}
				D.tE = v(D.e) || "";
				if (D.eW && C.tE) {
					D.tE += (D.e ? "|" : "") + C.tE
				}
			}
			if (D.i) {
				D.iR = w(D.i)
			}
			if (D.r === undefined) {
				D.r = 1
			}
			if (!D.c) {
				D.c = []
			}
			var B = [];
			D.c.forEach(function (F) {
				if (F.v) {
					F.v.forEach(function (G) {
						B.push(o(F, G))
					})
				} else {
					B.push(F == "self" ? D : F)
				}
			});
			D.c = B;
			D.c.forEach(function (F) {
				x(F, D)
			});
			if (D.starts) {
				x(D.starts, C)
			}
			var A = D.c.map(function (F) {
				return F.bK ? "\\.?\\b(" + F.b + ")\\b\\.?" : F.b
			}).concat([D.tE]).concat([D.i]).map(v).filter(Boolean);
			D.t = A.length ? w(A.join("|"), true) : {
				exec: function (F) {
					return null
				}
			};
			D.continuation = {}
		}
		x(y)
	}

	function c(S, L, J, R) {
		function v(U, V) {
			for (var T = 0; T < V.c.length; T++) {
				if (i(V.c[T].bR, U)) {
					return V.c[T]
				}
			}
		}

		function z(U, T) {
			if (i(U.eR, T)) {
				return U
			}
			if (U.eW) {
				return z(U.parent, T)
			}
		}

		function A(T, U) {
			return !J && i(U.iR, T)
		}

		function E(V, T) {
			var U = M.cI ? T[0].toLowerCase() : T[0];
			return V.k.hasOwnProperty(U) && V.k[U]
		}

		function w(Z, X, W, V) {
			var T = V ? "" : b.classPrefix,
				U = '<span class="' + T,
				Y = W ? "" : "</span>";
			U += Z + '">';
			return U + X + Y
		}

		function N() {
			var U = k(C);
			if (!I.k) {
				return U
			}
			var T = "";
			var X = 0;
			I.lR.lastIndex = 0;
			var V = I.lR.exec(U);
			while (V) {
				T += U.substr(X, V.index - X);
				var W = E(I, V);
				if (W) {
					H += W[1];
					T += w(W[0], V[0])
				} else {
					T += V[0]
				}
				X = I.lR.lastIndex;
				V = I.lR.exec(U)
			}
			return T + U.substr(X)
		}

		function F() {
			if (I.sL && !f[I.sL]) {
				return k(C)
			}
			var T = I.sL ? c(I.sL, C, true, I.continuation.top) : g(C);
			if (I.r > 0) {
				H += T.r
			}
			if (I.subLanguageMode == "continuous") {
				I.continuation.top = T.top
			}
			return w(T.language, T.value, false, true)
		}

		function Q() {
			return I.sL !== undefined ? F() : N()
		}

		function P(V, U) {
			var T = V.cN ? w(V.cN, "", true) : "";
			if (V.rB) {
				D += T;
				C = ""
			} else {
				if (V.eB) {
					D += k(U) + T;
					C = ""
				} else {
					D += T;
					C = U
				}
			}
			I = Object.create(V, {
				parent: {
					value: I
				}
			})
		}

		function G(T, X) {
			C += T;
			if (X === undefined) {
				D += Q();
				return 0
			}
			var V = v(X, I);
			if (V) {
				D += Q();
				P(V, X);
				return V.rB ? 0 : X.length
			}
			var W = z(I, X);
			if (W) {
				var U = I;
				if (!(U.rE || U.eE)) {
					C += X
				}
				D += Q();
				do {
					if (I.cN) {
						D += "</span>"
					}
					H += I.r;
					I = I.parent
				} while (I != W.parent);
				if (U.eE) {
					D += k(X)
				}
				C = "";
				if (W.starts) {
					P(W.starts, "")
				}
				return U.rE ? 0 : X.length
			}
			if (A(X, I)) {
				throw new Error('Illegal lexeme "' + X + '" for mode "' + (I.cN || "<unnamed>") + '"')
			}
			C += X;
			return X.length || 1
		}
		var M = j(S);
		if (!M) {
			throw new Error('Unknown language: "' + S + '"')
		}
		m(M);
		var I = R || M;
		var D = "";
		for (var K = I; K != M; K = K.parent) {
			if (K.cN) {
				D = w(K.cN, D, true)
			}
		}
		var C = "";
		var H = 0;
		try {
			var B, y, x = 0;
			while (true) {
				I.t.lastIndex = x;
				B = I.t.exec(L);
				if (!B) {
					break
				}
				y = G(L.substr(x, B.index - x), B[0]);
				x = B.index + y
			}
			G(L.substr(x));
			for (var K = I; K.parent; K = K.parent) {
				if (K.cN) {
					D += "</span>"
				}
			}
			return {
				r: H,
				value: D,
				language: S,
				top: I
			}
		} catch (O) {
			if (O.message.indexOf("Illegal") != -1) {
				return {
					r: 0,
					value: k(L)
				}
			} else {
				throw O
			}
		}
	}

	function g(y, x) {
		x = x || b.languages || Object.keys(f);
		var v = {
			r: 0,
			value: k(y)
		};
		var w = v;
		x.forEach(function (z) {
			if (!j(z)) {
				return
			}
			var A = c(z, y, false);
			A.language = z;
			if (A.r > w.r) {
				w = A
			}
			if (A.r > v.r) {
				w = v;
				v = A
			}
		});
		if (w.language) {
			v.second_best = w
		}
		return v
	}

	function h(v) {
		if (b.tabReplace) {
			v = v.replace(/^((<[^>]+>|\t)+)/gm, function (w, z, y, x) {
				return z.replace(/\t/g, b.tabReplace)
			})
		}
		if (b.useBR) {
			v = v.replace(/\n/g, "<br>")
		}
		return v
	}

	function p(z) {
		var y = d(z);
		var A = r(z);
		if (A == "no-highlight") {
			return
		}
		var v = A ? c(A, y, true) : g(y);
		var w = u(z);
		if (w.length) {
			var x = document.createElementNS("http://www.w3.org/1999/xhtml", "pre");
			x.innerHTML = v.value;
			v.value = q(w, u(x), y)
		}
		v.value = h(v.value);
		z.innerHTML = v.value;
		z.className += " hljs " + (!A && v.language || "");
		z.result = {
			language: v.language,
			re: v.r
		};
		if (v.second_best) {
			z.second_best = {
				language: v.second_best.language,
				re: v.second_best.r
			}
		}
	}
	var b = {
		classPrefix: "hljs-",
		tabReplace: null,
		useBR: false,
		languages: undefined
	};

	function s(v) {
		b = o(b, v)
	}

	function l() {
		if (l.called) {
			return
		}
		l.called = true;
		var v = document.querySelectorAll("pre code");
		Array.prototype.forEach.call(v, p)
	}

	function a() {
		addEventListener("DOMContentLoaded", l, false);
		addEventListener("load", l, false)
	}
	var f = {};
	var n = {};

	function e(v, x) {
		var w = f[v] = x(this);
		if (w.aliases) {
			w.aliases.forEach(function (y) {
				n[y] = v
			})
		}
	}

	function j(v) {
		return f[v] || f[n[v]]
	}
	this.highlight = c;
	this.highlightAuto = g;
	this.fixMarkup = h;
	this.highlightBlock = p;
	this.configure = s;
	this.initHighlighting = l;
	this.initHighlightingOnLoad = a;
	this.registerLanguage = e;
	this.getLanguage = j;
	this.inherit = o;
	this.IR = "[a-zA-Z][a-zA-Z0-9_]*";
	this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*";
	this.NR = "\\b\\d+(\\.\\d+)?";
	this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
	this.BNR = "\\b(0b[01]+)";
	this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
	this.BE = {
		b: "\\\\[\\s\\S]",
		r: 0
	};
	this.ASM = {
		cN: "string",
		b: "'",
		e: "'",
		i: "\\n",
		c: [this.BE]
	};
	this.QSM = {
		cN: "string",
		b: '"',
		e: '"',
		i: "\\n",
		c: [this.BE]
	};
	this.CLCM = {
		cN: "comment",
		b: "//",
		e: "$"
	};
	this.CBLCLM = {
		cN: "comment",
		b: "/\\*",
		e: "\\*/"
	};
	this.HCM = {
		cN: "comment",
		b: "#",
		e: "$"
	};
	this.NM = {
		cN: "number",
		b: this.NR,
		r: 0
	};
	this.CNM = {
		cN: "number",
		b: this.CNR,
		r: 0
	};
	this.BNM = {
		cN: "number",
		b: this.BNR,
		r: 0
	};
	this.REGEXP_MODE = {
		cN: "regexp",
		b: /\//,
		e: /\/[gim]*/,
		i: /\n/,
		c: [this.BE, {
			b: /\[/,
			e: /\]/,
			r: 0,
			c: [this.BE]
		}]
	};
	this.TM = {
		cN: "title",
		b: this.IR,
		r: 0
	};
	this.UTM = {
		cN: "title",
		b: this.UIR,
		r: 0
	}
}();
hljs.registerLanguage("javascript", function (a) {
	return {
		aliases: ["js"],
		k: {
			keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
			literal: "true false null undefined NaN Infinity",
			built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require"
		},
		c: [{
			cN: "pi",
			b: /^\s*('|")use strict('|")/,
			r: 10
		}, a.ASM, a.QSM, a.CLCM, a.CBLCLM, a.CNM, {
			b: "(" + a.RSR + "|\\b(case|return|throw)\\b)\\s*",
			k: "return throw case",
			c: [a.CLCM, a.CBLCLM, a.REGEXP_MODE, {
				b: /</,
				e: />;/,
				r: 0,
				sL: "xml"
			}],
			r: 0
		}, {
			cN: "function",
			bK: "function",
			e: /\{/,
			c: [a.inherit(a.TM, {
				b: /[A-Za-z$_][0-9A-Za-z$_]*/
			}), {
				cN: "params",
				b: /\(/,
				e: /\)/,
				c: [a.CLCM, a.CBLCLM],
				i: /["'\(]/
			}],
			i: /\[|%/
		}, {
			b: /\$[(.]/
		}, {
			b: "\\." + a.IR,
			r: 0
		}]
	}
});
hljs.registerLanguage("css", function (a) {
	var b = "[a-zA-Z-][a-zA-Z0-9_-]*";
	var c = {
		cN: "function",
		b: b + "\\(",
		e: "\\)",
		c: ["self", a.NM, a.ASM, a.QSM]
	};
	return {
		cI: true,
		i: "[=/|']",
		c: [a.CBLCLM, {
			cN: "id",
			b: "\\#[A-Za-z0-9_-]+"
		}, {
			cN: "class",
			b: "\\.[A-Za-z0-9_-]+",
			r: 0
		}, {
			cN: "attr_selector",
			b: "\\[",
			e: "\\]",
			i: "$"
		}, {
			cN: "pseudo",
			b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
		}, {
			cN: "at_rule",
			b: "@(font-face|page)",
			l: "[a-z-]+",
			k: "font-face page"
		}, {
			cN: "at_rule",
			b: "@",
			e: "[{;]",
			c: [{
				cN: "keyword",
				b: /\S+/
			}, {
				b: /\s/,
				eW: true,
				eE: true,
				r: 0,
				c: [c, a.ASM, a.QSM, a.NM]
			}]
		}, {
			cN: "tag",
			b: b,
			r: 0
		}, {
			cN: "rules",
			b: "{",
			e: "}",
			i: "[^\\s]",
			r: 0,
			c: [a.CBLCLM, {
				cN: "rule",
				b: "[^\\s]",
				rB: true,
				e: ";",
				eW: true,
				c: [{
					cN: "attribute",
					b: "[A-Z\\_\\.\\-]+",
					e: ":",
					eE: true,
					i: "[^\\s]",
					starts: {
						cN: "value",
						eW: true,
						eE: true,
						c: [c, a.NM, a.QSM, a.ASM, a.CBLCLM, {
							cN: "hexcolor",
							b: "#[0-9A-Fa-f]+"
						}, {
							cN: "important",
							b: "!important"
						}]
					}
				}]
			}]
		}]
	}
});
hljs.registerLanguage("php", function (b) {
	var e = {
		cN: "variable",
		b: "\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*"
	};
	var a = {
		cN: "preprocessor",
		b: /<\?(php)?|\?>/
	};
	var c = {
		cN: "string",
		c: [b.BE, a],
		v: [{
			b: 'b"',
			e: '"'
		}, {
			b: "b'",
			e: "'"
		}, b.inherit(b.ASM, {
			i: null
		}), b.inherit(b.QSM, {
			i: null
		})]
	};
	var d = {
		v: [b.BNM, b.CNM]
	};
	return {
		cI: true,
		k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
		c: [b.CLCM, b.HCM, {
			cN: "comment",
			b: "/\\*",
			e: "\\*/",
			c: [{
				cN: "phpdoc",
				b: "\\s@[A-Za-z]+"
			}, a]
		}, {
			cN: "comment",
			b: "__halt_compiler.+?;",
			eW: true,
			k: "__halt_compiler",
			l: b.UIR
		}, {
			cN: "string",
			b: "<<<['\"]?\\w+['\"]?$",
			e: "^\\w+;",
			c: [b.BE]
		}, a, e, {
			cN: "function",
			bK: "function",
			e: /[;{]/,
			i: "\\$|\\[|%",
			c: [b.UTM, {
				cN: "params",
				b: "\\(",
				e: "\\)",
				c: ["self", e, b.CBLCLM, c, d]
			}]
		}, {
			cN: "class",
			bK: "class interface",
			e: "{",
			i: /[:\(\$"]/,
			c: [{
				bK: "extends implements",
				r: 10
			}, b.UTM]
		}, {
			bK: "namespace",
			e: ";",
			i: /[\.']/,
			c: [b.UTM]
		}, {
			bK: "use",
			e: ";",
			c: [b.UTM]
		}, {
			b: "=>"
		}, c, d]
	}
});
hljs.registerLanguage("perl", function (c) {
	var d = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when";
	var f = {
		cN: "subst",
		b: "[$@]\\{",
		e: "\\}",
		k: d
	};
	var g = {
		b: "->{",
		e: "}"
	};
	var a = {
		cN: "variable",
		v: [{
			b: /\$\d/
		}, {
			b: /[\$\%\@\*](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/
		}, {
			b: /[\$\%\@\*][^\s\w{]/,
			r: 0
		}]
	};
	var e = {
		cN: "comment",
		b: "^(__END__|__DATA__)",
		e: "\\n$",
		r: 5
	};
	var h = [c.BE, f, a];
	var b = [a, c.HCM, e, {
		cN: "comment",
		b: "^\\=\\w",
		e: "\\=cut",
		eW: true
	}, g, {
		cN: "string",
		c: h,
		v: [{
			b: "q[qwxr]?\\s*\\(",
			e: "\\)",
			r: 5
		}, {
			b: "q[qwxr]?\\s*\\[",
			e: "\\]",
			r: 5
		}, {
			b: "q[qwxr]?\\s*\\{",
			e: "\\}",
			r: 5
		}, {
			b: "q[qwxr]?\\s*\\|",
			e: "\\|",
			r: 5
		}, {
			b: "q[qwxr]?\\s*\\<",
			e: "\\>",
			r: 5
		}, {
			b: "qw\\s+q",
			e: "q",
			r: 5
		}, {
			b: "'",
			e: "'",
			c: [c.BE]
		}, {
			b: '"',
			e: '"'
		}, {
			b: "`",
			e: "`",
			c: [c.BE]
		}, {
			b: "{\\w+}",
			c: [],
			r: 0
		}, {
			b: "-?\\w+\\s*\\=\\>",
			c: [],
			r: 0
		}]
	}, {
		cN: "number",
		b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
		r: 0
	}, {
		b: "(\\/\\/|" + c.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
		k: "split return print reverse grep",
		r: 0,
		c: [c.HCM, e, {
			cN: "regexp",
			b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
			r: 10
		}, {
			cN: "regexp",
			b: "(m|qr)?/",
			e: "/[a-z]*",
			c: [c.BE],
			r: 0
		}]
	}, {
		cN: "sub",
		bK: "sub",
		e: "(\\s*\\(.*?\\))?[;{]",
		r: 5
	}, {
		cN: "operator",
		b: "-\\w\\b",
		r: 0
	}];
	f.c = b;
	g.c = b;
	return {
		k: d,
		c: b
	}
});
hljs.registerLanguage("json", function (a) {
	var e = {
		literal: "true false null"
	};
	var d = [a.QSM, a.CNM];
	var c = {
		cN: "value",
		e: ",",
		eW: true,
		eE: true,
		c: d,
		k: e
	};
	var b = {
		b: "{",
		e: "}",
		c: [{
			cN: "attribute",
			b: '\\s*"',
			e: '"\\s*:\\s*',
			eB: true,
			eE: true,
			c: [a.BE],
			i: "\\n",
			starts: c
		}],
		i: "\\S"
	};
	var f = {
		b: "\\[",
		e: "\\]",
		c: [a.inherit(c, {
			cN: null
		})],
		i: "\\S"
	};
	d.splice(d.length, 0, b, f);
	return {
		c: d,
		k: e,
		i: "\\S"
	}
});