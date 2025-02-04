import { EmailAlreadyExist } from "../errors/AuthenticationError/email-already-exist.error.js";
import { EmailOrPasswordWrong } from "../errors/AuthenticationError/email-or-password-wrong.error.js";
import { getAuth } from "firebase-admin/auth";
import { getAuth as getFirebaseAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
export class AuthService {
    async create(user) {
        return await getAuth().createUser({
            email: user.email,
            password: user.senha,
            displayName: user.nome,
        }).catch(error => {
            if (error.code === "auth/email-already-exists") {
                throw new EmailAlreadyExist();
            }
            throw error;
        });
    }
    async update(id, user) {
        const props = {
            displayName: user.nome,
            email: user.email
        };
        if (user.senha) {
            props.password = user.senha;
        }
        return getAuth().updateUser(id, props);
    }
    async login(email, senha) {
        return signInWithEmailAndPassword(getFirebaseAuth(), email, senha).catch(error => {
            if (error.code === "auth/invalid-credential") {
                throw new EmailOrPasswordWrong();
            }
            throw error;
        });
    }
    ;
    async delete(id) {
        await getAuth().deleteUser(id);
    }
    async recovery(email) {
        await sendPasswordResetEmail(getFirebaseAuth(), email);
    }
}
//# sourceMappingURL=auth.service.js.map