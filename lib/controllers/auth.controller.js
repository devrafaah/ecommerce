import { AuthService } from "../services/auth.service.js";
export class AuthController {
    static async login(req, res) {
        const { email, senha } = req.body;
        const userRecord = await new AuthService().login(email, senha);
        const token = await userRecord.user.getIdToken(true);
        res.send({
            token: token
        });
    }
    static async recovery(req, res) {
        const email = req.body.email;
        await new AuthService().recovery(email);
        res.end();
    }
}
//# sourceMappingURL=auth.controller.js.map