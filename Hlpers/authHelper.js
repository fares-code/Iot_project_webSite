import bcrypt, { hash } from "bcrypt";
export const hashPassword= async (password)=>{
try {
    const salt =10;
    const hashedPassword = await bcrypt.hash(password,salt);
    
return hashedPassword;


} catch (error) {
    console.log(error);
    resizeBy.status(401).send({
        success:false,
        message:"error when hash"
    })
    
}
}
export const comparehPassword= async (password,hashedpassword)=>{

   return  bcrypt.compare(password,hashedpassword);



}