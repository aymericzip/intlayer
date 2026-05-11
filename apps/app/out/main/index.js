import { createRequire } from "node:module";
import { join } from "node:path";
import { BrowserWindow, app, ipcMain, session, shell } from "electron";
import { join as join$1 } from "path";
import process$1 from "node:process";
import os from "node:os";
import tty from "node:tty";
// -- CommonJS Shims --
import __cjs_mod__ from "node:module";
import.meta.filename;
const __dirname = import.meta.dirname;
__cjs_mod__.createRequire(import.meta.url);
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toCommonJS = (mod) => __hasOwnProp.call(mod, "module.exports") ? mod["module.exports"] : __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __require = /* @__PURE__ */ createRequire(import.meta.url);
//#endregion
//#region ../../node_modules/.bun/@electron-toolkit+utils@4.0.0+ffe86b6546a82a08/node_modules/@electron-toolkit/utils/dist/index.mjs
var is = { dev: !app.isPackaged };
var platform = {
	isWindows: process.platform === "win32",
	isMacOS: process.platform === "darwin",
	isLinux: process.platform === "linux"
};
var electronApp = {
	setAppUserModelId(id) {
		if (platform.isWindows) app.setAppUserModelId(is.dev ? process.execPath : id);
	},
	setAutoLaunch(auto) {
		if (platform.isLinux) return false;
		const isOpenAtLogin = () => {
			return app.getLoginItemSettings().openAtLogin;
		};
		if (isOpenAtLogin() !== auto) {
			app.setLoginItemSettings({ openAtLogin: auto });
			return isOpenAtLogin() === auto;
		} else return true;
	},
	skipProxy() {
		return session.defaultSession.setProxy({ mode: "direct" });
	}
};
var optimizer = {
	watchWindowShortcuts(window, shortcutOptions) {
		if (!window) return;
		const { webContents } = window;
		const { escToCloseWindow = false, zoom = false } = shortcutOptions || {};
		webContents.on("before-input-event", (event, input) => {
			if (input.type === "keyDown") {
				if (!is.dev) {
					if (input.code === "KeyR" && (input.control || input.meta)) event.preventDefault();
					if (input.code === "KeyI" && (input.alt && input.meta || input.control && input.shift)) event.preventDefault();
				} else if (input.code === "F12") if (webContents.isDevToolsOpened()) webContents.closeDevTools();
				else {
					webContents.openDevTools({ mode: "undocked" });
					console.log("Open dev tool...");
				}
				if (escToCloseWindow) {
					if (input.code === "Escape" && input.key !== "Process") {
						window.close();
						event.preventDefault();
					}
				}
				if (!zoom) {
					if (input.code === "Minus" && (input.control || input.meta)) event.preventDefault();
					if (input.code === "Equal" && input.shift && (input.control || input.meta)) event.preventDefault();
				}
			}
		});
	},
	registerFramelessWindowIpc() {
		ipcMain.on("win:invoke", (event, action) => {
			const win = BrowserWindow.fromWebContents(event.sender);
			if (win) {
				if (action === "show") win.show();
				else if (action === "showInactive") win.showInactive();
				else if (action === "min") win.minimize();
				else if (action === "max") if (win.isMaximized()) win.unmaximize();
				else win.maximize();
				else if (action === "close") win.close();
			}
		});
	}
};
//#endregion
//#region ../../node_modules/.bun/universalify@2.0.1/node_modules/universalify/index.js
var require_universalify = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.fromCallback = function(fn) {
		return Object.defineProperty(function(...args) {
			if (typeof args[args.length - 1] === "function") fn.apply(this, args);
			else return new Promise((resolve, reject) => {
				args.push((err, res) => err != null ? reject(err) : resolve(res));
				fn.apply(this, args);
			});
		}, "name", { value: fn.name });
	};
	exports.fromPromise = function(fn) {
		return Object.defineProperty(function(...args) {
			const cb = args[args.length - 1];
			if (typeof cb !== "function") return fn.apply(this, args);
			else {
				args.pop();
				fn.apply(this, args).then((r) => cb(null, r), cb);
			}
		}, "name", { value: fn.name });
	};
}));
//#endregion
//#region ../../node_modules/.bun/graceful-fs@4.2.11/node_modules/graceful-fs/polyfills.js
var require_polyfills = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var constants = __require("constants");
	var origCwd = process.cwd;
	var cwd = null;
	var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
	process.cwd = function() {
		if (!cwd) cwd = origCwd.call(process);
		return cwd;
	};
	try {
		process.cwd();
	} catch (er) {}
	if (typeof process.chdir === "function") {
		var chdir = process.chdir;
		process.chdir = function(d) {
			cwd = null;
			chdir.call(process, d);
		};
		if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
	}
	module.exports = patch;
	function patch(fs) {
		if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) patchLchmod(fs);
		if (!fs.lutimes) patchLutimes(fs);
		fs.chown = chownFix(fs.chown);
		fs.fchown = chownFix(fs.fchown);
		fs.lchown = chownFix(fs.lchown);
		fs.chmod = chmodFix(fs.chmod);
		fs.fchmod = chmodFix(fs.fchmod);
		fs.lchmod = chmodFix(fs.lchmod);
		fs.chownSync = chownFixSync(fs.chownSync);
		fs.fchownSync = chownFixSync(fs.fchownSync);
		fs.lchownSync = chownFixSync(fs.lchownSync);
		fs.chmodSync = chmodFixSync(fs.chmodSync);
		fs.fchmodSync = chmodFixSync(fs.fchmodSync);
		fs.lchmodSync = chmodFixSync(fs.lchmodSync);
		fs.stat = statFix(fs.stat);
		fs.fstat = statFix(fs.fstat);
		fs.lstat = statFix(fs.lstat);
		fs.statSync = statFixSync(fs.statSync);
		fs.fstatSync = statFixSync(fs.fstatSync);
		fs.lstatSync = statFixSync(fs.lstatSync);
		if (fs.chmod && !fs.lchmod) {
			fs.lchmod = function(path, mode, cb) {
				if (cb) process.nextTick(cb);
			};
			fs.lchmodSync = function() {};
		}
		if (fs.chown && !fs.lchown) {
			fs.lchown = function(path, uid, gid, cb) {
				if (cb) process.nextTick(cb);
			};
			fs.lchownSync = function() {};
		}
		if (platform === "win32") fs.rename = typeof fs.rename !== "function" ? fs.rename : (function(fs$rename) {
			function rename(from, to, cb) {
				var start = Date.now();
				var backoff = 0;
				fs$rename(from, to, function CB(er) {
					if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
						setTimeout(function() {
							fs.stat(to, function(stater, st) {
								if (stater && stater.code === "ENOENT") fs$rename(from, to, CB);
								else cb(er);
							});
						}, backoff);
						if (backoff < 100) backoff += 10;
						return;
					}
					if (cb) cb(er);
				});
			}
			if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
			return rename;
		})(fs.rename);
		fs.read = typeof fs.read !== "function" ? fs.read : (function(fs$read) {
			function read(fd, buffer, offset, length, position, callback_) {
				var callback;
				if (callback_ && typeof callback_ === "function") {
					var eagCounter = 0;
					callback = function(er, _, __) {
						if (er && er.code === "EAGAIN" && eagCounter < 10) {
							eagCounter++;
							return fs$read.call(fs, fd, buffer, offset, length, position, callback);
						}
						callback_.apply(this, arguments);
					};
				}
				return fs$read.call(fs, fd, buffer, offset, length, position, callback);
			}
			if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
			return read;
		})(fs.read);
		fs.readSync = typeof fs.readSync !== "function" ? fs.readSync : (function(fs$readSync) {
			return function(fd, buffer, offset, length, position) {
				var eagCounter = 0;
				while (true) try {
					return fs$readSync.call(fs, fd, buffer, offset, length, position);
				} catch (er) {
					if (er.code === "EAGAIN" && eagCounter < 10) {
						eagCounter++;
						continue;
					}
					throw er;
				}
			};
		})(fs.readSync);
		function patchLchmod(fs) {
			fs.lchmod = function(path, mode, callback) {
				fs.open(path, constants.O_WRONLY | constants.O_SYMLINK, mode, function(err, fd) {
					if (err) {
						if (callback) callback(err);
						return;
					}
					fs.fchmod(fd, mode, function(err) {
						fs.close(fd, function(err2) {
							if (callback) callback(err || err2);
						});
					});
				});
			};
			fs.lchmodSync = function(path, mode) {
				var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);
				var threw = true;
				var ret;
				try {
					ret = fs.fchmodSync(fd, mode);
					threw = false;
				} finally {
					if (threw) try {
						fs.closeSync(fd);
					} catch (er) {}
					else fs.closeSync(fd);
				}
				return ret;
			};
		}
		function patchLutimes(fs) {
			if (constants.hasOwnProperty("O_SYMLINK") && fs.futimes) {
				fs.lutimes = function(path, at, mt, cb) {
					fs.open(path, constants.O_SYMLINK, function(er, fd) {
						if (er) {
							if (cb) cb(er);
							return;
						}
						fs.futimes(fd, at, mt, function(er) {
							fs.close(fd, function(er2) {
								if (cb) cb(er || er2);
							});
						});
					});
				};
				fs.lutimesSync = function(path, at, mt) {
					var fd = fs.openSync(path, constants.O_SYMLINK);
					var ret;
					var threw = true;
					try {
						ret = fs.futimesSync(fd, at, mt);
						threw = false;
					} finally {
						if (threw) try {
							fs.closeSync(fd);
						} catch (er) {}
						else fs.closeSync(fd);
					}
					return ret;
				};
			} else if (fs.futimes) {
				fs.lutimes = function(_a, _b, _c, cb) {
					if (cb) process.nextTick(cb);
				};
				fs.lutimesSync = function() {};
			}
		}
		function chmodFix(orig) {
			if (!orig) return orig;
			return function(target, mode, cb) {
				return orig.call(fs, target, mode, function(er) {
					if (chownErOk(er)) er = null;
					if (cb) cb.apply(this, arguments);
				});
			};
		}
		function chmodFixSync(orig) {
			if (!orig) return orig;
			return function(target, mode) {
				try {
					return orig.call(fs, target, mode);
				} catch (er) {
					if (!chownErOk(er)) throw er;
				}
			};
		}
		function chownFix(orig) {
			if (!orig) return orig;
			return function(target, uid, gid, cb) {
				return orig.call(fs, target, uid, gid, function(er) {
					if (chownErOk(er)) er = null;
					if (cb) cb.apply(this, arguments);
				});
			};
		}
		function chownFixSync(orig) {
			if (!orig) return orig;
			return function(target, uid, gid) {
				try {
					return orig.call(fs, target, uid, gid);
				} catch (er) {
					if (!chownErOk(er)) throw er;
				}
			};
		}
		function statFix(orig) {
			if (!orig) return orig;
			return function(target, options, cb) {
				if (typeof options === "function") {
					cb = options;
					options = null;
				}
				function callback(er, stats) {
					if (stats) {
						if (stats.uid < 0) stats.uid += 4294967296;
						if (stats.gid < 0) stats.gid += 4294967296;
					}
					if (cb) cb.apply(this, arguments);
				}
				return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
			};
		}
		function statFixSync(orig) {
			if (!orig) return orig;
			return function(target, options) {
				var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
				if (stats) {
					if (stats.uid < 0) stats.uid += 4294967296;
					if (stats.gid < 0) stats.gid += 4294967296;
				}
				return stats;
			};
		}
		function chownErOk(er) {
			if (!er) return true;
			if (er.code === "ENOSYS") return true;
			if (!process.getuid || process.getuid() !== 0) {
				if (er.code === "EINVAL" || er.code === "EPERM") return true;
			}
			return false;
		}
	}
}));
//#endregion
//#region ../../node_modules/.bun/graceful-fs@4.2.11/node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream = __require("stream").Stream;
	module.exports = legacy;
	function legacy(fs) {
		return {
			ReadStream,
			WriteStream
		};
		function ReadStream(path, options) {
			if (!(this instanceof ReadStream)) return new ReadStream(path, options);
			Stream.call(this);
			var self = this;
			this.path = path;
			this.fd = null;
			this.readable = true;
			this.paused = false;
			this.flags = "r";
			this.mode = 438;
			this.bufferSize = 64 * 1024;
			options = options || {};
			var keys = Object.keys(options);
			for (var index = 0, length = keys.length; index < length; index++) {
				var key = keys[index];
				this[key] = options[key];
			}
			if (this.encoding) this.setEncoding(this.encoding);
			if (this.start !== void 0) {
				if ("number" !== typeof this.start) throw TypeError("start must be a Number");
				if (this.end === void 0) this.end = Infinity;
				else if ("number" !== typeof this.end) throw TypeError("end must be a Number");
				if (this.start > this.end) throw new Error("start must be <= end");
				this.pos = this.start;
			}
			if (this.fd !== null) {
				process.nextTick(function() {
					self._read();
				});
				return;
			}
			fs.open(this.path, this.flags, this.mode, function(err, fd) {
				if (err) {
					self.emit("error", err);
					self.readable = false;
					return;
				}
				self.fd = fd;
				self.emit("open", fd);
				self._read();
			});
		}
		function WriteStream(path, options) {
			if (!(this instanceof WriteStream)) return new WriteStream(path, options);
			Stream.call(this);
			this.path = path;
			this.fd = null;
			this.writable = true;
			this.flags = "w";
			this.encoding = "binary";
			this.mode = 438;
			this.bytesWritten = 0;
			options = options || {};
			var keys = Object.keys(options);
			for (var index = 0, length = keys.length; index < length; index++) {
				var key = keys[index];
				this[key] = options[key];
			}
			if (this.start !== void 0) {
				if ("number" !== typeof this.start) throw TypeError("start must be a Number");
				if (this.start < 0) throw new Error("start must be >= zero");
				this.pos = this.start;
			}
			this.busy = false;
			this._queue = [];
			if (this.fd === null) {
				this._open = fs.open;
				this._queue.push([
					this._open,
					this.path,
					this.flags,
					this.mode,
					void 0
				]);
				this.flush();
			}
		}
	}
}));
//#endregion
//#region ../../node_modules/.bun/graceful-fs@4.2.11/node_modules/graceful-fs/clone.js
var require_clone = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = clone;
	var getPrototypeOf = Object.getPrototypeOf || function(obj) {
		return obj.__proto__;
	};
	function clone(obj) {
		if (obj === null || typeof obj !== "object") return obj;
		if (obj instanceof Object) var copy = { __proto__: getPrototypeOf(obj) };
		else var copy = Object.create(null);
		Object.getOwnPropertyNames(obj).forEach(function(key) {
			Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
		});
		return copy;
	}
}));
//#endregion
//#region ../../node_modules/.bun/graceful-fs@4.2.11/node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = __require("fs");
	var polyfills = require_polyfills();
	var legacy = require_legacy_streams();
	var clone = require_clone();
	var util$2 = __require("util");
	/* istanbul ignore next - node 0.x polyfill */
	var gracefulQueue;
	var previousSymbol;
	/* istanbul ignore else - node 0.x polyfill */
	if (typeof Symbol === "function" && typeof Symbol.for === "function") {
		gracefulQueue = Symbol.for("graceful-fs.queue");
		previousSymbol = Symbol.for("graceful-fs.previous");
	} else {
		gracefulQueue = "___graceful-fs.queue";
		previousSymbol = "___graceful-fs.previous";
	}
	function noop() {}
	function publishQueue(context, queue) {
		Object.defineProperty(context, gracefulQueue, { get: function() {
			return queue;
		} });
	}
	var debug = noop;
	if (util$2.debuglog) debug = util$2.debuglog("gfs4");
	else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) debug = function() {
		var m = util$2.format.apply(util$2, arguments);
		m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
		console.error(m);
	};
	if (!fs[gracefulQueue]) {
		publishQueue(fs, global[gracefulQueue] || []);
		fs.close = (function(fs$close) {
			function close(fd, cb) {
				return fs$close.call(fs, fd, function(err) {
					if (!err) resetQueue();
					if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
			Object.defineProperty(close, previousSymbol, { value: fs$close });
			return close;
		})(fs.close);
		fs.closeSync = (function(fs$closeSync) {
			function closeSync(fd) {
				fs$closeSync.apply(fs, arguments);
				resetQueue();
			}
			Object.defineProperty(closeSync, previousSymbol, { value: fs$closeSync });
			return closeSync;
		})(fs.closeSync);
		if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) process.on("exit", function() {
			debug(fs[gracefulQueue]);
			__require("assert").equal(fs[gracefulQueue].length, 0);
		});
	}
	if (!global[gracefulQueue]) publishQueue(global, fs[gracefulQueue]);
	module.exports = patch(clone(fs));
	if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
		module.exports = patch(fs);
		fs.__patched = true;
	}
	function patch(fs) {
		polyfills(fs);
		fs.gracefulify = patch;
		fs.createReadStream = createReadStream;
		fs.createWriteStream = createWriteStream;
		var fs$readFile = fs.readFile;
		fs.readFile = readFile;
		function readFile(path, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$readFile(path, options, cb);
			function go$readFile(path, options, cb, startTime) {
				return fs$readFile(path, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$readFile,
						[
							path,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$writeFile = fs.writeFile;
		fs.writeFile = writeFile;
		function writeFile(path, data, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$writeFile(path, data, options, cb);
			function go$writeFile(path, data, options, cb, startTime) {
				return fs$writeFile(path, data, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$writeFile,
						[
							path,
							data,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$appendFile = fs.appendFile;
		if (fs$appendFile) fs.appendFile = appendFile;
		function appendFile(path, data, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$appendFile(path, data, options, cb);
			function go$appendFile(path, data, options, cb, startTime) {
				return fs$appendFile(path, data, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$appendFile,
						[
							path,
							data,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$copyFile = fs.copyFile;
		if (fs$copyFile) fs.copyFile = copyFile;
		function copyFile(src, dest, flags, cb) {
			if (typeof flags === "function") {
				cb = flags;
				flags = 0;
			}
			return go$copyFile(src, dest, flags, cb);
			function go$copyFile(src, dest, flags, cb, startTime) {
				return fs$copyFile(src, dest, flags, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$copyFile,
						[
							src,
							dest,
							flags,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$readdir = fs.readdir;
		fs.readdir = readdir;
		var noReaddirOptionVersions = /^v[0-5]\./;
		function readdir(path, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir(path, options, cb, startTime) {
				return fs$readdir(path, fs$readdirCallback(path, options, cb, startTime));
			} : function go$readdir(path, options, cb, startTime) {
				return fs$readdir(path, options, fs$readdirCallback(path, options, cb, startTime));
			};
			return go$readdir(path, options, cb);
			function fs$readdirCallback(path, options, cb, startTime) {
				return function(err, files) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$readdir,
						[
							path,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else {
						if (files && files.sort) files.sort();
						if (typeof cb === "function") cb.call(this, err, files);
					}
				};
			}
		}
		if (process.version.substr(0, 4) === "v0.8") {
			var legStreams = legacy(fs);
			ReadStream = legStreams.ReadStream;
			WriteStream = legStreams.WriteStream;
		}
		var fs$ReadStream = fs.ReadStream;
		if (fs$ReadStream) {
			ReadStream.prototype = Object.create(fs$ReadStream.prototype);
			ReadStream.prototype.open = ReadStream$open;
		}
		var fs$WriteStream = fs.WriteStream;
		if (fs$WriteStream) {
			WriteStream.prototype = Object.create(fs$WriteStream.prototype);
			WriteStream.prototype.open = WriteStream$open;
		}
		Object.defineProperty(fs, "ReadStream", {
			get: function() {
				return ReadStream;
			},
			set: function(val) {
				ReadStream = val;
			},
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(fs, "WriteStream", {
			get: function() {
				return WriteStream;
			},
			set: function(val) {
				WriteStream = val;
			},
			enumerable: true,
			configurable: true
		});
		var FileReadStream = ReadStream;
		Object.defineProperty(fs, "FileReadStream", {
			get: function() {
				return FileReadStream;
			},
			set: function(val) {
				FileReadStream = val;
			},
			enumerable: true,
			configurable: true
		});
		var FileWriteStream = WriteStream;
		Object.defineProperty(fs, "FileWriteStream", {
			get: function() {
				return FileWriteStream;
			},
			set: function(val) {
				FileWriteStream = val;
			},
			enumerable: true,
			configurable: true
		});
		function ReadStream(path, options) {
			if (this instanceof ReadStream) return fs$ReadStream.apply(this, arguments), this;
			else return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
		}
		function ReadStream$open() {
			var that = this;
			open(that.path, that.flags, that.mode, function(err, fd) {
				if (err) {
					if (that.autoClose) that.destroy();
					that.emit("error", err);
				} else {
					that.fd = fd;
					that.emit("open", fd);
					that.read();
				}
			});
		}
		function WriteStream(path, options) {
			if (this instanceof WriteStream) return fs$WriteStream.apply(this, arguments), this;
			else return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
		}
		function WriteStream$open() {
			var that = this;
			open(that.path, that.flags, that.mode, function(err, fd) {
				if (err) {
					that.destroy();
					that.emit("error", err);
				} else {
					that.fd = fd;
					that.emit("open", fd);
				}
			});
		}
		function createReadStream(path, options) {
			return new fs.ReadStream(path, options);
		}
		function createWriteStream(path, options) {
			return new fs.WriteStream(path, options);
		}
		var fs$open = fs.open;
		fs.open = open;
		function open(path, flags, mode, cb) {
			if (typeof mode === "function") cb = mode, mode = null;
			return go$open(path, flags, mode, cb);
			function go$open(path, flags, mode, cb, startTime) {
				return fs$open(path, flags, mode, function(err, fd) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$open,
						[
							path,
							flags,
							mode,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		return fs;
	}
	function enqueue(elem) {
		debug("ENQUEUE", elem[0].name, elem[1]);
		fs[gracefulQueue].push(elem);
		retry();
	}
	var retryTimer;
	function resetQueue() {
		var now = Date.now();
		for (var i = 0; i < fs[gracefulQueue].length; ++i) if (fs[gracefulQueue][i].length > 2) {
			fs[gracefulQueue][i][3] = now;
			fs[gracefulQueue][i][4] = now;
		}
		retry();
	}
	function retry() {
		clearTimeout(retryTimer);
		retryTimer = void 0;
		if (fs[gracefulQueue].length === 0) return;
		var elem = fs[gracefulQueue].shift();
		var fn = elem[0];
		var args = elem[1];
		var err = elem[2];
		var startTime = elem[3];
		var lastTime = elem[4];
		if (startTime === void 0) {
			debug("RETRY", fn.name, args);
			fn.apply(null, args);
		} else if (Date.now() - startTime >= 6e4) {
			debug("TIMEOUT", fn.name, args);
			var cb = args.pop();
			if (typeof cb === "function") cb.call(null, err);
		} else {
			var sinceAttempt = Date.now() - lastTime;
			var sinceStart = Math.max(lastTime - startTime, 1);
			if (sinceAttempt >= Math.min(sinceStart * 1.2, 100)) {
				debug("RETRY", fn.name, args);
				fn.apply(null, args.concat([startTime]));
			} else fs[gracefulQueue].push(elem);
		}
		if (retryTimer === void 0) retryTimer = setTimeout(retry, 0);
	}
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/fs/index.js
var require_fs = /* @__PURE__ */ __commonJSMin(((exports) => {
	var u = require_universalify().fromCallback;
	var fs = require_graceful_fs();
	var api = [
		"access",
		"appendFile",
		"chmod",
		"chown",
		"close",
		"copyFile",
		"fchmod",
		"fchown",
		"fdatasync",
		"fstat",
		"fsync",
		"ftruncate",
		"futimes",
		"lchmod",
		"lchown",
		"link",
		"lstat",
		"mkdir",
		"mkdtemp",
		"open",
		"opendir",
		"readdir",
		"readFile",
		"readlink",
		"realpath",
		"rename",
		"rm",
		"rmdir",
		"stat",
		"symlink",
		"truncate",
		"unlink",
		"utimes",
		"writeFile"
	].filter((key) => {
		return typeof fs[key] === "function";
	});
	Object.assign(exports, fs);
	api.forEach((method) => {
		exports[method] = u(fs[method]);
	});
	exports.exists = function(filename, callback) {
		if (typeof callback === "function") return fs.exists(filename, callback);
		return new Promise((resolve) => {
			return fs.exists(filename, resolve);
		});
	};
	exports.read = function(fd, buffer, offset, length, position, callback) {
		if (typeof callback === "function") return fs.read(fd, buffer, offset, length, position, callback);
		return new Promise((resolve, reject) => {
			fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
				if (err) return reject(err);
				resolve({
					bytesRead,
					buffer
				});
			});
		});
	};
	exports.write = function(fd, buffer, ...args) {
		if (typeof args[args.length - 1] === "function") return fs.write(fd, buffer, ...args);
		return new Promise((resolve, reject) => {
			fs.write(fd, buffer, ...args, (err, bytesWritten, buffer) => {
				if (err) return reject(err);
				resolve({
					bytesWritten,
					buffer
				});
			});
		});
	};
	if (typeof fs.writev === "function") exports.writev = function(fd, buffers, ...args) {
		if (typeof args[args.length - 1] === "function") return fs.writev(fd, buffers, ...args);
		return new Promise((resolve, reject) => {
			fs.writev(fd, buffers, ...args, (err, bytesWritten, buffers) => {
				if (err) return reject(err);
				resolve({
					bytesWritten,
					buffers
				});
			});
		});
	};
	if (typeof fs.realpath.native === "function") exports.realpath.native = u(fs.realpath.native);
	else process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?", "Warning", "fs-extra-WARN0003");
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/mkdirs/utils.js
var require_utils$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var path$22 = __require("path");
	module.exports.checkPath = function checkPath(pth) {
		if (process.platform === "win32") {
			if (/[<>:"|?*]/.test(pth.replace(path$22.parse(pth).root, ""))) {
				const error = /* @__PURE__ */ new Error(`Path contains invalid characters: ${pth}`);
				error.code = "EINVAL";
				throw error;
			}
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/mkdirs/make-dir.js
var require_make_dir = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require_fs();
	var { checkPath } = require_utils$1();
	var getMode = (options) => {
		const defaults = { mode: 511 };
		if (typeof options === "number") return options;
		return {
			...defaults,
			...options
		}.mode;
	};
	module.exports.makeDir = async (dir, options) => {
		checkPath(dir);
		return fs.mkdir(dir, {
			mode: getMode(options),
			recursive: true
		});
	};
	module.exports.makeDirSync = (dir, options) => {
		checkPath(dir);
		return fs.mkdirSync(dir, {
			mode: getMode(options),
			recursive: true
		});
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u = require_universalify().fromPromise;
	var { makeDir: _makeDir, makeDirSync } = require_make_dir();
	var makeDir = u(_makeDir);
	module.exports = {
		mkdirs: makeDir,
		mkdirsSync: makeDirSync,
		mkdirp: makeDir,
		mkdirpSync: makeDirSync,
		ensureDir: makeDir,
		ensureDirSync: makeDirSync
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/path-exists/index.js
var require_path_exists = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u = require_universalify().fromPromise;
	var fs = require_fs();
	function pathExists(path) {
		return fs.access(path).then(() => true).catch(() => false);
	}
	module.exports = {
		pathExists: u(pathExists),
		pathExistsSync: fs.existsSync
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/util/utimes.js
var require_utimes = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require_graceful_fs();
	function utimesMillis(path, atime, mtime, callback) {
		fs.open(path, "r+", (err, fd) => {
			if (err) return callback(err);
			fs.futimes(fd, atime, mtime, (futimesErr) => {
				fs.close(fd, (closeErr) => {
					if (callback) callback(futimesErr || closeErr);
				});
			});
		});
	}
	function utimesMillisSync(path, atime, mtime) {
		const fd = fs.openSync(path, "r+");
		fs.futimesSync(fd, atime, mtime);
		return fs.closeSync(fd);
	}
	module.exports = {
		utimesMillis,
		utimesMillisSync
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/util/stat.js
var require_stat = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require_fs();
	var path$21 = __require("path");
	var util$1 = __require("util");
	function getStats(src, dest, opts) {
		const statFunc = opts.dereference ? (file) => fs.stat(file, { bigint: true }) : (file) => fs.lstat(file, { bigint: true });
		return Promise.all([statFunc(src), statFunc(dest).catch((err) => {
			if (err.code === "ENOENT") return null;
			throw err;
		})]).then(([srcStat, destStat]) => ({
			srcStat,
			destStat
		}));
	}
	function getStatsSync(src, dest, opts) {
		let destStat;
		const statFunc = opts.dereference ? (file) => fs.statSync(file, { bigint: true }) : (file) => fs.lstatSync(file, { bigint: true });
		const srcStat = statFunc(src);
		try {
			destStat = statFunc(dest);
		} catch (err) {
			if (err.code === "ENOENT") return {
				srcStat,
				destStat: null
			};
			throw err;
		}
		return {
			srcStat,
			destStat
		};
	}
	function checkPaths(src, dest, funcName, opts, cb) {
		util$1.callbackify(getStats)(src, dest, opts, (err, stats) => {
			if (err) return cb(err);
			const { srcStat, destStat } = stats;
			if (destStat) {
				if (areIdentical(srcStat, destStat)) {
					const srcBaseName = path$21.basename(src);
					const destBaseName = path$21.basename(dest);
					if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) return cb(null, {
						srcStat,
						destStat,
						isChangingCase: true
					});
					return cb(/* @__PURE__ */ new Error("Source and destination must not be the same."));
				}
				if (srcStat.isDirectory() && !destStat.isDirectory()) return cb(/* @__PURE__ */ new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`));
				if (!srcStat.isDirectory() && destStat.isDirectory()) return cb(/* @__PURE__ */ new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`));
			}
			if (srcStat.isDirectory() && isSrcSubdir(src, dest)) return cb(new Error(errMsg(src, dest, funcName)));
			return cb(null, {
				srcStat,
				destStat
			});
		});
	}
	function checkPathsSync(src, dest, funcName, opts) {
		const { srcStat, destStat } = getStatsSync(src, dest, opts);
		if (destStat) {
			if (areIdentical(srcStat, destStat)) {
				const srcBaseName = path$21.basename(src);
				const destBaseName = path$21.basename(dest);
				if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) return {
					srcStat,
					destStat,
					isChangingCase: true
				};
				throw new Error("Source and destination must not be the same.");
			}
			if (srcStat.isDirectory() && !destStat.isDirectory()) throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
			if (!srcStat.isDirectory() && destStat.isDirectory()) throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
		}
		if (srcStat.isDirectory() && isSrcSubdir(src, dest)) throw new Error(errMsg(src, dest, funcName));
		return {
			srcStat,
			destStat
		};
	}
	function checkParentPaths(src, srcStat, dest, funcName, cb) {
		const srcParent = path$21.resolve(path$21.dirname(src));
		const destParent = path$21.resolve(path$21.dirname(dest));
		if (destParent === srcParent || destParent === path$21.parse(destParent).root) return cb();
		fs.stat(destParent, { bigint: true }, (err, destStat) => {
			if (err) {
				if (err.code === "ENOENT") return cb();
				return cb(err);
			}
			if (areIdentical(srcStat, destStat)) return cb(new Error(errMsg(src, dest, funcName)));
			return checkParentPaths(src, srcStat, destParent, funcName, cb);
		});
	}
	function checkParentPathsSync(src, srcStat, dest, funcName) {
		const srcParent = path$21.resolve(path$21.dirname(src));
		const destParent = path$21.resolve(path$21.dirname(dest));
		if (destParent === srcParent || destParent === path$21.parse(destParent).root) return;
		let destStat;
		try {
			destStat = fs.statSync(destParent, { bigint: true });
		} catch (err) {
			if (err.code === "ENOENT") return;
			throw err;
		}
		if (areIdentical(srcStat, destStat)) throw new Error(errMsg(src, dest, funcName));
		return checkParentPathsSync(src, srcStat, destParent, funcName);
	}
	function areIdentical(srcStat, destStat) {
		return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
	}
	function isSrcSubdir(src, dest) {
		const srcArr = path$21.resolve(src).split(path$21.sep).filter((i) => i);
		const destArr = path$21.resolve(dest).split(path$21.sep).filter((i) => i);
		return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true);
	}
	function errMsg(src, dest, funcName) {
		return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
	}
	module.exports = {
		checkPaths,
		checkPathsSync,
		checkParentPaths,
		checkParentPathsSync,
		isSrcSubdir,
		areIdentical
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/copy/copy.js
var require_copy$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require_graceful_fs();
	var path$20 = __require("path");
	var mkdirs = require_mkdirs().mkdirs;
	var pathExists = require_path_exists().pathExists;
	var utimesMillis = require_utimes().utimesMillis;
	var stat = require_stat();
	function copy(src, dest, opts, cb) {
		if (typeof opts === "function" && !cb) {
			cb = opts;
			opts = {};
		} else if (typeof opts === "function") opts = { filter: opts };
		cb = cb || function() {};
		opts = opts || {};
		opts.clobber = "clobber" in opts ? !!opts.clobber : true;
		opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
		if (opts.preserveTimestamps && process.arch === "ia32") process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0001");
		stat.checkPaths(src, dest, "copy", opts, (err, stats) => {
			if (err) return cb(err);
			const { srcStat, destStat } = stats;
			stat.checkParentPaths(src, srcStat, dest, "copy", (err) => {
				if (err) return cb(err);
				if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb);
				return checkParentDir(destStat, src, dest, opts, cb);
			});
		});
	}
	function checkParentDir(destStat, src, dest, opts, cb) {
		const destParent = path$20.dirname(dest);
		pathExists(destParent, (err, dirExists) => {
			if (err) return cb(err);
			if (dirExists) return getStats(destStat, src, dest, opts, cb);
			mkdirs(destParent, (err) => {
				if (err) return cb(err);
				return getStats(destStat, src, dest, opts, cb);
			});
		});
	}
	function handleFilter(onInclude, destStat, src, dest, opts, cb) {
		Promise.resolve(opts.filter(src, dest)).then((include) => {
			if (include) return onInclude(destStat, src, dest, opts, cb);
			return cb();
		}, (error) => cb(error));
	}
	function startCopy(destStat, src, dest, opts, cb) {
		if (opts.filter) return handleFilter(getStats, destStat, src, dest, opts, cb);
		return getStats(destStat, src, dest, opts, cb);
	}
	function getStats(destStat, src, dest, opts, cb) {
		(opts.dereference ? fs.stat : fs.lstat)(src, (err, srcStat) => {
			if (err) return cb(err);
			if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts, cb);
			else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts, cb);
			else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts, cb);
			else if (srcStat.isSocket()) return cb(/* @__PURE__ */ new Error(`Cannot copy a socket file: ${src}`));
			else if (srcStat.isFIFO()) return cb(/* @__PURE__ */ new Error(`Cannot copy a FIFO pipe: ${src}`));
			return cb(/* @__PURE__ */ new Error(`Unknown file: ${src}`));
		});
	}
	function onFile(srcStat, destStat, src, dest, opts, cb) {
		if (!destStat) return copyFile(srcStat, src, dest, opts, cb);
		return mayCopyFile(srcStat, src, dest, opts, cb);
	}
	function mayCopyFile(srcStat, src, dest, opts, cb) {
		if (opts.overwrite) fs.unlink(dest, (err) => {
			if (err) return cb(err);
			return copyFile(srcStat, src, dest, opts, cb);
		});
		else if (opts.errorOnExist) return cb(/* @__PURE__ */ new Error(`'${dest}' already exists`));
		else return cb();
	}
	function copyFile(srcStat, src, dest, opts, cb) {
		fs.copyFile(src, dest, (err) => {
			if (err) return cb(err);
			if (opts.preserveTimestamps) return handleTimestampsAndMode(srcStat.mode, src, dest, cb);
			return setDestMode(dest, srcStat.mode, cb);
		});
	}
	function handleTimestampsAndMode(srcMode, src, dest, cb) {
		if (fileIsNotWritable(srcMode)) return makeFileWritable(dest, srcMode, (err) => {
			if (err) return cb(err);
			return setDestTimestampsAndMode(srcMode, src, dest, cb);
		});
		return setDestTimestampsAndMode(srcMode, src, dest, cb);
	}
	function fileIsNotWritable(srcMode) {
		return (srcMode & 128) === 0;
	}
	function makeFileWritable(dest, srcMode, cb) {
		return setDestMode(dest, srcMode | 128, cb);
	}
	function setDestTimestampsAndMode(srcMode, src, dest, cb) {
		setDestTimestamps(src, dest, (err) => {
			if (err) return cb(err);
			return setDestMode(dest, srcMode, cb);
		});
	}
	function setDestMode(dest, srcMode, cb) {
		return fs.chmod(dest, srcMode, cb);
	}
	function setDestTimestamps(src, dest, cb) {
		fs.stat(src, (err, updatedSrcStat) => {
			if (err) return cb(err);
			return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb);
		});
	}
	function onDir(srcStat, destStat, src, dest, opts, cb) {
		if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts, cb);
		return copyDir(src, dest, opts, cb);
	}
	function mkDirAndCopy(srcMode, src, dest, opts, cb) {
		fs.mkdir(dest, (err) => {
			if (err) return cb(err);
			copyDir(src, dest, opts, (err) => {
				if (err) return cb(err);
				return setDestMode(dest, srcMode, cb);
			});
		});
	}
	function copyDir(src, dest, opts, cb) {
		fs.readdir(src, (err, items) => {
			if (err) return cb(err);
			return copyDirItems(items, src, dest, opts, cb);
		});
	}
	function copyDirItems(items, src, dest, opts, cb) {
		const item = items.pop();
		if (!item) return cb();
		return copyDirItem(items, item, src, dest, opts, cb);
	}
	function copyDirItem(items, item, src, dest, opts, cb) {
		const srcItem = path$20.join(src, item);
		const destItem = path$20.join(dest, item);
		stat.checkPaths(srcItem, destItem, "copy", opts, (err, stats) => {
			if (err) return cb(err);
			const { destStat } = stats;
			startCopy(destStat, srcItem, destItem, opts, (err) => {
				if (err) return cb(err);
				return copyDirItems(items, src, dest, opts, cb);
			});
		});
	}
	function onLink(destStat, src, dest, opts, cb) {
		fs.readlink(src, (err, resolvedSrc) => {
			if (err) return cb(err);
			if (opts.dereference) resolvedSrc = path$20.resolve(process.cwd(), resolvedSrc);
			if (!destStat) return fs.symlink(resolvedSrc, dest, cb);
			else fs.readlink(dest, (err, resolvedDest) => {
				if (err) {
					if (err.code === "EINVAL" || err.code === "UNKNOWN") return fs.symlink(resolvedSrc, dest, cb);
					return cb(err);
				}
				if (opts.dereference) resolvedDest = path$20.resolve(process.cwd(), resolvedDest);
				if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) return cb(/* @__PURE__ */ new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
				if (destStat.isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) return cb(/* @__PURE__ */ new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
				return copyLink(resolvedSrc, dest, cb);
			});
		});
	}
	function copyLink(resolvedSrc, dest, cb) {
		fs.unlink(dest, (err) => {
			if (err) return cb(err);
			return fs.symlink(resolvedSrc, dest, cb);
		});
	}
	module.exports = copy;
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/copy/copy-sync.js
var require_copy_sync = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require_graceful_fs();
	var path$19 = __require("path");
	var mkdirsSync = require_mkdirs().mkdirsSync;
	var utimesMillisSync = require_utimes().utimesMillisSync;
	var stat = require_stat();
	function copySync(src, dest, opts) {
		if (typeof opts === "function") opts = { filter: opts };
		opts = opts || {};
		opts.clobber = "clobber" in opts ? !!opts.clobber : true;
		opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
		if (opts.preserveTimestamps && process.arch === "ia32") process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0002");
		const { srcStat, destStat } = stat.checkPathsSync(src, dest, "copy", opts);
		stat.checkParentPathsSync(src, srcStat, dest, "copy");
		return handleFilterAndCopy(destStat, src, dest, opts);
	}
	function handleFilterAndCopy(destStat, src, dest, opts) {
		if (opts.filter && !opts.filter(src, dest)) return;
		const destParent = path$19.dirname(dest);
		if (!fs.existsSync(destParent)) mkdirsSync(destParent);
		return getStats(destStat, src, dest, opts);
	}
	function startCopy(destStat, src, dest, opts) {
		if (opts.filter && !opts.filter(src, dest)) return;
		return getStats(destStat, src, dest, opts);
	}
	function getStats(destStat, src, dest, opts) {
		const srcStat = (opts.dereference ? fs.statSync : fs.lstatSync)(src);
		if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);
		else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts);
		else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);
		else if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`);
		else if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`);
		throw new Error(`Unknown file: ${src}`);
	}
	function onFile(srcStat, destStat, src, dest, opts) {
		if (!destStat) return copyFile(srcStat, src, dest, opts);
		return mayCopyFile(srcStat, src, dest, opts);
	}
	function mayCopyFile(srcStat, src, dest, opts) {
		if (opts.overwrite) {
			fs.unlinkSync(dest);
			return copyFile(srcStat, src, dest, opts);
		} else if (opts.errorOnExist) throw new Error(`'${dest}' already exists`);
	}
	function copyFile(srcStat, src, dest, opts) {
		fs.copyFileSync(src, dest);
		if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
		return setDestMode(dest, srcStat.mode);
	}
	function handleTimestamps(srcMode, src, dest) {
		if (fileIsNotWritable(srcMode)) makeFileWritable(dest, srcMode);
		return setDestTimestamps(src, dest);
	}
	function fileIsNotWritable(srcMode) {
		return (srcMode & 128) === 0;
	}
	function makeFileWritable(dest, srcMode) {
		return setDestMode(dest, srcMode | 128);
	}
	function setDestMode(dest, srcMode) {
		return fs.chmodSync(dest, srcMode);
	}
	function setDestTimestamps(src, dest) {
		const updatedSrcStat = fs.statSync(src);
		return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
	}
	function onDir(srcStat, destStat, src, dest, opts) {
		if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts);
		return copyDir(src, dest, opts);
	}
	function mkDirAndCopy(srcMode, src, dest, opts) {
		fs.mkdirSync(dest);
		copyDir(src, dest, opts);
		return setDestMode(dest, srcMode);
	}
	function copyDir(src, dest, opts) {
		fs.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts));
	}
	function copyDirItem(item, src, dest, opts) {
		const srcItem = path$19.join(src, item);
		const destItem = path$19.join(dest, item);
		const { destStat } = stat.checkPathsSync(srcItem, destItem, "copy", opts);
		return startCopy(destStat, srcItem, destItem, opts);
	}
	function onLink(destStat, src, dest, opts) {
		let resolvedSrc = fs.readlinkSync(src);
		if (opts.dereference) resolvedSrc = path$19.resolve(process.cwd(), resolvedSrc);
		if (!destStat) return fs.symlinkSync(resolvedSrc, dest);
		else {
			let resolvedDest;
			try {
				resolvedDest = fs.readlinkSync(dest);
			} catch (err) {
				if (err.code === "EINVAL" || err.code === "UNKNOWN") return fs.symlinkSync(resolvedSrc, dest);
				throw err;
			}
			if (opts.dereference) resolvedDest = path$19.resolve(process.cwd(), resolvedDest);
			if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
			if (fs.statSync(dest).isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
			return copyLink(resolvedSrc, dest);
		}
	}
	function copyLink(resolvedSrc, dest) {
		fs.unlinkSync(dest);
		return fs.symlinkSync(resolvedSrc, dest);
	}
	module.exports = copySync;
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/copy/index.js
var require_copy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u = require_universalify().fromCallback;
	module.exports = {
		copy: u(require_copy$1()),
		copySync: require_copy_sync()
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/remove/rimraf.js
var require_rimraf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require_graceful_fs();
	var path$18 = __require("path");
	var assert = __require("assert");
	var isWindows = process.platform === "win32";
	function defaults(options) {
		[
			"unlink",
			"chmod",
			"stat",
			"lstat",
			"rmdir",
			"readdir"
		].forEach((m) => {
			options[m] = options[m] || fs[m];
			m = m + "Sync";
			options[m] = options[m] || fs[m];
		});
		options.maxBusyTries = options.maxBusyTries || 3;
	}
	function rimraf(p, options, cb) {
		let busyTries = 0;
		if (typeof options === "function") {
			cb = options;
			options = {};
		}
		assert(p, "rimraf: missing path");
		assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
		assert.strictEqual(typeof cb, "function", "rimraf: callback function required");
		assert(options, "rimraf: invalid options argument provided");
		assert.strictEqual(typeof options, "object", "rimraf: options should be object");
		defaults(options);
		rimraf_(p, options, function CB(er) {
			if (er) {
				if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
					busyTries++;
					const time = busyTries * 100;
					return setTimeout(() => rimraf_(p, options, CB), time);
				}
				if (er.code === "ENOENT") er = null;
			}
			cb(er);
		});
	}
	function rimraf_(p, options, cb) {
		assert(p);
		assert(options);
		assert(typeof cb === "function");
		options.lstat(p, (er, st) => {
			if (er && er.code === "ENOENT") return cb(null);
			if (er && er.code === "EPERM" && isWindows) return fixWinEPERM(p, options, er, cb);
			if (st && st.isDirectory()) return rmdir(p, options, er, cb);
			options.unlink(p, (er) => {
				if (er) {
					if (er.code === "ENOENT") return cb(null);
					if (er.code === "EPERM") return isWindows ? fixWinEPERM(p, options, er, cb) : rmdir(p, options, er, cb);
					if (er.code === "EISDIR") return rmdir(p, options, er, cb);
				}
				return cb(er);
			});
		});
	}
	function fixWinEPERM(p, options, er, cb) {
		assert(p);
		assert(options);
		assert(typeof cb === "function");
		options.chmod(p, 438, (er2) => {
			if (er2) cb(er2.code === "ENOENT" ? null : er);
			else options.stat(p, (er3, stats) => {
				if (er3) cb(er3.code === "ENOENT" ? null : er);
				else if (stats.isDirectory()) rmdir(p, options, er, cb);
				else options.unlink(p, cb);
			});
		});
	}
	function fixWinEPERMSync(p, options, er) {
		let stats;
		assert(p);
		assert(options);
		try {
			options.chmodSync(p, 438);
		} catch (er2) {
			if (er2.code === "ENOENT") return;
			else throw er;
		}
		try {
			stats = options.statSync(p);
		} catch (er3) {
			if (er3.code === "ENOENT") return;
			else throw er;
		}
		if (stats.isDirectory()) rmdirSync(p, options, er);
		else options.unlinkSync(p);
	}
	function rmdir(p, options, originalEr, cb) {
		assert(p);
		assert(options);
		assert(typeof cb === "function");
		options.rmdir(p, (er) => {
			if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) rmkids(p, options, cb);
			else if (er && er.code === "ENOTDIR") cb(originalEr);
			else cb(er);
		});
	}
	function rmkids(p, options, cb) {
		assert(p);
		assert(options);
		assert(typeof cb === "function");
		options.readdir(p, (er, files) => {
			if (er) return cb(er);
			let n = files.length;
			let errState;
			if (n === 0) return options.rmdir(p, cb);
			files.forEach((f) => {
				rimraf(path$18.join(p, f), options, (er) => {
					if (errState) return;
					if (er) return cb(errState = er);
					if (--n === 0) options.rmdir(p, cb);
				});
			});
		});
	}
	function rimrafSync(p, options) {
		let st;
		options = options || {};
		defaults(options);
		assert(p, "rimraf: missing path");
		assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
		assert(options, "rimraf: missing options");
		assert.strictEqual(typeof options, "object", "rimraf: options should be object");
		try {
			st = options.lstatSync(p);
		} catch (er) {
			if (er.code === "ENOENT") return;
			if (er.code === "EPERM" && isWindows) fixWinEPERMSync(p, options, er);
		}
		try {
			if (st && st.isDirectory()) rmdirSync(p, options, null);
			else options.unlinkSync(p);
		} catch (er) {
			if (er.code === "ENOENT") return;
			else if (er.code === "EPERM") return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
			else if (er.code !== "EISDIR") throw er;
			rmdirSync(p, options, er);
		}
	}
	function rmdirSync(p, options, originalEr) {
		assert(p);
		assert(options);
		try {
			options.rmdirSync(p);
		} catch (er) {
			if (er.code === "ENOTDIR") throw originalEr;
			else if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") rmkidsSync(p, options);
			else if (er.code !== "ENOENT") throw er;
		}
	}
	function rmkidsSync(p, options) {
		assert(p);
		assert(options);
		options.readdirSync(p).forEach((f) => rimrafSync(path$18.join(p, f), options));
		if (isWindows) {
			const startTime = Date.now();
			do
				try {
					return options.rmdirSync(p, options);
				} catch {}
			while (Date.now() - startTime < 500);
		} else return options.rmdirSync(p, options);
	}
	module.exports = rimraf;
	rimraf.sync = rimrafSync;
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/remove/index.js
var require_remove = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require_graceful_fs();
	var u = require_universalify().fromCallback;
	var rimraf = require_rimraf();
	function remove(path, callback) {
		if (fs.rm) return fs.rm(path, {
			recursive: true,
			force: true
		}, callback);
		rimraf(path, callback);
	}
	function removeSync(path) {
		if (fs.rmSync) return fs.rmSync(path, {
			recursive: true,
			force: true
		});
		rimraf.sync(path);
	}
	module.exports = {
		remove: u(remove),
		removeSync
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/empty/index.js
var require_empty = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u = require_universalify().fromPromise;
	var fs = require_fs();
	var path$17 = __require("path");
	var mkdir = require_mkdirs();
	var remove = require_remove();
	var emptyDir = u(async function emptyDir(dir) {
		let items;
		try {
			items = await fs.readdir(dir);
		} catch {
			return mkdir.mkdirs(dir);
		}
		return Promise.all(items.map((item) => remove.remove(path$17.join(dir, item))));
	});
	function emptyDirSync(dir) {
		let items;
		try {
			items = fs.readdirSync(dir);
		} catch {
			return mkdir.mkdirsSync(dir);
		}
		items.forEach((item) => {
			item = path$17.join(dir, item);
			remove.removeSync(item);
		});
	}
	module.exports = {
		emptyDirSync,
		emptydirSync: emptyDirSync,
		emptyDir,
		emptydir: emptyDir
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/file.js
var require_file = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u = require_universalify().fromCallback;
	var path$16 = __require("path");
	var fs = require_graceful_fs();
	var mkdir = require_mkdirs();
	function createFile(file, callback) {
		function makeFile() {
			fs.writeFile(file, "", (err) => {
				if (err) return callback(err);
				callback();
			});
		}
		fs.stat(file, (err, stats) => {
			if (!err && stats.isFile()) return callback();
			const dir = path$16.dirname(file);
			fs.stat(dir, (err, stats) => {
				if (err) {
					if (err.code === "ENOENT") return mkdir.mkdirs(dir, (err) => {
						if (err) return callback(err);
						makeFile();
					});
					return callback(err);
				}
				if (stats.isDirectory()) makeFile();
				else fs.readdir(dir, (err) => {
					if (err) return callback(err);
				});
			});
		});
	}
	function createFileSync(file) {
		let stats;
		try {
			stats = fs.statSync(file);
		} catch {}
		if (stats && stats.isFile()) return;
		const dir = path$16.dirname(file);
		try {
			if (!fs.statSync(dir).isDirectory()) fs.readdirSync(dir);
		} catch (err) {
			if (err && err.code === "ENOENT") mkdir.mkdirsSync(dir);
			else throw err;
		}
		fs.writeFileSync(file, "");
	}
	module.exports = {
		createFile: u(createFile),
		createFileSync
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/link.js
var require_link = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u = require_universalify().fromCallback;
	var path$15 = __require("path");
	var fs = require_graceful_fs();
	var mkdir = require_mkdirs();
	var pathExists = require_path_exists().pathExists;
	var { areIdentical } = require_stat();
	function createLink(srcpath, dstpath, callback) {
		function makeLink(srcpath, dstpath) {
			fs.link(srcpath, dstpath, (err) => {
				if (err) return callback(err);
				callback(null);
			});
		}
		fs.lstat(dstpath, (_, dstStat) => {
			fs.lstat(srcpath, (err, srcStat) => {
				if (err) {
					err.message = err.message.replace("lstat", "ensureLink");
					return callback(err);
				}
				if (dstStat && areIdentical(srcStat, dstStat)) return callback(null);
				const dir = path$15.dirname(dstpath);
				pathExists(dir, (err, dirExists) => {
					if (err) return callback(err);
					if (dirExists) return makeLink(srcpath, dstpath);
					mkdir.mkdirs(dir, (err) => {
						if (err) return callback(err);
						makeLink(srcpath, dstpath);
					});
				});
			});
		});
	}
	function createLinkSync(srcpath, dstpath) {
		let dstStat;
		try {
			dstStat = fs.lstatSync(dstpath);
		} catch {}
		try {
			const srcStat = fs.lstatSync(srcpath);
			if (dstStat && areIdentical(srcStat, dstStat)) return;
		} catch (err) {
			err.message = err.message.replace("lstat", "ensureLink");
			throw err;
		}
		const dir = path$15.dirname(dstpath);
		if (fs.existsSync(dir)) return fs.linkSync(srcpath, dstpath);
		mkdir.mkdirsSync(dir);
		return fs.linkSync(srcpath, dstpath);
	}
	module.exports = {
		createLink: u(createLink),
		createLinkSync
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var path$14 = __require("path");
	var fs = require_graceful_fs();
	var pathExists = require_path_exists().pathExists;
	/**
	* Function that returns two types of paths, one relative to symlink, and one
	* relative to the current working directory. Checks if path is absolute or
	* relative. If the path is relative, this function checks if the path is
	* relative to symlink or relative to current working directory. This is an
	* initiative to find a smarter `srcpath` to supply when building symlinks.
	* This allows you to determine which path to use out of one of three possible
	* types of source paths. The first is an absolute path. This is detected by
	* `path.isAbsolute()`. When an absolute path is provided, it is checked to
	* see if it exists. If it does it's used, if not an error is returned
	* (callback)/ thrown (sync). The other two options for `srcpath` are a
	* relative url. By default Node's `fs.symlink` works by creating a symlink
	* using `dstpath` and expects the `srcpath` to be relative to the newly
	* created symlink. If you provide a `srcpath` that does not exist on the file
	* system it results in a broken symlink. To minimize this, the function
	* checks to see if the 'relative to symlink' source file exists, and if it
	* does it will use it. If it does not, it checks if there's a file that
	* exists that is relative to the current working directory, if does its used.
	* This preserves the expectations of the original fs.symlink spec and adds
	* the ability to pass in `relative to current working direcotry` paths.
	*/
	function symlinkPaths(srcpath, dstpath, callback) {
		if (path$14.isAbsolute(srcpath)) return fs.lstat(srcpath, (err) => {
			if (err) {
				err.message = err.message.replace("lstat", "ensureSymlink");
				return callback(err);
			}
			return callback(null, {
				toCwd: srcpath,
				toDst: srcpath
			});
		});
		else {
			const dstdir = path$14.dirname(dstpath);
			const relativeToDst = path$14.join(dstdir, srcpath);
			return pathExists(relativeToDst, (err, exists) => {
				if (err) return callback(err);
				if (exists) return callback(null, {
					toCwd: relativeToDst,
					toDst: srcpath
				});
				else return fs.lstat(srcpath, (err) => {
					if (err) {
						err.message = err.message.replace("lstat", "ensureSymlink");
						return callback(err);
					}
					return callback(null, {
						toCwd: srcpath,
						toDst: path$14.relative(dstdir, srcpath)
					});
				});
			});
		}
	}
	function symlinkPathsSync(srcpath, dstpath) {
		let exists;
		if (path$14.isAbsolute(srcpath)) {
			exists = fs.existsSync(srcpath);
			if (!exists) throw new Error("absolute srcpath does not exist");
			return {
				toCwd: srcpath,
				toDst: srcpath
			};
		} else {
			const dstdir = path$14.dirname(dstpath);
			const relativeToDst = path$14.join(dstdir, srcpath);
			exists = fs.existsSync(relativeToDst);
			if (exists) return {
				toCwd: relativeToDst,
				toDst: srcpath
			};
			else {
				exists = fs.existsSync(srcpath);
				if (!exists) throw new Error("relative srcpath does not exist");
				return {
					toCwd: srcpath,
					toDst: path$14.relative(dstdir, srcpath)
				};
			}
		}
	}
	module.exports = {
		symlinkPaths,
		symlinkPathsSync
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require_graceful_fs();
	function symlinkType(srcpath, type, callback) {
		callback = typeof type === "function" ? type : callback;
		type = typeof type === "function" ? false : type;
		if (type) return callback(null, type);
		fs.lstat(srcpath, (err, stats) => {
			if (err) return callback(null, "file");
			type = stats && stats.isDirectory() ? "dir" : "file";
			callback(null, type);
		});
	}
	function symlinkTypeSync(srcpath, type) {
		let stats;
		if (type) return type;
		try {
			stats = fs.lstatSync(srcpath);
		} catch {
			return "file";
		}
		return stats && stats.isDirectory() ? "dir" : "file";
	}
	module.exports = {
		symlinkType,
		symlinkTypeSync
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u = require_universalify().fromCallback;
	var path$13 = __require("path");
	var fs = require_fs();
	var _mkdirs = require_mkdirs();
	var mkdirs = _mkdirs.mkdirs;
	var mkdirsSync = _mkdirs.mkdirsSync;
	var _symlinkPaths = require_symlink_paths();
	var symlinkPaths = _symlinkPaths.symlinkPaths;
	var symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
	var _symlinkType = require_symlink_type();
	var symlinkType = _symlinkType.symlinkType;
	var symlinkTypeSync = _symlinkType.symlinkTypeSync;
	var pathExists = require_path_exists().pathExists;
	var { areIdentical } = require_stat();
	function createSymlink(srcpath, dstpath, type, callback) {
		callback = typeof type === "function" ? type : callback;
		type = typeof type === "function" ? false : type;
		fs.lstat(dstpath, (err, stats) => {
			if (!err && stats.isSymbolicLink()) Promise.all([fs.stat(srcpath), fs.stat(dstpath)]).then(([srcStat, dstStat]) => {
				if (areIdentical(srcStat, dstStat)) return callback(null);
				_createSymlink(srcpath, dstpath, type, callback);
			});
			else _createSymlink(srcpath, dstpath, type, callback);
		});
	}
	function _createSymlink(srcpath, dstpath, type, callback) {
		symlinkPaths(srcpath, dstpath, (err, relative) => {
			if (err) return callback(err);
			srcpath = relative.toDst;
			symlinkType(relative.toCwd, type, (err, type) => {
				if (err) return callback(err);
				const dir = path$13.dirname(dstpath);
				pathExists(dir, (err, dirExists) => {
					if (err) return callback(err);
					if (dirExists) return fs.symlink(srcpath, dstpath, type, callback);
					mkdirs(dir, (err) => {
						if (err) return callback(err);
						fs.symlink(srcpath, dstpath, type, callback);
					});
				});
			});
		});
	}
	function createSymlinkSync(srcpath, dstpath, type) {
		let stats;
		try {
			stats = fs.lstatSync(dstpath);
		} catch {}
		if (stats && stats.isSymbolicLink()) {
			if (areIdentical(fs.statSync(srcpath), fs.statSync(dstpath))) return;
		}
		const relative = symlinkPathsSync(srcpath, dstpath);
		srcpath = relative.toDst;
		type = symlinkTypeSync(relative.toCwd, type);
		const dir = path$13.dirname(dstpath);
		if (fs.existsSync(dir)) return fs.symlinkSync(srcpath, dstpath, type);
		mkdirsSync(dir);
		return fs.symlinkSync(srcpath, dstpath, type);
	}
	module.exports = {
		createSymlink: u(createSymlink),
		createSymlinkSync
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/ensure/index.js
var require_ensure = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { createFile, createFileSync } = require_file();
	var { createLink, createLinkSync } = require_link();
	var { createSymlink, createSymlinkSync } = require_symlink();
	module.exports = {
		createFile,
		createFileSync,
		ensureFile: createFile,
		ensureFileSync: createFileSync,
		createLink,
		createLinkSync,
		ensureLink: createLink,
		ensureLinkSync: createLinkSync,
		createSymlink,
		createSymlinkSync,
		ensureSymlink: createSymlink,
		ensureSymlinkSync: createSymlinkSync
	};
}));
//#endregion
//#region ../../node_modules/.bun/jsonfile@6.2.1/node_modules/jsonfile/utils.js
var require_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function stringify(obj, { EOL = "\n", finalEOL = true, replacer = null, spaces } = {}) {
		const EOF = finalEOL ? EOL : "";
		const str = JSON.stringify(obj, replacer, spaces);
		if (str === void 0) throw new TypeError(`Converting ${typeof obj} value to JSON is not supported`);
		return str.replace(/\n/g, EOL) + EOF;
	}
	function stripBom(content) {
		if (Buffer.isBuffer(content)) content = content.toString("utf8");
		return content.replace(/^\uFEFF/, "");
	}
	module.exports = {
		stringify,
		stripBom
	};
}));
//#endregion
//#region ../../node_modules/.bun/jsonfile@6.2.1/node_modules/jsonfile/index.js
var require_jsonfile$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _fs;
	try {
		_fs = require_graceful_fs();
	} catch (_) {
		_fs = __require("fs");
	}
	var universalify = require_universalify();
	var { stringify, stripBom } = require_utils();
	async function _readFile(file, options = {}) {
		if (typeof options === "string") options = { encoding: options };
		const fs = options.fs || _fs;
		const shouldThrow = "throws" in options ? options.throws : true;
		let data = await universalify.fromCallback(fs.readFile)(file, options);
		data = stripBom(data);
		let obj;
		try {
			obj = JSON.parse(data, options ? options.reviver : null);
		} catch (err) {
			if (shouldThrow) {
				err.message = `${file}: ${err.message}`;
				throw err;
			} else return null;
		}
		return obj;
	}
	var readFile = universalify.fromPromise(_readFile);
	function readFileSync(file, options = {}) {
		if (typeof options === "string") options = { encoding: options };
		const fs = options.fs || _fs;
		const shouldThrow = "throws" in options ? options.throws : true;
		try {
			let content = fs.readFileSync(file, options);
			content = stripBom(content);
			return JSON.parse(content, options.reviver);
		} catch (err) {
			if (shouldThrow) {
				err.message = `${file}: ${err.message}`;
				throw err;
			} else return null;
		}
	}
	async function _writeFile(file, obj, options = {}) {
		const fs = options.fs || _fs;
		const str = stringify(obj, options);
		await universalify.fromCallback(fs.writeFile)(file, str, options);
	}
	var writeFile = universalify.fromPromise(_writeFile);
	function writeFileSync(file, obj, options = {}) {
		const fs = options.fs || _fs;
		const str = stringify(obj, options);
		return fs.writeFileSync(file, str, options);
	}
	module.exports = {
		readFile,
		readFileSync,
		writeFile,
		writeFileSync
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/json/jsonfile.js
var require_jsonfile = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var jsonFile = require_jsonfile$1();
	module.exports = {
		readJson: jsonFile.readFile,
		readJsonSync: jsonFile.readFileSync,
		writeJson: jsonFile.writeFile,
		writeJsonSync: jsonFile.writeFileSync
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/output-file/index.js
var require_output_file = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u = require_universalify().fromCallback;
	var fs = require_graceful_fs();
	var path$12 = __require("path");
	var mkdir = require_mkdirs();
	var pathExists = require_path_exists().pathExists;
	function outputFile(file, data, encoding, callback) {
		if (typeof encoding === "function") {
			callback = encoding;
			encoding = "utf8";
		}
		const dir = path$12.dirname(file);
		pathExists(dir, (err, itDoes) => {
			if (err) return callback(err);
			if (itDoes) return fs.writeFile(file, data, encoding, callback);
			mkdir.mkdirs(dir, (err) => {
				if (err) return callback(err);
				fs.writeFile(file, data, encoding, callback);
			});
		});
	}
	function outputFileSync(file, ...args) {
		const dir = path$12.dirname(file);
		if (fs.existsSync(dir)) return fs.writeFileSync(file, ...args);
		mkdir.mkdirsSync(dir);
		fs.writeFileSync(file, ...args);
	}
	module.exports = {
		outputFile: u(outputFile),
		outputFileSync
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/json/output-json.js
var require_output_json = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { stringify } = require_utils();
	var { outputFile } = require_output_file();
	async function outputJson(file, data, options = {}) {
		await outputFile(file, stringify(data, options), options);
	}
	module.exports = outputJson;
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { stringify } = require_utils();
	var { outputFileSync } = require_output_file();
	function outputJsonSync(file, data, options) {
		outputFileSync(file, stringify(data, options), options);
	}
	module.exports = outputJsonSync;
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/json/index.js
var require_json$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u = require_universalify().fromPromise;
	var jsonFile = require_jsonfile();
	jsonFile.outputJson = u(require_output_json());
	jsonFile.outputJsonSync = require_output_json_sync();
	jsonFile.outputJSON = jsonFile.outputJson;
	jsonFile.outputJSONSync = jsonFile.outputJsonSync;
	jsonFile.writeJSON = jsonFile.writeJson;
	jsonFile.writeJSONSync = jsonFile.writeJsonSync;
	jsonFile.readJSON = jsonFile.readJson;
	jsonFile.readJSONSync = jsonFile.readJsonSync;
	module.exports = jsonFile;
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/move/move.js
var require_move$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require_graceful_fs();
	var path$11 = __require("path");
	var copy = require_copy().copy;
	var remove = require_remove().remove;
	var mkdirp = require_mkdirs().mkdirp;
	var pathExists = require_path_exists().pathExists;
	var stat = require_stat();
	function move(src, dest, opts, cb) {
		if (typeof opts === "function") {
			cb = opts;
			opts = {};
		}
		opts = opts || {};
		const overwrite = opts.overwrite || opts.clobber || false;
		stat.checkPaths(src, dest, "move", opts, (err, stats) => {
			if (err) return cb(err);
			const { srcStat, isChangingCase = false } = stats;
			stat.checkParentPaths(src, srcStat, dest, "move", (err) => {
				if (err) return cb(err);
				if (isParentRoot(dest)) return doRename(src, dest, overwrite, isChangingCase, cb);
				mkdirp(path$11.dirname(dest), (err) => {
					if (err) return cb(err);
					return doRename(src, dest, overwrite, isChangingCase, cb);
				});
			});
		});
	}
	function isParentRoot(dest) {
		const parent = path$11.dirname(dest);
		return path$11.parse(parent).root === parent;
	}
	function doRename(src, dest, overwrite, isChangingCase, cb) {
		if (isChangingCase) return rename(src, dest, overwrite, cb);
		if (overwrite) return remove(dest, (err) => {
			if (err) return cb(err);
			return rename(src, dest, overwrite, cb);
		});
		pathExists(dest, (err, destExists) => {
			if (err) return cb(err);
			if (destExists) return cb(/* @__PURE__ */ new Error("dest already exists."));
			return rename(src, dest, overwrite, cb);
		});
	}
	function rename(src, dest, overwrite, cb) {
		fs.rename(src, dest, (err) => {
			if (!err) return cb();
			if (err.code !== "EXDEV") return cb(err);
			return moveAcrossDevice(src, dest, overwrite, cb);
		});
	}
	function moveAcrossDevice(src, dest, overwrite, cb) {
		copy(src, dest, {
			overwrite,
			errorOnExist: true
		}, (err) => {
			if (err) return cb(err);
			return remove(src, cb);
		});
	}
	module.exports = move;
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/move/move-sync.js
var require_move_sync = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require_graceful_fs();
	var path$10 = __require("path");
	var copySync = require_copy().copySync;
	var removeSync = require_remove().removeSync;
	var mkdirpSync = require_mkdirs().mkdirpSync;
	var stat = require_stat();
	function moveSync(src, dest, opts) {
		opts = opts || {};
		const overwrite = opts.overwrite || opts.clobber || false;
		const { srcStat, isChangingCase = false } = stat.checkPathsSync(src, dest, "move", opts);
		stat.checkParentPathsSync(src, srcStat, dest, "move");
		if (!isParentRoot(dest)) mkdirpSync(path$10.dirname(dest));
		return doRename(src, dest, overwrite, isChangingCase);
	}
	function isParentRoot(dest) {
		const parent = path$10.dirname(dest);
		return path$10.parse(parent).root === parent;
	}
	function doRename(src, dest, overwrite, isChangingCase) {
		if (isChangingCase) return rename(src, dest, overwrite);
		if (overwrite) {
			removeSync(dest);
			return rename(src, dest, overwrite);
		}
		if (fs.existsSync(dest)) throw new Error("dest already exists.");
		return rename(src, dest, overwrite);
	}
	function rename(src, dest, overwrite) {
		try {
			fs.renameSync(src, dest);
		} catch (err) {
			if (err.code !== "EXDEV") throw err;
			return moveAcrossDevice(src, dest, overwrite);
		}
	}
	function moveAcrossDevice(src, dest, overwrite) {
		copySync(src, dest, {
			overwrite,
			errorOnExist: true
		});
		return removeSync(src);
	}
	module.exports = moveSync;
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/move/index.js
var require_move = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u = require_universalify().fromCallback;
	module.exports = {
		move: u(require_move$1()),
		moveSync: require_move_sync()
	};
}));
//#endregion
//#region ../../node_modules/.bun/fs-extra@10.1.0/node_modules/fs-extra/lib/index.js
var require_lib = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		...require_fs(),
		...require_copy(),
		...require_empty(),
		...require_ensure(),
		...require_json$1(),
		...require_mkdirs(),
		...require_move(),
		...require_output_file(),
		...require_path_exists(),
		...require_remove()
	};
}));
//#endregion
//#region ../../node_modules/.bun/builder-util-runtime@9.5.1/node_modules/builder-util-runtime/out/CancellationToken.js
var require_CancellationToken = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CancellationError = exports.CancellationToken = void 0;
	var events_1$1 = __require("events");
	var CancellationToken = class extends events_1$1.EventEmitter {
		get cancelled() {
			return this._cancelled || this._parent != null && this._parent.cancelled;
		}
		set parent(value) {
			this.removeParentCancelHandler();
			this._parent = value;
			this.parentCancelHandler = () => this.cancel();
			this._parent.onCancel(this.parentCancelHandler);
		}
		constructor(parent) {
			super();
			this.parentCancelHandler = null;
			this._parent = null;
			this._cancelled = false;
			if (parent != null) this.parent = parent;
		}
		cancel() {
			this._cancelled = true;
			this.emit("cancel");
		}
		onCancel(handler) {
			if (this.cancelled) handler();
			else this.once("cancel", handler);
		}
		createPromise(callback) {
			if (this.cancelled) return Promise.reject(new CancellationError());
			const finallyHandler = () => {
				if (cancelHandler != null) try {
					this.removeListener("cancel", cancelHandler);
					cancelHandler = null;
				} catch (_ignore) {}
			};
			let cancelHandler = null;
			return new Promise((resolve, reject) => {
				let addedCancelHandler = null;
				cancelHandler = () => {
					try {
						if (addedCancelHandler != null) {
							addedCancelHandler();
							addedCancelHandler = null;
						}
					} finally {
						reject(new CancellationError());
					}
				};
				if (this.cancelled) {
					cancelHandler();
					return;
				}
				this.onCancel(cancelHandler);
				callback(resolve, reject, (callback) => {
					addedCancelHandler = callback;
				});
			}).then((it) => {
				finallyHandler();
				return it;
			}).catch((e) => {
				finallyHandler();
				throw e;
			});
		}
		removeParentCancelHandler() {
			const parent = this._parent;
			if (parent != null && this.parentCancelHandler != null) {
				parent.removeListener("cancel", this.parentCancelHandler);
				this.parentCancelHandler = null;
			}
		}
		dispose() {
			try {
				this.removeParentCancelHandler();
			} finally {
				this.removeAllListeners();
				this._parent = null;
			}
		}
	};
	exports.CancellationToken = CancellationToken;
	var CancellationError = class extends Error {
		constructor() {
			super("cancelled");
		}
	};
	exports.CancellationError = CancellationError;
}));
//#endregion
//#region ../../node_modules/.bun/builder-util-runtime@9.5.1/node_modules/builder-util-runtime/out/error.js
var require_error = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.newError = newError;
	function newError(message, code) {
		const error = new Error(message);
		error.code = code;
		return error;
	}
}));
//#endregion
//#region ../../node_modules/.bun/ms@2.1.3/node_modules/ms/index.js
var require_ms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Helpers.
	*/
	var s = 1e3;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;
	/**
	* Parse or format the given `val`.
	*
	* Options:
	*
	*  - `long` verbose formatting [false]
	*
	* @param {String|Number} val
	* @param {Object} [options]
	* @throws {Error} throw an error if val is not a non-empty string or a number
	* @return {String|Number}
	* @api public
	*/
	module.exports = function(val, options) {
		options = options || {};
		var type = typeof val;
		if (type === "string" && val.length > 0) return parse(val);
		else if (type === "number" && isFinite(val)) return options.long ? fmtLong(val) : fmtShort(val);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
	};
	/**
	* Parse the given `str` and return milliseconds.
	*
	* @param {String} str
	* @return {Number}
	* @api private
	*/
	function parse(str) {
		str = String(str);
		if (str.length > 100) return;
		var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
		if (!match) return;
		var n = parseFloat(match[1]);
		switch ((match[2] || "ms").toLowerCase()) {
			case "years":
			case "year":
			case "yrs":
			case "yr":
			case "y": return n * y;
			case "weeks":
			case "week":
			case "w": return n * w;
			case "days":
			case "day":
			case "d": return n * d;
			case "hours":
			case "hour":
			case "hrs":
			case "hr":
			case "h": return n * h;
			case "minutes":
			case "minute":
			case "mins":
			case "min":
			case "m": return n * m;
			case "seconds":
			case "second":
			case "secs":
			case "sec":
			case "s": return n * s;
			case "milliseconds":
			case "millisecond":
			case "msecs":
			case "msec":
			case "ms": return n;
			default: return;
		}
	}
	/**
	* Short format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtShort(ms) {
		var msAbs = Math.abs(ms);
		if (msAbs >= d) return Math.round(ms / d) + "d";
		if (msAbs >= h) return Math.round(ms / h) + "h";
		if (msAbs >= m) return Math.round(ms / m) + "m";
		if (msAbs >= s) return Math.round(ms / s) + "s";
		return ms + "ms";
	}
	/**
	* Long format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtLong(ms) {
		var msAbs = Math.abs(ms);
		if (msAbs >= d) return plural(ms, msAbs, d, "day");
		if (msAbs >= h) return plural(ms, msAbs, h, "hour");
		if (msAbs >= m) return plural(ms, msAbs, m, "minute");
		if (msAbs >= s) return plural(ms, msAbs, s, "second");
		return ms + " ms";
	}
	/**
	* Pluralization helper.
	*/
	function plural(ms, msAbs, n, name) {
		var isPlural = msAbs >= n * 1.5;
		return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
	}
}));
//#endregion
//#region ../../node_modules/.bun/debug@4.4.3/node_modules/debug/src/common.js
var require_common$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the common logic for both the Node.js and web browser
	* implementations of `debug()`.
	*/
	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = require_ms();
		createDebug.destroy = destroy;
		Object.keys(env).forEach((key) => {
			createDebug[key] = env[key];
		});
		/**
		* The currently active debug mode names, and names to skip.
		*/
		createDebug.names = [];
		createDebug.skips = [];
		/**
		* Map of special "%n" handling functions, for the debug "format" argument.
		*
		* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
		*/
		createDebug.formatters = {};
		/**
		* Selects a color for a debug namespace
		* @param {String} namespace The namespace string for the debug instance to be colored
		* @return {Number|String} An ANSI color code for the given namespace
		* @api private
		*/
		function selectColor(namespace) {
			let hash = 0;
			for (let i = 0; i < namespace.length; i++) {
				hash = (hash << 5) - hash + namespace.charCodeAt(i);
				hash |= 0;
			}
			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;
		/**
		* Create a debugger with the given `namespace`.
		*
		* @param {String} namespace
		* @return {Function}
		* @api public
		*/
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;
			function debug(...args) {
				if (!debug.enabled) return;
				const self = debug;
				const curr = Number(/* @__PURE__ */ new Date());
				self.diff = curr - (prevTime || curr);
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;
				args[0] = createDebug.coerce(args[0]);
				if (typeof args[0] !== "string") args.unshift("%O");
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					if (match === "%%") return "%";
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === "function") {
						const val = args[index];
						match = formatter.call(self, val);
						args.splice(index, 1);
						index--;
					}
					return match;
				});
				createDebug.formatArgs.call(self, args);
				(self.log || createDebug.log).apply(self, args);
			}
			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy;
			Object.defineProperty(debug, "enabled", {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) return enableOverride;
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}
					return enabledCache;
				},
				set: (v) => {
					enableOverride = v;
				}
			});
			if (typeof createDebug.init === "function") createDebug.init(debug);
			return debug;
		}
		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}
		/**
		* Enables a debug mode by namespaces. This can include modes
		* separated by a colon and wildcards.
		*
		* @param {String} namespaces
		* @api public
		*/
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;
			createDebug.names = [];
			createDebug.skips = [];
			const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
			for (const ns of split) if (ns[0] === "-") createDebug.skips.push(ns.slice(1));
			else createDebug.names.push(ns);
		}
		/**
		* Checks if the given string matches a namespace template, honoring
		* asterisks as wildcards.
		*
		* @param {String} search
		* @param {String} template
		* @return {Boolean}
		*/
		function matchesTemplate(search, template) {
			let searchIndex = 0;
			let templateIndex = 0;
			let starIndex = -1;
			let matchIndex = 0;
			while (searchIndex < search.length) if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) if (template[templateIndex] === "*") {
				starIndex = templateIndex;
				matchIndex = searchIndex;
				templateIndex++;
			} else {
				searchIndex++;
				templateIndex++;
			}
			else if (starIndex !== -1) {
				templateIndex = starIndex + 1;
				matchIndex++;
				searchIndex = matchIndex;
			} else return false;
			while (templateIndex < template.length && template[templateIndex] === "*") templateIndex++;
			return templateIndex === template.length;
		}
		/**
		* Disable debug output.
		*
		* @return {String} namespaces
		* @api public
		*/
		function disable() {
			const namespaces = [...createDebug.names, ...createDebug.skips.map((namespace) => "-" + namespace)].join(",");
			createDebug.enable("");
			return namespaces;
		}
		/**
		* Returns true if the given mode name is enabled, false otherwise.
		*
		* @param {String} name
		* @return {Boolean}
		* @api public
		*/
		function enabled(name) {
			for (const skip of createDebug.skips) if (matchesTemplate(name, skip)) return false;
			for (const ns of createDebug.names) if (matchesTemplate(name, ns)) return true;
			return false;
		}
		/**
		* Coerce `val`.
		*
		* @param {Mixed} val
		* @return {Mixed}
		* @api private
		*/
		function coerce(val) {
			if (val instanceof Error) return val.stack || val.message;
			return val;
		}
		/**
		* XXX DO NOT USE. This is a temporary stub function.
		* XXX It WILL be removed in the next major release.
		*/
		function destroy() {
			console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
		}
		createDebug.enable(createDebug.load());
		return createDebug;
	}
	module.exports = setup;
}));
//#endregion
//#region ../../node_modules/.bun/debug@4.4.3/node_modules/debug/src/browser.js
var require_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the web browser implementation of `debug()`.
	*/
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = localstorage();
	exports.destroy = (() => {
		let warned = false;
		return () => {
			if (!warned) {
				warned = true;
				console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
			}
		};
	})();
	/**
	* Colors.
	*/
	exports.colors = [
		"#0000CC",
		"#0000FF",
		"#0033CC",
		"#0033FF",
		"#0066CC",
		"#0066FF",
		"#0099CC",
		"#0099FF",
		"#00CC00",
		"#00CC33",
		"#00CC66",
		"#00CC99",
		"#00CCCC",
		"#00CCFF",
		"#3300CC",
		"#3300FF",
		"#3333CC",
		"#3333FF",
		"#3366CC",
		"#3366FF",
		"#3399CC",
		"#3399FF",
		"#33CC00",
		"#33CC33",
		"#33CC66",
		"#33CC99",
		"#33CCCC",
		"#33CCFF",
		"#6600CC",
		"#6600FF",
		"#6633CC",
		"#6633FF",
		"#66CC00",
		"#66CC33",
		"#9900CC",
		"#9900FF",
		"#9933CC",
		"#9933FF",
		"#99CC00",
		"#99CC33",
		"#CC0000",
		"#CC0033",
		"#CC0066",
		"#CC0099",
		"#CC00CC",
		"#CC00FF",
		"#CC3300",
		"#CC3333",
		"#CC3366",
		"#CC3399",
		"#CC33CC",
		"#CC33FF",
		"#CC6600",
		"#CC6633",
		"#CC9900",
		"#CC9933",
		"#CCCC00",
		"#CCCC33",
		"#FF0000",
		"#FF0033",
		"#FF0066",
		"#FF0099",
		"#FF00CC",
		"#FF00FF",
		"#FF3300",
		"#FF3333",
		"#FF3366",
		"#FF3399",
		"#FF33CC",
		"#FF33FF",
		"#FF6600",
		"#FF6633",
		"#FF9900",
		"#FF9933",
		"#FFCC00",
		"#FFCC33"
	];
	/**
	* Currently only WebKit-based Web Inspectors, Firefox >= v31,
	* and the Firebug extension (any Firefox version) are known
	* to support "%c" CSS customizations.
	*
	* TODO: add a `localStorage` variable to explicitly enable/disable colors
	*/
	function useColors() {
		if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return true;
		if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
		let m;
		return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	/**
	* Colorize log arguments if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
		if (!this.useColors) return;
		const c = "color: " + this.color;
		args.splice(1, 0, c, "color: inherit");
		let index = 0;
		let lastC = 0;
		args[0].replace(/%[a-zA-Z%]/g, (match) => {
			if (match === "%%") return;
			index++;
			if (match === "%c") lastC = index;
		});
		args.splice(lastC, 0, c);
	}
	/**
	* Invokes `console.debug()` when available.
	* No-op when `console.debug` is not a "function".
	* If `console.debug` is not available, falls back
	* to `console.log`.
	*
	* @api public
	*/
	exports.log = console.debug || console.log || (() => {});
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		try {
			if (namespaces) exports.storage.setItem("debug", namespaces);
			else exports.storage.removeItem("debug");
		} catch (error) {}
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		let r;
		try {
			r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
		} catch (error) {}
		if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
		return r;
	}
	/**
	* Localstorage attempts to return the localstorage.
	*
	* This is necessary because safari throws
	* when a user disables cookies/localstorage
	* and you attempt to access it.
	*
	* @return {LocalStorage}
	* @api private
	*/
	function localstorage() {
		try {
			return localStorage;
		} catch (error) {}
	}
	module.exports = require_common$1()(exports);
	var { formatters } = module.exports;
	/**
	* Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	*/
	formatters.j = function(v) {
		try {
			return JSON.stringify(v);
		} catch (error) {
			return "[UnexpectedJSONParseError]: " + error.message;
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/supports-color@10.2.2/node_modules/supports-color/index.js
var supports_color_exports = /* @__PURE__ */ __exportAll({
	createSupportsColor: () => createSupportsColor,
	default: () => supportsColor
});
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : process$1.argv) {
	const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf("--");
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
function envForceColor() {
	if (!("FORCE_COLOR" in env)) return;
	if (env.FORCE_COLOR === "true") return 1;
	if (env.FORCE_COLOR === "false") return 0;
	if (env.FORCE_COLOR.length === 0) return 1;
	const level = Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
	if (![
		0,
		1,
		2,
		3
	].includes(level)) return;
	return level;
}
function translateLevel(level) {
	if (level === 0) return false;
	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
	const noFlagForceColor = envForceColor();
	if (noFlagForceColor !== void 0) flagForceColor = noFlagForceColor;
	const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
	if (forceColor === 0) return 0;
	if (sniffFlags) {
		if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) return 3;
		if (hasFlag("color=256")) return 2;
	}
	if ("TF_BUILD" in env && "AGENT_NAME" in env) return 1;
	if (haveStream && !streamIsTTY && forceColor === void 0) return 0;
	const min = forceColor || 0;
	if (env.TERM === "dumb") return min;
	if (process$1.platform === "win32") {
		const osRelease = os.release().split(".");
		if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) return Number(osRelease[2]) >= 14931 ? 3 : 2;
		return 1;
	}
	if ("CI" in env) {
		if ([
			"GITHUB_ACTIONS",
			"GITEA_ACTIONS",
			"CIRCLECI"
		].some((key) => key in env)) return 3;
		if ([
			"TRAVIS",
			"APPVEYOR",
			"GITLAB_CI",
			"BUILDKITE",
			"DRONE"
		].some((sign) => sign in env) || env.CI_NAME === "codeship") return 1;
		return min;
	}
	if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	if (env.COLORTERM === "truecolor") return 3;
	if (env.TERM === "xterm-kitty") return 3;
	if (env.TERM === "xterm-ghostty") return 3;
	if (env.TERM === "wezterm") return 3;
	if ("TERM_PROGRAM" in env) {
		const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
		switch (env.TERM_PROGRAM) {
			case "iTerm.app": return version >= 3 ? 3 : 2;
			case "Apple_Terminal": return 2;
		}
	}
	if (/-256(color)?$/i.test(env.TERM)) return 2;
	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) return 1;
	if ("COLORTERM" in env) return 1;
	return min;
}
function createSupportsColor(stream, options = {}) {
	return translateLevel(_supportsColor(stream, {
		streamIsTTY: stream && stream.isTTY,
		...options
	}));
}
var env, flagForceColor, supportsColor;
var init_supports_color = __esmMin((() => {
	({env} = process$1);
	if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) flagForceColor = 0;
	else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) flagForceColor = 1;
	supportsColor = {
		stdout: createSupportsColor({ isTTY: tty.isatty(1) }),
		stderr: createSupportsColor({ isTTY: tty.isatty(2) })
	};
}));
//#endregion
//#region ../../node_modules/.bun/debug@4.4.3/node_modules/debug/src/node.js
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module dependencies.
	*/
	var tty$1 = __require("tty");
	var util = __require("util");
	/**
	* This is the Node.js implementation of `debug()`.
	*/
	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.destroy = util.deprecate(() => {}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
	/**
	* Colors.
	*/
	exports.colors = [
		6,
		2,
		3,
		4,
		5,
		1
	];
	try {
		const supportsColor = (init_supports_color(), __toCommonJS(supports_color_exports));
		if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	} catch (error) {}
	/**
	* Build up the default `inspectOpts` object from the environment variables.
	*
	*   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
	*/
	exports.inspectOpts = Object.keys(process.env).filter((key) => {
		return /^debug_/i.test(key);
	}).reduce((obj, key) => {
		const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});
		let val = process.env[key];
		if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
		else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
		else if (val === "null") val = null;
		else val = Number(val);
		obj[prop] = val;
		return obj;
	}, {});
	/**
	* Is stdout a TTY? Colored output is enabled when `true`.
	*/
	function useColors() {
		return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty$1.isatty(process.stderr.fd);
	}
	/**
	* Adds ANSI color escape codes if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		const { namespace: name, useColors } = this;
		if (useColors) {
			const c = this.color;
			const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
			const prefix = `  ${colorCode};1m${name} \u001B[0m`;
			args[0] = prefix + args[0].split("\n").join("\n" + prefix);
			args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
		} else args[0] = getDate() + name + " " + args[0];
	}
	function getDate() {
		if (exports.inspectOpts.hideDate) return "";
		return (/* @__PURE__ */ new Date()).toISOString() + " ";
	}
	/**
	* Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
	*/
	function log(...args) {
		return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
	}
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		if (namespaces) process.env.DEBUG = namespaces;
		else delete process.env.DEBUG;
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		return process.env.DEBUG;
	}
	/**
	* Init logic for `debug` instances.
	*
	* Create a new `inspectOpts` object in case `useColors` is set
	* differently for a particular `debug` instance.
	*/
	function init(debug) {
		debug.inspectOpts = {};
		const keys = Object.keys(exports.inspectOpts);
		for (let i = 0; i < keys.length; i++) debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
	module.exports = require_common$1()(exports);
	var { formatters } = module.exports;
	/**
	* Map %o to `util.inspect()`, all on a single line.
	*/
	formatters.o = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
	};
	/**
	* Map %O to `util.inspect()`, allowing multiple lines if needed.
	*/
	formatters.O = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util.inspect(v, this.inspectOpts);
	};
}));
//#endregion
//#region ../../node_modules/.bun/debug@4.4.3/node_modules/debug/src/index.js
var require_src = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Detect Electron renderer / nwjs process, which is node, but we should
	* treat as a browser.
	*/
	if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) module.exports = require_browser();
	else module.exports = require_node();
}));
//#endregion
//#region ../../node_modules/.bun/builder-util-runtime@9.5.1/node_modules/builder-util-runtime/out/ProgressCallbackTransform.js
var require_ProgressCallbackTransform = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ProgressCallbackTransform = void 0;
	var stream_1$3 = __require("stream");
	var ProgressCallbackTransform = class extends stream_1$3.Transform {
		constructor(total, cancellationToken, onProgress) {
			super();
			this.total = total;
			this.cancellationToken = cancellationToken;
			this.onProgress = onProgress;
			this.start = Date.now();
			this.transferred = 0;
			this.delta = 0;
			this.nextUpdate = this.start + 1e3;
		}
		_transform(chunk, encoding, callback) {
			if (this.cancellationToken.cancelled) {
				callback(/* @__PURE__ */ new Error("cancelled"), null);
				return;
			}
			this.transferred += chunk.length;
			this.delta += chunk.length;
			const now = Date.now();
			if (now >= this.nextUpdate && this.transferred !== this.total) {
				this.nextUpdate = now + 1e3;
				this.onProgress({
					total: this.total,
					delta: this.delta,
					transferred: this.transferred,
					percent: this.transferred / this.total * 100,
					bytesPerSecond: Math.round(this.transferred / ((now - this.start) / 1e3))
				});
				this.delta = 0;
			}
			callback(null, chunk);
		}
		_flush(callback) {
			if (this.cancellationToken.cancelled) {
				callback(/* @__PURE__ */ new Error("cancelled"));
				return;
			}
			this.onProgress({
				total: this.total,
				delta: this.delta,
				transferred: this.total,
				percent: 100,
				bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
			});
			this.delta = 0;
			callback(null);
		}
	};
	exports.ProgressCallbackTransform = ProgressCallbackTransform;
}));
//#endregion
//#region ../../node_modules/.bun/builder-util-runtime@9.5.1/node_modules/builder-util-runtime/out/httpExecutor.js
var require_httpExecutor = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DigestTransform = exports.HttpExecutor = exports.HttpError = void 0;
	exports.createHttpError = createHttpError;
	exports.parseJson = parseJson;
	exports.configureRequestOptionsFromUrl = configureRequestOptionsFromUrl;
	exports.configureRequestUrl = configureRequestUrl;
	exports.safeGetHeader = safeGetHeader;
	exports.configureRequestOptions = configureRequestOptions;
	exports.safeStringifyJson = safeStringifyJson;
	var crypto_1$4 = __require("crypto");
	var debug_1 = require_src();
	var fs_1$5 = __require("fs");
	var stream_1$2 = __require("stream");
	var url_1$7 = __require("url");
	var CancellationToken_1 = require_CancellationToken();
	var error_1 = require_error();
	var ProgressCallbackTransform_1 = require_ProgressCallbackTransform();
	var debug = (0, debug_1.default)("electron-builder");
	function createHttpError(response, description = null) {
		return new HttpError(response.statusCode || -1, `${response.statusCode} ${response.statusMessage}` + (description == null ? "" : "\n" + JSON.stringify(description, null, "  ")) + "\nHeaders: " + safeStringifyJson(response.headers), description);
	}
	var HTTP_STATUS_CODES = new Map([
		[429, "Too many requests"],
		[400, "Bad request"],
		[403, "Forbidden"],
		[404, "Not found"],
		[405, "Method not allowed"],
		[406, "Not acceptable"],
		[408, "Request timeout"],
		[413, "Request entity too large"],
		[500, "Internal server error"],
		[502, "Bad gateway"],
		[503, "Service unavailable"],
		[504, "Gateway timeout"],
		[505, "HTTP version not supported"]
	]);
	var HttpError = class extends Error {
		constructor(statusCode, message = `HTTP error: ${HTTP_STATUS_CODES.get(statusCode) || statusCode}`, description = null) {
			super(message);
			this.statusCode = statusCode;
			this.description = description;
			this.name = "HttpError";
			this.code = `HTTP_ERROR_${statusCode}`;
		}
		isServerError() {
			return this.statusCode >= 500 && this.statusCode <= 599;
		}
	};
	exports.HttpError = HttpError;
	function parseJson(result) {
		return result.then((it) => it == null || it.length === 0 ? null : JSON.parse(it));
	}
	exports.HttpExecutor = class HttpExecutor {
		constructor() {
			this.maxRedirects = 10;
		}
		request(options, cancellationToken = new CancellationToken_1.CancellationToken(), data) {
			configureRequestOptions(options);
			const json = data == null ? void 0 : JSON.stringify(data);
			const encodedData = json ? Buffer.from(json) : void 0;
			if (encodedData != null) {
				debug(json);
				const { headers, ...opts } = options;
				options = {
					method: "post",
					headers: {
						"Content-Type": "application/json",
						"Content-Length": encodedData.length,
						...headers
					},
					...opts
				};
			}
			return this.doApiRequest(options, cancellationToken, (it) => it.end(encodedData));
		}
		doApiRequest(options, cancellationToken, requestProcessor, redirectCount = 0) {
			if (debug.enabled) debug(`Request: ${safeStringifyJson(options)}`);
			return cancellationToken.createPromise((resolve, reject, onCancel) => {
				const request = this.createRequest(options, (response) => {
					try {
						this.handleResponse(response, options, cancellationToken, resolve, reject, redirectCount, requestProcessor);
					} catch (e) {
						reject(e);
					}
				});
				this.addErrorAndTimeoutHandlers(request, reject, options.timeout);
				this.addRedirectHandlers(request, options, reject, redirectCount, (options) => {
					this.doApiRequest(options, cancellationToken, requestProcessor, redirectCount).then(resolve).catch(reject);
				});
				requestProcessor(request, reject);
				onCancel(() => request.abort());
			});
		}
		addRedirectHandlers(request, options, reject, redirectCount, handler) {}
		addErrorAndTimeoutHandlers(request, reject, timeout = 60 * 1e3) {
			this.addTimeOutHandler(request, reject, timeout);
			request.on("error", reject);
			request.on("aborted", () => {
				reject(/* @__PURE__ */ new Error("Request has been aborted by the server"));
			});
		}
		handleResponse(response, options, cancellationToken, resolve, reject, redirectCount, requestProcessor) {
			var _a;
			if (debug.enabled) debug(`Response: ${response.statusCode} ${response.statusMessage}, request options: ${safeStringifyJson(options)}`);
			if (response.statusCode === 404) {
				reject(createHttpError(response, `method: ${options.method || "GET"} url: ${options.protocol || "https:"}//${options.hostname}${options.port ? `:${options.port}` : ""}${options.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
				return;
			} else if (response.statusCode === 204) {
				resolve();
				return;
			}
			const code = (_a = response.statusCode) !== null && _a !== void 0 ? _a : 0;
			const shouldRedirect = code >= 300 && code < 400;
			const redirectUrl = safeGetHeader(response, "location");
			if (shouldRedirect && redirectUrl != null) {
				if (redirectCount > this.maxRedirects) {
					reject(this.createMaxRedirectError());
					return;
				}
				this.doApiRequest(HttpExecutor.prepareRedirectUrlOptions(redirectUrl, options), cancellationToken, requestProcessor, redirectCount).then(resolve).catch(reject);
				return;
			}
			response.setEncoding("utf8");
			let data = "";
			response.on("error", reject);
			response.on("data", (chunk) => data += chunk);
			response.on("end", () => {
				try {
					if (response.statusCode != null && response.statusCode >= 400) {
						const contentType = safeGetHeader(response, "content-type");
						const isJson = contentType != null && (Array.isArray(contentType) ? contentType.find((it) => it.includes("json")) != null : contentType.includes("json"));
						reject(createHttpError(response, `method: ${options.method || "GET"} url: ${options.protocol || "https:"}//${options.hostname}${options.port ? `:${options.port}` : ""}${options.path}

          Data:
          ${isJson ? JSON.stringify(JSON.parse(data)) : data}
          `));
					} else resolve(data.length === 0 ? null : data);
				} catch (e) {
					reject(e);
				}
			});
		}
		async downloadToBuffer(url, options) {
			return await options.cancellationToken.createPromise((resolve, reject, onCancel) => {
				const responseChunks = [];
				const requestOptions = {
					headers: options.headers || void 0,
					redirect: "manual"
				};
				configureRequestUrl(url, requestOptions);
				configureRequestOptions(requestOptions);
				this.doDownload(requestOptions, {
					destination: null,
					options,
					onCancel,
					callback: (error) => {
						if (error == null) resolve(Buffer.concat(responseChunks));
						else reject(error);
					},
					responseHandler: (response, callback) => {
						let receivedLength = 0;
						response.on("data", (chunk) => {
							receivedLength += chunk.length;
							if (receivedLength > 524288e3) {
								callback(/* @__PURE__ */ new Error("Maximum allowed size is 500 MB"));
								return;
							}
							responseChunks.push(chunk);
						});
						response.on("end", () => {
							callback(null);
						});
					}
				}, 0);
			});
		}
		doDownload(requestOptions, options, redirectCount) {
			const request = this.createRequest(requestOptions, (response) => {
				if (response.statusCode >= 400) {
					options.callback(/* @__PURE__ */ new Error(`Cannot download "${requestOptions.protocol || "https:"}//${requestOptions.hostname}${requestOptions.path}", status ${response.statusCode}: ${response.statusMessage}`));
					return;
				}
				response.on("error", options.callback);
				const redirectUrl = safeGetHeader(response, "location");
				if (redirectUrl != null) {
					if (redirectCount < this.maxRedirects) this.doDownload(HttpExecutor.prepareRedirectUrlOptions(redirectUrl, requestOptions), options, redirectCount++);
					else options.callback(this.createMaxRedirectError());
					return;
				}
				if (options.responseHandler == null) configurePipes(options, response);
				else options.responseHandler(response, options.callback);
			});
			this.addErrorAndTimeoutHandlers(request, options.callback, requestOptions.timeout);
			this.addRedirectHandlers(request, requestOptions, options.callback, redirectCount, (requestOptions) => {
				this.doDownload(requestOptions, options, redirectCount++);
			});
			request.end();
		}
		createMaxRedirectError() {
			return /* @__PURE__ */ new Error(`Too many redirects (> ${this.maxRedirects})`);
		}
		addTimeOutHandler(request, callback, timeout) {
			request.on("socket", (socket) => {
				socket.setTimeout(timeout, () => {
					request.abort();
					callback(/* @__PURE__ */ new Error("Request timed out"));
				});
			});
		}
		static prepareRedirectUrlOptions(redirectUrl, options) {
			const newOptions = configureRequestOptionsFromUrl(redirectUrl, { ...options });
			const headers = newOptions.headers;
			if (headers === null || headers === void 0 ? void 0 : headers.authorization) {
				const originalUrl = HttpExecutor.reconstructOriginalUrl(options);
				const parsedRedirectUrl = parseUrl(redirectUrl, options);
				if (HttpExecutor.isCrossOriginRedirect(originalUrl, parsedRedirectUrl)) {
					if (debug.enabled) debug(`Given the cross-origin redirect (from ${originalUrl.host} to ${parsedRedirectUrl.host}), the Authorization header will be stripped out.`);
					delete headers.authorization;
				}
			}
			return newOptions;
		}
		static reconstructOriginalUrl(options) {
			const protocol = options.protocol || "https:";
			if (!options.hostname) throw new Error("Missing hostname in request options");
			const hostname = options.hostname;
			const port = options.port ? `:${options.port}` : "";
			const path = options.path || "/";
			return new url_1$7.URL(`${protocol}//${hostname}${port}${path}`);
		}
		static isCrossOriginRedirect(originalUrl, redirectUrl) {
			if (originalUrl.hostname.toLowerCase() !== redirectUrl.hostname.toLowerCase()) return true;
			if (originalUrl.protocol === "http:" && ["80", ""].includes(originalUrl.port) && redirectUrl.protocol === "https:" && ["443", ""].includes(redirectUrl.port)) return false;
			if (originalUrl.protocol !== redirectUrl.protocol) return true;
			return originalUrl.port !== redirectUrl.port;
		}
		static retryOnServerError(task, maxRetries = 3) {
			for (let attemptNumber = 0;; attemptNumber++) try {
				return task();
			} catch (e) {
				if (attemptNumber < maxRetries && (e instanceof HttpError && e.isServerError() || e.code === "EPIPE")) continue;
				throw e;
			}
		}
	};
	function parseUrl(url, options) {
		try {
			return new url_1$7.URL(url);
		} catch {
			const hostname = options.hostname;
			const baseUrl = `${options.protocol || "https:"}//${hostname}${options.port ? `:${options.port}` : ""}`;
			return new url_1$7.URL(url, baseUrl);
		}
	}
	function configureRequestOptionsFromUrl(url, options) {
		const result = configureRequestOptions(options);
		configureRequestUrl(parseUrl(url, options), result);
		return result;
	}
	function configureRequestUrl(url, options) {
		options.protocol = url.protocol;
		options.hostname = url.hostname;
		if (url.port) options.port = url.port;
		else if (options.port) delete options.port;
		options.path = url.pathname + url.search;
	}
	var DigestTransform = class extends stream_1$2.Transform {
		get actual() {
			return this._actual;
		}
		constructor(expected, algorithm = "sha512", encoding = "base64") {
			super();
			this.expected = expected;
			this.algorithm = algorithm;
			this.encoding = encoding;
			this._actual = null;
			this.isValidateOnEnd = true;
			this.digester = (0, crypto_1$4.createHash)(algorithm);
		}
		_transform(chunk, encoding, callback) {
			this.digester.update(chunk);
			callback(null, chunk);
		}
		_flush(callback) {
			this._actual = this.digester.digest(this.encoding);
			if (this.isValidateOnEnd) try {
				this.validate();
			} catch (e) {
				callback(e);
				return;
			}
			callback(null);
		}
		validate() {
			if (this._actual == null) throw (0, error_1.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
			if (this._actual !== this.expected) throw (0, error_1.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
			return null;
		}
	};
	exports.DigestTransform = DigestTransform;
	function checkSha2(sha2Header, sha2, callback) {
		if (sha2Header != null && sha2 != null && sha2Header !== sha2) {
			callback(/* @__PURE__ */ new Error(`checksum mismatch: expected ${sha2} but got ${sha2Header} (X-Checksum-Sha2 header)`));
			return false;
		}
		return true;
	}
	function safeGetHeader(response, headerKey) {
		const value = response.headers[headerKey];
		if (value == null) return null;
		else if (Array.isArray(value)) return value.length === 0 ? null : value[value.length - 1];
		else return value;
	}
	function configurePipes(options, response) {
		if (!checkSha2(safeGetHeader(response, "X-Checksum-Sha2"), options.options.sha2, options.callback)) return;
		const streams = [];
		if (options.options.onProgress != null) {
			const contentLength = safeGetHeader(response, "content-length");
			if (contentLength != null) streams.push(new ProgressCallbackTransform_1.ProgressCallbackTransform(parseInt(contentLength, 10), options.options.cancellationToken, options.options.onProgress));
		}
		const sha512 = options.options.sha512;
		if (sha512 != null) streams.push(new DigestTransform(sha512, "sha512", sha512.length === 128 && !sha512.includes("+") && !sha512.includes("Z") && !sha512.includes("=") ? "hex" : "base64"));
		else if (options.options.sha2 != null) streams.push(new DigestTransform(options.options.sha2, "sha256", "hex"));
		const fileOut = (0, fs_1$5.createWriteStream)(options.destination);
		streams.push(fileOut);
		let lastStream = response;
		for (const stream of streams) {
			stream.on("error", (error) => {
				fileOut.close();
				if (!options.options.cancellationToken.cancelled) options.callback(error);
			});
			lastStream = lastStream.pipe(stream);
		}
		fileOut.on("finish", () => {
			fileOut.close(options.callback);
		});
	}
	function configureRequestOptions(options, token, method) {
		if (method != null) options.method = method;
		options.headers = { ...options.headers };
		const headers = options.headers;
		if (token != null) headers.authorization = token.startsWith("Basic") || token.startsWith("Bearer") ? token : `token ${token}`;
		if (headers["User-Agent"] == null) headers["User-Agent"] = "electron-builder";
		if (method == null || method === "GET" || headers["Cache-Control"] == null) headers["Cache-Control"] = "no-cache";
		if (options.protocol == null && process.versions.electron != null) options.protocol = "https:";
		return options;
	}
	function safeStringifyJson(data, skippedNames) {
		return JSON.stringify(data, (name, value) => {
			if (name.endsWith("Authorization") || name.endsWith("authorization") || name.endsWith("Password") || name.endsWith("PASSWORD") || name.endsWith("Token") || name.includes("password") || name.includes("token") || skippedNames != null && skippedNames.has(name)) return "<stripped sensitive data>";
			return value;
		}, 2);
	}
}));
//#endregion
//#region ../../node_modules/.bun/builder-util-runtime@9.5.1/node_modules/builder-util-runtime/out/MemoLazy.js
var require_MemoLazy = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MemoLazy = void 0;
	var MemoLazy = class {
		constructor(selector, creator) {
			this.selector = selector;
			this.creator = creator;
			this.selected = void 0;
			this._value = void 0;
		}
		get hasValue() {
			return this._value !== void 0;
		}
		get value() {
			const selected = this.selector();
			if (this._value !== void 0 && equals(this.selected, selected)) return this._value;
			this.selected = selected;
			const result = this.creator(selected);
			this.value = result;
			return result;
		}
		set value(value) {
			this._value = value;
		}
	};
	exports.MemoLazy = MemoLazy;
	function equals(firstValue, secondValue) {
		if (typeof firstValue === "object" && firstValue !== null && typeof secondValue === "object" && secondValue !== null) {
			const keys1 = Object.keys(firstValue);
			const keys2 = Object.keys(secondValue);
			return keys1.length === keys2.length && keys1.every((key) => equals(firstValue[key], secondValue[key]));
		}
		return firstValue === secondValue;
	}
}));
//#endregion
//#region ../../node_modules/.bun/builder-util-runtime@9.5.1/node_modules/builder-util-runtime/out/publishOptions.js
var require_publishOptions = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.githubUrl = githubUrl;
	exports.githubTagPrefix = githubTagPrefix;
	exports.getS3LikeProviderBaseUrl = getS3LikeProviderBaseUrl;
	/** @private */
	function githubUrl(options, defaultHost = "github.com") {
		return `${options.protocol || "https"}://${options.host || defaultHost}`;
	}
	function githubTagPrefix(options) {
		var _a;
		if (options.tagNamePrefix) return options.tagNamePrefix;
		if ((_a = options.vPrefixedTagName) !== null && _a !== void 0 ? _a : true) return "v";
		return "";
	}
	function getS3LikeProviderBaseUrl(configuration) {
		const provider = configuration.provider;
		if (provider === "s3") return s3Url(configuration);
		if (provider === "spaces") return spacesUrl(configuration);
		throw new Error(`Not supported provider: ${provider}`);
	}
	function s3Url(options) {
		let url;
		if (options.accelerate == true) url = `https://${options.bucket}.s3-accelerate.amazonaws.com`;
		else if (options.endpoint != null) url = `${options.endpoint}/${options.bucket}`;
		else if (options.bucket.includes(".")) {
			if (options.region == null) throw new Error(`Bucket name "${options.bucket}" includes a dot, but S3 region is missing`);
			if (options.region === "us-east-1") url = `https://s3.amazonaws.com/${options.bucket}`;
			else url = `https://s3-${options.region}.amazonaws.com/${options.bucket}`;
		} else if (options.region === "cn-north-1") url = `https://${options.bucket}.s3.${options.region}.amazonaws.com.cn`;
		else url = `https://${options.bucket}.s3.amazonaws.com`;
		return appendPath(url, options.path);
	}
	function appendPath(url, p) {
		if (p != null && p.length > 0) {
			if (!p.startsWith("/")) url += "/";
			url += p;
		}
		return url;
	}
	function spacesUrl(options) {
		if (options.name == null) throw new Error(`name is missing`);
		if (options.region == null) throw new Error(`region is missing`);
		return appendPath(`https://${options.name}.${options.region}.digitaloceanspaces.com`, options.path);
	}
}));
//#endregion
//#region ../../node_modules/.bun/builder-util-runtime@9.5.1/node_modules/builder-util-runtime/out/retry.js
var require_retry = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.retry = retry;
	var CancellationToken_1 = require_CancellationToken();
	async function retry(task, options) {
		var _a;
		const { retries: retryCount, interval, backoff = 0, attempt = 0, shouldRetry, cancellationToken = new CancellationToken_1.CancellationToken() } = options;
		try {
			return await task();
		} catch (error) {
			if (await Promise.resolve((_a = shouldRetry === null || shouldRetry === void 0 ? void 0 : shouldRetry(error)) !== null && _a !== void 0 ? _a : true) && retryCount > 0 && !cancellationToken.cancelled) {
				await new Promise((resolve) => setTimeout(resolve, interval + backoff * attempt));
				return await retry(task, {
					...options,
					retries: retryCount - 1,
					attempt: attempt + 1
				});
			} else throw error;
		}
	}
}));
//#endregion
//#region ../../node_modules/.bun/builder-util-runtime@9.5.1/node_modules/builder-util-runtime/out/rfc2253Parser.js
var require_rfc2253Parser = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseDn = parseDn;
	function parseDn(seq) {
		let quoted = false;
		let key = null;
		let token = "";
		let nextNonSpace = 0;
		seq = seq.trim();
		const result = /* @__PURE__ */ new Map();
		for (let i = 0; i <= seq.length; i++) {
			if (i === seq.length) {
				if (key !== null) result.set(key, token);
				break;
			}
			const ch = seq[i];
			if (quoted) {
				if (ch === "\"") {
					quoted = false;
					continue;
				}
			} else {
				if (ch === "\"") {
					quoted = true;
					continue;
				}
				if (ch === "\\") {
					i++;
					const ord = parseInt(seq.slice(i, i + 2), 16);
					if (Number.isNaN(ord)) token += seq[i];
					else {
						i++;
						token += String.fromCharCode(ord);
					}
					continue;
				}
				if (key === null && ch === "=") {
					key = token;
					token = "";
					continue;
				}
				if (ch === "," || ch === ";" || ch === "+") {
					if (key !== null) result.set(key, token);
					key = null;
					token = "";
					continue;
				}
			}
			if (ch === " " && !quoted) {
				if (token.length === 0) continue;
				if (i > nextNonSpace) {
					let j = i;
					while (seq[j] === " ") j++;
					nextNonSpace = j;
				}
				if (nextNonSpace >= seq.length || seq[nextNonSpace] === "," || seq[nextNonSpace] === ";" || key === null && seq[nextNonSpace] === "=" || key !== null && seq[nextNonSpace] === "+") {
					i = nextNonSpace - 1;
					continue;
				}
			}
			token += ch;
		}
		return result;
	}
}));
//#endregion
//#region ../../node_modules/.bun/builder-util-runtime@9.5.1/node_modules/builder-util-runtime/out/uuid.js
var require_uuid = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.nil = exports.UUID = void 0;
	var crypto_1$3 = __require("crypto");
	var error_1 = require_error();
	var invalidName = "options.name must be either a string or a Buffer";
	var randomHost = (0, crypto_1$3.randomBytes)(16);
	randomHost[0] = randomHost[0] | 1;
	var hex2byte = {};
	var byte2hex = [];
	for (let i = 0; i < 256; i++) {
		const hex = (i + 256).toString(16).substr(1);
		hex2byte[hex] = i;
		byte2hex[i] = hex;
	}
	var UUID = class UUID {
		constructor(uuid) {
			this.ascii = null;
			this.binary = null;
			const check = UUID.check(uuid);
			if (!check) throw new Error("not a UUID");
			this.version = check.version;
			if (check.format === "ascii") this.ascii = uuid;
			else this.binary = uuid;
		}
		static v5(name, namespace) {
			return uuidNamed(name, "sha1", 80, namespace);
		}
		toString() {
			if (this.ascii == null) this.ascii = stringify(this.binary);
			return this.ascii;
		}
		inspect() {
			return `UUID v${this.version} ${this.toString()}`;
		}
		static check(uuid, offset = 0) {
			if (typeof uuid === "string") {
				uuid = uuid.toLowerCase();
				if (!/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(uuid)) return false;
				if (uuid === "00000000-0000-0000-0000-000000000000") return {
					version: void 0,
					variant: "nil",
					format: "ascii"
				};
				return {
					version: (hex2byte[uuid[14] + uuid[15]] & 240) >> 4,
					variant: getVariant((hex2byte[uuid[19] + uuid[20]] & 224) >> 5),
					format: "ascii"
				};
			}
			if (Buffer.isBuffer(uuid)) {
				if (uuid.length < offset + 16) return false;
				let i = 0;
				for (; i < 16; i++) if (uuid[offset + i] !== 0) break;
				if (i === 16) return {
					version: void 0,
					variant: "nil",
					format: "binary"
				};
				return {
					version: (uuid[offset + 6] & 240) >> 4,
					variant: getVariant((uuid[offset + 8] & 224) >> 5),
					format: "binary"
				};
			}
			throw (0, error_1.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
		}
		static parse(input) {
			const buffer = Buffer.allocUnsafe(16);
			let j = 0;
			for (let i = 0; i < 16; i++) {
				buffer[i] = hex2byte[input[j++] + input[j++]];
				if (i === 3 || i === 5 || i === 7 || i === 9) j += 1;
			}
			return buffer;
		}
	};
	exports.UUID = UUID;
	UUID.OID = UUID.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
	function getVariant(bits) {
		switch (bits) {
			case 0:
			case 1:
			case 3: return "ncs";
			case 4:
			case 5: return "rfc4122";
			case 6: return "microsoft";
			default: return "future";
		}
	}
	var UuidEncoding;
	(function(UuidEncoding) {
		UuidEncoding[UuidEncoding["ASCII"] = 0] = "ASCII";
		UuidEncoding[UuidEncoding["BINARY"] = 1] = "BINARY";
		UuidEncoding[UuidEncoding["OBJECT"] = 2] = "OBJECT";
	})(UuidEncoding || (UuidEncoding = {}));
	function uuidNamed(name, hashMethod, version, namespace, encoding = UuidEncoding.ASCII) {
		const hash = (0, crypto_1$3.createHash)(hashMethod);
		if (typeof name !== "string" && !Buffer.isBuffer(name)) throw (0, error_1.newError)(invalidName, "ERR_INVALID_UUID_NAME");
		hash.update(namespace);
		hash.update(name);
		const buffer = hash.digest();
		let result;
		switch (encoding) {
			case UuidEncoding.BINARY:
				buffer[6] = buffer[6] & 15 | version;
				buffer[8] = buffer[8] & 63 | 128;
				result = buffer;
				break;
			case UuidEncoding.OBJECT:
				buffer[6] = buffer[6] & 15 | version;
				buffer[8] = buffer[8] & 63 | 128;
				result = new UUID(buffer);
				break;
			default:
				result = byte2hex[buffer[0]] + byte2hex[buffer[1]] + byte2hex[buffer[2]] + byte2hex[buffer[3]] + "-" + byte2hex[buffer[4]] + byte2hex[buffer[5]] + "-" + byte2hex[buffer[6] & 15 | version] + byte2hex[buffer[7]] + "-" + byte2hex[buffer[8] & 63 | 128] + byte2hex[buffer[9]] + "-" + byte2hex[buffer[10]] + byte2hex[buffer[11]] + byte2hex[buffer[12]] + byte2hex[buffer[13]] + byte2hex[buffer[14]] + byte2hex[buffer[15]];
				break;
		}
		return result;
	}
	function stringify(buffer) {
		return byte2hex[buffer[0]] + byte2hex[buffer[1]] + byte2hex[buffer[2]] + byte2hex[buffer[3]] + "-" + byte2hex[buffer[4]] + byte2hex[buffer[5]] + "-" + byte2hex[buffer[6]] + byte2hex[buffer[7]] + "-" + byte2hex[buffer[8]] + byte2hex[buffer[9]] + "-" + byte2hex[buffer[10]] + byte2hex[buffer[11]] + byte2hex[buffer[12]] + byte2hex[buffer[13]] + byte2hex[buffer[14]] + byte2hex[buffer[15]];
	}
	exports.nil = new UUID("00000000-0000-0000-0000-000000000000");
}));
//#endregion
//#region ../../node_modules/.bun/sax@1.6.0/node_modules/sax/lib/sax.js
var require_sax = /* @__PURE__ */ __commonJSMin(((exports) => {
	(function(sax) {
		sax.parser = function(strict, opt) {
			return new SAXParser(strict, opt);
		};
		sax.SAXParser = SAXParser;
		sax.SAXStream = SAXStream;
		sax.createStream = createStream;
		sax.MAX_BUFFER_LENGTH = 64 * 1024;
		var buffers = [
			"comment",
			"sgmlDecl",
			"textNode",
			"tagName",
			"doctype",
			"procInstName",
			"procInstBody",
			"entity",
			"attribName",
			"attribValue",
			"cdata",
			"script"
		];
		sax.EVENTS = [
			"text",
			"processinginstruction",
			"sgmldeclaration",
			"doctype",
			"comment",
			"opentagstart",
			"attribute",
			"opentag",
			"closetag",
			"opencdata",
			"cdata",
			"closecdata",
			"error",
			"end",
			"ready",
			"script",
			"opennamespace",
			"closenamespace"
		];
		function SAXParser(strict, opt) {
			if (!(this instanceof SAXParser)) return new SAXParser(strict, opt);
			var parser = this;
			clearBuffers(parser);
			parser.q = parser.c = "";
			parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
			parser.encoding = null;
			parser.opt = opt || {};
			parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
			parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase";
			parser.opt.maxEntityCount = parser.opt.maxEntityCount || 512;
			parser.opt.maxEntityDepth = parser.opt.maxEntityDepth || 4;
			parser.entityCount = parser.entityDepth = 0;
			parser.tags = [];
			parser.closed = parser.closedRoot = parser.sawRoot = false;
			parser.tag = parser.error = null;
			parser.strict = !!strict;
			parser.noscript = !!(strict || parser.opt.noscript);
			parser.state = S.BEGIN;
			parser.strictEntities = parser.opt.strictEntities;
			parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES);
			parser.attribList = [];
			if (parser.opt.xmlns) parser.ns = Object.create(rootNS);
			if (parser.opt.unquotedAttributeValues === void 0) parser.opt.unquotedAttributeValues = !strict;
			parser.trackPosition = parser.opt.position !== false;
			if (parser.trackPosition) parser.position = parser.line = parser.column = 0;
			emit(parser, "onready");
		}
		if (!Object.create) Object.create = function(o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
		if (!Object.keys) Object.keys = function(o) {
			var a = [];
			for (var i in o) if (o.hasOwnProperty(i)) a.push(i);
			return a;
		};
		function checkBufferLength(parser) {
			var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10);
			var maxActual = 0;
			for (var i = 0, l = buffers.length; i < l; i++) {
				var len = parser[buffers[i]].length;
				if (len > maxAllowed) switch (buffers[i]) {
					case "textNode":
						closeText(parser);
						break;
					case "cdata":
						emitNode(parser, "oncdata", parser.cdata);
						parser.cdata = "";
						break;
					case "script":
						emitNode(parser, "onscript", parser.script);
						parser.script = "";
						break;
					default: error(parser, "Max buffer length exceeded: " + buffers[i]);
				}
				maxActual = Math.max(maxActual, len);
			}
			parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH - maxActual + parser.position;
		}
		function clearBuffers(parser) {
			for (var i = 0, l = buffers.length; i < l; i++) parser[buffers[i]] = "";
		}
		function flushBuffers(parser) {
			closeText(parser);
			if (parser.cdata !== "") {
				emitNode(parser, "oncdata", parser.cdata);
				parser.cdata = "";
			}
			if (parser.script !== "") {
				emitNode(parser, "onscript", parser.script);
				parser.script = "";
			}
		}
		SAXParser.prototype = {
			end: function() {
				end(this);
			},
			write,
			resume: function() {
				this.error = null;
				return this;
			},
			close: function() {
				return this.write(null);
			},
			flush: function() {
				flushBuffers(this);
			}
		};
		var Stream;
		try {
			Stream = __require("stream").Stream;
		} catch (ex) {
			Stream = function() {};
		}
		if (!Stream) Stream = function() {};
		var streamWraps = sax.EVENTS.filter(function(ev) {
			return ev !== "error" && ev !== "end";
		});
		function createStream(strict, opt) {
			return new SAXStream(strict, opt);
		}
		function determineBufferEncoding(data, isEnd) {
			if (data.length >= 2) {
				if (data[0] === 255 && data[1] === 254) return "utf-16le";
				if (data[0] === 254 && data[1] === 255) return "utf-16be";
			}
			if (data.length >= 3 && data[0] === 239 && data[1] === 187 && data[2] === 191) return "utf8";
			if (data.length >= 4) {
				if (data[0] === 60 && data[1] === 0 && data[2] === 63 && data[3] === 0) return "utf-16le";
				if (data[0] === 0 && data[1] === 60 && data[2] === 0 && data[3] === 63) return "utf-16be";
				return "utf8";
			}
			return isEnd ? "utf8" : null;
		}
		function SAXStream(strict, opt) {
			if (!(this instanceof SAXStream)) return new SAXStream(strict, opt);
			Stream.apply(this);
			this._parser = new SAXParser(strict, opt);
			this.writable = true;
			this.readable = true;
			var me = this;
			this._parser.onend = function() {
				me.emit("end");
			};
			this._parser.onerror = function(er) {
				me.emit("error", er);
				me._parser.error = null;
			};
			this._decoder = null;
			this._decoderBuffer = null;
			streamWraps.forEach(function(ev) {
				Object.defineProperty(me, "on" + ev, {
					get: function() {
						return me._parser["on" + ev];
					},
					set: function(h) {
						if (!h) {
							me.removeAllListeners(ev);
							me._parser["on" + ev] = h;
							return h;
						}
						me.on(ev, h);
					},
					enumerable: true,
					configurable: false
				});
			});
		}
		SAXStream.prototype = Object.create(Stream.prototype, { constructor: { value: SAXStream } });
		SAXStream.prototype._decodeBuffer = function(data, isEnd) {
			if (this._decoderBuffer) {
				data = Buffer.concat([this._decoderBuffer, data]);
				this._decoderBuffer = null;
			}
			if (!this._decoder) {
				var encoding = determineBufferEncoding(data, isEnd);
				if (!encoding) {
					this._decoderBuffer = data;
					return "";
				}
				this._parser.encoding = encoding;
				this._decoder = new TextDecoder(encoding);
			}
			return this._decoder.decode(data, { stream: !isEnd });
		};
		SAXStream.prototype.write = function(data) {
			if (typeof Buffer === "function" && typeof Buffer.isBuffer === "function" && Buffer.isBuffer(data)) data = this._decodeBuffer(data, false);
			else if (this._decoderBuffer) {
				var remaining = this._decodeBuffer(Buffer.alloc(0), true);
				if (remaining) {
					this._parser.write(remaining);
					this.emit("data", remaining);
				}
			}
			this._parser.write(data.toString());
			this.emit("data", data);
			return true;
		};
		SAXStream.prototype.end = function(chunk) {
			if (chunk && chunk.length) this.write(chunk);
			if (this._decoderBuffer) {
				var finalChunk = this._decodeBuffer(Buffer.alloc(0), true);
				if (finalChunk) {
					this._parser.write(finalChunk);
					this.emit("data", finalChunk);
				}
			} else if (this._decoder) {
				var remaining = this._decoder.decode();
				if (remaining) {
					this._parser.write(remaining);
					this.emit("data", remaining);
				}
			}
			this._parser.end();
			return true;
		};
		SAXStream.prototype.on = function(ev, handler) {
			var me = this;
			if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) me._parser["on" + ev] = function() {
				var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
				args.splice(0, 0, ev);
				me.emit.apply(me, args);
			};
			return Stream.prototype.on.call(me, ev, handler);
		};
		var CDATA = "[CDATA[";
		var DOCTYPE = "DOCTYPE";
		var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
		var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
		var rootNS = {
			xml: XML_NAMESPACE,
			xmlns: XMLNS_NAMESPACE
		};
		var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
		var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
		var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
		var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
		function isWhitespace(c) {
			return c === " " || c === "\n" || c === "\r" || c === "	";
		}
		function isQuote(c) {
			return c === "\"" || c === "'";
		}
		function isAttribEnd(c) {
			return c === ">" || isWhitespace(c);
		}
		function isMatch(regex, c) {
			return regex.test(c);
		}
		function notMatch(regex, c) {
			return !isMatch(regex, c);
		}
		var S = 0;
		sax.STATE = {
			BEGIN: S++,
			BEGIN_WHITESPACE: S++,
			TEXT: S++,
			TEXT_ENTITY: S++,
			OPEN_WAKA: S++,
			SGML_DECL: S++,
			SGML_DECL_QUOTED: S++,
			DOCTYPE: S++,
			DOCTYPE_QUOTED: S++,
			DOCTYPE_DTD: S++,
			DOCTYPE_DTD_QUOTED: S++,
			COMMENT_STARTING: S++,
			COMMENT: S++,
			COMMENT_ENDING: S++,
			COMMENT_ENDED: S++,
			CDATA: S++,
			CDATA_ENDING: S++,
			CDATA_ENDING_2: S++,
			PROC_INST: S++,
			PROC_INST_BODY: S++,
			PROC_INST_ENDING: S++,
			OPEN_TAG: S++,
			OPEN_TAG_SLASH: S++,
			ATTRIB: S++,
			ATTRIB_NAME: S++,
			ATTRIB_NAME_SAW_WHITE: S++,
			ATTRIB_VALUE: S++,
			ATTRIB_VALUE_QUOTED: S++,
			ATTRIB_VALUE_CLOSED: S++,
			ATTRIB_VALUE_UNQUOTED: S++,
			ATTRIB_VALUE_ENTITY_Q: S++,
			ATTRIB_VALUE_ENTITY_U: S++,
			CLOSE_TAG: S++,
			CLOSE_TAG_SAW_WHITE: S++,
			SCRIPT: S++,
			SCRIPT_ENDING: S++
		};
		sax.XML_ENTITIES = {
			amp: "&",
			gt: ">",
			lt: "<",
			quot: "\"",
			apos: "'"
		};
		sax.ENTITIES = {
			amp: "&",
			gt: ">",
			lt: "<",
			quot: "\"",
			apos: "'",
			AElig: 198,
			Aacute: 193,
			Acirc: 194,
			Agrave: 192,
			Aring: 197,
			Atilde: 195,
			Auml: 196,
			Ccedil: 199,
			ETH: 208,
			Eacute: 201,
			Ecirc: 202,
			Egrave: 200,
			Euml: 203,
			Iacute: 205,
			Icirc: 206,
			Igrave: 204,
			Iuml: 207,
			Ntilde: 209,
			Oacute: 211,
			Ocirc: 212,
			Ograve: 210,
			Oslash: 216,
			Otilde: 213,
			Ouml: 214,
			THORN: 222,
			Uacute: 218,
			Ucirc: 219,
			Ugrave: 217,
			Uuml: 220,
			Yacute: 221,
			aacute: 225,
			acirc: 226,
			aelig: 230,
			agrave: 224,
			aring: 229,
			atilde: 227,
			auml: 228,
			ccedil: 231,
			eacute: 233,
			ecirc: 234,
			egrave: 232,
			eth: 240,
			euml: 235,
			iacute: 237,
			icirc: 238,
			igrave: 236,
			iuml: 239,
			ntilde: 241,
			oacute: 243,
			ocirc: 244,
			ograve: 242,
			oslash: 248,
			otilde: 245,
			ouml: 246,
			szlig: 223,
			thorn: 254,
			uacute: 250,
			ucirc: 251,
			ugrave: 249,
			uuml: 252,
			yacute: 253,
			yuml: 255,
			copy: 169,
			reg: 174,
			nbsp: 160,
			iexcl: 161,
			cent: 162,
			pound: 163,
			curren: 164,
			yen: 165,
			brvbar: 166,
			sect: 167,
			uml: 168,
			ordf: 170,
			laquo: 171,
			not: 172,
			shy: 173,
			macr: 175,
			deg: 176,
			plusmn: 177,
			sup1: 185,
			sup2: 178,
			sup3: 179,
			acute: 180,
			micro: 181,
			para: 182,
			middot: 183,
			cedil: 184,
			ordm: 186,
			raquo: 187,
			frac14: 188,
			frac12: 189,
			frac34: 190,
			iquest: 191,
			times: 215,
			divide: 247,
			OElig: 338,
			oelig: 339,
			Scaron: 352,
			scaron: 353,
			Yuml: 376,
			fnof: 402,
			circ: 710,
			tilde: 732,
			Alpha: 913,
			Beta: 914,
			Gamma: 915,
			Delta: 916,
			Epsilon: 917,
			Zeta: 918,
			Eta: 919,
			Theta: 920,
			Iota: 921,
			Kappa: 922,
			Lambda: 923,
			Mu: 924,
			Nu: 925,
			Xi: 926,
			Omicron: 927,
			Pi: 928,
			Rho: 929,
			Sigma: 931,
			Tau: 932,
			Upsilon: 933,
			Phi: 934,
			Chi: 935,
			Psi: 936,
			Omega: 937,
			alpha: 945,
			beta: 946,
			gamma: 947,
			delta: 948,
			epsilon: 949,
			zeta: 950,
			eta: 951,
			theta: 952,
			iota: 953,
			kappa: 954,
			lambda: 955,
			mu: 956,
			nu: 957,
			xi: 958,
			omicron: 959,
			pi: 960,
			rho: 961,
			sigmaf: 962,
			sigma: 963,
			tau: 964,
			upsilon: 965,
			phi: 966,
			chi: 967,
			psi: 968,
			omega: 969,
			thetasym: 977,
			upsih: 978,
			piv: 982,
			ensp: 8194,
			emsp: 8195,
			thinsp: 8201,
			zwnj: 8204,
			zwj: 8205,
			lrm: 8206,
			rlm: 8207,
			ndash: 8211,
			mdash: 8212,
			lsquo: 8216,
			rsquo: 8217,
			sbquo: 8218,
			ldquo: 8220,
			rdquo: 8221,
			bdquo: 8222,
			dagger: 8224,
			Dagger: 8225,
			bull: 8226,
			hellip: 8230,
			permil: 8240,
			prime: 8242,
			Prime: 8243,
			lsaquo: 8249,
			rsaquo: 8250,
			oline: 8254,
			frasl: 8260,
			euro: 8364,
			image: 8465,
			weierp: 8472,
			real: 8476,
			trade: 8482,
			alefsym: 8501,
			larr: 8592,
			uarr: 8593,
			rarr: 8594,
			darr: 8595,
			harr: 8596,
			crarr: 8629,
			lArr: 8656,
			uArr: 8657,
			rArr: 8658,
			dArr: 8659,
			hArr: 8660,
			forall: 8704,
			part: 8706,
			exist: 8707,
			empty: 8709,
			nabla: 8711,
			isin: 8712,
			notin: 8713,
			ni: 8715,
			prod: 8719,
			sum: 8721,
			minus: 8722,
			lowast: 8727,
			radic: 8730,
			prop: 8733,
			infin: 8734,
			ang: 8736,
			and: 8743,
			or: 8744,
			cap: 8745,
			cup: 8746,
			int: 8747,
			there4: 8756,
			sim: 8764,
			cong: 8773,
			asymp: 8776,
			ne: 8800,
			equiv: 8801,
			le: 8804,
			ge: 8805,
			sub: 8834,
			sup: 8835,
			nsub: 8836,
			sube: 8838,
			supe: 8839,
			oplus: 8853,
			otimes: 8855,
			perp: 8869,
			sdot: 8901,
			lceil: 8968,
			rceil: 8969,
			lfloor: 8970,
			rfloor: 8971,
			lang: 9001,
			rang: 9002,
			loz: 9674,
			spades: 9824,
			clubs: 9827,
			hearts: 9829,
			diams: 9830
		};
		Object.keys(sax.ENTITIES).forEach(function(key) {
			var e = sax.ENTITIES[key];
			var s = typeof e === "number" ? String.fromCharCode(e) : e;
			sax.ENTITIES[key] = s;
		});
		for (var s in sax.STATE) sax.STATE[sax.STATE[s]] = s;
		S = sax.STATE;
		function emit(parser, event, data) {
			parser[event] && parser[event](data);
		}
		function getDeclaredEncoding(body) {
			var match = body && body.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
			return match ? match[2] : null;
		}
		function normalizeEncodingName(encoding) {
			if (!encoding) return null;
			return encoding.toLowerCase().replace(/[^a-z0-9]/g, "");
		}
		function encodingsMatch(detectedEncoding, declaredEncoding) {
			const detected = normalizeEncodingName(detectedEncoding);
			const declared = normalizeEncodingName(declaredEncoding);
			if (!detected || !declared) return true;
			if (declared === "utf16") return detected === "utf16le" || detected === "utf16be";
			return detected === declared;
		}
		function validateXmlDeclarationEncoding(parser, data) {
			if (!parser.strict || !parser.encoding || !data || data.name !== "xml") return;
			var declaredEncoding = getDeclaredEncoding(data.body);
			if (declaredEncoding && !encodingsMatch(parser.encoding, declaredEncoding)) strictFail(parser, "XML declaration encoding " + declaredEncoding + " does not match detected stream encoding " + parser.encoding.toUpperCase());
		}
		function emitNode(parser, nodeType, data) {
			if (parser.textNode) closeText(parser);
			emit(parser, nodeType, data);
		}
		function closeText(parser) {
			parser.textNode = textopts(parser.opt, parser.textNode);
			if (parser.textNode) emit(parser, "ontext", parser.textNode);
			parser.textNode = "";
		}
		function textopts(opt, text) {
			if (opt.trim) text = text.trim();
			if (opt.normalize) text = text.replace(/\s+/g, " ");
			return text;
		}
		function error(parser, er) {
			closeText(parser);
			if (parser.trackPosition) er += "\nLine: " + parser.line + "\nColumn: " + parser.column + "\nChar: " + parser.c;
			er = new Error(er);
			parser.error = er;
			emit(parser, "onerror", er);
			return parser;
		}
		function end(parser) {
			if (parser.sawRoot && !parser.closedRoot) strictFail(parser, "Unclosed root tag");
			if (parser.state !== S.BEGIN && parser.state !== S.BEGIN_WHITESPACE && parser.state !== S.TEXT) error(parser, "Unexpected end");
			closeText(parser);
			parser.c = "";
			parser.closed = true;
			emit(parser, "onend");
			SAXParser.call(parser, parser.strict, parser.opt);
			return parser;
		}
		function strictFail(parser, message) {
			if (typeof parser !== "object" || !(parser instanceof SAXParser)) throw new Error("bad call to strictFail");
			if (parser.strict) error(parser, message);
		}
		function newTag(parser) {
			if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
			var parent = parser.tags[parser.tags.length - 1] || parser;
			var tag = parser.tag = {
				name: parser.tagName,
				attributes: {}
			};
			if (parser.opt.xmlns) tag.ns = parent.ns;
			parser.attribList.length = 0;
			emitNode(parser, "onopentagstart", tag);
		}
		function qname(name, attribute) {
			var qualName = name.indexOf(":") < 0 ? ["", name] : name.split(":");
			var prefix = qualName[0];
			var local = qualName[1];
			if (attribute && name === "xmlns") {
				prefix = "xmlns";
				local = "";
			}
			return {
				prefix,
				local
			};
		}
		function attrib(parser) {
			if (!parser.strict) parser.attribName = parser.attribName[parser.looseCase]();
			if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) {
				parser.attribName = parser.attribValue = "";
				return;
			}
			if (parser.opt.xmlns) {
				var qn = qname(parser.attribName, true);
				var prefix = qn.prefix;
				var local = qn.local;
				if (prefix === "xmlns") if (local === "xml" && parser.attribValue !== XML_NAMESPACE) strictFail(parser, "xml: prefix must be bound to " + XML_NAMESPACE + "\nActual: " + parser.attribValue);
				else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) strictFail(parser, "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\nActual: " + parser.attribValue);
				else {
					var tag = parser.tag;
					var parent = parser.tags[parser.tags.length - 1] || parser;
					if (tag.ns === parent.ns) tag.ns = Object.create(parent.ns);
					tag.ns[local] = parser.attribValue;
				}
				parser.attribList.push([parser.attribName, parser.attribValue]);
			} else {
				parser.tag.attributes[parser.attribName] = parser.attribValue;
				emitNode(parser, "onattribute", {
					name: parser.attribName,
					value: parser.attribValue
				});
			}
			parser.attribName = parser.attribValue = "";
		}
		function openTag(parser, selfClosing) {
			if (parser.opt.xmlns) {
				var tag = parser.tag;
				var qn = qname(parser.tagName);
				tag.prefix = qn.prefix;
				tag.local = qn.local;
				tag.uri = tag.ns[qn.prefix] || "";
				if (tag.prefix && !tag.uri) {
					strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(parser.tagName));
					tag.uri = qn.prefix;
				}
				var parent = parser.tags[parser.tags.length - 1] || parser;
				if (tag.ns && parent.ns !== tag.ns) Object.keys(tag.ns).forEach(function(p) {
					emitNode(parser, "onopennamespace", {
						prefix: p,
						uri: tag.ns[p]
					});
				});
				for (var i = 0, l = parser.attribList.length; i < l; i++) {
					var nv = parser.attribList[i];
					var name = nv[0];
					var value = nv[1];
					var qualName = qname(name, true);
					var prefix = qualName.prefix;
					var local = qualName.local;
					var uri = prefix === "" ? "" : tag.ns[prefix] || "";
					var a = {
						name,
						value,
						prefix,
						local,
						uri
					};
					if (prefix && prefix !== "xmlns" && !uri) {
						strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(prefix));
						a.uri = prefix;
					}
					parser.tag.attributes[name] = a;
					emitNode(parser, "onattribute", a);
				}
				parser.attribList.length = 0;
			}
			parser.tag.isSelfClosing = !!selfClosing;
			parser.sawRoot = true;
			parser.tags.push(parser.tag);
			emitNode(parser, "onopentag", parser.tag);
			if (!selfClosing) {
				if (!parser.noscript && parser.tagName.toLowerCase() === "script") parser.state = S.SCRIPT;
				else parser.state = S.TEXT;
				parser.tag = null;
				parser.tagName = "";
			}
			parser.attribName = parser.attribValue = "";
			parser.attribList.length = 0;
		}
		function closeTag(parser) {
			if (!parser.tagName) {
				strictFail(parser, "Weird empty close tag.");
				parser.textNode += "</>";
				parser.state = S.TEXT;
				return;
			}
			if (parser.script) {
				if (parser.tagName !== "script") {
					parser.script += "</" + parser.tagName + ">";
					parser.tagName = "";
					parser.state = S.SCRIPT;
					return;
				}
				emitNode(parser, "onscript", parser.script);
				parser.script = "";
			}
			var t = parser.tags.length;
			var tagName = parser.tagName;
			if (!parser.strict) tagName = tagName[parser.looseCase]();
			var closeTo = tagName;
			while (t--) if (parser.tags[t].name !== closeTo) strictFail(parser, "Unexpected close tag");
			else break;
			if (t < 0) {
				strictFail(parser, "Unmatched closing tag: " + parser.tagName);
				parser.textNode += "</" + parser.tagName + ">";
				parser.state = S.TEXT;
				return;
			}
			parser.tagName = tagName;
			var s = parser.tags.length;
			while (s-- > t) {
				var tag = parser.tag = parser.tags.pop();
				parser.tagName = parser.tag.name;
				emitNode(parser, "onclosetag", parser.tagName);
				var x = {};
				for (var i in tag.ns) x[i] = tag.ns[i];
				var parent = parser.tags[parser.tags.length - 1] || parser;
				if (parser.opt.xmlns && tag.ns !== parent.ns) Object.keys(tag.ns).forEach(function(p) {
					var n = tag.ns[p];
					emitNode(parser, "onclosenamespace", {
						prefix: p,
						uri: n
					});
				});
			}
			if (t === 0) parser.closedRoot = true;
			parser.tagName = parser.attribValue = parser.attribName = "";
			parser.attribList.length = 0;
			parser.state = S.TEXT;
		}
		function parseEntity(parser) {
			var entity = parser.entity;
			var entityLC = entity.toLowerCase();
			var num;
			var numStr = "";
			if (parser.ENTITIES[entity]) return parser.ENTITIES[entity];
			if (parser.ENTITIES[entityLC]) return parser.ENTITIES[entityLC];
			entity = entityLC;
			if (entity.charAt(0) === "#") if (entity.charAt(1) === "x") {
				entity = entity.slice(2);
				num = parseInt(entity, 16);
				numStr = num.toString(16);
			} else {
				entity = entity.slice(1);
				num = parseInt(entity, 10);
				numStr = num.toString(10);
			}
			entity = entity.replace(/^0+/, "");
			if (isNaN(num) || numStr.toLowerCase() !== entity || num < 0 || num > 1114111) {
				strictFail(parser, "Invalid character entity");
				return "&" + parser.entity + ";";
			}
			return String.fromCodePoint(num);
		}
		function beginWhiteSpace(parser, c) {
			if (c === "<") {
				parser.state = S.OPEN_WAKA;
				parser.startTagPosition = parser.position;
			} else if (!isWhitespace(c)) {
				strictFail(parser, "Non-whitespace before first tag.");
				parser.textNode = c;
				parser.state = S.TEXT;
			}
		}
		function charAt(chunk, i) {
			var result = "";
			if (i < chunk.length) result = chunk.charAt(i);
			return result;
		}
		function write(chunk) {
			var parser = this;
			if (this.error) throw this.error;
			if (parser.closed) return error(parser, "Cannot write after close. Assign an onready handler.");
			if (chunk === null) return end(parser);
			if (typeof chunk === "object") chunk = chunk.toString();
			var i = 0;
			var c = "";
			while (true) {
				c = charAt(chunk, i++);
				parser.c = c;
				if (!c) break;
				if (parser.trackPosition) {
					parser.position++;
					if (c === "\n") {
						parser.line++;
						parser.column = 0;
					} else parser.column++;
				}
				switch (parser.state) {
					case S.BEGIN:
						parser.state = S.BEGIN_WHITESPACE;
						if (c === "﻿") continue;
						beginWhiteSpace(parser, c);
						continue;
					case S.BEGIN_WHITESPACE:
						beginWhiteSpace(parser, c);
						continue;
					case S.TEXT:
						if (parser.sawRoot && !parser.closedRoot) {
							var starti = i - 1;
							while (c && c !== "<" && c !== "&") {
								c = charAt(chunk, i++);
								if (c && parser.trackPosition) {
									parser.position++;
									if (c === "\n") {
										parser.line++;
										parser.column = 0;
									} else parser.column++;
								}
							}
							parser.textNode += chunk.substring(starti, i - 1);
						}
						if (c === "<" && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
							parser.state = S.OPEN_WAKA;
							parser.startTagPosition = parser.position;
						} else {
							if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) strictFail(parser, "Text data outside of root node.");
							if (c === "&") parser.state = S.TEXT_ENTITY;
							else parser.textNode += c;
						}
						continue;
					case S.SCRIPT:
						if (c === "<") parser.state = S.SCRIPT_ENDING;
						else parser.script += c;
						continue;
					case S.SCRIPT_ENDING:
						if (c === "/") parser.state = S.CLOSE_TAG;
						else {
							parser.script += "<" + c;
							parser.state = S.SCRIPT;
						}
						continue;
					case S.OPEN_WAKA:
						if (c === "!") {
							parser.state = S.SGML_DECL;
							parser.sgmlDecl = "";
						} else if (isWhitespace(c)) {} else if (isMatch(nameStart, c)) {
							parser.state = S.OPEN_TAG;
							parser.tagName = c;
						} else if (c === "/") {
							parser.state = S.CLOSE_TAG;
							parser.tagName = "";
						} else if (c === "?") {
							parser.state = S.PROC_INST;
							parser.procInstName = parser.procInstBody = "";
						} else {
							strictFail(parser, "Unencoded <");
							if (parser.startTagPosition + 1 < parser.position) {
								var pad = parser.position - parser.startTagPosition;
								c = new Array(pad).join(" ") + c;
							}
							parser.textNode += "<" + c;
							parser.state = S.TEXT;
						}
						continue;
					case S.SGML_DECL:
						if (parser.sgmlDecl + c === "--") {
							parser.state = S.COMMENT;
							parser.comment = "";
							parser.sgmlDecl = "";
							continue;
						}
						if (parser.doctype && parser.doctype !== true && parser.sgmlDecl) {
							parser.state = S.DOCTYPE_DTD;
							parser.doctype += "<!" + parser.sgmlDecl + c;
							parser.sgmlDecl = "";
						} else if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
							emitNode(parser, "onopencdata");
							parser.state = S.CDATA;
							parser.sgmlDecl = "";
							parser.cdata = "";
						} else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
							parser.state = S.DOCTYPE;
							if (parser.doctype || parser.sawRoot) strictFail(parser, "Inappropriately located doctype declaration");
							parser.doctype = "";
							parser.sgmlDecl = "";
						} else if (c === ">") {
							emitNode(parser, "onsgmldeclaration", parser.sgmlDecl);
							parser.sgmlDecl = "";
							parser.state = S.TEXT;
						} else if (isQuote(c)) {
							parser.state = S.SGML_DECL_QUOTED;
							parser.sgmlDecl += c;
						} else parser.sgmlDecl += c;
						continue;
					case S.SGML_DECL_QUOTED:
						if (c === parser.q) {
							parser.state = S.SGML_DECL;
							parser.q = "";
						}
						parser.sgmlDecl += c;
						continue;
					case S.DOCTYPE:
						if (c === ">") {
							parser.state = S.TEXT;
							emitNode(parser, "ondoctype", parser.doctype);
							parser.doctype = true;
						} else {
							parser.doctype += c;
							if (c === "[") parser.state = S.DOCTYPE_DTD;
							else if (isQuote(c)) {
								parser.state = S.DOCTYPE_QUOTED;
								parser.q = c;
							}
						}
						continue;
					case S.DOCTYPE_QUOTED:
						parser.doctype += c;
						if (c === parser.q) {
							parser.q = "";
							parser.state = S.DOCTYPE;
						}
						continue;
					case S.DOCTYPE_DTD:
						if (c === "]") {
							parser.doctype += c;
							parser.state = S.DOCTYPE;
						} else if (c === "<") {
							parser.state = S.OPEN_WAKA;
							parser.startTagPosition = parser.position;
						} else if (isQuote(c)) {
							parser.doctype += c;
							parser.state = S.DOCTYPE_DTD_QUOTED;
							parser.q = c;
						} else parser.doctype += c;
						continue;
					case S.DOCTYPE_DTD_QUOTED:
						parser.doctype += c;
						if (c === parser.q) {
							parser.state = S.DOCTYPE_DTD;
							parser.q = "";
						}
						continue;
					case S.COMMENT:
						if (c === "-") parser.state = S.COMMENT_ENDING;
						else parser.comment += c;
						continue;
					case S.COMMENT_ENDING:
						if (c === "-") {
							parser.state = S.COMMENT_ENDED;
							parser.comment = textopts(parser.opt, parser.comment);
							if (parser.comment) emitNode(parser, "oncomment", parser.comment);
							parser.comment = "";
						} else {
							parser.comment += "-" + c;
							parser.state = S.COMMENT;
						}
						continue;
					case S.COMMENT_ENDED:
						if (c !== ">") {
							strictFail(parser, "Malformed comment");
							parser.comment += "--" + c;
							parser.state = S.COMMENT;
						} else if (parser.doctype && parser.doctype !== true) parser.state = S.DOCTYPE_DTD;
						else parser.state = S.TEXT;
						continue;
					case S.CDATA:
						var starti = i - 1;
						while (c && c !== "]") {
							c = charAt(chunk, i++);
							if (c && parser.trackPosition) {
								parser.position++;
								if (c === "\n") {
									parser.line++;
									parser.column = 0;
								} else parser.column++;
							}
						}
						parser.cdata += chunk.substring(starti, i - 1);
						if (c === "]") parser.state = S.CDATA_ENDING;
						continue;
					case S.CDATA_ENDING:
						if (c === "]") parser.state = S.CDATA_ENDING_2;
						else {
							parser.cdata += "]" + c;
							parser.state = S.CDATA;
						}
						continue;
					case S.CDATA_ENDING_2:
						if (c === ">") {
							if (parser.cdata) emitNode(parser, "oncdata", parser.cdata);
							emitNode(parser, "onclosecdata");
							parser.cdata = "";
							parser.state = S.TEXT;
						} else if (c === "]") parser.cdata += "]";
						else {
							parser.cdata += "]]" + c;
							parser.state = S.CDATA;
						}
						continue;
					case S.PROC_INST:
						if (c === "?") parser.state = S.PROC_INST_ENDING;
						else if (isWhitespace(c)) parser.state = S.PROC_INST_BODY;
						else parser.procInstName += c;
						continue;
					case S.PROC_INST_BODY:
						if (!parser.procInstBody && isWhitespace(c)) continue;
						else if (c === "?") parser.state = S.PROC_INST_ENDING;
						else parser.procInstBody += c;
						continue;
					case S.PROC_INST_ENDING:
						if (c === ">") {
							const procInstEndData = {
								name: parser.procInstName,
								body: parser.procInstBody
							};
							validateXmlDeclarationEncoding(parser, procInstEndData);
							emitNode(parser, "onprocessinginstruction", procInstEndData);
							parser.procInstName = parser.procInstBody = "";
							parser.state = S.TEXT;
						} else {
							parser.procInstBody += "?" + c;
							parser.state = S.PROC_INST_BODY;
						}
						continue;
					case S.OPEN_TAG:
						if (isMatch(nameBody, c)) parser.tagName += c;
						else {
							newTag(parser);
							if (c === ">") openTag(parser);
							else if (c === "/") parser.state = S.OPEN_TAG_SLASH;
							else {
								if (!isWhitespace(c)) strictFail(parser, "Invalid character in tag name");
								parser.state = S.ATTRIB;
							}
						}
						continue;
					case S.OPEN_TAG_SLASH:
						if (c === ">") {
							openTag(parser, true);
							closeTag(parser);
						} else {
							strictFail(parser, "Forward-slash in opening tag not followed by >");
							parser.state = S.ATTRIB;
						}
						continue;
					case S.ATTRIB:
						if (isWhitespace(c)) continue;
						else if (c === ">") openTag(parser);
						else if (c === "/") parser.state = S.OPEN_TAG_SLASH;
						else if (isMatch(nameStart, c)) {
							parser.attribName = c;
							parser.attribValue = "";
							parser.state = S.ATTRIB_NAME;
						} else strictFail(parser, "Invalid attribute name");
						continue;
					case S.ATTRIB_NAME:
						if (c === "=") parser.state = S.ATTRIB_VALUE;
						else if (c === ">") {
							strictFail(parser, "Attribute without value");
							parser.attribValue = parser.attribName;
							attrib(parser);
							openTag(parser);
						} else if (isWhitespace(c)) parser.state = S.ATTRIB_NAME_SAW_WHITE;
						else if (isMatch(nameBody, c)) parser.attribName += c;
						else strictFail(parser, "Invalid attribute name");
						continue;
					case S.ATTRIB_NAME_SAW_WHITE:
						if (c === "=") parser.state = S.ATTRIB_VALUE;
						else if (isWhitespace(c)) continue;
						else {
							strictFail(parser, "Attribute without value");
							parser.tag.attributes[parser.attribName] = "";
							parser.attribValue = "";
							emitNode(parser, "onattribute", {
								name: parser.attribName,
								value: ""
							});
							parser.attribName = "";
							if (c === ">") openTag(parser);
							else if (isMatch(nameStart, c)) {
								parser.attribName = c;
								parser.state = S.ATTRIB_NAME;
							} else {
								strictFail(parser, "Invalid attribute name");
								parser.state = S.ATTRIB;
							}
						}
						continue;
					case S.ATTRIB_VALUE:
						if (isWhitespace(c)) continue;
						else if (isQuote(c)) {
							parser.q = c;
							parser.state = S.ATTRIB_VALUE_QUOTED;
						} else {
							if (!parser.opt.unquotedAttributeValues) error(parser, "Unquoted attribute value");
							parser.state = S.ATTRIB_VALUE_UNQUOTED;
							parser.attribValue = c;
						}
						continue;
					case S.ATTRIB_VALUE_QUOTED:
						if (c !== parser.q) {
							if (c === "&") parser.state = S.ATTRIB_VALUE_ENTITY_Q;
							else parser.attribValue += c;
							continue;
						}
						attrib(parser);
						parser.q = "";
						parser.state = S.ATTRIB_VALUE_CLOSED;
						continue;
					case S.ATTRIB_VALUE_CLOSED:
						if (isWhitespace(c)) parser.state = S.ATTRIB;
						else if (c === ">") openTag(parser);
						else if (c === "/") parser.state = S.OPEN_TAG_SLASH;
						else if (isMatch(nameStart, c)) {
							strictFail(parser, "No whitespace between attributes");
							parser.attribName = c;
							parser.attribValue = "";
							parser.state = S.ATTRIB_NAME;
						} else strictFail(parser, "Invalid attribute name");
						continue;
					case S.ATTRIB_VALUE_UNQUOTED:
						if (!isAttribEnd(c)) {
							if (c === "&") parser.state = S.ATTRIB_VALUE_ENTITY_U;
							else parser.attribValue += c;
							continue;
						}
						attrib(parser);
						if (c === ">") openTag(parser);
						else parser.state = S.ATTRIB;
						continue;
					case S.CLOSE_TAG:
						if (!parser.tagName) if (isWhitespace(c)) continue;
						else if (notMatch(nameStart, c)) if (parser.script) {
							parser.script += "</" + c;
							parser.state = S.SCRIPT;
						} else strictFail(parser, "Invalid tagname in closing tag.");
						else parser.tagName = c;
						else if (c === ">") closeTag(parser);
						else if (isMatch(nameBody, c)) parser.tagName += c;
						else if (parser.script) {
							parser.script += "</" + parser.tagName + c;
							parser.tagName = "";
							parser.state = S.SCRIPT;
						} else {
							if (!isWhitespace(c)) strictFail(parser, "Invalid tagname in closing tag");
							parser.state = S.CLOSE_TAG_SAW_WHITE;
						}
						continue;
					case S.CLOSE_TAG_SAW_WHITE:
						if (isWhitespace(c)) continue;
						if (c === ">") closeTag(parser);
						else strictFail(parser, "Invalid characters in closing tag");
						continue;
					case S.TEXT_ENTITY:
					case S.ATTRIB_VALUE_ENTITY_Q:
					case S.ATTRIB_VALUE_ENTITY_U:
						var returnState;
						var buffer;
						switch (parser.state) {
							case S.TEXT_ENTITY:
								returnState = S.TEXT;
								buffer = "textNode";
								break;
							case S.ATTRIB_VALUE_ENTITY_Q:
								returnState = S.ATTRIB_VALUE_QUOTED;
								buffer = "attribValue";
								break;
							case S.ATTRIB_VALUE_ENTITY_U:
								returnState = S.ATTRIB_VALUE_UNQUOTED;
								buffer = "attribValue";
								break;
						}
						if (c === ";") {
							var parsedEntity = parseEntity(parser);
							if (parser.opt.unparsedEntities && !Object.values(sax.XML_ENTITIES).includes(parsedEntity)) {
								if ((parser.entityCount += 1) > parser.opt.maxEntityCount) error(parser, "Parsed entity count exceeds max entity count");
								if ((parser.entityDepth += 1) > parser.opt.maxEntityDepth) error(parser, "Parsed entity depth exceeds max entity depth");
								parser.entity = "";
								parser.state = returnState;
								parser.write(parsedEntity);
								parser.entityDepth -= 1;
							} else {
								parser[buffer] += parsedEntity;
								parser.entity = "";
								parser.state = returnState;
							}
						} else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) parser.entity += c;
						else {
							strictFail(parser, "Invalid character in entity name");
							parser[buffer] += "&" + parser.entity + c;
							parser.entity = "";
							parser.state = returnState;
						}
						continue;
					default: throw new Error(parser, "Unknown state: " + parser.state);
				}
			}
			if (parser.position >= parser.bufferCheckPosition) checkBufferLength(parser);
			return parser;
		}
		/*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
		/* istanbul ignore next */
		if (!String.fromCodePoint) (function() {
			var stringFromCharCode = String.fromCharCode;
			var floor = Math.floor;
			var fromCodePoint = function() {
				var MAX_SIZE = 16384;
				var codeUnits = [];
				var highSurrogate;
				var lowSurrogate;
				var index = -1;
				var length = arguments.length;
				if (!length) return "";
				var result = "";
				while (++index < length) {
					var codePoint = Number(arguments[index]);
					if (!isFinite(codePoint) || codePoint < 0 || codePoint > 1114111 || floor(codePoint) !== codePoint) throw RangeError("Invalid code point: " + codePoint);
					if (codePoint <= 65535) codeUnits.push(codePoint);
					else {
						codePoint -= 65536;
						highSurrogate = (codePoint >> 10) + 55296;
						lowSurrogate = codePoint % 1024 + 56320;
						codeUnits.push(highSurrogate, lowSurrogate);
					}
					if (index + 1 === length || codeUnits.length > MAX_SIZE) {
						result += stringFromCharCode.apply(null, codeUnits);
						codeUnits.length = 0;
					}
				}
				return result;
			};
			/* istanbul ignore next */
			if (Object.defineProperty) Object.defineProperty(String, "fromCodePoint", {
				value: fromCodePoint,
				configurable: true,
				writable: true
			});
			else String.fromCodePoint = fromCodePoint;
		})();
	})(typeof exports === "undefined" ? exports.sax = {} : exports);
}));
//#endregion
//#region ../../node_modules/.bun/builder-util-runtime@9.5.1/node_modules/builder-util-runtime/out/xml.js
var require_xml = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.XElement = void 0;
	exports.parseXml = parseXml;
	var sax = require_sax();
	var error_1 = require_error();
	var XElement = class {
		constructor(name) {
			this.name = name;
			this.value = "";
			this.attributes = null;
			this.isCData = false;
			this.elements = null;
			if (!name) throw (0, error_1.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
			if (!isValidName(name)) throw (0, error_1.newError)(`Invalid element name: ${name}`, "ERR_XML_ELEMENT_INVALID_NAME");
		}
		attribute(name) {
			const result = this.attributes === null ? null : this.attributes[name];
			if (result == null) throw (0, error_1.newError)(`No attribute "${name}"`, "ERR_XML_MISSED_ATTRIBUTE");
			return result;
		}
		removeAttribute(name) {
			if (this.attributes !== null) delete this.attributes[name];
		}
		element(name, ignoreCase = false, errorIfMissed = null) {
			const result = this.elementOrNull(name, ignoreCase);
			if (result === null) throw (0, error_1.newError)(errorIfMissed || `No element "${name}"`, "ERR_XML_MISSED_ELEMENT");
			return result;
		}
		elementOrNull(name, ignoreCase = false) {
			if (this.elements === null) return null;
			for (const element of this.elements) if (isNameEquals(element, name, ignoreCase)) return element;
			return null;
		}
		getElements(name, ignoreCase = false) {
			if (this.elements === null) return [];
			return this.elements.filter((it) => isNameEquals(it, name, ignoreCase));
		}
		elementValueOrEmpty(name, ignoreCase = false) {
			const element = this.elementOrNull(name, ignoreCase);
			return element === null ? "" : element.value;
		}
	};
	exports.XElement = XElement;
	var NAME_REG_EXP = /* @__PURE__ */ new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
	function isValidName(name) {
		return NAME_REG_EXP.test(name);
	}
	function isNameEquals(element, name, ignoreCase) {
		const elementName = element.name;
		return elementName === name || ignoreCase === true && elementName.length === name.length && elementName.toLowerCase() === name.toLowerCase();
	}
	function parseXml(data) {
		let rootElement = null;
		const parser = sax.parser(true, {});
		const elements = [];
		parser.onopentag = (saxElement) => {
			const element = new XElement(saxElement.name);
			element.attributes = saxElement.attributes;
			if (rootElement === null) rootElement = element;
			else {
				const parent = elements[elements.length - 1];
				if (parent.elements == null) parent.elements = [];
				parent.elements.push(element);
			}
			elements.push(element);
		};
		parser.onclosetag = () => {
			elements.pop();
		};
		parser.ontext = (text) => {
			if (elements.length > 0) elements[elements.length - 1].value = text;
		};
		parser.oncdata = (cdata) => {
			const element = elements[elements.length - 1];
			element.value = cdata;
			element.isCData = true;
		};
		parser.onerror = (err) => {
			throw err;
		};
		parser.write(data);
		return rootElement;
	}
}));
//#endregion
//#region ../../node_modules/.bun/builder-util-runtime@9.5.1/node_modules/builder-util-runtime/out/index.js
var require_out = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CURRENT_APP_PACKAGE_FILE_NAME = exports.CURRENT_APP_INSTALLER_FILE_NAME = exports.XElement = exports.parseXml = exports.UUID = exports.parseDn = exports.retry = exports.githubTagPrefix = exports.githubUrl = exports.getS3LikeProviderBaseUrl = exports.ProgressCallbackTransform = exports.MemoLazy = exports.safeStringifyJson = exports.safeGetHeader = exports.parseJson = exports.HttpExecutor = exports.HttpError = exports.DigestTransform = exports.createHttpError = exports.configureRequestUrl = exports.configureRequestOptionsFromUrl = exports.configureRequestOptions = exports.newError = exports.CancellationToken = exports.CancellationError = void 0;
	exports.asArray = asArray;
	var CancellationToken_1 = require_CancellationToken();
	Object.defineProperty(exports, "CancellationError", {
		enumerable: true,
		get: function() {
			return CancellationToken_1.CancellationError;
		}
	});
	Object.defineProperty(exports, "CancellationToken", {
		enumerable: true,
		get: function() {
			return CancellationToken_1.CancellationToken;
		}
	});
	var error_1 = require_error();
	Object.defineProperty(exports, "newError", {
		enumerable: true,
		get: function() {
			return error_1.newError;
		}
	});
	var httpExecutor_1 = require_httpExecutor();
	Object.defineProperty(exports, "configureRequestOptions", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.configureRequestOptions;
		}
	});
	Object.defineProperty(exports, "configureRequestOptionsFromUrl", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.configureRequestOptionsFromUrl;
		}
	});
	Object.defineProperty(exports, "configureRequestUrl", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.configureRequestUrl;
		}
	});
	Object.defineProperty(exports, "createHttpError", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.createHttpError;
		}
	});
	Object.defineProperty(exports, "DigestTransform", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.DigestTransform;
		}
	});
	Object.defineProperty(exports, "HttpError", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.HttpError;
		}
	});
	Object.defineProperty(exports, "HttpExecutor", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.HttpExecutor;
		}
	});
	Object.defineProperty(exports, "parseJson", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.parseJson;
		}
	});
	Object.defineProperty(exports, "safeGetHeader", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.safeGetHeader;
		}
	});
	Object.defineProperty(exports, "safeStringifyJson", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.safeStringifyJson;
		}
	});
	var MemoLazy_1 = require_MemoLazy();
	Object.defineProperty(exports, "MemoLazy", {
		enumerable: true,
		get: function() {
			return MemoLazy_1.MemoLazy;
		}
	});
	var ProgressCallbackTransform_1 = require_ProgressCallbackTransform();
	Object.defineProperty(exports, "ProgressCallbackTransform", {
		enumerable: true,
		get: function() {
			return ProgressCallbackTransform_1.ProgressCallbackTransform;
		}
	});
	var publishOptions_1 = require_publishOptions();
	Object.defineProperty(exports, "getS3LikeProviderBaseUrl", {
		enumerable: true,
		get: function() {
			return publishOptions_1.getS3LikeProviderBaseUrl;
		}
	});
	Object.defineProperty(exports, "githubUrl", {
		enumerable: true,
		get: function() {
			return publishOptions_1.githubUrl;
		}
	});
	Object.defineProperty(exports, "githubTagPrefix", {
		enumerable: true,
		get: function() {
			return publishOptions_1.githubTagPrefix;
		}
	});
	var retry_1 = require_retry();
	Object.defineProperty(exports, "retry", {
		enumerable: true,
		get: function() {
			return retry_1.retry;
		}
	});
	var rfc2253Parser_1 = require_rfc2253Parser();
	Object.defineProperty(exports, "parseDn", {
		enumerable: true,
		get: function() {
			return rfc2253Parser_1.parseDn;
		}
	});
	var uuid_1 = require_uuid();
	Object.defineProperty(exports, "UUID", {
		enumerable: true,
		get: function() {
			return uuid_1.UUID;
		}
	});
	var xml_1 = require_xml();
	Object.defineProperty(exports, "parseXml", {
		enumerable: true,
		get: function() {
			return xml_1.parseXml;
		}
	});
	Object.defineProperty(exports, "XElement", {
		enumerable: true,
		get: function() {
			return xml_1.XElement;
		}
	});
	exports.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe";
	exports.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
	function asArray(v) {
		if (v == null) return [];
		else if (Array.isArray(v)) return v;
		else return [v];
	}
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/common.js
var require_common = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function isNothing(subject) {
		return typeof subject === "undefined" || subject === null;
	}
	function isObject(subject) {
		return typeof subject === "object" && subject !== null;
	}
	function toArray(sequence) {
		if (Array.isArray(sequence)) return sequence;
		else if (isNothing(sequence)) return [];
		return [sequence];
	}
	function extend(target, source) {
		var index, length, key, sourceKeys;
		if (source) {
			sourceKeys = Object.keys(source);
			for (index = 0, length = sourceKeys.length; index < length; index += 1) {
				key = sourceKeys[index];
				target[key] = source[key];
			}
		}
		return target;
	}
	function repeat(string, count) {
		var result = "", cycle;
		for (cycle = 0; cycle < count; cycle += 1) result += string;
		return result;
	}
	function isNegativeZero(number) {
		return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
	}
	module.exports.isNothing = isNothing;
	module.exports.isObject = isObject;
	module.exports.toArray = toArray;
	module.exports.repeat = repeat;
	module.exports.isNegativeZero = isNegativeZero;
	module.exports.extend = extend;
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/exception.js
var require_exception = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function formatError(exception, compact) {
		var where = "", message = exception.reason || "(unknown reason)";
		if (!exception.mark) return message;
		if (exception.mark.name) where += "in \"" + exception.mark.name + "\" ";
		where += "(" + (exception.mark.line + 1) + ":" + (exception.mark.column + 1) + ")";
		if (!compact && exception.mark.snippet) where += "\n\n" + exception.mark.snippet;
		return message + " " + where;
	}
	function YAMLException(reason, mark) {
		Error.call(this);
		this.name = "YAMLException";
		this.reason = reason;
		this.mark = mark;
		this.message = formatError(this, false);
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
		else this.stack = (/* @__PURE__ */ new Error()).stack || "";
	}
	YAMLException.prototype = Object.create(Error.prototype);
	YAMLException.prototype.constructor = YAMLException;
	YAMLException.prototype.toString = function toString(compact) {
		return this.name + ": " + formatError(this, compact);
	};
	module.exports = YAMLException;
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/snippet.js
var require_snippet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var common = require_common();
	function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
		var head = "";
		var tail = "";
		var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
		if (position - lineStart > maxHalfLength) {
			head = " ... ";
			lineStart = position - maxHalfLength + head.length;
		}
		if (lineEnd - position > maxHalfLength) {
			tail = " ...";
			lineEnd = position + maxHalfLength - tail.length;
		}
		return {
			str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "→") + tail,
			pos: position - lineStart + head.length
		};
	}
	function padStart(string, max) {
		return common.repeat(" ", max - string.length) + string;
	}
	function makeSnippet(mark, options) {
		options = Object.create(options || null);
		if (!mark.buffer) return null;
		if (!options.maxLength) options.maxLength = 79;
		if (typeof options.indent !== "number") options.indent = 1;
		if (typeof options.linesBefore !== "number") options.linesBefore = 3;
		if (typeof options.linesAfter !== "number") options.linesAfter = 2;
		var re = /\r?\n|\r|\0/g;
		var lineStarts = [0];
		var lineEnds = [];
		var match;
		var foundLineNo = -1;
		while (match = re.exec(mark.buffer)) {
			lineEnds.push(match.index);
			lineStarts.push(match.index + match[0].length);
			if (mark.position <= match.index && foundLineNo < 0) foundLineNo = lineStarts.length - 2;
		}
		if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
		var result = "", i, line;
		var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
		var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
		for (i = 1; i <= options.linesBefore; i++) {
			if (foundLineNo - i < 0) break;
			line = getLine(mark.buffer, lineStarts[foundLineNo - i], lineEnds[foundLineNo - i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]), maxLineLength);
			result = common.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
		}
		line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
		result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
		result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
		for (i = 1; i <= options.linesAfter; i++) {
			if (foundLineNo + i >= lineEnds.length) break;
			line = getLine(mark.buffer, lineStarts[foundLineNo + i], lineEnds[foundLineNo + i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]), maxLineLength);
			result += common.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
		}
		return result.replace(/\n$/, "");
	}
	module.exports = makeSnippet;
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/type.js
var require_type = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var YAMLException = require_exception();
	var TYPE_CONSTRUCTOR_OPTIONS = [
		"kind",
		"multi",
		"resolve",
		"construct",
		"instanceOf",
		"predicate",
		"represent",
		"representName",
		"defaultStyle",
		"styleAliases"
	];
	var YAML_NODE_KINDS = [
		"scalar",
		"sequence",
		"mapping"
	];
	function compileStyleAliases(map) {
		var result = {};
		if (map !== null) Object.keys(map).forEach(function(style) {
			map[style].forEach(function(alias) {
				result[String(alias)] = style;
			});
		});
		return result;
	}
	function Type(tag, options) {
		options = options || {};
		Object.keys(options).forEach(function(name) {
			if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) throw new YAMLException("Unknown option \"" + name + "\" is met in definition of \"" + tag + "\" YAML type.");
		});
		this.options = options;
		this.tag = tag;
		this.kind = options["kind"] || null;
		this.resolve = options["resolve"] || function() {
			return true;
		};
		this.construct = options["construct"] || function(data) {
			return data;
		};
		this.instanceOf = options["instanceOf"] || null;
		this.predicate = options["predicate"] || null;
		this.represent = options["represent"] || null;
		this.representName = options["representName"] || null;
		this.defaultStyle = options["defaultStyle"] || null;
		this.multi = options["multi"] || false;
		this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
		if (YAML_NODE_KINDS.indexOf(this.kind) === -1) throw new YAMLException("Unknown kind \"" + this.kind + "\" is specified for \"" + tag + "\" YAML type.");
	}
	module.exports = Type;
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/schema.js
var require_schema = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var YAMLException = require_exception();
	var Type = require_type();
	function compileList(schema, name) {
		var result = [];
		schema[name].forEach(function(currentType) {
			var newIndex = result.length;
			result.forEach(function(previousType, previousIndex) {
				if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) newIndex = previousIndex;
			});
			result[newIndex] = currentType;
		});
		return result;
	}
	function compileMap() {
		var result = {
			scalar: {},
			sequence: {},
			mapping: {},
			fallback: {},
			multi: {
				scalar: [],
				sequence: [],
				mapping: [],
				fallback: []
			}
		}, index, length;
		function collectType(type) {
			if (type.multi) {
				result.multi[type.kind].push(type);
				result.multi["fallback"].push(type);
			} else result[type.kind][type.tag] = result["fallback"][type.tag] = type;
		}
		for (index = 0, length = arguments.length; index < length; index += 1) arguments[index].forEach(collectType);
		return result;
	}
	function Schema(definition) {
		return this.extend(definition);
	}
	Schema.prototype.extend = function extend(definition) {
		var implicit = [];
		var explicit = [];
		if (definition instanceof Type) explicit.push(definition);
		else if (Array.isArray(definition)) explicit = explicit.concat(definition);
		else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
			if (definition.implicit) implicit = implicit.concat(definition.implicit);
			if (definition.explicit) explicit = explicit.concat(definition.explicit);
		} else throw new YAMLException("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
		implicit.forEach(function(type) {
			if (!(type instanceof Type)) throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
			if (type.loadKind && type.loadKind !== "scalar") throw new YAMLException("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
			if (type.multi) throw new YAMLException("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
		});
		explicit.forEach(function(type) {
			if (!(type instanceof Type)) throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
		});
		var result = Object.create(Schema.prototype);
		result.implicit = (this.implicit || []).concat(implicit);
		result.explicit = (this.explicit || []).concat(explicit);
		result.compiledImplicit = compileList(result, "implicit");
		result.compiledExplicit = compileList(result, "explicit");
		result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
		return result;
	};
	module.exports = Schema;
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/type/str.js
var require_str = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = new (require_type())("tag:yaml.org,2002:str", {
		kind: "scalar",
		construct: function(data) {
			return data !== null ? data : "";
		}
	});
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/type/seq.js
var require_seq = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = new (require_type())("tag:yaml.org,2002:seq", {
		kind: "sequence",
		construct: function(data) {
			return data !== null ? data : [];
		}
	});
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/type/map.js
var require_map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = new (require_type())("tag:yaml.org,2002:map", {
		kind: "mapping",
		construct: function(data) {
			return data !== null ? data : {};
		}
	});
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/schema/failsafe.js
var require_failsafe = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = new (require_schema())({ explicit: [
		require_str(),
		require_seq(),
		require_map()
	] });
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/type/null.js
var require_null = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type = require_type();
	function resolveYamlNull(data) {
		if (data === null) return true;
		var max = data.length;
		return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
	}
	function constructYamlNull() {
		return null;
	}
	function isNull(object) {
		return object === null;
	}
	module.exports = new Type("tag:yaml.org,2002:null", {
		kind: "scalar",
		resolve: resolveYamlNull,
		construct: constructYamlNull,
		predicate: isNull,
		represent: {
			canonical: function() {
				return "~";
			},
			lowercase: function() {
				return "null";
			},
			uppercase: function() {
				return "NULL";
			},
			camelcase: function() {
				return "Null";
			},
			empty: function() {
				return "";
			}
		},
		defaultStyle: "lowercase"
	});
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/type/bool.js
var require_bool = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type = require_type();
	function resolveYamlBoolean(data) {
		if (data === null) return false;
		var max = data.length;
		return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
	}
	function constructYamlBoolean(data) {
		return data === "true" || data === "True" || data === "TRUE";
	}
	function isBoolean(object) {
		return Object.prototype.toString.call(object) === "[object Boolean]";
	}
	module.exports = new Type("tag:yaml.org,2002:bool", {
		kind: "scalar",
		resolve: resolveYamlBoolean,
		construct: constructYamlBoolean,
		predicate: isBoolean,
		represent: {
			lowercase: function(object) {
				return object ? "true" : "false";
			},
			uppercase: function(object) {
				return object ? "TRUE" : "FALSE";
			},
			camelcase: function(object) {
				return object ? "True" : "False";
			}
		},
		defaultStyle: "lowercase"
	});
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/type/int.js
var require_int = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var common = require_common();
	var Type = require_type();
	function isHexCode(c) {
		return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
	}
	function isOctCode(c) {
		return 48 <= c && c <= 55;
	}
	function isDecCode(c) {
		return 48 <= c && c <= 57;
	}
	function resolveYamlInteger(data) {
		if (data === null) return false;
		var max = data.length, index = 0, hasDigits = false, ch;
		if (!max) return false;
		ch = data[index];
		if (ch === "-" || ch === "+") ch = data[++index];
		if (ch === "0") {
			if (index + 1 === max) return true;
			ch = data[++index];
			if (ch === "b") {
				index++;
				for (; index < max; index++) {
					ch = data[index];
					if (ch === "_") continue;
					if (ch !== "0" && ch !== "1") return false;
					hasDigits = true;
				}
				return hasDigits && ch !== "_";
			}
			if (ch === "x") {
				index++;
				for (; index < max; index++) {
					ch = data[index];
					if (ch === "_") continue;
					if (!isHexCode(data.charCodeAt(index))) return false;
					hasDigits = true;
				}
				return hasDigits && ch !== "_";
			}
			if (ch === "o") {
				index++;
				for (; index < max; index++) {
					ch = data[index];
					if (ch === "_") continue;
					if (!isOctCode(data.charCodeAt(index))) return false;
					hasDigits = true;
				}
				return hasDigits && ch !== "_";
			}
		}
		if (ch === "_") return false;
		for (; index < max; index++) {
			ch = data[index];
			if (ch === "_") continue;
			if (!isDecCode(data.charCodeAt(index))) return false;
			hasDigits = true;
		}
		if (!hasDigits || ch === "_") return false;
		return true;
	}
	function constructYamlInteger(data) {
		var value = data, sign = 1, ch;
		if (value.indexOf("_") !== -1) value = value.replace(/_/g, "");
		ch = value[0];
		if (ch === "-" || ch === "+") {
			if (ch === "-") sign = -1;
			value = value.slice(1);
			ch = value[0];
		}
		if (value === "0") return 0;
		if (ch === "0") {
			if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
			if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
			if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
		}
		return sign * parseInt(value, 10);
	}
	function isInteger(object) {
		return Object.prototype.toString.call(object) === "[object Number]" && object % 1 === 0 && !common.isNegativeZero(object);
	}
	module.exports = new Type("tag:yaml.org,2002:int", {
		kind: "scalar",
		resolve: resolveYamlInteger,
		construct: constructYamlInteger,
		predicate: isInteger,
		represent: {
			binary: function(obj) {
				return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
			},
			octal: function(obj) {
				return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
			},
			decimal: function(obj) {
				return obj.toString(10);
			},
			hexadecimal: function(obj) {
				return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
			}
		},
		defaultStyle: "decimal",
		styleAliases: {
			binary: [2, "bin"],
			octal: [8, "oct"],
			decimal: [10, "dec"],
			hexadecimal: [16, "hex"]
		}
	});
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/type/float.js
var require_float = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var common = require_common();
	var Type = require_type();
	var YAML_FLOAT_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
	function resolveYamlFloat(data) {
		if (data === null) return false;
		if (!YAML_FLOAT_PATTERN.test(data) || data[data.length - 1] === "_") return false;
		return true;
	}
	function constructYamlFloat(data) {
		var value = data.replace(/_/g, "").toLowerCase(), sign = value[0] === "-" ? -1 : 1;
		if ("+-".indexOf(value[0]) >= 0) value = value.slice(1);
		if (value === ".inf") return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
		else if (value === ".nan") return NaN;
		return sign * parseFloat(value, 10);
	}
	var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
	function representYamlFloat(object, style) {
		var res;
		if (isNaN(object)) switch (style) {
			case "lowercase": return ".nan";
			case "uppercase": return ".NAN";
			case "camelcase": return ".NaN";
		}
		else if (Number.POSITIVE_INFINITY === object) switch (style) {
			case "lowercase": return ".inf";
			case "uppercase": return ".INF";
			case "camelcase": return ".Inf";
		}
		else if (Number.NEGATIVE_INFINITY === object) switch (style) {
			case "lowercase": return "-.inf";
			case "uppercase": return "-.INF";
			case "camelcase": return "-.Inf";
		}
		else if (common.isNegativeZero(object)) return "-0.0";
		res = object.toString(10);
		return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
	}
	function isFloat(object) {
		return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
	}
	module.exports = new Type("tag:yaml.org,2002:float", {
		kind: "scalar",
		resolve: resolveYamlFloat,
		construct: constructYamlFloat,
		predicate: isFloat,
		represent: representYamlFloat,
		defaultStyle: "lowercase"
	});
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/schema/json.js
var require_json = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_failsafe().extend({ implicit: [
		require_null(),
		require_bool(),
		require_int(),
		require_float()
	] });
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/schema/core.js
var require_core = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_json();
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/type/timestamp.js
var require_timestamp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type = require_type();
	var YAML_DATE_REGEXP = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$");
	var YAML_TIMESTAMP_REGEXP = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
	function resolveYamlTimestamp(data) {
		if (data === null) return false;
		if (YAML_DATE_REGEXP.exec(data) !== null) return true;
		if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
		return false;
	}
	function constructYamlTimestamp(data) {
		var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
		match = YAML_DATE_REGEXP.exec(data);
		if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
		if (match === null) throw new Error("Date resolve error");
		year = +match[1];
		month = +match[2] - 1;
		day = +match[3];
		if (!match[4]) return new Date(Date.UTC(year, month, day));
		hour = +match[4];
		minute = +match[5];
		second = +match[6];
		if (match[7]) {
			fraction = match[7].slice(0, 3);
			while (fraction.length < 3) fraction += "0";
			fraction = +fraction;
		}
		if (match[9]) {
			tz_hour = +match[10];
			tz_minute = +(match[11] || 0);
			delta = (tz_hour * 60 + tz_minute) * 6e4;
			if (match[9] === "-") delta = -delta;
		}
		date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
		if (delta) date.setTime(date.getTime() - delta);
		return date;
	}
	function representYamlTimestamp(object) {
		return object.toISOString();
	}
	module.exports = new Type("tag:yaml.org,2002:timestamp", {
		kind: "scalar",
		resolve: resolveYamlTimestamp,
		construct: constructYamlTimestamp,
		instanceOf: Date,
		represent: representYamlTimestamp
	});
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/type/merge.js
var require_merge = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type = require_type();
	function resolveYamlMerge(data) {
		return data === "<<" || data === null;
	}
	module.exports = new Type("tag:yaml.org,2002:merge", {
		kind: "scalar",
		resolve: resolveYamlMerge
	});
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/type/binary.js
var require_binary = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type = require_type();
	var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
	function resolveYamlBinary(data) {
		if (data === null) return false;
		var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
		for (idx = 0; idx < max; idx++) {
			code = map.indexOf(data.charAt(idx));
			if (code > 64) continue;
			if (code < 0) return false;
			bitlen += 6;
		}
		return bitlen % 8 === 0;
	}
	function constructYamlBinary(data) {
		var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map = BASE64_MAP, bits = 0, result = [];
		for (idx = 0; idx < max; idx++) {
			if (idx % 4 === 0 && idx) {
				result.push(bits >> 16 & 255);
				result.push(bits >> 8 & 255);
				result.push(bits & 255);
			}
			bits = bits << 6 | map.indexOf(input.charAt(idx));
		}
		tailbits = max % 4 * 6;
		if (tailbits === 0) {
			result.push(bits >> 16 & 255);
			result.push(bits >> 8 & 255);
			result.push(bits & 255);
		} else if (tailbits === 18) {
			result.push(bits >> 10 & 255);
			result.push(bits >> 2 & 255);
		} else if (tailbits === 12) result.push(bits >> 4 & 255);
		return new Uint8Array(result);
	}
	function representYamlBinary(object) {
		var result = "", bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
		for (idx = 0; idx < max; idx++) {
			if (idx % 3 === 0 && idx) {
				result += map[bits >> 18 & 63];
				result += map[bits >> 12 & 63];
				result += map[bits >> 6 & 63];
				result += map[bits & 63];
			}
			bits = (bits << 8) + object[idx];
		}
		tail = max % 3;
		if (tail === 0) {
			result += map[bits >> 18 & 63];
			result += map[bits >> 12 & 63];
			result += map[bits >> 6 & 63];
			result += map[bits & 63];
		} else if (tail === 2) {
			result += map[bits >> 10 & 63];
			result += map[bits >> 4 & 63];
			result += map[bits << 2 & 63];
			result += map[64];
		} else if (tail === 1) {
			result += map[bits >> 2 & 63];
			result += map[bits << 4 & 63];
			result += map[64];
			result += map[64];
		}
		return result;
	}
	function isBinary(obj) {
		return Object.prototype.toString.call(obj) === "[object Uint8Array]";
	}
	module.exports = new Type("tag:yaml.org,2002:binary", {
		kind: "scalar",
		resolve: resolveYamlBinary,
		construct: constructYamlBinary,
		predicate: isBinary,
		represent: representYamlBinary
	});
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/type/omap.js
var require_omap = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type = require_type();
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	var _toString = Object.prototype.toString;
	function resolveYamlOmap(data) {
		if (data === null) return true;
		var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
		for (index = 0, length = object.length; index < length; index += 1) {
			pair = object[index];
			pairHasKey = false;
			if (_toString.call(pair) !== "[object Object]") return false;
			for (pairKey in pair) if (_hasOwnProperty.call(pair, pairKey)) if (!pairHasKey) pairHasKey = true;
			else return false;
			if (!pairHasKey) return false;
			if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
			else return false;
		}
		return true;
	}
	function constructYamlOmap(data) {
		return data !== null ? data : [];
	}
	module.exports = new Type("tag:yaml.org,2002:omap", {
		kind: "sequence",
		resolve: resolveYamlOmap,
		construct: constructYamlOmap
	});
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/type/pairs.js
var require_pairs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type = require_type();
	var _toString = Object.prototype.toString;
	function resolveYamlPairs(data) {
		if (data === null) return true;
		var index, length, pair, keys, result, object = data;
		result = new Array(object.length);
		for (index = 0, length = object.length; index < length; index += 1) {
			pair = object[index];
			if (_toString.call(pair) !== "[object Object]") return false;
			keys = Object.keys(pair);
			if (keys.length !== 1) return false;
			result[index] = [keys[0], pair[keys[0]]];
		}
		return true;
	}
	function constructYamlPairs(data) {
		if (data === null) return [];
		var index, length, pair, keys, result, object = data;
		result = new Array(object.length);
		for (index = 0, length = object.length; index < length; index += 1) {
			pair = object[index];
			keys = Object.keys(pair);
			result[index] = [keys[0], pair[keys[0]]];
		}
		return result;
	}
	module.exports = new Type("tag:yaml.org,2002:pairs", {
		kind: "sequence",
		resolve: resolveYamlPairs,
		construct: constructYamlPairs
	});
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/type/set.js
var require_set = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type = require_type();
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	function resolveYamlSet(data) {
		if (data === null) return true;
		var key, object = data;
		for (key in object) if (_hasOwnProperty.call(object, key)) {
			if (object[key] !== null) return false;
		}
		return true;
	}
	function constructYamlSet(data) {
		return data !== null ? data : {};
	}
	module.exports = new Type("tag:yaml.org,2002:set", {
		kind: "mapping",
		resolve: resolveYamlSet,
		construct: constructYamlSet
	});
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/schema/default.js
var require_default = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_core().extend({
		implicit: [require_timestamp(), require_merge()],
		explicit: [
			require_binary(),
			require_omap(),
			require_pairs(),
			require_set()
		]
	});
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/loader.js
var require_loader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var common = require_common();
	var YAMLException = require_exception();
	var makeSnippet = require_snippet();
	var DEFAULT_SCHEMA = require_default();
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	var CONTEXT_FLOW_IN = 1;
	var CONTEXT_FLOW_OUT = 2;
	var CONTEXT_BLOCK_IN = 3;
	var CONTEXT_BLOCK_OUT = 4;
	var CHOMPING_CLIP = 1;
	var CHOMPING_STRIP = 2;
	var CHOMPING_KEEP = 3;
	var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
	var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
	var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
	var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
	function _class(obj) {
		return Object.prototype.toString.call(obj);
	}
	function is_EOL(c) {
		return c === 10 || c === 13;
	}
	function is_WHITE_SPACE(c) {
		return c === 9 || c === 32;
	}
	function is_WS_OR_EOL(c) {
		return c === 9 || c === 32 || c === 10 || c === 13;
	}
	function is_FLOW_INDICATOR(c) {
		return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
	}
	function fromHexCode(c) {
		var lc;
		if (48 <= c && c <= 57) return c - 48;
		lc = c | 32;
		if (97 <= lc && lc <= 102) return lc - 97 + 10;
		return -1;
	}
	function escapedHexLen(c) {
		if (c === 120) return 2;
		if (c === 117) return 4;
		if (c === 85) return 8;
		return 0;
	}
	function fromDecimalCode(c) {
		if (48 <= c && c <= 57) return c - 48;
		return -1;
	}
	function simpleEscapeSequence(c) {
		return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? "\"" : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
	}
	function charFromCodepoint(c) {
		if (c <= 65535) return String.fromCharCode(c);
		return String.fromCharCode((c - 65536 >> 10) + 55296, (c - 65536 & 1023) + 56320);
	}
	function setProperty(object, key, value) {
		if (key === "__proto__") Object.defineProperty(object, key, {
			configurable: true,
			enumerable: true,
			writable: true,
			value
		});
		else object[key] = value;
	}
	var simpleEscapeCheck = new Array(256);
	var simpleEscapeMap = new Array(256);
	for (var i = 0; i < 256; i++) {
		simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
		simpleEscapeMap[i] = simpleEscapeSequence(i);
	}
	function State(input, options) {
		this.input = input;
		this.filename = options["filename"] || null;
		this.schema = options["schema"] || DEFAULT_SCHEMA;
		this.onWarning = options["onWarning"] || null;
		this.legacy = options["legacy"] || false;
		this.json = options["json"] || false;
		this.listener = options["listener"] || null;
		this.implicitTypes = this.schema.compiledImplicit;
		this.typeMap = this.schema.compiledTypeMap;
		this.length = input.length;
		this.position = 0;
		this.line = 0;
		this.lineStart = 0;
		this.lineIndent = 0;
		this.firstTabInLine = -1;
		this.documents = [];
	}
	function generateError(state, message) {
		var mark = {
			name: state.filename,
			buffer: state.input.slice(0, -1),
			position: state.position,
			line: state.line,
			column: state.position - state.lineStart
		};
		mark.snippet = makeSnippet(mark);
		return new YAMLException(message, mark);
	}
	function throwError(state, message) {
		throw generateError(state, message);
	}
	function throwWarning(state, message) {
		if (state.onWarning) state.onWarning.call(null, generateError(state, message));
	}
	var directiveHandlers = {
		YAML: function handleYamlDirective(state, name, args) {
			var match, major, minor;
			if (state.version !== null) throwError(state, "duplication of %YAML directive");
			if (args.length !== 1) throwError(state, "YAML directive accepts exactly one argument");
			match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
			if (match === null) throwError(state, "ill-formed argument of the YAML directive");
			major = parseInt(match[1], 10);
			minor = parseInt(match[2], 10);
			if (major !== 1) throwError(state, "unacceptable YAML version of the document");
			state.version = args[0];
			state.checkLineBreaks = minor < 2;
			if (minor !== 1 && minor !== 2) throwWarning(state, "unsupported YAML version of the document");
		},
		TAG: function handleTagDirective(state, name, args) {
			var handle, prefix;
			if (args.length !== 2) throwError(state, "TAG directive accepts exactly two arguments");
			handle = args[0];
			prefix = args[1];
			if (!PATTERN_TAG_HANDLE.test(handle)) throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
			if (_hasOwnProperty.call(state.tagMap, handle)) throwError(state, "there is a previously declared suffix for \"" + handle + "\" tag handle");
			if (!PATTERN_TAG_URI.test(prefix)) throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
			try {
				prefix = decodeURIComponent(prefix);
			} catch (err) {
				throwError(state, "tag prefix is malformed: " + prefix);
			}
			state.tagMap[handle] = prefix;
		}
	};
	function captureSegment(state, start, end, checkJson) {
		var _position, _length, _character, _result;
		if (start < end) {
			_result = state.input.slice(start, end);
			if (checkJson) for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
				_character = _result.charCodeAt(_position);
				if (!(_character === 9 || 32 <= _character && _character <= 1114111)) throwError(state, "expected valid JSON character");
			}
			else if (PATTERN_NON_PRINTABLE.test(_result)) throwError(state, "the stream contains non-printable characters");
			state.result += _result;
		}
	}
	function mergeMappings(state, destination, source, overridableKeys) {
		var sourceKeys, key, index, quantity;
		if (!common.isObject(source)) throwError(state, "cannot merge mappings; the provided source object is unacceptable");
		sourceKeys = Object.keys(source);
		for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
			key = sourceKeys[index];
			if (!_hasOwnProperty.call(destination, key)) {
				setProperty(destination, key, source[key]);
				overridableKeys[key] = true;
			}
		}
	}
	function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
		var index, quantity;
		if (Array.isArray(keyNode)) {
			keyNode = Array.prototype.slice.call(keyNode);
			for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
				if (Array.isArray(keyNode[index])) throwError(state, "nested arrays are not supported inside keys");
				if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") keyNode[index] = "[object Object]";
			}
		}
		if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") keyNode = "[object Object]";
		keyNode = String(keyNode);
		if (_result === null) _result = {};
		if (keyTag === "tag:yaml.org,2002:merge") if (Array.isArray(valueNode)) for (index = 0, quantity = valueNode.length; index < quantity; index += 1) mergeMappings(state, _result, valueNode[index], overridableKeys);
		else mergeMappings(state, _result, valueNode, overridableKeys);
		else {
			if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
				state.line = startLine || state.line;
				state.lineStart = startLineStart || state.lineStart;
				state.position = startPos || state.position;
				throwError(state, "duplicated mapping key");
			}
			setProperty(_result, keyNode, valueNode);
			delete overridableKeys[keyNode];
		}
		return _result;
	}
	function readLineBreak(state) {
		var ch = state.input.charCodeAt(state.position);
		if (ch === 10) state.position++;
		else if (ch === 13) {
			state.position++;
			if (state.input.charCodeAt(state.position) === 10) state.position++;
		} else throwError(state, "a line break is expected");
		state.line += 1;
		state.lineStart = state.position;
		state.firstTabInLine = -1;
	}
	function skipSeparationSpace(state, allowComments, checkIndent) {
		var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
		while (ch !== 0) {
			while (is_WHITE_SPACE(ch)) {
				if (ch === 9 && state.firstTabInLine === -1) state.firstTabInLine = state.position;
				ch = state.input.charCodeAt(++state.position);
			}
			if (allowComments && ch === 35) do
				ch = state.input.charCodeAt(++state.position);
			while (ch !== 10 && ch !== 13 && ch !== 0);
			if (is_EOL(ch)) {
				readLineBreak(state);
				ch = state.input.charCodeAt(state.position);
				lineBreaks++;
				state.lineIndent = 0;
				while (ch === 32) {
					state.lineIndent++;
					ch = state.input.charCodeAt(++state.position);
				}
			} else break;
		}
		if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) throwWarning(state, "deficient indentation");
		return lineBreaks;
	}
	function testDocumentSeparator(state) {
		var _position = state.position, ch = state.input.charCodeAt(_position);
		if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
			_position += 3;
			ch = state.input.charCodeAt(_position);
			if (ch === 0 || is_WS_OR_EOL(ch)) return true;
		}
		return false;
	}
	function writeFoldedLines(state, count) {
		if (count === 1) state.result += " ";
		else if (count > 1) state.result += common.repeat("\n", count - 1);
	}
	function readPlainScalar(state, nodeIndent, withinFlowCollection) {
		var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch = state.input.charCodeAt(state.position);
		if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) return false;
		if (ch === 63 || ch === 45) {
			following = state.input.charCodeAt(state.position + 1);
			if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) return false;
		}
		state.kind = "scalar";
		state.result = "";
		captureStart = captureEnd = state.position;
		hasPendingContent = false;
		while (ch !== 0) {
			if (ch === 58) {
				following = state.input.charCodeAt(state.position + 1);
				if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) break;
			} else if (ch === 35) {
				preceding = state.input.charCodeAt(state.position - 1);
				if (is_WS_OR_EOL(preceding)) break;
			} else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) break;
			else if (is_EOL(ch)) {
				_line = state.line;
				_lineStart = state.lineStart;
				_lineIndent = state.lineIndent;
				skipSeparationSpace(state, false, -1);
				if (state.lineIndent >= nodeIndent) {
					hasPendingContent = true;
					ch = state.input.charCodeAt(state.position);
					continue;
				} else {
					state.position = captureEnd;
					state.line = _line;
					state.lineStart = _lineStart;
					state.lineIndent = _lineIndent;
					break;
				}
			}
			if (hasPendingContent) {
				captureSegment(state, captureStart, captureEnd, false);
				writeFoldedLines(state, state.line - _line);
				captureStart = captureEnd = state.position;
				hasPendingContent = false;
			}
			if (!is_WHITE_SPACE(ch)) captureEnd = state.position + 1;
			ch = state.input.charCodeAt(++state.position);
		}
		captureSegment(state, captureStart, captureEnd, false);
		if (state.result) return true;
		state.kind = _kind;
		state.result = _result;
		return false;
	}
	function readSingleQuotedScalar(state, nodeIndent) {
		var ch = state.input.charCodeAt(state.position), captureStart, captureEnd;
		if (ch !== 39) return false;
		state.kind = "scalar";
		state.result = "";
		state.position++;
		captureStart = captureEnd = state.position;
		while ((ch = state.input.charCodeAt(state.position)) !== 0) if (ch === 39) {
			captureSegment(state, captureStart, state.position, true);
			ch = state.input.charCodeAt(++state.position);
			if (ch === 39) {
				captureStart = state.position;
				state.position++;
				captureEnd = state.position;
			} else return true;
		} else if (is_EOL(ch)) {
			captureSegment(state, captureStart, captureEnd, true);
			writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
			captureStart = captureEnd = state.position;
		} else if (state.position === state.lineStart && testDocumentSeparator(state)) throwError(state, "unexpected end of the document within a single quoted scalar");
		else {
			state.position++;
			captureEnd = state.position;
		}
		throwError(state, "unexpected end of the stream within a single quoted scalar");
	}
	function readDoubleQuotedScalar(state, nodeIndent) {
		var captureStart, captureEnd, hexLength, hexResult, tmp, ch = state.input.charCodeAt(state.position);
		if (ch !== 34) return false;
		state.kind = "scalar";
		state.result = "";
		state.position++;
		captureStart = captureEnd = state.position;
		while ((ch = state.input.charCodeAt(state.position)) !== 0) if (ch === 34) {
			captureSegment(state, captureStart, state.position, true);
			state.position++;
			return true;
		} else if (ch === 92) {
			captureSegment(state, captureStart, state.position, true);
			ch = state.input.charCodeAt(++state.position);
			if (is_EOL(ch)) skipSeparationSpace(state, false, nodeIndent);
			else if (ch < 256 && simpleEscapeCheck[ch]) {
				state.result += simpleEscapeMap[ch];
				state.position++;
			} else if ((tmp = escapedHexLen(ch)) > 0) {
				hexLength = tmp;
				hexResult = 0;
				for (; hexLength > 0; hexLength--) {
					ch = state.input.charCodeAt(++state.position);
					if ((tmp = fromHexCode(ch)) >= 0) hexResult = (hexResult << 4) + tmp;
					else throwError(state, "expected hexadecimal character");
				}
				state.result += charFromCodepoint(hexResult);
				state.position++;
			} else throwError(state, "unknown escape sequence");
			captureStart = captureEnd = state.position;
		} else if (is_EOL(ch)) {
			captureSegment(state, captureStart, captureEnd, true);
			writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
			captureStart = captureEnd = state.position;
		} else if (state.position === state.lineStart && testDocumentSeparator(state)) throwError(state, "unexpected end of the document within a double quoted scalar");
		else {
			state.position++;
			captureEnd = state.position;
		}
		throwError(state, "unexpected end of the stream within a double quoted scalar");
	}
	function readFlowCollection(state, nodeIndent) {
		var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = Object.create(null), keyNode, keyTag, valueNode, ch = state.input.charCodeAt(state.position);
		if (ch === 91) {
			terminator = 93;
			isMapping = false;
			_result = [];
		} else if (ch === 123) {
			terminator = 125;
			isMapping = true;
			_result = {};
		} else return false;
		if (state.anchor !== null) state.anchorMap[state.anchor] = _result;
		ch = state.input.charCodeAt(++state.position);
		while (ch !== 0) {
			skipSeparationSpace(state, true, nodeIndent);
			ch = state.input.charCodeAt(state.position);
			if (ch === terminator) {
				state.position++;
				state.tag = _tag;
				state.anchor = _anchor;
				state.kind = isMapping ? "mapping" : "sequence";
				state.result = _result;
				return true;
			} else if (!readNext) throwError(state, "missed comma between flow collection entries");
			else if (ch === 44) throwError(state, "expected the node content, but found ','");
			keyTag = keyNode = valueNode = null;
			isPair = isExplicitPair = false;
			if (ch === 63) {
				following = state.input.charCodeAt(state.position + 1);
				if (is_WS_OR_EOL(following)) {
					isPair = isExplicitPair = true;
					state.position++;
					skipSeparationSpace(state, true, nodeIndent);
				}
			}
			_line = state.line;
			_lineStart = state.lineStart;
			_pos = state.position;
			composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
			keyTag = state.tag;
			keyNode = state.result;
			skipSeparationSpace(state, true, nodeIndent);
			ch = state.input.charCodeAt(state.position);
			if ((isExplicitPair || state.line === _line) && ch === 58) {
				isPair = true;
				ch = state.input.charCodeAt(++state.position);
				skipSeparationSpace(state, true, nodeIndent);
				composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
				valueNode = state.result;
			}
			if (isMapping) storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
			else if (isPair) _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
			else _result.push(keyNode);
			skipSeparationSpace(state, true, nodeIndent);
			ch = state.input.charCodeAt(state.position);
			if (ch === 44) {
				readNext = true;
				ch = state.input.charCodeAt(++state.position);
			} else readNext = false;
		}
		throwError(state, "unexpected end of the stream within a flow collection");
	}
	function readBlockScalar(state, nodeIndent) {
		var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch = state.input.charCodeAt(state.position);
		if (ch === 124) folding = false;
		else if (ch === 62) folding = true;
		else return false;
		state.kind = "scalar";
		state.result = "";
		while (ch !== 0) {
			ch = state.input.charCodeAt(++state.position);
			if (ch === 43 || ch === 45) if (CHOMPING_CLIP === chomping) chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
			else throwError(state, "repeat of a chomping mode identifier");
			else if ((tmp = fromDecimalCode(ch)) >= 0) if (tmp === 0) throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
			else if (!detectedIndent) {
				textIndent = nodeIndent + tmp - 1;
				detectedIndent = true;
			} else throwError(state, "repeat of an indentation width identifier");
			else break;
		}
		if (is_WHITE_SPACE(ch)) {
			do
				ch = state.input.charCodeAt(++state.position);
			while (is_WHITE_SPACE(ch));
			if (ch === 35) do
				ch = state.input.charCodeAt(++state.position);
			while (!is_EOL(ch) && ch !== 0);
		}
		while (ch !== 0) {
			readLineBreak(state);
			state.lineIndent = 0;
			ch = state.input.charCodeAt(state.position);
			while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
				state.lineIndent++;
				ch = state.input.charCodeAt(++state.position);
			}
			if (!detectedIndent && state.lineIndent > textIndent) textIndent = state.lineIndent;
			if (is_EOL(ch)) {
				emptyLines++;
				continue;
			}
			if (state.lineIndent < textIndent) {
				if (chomping === CHOMPING_KEEP) state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
				else if (chomping === CHOMPING_CLIP) {
					if (didReadContent) state.result += "\n";
				}
				break;
			}
			if (folding) if (is_WHITE_SPACE(ch)) {
				atMoreIndented = true;
				state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
			} else if (atMoreIndented) {
				atMoreIndented = false;
				state.result += common.repeat("\n", emptyLines + 1);
			} else if (emptyLines === 0) {
				if (didReadContent) state.result += " ";
			} else state.result += common.repeat("\n", emptyLines);
			else state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
			didReadContent = true;
			detectedIndent = true;
			emptyLines = 0;
			captureStart = state.position;
			while (!is_EOL(ch) && ch !== 0) ch = state.input.charCodeAt(++state.position);
			captureSegment(state, captureStart, state.position, false);
		}
		return true;
	}
	function readBlockSequence(state, nodeIndent) {
		var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
		if (state.firstTabInLine !== -1) return false;
		if (state.anchor !== null) state.anchorMap[state.anchor] = _result;
		ch = state.input.charCodeAt(state.position);
		while (ch !== 0) {
			if (state.firstTabInLine !== -1) {
				state.position = state.firstTabInLine;
				throwError(state, "tab characters must not be used in indentation");
			}
			if (ch !== 45) break;
			following = state.input.charCodeAt(state.position + 1);
			if (!is_WS_OR_EOL(following)) break;
			detected = true;
			state.position++;
			if (skipSeparationSpace(state, true, -1)) {
				if (state.lineIndent <= nodeIndent) {
					_result.push(null);
					ch = state.input.charCodeAt(state.position);
					continue;
				}
			}
			_line = state.line;
			composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
			_result.push(state.result);
			skipSeparationSpace(state, true, -1);
			ch = state.input.charCodeAt(state.position);
			if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) throwError(state, "bad indentation of a sequence entry");
			else if (state.lineIndent < nodeIndent) break;
		}
		if (detected) {
			state.tag = _tag;
			state.anchor = _anchor;
			state.kind = "sequence";
			state.result = _result;
			return true;
		}
		return false;
	}
	function readBlockMapping(state, nodeIndent, flowIndent) {
		var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
		if (state.firstTabInLine !== -1) return false;
		if (state.anchor !== null) state.anchorMap[state.anchor] = _result;
		ch = state.input.charCodeAt(state.position);
		while (ch !== 0) {
			if (!atExplicitKey && state.firstTabInLine !== -1) {
				state.position = state.firstTabInLine;
				throwError(state, "tab characters must not be used in indentation");
			}
			following = state.input.charCodeAt(state.position + 1);
			_line = state.line;
			if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
				if (ch === 63) {
					if (atExplicitKey) {
						storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
						keyTag = keyNode = valueNode = null;
					}
					detected = true;
					atExplicitKey = true;
					allowCompact = true;
				} else if (atExplicitKey) {
					atExplicitKey = false;
					allowCompact = true;
				} else throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
				state.position += 1;
				ch = following;
			} else {
				_keyLine = state.line;
				_keyLineStart = state.lineStart;
				_keyPos = state.position;
				if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) break;
				if (state.line === _line) {
					ch = state.input.charCodeAt(state.position);
					while (is_WHITE_SPACE(ch)) ch = state.input.charCodeAt(++state.position);
					if (ch === 58) {
						ch = state.input.charCodeAt(++state.position);
						if (!is_WS_OR_EOL(ch)) throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
						if (atExplicitKey) {
							storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
							keyTag = keyNode = valueNode = null;
						}
						detected = true;
						atExplicitKey = false;
						allowCompact = false;
						keyTag = state.tag;
						keyNode = state.result;
					} else if (detected) throwError(state, "can not read an implicit mapping pair; a colon is missed");
					else {
						state.tag = _tag;
						state.anchor = _anchor;
						return true;
					}
				} else if (detected) throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
				else {
					state.tag = _tag;
					state.anchor = _anchor;
					return true;
				}
			}
			if (state.line === _line || state.lineIndent > nodeIndent) {
				if (atExplicitKey) {
					_keyLine = state.line;
					_keyLineStart = state.lineStart;
					_keyPos = state.position;
				}
				if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) if (atExplicitKey) keyNode = state.result;
				else valueNode = state.result;
				if (!atExplicitKey) {
					storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
					keyTag = keyNode = valueNode = null;
				}
				skipSeparationSpace(state, true, -1);
				ch = state.input.charCodeAt(state.position);
			}
			if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) throwError(state, "bad indentation of a mapping entry");
			else if (state.lineIndent < nodeIndent) break;
		}
		if (atExplicitKey) storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
		if (detected) {
			state.tag = _tag;
			state.anchor = _anchor;
			state.kind = "mapping";
			state.result = _result;
		}
		return detected;
	}
	function readTagProperty(state) {
		var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch = state.input.charCodeAt(state.position);
		if (ch !== 33) return false;
		if (state.tag !== null) throwError(state, "duplication of a tag property");
		ch = state.input.charCodeAt(++state.position);
		if (ch === 60) {
			isVerbatim = true;
			ch = state.input.charCodeAt(++state.position);
		} else if (ch === 33) {
			isNamed = true;
			tagHandle = "!!";
			ch = state.input.charCodeAt(++state.position);
		} else tagHandle = "!";
		_position = state.position;
		if (isVerbatim) {
			do
				ch = state.input.charCodeAt(++state.position);
			while (ch !== 0 && ch !== 62);
			if (state.position < state.length) {
				tagName = state.input.slice(_position, state.position);
				ch = state.input.charCodeAt(++state.position);
			} else throwError(state, "unexpected end of the stream within a verbatim tag");
		} else {
			while (ch !== 0 && !is_WS_OR_EOL(ch)) {
				if (ch === 33) if (!isNamed) {
					tagHandle = state.input.slice(_position - 1, state.position + 1);
					if (!PATTERN_TAG_HANDLE.test(tagHandle)) throwError(state, "named tag handle cannot contain such characters");
					isNamed = true;
					_position = state.position + 1;
				} else throwError(state, "tag suffix cannot contain exclamation marks");
				ch = state.input.charCodeAt(++state.position);
			}
			tagName = state.input.slice(_position, state.position);
			if (PATTERN_FLOW_INDICATORS.test(tagName)) throwError(state, "tag suffix cannot contain flow indicator characters");
		}
		if (tagName && !PATTERN_TAG_URI.test(tagName)) throwError(state, "tag name cannot contain such characters: " + tagName);
		try {
			tagName = decodeURIComponent(tagName);
		} catch (err) {
			throwError(state, "tag name is malformed: " + tagName);
		}
		if (isVerbatim) state.tag = tagName;
		else if (_hasOwnProperty.call(state.tagMap, tagHandle)) state.tag = state.tagMap[tagHandle] + tagName;
		else if (tagHandle === "!") state.tag = "!" + tagName;
		else if (tagHandle === "!!") state.tag = "tag:yaml.org,2002:" + tagName;
		else throwError(state, "undeclared tag handle \"" + tagHandle + "\"");
		return true;
	}
	function readAnchorProperty(state) {
		var _position, ch = state.input.charCodeAt(state.position);
		if (ch !== 38) return false;
		if (state.anchor !== null) throwError(state, "duplication of an anchor property");
		ch = state.input.charCodeAt(++state.position);
		_position = state.position;
		while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) ch = state.input.charCodeAt(++state.position);
		if (state.position === _position) throwError(state, "name of an anchor node must contain at least one character");
		state.anchor = state.input.slice(_position, state.position);
		return true;
	}
	function readAlias(state) {
		var _position, alias, ch = state.input.charCodeAt(state.position);
		if (ch !== 42) return false;
		ch = state.input.charCodeAt(++state.position);
		_position = state.position;
		while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) ch = state.input.charCodeAt(++state.position);
		if (state.position === _position) throwError(state, "name of an alias node must contain at least one character");
		alias = state.input.slice(_position, state.position);
		if (!_hasOwnProperty.call(state.anchorMap, alias)) throwError(state, "unidentified alias \"" + alias + "\"");
		state.result = state.anchorMap[alias];
		skipSeparationSpace(state, true, -1);
		return true;
	}
	function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
		var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type, flowIndent, blockIndent;
		if (state.listener !== null) state.listener("open", state);
		state.tag = null;
		state.anchor = null;
		state.kind = null;
		state.result = null;
		allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
		if (allowToSeek) {
			if (skipSeparationSpace(state, true, -1)) {
				atNewLine = true;
				if (state.lineIndent > parentIndent) indentStatus = 1;
				else if (state.lineIndent === parentIndent) indentStatus = 0;
				else if (state.lineIndent < parentIndent) indentStatus = -1;
			}
		}
		if (indentStatus === 1) while (readTagProperty(state) || readAnchorProperty(state)) if (skipSeparationSpace(state, true, -1)) {
			atNewLine = true;
			allowBlockCollections = allowBlockStyles;
			if (state.lineIndent > parentIndent) indentStatus = 1;
			else if (state.lineIndent === parentIndent) indentStatus = 0;
			else if (state.lineIndent < parentIndent) indentStatus = -1;
		} else allowBlockCollections = false;
		if (allowBlockCollections) allowBlockCollections = atNewLine || allowCompact;
		if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
			if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) flowIndent = parentIndent;
			else flowIndent = parentIndent + 1;
			blockIndent = state.position - state.lineStart;
			if (indentStatus === 1) if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) hasContent = true;
			else {
				if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) hasContent = true;
				else if (readAlias(state)) {
					hasContent = true;
					if (state.tag !== null || state.anchor !== null) throwError(state, "alias node should not have any properties");
				} else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
					hasContent = true;
					if (state.tag === null) state.tag = "?";
				}
				if (state.anchor !== null) state.anchorMap[state.anchor] = state.result;
			}
			else if (indentStatus === 0) hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
		}
		if (state.tag === null) {
			if (state.anchor !== null) state.anchorMap[state.anchor] = state.result;
		} else if (state.tag === "?") {
			if (state.result !== null && state.kind !== "scalar") throwError(state, "unacceptable node kind for !<?> tag; it should be \"scalar\", not \"" + state.kind + "\"");
			for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
				type = state.implicitTypes[typeIndex];
				if (type.resolve(state.result)) {
					state.result = type.construct(state.result);
					state.tag = type.tag;
					if (state.anchor !== null) state.anchorMap[state.anchor] = state.result;
					break;
				}
			}
		} else if (state.tag !== "!") {
			if (_hasOwnProperty.call(state.typeMap[state.kind || "fallback"], state.tag)) type = state.typeMap[state.kind || "fallback"][state.tag];
			else {
				type = null;
				typeList = state.typeMap.multi[state.kind || "fallback"];
				for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
					type = typeList[typeIndex];
					break;
				}
			}
			if (!type) throwError(state, "unknown tag !<" + state.tag + ">");
			if (state.result !== null && type.kind !== state.kind) throwError(state, "unacceptable node kind for !<" + state.tag + "> tag; it should be \"" + type.kind + "\", not \"" + state.kind + "\"");
			if (!type.resolve(state.result, state.tag)) throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
			else {
				state.result = type.construct(state.result, state.tag);
				if (state.anchor !== null) state.anchorMap[state.anchor] = state.result;
			}
		}
		if (state.listener !== null) state.listener("close", state);
		return state.tag !== null || state.anchor !== null || hasContent;
	}
	function readDocument(state) {
		var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
		state.version = null;
		state.checkLineBreaks = state.legacy;
		state.tagMap = Object.create(null);
		state.anchorMap = Object.create(null);
		while ((ch = state.input.charCodeAt(state.position)) !== 0) {
			skipSeparationSpace(state, true, -1);
			ch = state.input.charCodeAt(state.position);
			if (state.lineIndent > 0 || ch !== 37) break;
			hasDirectives = true;
			ch = state.input.charCodeAt(++state.position);
			_position = state.position;
			while (ch !== 0 && !is_WS_OR_EOL(ch)) ch = state.input.charCodeAt(++state.position);
			directiveName = state.input.slice(_position, state.position);
			directiveArgs = [];
			if (directiveName.length < 1) throwError(state, "directive name must not be less than one character in length");
			while (ch !== 0) {
				while (is_WHITE_SPACE(ch)) ch = state.input.charCodeAt(++state.position);
				if (ch === 35) {
					do
						ch = state.input.charCodeAt(++state.position);
					while (ch !== 0 && !is_EOL(ch));
					break;
				}
				if (is_EOL(ch)) break;
				_position = state.position;
				while (ch !== 0 && !is_WS_OR_EOL(ch)) ch = state.input.charCodeAt(++state.position);
				directiveArgs.push(state.input.slice(_position, state.position));
			}
			if (ch !== 0) readLineBreak(state);
			if (_hasOwnProperty.call(directiveHandlers, directiveName)) directiveHandlers[directiveName](state, directiveName, directiveArgs);
			else throwWarning(state, "unknown document directive \"" + directiveName + "\"");
		}
		skipSeparationSpace(state, true, -1);
		if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
			state.position += 3;
			skipSeparationSpace(state, true, -1);
		} else if (hasDirectives) throwError(state, "directives end mark is expected");
		composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
		skipSeparationSpace(state, true, -1);
		if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) throwWarning(state, "non-ASCII line breaks are interpreted as content");
		state.documents.push(state.result);
		if (state.position === state.lineStart && testDocumentSeparator(state)) {
			if (state.input.charCodeAt(state.position) === 46) {
				state.position += 3;
				skipSeparationSpace(state, true, -1);
			}
			return;
		}
		if (state.position < state.length - 1) throwError(state, "end of the stream or a document separator is expected");
		else return;
	}
	function loadDocuments(input, options) {
		input = String(input);
		options = options || {};
		if (input.length !== 0) {
			if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) input += "\n";
			if (input.charCodeAt(0) === 65279) input = input.slice(1);
		}
		var state = new State(input, options);
		var nullpos = input.indexOf("\0");
		if (nullpos !== -1) {
			state.position = nullpos;
			throwError(state, "null byte is not allowed in input");
		}
		state.input += "\0";
		while (state.input.charCodeAt(state.position) === 32) {
			state.lineIndent += 1;
			state.position += 1;
		}
		while (state.position < state.length - 1) readDocument(state);
		return state.documents;
	}
	function loadAll(input, iterator, options) {
		if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
			options = iterator;
			iterator = null;
		}
		var documents = loadDocuments(input, options);
		if (typeof iterator !== "function") return documents;
		for (var index = 0, length = documents.length; index < length; index += 1) iterator(documents[index]);
	}
	function load(input, options) {
		var documents = loadDocuments(input, options);
		if (documents.length === 0) return;
		else if (documents.length === 1) return documents[0];
		throw new YAMLException("expected a single document in the stream, but found more");
	}
	module.exports.loadAll = loadAll;
	module.exports.load = load;
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/lib/dumper.js
var require_dumper = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var common = require_common();
	var YAMLException = require_exception();
	var DEFAULT_SCHEMA = require_default();
	var _toString = Object.prototype.toString;
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	var CHAR_BOM = 65279;
	var CHAR_TAB = 9;
	var CHAR_LINE_FEED = 10;
	var CHAR_CARRIAGE_RETURN = 13;
	var CHAR_SPACE = 32;
	var CHAR_EXCLAMATION = 33;
	var CHAR_DOUBLE_QUOTE = 34;
	var CHAR_SHARP = 35;
	var CHAR_PERCENT = 37;
	var CHAR_AMPERSAND = 38;
	var CHAR_SINGLE_QUOTE = 39;
	var CHAR_ASTERISK = 42;
	var CHAR_COMMA = 44;
	var CHAR_MINUS = 45;
	var CHAR_COLON = 58;
	var CHAR_EQUALS = 61;
	var CHAR_GREATER_THAN = 62;
	var CHAR_QUESTION = 63;
	var CHAR_COMMERCIAL_AT = 64;
	var CHAR_LEFT_SQUARE_BRACKET = 91;
	var CHAR_RIGHT_SQUARE_BRACKET = 93;
	var CHAR_GRAVE_ACCENT = 96;
	var CHAR_LEFT_CURLY_BRACKET = 123;
	var CHAR_VERTICAL_LINE = 124;
	var CHAR_RIGHT_CURLY_BRACKET = 125;
	var ESCAPE_SEQUENCES = {};
	ESCAPE_SEQUENCES[0] = "\\0";
	ESCAPE_SEQUENCES[7] = "\\a";
	ESCAPE_SEQUENCES[8] = "\\b";
	ESCAPE_SEQUENCES[9] = "\\t";
	ESCAPE_SEQUENCES[10] = "\\n";
	ESCAPE_SEQUENCES[11] = "\\v";
	ESCAPE_SEQUENCES[12] = "\\f";
	ESCAPE_SEQUENCES[13] = "\\r";
	ESCAPE_SEQUENCES[27] = "\\e";
	ESCAPE_SEQUENCES[34] = "\\\"";
	ESCAPE_SEQUENCES[92] = "\\\\";
	ESCAPE_SEQUENCES[133] = "\\N";
	ESCAPE_SEQUENCES[160] = "\\_";
	ESCAPE_SEQUENCES[8232] = "\\L";
	ESCAPE_SEQUENCES[8233] = "\\P";
	var DEPRECATED_BOOLEANS_SYNTAX = [
		"y",
		"Y",
		"yes",
		"Yes",
		"YES",
		"on",
		"On",
		"ON",
		"n",
		"N",
		"no",
		"No",
		"NO",
		"off",
		"Off",
		"OFF"
	];
	var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
	function compileStyleMap(schema, map) {
		var result, keys, index, length, tag, style, type;
		if (map === null) return {};
		result = {};
		keys = Object.keys(map);
		for (index = 0, length = keys.length; index < length; index += 1) {
			tag = keys[index];
			style = String(map[tag]);
			if (tag.slice(0, 2) === "!!") tag = "tag:yaml.org,2002:" + tag.slice(2);
			type = schema.compiledTypeMap["fallback"][tag];
			if (type && _hasOwnProperty.call(type.styleAliases, style)) style = type.styleAliases[style];
			result[tag] = style;
		}
		return result;
	}
	function encodeHex(character) {
		var string = character.toString(16).toUpperCase(), handle, length;
		if (character <= 255) {
			handle = "x";
			length = 2;
		} else if (character <= 65535) {
			handle = "u";
			length = 4;
		} else if (character <= 4294967295) {
			handle = "U";
			length = 8;
		} else throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
		return "\\" + handle + common.repeat("0", length - string.length) + string;
	}
	var QUOTING_TYPE_SINGLE = 1, QUOTING_TYPE_DOUBLE = 2;
	function State(options) {
		this.schema = options["schema"] || DEFAULT_SCHEMA;
		this.indent = Math.max(1, options["indent"] || 2);
		this.noArrayIndent = options["noArrayIndent"] || false;
		this.skipInvalid = options["skipInvalid"] || false;
		this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
		this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
		this.sortKeys = options["sortKeys"] || false;
		this.lineWidth = options["lineWidth"] || 80;
		this.noRefs = options["noRefs"] || false;
		this.noCompatMode = options["noCompatMode"] || false;
		this.condenseFlow = options["condenseFlow"] || false;
		this.quotingType = options["quotingType"] === "\"" ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
		this.forceQuotes = options["forceQuotes"] || false;
		this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
		this.implicitTypes = this.schema.compiledImplicit;
		this.explicitTypes = this.schema.compiledExplicit;
		this.tag = null;
		this.result = "";
		this.duplicates = [];
		this.usedDuplicates = null;
	}
	function indentString(string, spaces) {
		var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
		while (position < length) {
			next = string.indexOf("\n", position);
			if (next === -1) {
				line = string.slice(position);
				position = length;
			} else {
				line = string.slice(position, next + 1);
				position = next + 1;
			}
			if (line.length && line !== "\n") result += ind;
			result += line;
		}
		return result;
	}
	function generateNextLine(state, level) {
		return "\n" + common.repeat(" ", state.indent * level);
	}
	function testImplicitResolving(state, str) {
		var index, length, type;
		for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
			type = state.implicitTypes[index];
			if (type.resolve(str)) return true;
		}
		return false;
	}
	function isWhitespace(c) {
		return c === CHAR_SPACE || c === CHAR_TAB;
	}
	function isPrintable(c) {
		return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
	}
	function isNsCharOrWhitespace(c) {
		return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
	}
	function isPlainSafe(c, prev, inblock) {
		var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
		var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
		return (inblock ? cIsNsCharOrWhitespace : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar;
	}
	function isPlainSafeFirst(c) {
		return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
	}
	function isPlainSafeLast(c) {
		return !isWhitespace(c) && c !== CHAR_COLON;
	}
	function codePointAt(string, pos) {
		var first = string.charCodeAt(pos), second;
		if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
			second = string.charCodeAt(pos + 1);
			if (second >= 56320 && second <= 57343) return (first - 55296) * 1024 + second - 56320 + 65536;
		}
		return first;
	}
	function needIndentIndicator(string) {
		return /^\n* /.test(string);
	}
	var STYLE_PLAIN = 1, STYLE_SINGLE = 2, STYLE_LITERAL = 3, STYLE_FOLDED = 4, STYLE_DOUBLE = 5;
	function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
		var i;
		var char = 0;
		var prevChar = null;
		var hasLineBreak = false;
		var hasFoldableLine = false;
		var shouldTrackWidth = lineWidth !== -1;
		var previousLineBreak = -1;
		var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
		if (singleLineOnly || forceQuotes) for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
			char = codePointAt(string, i);
			if (!isPrintable(char)) return STYLE_DOUBLE;
			plain = plain && isPlainSafe(char, prevChar, inblock);
			prevChar = char;
		}
		else {
			for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
				char = codePointAt(string, i);
				if (char === CHAR_LINE_FEED) {
					hasLineBreak = true;
					if (shouldTrackWidth) {
						hasFoldableLine = hasFoldableLine || i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
						previousLineBreak = i;
					}
				} else if (!isPrintable(char)) return STYLE_DOUBLE;
				plain = plain && isPlainSafe(char, prevChar, inblock);
				prevChar = char;
			}
			hasFoldableLine = hasFoldableLine || shouldTrackWidth && i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
		}
		if (!hasLineBreak && !hasFoldableLine) {
			if (plain && !forceQuotes && !testAmbiguousType(string)) return STYLE_PLAIN;
			return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
		}
		if (indentPerLevel > 9 && needIndentIndicator(string)) return STYLE_DOUBLE;
		if (!forceQuotes) return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
		return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
	}
	function writeScalar(state, string, level, iskey, inblock) {
		state.dump = function() {
			if (string.length === 0) return state.quotingType === QUOTING_TYPE_DOUBLE ? "\"\"" : "''";
			if (!state.noCompatMode) {
				if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) return state.quotingType === QUOTING_TYPE_DOUBLE ? "\"" + string + "\"" : "'" + string + "'";
			}
			var indent = state.indent * Math.max(1, level);
			var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
			var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
			function testAmbiguity(string) {
				return testImplicitResolving(state, string);
			}
			switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)) {
				case STYLE_PLAIN: return string;
				case STYLE_SINGLE: return "'" + string.replace(/'/g, "''") + "'";
				case STYLE_LITERAL: return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
				case STYLE_FOLDED: return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
				case STYLE_DOUBLE: return "\"" + escapeString(string, lineWidth) + "\"";
				default: throw new YAMLException("impossible error: invalid scalar style");
			}
		}();
	}
	function blockHeader(string, indentPerLevel) {
		var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
		var clip = string[string.length - 1] === "\n";
		return indentIndicator + (clip && (string[string.length - 2] === "\n" || string === "\n") ? "+" : clip ? "" : "-") + "\n";
	}
	function dropEndingNewline(string) {
		return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
	}
	function foldString(string, width) {
		var lineRe = /(\n+)([^\n]*)/g;
		var result = function() {
			var nextLF = string.indexOf("\n");
			nextLF = nextLF !== -1 ? nextLF : string.length;
			lineRe.lastIndex = nextLF;
			return foldLine(string.slice(0, nextLF), width);
		}();
		var prevMoreIndented = string[0] === "\n" || string[0] === " ";
		var moreIndented;
		var match;
		while (match = lineRe.exec(string)) {
			var prefix = match[1], line = match[2];
			moreIndented = line[0] === " ";
			result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
			prevMoreIndented = moreIndented;
		}
		return result;
	}
	function foldLine(line, width) {
		if (line === "" || line[0] === " ") return line;
		var breakRe = / [^ ]/g;
		var match;
		var start = 0, end, curr = 0, next = 0;
		var result = "";
		while (match = breakRe.exec(line)) {
			next = match.index;
			if (next - start > width) {
				end = curr > start ? curr : next;
				result += "\n" + line.slice(start, end);
				start = end + 1;
			}
			curr = next;
		}
		result += "\n";
		if (line.length - start > width && curr > start) result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
		else result += line.slice(start);
		return result.slice(1);
	}
	function escapeString(string) {
		var result = "";
		var char = 0;
		var escapeSeq;
		for (var i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
			char = codePointAt(string, i);
			escapeSeq = ESCAPE_SEQUENCES[char];
			if (!escapeSeq && isPrintable(char)) {
				result += string[i];
				if (char >= 65536) result += string[i + 1];
			} else result += escapeSeq || encodeHex(char);
		}
		return result;
	}
	function writeFlowSequence(state, level, object) {
		var _result = "", _tag = state.tag, index, length, value;
		for (index = 0, length = object.length; index < length; index += 1) {
			value = object[index];
			if (state.replacer) value = state.replacer.call(object, String(index), value);
			if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
				if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
				_result += state.dump;
			}
		}
		state.tag = _tag;
		state.dump = "[" + _result + "]";
	}
	function writeBlockSequence(state, level, object, compact) {
		var _result = "", _tag = state.tag, index, length, value;
		for (index = 0, length = object.length; index < length; index += 1) {
			value = object[index];
			if (state.replacer) value = state.replacer.call(object, String(index), value);
			if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
				if (!compact || _result !== "") _result += generateNextLine(state, level);
				if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) _result += "-";
				else _result += "- ";
				_result += state.dump;
			}
		}
		state.tag = _tag;
		state.dump = _result || "[]";
	}
	function writeFlowMapping(state, level, object) {
		var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
		for (index = 0, length = objectKeyList.length; index < length; index += 1) {
			pairBuffer = "";
			if (_result !== "") pairBuffer += ", ";
			if (state.condenseFlow) pairBuffer += "\"";
			objectKey = objectKeyList[index];
			objectValue = object[objectKey];
			if (state.replacer) objectValue = state.replacer.call(object, objectKey, objectValue);
			if (!writeNode(state, level, objectKey, false, false)) continue;
			if (state.dump.length > 1024) pairBuffer += "? ";
			pairBuffer += state.dump + (state.condenseFlow ? "\"" : "") + ":" + (state.condenseFlow ? "" : " ");
			if (!writeNode(state, level, objectValue, false, false)) continue;
			pairBuffer += state.dump;
			_result += pairBuffer;
		}
		state.tag = _tag;
		state.dump = "{" + _result + "}";
	}
	function writeBlockMapping(state, level, object, compact) {
		var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
		if (state.sortKeys === true) objectKeyList.sort();
		else if (typeof state.sortKeys === "function") objectKeyList.sort(state.sortKeys);
		else if (state.sortKeys) throw new YAMLException("sortKeys must be a boolean or a function");
		for (index = 0, length = objectKeyList.length; index < length; index += 1) {
			pairBuffer = "";
			if (!compact || _result !== "") pairBuffer += generateNextLine(state, level);
			objectKey = objectKeyList[index];
			objectValue = object[objectKey];
			if (state.replacer) objectValue = state.replacer.call(object, objectKey, objectValue);
			if (!writeNode(state, level + 1, objectKey, true, true, true)) continue;
			explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
			if (explicitPair) if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) pairBuffer += "?";
			else pairBuffer += "? ";
			pairBuffer += state.dump;
			if (explicitPair) pairBuffer += generateNextLine(state, level);
			if (!writeNode(state, level + 1, objectValue, true, explicitPair)) continue;
			if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) pairBuffer += ":";
			else pairBuffer += ": ";
			pairBuffer += state.dump;
			_result += pairBuffer;
		}
		state.tag = _tag;
		state.dump = _result || "{}";
	}
	function detectType(state, object, explicit) {
		var _result, typeList = explicit ? state.explicitTypes : state.implicitTypes, index, length, type, style;
		for (index = 0, length = typeList.length; index < length; index += 1) {
			type = typeList[index];
			if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
				if (explicit) if (type.multi && type.representName) state.tag = type.representName(object);
				else state.tag = type.tag;
				else state.tag = "?";
				if (type.represent) {
					style = state.styleMap[type.tag] || type.defaultStyle;
					if (_toString.call(type.represent) === "[object Function]") _result = type.represent(object, style);
					else if (_hasOwnProperty.call(type.represent, style)) _result = type.represent[style](object, style);
					else throw new YAMLException("!<" + type.tag + "> tag resolver accepts not \"" + style + "\" style");
					state.dump = _result;
				}
				return true;
			}
		}
		return false;
	}
	function writeNode(state, level, object, block, compact, iskey, isblockseq) {
		state.tag = null;
		state.dump = object;
		if (!detectType(state, object, false)) detectType(state, object, true);
		var type = _toString.call(state.dump);
		var inblock = block;
		var tagStr;
		if (block) block = state.flowLevel < 0 || state.flowLevel > level;
		var objectOrArray = type === "[object Object]" || type === "[object Array]", duplicateIndex, duplicate;
		if (objectOrArray) {
			duplicateIndex = state.duplicates.indexOf(object);
			duplicate = duplicateIndex !== -1;
		}
		if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) compact = false;
		if (duplicate && state.usedDuplicates[duplicateIndex]) state.dump = "*ref_" + duplicateIndex;
		else {
			if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) state.usedDuplicates[duplicateIndex] = true;
			if (type === "[object Object]") if (block && Object.keys(state.dump).length !== 0) {
				writeBlockMapping(state, level, state.dump, compact);
				if (duplicate) state.dump = "&ref_" + duplicateIndex + state.dump;
			} else {
				writeFlowMapping(state, level, state.dump);
				if (duplicate) state.dump = "&ref_" + duplicateIndex + " " + state.dump;
			}
			else if (type === "[object Array]") if (block && state.dump.length !== 0) {
				if (state.noArrayIndent && !isblockseq && level > 0) writeBlockSequence(state, level - 1, state.dump, compact);
				else writeBlockSequence(state, level, state.dump, compact);
				if (duplicate) state.dump = "&ref_" + duplicateIndex + state.dump;
			} else {
				writeFlowSequence(state, level, state.dump);
				if (duplicate) state.dump = "&ref_" + duplicateIndex + " " + state.dump;
			}
			else if (type === "[object String]") {
				if (state.tag !== "?") writeScalar(state, state.dump, level, iskey, inblock);
			} else if (type === "[object Undefined]") return false;
			else {
				if (state.skipInvalid) return false;
				throw new YAMLException("unacceptable kind of an object to dump " + type);
			}
			if (state.tag !== null && state.tag !== "?") {
				tagStr = encodeURI(state.tag[0] === "!" ? state.tag.slice(1) : state.tag).replace(/!/g, "%21");
				if (state.tag[0] === "!") tagStr = "!" + tagStr;
				else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") tagStr = "!!" + tagStr.slice(18);
				else tagStr = "!<" + tagStr + ">";
				state.dump = tagStr + " " + state.dump;
			}
		}
		return true;
	}
	function getDuplicateReferences(object, state) {
		var objects = [], duplicatesIndexes = [], index, length;
		inspectNode(object, objects, duplicatesIndexes);
		for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) state.duplicates.push(objects[duplicatesIndexes[index]]);
		state.usedDuplicates = new Array(length);
	}
	function inspectNode(object, objects, duplicatesIndexes) {
		var objectKeyList, index, length;
		if (object !== null && typeof object === "object") {
			index = objects.indexOf(object);
			if (index !== -1) {
				if (duplicatesIndexes.indexOf(index) === -1) duplicatesIndexes.push(index);
			} else {
				objects.push(object);
				if (Array.isArray(object)) for (index = 0, length = object.length; index < length; index += 1) inspectNode(object[index], objects, duplicatesIndexes);
				else {
					objectKeyList = Object.keys(object);
					for (index = 0, length = objectKeyList.length; index < length; index += 1) inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
				}
			}
		}
	}
	function dump(input, options) {
		options = options || {};
		var state = new State(options);
		if (!state.noRefs) getDuplicateReferences(input, state);
		var value = input;
		if (state.replacer) value = state.replacer.call({ "": value }, "", value);
		if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
		return "";
	}
	module.exports.dump = dump;
}));
//#endregion
//#region ../../node_modules/.bun/js-yaml@4.1.1/node_modules/js-yaml/index.js
var require_js_yaml = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var loader = require_loader();
	var dumper = require_dumper();
	function renamed(from, to) {
		return function() {
			throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
		};
	}
	module.exports.Type = require_type();
	module.exports.Schema = require_schema();
	module.exports.FAILSAFE_SCHEMA = require_failsafe();
	module.exports.JSON_SCHEMA = require_json();
	module.exports.CORE_SCHEMA = require_core();
	module.exports.DEFAULT_SCHEMA = require_default();
	module.exports.load = loader.load;
	module.exports.loadAll = loader.loadAll;
	module.exports.dump = dumper.dump;
	module.exports.YAMLException = require_exception();
	module.exports.types = {
		binary: require_binary(),
		float: require_float(),
		map: require_map(),
		null: require_null(),
		pairs: require_pairs(),
		set: require_set(),
		timestamp: require_timestamp(),
		bool: require_bool(),
		int: require_int(),
		merge: require_merge(),
		omap: require_omap(),
		seq: require_seq(),
		str: require_str()
	};
	module.exports.safeLoad = renamed("safeLoad", "load");
	module.exports.safeLoadAll = renamed("safeLoadAll", "loadAll");
	module.exports.safeDump = renamed("safeDump", "dump");
}));
//#endregion
//#region ../../node_modules/.bun/lazy-val@1.0.5/node_modules/lazy-val/out/main.js
var require_main$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Lazy = void 0;
	var Lazy = class {
		constructor(creator) {
			this._value = null;
			this.creator = creator;
		}
		get hasValue() {
			return this.creator == null;
		}
		get value() {
			if (this.creator == null) return this._value;
			const result = this.creator();
			this.value = result;
			return result;
		}
		set value(value) {
			this._value = value;
			this.creator = null;
		}
	};
	exports.Lazy = Lazy;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/internal/constants.js
var require_constants = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SEMVER_SPEC_VERSION = "2.0.0";
	var MAX_LENGTH = 256;
	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
	module.exports = {
		MAX_LENGTH,
		MAX_SAFE_COMPONENT_LENGTH: 16,
		MAX_SAFE_BUILD_LENGTH: MAX_LENGTH - 6,
		MAX_SAFE_INTEGER,
		RELEASE_TYPES: [
			"major",
			"premajor",
			"minor",
			"preminor",
			"patch",
			"prepatch",
			"prerelease"
		],
		SEMVER_SPEC_VERSION,
		FLAG_INCLUDE_PRERELEASE: 1,
		FLAG_LOOSE: 2
	};
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/internal/debug.js
var require_debug = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {};
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/internal/re.js
var require_re = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { MAX_SAFE_COMPONENT_LENGTH, MAX_SAFE_BUILD_LENGTH, MAX_LENGTH } = require_constants();
	var debug = require_debug();
	exports = module.exports = {};
	var re = exports.re = [];
	var safeRe = exports.safeRe = [];
	var src = exports.src = [];
	var safeSrc = exports.safeSrc = [];
	var t = exports.t = {};
	var R = 0;
	var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
	var safeRegexReplacements = [
		["\\s", 1],
		["\\d", MAX_LENGTH],
		[LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
	];
	var makeSafeRegex = (value) => {
		for (const [token, max] of safeRegexReplacements) value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
		return value;
	};
	var createToken = (name, value, isGlobal) => {
		const safe = makeSafeRegex(value);
		const index = R++;
		debug(name, index, value);
		t[name] = index;
		src[index] = value;
		safeSrc[index] = safe;
		re[index] = new RegExp(value, isGlobal ? "g" : void 0);
		safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
	};
	createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
	createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
	createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
	createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
	createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
	createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
	createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
	createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
	createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
	createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
	createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
	createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
	createToken("FULL", `^${src[t.FULLPLAIN]}$`);
	createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
	createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
	createToken("GTLT", "((?:<|>)?=?)");
	createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
	createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
	createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
	createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
	createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
	createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
	createToken("COERCEPLAIN", `(^|[^\\d])(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
	createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
	createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
	createToken("COERCERTL", src[t.COERCE], true);
	createToken("COERCERTLFULL", src[t.COERCEFULL], true);
	createToken("LONETILDE", "(?:~>?)");
	createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
	exports.tildeTrimReplace = "$1~";
	createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
	createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
	createToken("LONECARET", "(?:\\^)");
	createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
	exports.caretTrimReplace = "$1^";
	createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
	createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
	createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
	createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
	createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
	exports.comparatorTrimReplace = "$1$2$3";
	createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
	createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
	createToken("STAR", "(<|>)?=?\\s*\\*");
	createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
	createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/internal/parse-options.js
var require_parse_options = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var looseOption = Object.freeze({ loose: true });
	var emptyOpts = Object.freeze({});
	var parseOptions = (options) => {
		if (!options) return emptyOpts;
		if (typeof options !== "object") return looseOption;
		return options;
	};
	module.exports = parseOptions;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/internal/identifiers.js
var require_identifiers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var numeric = /^[0-9]+$/;
	var compareIdentifiers = (a, b) => {
		if (typeof a === "number" && typeof b === "number") return a === b ? 0 : a < b ? -1 : 1;
		const anum = numeric.test(a);
		const bnum = numeric.test(b);
		if (anum && bnum) {
			a = +a;
			b = +b;
		}
		return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
	};
	var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
	module.exports = {
		compareIdentifiers,
		rcompareIdentifiers
	};
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/classes/semver.js
var require_semver$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var debug = require_debug();
	var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
	var { safeRe: re, t } = require_re();
	var parseOptions = require_parse_options();
	var { compareIdentifiers } = require_identifiers();
	module.exports = class SemVer {
		constructor(version, options) {
			options = parseOptions(options);
			if (version instanceof SemVer) if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) return version;
			else version = version.version;
			else if (typeof version !== "string") throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
			if (version.length > MAX_LENGTH) throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
			debug("SemVer", version, options);
			this.options = options;
			this.loose = !!options.loose;
			this.includePrerelease = !!options.includePrerelease;
			const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
			if (!m) throw new TypeError(`Invalid Version: ${version}`);
			this.raw = version;
			this.major = +m[1];
			this.minor = +m[2];
			this.patch = +m[3];
			if (this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
			if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
			if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
			if (!m[4]) this.prerelease = [];
			else this.prerelease = m[4].split(".").map((id) => {
				if (/^[0-9]+$/.test(id)) {
					const num = +id;
					if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
				}
				return id;
			});
			this.build = m[5] ? m[5].split(".") : [];
			this.format();
		}
		format() {
			this.version = `${this.major}.${this.minor}.${this.patch}`;
			if (this.prerelease.length) this.version += `-${this.prerelease.join(".")}`;
			return this.version;
		}
		toString() {
			return this.version;
		}
		compare(other) {
			debug("SemVer.compare", this.version, this.options, other);
			if (!(other instanceof SemVer)) {
				if (typeof other === "string" && other === this.version) return 0;
				other = new SemVer(other, this.options);
			}
			if (other.version === this.version) return 0;
			return this.compareMain(other) || this.comparePre(other);
		}
		compareMain(other) {
			if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
			if (this.major < other.major) return -1;
			if (this.major > other.major) return 1;
			if (this.minor < other.minor) return -1;
			if (this.minor > other.minor) return 1;
			if (this.patch < other.patch) return -1;
			if (this.patch > other.patch) return 1;
			return 0;
		}
		comparePre(other) {
			if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
			if (this.prerelease.length && !other.prerelease.length) return -1;
			else if (!this.prerelease.length && other.prerelease.length) return 1;
			else if (!this.prerelease.length && !other.prerelease.length) return 0;
			let i = 0;
			do {
				const a = this.prerelease[i];
				const b = other.prerelease[i];
				debug("prerelease compare", i, a, b);
				if (a === void 0 && b === void 0) return 0;
				else if (b === void 0) return 1;
				else if (a === void 0) return -1;
				else if (a === b) continue;
				else return compareIdentifiers(a, b);
			} while (++i);
		}
		compareBuild(other) {
			if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
			let i = 0;
			do {
				const a = this.build[i];
				const b = other.build[i];
				debug("build compare", i, a, b);
				if (a === void 0 && b === void 0) return 0;
				else if (b === void 0) return 1;
				else if (a === void 0) return -1;
				else if (a === b) continue;
				else return compareIdentifiers(a, b);
			} while (++i);
		}
		inc(release, identifier, identifierBase) {
			if (release.startsWith("pre")) {
				if (!identifier && identifierBase === false) throw new Error("invalid increment argument: identifier is empty");
				if (identifier) {
					const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
					if (!match || match[1] !== identifier) throw new Error(`invalid identifier: ${identifier}`);
				}
			}
			switch (release) {
				case "premajor":
					this.prerelease.length = 0;
					this.patch = 0;
					this.minor = 0;
					this.major++;
					this.inc("pre", identifier, identifierBase);
					break;
				case "preminor":
					this.prerelease.length = 0;
					this.patch = 0;
					this.minor++;
					this.inc("pre", identifier, identifierBase);
					break;
				case "prepatch":
					this.prerelease.length = 0;
					this.inc("patch", identifier, identifierBase);
					this.inc("pre", identifier, identifierBase);
					break;
				case "prerelease":
					if (this.prerelease.length === 0) this.inc("patch", identifier, identifierBase);
					this.inc("pre", identifier, identifierBase);
					break;
				case "release":
					if (this.prerelease.length === 0) throw new Error(`version ${this.raw} is not a prerelease`);
					this.prerelease.length = 0;
					break;
				case "major":
					if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
					this.minor = 0;
					this.patch = 0;
					this.prerelease = [];
					break;
				case "minor":
					if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
					this.patch = 0;
					this.prerelease = [];
					break;
				case "patch":
					if (this.prerelease.length === 0) this.patch++;
					this.prerelease = [];
					break;
				case "pre": {
					const base = Number(identifierBase) ? 1 : 0;
					if (this.prerelease.length === 0) this.prerelease = [base];
					else {
						let i = this.prerelease.length;
						while (--i >= 0) if (typeof this.prerelease[i] === "number") {
							this.prerelease[i]++;
							i = -2;
						}
						if (i === -1) {
							if (identifier === this.prerelease.join(".") && identifierBase === false) throw new Error("invalid increment argument: identifier already exists");
							this.prerelease.push(base);
						}
					}
					if (identifier) {
						let prerelease = [identifier, base];
						if (identifierBase === false) prerelease = [identifier];
						if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
							if (isNaN(this.prerelease[1])) this.prerelease = prerelease;
						} else this.prerelease = prerelease;
					}
					break;
				}
				default: throw new Error(`invalid increment argument: ${release}`);
			}
			this.raw = this.format();
			if (this.build.length) this.raw += `+${this.build.join(".")}`;
			return this;
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/parse.js
var require_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var parse = (version, options, throwErrors = false) => {
		if (version instanceof SemVer) return version;
		try {
			return new SemVer(version, options);
		} catch (er) {
			if (!throwErrors) return null;
			throw er;
		}
	};
	module.exports = parse;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/valid.js
var require_valid$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var parse = require_parse();
	var valid = (version, options) => {
		const v = parse(version, options);
		return v ? v.version : null;
	};
	module.exports = valid;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/clean.js
var require_clean = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var parse = require_parse();
	var clean = (version, options) => {
		const s = parse(version.trim().replace(/^[=v]+/, ""), options);
		return s ? s.version : null;
	};
	module.exports = clean;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/inc.js
var require_inc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var inc = (version, release, options, identifier, identifierBase) => {
		if (typeof options === "string") {
			identifierBase = identifier;
			identifier = options;
			options = void 0;
		}
		try {
			return new SemVer(version instanceof SemVer ? version.version : version, options).inc(release, identifier, identifierBase).version;
		} catch (er) {
			return null;
		}
	};
	module.exports = inc;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/diff.js
var require_diff = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var parse = require_parse();
	var diff = (version1, version2) => {
		const v1 = parse(version1, null, true);
		const v2 = parse(version2, null, true);
		const comparison = v1.compare(v2);
		if (comparison === 0) return null;
		const v1Higher = comparison > 0;
		const highVersion = v1Higher ? v1 : v2;
		const lowVersion = v1Higher ? v2 : v1;
		const highHasPre = !!highVersion.prerelease.length;
		if (!!lowVersion.prerelease.length && !highHasPre) {
			if (!lowVersion.patch && !lowVersion.minor) return "major";
			if (lowVersion.compareMain(highVersion) === 0) {
				if (lowVersion.minor && !lowVersion.patch) return "minor";
				return "patch";
			}
		}
		const prefix = highHasPre ? "pre" : "";
		if (v1.major !== v2.major) return prefix + "major";
		if (v1.minor !== v2.minor) return prefix + "minor";
		if (v1.patch !== v2.patch) return prefix + "patch";
		return "prerelease";
	};
	module.exports = diff;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/major.js
var require_major = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var major = (a, loose) => new SemVer(a, loose).major;
	module.exports = major;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/minor.js
var require_minor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var minor = (a, loose) => new SemVer(a, loose).minor;
	module.exports = minor;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/patch.js
var require_patch = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var patch = (a, loose) => new SemVer(a, loose).patch;
	module.exports = patch;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/prerelease.js
var require_prerelease = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var parse = require_parse();
	var prerelease = (version, options) => {
		const parsed = parse(version, options);
		return parsed && parsed.prerelease.length ? parsed.prerelease : null;
	};
	module.exports = prerelease;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/compare.js
var require_compare = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
	module.exports = compare;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/rcompare.js
var require_rcompare = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var rcompare = (a, b, loose) => compare(b, a, loose);
	module.exports = rcompare;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/compare-loose.js
var require_compare_loose = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var compareLoose = (a, b) => compare(a, b, true);
	module.exports = compareLoose;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/compare-build.js
var require_compare_build = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var compareBuild = (a, b, loose) => {
		const versionA = new SemVer(a, loose);
		const versionB = new SemVer(b, loose);
		return versionA.compare(versionB) || versionA.compareBuild(versionB);
	};
	module.exports = compareBuild;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/sort.js
var require_sort = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compareBuild = require_compare_build();
	var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
	module.exports = sort;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/rsort.js
var require_rsort = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compareBuild = require_compare_build();
	var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
	module.exports = rsort;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/gt.js
var require_gt = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var gt = (a, b, loose) => compare(a, b, loose) > 0;
	module.exports = gt;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/lt.js
var require_lt = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var lt = (a, b, loose) => compare(a, b, loose) < 0;
	module.exports = lt;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/eq.js
var require_eq = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var eq = (a, b, loose) => compare(a, b, loose) === 0;
	module.exports = eq;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/neq.js
var require_neq = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var neq = (a, b, loose) => compare(a, b, loose) !== 0;
	module.exports = neq;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/gte.js
var require_gte = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var gte = (a, b, loose) => compare(a, b, loose) >= 0;
	module.exports = gte;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/lte.js
var require_lte = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var lte = (a, b, loose) => compare(a, b, loose) <= 0;
	module.exports = lte;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/cmp.js
var require_cmp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var eq = require_eq();
	var neq = require_neq();
	var gt = require_gt();
	var gte = require_gte();
	var lt = require_lt();
	var lte = require_lte();
	var cmp = (a, op, b, loose) => {
		switch (op) {
			case "===":
				if (typeof a === "object") a = a.version;
				if (typeof b === "object") b = b.version;
				return a === b;
			case "!==":
				if (typeof a === "object") a = a.version;
				if (typeof b === "object") b = b.version;
				return a !== b;
			case "":
			case "=":
			case "==": return eq(a, b, loose);
			case "!=": return neq(a, b, loose);
			case ">": return gt(a, b, loose);
			case ">=": return gte(a, b, loose);
			case "<": return lt(a, b, loose);
			case "<=": return lte(a, b, loose);
			default: throw new TypeError(`Invalid operator: ${op}`);
		}
	};
	module.exports = cmp;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/coerce.js
var require_coerce = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var parse = require_parse();
	var { safeRe: re, t } = require_re();
	var coerce = (version, options) => {
		if (version instanceof SemVer) return version;
		if (typeof version === "number") version = String(version);
		if (typeof version !== "string") return null;
		options = options || {};
		let match = null;
		if (!options.rtl) match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
		else {
			const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
			let next;
			while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
				if (!match || next.index + next[0].length !== match.index + match[0].length) match = next;
				coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
			}
			coerceRtlRegex.lastIndex = -1;
		}
		if (match === null) return null;
		const major = match[2];
		return parse(`${major}.${match[3] || "0"}.${match[4] || "0"}${options.includePrerelease && match[5] ? `-${match[5]}` : ""}${options.includePrerelease && match[6] ? `+${match[6]}` : ""}`, options);
	};
	module.exports = coerce;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/internal/lrucache.js
var require_lrucache = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var LRUCache = class {
		constructor() {
			this.max = 1e3;
			this.map = /* @__PURE__ */ new Map();
		}
		get(key) {
			const value = this.map.get(key);
			if (value === void 0) return;
			else {
				this.map.delete(key);
				this.map.set(key, value);
				return value;
			}
		}
		delete(key) {
			return this.map.delete(key);
		}
		set(key, value) {
			if (!this.delete(key) && value !== void 0) {
				if (this.map.size >= this.max) {
					const firstKey = this.map.keys().next().value;
					this.delete(firstKey);
				}
				this.map.set(key, value);
			}
			return this;
		}
	};
	module.exports = LRUCache;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/classes/range.js
var require_range = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SPACE_CHARACTERS = /\s+/g;
	module.exports = class Range {
		constructor(range, options) {
			options = parseOptions(options);
			if (range instanceof Range) if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) return range;
			else return new Range(range.raw, options);
			if (range instanceof Comparator) {
				this.raw = range.value;
				this.set = [[range]];
				this.formatted = void 0;
				return this;
			}
			this.options = options;
			this.loose = !!options.loose;
			this.includePrerelease = !!options.includePrerelease;
			this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
			this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
			if (!this.set.length) throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
			if (this.set.length > 1) {
				const first = this.set[0];
				this.set = this.set.filter((c) => !isNullSet(c[0]));
				if (this.set.length === 0) this.set = [first];
				else if (this.set.length > 1) {
					for (const c of this.set) if (c.length === 1 && isAny(c[0])) {
						this.set = [c];
						break;
					}
				}
			}
			this.formatted = void 0;
		}
		get range() {
			if (this.formatted === void 0) {
				this.formatted = "";
				for (let i = 0; i < this.set.length; i++) {
					if (i > 0) this.formatted += "||";
					const comps = this.set[i];
					for (let k = 0; k < comps.length; k++) {
						if (k > 0) this.formatted += " ";
						this.formatted += comps[k].toString().trim();
					}
				}
			}
			return this.formatted;
		}
		format() {
			return this.range;
		}
		toString() {
			return this.range;
		}
		parseRange(range) {
			const memoKey = ((this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE)) + ":" + range;
			const cached = cache.get(memoKey);
			if (cached) return cached;
			const loose = this.options.loose;
			const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
			range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
			debug("hyphen replace", range);
			range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
			debug("comparator trim", range);
			range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
			debug("tilde trim", range);
			range = range.replace(re[t.CARETTRIM], caretTrimReplace);
			debug("caret trim", range);
			let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
			if (loose) rangeList = rangeList.filter((comp) => {
				debug("loose invalid filter", comp, this.options);
				return !!comp.match(re[t.COMPARATORLOOSE]);
			});
			debug("range list", rangeList);
			const rangeMap = /* @__PURE__ */ new Map();
			const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
			for (const comp of comparators) {
				if (isNullSet(comp)) return [comp];
				rangeMap.set(comp.value, comp);
			}
			if (rangeMap.size > 1 && rangeMap.has("")) rangeMap.delete("");
			const result = [...rangeMap.values()];
			cache.set(memoKey, result);
			return result;
		}
		intersects(range, options) {
			if (!(range instanceof Range)) throw new TypeError("a Range is required");
			return this.set.some((thisComparators) => {
				return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
					return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
						return rangeComparators.every((rangeComparator) => {
							return thisComparator.intersects(rangeComparator, options);
						});
					});
				});
			});
		}
		test(version) {
			if (!version) return false;
			if (typeof version === "string") try {
				version = new SemVer(version, this.options);
			} catch (er) {
				return false;
			}
			for (let i = 0; i < this.set.length; i++) if (testSet(this.set[i], version, this.options)) return true;
			return false;
		}
	};
	var cache = new (require_lrucache())();
	var parseOptions = require_parse_options();
	var Comparator = require_comparator();
	var debug = require_debug();
	var SemVer = require_semver$1();
	var { safeRe: re, t, comparatorTrimReplace, tildeTrimReplace, caretTrimReplace } = require_re();
	var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
	var isNullSet = (c) => c.value === "<0.0.0-0";
	var isAny = (c) => c.value === "";
	var isSatisfiable = (comparators, options) => {
		let result = true;
		const remainingComparators = comparators.slice();
		let testComparator = remainingComparators.pop();
		while (result && remainingComparators.length) {
			result = remainingComparators.every((otherComparator) => {
				return testComparator.intersects(otherComparator, options);
			});
			testComparator = remainingComparators.pop();
		}
		return result;
	};
	var parseComparator = (comp, options) => {
		comp = comp.replace(re[t.BUILD], "");
		debug("comp", comp, options);
		comp = replaceCarets(comp, options);
		debug("caret", comp);
		comp = replaceTildes(comp, options);
		debug("tildes", comp);
		comp = replaceXRanges(comp, options);
		debug("xrange", comp);
		comp = replaceStars(comp, options);
		debug("stars", comp);
		return comp;
	};
	var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
	var replaceTildes = (comp, options) => {
		return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
	};
	var replaceTilde = (comp, options) => {
		const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
		return comp.replace(r, (_, M, m, p, pr) => {
			debug("tilde", comp, _, M, m, p, pr);
			let ret;
			if (isX(M)) ret = "";
			else if (isX(m)) ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
			else if (isX(p)) ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
			else if (pr) {
				debug("replaceTilde pr", pr);
				ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
			} else ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
			debug("tilde return", ret);
			return ret;
		});
	};
	var replaceCarets = (comp, options) => {
		return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
	};
	var replaceCaret = (comp, options) => {
		debug("caret", comp, options);
		const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
		const z = options.includePrerelease ? "-0" : "";
		return comp.replace(r, (_, M, m, p, pr) => {
			debug("caret", comp, _, M, m, p, pr);
			let ret;
			if (isX(M)) ret = "";
			else if (isX(m)) ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
			else if (isX(p)) if (M === "0") ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
			else ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
			else if (pr) {
				debug("replaceCaret pr", pr);
				if (M === "0") if (m === "0") ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
				else ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
				else ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
			} else {
				debug("no pr");
				if (M === "0") if (m === "0") ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
				else ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
				else ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
			}
			debug("caret return", ret);
			return ret;
		});
	};
	var replaceXRanges = (comp, options) => {
		debug("replaceXRanges", comp, options);
		return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
	};
	var replaceXRange = (comp, options) => {
		comp = comp.trim();
		const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
		return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
			debug("xRange", comp, ret, gtlt, M, m, p, pr);
			const xM = isX(M);
			const xm = xM || isX(m);
			const xp = xm || isX(p);
			const anyX = xp;
			if (gtlt === "=" && anyX) gtlt = "";
			pr = options.includePrerelease ? "-0" : "";
			if (xM) if (gtlt === ">" || gtlt === "<") ret = "<0.0.0-0";
			else ret = "*";
			else if (gtlt && anyX) {
				if (xm) m = 0;
				p = 0;
				if (gtlt === ">") {
					gtlt = ">=";
					if (xm) {
						M = +M + 1;
						m = 0;
						p = 0;
					} else {
						m = +m + 1;
						p = 0;
					}
				} else if (gtlt === "<=") {
					gtlt = "<";
					if (xm) M = +M + 1;
					else m = +m + 1;
				}
				if (gtlt === "<") pr = "-0";
				ret = `${gtlt + M}.${m}.${p}${pr}`;
			} else if (xm) ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
			else if (xp) ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
			debug("xRange return", ret);
			return ret;
		});
	};
	var replaceStars = (comp, options) => {
		debug("replaceStars", comp, options);
		return comp.trim().replace(re[t.STAR], "");
	};
	var replaceGTE0 = (comp, options) => {
		debug("replaceGTE0", comp, options);
		return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
	};
	var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
		if (isX(fM)) from = "";
		else if (isX(fm)) from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
		else if (isX(fp)) from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
		else if (fpr) from = `>=${from}`;
		else from = `>=${from}${incPr ? "-0" : ""}`;
		if (isX(tM)) to = "";
		else if (isX(tm)) to = `<${+tM + 1}.0.0-0`;
		else if (isX(tp)) to = `<${tM}.${+tm + 1}.0-0`;
		else if (tpr) to = `<=${tM}.${tm}.${tp}-${tpr}`;
		else if (incPr) to = `<${tM}.${tm}.${+tp + 1}-0`;
		else to = `<=${to}`;
		return `${from} ${to}`.trim();
	};
	var testSet = (set, version, options) => {
		for (let i = 0; i < set.length; i++) if (!set[i].test(version)) return false;
		if (version.prerelease.length && !options.includePrerelease) {
			for (let i = 0; i < set.length; i++) {
				debug(set[i].semver);
				if (set[i].semver === Comparator.ANY) continue;
				if (set[i].semver.prerelease.length > 0) {
					const allowed = set[i].semver;
					if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return true;
				}
			}
			return false;
		}
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/classes/comparator.js
var require_comparator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ANY = Symbol("SemVer ANY");
	module.exports = class Comparator {
		static get ANY() {
			return ANY;
		}
		constructor(comp, options) {
			options = parseOptions(options);
			if (comp instanceof Comparator) if (comp.loose === !!options.loose) return comp;
			else comp = comp.value;
			comp = comp.trim().split(/\s+/).join(" ");
			debug("comparator", comp, options);
			this.options = options;
			this.loose = !!options.loose;
			this.parse(comp);
			if (this.semver === ANY) this.value = "";
			else this.value = this.operator + this.semver.version;
			debug("comp", this);
		}
		parse(comp) {
			const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
			const m = comp.match(r);
			if (!m) throw new TypeError(`Invalid comparator: ${comp}`);
			this.operator = m[1] !== void 0 ? m[1] : "";
			if (this.operator === "=") this.operator = "";
			if (!m[2]) this.semver = ANY;
			else this.semver = new SemVer(m[2], this.options.loose);
		}
		toString() {
			return this.value;
		}
		test(version) {
			debug("Comparator.test", version, this.options.loose);
			if (this.semver === ANY || version === ANY) return true;
			if (typeof version === "string") try {
				version = new SemVer(version, this.options);
			} catch (er) {
				return false;
			}
			return cmp(version, this.operator, this.semver, this.options);
		}
		intersects(comp, options) {
			if (!(comp instanceof Comparator)) throw new TypeError("a Comparator is required");
			if (this.operator === "") {
				if (this.value === "") return true;
				return new Range(comp.value, options).test(this.value);
			} else if (comp.operator === "") {
				if (comp.value === "") return true;
				return new Range(this.value, options).test(comp.semver);
			}
			options = parseOptions(options);
			if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) return false;
			if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) return false;
			if (this.operator.startsWith(">") && comp.operator.startsWith(">")) return true;
			if (this.operator.startsWith("<") && comp.operator.startsWith("<")) return true;
			if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) return true;
			if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) return true;
			if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) return true;
			return false;
		}
	};
	var parseOptions = require_parse_options();
	var { safeRe: re, t } = require_re();
	var cmp = require_cmp();
	var debug = require_debug();
	var SemVer = require_semver$1();
	var Range = require_range();
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/functions/satisfies.js
var require_satisfies = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Range = require_range();
	var satisfies = (version, range, options) => {
		try {
			range = new Range(range, options);
		} catch (er) {
			return false;
		}
		return range.test(version);
	};
	module.exports = satisfies;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/ranges/to-comparators.js
var require_to_comparators = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Range = require_range();
	var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
	module.exports = toComparators;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var Range = require_range();
	var maxSatisfying = (versions, range, options) => {
		let max = null;
		let maxSV = null;
		let rangeObj = null;
		try {
			rangeObj = new Range(range, options);
		} catch (er) {
			return null;
		}
		versions.forEach((v) => {
			if (rangeObj.test(v)) {
				if (!max || maxSV.compare(v) === -1) {
					max = v;
					maxSV = new SemVer(max, options);
				}
			}
		});
		return max;
	};
	module.exports = maxSatisfying;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var Range = require_range();
	var minSatisfying = (versions, range, options) => {
		let min = null;
		let minSV = null;
		let rangeObj = null;
		try {
			rangeObj = new Range(range, options);
		} catch (er) {
			return null;
		}
		versions.forEach((v) => {
			if (rangeObj.test(v)) {
				if (!min || minSV.compare(v) === 1) {
					min = v;
					minSV = new SemVer(min, options);
				}
			}
		});
		return min;
	};
	module.exports = minSatisfying;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/ranges/min-version.js
var require_min_version = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var Range = require_range();
	var gt = require_gt();
	var minVersion = (range, loose) => {
		range = new Range(range, loose);
		let minver = new SemVer("0.0.0");
		if (range.test(minver)) return minver;
		minver = new SemVer("0.0.0-0");
		if (range.test(minver)) return minver;
		minver = null;
		for (let i = 0; i < range.set.length; ++i) {
			const comparators = range.set[i];
			let setMin = null;
			comparators.forEach((comparator) => {
				const compver = new SemVer(comparator.semver.version);
				switch (comparator.operator) {
					case ">":
						if (compver.prerelease.length === 0) compver.patch++;
						else compver.prerelease.push(0);
						compver.raw = compver.format();
					case "":
					case ">=":
						if (!setMin || gt(compver, setMin)) setMin = compver;
						break;
					case "<":
					case "<=": break;
					/* istanbul ignore next */
					default: throw new Error(`Unexpected operation: ${comparator.operator}`);
				}
			});
			if (setMin && (!minver || gt(minver, setMin))) minver = setMin;
		}
		if (minver && range.test(minver)) return minver;
		return null;
	};
	module.exports = minVersion;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/ranges/valid.js
var require_valid = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Range = require_range();
	var validRange = (range, options) => {
		try {
			return new Range(range, options).range || "*";
		} catch (er) {
			return null;
		}
	};
	module.exports = validRange;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/ranges/outside.js
var require_outside = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var Comparator = require_comparator();
	var { ANY } = Comparator;
	var Range = require_range();
	var satisfies = require_satisfies();
	var gt = require_gt();
	var lt = require_lt();
	var lte = require_lte();
	var gte = require_gte();
	var outside = (version, range, hilo, options) => {
		version = new SemVer(version, options);
		range = new Range(range, options);
		let gtfn, ltefn, ltfn, comp, ecomp;
		switch (hilo) {
			case ">":
				gtfn = gt;
				ltefn = lte;
				ltfn = lt;
				comp = ">";
				ecomp = ">=";
				break;
			case "<":
				gtfn = lt;
				ltefn = gte;
				ltfn = gt;
				comp = "<";
				ecomp = "<=";
				break;
			default: throw new TypeError("Must provide a hilo val of \"<\" or \">\"");
		}
		if (satisfies(version, range, options)) return false;
		for (let i = 0; i < range.set.length; ++i) {
			const comparators = range.set[i];
			let high = null;
			let low = null;
			comparators.forEach((comparator) => {
				if (comparator.semver === ANY) comparator = new Comparator(">=0.0.0");
				high = high || comparator;
				low = low || comparator;
				if (gtfn(comparator.semver, high.semver, options)) high = comparator;
				else if (ltfn(comparator.semver, low.semver, options)) low = comparator;
			});
			if (high.operator === comp || high.operator === ecomp) return false;
			if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) return false;
			else if (low.operator === ecomp && ltfn(version, low.semver)) return false;
		}
		return true;
	};
	module.exports = outside;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/ranges/gtr.js
var require_gtr = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var outside = require_outside();
	var gtr = (version, range, options) => outside(version, range, ">", options);
	module.exports = gtr;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/ranges/ltr.js
var require_ltr = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var outside = require_outside();
	var ltr = (version, range, options) => outside(version, range, "<", options);
	module.exports = ltr;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/ranges/intersects.js
var require_intersects = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Range = require_range();
	var intersects = (r1, r2, options) => {
		r1 = new Range(r1, options);
		r2 = new Range(r2, options);
		return r1.intersects(r2, options);
	};
	module.exports = intersects;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/ranges/simplify.js
var require_simplify = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var satisfies = require_satisfies();
	var compare = require_compare();
	module.exports = (versions, range, options) => {
		const set = [];
		let first = null;
		let prev = null;
		const v = versions.sort((a, b) => compare(a, b, options));
		for (const version of v) if (satisfies(version, range, options)) {
			prev = version;
			if (!first) first = version;
		} else {
			if (prev) set.push([first, prev]);
			prev = null;
			first = null;
		}
		if (first) set.push([first, null]);
		const ranges = [];
		for (const [min, max] of set) if (min === max) ranges.push(min);
		else if (!max && min === v[0]) ranges.push("*");
		else if (!max) ranges.push(`>=${min}`);
		else if (min === v[0]) ranges.push(`<=${max}`);
		else ranges.push(`${min} - ${max}`);
		const simplified = ranges.join(" || ");
		const original = typeof range.raw === "string" ? range.raw : String(range);
		return simplified.length < original.length ? simplified : range;
	};
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/ranges/subset.js
var require_subset = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Range = require_range();
	var Comparator = require_comparator();
	var { ANY } = Comparator;
	var satisfies = require_satisfies();
	var compare = require_compare();
	var subset = (sub, dom, options = {}) => {
		if (sub === dom) return true;
		sub = new Range(sub, options);
		dom = new Range(dom, options);
		let sawNonNull = false;
		OUTER: for (const simpleSub of sub.set) {
			for (const simpleDom of dom.set) {
				const isSub = simpleSubset(simpleSub, simpleDom, options);
				sawNonNull = sawNonNull || isSub !== null;
				if (isSub) continue OUTER;
			}
			if (sawNonNull) return false;
		}
		return true;
	};
	var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
	var minimumVersion = [new Comparator(">=0.0.0")];
	var simpleSubset = (sub, dom, options) => {
		if (sub === dom) return true;
		if (sub.length === 1 && sub[0].semver === ANY) if (dom.length === 1 && dom[0].semver === ANY) return true;
		else if (options.includePrerelease) sub = minimumVersionWithPreRelease;
		else sub = minimumVersion;
		if (dom.length === 1 && dom[0].semver === ANY) if (options.includePrerelease) return true;
		else dom = minimumVersion;
		const eqSet = /* @__PURE__ */ new Set();
		let gt, lt;
		for (const c of sub) if (c.operator === ">" || c.operator === ">=") gt = higherGT(gt, c, options);
		else if (c.operator === "<" || c.operator === "<=") lt = lowerLT(lt, c, options);
		else eqSet.add(c.semver);
		if (eqSet.size > 1) return null;
		let gtltComp;
		if (gt && lt) {
			gtltComp = compare(gt.semver, lt.semver, options);
			if (gtltComp > 0) return null;
			else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) return null;
		}
		for (const eq of eqSet) {
			if (gt && !satisfies(eq, String(gt), options)) return null;
			if (lt && !satisfies(eq, String(lt), options)) return null;
			for (const c of dom) if (!satisfies(eq, String(c), options)) return false;
			return true;
		}
		let higher, lower;
		let hasDomLT, hasDomGT;
		let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
		let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
		if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) needDomLTPre = false;
		for (const c of dom) {
			hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
			hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
			if (gt) {
				if (needDomGTPre) {
					if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) needDomGTPre = false;
				}
				if (c.operator === ">" || c.operator === ">=") {
					higher = higherGT(gt, c, options);
					if (higher === c && higher !== gt) return false;
				} else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) return false;
			}
			if (lt) {
				if (needDomLTPre) {
					if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) needDomLTPre = false;
				}
				if (c.operator === "<" || c.operator === "<=") {
					lower = lowerLT(lt, c, options);
					if (lower === c && lower !== lt) return false;
				} else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) return false;
			}
			if (!c.operator && (lt || gt) && gtltComp !== 0) return false;
		}
		if (gt && hasDomLT && !lt && gtltComp !== 0) return false;
		if (lt && hasDomGT && !gt && gtltComp !== 0) return false;
		if (needDomGTPre || needDomLTPre) return false;
		return true;
	};
	var higherGT = (a, b, options) => {
		if (!a) return b;
		const comp = compare(a.semver, b.semver, options);
		return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
	};
	var lowerLT = (a, b, options) => {
		if (!a) return b;
		const comp = compare(a.semver, b.semver, options);
		return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
	};
	module.exports = subset;
}));
//#endregion
//#region ../../node_modules/.bun/semver@7.7.4/node_modules/semver/index.js
var require_semver = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var internalRe = require_re();
	var constants = require_constants();
	var SemVer = require_semver$1();
	var identifiers = require_identifiers();
	module.exports = {
		parse: require_parse(),
		valid: require_valid$1(),
		clean: require_clean(),
		inc: require_inc(),
		diff: require_diff(),
		major: require_major(),
		minor: require_minor(),
		patch: require_patch(),
		prerelease: require_prerelease(),
		compare: require_compare(),
		rcompare: require_rcompare(),
		compareLoose: require_compare_loose(),
		compareBuild: require_compare_build(),
		sort: require_sort(),
		rsort: require_rsort(),
		gt: require_gt(),
		lt: require_lt(),
		eq: require_eq(),
		neq: require_neq(),
		gte: require_gte(),
		lte: require_lte(),
		cmp: require_cmp(),
		coerce: require_coerce(),
		Comparator: require_comparator(),
		Range: require_range(),
		satisfies: require_satisfies(),
		toComparators: require_to_comparators(),
		maxSatisfying: require_max_satisfying(),
		minSatisfying: require_min_satisfying(),
		minVersion: require_min_version(),
		validRange: require_valid(),
		outside: require_outside(),
		gtr: require_gtr(),
		ltr: require_ltr(),
		intersects: require_intersects(),
		simplifyRange: require_simplify(),
		subset: require_subset(),
		SemVer,
		re: internalRe.re,
		src: internalRe.src,
		tokens: internalRe.t,
		SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
		RELEASE_TYPES: constants.RELEASE_TYPES,
		compareIdentifiers: identifiers.compareIdentifiers,
		rcompareIdentifiers: identifiers.rcompareIdentifiers
	};
}));
//#endregion
//#region ../../node_modules/.bun/lodash.isequal@4.5.0/node_modules/lodash.isequal/index.js
var require_lodash_isequal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Lodash (Custom Build) <https://lodash.com/>
	* Build: `lodash modularize exports="npm" -o ./`
	* Copyright JS Foundation and other contributors <https://js.foundation/>
	* Released under MIT license <https://lodash.com/license>
	* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	*/
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = "__lodash_hash_undefined__";
	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	/** `Object#toString` result references. */
	var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]";
	var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
	/**
	* Used to match `RegExp`
	* [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	*/
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
	/** Detect free variable `self`. */
	var freeSelf = typeof self == "object" && self && self.Object === Object && self;
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function("return this")();
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;
	/** Used to access faster Node.js helpers. */
	var nodeUtil = function() {
		try {
			return freeProcess && freeProcess.binding && freeProcess.binding("util");
		} catch (e) {}
	}();
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	/**
	* A specialized version of `_.filter` for arrays without support for
	* iteratee shorthands.
	*
	* @private
	* @param {Array} [array] The array to iterate over.
	* @param {Function} predicate The function invoked per iteration.
	* @returns {Array} Returns the new filtered array.
	*/
	function arrayFilter(array, predicate) {
		var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
		while (++index < length) {
			var value = array[index];
			if (predicate(value, index, array)) result[resIndex++] = value;
		}
		return result;
	}
	/**
	* Appends the elements of `values` to `array`.
	*
	* @private
	* @param {Array} array The array to modify.
	* @param {Array} values The values to append.
	* @returns {Array} Returns `array`.
	*/
	function arrayPush(array, values) {
		var index = -1, length = values.length, offset = array.length;
		while (++index < length) array[offset + index] = values[index];
		return array;
	}
	/**
	* A specialized version of `_.some` for arrays without support for iteratee
	* shorthands.
	*
	* @private
	* @param {Array} [array] The array to iterate over.
	* @param {Function} predicate The function invoked per iteration.
	* @returns {boolean} Returns `true` if any element passes the predicate check,
	*  else `false`.
	*/
	function arraySome(array, predicate) {
		var index = -1, length = array == null ? 0 : array.length;
		while (++index < length) if (predicate(array[index], index, array)) return true;
		return false;
	}
	/**
	* The base implementation of `_.times` without support for iteratee shorthands
	* or max array length checks.
	*
	* @private
	* @param {number} n The number of times to invoke `iteratee`.
	* @param {Function} iteratee The function invoked per iteration.
	* @returns {Array} Returns the array of results.
	*/
	function baseTimes(n, iteratee) {
		var index = -1, result = Array(n);
		while (++index < n) result[index] = iteratee(index);
		return result;
	}
	/**
	* The base implementation of `_.unary` without support for storing metadata.
	*
	* @private
	* @param {Function} func The function to cap arguments for.
	* @returns {Function} Returns the new capped function.
	*/
	function baseUnary(func) {
		return function(value) {
			return func(value);
		};
	}
	/**
	* Checks if a `cache` value for `key` exists.
	*
	* @private
	* @param {Object} cache The cache to query.
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function cacheHas(cache, key) {
		return cache.has(key);
	}
	/**
	* Gets the value at `key` of `object`.
	*
	* @private
	* @param {Object} [object] The object to query.
	* @param {string} key The key of the property to get.
	* @returns {*} Returns the property value.
	*/
	function getValue(object, key) {
		return object == null ? void 0 : object[key];
	}
	/**
	* Converts `map` to its key-value pairs.
	*
	* @private
	* @param {Object} map The map to convert.
	* @returns {Array} Returns the key-value pairs.
	*/
	function mapToArray(map) {
		var index = -1, result = Array(map.size);
		map.forEach(function(value, key) {
			result[++index] = [key, value];
		});
		return result;
	}
	/**
	* Creates a unary function that invokes `func` with its argument transformed.
	*
	* @private
	* @param {Function} func The function to wrap.
	* @param {Function} transform The argument transform.
	* @returns {Function} Returns the new function.
	*/
	function overArg(func, transform) {
		return function(arg) {
			return func(transform(arg));
		};
	}
	/**
	* Converts `set` to an array of its values.
	*
	* @private
	* @param {Object} set The set to convert.
	* @returns {Array} Returns the values.
	*/
	function setToArray(set) {
		var index = -1, result = Array(set.size);
		set.forEach(function(value) {
			result[++index] = value;
		});
		return result;
	}
	/** Used for built-in method references. */
	var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root["__core-js_shared__"];
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = function() {
		var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
		return uid ? "Symbol(src)_1." + uid : "";
	}();
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var nativeObjectToString = objectProto.toString;
	/** Used to detect if a method is native. */
	var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : void 0, Symbol = root.Symbol, Uint8Array = root.Uint8Array, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, symToStringTag = Symbol ? Symbol.toStringTag : void 0;
	var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0, nativeKeys = overArg(Object.keys, Object);
	var DataView = getNative(root, "DataView"), Map = getNative(root, "Map"), Promise = getNative(root, "Promise"), Set = getNative(root, "Set"), WeakMap = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
	/**
	* Creates a hash object.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function Hash(entries) {
		var index = -1, length = entries == null ? 0 : entries.length;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the hash.
	*
	* @private
	* @name clear
	* @memberOf Hash
	*/
	function hashClear() {
		this.__data__ = nativeCreate ? nativeCreate(null) : {};
		this.size = 0;
	}
	/**
	* Removes `key` and its value from the hash.
	*
	* @private
	* @name delete
	* @memberOf Hash
	* @param {Object} hash The hash to modify.
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function hashDelete(key) {
		var result = this.has(key) && delete this.__data__[key];
		this.size -= result ? 1 : 0;
		return result;
	}
	/**
	* Gets the hash value for `key`.
	*
	* @private
	* @name get
	* @memberOf Hash
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function hashGet(key) {
		var data = this.__data__;
		if (nativeCreate) {
			var result = data[key];
			return result === HASH_UNDEFINED ? void 0 : result;
		}
		return hasOwnProperty.call(data, key) ? data[key] : void 0;
	}
	/**
	* Checks if a hash value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf Hash
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function hashHas(key) {
		var data = this.__data__;
		return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
	}
	/**
	* Sets the hash `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf Hash
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the hash instance.
	*/
	function hashSet(key, value) {
		var data = this.__data__;
		this.size += this.has(key) ? 0 : 1;
		data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
		return this;
	}
	Hash.prototype.clear = hashClear;
	Hash.prototype["delete"] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	/**
	* Creates an list cache object.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function ListCache(entries) {
		var index = -1, length = entries == null ? 0 : entries.length;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the list cache.
	*
	* @private
	* @name clear
	* @memberOf ListCache
	*/
	function listCacheClear() {
		this.__data__ = [];
		this.size = 0;
	}
	/**
	* Removes `key` and its value from the list cache.
	*
	* @private
	* @name delete
	* @memberOf ListCache
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function listCacheDelete(key) {
		var data = this.__data__, index = assocIndexOf(data, key);
		if (index < 0) return false;
		if (index == data.length - 1) data.pop();
		else splice.call(data, index, 1);
		--this.size;
		return true;
	}
	/**
	* Gets the list cache value for `key`.
	*
	* @private
	* @name get
	* @memberOf ListCache
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function listCacheGet(key) {
		var data = this.__data__, index = assocIndexOf(data, key);
		return index < 0 ? void 0 : data[index][1];
	}
	/**
	* Checks if a list cache value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf ListCache
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function listCacheHas(key) {
		return assocIndexOf(this.__data__, key) > -1;
	}
	/**
	* Sets the list cache `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf ListCache
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the list cache instance.
	*/
	function listCacheSet(key, value) {
		var data = this.__data__, index = assocIndexOf(data, key);
		if (index < 0) {
			++this.size;
			data.push([key, value]);
		} else data[index][1] = value;
		return this;
	}
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype["delete"] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	/**
	* Creates a map cache object to store key-value pairs.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function MapCache(entries) {
		var index = -1, length = entries == null ? 0 : entries.length;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the map.
	*
	* @private
	* @name clear
	* @memberOf MapCache
	*/
	function mapCacheClear() {
		this.size = 0;
		this.__data__ = {
			"hash": new Hash(),
			"map": new (Map || ListCache)(),
			"string": new Hash()
		};
	}
	/**
	* Removes `key` and its value from the map.
	*
	* @private
	* @name delete
	* @memberOf MapCache
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function mapCacheDelete(key) {
		var result = getMapData(this, key)["delete"](key);
		this.size -= result ? 1 : 0;
		return result;
	}
	/**
	* Gets the map value for `key`.
	*
	* @private
	* @name get
	* @memberOf MapCache
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function mapCacheGet(key) {
		return getMapData(this, key).get(key);
	}
	/**
	* Checks if a map value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf MapCache
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function mapCacheHas(key) {
		return getMapData(this, key).has(key);
	}
	/**
	* Sets the map `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf MapCache
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the map cache instance.
	*/
	function mapCacheSet(key, value) {
		var data = getMapData(this, key), size = data.size;
		data.set(key, value);
		this.size += data.size == size ? 0 : 1;
		return this;
	}
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype["delete"] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	/**
	*
	* Creates an array cache object to store unique values.
	*
	* @private
	* @constructor
	* @param {Array} [values] The values to cache.
	*/
	function SetCache(values) {
		var index = -1, length = values == null ? 0 : values.length;
		this.__data__ = new MapCache();
		while (++index < length) this.add(values[index]);
	}
	/**
	* Adds `value` to the array cache.
	*
	* @private
	* @name add
	* @memberOf SetCache
	* @alias push
	* @param {*} value The value to cache.
	* @returns {Object} Returns the cache instance.
	*/
	function setCacheAdd(value) {
		this.__data__.set(value, HASH_UNDEFINED);
		return this;
	}
	/**
	* Checks if `value` is in the array cache.
	*
	* @private
	* @name has
	* @memberOf SetCache
	* @param {*} value The value to search for.
	* @returns {number} Returns `true` if `value` is found, else `false`.
	*/
	function setCacheHas(value) {
		return this.__data__.has(value);
	}
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	/**
	* Creates a stack cache object to store key-value pairs.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function Stack(entries) {
		var data = this.__data__ = new ListCache(entries);
		this.size = data.size;
	}
	/**
	* Removes all key-value entries from the stack.
	*
	* @private
	* @name clear
	* @memberOf Stack
	*/
	function stackClear() {
		this.__data__ = new ListCache();
		this.size = 0;
	}
	/**
	* Removes `key` and its value from the stack.
	*
	* @private
	* @name delete
	* @memberOf Stack
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function stackDelete(key) {
		var data = this.__data__, result = data["delete"](key);
		this.size = data.size;
		return result;
	}
	/**
	* Gets the stack value for `key`.
	*
	* @private
	* @name get
	* @memberOf Stack
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function stackGet(key) {
		return this.__data__.get(key);
	}
	/**
	* Checks if a stack value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf Stack
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function stackHas(key) {
		return this.__data__.has(key);
	}
	/**
	* Sets the stack `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf Stack
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the stack cache instance.
	*/
	function stackSet(key, value) {
		var data = this.__data__;
		if (data instanceof ListCache) {
			var pairs = data.__data__;
			if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
				pairs.push([key, value]);
				this.size = ++data.size;
				return this;
			}
			data = this.__data__ = new MapCache(pairs);
		}
		data.set(key, value);
		this.size = data.size;
		return this;
	}
	Stack.prototype.clear = stackClear;
	Stack.prototype["delete"] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	/**
	* Creates an array of the enumerable property names of the array-like `value`.
	*
	* @private
	* @param {*} value The value to query.
	* @param {boolean} inherited Specify returning inherited property names.
	* @returns {Array} Returns the array of property names.
	*/
	function arrayLikeKeys(value, inherited) {
		var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
		for (var key in value) if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) result.push(key);
		return result;
	}
	/**
	* Gets the index at which the `key` is found in `array` of key-value pairs.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {*} key The key to search for.
	* @returns {number} Returns the index of the matched value, else `-1`.
	*/
	function assocIndexOf(array, key) {
		var length = array.length;
		while (length--) if (eq(array[length][0], key)) return length;
		return -1;
	}
	/**
	* The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	* `keysFunc` and `symbolsFunc` to get the enumerable property names and
	* symbols of `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @param {Function} keysFunc The function to get the keys of `object`.
	* @param {Function} symbolsFunc The function to get the symbols of `object`.
	* @returns {Array} Returns the array of property names and symbols.
	*/
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
		var result = keysFunc(object);
		return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}
	/**
	* The base implementation of `getTag` without fallbacks for buggy environments.
	*
	* @private
	* @param {*} value The value to query.
	* @returns {string} Returns the `toStringTag`.
	*/
	function baseGetTag(value) {
		if (value == null) return value === void 0 ? undefinedTag : nullTag;
		return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
	}
	/**
	* The base implementation of `_.isArguments`.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an `arguments` object,
	*/
	function baseIsArguments(value) {
		return isObjectLike(value) && baseGetTag(value) == argsTag;
	}
	/**
	* The base implementation of `_.isEqual` which supports partial comparisons
	* and tracks traversed objects.
	*
	* @private
	* @param {*} value The value to compare.
	* @param {*} other The other value to compare.
	* @param {boolean} bitmask The bitmask flags.
	*  1 - Unordered comparison
	*  2 - Partial comparison
	* @param {Function} [customizer] The function to customize comparisons.
	* @param {Object} [stack] Tracks traversed `value` and `other` objects.
	* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	*/
	function baseIsEqual(value, other, bitmask, customizer, stack) {
		if (value === other) return true;
		if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) return value !== value && other !== other;
		return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}
	/**
	* A specialized version of `baseIsEqual` for arrays and objects which performs
	* deep comparisons and tracks traversed objects enabling objects with circular
	* references to be compared.
	*
	* @private
	* @param {Object} object The object to compare.
	* @param {Object} other The other object to compare.
	* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	* @param {Function} customizer The function to customize comparisons.
	* @param {Function} equalFunc The function to determine equivalents of values.
	* @param {Object} [stack] Tracks traversed `object` and `other` objects.
	* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	*/
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
		var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
		objTag = objTag == argsTag ? objectTag : objTag;
		othTag = othTag == argsTag ? objectTag : othTag;
		var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
		if (isSameTag && isBuffer(object)) {
			if (!isBuffer(other)) return false;
			objIsArr = true;
			objIsObj = false;
		}
		if (isSameTag && !objIsObj) {
			stack || (stack = new Stack());
			return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
		}
		if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
			var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
			if (objIsWrapped || othIsWrapped) {
				var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
				stack || (stack = new Stack());
				return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
			}
		}
		if (!isSameTag) return false;
		stack || (stack = new Stack());
		return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}
	/**
	* The base implementation of `_.isNative` without bad shim checks.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a native function,
	*  else `false`.
	*/
	function baseIsNative(value) {
		if (!isObject(value) || isMasked(value)) return false;
		return (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value));
	}
	/**
	* The base implementation of `_.isTypedArray` without Node.js optimizations.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	*/
	function baseIsTypedArray(value) {
		return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}
	/**
	* The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	*/
	function baseKeys(object) {
		if (!isPrototype(object)) return nativeKeys(object);
		var result = [];
		for (var key in Object(object)) if (hasOwnProperty.call(object, key) && key != "constructor") result.push(key);
		return result;
	}
	/**
	* A specialized version of `baseIsEqualDeep` for arrays with support for
	* partial deep comparisons.
	*
	* @private
	* @param {Array} array The array to compare.
	* @param {Array} other The other array to compare.
	* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	* @param {Function} customizer The function to customize comparisons.
	* @param {Function} equalFunc The function to determine equivalents of values.
	* @param {Object} stack Tracks traversed `array` and `other` objects.
	* @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	*/
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
		var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
		if (arrLength != othLength && !(isPartial && othLength > arrLength)) return false;
		var stacked = stack.get(array);
		if (stacked && stack.get(other)) return stacked == other;
		var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
		stack.set(array, other);
		stack.set(other, array);
		while (++index < arrLength) {
			var arrValue = array[index], othValue = other[index];
			if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
			if (compared !== void 0) {
				if (compared) continue;
				result = false;
				break;
			}
			if (seen) {
				if (!arraySome(other, function(othValue, othIndex) {
					if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) return seen.push(othIndex);
				})) {
					result = false;
					break;
				}
			} else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
				result = false;
				break;
			}
		}
		stack["delete"](array);
		stack["delete"](other);
		return result;
	}
	/**
	* A specialized version of `baseIsEqualDeep` for comparing objects of
	* the same `toStringTag`.
	*
	* **Note:** This function only supports comparing values with tags of
	* `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	*
	* @private
	* @param {Object} object The object to compare.
	* @param {Object} other The other object to compare.
	* @param {string} tag The `toStringTag` of the objects to compare.
	* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	* @param {Function} customizer The function to customize comparisons.
	* @param {Function} equalFunc The function to determine equivalents of values.
	* @param {Object} stack Tracks traversed `object` and `other` objects.
	* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	*/
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
		switch (tag) {
			case dataViewTag:
				if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return false;
				object = object.buffer;
				other = other.buffer;
			case arrayBufferTag:
				if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) return false;
				return true;
			case boolTag:
			case dateTag:
			case numberTag: return eq(+object, +other);
			case errorTag: return object.name == other.name && object.message == other.message;
			case regexpTag:
			case stringTag: return object == other + "";
			case mapTag: var convert = mapToArray;
			case setTag:
				var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
				convert || (convert = setToArray);
				if (object.size != other.size && !isPartial) return false;
				var stacked = stack.get(object);
				if (stacked) return stacked == other;
				bitmask |= COMPARE_UNORDERED_FLAG;
				stack.set(object, other);
				var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
				stack["delete"](object);
				return result;
			case symbolTag: if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
		}
		return false;
	}
	/**
	* A specialized version of `baseIsEqualDeep` for objects with support for
	* partial deep comparisons.
	*
	* @private
	* @param {Object} object The object to compare.
	* @param {Object} other The other object to compare.
	* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	* @param {Function} customizer The function to customize comparisons.
	* @param {Function} equalFunc The function to determine equivalents of values.
	* @param {Object} stack Tracks traversed `object` and `other` objects.
	* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	*/
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
		var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length;
		if (objLength != getAllKeys(other).length && !isPartial) return false;
		var index = objLength;
		while (index--) {
			var key = objProps[index];
			if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) return false;
		}
		var stacked = stack.get(object);
		if (stacked && stack.get(other)) return stacked == other;
		var result = true;
		stack.set(object, other);
		stack.set(other, object);
		var skipCtor = isPartial;
		while (++index < objLength) {
			key = objProps[index];
			var objValue = object[key], othValue = other[key];
			if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
			if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
				result = false;
				break;
			}
			skipCtor || (skipCtor = key == "constructor");
		}
		if (result && !skipCtor) {
			var objCtor = object.constructor, othCtor = other.constructor;
			if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) result = false;
		}
		stack["delete"](object);
		stack["delete"](other);
		return result;
	}
	/**
	* Creates an array of own enumerable property names and symbols of `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names and symbols.
	*/
	function getAllKeys(object) {
		return baseGetAllKeys(object, keys, getSymbols);
	}
	/**
	* Gets the data for `map`.
	*
	* @private
	* @param {Object} map The map to query.
	* @param {string} key The reference key.
	* @returns {*} Returns the map data.
	*/
	function getMapData(map, key) {
		var data = map.__data__;
		return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
	}
	/**
	* Gets the native function at `key` of `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @param {string} key The key of the method to get.
	* @returns {*} Returns the function if it's native, else `undefined`.
	*/
	function getNative(object, key) {
		var value = getValue(object, key);
		return baseIsNative(value) ? value : void 0;
	}
	/**
	* A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	*
	* @private
	* @param {*} value The value to query.
	* @returns {string} Returns the raw `toStringTag`.
	*/
	function getRawTag(value) {
		var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
		try {
			value[symToStringTag] = void 0;
			var unmasked = true;
		} catch (e) {}
		var result = nativeObjectToString.call(value);
		if (unmasked) if (isOwn) value[symToStringTag] = tag;
		else delete value[symToStringTag];
		return result;
	}
	/**
	* Creates an array of the own enumerable symbols of `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of symbols.
	*/
	var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
		if (object == null) return [];
		object = Object(object);
		return arrayFilter(nativeGetSymbols(object), function(symbol) {
			return propertyIsEnumerable.call(object, symbol);
		});
	};
	/**
	* Gets the `toStringTag` of `value`.
	*
	* @private
	* @param {*} value The value to query.
	* @returns {string} Returns the `toStringTag`.
	*/
	var getTag = baseGetTag;
	if (DataView && getTag(new DataView(/* @__PURE__ */ new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) getTag = function(value) {
		var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
		if (ctorString) switch (ctorString) {
			case dataViewCtorString: return dataViewTag;
			case mapCtorString: return mapTag;
			case promiseCtorString: return promiseTag;
			case setCtorString: return setTag;
			case weakMapCtorString: return weakMapTag;
		}
		return result;
	};
	/**
	* Checks if `value` is a valid array-like index.
	*
	* @private
	* @param {*} value The value to check.
	* @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	* @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	*/
	function isIndex(value, length) {
		length = length == null ? MAX_SAFE_INTEGER : length;
		return !!length && (typeof value == "number" || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}
	/**
	* Checks if `value` is suitable for use as unique object key.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	*/
	function isKeyable(value) {
		var type = typeof value;
		return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
	}
	/**
	* Checks if `func` has its source masked.
	*
	* @private
	* @param {Function} func The function to check.
	* @returns {boolean} Returns `true` if `func` is masked, else `false`.
	*/
	function isMasked(func) {
		return !!maskSrcKey && maskSrcKey in func;
	}
	/**
	* Checks if `value` is likely a prototype object.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	*/
	function isPrototype(value) {
		var Ctor = value && value.constructor;
		return value === (typeof Ctor == "function" && Ctor.prototype || objectProto);
	}
	/**
	* Converts `value` to a string using `Object.prototype.toString`.
	*
	* @private
	* @param {*} value The value to convert.
	* @returns {string} Returns the converted string.
	*/
	function objectToString(value) {
		return nativeObjectToString.call(value);
	}
	/**
	* Converts `func` to its source code.
	*
	* @private
	* @param {Function} func The function to convert.
	* @returns {string} Returns the source code.
	*/
	function toSource(func) {
		if (func != null) {
			try {
				return funcToString.call(func);
			} catch (e) {}
			try {
				return func + "";
			} catch (e) {}
		}
		return "";
	}
	/**
	* Performs a
	* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	* comparison between two values to determine if they are equivalent.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to compare.
	* @param {*} other The other value to compare.
	* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	* @example
	*
	* var object = { 'a': 1 };
	* var other = { 'a': 1 };
	*
	* _.eq(object, object);
	* // => true
	*
	* _.eq(object, other);
	* // => false
	*
	* _.eq('a', 'a');
	* // => true
	*
	* _.eq('a', Object('a'));
	* // => false
	*
	* _.eq(NaN, NaN);
	* // => true
	*/
	function eq(value, other) {
		return value === other || value !== value && other !== other;
	}
	/**
	* Checks if `value` is likely an `arguments` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an `arguments` object,
	*  else `false`.
	* @example
	*
	* _.isArguments(function() { return arguments; }());
	* // => true
	*
	* _.isArguments([1, 2, 3]);
	* // => false
	*/
	var isArguments = baseIsArguments(function() {
		return arguments;
	}()) ? baseIsArguments : function(value) {
		return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
	};
	/**
	* Checks if `value` is classified as an `Array` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an array, else `false`.
	* @example
	*
	* _.isArray([1, 2, 3]);
	* // => true
	*
	* _.isArray(document.body.children);
	* // => false
	*
	* _.isArray('abc');
	* // => false
	*
	* _.isArray(_.noop);
	* // => false
	*/
	var isArray = Array.isArray;
	/**
	* Checks if `value` is array-like. A value is considered array-like if it's
	* not a function and has a `value.length` that's an integer greater than or
	* equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	* @example
	*
	* _.isArrayLike([1, 2, 3]);
	* // => true
	*
	* _.isArrayLike(document.body.children);
	* // => true
	*
	* _.isArrayLike('abc');
	* // => true
	*
	* _.isArrayLike(_.noop);
	* // => false
	*/
	function isArrayLike(value) {
		return value != null && isLength(value.length) && !isFunction(value);
	}
	/**
	* Checks if `value` is a buffer.
	*
	* @static
	* @memberOf _
	* @since 4.3.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	* @example
	*
	* _.isBuffer(new Buffer(2));
	* // => true
	*
	* _.isBuffer(new Uint8Array(2));
	* // => false
	*/
	var isBuffer = nativeIsBuffer || stubFalse;
	/**
	* Performs a deep comparison between two values to determine if they are
	* equivalent.
	*
	* **Note:** This method supports comparing arrays, array buffers, booleans,
	* date objects, error objects, maps, numbers, `Object` objects, regexes,
	* sets, strings, symbols, and typed arrays. `Object` objects are compared
	* by their own, not inherited, enumerable properties. Functions and DOM
	* nodes are compared by strict equality, i.e. `===`.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to compare.
	* @param {*} other The other value to compare.
	* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	* @example
	*
	* var object = { 'a': 1 };
	* var other = { 'a': 1 };
	*
	* _.isEqual(object, other);
	* // => true
	*
	* object === other;
	* // => false
	*/
	function isEqual(value, other) {
		return baseIsEqual(value, other);
	}
	/**
	* Checks if `value` is classified as a `Function` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a function, else `false`.
	* @example
	*
	* _.isFunction(_);
	* // => true
	*
	* _.isFunction(/abc/);
	* // => false
	*/
	function isFunction(value) {
		if (!isObject(value)) return false;
		var tag = baseGetTag(value);
		return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}
	/**
	* Checks if `value` is a valid array-like length.
	*
	* **Note:** This method is loosely based on
	* [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	* @example
	*
	* _.isLength(3);
	* // => true
	*
	* _.isLength(Number.MIN_VALUE);
	* // => false
	*
	* _.isLength(Infinity);
	* // => false
	*
	* _.isLength('3');
	* // => false
	*/
	function isLength(value) {
		return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	/**
	* Checks if `value` is the
	* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an object, else `false`.
	* @example
	*
	* _.isObject({});
	* // => true
	*
	* _.isObject([1, 2, 3]);
	* // => true
	*
	* _.isObject(_.noop);
	* // => true
	*
	* _.isObject(null);
	* // => false
	*/
	function isObject(value) {
		var type = typeof value;
		return value != null && (type == "object" || type == "function");
	}
	/**
	* Checks if `value` is object-like. A value is object-like if it's not `null`
	* and has a `typeof` result of "object".
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	* @example
	*
	* _.isObjectLike({});
	* // => true
	*
	* _.isObjectLike([1, 2, 3]);
	* // => true
	*
	* _.isObjectLike(_.noop);
	* // => false
	*
	* _.isObjectLike(null);
	* // => false
	*/
	function isObjectLike(value) {
		return value != null && typeof value == "object";
	}
	/**
	* Checks if `value` is classified as a typed array.
	*
	* @static
	* @memberOf _
	* @since 3.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	* @example
	*
	* _.isTypedArray(new Uint8Array);
	* // => true
	*
	* _.isTypedArray([]);
	* // => false
	*/
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	/**
	* Creates an array of the own enumerable property names of `object`.
	*
	* **Note:** Non-object values are coerced to objects. See the
	* [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	* for more details.
	*
	* @static
	* @since 0.1.0
	* @memberOf _
	* @category Object
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	* @example
	*
	* function Foo() {
	*   this.a = 1;
	*   this.b = 2;
	* }
	*
	* Foo.prototype.c = 3;
	*
	* _.keys(new Foo);
	* // => ['a', 'b'] (iteration order is not guaranteed)
	*
	* _.keys('hi');
	* // => ['0', '1']
	*/
	function keys(object) {
		return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	/**
	* This method returns a new empty array.
	*
	* @static
	* @memberOf _
	* @since 4.13.0
	* @category Util
	* @returns {Array} Returns the new empty array.
	* @example
	*
	* var arrays = _.times(2, _.stubArray);
	*
	* console.log(arrays);
	* // => [[], []]
	*
	* console.log(arrays[0] === arrays[1]);
	* // => false
	*/
	function stubArray() {
		return [];
	}
	/**
	* This method returns `false`.
	*
	* @static
	* @memberOf _
	* @since 4.13.0
	* @category Util
	* @returns {boolean} Returns `false`.
	* @example
	*
	* _.times(2, _.stubFalse);
	* // => [false, false]
	*/
	function stubFalse() {
		return false;
	}
	module.exports = isEqual;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/DownloadedUpdateHelper.js
var require_DownloadedUpdateHelper = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DownloadedUpdateHelper = void 0;
	exports.createTempUpdateFile = createTempUpdateFile;
	var crypto_1$2 = __require("crypto");
	var fs_1$4 = __require("fs");
	var isEqual = require_lodash_isequal();
	var fs_extra_1 = require_lib();
	var path$9 = __require("path");
	/** @private **/
	var DownloadedUpdateHelper = class {
		constructor(cacheDir) {
			this.cacheDir = cacheDir;
			this._file = null;
			this._packageFile = null;
			this.versionInfo = null;
			this.fileInfo = null;
			this._downloadedFileInfo = null;
		}
		get downloadedFileInfo() {
			return this._downloadedFileInfo;
		}
		get file() {
			return this._file;
		}
		get packageFile() {
			return this._packageFile;
		}
		get cacheDirForPendingUpdate() {
			return path$9.join(this.cacheDir, "pending");
		}
		async validateDownloadedPath(updateFile, updateInfo, fileInfo, logger) {
			if (this.versionInfo != null && this.file === updateFile && this.fileInfo != null) if (isEqual(this.versionInfo, updateInfo) && isEqual(this.fileInfo.info, fileInfo.info) && await (0, fs_extra_1.pathExists)(updateFile)) return updateFile;
			else return null;
			const cachedUpdateFile = await this.getValidCachedUpdateFile(fileInfo, logger);
			if (cachedUpdateFile === null) return null;
			logger.info(`Update has already been downloaded to ${updateFile}).`);
			this._file = cachedUpdateFile;
			return cachedUpdateFile;
		}
		async setDownloadedFile(downloadedFile, packageFile, versionInfo, fileInfo, updateFileName, isSaveCache) {
			this._file = downloadedFile;
			this._packageFile = packageFile;
			this.versionInfo = versionInfo;
			this.fileInfo = fileInfo;
			this._downloadedFileInfo = {
				fileName: updateFileName,
				sha512: fileInfo.info.sha512,
				isAdminRightsRequired: fileInfo.info.isAdminRightsRequired === true
			};
			if (isSaveCache) await (0, fs_extra_1.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
		}
		async clear() {
			this._file = null;
			this._packageFile = null;
			this.versionInfo = null;
			this.fileInfo = null;
			await this.cleanCacheDirForPendingUpdate();
		}
		async cleanCacheDirForPendingUpdate() {
			try {
				await (0, fs_extra_1.emptyDir)(this.cacheDirForPendingUpdate);
			} catch (_ignore) {}
		}
		/**
		* Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
		* @param fileInfo
		* @param logger
		*/
		async getValidCachedUpdateFile(fileInfo, logger) {
			const updateInfoFilePath = this.getUpdateInfoFile();
			if (!await (0, fs_extra_1.pathExists)(updateInfoFilePath)) return null;
			let cachedInfo;
			try {
				cachedInfo = await (0, fs_extra_1.readJson)(updateInfoFilePath);
			} catch (error) {
				let message = `No cached update info available`;
				if (error.code !== "ENOENT") {
					await this.cleanCacheDirForPendingUpdate();
					message += ` (error on read: ${error.message})`;
				}
				logger.info(message);
				return null;
			}
			if (!((cachedInfo === null || cachedInfo === void 0 ? void 0 : cachedInfo.fileName) !== null)) {
				logger.warn(`Cached update info is corrupted: no fileName, directory for cached update will be cleaned`);
				await this.cleanCacheDirForPendingUpdate();
				return null;
			}
			if (fileInfo.info.sha512 !== cachedInfo.sha512) {
				logger.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${cachedInfo.sha512}, expected: ${fileInfo.info.sha512}. Directory for cached update will be cleaned`);
				await this.cleanCacheDirForPendingUpdate();
				return null;
			}
			const updateFile = path$9.join(this.cacheDirForPendingUpdate, cachedInfo.fileName);
			if (!await (0, fs_extra_1.pathExists)(updateFile)) {
				logger.info("Cached update file doesn't exist");
				return null;
			}
			const sha512 = await hashFile(updateFile);
			if (fileInfo.info.sha512 !== sha512) {
				logger.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${sha512}, expected: ${fileInfo.info.sha512}`);
				await this.cleanCacheDirForPendingUpdate();
				return null;
			}
			this._downloadedFileInfo = cachedInfo;
			return updateFile;
		}
		getUpdateInfoFile() {
			return path$9.join(this.cacheDirForPendingUpdate, "update-info.json");
		}
	};
	exports.DownloadedUpdateHelper = DownloadedUpdateHelper;
	function hashFile(file, algorithm = "sha512", encoding = "base64", options) {
		return new Promise((resolve, reject) => {
			const hash = (0, crypto_1$2.createHash)(algorithm);
			hash.on("error", reject).setEncoding(encoding);
			(0, fs_1$4.createReadStream)(file, {
				...options,
				highWaterMark: 1024 * 1024
			}).on("error", reject).on("end", () => {
				hash.end();
				resolve(hash.read());
			}).pipe(hash, { end: false });
		});
	}
	async function createTempUpdateFile(name, cacheDir, log) {
		let nameCounter = 0;
		let result = path$9.join(cacheDir, name);
		for (let i = 0; i < 3; i++) try {
			await (0, fs_extra_1.unlink)(result);
			return result;
		} catch (e) {
			if (e.code === "ENOENT") return result;
			log.warn(`Error on remove temp update file: ${e}`);
			result = path$9.join(cacheDir, `${nameCounter++}-${name}`);
		}
		return result;
	}
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/AppAdapter.js
var require_AppAdapter = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getAppCacheDir = getAppCacheDir;
	var path$8 = __require("path");
	var os_1$1 = __require("os");
	function getAppCacheDir() {
		const homedir = (0, os_1$1.homedir)();
		let result;
		if (process.platform === "win32") result = process.env["LOCALAPPDATA"] || path$8.join(homedir, "AppData", "Local");
		else if (process.platform === "darwin") result = path$8.join(homedir, "Library", "Caches");
		else result = process.env["XDG_CACHE_HOME"] || path$8.join(homedir, ".cache");
		return result;
	}
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/ElectronAppAdapter.js
var require_ElectronAppAdapter = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ElectronAppAdapter = void 0;
	var path$7 = __require("path");
	var AppAdapter_1 = require_AppAdapter();
	var ElectronAppAdapter = class {
		constructor(app = __require("electron").app) {
			this.app = app;
		}
		whenReady() {
			return this.app.whenReady();
		}
		get version() {
			return this.app.getVersion();
		}
		get name() {
			return this.app.getName();
		}
		get isPackaged() {
			return this.app.isPackaged === true;
		}
		get appUpdateConfigPath() {
			return this.isPackaged ? path$7.join(process.resourcesPath, "app-update.yml") : path$7.join(this.app.getAppPath(), "dev-app-update.yml");
		}
		get userDataPath() {
			return this.app.getPath("userData");
		}
		get baseCachePath() {
			return (0, AppAdapter_1.getAppCacheDir)();
		}
		quit() {
			this.app.quit();
		}
		relaunch() {
			this.app.relaunch();
		}
		onQuit(handler) {
			this.app.once("quit", (_, exitCode) => handler(exitCode));
		}
	};
	exports.ElectronAppAdapter = ElectronAppAdapter;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/electronHttpExecutor.js
var require_electronHttpExecutor = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ElectronHttpExecutor = exports.NET_SESSION_NAME = void 0;
	exports.getNetSession = getNetSession;
	var builder_util_runtime_1 = require_out();
	exports.NET_SESSION_NAME = "electron-updater";
	function getNetSession() {
		return __require("electron").session.fromPartition(exports.NET_SESSION_NAME, { cache: false });
	}
	var ElectronHttpExecutor = class extends builder_util_runtime_1.HttpExecutor {
		constructor(proxyLoginCallback) {
			super();
			this.proxyLoginCallback = proxyLoginCallback;
			this.cachedSession = null;
		}
		async download(url, destination, options) {
			return await options.cancellationToken.createPromise((resolve, reject, onCancel) => {
				const requestOptions = {
					headers: options.headers || void 0,
					redirect: "manual"
				};
				(0, builder_util_runtime_1.configureRequestUrl)(url, requestOptions);
				(0, builder_util_runtime_1.configureRequestOptions)(requestOptions);
				this.doDownload(requestOptions, {
					destination,
					options,
					onCancel,
					callback: (error) => {
						if (error == null) resolve(destination);
						else reject(error);
					},
					responseHandler: null
				}, 0);
			});
		}
		createRequest(options, callback) {
			if (options.headers && options.headers.Host) {
				options.host = options.headers.Host;
				delete options.headers.Host;
			}
			if (this.cachedSession == null) this.cachedSession = getNetSession();
			const request = __require("electron").net.request({
				...options,
				session: this.cachedSession
			});
			request.on("response", callback);
			if (this.proxyLoginCallback != null) request.on("login", this.proxyLoginCallback);
			return request;
		}
		addRedirectHandlers(request, options, reject, redirectCount, handler) {
			request.on("redirect", (statusCode, method, redirectUrl) => {
				request.abort();
				if (redirectCount > this.maxRedirects) reject(this.createMaxRedirectError());
				else handler(builder_util_runtime_1.HttpExecutor.prepareRedirectUrlOptions(redirectUrl, options));
			});
		}
	};
	exports.ElectronHttpExecutor = ElectronHttpExecutor;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.newBaseUrl = newBaseUrl;
	exports.newUrlFromBase = newUrlFromBase;
	exports.getChannelFilename = getChannelFilename;
	var url_1$6 = __require("url");
	/** @internal */
	function newBaseUrl(url) {
		const result = new url_1$6.URL(url);
		if (!result.pathname.endsWith("/")) result.pathname += "/";
		return result;
	}
	function newUrlFromBase(pathname, baseUrl, addRandomQueryToAvoidCaching = false) {
		const result = new url_1$6.URL(pathname, baseUrl);
		const search = baseUrl.search;
		if (search != null && search.length !== 0) result.search = search;
		else if (addRandomQueryToAvoidCaching) result.search = `noCache=${Date.now().toString(32)}`;
		return result;
	}
	function getChannelFilename(channel) {
		return `${channel}.yml`;
	}
}));
//#endregion
//#region ../../node_modules/.bun/lodash.escaperegexp@4.1.2/node_modules/lodash.escaperegexp/index.js
var require_lodash_escaperegexp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* lodash (Custom Build) <https://lodash.com/>
	* Build: `lodash modularize exports="npm" -o ./`
	* Copyright jQuery Foundation and other contributors <https://jquery.org/>
	* Released under MIT license <https://lodash.com/license>
	* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	*/
	/** Used as references for various `Number` constants. */
	var INFINITY = Infinity;
	/** `Object#toString` result references. */
	var symbolTag = "[object Symbol]";
	/**
	* Used to match `RegExp`
	* [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	*/
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
	/** Detect free variable `self`. */
	var freeSelf = typeof self == "object" && self && self.Object === Object && self;
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function("return this")();
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var objectToString = Object.prototype.toString;
	/** Built-in value references. */
	var Symbol = root.Symbol;
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
	/**
	* The base implementation of `_.toString` which doesn't convert nullish
	* values to empty strings.
	*
	* @private
	* @param {*} value The value to process.
	* @returns {string} Returns the string.
	*/
	function baseToString(value) {
		if (typeof value == "string") return value;
		if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
		var result = value + "";
		return result == "0" && 1 / value == -INFINITY ? "-0" : result;
	}
	/**
	* Checks if `value` is object-like. A value is object-like if it's not `null`
	* and has a `typeof` result of "object".
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	* @example
	*
	* _.isObjectLike({});
	* // => true
	*
	* _.isObjectLike([1, 2, 3]);
	* // => true
	*
	* _.isObjectLike(_.noop);
	* // => false
	*
	* _.isObjectLike(null);
	* // => false
	*/
	function isObjectLike(value) {
		return !!value && typeof value == "object";
	}
	/**
	* Checks if `value` is classified as a `Symbol` primitive or object.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	* @example
	*
	* _.isSymbol(Symbol.iterator);
	* // => true
	*
	* _.isSymbol('abc');
	* // => false
	*/
	function isSymbol(value) {
		return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}
	/**
	* Converts `value` to a string. An empty string is returned for `null`
	* and `undefined` values. The sign of `-0` is preserved.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to process.
	* @returns {string} Returns the string.
	* @example
	*
	* _.toString(null);
	* // => ''
	*
	* _.toString(-0);
	* // => '-0'
	*
	* _.toString([1, 2, 3]);
	* // => '1,2,3'
	*/
	function toString(value) {
		return value == null ? "" : baseToString(value);
	}
	/**
	* Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
	* "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
	*
	* @static
	* @memberOf _
	* @since 3.0.0
	* @category String
	* @param {string} [string=''] The string to escape.
	* @returns {string} Returns the escaped string.
	* @example
	*
	* _.escapeRegExp('[lodash](https://lodash.com/)');
	* // => '\[lodash\]\(https://lodash\.com/\)'
	*/
	function escapeRegExp(string) {
		string = toString(string);
		return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
	}
	module.exports = escapeRegExp;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/providers/Provider.js
var require_Provider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Provider = void 0;
	exports.findFile = findFile;
	exports.parseUpdateInfo = parseUpdateInfo;
	exports.getFileList = getFileList;
	exports.resolveFiles = resolveFiles;
	var builder_util_runtime_1 = require_out();
	var js_yaml_1 = require_js_yaml();
	var url_1$5 = __require("url");
	var util_1 = require_util();
	var escapeRegExp = require_lodash_escaperegexp();
	var Provider = class {
		constructor(runtimeOptions) {
			this.runtimeOptions = runtimeOptions;
			this.requestHeaders = null;
			this.executor = runtimeOptions.executor;
		}
		getBlockMapFiles(baseUrl, oldVersion, newVersion, oldBlockMapFileBaseUrl = null) {
			const newBlockMapUrl = (0, util_1.newUrlFromBase)(`${baseUrl.pathname}.blockmap`, baseUrl);
			return [(0, util_1.newUrlFromBase)(`${baseUrl.pathname.replace(new RegExp(escapeRegExp(newVersion), "g"), oldVersion)}.blockmap`, oldBlockMapFileBaseUrl ? new url_1$5.URL(oldBlockMapFileBaseUrl) : baseUrl), newBlockMapUrl];
		}
		get isUseMultipleRangeRequest() {
			return this.runtimeOptions.isUseMultipleRangeRequest !== false;
		}
		getChannelFilePrefix() {
			if (this.runtimeOptions.platform === "linux") {
				const arch = process.env["TEST_UPDATER_ARCH"] || process.arch;
				return "-linux" + (arch === "x64" ? "" : `-${arch}`);
			} else return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
		}
		getDefaultChannelName() {
			return this.getCustomChannelName("latest");
		}
		getCustomChannelName(channel) {
			return `${channel}${this.getChannelFilePrefix()}`;
		}
		get fileExtraDownloadHeaders() {
			return null;
		}
		setRequestHeaders(value) {
			this.requestHeaders = value;
		}
		/**
		* Method to perform API request only to resolve update info, but not to download update.
		*/
		httpRequest(url, headers, cancellationToken) {
			return this.executor.request(this.createRequestOptions(url, headers), cancellationToken);
		}
		createRequestOptions(url, headers) {
			const result = {};
			if (this.requestHeaders == null) {
				if (headers != null) result.headers = headers;
			} else result.headers = headers == null ? this.requestHeaders : {
				...this.requestHeaders,
				...headers
			};
			(0, builder_util_runtime_1.configureRequestUrl)(url, result);
			return result;
		}
	};
	exports.Provider = Provider;
	function findFile(files, extension, not) {
		var _a;
		if (files.length === 0) throw (0, builder_util_runtime_1.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
		const filteredFiles = files.filter((it) => it.url.pathname.toLowerCase().endsWith(`.${extension.toLowerCase()}`));
		const result = (_a = filteredFiles.find((it) => [it.url.pathname, it.info.url].some((n) => n.includes(process.arch)))) !== null && _a !== void 0 ? _a : filteredFiles.shift();
		if (result) return result;
		else if (not == null) return files[0];
		else return files.find((fileInfo) => !not.some((ext) => fileInfo.url.pathname.toLowerCase().endsWith(`.${ext.toLowerCase()}`)));
	}
	function parseUpdateInfo(rawData, channelFile, channelFileUrl) {
		if (rawData == null) throw (0, builder_util_runtime_1.newError)(`Cannot parse update info from ${channelFile} in the latest release artifacts (${channelFileUrl}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
		let result;
		try {
			result = (0, js_yaml_1.load)(rawData);
		} catch (e) {
			throw (0, builder_util_runtime_1.newError)(`Cannot parse update info from ${channelFile} in the latest release artifacts (${channelFileUrl}): ${e.stack || e.message}, rawData: ${rawData}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
		}
		return result;
	}
	function getFileList(updateInfo) {
		const files = updateInfo.files;
		if (files != null && files.length > 0) return files;
		if (updateInfo.path != null) return [{
			url: updateInfo.path,
			sha2: updateInfo.sha2,
			sha512: updateInfo.sha512
		}];
		else throw (0, builder_util_runtime_1.newError)(`No files provided: ${(0, builder_util_runtime_1.safeStringifyJson)(updateInfo)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
	}
	function resolveFiles(updateInfo, baseUrl, pathTransformer = (p) => p) {
		const result = getFileList(updateInfo).map((fileInfo) => {
			if (fileInfo.sha2 == null && fileInfo.sha512 == null) throw (0, builder_util_runtime_1.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, builder_util_runtime_1.safeStringifyJson)(fileInfo)}`, "ERR_UPDATER_NO_CHECKSUM");
			return {
				url: (0, util_1.newUrlFromBase)(pathTransformer(fileInfo.url), baseUrl),
				info: fileInfo
			};
		});
		const packages = updateInfo.packages;
		const packageInfo = packages == null ? null : packages[process.arch] || packages.ia32;
		if (packageInfo != null) result[0].packageInfo = {
			...packageInfo,
			path: (0, util_1.newUrlFromBase)(pathTransformer(packageInfo.path), baseUrl).href
		};
		return result;
	}
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/providers/GenericProvider.js
var require_GenericProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.GenericProvider = void 0;
	var builder_util_runtime_1 = require_out();
	var util_1 = require_util();
	var Provider_1 = require_Provider();
	var GenericProvider = class extends Provider_1.Provider {
		constructor(configuration, updater, runtimeOptions) {
			super(runtimeOptions);
			this.configuration = configuration;
			this.updater = updater;
			this.baseUrl = (0, util_1.newBaseUrl)(this.configuration.url);
		}
		get channel() {
			const result = this.updater.channel || this.configuration.channel;
			return result == null ? this.getDefaultChannelName() : this.getCustomChannelName(result);
		}
		async getLatestVersion() {
			const channelFile = (0, util_1.getChannelFilename)(this.channel);
			const channelUrl = (0, util_1.newUrlFromBase)(channelFile, this.baseUrl, this.updater.isAddNoCacheQuery);
			for (let attemptNumber = 0;; attemptNumber++) try {
				return (0, Provider_1.parseUpdateInfo)(await this.httpRequest(channelUrl), channelFile, channelUrl);
			} catch (e) {
				if (e instanceof builder_util_runtime_1.HttpError && e.statusCode === 404) throw (0, builder_util_runtime_1.newError)(`Cannot find channel "${channelFile}" update info: ${e.stack || e.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
				else if (e.code === "ECONNREFUSED") {
					if (attemptNumber < 3) {
						await new Promise((resolve, reject) => {
							try {
								setTimeout(resolve, 1e3 * attemptNumber);
							} catch (e) {
								reject(e);
							}
						});
						continue;
					}
				}
				throw e;
			}
		}
		resolveFiles(updateInfo) {
			return (0, Provider_1.resolveFiles)(updateInfo, this.baseUrl);
		}
	};
	exports.GenericProvider = GenericProvider;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/providers/BitbucketProvider.js
var require_BitbucketProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BitbucketProvider = void 0;
	var builder_util_runtime_1 = require_out();
	var util_1 = require_util();
	var Provider_1 = require_Provider();
	var BitbucketProvider = class extends Provider_1.Provider {
		constructor(configuration, updater, runtimeOptions) {
			super({
				...runtimeOptions,
				isUseMultipleRangeRequest: false
			});
			this.configuration = configuration;
			this.updater = updater;
			const { owner, slug } = configuration;
			this.baseUrl = (0, util_1.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${owner}/${slug}/downloads`);
		}
		get channel() {
			return this.updater.channel || this.configuration.channel || "latest";
		}
		async getLatestVersion() {
			const cancellationToken = new builder_util_runtime_1.CancellationToken();
			const channelFile = (0, util_1.getChannelFilename)(this.getCustomChannelName(this.channel));
			const channelUrl = (0, util_1.newUrlFromBase)(channelFile, this.baseUrl, this.updater.isAddNoCacheQuery);
			try {
				const updateInfo = await this.httpRequest(channelUrl, void 0, cancellationToken);
				return (0, Provider_1.parseUpdateInfo)(updateInfo, channelFile, channelUrl);
			} catch (e) {
				throw (0, builder_util_runtime_1.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
		}
		resolveFiles(updateInfo) {
			return (0, Provider_1.resolveFiles)(updateInfo, this.baseUrl);
		}
		toString() {
			const { owner, slug } = this.configuration;
			return `Bitbucket (owner: ${owner}, slug: ${slug}, channel: ${this.channel})`;
		}
	};
	exports.BitbucketProvider = BitbucketProvider;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/providers/GitHubProvider.js
var require_GitHubProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.GitHubProvider = exports.BaseGitHubProvider = void 0;
	exports.computeReleaseNotes = computeReleaseNotes;
	var builder_util_runtime_1 = require_out();
	var semver = require_semver();
	var url_1$4 = __require("url");
	var util_1 = require_util();
	var Provider_1 = require_Provider();
	var hrefRegExp = /\/tag\/([^/]+)$/;
	var BaseGitHubProvider = class extends Provider_1.Provider {
		constructor(options, defaultHost, runtimeOptions) {
			super({
				...runtimeOptions,
				isUseMultipleRangeRequest: false
			});
			this.options = options;
			this.baseUrl = (0, util_1.newBaseUrl)((0, builder_util_runtime_1.githubUrl)(options, defaultHost));
			const apiHost = defaultHost === "github.com" ? "api.github.com" : defaultHost;
			this.baseApiUrl = (0, util_1.newBaseUrl)((0, builder_util_runtime_1.githubUrl)(options, apiHost));
		}
		computeGithubBasePath(result) {
			const host = this.options.host;
			return host && !["github.com", "api.github.com"].includes(host) ? `/api/v3${result}` : result;
		}
	};
	exports.BaseGitHubProvider = BaseGitHubProvider;
	var GitHubProvider = class extends BaseGitHubProvider {
		constructor(options, updater, runtimeOptions) {
			super(options, "github.com", runtimeOptions);
			this.options = options;
			this.updater = updater;
		}
		get channel() {
			const result = this.updater.channel || this.options.channel;
			return result == null ? this.getDefaultChannelName() : this.getCustomChannelName(result);
		}
		async getLatestVersion() {
			var _a, _b, _c, _d, _e;
			const cancellationToken = new builder_util_runtime_1.CancellationToken();
			const feedXml = await this.httpRequest((0, util_1.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), { accept: "application/xml, application/atom+xml, text/xml, */*" }, cancellationToken);
			const feed = (0, builder_util_runtime_1.parseXml)(feedXml);
			let latestRelease = feed.element("entry", false, `No published versions on GitHub`);
			let tag = null;
			try {
				if (this.updater.allowPrerelease) {
					const currentChannel = ((_a = this.updater) === null || _a === void 0 ? void 0 : _a.channel) || ((_b = semver.prerelease(this.updater.currentVersion)) === null || _b === void 0 ? void 0 : _b[0]) || null;
					if (currentChannel === null) tag = hrefRegExp.exec(latestRelease.element("link").attribute("href"))[1];
					else for (const element of feed.getElements("entry")) {
						const hrefElement = hrefRegExp.exec(element.element("link").attribute("href"));
						if (hrefElement === null) continue;
						const hrefTag = hrefElement[1];
						const hrefChannel = ((_c = semver.prerelease(hrefTag)) === null || _c === void 0 ? void 0 : _c[0]) || null;
						const shouldFetchVersion = !currentChannel || ["alpha", "beta"].includes(currentChannel);
						const isCustomChannel = hrefChannel !== null && !["alpha", "beta"].includes(String(hrefChannel));
						if (shouldFetchVersion && !isCustomChannel && !(currentChannel === "beta" && hrefChannel === "alpha")) {
							tag = hrefTag;
							break;
						}
						if (hrefChannel && hrefChannel === currentChannel) {
							tag = hrefTag;
							break;
						}
					}
				} else {
					tag = await this.getLatestTagName(cancellationToken);
					for (const element of feed.getElements("entry")) if (hrefRegExp.exec(element.element("link").attribute("href"))[1] === tag) {
						latestRelease = element;
						break;
					}
				}
			} catch (e) {
				throw (0, builder_util_runtime_1.newError)(`Cannot parse releases feed: ${e.stack || e.message},\nXML:\n${feedXml}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
			}
			if (tag == null) throw (0, builder_util_runtime_1.newError)(`No published versions on GitHub`, "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
			let rawData;
			let channelFile = "";
			let channelFileUrl = "";
			const fetchData = async (channelName) => {
				channelFile = (0, util_1.getChannelFilename)(channelName);
				channelFileUrl = (0, util_1.newUrlFromBase)(this.getBaseDownloadPath(String(tag), channelFile), this.baseUrl);
				const requestOptions = this.createRequestOptions(channelFileUrl);
				try {
					return await this.executor.request(requestOptions, cancellationToken);
				} catch (e) {
					if (e instanceof builder_util_runtime_1.HttpError && e.statusCode === 404) throw (0, builder_util_runtime_1.newError)(`Cannot find ${channelFile} in the latest release artifacts (${channelFileUrl}): ${e.stack || e.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
					throw e;
				}
			};
			try {
				let channel = this.channel;
				if (this.updater.allowPrerelease && ((_d = semver.prerelease(tag)) === null || _d === void 0 ? void 0 : _d[0])) channel = this.getCustomChannelName(String((_e = semver.prerelease(tag)) === null || _e === void 0 ? void 0 : _e[0]));
				rawData = await fetchData(channel);
			} catch (e) {
				if (this.updater.allowPrerelease) rawData = await fetchData(this.getDefaultChannelName());
				else throw e;
			}
			const result = (0, Provider_1.parseUpdateInfo)(rawData, channelFile, channelFileUrl);
			if (result.releaseName == null) result.releaseName = latestRelease.elementValueOrEmpty("title");
			if (result.releaseNotes == null) result.releaseNotes = computeReleaseNotes(this.updater.currentVersion, this.updater.fullChangelog, feed, latestRelease);
			return {
				tag,
				...result
			};
		}
		async getLatestTagName(cancellationToken) {
			const options = this.options;
			const url = options.host == null || options.host === "github.com" ? (0, util_1.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new url_1$4.URL(`${this.computeGithubBasePath(`/repos/${options.owner}/${options.repo}/releases`)}/latest`, this.baseApiUrl);
			try {
				const rawData = await this.httpRequest(url, { Accept: "application/json" }, cancellationToken);
				if (rawData == null) return null;
				return JSON.parse(rawData).tag_name;
			} catch (e) {
				throw (0, builder_util_runtime_1.newError)(`Unable to find latest version on GitHub (${url}), please ensure a production release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
		}
		get basePath() {
			return `/${this.options.owner}/${this.options.repo}/releases`;
		}
		resolveFiles(updateInfo) {
			return (0, Provider_1.resolveFiles)(updateInfo, this.baseUrl, (p) => this.getBaseDownloadPath(updateInfo.tag, p.replace(/ /g, "-")));
		}
		getBaseDownloadPath(tag, fileName) {
			return `${this.basePath}/download/${tag}/${fileName}`;
		}
	};
	exports.GitHubProvider = GitHubProvider;
	function getNoteValue(parent) {
		const result = parent.elementValueOrEmpty("content");
		return result === "No content." ? "" : result;
	}
	function computeReleaseNotes(currentVersion, isFullChangelog, feed, latestRelease) {
		if (!isFullChangelog) return getNoteValue(latestRelease);
		const releaseNotes = [];
		for (const release of feed.getElements("entry")) {
			const versionRelease = /\/tag\/v?([^/]+)$/.exec(release.element("link").attribute("href"))[1];
			if (semver.valid(versionRelease) && semver.lt(currentVersion, versionRelease)) releaseNotes.push({
				version: versionRelease,
				note: getNoteValue(release)
			});
		}
		return releaseNotes.sort((a, b) => semver.rcompare(a.version, b.version));
	}
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/providers/GitLabProvider.js
var require_GitLabProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.GitLabProvider = void 0;
	var builder_util_runtime_1 = require_out();
	var url_1$3 = __require("url");
	var escapeRegExp = require_lodash_escaperegexp();
	var util_1 = require_util();
	var Provider_1 = require_Provider();
	var GitLabProvider = class extends Provider_1.Provider {
		/**
		* Normalizes filenames by replacing spaces and underscores with dashes.
		*
		* This is a workaround to handle filename formatting differences between tools:
		* - electron-builder formats filenames like "test file.txt" as "test-file.txt"
		* - GitLab may provide asset URLs using underscores, such as "test_file.txt"
		*
		* Because of this mismatch, we can't reliably extract the correct filename from
		* the asset path without normalization. This function ensures consistent matching
		* across different filename formats by converting all spaces and underscores to dashes.
		*
		* @param filename The filename to normalize
		* @returns The normalized filename with spaces and underscores replaced by dashes
		*/
		normalizeFilename(filename) {
			return filename.replace(/ |_/g, "-");
		}
		constructor(options, updater, runtimeOptions) {
			super({
				...runtimeOptions,
				isUseMultipleRangeRequest: false
			});
			this.options = options;
			this.updater = updater;
			this.cachedLatestVersion = null;
			const host = options.host || "gitlab.com";
			this.baseApiUrl = (0, util_1.newBaseUrl)(`https://${host}/api/v4`);
		}
		get channel() {
			const result = this.updater.channel || this.options.channel;
			return result == null ? this.getDefaultChannelName() : this.getCustomChannelName(result);
		}
		async getLatestVersion() {
			const cancellationToken = new builder_util_runtime_1.CancellationToken();
			const latestReleaseUrl = (0, util_1.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
			let latestRelease;
			try {
				const header = {
					"Content-Type": "application/json",
					...this.setAuthHeaderForToken(this.options.token || null)
				};
				const releaseResponse = await this.httpRequest(latestReleaseUrl, header, cancellationToken);
				if (!releaseResponse) throw (0, builder_util_runtime_1.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
				latestRelease = JSON.parse(releaseResponse);
			} catch (e) {
				throw (0, builder_util_runtime_1.newError)(`Unable to find latest release on GitLab (${latestReleaseUrl}): ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
			const tag = latestRelease.tag_name;
			let rawData = null;
			let channelFile = "";
			let channelFileUrl = null;
			const fetchChannelData = async (channelName) => {
				channelFile = (0, util_1.getChannelFilename)(channelName);
				const channelAsset = latestRelease.assets.links.find((asset) => asset.name === channelFile);
				if (!channelAsset) throw (0, builder_util_runtime_1.newError)(`Cannot find ${channelFile} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
				channelFileUrl = new url_1$3.URL(channelAsset.direct_asset_url);
				const headers = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
				try {
					const result = await this.httpRequest(channelFileUrl, headers, cancellationToken);
					if (!result) throw (0, builder_util_runtime_1.newError)(`Empty response from ${channelFileUrl}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
					return result;
				} catch (e) {
					if (e instanceof builder_util_runtime_1.HttpError && e.statusCode === 404) throw (0, builder_util_runtime_1.newError)(`Cannot find ${channelFile} in the latest release artifacts (${channelFileUrl}): ${e.stack || e.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
					throw e;
				}
			};
			try {
				rawData = await fetchChannelData(this.channel);
			} catch (e) {
				if (this.channel !== this.getDefaultChannelName()) rawData = await fetchChannelData(this.getDefaultChannelName());
				else throw e;
			}
			if (!rawData) throw (0, builder_util_runtime_1.newError)(`Unable to parse channel data from ${channelFile}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
			const result = (0, Provider_1.parseUpdateInfo)(rawData, channelFile, channelFileUrl);
			if (result.releaseName == null) result.releaseName = latestRelease.name;
			if (result.releaseNotes == null) result.releaseNotes = latestRelease.description || null;
			const assetsMap = /* @__PURE__ */ new Map();
			for (const asset of latestRelease.assets.links) assetsMap.set(this.normalizeFilename(asset.name), asset.direct_asset_url);
			const gitlabUpdateInfo = {
				tag,
				assets: assetsMap,
				...result
			};
			this.cachedLatestVersion = gitlabUpdateInfo;
			return gitlabUpdateInfo;
		}
		/**
		* Utility function to convert GitlabReleaseAsset to Map<string, string>
		* Maps asset names to their download URLs
		*/
		convertAssetsToMap(assets) {
			const assetsMap = /* @__PURE__ */ new Map();
			for (const asset of assets.links) assetsMap.set(this.normalizeFilename(asset.name), asset.direct_asset_url);
			return assetsMap;
		}
		/**
		* Find blockmap file URL in assets map for a specific filename
		*/
		findBlockMapInAssets(assets, filename) {
			const possibleBlockMapNames = [`${filename}.blockmap`, `${this.normalizeFilename(filename)}.blockmap`];
			for (const blockMapName of possibleBlockMapNames) {
				const assetUrl = assets.get(blockMapName);
				if (assetUrl) return new url_1$3.URL(assetUrl);
			}
			return null;
		}
		async fetchReleaseInfoByVersion(version) {
			const cancellationToken = new builder_util_runtime_1.CancellationToken();
			const possibleReleaseIds = [`v${version}`, version];
			for (const releaseId of possibleReleaseIds) {
				const releaseUrl = (0, util_1.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(releaseId)}`, this.baseApiUrl);
				try {
					const header = {
						"Content-Type": "application/json",
						...this.setAuthHeaderForToken(this.options.token || null)
					};
					const releaseResponse = await this.httpRequest(releaseUrl, header, cancellationToken);
					if (releaseResponse) return JSON.parse(releaseResponse);
				} catch (e) {
					if (e instanceof builder_util_runtime_1.HttpError && e.statusCode === 404) continue;
					throw (0, builder_util_runtime_1.newError)(`Unable to find release ${releaseId} on GitLab (${releaseUrl}): ${e.stack || e.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
				}
			}
			throw (0, builder_util_runtime_1.newError)(`Unable to find release with version ${version} (tried: ${possibleReleaseIds.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
		}
		setAuthHeaderForToken(token) {
			const headers = {};
			if (token != null) if (token.startsWith("Bearer")) headers.authorization = token;
			else headers["PRIVATE-TOKEN"] = token;
			return headers;
		}
		/**
		* Get version info for blockmap files, using cache when possible
		*/
		async getVersionInfoForBlockMap(version) {
			if (this.cachedLatestVersion && this.cachedLatestVersion.version === version) return this.cachedLatestVersion.assets;
			const versionInfo = await this.fetchReleaseInfoByVersion(version);
			if (versionInfo && versionInfo.assets) return this.convertAssetsToMap(versionInfo.assets);
			return null;
		}
		/**
		* Find blockmap URLs from version assets
		*/
		async findBlockMapUrlsFromAssets(oldVersion, newVersion, baseFilename) {
			let newBlockMapUrl = null;
			let oldBlockMapUrl = null;
			const newVersionAssets = await this.getVersionInfoForBlockMap(newVersion);
			if (newVersionAssets) newBlockMapUrl = this.findBlockMapInAssets(newVersionAssets, baseFilename);
			const oldVersionAssets = await this.getVersionInfoForBlockMap(oldVersion);
			if (oldVersionAssets) {
				const oldFilename = baseFilename.replace(new RegExp(escapeRegExp(newVersion), "g"), oldVersion);
				oldBlockMapUrl = this.findBlockMapInAssets(oldVersionAssets, oldFilename);
			}
			return [oldBlockMapUrl, newBlockMapUrl];
		}
		async getBlockMapFiles(baseUrl, oldVersion, newVersion, oldBlockMapFileBaseUrl = null) {
			if (this.options.uploadTarget === "project_upload") {
				const baseFilename = baseUrl.pathname.split("/").pop() || "";
				const [oldBlockMapUrl, newBlockMapUrl] = await this.findBlockMapUrlsFromAssets(oldVersion, newVersion, baseFilename);
				if (!newBlockMapUrl) throw (0, builder_util_runtime_1.newError)(`Cannot find blockmap file for ${newVersion} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
				if (!oldBlockMapUrl) throw (0, builder_util_runtime_1.newError)(`Cannot find blockmap file for ${oldVersion} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
				return [oldBlockMapUrl, newBlockMapUrl];
			} else return super.getBlockMapFiles(baseUrl, oldVersion, newVersion, oldBlockMapFileBaseUrl);
		}
		resolveFiles(updateInfo) {
			return (0, Provider_1.getFileList)(updateInfo).map((fileInfo) => {
				const matchingAssetName = [fileInfo.url, this.normalizeFilename(fileInfo.url)].find((name) => updateInfo.assets.has(name));
				const assetUrl = matchingAssetName ? updateInfo.assets.get(matchingAssetName) : void 0;
				if (!assetUrl) throw (0, builder_util_runtime_1.newError)(`Cannot find asset "${fileInfo.url}" in GitLab release assets. Available assets: ${Array.from(updateInfo.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
				return {
					url: new url_1$3.URL(assetUrl),
					info: fileInfo
				};
			});
		}
		toString() {
			return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
		}
	};
	exports.GitLabProvider = GitLabProvider;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/providers/KeygenProvider.js
var require_KeygenProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.KeygenProvider = void 0;
	var builder_util_runtime_1 = require_out();
	var util_1 = require_util();
	var Provider_1 = require_Provider();
	var KeygenProvider = class extends Provider_1.Provider {
		constructor(configuration, updater, runtimeOptions) {
			super({
				...runtimeOptions,
				isUseMultipleRangeRequest: false
			});
			this.configuration = configuration;
			this.updater = updater;
			this.defaultHostname = "api.keygen.sh";
			const host = this.configuration.host || this.defaultHostname;
			this.baseUrl = (0, util_1.newBaseUrl)(`https://${host}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
		}
		get channel() {
			return this.updater.channel || this.configuration.channel || "stable";
		}
		async getLatestVersion() {
			const cancellationToken = new builder_util_runtime_1.CancellationToken();
			const channelFile = (0, util_1.getChannelFilename)(this.getCustomChannelName(this.channel));
			const channelUrl = (0, util_1.newUrlFromBase)(channelFile, this.baseUrl, this.updater.isAddNoCacheQuery);
			try {
				const updateInfo = await this.httpRequest(channelUrl, {
					Accept: "application/vnd.api+json",
					"Keygen-Version": "1.1"
				}, cancellationToken);
				return (0, Provider_1.parseUpdateInfo)(updateInfo, channelFile, channelUrl);
			} catch (e) {
				throw (0, builder_util_runtime_1.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
		}
		resolveFiles(updateInfo) {
			return (0, Provider_1.resolveFiles)(updateInfo, this.baseUrl);
		}
		toString() {
			const { account, product, platform } = this.configuration;
			return `Keygen (account: ${account}, product: ${product}, platform: ${platform}, channel: ${this.channel})`;
		}
	};
	exports.KeygenProvider = KeygenProvider;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/providers/PrivateGitHubProvider.js
var require_PrivateGitHubProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PrivateGitHubProvider = void 0;
	var builder_util_runtime_1 = require_out();
	var js_yaml_1 = require_js_yaml();
	var path$6 = __require("path");
	var url_1$2 = __require("url");
	var util_1 = require_util();
	var GitHubProvider_1 = require_GitHubProvider();
	var Provider_1 = require_Provider();
	var PrivateGitHubProvider = class extends GitHubProvider_1.BaseGitHubProvider {
		constructor(options, updater, token, runtimeOptions) {
			super(options, "api.github.com", runtimeOptions);
			this.updater = updater;
			this.token = token;
		}
		createRequestOptions(url, headers) {
			const result = super.createRequestOptions(url, headers);
			result.redirect = "manual";
			return result;
		}
		async getLatestVersion() {
			const cancellationToken = new builder_util_runtime_1.CancellationToken();
			const channelFile = (0, util_1.getChannelFilename)(this.getDefaultChannelName());
			const releaseInfo = await this.getLatestVersionInfo(cancellationToken);
			const asset = releaseInfo.assets.find((it) => it.name === channelFile);
			if (asset == null) throw (0, builder_util_runtime_1.newError)(`Cannot find ${channelFile} in the release ${releaseInfo.html_url || releaseInfo.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
			const url = new url_1$2.URL(asset.url);
			let result;
			try {
				result = (0, js_yaml_1.load)(await this.httpRequest(url, this.configureHeaders("application/octet-stream"), cancellationToken));
			} catch (e) {
				if (e instanceof builder_util_runtime_1.HttpError && e.statusCode === 404) throw (0, builder_util_runtime_1.newError)(`Cannot find ${channelFile} in the latest release artifacts (${url}): ${e.stack || e.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
				throw e;
			}
			result.assets = releaseInfo.assets;
			return result;
		}
		get fileExtraDownloadHeaders() {
			return this.configureHeaders("application/octet-stream");
		}
		configureHeaders(accept) {
			return {
				accept,
				authorization: `token ${this.token}`
			};
		}
		async getLatestVersionInfo(cancellationToken) {
			const allowPrerelease = this.updater.allowPrerelease;
			let basePath = this.basePath;
			if (!allowPrerelease) basePath = `${basePath}/latest`;
			const url = (0, util_1.newUrlFromBase)(basePath, this.baseUrl);
			try {
				const version = JSON.parse(await this.httpRequest(url, this.configureHeaders("application/vnd.github.v3+json"), cancellationToken));
				if (allowPrerelease) return version.find((it) => it.prerelease) || version[0];
				else return version;
			} catch (e) {
				throw (0, builder_util_runtime_1.newError)(`Unable to find latest version on GitHub (${url}), please ensure a production release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
		}
		get basePath() {
			return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
		}
		resolveFiles(updateInfo) {
			return (0, Provider_1.getFileList)(updateInfo).map((it) => {
				const name = path$6.posix.basename(it.url).replace(/ /g, "-");
				const asset = updateInfo.assets.find((it) => it != null && it.name === name);
				if (asset == null) throw (0, builder_util_runtime_1.newError)(`Cannot find asset "${name}" in: ${JSON.stringify(updateInfo.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
				return {
					url: new url_1$2.URL(asset.url),
					info: it
				};
			});
		}
	};
	exports.PrivateGitHubProvider = PrivateGitHubProvider;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/providerFactory.js
var require_providerFactory = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isUrlProbablySupportMultiRangeRequests = isUrlProbablySupportMultiRangeRequests;
	exports.createClient = createClient;
	var builder_util_runtime_1 = require_out();
	var BitbucketProvider_1 = require_BitbucketProvider();
	var GenericProvider_1 = require_GenericProvider();
	var GitHubProvider_1 = require_GitHubProvider();
	var GitLabProvider_1 = require_GitLabProvider();
	var KeygenProvider_1 = require_KeygenProvider();
	var PrivateGitHubProvider_1 = require_PrivateGitHubProvider();
	function isUrlProbablySupportMultiRangeRequests(url) {
		return !url.includes("s3.amazonaws.com");
	}
	function createClient(data, updater, runtimeOptions) {
		if (typeof data === "string") throw (0, builder_util_runtime_1.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
		const provider = data.provider;
		switch (provider) {
			case "github": {
				const githubOptions = data;
				const token = (githubOptions.private ? process.env["GH_TOKEN"] || process.env["GITHUB_TOKEN"] : null) || githubOptions.token;
				if (token == null) return new GitHubProvider_1.GitHubProvider(githubOptions, updater, runtimeOptions);
				else return new PrivateGitHubProvider_1.PrivateGitHubProvider(githubOptions, updater, token, runtimeOptions);
			}
			case "bitbucket": return new BitbucketProvider_1.BitbucketProvider(data, updater, runtimeOptions);
			case "gitlab": return new GitLabProvider_1.GitLabProvider(data, updater, runtimeOptions);
			case "keygen": return new KeygenProvider_1.KeygenProvider(data, updater, runtimeOptions);
			case "s3":
			case "spaces": return new GenericProvider_1.GenericProvider({
				provider: "generic",
				url: (0, builder_util_runtime_1.getS3LikeProviderBaseUrl)(data),
				channel: data.channel || null
			}, updater, {
				...runtimeOptions,
				isUseMultipleRangeRequest: false
			});
			case "generic": {
				const options = data;
				return new GenericProvider_1.GenericProvider(options, updater, {
					...runtimeOptions,
					isUseMultipleRangeRequest: options.useMultipleRangeRequest !== false && isUrlProbablySupportMultiRangeRequests(options.url)
				});
			}
			case "custom": {
				const options = data;
				const constructor = options.updateProvider;
				if (!constructor) throw (0, builder_util_runtime_1.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
				return new constructor(options, updater, runtimeOptions);
			}
			default: throw (0, builder_util_runtime_1.newError)(`Unsupported provider: ${provider}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
		}
	}
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/differentialDownloader/downloadPlanBuilder.js
var require_downloadPlanBuilder = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OperationKind = void 0;
	exports.computeOperations = computeOperations;
	var OperationKind;
	(function(OperationKind) {
		OperationKind[OperationKind["COPY"] = 0] = "COPY";
		OperationKind[OperationKind["DOWNLOAD"] = 1] = "DOWNLOAD";
	})(OperationKind || (exports.OperationKind = OperationKind = {}));
	function computeOperations(oldBlockMap, newBlockMap, logger) {
		const nameToOldBlocks = buildBlockFileMap(oldBlockMap.files);
		const nameToNewBlocks = buildBlockFileMap(newBlockMap.files);
		let lastOperation = null;
		const blockMapFile = newBlockMap.files[0];
		const operations = [];
		const name = blockMapFile.name;
		const oldEntry = nameToOldBlocks.get(name);
		if (oldEntry == null) throw new Error(`no file ${name} in old blockmap`);
		const newFile = nameToNewBlocks.get(name);
		let changedBlockCount = 0;
		const { checksumToOffset: checksumToOldOffset, checksumToOldSize } = buildChecksumMap(nameToOldBlocks.get(name), oldEntry.offset, logger);
		let newOffset = blockMapFile.offset;
		for (let i = 0; i < newFile.checksums.length; newOffset += newFile.sizes[i], i++) {
			const blockSize = newFile.sizes[i];
			const checksum = newFile.checksums[i];
			let oldOffset = checksumToOldOffset.get(checksum);
			if (oldOffset != null && checksumToOldSize.get(checksum) !== blockSize) {
				logger.warn(`Checksum ("${checksum}") matches, but size differs (old: ${checksumToOldSize.get(checksum)}, new: ${blockSize})`);
				oldOffset = void 0;
			}
			if (oldOffset === void 0) {
				changedBlockCount++;
				if (lastOperation != null && lastOperation.kind === OperationKind.DOWNLOAD && lastOperation.end === newOffset) lastOperation.end += blockSize;
				else {
					lastOperation = {
						kind: OperationKind.DOWNLOAD,
						start: newOffset,
						end: newOffset + blockSize
					};
					validateAndAdd(lastOperation, operations, checksum, i);
				}
			} else if (lastOperation != null && lastOperation.kind === OperationKind.COPY && lastOperation.end === oldOffset) lastOperation.end += blockSize;
			else {
				lastOperation = {
					kind: OperationKind.COPY,
					start: oldOffset,
					end: oldOffset + blockSize
				};
				validateAndAdd(lastOperation, operations, checksum, i);
			}
		}
		if (changedBlockCount > 0) logger.info(`File${blockMapFile.name === "file" ? "" : " " + blockMapFile.name} has ${changedBlockCount} changed blocks`);
		return operations;
	}
	var isValidateOperationRange = process.env["DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES"] === "true";
	function validateAndAdd(operation, operations, checksum, index) {
		if (isValidateOperationRange && operations.length !== 0) {
			const lastOperation = operations[operations.length - 1];
			if (lastOperation.kind === operation.kind && operation.start < lastOperation.end && operation.start > lastOperation.start) {
				const min = [
					lastOperation.start,
					lastOperation.end,
					operation.start,
					operation.end
				].reduce((p, v) => p < v ? p : v);
				throw new Error(`operation (block index: ${index}, checksum: ${checksum}, kind: ${OperationKind[operation.kind]}) overlaps previous operation (checksum: ${checksum}):\nabs: ${lastOperation.start} until ${lastOperation.end} and ${operation.start} until ${operation.end}\nrel: ${lastOperation.start - min} until ${lastOperation.end - min} and ${operation.start - min} until ${operation.end - min}`);
			}
		}
		operations.push(operation);
	}
	function buildChecksumMap(file, fileOffset, logger) {
		const checksumToOffset = /* @__PURE__ */ new Map();
		const checksumToSize = /* @__PURE__ */ new Map();
		let offset = fileOffset;
		for (let i = 0; i < file.checksums.length; i++) {
			const checksum = file.checksums[i];
			const size = file.sizes[i];
			const existing = checksumToSize.get(checksum);
			if (existing === void 0) {
				checksumToOffset.set(checksum, offset);
				checksumToSize.set(checksum, size);
			} else if (logger.debug != null) {
				const sizeExplanation = existing === size ? "(same size)" : `(size: ${existing}, this size: ${size})`;
				logger.debug(`${checksum} duplicated in blockmap ${sizeExplanation}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
			}
			offset += size;
		}
		return {
			checksumToOffset,
			checksumToOldSize: checksumToSize
		};
	}
	function buildBlockFileMap(list) {
		const result = /* @__PURE__ */ new Map();
		for (const item of list) result.set(item.name, item);
		return result;
	}
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/differentialDownloader/DataSplitter.js
var require_DataSplitter = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DataSplitter = void 0;
	exports.copyData = copyData;
	var builder_util_runtime_1 = require_out();
	var fs_1$3 = __require("fs");
	var stream_1$1 = __require("stream");
	var downloadPlanBuilder_1 = require_downloadPlanBuilder();
	var DOUBLE_CRLF = Buffer.from("\r\n\r\n");
	var ReadState;
	(function(ReadState) {
		ReadState[ReadState["INIT"] = 0] = "INIT";
		ReadState[ReadState["HEADER"] = 1] = "HEADER";
		ReadState[ReadState["BODY"] = 2] = "BODY";
	})(ReadState || (ReadState = {}));
	function copyData(task, out, oldFileFd, reject, resolve) {
		const readStream = (0, fs_1$3.createReadStream)("", {
			fd: oldFileFd,
			autoClose: false,
			start: task.start,
			end: task.end - 1
		});
		readStream.on("error", reject);
		readStream.once("end", resolve);
		readStream.pipe(out, { end: false });
	}
	var DataSplitter = class extends stream_1$1.Writable {
		constructor(out, options, partIndexToTaskIndex, boundary, partIndexToLength, finishHandler, grandTotalBytes, onProgress) {
			super();
			this.out = out;
			this.options = options;
			this.partIndexToTaskIndex = partIndexToTaskIndex;
			this.partIndexToLength = partIndexToLength;
			this.finishHandler = finishHandler;
			this.grandTotalBytes = grandTotalBytes;
			this.onProgress = onProgress;
			this.start = Date.now();
			this.nextUpdate = this.start + 1e3;
			this.transferred = 0;
			this.delta = 0;
			this.partIndex = -1;
			this.headerListBuffer = null;
			this.readState = ReadState.INIT;
			this.ignoreByteCount = 0;
			this.remainingPartDataCount = 0;
			this.actualPartLength = 0;
			this.boundaryLength = boundary.length + 4;
			this.ignoreByteCount = this.boundaryLength - 2;
		}
		get isFinished() {
			return this.partIndex === this.partIndexToLength.length;
		}
		_write(data, encoding, callback) {
			if (this.isFinished) {
				console.error(`Trailing ignored data: ${data.length} bytes`);
				return;
			}
			this.handleData(data).then(() => {
				if (this.onProgress) {
					const now = Date.now();
					if ((now >= this.nextUpdate || this.transferred === this.grandTotalBytes) && this.grandTotalBytes && (now - this.start) / 1e3) {
						this.nextUpdate = now + 1e3;
						this.onProgress({
							total: this.grandTotalBytes,
							delta: this.delta,
							transferred: this.transferred,
							percent: this.transferred / this.grandTotalBytes * 100,
							bytesPerSecond: Math.round(this.transferred / ((now - this.start) / 1e3))
						});
						this.delta = 0;
					}
				}
				callback();
			}).catch(callback);
		}
		async handleData(chunk) {
			let start = 0;
			if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0) throw (0, builder_util_runtime_1.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
			if (this.ignoreByteCount > 0) {
				const toIgnore = Math.min(this.ignoreByteCount, chunk.length);
				this.ignoreByteCount -= toIgnore;
				start = toIgnore;
			} else if (this.remainingPartDataCount > 0) {
				const toRead = Math.min(this.remainingPartDataCount, chunk.length);
				this.remainingPartDataCount -= toRead;
				await this.processPartData(chunk, 0, toRead);
				start = toRead;
			}
			if (start === chunk.length) return;
			if (this.readState === ReadState.HEADER) {
				const headerListEnd = this.searchHeaderListEnd(chunk, start);
				if (headerListEnd === -1) return;
				start = headerListEnd;
				this.readState = ReadState.BODY;
				this.headerListBuffer = null;
			}
			while (true) {
				if (this.readState === ReadState.BODY) this.readState = ReadState.INIT;
				else {
					this.partIndex++;
					let taskIndex = this.partIndexToTaskIndex.get(this.partIndex);
					if (taskIndex == null) if (this.isFinished) taskIndex = this.options.end;
					else throw (0, builder_util_runtime_1.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
					const prevTaskIndex = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
					if (prevTaskIndex < taskIndex) await this.copyExistingData(prevTaskIndex, taskIndex);
					else if (prevTaskIndex > taskIndex) throw (0, builder_util_runtime_1.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
					if (this.isFinished) {
						this.onPartEnd();
						this.finishHandler();
						return;
					}
					start = this.searchHeaderListEnd(chunk, start);
					if (start === -1) {
						this.readState = ReadState.HEADER;
						return;
					}
				}
				const partLength = this.partIndexToLength[this.partIndex];
				const end = start + partLength;
				const effectiveEnd = Math.min(end, chunk.length);
				await this.processPartStarted(chunk, start, effectiveEnd);
				this.remainingPartDataCount = partLength - (effectiveEnd - start);
				if (this.remainingPartDataCount > 0) return;
				start = end + this.boundaryLength;
				if (start >= chunk.length) {
					this.ignoreByteCount = this.boundaryLength - (chunk.length - end);
					return;
				}
			}
		}
		copyExistingData(index, end) {
			return new Promise((resolve, reject) => {
				const w = () => {
					if (index === end) {
						resolve();
						return;
					}
					const task = this.options.tasks[index];
					if (task.kind !== downloadPlanBuilder_1.OperationKind.COPY) {
						reject(/* @__PURE__ */ new Error("Task kind must be COPY"));
						return;
					}
					copyData(task, this.out, this.options.oldFileFd, reject, () => {
						index++;
						w();
					});
				};
				w();
			});
		}
		searchHeaderListEnd(chunk, readOffset) {
			const headerListEnd = chunk.indexOf(DOUBLE_CRLF, readOffset);
			if (headerListEnd !== -1) return headerListEnd + DOUBLE_CRLF.length;
			const partialChunk = readOffset === 0 ? chunk : chunk.slice(readOffset);
			if (this.headerListBuffer == null) this.headerListBuffer = partialChunk;
			else this.headerListBuffer = Buffer.concat([this.headerListBuffer, partialChunk]);
			return -1;
		}
		onPartEnd() {
			const expectedLength = this.partIndexToLength[this.partIndex - 1];
			if (this.actualPartLength !== expectedLength) throw (0, builder_util_runtime_1.newError)(`Expected length: ${expectedLength} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
			this.actualPartLength = 0;
		}
		processPartStarted(data, start, end) {
			if (this.partIndex !== 0) this.onPartEnd();
			return this.processPartData(data, start, end);
		}
		processPartData(data, start, end) {
			this.actualPartLength += end - start;
			this.transferred += end - start;
			this.delta += end - start;
			const out = this.out;
			if (out.write(start === 0 && data.length === end ? data : data.slice(start, end))) return Promise.resolve();
			else return new Promise((resolve, reject) => {
				out.on("error", reject);
				out.once("drain", () => {
					out.removeListener("error", reject);
					resolve();
				});
			});
		}
	};
	exports.DataSplitter = DataSplitter;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/differentialDownloader/multipleRangeDownloader.js
var require_multipleRangeDownloader = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.executeTasksUsingMultipleRangeRequests = executeTasksUsingMultipleRangeRequests;
	exports.checkIsRangesSupported = checkIsRangesSupported;
	var builder_util_runtime_1 = require_out();
	var DataSplitter_1 = require_DataSplitter();
	var downloadPlanBuilder_1 = require_downloadPlanBuilder();
	function executeTasksUsingMultipleRangeRequests(differentialDownloader, tasks, out, oldFileFd, reject) {
		const w = (taskOffset) => {
			if (taskOffset >= tasks.length) {
				if (differentialDownloader.fileMetadataBuffer != null) out.write(differentialDownloader.fileMetadataBuffer);
				out.end();
				return;
			}
			const nextOffset = taskOffset + 1e3;
			doExecuteTasks(differentialDownloader, {
				tasks,
				start: taskOffset,
				end: Math.min(tasks.length, nextOffset),
				oldFileFd
			}, out, () => w(nextOffset), reject);
		};
		return w;
	}
	function doExecuteTasks(differentialDownloader, options, out, resolve, reject) {
		let ranges = "bytes=";
		let partCount = 0;
		let grandTotalBytes = 0;
		const partIndexToTaskIndex = /* @__PURE__ */ new Map();
		const partIndexToLength = [];
		for (let i = options.start; i < options.end; i++) {
			const task = options.tasks[i];
			if (task.kind === downloadPlanBuilder_1.OperationKind.DOWNLOAD) {
				ranges += `${task.start}-${task.end - 1}, `;
				partIndexToTaskIndex.set(partCount, i);
				partCount++;
				partIndexToLength.push(task.end - task.start);
				grandTotalBytes += task.end - task.start;
			}
		}
		if (partCount <= 1) {
			const w = (index) => {
				if (index >= options.end) {
					resolve();
					return;
				}
				const task = options.tasks[index++];
				if (task.kind === downloadPlanBuilder_1.OperationKind.COPY) (0, DataSplitter_1.copyData)(task, out, options.oldFileFd, reject, () => w(index));
				else {
					const requestOptions = differentialDownloader.createRequestOptions();
					requestOptions.headers.Range = `bytes=${task.start}-${task.end - 1}`;
					const request = differentialDownloader.httpExecutor.createRequest(requestOptions, (response) => {
						response.on("error", reject);
						if (!checkIsRangesSupported(response, reject)) return;
						response.pipe(out, { end: false });
						response.once("end", () => w(index));
					});
					differentialDownloader.httpExecutor.addErrorAndTimeoutHandlers(request, reject);
					request.end();
				}
			};
			w(options.start);
			return;
		}
		const requestOptions = differentialDownloader.createRequestOptions();
		requestOptions.headers.Range = ranges.substring(0, ranges.length - 2);
		const request = differentialDownloader.httpExecutor.createRequest(requestOptions, (response) => {
			if (!checkIsRangesSupported(response, reject)) return;
			const contentType = (0, builder_util_runtime_1.safeGetHeader)(response, "content-type");
			const m = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(contentType);
			if (m == null) {
				reject(/* @__PURE__ */ new Error(`Content-Type "multipart/byteranges" is expected, but got "${contentType}"`));
				return;
			}
			const dicer = new DataSplitter_1.DataSplitter(out, options, partIndexToTaskIndex, m[1] || m[2], partIndexToLength, resolve, grandTotalBytes, differentialDownloader.options.onProgress);
			dicer.on("error", reject);
			response.pipe(dicer);
			response.on("end", () => {
				setTimeout(() => {
					request.abort();
					reject(/* @__PURE__ */ new Error("Response ends without calling any handlers"));
				}, 1e4);
			});
		});
		differentialDownloader.httpExecutor.addErrorAndTimeoutHandlers(request, reject);
		request.end();
	}
	function checkIsRangesSupported(response, reject) {
		if (response.statusCode >= 400) {
			reject((0, builder_util_runtime_1.createHttpError)(response));
			return false;
		}
		if (response.statusCode !== 206) {
			const acceptRanges = (0, builder_util_runtime_1.safeGetHeader)(response, "accept-ranges");
			if (acceptRanges == null || acceptRanges === "none") {
				reject(/* @__PURE__ */ new Error(`Server doesn't support Accept-Ranges (response code ${response.statusCode})`));
				return false;
			}
		}
		return true;
	}
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/differentialDownloader/ProgressDifferentialDownloadCallbackTransform.js
var require_ProgressDifferentialDownloadCallbackTransform = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ProgressDifferentialDownloadCallbackTransform = void 0;
	var stream_1 = __require("stream");
	var OperationKind;
	(function(OperationKind) {
		OperationKind[OperationKind["COPY"] = 0] = "COPY";
		OperationKind[OperationKind["DOWNLOAD"] = 1] = "DOWNLOAD";
	})(OperationKind || (OperationKind = {}));
	var ProgressDifferentialDownloadCallbackTransform = class extends stream_1.Transform {
		constructor(progressDifferentialDownloadInfo, cancellationToken, onProgress) {
			super();
			this.progressDifferentialDownloadInfo = progressDifferentialDownloadInfo;
			this.cancellationToken = cancellationToken;
			this.onProgress = onProgress;
			this.start = Date.now();
			this.transferred = 0;
			this.delta = 0;
			this.expectedBytes = 0;
			this.index = 0;
			this.operationType = OperationKind.COPY;
			this.nextUpdate = this.start + 1e3;
		}
		_transform(chunk, encoding, callback) {
			if (this.cancellationToken.cancelled) {
				callback(/* @__PURE__ */ new Error("cancelled"), null);
				return;
			}
			if (this.operationType == OperationKind.COPY) {
				callback(null, chunk);
				return;
			}
			this.transferred += chunk.length;
			this.delta += chunk.length;
			const now = Date.now();
			if (now >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal) {
				this.nextUpdate = now + 1e3;
				this.onProgress({
					total: this.progressDifferentialDownloadInfo.grandTotal,
					delta: this.delta,
					transferred: this.transferred,
					percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
					bytesPerSecond: Math.round(this.transferred / ((now - this.start) / 1e3))
				});
				this.delta = 0;
			}
			callback(null, chunk);
		}
		beginFileCopy() {
			this.operationType = OperationKind.COPY;
		}
		beginRangeDownload() {
			this.operationType = OperationKind.DOWNLOAD;
			this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
		}
		endRangeDownload() {
			if (this.transferred !== this.progressDifferentialDownloadInfo.grandTotal) this.onProgress({
				total: this.progressDifferentialDownloadInfo.grandTotal,
				delta: this.delta,
				transferred: this.transferred,
				percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
				bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
			});
		}
		_flush(callback) {
			if (this.cancellationToken.cancelled) {
				callback(/* @__PURE__ */ new Error("cancelled"));
				return;
			}
			this.onProgress({
				total: this.progressDifferentialDownloadInfo.grandTotal,
				delta: this.delta,
				transferred: this.transferred,
				percent: 100,
				bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
			});
			this.delta = 0;
			this.transferred = 0;
			callback(null);
		}
	};
	exports.ProgressDifferentialDownloadCallbackTransform = ProgressDifferentialDownloadCallbackTransform;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/differentialDownloader/DifferentialDownloader.js
var require_DifferentialDownloader = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DifferentialDownloader = void 0;
	var builder_util_runtime_1 = require_out();
	var fs_extra_1 = require_lib();
	var fs_1$2 = __require("fs");
	var DataSplitter_1 = require_DataSplitter();
	var url_1$1 = __require("url");
	var downloadPlanBuilder_1 = require_downloadPlanBuilder();
	var multipleRangeDownloader_1 = require_multipleRangeDownloader();
	var ProgressDifferentialDownloadCallbackTransform_1 = require_ProgressDifferentialDownloadCallbackTransform();
	var DifferentialDownloader = class {
		constructor(blockAwareFileInfo, httpExecutor, options) {
			this.blockAwareFileInfo = blockAwareFileInfo;
			this.httpExecutor = httpExecutor;
			this.options = options;
			this.fileMetadataBuffer = null;
			this.logger = options.logger;
		}
		createRequestOptions() {
			const result = { headers: {
				...this.options.requestHeaders,
				accept: "*/*"
			} };
			(0, builder_util_runtime_1.configureRequestUrl)(this.options.newUrl, result);
			(0, builder_util_runtime_1.configureRequestOptions)(result);
			return result;
		}
		doDownload(oldBlockMap, newBlockMap) {
			if (oldBlockMap.version !== newBlockMap.version) throw new Error(`version is different (${oldBlockMap.version} - ${newBlockMap.version}), full download is required`);
			const logger = this.logger;
			const operations = (0, downloadPlanBuilder_1.computeOperations)(oldBlockMap, newBlockMap, logger);
			if (logger.debug != null) logger.debug(JSON.stringify(operations, null, 2));
			let downloadSize = 0;
			let copySize = 0;
			for (const operation of operations) {
				const length = operation.end - operation.start;
				if (operation.kind === downloadPlanBuilder_1.OperationKind.DOWNLOAD) downloadSize += length;
				else copySize += length;
			}
			const newSize = this.blockAwareFileInfo.size;
			if (downloadSize + copySize + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== newSize) throw new Error(`Internal error, size mismatch: downloadSize: ${downloadSize}, copySize: ${copySize}, newSize: ${newSize}`);
			logger.info(`Full: ${formatBytes(newSize)}, To download: ${formatBytes(downloadSize)} (${Math.round(downloadSize / (newSize / 100))}%)`);
			return this.downloadFile(operations);
		}
		downloadFile(tasks) {
			const fdList = [];
			const closeFiles = () => {
				return Promise.all(fdList.map((openedFile) => {
					return (0, fs_extra_1.close)(openedFile.descriptor).catch((e) => {
						this.logger.error(`cannot close file "${openedFile.path}": ${e}`);
					});
				}));
			};
			return this.doDownloadFile(tasks, fdList).then(closeFiles).catch((e) => {
				return closeFiles().catch((closeFilesError) => {
					try {
						this.logger.error(`cannot close files: ${closeFilesError}`);
					} catch (errorOnLog) {
						try {
							console.error(errorOnLog);
						} catch (_ignored) {}
					}
					throw e;
				}).then(() => {
					throw e;
				});
			});
		}
		async doDownloadFile(tasks, fdList) {
			const oldFileFd = await (0, fs_extra_1.open)(this.options.oldFile, "r");
			fdList.push({
				descriptor: oldFileFd,
				path: this.options.oldFile
			});
			const newFileFd = await (0, fs_extra_1.open)(this.options.newFile, "w");
			fdList.push({
				descriptor: newFileFd,
				path: this.options.newFile
			});
			const fileOut = (0, fs_1$2.createWriteStream)(this.options.newFile, { fd: newFileFd });
			await new Promise((resolve, reject) => {
				const streams = [];
				let downloadInfoTransform = void 0;
				if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
					const expectedByteCounts = [];
					let grandTotalBytes = 0;
					for (const task of tasks) if (task.kind === downloadPlanBuilder_1.OperationKind.DOWNLOAD) {
						expectedByteCounts.push(task.end - task.start);
						grandTotalBytes += task.end - task.start;
					}
					const progressDifferentialDownloadInfo = {
						expectedByteCounts,
						grandTotal: grandTotalBytes
					};
					downloadInfoTransform = new ProgressDifferentialDownloadCallbackTransform_1.ProgressDifferentialDownloadCallbackTransform(progressDifferentialDownloadInfo, this.options.cancellationToken, this.options.onProgress);
					streams.push(downloadInfoTransform);
				}
				const digestTransform = new builder_util_runtime_1.DigestTransform(this.blockAwareFileInfo.sha512);
				digestTransform.isValidateOnEnd = false;
				streams.push(digestTransform);
				fileOut.on("finish", () => {
					fileOut.close(() => {
						fdList.splice(1, 1);
						try {
							digestTransform.validate();
						} catch (e) {
							reject(e);
							return;
						}
						resolve(void 0);
					});
				});
				streams.push(fileOut);
				let lastStream = null;
				for (const stream of streams) {
					stream.on("error", reject);
					if (lastStream == null) lastStream = stream;
					else lastStream = lastStream.pipe(stream);
				}
				const firstStream = streams[0];
				let w;
				if (this.options.isUseMultipleRangeRequest) {
					w = (0, multipleRangeDownloader_1.executeTasksUsingMultipleRangeRequests)(this, tasks, firstStream, oldFileFd, reject);
					w(0);
					return;
				}
				let downloadOperationCount = 0;
				let actualUrl = null;
				this.logger.info(`Differential download: ${this.options.newUrl}`);
				const requestOptions = this.createRequestOptions();
				requestOptions.redirect = "manual";
				w = (index) => {
					var _a, _b;
					if (index >= tasks.length) {
						if (this.fileMetadataBuffer != null) firstStream.write(this.fileMetadataBuffer);
						firstStream.end();
						return;
					}
					const operation = tasks[index++];
					if (operation.kind === downloadPlanBuilder_1.OperationKind.COPY) {
						if (downloadInfoTransform) downloadInfoTransform.beginFileCopy();
						(0, DataSplitter_1.copyData)(operation, firstStream, oldFileFd, reject, () => w(index));
						return;
					}
					const range = `bytes=${operation.start}-${operation.end - 1}`;
					requestOptions.headers.range = range;
					(_b = (_a = this.logger) === null || _a === void 0 ? void 0 : _a.debug) === null || _b === void 0 || _b.call(_a, `download range: ${range}`);
					if (downloadInfoTransform) downloadInfoTransform.beginRangeDownload();
					const request = this.httpExecutor.createRequest(requestOptions, (response) => {
						response.on("error", reject);
						response.on("aborted", () => {
							reject(/* @__PURE__ */ new Error("response has been aborted by the server"));
						});
						if (response.statusCode >= 400) reject((0, builder_util_runtime_1.createHttpError)(response));
						response.pipe(firstStream, { end: false });
						response.once("end", () => {
							if (downloadInfoTransform) downloadInfoTransform.endRangeDownload();
							if (++downloadOperationCount === 100) {
								downloadOperationCount = 0;
								setTimeout(() => w(index), 1e3);
							} else w(index);
						});
					});
					request.on("redirect", (statusCode, method, redirectUrl) => {
						this.logger.info(`Redirect to ${removeQuery(redirectUrl)}`);
						actualUrl = redirectUrl;
						(0, builder_util_runtime_1.configureRequestUrl)(new url_1$1.URL(actualUrl), requestOptions);
						request.followRedirect();
					});
					this.httpExecutor.addErrorAndTimeoutHandlers(request, reject);
					request.end();
				};
				w(0);
			});
		}
		async readRemoteBytes(start, endInclusive) {
			const buffer = Buffer.allocUnsafe(endInclusive + 1 - start);
			const requestOptions = this.createRequestOptions();
			requestOptions.headers.range = `bytes=${start}-${endInclusive}`;
			let position = 0;
			await this.request(requestOptions, (chunk) => {
				chunk.copy(buffer, position);
				position += chunk.length;
			});
			if (position !== buffer.length) throw new Error(`Received data length ${position} is not equal to expected ${buffer.length}`);
			return buffer;
		}
		request(requestOptions, dataHandler) {
			return new Promise((resolve, reject) => {
				const request = this.httpExecutor.createRequest(requestOptions, (response) => {
					if (!(0, multipleRangeDownloader_1.checkIsRangesSupported)(response, reject)) return;
					response.on("error", reject);
					response.on("aborted", () => {
						reject(/* @__PURE__ */ new Error("response has been aborted by the server"));
					});
					response.on("data", dataHandler);
					response.on("end", () => resolve());
				});
				this.httpExecutor.addErrorAndTimeoutHandlers(request, reject);
				request.end();
			});
		}
	};
	exports.DifferentialDownloader = DifferentialDownloader;
	function formatBytes(value, symbol = " KB") {
		return new Intl.NumberFormat("en").format((value / 1024).toFixed(2)) + symbol;
	}
	function removeQuery(url) {
		const index = url.indexOf("?");
		return index < 0 ? url : url.substring(0, index);
	}
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/differentialDownloader/GenericDifferentialDownloader.js
var require_GenericDifferentialDownloader = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.GenericDifferentialDownloader = void 0;
	var DifferentialDownloader_1 = require_DifferentialDownloader();
	var GenericDifferentialDownloader = class extends DifferentialDownloader_1.DifferentialDownloader {
		download(oldBlockMap, newBlockMap) {
			return this.doDownload(oldBlockMap, newBlockMap);
		}
	};
	exports.GenericDifferentialDownloader = GenericDifferentialDownloader;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/types.js
var require_types = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.UpdaterSignal = exports.UPDATE_DOWNLOADED = exports.DOWNLOAD_PROGRESS = exports.CancellationToken = void 0;
	exports.addHandler = addHandler;
	var builder_util_runtime_1 = require_out();
	Object.defineProperty(exports, "CancellationToken", {
		enumerable: true,
		get: function() {
			return builder_util_runtime_1.CancellationToken;
		}
	});
	exports.DOWNLOAD_PROGRESS = "download-progress";
	exports.UPDATE_DOWNLOADED = "update-downloaded";
	var UpdaterSignal = class {
		constructor(emitter) {
			this.emitter = emitter;
		}
		/**
		* Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
		*/
		login(handler) {
			addHandler(this.emitter, "login", handler);
		}
		progress(handler) {
			addHandler(this.emitter, exports.DOWNLOAD_PROGRESS, handler);
		}
		updateDownloaded(handler) {
			addHandler(this.emitter, exports.UPDATE_DOWNLOADED, handler);
		}
		updateCancelled(handler) {
			addHandler(this.emitter, "update-cancelled", handler);
		}
	};
	exports.UpdaterSignal = UpdaterSignal;
	function addHandler(emitter, event, handler) {
		emitter.on(event, handler);
	}
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/AppUpdater.js
var require_AppUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NoOpLogger = exports.AppUpdater = void 0;
	var builder_util_runtime_1 = require_out();
	var crypto_1$1 = __require("crypto");
	var os_1 = __require("os");
	var events_1 = __require("events");
	var fs_extra_1 = require_lib();
	var js_yaml_1 = require_js_yaml();
	var lazy_val_1 = require_main$1();
	var path$5 = __require("path");
	var semver_1 = require_semver();
	var DownloadedUpdateHelper_1 = require_DownloadedUpdateHelper();
	var ElectronAppAdapter_1 = require_ElectronAppAdapter();
	var electronHttpExecutor_1 = require_electronHttpExecutor();
	var GenericProvider_1 = require_GenericProvider();
	var providerFactory_1 = require_providerFactory();
	var zlib_1$1 = __require("zlib");
	var GenericDifferentialDownloader_1 = require_GenericDifferentialDownloader();
	var types_1 = require_types();
	exports.AppUpdater = class AppUpdater extends events_1.EventEmitter {
		/**
		* Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
		*/
		get channel() {
			return this._channel;
		}
		/**
		* Set the update channel. Overrides `channel` in the update configuration.
		*
		* `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
		*/
		set channel(value) {
			if (this._channel != null) {
				if (typeof value !== "string") throw (0, builder_util_runtime_1.newError)(`Channel must be a string, but got: ${value}`, "ERR_UPDATER_INVALID_CHANNEL");
				else if (value.length === 0) throw (0, builder_util_runtime_1.newError)(`Channel must be not an empty string`, "ERR_UPDATER_INVALID_CHANNEL");
			}
			this._channel = value;
			this.allowDowngrade = true;
		}
		/**
		*  Shortcut for explicitly adding auth tokens to request headers
		*/
		addAuthHeader(token) {
			this.requestHeaders = Object.assign({}, this.requestHeaders, { authorization: token });
		}
		get netSession() {
			return (0, electronHttpExecutor_1.getNetSession)();
		}
		/**
		* The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
		* Set it to `null` if you would like to disable a logging feature.
		*/
		get logger() {
			return this._logger;
		}
		set logger(value) {
			this._logger = value == null ? new NoOpLogger() : value;
		}
		/**
		* test only
		* @private
		*/
		set updateConfigPath(value) {
			this.clientPromise = null;
			this._appUpdateConfigPath = value;
			this.configOnDisk = new lazy_val_1.Lazy(() => this.loadUpdateConfig());
		}
		/**
		* Allows developer to override default logic for determining if an update is supported.
		* The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
		*/
		get isUpdateSupported() {
			return this._isUpdateSupported;
		}
		set isUpdateSupported(value) {
			if (value) this._isUpdateSupported = value;
		}
		/**
		* Allows developer to override default logic for determining if the user is below the rollout threshold.
		* The default logic compares the staging percentage with numerical representation of user ID.
		* An override can define custom logic, or bypass it if needed.
		*/
		get isUserWithinRollout() {
			return this._isUserWithinRollout;
		}
		set isUserWithinRollout(value) {
			if (value) this._isUserWithinRollout = value;
		}
		constructor(options, app) {
			super();
			/**
			* Whether to automatically download an update when it is found.
			* @default true
			*/
			this.autoDownload = true;
			/**
			* Whether to automatically install a downloaded update on app quit (if `quitAndInstall` was not called before).
			* @default true
			*/
			this.autoInstallOnAppQuit = true;
			/**
			* Whether to run the app after finish install when run the installer is NOT in silent mode.
			* @default true
			*/
			this.autoRunAppAfterInstall = true;
			/**
			* *GitHub provider only.* Whether to allow update to pre-release versions. Defaults to `true` if application version contains prerelease components (e.g. `0.12.1-alpha.1`, here `alpha` is a prerelease component), otherwise `false`.
			*
			* If `true`, downgrade will be allowed (`allowDowngrade` will be set to `true`).
			*/
			this.allowPrerelease = false;
			/**
			* *GitHub provider only.* Get all release notes (from current version to latest), not just the latest.
			* @default false
			*/
			this.fullChangelog = false;
			/**
			* Whether to allow version downgrade (when a user from the beta channel wants to go back to the stable channel).
			*
			* Taken in account only if channel differs (pre-release version component in terms of semantic versioning).
			*
			* @default false
			*/
			this.allowDowngrade = false;
			/**
			* Web installer files might not have signature verification, this switch prevents to load them unless it is needed.
			*
			* Currently false to prevent breaking the current API, but it should be changed to default true at some point that
			* breaking changes are allowed.
			*
			* @default false
			*/
			this.disableWebInstaller = false;
			/**
			* *NSIS only* Disable differential downloads and always perform full download of installer.
			*
			* @default false
			*/
			this.disableDifferentialDownload = false;
			/**
			* Allows developer to force the updater to work in "dev" mode, looking for "dev-app-update.yml" instead of "app-update.yml"
			* Dev: `path.join(this.app.getAppPath(), "dev-app-update.yml")`
			* Prod: `path.join(process.resourcesPath!, "app-update.yml")`
			*
			* @default false
			*/
			this.forceDevUpdateConfig = false;
			/**
			* The base URL of the old block map file.
			*
			* When null, the updater will use the base URL of the update file to download the update.
			* When set, the updater will use this string as the base URL of the old block map file.
			* Some servers like github cannot download the old block map file from latest release,
			* so you need to compute the old block map file base URL manually.
			*
			* @default null
			*/
			this.previousBlockmapBaseUrlOverride = null;
			this._channel = null;
			this.downloadedUpdateHelper = null;
			/**
			*  The request headers.
			*/
			this.requestHeaders = null;
			this._logger = console;
			/**
			* For type safety you can use signals, e.g. `autoUpdater.signals.updateDownloaded(() => {})` instead of `autoUpdater.on('update-available', () => {})`
			*/
			this.signals = new types_1.UpdaterSignal(this);
			this._appUpdateConfigPath = null;
			this._isUpdateSupported = (updateInfo) => this.checkIfUpdateSupported(updateInfo);
			this._isUserWithinRollout = (updateInfo) => this.isStagingMatch(updateInfo);
			this.clientPromise = null;
			this.stagingUserIdPromise = new lazy_val_1.Lazy(() => this.getOrCreateStagingUserId());
			/** @internal */
			this.configOnDisk = new lazy_val_1.Lazy(() => this.loadUpdateConfig());
			this.checkForUpdatesPromise = null;
			this.downloadPromise = null;
			this.updateInfoAndProvider = null;
			/**
			* @private
			* @internal
			*/
			this._testOnlyOptions = null;
			this.on("error", (error) => {
				this._logger.error(`Error: ${error.stack || error.message}`);
			});
			if (app == null) {
				this.app = new ElectronAppAdapter_1.ElectronAppAdapter();
				this.httpExecutor = new electronHttpExecutor_1.ElectronHttpExecutor((authInfo, callback) => this.emit("login", authInfo, callback));
			} else {
				this.app = app;
				this.httpExecutor = null;
			}
			const currentVersionString = this.app.version;
			const currentVersion = (0, semver_1.parse)(currentVersionString);
			if (currentVersion == null) throw (0, builder_util_runtime_1.newError)(`App version is not a valid semver version: "${currentVersionString}"`, "ERR_UPDATER_INVALID_VERSION");
			this.currentVersion = currentVersion;
			this.allowPrerelease = hasPrereleaseComponents(currentVersion);
			if (options != null) {
				this.setFeedURL(options);
				if (typeof options !== "string" && options.requestHeaders) this.requestHeaders = options.requestHeaders;
			}
		}
		getFeedURL() {
			return "Deprecated. Do not use it.";
		}
		/**
		* Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
		* @param options If you want to override configuration in the `app-update.yml`.
		*/
		setFeedURL(options) {
			const runtimeOptions = this.createProviderRuntimeOptions();
			let provider;
			if (typeof options === "string") provider = new GenericProvider_1.GenericProvider({
				provider: "generic",
				url: options
			}, this, {
				...runtimeOptions,
				isUseMultipleRangeRequest: (0, providerFactory_1.isUrlProbablySupportMultiRangeRequests)(options)
			});
			else provider = (0, providerFactory_1.createClient)(options, this, runtimeOptions);
			this.clientPromise = Promise.resolve(provider);
		}
		/**
		* Asks the server whether there is an update.
		* @returns null if the updater is disabled, otherwise info about the latest version
		*/
		checkForUpdates() {
			if (!this.isUpdaterActive()) return Promise.resolve(null);
			let checkForUpdatesPromise = this.checkForUpdatesPromise;
			if (checkForUpdatesPromise != null) {
				this._logger.info("Checking for update (already in progress)");
				return checkForUpdatesPromise;
			}
			const nullizePromise = () => this.checkForUpdatesPromise = null;
			this._logger.info("Checking for update");
			checkForUpdatesPromise = this.doCheckForUpdates().then((it) => {
				nullizePromise();
				return it;
			}).catch((e) => {
				nullizePromise();
				this.emit("error", e, `Cannot check for updates: ${(e.stack || e).toString()}`);
				throw e;
			});
			this.checkForUpdatesPromise = checkForUpdatesPromise;
			return checkForUpdatesPromise;
		}
		isUpdaterActive() {
			if (!(this.app.isPackaged || this.forceDevUpdateConfig)) {
				this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced");
				return false;
			}
			return true;
		}
		checkForUpdatesAndNotify(downloadNotification) {
			return this.checkForUpdates().then((it) => {
				if (!(it === null || it === void 0 ? void 0 : it.downloadPromise)) {
					if (this._logger.debug != null) this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null");
					return it;
				}
				it.downloadPromise.then(() => {
					const notificationContent = AppUpdater.formatDownloadNotification(it.updateInfo.version, this.app.name, downloadNotification);
					new (__require("electron")).Notification(notificationContent).show();
				});
				return it;
			});
		}
		static formatDownloadNotification(version, appName, downloadNotification) {
			if (downloadNotification == null) downloadNotification = {
				title: "A new update is ready to install",
				body: `{appName} version {version} has been downloaded and will be automatically installed on exit`
			};
			downloadNotification = {
				title: downloadNotification.title.replace("{appName}", appName).replace("{version}", version),
				body: downloadNotification.body.replace("{appName}", appName).replace("{version}", version)
			};
			return downloadNotification;
		}
		async isStagingMatch(updateInfo) {
			const rawStagingPercentage = updateInfo.stagingPercentage;
			let stagingPercentage = rawStagingPercentage;
			if (stagingPercentage == null) return true;
			stagingPercentage = parseInt(stagingPercentage, 10);
			if (isNaN(stagingPercentage)) {
				this._logger.warn(`Staging percentage is NaN: ${rawStagingPercentage}`);
				return true;
			}
			stagingPercentage = stagingPercentage / 100;
			const stagingUserId = await this.stagingUserIdPromise.value;
			const percentage = builder_util_runtime_1.UUID.parse(stagingUserId).readUInt32BE(12) / 4294967295;
			this._logger.info(`Staging percentage: ${stagingPercentage}, percentage: ${percentage}, user id: ${stagingUserId}`);
			return percentage < stagingPercentage;
		}
		computeFinalHeaders(headers) {
			if (this.requestHeaders != null) Object.assign(headers, this.requestHeaders);
			return headers;
		}
		async isUpdateAvailable(updateInfo) {
			const latestVersion = (0, semver_1.parse)(updateInfo.version);
			if (latestVersion == null) throw (0, builder_util_runtime_1.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${updateInfo.version}"`, "ERR_UPDATER_INVALID_VERSION");
			const currentVersion = this.currentVersion;
			if ((0, semver_1.eq)(latestVersion, currentVersion)) return false;
			if (!await Promise.resolve(this.isUpdateSupported(updateInfo))) return false;
			if (!await Promise.resolve(this.isUserWithinRollout(updateInfo))) return false;
			const isLatestVersionNewer = (0, semver_1.gt)(latestVersion, currentVersion);
			const isLatestVersionOlder = (0, semver_1.lt)(latestVersion, currentVersion);
			if (isLatestVersionNewer) return true;
			return this.allowDowngrade && isLatestVersionOlder;
		}
		checkIfUpdateSupported(updateInfo) {
			const minimumSystemVersion = updateInfo === null || updateInfo === void 0 ? void 0 : updateInfo.minimumSystemVersion;
			const currentOSVersion = (0, os_1.release)();
			if (minimumSystemVersion) try {
				if ((0, semver_1.lt)(currentOSVersion, minimumSystemVersion)) {
					this._logger.info(`Current OS version ${currentOSVersion} is less than the minimum OS version required ${minimumSystemVersion} for version ${currentOSVersion}`);
					return false;
				}
			} catch (e) {
				this._logger.warn(`Failed to compare current OS version(${currentOSVersion}) with minimum OS version(${minimumSystemVersion}): ${(e.message || e).toString()}`);
			}
			return true;
		}
		async getUpdateInfoAndProvider() {
			await this.app.whenReady();
			if (this.clientPromise == null) this.clientPromise = this.configOnDisk.value.then((it) => (0, providerFactory_1.createClient)(it, this, this.createProviderRuntimeOptions()));
			const client = await this.clientPromise;
			const stagingUserId = await this.stagingUserIdPromise.value;
			client.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": stagingUserId }));
			return {
				info: await client.getLatestVersion(),
				provider: client
			};
		}
		createProviderRuntimeOptions() {
			return {
				isUseMultipleRangeRequest: true,
				platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
				executor: this.httpExecutor
			};
		}
		async doCheckForUpdates() {
			this.emit("checking-for-update");
			const result = await this.getUpdateInfoAndProvider();
			const updateInfo = result.info;
			if (!await this.isUpdateAvailable(updateInfo)) {
				this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${updateInfo.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`);
				this.emit("update-not-available", updateInfo);
				return {
					isUpdateAvailable: false,
					versionInfo: updateInfo,
					updateInfo
				};
			}
			this.updateInfoAndProvider = result;
			this.onUpdateAvailable(updateInfo);
			const cancellationToken = new builder_util_runtime_1.CancellationToken();
			return {
				isUpdateAvailable: true,
				versionInfo: updateInfo,
				updateInfo,
				cancellationToken,
				downloadPromise: this.autoDownload ? this.downloadUpdate(cancellationToken) : null
			};
		}
		onUpdateAvailable(updateInfo) {
			this._logger.info(`Found version ${updateInfo.version} (url: ${(0, builder_util_runtime_1.asArray)(updateInfo.files).map((it) => it.url).join(", ")})`);
			this.emit("update-available", updateInfo);
		}
		/**
		* Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
		* @returns {Promise<Array<string>>} Paths to downloaded files.
		*/
		downloadUpdate(cancellationToken = new builder_util_runtime_1.CancellationToken()) {
			const updateInfoAndProvider = this.updateInfoAndProvider;
			if (updateInfoAndProvider == null) {
				const error = /* @__PURE__ */ new Error("Please check update first");
				this.dispatchError(error);
				return Promise.reject(error);
			}
			if (this.downloadPromise != null) {
				this._logger.info("Downloading update (already in progress)");
				return this.downloadPromise;
			}
			this._logger.info(`Downloading update from ${(0, builder_util_runtime_1.asArray)(updateInfoAndProvider.info.files).map((it) => it.url).join(", ")}`);
			const errorHandler = (e) => {
				if (!(e instanceof builder_util_runtime_1.CancellationError)) try {
					this.dispatchError(e);
				} catch (nestedError) {
					this._logger.warn(`Cannot dispatch error event: ${nestedError.stack || nestedError}`);
				}
				return e;
			};
			this.downloadPromise = this.doDownloadUpdate({
				updateInfoAndProvider,
				requestHeaders: this.computeRequestHeaders(updateInfoAndProvider.provider),
				cancellationToken,
				disableWebInstaller: this.disableWebInstaller,
				disableDifferentialDownload: this.disableDifferentialDownload
			}).catch((e) => {
				throw errorHandler(e);
			}).finally(() => {
				this.downloadPromise = null;
			});
			return this.downloadPromise;
		}
		dispatchError(e) {
			this.emit("error", e, (e.stack || e).toString());
		}
		dispatchUpdateDownloaded(event) {
			this.emit(types_1.UPDATE_DOWNLOADED, event);
		}
		async loadUpdateConfig() {
			if (this._appUpdateConfigPath == null) this._appUpdateConfigPath = this.app.appUpdateConfigPath;
			return (0, js_yaml_1.load)(await (0, fs_extra_1.readFile)(this._appUpdateConfigPath, "utf-8"));
		}
		computeRequestHeaders(provider) {
			const fileExtraDownloadHeaders = provider.fileExtraDownloadHeaders;
			if (fileExtraDownloadHeaders != null) {
				const requestHeaders = this.requestHeaders;
				return requestHeaders == null ? fileExtraDownloadHeaders : {
					...fileExtraDownloadHeaders,
					...requestHeaders
				};
			}
			return this.computeFinalHeaders({ accept: "*/*" });
		}
		async getOrCreateStagingUserId() {
			const file = path$5.join(this.app.userDataPath, ".updaterId");
			try {
				const id = await (0, fs_extra_1.readFile)(file, "utf-8");
				if (builder_util_runtime_1.UUID.check(id)) return id;
				else this._logger.warn(`Staging user id file exists, but content was invalid: ${id}`);
			} catch (e) {
				if (e.code !== "ENOENT") this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${e}`);
			}
			const id = builder_util_runtime_1.UUID.v5((0, crypto_1$1.randomBytes)(4096), builder_util_runtime_1.UUID.OID);
			this._logger.info(`Generated new staging user ID: ${id}`);
			try {
				await (0, fs_extra_1.outputFile)(file, id);
			} catch (e) {
				this._logger.warn(`Couldn't write out staging user ID: ${e}`);
			}
			return id;
		}
		/** @internal */
		get isAddNoCacheQuery() {
			const headers = this.requestHeaders;
			if (headers == null) return true;
			for (const headerName of Object.keys(headers)) {
				const s = headerName.toLowerCase();
				if (s === "authorization" || s === "private-token") return false;
			}
			return true;
		}
		async getOrCreateDownloadHelper() {
			let result = this.downloadedUpdateHelper;
			if (result == null) {
				const dirName = (await this.configOnDisk.value).updaterCacheDirName;
				const logger = this._logger;
				if (dirName == null) logger.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
				const cacheDir = path$5.join(this.app.baseCachePath, dirName || this.app.name);
				if (logger.debug != null) logger.debug(`updater cache dir: ${cacheDir}`);
				result = new DownloadedUpdateHelper_1.DownloadedUpdateHelper(cacheDir);
				this.downloadedUpdateHelper = result;
			}
			return result;
		}
		async executeDownload(taskOptions) {
			const fileInfo = taskOptions.fileInfo;
			const downloadOptions = {
				headers: taskOptions.downloadUpdateOptions.requestHeaders,
				cancellationToken: taskOptions.downloadUpdateOptions.cancellationToken,
				sha2: fileInfo.info.sha2,
				sha512: fileInfo.info.sha512
			};
			if (this.listenerCount(types_1.DOWNLOAD_PROGRESS) > 0) downloadOptions.onProgress = (it) => this.emit(types_1.DOWNLOAD_PROGRESS, it);
			const updateInfo = taskOptions.downloadUpdateOptions.updateInfoAndProvider.info;
			const version = updateInfo.version;
			const packageInfo = fileInfo.packageInfo;
			function getCacheUpdateFileName() {
				const urlPath = decodeURIComponent(taskOptions.fileInfo.url.pathname);
				if (urlPath.toLowerCase().endsWith(`.${taskOptions.fileExtension.toLowerCase()}`)) return path$5.basename(urlPath);
				else return taskOptions.fileInfo.info.url;
			}
			const downloadedUpdateHelper = await this.getOrCreateDownloadHelper();
			const cacheDir = downloadedUpdateHelper.cacheDirForPendingUpdate;
			await (0, fs_extra_1.mkdir)(cacheDir, { recursive: true });
			const updateFileName = getCacheUpdateFileName();
			let updateFile = path$5.join(cacheDir, updateFileName);
			const packageFile = packageInfo == null ? null : path$5.join(cacheDir, `package-${version}${path$5.extname(packageInfo.path) || ".7z"}`);
			const done = async (isSaveCache) => {
				await downloadedUpdateHelper.setDownloadedFile(updateFile, packageFile, updateInfo, fileInfo, updateFileName, isSaveCache);
				await taskOptions.done({
					...updateInfo,
					downloadedFile: updateFile
				});
				const currentBlockMapFile = path$5.join(cacheDir, "current.blockmap");
				if (await (0, fs_extra_1.pathExists)(currentBlockMapFile)) await (0, fs_extra_1.copyFile)(currentBlockMapFile, path$5.join(downloadedUpdateHelper.cacheDir, "current.blockmap"));
				return packageFile == null ? [updateFile] : [updateFile, packageFile];
			};
			const log = this._logger;
			const cachedUpdateFile = await downloadedUpdateHelper.validateDownloadedPath(updateFile, updateInfo, fileInfo, log);
			if (cachedUpdateFile != null) {
				updateFile = cachedUpdateFile;
				return await done(false);
			}
			const removeFileIfAny = async () => {
				await downloadedUpdateHelper.clear().catch(() => {});
				return await (0, fs_extra_1.unlink)(updateFile).catch(() => {});
			};
			const tempUpdateFile = await (0, DownloadedUpdateHelper_1.createTempUpdateFile)(`temp-${updateFileName}`, cacheDir, log);
			try {
				await taskOptions.task(tempUpdateFile, downloadOptions, packageFile, removeFileIfAny);
				await (0, builder_util_runtime_1.retry)(() => (0, fs_extra_1.rename)(tempUpdateFile, updateFile), {
					retries: 60,
					interval: 500,
					shouldRetry: (error) => {
						if (error instanceof Error && /^EBUSY:/.test(error.message)) return true;
						log.warn(`Cannot rename temp file to final file: ${error.message || error.stack}`);
						return false;
					}
				});
			} catch (e) {
				await removeFileIfAny();
				if (e instanceof builder_util_runtime_1.CancellationError) {
					log.info("cancelled");
					this.emit("update-cancelled", updateInfo);
				}
				throw e;
			}
			log.info(`New version ${version} has been downloaded to ${updateFile}`);
			return await done(true);
		}
		async differentialDownloadInstaller(fileInfo, downloadUpdateOptions, installerPath, provider, oldInstallerFileName) {
			try {
				if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload) return true;
				const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
				const blockmapFileUrls = await provider.getBlockMapFiles(fileInfo.url, this.app.version, downloadUpdateOptions.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
				this._logger.info(`Download block maps (old: "${blockmapFileUrls[0]}", new: ${blockmapFileUrls[1]})`);
				const downloadBlockMap = async (url) => {
					const data = await this.httpExecutor.downloadToBuffer(url, {
						headers: downloadUpdateOptions.requestHeaders,
						cancellationToken: downloadUpdateOptions.cancellationToken
					});
					if (data == null || data.length === 0) throw new Error(`Blockmap "${url.href}" is empty`);
					try {
						return JSON.parse((0, zlib_1$1.gunzipSync)(data).toString());
					} catch (e) {
						throw new Error(`Cannot parse blockmap "${url.href}", error: ${e}`);
					}
				};
				const downloadOptions = {
					newUrl: fileInfo.url,
					oldFile: path$5.join(this.downloadedUpdateHelper.cacheDir, oldInstallerFileName),
					logger: this._logger,
					newFile: installerPath,
					isUseMultipleRangeRequest: provider.isUseMultipleRangeRequest,
					requestHeaders: downloadUpdateOptions.requestHeaders,
					cancellationToken: downloadUpdateOptions.cancellationToken
				};
				if (this.listenerCount(types_1.DOWNLOAD_PROGRESS) > 0) downloadOptions.onProgress = (it) => this.emit(types_1.DOWNLOAD_PROGRESS, it);
				const saveBlockMapToCacheDir = async (blockMapData, cacheDir) => {
					const blockMapFile = path$5.join(cacheDir, "current.blockmap");
					await (0, fs_extra_1.outputFile)(blockMapFile, (0, zlib_1$1.gzipSync)(JSON.stringify(blockMapData)));
				};
				const getBlockMapFromCacheDir = async (cacheDir) => {
					const blockMapFile = path$5.join(cacheDir, "current.blockmap");
					try {
						if (await (0, fs_extra_1.pathExists)(blockMapFile)) return JSON.parse((0, zlib_1$1.gunzipSync)(await (0, fs_extra_1.readFile)(blockMapFile)).toString());
					} catch (e) {
						this._logger.warn(`Cannot parse blockmap "${blockMapFile}", error: ${e}`);
					}
					return null;
				};
				const newBlockMapData = await downloadBlockMap(blockmapFileUrls[1]);
				await saveBlockMapToCacheDir(newBlockMapData, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
				let oldBlockMapData = await getBlockMapFromCacheDir(this.downloadedUpdateHelper.cacheDir);
				if (oldBlockMapData == null) oldBlockMapData = await downloadBlockMap(blockmapFileUrls[0]);
				await new GenericDifferentialDownloader_1.GenericDifferentialDownloader(fileInfo.info, this.httpExecutor, downloadOptions).download(oldBlockMapData, newBlockMapData);
				return false;
			} catch (e) {
				this._logger.error(`Cannot download differentially, fallback to full download: ${e.stack || e}`);
				if (this._testOnlyOptions != null) throw e;
				return true;
			}
		}
	};
	function hasPrereleaseComponents(version) {
		const versionPrereleaseComponent = (0, semver_1.prerelease)(version);
		return versionPrereleaseComponent != null && versionPrereleaseComponent.length > 0;
	}
	/** @private */
	var NoOpLogger = class {
		info(message) {}
		warn(message) {}
		error(message) {}
	};
	exports.NoOpLogger = NoOpLogger;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/BaseUpdater.js
var require_BaseUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BaseUpdater = void 0;
	var child_process_1$3 = __require("child_process");
	var AppUpdater_1 = require_AppUpdater();
	var BaseUpdater = class extends AppUpdater_1.AppUpdater {
		constructor(options, app) {
			super(options, app);
			this.quitAndInstallCalled = false;
			this.quitHandlerAdded = false;
		}
		quitAndInstall(isSilent = false, isForceRunAfter = false) {
			this._logger.info(`Install on explicit quitAndInstall`);
			if (this.install(isSilent, isSilent ? isForceRunAfter : this.autoRunAppAfterInstall)) setImmediate(() => {
				__require("electron").autoUpdater.emit("before-quit-for-update");
				this.app.quit();
			});
			else this.quitAndInstallCalled = false;
		}
		executeDownload(taskOptions) {
			return super.executeDownload({
				...taskOptions,
				done: (event) => {
					this.dispatchUpdateDownloaded(event);
					this.addQuitHandler();
					return Promise.resolve();
				}
			});
		}
		get installerPath() {
			return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
		}
		install(isSilent = false, isForceRunAfter = false) {
			if (this.quitAndInstallCalled) {
				this._logger.warn("install call ignored: quitAndInstallCalled is set to true");
				return false;
			}
			const downloadedUpdateHelper = this.downloadedUpdateHelper;
			const installerPath = this.installerPath;
			const downloadedFileInfo = downloadedUpdateHelper == null ? null : downloadedUpdateHelper.downloadedFileInfo;
			if (installerPath == null || downloadedFileInfo == null) {
				this.dispatchError(/* @__PURE__ */ new Error("No update filepath provided, can't quit and install"));
				return false;
			}
			this.quitAndInstallCalled = true;
			try {
				this._logger.info(`Install: isSilent: ${isSilent}, isForceRunAfter: ${isForceRunAfter}`);
				return this.doInstall({
					isSilent,
					isForceRunAfter,
					isAdminRightsRequired: downloadedFileInfo.isAdminRightsRequired
				});
			} catch (e) {
				this.dispatchError(e);
				return false;
			}
		}
		addQuitHandler() {
			if (this.quitHandlerAdded || !this.autoInstallOnAppQuit) return;
			this.quitHandlerAdded = true;
			this.app.onQuit((exitCode) => {
				if (this.quitAndInstallCalled) {
					this._logger.info("Update installer has already been triggered. Quitting application.");
					return;
				}
				if (!this.autoInstallOnAppQuit) {
					this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
					return;
				}
				if (exitCode !== 0) {
					this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${exitCode}`);
					return;
				}
				this._logger.info("Auto install update on quit");
				this.install(true, false);
			});
		}
		spawnSyncLog(cmd, args = [], env = {}) {
			this._logger.info(`Executing: ${cmd} with args: ${args}`);
			const { error, status, stdout, stderr } = (0, child_process_1$3.spawnSync)(cmd, args, {
				env: {
					...process.env,
					...env
				},
				encoding: "utf-8",
				shell: true
			});
			if (error != null) {
				this._logger.error(stderr);
				throw error;
			} else if (status != null && status !== 0) {
				this._logger.error(stderr);
				throw new Error(`Command ${cmd} exited with code ${status}`);
			}
			return stdout.trim();
		}
		/**
		* This handles both node 8 and node 10 way of emitting error when spawning a process
		*   - node 8: Throws the error
		*   - node 10: Emit the error(Need to listen with on)
		*/
		async spawnLog(cmd, args = [], env = void 0, stdio = "ignore") {
			this._logger.info(`Executing: ${cmd} with args: ${args}`);
			return new Promise((resolve, reject) => {
				try {
					const params = {
						stdio,
						env,
						detached: true
					};
					const p = (0, child_process_1$3.spawn)(cmd, args, params);
					p.on("error", (error) => {
						reject(error);
					});
					p.unref();
					if (p.pid !== void 0) resolve(true);
				} catch (error) {
					reject(error);
				}
			});
		}
	};
	exports.BaseUpdater = BaseUpdater;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/differentialDownloader/FileWithEmbeddedBlockMapDifferentialDownloader.js
var require_FileWithEmbeddedBlockMapDifferentialDownloader = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
	var fs_extra_1 = require_lib();
	var DifferentialDownloader_1 = require_DifferentialDownloader();
	var zlib_1 = __require("zlib");
	var FileWithEmbeddedBlockMapDifferentialDownloader = class extends DifferentialDownloader_1.DifferentialDownloader {
		async download() {
			const packageInfo = this.blockAwareFileInfo;
			const fileSize = packageInfo.size;
			const offset = fileSize - (packageInfo.blockMapSize + 4);
			this.fileMetadataBuffer = await this.readRemoteBytes(offset, fileSize - 1);
			const newBlockMap = readBlockMap(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
			await this.doDownload(await readEmbeddedBlockMapData(this.options.oldFile), newBlockMap);
		}
	};
	exports.FileWithEmbeddedBlockMapDifferentialDownloader = FileWithEmbeddedBlockMapDifferentialDownloader;
	function readBlockMap(data) {
		return JSON.parse((0, zlib_1.inflateRawSync)(data).toString());
	}
	async function readEmbeddedBlockMapData(file) {
		const fd = await (0, fs_extra_1.open)(file, "r");
		try {
			const fileSize = (await (0, fs_extra_1.fstat)(fd)).size;
			const sizeBuffer = Buffer.allocUnsafe(4);
			await (0, fs_extra_1.read)(fd, sizeBuffer, 0, sizeBuffer.length, fileSize - sizeBuffer.length);
			const dataBuffer = Buffer.allocUnsafe(sizeBuffer.readUInt32BE(0));
			await (0, fs_extra_1.read)(fd, dataBuffer, 0, dataBuffer.length, fileSize - sizeBuffer.length - dataBuffer.length);
			await (0, fs_extra_1.close)(fd);
			return readBlockMap(dataBuffer);
		} catch (e) {
			await (0, fs_extra_1.close)(fd);
			throw e;
		}
	}
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/AppImageUpdater.js
var require_AppImageUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AppImageUpdater = void 0;
	var builder_util_runtime_1 = require_out();
	var child_process_1$2 = __require("child_process");
	var fs_extra_1 = require_lib();
	var fs_1$1 = __require("fs");
	var path$4 = __require("path");
	var BaseUpdater_1 = require_BaseUpdater();
	var FileWithEmbeddedBlockMapDifferentialDownloader_1 = require_FileWithEmbeddedBlockMapDifferentialDownloader();
	var Provider_1 = require_Provider();
	var types_1 = require_types();
	var AppImageUpdater = class extends BaseUpdater_1.BaseUpdater {
		constructor(options, app) {
			super(options, app);
		}
		isUpdaterActive() {
			if (process.env["APPIMAGE"] == null && !this.forceDevUpdateConfig) {
				if (process.env["SNAP"] == null) this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage");
				else this._logger.info("SNAP env is defined, updater is disabled");
				return false;
			}
			return super.isUpdaterActive();
		}
		/*** @private */
		doDownloadUpdate(downloadUpdateOptions) {
			const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
			const fileInfo = (0, Provider_1.findFile)(provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info), "AppImage", [
				"rpm",
				"deb",
				"pacman"
			]);
			return this.executeDownload({
				fileExtension: "AppImage",
				fileInfo,
				downloadUpdateOptions,
				task: async (updateFile, downloadOptions) => {
					const oldFile = process.env["APPIMAGE"];
					if (oldFile == null) throw (0, builder_util_runtime_1.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
					if (downloadUpdateOptions.disableDifferentialDownload || await this.downloadDifferential(fileInfo, oldFile, updateFile, provider, downloadUpdateOptions)) await this.httpExecutor.download(fileInfo.url, updateFile, downloadOptions);
					await (0, fs_extra_1.chmod)(updateFile, 493);
				}
			});
		}
		async downloadDifferential(fileInfo, oldFile, updateFile, provider, downloadUpdateOptions) {
			try {
				const downloadOptions = {
					newUrl: fileInfo.url,
					oldFile,
					logger: this._logger,
					newFile: updateFile,
					isUseMultipleRangeRequest: provider.isUseMultipleRangeRequest,
					requestHeaders: downloadUpdateOptions.requestHeaders,
					cancellationToken: downloadUpdateOptions.cancellationToken
				};
				if (this.listenerCount(types_1.DOWNLOAD_PROGRESS) > 0) downloadOptions.onProgress = (it) => this.emit(types_1.DOWNLOAD_PROGRESS, it);
				await new FileWithEmbeddedBlockMapDifferentialDownloader_1.FileWithEmbeddedBlockMapDifferentialDownloader(fileInfo.info, this.httpExecutor, downloadOptions).download();
				return false;
			} catch (e) {
				this._logger.error(`Cannot download differentially, fallback to full download: ${e.stack || e}`);
				return process.platform === "linux";
			}
		}
		doInstall(options) {
			const appImageFile = process.env["APPIMAGE"];
			if (appImageFile == null) throw (0, builder_util_runtime_1.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
			(0, fs_1$1.unlinkSync)(appImageFile);
			let destination;
			const existingBaseName = path$4.basename(appImageFile);
			const installerPath = this.installerPath;
			if (installerPath == null) {
				this.dispatchError(/* @__PURE__ */ new Error("No update filepath provided, can't quit and install"));
				return false;
			}
			if (path$4.basename(installerPath) === existingBaseName || !/\d+\.\d+\.\d+/.test(existingBaseName)) destination = appImageFile;
			else destination = path$4.join(path$4.dirname(appImageFile), path$4.basename(installerPath));
			(0, child_process_1$2.execFileSync)("mv", [
				"-f",
				installerPath,
				destination
			]);
			if (destination !== appImageFile) this.emit("appimage-filename-updated", destination);
			const env = {
				...process.env,
				APPIMAGE_SILENT_INSTALL: "true"
			};
			if (options.isForceRunAfter) this.spawnLog(destination, [], env);
			else {
				env.APPIMAGE_EXIT_AFTER_INSTALL = "true";
				(0, child_process_1$2.execFileSync)(destination, [], { env });
			}
			return true;
		}
	};
	exports.AppImageUpdater = AppImageUpdater;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/LinuxUpdater.js
var require_LinuxUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.LinuxUpdater = void 0;
	var BaseUpdater_1 = require_BaseUpdater();
	var LinuxUpdater = class extends BaseUpdater_1.BaseUpdater {
		constructor(options, app) {
			super(options, app);
		}
		/**
		* Returns true if the current process is running as root.
		*/
		isRunningAsRoot() {
			var _a;
			return ((_a = process.getuid) === null || _a === void 0 ? void 0 : _a.call(process)) === 0;
		}
		/**
		* Sanitizies the installer path for using with command line tools.
		*/
		get installerPath() {
			var _a, _b;
			return (_b = (_a = super.installerPath) === null || _a === void 0 ? void 0 : _a.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && _b !== void 0 ? _b : null;
		}
		runCommandWithSudoIfNeeded(commandWithArgs) {
			if (this.isRunningAsRoot()) {
				this._logger.info("Running as root, no need to use sudo");
				return this.spawnSyncLog(commandWithArgs[0], commandWithArgs.slice(1));
			}
			const { name } = this.app;
			const installComment = `"${name} would like to update"`;
			const sudo = this.sudoWithArgs(installComment);
			this._logger.info(`Running as non-root user, using sudo to install: ${sudo}`);
			let wrapper = `"`;
			if (/pkexec/i.test(sudo[0]) || sudo[0] === "sudo") wrapper = "";
			return this.spawnSyncLog(sudo[0], [
				...sudo.length > 1 ? sudo.slice(1) : [],
				`${wrapper}/bin/bash`,
				"-c",
				`'${commandWithArgs.join(" ")}'${wrapper}`
			]);
		}
		sudoWithArgs(installComment) {
			const sudo = this.determineSudoCommand();
			const command = [sudo];
			if (/kdesudo/i.test(sudo)) {
				command.push("--comment", installComment);
				command.push("-c");
			} else if (/gksudo/i.test(sudo)) command.push("--message", installComment);
			else if (/pkexec/i.test(sudo)) command.push("--disable-internal-agent");
			return command;
		}
		hasCommand(cmd) {
			try {
				this.spawnSyncLog(`command`, ["-v", cmd]);
				return true;
			} catch {
				return false;
			}
		}
		determineSudoCommand() {
			for (const sudo of [
				"gksudo",
				"kdesudo",
				"pkexec",
				"beesu"
			]) if (this.hasCommand(sudo)) return sudo;
			return "sudo";
		}
		/**
		* Detects the package manager to use based on the available commands.
		* Allows overriding the default behavior by setting the ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER environment variable.
		* If the environment variable is set, it will be used directly. (This is useful for testing each package manager logic path.)
		* Otherwise, it checks for the presence of the specified package manager commands in the order provided.
		* @param pms - An array of package manager commands to check for, in priority order.
		* @returns The detected package manager command or "unknown" if none are found.
		*/
		detectPackageManager(pms) {
			var _a;
			const pmOverride = (_a = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || _a === void 0 ? void 0 : _a.trim();
			if (pmOverride) return pmOverride;
			for (const pm of pms) if (this.hasCommand(pm)) return pm;
			this._logger.warn(`No package manager found in the list: ${pms.join(", ")}. Defaulting to the first one: ${pms[0]}`);
			return pms[0];
		}
	};
	exports.LinuxUpdater = LinuxUpdater;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/DebUpdater.js
var require_DebUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DebUpdater = void 0;
	var Provider_1 = require_Provider();
	var types_1 = require_types();
	var LinuxUpdater_1 = require_LinuxUpdater();
	exports.DebUpdater = class DebUpdater extends LinuxUpdater_1.LinuxUpdater {
		constructor(options, app) {
			super(options, app);
		}
		/*** @private */
		doDownloadUpdate(downloadUpdateOptions) {
			const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
			const fileInfo = (0, Provider_1.findFile)(provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info), "deb", [
				"AppImage",
				"rpm",
				"pacman"
			]);
			return this.executeDownload({
				fileExtension: "deb",
				fileInfo,
				downloadUpdateOptions,
				task: async (updateFile, downloadOptions) => {
					if (this.listenerCount(types_1.DOWNLOAD_PROGRESS) > 0) downloadOptions.onProgress = (it) => this.emit(types_1.DOWNLOAD_PROGRESS, it);
					await this.httpExecutor.download(fileInfo.url, updateFile, downloadOptions);
				}
			});
		}
		doInstall(options) {
			const installerPath = this.installerPath;
			if (installerPath == null) {
				this.dispatchError(/* @__PURE__ */ new Error("No update filepath provided, can't quit and install"));
				return false;
			}
			if (!this.hasCommand("dpkg") && !this.hasCommand("apt")) {
				this.dispatchError(/* @__PURE__ */ new Error("Neither dpkg nor apt command found. Cannot install .deb package."));
				return false;
			}
			const packageManager = this.detectPackageManager(["dpkg", "apt"]);
			try {
				DebUpdater.installWithCommandRunner(packageManager, installerPath, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
			} catch (error) {
				this.dispatchError(error);
				return false;
			}
			if (options.isForceRunAfter) this.app.relaunch();
			return true;
		}
		static installWithCommandRunner(packageManager, installerPath, commandRunner, logger) {
			var _a;
			if (packageManager === "dpkg") try {
				commandRunner([
					"dpkg",
					"-i",
					installerPath
				]);
			} catch (error) {
				logger.warn((_a = error.message) !== null && _a !== void 0 ? _a : error);
				logger.warn("dpkg installation failed, trying to fix broken dependencies with apt-get");
				commandRunner([
					"apt-get",
					"install",
					"-f",
					"-y"
				]);
			}
			else if (packageManager === "apt") {
				logger.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured.");
				commandRunner([
					"apt",
					"install",
					"-y",
					"--allow-unauthenticated",
					"--allow-downgrades",
					"--allow-change-held-packages",
					installerPath
				]);
			} else throw new Error(`Package manager ${packageManager} not supported`);
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/PacmanUpdater.js
var require_PacmanUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PacmanUpdater = void 0;
	var types_1 = require_types();
	var Provider_1 = require_Provider();
	var LinuxUpdater_1 = require_LinuxUpdater();
	exports.PacmanUpdater = class PacmanUpdater extends LinuxUpdater_1.LinuxUpdater {
		constructor(options, app) {
			super(options, app);
		}
		/*** @private */
		doDownloadUpdate(downloadUpdateOptions) {
			const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
			const fileInfo = (0, Provider_1.findFile)(provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info), "pacman", [
				"AppImage",
				"deb",
				"rpm"
			]);
			return this.executeDownload({
				fileExtension: "pacman",
				fileInfo,
				downloadUpdateOptions,
				task: async (updateFile, downloadOptions) => {
					if (this.listenerCount(types_1.DOWNLOAD_PROGRESS) > 0) downloadOptions.onProgress = (it) => this.emit(types_1.DOWNLOAD_PROGRESS, it);
					await this.httpExecutor.download(fileInfo.url, updateFile, downloadOptions);
				}
			});
		}
		doInstall(options) {
			const installerPath = this.installerPath;
			if (installerPath == null) {
				this.dispatchError(/* @__PURE__ */ new Error("No update filepath provided, can't quit and install"));
				return false;
			}
			try {
				PacmanUpdater.installWithCommandRunner(installerPath, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
			} catch (error) {
				this.dispatchError(error);
				return false;
			}
			if (options.isForceRunAfter) this.app.relaunch();
			return true;
		}
		static installWithCommandRunner(installerPath, commandRunner, logger) {
			var _a;
			try {
				commandRunner([
					"pacman",
					"-U",
					"--noconfirm",
					installerPath
				]);
			} catch (error) {
				logger.warn((_a = error.message) !== null && _a !== void 0 ? _a : error);
				logger.warn("pacman installation failed, attempting to update package database and retry");
				try {
					commandRunner([
						"pacman",
						"-Sy",
						"--noconfirm"
					]);
					commandRunner([
						"pacman",
						"-U",
						"--noconfirm",
						installerPath
					]);
				} catch (retryError) {
					logger.error("Retry after pacman -Sy failed");
					throw retryError;
				}
			}
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/RpmUpdater.js
var require_RpmUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RpmUpdater = void 0;
	var types_1 = require_types();
	var Provider_1 = require_Provider();
	var LinuxUpdater_1 = require_LinuxUpdater();
	exports.RpmUpdater = class RpmUpdater extends LinuxUpdater_1.LinuxUpdater {
		constructor(options, app) {
			super(options, app);
		}
		/*** @private */
		doDownloadUpdate(downloadUpdateOptions) {
			const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
			const fileInfo = (0, Provider_1.findFile)(provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info), "rpm", [
				"AppImage",
				"deb",
				"pacman"
			]);
			return this.executeDownload({
				fileExtension: "rpm",
				fileInfo,
				downloadUpdateOptions,
				task: async (updateFile, downloadOptions) => {
					if (this.listenerCount(types_1.DOWNLOAD_PROGRESS) > 0) downloadOptions.onProgress = (it) => this.emit(types_1.DOWNLOAD_PROGRESS, it);
					await this.httpExecutor.download(fileInfo.url, updateFile, downloadOptions);
				}
			});
		}
		doInstall(options) {
			const installerPath = this.installerPath;
			if (installerPath == null) {
				this.dispatchError(/* @__PURE__ */ new Error("No update filepath provided, can't quit and install"));
				return false;
			}
			const packageManager = this.detectPackageManager([
				"zypper",
				"dnf",
				"yum",
				"rpm"
			]);
			try {
				RpmUpdater.installWithCommandRunner(packageManager, installerPath, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
			} catch (error) {
				this.dispatchError(error);
				return false;
			}
			if (options.isForceRunAfter) this.app.relaunch();
			return true;
		}
		static installWithCommandRunner(packageManager, installerPath, commandRunner, logger) {
			if (packageManager === "zypper") return commandRunner([
				"zypper",
				"--non-interactive",
				"--no-refresh",
				"install",
				"--allow-unsigned-rpm",
				"-f",
				installerPath
			]);
			if (packageManager === "dnf") return commandRunner([
				"dnf",
				"install",
				"--nogpgcheck",
				"-y",
				installerPath
			]);
			if (packageManager === "yum") return commandRunner([
				"yum",
				"install",
				"--nogpgcheck",
				"-y",
				installerPath
			]);
			if (packageManager === "rpm") {
				logger.warn("Installing with rpm only (no dependency resolution).");
				return commandRunner([
					"rpm",
					"-Uvh",
					"--replacepkgs",
					"--replacefiles",
					"--nodeps",
					installerPath
				]);
			}
			throw new Error(`Package manager ${packageManager} not supported`);
		}
	};
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/MacUpdater.js
var require_MacUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MacUpdater = void 0;
	var builder_util_runtime_1 = require_out();
	var fs_extra_1 = require_lib();
	var fs_1 = __require("fs");
	var path$3 = __require("path");
	var http_1 = __require("http");
	var AppUpdater_1 = require_AppUpdater();
	var Provider_1 = require_Provider();
	var child_process_1$1 = __require("child_process");
	var crypto_1 = __require("crypto");
	var MacUpdater = class extends AppUpdater_1.AppUpdater {
		constructor(options, app) {
			super(options, app);
			this.nativeUpdater = __require("electron").autoUpdater;
			this.squirrelDownloadedUpdate = false;
			this.nativeUpdater.on("error", (it) => {
				this._logger.warn(it);
				this.emit("error", it);
			});
			this.nativeUpdater.on("update-downloaded", () => {
				this.squirrelDownloadedUpdate = true;
				this.debug("nativeUpdater.update-downloaded");
			});
		}
		debug(message) {
			if (this._logger.debug != null) this._logger.debug(message);
		}
		closeServerIfExists() {
			if (this.server) {
				this.debug("Closing proxy server");
				this.server.close((err) => {
					if (err) this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
				});
			}
		}
		async doDownloadUpdate(downloadUpdateOptions) {
			let files = downloadUpdateOptions.updateInfoAndProvider.provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info);
			const log = this._logger;
			const sysctlRosettaInfoKey = "sysctl.proc_translated";
			let isRosetta = false;
			try {
				this.debug("Checking for macOS Rosetta environment");
				isRosetta = (0, child_process_1$1.execFileSync)("sysctl", [sysctlRosettaInfoKey], { encoding: "utf8" }).includes(`${sysctlRosettaInfoKey}: 1`);
				log.info(`Checked for macOS Rosetta environment (isRosetta=${isRosetta})`);
			} catch (e) {
				log.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${e}`);
			}
			let isArm64Mac = false;
			try {
				this.debug("Checking for arm64 in uname");
				const isArm = (0, child_process_1$1.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
				log.info(`Checked 'uname -a': arm64=${isArm}`);
				isArm64Mac = isArm64Mac || isArm;
			} catch (e) {
				log.warn(`uname shell command to check for arm64 failed: ${e}`);
			}
			isArm64Mac = isArm64Mac || process.arch === "arm64" || isRosetta;
			const isArm64 = (file) => {
				var _a;
				return file.url.pathname.includes("arm64") || ((_a = file.info.url) === null || _a === void 0 ? void 0 : _a.includes("arm64"));
			};
			if (isArm64Mac && files.some(isArm64)) files = files.filter((file) => isArm64Mac === isArm64(file));
			else files = files.filter((file) => !isArm64(file));
			const zipFileInfo = (0, Provider_1.findFile)(files, "zip", ["pkg", "dmg"]);
			if (zipFileInfo == null) throw (0, builder_util_runtime_1.newError)(`ZIP file not provided: ${(0, builder_util_runtime_1.safeStringifyJson)(files)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
			const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
			const CURRENT_MAC_APP_ZIP_FILE_NAME = "update.zip";
			return this.executeDownload({
				fileExtension: "zip",
				fileInfo: zipFileInfo,
				downloadUpdateOptions,
				task: async (destinationFile, downloadOptions) => {
					const cachedUpdateFilePath = path$3.join(this.downloadedUpdateHelper.cacheDir, CURRENT_MAC_APP_ZIP_FILE_NAME);
					const canDifferentialDownload = () => {
						if (!(0, fs_extra_1.pathExistsSync)(cachedUpdateFilePath)) {
							log.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download");
							return false;
						}
						return !downloadUpdateOptions.disableDifferentialDownload;
					};
					let differentialDownloadFailed = true;
					if (canDifferentialDownload()) differentialDownloadFailed = await this.differentialDownloadInstaller(zipFileInfo, downloadUpdateOptions, destinationFile, provider, CURRENT_MAC_APP_ZIP_FILE_NAME);
					if (differentialDownloadFailed) await this.httpExecutor.download(zipFileInfo.url, destinationFile, downloadOptions);
				},
				done: async (event) => {
					if (!downloadUpdateOptions.disableDifferentialDownload) try {
						const cachedUpdateFilePath = path$3.join(this.downloadedUpdateHelper.cacheDir, CURRENT_MAC_APP_ZIP_FILE_NAME);
						await (0, fs_extra_1.copyFile)(event.downloadedFile, cachedUpdateFilePath);
					} catch (error) {
						this._logger.warn(`Unable to copy file for caching for future differential downloads: ${error.message}`);
					}
					return this.updateDownloaded(zipFileInfo, event);
				}
			});
		}
		async updateDownloaded(zipFileInfo, event) {
			var _a;
			const downloadedFile = event.downloadedFile;
			const updateFileSize = (_a = zipFileInfo.info.size) !== null && _a !== void 0 ? _a : (await (0, fs_extra_1.stat)(downloadedFile)).size;
			const log = this._logger;
			const logContext = `fileToProxy=${zipFileInfo.url.href}`;
			this.closeServerIfExists();
			this.debug(`Creating proxy server for native Squirrel.Mac (${logContext})`);
			this.server = (0, http_1.createServer)();
			this.debug(`Proxy server for native Squirrel.Mac is created (${logContext})`);
			this.server.on("close", () => {
				log.info(`Proxy server for native Squirrel.Mac is closed (${logContext})`);
			});
			const getServerUrl = (s) => {
				const address = s.address();
				if (typeof address === "string") return address;
				return `http://127.0.0.1:${address === null || address === void 0 ? void 0 : address.port}`;
			};
			return await new Promise((resolve, reject) => {
				const pass = (0, crypto_1.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-");
				const authInfo = Buffer.from(`autoupdater:${pass}`, "ascii");
				const fileUrl = `/${(0, crypto_1.randomBytes)(64).toString("hex")}.zip`;
				this.server.on("request", (request, response) => {
					const requestUrl = request.url;
					log.info(`${requestUrl} requested`);
					if (requestUrl === "/") {
						if (!request.headers.authorization || request.headers.authorization.indexOf("Basic ") === -1) {
							response.statusCode = 401;
							response.statusMessage = "Invalid Authentication Credentials";
							response.end();
							log.warn("No authenthication info");
							return;
						}
						const base64Credentials = request.headers.authorization.split(" ")[1];
						const [username, password] = Buffer.from(base64Credentials, "base64").toString("ascii").split(":");
						if (username !== "autoupdater" || password !== pass) {
							response.statusCode = 401;
							response.statusMessage = "Invalid Authentication Credentials";
							response.end();
							log.warn("Invalid authenthication credentials");
							return;
						}
						const data = Buffer.from(`{ "url": "${getServerUrl(this.server)}${fileUrl}" }`);
						response.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": data.length
						});
						response.end(data);
						return;
					}
					if (!requestUrl.startsWith(fileUrl)) {
						log.warn(`${requestUrl} requested, but not supported`);
						response.writeHead(404);
						response.end();
						return;
					}
					log.info(`${fileUrl} requested by Squirrel.Mac, pipe ${downloadedFile}`);
					let errorOccurred = false;
					response.on("finish", () => {
						if (!errorOccurred) {
							this.nativeUpdater.removeListener("error", reject);
							resolve([]);
						}
					});
					const readStream = (0, fs_1.createReadStream)(downloadedFile);
					readStream.on("error", (error) => {
						try {
							response.end();
						} catch (e) {
							log.warn(`cannot end response: ${e}`);
						}
						errorOccurred = true;
						this.nativeUpdater.removeListener("error", reject);
						reject(/* @__PURE__ */ new Error(`Cannot pipe "${downloadedFile}": ${error}`));
					});
					response.writeHead(200, {
						"Content-Type": "application/zip",
						"Content-Length": updateFileSize
					});
					readStream.pipe(response);
				});
				this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${logContext})`);
				this.server.listen(0, "127.0.0.1", () => {
					this.debug(`Proxy server for native Squirrel.Mac is listening (address=${getServerUrl(this.server)}, ${logContext})`);
					this.nativeUpdater.setFeedURL({
						url: getServerUrl(this.server),
						headers: {
							"Cache-Control": "no-cache",
							Authorization: `Basic ${authInfo.toString("base64")}`
						}
					});
					this.dispatchUpdateDownloaded(event);
					if (this.autoInstallOnAppQuit) {
						this.nativeUpdater.once("error", reject);
						this.nativeUpdater.checkForUpdates();
					} else resolve([]);
				});
			});
		}
		handleUpdateDownloaded() {
			if (this.autoRunAppAfterInstall) this.nativeUpdater.quitAndInstall();
			else this.app.quit();
			this.closeServerIfExists();
		}
		quitAndInstall() {
			if (this.squirrelDownloadedUpdate) this.handleUpdateDownloaded();
			else {
				this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded());
				if (!this.autoInstallOnAppQuit)
 /**
				* If this was not `true` previously then MacUpdater.doDownloadUpdate()
				* would not actually initiate the downloading by electron's autoUpdater
				*/
				this.nativeUpdater.checkForUpdates();
			}
		}
	};
	exports.MacUpdater = MacUpdater;
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/windowsExecutableCodeSignatureVerifier.js
var require_windowsExecutableCodeSignatureVerifier = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.verifySignature = verifySignature;
	var builder_util_runtime_1 = require_out();
	var child_process_1 = __require("child_process");
	var os$1 = __require("os");
	var path$2 = __require("path");
	function preparePowerShellExec(command, timeout) {
		return [
			`set "PSModulePath=" & chcp 65001 >NUL & powershell.exe`,
			[
				"-NoProfile",
				"-NonInteractive",
				"-InputFormat",
				"None",
				"-Command",
				command
			],
			{
				shell: true,
				timeout
			}
		];
	}
	function verifySignature(publisherNames, unescapedTempUpdateFile, logger) {
		return new Promise((resolve, reject) => {
			const tempUpdateFile = unescapedTempUpdateFile.replace(/'/g, "''");
			logger.info(`Verifying signature ${tempUpdateFile}`);
			(0, child_process_1.execFile)(...preparePowerShellExec(`"Get-AuthenticodeSignature -LiteralPath '${tempUpdateFile}' | ConvertTo-Json -Compress"`, 20 * 1e3), (error, stdout, stderr) => {
				var _a;
				try {
					if (error != null || stderr) {
						handleError(logger, error, stderr, reject);
						resolve(null);
						return;
					}
					const data = parseOut(stdout);
					if (data.Status === 0) {
						try {
							const normlaizedUpdateFilePath = path$2.normalize(data.Path);
							const normalizedTempUpdateFile = path$2.normalize(unescapedTempUpdateFile);
							logger.info(`LiteralPath: ${normlaizedUpdateFilePath}. Update Path: ${normalizedTempUpdateFile}`);
							if (normlaizedUpdateFilePath !== normalizedTempUpdateFile) {
								handleError(logger, /* @__PURE__ */ new Error(`LiteralPath of ${normlaizedUpdateFilePath} is different than ${normalizedTempUpdateFile}`), stderr, reject);
								resolve(null);
								return;
							}
						} catch (error) {
							logger.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(_a = error.message) !== null && _a !== void 0 ? _a : error.stack}`);
						}
						const subject = (0, builder_util_runtime_1.parseDn)(data.SignerCertificate.Subject);
						let match = false;
						for (const name of publisherNames) {
							const dn = (0, builder_util_runtime_1.parseDn)(name);
							if (dn.size) match = Array.from(dn.keys()).every((key) => {
								return dn.get(key) === subject.get(key);
							});
							else if (name === subject.get("CN")) {
								logger.warn(`Signature validated using only CN ${name}. Please add your full Distinguished Name (DN) to publisherNames configuration`);
								match = true;
							}
							if (match) {
								resolve(null);
								return;
							}
						}
					}
					const result = `publisherNames: ${publisherNames.join(" | ")}, raw info: ` + JSON.stringify(data, (name, value) => name === "RawData" ? void 0 : value, 2);
					logger.warn(`Sign verification failed, installer signed with incorrect certificate: ${result}`);
					resolve(result);
				} catch (e) {
					handleError(logger, e, null, reject);
					resolve(null);
					return;
				}
			});
		});
	}
	function parseOut(out) {
		const data = JSON.parse(out);
		delete data.PrivateKey;
		delete data.IsOSBinary;
		delete data.SignatureType;
		const signerCertificate = data.SignerCertificate;
		if (signerCertificate != null) {
			delete signerCertificate.Archived;
			delete signerCertificate.Extensions;
			delete signerCertificate.Handle;
			delete signerCertificate.HasPrivateKey;
			delete signerCertificate.SubjectName;
		}
		return data;
	}
	function handleError(logger, error, stderr, reject) {
		if (isOldWin6()) {
			logger.warn(`Cannot execute Get-AuthenticodeSignature: ${error || stderr}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
			return;
		}
		try {
			(0, child_process_1.execFileSync)(...preparePowerShellExec("ConvertTo-Json test", 10 * 1e3));
		} catch (testError) {
			logger.warn(`Cannot execute ConvertTo-Json: ${testError.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
			return;
		}
		if (error != null) reject(error);
		if (stderr) reject(/* @__PURE__ */ new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${stderr}. Failing signature validation due to unknown stderr.`));
	}
	function isOldWin6() {
		const winVersion = os$1.release();
		return winVersion.startsWith("6.") && !winVersion.startsWith("6.3");
	}
}));
//#endregion
//#region ../../node_modules/.bun/electron-updater@6.8.3/node_modules/electron-updater/out/NsisUpdater.js
var require_NsisUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NsisUpdater = void 0;
	var builder_util_runtime_1 = require_out();
	var path$1 = __require("path");
	var BaseUpdater_1 = require_BaseUpdater();
	var FileWithEmbeddedBlockMapDifferentialDownloader_1 = require_FileWithEmbeddedBlockMapDifferentialDownloader();
	var types_1 = require_types();
	var Provider_1 = require_Provider();
	var fs_extra_1 = require_lib();
	var windowsExecutableCodeSignatureVerifier_1 = require_windowsExecutableCodeSignatureVerifier();
	var url_1 = __require("url");
	var NsisUpdater = class extends BaseUpdater_1.BaseUpdater {
		constructor(options, app) {
			super(options, app);
			this._verifyUpdateCodeSignature = (publisherNames, unescapedTempUpdateFile) => (0, windowsExecutableCodeSignatureVerifier_1.verifySignature)(publisherNames, unescapedTempUpdateFile, this._logger);
		}
		/**
		* The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
		* The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
		*/
		get verifyUpdateCodeSignature() {
			return this._verifyUpdateCodeSignature;
		}
		set verifyUpdateCodeSignature(value) {
			if (value) this._verifyUpdateCodeSignature = value;
		}
		/*** @private */
		doDownloadUpdate(downloadUpdateOptions) {
			const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
			const fileInfo = (0, Provider_1.findFile)(provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info), "exe");
			return this.executeDownload({
				fileExtension: "exe",
				downloadUpdateOptions,
				fileInfo,
				task: async (destinationFile, downloadOptions, packageFile, removeTempDirIfAny) => {
					const packageInfo = fileInfo.packageInfo;
					const isWebInstaller = packageInfo != null && packageFile != null;
					if (isWebInstaller && downloadUpdateOptions.disableWebInstaller) throw (0, builder_util_runtime_1.newError)(`Unable to download new version ${downloadUpdateOptions.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
					if (!isWebInstaller && !downloadUpdateOptions.disableWebInstaller) this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version.");
					if (isWebInstaller || downloadUpdateOptions.disableDifferentialDownload || await this.differentialDownloadInstaller(fileInfo, downloadUpdateOptions, destinationFile, provider, builder_util_runtime_1.CURRENT_APP_INSTALLER_FILE_NAME)) await this.httpExecutor.download(fileInfo.url, destinationFile, downloadOptions);
					const signatureVerificationStatus = await this.verifySignature(destinationFile);
					if (signatureVerificationStatus != null) {
						await removeTempDirIfAny();
						throw (0, builder_util_runtime_1.newError)(`New version ${downloadUpdateOptions.updateInfoAndProvider.info.version} is not signed by the application owner: ${signatureVerificationStatus}`, "ERR_UPDATER_INVALID_SIGNATURE");
					}
					if (isWebInstaller) {
						if (await this.differentialDownloadWebPackage(downloadUpdateOptions, packageInfo, packageFile, provider)) try {
							await this.httpExecutor.download(new url_1.URL(packageInfo.path), packageFile, {
								headers: downloadUpdateOptions.requestHeaders,
								cancellationToken: downloadUpdateOptions.cancellationToken,
								sha512: packageInfo.sha512
							});
						} catch (e) {
							try {
								await (0, fs_extra_1.unlink)(packageFile);
							} catch (_ignored) {}
							throw e;
						}
					}
				}
			});
		}
		async verifySignature(tempUpdateFile) {
			let publisherName;
			try {
				publisherName = (await this.configOnDisk.value).publisherName;
				if (publisherName == null) return null;
			} catch (e) {
				if (e.code === "ENOENT") return null;
				throw e;
			}
			return await this._verifyUpdateCodeSignature(Array.isArray(publisherName) ? publisherName : [publisherName], tempUpdateFile);
		}
		doInstall(options) {
			const installerPath = this.installerPath;
			if (installerPath == null) {
				this.dispatchError(/* @__PURE__ */ new Error("No update filepath provided, can't quit and install"));
				return false;
			}
			const args = ["--updated"];
			if (options.isSilent) args.push("/S");
			if (options.isForceRunAfter) args.push("--force-run");
			if (this.installDirectory) args.push(`/D=${this.installDirectory}`);
			const packagePath = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
			if (packagePath != null) args.push(`--package-file=${packagePath}`);
			const callUsingElevation = () => {
				this.spawnLog(path$1.join(process.resourcesPath, "elevate.exe"), [installerPath].concat(args)).catch((e) => this.dispatchError(e));
			};
			if (options.isAdminRightsRequired) {
				this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe");
				callUsingElevation();
				return true;
			}
			this.spawnLog(installerPath, args).catch((e) => {
				const errorCode = e.code;
				this._logger.info(`Cannot run installer: error code: ${errorCode}, error message: "${e.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`);
				if (errorCode === "UNKNOWN" || errorCode === "EACCES") callUsingElevation();
				else if (errorCode === "ENOENT") __require("electron").shell.openPath(installerPath).catch((err) => this.dispatchError(err));
				else this.dispatchError(e);
			});
			return true;
		}
		async differentialDownloadWebPackage(downloadUpdateOptions, packageInfo, packagePath, provider) {
			if (packageInfo.blockMapSize == null) return true;
			try {
				const downloadOptions = {
					newUrl: new url_1.URL(packageInfo.path),
					oldFile: path$1.join(this.downloadedUpdateHelper.cacheDir, builder_util_runtime_1.CURRENT_APP_PACKAGE_FILE_NAME),
					logger: this._logger,
					newFile: packagePath,
					requestHeaders: this.requestHeaders,
					isUseMultipleRangeRequest: provider.isUseMultipleRangeRequest,
					cancellationToken: downloadUpdateOptions.cancellationToken
				};
				if (this.listenerCount(types_1.DOWNLOAD_PROGRESS) > 0) downloadOptions.onProgress = (it) => this.emit(types_1.DOWNLOAD_PROGRESS, it);
				await new FileWithEmbeddedBlockMapDifferentialDownloader_1.FileWithEmbeddedBlockMapDifferentialDownloader(packageInfo, this.httpExecutor, downloadOptions).download();
			} catch (e) {
				this._logger.error(`Cannot download differentially, fallback to full download: ${e.stack || e}`);
				return process.platform === "win32";
			}
			return false;
		}
	};
	exports.NsisUpdater = NsisUpdater;
}));
//#endregion
//#region build/icon.png?asset
var import_main = (/* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NsisUpdater = exports.MacUpdater = exports.RpmUpdater = exports.PacmanUpdater = exports.DebUpdater = exports.AppImageUpdater = exports.Provider = exports.NoOpLogger = exports.AppUpdater = exports.BaseUpdater = void 0;
	var fs_extra_1 = require_lib();
	var path = __require("path");
	var BaseUpdater_1 = require_BaseUpdater();
	Object.defineProperty(exports, "BaseUpdater", {
		enumerable: true,
		get: function() {
			return BaseUpdater_1.BaseUpdater;
		}
	});
	var AppUpdater_1 = require_AppUpdater();
	Object.defineProperty(exports, "AppUpdater", {
		enumerable: true,
		get: function() {
			return AppUpdater_1.AppUpdater;
		}
	});
	Object.defineProperty(exports, "NoOpLogger", {
		enumerable: true,
		get: function() {
			return AppUpdater_1.NoOpLogger;
		}
	});
	var Provider_1 = require_Provider();
	Object.defineProperty(exports, "Provider", {
		enumerable: true,
		get: function() {
			return Provider_1.Provider;
		}
	});
	var AppImageUpdater_1 = require_AppImageUpdater();
	Object.defineProperty(exports, "AppImageUpdater", {
		enumerable: true,
		get: function() {
			return AppImageUpdater_1.AppImageUpdater;
		}
	});
	var DebUpdater_1 = require_DebUpdater();
	Object.defineProperty(exports, "DebUpdater", {
		enumerable: true,
		get: function() {
			return DebUpdater_1.DebUpdater;
		}
	});
	var PacmanUpdater_1 = require_PacmanUpdater();
	Object.defineProperty(exports, "PacmanUpdater", {
		enumerable: true,
		get: function() {
			return PacmanUpdater_1.PacmanUpdater;
		}
	});
	var RpmUpdater_1 = require_RpmUpdater();
	Object.defineProperty(exports, "RpmUpdater", {
		enumerable: true,
		get: function() {
			return RpmUpdater_1.RpmUpdater;
		}
	});
	var MacUpdater_1 = require_MacUpdater();
	Object.defineProperty(exports, "MacUpdater", {
		enumerable: true,
		get: function() {
			return MacUpdater_1.MacUpdater;
		}
	});
	var NsisUpdater_1 = require_NsisUpdater();
	Object.defineProperty(exports, "NsisUpdater", {
		enumerable: true,
		get: function() {
			return NsisUpdater_1.NsisUpdater;
		}
	});
	__exportStar(require_types(), exports);
	var _autoUpdater;
	function doLoadAutoUpdater() {
		if (process.platform === "win32") _autoUpdater = new (require_NsisUpdater()).NsisUpdater();
		else if (process.platform === "darwin") _autoUpdater = new (require_MacUpdater()).MacUpdater();
		else {
			_autoUpdater = new (require_AppImageUpdater()).AppImageUpdater();
			try {
				const identity = path.join(process.resourcesPath, "package-type");
				if (!(0, fs_extra_1.existsSync)(identity)) return _autoUpdater;
				switch ((0, fs_extra_1.readFileSync)(identity).toString().trim()) {
					case "deb":
						_autoUpdater = new (require_DebUpdater()).DebUpdater();
						break;
					case "rpm":
						_autoUpdater = new (require_RpmUpdater()).RpmUpdater();
						break;
					case "pacman":
						_autoUpdater = new (require_PacmanUpdater()).PacmanUpdater();
						break;
					default: break;
				}
			} catch (error) {
				console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", error.message);
			}
		}
		return _autoUpdater;
	}
	Object.defineProperty(exports, "autoUpdater", {
		enumerable: true,
		get: () => {
			return _autoUpdater || doLoadAutoUpdater();
		}
	});
})))();
var icon_default = join$1(import.meta.dirname, "./chunks/icon-CffPBhQM.png");
//#endregion
//#region src/election.ts
import_main.autoUpdater.autoDownload = false;
import_main.autoUpdater.autoInstallOnAppQuit = true;
function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 800,
		show: false,
		autoHideMenuBar: true,
		...process.platform === "linux" ? { icon: icon_default } : {},
		webPreferences: {
			preload: join(__dirname, "../preload/index.js"),
			sandbox: false
		}
	});
	mainWindow.on("ready-to-show", () => {
		mainWindow.show();
	});
	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: "deny" };
	});
	if (is.dev && process.env["ELECTRON_RENDERER_URL"]) mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
	else mainWindow.loadURL(process.env["VITE_SITE_URL"] ?? "https://app.intlayer.org");
	import_main.autoUpdater.on("update-available", (info) => {
		mainWindow.webContents.send("update-available", info);
	});
	import_main.autoUpdater.on("update-downloaded", (info) => {
		mainWindow.webContents.send("update-downloaded", info);
	});
	import_main.autoUpdater.on("download-progress", (progress) => {
		mainWindow.webContents.send("download-progress", progress);
	});
	import_main.autoUpdater.on("error", (err) => {
		mainWindow.webContents.send("update-error", err.message);
	});
}
app.whenReady().then(() => {
	electronApp.setAppUserModelId("org.intlayer.app");
	app.on("browser-window-created", (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});
	ipcMain.on("ping", () => console.log("pong"));
	ipcMain.handle("ping", () => "pong");
	ipcMain.handle("check-for-updates", () => import_main.autoUpdater.checkForUpdates());
	ipcMain.handle("download-update", () => import_main.autoUpdater.downloadUpdate());
	ipcMain.handle("install-update", () => {
		import_main.autoUpdater.quitAndInstall(false, true);
	});
	createWindow();
	if (!is.dev) setTimeout(() => import_main.autoUpdater.checkForUpdates(), 3e3);
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
//#endregion
export {};
