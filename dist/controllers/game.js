"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
/* Credit to William Billingsley for the random generator
*/
exports.game = (req, resp) => {
    const randomId = () => {
        let code = '';
        for (let i = 0; i < 8; i++) {
            const n = Math.floor(Math.random() * chars.length);
            code += chars.charAt(n);
        }
        return code;
    };
    resp.send({ id: randomId() });
};
