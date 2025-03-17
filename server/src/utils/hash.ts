import bcrypt from "bcryptjs";

export const hashPass = async (pass: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const 
    } catch (error) {
        
    }
}