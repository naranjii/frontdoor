import bcrypt from "bcryptjs";

const hash = bcrypt.hashSync("minhaSenhaSegura", 10);
console.log(hash);