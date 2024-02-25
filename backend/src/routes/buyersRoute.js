"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const knex = require('../../db/knex');
const router = (0, express_1.Router)();
// Get all buyers
router.get('/buyers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buyers = yield knex('buyers').select('*');
        res.json(buyers);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching buyers', details: error });
    }
}));
exports.default = router;
