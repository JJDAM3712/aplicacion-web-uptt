import bcrypt from "bcryptjs";

export const hashPass = async (pass: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hashPass = await bcrypt.hashSync(pass, salt);
        return hashPass;
    } catch (error) {
        throw new Error("Error al hashear la contraseña");
    }
}