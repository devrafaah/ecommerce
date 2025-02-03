import { EmailAlreadyExist } from "../errors/AuthenticationError/email-already-exist.error";
import { EmailOrPasswordWrong } from "../errors/AuthenticationError/email-or-password-wrong.error";
import { User } from "../models/user.model";
import { getAuth, UpdateRequest, UserRecord } from "firebase-admin/auth";
import { getAuth as getFirebaseAuth, sendPasswordResetEmail, signInWithEmailAndPassword, UserCredential } from "firebase/auth"

export class AuthService {

    async create(user: User) : Promise<UserRecord> {
        return await getAuth().createUser({
            email: user.email,
            password: user.senha,
            displayName: user.nome,
        }).catch(error => {
            if(error.code === "auth/email-already-exists") {
                throw new EmailAlreadyExist();
            }
            throw error
        })
    }

    async update(id : string, user : User) {
        const props : UpdateRequest = {
            displayName : user.nome,
            email : user.email
        };

        if(user.senha) {
            props.password = user.senha
        }

        return getAuth().updateUser(id, props)
    }

    async login(email : string, senha : string) : Promise<UserCredential> {
        return signInWithEmailAndPassword(
            getFirebaseAuth(),
            email,
            senha
        ).catch(error => {
            if(error.code === "auth/invalid-credential") {
                throw new EmailOrPasswordWrong()
            }
            throw error
        });
    };

    async delete(id: string) {
        await getAuth().deleteUser(id);
    }

    async recovery(email: string) {
        await sendPasswordResetEmail(getFirebaseAuth(), email);
    }
}