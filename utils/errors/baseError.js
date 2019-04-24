"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
let globalPrintStack = false;
class BaseError extends Error {
    constructor(status, code, _description, metadata) {
        if (!status) {
            throw new Error('error status is required');
        }
        if (!_description) {
            throw new Error('error description is required');
        }
        let description;
        if (typeof _description === 'function')
            description = _description(metadata);
        else
            description = _description;
        super(description);
        this.code = code;
        this.status = status;
        this.description = description;
        this.metadata = metadata || {};
    }
    static setPrintStack(value) {
        globalPrintStack = value;
    }
    setPrintStack(value) {
        this.printStack = value;
    }
    toString() {
        return `[${this.code}] ${this.message} - metadata: ${util_1.inspect(this.metadata)}`;
    }
    toJSON() {
        const jsonError = {
            code: this.code,
            status: this.status,
            description: this.description,
            metadata: null,
            stack: null,
        };
        if (this.metadata) {
            jsonError.metadata = this.metadata;
        }
        if ((this.printStack === undefined && globalPrintStack) || (this.printStack !== undefined && this.printStack)) {
            jsonError.stack = this.stack;
        }
        return jsonError;
    }
}
exports.default = BaseError;
;
//# sourceMappingURL=baseError.js.map